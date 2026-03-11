# Bell AI Solutions — Audit Deliverable Template Blueprint

## Purpose

This document is the design spec for the **ultimate reusable audit deliverable template**. It defines the section structure, scroll narrative, animation strategy, interactivity features, data architecture, and visual design direction for a React-based client report hosted at `reports.bellaisolutions.com/{client-slug}`.

This blueprint is intended to be used as context inside Claude Code when building the template.

---

## Design Philosophy

This isn't a report. It's a **scroll-driven sales experience** disguised as a deliverable.

The client receives a link. They open it. Over the next 3-5 minutes, they scroll through an experience that:
1. Proves we understood their business deeply (process maps)
2. Shows them exactly where they're bleeding time and money (friction points)
3. Visualizes the full landscape of what's possible (opportunity matrix)
4. Makes the quick wins feel like obvious no-brainers (detailed breakdowns)
5. Lets them play with their own ROI numbers (interactive calculator)
6. Hands them a clear action plan (roadmap)
7. Makes the next step frictionless (CTA to book)

Every section builds emotional momentum toward a single outcome: **"I need to work with this person."**

---

## Brand System

| Element | Value |
|---------|-------|
| Primary font | DM Sans (Google Fonts) |
| Fallback font | Arial, sans-serif |
| Navy | #1B2A4A |
| Teal | #2A9D8F |
| Slate | #4A5568 |
| Light Gray | #F7FAFC |
| Accent Orange | #E76F51 |
| Dark Slate | #2D3748 |
| Border | #E2E8F0 |
| Tagline | "We build systems that run without you." |

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React (Vite) |
| Animation | Framer Motion |
| Routing | React Router (one route per client) |
| Styling | Tailwind CSS + CSS variables for brand tokens |
| Data viz | Recharts (for any charts) |
| Icons | Lucide React |
| Hosting | Vercel |
| Subdomain | reports.bellaisolutions.com |

