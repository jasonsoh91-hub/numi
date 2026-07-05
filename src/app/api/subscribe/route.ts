import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ListType = "pattern-code" | "webinar";
type WebinarDateSlot = "2026-07-21" | "2026-07-28";

interface SubscribeBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  webinarDate?: WebinarDateSlot;
  listType?: ListType;
  source?: string;
}

const WEBINAR_DATE_ISO: Record<WebinarDateSlot, string> = {
  // Wall-clock 8:00 PM in AC account timezone (America/New_York).
  // No offset suffix — AC interprets naive datetimes in account TZ.
  "2026-07-21": "2026-07-21 20:00:00",
  "2026-07-28": "2026-07-28 20:00:00",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeBirthDate(raw?: string): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const dmy = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return undefined;
}

function resolveListId(listType?: ListType): string | undefined {
  if (listType === "pattern-code") return process.env.ACTIVECAMPAIGN_LIST_PATTERN_CODE;
  if (listType === "webinar") return process.env.ACTIVECAMPAIGN_LIST_WEBINAR;
  return undefined;
}

export async function POST(req: NextRequest) {
  let body: SubscribeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, birthDate, webinarDate, listType, source } = body;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const listId = resolveListId(listType);
  if (!listId) {
    return NextResponse.json({ error: "Unknown listType" }, { status: 400 });
  }

  const apiUrl = process.env.ACTIVECAMPAIGN_API_URL;
  const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;
  const birthdayFieldId = process.env.ACTIVECAMPAIGN_FIELD_BIRTHDAY;
  const webinarDateFieldId = process.env.ACTIVECAMPAIGN_FIELD_WEBINAR_DATE;

  if (!apiUrl || !apiKey) {
    return NextResponse.json({ error: "ActiveCampaign not configured" }, { status: 500 });
  }

  const fieldValues: { field: string; value: string }[] = [];
  const iso = normalizeBirthDate(birthDate);
  if (iso && birthdayFieldId) {
    fieldValues.push({ field: birthdayFieldId, value: iso });
  }
  if (webinarDate && webinarDateFieldId && WEBINAR_DATE_ISO[webinarDate]) {
    fieldValues.push({ field: webinarDateFieldId, value: WEBINAR_DATE_ISO[webinarDate] });
  }


  const contactPayload: Record<string, unknown> = { email };
  if (firstName) contactPayload.firstName = firstName;
  if (lastName) contactPayload.lastName = lastName;
  if (phone) contactPayload.phone = phone;
  if (fieldValues.length) contactPayload.fieldValues = fieldValues;

  try {
    const syncRes = await fetch(`${apiUrl}/api/3/contact/sync`, {
      method: "POST",
      headers: {
        "Api-Token": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ contact: contactPayload }),
    });

    if (!syncRes.ok) {
      const text = await syncRes.text();
      console.error("AC contact/sync failed", syncRes.status, text);
      return NextResponse.json({ error: "Contact sync failed" }, { status: 502 });
    }

    const syncJson = (await syncRes.json()) as { contact?: { id?: string } };
    const contactId = syncJson.contact?.id;
    if (!contactId) {
      return NextResponse.json({ error: "Missing contact ID" }, { status: 502 });
    }

    const listRes = await fetch(`${apiUrl}/api/3/contactLists`, {
      method: "POST",
      headers: {
        "Api-Token": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        contactList: { list: Number(listId), contact: Number(contactId), status: 1 },
      }),
    });

    if (!listRes.ok) {
      const text = await listRes.text();
      console.error("AC contactLists failed", listRes.status, text);
      return NextResponse.json({ error: "List subscribe failed" }, { status: 502 });
    }

    // Re-apply WEBINAR_DATE after list assignment so any list-trigger automation
    // that sets a default value doesn't overwrite the user's selection.
    if (webinarDate && webinarDateFieldId && WEBINAR_DATE_ISO[webinarDate]) {
      const rebindPayload = {
        contact: {
          email,
          fieldValues: [
            { field: webinarDateFieldId, value: WEBINAR_DATE_ISO[webinarDate] },
          ],
        },
      };
      const rebindRes = await fetch(`${apiUrl}/api/3/contact/sync`, {
        method: "POST",
        headers: {
          "Api-Token": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(rebindPayload),
      });
      if (!rebindRes.ok) {
        console.warn("AC webinar-date rebind failed", rebindRes.status);
      }
    }

    return NextResponse.json({ ok: true, contactId, source: source ?? null }, { status: 200 });
  } catch (err) {
    console.error("AC subscribe error", err);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
