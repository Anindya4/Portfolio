import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ExternalLink, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { Project, PROJECTS_DATA } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface ProjectArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export const ProjectArchiveModal: React.FC<ProjectArchiveModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'CV + NLP', 'Machine Learning', 'Data Engineering', 'Full Stack'];

  // Lock Lenis momentum scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // @ts-expect-error lenis global
      window.lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      // @ts-expect-error lenis global
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      // @ts-expect-error lenis global
      window.lenis?.start();
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Wider Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col bg-[#0e1014] border border-white/15 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Bar */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-zinc-950/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-zinc-100">
                    Project Archive
                  </h2>
                  <p className="text-xs font-mono text-zinc-400">
                    Comprehensive catalog of systems, experiments &amp; AI models
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex-shrink-0"
                aria-label="Close archive"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Category Filter Controls */}
            <div className="p-4 sm:p-6 border-b border-white/5 bg-zinc-900/30 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by technology, keyword, or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills - Clean & Non-distorted */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-white/5 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-zinc-100 text-zinc-950 font-semibold shadow'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Table View with data-lenis-prevent */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overflow-x-auto overscroll-contain p-4 sm:p-6 select-text"
            >
              {filteredProjects.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 text-sm font-mono">
                  No projects matching "{searchQuery}" in {selectedCategory}.
                </div>
              ) : (
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      <th className="py-3 px-3 w-16">Year</th>
                      <th className="py-3 px-3">Project Title</th>
                      <th className="py-3 px-3 hidden md:table-cell w-40 whitespace-nowrap">Track</th>
                      <th className="py-3 px-3 hidden sm:table-cell">Built With</th>
                      <th className="py-3 px-3 text-right w-24">Links</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="group hover:bg-white/[0.03] transition-colors"
                      >
                        {/* Year */}
                        <td className="py-4 px-3 font-mono text-zinc-400 align-top whitespace-nowrap">
                          {project.year}
                        </td>

                        {/* Title & Description */}
                        <td className="py-4 px-3 align-top max-w-sm">
                          <div className="font-display font-semibold text-zinc-100 group-hover:text-white flex items-center gap-2 flex-wrap">
                            <span>{project.title}</span>
                            {project.featured && (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 whitespace-nowrap">
                                Flagship
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </td>

                        {/* Category Track (Guaranteed Non-Distorted) */}
                        <td className="py-4 px-3 align-top hidden md:table-cell whitespace-nowrap">
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 inline-block whitespace-nowrap font-medium">
                            {project.category}
                          </span>
                        </td>

                        {/* Built With Tags */}
                        <td className="py-4 px-3 align-top hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1.5 max-w-sm">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/60 text-zinc-400 border border-white/5 whitespace-nowrap"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Links */}
                        <td className="py-4 px-3 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {project.links.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                                title="View GitHub Repository"
                              >
                                <GithubIcon className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {project.links.live && (
                              <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                                title="Open Live Project / Demo"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-4 px-6 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>
                Displaying <strong className="text-zinc-200">{filteredProjects.length}</strong> of{' '}
                <strong className="text-zinc-200">{PROJECTS_DATA.length}</strong> Projects
              </span>

              <a
                href="https://github.com/anindyanandi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <span>Visit GitHub Profile</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
