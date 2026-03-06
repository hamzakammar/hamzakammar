"use client";

import { useEffect, useState } from "react";
import CitySvg from "./components/CitySvg";
import CommandPalette from "./components/CommandPalette";
import { Projects } from "./data/projects";

/* ═══════════════════════════════════════════════════════
   PORTFOLIO CITY — Home Page
   ═══════════════════════════════════════════════════════
   Full city view — no scroll, everything visible at once.
   Cmd+K opens the command palette for quick navigation.
   Dark mode toggle for night city aesthetic.
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [showResume, setShowResume] = useState(false);

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
      // Cmd+K / Ctrl+K toggles command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdkOpen((prev) => !prev);
        return;
      }
      // ESC: close palette first, then panel
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

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <CitySvg
        onBuildingClick={(id) => {
          setShowResume(false);
          setActiveProjectId((prev) => (prev === id ? null : id));
        }}
        activeProject={activeProject}
        onClose={() => { setActiveProjectId(null); setShowResume(false); }}
        showResume={showResume}
      />
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
      {/* Bottom-right controls */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          className="theme-toggle"
          onClick={toggleDark}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? "☀" : "☾"}
        </button>
        {/* Cmd+K hint badge */}
        <button
          className="cmdk-hint"
          onClick={() => setCmdkOpen(true)}
          aria-label="Open command palette"
        >
          &#x2318;K
        </button>
      </div>
    </div>
  );
}
