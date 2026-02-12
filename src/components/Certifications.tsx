import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'Linux Essentials',
    issuer: 'LPI (Linux Professional Institute)',
    badgeUrl: 'https://www.credly.com/badges/3ef33140-2722-4279-8efd-2d5a88440796/public_url',
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(175_80%_50%_/_0.03)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 mb-6">
            <code className="text-sm text-muted-foreground">cat</code>
            <span className="text-primary font-mono">~/certifications.txt</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications validating my technical skills
          </p>
        </div>

        <div className="flex justify-center">
          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.badgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative max-w-md w-full animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="h-full rounded-xl border border-border bg-card/50 overflow-hidden hover:border-primary/50 hover:shadow-[0_0_40px_hsl(175_80%_50%_/_0.1)] transition-all duration-500">
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow/60" />
                  <div className="w-3 h-3 rounded-full bg-terminal-green/60" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">certificate.crt</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                      <Award className="w-7 h-7 text-primary" aria-hidden="true" />
                    </div>
                    <div className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg border border-border group-hover:border-primary/50 group-hover:text-primary transition-all duration-300" aria-hidden="true">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-mono mb-2 text-foreground group-hover:text-gradient transition-all duration-500">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Issued by {cert.issuer}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-primary font-mono">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      Verified ✓
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
