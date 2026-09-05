export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "CV + NLP" | "Machine Learning" | "Data Engineering" | "Full Stack";
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
  mockType?:
    | "football"
    | "plant"
    | "scraper"
    | "youtube"
    | "cv"
    | "vision"
    | "ml"
    | "metrics"
    | "diagnostics"
    | "pipeline"
    | "terminal"
    | "chat"
    | "assistant"
    | "webpage"
    | "browser"
    | "ide"
    | "app"
    | "auto"
    | (string & {});
  imageUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Anindya Sundar Nandi",
  role: "Machine Learning, Data Science & Full-Stack Engineer",
  tagline: "Bridging Mathematical Foundations with Scalable AI & Systems",
  availability: "Open to ML, Data Science & Full-Stack Roles",
  location: "Kolkata, India & Remote (IST / UTC+5:30)",
  email: "anindyanandi.work@gmail.com",
  phone: "(+91) 6296689986",
  social: {
    github: "https://github.com/Anindya4",
    linkedin: "https://www.linkedin.com/in/anindyasnandi/",
    gmail: "mailto:anindyanandi.work@gmail.com",
    leetcode: "https://leetcode.com/u/Anindya4/",
  },
  stats: [
    { label: "M.Sc. CS CGPA", value: "8.79" },
    { label: "B.Sc. Math CGPA", value: "8.90" },
    { label: "Core AI Projects", value: "04" },
    { label: "Leetcode Probelm Solved", value: "150+" },
  ],
  bio: [
    "I am a Master's student in Computer Science with a strong academic foundation in Mathematics, with an 8.90 undergraduate CGPA and 8.79 postgraduate CGPA. My interests and experience span Machine Learning, Deep Learning, Data Engineering, and Full-Stack Systems.",

    "I work primarily with Python, SQL, and JavaScript, with hands-on experience building data-driven applications, machine learning workflows, RESTful APIs, and interactive web systems. I am familiar with tools and frameworks including OpenAI API, PyTorch, Scikit-learn, FastAPI, React, LangChain, Docker, Git, and GitHub.",

    "My work includes Data-Driven Applications, Computer Vision and Deep Learning Pipelines, LLM-powered Data Extraction Systems, Backend Services. I enjoy solving real-world engineering problems and turning ideas into clean, efficient, and reliable software systems.",
  ],
};

export const RESUME_LINKS = {
  dataScience: {
    id: "ds-ml",
    title: "Data Science & Machine Learning CV",
    track: "Data Science, ML & Data Engineering",
    description:
      "Hands-on experience with Data Engineering, Deep Learning and Computer Vision, using Python, SQL, PyTorch, AWS, and Snowflake.",

    pdfUrl: "/cv/A_S_NANDI_DS+ML.pdf",
    gdriveUrl:
      "https://drive.google.com/file/d/1DIEgK5foht1J4lWWWNLJORzmhpOKaerp/view?usp=sharing",
    highlights: [
      "Python & SQL",
      "PyTorch",
      "Transfer Learning (98.17%)",
      "LangChain & NLP",
      "Git & GitHub",
    ],
    accentColor: "#8fa89b",
  },
  softwareEngineering: {
    id: "sde",
    title: "Software Development Engineer (SDE) CV",
    track: "Software Engineering & Full-Stack Systems",
    description:
      "Hands-on experience with FastAPI, React, and Docker, building backend APIs, modern frontends, and data-driven systems.",
    pdfUrl: "/cv/A_S_NANDI_SDE.pdf",
    gdriveUrl:
      "https://drive.google.com/file/d/1joi7cVsOtoIxDbrXuSoS5pwO3rDjD0Pg/view?usp=sharing",
    highlights: [
      "Docker",
      "FastAPI & REST",
      'Python',
      "React.js & JavaScript",
      "Git & GitHub",
    ],
    accentColor: "#8ea0b5",
  },
};

