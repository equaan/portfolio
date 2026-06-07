import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Layers, GitBranch, Workflow, Package, CheckCircle2 } from 'lucide-react';

const CaseStudyBackstageIDP = () => {
  const url = 'https://equaan.github.io/portfolio/projects/backstage-idp';

  return (
    <>
      <Helmet>
        <title>Backstage IDP Case Study — Multi-Cloud DevOps Project | equaan</title>
        <meta
          name="description"
          content="Deep-dive case study: building an Internal Developer Platform on Backstage.io with multi-cloud Terraform templates and a GitOps PR workflow across AWS, Azure & GCP."
        />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Backstage IDP Case Study — Multi-Cloud DevOps Project" />
        <meta
          property="og:description"
          content="How I built a self-service Internal Developer Platform on Backstage.io with 7+ scaffolder templates, git-tag-pinned Terraform modules, and a GitOps PR workflow."
        />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Backstage IDP Case Study — Multi-Cloud DevOps Project" />
        <meta
          name="twitter:description"
          content="Self-service IDP on Backstage.io: AWS/Azure/GCP Terraform templates + GitOps PR workflow."
        />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Backstage IDP for Multi-Cloud Provisioning — Case Study',
          author: { '@type': 'Person', name: 'Mohammad Equaan Kacchi' },
          about: ['DevOps', 'Backstage.io', 'Terraform', 'GitOps', 'Internal Developer Platform'],
          url,
          mainEntityOfPage: url,
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            cd ../
          </Link>

          <article>
            <header className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 mb-6">
                <code className="text-sm text-muted-foreground">cat</code>
                <span className="text-primary font-mono text-sm">./case-studies/backstage-idp.md</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-mono mb-4">
                Backstage IDP for <span className="text-gradient">Multi-Cloud Provisioning</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A deep-dive into one of my favourite DevOps projects: building a self-service
                Internal Developer Platform on Backstage.io that turns multi-cloud onboarding
                from a two-day manual Terraform exercise into a 30-minute form submission.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="https://github.com/equaan/opt-it-catalog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-md font-mono text-sm border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" /> opt-it-catalog
                </a>
                <a
                  href="https://backstage.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-md font-mono text-sm border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" /> backstage.io
                </a>
              </div>
            </header>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> The Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Onboarding a new client at Opt IT Technologies meant an engineer re-writing the
                same VPC, database, and Kubernetes Terraform code by hand — for every new
                project, on every cloud. The result:
              </p>
              <ul className="space-y-2 text-muted-foreground pl-2">
                <li>• Error-prone, copy-paste IaC with no standardization across AWS / Azure / GCP</li>
                <li>• No reproducibility — each client repo drifted into its own snowflake</li>
                <li>• Slow onboarding (~2 days) before the first <code className="text-primary">terraform apply</code></li>
                <li>• Zero version control on the infra patterns themselves</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> The Solution: a Backstage.io IDP
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I designed and built an Internal Developer Platform on Backstage.io: a
                self-service portal where an engineer logs in, picks a template, fills a form,
                and Backstage scaffolds production-ready IaC straight into the client's GitHub
                repository as a pull request — ready for review and{' '}
                <code className="text-primary">terraform apply</code>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Architecture
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The platform is split into three repositories, each with a single responsibility:
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    icon: Layers,
                    name: 'backstage-2nd',
                    role: 'Backstage portal',
                    desc: 'The Backstage app itself — UI, catalog, scaffolder runtime.',
                  },
                  {
                    icon: Package,
                    name: 'opt-it-catalog',
                    role: 'Scaffolder templates',
                    desc: '7+ software templates covering AWS, Azure, GCP, CI/CD, Ansible, monitoring.',
                  },
                  {
                    icon: GitBranch,
                    name: 'opt-it-modules',
                    role: 'Terraform modules',
                    desc: 'Versioned, git-tag-pinned Terraform modules — single source of truth.',
                  },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="rounded-lg border border-border bg-card/50 p-4 hover:border-primary/50 transition-colors"
                  >
                    <r.icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                    <code className="block text-sm text-primary font-mono mb-1">{r.name}</code>
                    <div className="text-xs text-muted-foreground font-mono mb-2">{r.role}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Splitting the catalog and the modules lets template authors iterate on UX without
                touching infra code, and lets infra authors release new module versions safely —
                templates pin to a specific git tag, so an upgrade is an opt-in PR, never a
                surprise.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> End-to-End GitOps Workflow
              </h2>
              <div className="rounded-lg border border-border bg-card/50 p-6 font-mono text-sm text-muted-foreground overflow-x-auto">
                <pre className="leading-relaxed whitespace-pre">{`Engineer opens Backstage  →  picks a template  →  fills form
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
Client runs \`terraform init && terraform apply\``}</pre>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The PR-based handoff is the key design decision. Nothing touches a client
                environment without a human review, and every change to a client's infra has
                full git history attached — auditable, revertable, and code-reviewed by default.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Templates Built
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'AWS infrastructure — VPC, S3, RDS, EKS',
                  'Azure infrastructure — VNet, Storage, AKS',
                  'GCP infrastructure — VPC, GCS, GKE',
                  'CI/CD pipelines on GitHub Actions',
                  'Ansible configuration playbooks',
                  'Observability & monitoring stack',
                  'Container security scanning',
                  '7-step client onboarding wizard',
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-2 rounded-md border border-border bg-card/30 px-3 py-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'Backstage.io',
                  'Terraform',
                  'Nunjucks',
                  'GitHub Actions',
                  'GitHub API',
                  'AWS',
                  'Azure',
                  'GCP',
                  'Ansible',
                  'YAML',
                  'Git tags',
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> What I Took Away
              </h2>
              <ul className="space-y-2 text-muted-foreground pl-2">
                <li>• Internal Developer Platform design — golden paths over policy</li>
                <li>• Backstage software templates &amp; service catalog at a real scale</li>
                <li>• Multi-cloud IaC patterns that don't collapse into a giant root module</li>
                <li>• Module versioning via git tags for safe, opt-in rollouts</li>
                <li>• GitOps as the default handoff between platform and product teams</li>
              </ul>
            </section>

            <footer className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Workflow className="w-6 h-6 text-primary" aria-hidden="true" />
              <div className="flex gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-md font-mono text-sm border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> back to portfolio
                </Link>
                <a
                  href="https://github.com/equaan/opt-it-catalog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-md font-mono text-sm border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" /> view source
                </a>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
};

export default CaseStudyBackstageIDP;
