# Horizon — Agent Guide

> **Read this first.** This file is the authoritative entry point for any AI agent or engineer working in this repository. It tells you how the codebase is structured, where decisions live, and how to make progress without breaking things.

---

## 1. What is Horizon?

Horizon is Hamza Ammar's personal portfolio site, deployed at [hamzaammar.ca](https://hamzaammar.ca). It is a Next.js 15 app (App Router, TypeScript) with a distinctive UI concept: the homepage renders an interactive SVG city skyline where each **building represents a project**. Clicking a building opens a project detail panel. The site is deployed on Vercel.

A `/classic` route provides an alternate text-based layout. Both desktop and mobile layouts are supported.

---

## 2. Repo Map (progressive disclosure)

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Homepage — desktop city layout + mobile card layout |
| `src/app/classic/` | Alternate classic (text-based) portfolio view |
| `src/app/components/CitySvg.tsx` | The interactive SVG city — the core visual UI |
| `src/app/components/CommandPalette.tsx` | ⌘K command palette for keyboard navigation |
| `src/app/data/projects.ts` | Canonical project data — **this is the source of truth for all projects** |
| `src/app/stories/` | Long-form narrative text for each project (imported into `projects.ts`) |
| `src/app/stories/index.ts` | Story registry — maps project IDs to story strings |
| `src/app/lib/` | Shared utilities and polyfills |
| `src/app/globals.css` | Global styles and CSS custom properties (light/dark themes) |
| `src/app/layout.tsx` | Root layout — fonts, analytics, speed insights |
| `public/` | Static assets (resume PDF, images) |
| `.claude/` | Claude Code launch config (Turbopack dev server) |
| `docs/` | Architecture, debt log, ADRs, and plans — **start here for context** |
| `AGENTS.md` | This file |

---

## 3. Key Conventions

- **TypeScript everywhere.** All new files must be `.ts` or `.tsx`. No `any` without a comment explaining why.
- **Projects are defined in `src/app/data/projects.ts`.** To add or update a project, edit the `Projects` array there. The `id` field must match the `data-project` attribute on the corresponding building in `CitySvg.tsx`.
- **Stories are separate from data.** Long-form project narratives live in `src/app/stories/` as individual `.ts` files. Register new stories in `src/app/stories/index.ts`.
- **City SVG is the single most complex component.** `CitySvg.tsx` is large (~47 KB). It handles building click interactions, project panel rendering, and resume display. Treat it carefully — do not refactor structure without an ADR.
- **No global state manager.** State is local (`useState`) in `page.tsx` and passed down via props. Keep it this way unless complexity demands otherwise.
- **Dark/light theme via CSS custom properties.** The `data-theme="dark"` attribute on `<html>` switches the theme. All colors should use `var(--...)` tokens defined in `globals.css`.
- **Vercel deployment.** `vercel.json` is in the root. Do not add a custom server or API routes unless there is a strong reason — keep the site static/edge-rendered.
- **Dev server uses Turbopack.** Run `npm run dev` (configured in `.claude/launch.json`).

---

## 4. Before You Change Anything

1. Read `docs/architecture.md` — understand the city metaphor, routing, and component relationships.
2. Read `docs/debt.md` — know what is already broken or deferred.
3. Check `docs/decisions/` — look for an ADR that covers the area you're working in.
4. Check `docs/plans/` — see if there is an active plan for this feature.

---

## 5. How to Make a Change

1. **Content update (new project, copy, link, story text):** Edit `projects.ts` and/or the relevant file in `stories/` directly on `main`.
2. **UI bug fix or small style change:** Make it directly on `main` with a clear commit message.
3. **New feature or structural change:** Create a branch, open a PR, and reference any relevant ADR or plan.
4. **Architecture decision:** Write or update an ADR in `docs/decisions/` before or alongside the change.
5. **New technical debt:** Add an entry to `docs/debt.md` immediately — do not leave it undocumented.

---

## 6. Running the Project

```bash
npm install
npm run dev        # Turbopack dev server on http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

---

## 7. Where Decisions Live

- **Why we chose X over Y:** `docs/decisions/ADR-NNNN-title.md`
- **What is broken or deferred:** `docs/debt.md`
- **What we are building next:** `docs/plans/`
- **System shape and component relationships:** `docs/architecture.md`

---

*Keep this file current. If the repo changes shape — new routes, new data structures, new integrations — update this map.*
