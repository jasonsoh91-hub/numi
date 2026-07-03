# NUMI Email Automation — ActiveCampaign Build Guide

Paste-ready copy for 20 emails across 5 automations.
All merge fields converted to AC personalization tags.
Webinar date: **Tuesday, July 21, 2026 · 8:00 PM PDT (Los Angeles)**.

---

## 0 · Prep in AC (one-time setup)

### 0.1 Lists (already exist)
- `Pattern Code — Lead Magnet` (ID 4)
- `Webinar — Decode Your Life Pattern` (ID 5)

### 0.2 Custom fields (already exist)
- `BIRTHDAY` (personalization tag `%BIRTHDAY%`, field ID 2)

### 0.3 Tags to create (Contacts → Manage Tags → New Tag)
| Tag | Applied when |
|---|---|
| `lead-magnet-downloaded` | auto on subscribe to list 4 |
| `webinar-registered` | auto on subscribe to list 5 |
| `webinar-attended` | manual after live session OR via Zoom/GoToWebinar integration |
| `webinar-no-show` | auto if `webinar-registered` AND NOT `webinar-attended` 24h after event |
| `tier1-purchased` | on purchase (via Stripe/Checkout integration or manual) |

### 0.4 Replace links per email
Search-and-replace before saving each email in AC:

| Placeholder | Replace with |
|---|---|
| `{{ebook_link}}` | Direct URL to Pattern Code PDF, e.g. `https://numi-website.vercel.app/The%20Pattern%20Code%20NUMI%20Self-Discovery%20Guide%20(Flyer%20(A4))%20(1).pdf` |
| `{{register_link}}` | Your live webinar page, e.g. `https://numi-website.vercel.app/preview-event-v4` |
| `{{join_link}}` | Zoom/GoToWebinar unique join link (dynamic per contact — use platform integration) |
| `{{calendar_link}}` | `https://calendar.google.com/calendar/render?action=TEMPLATE&text=NUMI+Masterclass+-+Decode+Your+Life+Pattern&details=A+free+60-minute+live+NUMI+masterclass.+Bring+your+birth+date.&dates=20260722T030000Z/20260722T040000Z` |
| `{{replay_link}}` | Set after recording upload |
| `{{offer_link}}` | Tier 1 checkout, e.g. `https://numi-website.vercel.app/offer` (build later) |
| `{{support_email}}` | `support@numi-intl.ai` (or your support address) |

---

## 1 · Automation Flow Map

```
┌──────────────────────────────────────────────────────────────────┐
│  AUTOMATION #1 — A-Sequence: Pattern Code Nurture                │
│  Trigger: Subscribes to list "Pattern Code" (ID 4)               │
│  Also: Apply tag `lead-magnet-downloaded`                        │
│  → A1 send immediately                                           │
│  → wait 1 day → A2                                               │
│  → wait 1 day → A3                                               │
│  → IF-ELSE: tag `webinar-registered` present?                    │
│     • YES → exit (Automation #2 takes over)                      │
│     • NO  → wait 1 day → A4                                      │
│              → wait 1 day → A5                                   │
│              → wait 1 day → A6                                   │
│              → end                                               │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  AUTOMATION #2 — B-Sequence: Webinar Confirm + Reminders         │
│  Trigger: Subscribes to list "Webinar" (ID 5)                    │
│  Also: Apply tag `webinar-registered`                            │
│  → B1 send immediately                                           │
│  → wait until 2026-07-20 08:00 PDT → B2 (24h before)             │
│  → wait until 2026-07-21 19:00 PDT → B3 (1h before)              │
│  → wait until 2026-07-21 20:00 PDT → B4 (at start)               │
│  → end                                                           │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  AUTOMATION #3 — C-Sequence: No-Show Replay                      │
│  Trigger: Enters segment (`webinar-registered` AND NOT           │
│           `webinar-attended`)                                    │
│  Start date: 2026-07-21 22:00 PDT (2hr after webinar end)        │
│  → C1 send immediately                                           │
│  → wait 46 hours → C2 (~48h after event)                         │
│  → end                                                           │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  AUTOMATION #4 — D-Sequence: Attendee Upsell                     │
│  Trigger: Tag `webinar-attended` applied                         │
│  Exit condition: Tag `tier1-purchased` applied → jump to Auto #5 │
│  → wait 2 hours → D1                                             │
│  → wait 22 hours → D2                                            │
│  → wait 1 day → D3                                               │
│  → wait 1 day → D4                                               │
│  → wait 1 day → D5                                               │
│  → wait 1 day → D6                                               │
│  → wait 1 day → D7                                               │
│  → end                                                           │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  AUTOMATION #5 — E-Sequence: Tier 1 Onboarding                   │
│  Trigger: Tag `tier1-purchased` applied                          │
│  → E1 send immediately                                           │
│  → end                                                           │
└──────────────────────────────────────────────────────────────────┘
```

