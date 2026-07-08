// Live-first GitHub Actions status with silent fallback + localStorage cache.

export type PortfolioStatus = {
  system: "Operational" | "Degraded";
  ci: "Passing" | "Failing" | "Unknown";
  updatedAt: string; // ISO
  release: string;
  live: boolean; // true when fetched from GitHub
};

const CACHE_KEY = "portfolio_status_v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const FETCH_TIMEOUT_MS = 2000;

export const STATIC_FALLBACK: PortfolioStatus = {
  system: "Operational",
  ci: "Passing",
  updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  release: "v2.3",
  live: false,
};

const RELEASE = "v2.3";
const OWNER = "equaan";
const REPO = "portfolio";

export function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  if (!Number.isFinite(diffMs) || diffMs < 0) return "just now";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function readCache(): PortfolioStatus | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value: PortfolioStatus; ts: number };
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.value;
  } catch {
    return null;
  }
}

function writeCache(value: PortfolioStatus): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ value, ts: Date.now() }));
  } catch {
    // ignore
  }
}

export async function fetchPortfolioStatus(): Promise<PortfolioStatus> {
  const cached = readCache();
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/actions/runs?per_page=1`,
      {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      }
    );
    clearTimeout(timer);
    if (!res.ok) return STATIC_FALLBACK;
    const data = await res.json();
    const run = data?.workflow_runs?.[0];
    if (!run) return STATIC_FALLBACK;

    const passing = run.conclusion === "success" || run.status === "in_progress";
    const value: PortfolioStatus = {
      system: passing ? "Operational" : "Degraded",
      ci: run.conclusion === "success"
        ? "Passing"
        : run.conclusion === "failure"
        ? "Failing"
        : "Unknown",
      updatedAt: run.updated_at || new Date().toISOString(),
      release: RELEASE,
      live: true,
    };
    writeCache(value);
    return value;
  } catch {
    clearTimeout(timer);
    return STATIC_FALLBACK;
  }
}
