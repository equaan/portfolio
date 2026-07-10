import { useEffect, useRef, useState } from 'react';

type NodeDef = {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  tooltip: string;
};

type SystemDef = {
  id: string;
  label: string;
  log: string[];
  nodes: NodeDef[];
  edges: [string, string][];
};

const SYSTEMS: SystemDef[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    log: [
      '$ git push origin main',
      '',
      '→ GitHub Actions: Portfolio CI',
      '✓ Checkout repository',
      '✓ npm ci',
      '✓ ESLint passed',
      '✓ TypeScript type check passed',
      '✓ Production build completed',
      '',
      '→ Cloudflare Pages',
      '✓ Upload build',
      '✓ Edge deployment complete',
      '✓ Cache propagated globally',
      '',
      '✓ Live at https://equaan.dev',
    ],
    nodes: [
      { id: 'dev',    label: 'Developer',        x: 50, y: 6,  tooltip: 'Commits & pushes changes to the portfolio repository.' },
      { id: 'repo',   label: 'GitHub Repo',      x: 50, y: 22, tooltip: 'Source of truth. Every commit triggers CI and deployment.' },
      { id: 'ci',     label: 'GitHub Actions',   x: 50, y: 40, tooltip: 'Continuous Integration: installs dependencies, runs ESLint, TypeScript type check, and verifies a production build.' },
      { id: 'pages',  label: 'Cloudflare Pages', x: 50, y: 58, tooltip: 'Automatically builds and deploys every successful commit from GitHub, serving the static site globally.' },
      { id: 'cdn',    label: 'Cloudflare Edge',  x: 22, y: 78, tooltip: 'Global CDN caches assets close to visitors for fast loading and low latency.' },
      { id: 'domain', label: 'equaan.dev',       x: 78, y: 78, tooltip: 'Custom domain managed through Cloudflare DNS with HTTPS enabled.' },
      { id: 'app',    label: 'Portfolio App',    x: 50, y: 94, tooltip: 'React 18 + Tailwind. Hydrated in the browser after edge delivery.' },
    ],
    edges: [
      ['dev', 'repo'],
      ['repo', 'ci'],
      ['ci', 'pages'],
      ['pages', 'cdn'],
      ['pages', 'domain'],
      ['cdn', 'app'],
      ['domain', 'app'],
    ],
  },
  {
    id: 'backstage',
    label: 'Backstage IDP',
    log: [
      '$ terraform apply -auto-approve',
      '→ Backstage scaffolder: new-service template',
      '✓ Repo provisioned via GitHub API',
      '✓ CI workflow committed (build + test + scan)',
      '✓ Terraform: ECR + ECS service + ALB target',
      '✓ ArgoCD sync → cluster',
      '✓ Service registered in Backstage catalog',
    ],
    nodes: [
      { id: 'dev',    label: 'Developer',      x: 50, y: 8,  tooltip: 'Fills a Backstage software template — service name, owner, tier.' },
      { id: 'bs',     label: 'Backstage',      x: 50, y: 28, tooltip: 'Scaffolder plugin renders the template and opens a PR.' },
      { id: 'gh',     label: 'GitHub PR',      x: 22, y: 52, tooltip: 'PR contains service repo + CI workflow + IaC. Reviewed & merged.' },
      { id: 'tf',     label: 'Terraform',      x: 78, y: 52, tooltip: 'Provisions ECR, ECS service, IAM roles, ALB listener rule.' },
      { id: 'gha',    label: 'GitHub Actions', x: 22, y: 78, tooltip: 'Build → test → security scan → push image to ECR.' },
      { id: 'aws',    label: 'AWS',            x: 78, y: 78, tooltip: 'ECS Fargate task pulls the image and joins the ALB target group.' },
    ],
    edges: [
      ['dev', 'bs'],
      ['bs', 'gh'],
      ['bs', 'tf'],
      ['gh', 'gha'],
      ['tf', 'aws'],
      ['gha', 'aws'],
    ],
  },
];

