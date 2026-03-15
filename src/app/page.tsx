"use client";

import { useEffect, useState } from "react";
import CitySvg from "./components/CitySvg";
import CommandPalette from "./components/CommandPalette";
import { Projects } from "./data/projects";

/* ═══════════════════════════════════════════════════════
   PORTFOLIO CITY — Home Page
   ═══════════════════════════════════════════════════════ */

const statusLabels: Record<string, string> = {
  shipped: "Shipped",
  ongoing: "In Progress",
  experimental: "Experimental",
};

/* ── Social link icons (inline SVGs) ── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const activeProject = activeProjectId
    ? Projects.find((p) => p.id === activeProjectId) ?? null
    : null;

  /* ── Initialize dark mode from localStorage / system pref ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (stored === "light") {
      setDark(false);
      document.documentElement.removeAttribute("data-theme");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  /* ── Mobile detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Toggle dark mode ── */
  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdkOpen((prev) => !prev);
        return;
      }
      if (e.key === "Escape") {
        if (cmdkOpen) {
          setCmdkOpen(false);
        } else if (activeProjectId) {
          setActiveProjectId(null);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cmdkOpen, activeProjectId]);

  /* ── Contact links data ── */
  const contactLinks = [
    { href: "https://linkedin.com/in/hamzakammar", label: "LinkedIn", icon: <LinkedInIcon /> },
    { href: "https://github.com/hamzakammar", label: "GitHub", icon: <GitHubIcon /> },
    { href: "mailto:hamza.k.ammar@gmail.com", label: "Email", icon: <EmailIcon /> },
    { href: "https://x.com/hamzakammar", label: "X", icon: <XIcon /> },
  ];

  /* ═══════ MOBILE LAYOUT ═══════ */
  if (isMobile) {
    return (
      <div className="min-h-screen" style={{ background: "var(--background)" }}>
        {/* City hero banner */}
        <div className="city-hero">
          <CitySvg />
        </div>

        {/* Header */}
        <div className="mobile-header">
          <h1>HAMZA AMMAR</h1>
          <p className="subtitle">Software Engineer</p>
          <p className="school">University of Waterloo &middot; Software Engineering</p>
          <div className="mobile-highlights">
            {[
              "Wrote query planner internals at KùzuDB — youngest on the team",
              "One JSON file → 3,500 pharmacists save 15 min per patient",
              "Co-building an app that replaces aimless Yelp scrolling",
              "Elected rep for 100+ engineers at Waterloo",
            ].map((line, i) => (
              <div key={i} className="mobile-highlight-item">{line}</div>
            ))}
          </div>
        </div>

        {/* Contact links */}
        <div className="mobile-contact">
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer" aria-label={link.label}>
              {link.icon}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume"
            style={{ fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
              width: "auto", padding: "0 12px", fontFamily: "var(--font-geist-mono), monospace" }}>
            CV
          </a>
        </div>

        {/* Project cards */}
        <div className="mobile-projects">
          <h2>Projects</h2>
          {Projects.map((p) => {
            const isExpanded = expandedCard === p.id;
            return (
              <div key={p.id} className={`mobile-card${isExpanded ? " expanded" : ""}`}
                onClick={() => setExpandedCard(isExpanded ? null : p.id)}>
                <div className="mobile-card-header">
                  <div>
                    <h3>{p.title}</h3>
                    <p className="card-tagline">{p.tagline}</p>
                  </div>
                  {p.status && <span className="card-status">{statusLabels[p.status] || p.status}</span>}
                </div>
                <div className="card-stack">
                  {p.stack.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                  {p.stack.length > 4 && <span>+{p.stack.length - 4}</span>}
                </div>
                {isExpanded && (
                  <div className="mobile-card-expanded">
                    <p>{p.narrative}</p>
                    <div className="highlights">
                      <ul>
                        {p.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                    {p.links && Object.keys(p.links).length > 0 && (
                      <div className="card-links" onClick={(e) => e.stopPropagation()}>
                        {p.links.demo && (
                          <a href={p.links.demo} target="_blank" rel="noopener noreferrer">
                            Live Demo &rarr;
                          </a>
                        )}
                        {p.links.github && (
                          <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                            Source &rarr;
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dark mode toggle */}
        <div className="fixed z-40 bottom-safe right-safe">
          <button className="theme-toggle" onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
            {dark ? "\u2600" : "\u263E"}
          </button>
        </div>
      </div>
    );
  }

  /* ═══════ DESKTOP LAYOUT ═══════ */
  return (
    <div className="viewport-fill overflow-hidden flex items-center justify-center">
      <div className="city-svg-wrapper">
        <CitySvg
        onBuildingClick={(id) => {
          setShowResume(false);
          setActiveProjectId((prev) => (prev === id ? null : id));
        }}
        activeProject={activeProject}
        onClose={() => { setActiveProjectId(null); setShowResume(false); }}
        showResume={showResume}
      />
      </div>
      <CommandPalette
        open={cmdkOpen}
        onOpenChange={setCmdkOpen}
        onSelect={(id) => { setShowResume(false); setActiveProjectId(id); }}
        onAction={(action) => {
          if (action === "resume") {
            setActiveProjectId(null);
            setShowResume(true);
          }
        }}
      />

      {/* Contact bar — top-right */}
      <nav className="contact-bar">
        {contactLinks.map((link) => (
          <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer" aria-label={link.label}>
            {link.icon}
          </a>
        ))}
      </nav>

      {/* Bottom-right controls */}
      <div className="fixed z-40 flex items-center gap-2 bottom-safe right-safe">
        <button className="theme-toggle" onClick={toggleDark}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
          {dark ? "\u2600" : "\u263E"}
        </button>
        <button className="cmdk-hint" onClick={() => setCmdkOpen(true)}
          aria-label="Open command palette">
          &#x2318;K
        </button>
      </div>
    </div>
  );
}
