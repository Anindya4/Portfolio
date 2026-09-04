import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Resume", href: "#resume" },
    { name: "Projects", href: "#projects" },
    { name: "Capabilities", href: "#capabilities" },
    // { name: 'Experience', href: '#experience' }, //TODO: IN FUTURE
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-[#121418]/85 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Left: Logo & Identity */}
            <a
              href="#"
              className="flex items-center gap-2.5 group text-sm font-medium tracking-tight text-white/90 hover:text-white transition-colors"
            >
              <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-300 group-hover:border-white/25 transition-all">
                <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
              </span>
              <span className="font-semibold tracking-tight text-zinc-100">
                {PERSONAL_INFO.name}
              </span>
              <span className="hidden sm:inline-block text-xs font-normal text-zinc-500 border-l border-zinc-800 pl-2.5">
                Folio '26
              </span>
            </a>

            {/* Middle: Desktop Nav items */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-white/5 px-3 py-1 rounded-full text-xs font-medium text-zinc-400">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-3 py-1.5 rounded-full hover:text-zinc-100 hover:bg-white/5 transition-all duration-150"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right: Availability pill + CTA */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-[11px] font-mono text-emerald-400/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open to collaborations</span>
              </div>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                draggable="false"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-white transition-transform will-change-transform hover:scale-[1.05] active:scale-[0.98]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 md:hidden text-zinc-400 hover:text-white rounded-lg bg-zinc-900/60 border border-white/5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#121418] border border-white/10 rounded-2xl p-5 shadow-2xl md:hidden backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for contract & full-time</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
