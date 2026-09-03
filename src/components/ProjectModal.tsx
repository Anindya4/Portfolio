import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ExternalLink } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { FootballVisionMock, PlantDiseaseMock, ScraperMock, YouTubeChatbotMock } from './ProjectCardMocks';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Stop Lenis background scroll while modal is open, and restart when closed
  useEffect(() => {
    if (project) {
      const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [project]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const renderMock = () => {
    switch (project.mockType) {
      case 'football':
        return <FootballVisionMock />;
      case 'plant':
        return <PlantDiseaseMock />;
      case 'scraper':
        return <ScraperMock />;
      case 'youtube':
        return <YouTubeChatbotMock />;
      default:
        return <FootballVisionMock />;
    }
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#121418] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-zinc-200 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/50 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="uppercase font-semibold tracking-wider">
                {project.category}
              </span>
              <span className="text-zinc-600">&bull;</span>
              <span>{project.year}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content with data-lenis-prevent and native wheel support */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent
            className="p-6 sm:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1 select-text"
            tabIndex={0}
          >
            {/* Title and Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100 mb-1">
                {project.title}
              </h2>
              <p className="text-sm font-medium text-zinc-400">
                {project.subtitle}
              </p>
            </div>

            {/* Interactive Preview Mock or Image Container */}
            <div className="w-full h-56 sm:h-72 rounded-xl bg-zinc-950/50 p-1 border border-white/5 overflow-hidden flex items-center justify-center">
              {project.imageUrl ? (
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                renderMock()
              )}
            </div>

            {/* Key Metrics Row */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/5"
                  >
                    <div className="text-xl font-bold font-mono text-zinc-100">
                      {metric.value}
                    </div>
                    <div className="text-xs text-zinc-400 font-medium">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Description & Implementation Overview */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Technical Overview &amp; Architecture
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Deliverables & Key Technical Highlights */}
            {project.deliverables && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Key Deliverables &amp; Artifacts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Tags */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Core Technologies &amp; Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-white/10 text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-white/5 bg-zinc-950/60 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div className="text-xs text-zinc-500 font-mono">
              Status:{" "}
              <span className="text-zinc-300">
                {project.status || "Completed"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-colors"
                >
                  <span>Project Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
