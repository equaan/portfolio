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
import { InfraScanner } from '@/components/InfraScanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>equaan | Computer Engineering Student · DevOps & Cloud</title>
        <meta name="description" content="Final-year Computer Engineering student seeking DevOps, Cloud & Platform Engineering internships. Projects with AWS, Docker, Kubernetes, Terraform and CI/CD." />
        <link rel="canonical" href="https://equaan.dev/" />
        <meta property="og:title" content="equaan | CE Student · Aspiring DevOps & Cloud Engineer" />
        <meta property="og:description" content="Final-year CE student building production-grade cloud infrastructure projects. Seeking DevOps, Cloud & Platform Engineering internships." />
        <meta property="og:url" content="https://equaan.dev/" />
      </Helmet>
      <Navigation />
      <main>
        <Hero />
        <InfraScanner />
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
