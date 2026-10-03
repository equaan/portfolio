import { Helmet } from "react-helmet-async";
import { Instagram, Send, Ghost, MessageCircle } from "lucide-react";

const SOCIALS = [
  { name: "Instagram", handle: "@_equaan_", href: "https://www.instagram.com/_equaan_/", Icon: Instagram },
  { name: "Snapchat", handle: "@equaan8011", href: "https://snapchat.com/add/equaan8011", Icon: Ghost },
  { name: "Telegram", handle: "@shoyohinata8011", href: "https://t.me/shoyohinata8011", Icon: Send },
];

const Links = () => (
  <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-12">
    <Helmet>
      <title>Equaan · Say hi</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="w-full max-w-sm animate-fade-in">
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

      <div className="mt-8 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
        <div className="flex items-center gap-2 font-mono text-primary text-xs mb-1">
          <MessageCircle className="h-4 w-4" aria-hidden /> note
        </div>
        Don't be shy — text me anytime. I reply faster than you'd think. 👋
      </div>
    </div>
  </main>
);

export default Links;
