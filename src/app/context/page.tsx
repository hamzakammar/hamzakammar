import type { Metadata } from "next";
import Link from "next/link";
import { Posts } from "./posts";

const description = "Writing by Hamza Ammar";

export const metadata: Metadata = {
  title: "Context · Hamza Ammar",
  description,
  alternates: { canonical: "https://hamzaammar.ca/context" },
  openGraph: {
    title: "Context · Hamza Ammar",
    description,
    url: "https://hamzaammar.ca/context",
    siteName: "Hamza Ammar",
    images: [{ url: "/HA.jpg", width: 1200, height: 630, alt: "Hamza Ammar" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Context · Hamza Ammar",
    description,
    images: ["/HA.jpg"],
    creator: "@hamzakammar",
  },
};

export default function ContextIndex() {
  return (
    <div className="ctx-page">
      <nav className="ctx-nav">
        <Link href="/">&larr; hamzaammar.ca</Link>
      </nav>

      <header>
        <div className="ctx-kicker">
          <span className="ctx-dot" aria-hidden />
          <span>Writing</span>
        </div>
        <h1 className="ctx-title">Context</h1>
        <p className="ctx-index-intro">{description}.</p>
      </header>

      {Posts.map((post) => (
        <Link key={post.slug} href={`/context/${post.slug}`} className="ctx-post-card">
          <div className="ctx-post-meta">
            <time dateTime={post.dateTime}>{post.date}</time>
          </div>
          <h2 className="ctx-post-title">{post.title}</h2>
          <p className="ctx-post-desc">{post.description}</p>
          <span className="ctx-post-read">Read <span aria-hidden>&rarr;</span></span>
        </Link>
      ))}
    </div>
  );
}
