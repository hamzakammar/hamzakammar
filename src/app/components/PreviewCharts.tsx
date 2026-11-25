"use client";

import { useEffect, useId, useRef, useState } from "react";

// Charts render at the container's pixel width so text stays a constant size on phones and desktops.
function useWidth(initial: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

const scale = (d0: number, d1: number, r0: number, r1: number) => (v: number) =>
  r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

function range(start: number, stop: number, step: number) {
  const out: number[] = [];
  for (let i = 0; start + i * step <= stop + 1e-9; i++) out.push(+(start + i * step).toFixed(4));
  return out;
}

// Rounded at the data end, square at the baseline.
function barPath(x0: number, x1: number, y: number, h: number, r = 4) {
  const rr = Math.min(r, (x1 - x0) / 2, h / 2);
  return `M${x0},${y}H${x1 - rr}A${rr},${rr} 0 0 1 ${x1},${y + rr}V${y + h - rr}A${rr},${rr} 0 0 1 ${x1 - rr},${y + h}H${x0}Z`;
}

function ChartFigure({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="blog-chart">
      <div className="blog-chart-title">{title}</div>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

type Placement = { lines: string[]; anchor: "start" | "middle" | "end"; dx: number; dy: number };

// Narrow placements wrap labels onto two lines so they clear each other's dots at phone widths.
const scatterData: { label: string; time: number; coverage: number; wide: Placement; narrow: Placement }[] = [
  {
    label: "grep", time: 37.8, coverage: 0.966,
    wide: { lines: ["grep"], anchor: "middle", dx: 0, dy: 20 },
    narrow: { lines: ["grep"], anchor: "middle", dx: 0, dy: 20 },
  },
  {
    label: "full chunks", time: 22.7, coverage: 0.979,
    wide: { lines: ["full chunks"], anchor: "start", dx: 10, dy: 4 },
    narrow: { lines: ["full chunks"], anchor: "start", dx: -6, dy: -12 },
  },
  {
    label: "200-character previews", time: 28.6, coverage: 0.973,
    wide: { lines: ["200-character previews"], anchor: "middle", dx: 0, dy: 20 },
    narrow: { lines: ["200-character", "previews"], anchor: "middle", dx: 0, dy: 20 },
  },
  {
    label: "previews plus dates", time: 34.9, coverage: 0.978,
    wide: { lines: ["previews plus dates"], anchor: "middle", dx: 0, dy: -11 },
    narrow: { lines: ["previews", "plus dates"], anchor: "middle", dx: 0, dy: -24 },
  },
];

export function CoverageTimeScatter() {
  const [ref, w] = useWidth(640);
  const id = useId();
  const narrow = w < 480;
  const h = narrow ? 300 : 320;
  const m = { top: 28, right: 20, bottom: 44, left: 48 };
  const x = scale(20, 40, m.left, w - m.right);
  const y = scale(0.9, 1.0, h - m.bottom, m.top);
  const xTicks = range(20, 40, 5);
  const yTicks = range(0.9, 1.0, 0.02);

  return (
    <ChartFigure title="Coverage vs mean wall time">
      <div ref={ref} className="blog-chart-canvas">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}t ${id}d`}>
          <title id={`${id}t`}>Coverage vs mean wall time for four search methods</title>
          <desc id={`${id}d`}>
            Scatter plot. X axis is mean wall time in seconds, Y axis is coverage from 0.90 to 1.00.
            {scatterData.map((p) => ` ${p.label}: ${p.time} s, coverage ${p.coverage.toFixed(3)}.`).join("")}
          </desc>
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line className="chart-grid" x1={m.left} x2={w - m.right} y1={y(t)} y2={y(t)} />
              <text className="chart-tick" x={m.left - 8} y={y(t)} dy="0.32em" textAnchor="end">{t.toFixed(2)}</text>
            </g>
          ))}
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line className="chart-grid" x1={x(t)} x2={x(t)} y1={m.top} y2={h - m.bottom} />
              <text className="chart-tick" x={x(t)} y={h - m.bottom + 18} textAnchor="middle">{t}</text>
            </g>
          ))}
          <text className="chart-axis-label" x={0} y={12}>coverage</text>
          <text className="chart-axis-label" x={(m.left + w - m.right) / 2} y={h - 6} textAnchor="middle">
            mean wall time (s)
          </text>
          {scatterData.map((p) => (
            <g key={p.label}>
              <title>{`${p.label}: ${p.time} s, coverage ${p.coverage.toFixed(3)}`}</title>
              <circle className="chart-hit" cx={x(p.time)} cy={y(p.coverage)} r={14} />
              <circle className="chart-dot" cx={x(p.time)} cy={y(p.coverage)} r={5.5} />
              {(narrow ? [p.narrow] : [p.wide]).map((pl) => (
                <text key="l" className="chart-label" x={x(p.time) + pl.dx} y={y(p.coverage) + pl.dy} textAnchor={pl.anchor}>
                  {pl.lines.map((line, i) => (
                    <tspan key={line} x={x(p.time) + pl.dx} dy={i === 0 ? 0 : 13}>{line}</tspan>
                  ))}
                </text>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </ChartFigure>
  );
}

function ValueLabel({ x, y, text, accent, onBand }: { x: number; y: number; text: string; accent?: boolean; onBand?: boolean }) {
  const width = text.length * 6.9 + 6;
  return (
    <g>
      <rect className={onBand ? "chart-value-bg on-band" : "chart-value-bg"} x={x - 3} y={y - 8} width={width} height={16} rx={3} />
      <text className={accent ? "chart-value chart-value-accent" : "chart-value"} x={x} y={y} dy="0.32em">{text}</text>
    </g>
  );
}

interface RowDatum {
  label: string;
  value: number;
  highlight?: boolean;
}

// Wide containers put labels in a left column; narrow ones stack each label above its mark.
function rowLayout(w: number, count: number) {
  const stacked = w < 520;
  const m = { top: 30, right: 52, bottom: 30, left: stacked ? 0 : 196 };
  const rowH = stacked ? 50 : 34;
  const markOffset = stacked ? 32 : rowH / 2;
  const h = m.top + rowH * count + m.bottom;
  const labelPos = (i: number) =>
    stacked
      ? { x: m.left, y: m.top + i * rowH + 10, anchor: "start" as const }
      : { x: m.left - 12, y: m.top + i * rowH + rowH / 2, anchor: "end" as const };
  const lanes = (count_: number) =>
    stacked
      ? Array.from({ length: count_ }, (_, i) => ({ y1: m.top + i * rowH + markOffset - 13, y2: m.top + i * rowH + markOffset + 13 }))
      : [{ y1: m.top, y2: h - m.bottom }];
  return { stacked, m, rowH, markOffset, h, labelPos, lanes: lanes(count) };
}

const precisionData: RowDatum[] = [
  { label: "500-character", value: 0.601, highlight: true },
  { label: "one-line summary", value: 0.547 },
  { label: "metadata card", value: 0.543 },
  { label: "200 plus dates", value: 0.54 },
  { label: "200-character baseline", value: 0.514 },
  { label: "grep", value: 0.499 },
  { label: "path only", value: 0.471 },
];

export function OpenPrecisionBars() {
  const [ref, w] = useWidth(640);
  const id = useId();
  const data = [...precisionData].sort((a, b) => b.value - a.value);
  const { stacked, m, rowH, markOffset, h, labelPos, lanes } = rowLayout(w, data.length);
  const x = scale(0, 0.65, m.left, w - m.right);
  const barH = 16;
  const baseline = 0.514;
  const plotBottom = h - m.bottom;

  return (
    <ChartFigure
      title="Open precision by method"
      caption="500-character previews were the only method clearly above the baseline (+0.087, 95% CI +0.042 to +0.133)."
    >
      <div ref={ref} className="blog-chart-canvas">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}t ${id}d`}>
          <title id={`${id}t`}>Open precision by preview method</title>
          <desc id={`${id}d`}>
            Horizontal bar chart of the share of opened files that were relevant, sorted high to low.
            {data.map((d) => ` ${d.label}: ${d.value.toFixed(3)}.`).join("")} Dashed line marks the
            200-character baseline at 0.514.
          </desc>
          {range(0, 0.6, 0.1).map((t, i) => (
            <g key={t}>
              {lanes.map((l) => (
                <line key={l.y1} className="chart-grid" x1={x(t)} x2={x(t)} y1={l.y1} y2={l.y2} />
              ))}
              <text className="chart-tick" x={x(t)} y={plotBottom + 18} textAnchor={stacked && i === 0 ? "start" : "middle"}>
                {t === 0 ? "0" : t.toFixed(1)}
              </text>
            </g>
          ))}
          <line className="chart-ref" x1={x(baseline)} x2={x(baseline)} y1={m.top - 6} y2={m.top} />
          {lanes.map((l) => (
            <line key={l.y1} className="chart-ref" x1={x(baseline)} x2={x(baseline)} y1={l.y1} y2={l.y2} />
          ))}
          <text className="chart-tick" x={x(baseline)} y={m.top - 12} textAnchor="middle">baseline 0.514</text>
          {data.map((d, i) => {
            const lp = labelPos(i);
            const by = m.top + i * rowH + markOffset - barH / 2;
            return (
              <g key={d.label}>
                <title>{`${d.label}: ${d.value.toFixed(3)}`}</title>
                <rect className="chart-hit" x={0} y={m.top + i * rowH} width={w} height={rowH} />
                <text className={d.highlight ? "chart-label chart-label-accent" : "chart-label"} x={lp.x} y={lp.y} dy="0.32em" textAnchor={lp.anchor}>{d.label}</text>
                <path
                  className={d.highlight ? "chart-bar-accent" : "chart-bar"}
                  d={barPath(x(0), x(d.value), by, barH)}
                />
                <ValueLabel x={x(d.value) + 6} y={by + barH / 2} text={d.value.toFixed(3)} accent={d.highlight} />
              </g>
            );
          })}
        </svg>
      </div>
    </ChartFigure>
  );
}

const coverageData: RowDatum[] = [
  { label: "grep", value: 0.958 },
  { label: "path only", value: 0.935 },
  { label: "200-character baseline", value: 0.945 },
  { label: "500-character", value: 0.959, highlight: true },
  { label: "metadata card", value: 0.945 },
  { label: "one-line summary", value: 0.958 },
  { label: "200 plus dates", value: 0.937 },
];

export function CoverageDots() {
  const [ref, w] = useWidth(640);
  const id = useId();
  const { stacked, m, rowH, markOffset, h, labelPos, lanes } = rowLayout(w, coverageData.length);
  const x = scale(0.88, 1.0, m.left, w - m.right);
  const baseline = 0.945;
  const band = [0.895, 0.995];
  const plotBottom = h - m.bottom;

  return (
    <ChartFigure
      title="Coverage by method"
      caption="Every method was within 5 points of the baseline on coverage."
    >
      <div ref={ref} className="blog-chart-canvas">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}t ${id}d`}>
          <title id={`${id}t`}>Coverage by preview method</title>
          <desc id={`${id}d`}>
            Dot plot of coverage per method on an axis from 0.88 to 1.00.
            {coverageData.map((d) => ` ${d.label}: ${d.value.toFixed(3)}.`).join("")} A shaded band spans
            plus or minus 0.05 around the 200-character baseline, from 0.895 to 0.995. Every dot is inside it.
          </desc>
          {lanes.map((l) => (
            <rect key={l.y1} className="chart-band" x={x(band[0])} y={l.y1} width={x(band[1]) - x(band[0])} height={l.y2 - l.y1} rx={lanes.length > 1 ? 4 : 0} />
          ))}
          {range(0.88, 1.0, 0.02).map((t, i) => (
            <g key={t}>
              {lanes.map((l) => (
                <line key={l.y1} className="chart-grid" x1={x(t)} x2={x(t)} y1={l.y1} y2={l.y2} />
              ))}
              <text className="chart-tick" x={x(t)} y={plotBottom + 18} textAnchor={stacked && i === 0 ? "start" : "middle"}>{t.toFixed(2)}</text>
            </g>
          ))}
          <line className="chart-ref" x1={x(baseline)} x2={x(baseline)} y1={m.top - 6} y2={m.top} />
          {lanes.map((l) => (
            <line key={l.y1} className="chart-ref" x1={x(baseline)} x2={x(baseline)} y1={l.y1} y2={l.y2} />
          ))}
          <text className="chart-tick" x={x(baseline)} y={m.top - 12} textAnchor="middle">±0.05 of baseline</text>
          {coverageData.map((d, i) => {
            const lp = labelPos(i);
            const cy = m.top + i * rowH + markOffset;
            return (
              <g key={d.label}>
                <title>{`${d.label}: ${d.value.toFixed(3)}`}</title>
                <rect className="chart-hit" x={0} y={m.top + i * rowH} width={w} height={rowH} />
                <text className={d.highlight ? "chart-label chart-label-accent" : "chart-label"} x={lp.x} y={lp.y} dy="0.32em" textAnchor={lp.anchor}>{d.label}</text>
                <circle className={d.highlight ? "chart-dot-accent" : "chart-dot-neutral"} cx={x(d.value)} cy={cy} r={5.5} />
                <ValueLabel x={x(d.value) + 12} y={cy} text={d.value.toFixed(3)} accent={d.highlight} onBand />
              </g>
            );
          })}
        </svg>
      </div>
    </ChartFigure>
  );
}

type SetupKey = "w200" | "w500" | "grep";

const setupData: { label: string; values: Partial<Record<SetupKey, number>> }[] = [
  { label: "Claude Code", values: { w200: 0.945, w500: 0.959, grep: 0.958 } },
  { label: "Amuse, gpt-6.2-sol", values: { w200: 0.71, w500: 0.729 } },
  { label: "Amuse, gpt-6-luna", values: { w200: 0.39, w500: 0.402 } },
];

// Each method gets its own sub-lane so near-identical values (0.958 vs 0.959) stay visible.
const setupSeries: { key: SetupKey; label: string; offset: number }[] = [
  { key: "w200", label: "200-character", offset: -14 },
  { key: "w500", label: "500-character", offset: 0 },
  { key: "grep", label: "grep", offset: 14 },
];

function SetupMark({ kind, cx, cy }: { kind: SetupKey; cx: number; cy: number }) {
  if (kind === "grep") return <rect className="chart-mark-grep" x={cx - 4.5} y={cy - 4.5} width={9} height={9} />;
  return <circle className={kind === "w500" ? "chart-dot-accent" : "chart-dot-neutral"} cx={cx} cy={cy} r={5} />;
}

export function CoverageAcrossSetups() {
  const [ref, w] = useWidth(640);
  const id = useId();
  const stacked = w < 520;
  const m = { top: 8, right: 52, bottom: 30, left: stacked ? 0 : 160 };
  const rowH = stacked ? 80 : 64;
  const center = stacked ? 50 : rowH / 2;
  const h = m.top + rowH * setupData.length + m.bottom;
  const x = scale(0, 1, m.left, w - m.right);
  const plotBottom = h - m.bottom;
  const lanes = stacked
    ? setupData.map((_, i) => ({ y1: m.top + i * rowH + center - 24, y2: m.top + i * rowH + center + 24 }))
    : [{ y1: m.top, y2: plotBottom }];

  return (
    <ChartFigure
      title="Coverage by method across setups"
      caption="No setup showed a measurable accuracy change from preview length. Only Claude Code showed the two were equivalent."
    >
      <div className="chart-legend" aria-hidden>
        {setupSeries.map((s) => (
          <span key={s.key}>
            <svg width="12" height="12" viewBox="0 0 12 12"><SetupMark kind={s.key} cx={6} cy={6} /></svg>
            {s.label}
          </span>
        ))}
      </div>
      <div ref={ref} className="blog-chart-canvas">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}t ${id}d`}>
          <title id={`${id}t`}>Coverage by method in Claude Code and in Amuse with two models</title>
          <desc id={`${id}d`}>
            Dot plot of coverage from 0 to 1.
            {setupData
              .map((r) => ` ${r.label}: ${setupSeries.filter((s) => r.values[s.key] !== undefined).map((s) => `${s.label} ${r.values[s.key]!.toFixed(3)}`).join(", ")}.`)
              .join("")}
          </desc>
          {range(0, 1, 0.2).map((t, i) => (
            <g key={t}>
              {lanes.map((l) => (
                <line key={l.y1} className="chart-grid" x1={x(t)} x2={x(t)} y1={l.y1} y2={l.y2} />
              ))}
              <text className="chart-tick" x={x(t)} y={plotBottom + 18} textAnchor={stacked && i === 0 ? "start" : "middle"}>
                {t === 0 ? "0" : t.toFixed(1)}
              </text>
            </g>
          ))}
          {setupData.map((r, i) => {
            const cy = m.top + i * rowH + center;
            return (
              <g key={r.label}>
                <text
                  className="chart-label"
                  x={stacked ? m.left : m.left - 12}
                  y={stacked ? m.top + i * rowH + 12 : cy}
                  dy="0.32em"
                  textAnchor={stacked ? "start" : "end"}
                >
                  {r.label}
                </text>
                {setupSeries.map((s) => {
                  const v = r.values[s.key];
                  if (v === undefined) return null;
                  const y = cy + s.offset;
                  return (
                    <g key={s.key}>
                      <title>{`${r.label}, ${s.label}: ${v.toFixed(3)}`}</title>
                      <rect className="chart-hit" x={x(v) - 8} y={y - 7} width={60} height={14} />
                      <SetupMark kind={s.key} cx={x(v)} cy={y} />
                      <ValueLabel x={x(v) + 10} y={y} text={v.toFixed(3)} accent={s.key === "w500"} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </ChartFigure>
  );
}
