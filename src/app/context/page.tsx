import type { Metadata } from "next";
import Link from "next/link";
import { Posts } from "./posts";

const description = "Writing by Hamza Ammar";

export const metadata: Metadata = {
  title: "Context · Hamza Ammar",
  description,
  alternates: { canonical: "https://www.hamzaammar.ca/context" },
  openGraph: {
    title: "Context · Hamza Ammar",
    description,
    url: "https://www.hamzaammar.ca/context",
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
      <header className="ctx-head">
        <Link href="/" className="ctx-crumb">&larr; hamzaammar.ca</Link>
        <h1 className="ctx-title">context</h1>
        <p className="ctx-index-intro">{description}.</p>
      </header>

      <div className="ctx-list">
        {Posts.map((post) => (
          <Link key={post.slug} href={`/context/${post.slug}`} className="ctx-row">
            <span className="ctx-row-title">{post.title}</span>
            <time className="ctx-row-date" dateTime={post.dateTime}>{post.date}</time>
            <span className="ctx-row-desc">{post.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
