# Product Brief — Specorator Ecosystem Hub

**Version:** 2.0  
**Status:** Active  
**URL:** https://luis85.github.io/specorator-ecosystem

---

## 1. Problem Statement

AI tools are powerful in the moment — but they can't run your project.

- **Context gets lost** — AI tools forget your project history, decisions, and rationale the instant a session ends.
- **Artifacts are scattered** — Specs live in Notion, tasks in Linear, notes in Slack threads. Nothing stays connected through the lifecycle of a feature.
- **No repeatable process** — There's no structured methodology. Each new project kicks off the same unstructured loop — from scratch, every time, for everyone.

The result: teams adopt AI for individual tasks but never close the gap between a raw idea and a shipped, documented, maintainable product.

---

## 2. Solution

The **Specorator Ecosystem Hub** is a user-friendly information hub hosted on GitHub Pages. It serves as the central entry point for the entire ecosystem: one URL to understand the system, see what is active, explore the methodology, and navigate to any component.

It is not a README clone. It explains the problem the ecosystem solves, shows how it works, guides visitors to the right starting point, and provides live project status — all in one place.

The hub is intentionally designed for a broad audience: anyone curious about AI-driven software development, from first-time explorers to active contributors.

---

## 3. Users

**Primary:** Anyone building software who wants AI to do the heavy lifting — product managers, designers, founders, and developers. No coding background required for the recommended entry point.

**Secondary:** Developers and contributors who want to build on top of ecosystem components directly — using the agent library, runtime, or workflow methodology as standalone tools.

Both audiences need the same foundation: clarity on what the ecosystem is, how the pieces fit together, what state each component is in, and where to go next.

---

## 4. Ecosystem Components

| Project                | Layer               | Role                                                                                                                                                                                                                                                                                    | Current State                   |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **specorator**         | UI / Visualization  | Obsidian plugin that turns a free, local-first notes app into an extensible AI development platform. Guides anyone through a 12-stage Agentic Development Lifecycle — from idea to shipped software. Manages agents, skills, MCP servers, and a plugin marketplace. No coding required. | v1-alpha, in active development |
| **specorator-runtime** | Execution Runtime   | npm orchestration library and MCP server. Planned execution engine that bridges the UI layer with agent and workflow subsystems — session management, event streaming, stage gating.                                                                                                    | Planned                         |
| **agentonomous**       | Agent Library       | TypeScript agent library. Six specialised roles (PM, Architect, Engineering, QA, Review, Writer) as composable building blocks for custom tooling.                                                                                                                                      | Planned                         |
| **agentic-workflow**   | Workflow Definition | The raw 12-stage ADLC methodology — templates, quality gates, and Claude Code agents — as a standalone CLI tool. Powers specorator's workflow cockpit and is planned for MCP server exposure.                                                                                           | v0.5.1, actively maintained     |

### The 12-Stage Agentic Development Lifecycle (ADLC)

Three phases, twelve stages, one repeatable process:

| Phase              | Stages                                                                            |
| ------------------ | --------------------------------------------------------------------------------- |
| **Think & Plan**   | 1. Idea → 2. Research → 3. Requirements → 4. Design → 5. Specification → 6. Tasks |
| **Build & Verify** | 7. Implementation → 8. Test Planning → 9. Testing                                 |
| **Close & Learn**  | 10. Review → 11. Release → 12. Retrospective                                      |

At every stage: the user governs every decision; agents do the drafting. Nothing advances without explicit approval.

### Architectural Relationships

```
specorator (Obsidian Plugin, UI Layer)
  │  reads methodology from → agentic-workflow (currently)
  │  will integrate → agentonomous (v2.0)
  │  will connect to → specorator-runtime (planned)
  │
  ▼
specorator-runtime (Execution Runtime, planned)
  │
  ├──► agentonomous (Agent Library)
  └──► agentic-workflow (Workflow Definitions)
```

The runtime is the planned bridge that will make the system fully interconnected. Until it ships, specorator consumes `agentic-workflow` methodology directly and `agentonomous` is planned for direct v2.0 integration.

