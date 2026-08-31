import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-[#0b0c0e] text-xs font-mono text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <Terminal className="w-3 h-3" />
            </span>
            <span className="text-zinc-300 font-sans font-medium">{PERSONAL_INFO.name}</span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-400">&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block text-zinc-400">
              Built with React, Vite &amp; Tailwind
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
