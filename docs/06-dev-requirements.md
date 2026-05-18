# 06 — Development Requirements: NUMI Landing Page

## Project Goal

Build a premium, responsive, conversion-focused landing page for NUMI’s free Pattern Code / Pattern Insight lead magnet.

Primary outcome:
User submits form to get the free Pattern Insight.

---

# Recommended Stack

## Frontend
- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- Framer Motion.

## Optional UI
- shadcn/ui for form, accordion, buttons.
- lucide-react for simple icons.
- React Hook Form for form handling.
- Zod for validation.

## Avoid
- Heavy animation libraries beyond Framer Motion unless necessary.
- Large particle libraries unless performance is tested.
- Unnecessary state management.
- Overly complex 3D rendering for V1.

---

# Page Requirements

## Core Requirements
- Fully responsive.
- Mobile-first.
- Fast loading.
- SEO-friendly metadata.
- Accessible form fields.
- Reusable components.
- Clean content structure.
- No lorem ipsum.
- No generic SaaS copy.
- CTA consistency across page.
- Lead magnet form must be clear and prominent.

## Performance Requirements
- Lighthouse Performance target: 85+.
- Lighthouse Accessibility target: 90+.
- Lighthouse Best Practices target: 90+.
- Lighthouse SEO target: 90+.
- Avoid layout shift.
- Lazy-load non-critical images.
- Optimise PDF/mockup images.
- Support reduced motion.

## Accessibility Requirements
- Semantic HTML.
- One H1 only.
- Proper heading hierarchy.
- Keyboard accessible navigation and FAQ.
- Labels for every input.
- Visible focus states.
- Sufficient contrast.
- Alt text for images.
- ARIA only where needed.
- Do not rely on colour alone.

---

# Required Components

## Page-Level Components
- `LandingPage`
- `Navbar`
- `HeroSection`
- `RelevanceBar`
- `ProblemSection`
- `LeadMagnetSection`
- `HowItWorksSection`
- `PatternCodesSection`
- `ProductBridgeSection`
- `BenefitsSection`
- `EmailCaptureSection`
- `ObjectionHandlingSection`
- `FAQSection`
- `FinalCTASection`
- `Footer`

## Supporting Components
- `Section`
- `Container`
- `Button`
- `PatternCard`
- `BenefitCard`
- `StepCard`
- `FormField`
- `CoreNumberCalculator`
- `MockupCard`
- `AnimatedGlow`
- `FAQAccordion`

---

# Content Data Structure

Use data arrays for repeatable sections.

## Pattern Codes Data

```ts
const patternCodes = [
  {
    number: 1,
    name: "The Initiator",
    line: "You were not built to wait for permission.",
    traits: "Bold, independent, action-oriented, and driven to create your own path."
  },
  {
    number: 2,
    name: "The Connector",
    line: "You feel what people do not say.",
    traits: "Sensitive, intuitive, supportive, emotionally intelligent, and aware of unspoken tension."
  },
  {
    number: 3,
    name: "The Communicator",
    line: "Your voice is part of your power.",
    traits: "Expressive, magnetic, creative, social, and naturally able to inspire through words or ideas."
  },
  {
    number: 4,
    name: "The Builder",
    line: "You are the one people rely on — but who supports you?",
    traits: "Practical, responsible, grounded, structured, and built to create something stable."
  },
  {
    number: 5,
    name: "The Explorer",
    line: "You are not difficult. You are built for movement.",
    traits: "Adaptable, curious, persuasive, energetic, and designed for variety and freedom."
  },
  {
    number: 6,
    name: "The Nurturer",
    line: "You love deeply — but sometimes you forget yourself.",
    traits: "Warm, loyal, protective, healing, and naturally drawn to care, support, and guide."
  },
  {
    number: 7,
    name: "The Analyst",
    line: "You notice what others miss.",
    traits: "Deep, observant, thoughtful, analytical, private, and drawn to truth and meaning."
  },
  {
    number: 8,
    name: "The Strategist",
    line: "You were built for more — but pressure follows power.",
    traits: "Ambitious, strategic, powerful, results-driven, and naturally drawn to leadership and achievement."
  },
  {
    number: 9,
    name: "The Visionary",
    line: "You carry more emotion than people realise.",
    traits: "Compassionate, wise, inspiring, purpose-driven, and able to see the bigger picture."
  }
];
```

## Benefits Data

```ts
const benefits = [
  {
    title: "Thinking Pattern",
    description: "Understand how your mind processes pressure, ideas, and choices."
  },
  {
    title: "Love Pattern",
    description: "Recognise how you give, receive, protect, attach, and communicate."
  },
  {
    title: "Wealth Pattern",
    description: "Explore how ambition, confidence, responsibility, freedom, or creativity shape how you earn."
  },
  {
    title: "Decision Pattern",
    description: "Reduce overthinking by understanding your natural decision rhythm."
  },
  {
    title: "Success Pattern",
    description: "See what helps you grow without forcing yourself into someone else’s path."
  },
  {
    title: "Daily AI Guidance",
    description: "Turn insight into small, practical reflections and actions."
  }
];
```

