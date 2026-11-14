import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Certifications } from '@/components/Certifications';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { SystemsAtlas } from '@/components/SystemsAtlas';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mohammad Equaan Kacchi — Systems Atlas</title>
        <meta name="description" content="A final-year Computer Engineering student exploring DevOps, Cloud and Platform Engineering through practical projects and a Systems Atlas." />
        <link rel="canonical" href="https://equaan.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mohammad Equaan Kacchi — Systems Atlas" />
        <meta property="og:description" content="A final-year Computer Engineering student exploring DevOps, Cloud and Platform Engineering through practical projects." />
        <meta property="og:url" content="https://equaan.dev/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" />
      </Helmet>
      <Navigation />
      <main>
        <Hero />
        <SystemsAtlas />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
};

export default Index;
