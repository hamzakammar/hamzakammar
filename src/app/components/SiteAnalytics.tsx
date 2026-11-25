"use client";

import { useEffect } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Blog share links carry ?r=<code> (see scripts/ref-link.mts). Vercel drops query strings,
// so the code is folded into the recorded path, then removed from the address bar so it
// isn't bookmarked or forwarded.
const CODE = /^[a-z0-9]{1,8}$/;

function refCode(url: URL) {
  const code = url.searchParams.get("r");
  return url.pathname.startsWith("/context/") && code && CODE.test(code) ? code : null;
}

function stripRef() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("r")) return;
  url.searchParams.delete("r");
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent {
  const url = new URL(event.url);
  const code = refCode(url);
  if (!code) return event;
  url.searchParams.delete("r");
  setTimeout(stripRef, 0);
  return { ...event, url: `${url.origin}${url.pathname}/r/${code}${url.search}` };
}

export default function SiteAnalytics() {
  // If the analytics script is blocked, beforeSend never runs; still clean the address bar.
  useEffect(() => {
    if (!refCode(new URL(window.location.href))) return;
    const t = setTimeout(stripRef, 4000);
    return () => clearTimeout(t);
  }, []);

  return <Analytics beforeSend={beforeSend} />;
}
