import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Impact', path: '/impact' },
  { name: 'Media', path: '/media' },
  { name: 'Contact', path: '/contact' },
  { name: 'Donate', path: '/donate' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-brand-cream/80 backdrop-blur-xl py-3 border-b border-brand-ink/5 shadow-sm" : "bg-transparent py-7 border-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0">
            <Logo light={false} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-[13px] uppercase tracking-widest font-bold transition-all hover:text-brand-red",
                  link.name === 'Donate' 
                    ? "bg-brand-red text-white px-6 py-2 hover:bg-brand-ink hover:text-white" 
                    : (location.pathname === link.path 
                        ? "text-brand-red" 
                        : (location.pathname === '/' && !scrolled ? "text-brand-ink/90" : "text-brand-ink"))
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "transition-colors",
                location.pathname === '/' && !scrolled ? "text-brand-ink/90" : "text-brand-ink"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className="md:hidden bg-brand-cream border-b border-brand-ink/5 absolute w-full left-0 py-8 px-8 space-y-4 shadow-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-[12px] uppercase tracking-widest font-bold transition-all",
                    link.name === 'Donate'
                      ? "bg-brand-red text-white text-center"
                      : (location.pathname === link.path ? "text-brand-red" : "text-brand-ink/80")
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
  );
}
