---
title: "Kùzu DB: The High School Internship"
date: "2024-08-15"
description: "What it's like to work on database internals at 16 — query planners, C++ cores, and graph schemas at the fastest embedded graph database."
tags: ["internship", "databases", "c++", "graph-database"]
---

# Kùzu DB: The High School Internship

My high school was very competitive. Everyone was getting an internship in their final years, and it was deemed the necessary step to get into UWaterloo. So when I got the chance to join Kùzu DB's core team, I took it — even though I had no idea what a query planner was.

<figure>
  <img
    src="/images/kuzu/desk-setup.jpg"
    alt="A sunlit workspace overlooking the Stantec building — where a lot of the query planner work happened"
    style="width:100%;border-radius:4px;"
  />
  <figcaption>The desk. Many operators were printed here.</figcaption>
</figure>

## The Challenge

Databases are often black boxes. During my time at Kùzu, I realized that if a developer can't see the query plan, they can't optimize it. The query planner was producing complex execution plans, but developers had no way to visualize or understand what was happening under the hood.

## Diving Into C++ Core

I dove into the C++ core to build a visualization layer for the query planner. The goal was simple: turn abstract metadata into actionable performance insights. This meant understanding how operators connect, how data flows through the plan, and where bottlenecks might occur.

Most days looked like this:

<figure>
  <video
    src="/images/kuzu/rainy-day-workspace.mp4"
    autoPlay
    muted
    loop
    playsInline
    style="width:100%;border-radius:4px;"
  />
  <figcaption>Rain outside, C++ inside. A typical afternoon debugging operator trees.</figcaption>
</figure>

## Building the Printing Engine

I built the printing engine for 40+ operators, cutting query debugging time for the core team significantly. Each operator needed its own visualization logic — some were simple transformations, others were complex joins or aggregations. The challenge was making each one readable while maintaining consistency across the entire plan.

## Refining the Explorer UI

Using Chroma.js, I refined the Explorer UI to make complex graph schemas visually intuitive. The query plans weren't just linear sequences — they were graphs with branches, merges, and parallel execution paths.

<figure>
  <img
    src="/images/kuzu/selfie.jpg"
    alt="Selfie at the Kùzu office — youngest on the team, very much aware of it"
    style="width:100%;max-width:400px;border-radius:4px;"
  />
  <figcaption>Youngest on the team. Upside down because that's how the office felt for the first week.</figcaption>
</figure>

## Impact

The visualization layer directly supported benchmarking of the fastest embedded graph database. Developers could now see exactly how queries were being executed, identify optimization opportunities, and understand performance characteristics at a glance.

## Lessons Learned

Working on database internals taught me the importance of making complex systems understandable. A powerful engine is useless if developers can't understand how to use it effectively. Visualization isn't just about pretty graphics — it's about bridging the gap between abstract concepts and practical understanding.

Kùzu eventually got acquired by Apple in late 2025. The work speaks for itself.