---

# Core Number Calculation

## Rule
Add all digits of the user’s birthdate together. Keep reducing until the result is a single number from 1 to 9.

## Example
Birthdate: 24 August 1992  
Digits: 2 + 4 + 0 + 8 + 1 + 9 + 9 + 2 = 35  
Reduce: 3 + 5 = 8  
Core Number: 8

## TypeScript Utility

```ts
export function calculateCoreNumber(dateString: string): number | null {
  if (!dateString) return null;

  const digits = dateString.replace(/\D/g, "");
  if (!digits.length) return null;

  let total = digits
    .split("")
    .map(Number)
    .reduce((sum, digit) => sum + digit, 0);

  while (total > 9) {
    total = total
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
  }

  return total === 0 ? null : total;
}
```

---

# Form Requirements

## Fields
- First name.
- Email address.
- Date of birth.

## Validation
- First name required.
- Valid email required.
- Date of birth required.
- Date cannot be in the future.
- Optional age validation depending on privacy policy.

## On Submit
For V1 mock:
- Show success state.
- Display Core Number if calculated.
- Link to PDF/download or thank-you page placeholder.

For production:
- Send data to CRM/email platform/database.
- Trigger email delivery.
- Redirect to thank-you page.
- Track conversion.

## Success State Copy
Your Pattern Insight is ready.  
Your Core Number is [X]. Check your inbox for The Pattern Code and go deeper with NUMI.

## Error State Copy
Something went wrong. Please check your details and try again.

---

# SEO Requirements

## Page Title
The Pattern Code by NUMI — Discover How You Think, Love, Earn & Decide

## Meta Description
Get your free Pattern Code guide from NUMI. Calculate your Core Number and unlock your first Pattern Insight into how you think, love, earn, decide, and grow.

## Open Graph Title
Discover Your Pattern Code

## Open Graph Description
Find your Core Number and unlock your first NUMI Pattern Insight.

## Suggested URL Slug
`/pattern-code`

## H1
Discover the Pattern Behind How You Think, Love, Earn & Decide

---

# Visual Implementation Requirements

## Background
Use layered dark gradients:
- Deep black/navy base.
- Subtle radial purple/gold glow.
- Optional animated noise or star field.

## Cards
Use:
- Dark translucent background.
- Subtle blur.
- Gold/purple border.
- Hover lift.
- Shadow/glow.

## Animations
Use Framer Motion:
- `whileInView` fade + translate.
- Staggered card reveal.
- Gentle floating hero elements.
- Respect reduced motion.

## Responsive Breakpoints
- Mobile: < 640px.
- Tablet: 640–1024px.
- Desktop: > 1024px.

---

# File Structure Recommendation

```txt
/app
  /pattern-code
    page.tsx
/components
  Navbar.tsx
  HeroSection.tsx
  RelevanceBar.tsx
  ProblemSection.tsx
  LeadMagnetSection.tsx
  HowItWorksSection.tsx
  PatternCodesSection.tsx
  ProductBridgeSection.tsx
  BenefitsSection.tsx
  EmailCaptureSection.tsx
  FAQSection.tsx
  FinalCTASection.tsx
  Footer.tsx
  PatternCard.tsx
  BenefitCard.tsx
  CoreNumberCalculator.tsx
/lib
  calculateCoreNumber.ts
  constants.ts
/data
  patternCodes.ts
  faq.ts
  benefits.ts
/public
  /images
    pattern-code-cover.png
    numi-app-mockup.png
```

---

# Development Rules for Claude Code

Before coding, Claude Code must read:
- `00-brand-brief.md`
- `01-audience-icp.md`
- `02-offer-funnel.md`
- `03-landing-page-copy.md`
- `04-design-direction.md`
- `05-wireframe.md`
- `06-dev-requirements.md`
- `07-conversion-checklist.md`

Claude Code must:
- Build section by section.
- Not invent new positioning.
- Not rewrite copy without instruction.
- Keep the primary CTA consistent.
- Preserve the dark cosmic premium design direction.
- Use reusable components.
- Keep mobile layout clean.
- Summarise files changed after each task.

---

# Recommended Build Sequence

## Build 1
- Navbar.
- Hero.
- Relevance bar.

## Build 2
- Problem section.
- Lead magnet section.
- How it works.

## Build 3
- 9 Pattern Codes section.
- Product bridge.
- Benefits.

## Build 4
- Email capture form.
- FAQ.
- Final CTA.
- Footer.

## Build 5
- Core Number calculator.
- Form validation.
- Thank-you state.
- Analytics hooks.

## Build 6
- Polish motion.
- Responsive QA.
- Performance optimisation.
- Accessibility review.
