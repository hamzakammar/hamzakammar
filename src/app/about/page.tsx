import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hamza Ammar — About",
  description:
    "Hamza Ammar is a Software Engineering student at the University of Waterloo and incoming Software Engineering Intern at Shopify. He builds full-stack products, ML systems, and developer tools.",
  openGraph: {
    title: "Hamza Ammar — About",
    description:
      "Software Engineering student at Waterloo. Incoming SWE Intern at Shopify. Builds full-stack products, ML systems, and developer tools.",
    url: "https://hamzaammar.ca/about",
    siteName: "Hamza Ammar",
    images: [{ url: "/HA.jpg", width: 1200, height: 630, alt: "Hamza Ammar" }],
    locale: "en_US",
    type: "profile",
  },
};

const projects = [
  {
    name: "Horizon MCP",
    url: "https://horizon.hamzaammar.ca/onboard",
    description:
      "MCP academic assistant on AWS — unifies D2L/Brightspace, Piazza, and course notes with semantic search, serving 50+ students.",
  },
  {
    name: "Dealish",
    url: "https://dealish.io",
    description:
      "Co-founded a React Native location-based app for real-time food and drink deal discovery, backed by a Supabase + PostGIS backend.",
  },
  {
    name: "Godseye",
    url: null,
    description:
      "Multi-agent prediction market tool using AI-driven simulations on Polymarket bets. Placed 2nd in the Polymarket track at YHack (Yale).",
  },
  {
    name: "Chess Engine",
    url: null,
    description:
      "Deep CNN chess engine trained on millions of grandmaster games using a residual architecture with policy and value heads in PyTorch.",
  },
  {
    name: "CourseConnect",
    url: "https://cc.hamzaammar.ca",
    description:
      "Python + Playwright scraper that normalised 1,000+ UW courses into a prerequisite dependency graph for degree-path validation.",
  },
  {
    name: "NeoDev League",
    url: "https://neoleague.dev",
    description:
      "Founded a competitive programming league for high schoolers, raising $12,000 in sponsorships and running three seasons.",
  },
  {
    name: "UniMap",
    url: null,
    description:
      "Campus navigation tool applying Dijkstra's algorithm via NetworkX, with a React frontend for route visualisation.",
  },
];

const experience = [
  {
    company: "Shopify",
    role: "Software Engineering Intern",
    period: "May 2026 – Present",
    description: "Developing internal tools to support merchant growth across Shopify's platform.",
  },
  {
    company: "Kùzu Inc",
    role: "Software Intern",
    period: "Jun 2024 – Aug 2024",
    description:
      "Built operator printing for KuzuDB's query planner, adding metadata for 40+ operators. Refined the Explorer UI with Chroma.js to improve graph schema visualisation.",
  },
  {
    company: "MapFLOW",
    role: "Data Manager",
    period: "Nov 2022 – Mar 2024",
    description:
      "Structured medical research into JSON datasets trusted by 3,500+ pharmacists. Built a Python + OpenAI CLI that expanded reach to 500+ French-speaking pharmacies.",
  },
];

const stack = [
  { label: "Languages", items: "Python, C++, C, Swift, JavaScript, TypeScript, SQL, Ruby" },
  { label: "Frameworks", items: "React, Next.js, React Native, Node.js, Flask, Express, TensorFlow, PyTorch" },
  { label: "Cloud & Infra", items: "AWS (EC2, S3), Supabase, Firebase, Docker, Git, Linux" },
  { label: "Domains", items: "Full-stack, Machine Learning, Systems, Web Scraping, Algorithms" },
];