---

## 5. Hub Scope (Current State)

The hub is a fully dynamic static site — built with Astro, deployed to GitHub Pages, enriched with live GitHub API data at build time.

### What the hub includes

| Feature                      | Description                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Hero & value proposition** | Clear headline, subheadline, and CTAs oriented to first-time visitors                                                                |
| **Problem section**          | Three cards explaining the core pain points the ecosystem solves                                                                     |
| **How It Works**             | Three-phase ADLC walkthrough (Think & Plan, Build & Verify, Close & Learn)                                                           |
| **Entry-point routing**      | Primary CTA (specorator plugin) + three secondary builder entry points with status badges                                            |
| **Architecture diagram**     | Layered visual showing four components, their layer assignments, and connection flow                                                 |
| **Project status cards**     | One card per component — name, layer, status badge, description, tech stack, live GitHub data (last update, open issues), links      |
| **Roadmap section**          | Per-project roadmap phases fetched live from GitHub (roadmap:v3 / roadmap:v4 labels); progress bars and status derived automatically |
| **Navigation**               | Every card links directly to its GitHub repository, docs, or PRD                                                                     |
| **CI/CD**                    | GitHub Actions: verify on `develop` and PRs; deploy to GitHub Pages on push to `main`                                                |

---

## 6. Roadmap

| Version | Scope                                                                                                           | Status      |
| ------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| **V1**  | Static site · architecture diagram · project listing · manual data in `projects.json` · GitHub Pages CI/CD      | **Shipped** |
| **V2**  | GitHub API at build time · live `lastUpdate` / `openIssues` · per-project detail pages · roadmap label standard | **Shipped** |
| **V3**  | Runtime observability · agent session tracking · event stream visualization                                     | Planned     |
| **V4**  | Workflow execution tracking · knowledge graph · semantic cross-linking                                          | Planned     |

---

## 7. Success Criteria

- Hub is deployed and publicly accessible at `https://luis85.github.io/specorator-ecosystem`
- First-time visitors understand what the ecosystem does and where to start within a single scroll
- All four ecosystem repositories are listed with live metadata (status, last update, open issues)
- Architecture diagram accurately represents component relationships and layering
- Roadmap reflects live GitHub issue/PR state via label-based automation
- `npm run verify` completes without errors from a clean checkout

---

## 8. Technical Constraints

- **Static output** — pure HTML/CSS/JS, deployable to GitHub Pages with no server-side runtime
- **Astro** — static site generator with build-time data fetching (GitHub API)
- **Tailwind CSS 4** — utility-first CSS framework
- **Node 20** for CI
- **Base path** `/specorator-ecosystem` (GitHub Pages project site)
- **Dark theme** — hub aesthetic is dark; consistent with the ops/developer aesthetic of the ecosystem

---

## 9. Data Sources

### Static (`src/data/projects.json`)

The registry for stable project metadata — `id`, `name`, `role`, `layer`, `description`, `repo`, `techStack`, `dependencies`. Manually maintained.

### Build-time (`src/lib/fetchProjectData.ts`, `src/lib/fetchRoadmapData.ts`)

Volatile fields are fetched from the GitHub API at `astro build` time and overlaid on the static registry:

| Field        | Source                         |
| ------------ | ------------------------------ |
| `status`     | GitHub Topics                  |
| `lastUpdate` | GitHub API `pushed_at`         |
| `openIssues` | GitHub API `open_issues_count` |
| `version`    | GitHub Releases API `tag_name` |
| `docs`       | GitHub API `repo.homepage`     |

If the API is unavailable, fields fall back to `null` and the build always succeeds.

### Roadmap (`src/lib/fetchRoadmapData.ts`)

Issues and PRs carrying `roadmap:v3` or `roadmap:v4` labels are fetched from all four ecosystem repos at build time. Status is derived automatically: open issue → `planned`, open PR → `in-progress`, closed → `done`.
