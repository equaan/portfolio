import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { TraceRequest } from "@/components/TraceRequest";
import {
  Activity,
  Download,
  ExternalLink,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Navigation as NavIcon,
} from "lucide-react";

type CmdAction = {
  id: string;
  label: string;
  hint: string;
  run: () => string; // returns echo line
  icon: React.ComponentType<{ className?: string }>;
};

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [trace, setTrace] = useState(false);
  const [echo, setEcho] = useState<string[]>([]);
  const navigate = useNavigate();

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const goto = useCallback(
    (id: string) => {
      if (window.location.pathname !== import.meta.env.BASE_URL) {
        navigate("/");
        setTimeout(() => scrollTo(id), 250);
      } else {
        scrollTo(id);
      }
    },
    [navigate, scrollTo]
  );

  const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const runEcho = (line: string) => {
    setEcho((prev) => [...prev.slice(-2), line]);
    // Auto-clear echoes after a moment
    setTimeout(() => setEcho((prev) => prev.slice(1)), 2200);
  };

  const actions: CmdAction[] = [
    { id: "goto-home",     label: "goto home",         hint: "Scroll to top",           icon: Home,       run: () => { goto("home"); return "~/portfolio $ goto home"; } },
    { id: "goto-about",    label: "goto about",        hint: "About section",           icon: NavIcon,    run: () => { goto("about"); return "~/portfolio $ goto about"; } },
    { id: "goto-exp",      label: "goto experience",   hint: "Experience section",      icon: NavIcon,    run: () => { goto("experience"); return "~/portfolio $ goto experience"; } },
    { id: "goto-skills",   label: "goto skills",       hint: "Skills section",          icon: NavIcon,    run: () => { goto("skills"); return "~/portfolio $ goto skills"; } },
    { id: "goto-projects", label: "goto projects",     hint: "Projects section",        icon: NavIcon,    run: () => { goto("projects"); return "~/portfolio $ goto projects"; } },
    { id: "goto-certs",    label: "goto certifications", hint: "Certifications",        icon: NavIcon,    run: () => { goto("certifications"); return "~/portfolio $ goto certifications"; } },
    { id: "goto-contact",  label: "goto contact",      hint: "Contact section",         icon: NavIcon,    run: () => { goto("contact"); return "~/portfolio $ goto contact"; } },
    { id: "case-idp",      label: "open case-study: backstage-idp", hint: "Read the deep-dive", icon: FileText, run: () => { navigate("/projects/backstage-idp"); return "~/portfolio $ open case-study backstage-idp"; } },
    { id: "trace",         label: "run trace-request", hint: "Animate a request through the stack", icon: Activity, run: () => { setTrace(true); return "~/portfolio $ trace — tracing infrastructure..."; } },
    { id: "dl-cv",         label: "dl resume.pdf",     hint: "Download CV",             icon: Download,   run: () => { window.location.href = `${import.meta.env.BASE_URL}resume.pdf`; return "~/portfolio $ dl resume.pdf"; } },
    { id: "open-github",   label: "open github",       hint: "github.com/equaan",       icon: Github,     run: () => { openUrl("https://github.com/equaan"); return "~/portfolio $ open github — opening..."; } },
    { id: "open-linkedin", label: "open linkedin",     hint: "LinkedIn profile",        icon: Linkedin,   run: () => { openUrl("https://www.linkedin.com/in/equaan/"); return "~/portfolio $ open linkedin — opening..."; } },
    { id: "open-email",    label: "open email",        hint: "Send an email",           icon: Mail,       run: () => { window.location.href = "mailto:equaan.k@gmail.com"; return "~/portfolio $ open email"; } },
  ];

  const execute = (a: CmdAction) => {
    const line = a.run();
    runEcho(line);
    setOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    // Listen for a custom event so the Hero button can open the palette
    const onOpen = () => setOpen(true);
    const onTrace = () => { setTrace(true); runEcho("~/portfolio $ trace — tracing infrastructure..."); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen as EventListener);
    window.addEventListener("cmdk:trace", onTrace as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen as EventListener);
      window.removeEventListener("cmdk:trace", onTrace as EventListener);
    };
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-2 px-3 pt-3 font-mono text-xs text-muted-foreground">
          <span className="text-primary">~/portfolio</span>
          <span>$</span>
        </div>
        <CommandInput placeholder="Type a command… (goto, open, run, dl)" className="font-mono" />
        <CommandList className="font-mono">
          <CommandEmpty>No matching command.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {actions.filter((a) => a.id.startsWith("goto")).map((a) => (
              <CommandItem key={a.id} value={a.label} onSelect={() => execute(a)}>
                <a.icon className="mr-2 h-4 w-4 text-primary" />
                <span>{a.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{a.hint}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Run">
            {actions.filter((a) => a.id === "trace" || a.id === "case-idp").map((a) => (
              <CommandItem key={a.id} value={a.label} onSelect={() => execute(a)}>
                <a.icon className="mr-2 h-4 w-4 text-primary" />
                <span>{a.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{a.hint}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="External">
            {actions.filter((a) => a.id.startsWith("open") || a.id === "dl-cv").map((a) => (
              <CommandItem key={a.id} value={a.label} onSelect={() => execute(a)}>
                <a.icon className="mr-2 h-4 w-4 text-primary" />
                <span>{a.label}</span>
                <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Terminal echo of last executed command(s) */}
      {echo.length > 0 && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] pointer-events-none max-w-[92vw]"
          aria-live="polite"
        >
          <div className="rounded-md border border-primary/30 bg-card/90 backdrop-blur-sm px-3 py-2 font-mono text-xs text-muted-foreground shadow-lg space-y-0.5">
            {echo.map((line, i) => (
              <div key={i} className="whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="text-terminal-green">{line}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <TraceRequest open={trace} onClose={() => setTrace(false)} />
    </>
  );
};
