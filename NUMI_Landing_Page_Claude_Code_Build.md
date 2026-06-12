# NUMI Landing Page Build Brief for Claude Code

## 1. Project Objective

Build a premium, high-converting lead magnet landing page for **NUMI**, an AI-powered human intelligence and self-discovery app.

The page captures first name, email, and birthdate, calculates the user’s **Core Number**, and positions the free guide / app experience as the next step toward receiving a personal Pattern Insight.

This brief is based on the current NUMI landing page copy and structure exported from the existing page.

---

## 2. Overall Positioning

**Core message:**

> The most revealing thing about you is not your personality. It is your pattern.

**Brand logic:**

NUMI uses a number intelligence methodology and AI-powered interpretation to help users understand patterns in thinking, relationships, earning, decision-making, growth, and recurring life themes.

**Tone:**

Premium, intelligent, emotionally resonant, modern, calm, and grounded.

**Important:**

This must **not** look like fortune-telling, tarot, horoscope, Feng Shui, Chinese numerology, or mystical spiritual branding. It should feel like a modern AI self-reflection product.

---

## 3. Visual Direction

Use **realistic premium editorial photography with subtle digital overlays**.

Do not use overly abstract AI bodies, glowing anatomy, cosmic fantasy, or obviously AI-generated human faces.

### Visual Style

- Realistic human photography
- Sophisticated women aged 28–45 as primary audience representation
- Deep navy / black background system
- Champagne gold and soft gold highlights
- Silver typography
- Subtle electric blue AI/data accents
- Soft cinematic lighting
- Natural skin texture and expressions
- Realistic hands and eyes
- Minimal, elegant AI overlays: birthdate numbers, pattern lines, Core Number interface, data trails

### Avoid

- Plastic skin
- Unrealistic hands / extra fingers
- Distorted eyes
- Fantasy glow
- Floating magical symbols
- Tarot / astrology / zodiac / horoscope cues
- Feng Shui / religious / crystal imagery
- Cheap numerology aesthetics
- Overly perfect synthetic people

---

## 4. Suggested Tech Stack

Assume a Next.js + Tailwind implementation.

Recommended:

- Next.js App Router
- React client component for the form
- Tailwind CSS
- Framer Motion for subtle scroll/fade animations
- `lucide-react` for simple icons
- Optional: `next/image` for optimized images

Suggested route:

```txt
/app/lead-magnet/page.tsx
```

or use the existing route:

```txt
/app/lead-magnet-mv/page.tsx
```

---

## 5. SEO Metadata

```ts
export const metadata = {
  title: 'Discover The Hidden Code In Your Birthdate — Free Guide from NUMI',
  description:
    "Beneath your personality and habits is a structural pattern encoded in your date of birth. NUMI's free guide reveals your Core Number — and changes how you see yourself.",
  keywords: [
    'NUMI',
    'self-discovery',
    'human intelligence',
    'pattern recognition',
    'Core Number',
    'birthdate patterns',
    'personal growth',
    'AI self-discovery',
  ],
};
```

---

## 6. Design Tokens

```ts
const colors = {
  cosmicBlack: '#070A14',
  deepNavy: '#0A0E27',
  sectionNavy: '#0F0F23',
  gold: '#D8B86A',
  goldBright: '#F4D47A',
  champagne: '#E6C987',
  silver: '#D9DEE8',
  electricBlue: '#3B82F6',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.72)',
  textMuted: 'rgba(255,255,255,0.48)',
};
```

### Typography

Use:

- Serif display font for major headlines, e.g. Cormorant Garamond / Playfair Display / Fraunces
- Clean sans-serif for body copy, e.g. Inter

Headline style:

```txt
Large, elegant, light weight, high contrast, generous line height.
```

Body style:

```txt
Readable, 16–20px, max-width controlled, line-height 1.65–1.8.
```

---

## 7. Landing Page Sections and Copy

### Section 1: Hero Section

**Section ID:** `hero`

**Eyebrow:**

Discover the hidden code of your birthdate — free

**Headline:**

The Most Revealing Thing About You Isn’t Your Personality. It’s Your Pattern.

**Body Copy:**

What if the reason you feel stuck isn't lack of effort — it's that no one ever showed you the map?

