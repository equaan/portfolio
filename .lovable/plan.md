## Behind the Infrastructure — Cursor Scanner Reveal

A compact section placed **between Hero and About** that acts as a bridge from the Trace Portfolio animation into the rest of the site. Users hover a panel; a soft radial "scanner" mask follows the cursor and reveals the portfolio's real deployment architecture underneath a terminal deploy log.

### Placement & framing

- New section `<InfraScanner />` mounted in `src/pages/Index.tsx` between `<Hero />` and `<About />`.
- Section heading: `> inspect --deployment` (terminal-styled, small, muted). Subheading: *"Move your cursor across the panel to inspect the infrastructure behind this portfolio."*
- Compact: ~420px tall on desktop, ~360px on mobile. Not a full viewport section.
- Ties visually to Trace Portfolio by reusing the same node names (Browser, DNS, GitHub Pages, React Router, App, Projects).

### Two layers

**Top layer (default)** — a terminal deploy log, monospace, muted. Static content, feels like `gh actions` output:

```text
$ git push origin main
→ Triggering workflow: static.yml
✓ Checkout           2s
✓ Install deps       11s
✓ Build (vite)       6s
✓ Upload artifact    3s
✓ Deploy to Pages    4s
✓ Live at equaan.github.io/portfolio
```

**Bottom layer (revealed)** — an SVG architecture diagram of the *actual* portfolio stack. Six nodes with thin connecting lines, laid out horizontally-ish:

```text
[ Browser ] → [ DNS ] → [ GitHub Pages CDN ]
                              ↓
              [ React Router ] ← [ Vite Bundle ]
                              ↓
                        [ Projects / Case Study ]
```

Nodes rendered as small labeled cards with cyan borders, subtle terminal iconography (no logos — sticks to the aesthetic). Thin dashed lines for edges. Real, specific, not generic AWS.

### Scanner interaction

- The reveal uses a **CSS `mask-image` radial gradient** whose center tracks the cursor via a single `mousemove` handler that writes two CSS custom properties (`--mx`, `--my`). No React re-renders on move.
- Radius ~160px on desktop, ~110px on mobile. Soft feathered edge (60% opaque → 0%).
- When the cursor leaves the panel, the mask smoothly collapses back to radius 0 over 400ms — terminal fully covers the diagram again.
- On touch devices (no hover): show a subtle animated scanner that sweeps left→right on a 6s loop, so the effect isn't invisible on mobile. Respects `prefers-reduced-motion` by disabling the sweep and showing the diagram at 30% opacity behind the terminal permanently.
- The panel has a faint scanline overlay (2px repeating linear-gradient) to sell the "inspecting" feel.

### Accessibility

- Panel has `role="img"` with `aria-label="Portfolio deployment architecture: Browser to DNS to GitHub Pages CDN to React Router to Vite bundle to Projects"`.
- Below the panel, a visually-hidden `<ul>` lists the same nodes in reading order for screen readers.
- Keyboard users: pressing `Tab` into the panel toggles the diagram fully visible (no cursor needed).

### Files

New:

- `src/components/InfraScanner.tsx` — the section, both layers, cursor handler.

Edited:

- `src/pages/Index.tsx` — mount `<InfraScanner />` between Hero and About.

No new dependencies. Pure CSS mask + a tiny mousemove handler. No framer-motion for this piece (keeps the section lightweight).

### Verification

- Cursor over the panel reveals the diagram only inside the radial mask; rest stays terminal.
- Mouse leave → diagram fades back within ~400ms.
- Mobile: sweep animation runs, or reduced-motion fallback shows a faint permanent overlay.
- `Tab` focus toggles full reveal; screen reader announces the architecture list.
- Lighthouse mobile stays ≥ 90 (single component, no new deps, CSS-only animation).

### Out of scope

- No zoom/click-into-node behavior — this is inspection, not navigation. If it lands well, a round 3 could make each node click-through to the Trace Portfolio at that step.
- No live status per node — the status bar already covers that.
- Cursor scanner is **not** added anywhere else on the page.

&nbsp;

chatgpt gave this response to your plan, see this and if there is somehting good, use it else ignore it:  
  
Overall Rating

**Technical implementation:** ⭐⭐⭐⭐⭐ (10/10)

**Design:** ⭐⭐⭐⭐☆ (9/10)

**Performance:** ⭐⭐⭐⭐⭐ (10/10)

**Accessibility:** ⭐⭐⭐⭐⭐ (10/10)

**Recruiter impact:** ⭐⭐⭐☆☆ (7.5/10)

