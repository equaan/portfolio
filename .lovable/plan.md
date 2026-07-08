## Goal

Add three interconnected features that make the portfolio feel like it was built *by* a DevOps engineer, not just themed like one:

1. **Trace Request** — the signature feature. A `▶ Trace Request` button animates a request through the site's real infrastructure, lighting up each node with an engineering-focused tooltip.
2. **Terminal Command Palette** — `⌘K` / `Ctrl+K` opens a terminal-styled palette to navigate anywhere, download the CV, open external links, and trigger the trace.
3. **Hero Status Bar** — a subtle, production-grade strip showing build status, last deploy, and version. Live-first from GitHub API, with silent static fallback.

The primary hero focus stays the headline. Status bar is secondary. Trace Request is the standout interaction.

Skipped from the brainstorm (with reasons in chat): visitor counter, voice chatbot, literal helmet reveal, metro map, page-level interactive AWS diagram. Cursor scanner reveal deferred to a possible round 2 after these land.

---

## 1. Trace Request

### Nodes (accurate to the real stack, 6 nodes)

```text
Browser
  ↓  DNS Resolution
  ↓  GitHub Pages (Static Hosting)
  ↓  React Router
  ↓  Portfolio Application
  ↓  Projects / Case Studies
```

Each node has: a short label, a one-line role description, and a 2–3 line engineering tooltip. Example for GitHub Pages: *"Serves static assets from GitHub's CDN. TLS termination + edge caching. No server runtime — all rendering happens in the browser."*

### Interaction

- Persistent button top-right of the hero: `▶ Trace Request`. Small, terminal-styled, not competing with CTAs.
- Also triggerable via command palette (`> trace request`).
- On click:
  - A panel/overlay slides in from the right (or drops from top on mobile) with the 6 nodes stacked vertically.
  - A "packet" (small glowing dot) animates from node to node, ~1.2s per hop, ~7–8s total.
  - Active node: glows cyan, tooltip fades in, subtle terminal-style typing effect on the description.
  - Completed nodes: dim green check.
  - Pending nodes: muted.
  - `ESC` or click-outside closes it. Button becomes `↻ Trace Again` after completion.

### Implementation notes

- Standalone component `src/components/TraceRequest.tsx`.
- CSS transforms + `requestAnimationFrame` for the packet motion (no framer-motion dependency for this piece — keeps bundle lean).
- Reduced-motion: fall back to instant reveal of each node with a 400ms stagger.
- Accessibility: `role="dialog"`, focus trap, live region announces each active node.

---

## 2. Terminal Command Palette

### Trigger

- `⌘K` (macOS) / `Ctrl+K` (Windows/Linux) globally.
- Also a subtle button in the nav: `⌘K` chip.

### Commands

```text
goto  home
goto  about
goto  experience
goto  skills
goto  projects
goto  certifications
goto  contact
open  case-study: backstage-idp
run   trace-request
dl    resume.pdf
open  github
open  linkedin
open  email
```

Filterable as-you-type, arrow-key navigation, Enter to execute, terminal cursor styling.

### Implementation notes

- Use `cmdk` (already available via shadcn `command` component in the project).
- New component `src/components/CommandPalette.tsx`, mounted once in `Index.tsx`.
- Global keyboard listener in a small `useCommandPalette` hook.
- All navigation via `react-router-dom` `useNavigate` + anchor scroll.
- Styling: monospace, cyan prompt (`~/portfolio $` ), matches existing terminal card language.

---

## 3. Hero Status Bar

### Visual

A single thin strip below the hero CTAs (or above them — TBD in build). Monospace, muted, three cells:

```text
● portfolio.status: operational   |   build: passing   |   deploy: 3h ago   |   v1.2.0
```

Small dot on the left uses `--terminal-green` when everything is green, yellow if build failing. Never red — this is a portfolio, not a war room.

### Data source (live-first, silent fallback)

- On mount, `fetch` the GitHub Actions runs endpoint for the `equaan/portfolio` repo (public, no auth needed for public repos):
  - `https://api.github.com/repos/equaan/portfolio/actions/runs?per_page=1`
- Read `conclusion` (`success` / `failure`) and `updated_at`.
- Compute "3h ago" client-side from the timestamp.
- On any failure (network, rate limit, 4xx/5xx, timeout > 2s): silently use static fallback values baked into the component. No error UI, no layout shift — the fallback renders first and gets replaced only on successful fetch.
- Version: read from a constant in the component (updated manually on releases), or from `import.meta.env.VITE_APP_VERSION` if we want to wire it into the Vite config later.

### Non-goals

- No animated numbers, no flashy dashboard, no gauge charts. Deliberately understated so it reads as "real ops signal" not "look at me."

---

## Files touched

New:

- `src/components/TraceRequest.tsx`
- `src/components/CommandPalette.tsx`
- `src/components/HeroStatusBar.tsx`
- `src/hooks/useCommandPalette.ts`
- `src/lib/github-status.ts` (fetch helper with timeout + fallback)

Edited:

- `src/components/Hero.tsx` — add the trace button and status bar; keep the hero uncluttered.
- `src/pages/Index.tsx` — mount `<CommandPalette />` once.
- `src/components/Navigation.tsx` — add the `⌘K` hint chip.

Unchanged (per project memory): Skills, Projects card content, Certifications, Contact.

---

## Out of scope for this round

- Cursor scanner reveal — revisit after seeing how the hero reads with the three new features.
- Interactive AWS-style architecture diagram at page level — the case study already tells that story.
- New case studies for other projects — content work, not a build task.
- Any redesign of the metro-map idea — not compatible with the terminal aesthetic without a full rework.

---

## Verification before finishing

- `⌘K` and `Ctrl+K` both open the palette; `ESC` closes it.
- `run trace-request` from the palette triggers the same animation as the button.
- Status bar renders instantly with fallback values, then upgrades to live data if the API responds within 2s.
- Trace Request works with reduced-motion (instant staggered reveal).
- Lighthouse mobile score stays ≥ 90 (no new render-blocking work, no large deps added).
- Screenshot the hero via headless browser to confirm the status bar reads as subtle, not flashy.  
  
I'd like to ask fro these refinements before  implementation:
  - Shorten the Trace Request animation to about **4–5 seconds** total.
  - Rename the CTA to something more inviting, such as **"Trace Portfolio"** or **"Trace Infrastructure"**, while keeping "Trace Request" as the internal concept.
  - Simplify every tooltip to one concise explanation focused on what happens at that step.
  - Make the status bar read more naturally: **"System: Operational | CI: Passing | Updated: 3h ago | Release: v2.3"**.
  - Cache GitHub API responses to reduce unnecessary requests.
  - End the trace with a satisfying completion state such as **"Request Complete — Thanks for exploring."**
  - Keep the overlay narrow enough that the hero remains visible on desktop.

one additional feature id like to this round:  
After executing a command, show it briefly in the terminal style:

```

```

```
~/portfolio $ trace

Tracing infrastructure...

✓ Complete

~/portfolio $ open github

Opening GitHub...
```

It's a tiny touch, but it makes the palette feel like a real terminal instead of just a searchable menu, and it reinforces the engineering aesthetic without adding visual clutter.