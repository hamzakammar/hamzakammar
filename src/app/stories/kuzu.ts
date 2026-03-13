export const kuzuStory = `
# Kùzu DB: The highschool internship

My high school was very competitive. Everyone was getting an internship in their final years, and it was deemed the necessary step to get into UWaterloo. So when I got the chance to join Kùzu DB's core team, I took it — even though I had no idea what a query planner was.

## The Challenge

Databases are often black boxes. During my time at Kùzu, I realized that if a developer can't see the query plan, they can't optimize it. The query planner was producing complex execution plans, but developers had no way to visualize or understand what was happening under the hood.

## Diving Into C++ Core

I dove into the C++ core to build a visualization layer for the query planner. The goal was simple: turn abstract metadata into actionable performance insights. This meant understanding how operators connect, how data flows through the plan, and where bottlenecks might occur.

## Building the Printing Engine

I built the printing engine for 40+ operators, cutting query debugging time for the core team significantly. Each operator needed its own visualization logic—some were simple transformations, others were complex joins or aggregations. The challenge was making each one readable while maintaining consistency across the entire plan.

## Refining the Explorer UI

Using Chroma.js, I refined the Explorer UI to make complex graph schemas visually intuitive. The query plans weren't just linear sequences—they were graphs with branches, merges, and parallel execution paths. Visualizing this required careful attention to layout algorithms and user experience.

## Impact

The visualization layer directly supported benchmarking of the fastest embedded graph database. Developers could now see exactly how queries were being executed, identify optimization opportunities, and understand performance characteristics at a glance.

## Lessons Learned

Working on database internals taught me the importance of making complex systems understandable. A powerful engine is useless if developers can't understand how to use it effectively. Visualization isn't just about pretty graphics—it's about bridging the gap between abstract concepts and practical understanding.
`.trim();