export const PROJECTS_DATA: Project[] = [
  // ================= CV + NLP =================
  {
    id: "football-analysis",
    title: "Football Match Vision & Analytics",
    subtitle: "Real-time Object Detection & Player Clustering",
    category: "CV + NLP",
    year: "2024",
    description:
      "Real-time YOLOv5 pipeline detecting players, referees, and ball dynamics with automated K-Means jersey color clustering for team possession analytics.",
    fullDescription:
      "A high-performance computer vision system for tactical football match analytics. It employs YOLOv5 for multi-class entity tracking, extracts dominant player color signatures via K-Means clustering to distinguish squads automatically, and calculates spatial heatmaps and ball possession dynamics.",
    metrics: [
      { label: "Detection Precision", value: "98.4%" },
      { label: "Inference Speed", value: "32 FPS" },
      { label: "Clustering Acc.", value: "96.5%" },
    ],
    tags: [
      "Python",
      "YOLOv5",
      "OpenCV",
      "PyTorch",
      "K-Means",
      "NumPy",
      "Matplotlib",
    ],
    links: {
      live: "https://github.com/anindyanandi/football-vision-analytics",
      github: "https://github.com/anindyanandi/football-vision-analytics",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-7",
      height: "min-h-[460px]",
    },
    accentColor: "#8fa89b", // subtle sage
    featured: true,
    status: "Completed",
    deliverables: [
      "YOLOv5 Multi-Class Detector",
      "K-Means Team Classifier",
      "Ball Possession Engine",
      "Trajectory Visualization",
    ],
    mockType: "football",
  },
  /*
  {
    id: "ppe-detection",
    title: "Industrial PPE & Helmet Detection",
    subtitle: "Edge AI Compliance Monitoring for Workplaces",
    category: "CV + NLP",
    year: "2024",
    description:
      "Edge computer vision model using YOLOv8 to detect hardhats, safety vests, and protective gear in real-time surveillance streams with automated compliance alerts.",
    fullDescription:
      "An automated workplace safety audit pipeline. Processes high-definition video feeds with custom-trained YOLOv8 models to identify safety violations (missing helmets, vests) with sub-30ms latency, sending webhook alerts to security dashboards.",
    metrics: [
      { label: "mAP@0.5", value: "94.8%" },
      { label: "Stream Latency", value: "28ms" },
      { label: "Alert Accuracy", value: "97.2%" },
    ],
    tags: ["YOLOv8", "OpenCV", "PyTorch", "FastAPI", "Docker", "Webhooks"],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-5",
      height: "min-h-[460px]",
    },
    accentColor: "#e09f67",
    featured: false,
    status: "Production Demo",
    deliverables: [
      "YOLOv8 Safety Model",
      "Real-time RTSP Ingest Engine",
      "FastAPI Event Broadcaster",
      "Compliance Logging API",
    ],
    mockType: "football",
  },
  {
    id: "clinical-ner",
    title: "Clinical Report Entity Extraction",
    subtitle: "Biomedical NER & Structured JSON Summarizer",
    category: "CV + NLP",
    year: "2023",
    description:
      "NLP pipeline fine-tuning BioBERT to extract dosages, symptoms, and medical conditions from unstructured EHR notes into validated FHIR-compliant JSON.",
    fullDescription:
      "A specialized biomedical natural language understanding system. Fine-tuned BioBERT on clinical text corpora to extract named entities with high F1 scores and convert narrative pathology notes into interoperable clinical summaries.",
    metrics: [
      { label: "Entity F1 Score", value: "92.6%" },
      { label: "Parsing Speed", value: "<1.4s" },
      { label: "Schema Validity", value: "99.8%" },
    ],
    tags: [
      "BioBERT",
      "HuggingFace",
      "PyTorch",
      "Transformers",
      "spaCy",
      "FastAPI",
    ],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-6",
      height: "min-h-[440px]",
    },
    accentColor: "#8ea0b5",
    featured: false,
    status: "Research Paper",
    deliverables: [
      "BioBERT Token Classification Model",
      "Regex Hybrid Post-processor",
      "FastAPI Endpoint",
      "FHIR Exporter",
    ],
    mockType: "youtube",
  },
  */

  // ================= Machine Learning =================
  {
    id: "plant-disease",
    title: "Plant Leaf Disease Recognition",
    subtitle: "Deep Transfer Learning with EfficientNet-B4",
    category: "Machine Learning",
    year: "2024",
    description:
      "Deep learning crop disease classification achieving 98.17% accuracy using transfer learning, model benchmarking, and PyTorch optimization.",
    fullDescription:
      "An agricultural AI diagnostics solution developed to classify multi-crop leaf diseases with high precision. By evaluating architectures (ResNet, VGG, MobileNet) and fine-tuning EfficientNet-B4 with PyTorch, the system achieved 98.17% validation accuracy with minimal computational overhead.",
    metrics: [
      { label: "Validation Accuracy", value: "98.17%" },
      { label: "Model Architecture", value: "EfficientNet-B4" },
      { label: "Classes Identified", value: "38+ Plant Types" },
    ],
    tags: [
      "PyTorch",
      "EfficientNet-B4",
      "Transfer Learning",
      "Scikit-Learn",
      "TorchVision",
      "Python",
    ],
    links: {
      live: "https://github.com/anindyanandi/plant-leaf-disease-recognition",
      github: "https://github.com/anindyanandi/plant-leaf-disease-recognition",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-5",
      height: "min-h-[460px]",
    },
    accentColor: "#d0c7b7", // subtle warm sand
    featured: true,
    status: "Research & Benchmarking",
    deliverables: [
      "Transfer Learning Pipeline",
      "Model Benchmark Report",
      "Inference REST Endpoint",
      "Dataset Preprocessing Scripts",
    ],
    mockType: "plant",
  },
  /*
  {
    id: "churn-prediction",
    title: "Customer Churn & LTV Forecasting",
    subtitle: "Ensemble Gradient Boosting with MLflow Tracking",
    category: "Machine Learning",
    year: "2024",
    description:
      "Predictive customer retention model using XGBoost and LightGBM with SHAP feature explainability, automated hyperparameter tuning, and MLflow registry.",
    fullDescription:
      "An enterprise customer analytics platform that models user churn likelihood 30 days in advance. Features automated data drift detection, SHAP value explanations for business stakeholders, and containerized inference microservices.",
    metrics: [
      { label: "ROC-AUC Score", value: "0.912" },
      { label: "Precision@Top 10%", value: "84.3%" },
      { label: "Model Latency", value: "8ms" },
    ],
    tags: [
      "XGBoost",
      "LightGBM",
      "Scikit-learn",
      "MLflow",
      "Optuna",
      "SHAP",
      "FastAPI",
    ],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-7",
      height: "min-h-[460px]",
    },
    accentColor: "#9bb8a6",
    featured: false,
    status: "Completed",
    deliverables: [
      "Ensemble Classifier",
      "SHAP Waterfall Explainer UI",
      "MLflow Experiment Tracking",
      "FastAPI Prediction Service",
    ],
    mockType: "plant",
  },
  {
    id: "credit-risk-scoring",
    title: "Credit Risk Scoring & Fraud Classifier",
    subtitle: "Imbalanced Learning with Cost-Sensitive Optimization",
    category: "Machine Learning",
    year: "2023",
    description:
      "Credit default risk assessment utilizing SMOTE sampling, CatBoost, and custom cost-matrix optimization for highly skewed financial datasets.",
    fullDescription:
      "A robust financial risk assessment engine engineered to minimize loan default losses while maximizing approval rates. Implemented SMOTE + Tomek links to resolve severe class imbalance and calibrated probability thresholds to optimize dollar returns.",
    metrics: [
      { label: "Gini Coefficient", value: "0.784" },
      { label: "Default Catch Rate", value: "89.1%" },
      { label: "Cost Reduction", value: "23.4%" },
    ],
    tags: [
      "CatBoost",
      "Imbalanced-learn",
      "Pandas",
      "Scikit-Learn",
      "Matplotlib",
      "Docker",
    ],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-6",
      height: "min-h-[440px]",
    },
    accentColor: "#c4a388",
    featured: false,
    status: "Completed",
    deliverables: [
      "Risk Scorecard Model",
      "Threshold Calibration Engine",
      "Automated Validation Suite",
      "Comprehensive Benchmark Docs",
    ],
    mockType: "plant",
  },
  */

  // ================= Data Engineering =================
  {
    id: "ai-web-scraper",
    title: "Autonomous AI Web Scraper",
    subtitle: "Dynamic Extraction & LangChain LLM Parsing",
    category: "Data Engineering",
    year: "2024",
    description:
      "Automated web scraping engine using Selenium and BeautifulSoup paired with LangChain for schema extraction, summarization, and query reasoning.",
    fullDescription:
      "An intelligent web scraping and unstructured data parser. It handles dynamic JavaScript rendering with Selenium, extracts DOM trees using BeautifulSoup, and pipes unstructured content into LangChain agents to extract JSON schemas, summarize reports, and answer queries in natural language.",
    metrics: [
      { label: "Extraction Speed", value: "<2.4s" },
      { label: "Dynamic DOM Handling", value: "100%" },
      { label: "LLM Parsing Accuracy", value: "99.1%" },
    ],
    tags: [
      "Python",
      "LangChain",
      "Selenium",
      "BeautifulSoup",
      "OpenAI API",
      "Pandas",
    ],
    links: {
      live: "https://github.com/anindyanandi/autonomous-ai-web-scraper",
      github: "https://github.com/anindyanandi/autonomous-ai-web-scraper",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-5",
      height: "min-h-[420px]",
    },
    accentColor: "#8ea0b5", // subtle slate blue
    featured: true,
    status: "Production Tool",
    deliverables: [
      "Headless Selenium Driver",
      "LangChain Extraction Agent",
      "Custom Schema Validator",
      "Automated Cleaning Pipeline",
    ],
    mockType: "scraper",
  },
  /*
  {
    id: "market-stream-etl",
    title: "Distributed Market Data ETL Pipeline",
    subtitle: "Kafka Streaming & Spark Aggregation Engine",
    category: "Data Engineering",
    year: "2024",
    description:
      "Real-time market ingestion pipeline processing live tick events through Apache Kafka, aggregating candlestick intervals with PySpark, and sinking to PostgreSQL.",
    fullDescription:
      "A scalable event-driven data pipeline for low-latency financial analytics. Ingests streaming price feeds via Kafka producers, performs stateful windowed aggregations in PySpark Structured Streaming, and loads clean dimensional tables into PostgreSQL with automated Airflow DAG monitoring.",
    metrics: [
      { label: "Throughput", value: "15k msg/s" },
      { label: "End-to-End Latency", value: "<150ms" },
      { label: "Data Quality Score", value: "99.99%" },
    ],
    tags: [
      "Apache Kafka",
      "PySpark",
      "PostgreSQL",
      "Apache Airflow",
      "Docker",
      "Python",
    ],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-7",
      height: "min-h-[460px]",
    },
    accentColor: "#8fa89b",
    featured: false,
    status: "Completed",
    deliverables: [
      "Kafka Producer & Consumer Cluster",
      "PySpark Streaming Aggregator",
      "PostgreSQL Database Schema",
      "Airflow Monitoring DAGs",
    ],
    mockType: "scraper",
  },
  {
    id: "lakehouse-analytics",
    title: "Crypto Market Data Lakehouse",
    subtitle: "Serverless Analytics with DuckDB & dbt Models",
    category: "Data Engineering",
    year: "2023",
    description:
      "Modern data lakehouse architecture partitioning multi-exchange crypto transactions into Parquet on S3, transformed using dbt and queried via DuckDB.",
    fullDescription:
      "A modern, lightweight serverless data lakehouse. Ingests raw trade logs into partition-optimized Apache Parquet files, manages transformation models and data testing with dbt, and provides sub-second SQL analytics via DuckDB.",
    metrics: [
      { label: "Query Speedup", value: "8.5x" },
      { label: "Storage Compression", value: "72%" },
      { label: "Daily Volume", value: "12M Trades" },
    ],
    tags: [
      "DuckDB",
      "dbt",
      "Parquet",
      "S3 / MinIO",
      "Python",
      "SQL",
      "FastAPI",
    ],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-6",
      height: "min-h-[440px]",
    },
    accentColor: "#9fa9b8",
    featured: false,
    status: "Completed",
    deliverables: [
      "Parquet Partitioning Pipeline",
      "dbt Transformation Models",
      "DuckDB Query Engine",
      "Automated Integrity Tests",
    ],
    mockType: "architecture",
  },
  */
  {
    id: "zomato-ai-lakehouse",
    title: "Zomato Enterprise Data Platform",
    subtitle: "35M+ Records Lakehouse with dbt & Text-to-SQL AI",
    category: "Data Engineering",
    year: "2024",
    description:
      "Enterprise data platform processing 35M+ food delivery transactions on Snowflake and dbt, featuring automated Airflow batch orchestration and an LLM-powered Text-to-SQL interface.",
    fullDescription:
      "An end-to-end modern data platform and analytics system for food delivery intelligence at scale. Ingests 35M+ records into Snowflake using automated external stages, models dimensional star schemas and delivery SLAs with dbt, and provides a conversational Text-to-SQL and review sentiment engine powered by OpenAI and Streamlit.",
    metrics: [
      { label: "Data Scale", value: "35M+ Records" },
      { label: "Pipeline Schedule", value: "Daily Airflow DAG" },
      { label: "AI Interface", value: "Text-to-SQL + RAG" },
    ],
    tags: [
      "Snowflake",
      "dbt Core",
      "Apache Airflow",
      "Python",
      "OpenAI API",
      "SQL",
      "Streamlit",
      "Docker",
    ],
    links: {
      github: "https://github.com/Anindya4",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-6",
      height: "min-h-[440px]",
    },
    accentColor: "#e23744",
    featured: false,
    status: "Production Lakehouse",
    deliverables: [
      "Snowflake 35M+ Row Lakehouse",
      "dbt Star Schema & Analytical Marts",
      "Text-to-SQL AI Streamlit App",
      "Daily Airflow Orchestration DAG",
    ],
    mockType: "architecture",
  },

  // ================= Full Stack =================
  {
    id: "youtube-chatbot",
    title: "YouTube Transcript AI Chatbot",
    subtitle: "Full-Stack RAG Video Intelligence & Translation",
    category: "Full Stack",
    year: "2024",
    description:
      "Interactive full-stack RAG application extracting YouTube transcripts, translating multilingual content, and providing timestamp-grounded Q&A.",
    fullDescription:
      "A semantic full-stack conversational agent for video intelligence. It extracts transcripts automatically, supports cross-lingual translation via deep-translator, and utilizes LangChain and OpenAI to enable users to interrogate long lectures and podcasts with semantic search and pinpoint timestamp citations.",
    metrics: [
      { label: "Transcript Query Time", value: "<1.2s" },
      { label: "Languages Supported", value: "50+" },
      { label: "Hallucination Rate", value: "<1.5%" },
    ],
    tags: [
      "LangChain",
      "OpenAI API",
      "Streamlit",
      "React.js",
      "YouTube API",
      "Python",
    ],
    links: {
      live: "https://github.com/anindyanandi/youtube-transcript-ai-chatbot",
      github: "https://github.com/anindyanandi/youtube-transcript-ai-chatbot",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-7",
      height: "min-h-[420px]",
    },
    accentColor: "#c49a88", // subtle clay
    featured: true,
    status: "Deployed App",
    deliverables: [
      "Transcript Extraction Microservice",
      "Cross-Language Translator",
      "RAG Vector Pipeline",
      "Interactive Frontend UI",
    ],
    mockType: "webpage",
  },

  /*{
    id: "ai-code-reviewer",
    title: "Automated PR Code Reviewer",
    subtitle: "Full-Stack GitHub Bot & Static Analysis Suite",
    category: "Full Stack",
    year: "2024",
    description:
      "Full-stack web application and GitHub webhook agent that analyzes Pull Requests, detects potential bugs/security flaws with AST parsing, and suggests line-by-line diffs.",
    fullDescription:
      "An intelligent developer productivity tool. Listens for GitHub PR webhooks, parses diff ASTs with Tree-sitter, runs static lint analysis, and leverages OpenAI models to generate actionable inline code suggestions and test coverage warnings in a sleek React dashboard.",
    metrics: [
      { label: "Review Latency", value: "<3.5s" },
      { label: "False Positive Rate", value: "<3.8%" },
      { label: "Languages Supported", value: "8 Stack Types" },
    ],
    tags: [
      "React.js",
      "FastAPI",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Webhooks",
      "OpenAI API",
    ],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-5",
      height: "min-h-[420px]",
    },
    accentColor: "#8fa89b",
    featured: false,
    status: "Full-Stack App",
    deliverables: [
      "GitHub App Integration",
      "Diff AST Parser",
      "React Dashboard",
      "FastAPI Review Engine",
    ],
    mockType: "webpage",
  },
  {
    id: "collab-canvas",
    title: "Real-Time Collaborative Workspace",
    subtitle: "WebSocket Document Editor & Conflict Resolution",
    category: "Full Stack",
    year: "2023",
    description:
      "Full-stack collaborative markdown editor with multi-user presence cursors, operational transformation sync, and Redis session state.",
    fullDescription:
      "A Google Docs-style real-time collaborative workspace. Implemented WebSocket synchronization with Redis Pub/Sub, client-side optimistic UI updates, and markdown live rendering with user cursor presence broadcasting.",
    metrics: [
      { label: "Sync Latency", value: "<18ms" },
      { label: "Concurrent Users", value: "500+" },
      { label: "Uptime", value: "99.9%" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "WebSockets",
      "Redis",
      "Tailwind CSS",
      "Prisma",
    ],
    links: {
      live: "https://github.com/anindyanandi",
      github: "https://github.com/anindyanandi",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-6",
      height: "min-h-[440px]",
    },
    accentColor: "#a39fb5",
    featured: false,
    status: "Completed",
    deliverables: [
      "WebSocket Server",
      "Multi-Cursor Presence Engine",
      "Markdown Live Previewer",
      "Redis Pub/Sub Layer",
    ],
    mockType: "webpage",
  },*/
  {
    id: "codegen",
    title: "CodeGen — AI Browser IDE",
    subtitle: "In-Browser Full-Stack IDE with WebContainers",
    category: "Full Stack",
    year: "2025",
    description:
      "Full-stack AI-driven IDE running entirely in the browser. Features CodeMirror 6 with AI completions, in-browser Node.js runtime via WebContainer API, and full codebase agent editing.",
    fullDescription:
      "A production-quality in-browser development environment inspired by Cursor and Bolt. Combines CodeMirror 6 with context-aware AI inline completions, in-browser Node.js execution via WebContainers, an AI agent with filesystem tools, and real-time state synchronization powered by Convex.",
    metrics: [
      { label: "Runtime", value: "In-Browser" },
      { label: "State Sync", value: "<50ms Realtime" },
      { label: "Editor Engine", value: "CodeMirror 6" },
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Convex",
      "WebContainer",
      "Tailwind CSS",
    ],
    links: {
      live: "https://codegenlive.vercel.app",
      github: "https://github.com/Anindya4/CodeGen",
    },
    gridSpan: {
      desktop: "col-span-12 lg:col-span-6",
      height: "min-h-[440px]",
    },
    accentColor: "#6C47FF",
    featured: false,
    status: "Live Production",
    deliverables: [
      "WebContainer In-Browser Runtime",
      "Multi-File AI Coding Agent",
      "CodeMirror 6 AI Completions",
      "Convex Realtime Database Sync",
    ],
    mockType: "webpage",
  },
];