You’ve grown. You’ve worked on yourself. You’ve read the books, done the journaling, maybe even the therapy.

And still — certain patterns persist. The same relationship dynamics. The same career ceiling. The same inner conflict you can’t quite resolve.

Here’s what most self-development tools miss: beneath your personality, beneath your habits, beneath your mindset — there’s a structural pattern encoded in something as simple as your date of birth.

NUMI calls it your Core Number. And once you see it, you can’t unsee it.

**Primary CTA:**

Unlock My Core Number — It’s Free →

**Support / Microcopy:**

Free · Instant access · Thousands of people have already discovered theirs

**Visual Direction:**

Realistic editorial portrait of a sophisticated woman interacting with a subtle Core Number interface.

---

### Section 2: Discovery Section

**Section ID:** `discovery`

**Eyebrow:**

THE DISCOVERY THAT CHANGES EVERYTHING

**Headline:**

You don’t need to change who you are. You need to understand how you’re designed.

**Body Copy:**

Most people spend their entire lives trying to change who they are.

NUMI is built on a different premise: you don’t need to change who you are. You need to understand how you’re designed.

Every date of birth contains a sequence of numbers. Those numbers reduce to a single value — your Core Number. It’s not a personality label. It’s not a spiritual belief system. It’s a structural map of how you process decisions, how you relate to others, and why certain patterns in your life repeat regardless of how much inner work you do.

This isn’t a new idea. Ancient civilisations across multiple continents independently discovered that the numbers present at a person’s birth carry meaning. What NUMI has done is build a modern, precise framework for reading that meaning — and put it in your hands for free.

Your Core Number has been operating in your life since the day you were born. Today, you get to read it.

**Primary CTA:**

None

**Support / Microcopy:**

Decorative number line: 3 · 7 · 11 · 22

**Visual Direction:**

Realistic transition image: confusion to clarity, with subtle pattern map projection.

---

### Section 3: What Awaits You Inside

**Section ID:** `benefits`

**Eyebrow:**

WHAT AWAITS YOU INSIDE

**Headline:**

In the next 10 minutes, you’ll see yourself more clearly than you have in years.

**Body Copy:**

1. The pattern beneath your patterns — your Core Number reveals the structural code driving your recurring decisions, relationships, and life themes. Not what you do. Why you keep doing it.

2. Your unique genius — and your unique friction — every Core Number carries both extraordinary strengths and a specific internal tension. Understanding both is the beginning of working with yourself instead of against yourself.

3. Why you’re drawn to certain people and repelled by others — your Core Number shapes your relational field. Once you see it, your closest relationships become easier to understand — and easier to navigate.

4. The energy map of your life — where you naturally generate momentum, and where you reliably lose it. Most people fight their energy map. Extraordinary people learn to read it.

5. The first step to living by design, not default — your Core Number is a foundation, not a ceiling. The guide ends with what’s possible when you build from this understanding.

**Primary CTA:**

None

**Support / Microcopy:**

None

**Visual Direction:**

Five realistic insight cards on a dark navy surface, with minimal icons and UI-style labels.

---

### Section 4: Two Versions of Your Life

**Section ID:** `default-design`

**Eyebrow:**

TWO VERSIONS OF YOUR LIFE

**Headline:**

Living by default vs living by design

**Body Copy:**

Living by default
– Working hard — but on the wrong things, for your particular wiring
– Growing — but in directions that don’t align with your Core Number’s natural momentum
– Attracting the same dynamics into your relationships without understanding why
– Treating your deepest recurring struggles as personal failures
– Doing everything right on the surface — and still feeling like something essential is missing

Living by design
✓ Understanding the structural code that has always been running beneath your choices
✓ Channelling your energy into directions that align with how you’re actually designed
✓ Recognising the pattern in your relationships — and choosing more consciously within it
✓ Turning your Core Number’s natural tension into your greatest source of growth
✓ Building a life that fits you — not a generic template for human flourishing

**Primary CTA:**

None

**Support / Microcopy:**

None

**Visual Direction:**

Realistic split-scene comparison, same woman overloaded vs clear and aligned.

---

### Section 5: Testimonials

**Section ID:** `testimonials`

**Eyebrow:**

WHAT PEOPLE ARE EXPERIENCING

