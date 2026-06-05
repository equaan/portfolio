# Opt IT Technologies — Cloud Services Internship

## Overview
- **Company:** Opt IT Technologies
- **Role:** Cloud Services Intern
- **Duration:** Feb 19, 2025 — Apr 19, 2025 (2 months)
- **Summary:** Built an Internal Developer Platform (IDP) on Backstage.io that lets engineers provision multi-cloud infrastructure for clients through self-service forms — replacing manual Terraform work with a standardized, PR-based GitOps workflow.

## The Problem
- Client onboarding required repetitive, error-prone manual Terraform work.
- No standardization across AWS / Azure / GCP setups for different clients.
- Engineers re-wrote the same VPC / DB / cluster code for every new project.
- No version control or reproducibility across client infrastructure.

## The Solution: Backstage.io IDP
A self-service portal where an engineer fills a form, picks the cloud + components, and Backstage scaffolds production-ready IaC into the client's GitHub repo as a pull request — ready to review and `terraform apply`.

## Repository Architecture

### 1. `backstage-2nd` — Backstage app portal
The Backstage instance itself. Hosts the UI engineers log into, registers the catalog, and runs the scaffolder.

### 2. `opt-it-catalog` — Scaffolder templates
- `catalog-info.yaml` registers every template.
- 7+ software templates covering:
  - AWS infrastructure (VPC, S3, RDS, EKS)
  - Azure infrastructure (VNet, Storage, AKS)
  - GCP infrastructure (VPC, GCS, GKE)
  - CI/CD pipelines (GitHub Actions)
  - Ansible configurations
  - Observability / monitoring stack
  - Container security scanning
- A 7-step **client onboarding wizard** that chains multiple templates together so a single form submission provisions a full cloud stack.

### 3. `opt-it-modules` — Reusable Terraform modules
- Centralized, versioned Terraform modules.
- Pinned via **git tags** so each template fetches a specific, reproducible version.
- Single source of truth for infra code across all clients.

## End-to-End Workflow

```text
Engineer opens Backstage  →  picks a template  →  fills form
        ↓
Backstage executes template.yaml steps
        ↓
Fetches modules from opt-it-modules (pinned to git tags)
        ↓
Renders skeleton files with form values (Nunjucks templating)
        ↓
Opens a Pull Request on the client's GitHub repository
        ↓
Engineer reviews PR and merges
        ↓
Client runs `terraform init && terraform apply`
```

## Key Technologies
Backstage.io · Terraform · Nunjucks templating · GitHub Actions · GitHub API · AWS · Azure · GCP · Ansible · YAML · Git tags for module versioning

## Skills Gained
- Backstage service catalogue & software templates
- Multi-cloud Infrastructure as Code
- GitOps and PR-based provisioning workflows
- Module versioning and reproducible infrastructure
- Internal Developer Platform design

---

# Experience for Resume

> Replace the illustrative figures (onboarding time, %, counts) with real numbers before pasting into your resume.

**Cloud Services Intern — Opt IT Technologies**  *(Feb 2025 – Apr 2025)*

- Engineered an Internal Developer Platform on Backstage.io that reduced client cloud onboarding time from ~2 days to under 30 minutes through self-service, form-driven provisioning.
- Developed 7+ scaffolder templates covering AWS, Azure, and GCP infrastructure (VPC, S3, RDS, EKS, AKS, GKE), CI/CD pipelines, Ansible configs, and observability stacks.
- Architected a 3-repository system with git-tag-pinned Terraform modules, enabling 100% reproducible, version-controlled infrastructure across all client deployments.
- Automated a GitOps workflow using Nunjucks templating that renders IaC files and opens pull requests on client GitHub repos, eliminating manual Terraform boilerplate for every new project.
