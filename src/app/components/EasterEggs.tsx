"use client";

/* ═══════════════════════════════════════════════════════
   EASTER EGGS - fully self-contained, overlay-only.
   Never touches the city's React/SVG tree, so it can't break render.
     • Konami code (up up down down left right left right B A) -> UFO abduction
     • Click the billboard headshot x5 (data-egg="face")       -> avatar swarm
     • Type "rave"                                             -> rave mode
     • Type "matrix"                                           -> Matrix rain
   ═══════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a",
];

export default function EasterEggs() {
  const [ufo, setUfo] = useState<{ x: number; y: number } | null>(null);
  const [rave, setRave] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [swarm, setSwarm] = useState(false);
  const abducteeRef = useRef<SVGElement | null>(null);

  /* ── Keyboard: konami (abduct a real building) + typed words (matrix, rave) ── */
  useEffect(() => {
    let konamiIdx = 0;
    let typed = "";
    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
    };

    // Pick a real city building, park the UFO above it, and lift it into the beam.
    const triggerUfo = () => {
      if (abducteeRef.current) return; // one abduction at a time
      const buildings = Array.from(
        document.querySelectorAll<SVGElement>(".citySvg [data-project]")
      );
      const el = buildings[Math.floor(Math.random() * buildings.length)];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setUfo({ x: rect.left + rect.width / 2, y: Math.max(64, rect.top) });
      abducteeRef.current = el;
      const s = el.style;
      s.transition = "transform 1.5s cubic-bezier(.4,0,.2,1), opacity 1.5s ease";
      s.transformBox = "fill-box";
      s.transformOrigin = "center";
      window.setTimeout(() => { s.transform = "translateY(-260px) scale(.3)"; s.opacity = "0"; }, 850);
      window.setTimeout(() => {
        const el2 = abducteeRef.current;
        if (el2) {
          el2.style.transition = "transform .8s ease, opacity .8s ease";
          el2.style.transform = "";
          el2.style.opacity = "";
          window.setTimeout(() => {
            el2.style.transition = "";
            el2.style.transformBox = "";
            el2.style.transformOrigin = "";
          }, 850);
        }
        abducteeRef.current = null;
        setUfo(null);
      }, 6500);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();

      // Konami sequence
      if (k === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) { konamiIdx = 0; triggerUfo(); }
      } else {
        konamiIdx = k === KONAMI[0] ? 1 : 0;
      }

      // Typed words (rave and matrix never overlap)
      if (k.length === 1 && k >= "a" && k <= "z") {
        typed = (typed + k).slice(-8);
        if (typed.endsWith("matrix")) setMatrix(true);
        else if (typed.endsWith("rave")) setRave((r) => !r);
      }

      // Escape closes the dismissable overlay
      if (k === "escape") setMatrix(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── Click the headshot 5x fast -> swarm ── */
  useEffect(() => {
    let count = 0;
    let last = 0;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest('[data-egg="face"]')) return;
      const now = e.timeStamp;
      count = now - last < 2500 ? count + 1 : 1;
      last = now;
      if (count >= 5) {
        count = 0;
        setSwarm(true);
        window.setTimeout(() => setSwarm(false), 11000);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  /* ── Rave: flag the root so global CSS can hue-cycle the city ── */
  useEffect(() => {
    const root = document.documentElement;
    if (rave) root.setAttribute("data-rave", "1");
    else root.removeAttribute("data-rave");
    return () => root.removeAttribute("data-rave");
  }, [rave]);

  /* ── Friendly console hint for the curious ── */
  useEffect(() => {
    console.log(
      "%c psst... this city has secrets. try the konami code, type 'rave', type 'matrix', or click my face 5x.",
      "color:#22d3ee;font-family:monospace;font-size:12px;"
    );
  }, []);

  return (
    <>
      <style>{`
        /* Rave: hue-cycle the whole city + pulse the panels */
        :root[data-rave] .citySvg { animation: eggHue 2.4s linear infinite; }
        @keyframes eggHue { to { filter: hue-rotate(360deg); } }
        :root[data-rave] .egg-stars span {
          position:absolute; top:-10px; width:2px; height:12px; border-radius:2px;
          background:linear-gradient(#fff, transparent);
          animation: eggFall linear infinite;
        }
        @keyframes eggFall { to { transform: translateY(105vh); opacity:0; } }

        /* UFO abduction (parks over a real building and beams it up) */
        .egg-ufo-wrap { position:fixed; inset:0; z-index:9998; pointer-events:none; overflow:hidden; }
        .egg-ufo-col { position:absolute; top:0; display:flex; flex-direction:column; align-items:center;
          transform:translateX(-50%); animation: eggDrop .7s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes eggDrop { from{opacity:0; transform:translate(-50%,-28px);} to{opacity:1; transform:translate(-50%,0);} }
        .egg-ufo { font-size:60px; line-height:1; filter:drop-shadow(0 0 16px rgba(90,200,255,.85)); }
        .egg-beam { width:78px; flex:1; margin-top:-6px;
          background:linear-gradient(rgba(120,220,255,.55), rgba(120,220,255,0));
          clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%);
          animation: eggBeamPulse 1.1s ease-in-out infinite alternate; }
        @keyframes eggBeamPulse { from{opacity:.45} to{opacity:.9} }

        /* Matrix */
        .egg-matrix { position:fixed; inset:0; z-index:9999; background:#000; cursor:pointer; }
        .egg-matrix small { position:absolute; bottom:74px; left:0; right:0; text-align:center;
          color:#22c55e; font-family:ui-monospace,monospace; font-size:12px; letter-spacing:.1em; opacity:.9; }

        /* Swarm */
        .egg-swarm { position:fixed; inset:0; z-index:9997; pointer-events:none; overflow:hidden; }
        .egg-swarm img { position:absolute; width:44px; height:44px; border-radius:50%;
          border:2px solid rgba(255,255,255,.8); box-shadow:0 2px 10px rgba(0,0,0,.4); will-change:transform; }
        .egg-perfect { position:fixed; z-index:9999; font-family:ui-monospace,monospace; font-weight:800;
          color:#fde047; text-shadow:0 0 10px rgba(253,224,71,.8); pointer-events:none;
          animation: eggPerfect .9s ease forwards; }
        @keyframes eggPerfect { 0%{transform:scale(.6);opacity:0} 20%{transform:scale(1.1);opacity:1} 100%{transform:scale(1);opacity:0} }
      `}</style>

      {rave && <RaveStars />}
      {ufo && (
        <div className="egg-ufo-wrap" aria-hidden>
          <div className="egg-ufo-col" style={{ left: ufo.x, height: ufo.y }}>
            <div className="egg-ufo">🛸</div>
            <div className="egg-beam" />
          </div>
        </div>
      )}
      {matrix && <MatrixRain onClose={() => setMatrix(false)} />}
      {swarm && <Swarm />}

      {(ufo || rave || swarm || matrix) && <CtaBanner />}
    </>
  );
}

/* ── Shared call-to-action shown with every egg ── */
function CtaBanner() {
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: "24px", zIndex: 10000,
      display: "flex", justifyContent: "center", pointerEvents: "none", padding: "0 12px" }}>
      <a
        href="mailto:hamza.k.ammar@gmail.com?subject=I%20found%20a%20secret%20on%20your%20site"
        style={{ pointerEvents: "auto", display: "inline-flex", gap: "8px", alignItems: "center",
          maxWidth: "92vw", textAlign: "center",
          background: "rgba(10,15,25,.85)", color: "#e5e7eb", textDecoration: "none",
          border: "1px solid rgba(34,211,238,.55)", borderRadius: "9999px",
          padding: "9px 18px", fontFamily: "ui-monospace, monospace", fontSize: "12.5px",
          boxShadow: "0 6px 24px rgba(0,0,0,.45)", backdropFilter: "blur(4px)" }}>
        <span>you found this. </span>
        <span style={{ color: "#22d3ee", fontWeight: 700 }}>email me for another surprise →</span>
      </a>
    </div>
  );
}

