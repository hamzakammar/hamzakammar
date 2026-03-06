"use client";

import { Command } from "cmdk";
import { Projects, type Project, type District } from "../data/projects";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (projectId: string) => void;
  onAction?: (action: string) => void;
}

const districtNames: Record<District, string> = {
  systems: "Systems District",
  production: "Production District",
  building: "Building District",
};

export default function CommandPalette({ open, onOpenChange, onSelect, onAction }: CommandPaletteProps) {
  if (!open) return null;

  const grouped = {
    systems: Projects.filter((p) => p.district === "systems"),
    production: Projects.filter((p) => p.district === "production"),
    building: Projects.filter((p) => p.district === "building"),
  };

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
            {(
              Object.entries(grouped) as [District, Project[]][]
            ).map(([district, projects]) => (
              <Command.Group
                key={district}
                heading={districtNames[district]}
              >
                {projects.map((p) => (
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
            ))}
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
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
