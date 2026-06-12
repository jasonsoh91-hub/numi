# Claude Code Build Prompt
# NUMI — Lead Magnet Landing Page (Full Rebuild)

---

## OVERVIEW & CONTEXT

You are rebuilding the NUMI lead magnet landing page from scratch using the existing project stack.

- **Page route:** `/lead-magnet`
- **File to edit/replace:** `src/app/lead-magnet/page.tsx`
- **Success page:** `src/app/lead-magnet/success/page.tsx` (leave untouched unless told otherwise)
- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS
- **Animation library:** Framer Motion (already installed)
- **Icons:** Lucide React (already installed)

**Brand constraint — CRITICAL:**
> Never use the word "numerology" anywhere on this page. Not in copy, not in comments, not in alt text, not in aria labels, not in meta tags. The system is referred to only as "Pattern Code" or "Core Number."

**Tone of the page:**
> Grounded, intelligent, quietly cosmic. Not salesy. Not woo-woo. A sceptic should be able to read this and not cringe. Think: "intelligent self-awareness tool" not "spiritual oracle."

---

## TECH REQUIREMENTS

- All animations via **Framer Motion** — use `motion.div`, `useInView`, `useScroll`, `useTransform`
- Use **`useReducedMotion()`** hook to disable animations for accessibility
- Form data saved to **`localStorage`** as key `numiLeadMagnet` (object: `{ name, email, birthdate }`) and also pushed into `numiLeads` array
- After form submit, redirect to `/lead-magnet/success`
- Import and use existing utilities:
  - `calculateCoreNumber()` from `@/lib/calculateCoreNumber`
  - `getNumberContent()` from `@/lib/numerology-content`
- Use **`next/font`** or existing font setup — do not change typography base
- Page must be **responsive**: mobile-first, looks excellent on 375px wide up to 1440px
- No `<form>` HTML element — use `div` + `onClick` handlers instead

---

## GLOBAL VISUAL LANGUAGE

### Color Palette
```
Background (deep):     #0A0E27
Background (section):  #0F0F23
Background (alt):      #0a0d1a
Gold primary:          #D8B86A
Gold light:            #F4D47A
Gold glow:             rgba(216, 184, 106, 0.15)
Text white:            #FFFFFF
Text muted:            rgba(255,255,255,0.6)
Text faint:            rgba(255,255,255,0.35)
Blue tint:             rgba(59, 130, 246, 0.08)
Purple tint:           rgba(139, 92, 246, 0.06)
Border subtle:         rgba(255,255,255,0.08)
Border gold:           rgba(216, 184, 106, 0.25)
```

### Typography Scale
```
Hero headline:     text-4xl md:text-6xl lg:text-7xl, font-light, tracking-tight, leading-tight
Section headline:  text-3xl md:text-4xl, font-light
Sub-headline:      text-lg md:text-xl, text muted (0.7 opacity)
Body:              text-base md:text-lg, text muted (0.65 opacity), leading-relaxed
Label/eyebrow:     text-xs, tracking-widest, uppercase, gold color
Button:            text-sm md:text-base, tracking-wide
```

### Spacing Rhythm
- Section padding: `py-24 md:py-32`
- Container max width: `max-w-5xl mx-auto px-6 md:px-10`
- Tight container (for centered text blocks): `max-w-2xl mx-auto`

### Shared Visual Motifs
- **Gold horizontal rule dividers** — `1px solid rgba(216,184,106,0.2)`, max-width 120px, centered, used between sections
- **Ambient glow blobs** — absolutely positioned, blurred radial circles in gold/purple, `pointer-events-none`, `z-0`
- **All content** sits above background at `relative z-10`
- **Vignette overlay** — fixed, full-page, `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)`, `pointer-events-none`, `z-10`

---

## SCROLL PROGRESS BAR

**Position:** Fixed top of page, `z-50`
**Style:**
- Full width bar, height `2px`
- Background track: `rgba(255,255,255,0.08)`
- Fill color: linear gradient left-to-right `#D8B86A → #F4D47A`
- Width driven by `useScroll()` → `useTransform(scrollYProgress, [0,1], ['0%','100%'])`
- No border radius on the bar itself — clean line

---

## FLOATING PARTICLES BACKGROUND

A full-page fixed layer behind everything (`position: fixed`, `inset-0`, `z-0`, `pointer-events-none`).

