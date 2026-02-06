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
    narrative: "I noticed a massive gap between restaurants with expiring surplus and students looking for affordable eats. Dealish isn't just a map; it's a real-time marketplace. I built it to handle high-frequency location updates and secure merchant-to-user transactions, ensuring the deal you see is the deal you get.",
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
    narrative: "Databases are often black boxes. During my time at Kùzu, I realized that if a developer can't see the query plan, they can't optimize it. I dove into the C++ core to build a visualization layer for the query planner, turning abstract metadata into a roadmap for performance.",
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
    narrative: "Medical research moves fast, but implementation is slow. I took complex pharmaceutical research and built the data infrastructure that powers consultations for thousands of pharmacists. I even built an AI-powered bridge to expand our impact into French-speaking markets.",
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
    narrative: "Most hackathons feel like career fairs. I wanted something different—a league where engineering excellence is the only currency. I founded NeoDev to create high-stakes, competitive environments where the best builders actually get to test their limits.",
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
    narrative: "Being elected by my peers in the Software Engineering '30 cohort means more than just attending meetings. It's about translating student friction into faculty action, ensuring our academic path keeps pace with the speed of the industry.",
    highlights: [
      "Elected as the primary academic liaison for the SE 2030 cohort.",
      "Advocating for curriculum improvements and student resource allocation.",
      "Bridging the communication gap between high-performing students and university leadership."
    ],
    stack: ["Strategy", "Advocacy", "Communication"],
    status: "ongoing",
  }
];
