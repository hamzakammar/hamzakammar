'use client';

import { use } from 'react';
import Link from 'next/link';
import { getStoryById } from '../index';
import { Projects } from '@/app/data/projects';

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export default function StoryPage({ params }: StoryPageProps) {
  const { id } = use(params);
  const story = getStoryById(id);
  const project = Projects.find(p => p.id === id);

  if (!story) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-[var(--accent)] hover:opacity-80 text-sm">
            ← Back to City
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
        <p className="text-[var(--muted)]">The story you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-[var(--accent)] hover:opacity-80 text-sm mb-6 transition-colors"
          >
            ← Back to City
          </Link>
          
          {project && (
            <div className="mt-4">
              <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
                {project.title}
              </h1>
              {project.role && (
                <div className="text-sm text-[var(--accent)] uppercase tracking-wider mb-4">
                  {project.role}
                </div>
              )}
              <div className="text-sm text-[var(--muted)] mb-6">
                {project.stack.join(' · ')}
              </div>
            </div>
          )}
        </div>

        {/* Story Content */}
        <article className="prose prose-invert prose-sm max-w-none">
          <div 
            className="story-content"
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "var(--foreground)",
              whiteSpace: "pre-wrap",
            }}
          >
            {story.split('\n').map((paragraph, idx) => {
              // Handle markdown-style headers
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={idx} className="text-3xl font-black uppercase tracking-tight mt-12 mb-4 first:mt-0">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold uppercase tracking-tight mt-10 mb-3">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold uppercase tracking-tight mt-8 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              // Regular paragraph
              if (paragraph.trim()) {
                return (
                  <p key={idx} className="mb-4 opacity-90">
                    {paragraph}
                  </p>
                );
              }
              // Empty line
              return <br key={idx} />;
            })}
          </div>
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--panel-border)]">
          <Link 
            href="/" 
            className="inline-flex items-center text-[var(--accent)] hover:opacity-80 text-sm transition-colors"
          >
            ← Back to City
          </Link>
        </div>
      </div>
    </div>
  );
}
