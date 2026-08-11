import type { Metadata } from "next";
import Link from "next/link";
import { Projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Hamza Ammar · About",
  description:
    "Hamza Ammar is a Software Engineering student at the University of Waterloo and Software Engineering Intern at Shopify. He builds full-stack products, ML systems, and developer tools.",
  openGraph: {
    title: "Hamza Ammar · About",
    description:
      "Software Engineering student at Waterloo. SWE Intern at Shopify. Builds full-stack products, ML systems, and developer tools.",
    url: "https://hamzaammar.ca/about",
    siteName: "Hamza Ammar",
    images: [{ url: "/HA.jpg", width: 1200, height: 630, alt: "Hamza Ammar" }],
    locale: "en_US",
    type: "profile",
  },
};

// Single source of truth: /about, /classic, and the city all read from Projects.
const byRecency = (a: (typeof Projects)[number], b: (typeof Projects)[number]) =>
  (b.start ?? 0) - (a.start ?? 0);
const linkOf = (p: (typeof Projects)[number]) => p.links?.demo ?? p.links?.github ?? "";
const experience = Projects.filter((p) => p.role).sort(byRecency);
const projects = Projects.filter((p) => !p.role).sort(byRecency);

const stack = [
  { label: "Languages", items: "Python, C++, C, Go, Rust, TypeScript, JavaScript, Swift, SQL, Ruby" },
  { label: "Frameworks", items: "React, Next.js, React Native, Node.js, Express, Flask, PyTorch, TensorFlow, Playwright" },
  { label: "Infra", items: "AWS (ECS, S3), Supabase, PostgreSQL, pgvector, Docker, Git, Linux" },
  { label: "Areas", items: "Full-stack, Machine Learning, Distributed Systems, Web Scraping, Algorithms" },
];

export default function About() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-text-size-adjust: 100%; }
        body { background: #ffffff; color: #111111; }
        .page {
          max-width: 620px;
          margin: 0 auto;
          padding: 88px 24px 120px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.65;
        }
        .back {
          display: inline-block;
          margin-bottom: 56px;
          font-size: 14px;
          color: #111111;
          text-decoration: none;
        }
        .back:hover { text-decoration: underline; }
        h1 { font-size: 26px; font-weight: 600; letter-spacing: -0.01em; }
        .subtitle { margin-top: 8px; font-size: 16px; }
        .intro { margin-top: 20px; max-width: 56ch; }
        .contact { margin-top: 20px; }
        .contact a { color: #111111; text-decoration: underline; text-underline-offset: 2px; }
        .contact a + a { margin-left: 18px; }
        h2 {
          margin: 56px 0 20px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .row { margin-top: 22px; }
        .row:first-child { margin-top: 0; }
        .row-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
        }
        .row-title { font-weight: 600; }
        .row-title a { color: #111111; text-decoration: underline; text-underline-offset: 2px; }
        .row-meta { flex-shrink: 0; font-size: 14px; color: #777777; }
        .row-desc { margin-top: 3px; max-width: 60ch; }
        .stack { margin-top: 20px; }
        .stack-row { display: flex; gap: 16px; margin-top: 12px; }
        .stack-row:first-child { margin-top: 0; }
        .stack-label { flex-shrink: 0; width: 108px; font-weight: 600; }
      `}</style>

      <main className="page">
        <Link href="/" className="back">← hamzaammar.ca</Link>

        <h1>Hamza Ammar</h1>
        <p className="subtitle">
          Software Engineering @ Waterloo · SWE Intern @ Shopify
        </p>
        <p className="intro">
          I build full-stack products, machine learning systems, and developer tooling.
          I&apos;m currently interning at Shopify and building Dealish; previously I interned
          at Kùzu, an embedded graph database, and MapFLOW.
        </p>

        <p className="contact">
          <a href="mailto:hamza.k.ammar@gmail.com">email</a>
          <a href="https://linkedin.com/in/hamzakammar" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="https://github.com/hamzakammar" target="_blank" rel="noopener noreferrer">github</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
        </p>

        <h2>Experience</h2>
        {experience.map((p) => (
          <div key={p.id} className="row">
            <div className="row-head">
              <span className="row-title">{p.title} · {p.role}</span>
              <span className="row-meta">{p.date}</span>
            </div>
            <p className="row-desc">{p.blurb ?? p.narrative}</p>
          </div>
        ))}

        <h2>Projects</h2>
        {projects.map((p) => {
          const url = linkOf(p);
          return (
            <div key={p.id} className="row">
              <div className="row-head">
                <span className="row-title">
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">{p.title}</a>
                  ) : (
                    p.title
                  )}
                </span>
              </div>
              <p className="row-desc">{p.blurb ?? p.narrative}</p>
            </div>
          );
        })}

        <h2>Stack</h2>
        <div className="stack">
          {stack.map((s) => (
            <div key={s.label} className="stack-row">
              <span className="stack-label">{s.label}</span>
              <span>{s.items}</span>
            </div>
          ))}
        </div>

        <h2>Education</h2>
        <div className="row">
          <div className="row-head">
            <span className="row-title">University of Waterloo · BSE</span>
            <span className="row-meta">2025 - 2030</span>
          </div>
          <p className="row-desc">Elected Class Academic Representative for the SE 2030 cohort.</p>
        </div>
      </main>
    </>
  );
}
