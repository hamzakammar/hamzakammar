export type District = "systems" | "building" | "production";

export interface Project {
  id: string;              // must match SVG building id
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
  status?: "shipped" | "ongoing" | "experimental";
}

export const Projects: Project[] = [
  {
    id: "dealish",
    title: "Dealish",
    district: "building",
    tagline: "saving money",
    narrative: "Real-time marketplace connecting restaurants with surplus food to students.",
    highlights: [
      "Architected a map-first UX that handles live location-based filtering with zero lag.",
      "Engineered a secure Supabase backend with RBAC to protect both merchant and user data.",
      "Integrated react-native-maps to bridge the gap between digital discovery and physical navigation."
    ],
    stack: ["React Native", "Expo", "Supabase", "PostGIS"],
    status: "ongoing",
    links: { demo: "https://dealish.io" }
  },
  {
    id: "kuzu",
    title: "Kùzu DB",
    district: "systems",
    tagline: "youngest intern at Kùzu",
    narrative: "Built query planner visualization layer in C++ to make database optimization accessible.",
    highlights: [
      "Built the printing engine for 40+ operators, cutting query debugging time for the core team.",
      "Refined the 'Explorer' UI using Chroma.js to make complex graph schemas visually intuitive.",
      "Optimized query plan visualization, directly supporting the benchmarking of the fastest embedded graph DB."
    ],
    stack: ["C++", "Database Internals", "Query Optimization", "Chroma.js"],
    status: "shipped",
  },
  {
    id: "mapflow",
    title: "MapFLOW",
    district: "production",
    tagline: "making pharma more accessible",
    narrative: "Data infrastructure powering pharmaceutical consultations for thousands of pharmacists.",
    highlights: [
      "Transformed static research into dynamic JSON engines, saving pharmacists 15 minutes per patient.",
      "Directly contributed to a 10x revenue increase by streamlining the consultation workflow.",
      "Developed a Python/OpenAI CLI to automate the translation of clinical data for international expansion."
    ],
    stack: ["Python", "OpenAI API", "Data Engineering", "JSON Engine"],
    status: "shipped",
  },
  {
    id: "neodev",
    title: "NeoDev League",
    district: "building",
    tagline: "revolutionizing competitive programming",
    narrative: "Founded competitive programming league where engineering excellence is the currency.",
    highlights: [
      "Founded and scaled a multi-event series from zero to a recognized community staple.",
      "Led full-cycle event ops: from securing technical sponsorships to architecting the competition platform.",
      "Built a community of high-performing engineers through brand-driven technical challenges."
    ],
    stack: ["Leadership", "Community Architecture", "Product Strategy"],
    status: "ongoing",
    links: { demo: "https://neoleague.dev" }
  },
  {
    id: "classRep",
    title: "SE '30 Representative",
    district: "building", // Place this near the 'City Center' as it's foundational
    tagline: "Liaison for the next generation of Software Engineers.",
    narrative: "Elected liaison translating student needs into faculty action for SE '30 cohort.",
    highlights: [
      "Elected as the primary academic liaison for the SE 2030 cohort.",
      "Advocating for curriculum improvements and student resource allocation.",
      "Bridging the communication gap between high-performing students and university leadership."
    ],
    stack: ["Strategy", "Advocacy", "Communication"],
    status: "ongoing",
  },
  {
    id: "CC",
    title: "Course Connect",
    district: "production",
    tagline: "connecting students with courses",
    highlights: [
      "Created a platform for students to find courses at their own pace",
      "Created a platform for students to find courses at their own pace",
    ],
    stack: ["React Native", "Expo", "Supabase", "Maps"],
    narrative: "Python scraper collecting 1,000+ courses into a structured validation dataset.",
    status: "shipped",
    links: { demo: "https://cc.hamzaammar.ca" }
  },
  {
    id: "horizon",
    title: "Horizon",
    district: "production",
    tagline: "MCP server for your school",
    highlights: [
      "Created an MCP server which connects to brightspace, piazza and course notes",
      "Built a mobile app which allows students to view their course notes and assignments",
    ],
    stack: ["Python", "MCP", "React Native", "Expo", "Supabase", "Vector Search"],
    narrative: "MCP server connecting Brightspace, Piazza, and course notes with mobile access.",

  }
];
