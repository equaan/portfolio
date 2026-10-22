import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, FlaskConical, ShieldCheck, GitBranch, Container, CheckCircle2, Workflow } from 'lucide-react';

const CaseStudyLocalGuideBooking = () => {
  const url = 'https://equaan.dev/projects/local-guide-booking';

  return (
    <>
      <Helmet>
        <title>Local Guide Booking Case Study — DevSecOps Pipeline | equaan</title>
        <meta
          name="description"
          content="Deep-dive case study: building a Flask booking app and its full DevSecOps delivery chain — an 11-stage Jenkins pipeline, SonarQube and Trivy gates, and GitOps deployment to K3s with Ansible, Helm and Argo CD."
        />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Local Guide Booking Case Study — DevSecOps Pipeline" />
        <meta
          property="og:description"
          content="From source code to a monitored release: 51 tests, quality and vulnerability gates, immutable images, and GitOps deployment on K3s with Argo CD."
        />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Local Guide Booking Case Study — DevSecOps Pipeline" />
        <meta
          name="twitter:description"
          content="Flask booking app with a full DevSecOps delivery chain: Jenkins, Trivy, Argo CD, K3s, Prometheus."
        />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Local Guide Booking System — DevSecOps Delivery Chain Case Study',
          author: { '@type': 'Person', name: 'Mohammad Equaan Kacchi' },
          about: ['DevSecOps', 'Jenkins', 'Docker', 'K3s', 'Argo CD', 'GitOps', 'Prometheus'],
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
                <span className="text-primary font-mono text-sm">./case-studies/local-guide-booking.md</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-mono mb-4">
                Local Guide Booking: <span className="text-gradient">A DevSecOps Delivery Chain</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The application itself is deliberately small — guides publish availability slots,
                travelers request bookings, guides confirm them. The real project outcome is
                everything around it: a complete, production-style path from a developer push to a
                monitored release running on Kubernetes.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="https://github.com/equaan/local-guide-booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-md font-mono text-sm border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" /> local-guide-booking
                </a>
                <a
                  href="https://github.com/equaan/local-guide-booking-gitops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-md font-mono text-sm border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                >
                  <GitBranch className="w-4 h-4" aria-hidden="true" /> gitops repo
                </a>
              </div>
            </header>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> The Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Most projects stop at "it runs on my machine". I wanted the opposite: an app that
                ships the way production software does — every change tested, scanned, gated,
                versioned immutably, and deployed by a GitOps controller rather than by hand.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The application domain is a classic two-sided booking flow: travelers browse
                published slots and request bookings, guides own their slots and confirm or cancel
                requests, and booking state changes are recorded as an auditable timeline.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> The Application
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Flask with an application factory pattern. Routes are thin — they parse input, call
                services, and return a response — so every business rule lives in testable service
                modules:
              </p>
              <ul className="space-y-2 text-muted-foreground pl-2 mb-4">
                <li>• Role-based access: visitor, traveler, guide — checked at every sensitive route</li>
                <li>• Database constraints as the final correctness guarantee: partial unique indexes allow at most one CONFIRMED booking per slot, and at most one active booking per traveler/slot</li>
                <li>• Status lifecycle <code className="text-primary">PENDING → CONFIRMED / CANCELLED</code>, with events written in the same transaction as the status change</li>
                <li>• Liveness (<code className="text-primary">/health</code>) and readiness (<code className="text-primary">/ready</code>) endpoints for Kubernetes probes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Security basics are non-negotiable: Werkzeug password hashes, CSRF-protected POST
                forms, HttpOnly/SameSite cookies, parameterized SQLAlchemy statements, and a
                production config that rejects the default <code className="text-primary">SECRET_KEY</code>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> The 11-Stage Jenkins Pipeline
              </h2>
              <div className="rounded-lg border border-border bg-card/50 p-6 font-mono text-sm text-muted-foreground overflow-x-auto">
                <pre className="leading-relaxed whitespace-pre">{`git push  →  Jenkins picks it up
        ↓
1. Checkout  →  2. CI venv + deps
        ↓
3. pytest (JUnit + coverage XML)
4. Selenium E2E on a real browser
        ↓
5. SonarQube analysis
6. Quality gate — can abort the build
        ↓
7. Docker build (immutable tag)
8. Trivy scan — fixable HIGH/CRITICAL aborts
        ↓
9. Push to Docker Hub
10. Commit new image tag to the GitOps repo
11. Archive reports, coverage, logs, screenshots`}</pre>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The numbers: <strong className="text-foreground">51 pytest</strong> unit/integration
                tests at <strong className="text-foreground">94% branch-aware coverage</strong> and{' '}
                <strong className="text-foreground">5 Selenium E2E journeys</strong>. The quality
                gate is the important distinction — a SonarQube dashboard is passive and needs a
                human to look at it, but the Jenkins gate waits for webhook feedback and stops the
                release stages when quality fails.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Hardened Releases
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    icon: Container,
                    name: 'Two-stage Docker build',
                    desc: 'Builder stage installs pinned runtime deps; runtime stage copies only what is needed and runs Gunicorn as a non-root appuser (UID/GID 10001).',
                  },
                  {
                    icon: ShieldCheck,
                    name: 'Trivy gates',
                    desc: 'Fixable HIGH/CRITICAL vulnerabilities block the release. Images are published as immutable tags: v0.1.0-<build>-<sha>.',
                  },
                  {
                    icon: FlaskConical,
                    name: 'Secrets never in Git',
                    desc: 'Docker Hub and GitHub credentials live in Jenkins credentials; the Grafana admin password lives in a Kubernetes Secret.',
                  },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="rounded-lg border border-border bg-card/50 p-4 hover:border-primary/50 transition-colors"
                  >
                    <r.icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                    <code className="block text-sm text-primary font-mono mb-1">{r.name}</code>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{r.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The two-stage build keeps the final image small and free of development tooling,
                with runtime dependencies pinned through a lock file — the image someone pulls is
                byte-for-byte reproducible, not "whatever pip resolved today".
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> GitOps Deployment on K3s
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ansible bootstraps a single-node K3s cluster (idempotent — a second run changes
                nothing) and installs Helm and Argo CD. Two repositories split responsibility:
              </p>
              <ul className="space-y-2 text-muted-foreground pl-2 mb-6">
                <li>• <code className="text-primary">local-guide-booking</code> — app, tests, Jenkinsfile, Dockerfile, Ansible, Argo CD application manifests</li>
                <li>• <code className="text-primary">local-guide-booking-gitops</code> — the Helm chart and release values that Argo CD observes</li>
              </ul>
              <div className="rounded-lg border border-border bg-card/50 p-6 font-mono text-sm text-muted-foreground overflow-x-auto">
                <pre className="leading-relaxed whitespace-pre">{`Jenkins pushes image  →  commits new tag to GitOps values
        ↓
Argo CD detects the revision
        ↓
Helm reconciles K3s resources
        ↓
Migration init container runs (before Gunicorn)
        ↓
Readiness probe passes  →  pod serves traffic`}</pre>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Rollback is rehearsed with <code className="text-primary">git revert --no-edit</code>:
                the corrective commit is detected by Argo CD, which restores the previous image —
                no history rewriting, no manual <code className="text-primary">kubectl</code> surgery.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Monitoring — and a Real Incident
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The app exposes <strong className="text-foreground">6 custom Prometheus metrics</strong>{' '}
                (request counts, latency histogram, booking transitions, registrations, slots
                created, current bookings), scraped every 15 seconds into a Grafana dashboard.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                One design decision matters more than the count: metrics are labelled by the Flask{' '}
                <em>URL rule</em>, not the raw URL — labelling by raw path would create unbounded
                metric cardinality as numeric booking IDs accumulate.
              </p>
              <div className="rounded-lg border border-primary/30 bg-card/40 p-5">
                <div className="font-mono text-sm text-primary mb-2">$ incident log</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prometheus reported the app target down. The cause: the metrics endpoint queried
                  the bookings table before migrations had run — a SQLite missing-table error. The
                  fix went into the GitOps chart as a non-root database-migrations init container
                  that runs migrations before Gunicorn starts, with both containers sharing the app
                  data directory. After the repair,{' '}
                  <code className="text-primary">up{'{job="local-guide-booking"}'}</code> returned 1.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-mono mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'Flask',
                  'Jenkins',
                  'Docker',
                  'K3s',
                  'Argo CD',
                  'Helm',
                  'Ansible',
                  'Prometheus',
                  'Grafana',
                  'SonarQube',
                  'Trivy',
                  'Selenium',
                  'pytest',
                  'Ruff',
                  'Bandit',
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
                <li>• Pipelines as the definition of "done" — a merge isn't a release until tests, gates and scans pass</li>
                <li>• Active quality gates beat passive dashboards: the build that fails loudly is the build that gets fixed</li>
                <li>• Database constraints, not application checks, are the real guarantee under concurrency</li>
                <li>• GitOps turns rollback into a one-line git revert the controller executes</li>
                <li>• Monitoring only proves its worth when it catches a real incident — and it did</li>
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
                  href="https://github.com/equaan/local-guide-booking"
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

export default CaseStudyLocalGuideBooking;