**AC dashboard path:** Automations → Create New → Start From Scratch → pick trigger → drag "Send email" and "Wait" nodes.

---

# SEQUENCE A — Pattern Code Nurture (list 4)

## A1 · Welcome + Ebook Delivery

**Send:** Immediately
**Subject:** Your Pattern Code is inside 👇
**Alt subject:** Welcome, %FIRSTNAME% — here's your copy of *The Pattern Code*
**Preview text:** Find your number first — then read what it's been quietly running.

Hi %FIRSTNAME%,

Welcome — you're in good company. Here's what you came for:

**→ [Open your Pattern Code]({{ebook_link}})**

*The Pattern Code* is a short, beautiful read built around one idea: the way you think, love, earn, and decide isn't random. It traces back to a single number in your birth date — and once you can see it, a lot of things about yourself stop feeling like a mystery.

Here's how to get the most out of it in the next five minutes:

1. **Add up your birth date** down to a single number, 1 through 9.
2. **Find your number** in the guide — your archetype, from the Initiator to the Visionary.
3. **Read the three parts:** when you're *aligned*, when you're *out of balance*, and the roles you naturally grow into.

Most people read their own number and go quiet for a second. That little "…huh" is the point — it's the first time something you've always *felt* about yourself finally has a name.

Over the next few days I'll send you a couple of short notes to help you read it more deeply — including the one layer the book leaves out on purpose.

For now: go find your number.

— The NUMI Team

P.S. Read it on a screen if you can. The artwork for each number is worth seeing properly.

---

## A2 · Deep-Dive: The Two Sides of Your Number

**Send:** +1 day after A1
**Subject:** Your superpower has a shadow, %FIRSTNAME%
**Alt subject:** The flip side of your number
**Preview text:** The thing you're proudest of and the thing that trips you up? Same number.

Hi %FIRSTNAME%,

Did you notice that your number in *The Pattern Code* has two faces?

That's the part most people skim past — and it's the part that hits hardest once you slow down.

Every number runs in two directions:

- The **1** is a natural leader — until it's out of balance, and leading turns into steamrolling.
- The **2** reads what a room is feeling — until it loses itself trying to keep everyone happy.
- The **8** was built to carry weight and build big — until the pressure quietly runs the show.

Here's the wow: **the trait you're proudest of and the thing that keeps tripping you up are usually the same number — just pointed in different directions.** Your gift and your blind spot share a root.

So here's a small, honest exercise. Re-open the book, find your number, and read the *"when you're out of balance"* lines slowly. Don't flinch. Ask: *where is this showing up in my life right now?*

**→ [Re-open The Pattern Code]({{ebook_link}})**

One thing the book can't tell you: *whether you're living the aligned side or the out-of-balance side right now isn't random either.* It tracks with the season you're currently in — and reading that season is a whole different skill. We'll get to it. (We actually teach people to read it live — more on that soon.)

For today, just sit with the two sides of your number.

— The NUMI Team

---

## A3 · Deep-Dive: The People Around You

**Send:** +1 day after A2
**Subject:** It's not just you, %FIRSTNAME%
**Alt subject:** Read your number for the people around you
**Preview text:** Why you click with some people and clash with others — it has a shape.

Hi %FIRSTNAME%,

Here's something funny about *The Pattern Code.*

People read their own number first… and then, almost instantly, they think of someone else. Their partner. Their mother. The boss they can never quite figure out. The kid who is *nothing* like them.

That's not a coincidence. The Pattern Code isn't only about you — it's the hidden grammar of why people click and why they clash.

Think about it through the book:

- A **4 (the Builder)** who needs structure and a plan, living alongside a **5 (the Explorer)** who needs freedom and movement. Neither is wrong. They're just running different code.
- A **2 (the Connector)** who feels everything, trying to be understood by a **7 (the Analyst)** who lives in their head.

