import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, BookOpen } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/equaan', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/equaan-devops', label: 'LinkedIn' },
  { icon: BookOpen, href: 'https://medium.com/@equaankacchi367', label: 'Medium' },
  { icon: Mail, href: 'mailto:equaankacchi367@gmail.com', label: 'Email' },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(175_80%_50%_/_0.05)_0%,_transparent_50%)]" />
      
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
            <code className="text-sm text-muted-foreground">echo</code>
            <span className="text-primary font-mono">"Hello World"</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating, hiring, or just chatting tech? I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold font-mono mb-4 text-foreground">
              Let's <span className="text-gradient">connect</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm actively seeking full-time DevOps and Cloud Engineering roles (open to contract & freelance too).
              Feel free to reach out through any of these channels.
            </p>
          </div>

          {/* Social Links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                aria-label={`Contact via ${link.label}`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="group flex items-center gap-3 px-6 py-4 min-h-[48px] rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(175_80%_50%_/_0.1)] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