**Headline:**

From people who were already doing the work — and found the missing piece.

**Body Copy:**

Lena F. · Core Number 11
“I’ve invested significantly in my personal growth — courses, coaching, retreats. My Core Number gave me something I’d never had before: a single organising principle that made everything else click. I wish I’d had this ten years ago.”
★★★★★

Marcus J. · Core Number 4
“I kept wondering why, despite all the growth work I’d done, a specific pattern in my career kept recurring. My Core Number described that pattern exactly — and gave me a framework for understanding it instead of fighting it. That shift alone was worth everything.”
★★★★★

Priya A. · Core Number 7
“NUMI doesn’t replace any of the other tools I use. It sits underneath them. It’s the foundation I didn’t know I was missing.”
★★★★★

**Primary CTA:**

None

**Support / Microcopy:**

Use testimonial copy only if legally approved / genuinely collected.

**Visual Direction:**

Premium review cards with subtle real portrait silhouettes, not fake stocky smiles.

---

### Section 6: Lead Capture Form

**Section ID:** `form`

**Eyebrow:**

YOUR FREE PATTERN CODE GUIDE IS WAITING

**Headline:**

You’ve done the work. Now read the map.

**Body Copy:**

Enter your birthdate and we’ll calculate your Core Number — the single most revealing thing your date of birth contains. The full breakdown is waiting for you on the other side.

Fields:
First Name
Email
Birthdate: DD / MM / YYYY

Privacy note: Your birthdate is used only to calculate your Core Number. We don’t store or share it.

**Primary CTA:**

Calculate My Core Number — Free →

**Support / Microcopy:**

🔒 Free · No spam · Instant access

**Visual Direction:**

Realistic phone/product shot showing NUMI signup form and birthdate to Core Number preview.

---

### Section 7: Final Close

**Section ID:** `final`

**Eyebrow:**

None

**Headline:**

This is the guide you didn’t know you needed. And it costs you nothing to find out.

**Body Copy:**

The pattern has always been there.
The only thing missing was someone to show you how to read it.

Thousands of people have already discovered their Core Number. Some called it the missing piece. Some said it explained the decade they couldn’t. Some just said: finally.

Your turn takes 30 seconds.

**Primary CTA:**

Unlock My Core Number — It’s Free →

**Support / Microcopy:**

None

**Visual Direction:**

Realistic woman near window / sunrise with subtle pattern reflection.

---

### Section 8: Footer

**Section ID:** `footer`

**Eyebrow:**

NUMI

**Headline:**

None

**Body Copy:**

NUMI is a self-reflection tool designed to support personal awareness and growth. It does not provide medical, psychological, financial, or professional advice. Pattern Code results are intended for introspective use only.

© 2025 NUMI. All rights reserved.

**Primary CTA:**

None

**Support / Microcopy:**

None

**Visual Direction:**

Minimal footer background with subtle dark gradient, gold linework, and low-opacity number particles.

---

## 8. Form Behaviour

### Fields

- First Name
- Email
- Birthdate in `DD / MM / YYYY` format

### Validation

- First name required
- Email required and must match email pattern
- Birthdate required
- Birthdate must be valid date
- User must be at least 13 years old if required by your policy

### Core Number Calculation

1. Strip all non-digits from birthdate.
2. Add all digits.
3. If result is greater than 9, reduce by adding digits again.
4. Continue until final value is 1–9.

Example:

```txt
24 / 08 / 1992
2 + 4 + 0 + 8 + 1 + 9 + 9 + 2 = 35
3 + 5 = 8
Core Number = 8
```

### TypeScript helper

```ts
export function calculateCoreNumber(dateString: string): number | null {
  const digits = dateString.replace(/\D/g, '');
  if (digits.length !== 8) return null;

  let sum = digits
    .split('')
    .map(Number)
    .reduce((acc, n) => acc + n, 0);

  while (sum > 9) {
    sum = String(sum)
      .split('')
      .map(Number)
      .reduce((acc, n) => acc + n, 0);
  }

  return sum;
}
```

### On Submit

For now:

- prevent default
- validate fields
- calculate Core Number
- show success state / redirect to result or thank-you page

Later integration:

- Connect to email marketing platform / CRM
- Pass first name, email, birthdate, and calculated Core Number
- Redirect to guide delivery or app download page

---

## 9. Image Asset Plan

Use realistic images. Suggested filenames:

```txt
/public/images/numi/hero-real-woman-core-number.jpg
/public/images/numi/pattern-reflection.jpg
/public/images/numi/core-number-phone-ui.jpg
/public/images/numi/insight-cards.jpg
/public/images/numi/default-vs-design.jpg
/public/images/numi/testimonial-cards.jpg
/public/images/numi/form-phone-signup.jpg
/public/images/numi/final-window-horizon.jpg
```

### Image Prompts

#### hero

Create a realistic premium editorial photograph for NUMI, an AI-powered self-discovery app. Show a sophisticated woman aged around 30–40 in a calm modern interior at night, looking thoughtfully at a soft glowing digital interface showing subtle birthdate numbers, pattern lines, and one highlighted Core Number. She should look intelligent, grounded, and emotionally reflective, not mystical. Use realistic skin texture, natural expression, elegant wardrobe, deep navy and black tones, soft champagne gold highlights, and subtle electric blue interface accents. The image should feel like premium lifestyle photography with a refined AI overlay. Leave clean negative space for landing page headline and CTA. Avoid obvious AI-generated faces, plastic skin, unrealistic hands, extra fingers, distorted eyes, fantasy glow, floating magical symbols, overdone particles, tarot, astrology, zodiac, horoscope, Feng Shui, crystals, religious imagery, fortune-telling aesthetics, cartoon style, and overly perfect synthetic people.


#### pattern

Create a realistic premium editorial image of a thoughtful woman sitting alone in a modern apartment or studio, reflecting quietly near a window. Around her, add very subtle transparent digital pattern lines showing repeated life loops, relationship paths, career pathways, and decision patterns. The overlays should be minimal and elegant, not magical. Use soft cinematic lighting, deep navy shadows, warm gold highlights, and a calm premium mood. The image should communicate self-awareness, recurring life patterns, and emotional depth. Make it look like real photography, not fantasy or obvious AI art. Avoid plastic skin, unrealistic hands, distorted faces, tarot, horoscope, crystals, mystical symbolism, or cheap numerology aesthetics.


#### core-number

Create a realistic premium close-up photograph of a person’s hands using a sleek smartphone or tablet displaying a clean NUMI-style interface. The screen shows a birthdate being calculated into a single Core Number using elegant minimal UI elements. Add subtle number particles and data lines only on the screen, not floating excessively in the environment. Use deep navy background, silver text, champagne gold highlights, and subtle electric blue accents. The image should feel like a real app/product moment, premium, modern, trustworthy, and easy to understand. Avoid distorted hands, extra fingers, fake-looking UI, mystical symbols, tarot, horoscope, or obvious AI-generated look.


#### benefit-cards

Create a premium realistic landing page visual showing five elegant insight cards on a dark navy surface. Each card represents one self-discovery theme: recurring patterns, personal strengths and friction, relationship dynamics, energy map, and living by design. Use clean minimal icons, soft gold lines, silver typography, and subtle electric blue data accents. The cards should look like a premium AI-generated personal insight report, photographed realistically with soft shadows and cinematic lighting. Avoid mystical, tarot, horoscope, or fantasy styling.


#### default-vs-design

Create a realistic premium split-scene editorial photograph showing the same woman in two life states. On the left, she is seated at a desk looking tired and mentally overloaded, with subtle blurred loops and repeated decision paths around her. On the right, she stands confidently in a calm modern space, looking clear and aligned, with a subtle glowing path and structured pattern map behind her. Keep both sides realistic, elegant, and emotionally mature. Use deep navy, black, champagne gold, and subtle electric blue accents. The concept should show living by default versus living by design, without looking fantasy-like or overly dramatic. Avoid obvious AI-generated faces or distorted hands.


#### testimonials

Create a realistic premium editorial visual for a testimonial section showing three elegant review cards on a dark navy background, with subtle soft-focus human portraits in the background. Add minimal gold star ratings, refined quote marks, and gentle blue data lines. The image should feel trustworthy, premium, warm, and human, like a high-end app landing page. Avoid stock-photo clichés, exaggerated smiles, obvious AI-generated faces, or mystical symbolism.