The wow here: **the friction in your closest relationships usually isn't about character. It's about pattern.** And the moment you can see the pattern, you stop taking it personally — and you start handling it on purpose.

Try it: pull the birth date of one person who both matters to you *and* frustrates you. Find their number in the book. Read their two sides. See if it explains anything.

**→ [Open the book again]({{ebook_link}})**

Soft heads-up: reading the dynamics *between* two birth dates — live, in real time — is the part of our masterclass nobody sees coming. If that's where your curiosity is going, you're reading my mind. I'll show you the door in a day or two.

— The NUMI Team

---

## A4 · Bridge to Webinar: Who You Are vs. Your Season

**Send:** +1 day after A3 (only if NOT tagged `webinar-registered`)
**Subject:** Your number is only the beginning, %FIRSTNAME%
**Alt subject:** The one layer the book leaves out
**Preview text:** The ebook showed you *who* you are. This shows you *what season you're in.*

Hi %FIRSTNAME%,

By now you've read your number, sat with its two sides, and maybe even decoded someone close to you. So let me tell you the one thing the book leaves out on purpose.

Your number explains your **wiring** — who you are. It doesn't explain your **timing** — what season you're standing in right now.

And timing is usually the thing people were actually missing. It's why the same kind of partner keeps showing up. The same kind of boss. The same money ceiling you can't seem to break, no matter how the details change. That isn't bad luck and it isn't a flaw in you — it's a pattern set the day you were born, running quietly underneath every year since.

On **Tuesday, July 21**, we're running a live 60-minute masterclass — *Decode Your Life Pattern.* Using nothing but your birth date, you'll walk away with:

- **The exact loop** your number has been running — the moment you see it, a lot of things click
- **Why "trying harder" keeps backfiring** when you push against your own timing
- **The cycle you're in right now** — whether this is a year to build or a year to reset
- **The rest of 2026 and your next 12 months, mapped**

No fortune-telling. No vague "find your purpose" talk. Just a clear, practical read on what's been driving the repeats — and the moves worth making from here.

Your seat costs nothing, but the room is kept small on purpose so real birth dates can get read live.

**→ [Save my seat for July 21]({{register_link}})**

— The NUMI Team

P.S. You don't need to know a thing about numbers to follow along. You bring your birth date and an open mind; we handle the rest.

---

## A5 · The Loop: Why Trying Harder Backfires

**Send:** +1 day after A4
**Subject:** "I'd recreated the same dynamic three times"
**Alt subject:** Half of 2026 is gone, %FIRSTNAME%
**Preview text:** It's not for lack of effort. It's the pattern.

Hi %FIRSTNAME%,

A woman named Aisha came to one of our sessions right after quitting a job she was sure was the problem. Then she saw it on the screen: she'd recreated the exact same dynamic three times, at three different companies. Same loop, new logo.

She told us it was the first time any of it made sense — and the first time she stopped blaming herself and started making different choices.

I'm telling you this because half of 2026 is already behind us, and if you're being honest, some part of your year may be running the same loop it ran last year. Not because you didn't try. You've probably tried harder than anyone knows. That's exactly the trap: **when you push against your own timing, effort works against you.**

The book showed you your number. The masterclass shows you the *loop* your number has been running — and the one shift that changes what happens from here.

**Tuesday, July 21 · 8:00 PM PDT (Los Angeles) · 60 minutes, live.**

**→ [Claim my seat]({{register_link}})**

You don't have to figure this out alone, and you don't have to let the back half of the year be a rerun.

— The NUMI Team

P.S. Come live if you possibly can. The part where real birth dates get read in the room never makes it into a recording — and it's the part people say changes everything.

---

## A6 · Last Call to Register

**Send:** +1 day after A5
**Subject:** Closing the room soon, %FIRSTNAME%
**Alt subject:** Last call for July 21
**Preview text:** Seats are capped so birth dates can actually be read.

Hi %FIRSTNAME%,

Last note about this one — the **July 21 masterclass** room is filling, and we cap it on purpose. Once the seats for the live read are gone, they're gone this cycle. There's no second session scheduled.

If you've been circling this, here's the one-line reason to come: you'll see the specific pattern your birth date has been repeating, the season you're in right now, and what to actually do about it for the back half of this year.

