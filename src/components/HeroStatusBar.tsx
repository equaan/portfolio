import { useEffect, useState } from "react";
import {
  fetchPortfolioStatus,
  formatRelative,
  STATIC_FALLBACK,
  type PortfolioStatus,
} from "@/lib/github-status";

export const HeroStatusBar = () => {
  const [status, setStatus] = useState<PortfolioStatus>(STATIC_FALLBACK);

  useEffect(() => {
    let mounted = true;
    fetchPortfolioStatus().then((s) => {
      if (mounted) setStatus(s);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const dotColor =
    status.system === "Operational" && status.ci !== "Failing"
      ? "bg-terminal-green shadow-[0_0_8px_hsl(var(--terminal-green))]"
      : "bg-terminal-yellow shadow-[0_0_8px_hsl(var(--terminal-yellow))]";

  return (
    <div
      className="mx-auto mt-10 max-w-2xl px-3 py-2 rounded-md border border-border/60 bg-card/40 backdrop-blur-sm font-mono text-[11px] md:text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
      role="status"
      aria-live="polite"
      aria-label="Portfolio operational status"
    >
      <span className="inline-flex items-center gap-2">
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span>System: <span className="text-foreground/90">{status.system}</span></span>
      </span>
      <span className="text-border">|</span>
      <span>
        CI: <span className={status.ci === "Passing" ? "text-terminal-green" : "text-terminal-yellow"}>{status.ci}</span>
      </span>
      <span className="text-border">|</span>
      <span>Updated: <span className="text-foreground/90">{formatRelative(status.updatedAt)}</span></span>
      <span className="text-border">|</span>
      <span>Release: <span className="text-foreground/90">{status.release}</span></span>
    </div>
  );
};
