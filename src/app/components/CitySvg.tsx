"use client";

import { useState, useRef, useEffect } from "react";
import type { Project } from "../data/projects";

interface CitySvgProps {
  onBuildingClick?: (id: string) => void;
  activeProject?: Project | null;
  onClose?: () => void;
  showResume?: boolean;
}

export default function CitySvg({
  onBuildingClick,
  activeProject,
  onClose,
  showResume,
}: CitySvgProps) {
  const [billboardScrolled, setBillboardScrolled] = useState(false);
  const billboardScrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll state when project changes
  useEffect(() => {
    setBillboardScrolled(false);
    if (billboardScrollRef.current) {
      billboardScrollRef.current.scrollTop = 0;
    }
  }, [activeProject?.id]);
    const [hoverId, setHoverId] = useState<string | null>(null);
  const activeProjectId = activeProject?.id ?? null;
  const D = 8;

  /* ═══════ HELPERS ═══════ */
  const trees = (positions: number[], baseY: number) => (
    <g style={{ pointerEvents: "none" }} opacity={0.6}>
      {positions.map((tx, i) => (
        <g key={`t${i}`}>
          <line x1={tx} y1={baseY} x2={tx} y2={baseY - 9} stroke="#5A6B5E" strokeWidth="1" />
          <circle cx={tx} cy={baseY - 12} r="5" fill="#7FA07B" stroke="#6B8E67" strokeWidth="0.4" />
        </g>
      ))}
    </g>
  );
  const lampPosts = (positions: [number, number][]) => (
    <g style={{ pointerEvents: "none" }}>
      {positions.map(([lx, ly], i) => (
        <g key={`lp${i}`}>
          <circle className="lamp-glow" cx={lx} cy={ly - 10} r="28" fill="url(#lamp-glow)" />
          <g opacity={0.4}>
            <line x1={lx} y1={ly} x2={lx} y2={ly - 16} stroke="#6B7280" strokeWidth="1.2" />
            <ellipse cx={lx} cy={ly - 17} rx="3" ry="1.5" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.4" />
          </g>
        </g>
      ))}
    </g>
  );
  const vehicle = (x: number, y: number, facing: "h" | "v", color?: string) => {
    const c = color || "#6B7280";
    return facing === "h" ? (
      <g className="vehicle" style={{ pointerEvents: "none" }}>
        <rect x={x} y={y} width={14} height={6} rx={2} fill={c} />
        <rect x={x + 2} y={y + 1} width={4} height={4} rx={1} fill="#D1D5DB" opacity={0.5} />
        <rect x={x + 8} y={y + 1} width={4} height={4} rx={1} fill="#D1D5DB" opacity={0.5} />
      </g>
    ) : (
      <g className="vehicle" style={{ pointerEvents: "none" }}>
        <rect x={x} y={y} width={6} height={14} rx={2} fill={c} />
        <rect x={x + 1} y={y + 2} width={4} height={4} rx={1} fill="#D1D5DB" opacity={0.5} />
        <rect x={x + 1} y={y + 8} width={4} height={4} rx={1} fill="#D1D5DB" opacity={0.5} />
      </g>
    );
  };
  const pedestrian = (x: number, y: number) => (
    <g className="pedestrian" style={{ pointerEvents: "none" }}>
      <circle cx={x} cy={y - 3} r="1.5" fill="#4B5563" />
      <line x1={x} y1={y - 1.5} x2={x} y2={y + 3} stroke="#4B5563" strokeWidth="1" />
      <line x1={x - 1.5} y1={y + 1} x2={x + 1.5} y2={y + 1} stroke="#4B5563" strokeWidth="0.7" />
    </g>
  );
  const bench = (x: number, y: number) => (
    <g style={{ pointerEvents: "none" }} opacity={0.45}>
      <rect x={x} y={y} width={10} height={3} rx={0.5} fill="#8B7355" />
      <line x1={x + 1} y1={y + 3} x2={x + 1} y2={y + 5} stroke="#8B7355" strokeWidth="0.8" />
      <line x1={x + 9} y1={y + 3} x2={x + 9} y2={y + 5} stroke="#8B7355" strokeWidth="0.8" />
      {/* Back rest */}
      <rect x={x} y={y - 3} width={10} height={2} rx={0.5} fill="#7A6448" opacity={0.7} />
    </g>
  );
  const bush = (x: number, y: number) => (
    <g style={{ pointerEvents: "none" }} opacity={0.55}>
      <circle cx={x} cy={y} r={4} fill="#6B9A6E" stroke="#5A8A5E" strokeWidth="0.4" />
      <circle cx={x + 5} cy={y + 1} r={3} fill="#7AAD7D" stroke="#5A8A5E" strokeWidth="0.3" />
      <circle cx={x - 4} cy={y + 1} r={3} fill="#639668" stroke="#5A8A5E" strokeWidth="0.3" />
    </g>
  );
  const busStop = (x: number, y: number) => (
    <g style={{ pointerEvents: "none" }} opacity={0.35}>
      <line x1={x} y1={y} x2={x} y2={y - 14} stroke="#4B5563" strokeWidth="1.2" />
      <rect x={x - 5} y={y - 14} width={10} height={7} rx={1} fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.4" />
    </g>
  );

  /* ═══════ PARKS & GREENERY ═══════ */
  const park = (x: number, y: number, w: number, h: number) => {
    const treeCount = Math.max(2, Math.floor(w / 12));
    return (
      <g key={`park-${x}-${y}`} style={{ pointerEvents: "none" }}>
        <rect x={x} y={y} width={w} height={h} rx={3} fill="#C8DCBE" stroke="#A8C4A0" strokeWidth="0.5" opacity="0.6" />
        <rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} rx={2} fill="#D4E8CC" opacity="0.4" />
        {Array.from({ length: treeCount }, (_, i) => {
          const tx = x + 6 + i * ((w - 12) / Math.max(1, treeCount - 1));
          const ty = y + h / 2 + ((i * 7) % 5 - 2);
          return (
            <g key={`pt${i}`}>
              <line x1={tx} y1={ty + 2} x2={tx} y2={ty - 4} stroke="#5A6B5E" strokeWidth="1" />
              <circle cx={tx} cy={ty - 6} r={4 + (i % 2)} fill="#7FA07B" stroke="#6B8E67" strokeWidth="0.3" opacity={0.7} />
            </g>
          );
        })}
        {w > 30 && <rect x={x + w / 2 - 5} y={y + h - 5} width={10} height={3} rx={0.5} fill="#8B7355" opacity="0.3" />}
      </g>
    );
  };

  /* ═══════ WINDOW / ACCENT HELPERS ═══════ */
  const projectWindows = (x: number, y: number, w: number, h: number) => {
    const els: React.ReactElement[] = [];
    for (let wy = y + 10; wy + 2 < y + h - 10; wy += 7)
      for (let wx = x + 6; wx + 8 < x + w - 4; wx += 11)
        els.push(<rect key={`sw${wx}_${wy}`} className="bldg-win" x={wx} y={wy} width={8} height={2} rx={0.3} />);
    return <g style={{ pointerEvents: "none" }}>{els}</g>;
  };
  const floorLines = (x: number, y: number, w: number, h: number) => {
    const els: React.ReactElement[] = [];
    for (let ly = y + 12; ly < y + h - 4; ly += 12)
      els.push(<line key={`fl${ly}`} className="bldg-floor-line" x1={x + 3} y1={ly} x2={x + w - 3} y2={ly} />);
    return <g style={{ pointerEvents: "none" }}>{els}</g>;
  };
  const fillerWindows = (x: number, y: number, w: number, h: number) => {
    const els: React.ReactElement[] = [];
    for (let wy = y + 8; wy + 3 < y + h - 6; wy += 9)
      for (let wx = x + 4; wx + 4 < x + w - 3; wx += 8)
        els.push(<rect key={`fw${wx}_${wy}`} className="bldg-win" x={wx} y={wy} width={4} height={3} rx={0.3} />);
    return <g style={{ pointerEvents: "none" }}>{els}</g>;
  };
  const antennaAccent = (x: number, y: number, w: number) => (
    <g style={{ pointerEvents: "none" }} opacity={0.5}>
      <line x1={x + w / 2} y1={y - D} x2={x + w / 2} y2={y - D - 14} stroke="#6B7280" strokeWidth="1" />
      <line x1={x + w / 2 - 4} y1={y - D - 14} x2={x + w / 2 + 4} y2={y - D - 14} stroke="#6B7280" strokeWidth="0.8" />
      <circle cx={x + w / 2} cy={y - D - 15} r="1" fill="#60A5FA" opacity="0.7" />
    </g>
  );
  const rooftopGarden = (x: number, y: number, w: number) => (
    <g style={{ pointerEvents: "none" }}>
      <rect x={x + 2} y={y - D + 1} width={w - 4} height={3} rx={0.5} fill="#8BA88E" opacity={0.55} />
      {Array.from({ length: Math.max(2, Math.floor(w / 20)) }, (_, i) => (
        <circle key={`rg${i}`} cx={x + 8 + i * ((w - 16) / Math.max(1, Math.floor(w / 20) - 1))}
          cy={y - D - 1} r="2" fill="#7FA07B" opacity="0.4" />
      ))}
    </g>
  );

  /* ═══════ PROJECT ICONS ═══════ */
  const projectIcon = (id: string, name: string, cx: number, cy: number, logo?: string, role?: string) => {
    const cls = "project-icon";
    const shapes: Record<string, React.ReactNode> = {
      kuzu: (<>{/* Database cylinder */}
        <ellipse cx={cx} cy={cy - 3} rx={4.5} ry={2} className={cls} />
        <line x1={cx - 4.5} y1={cy - 3} x2={cx - 4.5} y2={cy + 3} className={cls} />
        <line x1={cx + 4.5} y1={cy - 3} x2={cx + 4.5} y2={cy + 3} className={cls} />
        <ellipse cx={cx} cy={cy + 3} rx={4.5} ry={2} className={cls} />
      </>),
      chess: (<>{/* Crown */}
        <path d={`M${cx - 4},${cy + 3} L${cx - 3},${cy - 1} L${cx - 5},${cy - 3} L${cx - 2},${cy - 2} L${cx},${cy - 5} L${cx + 2},${cy - 2} L${cx + 5},${cy - 3} L${cx + 3},${cy - 1} L${cx + 4},${cy + 3}Z`} className={cls} />
      </>),
      horizon: (<>{/* Magnifying glass */}
        <circle cx={cx - 1} cy={cy - 1} r={3.5} className={cls} />
        <line x1={cx + 1.5} y1={cy + 1.5} x2={cx + 5} y2={cy + 5} className={cls} />
      </>),
      unimap: (<>{/* Map pin */}
        <circle cx={cx} cy={cy - 2} r={2.5} className={cls} />
        <path d={`M${cx - 3.5},${cy - 1} Q${cx},${cy + 6} ${cx + 3.5},${cy - 1}`} className={cls} />
      </>),
      mapflow: (<>{/* Data flow arrows */}
        <line x1={cx - 5} y1={cy - 2} x2={cx + 3} y2={cy - 2} className={cls} />
        <polyline points={`${cx + 1},${cy - 4} ${cx + 4},${cy - 2} ${cx + 1},${cy}`} className={cls} fill="none" />
        <line x1={cx + 5} y1={cy + 2} x2={cx - 3} y2={cy + 2} className={cls} />
        <polyline points={`${cx - 1},${cy} ${cx - 4},${cy + 2} ${cx - 1},${cy + 4}`} className={cls} fill="none" />
      </>),
      CC: (<>{/* Open book */}
        <rect x={cx - 4} y={cy - 5} width={8} height={10} rx={0.8} className={cls} />
        <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} className={cls} />
        <line x1={cx - 4} y1={cy - 1} x2={cx + 4} y2={cy - 1} className={cls} />
      </>),
      dealish: (<>{/* Target/discovery */}
        <circle cx={cx} cy={cy} r={5} className={cls} />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} className={cls} />
        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} className={cls} />
      </>),
      neodev: (<>{/* Code brackets */}
        <polyline points={`${cx - 2},${cy - 5} ${cx - 6},${cy} ${cx - 2},${cy + 5}`} className={cls} fill="none" />
        <polyline points={`${cx + 2},${cy - 5} ${cx + 6},${cy} ${cx + 2},${cy + 5}`} className={cls} fill="none" />
      </>),
      uw: (<>{/* Graduation cap */}
        <polygon points={`${cx},${cy - 5} ${cx - 7},${cy - 1} ${cx},${cy + 1} ${cx + 7},${cy - 1}`} className={cls} />
        <line x1={cx} y1={cy + 1} x2={cx} y2={cy + 5} className={cls} />
        <line x1={cx - 4} y1={cy + 3} x2={cx + 4} y2={cy + 3} className={cls} />
      </>),
    };
    const nameY = cy + 20;
    const nameTw = name.length * 6.4;
    const roleTw = role ? role.length * 6.0 : 0;
    const tw = Math.max(nameTw, roleTw);
    const roleY = nameY + 11;
    return (
      <g key={`sign-${id}`} style={{ pointerEvents: "none" }}>
        {logo ? (
          <>
            <rect className="logo-bg" x={cx - 12} y={cy - 12} width={24} height={24} rx={3} />
            <image href={logo} x={cx - 10} y={cy - 10} width={20} height={20}
              preserveAspectRatio="xMidYMid meet" />
          </>
        ) : (
          <>
            <circle cx={cx} cy={cy} r={9} className="icon-bg" />
            {shapes[id]}
          </>
        )}
        <rect className="label-bg" x={cx - tw / 2 - 6} y={nameY - 9}
          width={tw + 12} height={role ? 22 : 13} rx={2} />
        <text className="node" x={cx} y={nameY}
          textAnchor="middle" style={{ fontSize: "10px", fontWeight: 700 }}>{name}</text>
        {role && (
          <text className="role-label" x={cx} y={roleY}
            textAnchor="middle" style={{ fontSize: "7.5px" }}>{role}</text>
        )}
      </g>
    );
  };

  /* ═══════ BUILDING RENDERER ═══════ */
  const matClasses = ["", "mat-warm", "mat-brick", "mat-glass"];
  const bldg = (
    id: string | null, x: number, y: number, w: number, h: number,
  ) => {
    const isActive = id !== null && id === activeProjectId;
    const isHover = id !== null && id === hoverId;
    const isFiller = id === null;
    const mat = isFiller ? matClasses[(x * 7 + y * 13) % 4] : "";
    const topCls = mat ? `${mat}-top` : "bldg-top";
    const rightCls = mat ? `${mat}-right` : "bldg-right";
    return (
      <g key={id || `f-${x}-${y}`} data-project={id || undefined}
        style={{ cursor: id ? "pointer" : "default" }}
        opacity={isFiller ? 0.6 + ((x * 7 + y * 13) % 25) / 100 : 1}
        onClick={id ? () => onBuildingClick?.(id) : undefined}
        onMouseEnter={id ? () => setHoverId(id) : undefined}
        onMouseLeave={id ? () => setHoverId(null) : undefined}>
        <polygon className={topCls}
          points={`${x},${y} ${x + D},${y - D} ${x + w + D},${y - D} ${x + w},${y}`} />
        <polygon className={rightCls}
          points={`${x + w},${y} ${x + w + D},${y - D} ${x + w + D},${y + h - D} ${x + w},${y + h}`} />
        <rect x={x} y={y} width={w} height={h} rx={1}
          className={`bldg-face${isActive ? " bldg-active" : ""}${isHover ? " bldg-hover" : ""}${!isFiller ? " bldg-face-project" : ""}`}
          filter="url(#shadow)" />
        {!isFiller && (
          <rect className="bldg-accent"
            x={x + 1} y={y + 1} width={w - 2} height={3} rx={0.5}
            style={{
              pointerEvents: "none",
              fill: id ? ({
                kuzu: '#6366F1',
                chess: '#8B5CF6',
                horizon: '#06B6D4',
                unimap: '#10B981',
                mapflow: '#F59E0B',
                CC: '#EF4444',
                dealish: '#F97316',
                neodev: '#EC4899',
                uw: '#14B8A6',
              } as Record<string, string>)[id] || 'var(--accent)' : 'var(--accent)'
            }} />
        )}
        {!isFiller && projectWindows(x, y, w, h)}
        {isFiller && (x + y) % 3 === 0 && h > 50 && fillerWindows(x, y, w, h)}
        {isFiller && ((x + y) % 3 !== 0 || h <= 50) && floorLines(x, y, w, h)}
        {!isFiller && h > 120 && antennaAccent(x, y, w)}
        {!isFiller && rooftopGarden(x, y, w)}
        {isFiller && h > 150 && (x % 5 === 0) && antennaAccent(x, y, w)}
        {isFiller && (x * 3 + y) % 7 === 0 && (
          <rect x={x + w / 2 - 3} y={y - D + 1} width={6} height={4} rx={0.5}
            fill="#9CA3AF" opacity={0.45} style={{ pointerEvents: "none" }} />
        )}
        {isFiller && (x * 3 + y) % 11 === 0 && (
          <rect x={x + w / 2 + 2} y={y - D + 2} width={5} height={3} rx={0.3}
            fill="#6B7280" opacity={0.4} style={{ pointerEvents: "none" }} />
        )}
        {/* Awning on some short front-row fillers */}
        {isFiller && h < 75 && (x * 3 + y * 7) % 5 === 0 && (
          <g style={{ pointerEvents: "none" }}>
            <rect x={x - 1} y={y + h - 8} width={w + 2} height={4} rx={0.5}
              fill={["#C2584D","#4E8B6A","#C49D52","#5A7EB5"][(x + y) % 4]} opacity={0.65} />
          </g>
        )}
      </g>
    );
  };

  const F = (data: [number, number, number, number][]) =>
    data.map(([x, y, w, h]) => bldg(null, x, y, w, h));

  const bldgStepped = (
    x: number, y: number, baseW: number, totalH: number,
    setbackRatio: number,
  ) => {
    const towerW = Math.round(baseW * setbackRatio);
    const towerH = Math.round(totalH * 0.45);
    const baseH = totalH - towerH;
    const towerX = x + Math.round((baseW - towerW) / 2);
    const towerY = y - towerH;
    const op = 0.6 + ((x * 7 + y * 13) % 25) / 100;
    const mat = matClasses[(x * 7 + y * 13) % 4];
    const topC = mat ? `${mat}-top` : "bldg-top";
    const rightC = mat ? `${mat}-right` : "bldg-right";
    const faceC = mat ? `bldg-face ${mat}` : "bldg-face";
    return (
      <g key={`stepped-${x}-${y}`} style={{ cursor: "default", pointerEvents: "none" }} opacity={op}>
        <polygon className={topC}
          points={`${x},${y} ${x + D},${y - D} ${x + baseW + D},${y - D} ${x + baseW},${y}`} />
        <polygon className={rightC}
          points={`${x + baseW},${y} ${x + baseW + D},${y - D} ${x + baseW + D},${y + baseH - D} ${x + baseW},${y + baseH}`} />
        <rect x={x} y={y} width={baseW} height={baseH} rx={1}
          className={faceC} filter="url(#shadow)" />
        {floorLines(x, y, baseW, baseH)}
        <polygon className={topC}
          points={`${towerX},${towerY} ${towerX + D},${towerY - D} ${towerX + towerW + D},${towerY - D} ${towerX + towerW},${towerY}`} />
        <polygon className={rightC}
          points={`${towerX + towerW},${towerY} ${towerX + towerW + D},${towerY - D} ${towerX + towerW + D},${y - D} ${towerX + towerW},${y}`} />
        <rect x={towerX} y={towerY} width={towerW} height={towerH} rx={1}
          className={faceC} filter="url(#shadow)" />
        {fillerWindows(towerX, towerY, towerW, towerH)}
        <g opacity={0.5}>
          <line x1={towerX + towerW / 2} y1={towerY - D} x2={towerX + towerW / 2} y2={towerY - D - 10}
            stroke="#6B7280" strokeWidth="1" />
          <circle cx={towerX + towerW / 2} cy={towerY - D - 11} r="1" fill="#60A5FA" opacity="0.7" />
        </g>
      </g>
    );
  };

  /* ═══════ BILLBOARD ═══════ */
  const mono = "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace";

  const billboardContent = activeProject ? (
    <div 
      ref={billboardScrollRef}
      className="billboard-content billboard-project" 
      style={{
        fontFamily: mono, padding: "0", height: "100%", overflowY: "auto", position: "relative",
      }}
      onScroll={(e) => {
        const target = e.currentTarget;
        // Show story preview when scrolled down a bit (lower threshold)
        if (target.scrollTop > 20) {
          setBillboardScrolled(true);
        } else {
          setBillboardScrolled(false);
        }
      }}
    >
      {/* Accent bar */}
      <div style={{ height: "3px", background: "var(--accent)" }} />
      <div style={{ padding: "10px 14px 12px" }}>
        <button onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none",
            cursor: "pointer", fontSize: "12px", color: "var(--muted)", lineHeight: 1, padding: "2px 4px" }}
          aria-label="Close">&#x2715;</button>

        {/* Title — big, bold, the hero */}
        <div style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "0.04em",
          color: "var(--foreground)", marginBottom: activeProject.role ? "2px" : "6px" }}>{activeProject.title}</div>
        {activeProject.role && (
          <div style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "0.1em",
            color: "var(--accent)", textTransform: "uppercase" as const, marginBottom: "6px" }}>{activeProject.role}</div>
        )}

        {/* Narrative — the story, not bullet points */}
        <div style={{ fontSize: "9px", color: "var(--foreground)", lineHeight: 1.7,
          opacity: 0.85, marginBottom: "10px" }}>
          {activeProject.narrative}
        </div>

        {/* Stack — inline subtle text, not noisy pills */}
        <div style={{ fontSize: "8px", color: "var(--muted)", marginBottom: "10px",
          letterSpacing: "0.03em" }}>
          {activeProject.stack.join(" \u00B7 ")}
        </div>

        {/* Video embed if present */}
        {activeProject.videoUrl && (
          <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", marginBottom: "8px" }}>
            <iframe src={activeProject.videoUrl} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "1px solid var(--panel-border)" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        )}

        {/* Links — prominent, accent-colored */}
        {activeProject.links && Object.keys(activeProject.links).length > 0 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
            {activeProject.links.demo && (
              <a href={activeProject.links.demo} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "8.5px", color: "var(--accent)", textDecoration: "none",
                  padding: "3px 10px", border: "1px solid var(--accent)", borderRadius: "2px", fontWeight: 600 }}>Live Demo &#x2192;</a>
            )}
            {activeProject.links.github && (
              <a href={activeProject.links.github} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "8.5px", color: "var(--accent)", textDecoration: "none",
                  padding: "3px 10px", border: "1px solid var(--accent)", borderRadius: "2px", fontWeight: 600 }}>Source &#x2192;</a>
            )}
          </div>
        )}

        {/* Read Full Story Link — always visible, positioned before story */}
        {activeProject.story && (
          <div style={{ 
            paddingTop: "10px",
            marginTop: "10px",
            borderTop: "1px solid var(--panel-border)",
            marginBottom: billboardScrolled ? "10px" : "0",
            paddingBottom: billboardScrolled ? "0" : "0"
          }}>
            <a 
              href={`/stories/${activeProject.id}`}
              style={{ 
                fontSize: "8.5px", 
                color: "var(--accent)", 
                textDecoration: "none",
                display: "inline-block",
                fontWeight: 600,
                letterSpacing: "0.05em"
              }}
            >
              Read Full Story &#x2192;
            </a>
          </div>
        )}

        {/* Story Preview — always rendered but hidden until scrolled */}
        {activeProject.story && (
          <div style={{ 
            fontSize: "7px", 
            color: "var(--foreground)", 
            lineHeight: 1.6,
            opacity: billboardScrolled ? 0.75 : 0,
            marginBottom: billboardScrolled ? "10px" : "0",
            maxHeight: billboardScrolled ? "none" : "0",
            overflowY: billboardScrolled ? "visible" : "hidden",
            paddingRight: billboardScrolled ? "4px" : "0",
            borderTop: billboardScrolled ? "1px solid var(--panel-border)" : "none",
            paddingTop: billboardScrolled ? "8px" : "0",
            marginTop: billboardScrolled ? "8px" : "0",
            transition: "opacity 0.3s ease-in, margin 0.3s ease-in, padding 0.3s ease-in",
            pointerEvents: billboardScrolled ? "auto" : "none",
            height: billboardScrolled ? "auto" : "0",
            overflow: billboardScrolled ? "visible" : "hidden",
            visibility: billboardScrolled ? "visible" : "hidden"
          }}>
            <div style={{ 
              whiteSpace: "pre-wrap",
              wordBreak: "break-word"
            }}>
              {activeProject.story}
            </div>
          </div>
        )}
        
        {/* Spacer to ensure scrollable content */}
        {activeProject.story && (
          <div style={{ height: "100px", minHeight: "100px" }} />
        )}
      </div>
    </div>
  ) : showResume ? (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <iframe src="/resume.pdf" style={{ width: "100%", height: "100%", border: "none", background: "white" }} title="Resume Preview" />
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
        style={{ position: "absolute", bottom: "4px", right: "6px", fontSize: "6.5px",
          color: "var(--accent)", textDecoration: "none", fontFamily: mono,
          background: "var(--panel-bg)", padding: "2px 6px", borderRadius: "2px",
          border: "1px solid var(--panel-border)", fontWeight: 600 }}>
        Open Full Resume &#x2197;
      </a>
    </div>
  ) : (
    <div className="billboard-content" style={{
      fontFamily: mono, padding: "16px 18px", height: "100%",
      display: "flex", flexDirection: "column" as const, justifyContent: "center", alignItems: "center", textAlign: "center" as const,
    }}>
      <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "0.15em",
        color: "var(--foreground)", marginBottom: "4px" }}>HAMZA AMMAR</div>
      <div style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.28em",
        color: "var(--accent)", textTransform: "uppercase" as const, marginBottom: "4px" }}>Software Engineer · UWaterloo</div>
      <div style={{ width: "40px", height: "1px", background: "var(--panel-divider)", marginBottom: "12px" }} />
      <div style={{ width: "100%", maxWidth: "340px", textAlign: "left" as const, marginBottom: "14px" }}>
        {[
          { bullet: "→", text: "Wrote query planner internals at KùzuDB — youngest on the team" },
          { bullet: "→", text: "One JSON file → 3,500 pharmacists save 15 min per patient" },
          { bullet: "→", text: "Co-building an app that replaces aimless Yelp scrolling" },
          { bullet: "→", text: "Elected rep for 100+ engineers at Waterloo" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start",
            fontSize: "7.5px", color: "var(--foreground)", lineHeight: 1.6,
            marginBottom: "5px" }}>
            <span style={{ flexShrink: 0, color: "var(--accent)", fontWeight: 700 }}>{item.bullet}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className="billboard-cta" style={{ fontSize: "7px", color: "var(--accent)", letterSpacing: "0.12em",
        textTransform: "uppercase" as const, marginBottom: "10px" }}>
        Click a building · press &#x2318;K to explore
      </div>
      <div style={{ width: "40px", height: "1px", background: "var(--panel-divider)", marginBottom: "8px" }} />
      <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
        {[
          {
            label: "se30webring",
            href: "https://www.se30webring.com",
            logo: "https://www.se30webring.com/assets/icon-yellow.svg",
          },
          {
            label: "se-webring",
            href: "https://se-webring.xyz",
            logo: "https://raw.githubusercontent.com/simcard0000/se-webring/main/assets/logo/logo_w.svg",
          },
          {
            label: "uwaterloo.network",
            href: "https://www.uwaterloo.network",
            logo: "https://www.uwaterloo.network/favicon.svg",
          },
        ].map((ring) => (
          <a
            key={ring.href}
            href={ring.href}
            target="_blank"
            rel="noopener noreferrer"
            title={ring.label}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0.7, transition: "opacity 0.15s", textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ring.logo} alt={ring.label} style={{ width: "18px", height: "18px", objectFit: "contain" }} />
          </a>
        ))}
      </div>
    </div>
  );

  const BB = { x: 630, y: 425, w: 420, h: 215 };
  const BBD = 8;

  /* ═══════ RENDER ═══════ */
  return (
    <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet"
      aria-label="Portfolio City" className="citySvg w-full h-full"
      onClick={(e) => {
        const t = e.target as SVGElement;
        if (t.tagName === "svg" || (t.tagName === "rect" && t.getAttribute("width") === "1200")) onClose?.();
      }}>

      <defs>
        <filter id="shadow" x="-6%" y="-6%" width="112%" height="112%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#1F2937" floodOpacity="0.08" />
        </filter>
        <filter id="bb-shadow" x="-2%" y="-2%" width="104%" height="104%">
          <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="#1F2937" floodOpacity="0.14" />
        </filter>
        <pattern id="floor-tile" width="24" height="24" patternUnits="userSpaceOnUse">
          <line x1="0" y1="12" x2="12" y2="0" stroke="#CDD2DA" strokeWidth="0.35" />
          <line x1="12" y1="0" x2="24" y2="12" stroke="#CDD2DA" strokeWidth="0.35" />
          <line x1="24" y1="12" x2="12" y2="24" stroke="#CDD2DA" strokeWidth="0.35" />
          <line x1="12" y1="24" x2="0" y2="12" stroke="#CDD2DA" strokeWidth="0.35" />
        </pattern>
        <linearGradient id="floor-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4E7ED" />
          <stop offset="100%" stopColor="#D8DCE3" />
        </linearGradient>
        <radialGradient id="lamp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0D870" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#F0D870" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F0D870" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8DAFE" stopOpacity="0.25" />
          <stop offset="40%" stopColor="#E8EDFB" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#F5F7FA" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sky-gradient-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030712" stopOpacity="1" />
          <stop offset="30%" stopColor="#060D1F" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0A1628" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ═══════ SKY ═══════ */}
      <g id="sky" style={{ pointerEvents: "none" }}>
        <rect className="sky-layer" x="0" y="0" width="1200" height="250" />
        <g className="sky-stars">
          {[
            [87,22],[203,41],[345,18],[478,35],[621,12],[752,28],[889,45],[1023,15],[1142,38],
            [55,58],[168,72],[312,55],[445,68],[567,48],[698,62],[834,42],[978,75],[1105,52],
            [130,95],[270,82],[410,98],[560,88],[710,78],[850,92],[1000,85],[1150,72],
          ].map(([sx, sy], i) => (
            <circle key={`star${i}`} cx={sx} cy={sy} r={i % 3 === 0 ? 1.2 : 0.8}
              className="sky-star" />
          ))}
        </g>
      </g>

      {/* ═══════ GROUND ═══════ */}
      <g id="foundations">
        <rect className="ground-plane" width="1200" height="700" />
        <rect className="ground-surface" x="0" y="0" width="1200" height="700" />
        <rect x="0" y="0" width="1200" height="700" fill="url(#floor-tile)" opacity="0.45" />
        {[0,100,200,300,400,500,600,700,800,900,1000,1100,1200].map(gx =>
          <line key={`gv${gx}`} className="gridLine" x1={gx} y1={0} x2={gx} y2={700} />)}
        {[0,100,200,300,400,500,600,700].map(yy =>
          <line key={`gh${yy}`} className="gridLine" x1={0} y1={yy} x2={1200} y2={yy} />)}
      </g>

      {/* ═══════ ROADS ═══════ */}
      <g id="roads">
        <rect className="sidewalk" x="556" y="0" width="4" height="700" rx={0.5} />
        <rect className="sidewalk" x="578" y="0" width="4" height="700" rx={0.5} />
        <rect className="sidewalk" x="0" y="366" width="1200" height="4" rx={0.5} />
        <rect className="sidewalk" x="0" y="388" width="1200" height="4" rx={0.5} />
        <rect className="road-surface" x="560" y="0" width="18" height="700" rx={1} />
        <rect className="road-surface" x="0" y="370" width="1200" height="18" rx={1} />
        <line x1="569" y1="0" x2="569" y2="366" stroke="#FFF" strokeWidth="1" strokeDasharray="8 6" opacity="0.5" />
        <line x1="569" y1="392" x2="569" y2="700" stroke="#FFF" strokeWidth="1" strokeDasharray="8 6" opacity="0.5" />
        <line x1="0" y1="379" x2="556" y2="379" stroke="#FFF" strokeWidth="1" strokeDasharray="8 6" opacity="0.5" />
        <line x1="582" y1="379" x2="1200" y2="379" stroke="#FFF" strokeWidth="1" strokeDasharray="8 6" opacity="0.5" />

        {/* Crosswalks */}
        {[0,3,6,9].map(d => <rect key={`cn${d}`} x="560" y={358-d} width="18" height="1.5" fill="#FFF" opacity="0.55" rx={0.3}/>)}
        {[0,3,6,9].map(d => <rect key={`cs${d}`} x="560" y={393+d} width="18" height="1.5" fill="#FFF" opacity="0.55" rx={0.3}/>)}
        {[0,3,6,9].map(d => <rect key={`cw${d}`} x={548-d} y="370" width="1.5" height="18" fill="#FFF" opacity="0.55" rx={0.3}/>)}
        {[0,3,6,9].map(d => <rect key={`ce${d}`} x={583+d} y="370" width="1.5" height="18" fill="#FFF" opacity="0.55" rx={0.3}/>)}

        {/* Roundabout */}
        <circle cx="569" cy="379" r="24" fill="#E0E4E9" stroke="#CBD5E1" strokeWidth="0.8" />
        <circle cx="569" cy="379" r="16" fill="#D4E2D1" stroke="#B5CCB0" strokeWidth="0.5" />
        <circle cx="569" cy="379" r="7" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.6" />
        <circle cx="569" cy="379" r="3" className="water" />
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const r=(a*Math.PI)/180;
          return <circle key={`pt${i}`} cx={569+Math.cos(r)*20} cy={379+Math.sin(r)*20} r="2.5" fill="#7FA07B" opacity="0.5" style={{pointerEvents:"none"}}/>;
        })}

        <text className="road-label" x="581" y="56" opacity="0.6">HACKATHON ST</text>
        <text className="road-label" x="40" y="367" opacity="0.6">INFRASTRUCTURE AVE</text>

        {/* Cross-streets */}
        {[140,300,440].map(x => <rect key={`xs${x}`} className="street" x={x} y="358" width="6" height="34" rx={1} opacity="0.6" />)}
        {[700,880,1060].map(x => <rect key={`xb${x}`} className="street" x={x} y="358" width="6" height="34" rx={1} opacity="0.6" />)}

        {/* Lamp posts */}
        {/* Lamp posts — vertical road */}
        {lampPosts([[556,120],[556,250],[556,460],[556,590],[582,160],[582,320],[582,500],[582,650]])}
        {/* Lamp posts — horizontal road */}
        {lampPosts([[120,366],[280,366],[440,366],[700,366],[880,366],[1060,366]])}

        {/* Street trees — along horizontal road, both sides */}
        {trees([60, 150, 240, 340, 430, 490], 362)}
        {trees([640, 730, 820, 910, 1010, 1100], 362)}
        {trees([60, 150, 240, 340, 430, 490], 393)}
        {trees([640, 730, 820, 910, 1010, 1100], 393)}

        {/* Street trees — along vertical road (only at intersection corners, not inside building zones) */}
        {trees([553, 584], 345)}
        {trees([553, 584], 395)}

        {/* Vehicles */}
        {vehicle(550,100,"v","#6B7280")}
        {vehicle(574,230,"v","#7A8493")}
        {vehicle(550,430,"v","#5A6775")}
        {vehicle(574,550,"v","#8B95A2")}
        {vehicle(574,640,"v","#6B7280")}
        {vehicle(130,372,"h","#6B7280")}
        {vehicle(310,374,"h","#7A8493")}
        {vehicle(460,372,"h","#5A6775")}
        {vehicle(700,374,"h","#8B95A2")}
        {vehicle(900,372,"h","#6B7280")}
        {vehicle(1100,374,"h","#7A8493")}

        {/* Pedestrians — on sidewalks, not roads */}
        {pedestrian(548,362)}
        {pedestrian(590,394)}
        {pedestrian(555,400)}
        {pedestrian(585,358)}
        {pedestrian(140,392)}
        {pedestrian(440,391)}
        {pedestrian(720,392)}
        {pedestrian(1000,391)}

        {/* Benches — in front of parks, off the road */}
        {bench(210, 356)}
        {bench(820, 356)}
        {bench(210, 396)}
        {bench(820, 396)}

        {/* Bushes — near roundabout and sidewalk edges */}
        {bush(536, 358)}
        {bush(598, 358)}
        {bush(536, 398)}
        {bush(598, 398)}
        {bush(536, 378)}
        {bush(600, 378)}

        {/* Bus stops — on sidewalk edges */}
        {busStop(538, 180)}
        {busStop(538, 510)}
        {busStop(596, 300)}
        {busStop(596, 590)}
      </g>

      {/* ═══════ TOP-LEFT (x:5-545, y:40-365) ═══════ */}
      <g id="tl">
        {/* BACK ROW */}
        {bldg(null, 5, 65, 35, 208)}
        {bldg("kuzu", 44, 48, 82, 230)}
        {bldgStepped(136, 70, 32, 198, 0.6)}
        {bldg("chess", 168, 55, 60, 222)}
        {bldg(null, 238, 74, 26, 190)}
        {bldg("horizon", 274, 60, 52, 218)}
        {bldg(null, 336, 78, 26, 182)}
        {bldg("unimap", 372, 62, 46, 212)}
        {bldg(null, 428, 68, 28, 200)}
        {bldgStepped(466, 58, 34, 210, 0.55)}
        {bldg(null, 506, 72, 28, 194)}

        {/* MID ROW */}
        {F([
          [8,162,24,120],[40,152,26,132],[74,168,22,112],[108,155,24,128],
          [142,170,22,108],[174,150,26,135],[208,168,22,112],
          [276,172,24,105],[310,155,26,128],[346,168,22,112],[380,152,24,132],
          [414,170,22,108],[448,155,24,128],[482,168,22,112],[516,155,26,125],
        ])}

        {/* FRONT ROW */}
        {F([
          [5,292,22,60],[35,286,20,68],
          [125,294,20,60],[153,288,22,65],[183,298,20,55],[211,284,24,72],
          [273,300,22,52],[303,286,24,70],[335,296,20,58],
          [365,288,22,65],[395,298,20,55],[425,284,24,72],
          [457,294,20,60],[487,288,22,66],[517,296,20,56],
        ])}
        {/* Street-level park — in the front row gap, at sidewalk level y~354 */}
        {park(63, 354, 52, 10)}

        {pedestrian(120,290)}
        {pedestrian(380,292)}
        {pedestrian(240,310)}
        {pedestrian(470,298)}
      </g>

      {/* ═══════ TOP-RIGHT (x:585-1185, y:40-365) ═══════ */}
      <g id="tr">
        {/* BACK ROW */}
        {bldg(null, 585, 68, 30, 202)}
        {bldg("dealish", 624, 48, 78, 230)}
        {bldgStepped(712, 72, 32, 195, 0.6)}
        {bldg("neodev", 750, 52, 65, 225)}
        {bldg(null, 825, 75, 26, 188)}
        {bldg(null, 861, 68, 52, 208)}
        {bldg(null, 923, 78, 26, 185)}
        {bldg("uw", 959, 55, 48, 222)}
        {bldg(null, 1017, 70, 28, 198)}
        {bldgStepped(1055, 62, 36, 210, 0.55)}
        {bldg(null, 1097, 75, 28, 192)}
        {bldg(null, 1135, 68, 30, 200)}

        {/* MID ROW */}
        {F([
          [588,162,24,118],[620,152,26,130],[654,170,22,108],[688,155,24,128],
          [722,168,22,112],[754,150,26,135],[788,168,22,112],
          [856,172,24,105],[890,155,26,128],[924,168,22,112],[958,150,24,132],
          [992,168,22,108],[1026,155,24,128],[1060,170,22,110],
          [1128,168,22,108],[1162,155,24,122],
        ])}

        {/* FRONT ROW */}
        {F([
          [586,292,22,60],[614,286,20,68],[642,296,22,55],[670,284,24,72],
          [698,294,20,60],[726,288,22,65],[754,298,20,55],[782,284,24,70],
          [810,292,20,62],[838,300,22,52],[866,286,24,70],[894,296,20,58],
          [922,288,22,65],[950,298,20,55],[978,284,24,72],[1006,294,20,60],
          [1034,288,22,66],[1062,296,20,56],[1090,284,24,70],
          [1118,294,20,58],[1146,288,22,65],
        ])}

        {pedestrian(740,290)}
        {pedestrian(1060,292)}
        {pedestrian(870,308)}
        {pedestrian(940,295)}
      </g>

      {/* ═══════ BOTTOM-LEFT (x:5-545, y:395-695) ═══════ */}
      <g id="bl">
        {/* BACK ROW */}
        {bldg(null, 5, 395, 30, 185)}
        {bldg("mapflow", 40, 393, 76, 192)}
        {bldg(null, 125, 398, 26, 180)}
        {bldg("CC", 154, 393, 56, 190)}
        {bldgStepped(220, 400, 28, 175, 0.6)}
        {bldg(null, 254, 400, 48, 183)}
        {bldg(null, 312, 398, 26, 180)}
        {bldg(null, 348, 393, 28, 190)}
        {bldg(null, 386, 400, 24, 175)}
        {bldg(null, 420, 395, 26, 185)}
        {bldgStepped(456, 393, 32, 190, 0.55)}
        {bldg(null, 494, 398, 26, 180)}

        {/* MID ROW */}
        {F([
          [8,478,24,82],[40,470,22,92],[72,482,24,78],[106,472,26,88],
          [140,480,22,82],[172,468,24,94],[206,480,22,82],
          [274,484,24,76],[308,470,26,90],[342,480,22,82],[376,468,24,92],
          [410,482,22,78],[444,470,26,90],[478,480,24,80],[512,472,22,88],
        ])}

        {/* FRONT ROW */}
        {F([
          [5,552,22,58],[35,545,20,65],[65,554,22,56],
          [127,554,20,56],[157,548,22,62],[187,558,20,50],[217,544,24,66],
          [249,554,22,56],[281,560,20,48],[311,546,24,64],[343,554,20,56],
          [375,548,22,60],[407,558,20,50],[439,544,24,66],[471,554,20,56],
          [503,548,22,60],
        ])}

        {/* BOTTOM EDGE ROW */}
        {F([
          [8,632,22,46],[38,626,20,52],[68,634,22,42],[98,628,24,50],
          [160,628,22,50],[190,634,20,44],[220,624,24,55],
          [252,632,22,46],[284,626,20,52],[316,634,22,42],[348,624,24,55],
          [380,636,20,40],[412,628,22,50],[444,634,20,44],
          [476,624,24,55],[508,632,22,46],
        ])}

        {pedestrian(200,548)}
        {pedestrian(420,550)}
        {pedestrian(310,562)}
        {pedestrian(130,555)}
      </g>

      {/* ═══════ BOTTOM-RIGHT — Billboard area (x:585-1190, y:395-695) ═══════ */}
      <g id="br">
        {/* Left strip */}
        {F([
          [585,393,24,115],[585,520,22,95],[585,628,24,55],
          [614,393,22,100],[614,508,24,88],[614,612,22,65],
        ])}

        {/* Right of billboard */}
        {bldgStepped(1060, 393, 32, 120, 0.55)}
        {bldg(null, 1098, 390, 26, 128)}
        {bldgStepped(1136, 396, 32, 115, 0.6)}
        {bldg(null, 1172, 393, 24, 122)}
        {F([
          [1060,528,26,90],[1098,522,28,95],[1136,532,26,85],[1172,525,24,92],
          [1060,632,28,50],[1098,628,26,55],[1136,635,28,48],[1172,630,24,52],
        ])}

        {/* Below billboard */}
        {F([
          [638,652,22,38],[668,648,24,42],[700,654,22,36],[730,648,24,42],
          [762,652,22,38],[794,648,22,38],[826,654,22,36],
          [858,648,24,42],[890,652,22,38],
          [922,648,24,42],[954,654,22,36],[986,648,24,40],
          [1018,652,22,38],
        ])}

        {/* ── BILLBOARD ── */}
        <g id="billboard">
          <line x1={BB.x+70} y1={BB.y+BB.h} x2={BB.x+70} y2={BB.y+BB.h+22} stroke="#1F2937" strokeWidth="3" />
          <line x1={BB.x+BB.w-70} y1={BB.y+BB.h} x2={BB.x+BB.w-70} y2={BB.y+BB.h+22} stroke="#1F2937" strokeWidth="3" />
          <polygon className="bldg-right" points={`${BB.x+BB.w},${BB.y} ${BB.x+BB.w+BBD},${BB.y-BBD} ${BB.x+BB.w+BBD},${BB.y+BB.h-BBD} ${BB.x+BB.w},${BB.y+BB.h}`} />
          <polygon className="bldg-top" points={`${BB.x},${BB.y} ${BB.x+BBD},${BB.y-BBD} ${BB.x+BB.w+BBD},${BB.y-BBD} ${BB.x+BB.w},${BB.y}`} />
          <rect className="bb-panel" x={BB.x} y={BB.y} width={BB.w} height={BB.h} rx={3} filter="url(#bb-shadow)" />
          <rect className="bb-inner-border" x={BB.x+4} y={BB.y+4} width={BB.w-8} height={BB.h-8} rx={2} />
          {[-50,0,50].map(dx => <circle key={dx} cx={BB.x+BB.w/2+dx} cy={BB.y-4} r="3" className="bb-light" />)}
          <foreignObject x={BB.x+8} y={BB.y+8} width={BB.w-16} height={BB.h-16}>
            {billboardContent}
          </foreignObject>
        </g>
      </g>

      {/* ═══════ ROAD-EDGE BRIDGES ═══════ */}
      <g id="bridges" style={{ pointerEvents: "none" }}>
        {F([[538,50,16,80],[538,160,14,65],[540,248,16,55],[538,395,14,70],[540,485,16,55],[538,575,14,65],[540,655,16,35]])}
        {F([[583,130,14,60],[583,220,16,55],[583,310,14,50]])}
        {F([[60,342,16,22],[150,340,14,26],[280,342,16,22],[400,340,14,26],[640,342,16,22],[780,340,14,26],[920,342,16,22],[1100,340,14,26]])}
        {F([[100,392,14,24],[220,394,16,20],[360,392,14,24],[480,394,16,20],[660,392,14,24],[800,394,16,20],[940,392,14,24],[1080,394,16,20]])}
      </g>

      {/* ═══════ BUILDING SIGNS ═══════ */}
      <g id="building-signs" style={{ pointerEvents: "none" }}>
        {projectIcon("kuzu", "Kuzu", 85, 87, "/kuzu.png", "Software Intern")}
        {projectIcon("chess", "Chess", 198, 93)}
        {projectIcon("horizon", "Horizon", 300, 97)}
        {projectIcon("unimap", "UniMap", 395, 98)}
        {projectIcon("mapflow", "MapFLOW", 78, 426, "/mapflow.png", "Data Manager")}
        {projectIcon("CC", "CC", 182, 425)}
        {projectIcon("dealish", "Dealish", 663, 87, "/dealish.png", "Co-Founder")}
        {projectIcon("neodev", "NeoDev", 782, 90, "/neodev.png", "Founder")}
        {projectIcon("uw", "UW", 983, 93, undefined, "SE Rep")}
      </g>

    </svg>
  );
}
