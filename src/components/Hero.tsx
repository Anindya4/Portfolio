import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowDown, Copy, Check, MapPin, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { GlowCard } from "./GlowCard";

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    "MACHINE LEARNING",
    "DATA SCIENCE",
    "FULL-STACK SYSTEMS",
    "COMPUTER VISION & NLP",
    "DATA ENGINEERING",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const line1Variants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const line2Variants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.85,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const line3Variants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.85,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay = 0.4) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: typeof customDelay === "number" ? customDelay : 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const tickerItems = [
    "Machine Learning & PyTorch",
    "Computer Vision & YOLOv5",
    "Data Science & Analytics",
    "Full-Stack & React.js",
    "FastAPI Microservices",
    "LangChain & RAG Agents",
    "Data Engineering & Selenium",
    "Rigorous Mathematics (8.90 GPA)",
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
      {/* Subtle architectural background grid - no neon, very soft */}
      <div className="absolute inset-0 subtle-grid opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Badges */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="flex flex-wrap items-center gap-3 mb-8 text-xs font-mono text-zinc-400"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-400">{PERSONAL_INFO.role}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/40 border border-white/5 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </motion.div>

        {/* Dynamic Falling Word Role Transitions & Sliding Headline */}
        <div className="space-y-1 sm:space-y-2 mb-8 select-none">
          {/* Dynamic Falling Role Container */}
          <div className="h-[44px] sm:h-[64px] md:h-[76px] lg:h-[88px] overflow-hidden relative flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: "-110%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "110%", opacity: 0, filter: "blur(4px)" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 font-display uppercase whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Line 2: Secondary Discipline */}
          <div className="overflow-hidden">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={line2Variants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-400 font-display uppercase flex items-center gap-3 flex-wrap"
            >
              <span>&amp; SOFTWARE SYSTEMS</span>
              <span className="text-xl sm:text-3xl md:text-4xl text-zinc-600 font-mono font-normal lowercase italic tracking-normal">
                driven by math
              </span>
            </motion.h1>
          </div>

          {/* Line 3: Action & Title */}
          <div className="overflow-hidden">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={line3Variants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-200 font-display uppercase"
            >
              BUILDER<span className="text-zinc-500">.</span>
            </motion.h1>
          </div>
        </div>

        {/* Subtitle & Introduction Bio */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.45}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4 border-t border-white/5 max-w-5xl"
        >
          <div className="md:col-span-7">
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              M.Sc. Computer Science graduate with honors in Mathematics.
              Specializing in computer vision pipelines, LLM-powered data
              automation with LangChain, dynamic data engineering, and
              production-grade full-stack web applications.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3 sm:items-start md:items-end">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white hover:shadow-md transition-all group"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all active:scale-95"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-zinc-500 font-mono">
              Direct:{" "}
              <span className="text-zinc-400">{PERSONAL_INFO.email}</span>
            </p>
          </div>
        </motion.div>

        {/* Quick Bento Metric Cards with Glow */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.6}
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-white/5"
        >
          {PERSONAL_INFO.stats.map((stat, i) => (
            <GlowCard
              key={i}
              className="p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-white/5 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-100 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-zinc-400">
                {stat.label}
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>

      {/* Infinite Horizontal Sliding Ticker */}
      <div className="mt-14 py-3 border-y border-white/5 bg-zinc-950/40 overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee gap-8 items-center text-xs font-mono text-zinc-400 uppercase tracking-wider">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
