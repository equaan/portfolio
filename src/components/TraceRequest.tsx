import { useEffect, useRef, useState } from "react";
import { Activity, X, RotateCw, Check } from "lucide-react";

type Node = {
  id: string;
  label: string;
  detail: string;
};

const NODES: Node[] = [
  { id: "browser", label: "Browser Request", detail: "User navigates to equaan.dev. TLS handshake initiated." },
  { id: "dns", label: "DNS Resolution", detail: "equaan.dev resolved via Cloudflare DNS." },
  { id: "edge", label: "Cloudflare Edge", detail: "Nearest edge PoP terminates TLS and serves cached assets." },
  { id: "pages", label: "Cloudflare Pages", detail: "Static site deployed from GitHub, versioned per commit." },
  { id: "router", label: "React Router", detail: "Client-side route matched, no page reload." },
  { id: "app", label: "Portfolio App", detail: "React tree hydrated, components rendered." },
  { id: "projects", label: "Projects / Case Studies", detail: "Content ready. Request complete." },
];

const HOP_MS = 750; // ~4.5s across 6 nodes

type Props = {
  open: boolean;
  onClose: () => void;
};

export const TraceRequest = ({ open, onClose }: Props) => {
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = () => {
    clearTimers();
    setDone(false);
    setActive(-1);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Reveal all at once
      timers.current.push(window.setTimeout(() => {
        setActive(NODES.length - 1);
        setDone(true);
      }, 200));
      return;
    }

    NODES.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setActive(i), i * HOP_MS + 200)
      );
    });
    timers.current.push(
      window.setTimeout(() => setDone(true), NODES.length * HOP_MS + 200)
    );
  };

  useEffect(() => {
    if (open) run();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Trace Request"
    >
      {/* backdrop (click to close) */}
      <button
        aria-label="Close trace"
        onClick={onClose}
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
      />

      {/* narrow panel — desktop keeps hero visible */}
      <div className="relative w-full sm:w-[420px] max-w-full h-full bg-card/95 border-l border-primary/30 shadow-[0_0_40px_hsl(175_80%_50%_/_0.15)] flex flex-col animate-[slide-in-right_0.35s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Activity className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-foreground">trace</span>
            <span className="text-muted-foreground">portfolio</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 font-mono text-sm">
          <p className="text-xs text-muted-foreground mb-4">
            $ trace https://equaan.dev/
          </p>

          <ol className="relative">
            {NODES.map((n, i) => {
              const isActive = i === active;
              const isDoneNode = i < active || (done && i <= active);
              const isPending = i > active;
              return (
                <li key={n.id} className="relative pl-8 pb-6 last:pb-0">
                  {/* connector line */}
                  {i < NODES.length - 1 && (
                    <span
                      className={`absolute left-[11px] top-6 bottom-0 w-px transition-colors duration-300 ${
                        isDoneNode ? "bg-terminal-green/50" : "bg-border"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  {/* dot */}
                  <span
                    className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? "border-primary bg-primary/20 shadow-[0_0_16px_hsl(175_80%_50%_/_0.6)]"
                        : isDoneNode
                        ? "border-terminal-green/60 bg-terminal-green/10"
                        : "border-border bg-card"
                    }`}
                    aria-hidden="true"
                  >
                    {isDoneNode && !isActive ? (
                      <Check className="w-3 h-3 text-terminal-green" />
                    ) : (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/40"
                        }`}
                      />
                    )}
                  </span>

                  <div
                    className={`transition-opacity duration-300 ${
                      isPending ? "opacity-40" : "opacity-100"
                    }`}
                  >
                    <div
                      className={`text-sm ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {n.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {n.detail}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {done && (
            <div className="mt-4 pt-4 border-t border-border animate-fade-in">
              <p className="text-terminal-green">✓ Request Complete</p>
              <p className="text-xs text-muted-foreground mt-1">
                Thanks for exploring.
              </p>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">
            ESC to close
          </span>
          <button
            onClick={run}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/40 text-primary hover:bg-primary/10 font-mono text-xs transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Trace Again
          </button>
        </div>
      </div>
    </div>
  );
};
