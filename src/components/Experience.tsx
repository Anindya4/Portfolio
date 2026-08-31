import React from 'react';
import { Briefcase, ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';

export const Experience = () => {
  return (
    <section id="experience" className="py-20 md:py-28 relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>Career Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-100">
              EXPERIENCE &amp; HISTORY
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400">
            6+ years building software systems &amp; interfaces
          </p>
        </div>

        {/* Timeline Rows */}
        <div className="space-y-4">
          {EXPERIENCE_TIMELINE.map((item, index) => (
            <div
              key={index}
              className="bento-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-[#15171d] transition-all"
            >
              <div className="md:w-1/4">
                <span className="text-xs font-mono text-zinc-400 block mb-1">
                  {item.period}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {item.location}
                </span>
              </div>

              <div className="md:w-1/3">
                <h3 className="text-lg font-display font-semibold text-zinc-100 group-hover:text-white transition-colors">
                  {item.role}
                </h3>
                <div className="text-sm text-zinc-400 font-medium mt-0.5">
                  {item.company}
                </div>
              </div>

              <div className="md:w-5/12">
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
