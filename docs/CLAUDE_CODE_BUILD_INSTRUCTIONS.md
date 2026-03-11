# Claude Code Instructions: Audit Deliverable Template Build

## What We're Building

A reusable, animated, interactive audit deliverable template hosted at `reports.bellaisolutions.com/{client-slug}`. Each client gets their own URL with a personalized report generated from a data file. The template is a scroll-driven sales experience — not a static report.

Read `AUDIT_DELIVERABLE_BLUEPRINT.md` in this repo for the full design spec including section structure, animation details, data architecture, and brand system. That document is the source of truth for what we're building. These instructions tell you how to build it.

---

## Project Setup

### Step 1: Scaffold

```bash
npm create vite@latest bell-reports -- --template react
cd bell-reports
npm install
npm install react-router-dom framer-motion recharts lucide-react react-countup
npm install -D tailwindcss @tailwindcss/vite
```

### Step 2: Configure Tailwind

Add the Tailwind Vite plugin to `vite.config.js`:

```javascript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Add to the top of `src/index.css`:

```css
@import "tailwindcss";
```

### Step 3: Set Up Brand Tokens

Create `src/theme.js` with the Bell AI brand system:

```javascript
export const brand = {
  navy: "#1B2A4A",
  teal: "#2A9D8F",
  slate: "#4A5568",
  lightGray: "#F7FAFC",
  orange: "#E76F51",
  white: "#FFFFFF",
  warmGray: "#F0EDEB",
  darkSlate: "#2D3748",
  border: "#E2E8F0",
  font: "'DM Sans', Arial, sans-serif",
  tagline: "We build systems that run without you.",
};
```

Also add corresponding CSS custom properties in `src/index.css` so Tailwind classes can reference them if needed.

### Step 4: Google Fonts

Add DM Sans to `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
```

---

## Project Structure

```
bell-reports/
├── public/
├── src/
│   ├── App.jsx                    # Router — maps /:clientSlug to AuditReport
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Tailwind + global styles
│   ├── theme.js                   # Brand tokens
│   ├── components/
│   │   ├── AuditReport.jsx        # Main orchestrator — loads data, renders all sections in order
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # Section 1: Client name, context, branding
│   │   │   ├── OverviewStats.jsx  # Section 2: Stat cards with animated counters
│   │   │   ├── ProcessMaps.jsx    # Section 3: Engine-grouped workflow steps with friction highlights
│   │   │   ├── FrictionPoints.jsx # Section 4: Consolidated friction list with type filters
│   │   │   ├── OpportunityMatrix.jsx  # Section 5: Interactive impact/effort scatter plot
│   │   │   ├── QuickWins.jsx      # Section 6: Expandable detailed breakdowns with Today/After
│   │   │   ├── ROICalculator.jsx  # Section 7: Interactive sliders with real-time savings output
│   │   │   ├── BigSwings.jsx      # Section 8: Tabbed view of big swings + don't do
│   │   │   ├── Roadmap.jsx        # Section 9: Self-drawing vertical timeline
│   │   │   ├── NextSteps.jsx      # Section 10: Summary + CTA button
│   │   │   └── Footer.jsx         # Section 11: Branding + confidentiality
│   │   ├── ui/
│   │   │   ├── StickyNav.jsx      # Scroll-tracking navigation bar
│   │   │   ├── SectionWrapper.jsx # Reusable section container with scroll-reveal animation
│   │   │   ├── StatCard.jsx       # Animated counter card
│   │   │   ├── TypeBadge.jsx      # Friction type pill (Time Sink / Quality Risk / Both)
│   │   │   ├── ImpactBar.jsx      # Visual 1-5 impact/effort indicator
│   │   │   └── AnimatedCounter.jsx# Number that counts up from 0 on scroll into view
│   │   └── NotFound.jsx           # 404 for invalid client slugs
│   └── clients/
│       ├── greenhill.js           # Goldman Haque data
│       └── _template.js           # Empty template for creating new client files
├── index.html
├── package.json
├── vite.config.js
└── AUDIT_DELIVERABLE_BLUEPRINT.md
```

---

## Routing

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuditReport from './components/AuditReport';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:clientSlug" element={<AuditReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

```javascript
// src/components/AuditReport.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AuditReport() {
  const { clientSlug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    import(`../clients/${clientSlug}.js`)
      .then(mod => setData(mod.clientData))
      .catch(() => setError(true));
  }, [clientSlug]);

  if (error) return <NotFound />;
  if (!data) return <LoadingScreen />;

  return (
    <>
      <Hero data={data} />
      <StickyNav sections={data.sections} />
      <OverviewStats data={data} />
      <ProcessMaps processes={data.processes} />
      <FrictionPoints frictionPoints={data.frictionPoints} />
      <OpportunityMatrix opportunities={data.opportunities} />
      <QuickWins quickWins={data.quickWinDetails} />
      <ROICalculator config={data.roiCalculator} />
      <BigSwings bigSwings={data.opportunities.bigSwings} deprioritize={data.opportunities.deprioritize} />
      <Roadmap phases={data.roadmap} />
      <NextSteps data={data.nextSteps} clientName={data.clientName} />
      <Footer clientName={data.clientName} auditDate={data.auditDate} />
    </>
  );
}
```

---

## Client Data File Format

Every client data file must export a `clientData` object following this shape. Create `src/clients/_template.js` as a blank starting point:

```javascript
// src/clients/_template.js
export const clientData = {
  // --- IDENTIFICATION ---
  slug: "",                    // URL slug: reports.bellaisolutions.com/{slug}
  clientName: "",              // Display name
  clientIndustry: "",          // e.g., "Accounting / CPA Firm"
  clientContext: "",           // 1-2 sentence description of their business
  auditDate: "",               // e.g., "March 2026"

  // --- SECTION 3: PROCESS MAPS ---
  // Variable number of engines, variable names. Template maps over whatever is here.
  processes: [
    {
      engine: "",              // e.g., "Delivery", "Lead Intake", anything
      steps: [
        {
          name: "",            // Step name
          who: "",             // Who does it
          tool: "",            // What tool they use
          friction: null,      // null if no friction, or object below:
          // friction: {
          //   type: "Time Sink" | "Quality Risk" | "Both",
          //   detail: "",     // Description of the pain
          //   impact: "",     // e.g., "~3 hrs/day per person"
          // }
        },
      ],
    },
  ],

  // --- SECTION 4: FRICTION POINTS ---
  frictionPoints: [
    {
      id: "",                  // e.g., "F1"
      label: "",               // Short description
      type: "",                // "Time Sink" | "Quality Risk" | "Both"
      who: "",                 // Who is affected
      frequency: "",           // How often
      effect: "",              // Business impact
    },
  ],

  // --- SECTION 5 & 8: OPPORTUNITIES ---
  opportunities: {
    quickWins: [
      {
        id: "",                // e.g., "QW1" or "A"
        name: "",
        impact: 0,             // 1-5
        effort: 0,             // 1-5
        engine: "",            // Which engine this relates to
        description: "",
        solves: [],            // Array of friction point IDs
        tools: "",             // Suggested implementation tools
      },
    ],
    bigSwings: [
      {
        id: "",
        name: "",
        impact: 0,
        effort: 0,
        engine: "",
        description: "",
        solves: [],
        tools: "",
      },
    ],
    deprioritize: [
      {
        id: "",
        name: "",
        reason: "",            // Why we recommend NOT doing this
      },
    ],
  },

  // --- SECTION 6: QUICK WIN DETAILS ---
  quickWinDetails: [
    {
      id: "",                  // Matches an id in opportunities.quickWins
      name: "",
      currentState: "",        // "Today" — describes the pain
      futureState: "",         // "After" — describes the automated state
      teamImpact: "",          // What changes for the humans
      steps: [],               // Implementation steps (array of strings)
      roi: {
        hoursSaved: "",        // Estimate or null
        costSavings: null,     // Dollar figure or null
        dataNeeded: [],        // What we need from client to finalize ROI
      },
      solves: [],              // Friction point IDs
    },
  ],

  // --- SECTION 7: ROI CALCULATOR ---
  // Set to null if not applicable for this client
  roiCalculator: {
    inputs: [
      {
        id: "",                // Unique key for this input
        label: "",             // Display label
        min: 0,
        max: 100,
        default: 0,
        step: 1,               // Slider step increment
        unit: "",              // "$", "hrs", "%", etc.
      },
    ],
    // Function that takes an object of { inputId: value } and returns output metrics
    calculate: (values) => ({
      hoursSavedMonthly: 0,
      annualSavings: 0,
      // Add whatever output metrics make sense for this client
    }),
    // Labels for the output metrics
    outputs: [
      { key: "hoursSavedMonthly", label: "Hours Saved per Month", unit: "hrs", format: "number" },
      { key: "annualSavings", label: "Annual Cost Savings", unit: "$", format: "currency" },
    ],
  },

  // --- SECTION 9: ROADMAP ---
  roadmap: [
    {
      phase: 1,
      title: "",               // e.g., "First Win"
      timeframe: "",           // e.g., "48 Hours"
      items: [],               // Array of strings — what gets done
    },
  ],

  // --- SECTION 10: NEXT STEPS ---
  nextSteps: {
    summary: "",               // 2-3 sentences recapping findings
    details: "",               // What the next conversation covers
    ctaUrl: "",                // Booking link
    ctaText: "",               // Button text, e.g., "Schedule the Kickoff"
  },
};
```

---

## Animation Guidelines (Framer Motion)

### Scroll Reveal Pattern
Use this as the standard wrapper for any element that should animate on scroll:

```javascript
import { motion } from 'framer-motion';

