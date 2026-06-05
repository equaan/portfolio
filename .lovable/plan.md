## Goal

Two deliverables:
1. Update the **Experience** section on the portfolio with a concise, ideal-length entry for the Opt IT internship (Feb 19 – Apr 19, 2025).
2. Create a root-level markdown file with full project context + a ready-to-paste **Experience for Resume** block.

---

## 1. Update `src/components/Experience.tsx`

Replace the existing single entry with an updated, tighter version. Keep the same visual structure (timeline card, role/company/dates/location, description, 3–4 bullet highlights — matching the "ideal size" most portfolios use).

**New entry content:**
- Role: `Cloud Services Intern`
- Company: `Opt IT Technologies`
- Location: `India`
- Dates: `Feb 2025 — Apr 2025`
- Description (1–2 lines): Built an Internal Developer Platform on Backstage.io enabling self-service multi-cloud infrastructure provisioning for client onboarding.
- Highlights (4 bullets, action-led, concise):
  - Developed 7+ Backstage scaffolder templates for AWS, Azure, and GCP infrastructure (VPC, S3, RDS, EKS, AKS, GKE) plus CI/CD, Ansible, and observability setups.
  - Architected a 3-repo system (Backstage app, template catalog, Terraform modules) with version-pinned modules via git tags for reproducible infra.
  - Built a 7-step client onboarding wizard chaining templates to provision a full cloud stack from a single form submission.
  - Automated GitOps workflow using Nunjucks templating to render Terraform/IaC files and open pull requests on client GitHub repos.

No other components touched.

---

## 2. Create `INTERNSHIP_NOTES.md` in the project root

Structure:

```text
# Opt IT Technologies — Cloud Services Internship

## Overview
- Company, role, duration (Feb 19 – Apr 19, 2025), team context
- One-paragraph summary of what was built

## The Problem
- Manual Terraform work, repetitive client onboarding, no standardization

## The Solution: Backstage.io IDP
- High-level architecture, why Backstage

## Repository Architecture
### 1. backstage-2nd — Backstage app portal
### 2. opt-it-catalog — Scaffolder templates (7+ templates listed)
### 3. opt-it-modules — Version-pinned Terraform modules (git tags)

## End-to-End Workflow
ASCII flow: Engineer fills form → Backstage runs template.yaml →
fetches pinned modules → Nunjucks renders skeleton → PR on client repo →
review & merge → terraform apply

## Key Technologies
Backstage.io, Terraform, Nunjucks, GitHub Actions, AWS, Azure, GCP,
Ansible, YAML, Git tags for module versioning

## Skills Gained
Service catalogue, software templates, IaC, multi-cloud, GitOps,
PR-based workflows, module versioning

---

# Experience for Resume

**Cloud Services Intern — Opt IT Technologies**  *(Feb 2025 – Apr 2025)*

- Engineered an Internal Developer Platform on Backstage.io, reducing client cloud onboarding time from days to under 30 minutes through self-service form-driven provisioning.
- Built 7+ scaffolder templates covering AWS, Azure, and GCP infrastructure (VPC, S3, RDS, EKS, AKS, GKE), CI/CD pipelines, Ansible configs, and observability stacks.
- Designed a 3-repository architecture with git-tag-pinned Terraform modules, enabling reproducible, version-controlled infrastructure across 100% of client deployments.
- Automated a GitOps workflow using Nunjucks templating that renders IaC files and opens pull requests on client GitHub repos, eliminating manual Terraform boilerplate.
```

Numbers above (days→30 min, 100%) are illustrative — flagged in the file with a note so the user can replace with real figures before pasting into their resume.

---

## Files touched
- `src/components/Experience.tsx` (edit)
- `INTERNSHIP_NOTES.md` (create at project root)