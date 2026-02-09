import { lazy, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';

// Lazy load below-fold components for better initial load performance
const About = lazy(() => import('@/components/About').then(m => ({ default: m.About })));
const Skills = lazy(() => import('@/components/Skills').then(m => ({ default: m.Skills })));
const Projects = lazy(() => import('@/components/Projects').then(m => ({ default: m.Projects })));
const Certifications = lazy(() => import('@/components/Certifications').then(m => ({ default: m.Certifications })));
const Contact = lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

// Minimal loading placeholder to prevent CLS
const SectionPlaceholder = () => (
  <div className="min-h-[50vh]" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={<SectionPlaceholder />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
