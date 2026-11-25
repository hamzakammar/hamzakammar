import type { Metadata } from "next";
import Link from "next/link";
import DotMapEmbed from "../../components/DotMapEmbed";
import PostToc from "../../components/PostToc";
import { CoverageAcrossSetups, CoverageDots, CoverageTimeScatter, OpenPrecisionBars } from "../../components/PreviewCharts";
import { Posts } from "../posts";

const post = Posts.find((p) => p.slug === "agent-previews")!;
const url = `https://www.hamzaammar.ca/context/${post.slug}`;

const toc = [
  { id: "tldr", label: "tl;dr" },
  { id: "definitions", label: "Definitions" },
  { id: "methods", label: "Methods" },
  { id: "results", label: "Results" },
  { id: "real-agent", label: "Does it hold in a real personal agent?" },
  { id: "limitations", label: "Limitations" },
  { id: "conclusion", label: "Conclusion and future work" },
  { id: "appendix", label: "Appendix: How I got here" },
  { id: "predicting-the-agent", label: "Predicting the agent", sub: true },
  { id: "search-vs-grep", label: "Search vs grep", sub: true },
  { id: "picking-a-method", label: "Picking a method per question", sub: true },
];

export const metadata: Metadata = {
  title: `${post.title} · Hamza Ammar`,
  description: post.description,
  alternates: { canonical: url },
  openGraph: {
    title: post.title,
    description: post.description,
    url,
    siteName: "Hamza Ammar",
    images: [{ url: "/og/agent-previews-dotmap.png", width: 1200, height: 630, alt: "Dot map of an agent searching with short previews and with 500-character previews" }],
    locale: "en_US",
    type: "article",
    publishedTime: "2026-11-23",
    authors: ["Hamza Ammar"],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: ["/og/agent-previews-dotmap.png"],
    creator: "@hamzakammar",
  },
};

