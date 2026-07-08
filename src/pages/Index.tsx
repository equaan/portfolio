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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>equaan | DevOps & Cloud Engineer Portfolio</title>
        <meta name="description" content="Portfolio of equaan — Aspiring DevOps & Cloud Engineer. AWS, Kubernetes, Docker, Terraform, CI/CD & GitOps. View projects and download resume." />
        <link rel="canonical" href="https://equaan.github.io/portfolio/" />
        <meta property="og:title" content="equaan | DevOps & Cloud Engineer Portfolio" />
        <meta property="og:description" content="Aspiring DevOps & Cloud Engineer — AWS, Kubernetes, Terraform, CI/CD, GitOps. Open to roles." />
        <meta property="og:url" content="https://equaan.github.io/portfolio/" />
      </Helmet>
      <Navigation />
      <main>
        <Hero />
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
