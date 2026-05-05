# specorator-ecosystem

The **Specorator Ecosystem Hub** — a user-friendly information hub for the four-component Specorator system, deployed to GitHub Pages.

**Live:** https://luis85.github.io/specorator-ecosystem

---

## What this is

The hub explains the ecosystem's purpose, shows how the 12-stage Agentic Development Lifecycle works, guides visitors to the right entry point, and surfaces live project status — all in one place.

It serves a broad audience: anyone curious about AI-driven software development (product managers, designers, founders, developers) and contributors who want to build on top of individual ecosystem components.

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

## Quality gate

```bash
npm run verify
```

Runs in sequence: `check → lint → format → test → build`. All steps must pass before merging to `main`.

## Build

```bash
npm run build
```

Output goes to `dist/`. The build is purely static — no server-side runtime required.

---

## Deployment

Two GitHub Actions workflows:

- **`verify.yml`** — runs `npm run verify` on push to `develop` and on PRs to `main`. No deployment.
- **`deploy.yml`** — runs `npm run verify` then deploys to GitHub Pages on push to `main`.

The site is served from GitHub Pages at the `/specorator-ecosystem` base path.

---

## Data

### Static (`src/data/projects.json`)

Stable project metadata — `id`, `name`, `role`, `layer`, `description`, `repo`, `techStack`, `dependencies`. Manually maintained.

### Build-time

Volatile fields (`status`, `version`, `lastUpdate`, `openIssues`, `docs`) are fetched from the GitHub API at build time by `src/lib/fetchProjectData.ts`. Falls back to `null` if the API is unavailable — the build always succeeds.

Roadmap data is fetched by `src/lib/fetchRoadmapData.ts`: issues and PRs carrying `roadmap:v3` or `roadmap:v4` labels are pulled from all four ecosystem repos. Status is derived automatically from GitHub state.

---

## File structure

```
src/
  pages/
    index.astro              ← hub page (hero + problem + ADLC + entry points + architecture + projects + roadmap)
    integrations/            ← per-project detail pages
    changelog.astro          ← roadmap page
  data/
    projects.json            ← project metadata (stable fields)
    roadmap.json             ← roadmap label configuration
  lib/
    fetchProjectData.ts      ← GitHub API enrichment at build time
    fetchRoadmapData.ts      ← GitHub label-based roadmap fetch
  config/
    config.json              ← site title, base path, logo
    theme.json               ← design tokens
    menu.json                ← navigation links
content/
  integrations/              ← per-project detail content (Markdown)
  changelog/-index.md        ← V1–V4 roadmap milestones
  sections/
    faq.md                   ← ecosystem FAQ
    call-to-action.md        ← CTA content
docs/
  product-brief.md           ← product spec and vision
  design-brief.md            ← design system spec
.github/
  workflows/
    verify.yml               ← CI verification (develop + PRs)
    deploy.yml               ← GitHub Pages deploy (main)
```

---

## Roadmap

| Version          | Scope                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **V1** (shipped) | Static site · architecture diagram · project listing · manual data                                              |
| **V2** (shipped) | GitHub API at build time · live `lastUpdate` / `openIssues` · per-project detail pages · roadmap label standard |
| V3               | Runtime observability · agent session tracking · event stream visualization                                     |
| V4               | Workflow execution tracking · knowledge graph · semantic cross-linking                                          |
