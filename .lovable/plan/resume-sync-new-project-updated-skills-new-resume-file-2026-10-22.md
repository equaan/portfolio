# Resume sync: new project, updated skills, new resume file

Source of truth: the uploaded `Resume.pdf` (Oct 2026) and `Local-Guide-Booking-Viva-Guide.md`.

## 1. Swap the resume file

- Replace `public/resume.pdf` with the uploaded `Resume.pdf` (copy from `/mnt/user-uploads/`).
- The Hero "Download CV" button already points at `resume.pdf` — no code change needed, it will serve the new file.

## 2. Add the Local Guide Booking project (`src/components/Projects.tsx`)

New card, placed right after the Backstage card (newest work first):

- **Title**: Local Guide Booking System
- **GitHub**: [https://github.com/equaan/local-guide-booking](https://github.com/equaan/local-guide-booking)
- **Description** (problem → what was built → engineering decisions, figures straight from the resume/guide):
  - Flask app where local guides publish availability slots and travelers request bookings; guides confirm or cancel.
  - The real outcome is the DevSecOps delivery chain around it: an 11-stage Jenkins pipeline running 51 pytest tests (94% branch-aware coverage), 5 Selenium E2E journeys, and a SonarQube quality gate that can abort the build.
  - Releases secured with a two-stage Docker build, non-root runtime, Trivy gates for fixable HIGH/CRITICAL findings, secrets kept in Jenkins credentials / Kubernetes Secrets (never Git), immutable Docker Hub images.
  - Deployed to a single-node K3s cluster with Ansible, Helm and Argo CD (GitOps; rollback via git revert). Fixed a real incident (metrics endpoint querying unmigrated tables) with a migration init container.
  - 6 custom Prometheus metrics + Grafana dashboard.
- **Tech tags**: Flask, Jenkins, Docker, K3s, Argo CD, Helm, Ansible, Prometheus, Grafana, SonarQube, Trivy (trimmed so the card stays readable)
- **Icon**: lucide `Gauge` (delivery/monitoring motif)

## 3. Update the Backstage repo link

- `src/components/Projects.tsx` — Backstage card GitHub link → `https://github.com/equaan/backstage`
- `src/pages/CaseStudyBackstageIDP.tsx` — the two "opt-it-catalog" buttons (header and footer) → same new link. The three-repo architecture narrative in the case study stays as-is; only the button target changes.

## 4. Add the new project's tools to the skills section (`src/components/Skills.tsx`)

Keep the existing skills grid exactly as it is and only **add the tools used in the new project** (per the resume/guide) alongside the previous ones, same card style and animations:

- **New cards**: Jenkins, K3s, Ansible, Helm, Argo CD, Prometheus, Grafana, SonarQube, Trivy

That takes the grid from 8 to 17 cards (2/3/4-column responsive grid already handles it). Categories on the new cards: Jenkins (CI/CD), K3s (Orchestration), Ansible (Automation), Helm (Packaging), Argo CD (GitOps), Prometheus & Grafana (Monitoring), SonarQube (Code Quality), Trivy (Security).

## 5. Sync the Experience section (`src/components/Experience.tsx`)

Match the new resume exactly:

- Dates: **Feb 2026 – Apr 2026**, Remote (site currently says Feb–Apr 2025, India)
- Bullets reworded to the resume's five points (IDP design, 7+ scaffolder templates + versioned Terraform modules, GitOps onboarding workflow with Nunjucks + PRs, GitHub Actions integration across AWS/Azure/GCP, EC2 deployment with Docker + on-prem rollout investigation)

## 6. Sweep for stale references

- Grep the site for "2025" / old internship dates anywhere else (Hero status bar, About, Footer) and align them with the 2026 dates if they mention the internship window.

## Verification

- Check the build log after edits.
- Playwright: load the homepage, confirm the new project card and grouped skills render on desktop + mobile, no console errors; confirm `/resume.pdf` now serves the new file (byte size / first page differs from the old one).

&nbsp;

if possible add a case study on this new project too ( not giving orders, just asking your opinion, if adding would be good decision, add it, otherwise let it be)

also see that we can add this project into already existing animations or things which are there or we can create a new animation or transition thing, or an animaiton button which opens a transition animation which starts wiht dev pushing code and jenkins triggers, argo cd triggers and all (what you think?)

&nbsp;