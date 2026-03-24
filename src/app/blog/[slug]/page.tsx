import fs from "fs";
import path from "path";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════
   /blog/[slug] — Individual blog post renderer
   ═══════════════════════════════════════════════════════ */

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Parse simple frontmatter from markdown string
function parseFrontmatter(content: string): { data: Record<string, string>; body: string } {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { data: {}, body: content };
  const data: Record<string, string> = {};
  fmMatch[1].split("\n").forEach((line) => {
    const [key, ...val] = line.split(": ");
    if (key && val.length) data[key.trim()] = val.join(": ").trim().replace(/^["']|["']$/g, "");
  });
  return { data, body: fmMatch[2] };
}

// Very minimal markdown → HTML (headings, paragraphs, bold, inline code, figures passthrough)
function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inFigure = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Pass through raw HTML (figures, video, img tags)
    if (line.trim().startsWith("<figure") || inFigure) {
      inFigure = !line.includes("</figure>");
      html.push(line);
      continue;
    }
    if (line.trim().startsWith("<img") || line.trim().startsWith("<video")) {
      html.push(line);
      continue;
    }

    if (line.startsWith("## ")) {
      html.push(`<h2 class="blog-h2">${line.slice(3)}</h2>`);
    } else if (line.startsWith("# ")) {
      html.push(`<h1 class="blog-h1">${line.slice(2)}</h1>`);
    } else if (line.trim() === "") {
      html.push("<br/>");
    } else {
      const processed = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "<code class=\"blog-code\">$1</code>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="blog-link">$1</a>');
      html.push(`<p class="blog-p">${processed}</p>`);
    }
  }
  return html.join("\n");
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(".md", "") }));
}

export default async function BlogPost({ params }: BlogPageProps) {
  const { slug } = await params;
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="blog-container">
        <div className="blog-not-found">
          <p>Post not found.</p>
          <Link href="/" className="blog-back-link">&larr; Back</Link>
        </div>
      </div>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, body } = parseFrontmatter(raw);
  const htmlContent = renderMarkdown(body);

  return (
    <div className="blog-container">
      <nav className="blog-nav">
        <Link href="/" className="blog-back-link">&larr; hamzaammar.ca</Link>
      </nav>

      <article className="blog-article">
        <header className="blog-header">
          {data.date && <time className="blog-meta-date">{data.date}</time>}
          {data.title && <h1 className="blog-post-title">{data.title}</h1>}
          {data.description && <p className="blog-post-desc">{data.description}</p>}
          <div className="blog-divider" />
        </header>

        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      <footer className="blog-footer">
        <Link href="/" className="blog-back-link">&larr; Back to portfolio</Link>
      </footer>
    </div>
  );
}
