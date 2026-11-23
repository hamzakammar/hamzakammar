import type { Metadata } from "next";
import Link from "next/link";
import DotMapEmbed from "../../components/DotMapEmbed";
import PostToc from "../../components/PostToc";
import { CoverageAcrossSetups, CoverageDots, CoverageTimeScatter, OpenPrecisionBars } from "../../components/PreviewCharts";
import { Posts } from "../posts";

const post = Posts.find((p) => p.slug === "agent-previews")!;
const url = `https://hamzaammar.ca/context/${post.slug}`;

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
    images: [{ url: "/HA.jpg", width: 1200, height: 630, alt: "Hamza Ammar" }],
    locale: "en_US",
    type: "article",
    publishedTime: "2026-11-23",
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
      <PostToc items={toc} />

      <article>
        <header className="ctx-head">
          <Link href="/context" className="ctx-crumb">&larr; context</Link>
          <h1 className="ctx-title">{post.title}</h1>
          <p className="ctx-meta">
            <time dateTime={post.dateTime}>{post.date}</time> · 9 min read
          </p>
        </header>

        <div className="ctx-prose">
          <section className="ctx-tldr">
            <h2 id="tldr">tl;dr</h2>
            <p>
              Personal agents are the future of AI interactions. But the more they can do for you, the more of your life they need access to. Email, notes, docs, code, old chats. Once that pile gets big enough, the question stops being whether the agent can find the answer. It becomes how much it wastes getting there.
            </p>
            <p>
              So I tested this on my own data, about 3 billion tokens across 119k files. Across what I tested, the search method didn’t change coverage much. The agents usually got to the answer eventually. The difference was how efficiently they got there.
            </p>
            <p>
              In this setup, 500-character document previews <mark>cut wasted file opens by 24%</mark> and saved about 1 turn per question, for about 11% more cost, with coverage within 5 points, across 1,680 runs. I also ran the same test inside a real personal agent, Amuse, on two more models, and preview length didn’t measurably change accuracy there either.
            </p>
          </section>

          <details className="ctx-details ctx-defs-block" id="definitions">
            <summary>
              Definitions
              <span className="ctx-summary-hint" aria-hidden>Preview, Open, Wasted open, Open precision, Turn, Coverage, Grep</span>
            </summary>
            <ul className="ctx-defs">
              <li tabIndex={0}><strong>Preview<span className="ctx-colon">:</span></strong> <span>the snippet the agent sees in search results before deciding whether to open a file.</span></li>
              <li tabIndex={0}><strong>Open<span className="ctx-colon">:</span></strong> <span>reading the whole file.</span></li>
              <li tabIndex={0}><strong>Wasted open<span className="ctx-colon">:</span></strong> <span>opening a file that didn’t help answer the question.</span></li>
              <li tabIndex={0}><strong>Open precision<span className="ctx-colon">:</span></strong> <span>the share of opened files that were relevant.</span></li>
              <li tabIndex={0}><strong>Turn<span className="ctx-colon">:</span></strong> <span>one step where the agent thinks or calls a tool.</span></li>
              <li tabIndex={0}><strong>Coverage<span className="ctx-colon">:</span></strong> <span>how many expected facts made it into the answer. This is what I used to measure accuracy, not a check that the entire answer was correct.</span></li>
              <li tabIndex={0}><strong>Grep<span className="ctx-colon">:</span></strong> <span>plain text search through files. This is how coding agents navigate currently.</span></li>
            </ul>
          </details>

          <figure className="ctx-wide">
            <DotMapEmbed />
          </figure>

          <h2 id="methods">Methods</h2>
          <ul>
            <li><strong>Corpus:</strong> my own data, frozen as a read-only snapshot. About 3B tokens and 119k files across code, email, Drive, Notion and AI chat logs. Secrets were redacted. Financial, medical and credential content was excluded. About 82% of the tokens came from two large third-party repos, kept as realistic clutter.</li>
            <li><strong>Agent:</strong> Claude Code running Opus 5.5 at high effort.</li>
            <li><strong>Amuse:</strong> Replit’s open-source local assistant on localhost, with my patch adding MCP client support. gpt-6-luna on 3 methods × 80 questions × 2 runs, gpt-6.2-sol on 2 methods × 80 × 1. Fresh database every run, same blind grading. $9.45 total.</li>
            <li>Rules for each test were written and committed to git before any run.</li>
            <li>Questions were checked independently. A fresh AI judge graded answers blind, without knowing the method. I also spot-checked the reference answers.</li>
            <li>Replaying the same agent on the same question produced the same tool path 36 to 48% of the time.</li>
            <li>Only question types are published. No real questions, answers, file names or transcripts.</li>
          </ul>

          <h3>Preview study setup</h3>
          <p>The goal was to find out what an agent should see before it opens a file.</p>
          <p>
            The questions in my first tests were too easy, so I built 80 new ones where searching the question’s own words never put the answer in the top 10. They covered the kinds of things you’d ask a personal agent: what’s the latest on something, questions needing two or three sources, lists and counts, answers buried in long files, specific time windows, and questions with no answer at all.
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
            Some methods overlapped with the earlier experiment in the appendix, which was already partly testing previews. But I needed to try them again on the harder questions. I ran each of the 80 questions on all 7 methods, with 3 runs per question-method pair to check for flukes. 1,680 runs total.
          </p>

          <h2 id="results">Results</h2>
          <p>
            Hard for search didn’t mean hard for the agent. These questions were built so the question’s own words wouldn’t get the answer into the top 10. The agent still found it by rewriting searches and opening files until it had what it needed. In Claude Code, every method got every buried-answer question right, and all 7 were within 5 points of each other on coverage overall.
          </p>
          <p>
            Across repeat runs, it opened the same first file only 41 to 55% of the time, but gave the same answer 83 to 94% of the time.
          </p>
          <p>
            The main result was the 500-character preview. In Claude Code, it was the only method that clearly beat the baseline on choosing relevant files. 60% of the files it opened were relevant, compared with 51% for 200 characters.
          </p>
          <p>
            That worked out to 24% fewer wasted opens and about 1 fewer turn per question, for about 11% more cost. It wasn’t faster though. The extra text cancelled out the turn it saved, at 25.3 vs 25.8 seconds median. Path-only previews were worst, with about 1 extra file opened per question because the agent had nothing to go on.
          </p>
          <p>
            What held in every setup, including the Amuse runs below, was fewer opens, fewer wasted opens and fewer turns with 500 characters. Wasted opens per run went from 2.06 to 1.57 in Claude Code, and from 0.67 to 0.38 and 0.47 to 0.30 in the two Amuse setups.
          </p>

          <OpenPrecisionBars />
          <CoverageDots />

          <p>
            So the tradeoff is a bit more context per search result in exchange for fewer wasted reads, with coverage and median time about the same. That’s useful if you’re trying to cut unnecessary file reads, not evidence that 500 characters is best for every personal agent.
          </p>

          <h2 id="real-agent">Does it hold in a real personal agent?</h2>
          <p>
            I reran the study inside Amuse, Replit’s open-source local assistant, on localhost. I added optional MCP client support so it could call the same search tools (<a href="https://github.com/hamzakammar/amuse/tree/mcp-support" target="_blank" rel="noopener noreferrer">fork</a>). Same 80 hard questions, same corpus, same tool code, and a fresh Amuse database every run. The tests were pre-registered and blind-graded the same way.
          </p>
          <p>
            I ran gpt-6-luna, a cheaper and weaker model, on 200-character previews, 500-character previews and grep, with 2 runs per question (480 runs). I ran gpt-6.2-sol, Amuse’s default, on the two preview lengths with 1 run per question (160 runs). Total cost was $9.45.
          </p>

          <figure className="ctx-table">
            <div className="blog-chart-title">Amuse results by model and method</div>
            <div className="ctx-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col" rowSpan={2}></th>
                    <th scope="colgroup" colSpan={3}>gpt-6-luna</th>
                    <th scope="colgroup" colSpan={2}>gpt-6.2-sol</th>
                  </tr>
                  <tr>
                    <th scope="col">200</th>
                    <th scope="col" className="col-w500">500</th>
                    <th scope="col">grep</th>
                    <th scope="col">200</th>
                    <th scope="col" className="col-w500">500</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Coverage</th><td>0.390</td><td>0.402</td><td>0.212</td><td>0.710</td><td>0.729</td></tr>
                  <tr><th scope="row">Open precision</th><td>0.393</td><td>0.312</td><td>0.302</td><td>0.624</td><td>0.561</td></tr>
                  <tr><th scope="row">Wasted opens per run</th><td>0.67</td><td>0.38</td><td>0.73</td><td>0.47</td><td>0.30</td></tr>
                  <tr><th scope="row">Turns (model calls)</th><td>12.37</td><td>11.20</td><td>10.08</td><td>10.29</td><td>9.14</td></tr>
                  <tr><th scope="row">Tool calls</th><td>5.63</td><td>4.96</td><td>5.10</td><td>5.75</td><td>4.72</td></tr>
                  <tr><th scope="row">Cost per run</th><td>$0.0026</td><td>$0.0036</td><td>$0.0028</td><td>$0.0466</td><td>$0.0458</td></tr>
                  <tr><th scope="row">Median wall time</th><td>15.9 s</td><td>13.9 s</td><td>40.2 s</td><td>14.4 s</td><td>12.8 s</td></tr>
                </tbody>
              </table>
            </div>
            <figcaption>Open precision only counts runs that opened a file. The differences in the text are paired over questions where both arms opened one, so they don’t equal these columns subtracted.</figcaption>
          </figure>

          <p>
            Accuracy didn’t measurably move with preview length in any of the 3 setups: 500 characters vs 200 was +0.014 coverage in Claude Code, +0.013 with luna and +0.019 with sol. For luna, the 95% CI (-0.049 to +0.075) includes 0, but the 90% CI (-0.039 to +0.065) runs past the pre-registered 0.05 bound, so equivalence wasn’t shown either. Sol, with 1 run and descriptive only, had a 90% CI of -0.052 to +0.090. Luna scored about 0.40, far from the ceiling, so “the questions were too easy” can’t explain it.
          </p>
          <p>
            Two luna 500-character runs hit the 128,000-token output limit and scored 0. Without them, the luna difference is +0.025 (90% CI -0.029 to +0.081), still not shown.
          </p>
          <p>
            The precision gain didn’t transfer. With luna, 500 characters vs 200 was -0.031 on open precision (95% CI -0.145 to +0.080, over the 45 questions where both arms opened a file), so the pre-registered improvement wasn’t confirmed. Sol was -0.039 (95% CI -0.150 to +0.064). With 0.56 to 1.30 opens per run in Amuse, the precision number is unstable. What did show up: with 500 characters, both Amuse models opened about 0.60 fewer files per run (luna 1.16 to 0.56, 95% CI -0.78 to -0.43; sol 1.30 to 0.70, 95% CI -0.85 to -0.35). They also more often got at least half the expected facts without opening a relevant file: 0.206 to 0.338 of runs with luna, 0.325 to 0.562 with sol.
          </p>
          <p>
            Grep collapsed with luna: -0.177 coverage vs 200-character previews (90% CI -0.254 to -0.101), 0.000 on buried-answer questions, and about 40 s per run vs about 15 s. In Claude Code, grep tied (0.958 vs 0.945).
          </p>

          <CoverageAcrossSetups />

          <p>
            On the same questions and tools, coverage was about 0.95 in Claude Code, 0.72 with sol and 0.40 with luna. That comparison is descriptive, since the model and harness both differ.
          </p>

          <h2 id="limitations">Limitations</h2>
          <p>
            This is three models and two harnesses, still one person’s data. Amuse had 2 runs per question with luna and 1 with sol. I want to try more data and more models before assuming it generalizes.
          </p>
          <p>
            In Claude Code, speed was also a tie all around, and I ran those runs on my subscription rather than the API. Local file reads were almost free in terms of time. In a real personal agent, those reads would be much slower API calls.
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
            The problem is that models don’t agree with themselves. Give an agent the same question again and it’ll chase different leads and call different tools, then often end up with the same answer anyway. It repeated its path less than half the time. That makes the changing path hard to predict.
          </p>

          <h3 id="search-vs-grep">Search vs grep</h3>
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
            Time followed how many turns the agent took. Cost followed how much text piled up in its context.
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
