export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'CV + NLP' | 'Machine Learning' | 'Data Engineering' | 'Full Stack';
  year: string;
  description: string;
  fullDescription: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  gridSpan: {
    desktop: string;
    height?: string;
  };
  accentColor: string;
  featured?: boolean;
  status?: string;
  deliverables?: string[];
  mockType?: 'football' | 'plant' | 'scraper' | 'youtube';
  imageUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Anindya Sundar Nandi",
  role: "Machine Learning Engineer & Backend Developer",
  tagline: "Bridging Mathematical Foundations with Scalable AI & Systems",
  availability: "Open to ML Engineering, AI & SDE Roles",
  location: "Medinipur, India & Remote (IST / UTC+5:30)",
  email: "anindyanandi.work@gmail.com",
  phone: "(+91) 6296689986",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:anindyanandi.work@gmail.com"
  },
  stats: [
    { label: "M.Sc. CS GPA", value: "8.79" },
    { label: "B.Sc. Math GPA", value: "8.90" },
    { label: "Core AI Projects", value: "04" },
    { label: "Detection Acc.", value: "98.2%" },
  ],
  bio: [
    "I am a Master's student in Computer Science with a strong academic foundation in Mathematics (8.90 undergrad GPA, 8.79 postgrad GPA). My expertise spans end-to-end Machine Learning workflows, Deep Learning architectures (PyTorch, YOLOv5, EfficientNet), dynamic data engineering, and modern full-stack web systems.",
    "Experienced in building computer vision detection pipelines, LLM-orchestrated autonomous data extraction engines with LangChain, and interactive web services with FastAPI, Streamlit, and React."
  ]
};

export const RESUME_LINKS = {
  dataScience: {
    id: "ds-ml",
    title: "Data Science & Machine Learning CV",
    track: "Data Science, ML & Data Engineering",
    description: "Specialized in Computer Vision (YOLOv5), Deep Learning (PyTorch, EfficientNet), LangChain LLM agents, and statistical data pipelines.",
    pdfUrl: "/cv/A_S_NANDI_DS+ML.pdf",
    gdriveUrl: "https://drive.google.com/file/d/1example_DS_ML_CV_link/view?usp=sharing",
    highlights: ["PyTorch & YOLOv5", "Transfer Learning (98.17%)", "LangChain & NLP", "Mathematical Rigor (8.90 GPA)"],
    accentColor: "#8fa89b",
  },
  softwareEngineering: {
    id: "sde",
    title: "Software Development Engineer (SDE) CV",
    track: "Software Engineering & Full-Stack Systems",
    description: "Specialized in backend APIs with FastAPI & Django, modern React frontend development, Docker containerization, and data-driven systems.",
    pdfUrl: "/cv/A_S_NANDI_SDE.pdf",
    gdriveUrl: "https://drive.google.com/file/d/1example_SDE_CV_link/view?usp=sharing",
    highlights: ["FastAPI & Django REST", "React.js & JavaScript", "Docker & Databases", "Clean Modular Architecture"],
    accentColor: "#8ea0b5",
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "football-analysis",
    title: "Football Match Vision & Analytics",
    subtitle: "Real-time Object Detection & Player Clustering",
    category: "CV + NLP",
    year: "2024",
    description: "Real-time YOLOv5 pipeline detecting players, referees, and ball dynamics with automated K-Means jersey color clustering for team possession analytics.",
    fullDescription: "A high-performance computer vision system for tactical football match analytics. It employs YOLOv5 for multi-class entity tracking, extracts dominant player color signatures via K-Means clustering to distinguish squads automatically, and calculates spatial heatmaps and ball possession dynamics.",
    metrics: [
      { label: "Detection Precision", value: "98.4%" },
      { label: "Inference Speed", value: "32 FPS" },
      { label: "Clustering Acc.", value: "96.5%" }
    ],
    tags: ["Python", "YOLOv5", "OpenCV", "PyTorch", "K-Means", "NumPy", "Matplotlib"],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-7",
      height: "min-h-[460px]"
    },
    accentColor: "#8fa89b", // subtle sage
    featured: true,
    status: "Completed",
    deliverables: ["YOLOv5 Multi-Class Detector", "K-Means Team Classifier", "Ball Possession Engine", "Trajectory Visualization"],
    mockType: "football"
  },
  {
    id: "plant-disease",
    title: "Plant Leaf Disease Recognition",
    subtitle: "Deep Transfer Learning with EfficientNet-B4",
    category: "Machine Learning",
    year: "2024",
    description: "Deep learning crop disease classification achieving 98.17% accuracy using transfer learning, model benchmarking, and PyTorch optimization.",
    fullDescription: "An agricultural AI diagnostics solution developed to classify multi-crop leaf diseases with high precision. By evaluating architectures (ResNet, VGG, MobileNet) and fine-tuning EfficientNet-B4 with PyTorch, the system achieved 98.17% validation accuracy with minimal computational overhead.",
    metrics: [
      { label: "Validation Accuracy", value: "98.17%" },
      { label: "Model Architecture", value: "EfficientNet-B4" },
      { label: "Classes Identified", value: "38+ Plant Types" }
    ],
    tags: ["PyTorch", "EfficientNet-B4", "Transfer Learning", "Scikit-Learn", "TorchVision", "Python"],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-5",
      height: "min-h-[460px]"
    },
    accentColor: "#d0c7b7", // subtle warm sand
    featured: true,
    status: "Research & Benchmarking",
    deliverables: ["Transfer Learning Pipeline", "Model Benchmark Report", "Inference REST Endpoint", "Dataset Preprocessing Scripts"],
    mockType: "plant"
  },
  {
    id: "ai-web-scraper",
    title: "Autonomous AI Web Scraper",
    subtitle: "Dynamic Extraction & LangChain LLM Parsing",
    category: "Data Engineering",
    year: "2024",
    description: "Automated web scraping engine using Selenium and BeautifulSoup paired with LangChain for schema extraction, summarization, and query reasoning.",
    fullDescription: "An intelligent web scraping and unstructured data parser. It handles dynamic JavaScript rendering with Selenium, extracts DOM trees using BeautifulSoup, and pipes unstructured content into LangChain agents to extract JSON schemas, summarize reports, and answer queries in natural language.",
    metrics: [
      { label: "Extraction Speed", value: "<2.4s" },
      { label: "Dynamic DOM Handling", value: "100%" },
      { label: "LLM Parsing Accuracy", value: "99.1%" }
    ],
    tags: ["Python", "LangChain", "Selenium", "BeautifulSoup", "OpenAI API", "Pandas"],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-5",
      height: "min-h-[420px]"
    },
    accentColor: "#8ea0b5", // subtle slate blue
    featured: false,
    status: "Production Tool",
    deliverables: ["Headless Selenium Driver", "LangChain Extraction Agent", "Custom Schema Validator", "Automated Cleaning Pipeline"],
    mockType: "scraper"
  },
  {
    id: "youtube-chatbot",
    title: "YouTube Transcript AI Chatbot",
    subtitle: "Full-Stack RAG Video Intelligence & Translation",
    category: "Full Stack",
    year: "2024",
    description: "Interactive full-stack RAG application extracting YouTube transcripts, translating multilingual content, and providing timestamp-grounded Q&A.",
    fullDescription: "A semantic full-stack conversational agent for video intelligence. It extracts transcripts automatically, supports cross-lingual translation via deep-translator, and utilizes LangChain and OpenAI to enable users to interrogate long lectures and podcasts with semantic search and pinpoint timestamp citations.",
    metrics: [
      { label: "Transcript Query Time", value: "<1.2s" },
      { label: "Languages Supported", value: "50+" },
      { label: "Hallucination Rate", value: "<1.5%" }
    ],
    tags: ["LangChain", "OpenAI API", "Streamlit", "React.js", "YouTube API", "Python"],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-7",
      height: "min-h-[420px]"
    },
    accentColor: "#c49a88", // subtle clay
    featured: false,
    status: "Deployed App",
    deliverables: ["Transcript Extraction Microservice", "Cross-Language Translator", "RAG Vector Pipeline", "Interactive Frontend UI"],
    mockType: "youtube"
  }
];