export default function AgentPreviewsPost() {
  return (
    <div className="ctx-page">
      <PostToc items={toc} />

      <article>
        <header className="ctx-head">
          <Link href="/context" className="ctx-crumb">&larr; context</Link>
          <h1 className="ctx-title">{post.title}</h1>
          <p className="ctx-meta">
            <time dateTime={post.dateTime}>{post.date}</time> · Updated Nov 24 · 9 min read
          </p>
        </header>

        <div className="ctx-prose">
          <section className="ctx-tldr">
            <h2 id="tldr">tl;dr</h2>
            <p>
              Personal agents are the future of AI interactions. But the more they can do for you, the more of your life they need access to. Email, notes, docs, code, old chats. Once that pile gets big enough, the question stops being whether the agent can find the answer. It becomes how much it wastes getting there.
            </p>
            <p>
              So I tested this on a mixed corpus of 119k files: my own code, email, Drive, Notion and AI chat logs, plus two large third-party repos that make up most of it. I didn’t detect a coverage difference from preview length. The agents usually got to the answer eventually. The difference was how efficiently they got there.
            </p>
            <p>
              In Claude Code, 500-character document previews <mark>cut wasted file opens by 24%</mark> and saved about 1 turn per question, with coverage within 5 points, across 1,680 runs. Median runtime stayed roughly the same (25.3 s vs 25.8 s with 200 characters), and cost was about 11% higher. I also ran the same test inside a real personal agent, Amuse, on two more models, and didn’t detect a coverage difference there either.
            </p>
          </section>

          <details className="ctx-details ctx-defs-block" id="definitions">
            <summary>
              Definitions
              <span className="ctx-summary-hint" aria-hidden>Preview, Open, Wasted open, Open precision, Turn, Coverage, Grep, Measurable change</span>
            </summary>
            <ul className="ctx-defs">
              <li tabIndex={0}><strong>Preview<span className="ctx-colon">:</span></strong> <span>the snippet the agent sees in search results before deciding whether to open a file.</span></li>
              <li tabIndex={0}><strong>Open<span className="ctx-colon">:</span></strong> <span>reading the whole file.</span></li>
              <li tabIndex={0}><strong>Wasted open<span className="ctx-colon">:</span></strong> <span>opening a file that didn’t help answer the question.</span></li>
              <li tabIndex={0}><strong>Open precision<span className="ctx-colon">:</span></strong> <span>the share of opened files that were relevant.</span></li>
              <li tabIndex={0}><strong>Turn<span className="ctx-colon">:</span></strong> <span>one step where the agent thinks or calls a tool.</span></li>
              <li tabIndex={0}><strong>Coverage<span className="ctx-colon">:</span></strong> <span>how many expected facts made it into the answer. This is what I used to measure accuracy, not a check that the entire answer was correct.</span></li>
              <li tabIndex={0}><strong>Grep<span className="ctx-colon">:</span></strong> <span>plain text search through files. This is how coding agents navigate currently.</span></li>
              <li tabIndex={0}><strong>Measurable change<span className="ctx-colon">:</span></strong> <span>a difference whose 95% confidence interval doesn’t include 0, so the data can tell whether it went up or down.</span></li>
            </ul>
          </details>

          <figure className="ctx-wide">
            <DotMapEmbed />
          </figure>

          <h2 id="methods">Methods</h2>
          <ul>
            <li><strong>Corpus:</strong> a mixed corpus, frozen as a read-only snapshot. About 119k files: my own code, email, Drive, Notion and AI chat logs, plus two large third-party repos. Secrets were redacted. Financial, medical and credential content was excluded. An earlier 100k-file snapshot came to about 3.1B tokens, about 82% of them from the two third-party repos, kept as realistic clutter. It isn’t meant to represent a typical user’s data.</li>
            <li><strong>Agent:</strong> Claude Code running Opus 5.5 at high effort.</li>
            <li><strong>Amuse:</strong> Replit’s open-source local assistant on localhost, with my patch adding MCP client support. gpt-6-luna on both preview lengths (200 and 500 characters) × 80 questions × 2 runs, gpt-6.2-sol on both × 80 × 1. A grep arm was also run but excluded after a tool setup error; a rerun is in progress. Fresh database every run, same blind grading.</li>
            <li>Rules for each test were written and committed to git before any run.</li>
            <li>Questions were checked independently. A fresh AI judge graded answers blind, without knowing the method. I also spot-checked the reference answers.</li>
            <li>Only question types are published. No real questions, answers, file names or transcripts.</li>
          </ul>

          <h3>Preview study setup</h3>
          <p>The goal was to find out what an agent should see before it opens a file.</p>
          <p>
            The questions in my first tests were too easy, so I built 80 new ones where searching the question’s own words never put the answer in the top 10. They covered the kinds of things you’d ask a personal agent: what’s the latest on something, questions needing two or three sources, lists and counts, answers buried in long files, specific time windows, and questions with no answer at all.
          </p>
          <p>
            An independent check rejected 21 of the 104 questions that passed the generator’s own filter. I used 80 of the 83 questions that were left, and I spot-checked 15 myself.
          </p>
          <p>
            Then I tested 7 ways to show search results. Same corpus and harness, and the preview was the main thing that changed: grep had no search engine, and the dates method also got a recent-first option.
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
            Some methods overlapped with the earlier experiment in the appendix, which was already partly testing previews. But I needed to try them again on the harder questions. I ran each of the 80 questions on all 7 methods, with 3 runs per question-method pair to check for flukes. 1,680 runs total.
          </p>

          <h2 id="results">Results</h2>
          <p>
            These questions were built so the question’s own words wouldn’t get the answer into the top 10. The agent still found it by rewriting searches and opening files until it had what it needed. In Claude Code, every method got every buried-answer question right, and all 7 were within 5 points of each other on coverage overall.
          </p>
          <p>
            Across repeat runs, it opened the same first file only 41 to 55% of the time, but gave the same answer 83 to 94% of the time.
          </p>
          <p>
            The main result was the 500-character preview. In Claude Code, it was the only method that clearly beat the baseline on choosing relevant files, though open precision was a secondary measure with no multiple-comparison correction. 60% of the files it opened were relevant, compared with 51% for 200 characters.
          </p>
          <p>
            That worked out to 24% fewer wasted opens and about 1 fewer turn per question, for about 11% more cost. The fewer turns didn’t translate into a lower median runtime: 25.3 s vs 25.8 s (95% CI of the difference -2.3 to +2.5 s). The extra preview text adds tokens to every search result, which may explain it, but I didn’t measure that. Path-only previews were worst, with about 1.3 extra files opened per question, likely because the agent had nothing to go on.
          </p>
          <p>
            In all three setups I ran, including the Amuse runs below, 500 characters meant fewer opens, fewer wasted opens and fewer turns. Wasted opens per run went from 2.06 to 1.57 in Claude Code, and from 0.67 to 0.38 and 0.47 to 0.30 in the two Amuse setups.
          </p>

          <OpenPrecisionBars />
          <CoverageDots />

          <p>
            So the tradeoff is a bit more context per search result in exchange for fewer wasted reads, with coverage and median time about the same. That’s useful if you’re trying to cut unnecessary file reads, not evidence that 500 characters is best for every personal agent.
          </p>

          <h2 id="real-agent">Does it hold in a real personal agent?</h2>
          <p>
            I reran the study inside Amuse, Replit’s open-source local assistant, with a patch that lets it call the same search tools over MCP (<a href="https://github.com/hamzakammar/amuse/tree/mcp-support" target="_blank" rel="noopener noreferrer">fork</a>). Same 80 questions, corpus and tools, pre-registered and blind-graded the same way. I used two models: gpt-6-luna, a cheaper and weaker one, on both preview lengths with 2 runs per question, and gpt-6.2-sol, Amuse’s default, on both preview lengths with 1 run.
          </p>

          <figure className="ctx-table">
            <div className="blog-chart-title">Amuse results, per run</div>
            <div className="ctx-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Coverage</th>
                    <th scope="col">Opens</th>
                    <th scope="col">Wasted opens</th>
                    <th scope="col">Turns</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><th scope="row">luna, 200 characters</th><td>0.390</td><td>1.16</td><td>0.67</td><td>12.37</td></tr>
                  <tr><th scope="row">luna, 500 characters</th><td>0.402</td><td>0.56</td><td>0.38</td><td>11.20</td></tr>
                  <tr><th scope="row">sol, 200 characters</th><td>0.710</td><td>1.30</td><td>0.47</td><td>10.29</td></tr>
                  <tr><th scope="row">sol, 500 characters</th><td>0.729</td><td>0.70</td><td>0.30</td><td>9.14</td></tr>
                </tbody>
              </table>
            </div>
            <figcaption>Luna rows average 2 runs per question. Sol rows are 1 run per question (n=1), so run-to-run variation isn’t averaged out or measured.</figcaption>
          </figure>

          <p>
            I didn’t detect a coverage difference from preview length here either. Going from 200 to 500 characters, coverage went from 0.390 to 0.402 with luna and from 0.710 to 0.729 with sol. For luna, the difference could be anywhere from a small drop to a small gain (95% CI -0.049 to +0.075), so I can’t call it a measurable change. I also can’t call them equal, because the range went past the ±0.05 bound I set beforehand (90% CI up to +0.065). Luna scored about 0.40, far from the ceiling, so the questions being too easy can’t explain why I didn’t detect a difference.
          </p>
          <p>
            In these runs, longer previews still meant less work: with 500 characters, both models opened about 0.60 fewer files per run, wasted fewer opens and took fewer turns. Part of that is more runs opening nothing at all (34% to 59% of runs with luna, 26% to 53% with sol), so some of it may be the agent stopping early rather than choosing better. What didn’t carry over was the open precision gain from Claude Code, where a bigger share of opened files were relevant. With luna that share changed by -0.031, but the 95% CI runs from -0.145 to +0.080, so it could have gone either way. The range is that wide because Amuse only opened 0.56 to 1.30 files per run, so the comparison covers just the 45 questions where both arms opened something, and one file more or less moves the share a lot.
          </p>

          <CoverageAcrossSetups />

          <p>
            Coverage was about 0.95 in Claude Code, 0.72 with sol and 0.40 with luna on the same questions. That’s not a fair head-to-head, since both the model and the harness changed.
          </p>

          <h2 id="limitations">Limitations</h2>
          <p>
            This is three models and two harnesses, still one person’s corpus. Amuse had 2 runs per question with luna and 1 with sol. I want to try more data and more models before assuming it generalizes.
          </p>
          <p>
            In Claude Code, 200 and 500 characters tied on median time (grep and path-only were slower), and I ran those runs on my subscription rather than the API, with files read locally. In a real personal agent, reads would go through API calls, which I didn’t time.
          </p>

          <h2 id="conclusion">Conclusion and future work</h2>
          <ul>
            <li><strong>Tiered previews.</strong> Longer ones for the top hits, shorter ones for the rest, to keep the savings at lower cost.</li>
            <li><strong>Corpus maps.</strong> Give the agent a summarized map of the files before it starts.</li>
            <li>A proper Grok Bot test, with a fresh account and more questions.</li>
            <li>Why accuracy is lower in Amuse: the agent stopping early vs the model’s ability, and whether a budget tracker helps.</li>
            <li>A public benchmark other people can run.</li>
          </ul>

          <h2 id="appendix">Appendix: How I got here</h2>
          <h3 id="predicting-the-agent">Predicting the agent</h3>
          <p>
            I started by trying to predict what the agent would do next, so I could give it the right tools without it spending too long deciding.
          </p>
          <p>
            First I built tool bundles, basically groups of tools for a common task or intent. Then I added a small scout model to plan the main model’s first step. I also tried switching models between turns. All three failed the rules I’d written down before testing.
          </p>
          <p>
            The problem is that models don’t agree with themselves. Give an agent the same question again and it’ll chase different leads and call different tools. In a replay test on MCP-Atlas tasks, Sonnet picked the same tool with equivalent arguments only 36 to 48% of the time per turn. That makes the changing path hard to predict.
          </p>

          <h3 id="search-vs-grep">Search vs grep</h3>
          <p>
            Next I looked at the search methods themselves. I compared 4 methods on 97 questions: plain grep, keyword search returning full chunks, keyword search returning 200-character previews, and those same previews with dates so the agent could see what was newest.
          </p>
          <p>
            They all ended up around 97% coverage. Again, the agents were usually capable enough to get the expected facts regardless of the method. But the questions were also a bit too easy. For 42% of them, keyword searching the question’s own words put the right document first.
          </p>
          <p>
            Time and cost were where things changed. Full chunks were fastest at 22.7 seconds, but dumping all that text into context made them cost around 50% more. Grep was slowest at around 37.8 seconds. The 200-character previews had the fewest errors (0.021 per answer vs 0.031 to 0.052).
          </p>
          <p>
            For the fourth method, I thought dates would help the agent get to the right, most recent answer in fewer turns. My prediction was at least 15% faster than grep at the same coverage. It passed the coverage, cost and error checks, but missed the speed bar: 34.9 s against a 32.1 s target (15% under grep’s 37.8 s). So I reported it as a failure.
          </p>

          <CoverageTimeScatter />

          <p>
            Time mostly followed how many turns the agent took. Cost followed how much text piled up in its context.
          </p>

          <h3 id="picking-a-method">Picking a method per question</h3>
          <p>
            Since nothing won outright, I went back to prediction. What if I could pick the best method for each question before the agent started?
          </p>
          <p>
            A perfect picker would’ve saved about 21 to 24% of the cost. But the classifiers I built only saw the question, and they did worse than just sticking with one method.
          </p>
          <p>
            At that point I stopped trying to predict the agent. There was a best choice, but I couldn’t reliably pick it before the agent started searching. So instead of guessing where it would go, I looked at what it sees when it searches. That became the preview study in <a href="#methods">Methods</a> and <a href="#results">Results</a> above.
          </p>
        </div>
      </article>

      <footer className="ctx-footer">
        <Link href="/context">&larr; all writing</Link>
        <Link href="/">hamzaammar.ca</Link>
      </footer>
    </div>
  );
}