// Reusable section wrapper
function SectionWrapper({ children, id, className }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
```

### Staggered Children Pattern
For card lists, friction points, process steps:

```javascript
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

<motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(i => (
    <motion.div key={i.id} variants={item}>
      {/* card content */}
    </motion.div>
  ))}
</motion.div>
```

### Animated Counter Pattern
For stat cards — numbers count up from 0:

```javascript
import { useInView } from 'framer-motion';
import CountUp from 'react-countup';

function AnimatedCounter({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {isInView ? <CountUp end={end} duration={2} suffix={suffix} /> : "0"}
    </span>
  );
}
```

### Matrix Dot Pop-In
Dots in the opportunity matrix should spring in:

```javascript
const dotVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.12,
    },
  }),
};
```

### Accordion Expand/Collapse
For quick win detail panels:

```javascript
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      {/* expanded content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Self-Drawing Timeline
For the roadmap section — line draws as user scrolls:

```javascript
import { motion, useScroll, useTransform } from 'framer-motion';

function Roadmap({ phases }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* The drawing line */}
      <motion.div
        className="absolute left-6 top-0 w-0.5 bg-teal-500 origin-top"
        style={{ height: lineHeight }}
      />
      {/* Phase cards */}
      {phases.map((phase, i) => (
        <motion.div
          key={phase.phase}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
        >
          {/* phase card */}
        </motion.div>
      ))}
    </div>
  );
}
```

### ROI Calculator Slider Animation
Numbers should spring-animate when slider values change:

```javascript
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Animated display value that springs to new numbers
const displayValue = useSpring(initialValue, { stiffness: 100, damping: 30 });

