import React, { useState, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project, PROJECTS_DATA } from "../data/portfolioData";
import {
  FootballVisionMock,
  PlantDiseaseMock,
  ScraperMock,
  YouTubeChatbotMock,
} from "./ProjectCardMocks";
import { ProjectModal } from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
  renderMock: (mockType: string) => React.ReactNode;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const ProjectBentoCard = memo<ProjectCardProps>(
  ({ project, onSelect, renderMock }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Direct GPU CSS variable manipulation (0 React re-renders)
    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
      },
      [],
    );

    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
        className={`group relative ${project.gridSpan.desktop} ${project.gridSpan.height || "min-h-[380px]"} bento-card cursor-pointer flex flex-col justify-between p-6 sm:p-8 overflow-hidden`}
      >
        {/* Ultra-soft feathered micro cursor glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[1.25rem] transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              "radial-gradient(75px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 50%, transparent 80%)",
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {/* Top Row: Meta info & category pill */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 font-medium">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {project.year}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {project.status && (
                <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-900/60 border border-white/5">
                  {project.status}
                </span>
              )}
              <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-800 transition-all group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Middle: Interactive Mock or Image Showcase with clean margins */}
          <div className="my-5 w-full flex-1 flex items-center justify-center">
            <div className="w-full h-full min-h-[180px] sm:min-h-[210px] rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.01] bg-[#13161c]">
              {project.imageUrl ? (
                <div className="w-full h-full min-h-[180px] sm:min-h-[210px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950/80 relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="eager"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                renderMock(project.mockType || "football")
              )}
            </div>
          </div>

          {/* Bottom Row: Title, Description & Tags */}
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-zinc-100 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <span className="text-xs font-normal text-zinc-400 font-sans">
                {project.subtitle}
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900/80 text-zinc-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-[10px] sm:text-[11px] font-mono px-2 py-1 rounded bg-zinc-900/40 text-zinc-500">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors flex items-center gap-1">
                <span>Inspect</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

ProjectBentoCard.displayName = "ProjectBentoCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: "easeInOut",
    },
  },
};

export const BentoGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null,
  );

  const categories = [
    "All",
    "CV + NLP",
    "Machine Learning",
    "Data Engineering",
    "Full Stack",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => {
          if (selectedCategory === "CV + NLP") {
            return p.category === "CV + NLP";
          }
          if (
            selectedCategory === "Machine Learning" ||
            selectedCategory === "Machine Learing"
          ) {
            return p.category === "Machine Learning";
          }
          if (selectedCategory === "Data Engineering") {
            return p.category === "Data Engineering";
          }
          if (
            selectedCategory === "Full Stack" ||
            selectedCategory === "Ful Stack"
          ) {
            return p.category === "Full Stack";
          }
          return p.category === selectedCategory;
        });

  const renderCardMock = useCallback((mockType: string) => {
    switch (mockType) {
      case "football":
        return <FootballVisionMock />;
      case "plant":
        return <PlantDiseaseMock />;
      case "scraper":
        return <ScraperMock />;
      case "youtube":
        return <YouTubeChatbotMock />;
      default:
        return null;
    }
  }, []);

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with generous spacing */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-16 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Core Projects &bull; Bento Layout</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-100">
              FEATURED PROJECTS
            </h2>
          </div>

          {/* Filter Tabs - Spacious & De-congested */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 p-2 bg-zinc-900/80 border border-white/10 rounded-2xl w-fit shadow-lg shadow-black/20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-medium tracking-wide transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-zinc-100 text-zinc-950 font-semibold shadow-md scale-[1.02]"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Container - Single Synchronized Variant Tree (Zero Blink) */}
        <div className="min-h-[420px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-12 gap-6 sm:gap-8"
            >
              {filteredProjects.map((project) => (
                <ProjectBentoCard
                  key={project.id}
                  project={project}
                  onSelect={() => setActiveModalProject(project)}
                  renderMock={renderCardMock}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
