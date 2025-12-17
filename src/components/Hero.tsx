import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight, Download } from 'lucide-react';

const roles = [
  'Aspiring DevOps Engineer',
  'Cloud Enthusiast',
  'Automation Learner',
];

export const TypingAnimation = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < role.length) {
            setDisplayedText(role.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole]);

  return (
    <span className="inline-flex items-center">
      <motion.span 
        className="text-gradient"
        layout
        transition={{ duration: 0.05 }}
      >
        {displayedText}
      </motion.span>
      <motion.span 
        className="w-0.5 h-8 bg-primary ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
};

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(175_80%_50%_/_0.05)_0%,_transparent_70%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220_15%_20%_/_0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(220_15%_20%_/_0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mb-8"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <code className="text-sm text-muted-foreground">~/portfolio</code>
            <ChevronRight className="w-4 h-4 text-primary" />
            <span className="text-terminal-green text-sm">ready</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-mono"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient">Equaan</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl font-mono mb-8 h-12"
          >
            <TypingAnimation />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A passionate beginner exploring the world of DevOps, cloud infrastructure, and automation. 
            Currently seeking internship opportunities to learn and grow in this exciting field.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md font-mono text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 hover:shadow-[0_0_30px_hsl(175_80%_50%_/_0.5)] transition-all duration-500">
                View My Work
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.a>
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md font-mono text-sm border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_hsl(175_80%_50%_/_0.3)] transition-all duration-500">
                Get In Touch
              </button>
            </motion.a>
            <motion.a 
              href="/resume.pdf"
              download="Mohammad_Equaan_Kacchi_Resume.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md font-mono text-sm border border-accent/50 bg-transparent text-accent hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_15px_hsl(185_70%_45%_/_0.3)] transition-all duration-500">
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [12, 14, 12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-20 h-20 border border-primary/20 rounded-lg rotate-12 hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-16 h-16 border border-accent/20 rounded-full hidden lg:block"
        />
      </div>
    </section>
  );
};
