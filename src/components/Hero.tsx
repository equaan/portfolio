import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => (
  <section id="home" className="editorial-hero" aria-labelledby="hero-heading">
    <div className="editorial-hero-inner">
      <div className="editorial-hero-copy">
        <div className="editorial-status">
          <span className="editorial-status-dot" aria-hidden="true" />
          <span>Open to DevOps · Cloud · Platform internships</span>
        </div>

        <p className="editorial-eyebrow">Engineer in progress <span>·</span> Mumbai, India</p>
        <p className="editorial-nameplate">Mohammad Equaan Kacchi</p>

        <h1 id="hero-heading" className="editorial-title">
          I build, connect and understand the <em>systems behind software.</em>
        </h1>

        <p className="editorial-intro">
          Final-year Computer Engineering student exploring DevOps, Cloud and Platform
          Engineering through practical engineering projects.
        </p>

        <div className="editorial-actions">
          <Button asChild className="atlas-primary-action">
            <a href="#atlas">
              Explore the Atlas <ArrowDown aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" className="atlas-secondary-action">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Mohammad_Equaan_Kacchi_Resume.pdf"
            >
              Resume <Download aria-hidden="true" />
            </a>
          </Button>
          <a
            className="editorial-social-link"
            href="https://github.com/equaan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mohammad Equaan Kacchi on GitHub"
          >
            <Github aria-hidden="true" />
            <span>GitHub</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            className="editorial-social-link"
            href="https://www.linkedin.com/in/equaan-devops"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mohammad Equaan Kacchi on LinkedIn"
          >
            <Linkedin aria-hidden="true" />
            <span>LinkedIn</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <aside className="hero-field-note" aria-label="Atlas index: four engineering routes">
        <div className="hero-field-note-heading">
          <span>ATLAS INDEX</span>
          <span>FIELD 01—04</span>
        </div>
        <div className="hero-field-map" aria-hidden="true">
          <svg viewBox="0 0 360 255" preserveAspectRatio="xMidYMid meet">
            <path className="hero-map-line hero-map-line--platform" d="M24 42 H106 L158 82 H330" />
            <path className="hero-map-line hero-map-line--delivery" d="M24 99 H116 L166 126 H330" />
            <path className="hero-map-line hero-map-line--cloud" d="M24 158 H110 L162 168 H330" />
            <path className="hero-map-line hero-map-line--observability" d="M24 218 H108 L160 204 H330" />
            <path className="hero-map-crossing" d="M158 82 V204" />
            <circle className="hero-map-junction" cx="158" cy="126" r="6" />
            {[42, 99, 158, 218].map((y) => (
              <circle className="hero-map-node" cx="24" cy={y} r="4" key={y} />
            ))}
            {[82, 126, 168, 204].map((y) => (
              <circle className="hero-map-node" cx="330" cy={y} r="4" key={y} />
            ))}
          </svg>
        </div>
        <ol className="hero-field-list">
          <li><span>01</span> Platform engineering</li>
          <li><span>02</span> DevSecOps &amp; delivery</li>
          <li><span>03</span> Cloud &amp; infrastructure</li>
          <li><span>04</span> Observability</li>
        </ol>
        <a className="hero-field-coordinate" href="#atlas">
          Follow the routes <ArrowDown aria-hidden="true" />
        </a>
      </aside>
    </div>
    <div className="editorial-hero-footer" aria-hidden="true">
      <span>PERSONAL SYSTEMS ATLAS</span>
      <span>2026 <span className="editorial-footer-mark">/</span> MUMBAI, IN</span>
    </div>
  </section>
);