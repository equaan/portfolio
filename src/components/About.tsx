import { User, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const infoItems = [
  { icon: User, label: 'name', value: 'Mohammad Equaan Kacchi' },
  { icon: Briefcase, label: 'role', value: 'Aspiring DevOps Engineer' },
  { icon: MapPin, label: 'location', value: 'Mumbai, India' },
  { icon: GraduationCap, label: 'status', value: 'Seeking Internship' },
];

const stats = [
  { value: '🎯', label: 'Seeking Internship' },
  { value: '📚', label: 'Always Learning' },
  { value: '💡', label: 'Problem Solver' },
];

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(142_70%_50%_/_0.03)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-card/50 mb-6">
            <code className="text-sm text-muted-foreground">whoami</code>
            <span className="text-accent font-mono">--verbose</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal-style info card */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-terminal-yellow/60" />
                <div className="w-3 h-3 rounded-full bg-terminal-green/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">about.sh</span>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm space-y-4">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-muted-foreground">{item.label}:</span>
                      <span className="text-foreground ml-2">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Mohammad Equaan Kacchi, an enthusiastic beginner diving into the world of DevOps. 
              My journey started with a curiosity about how things work behind the scenes, and it led me 
              to the fascinating world of cloud infrastructure and automation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm currently learning CI/CD pipelines, container technologies like Docker and Kubernetes, 
              and cloud platforms like AWS. I believe in the philosophy of "automate everything" and I'm 
              eager to apply my skills in a real-world environment through an internship.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Based in Mumbai, India, I'm actively seeking internship opportunities where I can learn from 
              experienced professionals and contribute to meaningful projects while growing my DevOps expertise.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="text-center p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors duration-500"
                >
                  <div className="text-2xl font-bold text-gradient font-mono">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