**Particles:**
- Display the numbers: `1`, `3`, `5`, `7`, `9`, `11`, `22`, `33`
- Each number is a `<span>` with:
  - Font size: random between `10px` and `22px`
  - Color: `rgba(216, 184, 106, 0.12)` to `rgba(216, 184, 106, 0.06)`
  - Font weight: 300
  - Position: `absolute`, randomised `top` and `left` percentages (seed them so they don't cluster)
- Animation per particle (Framer Motion, loop `repeat: Infinity`, `repeatType: 'reverse'`):
  - `y`: drifts ±20px to ±40px over 8–15s
  - `opacity`: fades between 0.04 and 0.14
  - `duration`: stagger each particle differently
- Use `useReducedMotion` — if true, render particles static with no animation

---

## SECTION 1 — HERO

### Layout
Full viewport height (`min-h-screen`), flex column centered, `position: relative`, overflow hidden.

### Background
- Base: `#0A0E27`
- Import and render `<AnimatedShaderBackground />` (already exists at component path) — fills the hero only, `absolute inset-0 z-0`
- On top of it: a radial gradient overlay `radial-gradient(ellipse at 50% 60%, rgba(216,184,106,0.07) 0%, transparent 70%)`

### Content Stack (centered, `z-10`, `relative`)

**1. Pre-headline label**
- Text: `A FREE GUIDE FROM NUMI`
- Style: `text-xs tracking-[0.3em] uppercase`, gold color `#D8B86A`, opacity 0.8
- Animation: fade in + slide up 12px, delay 0.1s, duration 0.7s

**2. Main Headline**
- Line 1: `Your Parents Gave You A Name.`
- Line 2: `Your Birthdate Gave You A Pattern.`
- Style: `text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]`, white
- Line 2 has a subtle gold gradient applied: `background: linear-gradient(90deg, #D8B86A, #F4D47A)`, `background-clip: text`, `-webkit-text-fill-color: transparent`
- Animation: each line fades in + slides up 20px, staggered 0.15s apart, starting delay 0.3s

**3. Subheadline**
- Two sentences displayed as a paragraph block
- Text: `Hidden inside the numbers of your birthdate is a code — a set of patterns that show up in how you make decisions, why certain relationships feel effortless and others drain you, and why you keep hitting the same walls.`
- Line break, then: `Most people spend years trying to fix the symptoms. NUMI helps you read the pattern underneath.`
- Style: `text-lg md:text-xl`, `max-w-xl mx-auto text-center`, `rgba(255,255,255,0.65)`, `leading-relaxed`
- Animation: fade in, delay 0.7s

**4. Book Mockup**
- Render `<StaticBookMockup />` component centered
- Wrap in a `motion.div` with:
  - Entry: fade in + scale from 0.92, delay 0.5s
  - Idle float: `y: [0, -8, 0]`, `duration: 4`, `repeat: Infinity`, `ease: 'easeInOut'`
- Surrounding glow: `box-shadow: 0 0 60px rgba(216,184,106,0.15)` on the wrapper div
- Render this **between** the subheadline and the CTA button

**5. CTA Button**
- Text: `Decode My Pattern →`
- Style:
  - Background: `linear-gradient(135deg, #D8B86A, #C4A055)`
  - Text: `#0A0E27` (dark, not white)
  - Padding: `px-8 py-4`
  - Border radius: `rounded-full`
  - Font: `text-sm tracking-widest uppercase font-medium`
  - Hover: `brightness(1.1)` + slight `scale(1.03)` via Framer Motion `whileHover`
  - Active: `scale(0.97)` via `whileTap`
- On click: smooth scroll to form section (use `scrollIntoView({ behavior: 'smooth' })` on a ref)
- Animation: fade in + slide up, delay 1.0s

**6. Micro-trust copy**
- Text: `Free · Takes 30 seconds · No experience needed`
- Style: `text-xs tracking-widest`, `rgba(255,255,255,0.35)`, centered, `mt-4`
- Animation: fade in, delay 1.2s

**7. Scroll indicator**
- A small animated chevron or down-arrow icon (Lucide `ChevronDown`) at the very bottom center of the hero
- Animation: bounces up and down continuously (`y: [0, 8, 0]`, `duration: 1.5`, `repeat: Infinity`)
- Color: `rgba(216,184,106,0.4)`
- Disappears after user scrolls past hero (use `useScroll` to track)

---

## SECTION 2 — WHAT IS THE PATTERN CODE?

### Purpose
This is the most critical section. It **must not be cut or shortened.** It answers "what is this?" before the visitor asks.

### Layout
- Background: `#0F0F23`
- Centered text block, `max-w-2xl mx-auto`, `py-24`
- Left-side accent: a vertical gold line `2px wide`, `60px tall`, centered horizontally above the section label (like a decorative element before the eyebrow text)

### Content

**Eyebrow label:**
- Text: `WHAT IS THE PATTERN CODE?`
- Style: gold, `text-xs tracking-[0.3em] uppercase`, centered, `mb-6`

**Body paragraphs (render each as its own `<p>` with `mb-5`):**
1. `Every birthdate contains a set of numbers. NUMI reduces those numbers down to a single Core Number — your Pattern Code.`
2. `It's not a personality quiz. It's not a horoscope.` — style this line differently: `font-light text-xl md:text-2xl text-white` (make it stand out as a bold clarifier)
3. `It's a framework for understanding the recurring themes in your life: how you're wired to lead, love, struggle, and grow.`
4. `Your Pattern Code has been there since birth. Most people just haven't learned to read it yet.`

**Visual accent — number reveal element:**
- Below the last paragraph, centered, render a row of 3 faded digits
- Style: `text-6xl font-extralight tracking-[0.5em]`, `rgba(216,184,106,0.15)`, centered
- Show three sample digits, e.g., `3  ·  7  ·  11`
- These are purely decorative — no interactivity

### Animation
- Section enters viewport → all text fades in + slides up 24px, staggered 0.1s per paragraph
- The decorative number row fades in last with a slight scale up from 0.9

---

## SECTION 3 — BENEFITS

### Layout
- Background: `#0A0E27`
- `py-24 md:py-32`
- Max width `max-w-4xl mx-auto`

### Header
**Eyebrow:** `WHAT YOU'LL DISCOVER INSIDE` — gold, small, uppercase, tracked, centered

**Headline:** `In 10 minutes, you'll understand things about yourself that took years to notice.`
- Style: `text-3xl md:text-4xl font-light text-white`, `max-w-2xl mx-auto text-center`
- `mt-4 mb-16`

### Benefit Cards (5 items)
Render as a **vertical stack on mobile**, **2-column grid on md+** (last item centered if odd):

Each card:
- Background: `rgba(255,255,255,0.03)`
- Border: `1px solid rgba(216,184,106,0.12)`
- Border radius: `rounded-2xl`
- Padding: `p-6 md:p-8`
- On hover: border becomes `rgba(216,184,106,0.3)`, background `rgba(216,184,106,0.04)` — smooth `transition-all duration-300`

Card internal layout:
- **Icon area (top):** A small gold diamond `✦` in `text-xl`, `#D8B86A`
- **Benefit title** (bold part): `text-white font-medium text-base md:text-lg`
- **Benefit body** (after the dash): `rgba(255,255,255,0.55) text-sm md:text-base leading-relaxed mt-2`

**The 5 benefits:**
1. Title: `Why you keep repeating the same patterns` / Body: `in work, relationships, and decisions — and what your Core Number reveals about the root cause`
2. Title: `The hidden tension in your wiring` / Body: `why some of your greatest strengths create your biggest frustrations`
3. Title: `How your Core Number shapes your energy` / Body: `why certain environments and people light you up, and others quietly deplete you`
4. Title: `The number breakdown behind your birthdate` / Body: `a clear, step-by-step read of what each digit contributes to your pattern`
5. Title: `What NUMI sees in your numbers` / Body: `a preview of the deeper insights waiting in your full reading`

### Animation
Cards animate in using `useInView` — each card fades in + slides up 20px, staggered by 0.08s per card, threshold `0.15`

---

## SECTION 4 — BEFORE / AFTER

### Layout
- Background: `#0F0F23`
- `py-24 md:py-32`
- `max-w-5xl mx-auto`
- On mobile: stacked vertically (Before on top, After below)
- On md+: two columns side by side, equal width, with a thin vertical divider `1px solid rgba(255,255,255,0.08)` between them

### Eyebrow (centered, above both columns)
`TWO WAYS TO MOVE THROUGH LIFE` — gold, small, tracked, uppercase, `mb-12`

### Before Column

**Column header:**
- Text: `Without your Pattern Code`
- Style: `text-lg font-light text-white opacity-60`, `mb-6`
- Small icon: `X` circle (Lucide `XCircle`) in `rgba(255,100,100,0.5)`, `16px`, inline before text

**List items (5):**
- No icon — just a subtle `–` dash prefix in `rgba(255,255,255,0.3)`
- Text: `rgba(255,255,255,0.5)`, `text-sm md:text-base leading-relaxed`
- Items:
  1. Feeling like you're working hard but running in circles
  2. Taking on roles and relationships that don't quite fit — but not knowing why
  3. Mistaking your patterns for personality flaws
  4. Trying to fix the surface without seeing the structure beneath
  5. Wondering why certain things always seem harder for you than for others

### After Column

**Column header:**
- Text: `With your Pattern Code`
- Style: `text-lg font-light text-white`, `mb-6`
- Small icon: `CheckCircle` (Lucide) in `#D8B86A`, `16px`, inline before text

**List items (5):**
- Icon: `✓` in `#D8B86A`
- Text: `rgba(255,255,255,0.8)`, `text-sm md:text-base leading-relaxed`
- Items:
  1. Seeing your recurring themes for what they actually are — information, not failure
  2. Understanding why you're wired the way you are — without judgment
  3. Recognising which environments and relationships align with your pattern
  4. Knowing where your energy naturally flows — and where it's being leaked
  5. A language for yourself that finally makes sense

### Animation
- Section enters viewport: Before column slides in from left, After column slides in from right, both fade in simultaneously, `duration: 0.6s`
- Each list item within each column staggers in at `0.07s` intervals after the column animates in

---

## SECTION 5 — TESTIMONIALS

### Layout
- Background: `#0A0E27`
- `py-24 md:py-32`

### Header
**Eyebrow:** `WHAT PEOPLE ARE SAYING` — gold, small, tracked, uppercase, centered

**Headline:** `Real people. Real patterns. Real shifts.`
- Style: `text-3xl md:text-4xl font-light text-white text-center`
- `mb-16`

### Testimonial Cards (render 3)
Use the existing `<TestimonialsSection />` component if it already handles this. If reimplementing manually:

Each card:
- Background: `rgba(255,255,255,0.03)`
- Border: `1px solid rgba(255,255,255,0.08)`
- Border radius: `rounded-2xl`
- Padding: `p-8`
- Layout: 1 column mobile, 3 columns on lg+

Card structure:
- **Opening quote mark:** `"` rendered large, `text-5xl font-light`, `#D8B86A opacity-30`, `mb-4`
- **Quote text:** `text-sm md:text-base leading-relaxed rgba(255,255,255,0.7) italic`
- **Attribution:** `text-xs tracking-wide rgba(255,255,255,0.4) mt-6` — Name + Core Number (e.g., `Sarah K. · Core Number 7`)
- **Stars (optional):** 5 gold stars `★★★★★` in `#D8B86A opacity-60`, `text-xs`, above the quote

**Sample testimonials to use (rewrite in tone if needed):**

1. Quote: `"I was sceptical. I'm not really into this kind of thing. But the breakdown of my Core Number described something I've never been able to put into words about myself. It was uncomfortable in the best way."` / Attribution: `Sarah K. · Core Number 7`

2. Quote: `"I kept wondering why I'd lose momentum right when things were going well. Seeing it laid out as a pattern — not a flaw — genuinely changed how I approached my work."` / Attribution: `Marcus T. · Core Number 4`

3. Quote: `"It's not magic. It's more like a mirror. I use my Pattern Code the same way I'd use a Myers-Briggs result — except this one actually stuck."` / Attribution: `Priya M. · Core Number 3`

### Animation
Cards fade in + scale from 0.95, staggered `0.12s`, `useInView` threshold `0.1`

---

## SECTION 6 — OPT-IN FORM

This is the conversion section. It must feel trustworthy and calm — not high-pressure.

### Layout
- Background: `#0F0F23`
- `py-24 md:py-32`
- Form container: `max-w-lg mx-auto`
- Outer wrapper has a subtle gold border: `1px solid rgba(216,184,106,0.2)`, `rounded-3xl`, `p-8 md:p-12`
- Outer wrapper background: `rgba(216,184,106,0.03)`
- Outer glow behind the card: `box-shadow: 0 0 80px rgba(216,184,106,0.08)`

### Header (above form)
**Eyebrow:** `GET YOUR FREE PATTERN CODE GUIDE` — gold, small, tracked, uppercase, centered, `mb-4`

**Headline:** `Enter your birthdate. We'll show you the pattern.`
- Style: `text-2xl md:text-3xl font-light text-white text-center`
- `mb-3`

**Subheadline:** `Your Core Number is calculated directly from the numbers in your birthdate — no birth time, no location needed. Just the date.`
- Style: `text-sm rgba(255,255,255,0.5) text-center leading-relaxed`
- `mb-10`

### Form Fields (use `div` NOT `<form>`)

**Field: First Name**
- Label: `First Name` — `text-xs tracking-wide rgba(255,255,255,0.5) uppercase mb-2`
- Input style:
  - Background: `rgba(255,255,255,0.05)`
  - Border: `1px solid rgba(255,255,255,0.1)`
  - On focus: border becomes `rgba(216,184,106,0.5)`, subtle gold glow `box-shadow: 0 0 0 3px rgba(216,184,106,0.08)`
  - Text: white, `text-base`
  - Placeholder: `rgba(255,255,255,0.25)`
  - Border radius: `rounded-xl`
  - Padding: `px-4 py-3.5`
  - Full width
- Placeholder text: `What should we call you?`

**Field: Email**
- Label: `Email Address`
- Same styling as First Name
- Placeholder: `Where should we send it?`
- Validation: must contain `@` — if invalid show inline error below field: `text-xs text-red-400 mt-1`

**Field: Birthdate**
- Label: `Date of Birth`
- Same input styling
- Placeholder: `DD / MM / YYYY`
- Below field micro-copy: `Your birthdate is used only to calculate your Core Number. We don't store or share it.`
  - Style: `text-xs rgba(255,255,255,0.3) mt-2 text-center`
- Validation: must be a valid date format DD/MM/YYYY — show inline error if invalid

**Submit Button**
- Text: `Reveal My Pattern Code →`
- Full width: `w-full`
- Background: `linear-gradient(135deg, #D8B86A, #C4A055)`
- Text: `#0A0E27` dark
- Padding: `py-4`
- Border radius: `rounded-2xl`
- Font: `text-sm tracking-widest uppercase font-semibold`
- Loading state: replace text with a subtle spinner (Lucide `Loader2` with `animate-spin`) + text `Calculating your pattern...`
- `whileHover`: `brightness(1.08) scale(1.02)`
- `whileTap`: `scale(0.98)`
- Disabled state (while loading): `opacity-70 cursor-not-allowed`

**Trust Badges (below button)**
- `mt-6 flex items-center justify-center gap-4`
- Three badges: `🔒 Free`, `No spam`, `Instant access`
- Style: `text-xs rgba(255,255,255,0.35) tracking-wide`
- Separated by `·`

### Form Logic
```typescript
// On submit:
// 1. Validate all fields
// 2. Set loading state true
// 3. Simulate 1.2s delay (setTimeout) for "calculating" feel
// 4. Save to localStorage:
const lead = { name, email, birthdate, timestamp: Date.now() }
localStorage.setItem('numiLeadMagnet', JSON.stringify(lead))
const leads = JSON.parse(localStorage.getItem('numiLeads') || '[]')
leads.push(lead)
localStorage.setItem('numiLeads', JSON.stringify(leads))
// 5. Redirect to /lead-magnet/success
router.push('/lead-magnet/success')
```

### Animation
- Form card slides up 30px + fades in on viewport enter, `duration: 0.7s`
- Each field animates in staggered `0.08s` after card enters

---

## SECTION 7 — FINAL CTA

### Layout
- Background: `#0A0E27`
- `py-24 md:py-32`
- Centered, `max-w-2xl mx-auto`

### Visual
- Behind the text: a large ambient radial glow blob
  - `position: absolute`, centered, `width: 600px height: 400px`
  - `background: radial-gradient(ellipse, rgba(216,184,106,0.08) 0%, transparent 70%)`
  - `blur(40px)`, `pointer-events-none`

### Content

**Decorative divider above:** gold horizontal rule, `max-w-[80px] mx-auto mb-16`

**Headline (two lines):**
- Line 1: `Maybe you're not lost.`
- Line 2: `Maybe you just haven't learned to read the pattern yet.`
- Style: `text-3xl md:text-5xl font-light text-white text-center leading-[1.2]`
- Line 2 gets the gold gradient text treatment (same as hero line 2)

**Body:**
`The guide is free. The insight is yours to keep.`
- Style: `text-base md:text-lg rgba(255,255,255,0.5) text-center mt-6 mb-10`

**CTA Button:**
- Text: `Get My Pattern Code — It's Free →`
- Same styling as hero CTA button
- On click: smooth scroll to form section

### Animation
- All content fades in + slides up on viewport enter
- The headline lines stagger at `0.12s`

---

## FOOTER

### Layout
- Background: `#0a0d1a`
- `py-10 px-6`
- Flex column centered, `gap-4`

### Content

**NUMI logo/wordmark** (text-based if no SVG available):
- `NUMI` in `text-xl tracking-[0.4em] uppercase font-extralight text-white opacity-50`

**Disclaimer text:**
`NUMI is a self-reflection tool designed to support personal awareness and growth. It does not provide medical, psychological, financial, or professional advice. Pattern Code results are intended for introspective use only.`
- Style: `text-xs rgba(255,255,255,0.25) text-center max-w-md mx-auto leading-relaxed`

**Copyright:**
`© 2025 NUMI. All rights reserved.`
- Style: `text-xs rgba(255,255,255,0.2)`

---

## SCROLL-TRIGGERED PARALLAX DETAILS

Use `useScroll` + `useTransform` for the following subtle effects:

1. **Hero headline** — as user scrolls down, the headline translates upward slightly: `y: [0, -30]` over scroll range `[0, 0.2]`
2. **Section background blobs** — each section's ambient glow blob shifts `y` by ±15–20px as user scrolls through it
3. **Book mockup in hero** — scales down slightly from `1.0` to `0.94` as user scrolls out of hero

These should be subtle. If any effect feels jarring or heavy, reduce the range by 50%.

---

## RESPONSIVE BREAKPOINTS SUMMARY

| Element | Mobile (< 768px) | Desktop (≥ 768px) |
|---|---|---|
| Hero headline | text-4xl, stacked lines | text-6xl lg:text-7xl |
| Subheadline | text-base | text-xl |
| Book mockup | Scaled to 75% | Full size |
| Benefits grid | 1 column | 2 columns |
| Before/After | Stacked | 2 columns side by side |
| Testimonials | 1 column | 3 columns |
| Form container | px-4, full bleed | max-w-lg, card style |
| Section padding | py-16 | py-24 md:py-32 |

---

## META / SEO

Add to the page `<head>` using Next.js `metadata` export:

```typescript
export const metadata = {
  title: 'Discover Your Pattern Code — Free Guide from NUMI',
  description: 'Your birthdate contains a pattern. NUMI\'s free guide breaks it down into your Core Number — and shows you what it means.',
  openGraph: {
    title: 'Discover Your Pattern Code — Free Guide from NUMI',
    description: 'Your birthdate contains a pattern. NUMI\'s free guide breaks it down into your Core Number.',
  }
}
```

---

## COMPONENTS TO IMPORT / REUSE

```typescript
import { StaticBookMockup } from '@/components/StaticBookMockup'
import { AnimatedShaderBackground } from '@/components/AnimatedShaderBackground'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { calculateCoreNumber } from '@/lib/calculateCoreNumber'
import { getNumberContent } from '@/lib/numerology-content'
```

If any of these components do not exist at those paths, check the actual component directory and import from the correct path. Do not recreate them — find and reuse them.

---

## WHAT NOT TO DO

- ❌ Do not use the word "numerology" anywhere — not in code comments, copy, aria-labels, or meta
- ❌ Do not use `<form>` HTML element — use `div` with onClick handlers
- ❌ Do not add localStorage / sessionStorage for anything other than the lead capture logic above
- ❌ Do not add any external API calls — this page is fully client-side
- ❌ Do not use inline styles unless Tailwind cannot achieve the effect
- ❌ Do not make the page feel "busy" — when in doubt, add whitespace, not elements
- ❌ Do not add cookie banners, popups, or exit-intent modals
- ❌ Do not change the success page (`/lead-magnet/success/page.tsx`) unless explicitly asked

---

## FINAL CHECKLIST (verify before considering done)

- [ ] Scroll progress bar visible and working
- [ ] Floating number particles visible but subtle (not distracting)
- [ ] Hero CTA scrolls to form
- [ ] Final CTA scrolls to form
- [ ] Book mockup floats gently on idle
- [ ] Form validates all three fields before submit
- [ ] Form shows loading state for 1.2s
- [ ] localStorage saves correctly as `numiLeadMagnet` and into `numiLeads` array
- [ ] Redirect to `/lead-magnet/success` after submit
- [ ] All animations respect `useReducedMotion`
- [ ] Page looks correct at 375px (iPhone SE width)
- [ ] Page looks correct at 1440px (desktop)
- [ ] No console errors
- [ ] Word "numerology" does not appear anywhere in the file