export default function About() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #ffffff;
          --fg: #111111;
          --muted: #555555;
          --border: #e5e5e5;
          --accent: #111111;
          --link: #0066cc;
          font-size: 16px;
        }
        body { background: var(--bg); color: var(--fg); }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #0f0f0f;
            --fg: #eeeeee;
            --muted: #999999;
            --border: #2a2a2a;
            --accent: #eeeeee;
            --link: #66aaff;
          }
        }
        .page {
          max-width: 680px;
          margin: 0 auto;
          padding: 64px 24px 96px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          line-height: 1.6;
        }
        h1 { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; }
        h2 {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 48px 0 16px;
        }
        p { color: var(--muted); margin-top: 8px; font-size: 0.95rem; }
        .subtitle { font-size: 1rem; color: var(--muted); margin-top: 6px; }
        .links { display: flex; gap: 20px; margin-top: 16px; flex-wrap: wrap; }
        .links a {
          font-size: 0.85rem;
          color: var(--link);
          text-decoration: none;
          font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
        }
        .links a:hover { text-decoration: underline; }
        .divider { border: none; border-top: 1px solid var(--border); margin: 0; }
        .item { padding: 16px 0; border-bottom: 1px solid var(--border); }
        .item:last-child { border-bottom: none; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
        .item-name { font-size: 0.95rem; font-weight: 600; color: var(--fg); }
        .item-name a { color: var(--fg); text-decoration: none; }
        .item-name a:hover { text-decoration: underline; }
        .item-meta { font-size: 0.8rem; color: var(--muted); font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; white-space: nowrap; }
        .item-desc { font-size: 0.875rem; color: var(--muted); margin-top: 4px; line-height: 1.55; }
        .stack-row { display: flex; gap: 8px; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 0.875rem; flex-wrap: wrap; }
        .stack-row:last-child { border-bottom: none; }
        .stack-label { font-weight: 600; color: var(--fg); min-width: 100px; flex-shrink: 0; }
        .stack-items { color: var(--muted); }
        .back { display: inline-block; font-size: 0.8rem; color: var(--muted); text-decoration: none; font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; margin-bottom: 40px; }
        .back:hover { color: var(--fg); }
      `}</style>

      <main className="page">
        <a href="/" className="back">← hamzaammar.ca</a>

        <h1>Hamza Ammar</h1>
        <p className="subtitle">
          Software Engineering student at the University of Waterloo.
          Incoming Software Engineering Intern at Shopify.
        </p>
        <p>
          I build full-stack products, ML systems, and developer tooling.
          Currently working on Dealish — a real-time food deal discovery app.
          Previously interned at Kùzu (embedded graph database) and MapFLOW.
        </p>

        <div className="links">
          <a href="mailto:hamza.k.ammar@gmail.com">hamza.k.ammar@gmail.com</a>
          <a href="https://linkedin.com/in/hamzakammar" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="https://github.com/hamzakammar" target="_blank" rel="noopener noreferrer">github</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume.pdf</a>
        </div>

        <hr className="divider" style={{ marginTop: "40px" }} />

        <h2>Experience</h2>
        <div>
          {experience.map((e) => (
            <div key={e.company} className="item">
              <div className="item-header">
                <span className="item-name">{e.company} — {e.role}</span>
                <span className="item-meta">{e.period}</span>
              </div>
              <p className="item-desc">{e.description}</p>
            </div>
          ))}
        </div>

        <h2>Projects</h2>
        <div>
          {projects.map((p) => (
            <div key={p.name} className="item">
              <div className="item-header">
                <span className="item-name">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name} ↗</a>
                  ) : (
                    p.name
                  )}
                </span>
              </div>
              <p className="item-desc">{p.description}</p>
            </div>
          ))}
        </div>

        <h2>Stack</h2>
        <div>
          {stack.map((s) => (
            <div key={s.label} className="stack-row">
              <span className="stack-label">{s.label}</span>
              <span className="stack-items">{s.items}</span>
            </div>
          ))}
        </div>

        <h2>Education</h2>
        <div className="item" style={{ borderBottom: "none" }}>
          <div className="item-header">
            <span className="item-name">University of Waterloo — Bachelor of Software Engineering</span>
            <span className="item-meta">2025 – 2030</span>
          </div>
          <p className="item-desc">Elected Class Academic Representative for the SE 2030 cohort.</p>
        </div>
      </main>
    </>
  );
}