// Update on slider change
useEffect(() => {
  displayValue.set(calculatedSavings);
}, [calculatedSavings]);
```

---

## Key Build Principles

1. **Nothing is hardcoded.** Every piece of client-specific content comes from the data file. The template renders whatever it receives — 3 engines or 7, 8 friction points or 20, 2 quick wins or 5.

2. **Each section is its own component.** This makes it easy to reorder, add, remove, or modify sections without touching other parts of the template.

3. **Animations use `once: true` everywhere.** Elements animate in once as you scroll to them. They don't replay on scroll back up. This keeps the experience feeling polished, not distracting.

4. **All animations use `transform` and `opacity` only.** These are GPU-accelerated and won't cause jank. Never animate `width`, `height`, `top`, `left`, or any layout-triggering property directly (Framer Motion's `height: "auto"` is the one exception — it handles the complexity internally).

5. **Mobile-first responsive.** Build for mobile, enhance for desktop. The matrix section needs special attention — the scatter plot should become a sorted card list on screens under 768px.

6. **Performance matters.** This page needs to feel instant. Lazy-load client data files. Keep the bundle small. No unnecessary dependencies. The client is judging our technical competence by how this page performs.

7. **The CTA is the destination.** Every section builds toward the "Schedule the Kickoff" button. The scroll narrative is: understand → concern → possibility → confidence → action.

---

## Vercel Deployment

Once the project is working locally:

1. Push to a GitHub repo (e.g., `bell-reports`)
2. Connect to Vercel at vercel.com
3. Vercel auto-detects Vite — no config needed
4. Add custom domain: `reports.bellaisolutions.com`
5. In GoDaddy DNS for bellaisolutions.com, add CNAME record:
   - Name: `reports`
   - Value: `cname.vercel-dns.com`
6. Vercel handles SSL automatically

For redeployment after adding a new client: just push to GitHub. Vercel auto-deploys on push.

---

## Adding a New Client (The 2-Minute Process)

1. Copy `src/clients/_template.js` → `src/clients/{new-slug}.js`
2. Fill in the client data from your audit notes
3. Push to GitHub
4. Vercel auto-deploys
5. Send client `reports.bellaisolutions.com/{new-slug}`

That's it. No code changes to the template. No rebuilding components. Just data in, report out.