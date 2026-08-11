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
  // Classic/about timeline metadata (single source of truth shared with /classic and /about).
  // `role` present means rendered as Experience; absent means rendered as Project.
  date?: string;
  start?: number;            // YYYYMM sort key; timelines render most-recent-first
  blurb?: string;            // concise one-line description used on /about (SEO page)
  image?: string;            // logo shown in the classic experience card
  backgroundImage?: string;  // hover background in the classic experience card
}

export const Projects: Project[] = [
  {
    id: "kuzu",
    title: "Kùzu DB",
    role: "Software Intern",
    tagline: "Database internals at the query planner level.",
    narrative:
      "Joined KùzuDB's core team as its youngest engineer, working deep in the C++ query-planner internals. I built the operator-printing engine for 40+ operators, turning opaque execution plans into something the team could actually read, and cut query-debugging time across the board. Kùzu was later acquired by Apple.",
    highlights: [
      "Built the printing engine for 40+ operators, cutting query debugging time for the core team.",
      "Refined the Explorer UI using Chroma.js to make complex graph schemas visually intuitive.",
      "Directly supported benchmarking of the fastest embedded graph database."
    ],
    stack: ["C++", "Database Internals", "Query Optimization", "Chroma.js"],
    status: "shipped",
    date: "Summer 2024",
    start: 202406,
    blurb: "Built operator printing for KùzuDB's query planner (40+ operators) and refined the Explorer UI. Kùzu was later acquired by Apple.",
    image: "/kuzu.png",
    backgroundImage: "/kuzu-bg.png",
    links: { demo: "https://kuzudb.github.io/" },
  },
  {
    id: "chess",
    title: "Chess Engine",
    tagline: "Deep learning meets classical strategy.",
    narrative:
      "Built a deep CNN chess engine with two friends in 24 hours at ChessHacks 2025: a residual architecture with policy and value heads, trained end-to-end on millions of grandmaster games and optimized on NVIDIA H100s with mixed precision. My first real dive into deep learning, and we went all in.",
    highlights: [
      "Implemented a residual convolutional architecture with policy and value heads using PyTorch.",
      "Trained end-to-end on millions of grandmaster games for move prediction and board evaluation.",
      "Optimized training on NVIDIA H100s via efficient tensor operations, large batch sizes, and mixed precision."
    ],
    stack: ["Python", "PyTorch", "Deep Learning", "CUDA"],
    status: "shipped",
    date: "November 2025",
    start: 202511,
    blurb: "A deep CNN chess engine trained on millions of grandmaster games, using a residual architecture with policy and value heads in PyTorch.",
  },
  {
    id: "godseye",
    title: "Godseye",
    tagline: "Multi-agent prediction markets.",
    narrative:
      "Built a multi-agent trading system that simulates Polymarket bets: specialized agents each take a stance, debate one another, and converge on a single consensus signal. Took 2nd in the Polymarket track at YHack (Yale).",
    highlights: [
      "Placed 2nd in the Polymarket track at YHack (Yale).",
      "Designed an agent-orchestration pipeline where specialized agents debate and produce a consensus signal.",
      "Ran AI-driven simulations over live Polymarket data to evaluate bets."
    ],
    stack: ["Python", "Multi-Agent", "LLMs", "Polymarket API"],
    status: "shipped",
    date: "March 2026",
    start: 202603,
    blurb: "A multi-agent prediction-market tool that simulates Polymarket bets. Placed 2nd in the Polymarket track at YHack (Yale).",
    links: { demo: "https://devpost.com/software/godseye-uwma5h" },
  },
  {
    id: "horizon",
    title: "Horizon MCP",
    tagline: "AI access to your university, through MCP.",
    narrative:
      "Built Horizon, a multi-tenant MCP server on AWS that gives students AI access to their own university accounts. It connects D2L and Piazza behind per-user authenticated logins (Duo 2FA included) and runs pgvector semantic search over course files and posts, so Claude or ChatGPT can answer anything about your courses, grades, and deadlines.",
    highlights: [
      "Built a multi-tenant MCP server on AWS ECS Fargate serving live course data to students.",
      "Implemented pgvector semantic search over notes and Piazza posts using HNSW-indexed embeddings.",
      "Integrated D2L and Piazza with per-user authenticated sessions, including Duo 2FA."
    ],
    stack: ["TypeScript", "MCP", "AWS ECS", "pgvector", "Postgres"],
    status: "ongoing",
    date: "January 2026 - Present",
    start: 202601,
    blurb: "A multi-tenant MCP server on AWS that gives students AI access to their university accounts: D2L, Piazza, and course files, with semantic search.",
    links: { demo: "https://horizon.hamzaammar.ca/onboard", github: "https://github.com/hamzakammar/mcp-workspace" },
  },
  {
    id: "unimap",
    title: "UniMap",
    tagline: "Graph algorithms applied to physical space.",
    narrative:
      "Built a campus navigation tool in Python + NetworkX, running Dijkstra's over a graph of Waterloo's buildings with a React frontend to visualize routes. One of my first real projects; not the most sophisticated thing I've built, but it's where a lot of this started.",
    highlights: [
      "Applied Dijkstra's algorithm via NetworkX to compute optimal campus routes.",
      "Developed a React-based website to host UniMap and visualize paths between university buildings."
    ],
    stack: ["Python", "NetworkX", "React", "Algorithms"],
    status: "shipped",
    date: "Summer 2022",
    start: 202206,
    blurb: "A campus navigation tool applying Dijkstra's via NetworkX, with a React frontend for route visualization.",
    links: { github: "https://github.com/hamzakammar/UniMap" },
  },
  {
    id: "mapflow",
    title: "MapFLOW",
    role: "Data Manager",
    tagline: "Data infrastructure trusted by 3,500+ pharmacists.",
    narrative:
      "Turned static medical research into structured JSON engines powering MapFLOW's symptom-to-pharmacy app, trusted by 3,500+ pharmacists, shaving ~15 minutes off each consultation and driving a 10x jump in pharmacy revenue. I also shipped a Python + OpenAI CLI that scaled it to 500+ French-speaking pharmacies.",
    highlights: [
      "Transformed static research into dynamic JSON engines, saving pharmacists ~15 minutes per patient.",
      "Directly contributed to a 10x revenue increase by streamlining the consultation workflow.",
      "Built a Python/OpenAI CLI to automate translation of clinical data, expanding to 500+ French-speaking pharmacies."
    ],
    stack: ["Python", "OpenAI API", "Data Engineering", "JSON"],
    status: "shipped",
    date: "Nov 2022 - Mar 2024",
    start: 202211,
    blurb: "Structured medical research into JSON datasets used by 3,500+ pharmacists, and built a Python + OpenAI CLI that scaled to 500+ French-speaking pharmacies.",
    image: "/mapflow.png",
    backgroundImage: "/mapflow-bg.png",
    links: { demo: "https://mapflow.ca" },
  },
  {
    id: "cc",
    title: "CourseConnect",
    tagline: "Structured course data for degree validation.",
    narrative:
      "Built a Python + Playwright scraper that normalized 1,000+ Waterloo courses into a queryable dataset, then modeled the prerequisite graph so SE students can validate their degree plans in seconds. Built it because I couldn't make sense of the university's own website the first time around.",
    highlights: [
      "Scraped and normalized 1,000+ courses into a structured, queryable dataset.",
      "Modeled degree requirements and dependencies for automated plan validation.",
      "Built a tool enabling SE students to validate their degree plans against requirements."
    ],
    stack: ["Python", "Playwright", "React Native", "Supabase"],
    status: "shipped",
    date: "Sep 2025 - Dec 2025",
    start: 202509,
    blurb: "A Python + Playwright scraper that normalized 1,000+ Waterloo courses into a prerequisite graph for degree-path validation.",
    links: { demo: "https://cc.hamzaammar.ca", github: "https://github.com/hamzakammar/course-connect" },
  },
  {
    id: "dealish",
    title: "Dealish",
    role: "Founding Engineer",
    tagline: "Real-time food discovery, founded from scratch.",
    narrative:
      "Founding engineer on Dealish: a map-first app for discovering real-time food and drink deals around you. Geospatial search over a Supabase + PostGIS backend, live location filtering with zero lag, and restaurant-side tools to manage time-sensitive stock. Built part-time through school, launching soon 👀",
    highlights: [
      "Architected a map-first UX handling live location-based filtering with zero lag.",
      "Engineered a secure Supabase backend with role-based access control for merchants and users.",
      "Integrated react-native-maps bridging digital discovery and physical navigation."
    ],
    stack: ["React Native", "Expo", "Supabase", "PostGIS"],
    status: "ongoing",
    date: "Dec 2025 - Present",
    start: 202512,
    blurb: "Founding engineer on a React Native app for real-time food and drink deal discovery, backed by a Supabase + PostGIS backend.",
    image: "/dealish.png",
    backgroundImage: "/dealish-bg.png",
    links: { demo: "https://dealish.io" },
  },
  {
    id: "neodev",
    title: "NeoDev League",
    role: "Founder",
    tagline: "Competitive programming, reinvented.",
    narrative:
      "Founded NeoDev League, a competitive-programming league for high schoolers. Raised $12,000 from sponsors and ran it end to end, from the platform to the problem sets. Started it because I was bored of the usual hackathon format and wanted to build something better.",
    highlights: [
      "Founded and scaled a multi-event series from zero to a recognized community staple.",
      "Led full-cycle event ops: sponsorships, platform architecture, and competition design.",
      "Built a community of high-performing engineers through brand-driven technical challenges."
    ],
    stack: ["Leadership", "Community Architecture", "Product Strategy"],
    status: "ongoing",
    date: "May 2024 - Present",
    start: 202405,
    blurb: "Founded a competitive programming league for high schoolers, raising $12,000 in sponsorships.",
    image: "/neodev.png",
    backgroundImage: "/neodev-bg.png",
    links: { demo: "https://neoleague.dev" },
  },
  {
    id: "uw",
    title: "University of Waterloo",
    role: "SE Rep",
    tagline: "Elected liaison for Software Engineering 2030.",
    narrative:
      "Elected by my cohort as academic representative for Waterloo Software Engineering 2030, the bridge between 100+ engineers and the faculty. I take what students actually need and turn it into action on curriculum and resources.",
    highlights: [
      "Elected as the primary academic liaison for the SE 2030 cohort.",
      "Advocating for curriculum improvements and student resource allocation.",
      "Bridging communication between high-performing students and university leadership."
    ],
    stack: ["Strategy", "Advocacy", "Communication"],
    status: "ongoing",
    date: "Sep 2025 - Present",
    start: 202509,
    blurb: "Elected Class Academic Representative for the SE 2030 cohort, liaison between 100+ engineers and the faculty.",
    image: "/UW.png",
  },
  {
    id: "shopify",
    title: "Shopify",
    role: "SWE Intern",
    tagline: "Software Engineering intern, 2026.",
    narrative:
      "Software Engineering intern at Shopify, building internal developer tooling for merchant-facing workflows.",
    highlights: [
      "Software Engineering Intern building internal tooling for merchant-facing workflows."
    ],
    stack: ["Ruby", "Rails", "React", "TypeScript"],
    status: "ongoing",
    date: "May 2026 - Present",
    start: 202605,
    blurb: "Building internal developer tooling for merchant-facing workflows.",
    image: "/shopify.png",
  },
];
