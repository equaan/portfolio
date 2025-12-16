import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Terminal } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/equaan', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/equaan-devops', label: 'LinkedIn' },
  { icon: Mail, href: 'equaankacchi367@gmail.com', label: 'Email' },
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

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
            Have a project in mind or just want to chat about DevOps? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-terminal-yellow/60" />
                <div className="w-3 h-3 rounded-full bg-terminal-green/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">contact.sh</span>
              </div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="p-6 space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">$</span> name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">$</span> email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">$</span> message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
                    placeholder="Your message..."
                    required
                  />
                </motion.div>
                <motion.button
                  variants={fadeInUp}
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg font-mono text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 hover:shadow-[0_0_30px_hsl(175_80%_50%_/_0.5)] transition-all duration-500"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold font-mono mb-4 text-foreground">
                Let's <span className="text-gradient">connect</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
                Feel free to reach out through any of these channels.
              </p>
            </div>

            {/* Social Links */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(175_80%_50%_/_0.1)] transition-all duration-500"
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

            {/* Terminal prompt */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="p-4 rounded-xl border border-border bg-card/50"
            >
              <div className="flex items-center gap-2 font-mono text-sm">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">~$</span>
                <span className="text-terminal-green">curl</span>
                <span className="text-foreground">-X POST /api/contact</span>
                <motion.span 
                  className="w-2 h-4 bg-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