/* ── Rave falling stars ── */
function RaveStars() {
  const bits = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="egg-stars" style={{ position: "fixed", inset: 0, zIndex: 9996, pointerEvents: "none", overflow: "hidden" }} aria-hidden>
      {bits.map((i) => (
        <span
          key={i}
          style={{
            left: `${(i * 2.5) % 100}%`,
            animationDuration: `${1 + (i % 5) * 0.35}s`,
            animationDelay: `${(i % 7) * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Matrix rain (canvas) ── */
function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const chars = "アイウエオカキクケコサシスセソ01ハミズ HAMZA".split("");
    let cols = 0;
    let drops: number[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / 14);
      drops = Array(cols).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#22c55e";
      ctx.font = "14px ui-monospace, monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className="egg-matrix" onClick={onClose} title="click to exit">
      <canvas ref={canvasRef} />
      <small>&gt; whoami: hamza.ammar &nbsp;·&nbsp; status: open to work &nbsp;·&nbsp; [click or esc to exit]</small>
    </div>
  );
}

/* ── Bouncing avatar swarm ── */
function Swarm() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [perfect, setPerfect] = useState<{ x: number; y: number; id: number } | null>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const imgs = Array.from(wrap.querySelectorAll("img")) as HTMLImageElement[];
    const W = () => window.innerWidth - 44;
    const H = () => window.innerHeight - 44;
    const state = imgs.map((_, i) => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (2 + Math.random() * 2) * (i % 2 ? 1 : -1),
      vy: (2 + Math.random() * 2) * (i % 3 ? 1 : -1),
    }));
    let raf = 0;
    let pid = 0;
    const step = () => {
      for (let i = 0; i < imgs.length; i++) {
        const s = state[i];
        s.x += s.vx;
        s.y += s.vy;
        let hitX = false, hitY = false;
        if (s.x <= 0 || s.x >= W()) { s.vx *= -1; s.x = Math.max(0, Math.min(W(), s.x)); hitX = true; }
        if (s.y <= 0 || s.y >= H()) { s.vy *= -1; s.y = Math.max(0, Math.min(H(), s.y)); hitY = true; }
        if (hitX && hitY) setPerfect({ x: s.x, y: s.y, id: pid++ });
        imgs[i].style.transform = `translate(${s.x}px, ${s.y}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <>
      <div className="egg-swarm" ref={wrapRef} aria-hidden>
        {Array.from({ length: 14 }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src="/me.png" alt="" />
        ))}
      </div>
      {perfect && (
        <div className="egg-perfect" key={perfect.id} style={{ left: perfect.x, top: perfect.y }}>
          PERFECT
        </div>
      )}
    </>
  );
}
