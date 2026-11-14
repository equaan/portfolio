import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Atlas', href: '#atlas' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="site-wordmark" href="#home" onClick={closeMenu} aria-label="Equaan — home">
          <span className="site-wordmark-symbol" aria-hidden="true">E.</span>
          <span>Mohammad Equaan Kacchi</span>
        </a>

        <div className="site-nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="site-nav-link">
              {item.label}
            </a>
          ))}
          <Button asChild variant="outline" className="site-resume-link">
            <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="Mohammad_Equaan_Kacchi_Resume.pdf">
              Resume
            </a>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="site-menu-toggle"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="site-mobile-menu">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="site-mobile-link" onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a
            className="site-mobile-link site-mobile-resume"
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download="Mohammad_Equaan_Kacchi_Resume.pdf"
            onClick={closeMenu}
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
};