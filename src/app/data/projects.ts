export type District = "systems" | "building" | "production";

export interface Project {
  id: string;              // must match SVG building data-project
  title: string;
  district: District;
  tagline: string;
  highlights: string[];
  stack: string[];
  narrative: string;
  links?: {
    demo?: string;
    github?: string;
    writeup?: string;
  };
  videoUrl?: string;   // YouTube/Loom embed URL for demo video
  status?: "shipped" | "ongoing" | "experimental";
}

export const Projects: Project[] = [
  // ═══ SYSTEMS DISTRICT ═══
  {
    id: "kuzu",
    title: "Kùzu DB",
    district: "systems",
    tagline: "Database internals at the query planner level.",
    narrative:
      "Built operator printing for KuzuDB's query planner in C++, improving plan visualization and cutting debugging time across the core team.",
    highlights: [
      "Built the printing engine for 40+ operators, cutting query debugging time for the core team.",
      "Refined the Explorer UI using Chroma.js to make complex graph schemas visually intuitive.",
      "Directly supported benchmarking of the fastest embedded graph database."
    ],
    stack: ["C++", "Database Internals", "Query Optimization", "Chroma.js"],
    status: "shipped",
  },
  {
    id: "chess",
    title: "Chess Engine",
    district: "systems",
    tagline: "Deep learning meets classical strategy.",
    narrative:
      "Developed a deep CNN-based chess engine trained end-to-end on millions of grandmaster games with a residual convolutional architecture.",
    highlights: [
      "Implemented a residual convolutional architecture with policy and value heads using PyTorch.",
      "Trained end-to-end on millions of grandmaster games for move prediction and board evaluation.",
      "Optimized training on NVIDIA H100s via efficient tensor operations, large batch sizes, and mixed precision."
    ],
    stack: ["Python", "PyTorch", "Deep Learning", "CUDA"],
    status: "shipped",
  },
  {
    id: "horizon",
    title: "Horizon MCP",
    district: "systems",
    tagline: "Unified academic intelligence layer.",
    narrative:
      "Built an MCP academic assistant unifying course content, notes, and discussions into a searchable system with semantic retrieval.",
    highlights: [
      "Implemented a semantic retrieval pipeline using PDF embeddings and vector search for quick notes access.",
      "Integrated D2L/Brightspace and Piazza with asynchronous, fault-tolerant syncing.",
      "Unified course content, notes, and discussions into a single searchable interface."
    ],
    stack: ["Python", "MCP", "Vector Search", "React Native", "Supabase"],
    status: "ongoing",
  },
  {
    id: "unimap",
    title: "UniMap",
    district: "systems",
    tagline: "Graph algorithms applied to physical space.",
    narrative:
      "Built a Python + NetworkX navigation tool applying Dijkstra's algorithm to map campus routes, with a React frontend for path visualization.",
    highlights: [
      "Applied Dijkstra's algorithm via NetworkX to compute optimal campus routes.",
      "Developed a React-based website to host UniMap and visualize paths between university buildings."
    ],
    stack: ["Python", "NetworkX", "React", "Algorithms"],
    status: "shipped",
  },

  // ═══ PRODUCTION DISTRICT ═══
  {
    id: "mapflow",
    title: "MapFLOW",
    district: "production",
    tagline: "Data infrastructure trusted by 3,500+ pharmacists.",
    narrative:
      "Structured medical research into JSON datasets powering MapFLOW's app, reducing consultation time by ~15 minutes and driving 10x pharmacy revenue.",
    highlights: [
      "Transformed static research into dynamic JSON engines, saving pharmacists ~15 minutes per patient.",
      "Directly contributed to a 10x revenue increase by streamlining the consultation workflow.",
      "Built a Python/OpenAI CLI to automate translation of clinical data, expanding to 500+ French-speaking pharmacies."
    ],
    stack: ["Python", "OpenAI API", "Data Engineering", "JSON"],
    status: "shipped",
  },
  {
    id: "CC",
    title: "CourseConnect",
    district: "production",
    tagline: "Structured course data for degree validation.",
    narrative:
      "Built a Python + Playwright scraper to collect and normalize 1,000+ courses into a structured dataset, enabling SE students to validate degree plans.",
    highlights: [
      "Scraped and normalized 1,000+ courses into a structured, queryable dataset.",
      "Modeled degree requirements and dependencies for automated plan validation.",
      "Built a tool enabling SE students to validate their degree plans against requirements."
    ],
    stack: ["Python", "Playwright", "React Native", "Supabase"],
    status: "shipped",
    links: { demo: "https://cc.hamzaammar.ca" }
  },
  {
    id: "flourishing",
    title: "Flourishing Realty",
    district: "production",
    tagline: "Rental platform deployed to real tenants.",
    narrative:
      "Deployed a Next.js + Node.js rental platform on AWS EC2, enabling 20+ tenants to browse and request furnished rental homes.",
    highlights: [
      "Deployed a full-stack rental platform on AWS EC2 serving 20+ active tenants.",
      "Designed a responsive interface with filtering, viewing, and request workflows."
    ],
    stack: ["Next.js", "Node.js", "AWS EC2", "S3"],
    status: "shipped",
  },

  // ═══ BUILDING DISTRICT ═══
  {
    id: "dealish",
    title: "Dealish",
    district: "building",
    tagline: "Real-time food discovery, founded from scratch.",
    narrative:
      "Building a React Native location-based app for real-time food and drink discovery with a secure Supabase backend and map-driven UX.",
    highlights: [
      "Architected a map-first UX handling live location-based filtering with zero lag.",
      "Engineered a secure Supabase backend with role-based access control for merchants and users.",
      "Integrated react-native-maps bridging digital discovery and physical navigation."
    ],
    stack: ["React Native", "Expo", "Supabase", "PostGIS"],
    status: "ongoing",
    links: { demo: "https://dealish.io" }
  },
  {
    id: "neodev",
    title: "NeoDev League",
    district: "building",
    tagline: "Competitive programming, reinvented.",
    narrative:
      "Founded a competitive programming league where engineering excellence is the currency.",
    highlights: [
      "Founded and scaled a multi-event series from zero to a recognized community staple.",
      "Led full-cycle event ops: sponsorships, platform architecture, and competition design.",
      "Built a community of high-performing engineers through brand-driven technical challenges."
    ],
    stack: ["Leadership", "Community Architecture", "Product Strategy"],
    status: "ongoing",
    links: { demo: "https://neoleague.dev" }
  },
  {
    id: "mentai",
    title: "MentAI",
    district: "building",
    tagline: "AI-powered mental health support.",
    narrative:
      "Created a CoHere-powered web app for mental health support, assisting users in crisis scenarios. Placed Top 5 at MetHacks.",
    highlights: [
      "Built an AI-powered mental health support tool using CoHere's NLP capabilities.",
      "Placed Top 5 at MetHacks, pitching to judges including CoHere representatives."
    ],
    stack: ["CoHere API", "JavaScript", "NLP"],
    status: "shipped",
  },
  {
    id: "classRep",
    title: "SE '30 Representative",
    district: "building",
    tagline: "Elected liaison for Software Engineering 2030.",
    narrative:
      "Elected academic representative translating student needs into faculty action for the SE 2030 cohort at University of Waterloo.",
    highlights: [
      "Elected as the primary academic liaison for the SE 2030 cohort.",
      "Advocating for curriculum improvements and student resource allocation.",
      "Bridging communication between high-performing students and university leadership."
    ],
    stack: ["Strategy", "Advocacy", "Communication"],
    status: "ongoing",
  },
];
