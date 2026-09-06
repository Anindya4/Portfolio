import { useState, useEffect } from "react";
import {
  CAPABILITIES,
  PERSONAL_INFO,
  EDUCATION_DATA,
} from "../data/portfolioData";
import { GlowCard } from "./GlowCard";
import { ClockIcon, CompassIcon, GraduationCapIcon, GlobeIcon } from "../icons";
import { AnalogClock } from "./AnalogClock";

export const AboutBento = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 relative border-b border-white/5 bg-zinc-950/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Academic Foundations &amp; Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-100">
            EXPERTISE &amp; FOUNDATIONS
          </h2>
        </div>

        {/* Bento Grid layout for capabilities */}
        <div className="grid grid-cols-12 gap-5 sm:gap-6 ">
          {/* Card 1: Bio & Mathematical Rigor (Spans 7 cols) */}
          <GlowCard className="col-span-12 lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-white/5">
                <span className="flex items-center gap-2">
                  <CompassIcon className="text-[#e2464e]" />
                  <span className="text-sm">
                    Engineering &amp; Research Philosophy
                  </span>
                </span>
                <span className="text-zinc-500">01</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-semibold text-zinc-100 mb-4 leading-snug">
                "Mathematical rigor grounds artificial intelligence into
                reliable engineering systems."
              </h3>

              <div className="space-y-2 text-sm text-[#f4f0e5] leading-relaxed">
                {PERSONAL_INFO.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                Python
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                SQL
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                PyTorch &amp; Deep Learning
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                Computer Vision
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                FastAPI
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                Data Enginnering
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                React
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                JavaScript
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                OpenAI API
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                Git &amp; GitHub
              </span>
            </div>
          </GlowCard>

          {/* Card 2: Live Local Time & Availability (Spans 5 cols) */}
          <GlowCard className="col-span-12 lg:col-span-5  p-6 sm:p-8 min-h-[380px] flex flex-col justify-between bg-[#13151a]">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-white/5">
                <span className="flex items-center gap-2">
                  <ClockIcon className=" text-[#e2464e]" />
                  <span className="text-sm">Local Time &amp; Availability</span>
                </span>
                <span className="text-zinc-500">02</span>
              </div>

              <div className="my-4">
                <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-zinc-100">
                  {time || "09:30:00 AM"}
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-2 flex items-center gap-2">
                  <GlobeIcon className="text-[#81a1d0]" />
                  <span>
                    Indian Standard Time (IST / UTC+5:30) &bull; India
                  </span>
                </div>
                <AnalogClock />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Actively Seeking Roles</span>
              </div>
              <p className="text-xs text-[#e0e0d2] leading-relaxed">
                Open for Inernships / Full-Time Machine Learning Engineer, AI
                Developer, and Software Development Engineer (SDE) roles.
              </p>
            </div>
          </GlowCard>

          {/* Card 3: Education Highlights (Spans 12 cols) */}
          <GlowCard className="col-span-12 p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-white/5">
              <span className="flex items-center gap-2">
                <GraduationCapIcon className="text-[#e2464e]" />
                <span className="text-base">
                  Academic Degrees &amp; Performance
                </span>
              </span>
              <span className="text-zinc-500">03</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-zinc-400">
                        {edu.period}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                        {edu.gpa}
                      </span>
                    </div>
                    <h4 className="text-base font-display font-semibold text-zinc-100 mt-1">
                      {edu.degree}
                    </h4>
                    <div className="text-xs text-zinc-400 font-medium mt-0.5">
                      {edu.institution} &bull; {edu.location}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-3 pt-2 border-t border-white/5 leading-relaxed">
                    {edu.highlights}
                  </p>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Cards 4, 5, 6: Capabilities Matrix (3 columns) */}
          {CAPABILITIES.map((cap, index) => (
            <GlowCard
              key={cap.category}
              className="col-span-12 md:col-span-4 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-2 border-b border-white/5">
                  <span>{`0${index + 4}`}</span>
                  <span className="text-zinc-500">
                    {cap.items.length} Core Areas
                  </span>
                </div>

                <h4 className="text-base font-display font-semibold text-zinc-100 mb-4">
                  {cap.category}
                </h4>

                <ul className="space-y-2.5">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-zinc-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
                Verified Technical Proficiencies
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};
