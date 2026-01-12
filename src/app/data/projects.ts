export type District = "systems" | "building" | "production";

export interface Project {
  id: string;              // must match SVG building id
  title: string;
  district: District;
  tagline: string;
  highlights: string[];
  stack: string[];
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
    tagline: "Real-time food and drink deals for you",
    highlights: [
        "Launched Dealish app to 10k+ users in first 3 months",
        "Integrated real-time geolocation and deal notifications",
        "Collaborated with local businesses to feature exclusive offers"
    ],
    stack: ["React Native", "Expo", "Supabase", "Maps"],
    links: {
      demo: "https://dealish.io",
      github: ""
    },
    status: "ongoing"
    },
    {
    id: "neodev",
    title: "NeoDev League",
    district: "building",
    tagline: "Revolutionizing Competitive Programming Forever",
    highlights: [
      "Founded and scaled a multi-event hackathon series",
      "Led sponsorships, logistics, and technical platforms"
    ],
    stack: ["Leadership", "Community", "Event Ops"],
    status: "ongoing"
  }
];