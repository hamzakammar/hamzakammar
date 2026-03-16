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
  // Billboard dimensions — defined first so useEffect can reference them
  const BB = { x: 595, y: 395, w: 490, h: 255 };
  const BBD = 8;

  const [billboardScrolled, setBillboardScrolled] = useState(false);
  const billboardScrollRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [overlayRect, setOverlayRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  // Reset scroll state when project changes
  useEffect(() => {
    setBillboardScrolled(false);
    if (billboardScrollRef.current) {
      billboardScrollRef.current.scrollTop = 0;
    }
  }, [activeProject?.id]);

  // Billboard overlay rect from SVG (viewBox 1200x700 starting at y=0, meet)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => {
      const rect = svg.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;
      const VIEW_W = 1200;
      const VIEW_H = 700;
      const VIEW_MIN_Y = 0;
      const scale = Math.min(w / VIEW_W, h / VIEW_H);
      const offX = (w - VIEW_W * scale) / 2;
      const offY = (h - VIEW_H * scale) / 2;
      const contentW = BB.w - 2 * BBD;
      const contentH = BB.h - 2 * BBD;
      const contentX = BB.x + BBD;
      const contentY = BB.y + BBD;
      setOverlayRect({
        left: rect.left + offX + contentX * scale,
        top: rect.top + offY + (contentY - VIEW_MIN_Y) * scale,
        width: contentW * scale,
        height: contentH * scale,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(svg);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [BB.x, BB.y, BB.w, BB.h]);
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
    const hGap = w > 70 ? 13 : 11;
    const winW = w > 70 ? 10 : 8;
    for (let wy = y + 10; wy + 2 < y + h - 10; wy += 7)
      for (let wx = x + 6; wx + winW < x + w - 4; wx += hGap)
        els.push(<rect key={`sw${wx}_${wy}`} className="bldg-win" x={wx} y={wy} width={winW} height={2} rx={0.3} />);
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

  /* ═══════ PROJECT LABELS (logo mounted on building facade) ═══════ */
  const projectLabel = (
    id: string, name: string,
    bx: number, by: number, bw: number, bh: number,
    logo?: string,
  ) => {
    const iconSize = 28;
    // Center icon on the facade, ~25% down from top of building
    const facadeCx = bx + bw / 2;
    const facadeIconY = by + Math.round(bh * 0.22);
    const nameY = facadeIconY + iconSize / 2 + 9;

    const shapes: Record<string, (cx: number, cy: number) => React.ReactNode> = {
      kuzu: (cx, cy) => (<>{/* Database cylinder */}
        <ellipse cx={cx} cy={cy - 5} rx={8} ry={3.5} className="facade-icon" />
        <line x1={cx - 8} y1={cy - 5} x2={cx - 8} y2={cy + 5} className="facade-icon" />
        <line x1={cx + 8} y1={cy - 5} x2={cx + 8} y2={cy + 5} className="facade-icon" />
        <ellipse cx={cx} cy={cy + 5} rx={8} ry={3.5} className="facade-icon" />
      </>),
      chess: (cx, cy) => (<>{/* Crown */}
        <path d={`M${cx-8},${cy+6} L${cx-6},${cy-2} L${cx-9},${cy-6} L${cx-3},${cy-3} L${cx},${cy-9} L${cx+3},${cy-3} L${cx+9},${cy-6} L${cx+6},${cy-2} L${cx+8},${cy+6}Z`} className="facade-icon" />
      </>),
      horizon: (cx, cy) => (<>{/* Magnifying glass */}
        <circle cx={cx - 2} cy={cy - 2} r={7} className="facade-icon" />
        <line x1={cx + 3} y1={cy + 3} x2={cx + 9} y2={cy + 9} className="facade-icon" strokeWidth="2.5" />
      </>),
      unimap: (cx, cy) => (<>{/* Map pin */}
        <circle cx={cx} cy={cy - 4} r={5} className="facade-icon" />
        <path d={`M${cx-7},${cy-1} Q${cx},${cy+11} ${cx+7},${cy-1}`} className="facade-icon" />
      </>),
      mapflow: (cx, cy) => (<>{/* Data flow arrows */}
        <line x1={cx-9} y1={cy-3} x2={cx+6} y2={cy-3} className="facade-icon" />
        <polyline points={`${cx+2},${cy-7} ${cx+7},${cy-3} ${cx+2},${cy+1}`} className="facade-icon" fill="none" />
        <line x1={cx+9} y1={cy+3} x2={cx-6} y2={cy+3} className="facade-icon" />
        <polyline points={`${cx-2},${cy-1} ${cx-7},${cy+3} ${cx-2},${cy+7}`} className="facade-icon" fill="none" />
      </>),
      cc: (cx, cy) => (<>{/* Open book */}
        <rect x={cx-8} y={cy-8} width={16} height={16} rx={1.5} className="facade-icon" />
        <line x1={cx} y1={cy-8} x2={cx} y2={cy+8} className="facade-icon" />
        <line x1={cx-8} y1={cy-1} x2={cx+8} y2={cy-1} className="facade-icon" />
      </>),
      dealish: (cx, cy) => (<>{/* Target */}
        <circle cx={cx} cy={cy} r={9} className="facade-icon" />
        <circle cx={cx} cy={cy} r={4.5} className="facade-icon" />
        <line x1={cx} y1={cy-10} x2={cx} y2={cy+10} className="facade-icon" />
        <line x1={cx-10} y1={cy} x2={cx+10} y2={cy} className="facade-icon" />
      </>),
      neodev: (cx, cy) => (<>{/* Code brackets */}
        <polyline points={`${cx-3},${cy-9} ${cx-11},${cy} ${cx-3},${cy+9}`} className="facade-icon" fill="none" />
        <polyline points={`${cx+3},${cy-9} ${cx+11},${cy} ${cx+3},${cy+9}`} className="facade-icon" fill="none" />
      </>),
      uw: (cx, cy) => (<>{/* Graduation cap */}
        <polygon points={`${cx},${cy-9} ${cx-12},${cy-2} ${cx},${cy+2} ${cx+12},${cy-2}`} className="facade-icon" />
        <line x1={cx} y1={cy+2} x2={cx} y2={cy+9} className="facade-icon" />
        <line x1={cx-7} y1={cy+7} x2={cx+7} y2={cy+7} className="facade-icon" />
      </>),
      shopify: (cx, cy) => (<>{/* Shopping bag */}
        <rect x={cx-7} y={cy-2} width={14} height={12} rx={2} className="facade-icon" />
        <path d={`M${cx-4},${cy-2} C${cx-4},${cy-9} ${cx+4},${cy-9} ${cx+4},${cy-2}`} className="facade-icon" fill="none" />
      </>),
    };

    return (
      <g key={`label-${id}`} style={{ pointerEvents: "none" }}>
        {logo ? (
          <>
            {/* Logo image mounted on facade */}
            <rect className="facade-logo-bg"
              x={facadeCx - iconSize/2 - 2} y={facadeIconY - iconSize/2 - 2}
              width={iconSize + 4} height={iconSize + 4} rx={3} />
            <image href={logo}
              x={facadeCx - iconSize/2} y={facadeIconY - iconSize/2}
              width={iconSize} height={iconSize}
              preserveAspectRatio="xMidYMid meet" style={{ opacity: 0.92 }} />
          </>
        ) : (
          <>
            {/* SVG icon mounted on facade */}
            <rect className="facade-logo-bg"
              x={facadeCx - iconSize/2 - 2} y={facadeIconY - iconSize/2 - 2}
              width={iconSize + 4} height={iconSize + 4} rx={3} />
            {shapes[id]?.(facadeCx, facadeIconY)}
          </>
        )}
        {/* Name in small caps below icon */}
        <text className="facade-name-text"
          x={facadeCx} y={nameY}
          textAnchor="middle">{name.toUpperCase()}</text>
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
            x={x + 1} y={y + 1} width={w - 2} height={Math.max(3, Math.round(w / 25))} rx={0.5}
            style={{
              pointerEvents: "none",
              fill: id ? ({
                kuzu: '#6366F1',
                chess: '#8B5CF6',
                horizon: '#06B6D4',
                unimap: '#10B981',
                mapflow: '#F59E0B',
                cc: '#EF4444',
                dealish: '#F97316',
                neodev: '#EC4899',
                uw: '#14B8A6',
                shopify: '#7AB55C',
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
  const headshotSrc = "/me.png";

  // Project detail — rendered in fixed overlay (needs scroll, complex layout)
  const projectContent = activeProject ? (
    <div 
      ref={billboardScrollRef}
      className="billboard-content billboard-project" 
      style={{
        fontFamily: mono, padding: "0",
        width: "100%", height: "100%",
        minHeight: 0,
        overflowY: "auto", overflowX: "hidden", position: "relative",
        boxSizing: "border-box",
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
      <div style={{ padding: "14px 18px 14px" }}>
        <button onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none",
            cursor: "pointer", fontSize: "12px", color: "var(--muted)", lineHeight: 1, padding: "2px 4px" }}
          aria-label="Close">&#x2715;</button>

        {/* Title — big, bold, the hero */}
        <div style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "0.04em",
          color: "var(--foreground)", marginBottom: activeProject.role ? "2px" : "6px" }}>{activeProject.title}</div>
        {activeProject.role && (
          <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em",
            color: "var(--accent)", textTransform: "uppercase" as const, marginBottom: "6px" }}>{activeProject.role}</div>
        )}

        {/* Narrative — the story, not bullet points */}
        <div style={{ fontSize: "10px", color: "var(--foreground)", lineHeight: 1.8,
          opacity: 0.85, marginBottom: "10px" }}>
          {activeProject.narrative}
        </div>

        {/* Stack — inline subtle text, not noisy pills */}
        <div style={{ fontSize: "9px", color: "var(--muted)", marginBottom: "10px",
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
                style={{ fontSize: "9px", color: "var(--accent)", textDecoration: "none",
                  padding: "3px 10px", border: "1px solid var(--accent)", borderRadius: "2px", fontWeight: 600 }}>Live Demo &#x2192;</a>
                    )}
                    {activeProject.links.github && (
              <a href={activeProject.links.github} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "9px", color: "var(--accent)", textDecoration: "none",
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
  ) : null;

  // Default billboard — rendered directly in foreignObject (no scroll needed, explicit px = Safari-safe)
  const defaultContent = !activeProject && !showResume ? (
    <div className="billboard-content" style={{
      fontFamily: mono, padding: "10px 16px",
      width: "100%", height: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex", flexDirection: "column" as const, justifyContent: "flex-start", alignItems: "center", textAlign: "center" as const,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", marginTop: "4px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            overflow: "hidden",
            border: "1px solid rgba(148, 163, 184, 0.8)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={headshotSrc}
            alt="Hamza Ammar"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div style={{ textAlign: "left", lineHeight: 1.4 }}>
          <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.16em",
            color: "var(--foreground)", textTransform: "uppercase" as const, marginBottom: "2px" }}>
            HAMZA AMMAR
          </div>
          <div style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em",
            color: "var(--accent)", textTransform: "uppercase" as const }}>
            Software Engineering · UWaterloo
          </div>
        </div>
      </div>
      <div style={{ width: "40px", height: "1px", background: "var(--panel-divider)", marginBottom: "8px" }} />
      <div style={{ width: "100%", maxWidth: "360px", textAlign: "left" as const, marginBottom: "8px" }}>
        {[
          { bullet: "→", text: "Wrote query planner internals at KùzuDB — youngest on the team" },
          { bullet: "→", text: "One JSON file → 3,500 pharmacists save 15 min per patient" },
          { bullet: "→", text: "Co-building an app that replaces aimless Yelp scrolling" },
          { bullet: "→", text: "Elected rep for 100+ engineers at Waterloo" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start",
            fontSize: "8px", color: "var(--foreground)", lineHeight: 1.6,
            marginBottom: "4px" }}>
            <span style={{ flexShrink: 0, color: "var(--accent)", fontWeight: 700 }}>{item.bullet}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className="billboard-cta" style={{ fontSize: "7px", color: "var(--accent)", letterSpacing: "0.12em",
        textTransform: "uppercase" as const, marginBottom: "6px" }}>
        Click a building · press &#x2318;K to explore
      </div>
      <div style={{ width: "40px", height: "1px", background: "var(--panel-divider)", marginBottom: "6px" }} />
      <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
        {[
          { label: "se30webring", href: "https://www.se30webring.com", logo: "https://www.se30webring.com/assets/icon-yellow.svg" },
          { label: "se-webring", href: "https://se-webring.xyz", logo: "https://raw.githubusercontent.com/simcard0000/se-webring/main/assets/logo/logo_w.svg" },
          { label: "uwaterloo.network", href: "https://www.uwaterloo.network", logo: "https://www.uwaterloo.network/favicon.svg" },
        ].map((ring) => (
          <a key={ring.href} href={ring.href} target="_blank" rel="noopener noreferrer" title={ring.label}
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7, transition: "opacity 0.15s", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ring.logo} alt={ring.label} style={{ width: "16px", height: "16px", objectFit: "contain" }} />
          </a>
        ))}
      </div>
    </div>
  ) : null;

  /* ═══════ RENDER ═══════ */
  return (
    <>
    <svg ref={svgRef} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet"
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
            [55,58],[168,72],[312,55],[445,68],[567,48],[698,62],[834,42],[978,75],[1105,52],
            [130,95],[270,82],[410,98],[560,88],[710,78],[850,92],[1000,85],[1150,72],
            [87,22],[203,41],[345,18],[478,35],[621,12],[752,28],[889,45],[1023,15],[1142,38],
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
        <circle cx="569" cy="379" r="24" className="roundabout-outer" />
        <circle cx="569" cy="379" r="16" className="roundabout-green" />
        <circle cx="569" cy="379" r="7" className="roundabout-inner" />
        <circle cx="569" cy="379" r="3" className="water" />
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const r=(a*Math.PI)/180;
          return <circle key={`pt${i}`} cx={569+Math.cos(r)*20} cy={379+Math.sin(r)*20} r="2.5" className="roundabout-plant" style={{pointerEvents:"none"}}/>;
        })}


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

      {/* ═══════ TOP-LEFT (x:5-545, y:0-365) ═══════ */}
      <g id="tl">
        {/* BACK ROW — project buildings ~1.2x wide, original heights, fillers between */}
        {bldg(null, 5, 65, 22, 208)}
        {bldg("kuzu", 38, 48, 95, 230)}
        {bldg(null, 138, 62, 14, 210)}
        {bldg("chess", 155, 55, 78, 222)}
        {bldg(null, 237, 66, 16, 206)}
        {bldg("horizon", 258, 60, 68, 218)}
        {bldg(null, 330, 68, 16, 200)}
        {bldg("unimap", 350, 62, 60, 212)}
        {bldg(null, 415, 68, 28, 200)}
        {bldgStepped(450, 58, 34, 210, 0.55)}
        {bldg(null, 492, 72, 28, 194)}
        {bldg(null, 528, 68, 26, 198)}

        {/* MID ROW */}
        {F([
          [8,162,24,120],[38,168,22,112],[68,158,24,126],
          [100,170,22,110],[128,160,26,120],[160,168,22,114],
          [190,156,24,128],[220,170,22,110],[250,158,26,124],
          [282,168,24,112],[312,156,22,128],[342,170,24,110],
          [374,160,22,122],[404,168,24,112],[436,155,26,128],
          [468,168,22,112],[500,155,24,125],[532,162,22,118],
        ])}

        {/* FRONT ROW */}
        {F([
          [5,292,22,60],[35,286,20,68],[65,294,20,60],[95,288,22,65],
          [125,296,20,56],[155,284,24,72],[185,292,22,60],[215,288,20,66],
          [245,296,22,56],[275,286,20,68],[305,294,22,58],[335,288,20,66],
          [365,296,22,56],[395,284,24,72],[425,292,20,62],
          [455,288,22,66],[485,296,20,56],[515,286,22,68],
        ])}
        {/* Street-level park */}
        {park(63, 354, 52, 10)}

        {pedestrian(120,290)}
        {pedestrian(380,292)}
        {pedestrian(240,310)}
        {pedestrian(470,298)}
      </g>

      {/* ═══════ TOP-RIGHT (x:585-1185, y:0-365) ═══════ */}
      <g id="tr">
        {/* BACK ROW — 3 project buildings + fillers */}
        {bldg(null, 585, 68, 24, 202)}
        {bldg("dealish", 614, 48, 100, 230)}
        {bldg(null, 718, 62, 16, 210)}
        {bldg("neodev", 740, 52, 82, 225)}
        {bldg(null, 826, 66, 16, 206)}
        {bldg(null, 848, 62, 28, 210)}
        {bldg(null, 882, 68, 24, 204)}
        {bldg(null, 912, 64, 26, 208)}
        {bldg("uw", 945, 58, 62, 218)}
        {bldg(null, 1012, 68, 28, 198)}
        {bldgStepped(1048, 62, 36, 210, 0.55)}
        {bldg(null, 1096, 75, 28, 192)}
        {bldg(null, 1136, 68, 30, 200)}
        {bldg(null, 1178, 72, 20, 196)}

        {/* MID ROW */}
        {F([
          [588,162,24,118],[616,168,22,112],[646,158,24,126],
          [676,170,22,110],[706,160,26,120],[736,168,22,114],
          [766,156,24,128],[796,170,22,110],[826,158,26,124],
          [856,168,24,112],[886,156,22,128],[916,170,24,110],
          [946,160,22,122],[976,168,24,112],[1008,155,26,128],
          [1042,168,22,112],[1074,155,24,125],[1106,162,22,118],
          [1136,168,22,112],[1166,155,24,122],
        ])}

        {/* FRONT ROW */}
        {F([
          [586,292,22,60],[614,286,20,68],[644,294,20,60],[674,288,22,65],
          [704,296,20,56],[734,284,24,72],[764,292,22,60],[794,288,20,66],
          [824,296,22,56],[854,286,20,68],[884,294,22,58],[914,288,20,66],
          [944,296,22,56],[974,284,24,72],[1004,288,22,65],
          [1034,298,20,55],[1064,284,24,72],[1096,294,20,60],
          [1126,288,22,66],[1158,296,20,56],[1182,290,16,62],
        ])}

        {pedestrian(740,290)}
        {pedestrian(1060,292)}
        {pedestrian(870,308)}
        {pedestrian(940,295)}
      </g>

      {/* ═══════ BOTTOM-LEFT (x:5-545, y:395-695) ═══════ */}
      <g id="bl">
        {/* BACK ROW — mapflow, cc, shopify + fillers */}
        {bldg(null, 5, 395, 18, 185)}
        {bldg("mapflow", 35, 393, 85, 192)}
        {bldg("cc", 130, 393, 72, 190)}
        {bldg("shopify", 215, 395, 65, 188)}
        {bldg(null, 290, 400, 28, 175)}
        {bldg(null, 326, 398, 26, 180)}
        {bldg(null, 360, 393, 28, 190)}
        {bldg(null, 396, 400, 24, 175)}
        {bldg(null, 428, 395, 26, 185)}
        {bldgStepped(462, 393, 32, 190, 0.55)}
        {bldg(null, 502, 398, 26, 180)}
        {bldg(null, 536, 395, 18, 183)}

        {/* MID ROW */}
        {F([
          [8,478,24,82],[40,470,22,92],[72,482,24,78],[106,472,26,88],
          [140,480,22,82],[172,468,24,94],[206,480,22,82],[236,472,24,88],
          [268,484,24,76],[300,470,26,90],[334,480,22,82],[366,468,24,92],
          [398,482,22,78],[430,470,26,90],[464,480,24,80],[498,472,22,88],
          [528,478,22,82],
        ])}

        {/* FRONT ROW */}
        {F([
          [5,552,22,58],[35,545,20,65],[65,554,22,56],[95,548,20,62],
          [127,554,20,56],[157,548,22,62],[187,558,20,50],[217,544,24,66],
          [249,554,22,56],[281,560,20,48],[311,546,24,64],[343,554,20,56],
          [375,548,22,60],[407,558,20,50],[439,544,24,66],[471,554,20,56],
          [503,548,22,60],[533,554,18,56],
        ])}

        {/* BOTTOM EDGE ROW */}
        {F([
          [8,632,22,46],[38,626,20,52],[68,634,22,42],[98,628,24,50],
          [128,632,22,48],[160,628,22,50],[190,634,20,44],[220,624,24,55],
          [252,632,22,46],[284,626,20,52],[316,634,22,42],[348,624,24,55],
          [380,636,20,40],[412,628,22,50],[444,634,20,44],
          [476,624,24,55],[508,632,22,46],[536,628,18,50],
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
        {projectLabel("kuzu", "Kuzu", 38, 48, 95, 230, "/kuzu.png")}
        {projectLabel("chess", "Chess", 155, 55, 78, 222)}
        {projectLabel("horizon", "Horizon MCP", 258, 60, 68, 218)}
        {projectLabel("unimap", "UniMap", 350, 62, 60, 212)}
        {projectLabel("dealish", "Dealish", 614, 48, 100, 230, "/dealish.png")}
        {projectLabel("neodev", "NeoDev", 740, 52, 82, 225, "/neodev.png")}
        {projectLabel("uw", "UW", 945, 58, 62, 218, "/UW.png")}
        {projectLabel("mapflow", "MapFLOW", 35, 393, 85, 192, "/mapflow.png")}
        {projectLabel("cc", "CC", 130, 393, 72, 190)}
        {projectLabel("shopify", "Shopify", 215, 395, 65, 188)}
      </g>

    </svg>
    {overlayRect && (
      <div
        className="billboard-overlay"
        style={{
          position: "fixed",
          left: overlayRect.left,
          top: overlayRect.top,
          width: overlayRect.width,
          height: overlayRect.height,
          overflow: "hidden",
          boxSizing: "border-box",
          zIndex: 10,
          pointerEvents: activeProject || showResume ? "auto" : "none",
        }}
      >
        <div
          style={{ width: "100%", height: "100%" }}
          onClick={(e) => { if (activeProject || showResume) e.stopPropagation(); }}
        >
          {activeProject || showResume ? projectContent : defaultContent}
        </div>
      </div>
    )}
    </>
  );
}