That's the score I'd focus on.

---

# What I LOVE

## 1. Placement

This is perfect.

```

```

```
Hero

↓

Inspect Deployment

↓

About
```

Excellent flow.

Don't move it.

---

## 2. CSS Mask

Absolutely the right approach.

No React rerenders.

No canvas.

No WebGL.

No GSAP.

Exactly how I'd build it.

---

## 3. Height

420px

Perfect.

Not another hero.

---

## 4. Mobile

Very good.

Most people forget mobile hover.

---

## 5. Accessibility

Fantastic.

Nothing to change.

---

# Now the important part.

## The biggest issue

This section answers

> **How is my portfolio deployed?**

But recruiters care about

> **Can this person build infrastructure?**

Those aren't exactly the same.

---

Look at the architecture.

```

```

```
Browser

↓

DNS

↓

GitHub Pages

↓

React Router

↓

Vite

↓

Projects
```

Technically accurate.

But...

It's honestly...

**boring.**

---

Imagine you're a recruiter.

You already know GitHub Pages.

You know React.

You know Vite.

You spend

10 seconds here.

Then leave.

Nothing memorable.

---

# The scanner should reveal something more valuable.

Instead...

Imagine this.

Top layer

```

```

```
terraform apply
```

Bottom layer

Your Backstage platform.

```

```

```
Developer

↓

Backstage

↓

GitHub PR

↓

GitHub Actions

↓

Terraform

↓

AWS
```

Now that's interesting.

---

Or

Cloud Cost Optimization.

```

```

```
EC2

↓

CloudWatch

↓

Lambda

↓

Scheduler

↓

Savings
```

---

Or

Container Architecture.

```

```

```
User

↓

Load Balancer

↓

Container

↓

Database
```

---

Those are YOUR systems.

Not GitHub Pages'.

---

# Another issue

The deploy log.

Current

```

```

```
git push

workflow

deploy

live
```

Looks nice.

But

It's just decoration.

---

I'd instead make it educational.

Example

```

```

```
$ git push origin main

✓ GitHub Actions triggered

✓ Vite production build

✓ Asset optimization

✓ Static deployment

✓ CDN cache refreshed

✓ Portfolio online
```

Much more satisfying.

---

# Section title

Current

```

```

```
inspect --deployment
```

Hmm...

Not bad.

But slightly cryptic.

I'd use

```

```

```
Inspect Infrastructure
```

or

```

```

```
Behind the Infrastructure
```

Because everyone understands it.

---

# Diagram layout

This is another thing.

Right now

```

```

```
Browser

↓

DNS

↓

GitHub Pages

↓

React Router

↓

Vite

↓

Projects
```

Feels...

Linear.

I'd make it breathe more.

Like

```

```

```
             Browser
                 │
              DNS
                 │
        GitHub Pages
                 │
     ┌───────────┴───────────┐
 React Router          Assets
     │                      │
 Components           Static Files
     └───────────┬───────────┘
             Portfolio
```

Much richer visually.

---

# Scanner radius

160px

Good.

But I'd add

very slight

parallax.

Like

2–3px.

Nothing more.

---

# Biggest missed opportunity

This surprised me.

The scanner

reveals.

But it doesn't explain.

Imagine hovering

GitHub Pages.

Tiny tooltip.

```

```

```
Static hosting

HTTPS

CDN

Zero server runtime
```

Hover

React Router

```

```

```
Client-side routing

No page refresh
```

Hover

Vite

```

```

```
Bundling

Tree shaking

Minification
```

Now the reveal teaches.

---

# One thing I'd remove

Scanlines.

Honestly.

I think scanlines are overused.

They scream

"Hacker UI."

Your portfolio is much more premium than that.

I'd remove them.

---

# Another concern

The architecture is only

your portfolio.

Not you.

That's a subtle but important distinction.

---

# What I'd build instead

This is what I would send Lovable.

---

### Layer 1

Terminal.

---

### Layer 2

Tabs.

```

```

```
Portfolio

Backstage

Cloud Cost

Containers
```

Hover

Backstage

Scanner reveals

that architecture.

Hover

Portfolio

Scanner reveals

portfolio architecture.

Hover

Containers

Scanner reveals

container project.

Now the section becomes

an engineering showcase.

Not just

"my site is deployed on GitHub Pages."

---

# My biggest recommendation

This is the one thing I'd absolutely change.

Don't lock the scanner to your portfolio deployment.

Make it a **system inspector**.

Let it inspect **one of your real projects**.

Because recruiters hire you based on the systems you've designed, not the hosting platform you've chosen.