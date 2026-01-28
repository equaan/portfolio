import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'Linux Essentials',
    issuer: 'LPI (Linux Professional Institute)',
    badgeUrl: 'https://www.credly.com/badges/3ef33140-2722-4279-8efd-2d5a88440796/public_url',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    }
  },
};

export const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(175_80%_50%_/_0.03)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 mb-6"
          >
            <code className="text-sm text-muted-foreground">cat</code>
            <span className="text-primary font-mono">~/certifications.txt</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications validating my technical skills
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center"
        >
          {certifications.map((cert) => (
            <motion.a
              key={cert.title}
              href={cert.badgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
              className="group relative max-w-md w-full"
            >
              <div className="h-full rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 hover:shadow-[0_0_40px_hsl(175_80%_50%_/_0.1)] transition-all duration-500">
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
                    <motion.div 
                      className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Award className="w-7 h-7 text-primary" />
                    </motion.div>
                    <div className="p-2 rounded-lg border border-border group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
                      <ExternalLink className="w-4 h-4" />
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
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
