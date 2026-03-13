"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../data/projects";

/* ═══════════════════════════════════════════════════════
   PROJECT PANEL — HTML overlay for project details
   ═══════════════════════════════════════════════════════
   - Renders OUTSIDE the SVG as proper HTML overlay
   - Scrollable, supports video embeds
   - Blueprint aesthetic: monospace, structured, engineered
   ═══════════════════════════════════════════════════════ */

interface ProjectPanelProps {
  project: Project | null;
  onClose: () => void;
}

const statusLabels: Record<string, string> = {
  shipped: "Shipped",
  ongoing: "In Progress",
  experimental: "Experimental",
};

export default function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(245, 247, 250, 0.4)" }}
            onClick={onClose}
          />

          {/* Panel — wrapper for vertical centering */}
          <div className="fixed right-6 top-0 bottom-0 z-50 flex items-center pointer-events-none">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="project-panel pointer-events-auto w-[420px] max-h-[85vh] overflow-y-auto"
            >
              {/* Colored accent bar at top */}
              <div style={{ height: '3px', background: 'var(--accent)', marginBottom: 0 }} />

              {/* Header */}
              <div className="panel-header px-6 pt-5 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    {/* Role — displayed prominently */}
                    {project.role && (
                      <div className="panel-district text-[10px] uppercase tracking-[0.2em] mb-1">
                        {project.role}
                      </div>
                    )}
                    {/* Status */}
                    {project.status && (
                      <div className="panel-status text-[9px] uppercase tracking-[0.15em] mb-1 opacity-60">
                        {statusLabels[project.status] || project.status}
                      </div>
                    )}
                    {/* Title */}
                    <h2 className="panel-title text-xl font-bold tracking-tight">
                      {project.title}
                    </h2>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="panel-close mt-1 w-7 h-7 flex items-center justify-center text-sm hover:opacity-60 transition-opacity"
                    aria-label="Close panel"
                  >
                    &#x2715;
                  </button>
                </div>

                {/* Tagline */}
                <p className="panel-tagline text-xs mt-2 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-4">
                {/* Narrative */}
                <p className="panel-narrative text-xs leading-relaxed mb-5">
                  {project.narrative}
                </p>

                {/* Highlights */}
                <div className="mb-5">
                  <h3 className="panel-section-heading text-[10px] uppercase tracking-[0.15em] mb-2 font-semibold">
                    Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="panel-highlight text-[11px] leading-relaxed pl-3"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div className="mb-5">
                  <h3 className="panel-section-heading text-[10px] uppercase tracking-[0.15em] mb-2 font-semibold">
                    Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="panel-tag text-[10px] px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Video Demo Section */}
                {project.videoUrl && (
                  <div className="mb-5">
                    <h3 className="panel-section-heading text-[10px] uppercase tracking-[0.15em] mb-2 font-semibold">
                      Demo
                    </h3>
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={project.videoUrl}
                        className="absolute inset-0 w-full h-full"
                        style={{ border: "1px solid var(--panel-border, #D1D5DB)" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Links */}
                {project.links &&
                  Object.keys(project.links).length > 0 && (
                    <div className="flex gap-4 pt-2">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="panel-link text-[11px] underline underline-offset-2 hover:opacity-60 transition-opacity"
                        >
                          Live Demo &rarr;
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="panel-link text-[11px] underline underline-offset-2 hover:opacity-60 transition-opacity"
                        >
                          Source &rarr;
                        </a>
                      )}
                      {project.links.writeup && (
                        <a
                          href={project.links.writeup}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="panel-link text-[11px] underline underline-offset-2 hover:opacity-60 transition-opacity"
                        >
                          Writeup &rarr;
                        </a>
                      )}
                    </div>
                  )}
              </div>

              {/* Footer — ESC hint */}
              <div className="panel-footer px-6 py-3 text-center">
                ESC TO CLOSE
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
