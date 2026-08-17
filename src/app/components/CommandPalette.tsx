"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Projects } from "../data/projects";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (projectId: string) => void;
  onAction?: (action: string) => void;
}

export default function CommandPalette({ open, onOpenChange, onSelect, onAction }: CommandPaletteProps) {
  const router = useRouter();
  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={() => onOpenChange(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <Command className="cmdk-root" label="Search projects">
          <Command.Input
            className="cmdk-input"
            placeholder="Search projects..."
            autoFocus
          />
          <Command.List className="cmdk-list">
            <Command.Empty className="cmdk-empty">
              No projects found.
            </Command.Empty>
            <Command.Group heading="Quick Links">
              <Command.Item value="LinkedIn connect profile" onSelect={() => { window.open("https://linkedin.com/in/hamzakammar", "_blank"); onOpenChange(false); }}>
                <span className="cmdk-item-title">LinkedIn</span>
                <span className="cmdk-item-tagline">Connect with me</span>
              </Command.Item>
              <Command.Item value="GitHub code repositories hamzakammar" onSelect={() => { window.open("https://github.com/hamzakammar", "_blank"); onOpenChange(false); }}>
                <span className="cmdk-item-title">GitHub</span>
                <span className="cmdk-item-tagline">See my code</span>
              </Command.Item>
              <Command.Item value="Email contact hamza" onSelect={() => { window.open("mailto:hamza.k.ammar@gmail.com"); onOpenChange(false); }}>
                <span className="cmdk-item-title">Email</span>
                <span className="cmdk-item-tagline">hamza.k.ammar@gmail.com</span>
              </Command.Item>
              <Command.Item value="X Twitter social" onSelect={() => { window.open("https://x.com/hamzakammar", "_blank"); onOpenChange(false); }}>
                <span className="cmdk-item-title">X (Twitter)</span>
                <span className="cmdk-item-tagline">Follow me</span>
              </Command.Item>
            </Command.Group>
            <Command.Group heading="Actions">
              <Command.Item value="Resume CV PDF download" onSelect={() => { onAction?.("resume"); onOpenChange(false); }}>
                <span className="cmdk-item-title">View Resume</span>
                <span className="cmdk-item-tagline">Open resume preview on billboard</span>
              </Command.Item>
              <Command.Item value="Classic View old portfolio" onSelect={() => { router.push("/classic"); onOpenChange(false); }}>
                <span className="cmdk-item-title">Classic View</span>
                <span className="cmdk-item-tagline">View the original dark portfolio</span>
              </Command.Item>
            </Command.Group>
            <Command.Group heading="Projects">
              {Projects.map((p) => (
                <Command.Item
                  key={p.id}
                  value={`${p.title} ${p.tagline} ${p.stack.join(" ")}`}
                  onSelect={() => {
                    onSelect(p.id);
                    onOpenChange(false);
                  }}
                >
                  <span className="cmdk-item-title">{p.title}</span>
                  <span className="cmdk-item-tagline">{p.tagline}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <div
            style={{
              borderTop: "1px solid var(--panel-border, rgba(148,163,184,.18))",
              padding: "8px 12px",
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
              fontSize: "10.5px",
              color: "var(--muted, #94a3b8)",
              opacity: 0.75,
              letterSpacing: "0.02em",
            }}
          >
            tip: this city keeps secrets. try <b style={{ color: "var(--accent, #22d3ee)" }}>&uarr;&uarr;&darr;&darr;&larr;&rarr;&larr;&rarr; B A</b>, or type &lsquo;matrix&rsquo;
          </div>
        </Command>
      </div>
    </div>
  );
}
