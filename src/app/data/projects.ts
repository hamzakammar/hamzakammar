export interface Project {
  id: string;              // must match SVG building data-project
  title: string;
  role?: string;           // your role/title at this project (e.g. "Software Intern")
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
  story?: string;
  storyPreview?: string;
}

import { getStoryById } from '../stories';

export const Projects: Project[] = [
  {
    id: "kuzu",
    title: "Kùzu DB",
    role: "Software Intern",
    tagline: "Database internals at the query planner level.",
    narrative:
      "Joined as the youngest intern on KuzuDB's core team. Built operator printing for the query planner in C++, improving plan visualization and cutting debugging time. Also worked on the explorer design for the visual node display.",
    highlights: [
      "Built the printing engine for 40+ operators, cutting query debugging time for the core team.",
      "Refined the Explorer UI using Chroma.js to make complex graph schemas visually intuitive.",
      "Directly supported benchmarking of the fastest embedded graph database."
    ],
    stack: ["C++", "Database Internals", "Query Optimization", "Chroma.js"],
    status: "shipped",
    story: getStoryById("kuzu"),
    links: { demo: "https://kuzudb.github.io/" },
  },
  {
    id: "chess",
    title: "Chess Engine",
    tagline: "Deep learning meets classical strategy.",
    narrative:
      "Developed a deep CNN-based chess engine trained end-to-end on millions of grandmaster games with a residual convolutional architecture, as my first real project in CNNs and Machine Learning. I built this model with 2 other friends in 24 hours at ChessHacks 2025.",
    highlights: [
      "Implemented a residual convolutional architecture with policy and value heads using PyTorch.",
      "Trained end-to-end on millions of grandmaster games for move prediction and board evaluation.",
      "Optimized training on NVIDIA H100s via efficient tensor operations, large batch sizes, and mixed precision."
    ],
    stack: ["Python", "PyTorch", "Deep Learning", "CUDA"],
    status: "shipped",
    story: getStoryById("chess"),
  },
  {
    id: "horizon",
    title: "Horizon MCP",
    tagline: "Unified academic intelligence layer.",
    narrative:
      "Built Horizon (React Native + MCP server): unified D2L Brightspace, Piazza, and personal notes into a mobile-first academic assistant with semantic search.",
    highlights: [
      "Implemented a semantic retrieval pipeline using PDF embeddings and vector search for quick notes access.",
      "Integrated D2L/Brightspace and Piazza with asynchronous, fault-tolerant syncing.",
      "Unified course content, notes, and discussions into a single searchable interface."
    ],
    stack: ["Python", "MCP", "Vector Search", "React Native", "Supabase"],
    status: "ongoing",
    story: getStoryById("horizon"),
  },
  {
    id: "unimap",
    title: "UniMap",
    tagline: "Graph algorithms applied to physical space.",
    narrative:
      "Built a Python + NetworkX navigation tool applying Dijkstra's algorithm to map campus routes, with a React frontend for path visualization. This was one of ym first big projects, and while it's no longe very technically impressive, it holds a special place in my portfolio.",
    highlights: [
      "Applied Dijkstra's algorithm via NetworkX to compute optimal campus routes.",
      "Developed a React-based website to host UniMap and visualize paths between university buildings."
    ],
    stack: ["Python", "NetworkX", "React", "Algorithms"],
    status: "shipped",
    story: getStoryById("unimap"),
  },
  {
    id: "mapflow",
    title: "MapFLOW",
    role: "Data Manager",
    tagline: "Data infrastructure trusted by 3,500+ pharmacists.",
    narrative:
      "Built JSON-structured medical datasets powering MapFLOW's symptom-to-pharmacy app (reduced consultation time ~15 min, drove 10x pharmacy revenue growth).",
    highlights: [
      "Transformed static research into dynamic JSON engines, saving pharmacists ~15 minutes per patient.",
      "Directly contributed to a 10x revenue increase by streamlining the consultation workflow.",
      "Built a Python/OpenAI CLI to automate translation of clinical data, expanding to 500+ French-speaking pharmacies."
    ],
    stack: ["Python", "OpenAI API", "Data Engineering", "JSON"],
    status: "shipped",
    story: getStoryById("mapflow"),
    links: { demo: "https://mapflow.ca" },
  },
  {
    id: "cc",
    title: "CourseConnect",
    tagline: "Structured course data for degree validation.",
    narrative:
      "Built a Python + Playwright scraper to collect and normalize 1,000+ courses into a structured dataset, enabling SE students to see their degree plan requirements in a simpler way. Built because I didn't understnad the university's website the first time around.",
    highlights: [
      "Scraped and normalized 1,000+ courses into a structured, queryable dataset.",
      "Modeled degree requirements and dependencies for automated plan validation.",
      "Built a tool enabling SE students to validate their degree plans against requirements."
    ],
    stack: ["Python", "Playwright", "React Native", "Supabase"],
    status: "shipped",
    links: { demo: "https://cc.hamzaammar.ca" },
    story: getStoryById("cc"),
  },
  {
    id: "dealish",
    title: "Dealish",
    role: "Co-Founder",
    tagline: "Real-time food discovery, founded from scratch.",
    narrative:
"Building Dealish in React Native: map-first deal discovery app with Supabase backend, geospatial search, and restaurant-side inventory management for time-sensitive stock. Building part time during school, launching soon 👀",
   highlights: [
      "Architected a map-first UX handling live location-based filtering with zero lag.",
      "Engineered a secure Supabase backend with role-based access control for merchants and users.",
      "Integrated react-native-maps bridging digital discovery and physical navigation."
    ],
    stack: ["React Native", "Expo", "Supabase", "PostGIS"],
    status: "ongoing",
    links: { demo: "https://dealish.io" },
    story: getStoryById("dealish"),
  },
  {
    id: "neodev",
    title: "NeoDev League",
    role: "Founder",
    tagline: "Competitive programming, reinvented.",
    narrative:
      "Founded a competitive programming league for highschoolers and raised 12,000$ in funding from sponsors. Started because I was bored of hackathons, and wanted to change it up a little bit.",
    highlights: [
      "Founded and scaled a multi-event series from zero to a recognized community staple.",
      "Led full-cycle event ops: sponsorships, platform architecture, and competition design.",
      "Built a community of high-performing engineers through brand-driven technical challenges."
    ],
    stack: ["Leadership", "Community Architecture", "Product Strategy"],
    status: "ongoing",
    links: { demo: "https://neoleague.dev" },
    story: getStoryById("neodev"),
  },
  {
    id: "uw",
    title: "University of Waterloo",
    role: "SE Rep",
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
    story: getStoryById("uw"),
  },
  {
    id: "shopify",
    title: "Shopify",
    role: "Incoming SWE Intern",
    tagline: "Incoming Software Engineering intern — Summer 2026.",
    narrative:
      "Joining Shopify as a Software Engineering intern for Summer 2026.",
    highlights: [
      "Incoming Software Engineering Intern — Summer 2026."
    ],
    stack: ["Ruby", "React", "TypeScript"],
    status: "ongoing",
  },
];
