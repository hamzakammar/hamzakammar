import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You found the secret · Hamza Ammar",
  description: "A little reward for the curious.",
  robots: { index: false },
};

const facts = [
  "This whole city is hand-authored SVG. No game engine, just coordinates and stubbornness.",
  "There are four hidden easter eggs. If you are here, you probably tripped at least one.",
  "I am genuinely open to software roles. Curiosity like yours is exactly who I want to build with.",
];

export default function Surprise() {
  return (
    <>
      <style>{`
        .sp-body { background:#0a0f1e; color:#cbd5e1; }
        .sp {
          min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 48px 24px; text-align: center;
          font-family: var(--font-geist-mono), ui-monospace, "SF Mono", Menlo, monospace;
          background:
            radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,.5), transparent),
            radial-gradient(1px 1px at 75% 15%, rgba(255,255,255,.4), transparent),
            radial-gradient(1px 1px at 35% 65%, rgba(255,255,255,.35), transparent),
            radial-gradient(1px 1px at 88% 55%, rgba(255,255,255,.45), transparent),
            radial-gradient(1px 1px at 55% 85%, rgba(255,255,255,.35), transparent),
            #0a0f1e;
        }
        .sp-tag { font-size: 11px; letter-spacing: .4em; color: #22d3ee; text-transform: uppercase; }
        .sp h1 { margin-top: 14px; font-size: 26px; font-weight: 800; color: #f1f5f9; letter-spacing: -.01em;
          animation: sp-in .6s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes sp-in { from { opacity:0; transform: translateY(10px);} to { opacity:1; transform:none;} }
        .sp-lead { margin-top: 14px; max-width: 52ch; font-size: 14px; color: #94a3b8; line-height: 1.75; }
        .sp-facts { margin-top: 26px; max-width: 60ch; text-align: left; display: flex; flex-direction: column; gap: 10px; }
        .sp-facts div { display: flex; gap: 10px; font-size: 13px; color: #cbd5e1; line-height: 1.6; }
        .sp-facts span.b { color: #22d3ee; }
        .sp-cta { margin-top: 34px; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .sp-cta a { text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 18px; border-radius: 9999px;
          transition: transform .15s ease, box-shadow .15s ease; }
        .sp-cta a:hover { transform: translateY(-1px); }
        .sp-primary { color:#0a0f1e; background:#22d3ee; }
        .sp-primary:hover { box-shadow: 0 8px 22px rgba(34,211,238,.35); }
        .sp-ghost { color:#cbd5e1; border:1px solid rgba(148,163,184,.5); }
        .sp-back { margin-top: 30px; font-size: 12px; color:#64748b; text-decoration:none; letter-spacing:.05em; }
        .sp-back:hover { color:#cbd5e1; }
      `}</style>
      <main className="sp sp-body">
        <div className="sp-tag">secret // unlocked</div>
        <h1>Okay, you actually found this.</h1>
        <p className="sp-lead">
          Most people click a building or two and bounce. You went digging.
          That is the exact kind of curiosity I like building things with.
        </p>

        <div className="sp-facts">
          {facts.map((f, i) => (
            <div key={i}>
              <span className="b">{String(i + 1).padStart(2, "0")}</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="sp-cta">
          <a className="sp-primary" href="mailto:hamza.k.ammar@gmail.com?subject=I%20found%20the%20secret%20on%20your%20site">say hi</a>
          <a className="sp-ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
          <a className="sp-ghost" href="https://linkedin.com/in/hamzakammar" target="_blank" rel="noopener noreferrer">linkedin</a>
        </div>

        <Link href="/" className="sp-back">back to the city</Link>
      </main>
    </>
  );
}