**→ [Hold my seat before it fills]({{register_link}})**

Bring your birth date and an open mind. That's the whole prep list.

— The NUMI Team

P.S. Can't make the live time? Register anyway and we'll send the replay — but grab your spot now while the room's still open.

---

# SEQUENCE B — Webinar Confirm + Reminders (list 5)

## B1 · Registration Confirmation

**Send:** Immediately on list 5 subscribe
**Subject:** You're confirmed for the NUMI Masterclass ✅
**Preview text:** Tuesday, July 21. Save your join link. Bring your birth date.

Hi %FIRSTNAME%,

You're in. Here's everything you need:

**📅 Decode Your Life Pattern — Live Masterclass**
**Tuesday, July 21, 2026 · 8:00 PM PDT (Los Angeles) · 60 minutes**

**→ [Add it to your calendar]({{calendar_link}})**
**→ Your private join link:** {{join_link}}

Three things to do now so you don't miss it:

1. **Add the calendar invite** above — block a full 60 minutes, uninterrupted.
2. **Save this email.** Gmail users: if this landed in *Promotions*, drag it to *Primary* so your join link doesn't get buried.
3. **Have your birth date ready.** That's all you bring. You don't need to know a single thing about numbers — we explain everything in plain English as we go.

One thing worth knowing: around 70% of people who register for a session like this don't actually show up. The ones who do are the ones whose next 12 months tend to look different. We kept the room small so birth dates can be read live — and that part never makes it into a replay.

See you on the 21st.

— The NUMI Team

P.S. Didn't mean to register, or need to move to another session? Just reply to this email and we'll sort it out.

---

## B2 · Reminder · 24 Hours Out

**Send:** 2026-07-20 08:00 PDT (schedule via AC "Wait Until Date" node)
**Subject:** Tomorrow: your pattern, read live
**Alt subject:** %FIRSTNAME%, we go live tomorrow
**Preview text:** One birth date. One realization. A different next year.

Hi %FIRSTNAME%,

Tomorrow's the day.

**Decode Your Life Pattern — Tuesday, July 21 · 8:00 PM PDT (Los Angeles)**
**→ [Your join link]({{join_link}})**

Two-minute prep so you get the most out of it:

- **Write down your birth date** — full day, month, year.
- **Jot down the one thing** that keeps repeating in your life. The pattern that won't quit. You'll understand exactly *why* it repeats tomorrow.
- **Block the hour.** This is one of those rooms where the difference between watching and *being there* is the whole thing.

We read real birth dates from the room — and one of them could be yours. First hands up get a personal read.

See you tomorrow.

— The NUMI Team

P.S. Can't make it live anymore? Reply and we'll make sure you get the replay. Just know the live read is the part people say changes everything.

---

## B3 · Reminder · 1 Hour Out

**Send:** 2026-07-21 19:00 PDT
**Subject:** We're live in 1 hour ⏳
**Preview text:** Grab your birth date and your join link — let's go.

Hi %FIRSTNAME%,

One hour to go. Here's your link so it's not buried when we start:

**→ [Join the masterclass]({{join_link}})**

**Starts: 8:00 PM PDT today**

Before we begin:
- Birth date — ready ✅
- Somewhere quiet to focus for 60 minutes ✅
- An open mind ✅

That's it. See you in there, %FIRSTNAME%.

— The NUMI Team

---

## B4 · We're Live Now

**Send:** 2026-07-21 20:00 PDT
**Subject:** 🔴 We're live — come on in, %FIRSTNAME%
**Preview text:** Doors are open. Your seat is waiting.

Hi %FIRSTNAME%,

We've started. Your seat is held — slip in now and you won't miss the live reads:

**→ [Enter the room]({{join_link}})**

Bring your birth date. See you inside.

— The NUMI Team

---

# SEQUENCE C — No-Show Replay

**Segment:** contacts tagged `webinar-registered` AND NOT `webinar-attended`.
**Automation start:** 2026-07-21 22:00 PDT (2h after event end).

## C1 · Replay + Re-Invite