#### form

Create a realistic premium product-style image showing a smartphone displaying a clean NUMI signup form with fields for first name, email, and birthdate. A soft glowing Core Number preview appears below the birthdate field. The phone is held naturally by a woman in a calm modern environment. Use realistic hands, natural lighting, deep navy UI, champagne gold highlights, silver typography, and subtle electric blue accents. The mood should feel safe, simple, instant, and trustworthy. Avoid overly futuristic, mystical, cluttered, or fake-looking visuals.


#### closing

Create a realistic premium editorial photograph of a woman standing near a large window at sunrise or soft evening light, looking outward with a calm sense of clarity and possibility. Add very subtle transparent pattern lines and number particles reflected on the glass, as if she is finally seeing the map that was always there. Use warm champagne light, deep navy shadows, soft gold highlights, and minimal electric blue accents. The image should feel hopeful, intelligent, refined, and deeply personal. Avoid fantasy, religious, mystical, tarot, horoscope, or fortune-telling visuals.


---

## 10. Component Structure

Recommended components:

```txt
LeadMagnetPage
├── ProgressBar
├── HeroSection
├── DiscoverySection
├── BenefitsSection
├── DefaultVsDesignSection
├── TestimonialsSection
├── LeadCaptureSection
├── FinalCTASection
└── Footer
```

Data arrays:

```ts
const benefits = [
  {
    title: 'The pattern beneath your patterns',
    copy: 'Your Core Number reveals the structural code driving your recurring decisions, relationships, and life themes. Not what you do. Why you keep doing it.',
  },
  {
    title: 'Your unique genius — and your unique friction',
    copy: 'Every Core Number carries both extraordinary strengths and a specific internal tension. Understanding both is the beginning of working with yourself instead of against yourself.',
  },
  {
    title: "Why you're drawn to certain people and repelled by others",
    copy: 'Your Core Number shapes your relational field. Once you see it, your closest relationships become easier to understand — and easier to navigate.',
  },
  {
    title: 'The energy map of your life',
    copy: 'Where you naturally generate momentum, and where you reliably lose it. Most people fight their energy map. Extraordinary people learn to read it.',
  },
  {
    title: 'The first step to living by design, not default',
    copy: "Your Core Number is a foundation, not a ceiling. The guide ends with what's possible when you build from this understanding.",
  },
];
```

---

## 11. Interaction and Animation Guidance

Keep animations subtle and premium.

Recommended:

- Page-load fade up for hero text
- Slow opacity/translateY reveal on sections
- Soft progress bar at top
- Gentle hover on CTA buttons
- No excessive parallax
- No spinning mystical symbols
- No aggressive motion

---

## 12. Mobile Requirements

The page must be built mobile-first.

### Mobile priorities

- Headline readable without excessive line breaks
- Hero image should not push CTA too far down
- Form fields must be large and thumb-friendly
- Testimonial cards should stack vertically
- Default vs Design section should stack vertically
- CTA buttons should be full-width on mobile

---

## 13. Compliance / Trust Notes

Add disclaimer in footer:

```txt
NUMI is a self-reflection tool designed to support personal awareness and growth. It does not provide medical, psychological, financial, or professional advice. Pattern Code results are intended for introspective use only.
```

Avoid claiming the tool can predict the future, guarantee success, diagnose personality, or replace therapy/coaching/professional advice.

Testimonials should only be used if approved / real. If not, replace with “sample user reactions” or remove names.

---

## 14. Acceptance Criteria

The finished page should:

- Match the existing copy structure
- Feel premium, realistic, and human
- Avoid obvious AI-generated visuals
- Clearly explain Core Number without sounding mystical
- Include a working lead form
- Calculate Core Number correctly from birthdate
- Work on mobile and desktop
- Use strong CTAs above the fold and near the form/final close
- Include footer disclaimer
- Preserve NUMI’s deep navy / gold / silver / electric blue identity

---

## 15. Claude Code Instruction

Build the page using the above structure. Preserve the copy unless improving grammar or responsiveness. Use image placeholders if assets are not yet available, but name the placeholder files according to the image asset plan. Keep all styling premium, minimal, and realistic. Prioritize readability, conversion, and mobile responsiveness.