const NodeCard = ({ node, hovered, onHover, onLeave }: {
  node: NodeDef;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
    style={{ left: `${node.x}%`, top: `${node.y}%` }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onFocus={onHover}
    onBlur={onLeave}
    tabIndex={0}
    role="button"
    aria-label={`${node.label}: ${node.tooltip}`}
  >
    <div className={`px-2.5 py-1 rounded-md border font-mono text-[10px] md:text-xs whitespace-nowrap transition-colors ${
      hovered
        ? 'border-primary bg-primary/15 text-primary shadow-[0_0_14px_hsl(var(--terminal-cyan)/0.4)]'
        : 'border-primary/40 bg-card/80 text-foreground/90'
    }`}>
      {node.label}
    </div>
    {hovered && (
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2 py-1 rounded border border-primary/40 bg-background/95 backdrop-blur-sm font-mono text-[10px] text-muted-foreground max-w-[220px] w-max text-center leading-snug z-10">
        {node.tooltip}
      </div>
    )}
  </div>
);

const Diagram = ({ system, hoveredId, setHoveredId }: {
  system: SystemDef;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) => {
  const nodeById = Object.fromEntries(system.nodes.map((n) => [n.id, n]));

  return (
    <div className="absolute inset-0">
      {/* edges */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {system.edges.map(([from, to], i) => {
          const a = nodeById[from];
          const b = nodeById[to];
          if (!a || !b) return null;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="hsl(var(--terminal-cyan))"
              strokeOpacity="0.35"
              strokeWidth="0.25"
              strokeDasharray="1 1"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {/* nodes */}
      {system.nodes.map((n) => (
        <NodeCard
          key={n.id}
          node={n}
          hovered={hoveredId === n.id}
          onHover={() => setHoveredId(n.id)}
          onLeave={() => setHoveredId(hoveredId === n.id ? null : hoveredId)}
        />
      ))}
    </div>
  );
};

export const InfraScanner = () => {
  const [systemId, setSystemId] = useState<string>(SYSTEMS[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const system = SYSTEMS.find((s) => s.id === systemId) ?? SYSTEMS[0];

  // Cursor-tracked CSS variables for the radial mask
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onMove = (e: MouseEvent) => {
      const rect = panel.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      panel.style.setProperty('--mx', `${x}%`);
      panel.style.setProperty('--my', `${y}%`);
    };
    const onEnter = () => setRevealed(true);
    const onLeave = () => {
      setRevealed(false);
      setHoveredId(null);
    };

    panel.addEventListener('mousemove', onMove);
    panel.addEventListener('mouseenter', onEnter);
    panel.addEventListener('mouseleave', onLeave);
    return () => {
      panel.removeEventListener('mousemove', onMove);
      panel.removeEventListener('mouseenter', onEnter);
      panel.removeEventListener('mouseleave', onLeave);
    };
  }, [systemId]);

  const open = revealed || focusOpen;

  const ariaLabel = `${system.label} architecture: ${system.nodes.map((n) => n.label).join(' to ')}`;

  return (
    <section
      id="infrastructure"
      className="relative py-16 md:py-20 px-4"
      aria-labelledby="infra-scanner-heading"
    >
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-card/50 font-mono text-[11px] text-primary mb-3">
            <span className="text-terminal-green">$</span>
            <span>inspect --system</span>
          </div>
          <h2
            id="infra-scanner-heading"
            className="text-2xl md:text-3xl font-mono font-bold mb-2"
          >
            Behind the <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Move your cursor across the panel to inspect the real architecture underneath. Hover a node for details.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-4" role="tablist" aria-label="Choose system to inspect">
          {SYSTEMS.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === systemId}
              onClick={() => {
                setSystemId(s.id);
                setHoveredId(null);
              }}
              className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-colors ${
                s.id === systemId
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          ref={panelRef}
          className="relative w-full h-[380px] md:h-[420px] rounded-lg border border-primary/30 bg-card/40 backdrop-blur-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/50"
          role="img"
          aria-label={ariaLabel}
          style={{
            // @ts-expect-error CSS custom props
            '--mx': '50%',
            '--my': '50%',
          }}
          onFocus={() => setFocusOpen(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusOpen(false);
          }}
        >
          {/* Bottom layer: architecture diagram */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: open ? 1 : 0.001 }}
            aria-hidden="true"
          >
            <Diagram system={system} hoveredId={hoveredId} setHoveredId={setHoveredId} />
          </div>

          {/* Top layer: terminal log with cursor-tracked radial mask */}
          <div
            className="absolute inset-0 bg-background/95 p-4 md:p-6 font-mono text-[11px] md:text-xs text-muted-foreground leading-relaxed transition-[mask-size,-webkit-mask-size,opacity] duration-300 pointer-events-none"
            aria-hidden="true"
            style={{
              WebkitMaskImage: open
                ? 'radial-gradient(circle 150px at var(--mx) var(--my), transparent 0%, transparent 55%, hsl(0 0% 0%) 100%)'
                : 'none',
              maskImage: open
                ? 'radial-gradient(circle 150px at var(--mx) var(--my), transparent 0%, transparent 55%, hsl(0 0% 0%) 100%)'
                : 'none',
            }}
          >
            {system.log.map((line, i) => (
              <div key={i} className={line.startsWith('✓') ? 'text-terminal-green/90' : line.startsWith('$') ? 'text-primary' : line.startsWith('→') ? 'text-foreground/80' : ''}>
                {line || '\u00A0'}
              </div>
            ))}
          </div>

          {/* Hint pill */}
          <div className={`absolute bottom-3 right-3 px-2 py-1 rounded border border-border bg-background/70 backdrop-blur-sm font-mono text-[10px] text-muted-foreground pointer-events-none transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}>
            hover to inspect →
          </div>
        </div>

        {/* Deployment status strip — terminal-styled, subtle */}
        {system.id === 'portfolio' && (
          <div className="mt-4 rounded-md border border-border/70 bg-card/40 backdrop-blur-sm px-4 py-3 font-mono text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-wider text-muted-foreground/70">
              <span className="text-terminal-green">$</span>
              <span>status --last-deployment</span>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <span><span className="text-muted-foreground/70">CI:</span> <span className="text-terminal-green">Passing</span></span>
              <span><span className="text-muted-foreground/70">Hosting:</span> <span className="text-foreground/90">Cloudflare Pages</span></span>
              <span><span className="text-muted-foreground/70">Domain:</span> <span className="text-primary">equaan.dev</span></span>
              <span><span className="text-muted-foreground/70">HTTPS:</span> <span className="text-terminal-green">Enabled</span></span>
              <span><span className="text-muted-foreground/70">CDN:</span> <span className="text-terminal-green">Active</span></span>
            </div>
          </div>
        )}

        {/* SR-only architecture list */}
        <ul className="sr-only">
          {system.nodes.map((n) => (
            <li key={n.id}>{n.label}: {n.tooltip}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
