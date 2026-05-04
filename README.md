# specorator-ecosystem

The **Specorator Ecosystem Hub** — the entry point for the four-component Specorator system, deployed to GitHub Pages.

**Live:** https://luis85.github.io/specorator-ecosystem

---

## What this is

A lightweight developer-facing dashboard that provides a single URL to understand the Specorator system: what components exist, what state they're in, how they relate, and how to navigate to each one.

It is not a marketing page. The aesthetic is an ops-style hub — dark, monospace, dense.

---

## Ecosystem components

| Project                                                            | Layer                                | Status                |
| ------------------------------------------------------------------ | ------------------------------------ | --------------------- |
| [specorator](https://github.com/Luis85/specorator)                 | UI / Visualization (Obsidian plugin) | v1-alpha, in progress |
| [specorator-runtime](https://github.com/Luis85/specorator-runtime) | Execution Runtime                    | Planned               |
| [agentonomous](https://github.com/Luis85/agentonomous)             | Agent Library                        | Planned               |
| [agentic-workflow](https://github.com/Luis85/agentic-workflow)     | Workflow Definition System           | v0.5.1, in progress   |

---

## Tech stack

- [Astro](https://astro.build) 6 — static site generator
- [Tailwind CSS](https://tailwindcss.com) 4 — utility-first CSS
- Node 20

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Build

```bash
npm run build
```

Output goes to `dist/`. The build is purely static — no server-side runtime required.

---

## Deployment

GitHub Actions deploys automatically on push to `develop` via `.github/workflows/deploy.yml`. The site is served from GitHub Pages at the `/specorator-ecosystem` base path.

---

## Data

All project metadata lives in `src/data/projects.json`. This is the single source of truth for V1. Fields: `id`, `name`, `role`, `layer`, `description`, `status`, `version`, `techStack`, `repo`, `docs`, `prd`, `lastUpdate`, `openIssues`.

V2 will replace `lastUpdate` and `openIssues` with live GitHub API data at build time.

---

## File structure

```
src/
  pages/
    index.astro              ← hub page (architecture + projects + roadmap)
    integrations/            ← per-project detail pages
    changelog.astro          ← roadmap page
  data/
    projects.json            ← project metadata (single source of truth)
  config/
    config.json              ← site title, base path, logo
    theme.json               ← design tokens (colors, fonts)
    menu.json                ← navigation links
content/
  integrations/              ← per-project detail content (Markdown)
  changelog/-index.md        ← V1–V4 roadmap milestones
  sections/
    faq.md                   ← ecosystem FAQ
    call-to-action.md        ← CTA content
docs/
  product-brief.md           ← V1 product spec
  design-brief.md            ← design system spec
.github/
  workflows/
    deploy.yml               ← GitHub Pages CI/CD
```

---

## Roadmap

| Version          | Scope                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| **V1** (current) | Static site · architecture diagram · project listing · manual data                     |
| V2               | GitHub API at build time · live `lastUpdate` / `openIssues` · per-project detail pages |
| V3               | Runtime observability · agent session tracking · event stream visualization            |
| V4               | Workflow execution tracking · knowledge graph · semantic cross-linking                 |
