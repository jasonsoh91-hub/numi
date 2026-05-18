# NUMI Design System

## Brand Identity

**NUMI** — AI-powered self-discovery and human pattern intelligence platform.

A premium, cinematic, mystical-AI experience that feels like entering a private self-discovery chamber.

---

## Color Palette

### Primary Backgrounds
```css
--cosmic-black:     #050507    /* Deepest black - main background */
--cosmic-navy:      #090D1A    /* Rich navy - secondary backgrounds */
--midnight-blue:    #0B1020    /* Elevated surfaces */
```

### Accent Colors
```css
--soft-gold:        #D8B86A    /* Primary gold - CTAs, highlights */
--bright-gold:      #F4D47A    /* Gold hover states */
--champagne:        #E9D8A6    /* Subtle gold accents */

/* Purple Gradient System */
--numi-purple:      #8B5CF6    /* Primary purple */
--electric-violet:  #A78BFA    /* Light purple */
--deep-indigo:      #312E81    /* Dark purple */
```

### Text Colors
```css
--soft-white:       #F8F7F2    /* Primary text */
--muted-silver:     #B7B7C6    /* Secondary text */
--cool-grey:        #6F7285    /* Muted text */
```

### Glow Effects
```css
--gold-glow:        rgba(216, 184, 106, 0.24)
--purple-glow:      rgba(139, 92, 246, 0.32)
--border-glow:      rgba(216, 184, 106, 0.16)
```

### Tailwind Config Extension
```js
colors: {
  cosmic: {
    black: '#050507',
    navy: '#090D1A',
    blue: '#0B1020',
  },
  gold: {
    DEFAULT: '#D8B86A',
    bright: '#F4D47A',
    champagne: '#E9D8A6',
    glow: 'rgba(216, 184, 106, 0.24)',
  },
  purple: {
    numi: '#8B5CF6',
    electric: '#A78BFA',
    deep: '#312E81',
    glow: 'rgba(139, 92, 246, 0.32)',
  },
  text: {
    primary: '#F8F7F2',
    secondary: '#B7B7C6',
    muted: '#6F7285',
  }
}
```

---

## Typography

### Font Families
```css
--font-headings: 'Cormorant Garamond', serif;
--font-body: 'Inter', sans-serif;
--font-ui: 'Inter', sans-serif;
```

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Usage | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| H1 (Hero) | Cormorant | 4rem → 5rem | 600 | 1.1 |
| H2 (Section) | Cormorant | 2.5rem → 3rem | 600 | 1.2 |
| H3 (Card) | Cormorant | 1.5rem → 1.75rem | 500 | 1.3 |
| Body | Inter | 1rem | 400 | 1.6 |
| Body Large | Inter | 1.125rem | 400 | 1.6 |
| Small | Inter | 0.875rem | 400 | 1.5 |
| Label/Caption | Inter | 0.75rem | 500 | 1.4 |

### Typography Rules
- **H1**: Single highlight word in gold
- **Paragraphs**: Max 2-3 lines, keep short
- **Mobile**: H1 scales to 2.5rem
- **Gold Highlights**: Use sparingly for emphasis only

---

## Component Styles