### Libraries to Explore for "Wow" Moments
- **Framer Motion** — scroll-triggered reveals, number counters, staggered card animations, layout transitions
- **Aceternity UI / Magic UI** — spotlight card effects, animated gradients, glowing borders, text reveal animations (evaluate which components fit; don't use everything)
- **21st.dev** — browse for high-quality React components that fit the aesthetic
- **react-countup** or Framer Motion `useMotionValue` — for animated number counters in stat cards
- **Intersection Observer** (native) — already used in current versions; Framer Motion's `whileInView` is the cleaner replacement

---

## Section Structure & Scroll Narrative

The template follows a **problem-agitation-solution** narrative arc. Each section builds on the last.

### Section 1: Hero
**Purpose:** First impression. Establish authority and context.

**Contains:**
- "Operations Efficiency Audit" label badge
- Client name (large, prominent)
- One-line client context (industry, team size, what they do)
- "Prepared by Bell AI Solutions" + date
- Subtle background: navy gradient with faint grid texture (keep from GH version)

**Animation:** Fade in with slight upward drift on load. Badge slides in first, then name, then context — staggered 150ms each.

**Data fields:** `clientName`, `clientIndustry`, `clientContext`, `auditDate`

---

### Section 2: The Numbers That Matter (Overview Stats)
**Purpose:** Anchor the scope. Big numbers make the audit feel substantial.

**Contains:**
- 4 stat cards in a row: Total Friction Points, Time Sinks, Quality Risks, Quick Wins Identified
- Brief "What We Reviewed" paragraph explaining the audit scope

**Animation:** Stat card numbers **count up from 0** as the section scrolls into view. Cards stagger in left-to-right with 100ms delay each.

**Data fields:** Derived from `frictionPoints[]` and `opportunities[]` arrays

---

### Section 3: How Your Operation Works (Process Maps)
**Purpose:** Prove we understood their business. This is the "they actually listened" moment.

**Contains:**
- Process flows grouped by engine (Delivery, Support, Billing, etc.)
- Each step shows: step name, who does it, what tool they use
- Friction steps are highlighted with a warning badge and expandable detail showing the pain
- Color-coded by engine

**Animation:** Steps stagger in sequentially within each engine group (like the Greenfield version's scroll-reveal). Friction steps pulse briefly with a warm glow on reveal.

**Data fields:** `processes[]` array with `engine`, `steps[]` containing `name`, `who`, `tool`, and optional `friction` object

**Design note:** Keep from Greenfield version. This section was the strongest differentiator — it shows the client their own operation reflected back at them. GH version didn't have this.

---

### Section 4: Where Time and Quality Are at Risk (Friction Point Summary)
**Purpose:** Consolidate all friction into one scannable view. Build urgency.

**Contains:**
- Summary bar showing count by type (Time Sink / Quality Risk / Both) — color-coded pills
- Card list of all friction points with: ID, label, type badge, who, frequency, effect
- Optional: filter/sort by type

**Animation:** Cards fade-and-slide in with stagger. Type count pills animate their numbers.

**Data fields:** `frictionPoints[]` array with `id`, `label`, `type`, `who`, `frequency`, `effect`

---

### Section 5: Opportunity Matrix (Impact vs. Effort)
**Purpose:** Visual "aha" moment. Client sees the full landscape and immediately grasps where the quick wins live.

**Contains:**
- Interactive scatter plot: X = effort, Y = impact
- Dots are clickable — clicking reveals a detail panel below/beside the matrix
- Quick Win quadrant is subtly highlighted (shaded green zone)
- Color-coded by engine or by quadrant
- Legend mapping dot labels to opportunity names

**Animation:** Dots **pop in** with spring physics (scale from 0 to 1), staggered. Quick Win quadrant fades in first as a subtle highlight before dots appear.

**Interaction:** Click a dot → detail panel slides open with: name, description, impact/effort bars, which friction points it solves, suggested tools. Click again to dismiss.

**Data fields:** Each opportunity has `id`, `name`, `impact` (1-5), `effort` (1-5), `quadrant`, `engine`, `description`, `solves[]` (friction IDs), `tools`

**Design note:** Combine the best of both versions. GH had clean dot plotting; Greenfield had clickable cards with engine color-coding and the star badge for quick wins. Merge these.

---

### Section 6: Recommended Quick Wins (Detailed Breakdowns)
**Purpose:** This is the heart of the sell. Make each quick win feel tangible and inevitable.

**Contains:**
- Expandable accordion cards (one per quick win)
- Each card expands to show:
  - **Today** panel (red-tinted): describes current painful state
  - **After** panel (green-tinted): describes the automated future
  - **What changes for your team** (teal-tinted): the human impact
  - **Implementation steps**: numbered, concise
  - **ROI indicator**: either hard numbers if available, or "To calculate your specific ROI, we'll need: [data points]"
  - Which friction points this solves (linked back to Section 4)

**Animation:** Accordion expand/collapse uses Framer Motion `AnimatePresence` + `layout` for smooth height transitions. Today/After panels slide in from left/right simultaneously.

**Data fields:** `quickWins[]` with `id`, `name`, `currentState`, `futureState`, `teamImpact`, `steps[]`, `roi` object, `solves[]`

**Design note:** Greenfield's Today/After split panel was the strongest emotional element in either version. Keep and elevate it.

---

### Section 7: Interactive ROI Calculator (NEW)
**Purpose:** Turn passive reading into active engagement. Client plays with their own numbers and sells themselves.

**Contains:**
- 2-4 slider inputs based on the client's specific quick wins (e.g., "Hours your team spends on document chasing per week", "Average staff hourly cost")
- Real-time output panel showing: hours saved per month, annual cost savings, payback period
- Numbers animate smoothly as sliders move
- Pre-populated with reasonable estimates; client adjusts to their reality

**Animation:** Output numbers use spring animations on change. Savings counter has a subtle "glow" effect when it crosses significant thresholds.

**Data fields:** `roiCalculator` object with `inputs[]` (label, min, max, default, unit) and `formula` function that computes outputs from inputs

**Design note:** This section is entirely new. Neither version had it. It's the single biggest "wow" upgrade because it turns the deliverable from something you read into something you use.

---

### Section 8: Big Swings & What to Skip
**Purpose:** Show strategic depth. Prove we're not just selling everything — we're advising.

**Contains:**
- **Big Swings** tab: opportunities worth doing after quick wins earn trust. Card format with impact/effort indicators, brief description.
- **Don't Do** tab: things we're explicitly recommending they NOT spend money on. Each with a clear reason why.

**Animation:** Tab switch uses `AnimatePresence` crossfade. Cards stagger in on tab change.

**Data fields:** `bigSwings[]` and `deprioritize[]` arrays

**Design note:** The "Don't Do" section is a trust builder. Keep it prominent. GH version did this well.

---

### Section 9: Implementation Roadmap
**Purpose:** Make it real. Show the path from today to transformed.

**Contains:**
- Vertical timeline with 3 phases
- Phase 1 ("First Win"): 48 hours, emphasize speed
- Phase 2 ("Quick ROI"): Weeks 1-2, scale what works
- Phase 3 ("Bigger Builds"): Weeks 3+, structural improvements
- Each phase card has: title, timeframe badge, bullet items
- Connecting line draws between phases

**Animation:** Timeline line **draws itself** from top to bottom as user scrolls. Phase cards slide in from the right as the line reaches them. Phase dots pulse on reveal.

**Data fields:** `roadmap[]` with `phase`, `title`, `timeframe`, `items[]`, `color`

---

### Section 10: Next Steps + CTA
**Purpose:** Convert. Make the next action obvious and frictionless.

**Contains:**
- Brief summary: "We found X friction points. Y are quick wins we can start this week."
- What the next conversation covers (fill in data gaps, pick first client segment, etc.)
- **Primary CTA button**: "Schedule the Kickoff" (links to Calendly or booking page)
- Secondary: "Have questions? Reply to the email that sent you this report."
- Bell AI tagline and branding at bottom

**Animation:** CTA button has a subtle pulse/glow animation to draw the eye. Section fades in with a slight parallax effect on the navy background.

**Data fields:** `nextSteps` object with `summary`, `details`, `ctaUrl`, `ctaText`

---

### Section 11: Footer
**Purpose:** Close professionally.

**Contains:**
- "Prepared by Bell AI Solutions for [Client Name]"
- Date
- "Confidential" notice
- Tagline

---

## Sticky Navigation

- Sits below the hero
- Shows section labels with active state tracking (scroll-based via Intersection Observer or Framer Motion `useInView`)
- Frosted glass effect (backdrop-filter: blur)
- Smooth scroll on click
- Collapses to a hamburger or horizontal scroll on mobile

---

## Data Architecture (Static Version)

Each client is a single JS/TS file exporting a data object:

```javascript
// src/clients/greenhill.js
export const clientData = {
  slug: "greenhill",
  clientName: "Goldman Haque",
  clientIndustry: "Accounting / CPA Firm",
  clientContext: "6-person firm managing 120+ accounts...",
  auditDate: "March 2026",
  
  processes: [...],
  frictionPoints: [...],
  
  opportunities: {
    quickWins: [...],
    bigSwings: [...],
    deprioritize: [...]
  },
  
  quickWinDetails: [...],
  
  roiCalculator: {
    inputs: [
      { id: "docHours", label: "Hours/week chasing documents", min: 1, max: 40, default: 10, unit: "hrs" },
      { id: "hourlyCost", label: "Avg staff hourly cost", min: 20, max: 100, default: 35, unit: "$" },
    ],
    calculate: (inputs) => ({
      hoursSavedMonthly: inputs.docHours * 0.7 * 4.33,
      annualSavings: inputs.docHours * 0.7 * 4.33 * 12 * inputs.hourlyCost,
    })
  },
  
  roadmap: [...],
  
  nextSteps: {
    summary: "This audit identified 14 friction points...",
    ctaUrl: "https://calendly.com/bellaisolutions/kickoff",
    ctaText: "Schedule the Kickoff"
  }
};
```

The router loads the right file:

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuditReport from './components/AuditReport';

// Lazy-load client data
const clients = import.meta.glob('./clients/*.js');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:clientSlug" element={<AuditReport />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Responsive Design Requirements

- Desktop (1024px+): Full layout, side-by-side panels, large matrix
- Tablet (768-1024px): Slightly compressed, matrix still works
- Mobile (< 768px): Single column, matrix becomes a sorted card list (scatter plot doesn't work on small screens), sticky nav becomes horizontal scroll or hamburger
- All text remains readable without zooming at every breakpoint

---

## Performance Targets

- First Contentful Paint: < 1.5s
- Total bundle size: < 200KB gzipped (no heavy libraries)
- All animations use `transform` and `opacity` only (GPU-accelerated, no layout thrash)
- Images: none required (all data-driven, no stock photos)
- Fonts: DM Sans loaded via Google Fonts with `display=swap`

---

## What Makes This Template Unforgettable

1. **The numbers count up** — stat cards animate from 0, making the scope feel real
2. **The process maps prove understanding** — client sees their own operation reflected back
3. **The matrix is interactive** — click a dot, see the full story
4. **The ROI calculator lets them sell themselves** — they slide, they see, they believe
5. **The timeline draws itself** — the roadmap feels like it's unfolding in real time
6. **The Today/After panels hit emotionally** — red pain, green relief, side by side
7. **The "Don't Do" section builds trust** — we're advising, not just selling
8. **The CTA pulses at the end** — after all that buildup, the next step is obvious
9. **It's a URL, not a PDF** — shareable, updatable, alive

---

## Build Order (Suggested for Claude Code)

1. **Scaffold the Vite + React Router + Tailwind project**
2. **Build the AuditReport shell** — all sections with placeholder data, basic layout, no animations
3. **Implement the data architecture** — client data files, dynamic loading from route params
4. **Add Framer Motion** — scroll reveals, staggered cards, number counters, accordion transitions
5. **Build the interactive matrix** — clickable dots with detail panel
6. **Build the ROI calculator** — sliders, real-time output, animated numbers
7. **Build the self-drawing timeline** — scroll-linked line animation
8. **Polish** — responsive breakpoints, hover states, transitions, performance audit
9. **Deploy to Vercel** — connect GitHub repo, set up subdomain
10. **Populate first client** — port Goldman Haque data into the new structure