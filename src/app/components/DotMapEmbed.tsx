"use client";

import { useEffect, useRef } from "react";

// Same-origin iframe, so we can size it to its content instead of guessing a height per breakpoint.
export default function DotMapEmbed() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    let observer: ResizeObserver | null = null;

    const attach = () => {
      const doc = iframe.contentDocument;
      if (!doc?.body || doc.location.href === "about:blank") return;
      const fit = () => {
        // body, not documentElement: the root's scrollHeight never drops below the iframe's own height.
        iframe.style.height = `${Math.ceil(doc.body.getBoundingClientRect().height)}px`;
      };
      observer?.disconnect();
      observer = new ResizeObserver(fit);
      observer.observe(doc.body);
      fit();
    };

    if (iframe.contentDocument?.readyState === "complete") attach();
    iframe.addEventListener("load", attach);
    return () => {
      iframe.removeEventListener("load", attach);
      observer?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src="/dotmap.html"
      className="dotmap-frame"
      title="Animated dot map of an agent searching a personal corpus, with short previews on one side and 500-character previews on the other"
      loading="lazy"
    />
  );
}
