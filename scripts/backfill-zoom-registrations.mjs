#!/usr/bin/env node
/**
 * Backfill Zoom registrations for webinar contacts that have a Webinar Date in
 * ActiveCampaign but no Zoom join URL (i.e. their live registration silently
 * failed). For each such contact it registers them in the correct Zoom webinar
 * and writes the personal join URL back to AC field ZOOM_JOIN_URL.
 *
 * Usage:
 *   node scripts/backfill-zoom-registrations.mjs           # dry run (default)
 *   node scripts/backfill-zoom-registrations.mjs --apply   # actually register + write back
 *
 * Reads the same env vars as the app (.env.local). Load them first, e.g.:
 *   set -a; source .env.local; set +a; node scripts/backfill-zoom-registrations.mjs --apply
 */

const APPLY = process.argv.includes("--apply");

const AC_URL = process.env.ACTIVECAMPAIGN_API_URL;
const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
const F_DATE = process.env.ACTIVECAMPAIGN_FIELD_WEBINAR_DATE; // 3
const F_JOIN = process.env.ACTIVECAMPAIGN_FIELD_ZOOM_JOIN_URL; // 6
const LIST_WEBINAR = process.env.ACTIVECAMPAIGN_LIST_WEBINAR; // 5

const Z_ACCOUNT = process.env.ZOOM_ACCOUNT_ID;
const Z_CLIENT = process.env.ZOOM_CLIENT_ID;
const Z_SECRET = process.env.ZOOM_CLIENT_SECRET;
const Z_JUL21 = process.env.ZOOM_WEBINAR_ID_JUL21;
const Z_JUL28 = process.env.ZOOM_WEBINAR_ID_JUL28;

for (const [k, v] of Object.entries({
  ACTIVECAMPAIGN_API_URL: AC_URL,
  ACTIVECAMPAIGN_API_KEY: AC_KEY,
  ACTIVECAMPAIGN_FIELD_WEBINAR_DATE: F_DATE,
  ACTIVECAMPAIGN_FIELD_ZOOM_JOIN_URL: F_JOIN,
  ACTIVECAMPAIGN_LIST_WEBINAR: LIST_WEBINAR,
  ZOOM_ACCOUNT_ID: Z_ACCOUNT,
  ZOOM_CLIENT_ID: Z_CLIENT,
  ZOOM_CLIENT_SECRET: Z_SECRET,
  ZOOM_WEBINAR_ID_JUL21: Z_JUL21,
  ZOOM_WEBINAR_ID_JUL28: Z_JUL28,
})) {
  if (!v) {
    console.error(`Missing env var: ${k}. Did you 'source .env.local'?`);
    process.exit(1);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slotFromDate(v) {
  if (!v) return null;
  if (v.includes("07-21")) return "2026-07-21";
  if (v.includes("07-28")) return "2026-07-28";
  return null;
}
const zoomIdForSlot = (slot) => (slot === "2026-07-21" ? Z_JUL21 : slot === "2026-07-28" ? Z_JUL28 : null);

async function ac(path, init) {
  const res = await fetch(`${AC_URL}${path}`, {
    ...init,
    headers: { "Api-Token": AC_KEY, Accept: "application/json", "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(`AC ${path} -> ${res.status} ${await res.text()}`);
  return res.json();
}

async function fetchFieldValues(fieldId) {
  const out = {};
  let offset = 0;
  for (;;) {
    const d = await ac(`/api/3/fieldValues?filters%5Bfieldid%5D=${fieldId}&limit=100&offset=${offset}`);
    const rows = d.fieldValues || [];
    for (const r of rows) out[r.contact] = r.value || "";
    if (rows.length < 100) break;
    offset += 100;
  }
  return out;
}

async function getContact(id) {
  const d = await ac(`/api/3/contacts/${id}`);
  const c = d.contact;
  if (!c?.email) return null;
  return { email: c.email, firstName: c.firstName || "", lastName: c.lastName || "" };
}

let zoomToken = null;
async function zoomAuth() {
  if (zoomToken) return zoomToken;
  const basic = Buffer.from(`${Z_CLIENT}:${Z_SECRET}`).toString("base64");
  const res = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${Z_ACCOUNT}`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (!res.ok) throw new Error(`zoom token ${res.status} ${await res.text()}`);
  zoomToken = (await res.json()).access_token;
  return zoomToken;
}

async function zoomRegister(slot, email, firstName, lastName) {
  const webinarId = zoomIdForSlot(slot);
  // last_name is required on this webinar; fall back so single-word names register.
  const body = { email, first_name: firstName || "Attendee", last_name: lastName || firstName || "Attendee" };
  for (let attempt = 1; attempt <= 4; attempt++) {
    const token = await zoomAuth();
    const res = await fetch(`https://api-us.zoom.us/v2/webinars/${webinarId}/registrants`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const j = await res.json();
      return j.join_url || null;
    }
    // Per-registrant daily limit (3/day) won't clear until GMT midnight — don't
    // retry it (wastes the remaining quota). Short-term 429/5xx are transient.
    const dailyLimited = res.status === 429 && res.headers.get("x-ratelimit-type") === "Daily-limit";
    const retriable = !dailyLimited && (res.status === 429 || res.status >= 500);
    console.warn(`  zoom register status=${res.status} attempt=${attempt} dailyLimited=${dailyLimited} retriable=${retriable}`);
    if (!retriable) return null;
    await sleep(Math.min(500 * 2 ** (attempt - 1), 8000));
  }
  return null;
}

async function writeJoinUrl(email, joinUrl) {
  await ac(`/api/3/contact/sync`, {
    method: "POST",
    body: JSON.stringify({ contact: { email, fieldValues: [{ field: F_JOIN, value: joinUrl }] } }),
  });
}

async function main() {
  console.log(APPLY ? "MODE: APPLY (will register + write back)\n" : "MODE: DRY RUN (no changes)\n");

  const [dates, joins] = await Promise.all([fetchFieldValues(F_DATE), fetchFieldValues(F_JOIN)]);
  const targets = Object.keys(dates).filter(
    (cid) => slotFromDate(dates[cid]) && !(joins[cid] && joins[cid].trim())
  );

  console.log(`Contacts with webinar date: ${Object.keys(dates).length}`);
  console.log(`Missing Zoom join URL:      ${targets.length}\n`);

  let ok = 0, fail = 0;
  for (const cid of targets) {
    const slot = slotFromDate(dates[cid]);
    const contact = await getContact(cid);
    if (!contact) { console.warn(`  contact ${cid}: no email, skip`); fail++; continue; }
    const { email, lastName } = contact;
    const firstName = contact.firstName || email.split("@")[0];

    if (!APPLY) {
      console.log(`  [dry] would register ${email} -> ${slot}`);
      continue;
    }

    try {
      const joinUrl = await zoomRegister(slot, email, firstName, lastName);
      if (!joinUrl) { console.error(`  FAIL ${email} (${slot}) - zoom returned no join url`); fail++; continue; }
      await writeJoinUrl(email, joinUrl);
      console.log(`  OK   ${email} -> ${slot}`);
      ok++;
    } catch (err) {
      console.error(`  ERR  ${email}:`, err.message);
      fail++;
    }
    await sleep(400); // gentle pacing to avoid Zoom rate limits
  }

  if (APPLY) console.log(`\nDone. registered=${ok} failed=${fail}`);
  else console.log(`\nDry run complete. Re-run with --apply to register ${targets.length} contacts.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