### Primary Button (Gold Gradient)
```tsx
// Variant: default
className={`
  bg-gradient-to-r from-[#D8B86A] to-[#C4A852]
  text-cosmic-black font-semibold
  rounded-full
  px-8 py-4
  shadow-lg shadow-gold-glow
  hover:shadow-gold-glow/50
  hover:scale-105
  transition-all duration-300
  cursor-pointer
`}
```

### Secondary Button (Outline)
```tsx
className={`
  bg-transparent
  border border-gold/30
  text-gold
  rounded-full
  px-8 py-4
  hover:bg-gold/10
  hover:border-gold/60
  transition-all duration-200
  cursor-pointer
`}
```

### Glass Card
```tsx
className={`
  bg-cosmic-navy/60
  backdrop-blur-xl
  border border-gold-glow
  rounded-2xl
  p-6
  shadow-2xl
  hover:border-gold/40
  transition-all duration-300
`}
```

### Pattern Card (9 Archetypes)
```tsx
className={`
  relative
  bg-cosmic-blue/80
  backdrop-blur-md
  border border-gold-glow
  rounded-2xl
  p-8
  hover:scale-[1.02]
  hover:shadow-gold-glow/20
  transition-all duration-300
  cursor-pointer
`}
```

### Input Field
```tsx
className={`
  w-full
  bg-cosmic-black/80
  border border-gold-glow
  rounded-xl
  px-4 py-3
  text-text-primary
  placeholder:text-text-muted
  focus:outline-none
  focus:border-gold/60
  focus:ring-2 focus:ring-gold-glow
  transition-all duration-200
`}
```

---

## Spacing System

### Section Padding
```css
--section-padding-desktop: 140px;
--section-padding-tablet: 96px;
--section-padding-mobile: 72px;
```

### Container Widths
```css
--container-max: 1200px;
--hero-max: 1280px;
--content-narrow: 800px;
```

### Gap Scale
- Cards: 24px (gap-6)
- Section spacing: 64px (space-16)
- Element spacing: 32px (space-8)

---

## Animation Specifications

### Framer Motion Presets

```tsx
// Fade up (for content sections)
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

// Stagger children (for cards)
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Gentle float (for hero elements)
const gentleFloat = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

// Glow pulse (subtle breathing)
const glowPulse = {
  animate: {
    opacity: [0.6, 1, 0.6],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
}
```

### Animation Rules
- **Duration**: 150-300ms for micro-interactions
- **Stagger**: 0.1s delay between card reveals
- **Hover**: scale-105, never scale-110 or higher
- **Reduced Motion**: Always check `prefers-reduced-motion`

---

## Glassmorphism Effects

### Card Base
```css
background: rgba(9, 13, 26, 0.6);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(216, 184, 106, 0.16);
```

### Elevated Surface
```css
background: rgba(11, 16, 32, 0.8);
backdrop-filter: blur(24px);
border: 1px solid rgba(216, 184, 106, 0.24);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```

### Navigation Bar
```css
background: rgba(5, 5, 7, 0.8);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(216, 184, 106, 0.1);
```

---

## Responsive Breakpoints

```css
--mobile:   < 640px   /* Stack everything */
--tablet:   640-1024px  /* 2-column grids */
--desktop:  > 1024px  /* Full experience */
```

### Grid Patterns
```tsx
// Hero: 2-col desktop, stacked mobile
gridTemplateColumns: { md: "1fr", lg: "1fr 1fr" }

// Pattern cards: 3x3 desktop, 2x2 tablet, 1-col mobile
gridTemplateColumns: {
  mobile: "1fr",
  tablet: "repeat(2, 1fr)",
  desktop: "repeat(3, 1fr)"
}

// Benefits: Bento grid
gridTemplateColumns: {
  mobile: "1fr",
  tablet: "repeat(2, 1fr)",
  desktop: "repeat(3, 1fr)"
}
```

---

## Accessibility Standards

### Contrast Requirements
- Body text: 4.5:1 minimum
- Large text: 3:1 minimum
- Gold on dark: ✓ Passes
- Purple on dark: ✓ Passes

### Keyboard Navigation
- All CTAs: visible focus ring (ring-2 ring-gold/50)
- FAQ: keyboard accessible accordion
- Form: proper tab order

### Screen Reader
- Alt text for all images
- ARIA labels for icon-only buttons
- Semantic HTML (section, article, nav)

---

## Z-Index Scale

```css
--z-base:      1   /* Content */
--z-dropdown:  10  /* Dropdowns, tooltips */
--z-sticky:    20  /* Sticky header */
--z-overlay:   30  /* Modal backdrop */
--z-modal:     40  /* Modal content */
--z-toast:     50  /* Notifications */
```

---

## Icon Guidelines

- **Library**: Lucide React
- **Size**: w-6 h-6 (24px) default
- **Color**: gold-400 for accents, text-secondary for subtle
- **Stroke**: stroke-width-2
- **Never**: Use emojis as icons

---

## Premium Quality Checklist

Before marking any section complete, verify:
- [ ] No emoji icons (use SVG/Lucide)
- [ ] All clickable elements have cursor-pointer
- [ ] Hover states don't shift layout (no scale-110+)
- [ ] Gold highlights used sparingly (1-2 words max)
- [ ] Glassmorphism visible in all sections
- [ ] Animations respect prefers-reduced-motion
- [ ] Focus states visible for keyboard nav
- [ ] Text contrast 4.5:1 or higher
- [ ] No horizontal scroll on mobile
- [ ] Consistent spacing between sections
