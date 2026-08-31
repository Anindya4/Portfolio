# Modern Bento Grid Portfolio

A refined, high-performance portfolio website built with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling. Designed with architectural restraint, subtle tones (no neon/glowing clutter), and an interactive Bento Grid project showcase.

---

## ✨ Features

- **Kinetic Sliding Text Intro**: Staggered text reveals in the Hero section with responsive typography.
- **Bento Grid Project Showcase**: 5 modular project templates featuring varied column spans, category filters, and live interactive UI card previews.
- **Interactive Project Inspection Modal**: Deep-dive case study drawer displaying stack tags, metrics, and live demo links.
- **Smooth Momentum Scrolling**: Integrated Lenis engine for ultra-smooth inertia scroll feel.
- **Capabilities & Experience Bento**: Live local timezone clock, design principles, skills matrix, and milestone timeline.
- **Contact & Direct Inquiry**: One-click email copy with instant toast confirmation and interactive inquiry form.
- **Subtle Editorial Palette**: Rich charcoal/obsidian base (`#0b0c0e`), muted borders, and warm sage/slate/clay accents.

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 🛠️ How to Customize Your Projects & Info

All personal information, social links, stats, capabilities, experience, and the **5 Project Templates** are centralized in a single file:

📂 [`src/data/portfolioData.ts`](file:///home/anindya/Coding/portfolio/src/data/portfolioData.ts)

Simply edit the `PERSONAL_INFO` or `PROJECTS_DATA` array:

```typescript
export const PERSONAL_INFO = {
  name: "Your Name",
  role: "Your Role / Title",
  email: "your.email@example.com",
  // ...
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "your-project-id",
    title: "Your Project Title",
    subtitle: "Brief subtitle",
    category: "Web Apps", // 'Web Apps' | 'Design Systems' | 'Mobile' | 'Developer Tools'
    year: "2026",
    description: "Short card summary...",
    fullDescription: "Detailed case study description...",
    metrics: [
      { label: "Metric Label", value: "Metric Value" }
    ],
    tags: ["React", "TypeScript", "Tailwind CSS"],
    links: {
      live: "https://yourproject.com",
      github: "https://github.com/yourname/project"
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-7",
      height: "min-h-[460px]"
    },
    accentColor: "#8fa89b",
    mockType: "browser" // 'browser' | 'editorial' | 'chart' | 'terminal' | 'mobile'
  },
  // ...
];
```
