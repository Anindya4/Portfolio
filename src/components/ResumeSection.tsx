import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ExternalLink, Download, Brain, Code } from 'lucide-react';
import { RESUME_LINKS } from '../data/portfolioData';
import { GlowCard } from './GlowCard';

export const ResumeSection = () => {
  const [selectedTrack, setSelectedTrack] = useState<'ds' | 'sde'>('ds');

  const dsResume = RESUME_LINKS.dataScience;
  const sdeResume = RESUME_LINKS.softwareEngineering;

  const currentData = selectedTrack === 'ds' ? dsResume : sdeResume;

  return (
    <section
      id="resume"
      className="py-16 md:py-20 relative border-b border-white/5 bg-zinc-950/40"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Pill Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 mb-3 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Curriculum Vitae &bull; Dual Track Profiles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-zinc-100 mb-2">
            SELECT &amp; ACCESS RESUME
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Please choose the profile aligned with your team's focus to view or
            download the tailored CV with detailed metrics and verified project
            deliverables.
          </p>
        </div>

        {/* Center Main Trigger Bento Container with GlowCard */}
        <GlowCard className="p-6 sm:p-8 border border-white/10 shadow-2xl bg-[#111317]">
          {/* Top Track Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 p-1.5 bg-zinc-900/90 border border-white/10 rounded-2xl max-w-xl mx-auto w-full">
            <button
              onClick={() => setSelectedTrack("ds")}
              className={`w-full sm:w-1/2 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedTrack === "ds"
                  ? "bg-zinc-100 text-zinc-950 font-semibold shadow-md scale-[1.01]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              <Brain className="w-4 h-4 text-emerald-600" />
              <span>Data Science &amp; ML</span>
            </button>

            <button
              onClick={() => setSelectedTrack("sde")}
              className={`w-full sm:w-1/2 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedTrack === "sde"
                  ? "bg-zinc-100 text-zinc-950 font-semibold shadow-md scale-[1.01]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              <Code className="w-4 h-4 text-sky-600" />
              <span>Software Engineering (SDE)</span>
            </button>
          </div>

          {/* Active Track Preview & Download Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTrack}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentData.accentColor }}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      {currentData.track}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-100">
                    {currentData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                    {currentData.description}
                  </p>
                </div>

                <div className="flex sm:flex-col items-end gap-1.5 text-xs font-mono text-zinc-400">
                  <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-zinc-300">
                    PDF &bull; Verified
                  </span>
                </div>
              </div>

              {/* Skill Highlights Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {currentData.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900/80 border border-white/10 text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
                <p className="text-xs text-zinc-400 font-mono">
                  Direct access to Google Drive &amp; PDF document
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Google Drive Link Button */}
                  <a
                    href={currentData.gdriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-xs font-medium text-zinc-200 hover:text-white hover:border-white/30 hover:scale-105 hover:bg-zinc-800 transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open in Google Drive</span>
                  </a>

                  {/* Direct PDF View/Download Button */}
                  <a
                    href={currentData.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:scale-105 hover:shadow-md transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View / Download PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </GlowCard>
      </div>
    </section>
  );
};
