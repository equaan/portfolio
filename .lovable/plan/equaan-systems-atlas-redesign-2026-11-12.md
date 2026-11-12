# EQUAAN — SYSTEMS ATLAS redesign

## Safety gate

The current workspace is on a managed `edit/...` branch, not `main` or `portfolio-redesign`. No application files have been changed. Before implementation, create `portfolio-redesign` from the latest `main` and switch the Lovable preview to it using the branch controls. The redesign stays on that branch: no production configuration, domain, or deployment changes; no merge or publish without your explicit approval.

## Stages

1. **Audit and preserve** — Map existing pages, navigation, project details, external links, resume download, metadata, sitemap, robots rules, and CI. Keep the existing `/links` social page independent and unlinked from the professional portfolio. Preserve the certification and all verified content. Correct or omit claims that cannot be supported by the resume, project guides, or repositories.
2. **New visual system and homepage** — Establish the paper, ink, green, and orange palette with Space Grotesk, Inter, and JetBrains Mono; redesign the navigation and editorial homepage around the nameplate (no portrait asset is present), the requested student introduction, internship availability, Atlas CTA, GitHub, and LinkedIn. Recompose—not merely recolor—the page into distinct Atlas, selected work, experience, toolkit, field notes, certification, and contact sections.
3. **Systems Atlas** — Build the four-route topology as a responsive, keyboard-operable systems map. Hover/focus highlights connected paths; selecting a node reveals contextual details; project nodes link to their case studies. Add route reset, restrained route drawing, visible focus, reduced-motion behavior, and a vertically navigable mobile explorer that does not shrink the desktop diagram.
4. **Selected work and case studies** — Reframe the three named projects around problem, architecture, decisions, contribution, implementation, trade-offs, and lessons. Preserve existing Backstage and Local Guide Booking routes and add a Cloud Cost Optimization case-study route. Verify details against the actual repositories and existing guides before writing. Use genuine screenshots only if they exist in those sources; do not fabricate screenshots, metrics, production claims, or features.
5. **Positioning, navigation, and metadata** — Audit every professional page, footer, resume link, and public-facing metadata for accurate final-year Computer Science student and internship positioning. Keep Cloudflare Pages/CDN, `equaan.dev`, and GitHub Actions CI accurate; retain the resume, canonical URLs, social metadata, structured data, sitemap, robots, and working nested-page refresh behavior. Do not expose `/links` in navigation or indexing.
6. **Responsive and quality verification** — Check desktop, tablet, and mobile layouts; keyboard and reduced-motion behavior; every route, anchor, project/repository link, and resume download. Run the existing lint, TypeScript, and production-build checks; fix issues found. Do not promote or deploy the redesign.

## Technical approach

- Keep React/Vite and the current dependency set; prefer existing semantic design tokens and CSS/SVG for the map and route motion over heavy new libraries.
- Keep the existing case-study URLs, adding `/projects/cloud-cost-optimization`; update routing, scroll-to-top behavior, and sitemap for the new page.
- Use real project evidence where available. Existing project files contain claims that require validation; unavailable or unverified evidence will not be presented as fact.
- Record the new Atlas and case-study structure in the project’s `AGENTS.md` before implementation is complete.

My response:

&nbsp;

The plan looks good. I approve the proposed creative direction and implementation stages, with a few important conditions:

&nbsp;

1. First, resolve the branch situation. Switch to the latest main branch, create portfolio-redesign directly from main, and then switch the Lovable workspace to portfolio-redesign. Do not create it from the current managed edit/... branch.

&nbsp;

2. Before implementation, verify that portfolio-redesign contains the same baseline code as the latest main.

&nbsp;

3. Keep equaan.dev serving the existing production version throughout the entire process. No production deployments, merges, domain changes or modifications to Cloudflare production settings.

&nbsp;

4. Keep the Systems Atlas visually sophisticated but understandable. Prioritize a clean, readable network with four distinct routes rather than overcrowding it with technologies and nodes.

&nbsp;

5. Preserve the existing /links page and its functionality independently of the professional portfolio.

&nbsp;

6. Do not invent project details or achievements. Verify claims against actual project evidence.

&nbsp;

7. Implement the redesign in stages, and let me review the preview after the homepage and Systems Atlas are implemented before proceeding with the remaining sections.

&nbsp;

8. Do not merge or publish to production without my explicit approval.

&nbsp;

Once the correct branch is active and verified, you can begin Stage 1.