**Send:** Immediately when entered segment (~2026-07-21 22:00 PDT)
**Subject:** You missed it — here's the replay, %FIRSTNAME%
**Alt subject:** Sorry we missed you (the recording's inside)
**Preview text:** Watch it before it comes down — your pattern is in here.

Hi %FIRSTNAME%,

Life happened — no judgment. You had a seat for *Decode Your Life Pattern* and didn't make it, so here's the next best thing:

**→ [Watch the replay]({{replay_link}})**

Carve out 60 quiet minutes and have your birth date in front of you. Even on the recording, the moment you see the loop your number has been running, a lot of things stop feeling random.

A few things you'll take away:

- The specific pattern set the day you were born — and why the same situations keep circling back
- Why "trying harder" works against you when you're fighting your own timing
- The rest of 2026, mapped to the cycle you're actually in

One thing the replay *can't* give you was the live birth-date reads in the room — that's why, if a future live session opens, I'd grab it.

Watch while it's up.

— The NUMI Team

P.S. The replay doesn't stay up forever. If your pattern matters to you, today's the day to press play.

---

## C2 · Replay Closing (Last Call)

**Send:** +46 hours after C1 (~2026-07-23 20:00 PDT)
**Subject:** Coming down soon, %FIRSTNAME%
**Preview text:** Last window to watch the masterclass replay.

Hi %FIRSTNAME%,

Quick heads-up: the *Decode Your Life Pattern* replay comes down shortly, and we don't have another live session scheduled this cycle.

If the last six months felt like a rerun, this is the 60 minutes that explains why — and shows you a different way to play the back half of the year.

**→ [Watch before it closes]({{replay_link}})**

Birth date in hand. One sitting. That's all it takes.

— The NUMI Team

P.S. At the end, your host shares how to go deeper with NUMI — including a founding-member opportunity that's only open to this group. Worth staying to the end for.

---

# SEQUENCE D — Attendee Upsell (7 emails)

**Trigger:** Tag `webinar-attended` applied.
**Exit:** Tag `tier1-purchased` applied → automation ends (Automation #5 fires).

## D1 · Recap + Founding Offer

**Send:** +2 hours after `webinar-attended` tag
**Subject:** What to do with what you just saw, %FIRSTNAME%
**Alt subject:** Your pattern, the next step
**Preview text:** You saw the loop. Here's how to actually work with it.

Hi %FIRSTNAME%,

Thank you for being in the room today. I hope the moment you saw your pattern landed the way it lands for most people — that quiet "*so that's what it's been.*"

Here's the honest truth about today: 60 minutes was enough to *see* the pattern. It wasn't enough to *master* it. Seeing the loop is the breakthrough. Learning to read it across your relationships, your money, your timing, and your decisions — that's the work that actually changes the next 12 months.

That's exactly what the **3-Day Full Training** is built for:

- **Read your own numbers in depth** — life, decisions, and direction, not just your headline number
- **Learn the timing** of the cycle you're in, so you stop pushing hard at the wrong moment
- **Walk out with a personal map** for the rest of 2026 and beyond

As a thank-you for showing up live, you've unlocked the **founding-member opportunity**:

- ~~$2,999~~ → **$1,499 today**
- A **Sigil Gold Card** for founding members, plus future member bonuses
- A spot in the very first cohort

Spots in this first batch are limited, and this price is for people who were in the room today.

**→ [Claim your founding spot]({{offer_link}})**

— The NUMI Team

P.S. No pressure and no hard sell — that was the promise, and it stands. But if today gave you a "yes" you could feel, the founding window is the time to act on it.

---

## D2 · What's Inside the 3 Days

**Send:** +22 hours after D1 (~1 day after webinar)
**Subject:** "Will this actually work for me?"
**Preview text:** The honest answer, plus what the 3 days really cover.

Hi %FIRSTNAME%,

The question I hear most after a masterclass is some version of: *"I saw my pattern — but can I actually do something with it?"*

Fair question. Here's the straight answer.

The masterclass showed you *that* you have a pattern. The **3-Day Full Training** teaches you to *read it yourself* — so you're not waiting on anyone to interpret your life for you. By the end of three days you can:

- **Decode any birth date** — your own, and the people whose patterns keep colliding with yours
- **Name the cycle** you're in and the one that's coming, so your big decisions land in the right season
- **Map the rest of 2026** into "build now," "hold," and "reset" windows
- **Spot your out-of-balance triggers** before they run the show

It's three days because depth takes more than an hour — and depth is the difference between an interesting read and a year that actually moves.

Founding members also receive the **Sigil Gold Card** and future member bonuses, and lock the first-cohort price of **$1,499** (normally $2,999).

**→ [Join the first cohort]({{offer_link}})**

— The NUMI Team

P.S. This is a tool for self-reflection and better decisions — not prediction, and not a substitute for professional advice. What it gives you is a clearer way to see your own timing. That's usually all people were missing.

---

## D3 · "I Don't Have Time"

**Send:** +1 day after D2
**Subject:** Three days you don't have, %FIRSTNAME%?
**Alt subject:** The real math on the 3 days
**Preview text:** Compare three days to how long the loop has already cost you.

Hi %FIRSTNAME%,

If part of you wants in but keeps landing on *"I don't have three days right now"* — I want to gently push on that.

Here's the real math. The loop you saw on the masterclass didn't start this year. It's been quietly costing you time for a long while — the same arguments, the same second-guessing, the same decisions made twice because the first one was made in the wrong season.

Three focused days against years of running the same pattern blind isn't really a time cost. It's the thing that *buys time back.*

And practically: the training is built to fit a real life. You bring your birth date, a couple of birth dates of people who matter to you, and one real question you want clarity on. We do the work *on your actual life* — so you're not studying theory, you're untangling the thing that's been stuck.

The founding window — **$1,499** and the first-cohort bonuses — is still open.

**→ [Make the three days count]({{offer_link}})**

— The NUMI Team

P.S. "I'll do it next year" is the exact sentence the pattern wants you to say. You felt that in the room today.

---

## D4 · Stories From the Room

**Send:** +1 day after D3
**Subject:** The skeptic and the reset
**Alt subject:** "I came in rolling my eyes"
**Preview text:** Two people who didn't expect this to land — and what changed.

Hi %FIRSTNAME%,

Two quick stories from people who sat exactly where you're sitting.

**Marcus came in skeptical.** He'd done the "find your purpose" thing before and rolled his eyes at it. This was different, he said — it didn't tell him who to be. It showed him the timing he'd been fighting, and suddenly the last five years made sense.

**Priya came in spiraling** after a big life change she was reading as failure. The work reframed it as a phase in her cycle — a reset, not a dead end. She walked away with an actual plan for the year instead of dread.

Notice what both of them have in common: they didn't become different people. They finally *saw what was already running underneath* — and then they could choose their next move on purpose. That's the whole thing the **3-Day Full Training** is built to give you, in depth, on your own numbers.

Founding price of **$1,499** and the first-cohort bonuses are still open.

**→ [Step in like they did]({{offer_link}})**

— The NUMI Team

P.S. The skeptics tend to get the most out of this. A little doubt means you're actually paying attention.

---

## D5 · Two Futures

**Send:** +1 day after D4
**Subject:** The choice is yours, %FIRSTNAME%
**Alt subject:** Two versions of next year
**Preview text:** Same patterns, or a different next six months.

Hi %FIRSTNAME%,

I want to lay out the fork in the road plainly, because it's the same one you saw in the room.

**Stay where you are.** Continue with the same patterns. Same questions, same struggles, same money ceiling. The back half of 2026 looks a lot like the front half. There's a kind of comfort in it — it's familiar — but it's the comfort of the loop.

**Or step into clarity.** Learn to read your own blueprint. Make decisions that fit the season you're in. Move toward what you actually want with the quiet confidence of someone who can finally see the road.

Both are real choices. Both have a cost. One of them just keeps charging you quietly, year after year.

You don't have to figure everything out alone anymore. The **3-Day Full Training** is where the seeing becomes doing.

**→ [Choose the second future]({{offer_link}})**

— The NUMI Team

P.S. Founding price **$1,499** (normally $2,999), with the Sigil Gold Card and first-cohort bonuses — for people who were in the room.

---

## D6 · Founding-Member Status + Gold Card

**Send:** +1 day after D5
**Subject:** What "founding member" actually gets you
**Alt subject:** The Sigil Gold Card, %FIRSTNAME%
**Preview text:** Some things you can only get by being early.

Hi %FIRSTNAME%,

A quick word on a part of this that's easy to overlook: **being in the first cohort isn't just a discount. It's a status you can only get once.**

Founding members of the 3-Day Full Training receive:

- The **Sigil Gold Card** — our founding-member card, with future member bonuses attached to it as they roll out
- **First-cohort pricing** locked at **$1,499** (it returns to $2,999 after this batch)
- A seat in the **very first group** to go through the full training — the smallest, most personal cohort there will ever be

After the first batch fills, the next opening isn't scheduled, and founding status closes with it. You can always join NUMI later. You can't join it *first* later.

**→ [Become a founding member]({{offer_link}})**

— The NUMI Team

P.S. To be clear, the Gold Card is a founding-member token and bonus channel — not a promise of luck or returns. The real value is the training and being early. The card is the keepsake that says you were.

---

## D7 · Doors Close Tonight

**Send:** +1 day after D6 (last email of D-sequence)
**Subject:** Closing tonight, %FIRSTNAME%
**Alt subject:** Last call — founding price ends
**Preview text:** After this, it's $2,999 and no scheduled cohort.

Hi %FIRSTNAME%,

This is the last one.

The founding window for the **3-Day Full Training** closes tonight. After that, the first cohort is full, the price returns to **$2,999**, and the next opening isn't on the calendar.

So it comes back to the question from the room: are you ready to understand your code, or is this another "maybe next year"?

If it's a yes — even a quiet one — now's the moment.

**→ [Claim my founding spot before it closes]({{offer_link}})**

You saw the pattern today. This is the step that does something about it.

— The NUMI Team

P.S. Founding members keep the Sigil Gold Card and first-cohort bonuses. Once tonight passes, that's it for this round.

---

# SEQUENCE E — Tier 1 Onboarding

**Trigger:** Tag `tier1-purchased` applied.

## E1 · Onboarding / Welcome

**Send:** Immediately
**Subject:** Welcome to the first cohort, %FIRSTNAME% 🎉
**Preview text:** You're in. Here's exactly what happens next.

Hi %FIRSTNAME%,

Welcome in — and congratulations. You're officially a **founding member** of the NUMI 3-Day Full Training. This is the moment the pattern goes from something you *see* to something you can *read and work with* for the rest of your life.

Here's what happens next:

1. **Your access details** are on their way in a separate email — keep an eye out and save it.
2. **Your training dates and times** are inside that email. Block all three days now; depth happens when you're fully present.
3. **Bring your birth date** — and the birth dates of two or three people who matter to you. Reading patterns *between* people is where a lot of the magic shows up.
4. **Come with one real question.** The thing you most want clarity on this year. We'll work it through your numbers across the three days.

A little homework before Day 1: open *The Pattern Code* again and re-read your number now that you've seen it live. It reads differently the second time.

Your founding bonuses — the **Sigil Gold Card** and first-cohort perks — will be confirmed inside your member welcome. We'll take care of all of it.

If anything's unclear, just reply to this email or reach us at {{support_email}}. A real person will get back to you within one business day.

You took the step most people circle for years. I'm genuinely glad you're in.

— The NUMI Team

P.S. Add {{support_email}} to your contacts so none of your training emails slip into spam. You won't want to miss a thing over the three days.

---

# Post-Setup Checklist

- [ ] All 5 tags created in AC (`lead-magnet-downloaded`, `webinar-registered`, `webinar-attended`, `webinar-no-show`, `tier1-purchased`)
- [ ] All 7 URL placeholders replaced (ebook, register, join, calendar, replay, offer, support_email)
- [ ] Automation #1 (A-Sequence) built + activated on list 4 trigger
- [ ] Automation #2 (B-Sequence) built + activated on list 5 trigger with fixed dates
- [ ] Automation #3 (C-Sequence) built + start-condition segment configured
- [ ] Automation #4 (D-Sequence) built + `tier1-purchased` exit condition set
- [ ] Automation #5 (E-Sequence) built on `tier1-purchased` trigger
- [ ] Zoom/GoToWebinar integration wired to auto-apply `webinar-attended` after live session
- [ ] Test each automation with a `@numi-test.local` contact end-to-end before going live
- [ ] Verify sender domain SPF/DKIM/DMARC pass in AC → Settings → Deliverability

# Deliverability Notes

- AC needs authenticated sender domain. Configure in Settings → Advanced → Sender Domain Authentication before sending. Unauthenticated sends hit spam.
- Warm the list: send B1 confirmations at natural pace (real registrations). Don't blast the full A-sequence to cold imports on day 1 — split across 3-4 days for a fresh AC account.
- Physical address footer (CAN-SPAM/CASL) — AC auto-appends from your account settings. Confirm address is set at Settings → Contacts → Physical Address.
