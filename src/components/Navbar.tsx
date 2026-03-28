import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-brand-cream/80 backdrop-blur-xl py-3 border-b border-brand-ink/5 shadow-sm" : "bg-transparent py-7 border-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 relative z-[60]">
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
          <div className="md:hidden flex items-center relative z-[60]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 transition-colors",
                isOpen ? "text-brand-ink" : (location.pathname === '/' && !scrolled ? "text-brand-ink/90" : "text-brand-ink")
              )}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-brand-cream z-50 flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-center justify-between py-4 border-b border-brand-ink/5",
                      location.pathname === link.path ? "text-brand-red" : "text-brand-ink"
                    )}
                  >
                    <span className="text-4xl font-serif font-bold tracking-tight">
                      {link.name}
                    </span>
                    <ArrowRight className={cn(
                      "w-6 h-6 transition-transform group-hover:translate-x-2",
                      location.pathname === link.path ? "opacity-100" : "opacity-0"
                    )} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-auto pb-12"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/40 mb-4">Connect With Us</p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/second_chance_at_life" target="_blank" rel="noopener noreferrer" className="text-brand-ink font-serif italic text-lg hover:text-brand-red transition-colors">Instagram</a>
                <a href="https://x.com/secChanceAtLife" target="_blank" rel="noopener noreferrer" className="text-brand-ink font-serif italic text-lg hover:text-brand-red transition-colors">Twitter</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
