# NUMI Project Recap

**Last Updated:** 2025-06-10

---

## Project Overview

**Client:** NUMI (Tranquility-focused luxury lifestyle sanctuary)

**Contract:** $36,000 (6-month project: February 2026 - July 2026)

**Type:** Brand Identity & Website Development

---

## Live URLs

| Page | URL | Status |
|------|-----|--------|
| Lead Magnet (Funnel Entry) | `https://learn.numi-intl.com/lead-magnet` | ✅ Live |
| Lead Magnet Success | `https://learn.numi-intl.com/lead-magnet/success` | ✅ Live |
| Preview Event (Webinar Funnel) | `https://learn.numi-intl.com/preview-event` | ✅ Live |
| Homepage | `https://learn.numi-intl.com/` | ✅ Live |

**Vercel Project:** `numi-website`
**Vercel Project ID:** `prj_PDwm98uZyQCOaOITrVOoXlV88zpA`

---

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Animation:** Framer Motion
- **Special Effects:** Custom WebGL/Shader backgrounds
- **Hosting:** Vercel
- **Domain:** `learn.numi-intl.com` (subdomain via GoDaddy)

---

## Pages Built

### 1. Homepage (`/`)
- **File:** `src/app/page.tsx`
- **Purpose:** Main landing page for NUMI brand
- **Status:** Live

### 2. Lead Magnet (`/lead-magnet`)
- **Files:** `src/app/lead-magnet/page.tsx`, `src/app/lead-magnet/success/page.tsx`
- **Purpose:** Capture leads with birthdate → provide numerology insights
- **Features:**
  - Multi-step form (name, email, birthdate)
  - Animated shader background
  - Testimonials section
  - Numerology breakdown on success page
- **Status:** Live
- **Note:** Currently stores leads in localStorage only (no backend integration yet)

### 3. Preview Event (`/preview-event`)
- **Files:** `src/app/preview-event/page.tsx`, `src/app/preview-event/thank-you/page.tsx`
- **Purpose:** Webinar registration funnel (Mindvalley masterclass style)
- **Features:**
  - Speaker profile (Dr. Keith Tong)
  - Event details
  - Registration form
  - Thank you confirmation
- **Status:** Live
- **Theme:** Dark cosmic NUMI branding

### 4. Pattern Code (`/pattern-code`)
- **Purpose:** Pattern Code product/service page
- **Status:** Built

### 5. Destiny (`/destiny`)
- **Purpose:** Destiny-related content
- **Status:** Built

### 6. Funnel (`/funnel`)
- **Purpose:** Additional funnel components
- **Status:** Built

---

## Recent Updates (Last 15 Commits)

| Commit | Description | Date |
|--------|-------------|------|
| a6abbee | Fix TypeScript errors in animated shader background | Latest |
| 4a16fef | Trigger fresh Vercel deployment | - |
| f039215 | Update hero copy: Universe Gave You A Number | - |
| 50d1386 | Add animated shader background, testimonials to lead magnet | - |
| 371d440 | Update persona titles, remove upsells from success page | - |
| d3f004c | Add debugging and fallback for numerology breakdown | - |
| 926f62c | Add detailed numerology breakdown to success page | - |
| ef1e3db | Redesign preview event page (Mindvalley masterclass format) | - |
| 7ac5bde | Redesign preview event page (Mindvalley style) | - |
| f91965b | Update speaker profile with Dr. Keith Tong photo | - |
| 71c84e4 | Add Dr. Keith Tong speaker profile section | - |
| 2784ce6 | Redesign preview event page (Mindvalley-inspired layout) | - |
| 15fb272 | Add Dr. Keith Tong as speaker for preview event | - |

---

## Domain Configuration

### ✅ Configured
- **Subdomain:** `learn.numi-intl.com`
- **DNS Record:** CNAME → Vercel DNS
- **Root Domain (`numi-intl.com`):** Points to GoDaddy WebsiteBuilder (unchanged)

### DNS Records at GoDaddy
| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | @ | 216.198.79.1 | Main site (GoDaddy) |
| CNAME | learn | Vercel DNS | NUMI funnel pages |
| CNAME | www | numi-intl.com | www redirect |

---

## Known Limitations / Next Steps

### ⚠️ Lead Capture (No Backend)
Currently, lead data is stored in **localStorage only**. No real backend integration.

**Recommended Integrations:**
- [ ] Email marketing: ConvertKit, Mailchimp, or Klaviyo
- [ ] Database: Supabase or Firebase
- [ ] CRM: HubSpot or Notion integration

### ⚠️ Analytics Tracking
- [ ] Verify Google Analytics 4 is tracking on `learn.numi-intl.com`
- [ ] Add Facebook Pixel/Meta CAPI
- [ ] Set up conversion tracking (lead form submissions)

### ⚠️ SEO
- [ ] Add meta tags to all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Set up canonical tags

---

## Funnel Flow

```
Main Site (numi-intl.com)
    ↓
Lead Magnet (learn.numi-intl.com/lead-magnet)
    ↓ Form Submission
Success Page + Numerology Insights
    ↓ Optional Upsell
Preview Event / Webinar Registration
```

---

## Local Development

**Start Dev Server:**
```bash
cd /Users/jason.soh/my-new-project/NUMI/numi-website
npm run dev
```
Runs on: `http://localhost:5100`

**Port Status:**
- 3000: Occupied (cc-agent-dashboard)
- 5100: NUMI default (free)
- 3001: Available alternative

---

## Project Files Reference

| Directory/File | Purpose |
|----------------|---------|
| `src/app/page.tsx` | Homepage |
| `src/app/lead-magnet/` | Lead magnet funnel |
| `src/app/preview-event/` | Webinar registration |
| `src/components/` | Reusable components |
| `src/components/ui/animated-shader-background.tsx` | WebGL cosmic effect |
| `src/components/ui/testimonials-section.tsx` | Social proof |
| `docs/` | Brand brief, copy, wireframes |
| `CLAUDE.md` | AI agent instructions |

---

## Brand Guidelines

**Reference Design:** spabarcelona.com

**Audience:** "Spiritual Sophia" — spiritually curious users interested in astrology, Human Design, numerology

**Theme:** Premium, cinematic, dark cosmic, AI-pattern intelligence, gold accents

---

## Questions for Client

1. **Email Integration:** Which platform for lead capture? (ConvertKit, Mailchimp, etc.)
2. **Analytics:** GA4 tracking account?
3. **Additional Domains:** Want dedicated domain like `numi.earth` for the funnel?
4. **Main Site Migration:** Migrate entire site to Vercel later?

---

*Generated 2025-06-10*
