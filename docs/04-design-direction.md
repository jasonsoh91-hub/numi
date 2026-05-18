# 04 — Design Direction: NUMI

## Design Objective

Create a premium, cinematic, mystical-AI landing page that sells the free Pattern Code lead magnet and bridges users into NUMI.

The page should feel like:
- A cosmic self-discovery experience.
- A premium AI product.
- A personal pattern decoding tool.
- A visually immersive but conversion-focused landing page.

It should not feel like:
- A generic SaaS landing page.
- A cheap astrology website.
- A meditation app clone.
- A cluttered spiritual blog.
- A basic PDF download page.

---

# Overall Visual Direction

## Style Keywords
- Dark cosmic.
- Premium.
- Cinematic.
- Mystical intelligence.
- AI neural pattern.
- Gold accents.
- Deep navy / black background.
- Purple glow.
- Constellation lines.
- Subtle numerology symbols.
- Human silhouette / energetic blueprint.
- Floating cards.
- High contrast CTA.
- Modern editorial typography.

## Design Mood
NUMI should feel like the user is entering a private, intelligent self-discovery chamber.

The visual metaphor:
**A person’s inner pattern map being decoded by AI.**

---

# Colour System

## Primary Background
- Deep black: `#050507`
- Cosmic navy: `#090D1A`
- Midnight blue: `#0B1020`

## Primary Accent
- Soft gold: `#D8B86A`
- Bright gold: `#F4D47A`
- Champagne: `#E9D8A6`

## Secondary Accent
- NUMI purple: `#8B5CF6`
- Electric violet: `#A78BFA`
- Deep indigo: `#312E81`

## Supporting Colours
- Soft white: `#F8F7F2`
- Muted silver: `#B7B7C6`
- Cool grey: `#6F7285`
- Border glow: `rgba(216, 184, 106, 0.24)`
- Purple glow: `rgba(139, 92, 246, 0.32)`

## Colour Usage
- Background: dark gradients.
- Headlines: soft white with selected gold highlights.
- CTA buttons: gold gradient or purple-to-gold gradient.
- Cards: translucent dark glass.
- Borders: subtle gold/purple glow.
- Icons: gold line icons.
- Secondary text: muted silver.

---

# Typography Direction

## Headline Style
Large, elegant, high-contrast, premium.

Recommended fonts:
- Serif option: Playfair Display, Cormorant Garamond, or Canela-like if available.
- Sans option: Inter, Satoshi, Neue Montreal, or Manrope.
- Hybrid: Serif headlines + clean sans body.

## Font Pairing Recommendation
- Headlines: `Cormorant Garamond` or `Playfair Display`.
- Body: `Inter` or `Manrope`.
- UI labels/buttons: `Inter` or `Manrope`.

## Headline Treatment
Use strong line breaks:
“Discover the Pattern  
Behind How You Think,  
Love, Earn & Decide”

Highlight keywords in gold:
- Pattern
- Think
- Love
- Earn
- Decide

## Body Copy Style
- Short paragraphs.
- Maximum 2–3 lines per paragraph.
- Avoid dense text.
- Use clear hierarchy with eyebrow labels, headlines, body, bullets, CTA.

---

# Layout Principles

## Page Width
- Max content width: 1200px.
- Hero max width: 1280px.
- Inner sections: 1080–1180px.

## Spacing
- Desktop section padding: 96px–140px vertical.
- Tablet section padding: 72px–96px vertical.
- Mobile section padding: 56px–72px vertical.
- Card spacing: 20px–32px.

## Grid
Use a strong grid system:
- Hero: 2-column layout on desktop, stacked on mobile.
- Problem section: 2-column old pattern / new insight.
- Pattern cards: 3-column desktop, 2-column tablet, 1-column mobile.
- Benefits: 3-column desktop or bento grid.
- FAQ: 2-column desktop or accordion list.

## Visual Hierarchy
Every section must have:
1. Eyebrow.
2. Headline.
3. Short body.
4. Visual or cards.
5. CTA where relevant.

---

# Hero Direction

## Hero Layout
Desktop:
- Left: copy and CTA.
- Right: lead magnet/product visual.

Mobile:
- Copy first.
- Visual second.
- CTA sticky or repeated after visual.

## Hero Visual Elements
- The Pattern Code cover mockup.
- Floating Core Number card.
- A glowing number from 1–9.
- AI constellation lines.
- Labels: Thinking, Love, Earning, Decisions, Success.
- Optional human silhouette or neural map.

## Hero Motion
- Slow glow pulse behind visual.
- Floating cards with subtle y-axis movement.
- Headline fade/slide up.
- CTA hover glow.
- Star field / particle effect should be subtle and not distracting.

---

# Components

## Buttons

