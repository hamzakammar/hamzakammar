"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
  sub?: boolean;
}

export default function PostToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    // The active section is the last heading above a line 30% down the viewport.
    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav className="ctx-toc" aria-label="On this page">
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} className={[i.sub && "sub", i.id === active && "on"].filter(Boolean).join(" ") || undefined}>
          {i.label}
        </a>
      ))}
    </nav>
  );
}
