---
title: "Kùzu DB: The High School Internship"
date: "2024-08-15"
description: "What it's like to work on database internals at 16 — query planners, C++ cores, and graph schemas at the fastest embedded graph database."
tags: ["internship", "databases", "c++", "graph-database"]
---

My high school was competitive in the way that quietly raises the stakes on everything. By the time you hit junior year, everyone was getting an internship, and it had become the unspoken prerequisite for a shot at Waterloo. So when the chance came up to join Kùzu DB's core team, I said yes — even though I had no idea what a query planner was, and even less of an idea what I was getting into.

<figure>
  <img
    src="/images/kuzu/desk-setup.jpg"
    alt="A sunlit workspace overlooking the Stantec building — where a lot of the query planner work happened"
    style="width:100%;border-radius:4px;"
  />
  <figcaption>The desk. Many operators were printed here.</figcaption>
</figure>

Kùzu is an embedded graph database — the kind of system that lives inside your application rather than running as a separate server. It's fast, really fast, and the team was serious about keeping it that way. My first few weeks were mostly orientation: reading through the C++ codebase, understanding how data flows through the query engine, and slowly building a mental model of what a query plan actually is. A query plan is the internal representation of how a database decides to execute your query — which operators run in what order, where data gets filtered, where joins happen. It's the hidden machinery behind every `MATCH` or `RETURN` statement.

The problem I was handed was that developers couldn't see any of it. The query planner was generating complex execution trees, but there was no way to inspect them — no visualization, no readable output, just an opaque execution that either worked or didn't. If something was slow or wrong, you were debugging blind. My job was to change that.

I spent most of my time in the C++ core, building a printing engine for the query plan operators. There were over 40 of them — scan operators, filter operators, hash joins, aggregations, projections, intersections — and each one needed its own serialization logic to produce something a developer could actually read. The challenge wasn't just making them print; it was making the output meaningful. A plan with a dozen nested operators could produce a wall of text that was just as unreadable as nothing. So I thought carefully about indentation, about which properties mattered, about how to show the shape of the tree rather than just its nodes.

<figure>
  <video
    src="/images/kuzu/rainy-day-workspace.mp4"
    autoplay
    muted
    loop
    playsinline
    style="width:100%;border-radius:4px;"
  ></video>
  <figcaption>Rain outside, C++ inside. A typical afternoon debugging operator trees.</figcaption>
</figure>

Most afternoons looked like that — headphones in, rain against the window, working through one operator at a time. There's something meditative about it once you get into the rhythm. You read the operator's internal state, figure out what's semantically meaningful to surface, write the print logic, test it against a real query, adjust. Repeat forty times. By the end, running `EXPLAIN` on a query would produce a clean, indented tree showing exactly how Kùzu planned to execute it — which operators were being used, how they were chained, where the data was expected to be filtered down. The core team could now look at a slow query and immediately understand why.

Alongside the printing engine, I worked on the Explorer UI — the visual interface for Kùzu's graph schema browser. Using Chroma.js, I refined the color system to make complex graph schemas visually intuitive. Graph schemas aren't like relational schemas — they have node types, edge types, properties hanging off both, and relationships that can be recursive or polymorphic. Getting a visualization that didn't look like a bowl of spaghetti required careful use of color and layout. The goal was that a developer could open the Explorer, glance at their schema, and immediately understand its structure without reading documentation.

<figure>
  <img
    src="/images/kuzu/selfie.jpg"
    alt="Selfie at the Kùzu office — youngest on the team, very much aware of it"
    style="width:100%;max-width:400px;border-radius:4px;"
  />
  <figcaption>Youngest on the team. Upside down because that's how the office felt for the first week.</figcaption>
</figure>

I was sixteen and the youngest person on the team by a significant margin. That's a strange thing to sit with. Everyone else had PhDs or years of systems programming experience, and I was there figuring out C++ memory semantics and graph database internals in real time. It was uncomfortable in a productive way. The work had to speak for itself, so I made sure it did.

What I came away with wasn't just the technical skills — though those were real and hard-won. It was a clearer sense of what it means to make a complex system understandable. A fast database is impressive. A fast database that developers can actually reason about, debug, and optimize is genuinely useful. The printing engine and the Explorer improvements were both versions of the same idea: powerful tools need legible interfaces, or the power goes to waste. Kùzu was acquired by Apple in late 2025. I like to think the work held up.
