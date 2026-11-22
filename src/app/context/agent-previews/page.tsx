import type { Metadata } from "next";
import Link from "next/link";
import DotMapEmbed from "../../components/DotMapEmbed";
import { CoverageDots, CoverageTimeScatter, OpenPrecisionBars } from "../../components/PreviewCharts";
import { Posts } from "../posts";

const post = Posts.find((p) => p.slug === "agent-previews")!;
const url = `https://hamzaammar.ca/context/${post.slug}`;

export const metadata: Metadata = {
  title: `${post.title} · Hamza Ammar`,
  description: post.description,
  alternates: { canonical: url },
  openGraph: {
    title: post.title,
    description: post.description,
    url,
    siteName: "Hamza Ammar",
    images: [{ url: "/HA.jpg", width: 1200, height: 630, alt: "Hamza Ammar" }],
    locale: "en_US",
    type: "article",
    publishedTime: "2026-11-21",
    authors: ["Hamza Ammar"],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: ["/HA.jpg"],
    creator: "@hamzakammar",
  },
};

export default function AgentPreviewsPost() {
  return (
    <div className="ctx-page">
      <div className="ctx-progress" aria-hidden />
      <nav className="ctx-nav">
        <Link href="/context">&larr; Context</Link>
        <Link href="/" className="ctx-brand">hamzaammar.ca</Link>
      </nav>

      <article>
        <header>
          <div className="ctx-kicker">
            <span className="ctx-dot" aria-hidden />
            <time dateTime={post.dateTime}>{post.date}</time>
            <span className="ctx-sep" aria-hidden>/</span>
            <span>Agents</span>
          </div>
          <h1 className="ctx-title">{post.title}</h1>
          <p className="ctx-byline">Hamza Ammar</p>
        </header>

        <div className="ctx-prose">
          <section className="ctx-tldr">
          <h2>tl;dr</h2>
          <p>
            I think personal agents are the future of interacting with AI. But the more they can do for you, the more of your life they need access to. Email, notes, docs, code, old chats. Once that pile gets big enough, the question stops being whether the agent can find the answer. It becomes how much it wastes getting there.
          </p>
          <p>
            So I tested this on my own data, about 3 billion tokens across 119k files. Across what I tested, the search method didn’t change coverage much. The agents usually got to the answer eventually. The difference was how efficiently they got there.
          </p>
          <p>
            <strong>In this setup, 500-character document previews cut wasted file opens by 24% and saved about 1 turn per question, for about 11% more cost.</strong>
          </p>
          </section>

          <figure className="ctx-wide">
            <DotMapEmbed />
          </figure>

          <h2>Definitions</h2>
          <ul className="ctx-defs">
            <li><strong>Preview:</strong> the snippet the agent sees in search results before deciding whether to open a file.</li>
            <li><strong>Open:</strong> reading the whole file.</li>
            <li><strong>Wasted open:</strong> opening a file that didn’t help answer the question.</li>
            <li><strong>Open precision:</strong> the share of opened files that were relevant.</li>
            <li><strong>Turn:</strong> one step where the agent thinks or calls a tool.</li>
            <li><strong>Coverage:</strong> how many expected facts made it into the answer. This is what I used to measure accuracy, not a check that the entire answer was correct.</li>
            <li><strong>Grep:</strong> plain text search through files. This is how coding agents navigate currently.</li>
          </ul>

          <h2><span className="ctx-num">01</span>Predicting the agent</h2>
          <p>
            I started by trying to predict what the agent would do next, so I could give it the right tools without it spending too long deciding.
          </p>
          <p>
            First I built tool bundles, basically groups of tools for a common task or intent. Then I added a small scout model to plan the main model’s first step. I also tried switching models between turns. All three failed the rules I’d written down before testing.
          </p>
          <p>
            The problem is that models don’t agree with themselves. Give an agent the same question again and it’ll chase different leads and call different tools, then often end up with the same answer anyway. It repeated its path less than half the time. That makes the changing path hard to predict.
          </p>

          <h2><span className="ctx-num">02</span>Search vs grep</h2>
          <p>
            Next I looked at the search methods themselves. I compared 4 methods on 97 questions: plain grep, keyword search returning full chunks, keyword search returning 200-character previews, and those same previews with dates so the agent could see what was newest.
          </p>
          <p>
            They all ended up around 97% coverage. Again, the agents were usually capable enough to get the expected facts regardless of the method. But the questions were also a bit too easy. For 42% of them, keyword searching the question’s own words put the right document first.
          </p>
          <p>
            Time and cost were where things changed. Full chunks were fastest at 22.7 seconds, but dumping all that text into context made them cost around 50% more. Grep was slowest at around 37.8 seconds. The 200-character previews had the fewest errors.
          </p>
          <p>
            For the fourth method, I thought dates would help the agent get to the right, most recent answer in fewer turns. My prediction was at least 15% faster than grep at the same coverage. It passed the coverage, cost and error checks, but missed the speed bar: 34.9 s against a 32.1 s target (15% under grep’s 37.8 s). So I reported it as a failure.
          </p>

          <CoverageTimeScatter />

          <p>
            The main pattern was pretty simple. Time followed how many turns the agent took. Cost followed how much text piled up in its context.
          </p>

          <h2><span className="ctx-num">03</span>Picking a method per question</h2>
          <p>
            Since nothing won outright, I went back to prediction. What if I could pick the best method for each question before the agent started?
          </p>
          <p>
            A perfect picker would’ve saved about 21 to 24% of the cost. But the classifiers I built only saw the question, and they did worse than just sticking with one method.
          </p>
          <p>
            At that point I stopped trying to predict the agent. There was a best choice, but I couldn’t reliably pick it before the agent started searching. So instead of guessing where it would go, I looked at what it sees when it searches.
          </p>

          <h2><span className="ctx-num">04</span>The preview study</h2>
          <p className="ctx-lead">What should an agent see before it opens a file?</p>
          <p>
            The earlier questions were too easy, so I built 80 new ones where keyword searching the question’s own words never put the answer in the top 10. They covered the kinds of things you’d ask a personal agent: what’s the latest on something, questions needing two or three sources, lists and counts, answers buried in long files, specific time windows, and questions with no answer at all.
          </p>
          <p>
            An independent check rejected 21 of the 104 questions the generator made. I used 80 of the 83 questions that were left, and I spot-checked 15 myself.
          </p>
          <p>
            Then I tested 7 ways to show search results. Same engine, same tools. Only the preview changed.
          </p>
          <ul className="ctx-methods">
            <li>Grep without a preview</li>
            <li>File path and title only</li>
            <li>200-character preview</li>
            <li>500-character preview</li>
            <li>Metadata card with source, date, etc. and 200 characters</li>
            <li>One-line summary</li>
            <li>200 characters plus dates for recency</li>
          </ul>
          <p>
            Some methods overlapped with the previous experiment, which was already partly testing previews. But I needed to try them again on the harder questions. I ran each of the 80 questions on all 7 methods, with 3 runs per question-method pair to check for flukes. 1,680 runs total.
          </p>
          <p>A couple things stood out.</p>
          <p>
            First, hard for search didn’t mean hard for the agent. These questions were built so the question’s own words wouldn’t get the answer into the top 10. The agent still found it by rewriting searches and opening files until it had what it needed. Every method got every buried-answer question right, and all 7 were within 5 points of each other on coverage overall.
          </p>
          <p>
            Second, the agent rarely took the same route twice, but usually ended up in the same place. It gave the same answer 83 to 94% of the time. The first file it opened only matched 41 to 55% of the time.
          </p>
          <p>
            The main result was the 500-character preview. It was the only method that clearly beat the baseline on choosing relevant files. 60% of the files it opened were relevant, compared with 51% for 200 characters.
          </p>
          <p>
            That worked out to 24% fewer wasted opens and about 1 fewer turn per question, for about 11% more cost. It wasn’t faster though. The extra text cancelled out the turn it saved, at 25.3 vs 25.8 seconds median. Path-only previews were worst, with about 1 extra file opened per question because the agent had nothing to go on.
          </p>

          <OpenPrecisionBars />
          <CoverageDots />

          <p>
            In this setup, 500-character previews reduced wasted opens by 24%, for about 11% more cost. Coverage stayed within 5 points of the baseline, and median time was about the same. That’s a useful tradeoff if you’re trying to cut unnecessary file reads, not evidence that 500 characters is best for every personal agent.
          </p>

          <h2><span className="ctx-num">05</span>Limitations</h2>
          <p>
            This is still just my data, one model and one harness. I want to try more data and more models before assuming it generalizes.
          </p>
          <p>
            Speed was also a tie all around, and I ran these on my subscription rather than the API. Local file reads were almost free in terms of time. In a real personal agent, those reads would be much slower API calls.
          </p>

          <h2><span className="ctx-num">06</span>What’s next</h2>
          <ul>
            <li><strong>Tiered previews.</strong> Longer ones for the top hits, shorter ones for the rest, to keep the savings at lower cost.</li>
            <li><strong>Corpus maps.</strong> Give the agent a summarized map of the files before it starts.</li>
            <li>More models and agents, and testing inside real personal agents like Grok Bot.</li>
            <li>A public benchmark other people can run.</li>
          </ul>

          <details className="ctx-details">
            <summary>
              How I tested
              <span className="ctx-chev" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
              </span>
            </summary>
            <ul>
              <li><strong>Corpus:</strong> my own data, frozen as a read-only snapshot. About 3B tokens and 119k files across code, email, Drive, Notion and AI chat logs. Secrets were redacted. Financial, medical and credential content was excluded. About 82% of the tokens came from two large third-party repos, kept as realistic clutter.</li>
              <li><strong>Agent:</strong> Claude Code running Opus 5.5 at high effort.</li>
              <li>Rules for each test were written and committed to git before any run.</li>
              <li>Questions were checked independently. A fresh AI judge graded answers blind, without knowing the method. I also spot-checked the reference answers.</li>
              <li>Replaying the same agent on the same question produced the same tool path 36 to 48% of the time.</li>
              <li>Only question types are published. No real questions, answers, file names or transcripts.</li>
            </ul>
          </details>
        </div>
      </article>

      <footer className="ctx-footer">
        <Link href="/context">&larr; All posts</Link>
        <Link href="/">hamzaammar.ca &rarr;</Link>
      </footer>
    </div>
  );
}
