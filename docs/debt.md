# Technical Debt Log

> This file is the authoritative record of known technical debt in Horizon.
> **Rule:** If you knowingly defer something, add it here before merging. Do not leave debt undocumented.

---

## How to Use This File

Each entry follows this format:

```
### [DEBT-NNN] Short title
- **Severity:** low | medium | high | critical
- **Area:** component / module / system affected
- **Logged:** YYYY-MM-DD
- **Author:** name or handle
- **Description:** What is the problem and why does it exist?
- **Impact:** What breaks or degrades if this is not fixed?
- **Fix:** What would a correct resolution look like?
- **Unblocked by:** What needs to happen before this can be addressed? (optional)
```

Severity guide:
- **critical** — actively causing data loss, security issues, or production outages.
- **high** — causing user-facing bugs or significantly slowing development.
- **medium** — creates friction; should be fixed within the next 2–3 milestones.
- **low** — nice-to-have cleanup; address opportunistically.

---

## Open Debt

<!-- Add new entries below this line, newest first. -->

### [DEBT-001] CitySvg.tsx is a monolithic component with no tests
- **Severity:** medium
- **Area:** `src/app/components/CitySvg.tsx`
- **Logged:** 2026-03-20
- **Author:** hamzakammar
- **Description:** CitySvg.tsx is ~47 KB and contains the SVG illustration, all building interaction logic, the project detail panel, and the resume panel in a single file. There are no unit or integration tests anywhere in the repo.
- **Impact:** Regressions are hard to catch. Adding a new building requires careful manual editing with no safety net. The file is difficult for agents to reason about in full.
- **Fix:** Extract the project panel and resume panel into separate components. Add Playwright or Vitest browser tests for core interactions (building click, panel open/close, command palette).
- **Unblocked by:** Nothing — can be done incrementally.

### [DEBT-002] Adding a project requires manual SVG edits
- **Severity:** low
- **Area:** `src/app/components/CitySvg.tsx`, `src/app/data/projects.ts`
- **Logged:** 2026-03-20
- **Author:** hamzakammar
- **Description:** There is no automated way to add a new building to the city SVG for a new project. An engineer must hand-draw or hand-edit the SVG path/rect alongside editing `projects.ts`.
- **Impact:** Adding a project is slow and error-prone. The SVG and data can drift out of sync.
- **Fix:** Consider a config-driven building renderer (given a position and size, generate a standardized building block) so that new projects only require a data entry.
- **Unblocked by:** Nothing — but design direction should be confirmed first.

### [DEBT-003] Story files are mostly placeholder content
- **Severity:** low
- **Area:** `src/app/stories/`
- **Logged:** 2026-03-20
- **Author:** hamzakammar
- **Description:** Several story files (e.g. `horizon.ts`, `unimap.ts`, `mapflow.ts`, `chess.ts`, `dealish.ts`, `neodev.ts`, `uw.ts`) export placeholder templates rather than real written narratives.
- **Impact:** The long-form story feature is incomplete. Users who navigate to a project's story view see template text.
- **Fix:** Write real narrative content for each project story file.

---

## Resolved Debt

<!-- Move entries here when fixed, and note the resolution. -->

*None yet.*
