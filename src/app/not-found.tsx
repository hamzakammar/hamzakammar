import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost in the city · Hamza Ammar",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-body { background:#0a0f1e; color:#cbd5e1; }
        .nf {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 24px;
          font-family: var(--font-geist-mono), ui-monospace, "SF Mono", Menlo, monospace;
          background:
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.5), transparent),
            radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,.4), transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,.35), transparent),
            radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,.4), transparent),
            #0a0f1e;
        }
        .nf-ufo { font-size: 72px; line-height: 1; filter: drop-shadow(0 0 20px rgba(34,211,238,.55));
          animation: nf-float 3.4s ease-in-out infinite; }
        @keyframes nf-float { 0%,100%{ transform: translateY(0) rotate(-3deg);} 50%{ transform: translateY(-14px) rotate(3deg);} }
        .nf-code { margin-top: 10px; font-size: 13px; letter-spacing: .35em; color: #22d3ee; text-transform: uppercase; }
        .nf h1 { margin-top: 14px; font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: -.01em; }
        .nf p { margin-top: 10px; max-width: 44ch; font-size: 13px; color: #94a3b8; line-height: 1.7; }
        .nf-btn { margin-top: 26px; display: inline-block; text-decoration: none;
          color: #0a0f1e; background: #22d3ee; font-weight: 700; font-size: 13px;
          padding: 10px 18px; border-radius: 9999px; transition: transform .15s ease, box-shadow .15s ease; }
        .nf-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(34,211,238,.35); }
      `}</style>
      <main className="nf nf-body">
        <div className="nf-ufo" aria-hidden>🛸</div>
        <div className="nf-code">Error 404</div>
        <h1>This building isn&apos;t in the city.</h1>
        <p>
          You wandered off the map. The page you are looking for does not exist,
          or a UFO already abducted it.
        </p>
        <Link href="/" className="nf-btn">back to the city</Link>
      </main>
    </>
  );
}
