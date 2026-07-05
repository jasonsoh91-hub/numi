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

export async function registerZoomWebinarAttendee(params: {
  webinarSlot: WebinarSlot;
  email: string;
  firstName: string;
  lastName?: string;
}): Promise<ZoomRegistrant | null> {
  const { webinarSlot, email, firstName, lastName } = params;
  const webinarId = resolveWebinarId(webinarSlot);
  if (!webinarId) {
    console.error("[zoom] no webinar id for slot", webinarSlot);
    return null;
  }
  const token = await getZoomAccessToken();
  if (!token) return null;

  const body: Record<string, unknown> = {
    email,
    first_name: firstName || "Attendee",
  };
  if (lastName) body.last_name = lastName;

  const res = await fetch(`https://api-us.zoom.us/v2/webinars/${webinarId}/registrants`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("[zoom] register failed", res.status, await res.text());
    return null;
  }

  const json = (await res.json()) as { join_url?: string; registrant_id?: string };
  if (!json.join_url || !json.registrant_id) return null;

  return {
    joinUrl: json.join_url,
    registrantId: json.registrant_id,
  };
}