export const CAPABILITIES = [
  {
    category: "CV, NLP & Deep Learning",
    items: ["PyTorch & Scikit-learn", "YOLOv5 & Object Detection", "OpenCV & Image Processing", "EfficientNet Transfer Learning", "K-Means & Unsupervised Clustering", "Model Evaluation & Optimization"]
  },
  {
    category: "LLM, NLP & Data Engineering",
    items: ["LangChain & RAG Architectures", "OpenAI & LLM API Integration", "Dynamic Web Scraping (Selenium, BS4)", "Semantic Search & Embeddings", "Multi-Language NLP Pipelines", "Pandas & Data Wrangling"]
  },
  {
    category: "Full Stack & Mathematical Foundations",
    items: ["Python, JavaScript, SQL", "FastAPI, Django & React.js", "Streamlit Interactive Apps", "Docker & Containerization", "Git & GitHub Workflows", "Rigorous Mathematical Foundations"]
  }
];

export const EDUCATION_DATA = [
  {
    degree: "Master of Science (M.Sc.) in Computer Science",
    institution: "Vidyasagar University",
    location: "Medinipur, India",
    period: "09/2023 — 07/2025",
    gpa: "8.79 CGPA",
    highlights: "Advanced Algorithms, Machine Learning Systems, Distributed Computing, Deep Learning Research."
  },
  {
    degree: "Bachelor of Science (B.Sc. Honors) in Mathematics",
    institution: "Vivekananda Satavarshiki Mahavidyalaya",
    location: "Manikpara, India",
    period: "07/2019 — 08/2022",
    gpa: "8.90 CGPA",
    highlights: "Linear Algebra, Real Analysis, Probability & Statistics, Discrete Mathematics, Numerical Methods."
  }
];

export const EXPERIENCE_TIMELINE = [
  {
    period: "2023 — Present",
    role: "Master's Scholar & ML Engineer",
    company: "Vidyasagar University",
    location: "Medinipur, India",
    description: "Conducting applied research in deep learning classification, computer vision sports tracking pipelines, and automated LLM data parsing systems with 8.79 CGPA."
  },
  {
    period: "2023 — 2024",
    role: "AI & Full Stack Software Projects",
    company: "Independent / Open Source",
    location: "India (Remote)",
    description: "Engineered scalable REST APIs with FastAPI, RAG chatbots with LangChain, and dynamic web extraction pipelines utilizing Selenium, BeautifulSoup, and Docker."
  },
  {
    period: "2019 — 2022",
    role: "Mathematics Honors Researcher",
    company: "VSM / Vidyasagar University",
    location: "Manikpara, India",
    description: "Built rigorous mathematical foundations in matrix decompositions, probability theory, statistical inference, and optimization algorithms with 8.90 CGPA."
  }
];
