import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, GraduationCap } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(142_70%_50%_/_0.03)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-card/50 mb-6">
            <code className="text-sm text-muted-foreground">whoami</code>
            <span className="text-accent font-mono">--verbose</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal-style info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
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
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">name:</span>
                    <span className="text-foreground ml-2">[Your Name]</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">role:</span>
                    <span className="text-foreground ml-2">Senior DevOps Engineer</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">location:</span>
                    <span className="text-foreground ml-2">[Your City, Country]</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">experience:</span>
                    <span className="text-foreground ml-2">X+ years</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate DevOps Engineer with a deep love for automation, infrastructure as code, 
              and building systems that scale. My journey started with a curiosity about how things work 
              behind the scenes, and it led me to the fascinating world of cloud infrastructure.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in designing and implementing CI/CD pipelines, container orchestration with 
              Kubernetes, and cloud-native architectures on AWS. I believe in the philosophy of 
              "automate everything" and strive to make deployments as smooth as a <code className="text-primary">git push</code>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not writing YAML or debugging containers, you can find me contributing to 
              open-source projects, exploring new DevOps tools, or sharing knowledge with the community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: 'X+', label: 'Years Exp' },
                { value: 'XX+', label: 'Projects' },
                { value: 'XX%', label: 'Uptime SLA' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-gradient font-mono">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
