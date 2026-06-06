## Goal

1. Reframe the site as "Aspiring DevOps Engineer, open to roles" everywhere it currently says you're still interning.
2. Link your Google Search Console connection to this project, pull Core Web Vitals / page-experience data for `https://equaan.github.io/portfolio/`, and fix what it flags.

---

## Part 1 — Copy updates (post-internship)

### `src/components/Hero.tsx`
- Typing roles → `['Aspiring DevOps Engineer', 'Cloud & Automation Enthusiast', 'Open to DevOps Roles']`
- Sub-paragraph → "Recently completed a Cloud Services internship at Opt IT Technologies (Feb–Apr 2025), where I built an Internal Developer Platform on Backstage.io. Now actively seeking full-time DevOps / Cloud Engineering roles."

### `src/components/About.tsx`
- Terminal card:
  - `role:` → `Aspiring DevOps Engineer`
  - `status:` → `Open to opportunities`
- Description paragraphs rewritten in past tense for the internship and forward-looking for what you're doing now (learning, building, job hunting).
- Stats tile: `Currently Interning` → `Open to Roles`.

### `src/components/Contact.tsx`
- "internship opportunity" → "opportunity / role"
- "actively seeking internship opportunities" → "actively seeking full-time DevOps & Cloud Engineering roles (also open to contract/freelance)"

### `src/components/Experience.tsx`
- No change to bullets, but already shows Feb–Apr 2025 which now reads correctly as past.

I will NOT touch Skills, Projects, or Certifications (per project memory).

---

## Part 2 — Search Console Core Web Vitals

### Step A — Link the connection
Your Google Search Console connection exists in the workspace but isn't linked to this project yet. I'll link it via `standard_connectors--connect`, which makes `LOVABLE_API_KEY` + `GOOGLE_SEARCH_CONSOLE_API_KEY` available to the sandbox so I can call the gateway.

### Step B — Pull the data
Heads up on terminology: Search Console doesn't run PageSpeed Insights itself. It exposes the **Core Web Vitals report** (field data from real Chrome users) and the **Page Experience** signals. That's what I'll pull, for both mobile and desktop, for `https://equaan.github.io/portfolio/`. If the property has too little traffic to show CWV data (very common for new portfolios), Search Console will return empty — in that case I'll fall back to the public PageSpeed Insights API (no key required) so you still get an actionable report.

### Step C — Fix what's flagged
Likely items based on a quick read of the current code, that I'll address regardless of what the report says:

- **Framer Motion weight** — Hero/About/Experience/Contact all import `framer-motion`. It's ~50KB gzipped and is one of the biggest LCP/TBT contributors on the page. I'll either (a) swap the simple fade/slide-in animations to CSS keyframes, or (b) lazy-load `framer-motion` for below-the-fold sections only. Decision based on what the report shows.
- **LCP image / favicon** — The favicon is loaded from `storage.googleapis.com`; I'll move it into `public/` so it ships from the same origin and isn't blocked by a third-party connection.
- **Font loading** — Fonts use the `media="print" onload` swap trick already (good). I'll add `rel="preconnect"` for `fonts.googleapis.com` and `fonts.gstatic.com` to shave the first byte.
- **CLS** — Hero has fixed min-heights already; I'll audit the floating decorative elements and typing animation row for layout shift.
- **Anything specific Search Console flags** (slow LCP URLs, INP issues, mobile usability) gets fixed page-by-page.

I'll report the before/after for each metric in the final reply.

---

## Out of scope
- No changes to Skills, Projects, or Certifications.
- No redesign; only copy + perf fixes.
- No new pages or routes.