### Primary Button
Style:
- Gold gradient background.
- Dark text.
- Rounded full or 16px radius.
- Subtle shadow/glow.
- Strong hover state.

Text:
- Get My Free Pattern Insight
- Find My Core Number
- Unlock My Pattern Code

### Secondary Button
Style:
- Transparent dark background.
- Gold/purple border.
- Soft white text.
- Hover border glow.

Text:
- See How It Works
- Explore the 9 Codes

## Cards

### Pattern Cards
Each Pattern Code card should include:
- Number.
- Archetype name.
- One-line statement.
- Short trait summary.
- Optional glowing background pattern.

Card style:
- Dark glassmorphism.
- Thin gold border.
- Subtle hover lift.
- Optional inner glow.

## Lead Magnet Preview
Create a premium PDF mockup:
- Cover image or recreated cover card.
- Page stack effect.
- Small “Free Guide” tag.
- CTA near preview.

## Form Design
Form should feel premium and simple:
- Dark glass card.
- 3 fields max.
- Clear labels.
- Large CTA.
- Privacy microcopy.
- Optional Core Number preview if birthdate can calculate instantly.

---

# Imagery Direction

## Primary Visual Motifs
- Cosmic human profile.
- Constellation lines.
- Numerical symbols.
- Gold particle streams.
- AI neural grid.
- Energy blueprint.
- Dark gradient backgrounds.
- Elegant digital cards.

## Avoid
- Cartoon zodiac icons.
- Cheap horoscope graphics.
- Overused crystal imagery.
- Too many stars.
- Excessive purple gradients.
- Stock meditation photos.
- Cluttered mystical symbols.
- Anything that looks like a scam reading website.

---

# Motion Direction

## Use Motion For
- Section entrance.
- Hero floating cards.
- Soft glow pulses.
- Pattern card reveal.
- FAQ accordion.
- CTA hover.
- Scroll-linked progress line.

## Do Not Use Motion For
- Constant distracting animation.
- Fast parallax.
- Heavy particle effects.
- Complex 3D unless performance is controlled.
- Too many simultaneous animations.

## Animation Style
- Slow.
- Elegant.
- Subtle.
- Breathing rhythm.
- Premium.
- Purposeful.

Recommended:
- Framer Motion fade + y transition.
- `whileInView` with once true.
- Staggered cards.
- Reduced motion support.

---

# Section-by-Section Visual Direction

## Hero
Cinematic, immersive, product-led. Must immediately communicate:
- Free guide.
- Pattern Code.
- Self-discovery.
- AI-powered depth.

## Problem
Use contrast:
- Left: “Repeating patterns.”
- Right: “Readable signals.”
Show floating examples: overthinking, relationship loops, money behaviour, decision fatigue.

## Lead Magnet
Show PDF mockup. Make it feel valuable, not like a generic freebie.

## How It Works
Use 3-step cards with a glowing line:
1. Enter birthdate.
2. Find Core Number.
3. Unlock Pattern Insight.

## 9 Pattern Codes
Create strong card system. Make this section sharable and visually engaging.

## NUMI Product Bridge
Shift from guide to app/product:
- “The guide reveals one layer.”
- “NUMI reveals the full map.”
Use product dashboard mockup or AI chat mockup.

## Benefits
Use bento grid:
- Thinking pattern.
- Love pattern.
- Wealth pattern.
- Decision pattern.
- Success pattern.
- Daily guidance.

## Form
Make it the highest-converting section:
- Clear headline.
- Simple form.
- High contrast CTA.
- Trust/privacy microcopy.

## FAQ
Clean accordion.

## Final CTA
Return to hero feeling, but simpler and more decisive.

---

# Responsive Direction

## Desktop
- Rich visual experience.
- Large typography.
- Two-column hero.
- 3-column cards.
- Bento grid.

## Tablet
- Maintain visual richness.
- Reduce headline size.
- 2-column cards.

## Mobile
- Prioritise speed and clarity.
- Single-column sections.
- Large CTA buttons.
- No tiny text.
- Pattern cards should be swipeable or stacked.
- Avoid heavy animation.
- Form should be near top and repeated lower page.

---

# Accessibility

- Maintain strong contrast.
- Do not use gold text on light backgrounds.
- All form fields need labels.
- Buttons must have accessible names.
- FAQ should be keyboard accessible.
- Support reduced motion.
- Images need alt text.
- Do not rely on colour alone to communicate hierarchy.

---

# Design Quality Bar

The page should feel like a premium launch page for an AI-powered self-discovery product.

It must look more sophisticated than:
- A basic numerology website.
- A generic astrology app landing page.
- A standard SaaS template.
- A simple PDF opt-in page.

It should feel closer to:
- Premium cinematic product launch.
- Mystical AI dashboard.
- High-end self-discovery experience.
- Elegant digital guide funnel.
