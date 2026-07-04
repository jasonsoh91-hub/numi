# AC Template IDs — NUMI Email Sequences

All 20 emails created as reusable templates in ActiveCampaign account `adamsanders881`.
Created 2026-07-03 via API.

**Find in AC dashboard:** Website → Templates → search "NUMI"

## Template Reference

| Code | AC Template ID | Template Name |
|---|---|---|
| A1 | 100033 | NUMI · A1 · Welcome + Ebook Delivery |
| A2 | 100034 | NUMI · A2 · Deep-Dive: Two Sides of Your Number |
| A3 | 100035 | NUMI · A3 · Deep-Dive: People Around You |
| A4 | 100036 | NUMI · A4 · Bridge to Webinar |
| A5 | 100053 | NUMI · A5 · The Loop |
| A6 | 100038 | NUMI · A6 · Last Call to Register |
| B1 | 100054 | NUMI · B1 · Registration Confirmation |
| B2 | 100055 | NUMI · B2 · Reminder 24h Out |
| B3 | 100056 | NUMI · B3 · Reminder 1h Out |
| B4 | 100042 | NUMI · B4 · We're Live Now |
| C1 | 100043 | NUMI · C1 · Replay + Re-Invite |
| C2 | 100044 | NUMI · C2 · Replay Closing |
| D1 | 100045 | NUMI · D1 · Recap + Founding Offer |
| D2 | 100046 | NUMI · D2 · What's Inside the 3 Days |
| D3 | 100047 | NUMI · D3 · "I Don't Have Time" |
| D4 | 100048 | NUMI · D4 · Stories From the Room |
| D5 | 100049 | NUMI · D5 · Two Futures |
| D6 | 100050 | NUMI · D6 · Founding-Member Status + Gold Card |
| D7 | 100051 | NUMI · D7 · Doors Close Tonight |
| E1 | 100052 | NUMI · E1 · Tier 1 Onboarding |

## URLs already substituted in templates

| Placeholder | Replaced with |
|---|---|
| `{{ebook_link}}` | `https://learn.numi-intl.ai/pattern-code.pdf` |
| `{{register_link}}` | `https://learn.numi-intl.ai/preview-event-v4` |
| `{{calendar_link}}` | Google Calendar link for July 21, 2026 8pm EST |
| `{{support_email}}` | `support@numi-intl.ai` |

## URLs still placeholder (edit in AC per template)

| Placeholder | Appears in | Action |
|---|---|---|
| `[ADD ZOOM JOIN LINK]` | B1, B2, B3, B4 | Replace with dynamic per-attendee link from Zoom/GoToWebinar |
| `[ADD REPLAY LINK]` | C1, C2 | Set after webinar recording uploaded |
| `[ADD OFFER LINK]` | D1-D7 | Set after Tier 1 checkout page built |

## Sender identity (edit before activation)

Templates were created without sender name/email — must set inside AC:
1. Open each template → **Settings** → set **From name** (e.g. `The NUMI Team`) + **From email** (must be authenticated in AC → Settings → Advanced → Sender Domain)

## How to wire into automations

In each automation (path: Automations → Create → Start from Scratch):
1. Add **Send an Email** node
2. Click **Design email** → in top-right, click **Import from Template** or **Change template**
3. Search "NUMI · A1" (or whichever code)
4. Select template → Save

Refer to `ac-automation-guide.md` section 1 (Automation Flow Map) for trigger and wait-node structure.
