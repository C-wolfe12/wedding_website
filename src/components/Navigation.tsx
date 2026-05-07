'use client';

import { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/src/constants/wedding';
import { scrollToSection, SECTION_TOP_OFFSET } from '@/src/lib/scrollToSection';

const getActiveSection = (): string => {
  const sections = NAV_ITEMS.map((item) => document.querySelector<HTMLElement>(item.href)).filter(
    (section): section is HTMLElement => section !== null
  );

  if (window.scrollY < 120) {
    return '#home';
  }

  let currentSection: HTMLElement | null = null;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const section = sections[index];

    if (window.scrollY + SECTION_TOP_OFFSET >= section.offsetTop) {
      currentSection = section;
      break;
    }
  }

  return currentSection ? `#${currentSection.id}` : '#home';
};

/**
 * Navigation component - displays site navigation with mobile menu
 */
export default function Navigation(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const updateNavigationState = (): void => {
      setIsScrolled(window.scrollY > 50);
      setActiveSection(getActiveSection());
    };

    const syncFromHash = (): void => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }

      window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();

    window.addEventListener('scroll', updateNavigationState, { passive: true });
    window.addEventListener('resize', updateNavigationState);
    window.addEventListener('hashchange', syncFromHash);

    return () => {
      window.removeEventListener('scroll', updateNavigationState);
      window.removeEventListener('resize', updateNavigationState);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (href: string): void => {
    setActiveSection(href);
    closeMobileMenu();
    scrollToSection(href);
  };

  const navBarStyles = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-md py-4' : 'bg-transparent py-6'
  }`;

  const logoStyles = `flex items-center space-x-2 font-playfair text-2xl font-bold transition-colors ${
    isScrolled ? 'text-cornflower' : 'text-white'
  }`;

  const getNavLinkStyles = (href: string): string => {
    const isActive = activeSection === href;

    if (isScrolled) {
      return `rounded-full px-4 py-2 font-medium transition-all duration-300 ${
        isActive ? 'bg-cornflower-light text-cornflower shadow-sm' : 'text-gray-700 hover:text-russet'
      }`;
    }

    return `rounded-full px-4 py-2 font-medium transition-all duration-300 ${
      isActive ? 'bg-white/90 text-cornflower shadow-lg' : 'text-white hover:bg-white/10 hover:text-white'
    }`;
  };

  const getMobileMenuLinkStyles = (href: string): string => {
    const isActive = activeSection === href;

    return `block rounded-lg px-4 py-3 transition-colors ${
      isActive ? 'bg-cornflower-light text-cornflower' : 'text-gray-700 hover:bg-cornflower-light hover:text-cornflower'
    }`;
  };

  return (
    <nav className={navBarStyles}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button type="button" onClick={() => handleNavigation('#home')} className={logoStyles}>
            <Heart className="w-6 h-6 text-russet" />
            <span>H & C</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className={getNavLinkStyles(item.href)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled ? 'text-cornflower' : 'text-white'}`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className={getMobileMenuLinkStyles(item.href)}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
