import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Instagram,
  Send,
  Ghost,
  MessageCircle,
  PawPrint,
  Sparkles,
  Cat,
  RefreshCw,
} from "lucide-react";

const SOCIALS = [
  { name: "Instagram", handle: "@_equaan_", href: "https://www.instagram.com/_equaan_/", Icon: Instagram },
  { name: "Snapchat", handle: "@equaan8011", href: "https://snapchat.com/add/equaan8011", Icon: Ghost },
  { name: "Telegram", handle: "@shoyohinata8011", href: "https://t.me/shoyohinata8011", Icon: Send },
];

const MEMES = [
  "it works on my machine — so i deployed my machine",
  "my stack: 3 containers, 2 of them are on fire",
  "yaml indentation is my love language",
  "git push --force: the confidence of a person with no backups",
  "99 little bugs in the code · take one down, patch it around · 127 little bugs in the code",
  "the cloud is just someone else's computer. it is also on fire",
  "i don't always test my code, but when i do, i do it in production",
  "works on staging, dies in production, thriving in my dreams",
];

const COUNTER_KEY = "equaan.cats.summoned";
const CAT_ENDPOINT = "https://api.thecatapi.com/v1/images/search?size=medium";
const FACT_ENDPOINT = "https://catfact.ninja/fact";
const TIMEOUT_MS = 9000;

const fetchCat = async (signal: AbortSignal): Promise<string> => {
  const res = await fetch(CAT_ENDPOINT, { signal });
  if (!res.ok) throw new Error(`cat request failed: ${res.status}`);
  const data = await res.json();
  const url = Array.isArray(data) ? data[0]?.url : undefined;
  if (typeof url !== "string" || !url) throw new Error("empty cat response");
  return url;
};

const Links = () => {
  const [cat, setCat] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [meme, setMeme] = useState(MEMES[0]);
  const [fact, setFact] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const countRef = useRef(0);
  const nextRef = useRef<string | null>(null);
  const ctrlRef = useRef<AbortController | null>(null);

  const persist = (n: number) => {
    try {
      localStorage.setItem(COUNTER_KEY, String(n));
    } catch {
      /* storage unavailable — counter stays session-only */
    }
  };

  const prefetch = useCallback(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    fetchCat(ctrl.signal)
      .then((url) => {
        nextRef.current = url;
      })
      .catch(() => {
        nextRef.current = null;
      })
      .finally(() => clearTimeout(timer));
  }, []);

  const summon = useCallback(() => {
    ctrlRef.current?.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    setStatus("loading");

    const pending = nextRef.current ? Promise.resolve(nextRef.current) : fetchCat(ctrl.signal);
    nextRef.current = null;

    pending
      .then((url) => {
        setCat(url);
        setStatus("ready");
        setMeme(MEMES[Math.floor(Math.random() * MEMES.length)]);
        const next = countRef.current + 1;
        countRef.current = next;
        setCount(next);
        persist(next);
        prefetch();
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => clearTimeout(timer));
  }, [prefetch]);

  const toggleFact = useCallback(() => {
    if (fact) {
      setFact(null);
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    fetch(FACT_ENDPOINT, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`fact request failed: ${res.status}`))))
      .then((data) => {
        const text = typeof data?.fact === "string" ? data.fact.replace(/\\/g, "").trim() : null;
        setFact(text || "the fact cat is asleep — tap again in a second");
      })
      .catch(() => setFact("the fact cat is asleep — tap again in a second"))
      .finally(() => clearTimeout(timer));
  }, [fact]);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(COUNTER_KEY));
      if (Number.isFinite(saved) && saved > 0) {
        countRef.current = saved;
        setCount(saved);
      }
    } catch {
      /* ignore */
    }
    summon();
    return () => ctrlRef.current?.abort();
  }, [summon]);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-12">
      <Helmet>
        <title>Equaan · Say hi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-sm my-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 h-20 w-20 rounded-full border-2 border-primary/60 bg-card flex items-center justify-center font-mono text-2xl text-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
            EK
          </div>
          <h1 className="text-3xl font-bold">
            Hi, I'm <span className="text-primary">Equaan</span>
          </h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            online · open to chat
          </p>
        </div>

        <div className="space-y-3">
          {SOCIALS.map(({ name, handle, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 min-h-[56px] rounded-lg border border-border bg-card px-4 py-3 transition-all duration-300 hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_0_20px_hsl(var(--primary)/0.25)]"
            >
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              <div className="flex-1">
                <div className="font-medium">{name}</div>
                <div className="font-mono text-xs text-muted-foreground">{handle}</div>
              </div>
              <span className="font-mono text-primary">→</span>
            </a>
          ))}
        </div>

        <section
          className="mt-6 overflow-hidden rounded-lg border border-primary/30 bg-card"
          aria-label="Cat break"
          aria-busy={status === "loading"}
        >
          <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-destructive/70" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-terminal-yellow/70" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-terminal-green/70" aria-hidden />
            <span className="ml-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              cat_break.sh
            </span>
            <span className="ml-auto font-mono text-[10px] text-primary">
              {count} summoned
            </span>
          </div>

          <button
            type="button"
            onClick={summon}
            aria-label="Show me another cat"
            className="group relative block w-full aspect-[4/3] bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          >
            {status === "ready" && cat && (
              <img
                src={cat}
                alt={`Random cat number ${count}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            {status === "loading" && (
              <span className="flex h-full flex-col items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
                <Cat className="h-7 w-7 animate-pulse text-primary" aria-hidden />
                <span>
                  fetching cat<span className="animate-blink">_</span>
                </span>
              </span>
            )}
            {status === "error" && (
              <span className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center font-mono text-xs text-muted-foreground">
                <RefreshCw className="h-7 w-7 text-terminal-yellow" aria-hidden />
                the cat server is napping — tap to try again
              </span>
            )}
            {status === "ready" && (
              <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-background/80 px-2 py-1 font-mono text-[10px] text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                tap for another
              </span>
            )}
          </button>

          <p className="border-t border-border/60 px-3 py-2 font-mono text-[11px] leading-relaxed text-primary/90" aria-live="polite">
            {meme}
          </p>

          <div className="flex flex-wrap gap-2 border-t border-border/60 p-3">
            <button
              type="button"
              onClick={summon}
              disabled={status === "loading"}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 font-mono text-xs text-primary transition-colors duration-200 hover:bg-primary/20 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PawPrint className="h-4 w-4" aria-hidden />
              summon a cat
            </button>
            <button
              type="button"
              onClick={toggleFact}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-md border border-border bg-secondary/40 px-4 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              {fact ? "hide the fact" : "did you know"}
            </button>
          </div>

          {fact && (
            <p className="border-t border-border/60 px-3 py-3 text-xs leading-relaxed text-muted-foreground">
              <span className="font-mono text-primary">fact&gt;</span> {fact}
            </p>
          )}
        </section>

        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
          <div className="flex items-center gap-2 font-mono text-primary text-xs mb-1">
            <MessageCircle className="h-4 w-4" aria-hidden /> note
          </div>
          Don't be shy — text me anytime. I reply faster than you'd think, and cat gifs
          make me reply even faster.
        </div>
      </div>
    </main>
  );
};

export default Links;
