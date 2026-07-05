# Zoom Webinars ↔ Site ↔ AC — Full Integration Guide

Goal:
1. User submits form → contact goes into AC (already done) → contact registered in Zoom → unique `join_url` stored in AC field
2. AC's B1 confirmation email sends the personal `join_url` via `%ZOOM_JOIN_URL%` merge tag
3. When contact joins live, Zoom fires webhook → my `/api/zoom-webhook` → tag `webinar-attended` in AC
4. Contacts registered but not tagged `webinar-attended` after event = automatic no-show segment

---

## Step 1 · Create Zoom Server-to-Server OAuth App

**Path:** Zoom Marketplace → Develop → Build App → **Server-to-Server OAuth**

1. **App name:** `NUMI Site Integration`
2. Fill in company info (required by Zoom, only visible to your account).
3. **Save credentials shown on next screen:**
   - Account ID
   - Client ID
   - Client Secret
4. **Scopes tab → add these scopes:**
   - `webinar:read:admin` (fetch webinar details)
   - `webinar:write:admin` (create registrants)
   - `webinar:read:registration:admin` (list registrants)
   - `webinar:read:participant:admin` (attendance data)
   - `report:read:webinar_participants:admin` (post-event attendance report)
5. **Activation tab → Activate the app.**

## Step 2 · Get your two Webinar IDs

**Path:** zoom.us → Webinars → your July 21 event → look for **Webinar ID** near the top (a 10-11 digit number). Same for July 28.

Paste in a note:
```
July 21 webinar ID: __________
July 28 webinar ID: __________
```

## Step 3 · Create Zoom Webhook Subscription

**Path:** In your Server-to-Server OAuth app → **Feature tab → Event Subscriptions → Add Event Subscription**

1. **Subscription name:** `NUMI attendance tracker`
2. **Event notification endpoint URL:** `https://learn.numi-intl.ai/api/zoom-webhook`
3. **Verification:** Zoom sends a challenge — my endpoint handles it automatically once deployed
4. **Add events:**
   - Webinar → Participant/Host joined webinar (`webinar.participant_joined`)
   - Webinar → Participant/Host left webinar (`webinar.participant_left`)
5. **Save the Secret Token** shown after subscription creation (you paste it into Vercel env)

## Step 4 · Create ZOOM_JOIN_URL custom field in AC

**Path:** ActiveCampaign → Contacts → Fields → **New Field**
- Name: `Zoom Join URL`
- Type: **Text field (short)** or **Text field (long)** — Zoom URLs are ~200 chars, long is safest
- Personalization tag: `%ZOOM_JOIN_URL%`

After creating, note the field ID — Contacts → Fields → your field → check URL for `id=N` (or GET `/api/3/fields`, I'll fetch it after you create it).

## Step 5 · Give me these values

Paste as a single message when done:
```
ZOOM_ACCOUNT_ID=<from step 1>
ZOOM_CLIENT_ID=<from step 1>
ZOOM_CLIENT_SECRET=<from step 1>
ZOOM_WEBHOOK_SECRET_TOKEN=<from step 3>
ZOOM_WEBINAR_ID_JUL21=<from step 2>
ZOOM_WEBINAR_ID_JUL28=<from step 2>
```

I'll:
- Add these to `.env.local` + Vercel env
- Fetch the new AC field ID and register `ACTIVECAMPAIGN_FIELD_ZOOM_JOIN_URL`
- Wire up the API route + webhook handler
- Test end-to-end with a temp contact

---

## What I'll build next (code)

### `src/lib/zoom.ts`
Server-only helper that:
- Fetches Zoom OAuth token (caches in-memory 55min)
- `registerZoomWebinarAttendee(webinarId, email, firstName, lastName)` → returns `{ join_url, registrant_id }`

### `src/app/api/subscribe/route.ts` (extend)
After AC contact created:
1. Pick webinar ID based on `webinarDate` slot
2. Call `registerZoomWebinarAttendee`
3. Store returned `join_url` in AC via `ZOOM_JOIN_URL` field

### `src/app/api/zoom-webhook/route.ts` (new)
Handles Zoom event pings:
- **URL validation** (`endpoint.url_validation` event) — respond with plainToken hash so Zoom accepts the endpoint
- **`webinar.participant_joined`** — find contact by email, apply AC tag `webinar-attended`
- Verify request signature using `ZOOM_WEBHOOK_SECRET_TOKEN` header

### AC email B1 update
Replace `[ADD ZOOM JOIN LINK]` with `%ZOOM_JOIN_URL%` merge tag so each recipient gets their own link.
Same for B2, B3, B4.

### No-show segment (dashboard step)
After event ends:
- Segment condition: `list = Webinar (5)` AND `tag != webinar-attended`
- Apply tag `webinar-no-show` OR trigger C-Sequence (No-Show Replay) directly.

---

## Attendance tracking: how it works

1. Contact clicks their `%ZOOM_JOIN_URL%` in email
2. Zoom checks the join token; recognizes the registrant
3. When Zoom marks them "joined the webinar" (they enter the room, not just the waiting room), the webhook fires
4. My handler receives `webinar.participant_joined` with `email` field
5. Handler calls AC to add `webinar-attended` tag to that contact
6. AC's D-sequence trigger `webinar-attended` fires the upsell automation

**Edge cases handled:**
- Zoom retries webhooks if we don't return 200 → my handler is idempotent (adding tag twice is a no-op)
- User joins twice (e.g. reconnects) → tag applied only once
- Webinar host joins → my handler filters by `participant_user_type` or webinar owner email

---

## Once you paste creds, I'll do:

1. Add env vars to `.env.local`
2. Create/fetch `ZOOM_JOIN_URL` field ID, add to env
3. Build `src/lib/zoom.ts`
4. Extend `src/app/api/subscribe/route.ts` with Zoom registration step
5. Build `src/app/api/zoom-webhook/route.ts` with challenge + attended-tag handler
6. Push commit + push to Vercel
7. Add same env vars to Vercel Environment Variables
8. Trigger redeploy
9. End-to-end test with `@numi-test.local` contact
10. Update AC B1-B4 templates to use `%ZOOM_JOIN_URL%` merge tag
