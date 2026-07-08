import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight, Download, Activity } from 'lucide-react';
import { HeroStatusBar } from '@/components/HeroStatusBar';

const roles = [
  'Aspiring DevOps Engineer',
  'Cloud & Automation Enthusiast',
  'Open to DevOps Roles',
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
    <span className="inline-flex items-center min-h-[2rem]">
      <span className="text-gradient">
        {displayedText}
      </span>
      <span 
        className="w-0.5 h-8 bg-primary ml-1 animate-blink"
      />
    </span>
  );
};

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects - static, no JS animations */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(175_80%_50%_/_0.05)_0%,_transparent_70%)]" />
      
      {/* Grid pattern - static */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220_15%_20%_/_0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(220_15%_20%_/_0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mb-8"
          >
            <Terminal className="w-4 h-4 text-primary" aria-hidden="true" />
            <code className="text-sm text-muted-foreground">~/portfolio</code>
            <ChevronRight className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-terminal-green text-sm">ready</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-mono"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient">Equaan</span>
            <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
              — DevOps & Cloud Engineer
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="text-2xl md:text-3xl lg:text-4xl font-mono mb-8 min-h-[3rem] flex items-center justify-center"
          >
            <TypingAnimation />
          </motion.div>

          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Recently completed a Cloud Services internship at Opt IT Technologies (Feb–Apr 2025), where I built an Internal Developer Platform on Backstage.io.
            Now actively seeking full-time DevOps & Cloud Engineering roles.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
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
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
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
            
            {/* --- FIXED SECTION BELOW --- */}
            <motion.a 
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Mohammad_Equaan_Kacchi_Resume.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md font-mono text-sm border border-accent/50 bg-transparent text-accent hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_15px_hsl(185_70%_45%_/_0.3)] transition-all duration-500">
                <Download className="w-4 h-4" aria-hidden="true" />
                Download CV
              </button>
            </motion.a>
            {/* --------------------------- */}
            
          </motion.div>

          <HeroStatusBar />
        </motion.div>

        {/* Trace Portfolio floating action — signature interaction */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('cmdk:trace'))}
          className="absolute top-24 right-4 md:right-8 z-20 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-primary/40 bg-card/70 backdrop-blur-sm font-mono text-xs text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_hsl(175_80%_50%_/_0.35)] transition-all"
          aria-label="Trace a request through the portfolio infrastructure"
        >
          <Activity className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Trace Portfolio</span>
          <span className="sm:hidden">Trace</span>
        </button>


        {/* Floating elements - using CSS animations for performance */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-primary/20 rounded-lg rotate-12 hidden lg:block animate-float" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-accent/20 rounded-full hidden lg:block animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};
