interface CachedToken {
  token: string;
  expiresAt: number;
}

let cachedToken: CachedToken | null = null;

async function getZoomAccessToken(): Promise<string | null> {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  if (!accountId || !clientId || !clientSecret) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (!res.ok) {
    console.error("[zoom] token exchange failed", res.status, await res.text());
    return null;
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000,
  };
  return json.access_token;
}

export interface ZoomRegistrant {
  joinUrl: string;
  registrantId: string;
}

export type WebinarSlot = "2026-07-21" | "2026-07-28";

export function resolveWebinarId(slot: WebinarSlot): string | undefined {
  if (slot === "2026-07-21") return process.env.ZOOM_WEBINAR_ID_JUL21;
  if (slot === "2026-07-28") return process.env.ZOOM_WEBINAR_ID_JUL28;
  return undefined;
}

const OPPOSITE_SLOT: Record<WebinarSlot, WebinarSlot> = {
  "2026-07-21": "2026-07-28",
  "2026-07-28": "2026-07-21",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Register an attendee, retrying on transient failures (429 / 5xx / network).
 * The Jul-registration traffic spikes were hitting Zoom rate limits and the old
 * single-shot call swallowed them, leaving ~26% of contacts with no join link.
 */
export async function registerZoomWebinarAttendee(params: {
  webinarSlot: WebinarSlot;
  email: string;
  firstName: string;
  lastName?: string;
  maxAttempts?: number;
}): Promise<ZoomRegistrant | null> {
  const { webinarSlot, email, firstName, lastName, maxAttempts = 4 } = params;
  const webinarId = resolveWebinarId(webinarSlot);
  if (!webinarId) {
    console.error("[zoom] no webinar id for slot", webinarSlot);
    return null;
  }

  const body: Record<string, unknown> = {
    email,
    first_name: firstName || "Attendee",
    // Zoom marks last_name required on this webinar — single-word registrants
    // (no last name) 400'd and were the real cause of the missing regs.
    last_name: lastName || firstName || "Attendee",
  };

  let lastStatus = 0;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const token = await getZoomAccessToken();
    if (!token) {
      // token exchange itself may be rate-limited; back off and retry
      if (attempt < maxAttempts) await sleep(backoffMs(attempt));
      continue;
    }

    let res: Response;
    try {
      res = await fetch(`https://api-us.zoom.us/v2/webinars/${webinarId}/registrants`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.warn(`[zoom] register network error (attempt ${attempt}/${maxAttempts})`, err);
      if (attempt < maxAttempts) await sleep(backoffMs(attempt));
      continue;
    }

    if (res.ok) {
      const json = (await res.json()) as { join_url?: string; registrant_id?: string };
      if (!json.join_url || !json.registrant_id) {
        console.error("[zoom] register 2xx but missing join_url/registrant_id", email);
        return null;
      }
      return { joinUrl: json.join_url, registrantId: json.registrant_id };
    }

    lastStatus = res.status;
    const text = await res.text().catch(() => "");
    // Zoom enforces a per-registrant DAILY limit of 3 add-registrant calls.
    // That 429 doesn't clear until GMT midnight, so retrying is futile and
    // only burns more of the (already exhausted) quota — treat as fatal.
    const dailyLimited = res.status === 429 && res.headers.get("x-ratelimit-type") === "Daily-limit";
    // Short-term 429 (QPS) and 5xx are transient — retry those.
    const retriable = !dailyLimited && (res.status === 429 || res.status >= 500);
    console.warn(
      `[zoom] register failed (attempt ${attempt}/${maxAttempts}) status=${res.status} dailyLimited=${dailyLimited} retriable=${retriable} ${text}`
    );
    if (!retriable) return null;
    if (attempt < maxAttempts) await sleep(backoffMs(attempt, res.headers.get("Retry-After")));
  }

  console.error(`[zoom] register exhausted ${maxAttempts} attempts for ${email}, lastStatus=${lastStatus}`);
  return null;
}

function backoffMs(attempt: number, retryAfterHeader?: string | null): number {
  // Retry-After may be seconds ("120") or an HTTP/ISO date. Only honor a plain
  // seconds value; anything else (incl. Zoom's ISO daily-reset stamp) → ignore.
  const secs = retryAfterHeader ? Number(retryAfterHeader) : NaN;
  const retryAfter = Number.isFinite(secs) ? secs * 1000 : 0;
  const expo = Math.min(500 * 2 ** (attempt - 1), 8000); // 500,1000,2000,4000...
  return Math.max(retryAfter, expo);
}

/**
 * Best-effort cancel of a registrant in the opposite session, so a contact who
 * re-registers for a different date isn't left booked in both Zoom webinars.
 * Requires the Zoom app scope `webinar:update:registrant_status`. If the scope
 * is missing this logs and no-ops rather than throwing.
 */
export async function cancelOppositeSlotRegistration(params: {
  keepSlot: WebinarSlot;
  email: string;
}): Promise<void> {
  const { keepSlot, email } = params;
  const oppId = resolveWebinarId(OPPOSITE_SLOT[keepSlot]);
  if (!oppId) return;
  const token = await getZoomAccessToken();
  if (!token) return;
  try {
    const res = await fetch(
      `https://api-us.zoom.us/v2/webinars/${oppId}/registrants/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "cancel", registrants: [{ email }] }),
      }
    );
    if (!res.ok) {
      console.warn("[zoom] cancel opposite-slot registration failed", res.status, await res.text());
    }
  } catch (err) {
    console.warn("[zoom] cancel opposite-slot network error", err);
  }
}