export const CAPABILITIES = [
  {
    category: "Data Engineering & LLMs",
    items: [
      "SQL",
      "Python",
      "Pandas & Numpy",
      "RAG Architectures",
      "OpenAI API & LLM Integration",
      "Semantic Search & Embeddings",
    ],
  },
  {
    category: "Full Stack Development",
    items: [
      "Python, SQL, JavaScript",
      "FastAPI",
      "React.js",
      "Streamlit",
      "Docker & Containerization",
      "Git & GitHub Workflows",
    ],
  },
  {
    category: "CV, NLP & Deep Learning",
    items: [
      "OpenCV",
      "LangChain",
      "EfficientNet",
      "Object Detection",
      "PyTorch & Scikit-learn",
      // "Transfer Learning",
      "Model Evaluation & Optimization",
    ],
  },
];

export const EDUCATION_DATA = [
  {
    degree: "Master of Science (M.Sc.) in Computer Science",
    institution: "Vidyasagar University",
    location: "Medinipur, India",
    period: "09/2023 — 07/2025",
    gpa: "8.79 CGPA",
    highlights:
      "Advanced Algorithms, Machine Learning Systems, Deep Learning Research.",
  },
  {
    degree: "Bachelor of Science (B.Sc. Honors) in Mathematics",
    institution: "Vivekananda Satavarshiki Mahavidyalaya",
    location: "Manikpara, India",
    period: "07/2019 — 08/2022",
    gpa: "8.90 CGPA",
    highlights:
      "Linear Algebra, Real Analysis, Probability & Statistics, Discrete Mathematics.",
  },
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
