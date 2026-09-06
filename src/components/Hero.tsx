import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowDown, MapPin, FileText, X } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { GlowCard } from "./GlowCard";
import { CopyIcon } from "../icons/CopyIcon";
import { ClipboardCheckIcon } from "../icons/ClipboardCheckIcon";
import { FileTextIcon } from "../icons/FileTextIcon";

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const roles = [
    "Machine Learning Engineer",
    "Data Scientist & Analyst",
    "Full-Stack Developer",
    "Data Engineer",
    "Problem Solver",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Close photo modal on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhotoModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
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
    "Machine Learning",
    "Computer Vision",
    "Data Science",
    "Data Analytics",
    "Full-Stack Development",
    "React.js",
    "FastAPI",
    "LangChain",
    "Data Engineering",
    "Rag Pipeline",
    "MLOps",
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
      {/* Subtle architectural background grid - soft ambient sheen */}
      <div className="absolute inset-0 subtle-grid opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Badges (No location badge) */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono text-zinc-400"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {/* <span>{PERSONAL_INFO.name}</span> */}
            {/* <span className="text-zinc-600">&bull;</span> */}
            <span className="text-zinc-400">{PERSONAL_INFO.role}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/40 border border-white/5 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </motion.div>

        {/* Big Name Greeting with Clickable Round Photo */}
        <div className="space-y-4 mb-6 select-none">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
            {/* Clickable Round Avatar Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setPhotoModalOpen(true)}
              className="relative flex-shrink-0 cursor-pointer group"
              title="Click to view portrait"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-xl bg-zinc-900 ring-4 ring-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:border-white/40">
                <img
                  src="/img/final.png"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-2 right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 border-2 border-[#0b0c0e]" />
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={line1Variants}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-100 font-display"
              >
                Hi ! I'm <span className="text-[#f97316]">Anindya.</span>
              </motion.h1>
            </div>
          </div>

          {/* Dynamic Falling Skills / Roles Below the Name */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.25}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base sm:text-xl md:text-2xl text-zinc-300 font-normal tracking-tight pt-1"
          >
            <span className="font-mono text-sm sm:text-lg text-zinc-400">
              I'm a
            </span>

            {/* Falling Word Slot Animation */}
            <div className="h-[38px] sm:h-[48px] overflow-hidden relative inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: "-120%", opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "120%", opacity: 0, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display font-semibold px-3 py-1 rounded-xl bg-zinc-900/90 border border-white/10 text-sm sm:text-lg md:text-xl text-emerald-400 whitespace-nowrap shadow-sm"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Subtitle & Introduction Bio */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.4}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-6 border-t border-white/5 max-w-5xl"
        >
          <div className="md:col-span-7">
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              Computer Science graduate with a strong foundation in Mathematics
              (8.90 GPA) and Computer Science (8.79 GPA). My work spans{" "}
              <span className="text-[#ecdac4] font-semibold">
                Data Engineering
              </span>
              ,{" "}
              <span className="text-[#ecdac4] font-semibold">
                Machine Learning
              </span>
              ,{" "}
              <span className="text-[#ecdac4] font-semibold">
                Computer Vision
              </span>
              ,{" "}
              <span className="text-[#ecdac4] font-semibold">
                LLM-powered automation
              </span>
              , and{" "}
              <span className="text-[#ecdac4] font-semibold">
                Full-Stack Development
              </span>
              .
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3 sm:items-start md:items-end">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="#projects"
                draggable="false"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-transform will-change-transform duration-300 ease-out group active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#resume"
                draggable="false"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#resume")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] transition-transform will-change-transform duration-300 ease-out active:scale-95"
              >
                <FileTextIcon className=" text-emerald-400" />
                <span>View CV</span>
              </a>

              <div
                className="relative inline-flex items-center justify-center"
                onMouseEnter={() => setCopyHovered(true)}
                onMouseLeave={() => setCopyHovered(false)}
              >
                {/* Pop up tooltip */}
                <AnimatePresence>
                  {(copyHovered || copied) && (
                    <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 pointer-events-none z-30">
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.92 }}
                        transition={{
                          opacity: { duration: 0.16, ease: "easeOut" },
                          y: { duration: 0.16, ease: "easeOut" },
                          scale: { duration: 0.16, ease: "easeOut" },
                          layout: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                        }}
                        className={`relative px-3 py-1.5 rounded-xl text-xs font-mono shadow-xl shadow-black/40 whitespace-nowrap flex items-center justify-center transition-colors duration-200 ${
                          copied
                            ? "bg-emerald-600 text-white"
                            : "bg-[#e0e0d2] text-zinc-950 font-medium"
                        }`}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {copied ? (
                            <motion.span
                              key="copied"
                              initial={{
                                opacity: 0,
                                y: 4,
                                filter: "blur(2px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                              }}
                              exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                              transition={{ duration: 0.14, ease: "easeOut" }}
                              className="font-semibold tracking-wide flex items-center"
                            >
                              Copied!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{
                                opacity: 0,
                                y: 4,
                                filter: "blur(2px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                              }}
                              exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                              transition={{ duration: 0.14, ease: "easeOut" }}
                              className="flex items-center gap-1.5"
                            >
                              <span>Copy</span>
                              <span className="bg-black/10 px-1.5 py-0.5 rounded text-[11px] font-mono leading-none text-zinc-900">
                                email
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Downward triangle arrow */}
                        <motion.svg
                          layout="position"
                          className={`absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] transition-colors duration-200 ${
                            copied ? "text-emerald-600" : "text-[#e0e0d2]"
                          }`}
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="currentColor"
                        >
                          <path d="M0 0L5 5L10 0Z" />
                        </motion.svg>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={copyEmail}
                  onFocus={() => setCopyHovered(true)}
                  onBlur={() => setCopyHovered(false)}
                  className="p-2.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-transform will-change-transform duration-300 ease-out active:scale-95 cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px]"
                  aria-label="Copy email to clipboard"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <ClipboardCheckIcon
                        key="copied"
                        size={17}
                        onComplete={() => setCopied(false)}
                        className="text-emerald-400"
                      />
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-center"
                      >
                        <CopyIcon size={17} className="text-zinc-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
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
          custom={0.55}
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-8 border-t border-white/5"
        >
          {PERSONAL_INFO.stats.map((stat, i) => (
            <GlowCard
              key={i}
              className="p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-white/5 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-100 mb-1 flex items-center justify-center">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-zinc-400 flex items-center justify-center">
                {stat.label}
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>

      {/* Infinite Horizontal Sliding Ticker */}
      <div className="mt-12 py-3 border-y border-white/5 bg-zinc-950/40 overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee gap-8 items-center text-xs font-mono text-zinc-400 uppercase tracking-wider">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Medium-Sized Photo Pop-up Modal */}
      <AnimatePresence>
        {photoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPhotoModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Medium Pop-up Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-xs sm:max-w-sm bg-[#121418] border border-white/15 rounded-3xl p-4 shadow-2xl overflow-hidden text-center space-y-3"
            >
              {/* Close Button */}
              <div className="flex items-center justify-between pb-1 text-xs font-mono text-zinc-400">
                <span>Profile Portrait</span>
                <button
                  onClick={() => setPhotoModalOpen(false)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Portrait Image (Medium Sized) */}
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <img
                  src="/img/final.png"
                  alt={PERSONAL_INFO.name}
                  className="w-90 h-90 object-cover object-top"
                />
              </div>

              {/* Name Caption */}
              <div className="pt-1">
                <h3 className="text-base font-display font-bold text-zinc-100">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs font-mono text-emerald-400">
                  {PERSONAL_INFO.role}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
