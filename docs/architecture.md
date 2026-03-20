# Architecture

> Last updated: 2026-03-20
> Status: living document — update whenever the system shape changes.

---

## Overview

Horizon is a Next.js 15 App Router site deployed on Vercel. The central design concept is a **city skyline metaphor**: the homepage renders a custom SVG of a city where each building is a clickable project entry. There is no backend, no database, and no API routes — all content is statically defined in TypeScript source files and rendered at the edge.

```
┌────────────────────────────────────────────┐
│             Browser (Client)               │
│  page.tsx — city layout (desktop/mobile)   │
│  CitySvg.tsx — interactive SVG buildings   │
│  CommandPalette.tsx — ⌘K navigation        │
└────────────────┬───────────────────────────┘
                 │ Static / Edge render
┌────────────────▼───────────────────────────┐
│           Vercel Edge Network              │
│  Next.js 15 App Router (no API routes)     │
│  Vercel Analytics + Speed Insights         │
└────────────────────────────────────────────┘
```

---

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage — city SVG (desktop) or project cards (mobile) |
| `/classic` | `src/app/classic/` | Alternate text-based portfolio layout |

---

## Data Flow

All project data flows in one direction: source files → components → rendered UI.

```
src/app/stories/*.ts      (long-form narrative strings)
         ↓ imported by
src/app/stories/index.ts  (story registry: id → string)
         ↓ imported by
src/app/data/projects.ts  (Projects array — canonical project data)
         ↓ imported by
src/app/page.tsx          (renders city layout)
src/app/components/CitySvg.tsx   (renders buildings + project panels)
```

**To add a project:**
1. Create `src/app/stories/{id}.ts` — export a story string.
2. Register it in `src/app/stories/index.ts`.
3. Add a `Project` object to the `Projects` array in `src/app/data/projects.ts`. The `id` must match the SVG building's `data-project` attribute.
4. Add the corresponding building to `CitySvg.tsx`.

---

## Component Breakdown

### `CitySvg.tsx`
The largest and most complex component (~47 KB). It contains:
- The full SVG city illustration (buildings, skyline, decorative elements)
- Per-building click handlers tied to project IDs
- The project detail panel (rendered inline in the SVG overlay)
- Resume display panel
- Animation and hover states

This is a monolithic component by design — the SVG and its interaction logic are tightly coupled. Splitting it would be a significant refactor.

### `CommandPalette.tsx`
A `cmdk`-powered command palette (⌘K). Allows keyboard navigation to any project or action (e.g., open resume). Controlled from `page.tsx` state.

### `page.tsx`
The homepage. Owns all top-level state:
- `activeProjectId` — which building/project is selected
- `cmdkOpen` — command palette visibility
- `dark` — current theme
- `showResume` — whether the resume panel is visible
- `isMobile` — drives layout switch between city (desktop) and card list (mobile)

### `src/app/lib/polyfills.ts`
Browser polyfills loaded early in the app lifecycle.

---

## Theming

Light/dark mode is implemented via a `data-theme="dark"` attribute on `<html>`, toggled in `page.tsx` and persisted to `localStorage`. All visual tokens are CSS custom properties in `globals.css`. No Tailwind dark variant is used — rely on `var(--...)` tokens only.

---

## Deployment

- **Platform:** Vercel (auto-deploy on push to `main`).
- **Build command:** `next build`
- **Config:** `vercel.json` at root.
- **Analytics:** `@vercel/analytics` and `@vercel/speed-insights` are injected in `layout.tsx`.

---

## External Dependencies of Note

| Package | Purpose |
|---|---|
| `next` 15 | Framework — App Router, Turbopack dev, edge rendering |
| `framer-motion` | Animations (panels, transitions) |
| `cmdk` | Command palette primitive |
| `styled-components` | Some component-level styles |
| `react-simple-typewriter` / `react-type-animation` | Typing animations (classic view or landing text) |
| `@vercel/analytics` | Page view analytics |
| `@vercel/speed-insights` | Core Web Vitals tracking |
| `tailwindcss` 4 | Utility classes |

---

## Known Constraints

- `CitySvg.tsx` is large and monolithic. Adding a new project requires editing the SVG directly — there is no programmatic building generator yet.
- The site is fully client-rendered (`"use client"` on `page.tsx`). There is no server component or streaming at the page level.
- No test suite currently exists. See `docs/debt.md`.

---

## Decision Log

See `docs/decisions/` for the full ADR history.
