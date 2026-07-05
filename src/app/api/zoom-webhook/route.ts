import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ZoomEventPayload {
  event?: string;
  event_ts?: number;
  payload?: {
    plainToken?: string;
    account_id?: string;
    object?: {
      id?: string;
      participant?: {
        user_id?: string;
        user_name?: string;
        id?: string;
        email?: string;
        join_time?: string;
      };
    };
  };
}

async function findAcContactIdByEmail(
  apiUrl: string,
  apiKey: string,
  email: string
): Promise<string | null> {
  const url = `${apiUrl}/api/3/contacts?email=${encodeURIComponent(email)}`;
  const res = await fetch(url, {
    headers: { "Api-Token": apiKey, Accept: "application/json" },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { contacts?: Array<{ id?: string }> };
  return data.contacts?.[0]?.id ?? null;
}

async function ensureAcTagId(
  apiUrl: string,
  apiKey: string,
  tagName: string
): Promise<string | null> {
  // Try search first
  const searchRes = await fetch(
    `${apiUrl}/api/3/tags?search=${encodeURIComponent(tagName)}&limit=20`,
    { headers: { "Api-Token": apiKey, Accept: "application/json" } }
  );
  if (searchRes.ok) {
    const data = (await searchRes.json()) as { tags?: Array<{ id?: string; tag?: string }> };
    const match = data.tags?.find((t) => t.tag === tagName);
    if (match?.id) return match.id;
  }
  // Create if missing
  const createRes = await fetch(`${apiUrl}/api/3/tags`, {
    method: "POST",
    headers: {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ tag: { tag: tagName, tagType: "contact", description: "" } }),
  });
  if (!createRes.ok) return null;
  const created = (await createRes.json()) as { tag?: { id?: string } };
  return created.tag?.id ?? null;
}

async function applyAcTag(
  apiUrl: string,
  apiKey: string,
  contactId: string,
  tagId: string
): Promise<boolean> {
  const res = await fetch(`${apiUrl}/api/3/contactTags`, {
    method: "POST",
    headers: {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      contactTag: { contact: Number(contactId), tag: Number(tagId) },
    }),
  });
  return res.ok;
}

function verifyZoomSignature(rawBody: string, signatureHeader: string | null, timestamp: string | null): boolean {
  const secret = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
  if (!secret || !signatureHeader || !timestamp) return false;
  const message = `v0:${timestamp}:${rawBody}`;
  const hash = crypto.createHmac("sha256", secret).update(message).digest("hex");
  const expected = `v0=${hash}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  let json: ZoomEventPayload;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 1) URL validation challenge from Zoom
  if (json.event === "endpoint.url_validation" && json.payload?.plainToken) {
    const secret = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
    if (!secret) {
      return NextResponse.json({ error: "webhook secret missing" }, { status: 500 });
    }
    const encryptedToken = crypto
      .createHmac("sha256", secret)
      .update(json.payload.plainToken)
      .digest("hex");
    return NextResponse.json(
      { plainToken: json.payload.plainToken, encryptedToken },
      { status: 200 }
    );
  }

  // 2) Verify signature for all non-validation events
  const signature = req.headers.get("x-zm-signature");
  const timestamp = req.headers.get("x-zm-request-timestamp");
  if (!verifyZoomSignature(rawBody, signature, timestamp)) {
    console.warn("[zoom-webhook] invalid signature — dropping");
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  // 3) Handle attendance
  if (json.event === "webinar.participant_joined") {
    const participant = json.payload?.object?.participant;
    const email = participant?.email;
    if (!email) {
      // Some Zoom events omit email for guest participants; safe to ignore.
      return NextResponse.json({ ok: true, skipped: "no email" }, { status: 200 });
    }
    const apiUrl = process.env.ACTIVECAMPAIGN_API_URL;
    const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;
    const tagName = process.env.ACTIVECAMPAIGN_TAG_WEBINAR_ATTENDED ?? "webinar-attended";
    if (!apiUrl || !apiKey) {
      return NextResponse.json({ error: "AC not configured" }, { status: 500 });
    }
    const contactId = await findAcContactIdByEmail(apiUrl, apiKey, email);
    if (!contactId) {
      // Person joined without being on our list — safe to skip.
      return NextResponse.json({ ok: true, skipped: "contact not found", email }, { status: 200 });
    }
    const tagId = await ensureAcTagId(apiUrl, apiKey, tagName);
    if (!tagId) {
      return NextResponse.json({ error: "tag ensure failed" }, { status: 502 });
    }
    const applied = await applyAcTag(apiUrl, apiKey, contactId, tagId);
    return NextResponse.json({ ok: true, tagged: applied, email }, { status: 200 });
  }

  // Other events (participant_left, etc.) — acknowledge but no-op
  return NextResponse.json({ ok: true, event: json.event ?? null }, { status: 200 });
}

// Allow GET so the endpoint is reachable for basic health checks.
export async function GET() {
  return NextResponse.json({ ok: true, service: "zoom-webhook" });
}
