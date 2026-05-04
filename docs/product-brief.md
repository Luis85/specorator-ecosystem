# Product Brief — Specorator Ecosystem Hub

**Version:** 1.0  
**Status:** Active  
**URL (target):** https://luis85.github.io/specorator-ecosystem

---

## 1. Problem Statement

The Specorator ecosystem consists of four independent but tightly related repositories. Without a shared entry point, anyone navigating the system must:

- Hunt through individual READMEs to understand how components relate
- Manually check four different GitHub repositories to assess overall status
- Piece together the architecture from scattered context across repos
- Have no single URL to bookmark or share

There is no "north star" page — no single hub or entry point for the system.

---

## 2. Solution

The **Specorator Ecosystem Hub** is a lightweight, always-available static web interface hosted on GitHub Pages. It serves as the **central entry point** for the entire ecosystem: one URL to understand the system, see what is active, and navigate to any component.

It is explicitly **not** a marketing page or a README clone. It is the ecosystem hub — intentionally minimal in V1, designed for developer and contributor use, with a clear roadmap to grow into a live observability interface as the runtime matures.

---

## 3. Users

**Primary audience:** The ecosystem owner and contributors — people building with or contributing to the Specorator system.

**Secondary audience:** Technical evaluators — developers exploring the ecosystem for the first time who need a fast mental model of how the pieces fit together.

Both audiences need the same thing: clarity on what exists, what state it's in, and how to navigate to it.

---

## 4. Ecosystem Components

| Project | Layer | Role | Current State |
|---|---|---|---|
| **specorator** | UI / Visualization | Obsidian plugin providing a spec-driven workflow cockpit. Guides teams from idea to release through an 11-stage lifecycle, maintaining all artifacts as editable Markdown. | v1-alpha, in active development |
| **specorator-runtime** | Execution Runtime | Planned execution engine that will orchestrate agents and workflows, bridging the UI layer with the agent and workflow subsystems at runtime. | Planned, 11 open issues |
| **agentonomous** | Agent Library | Autonomous agent library for TypeScript. Provides building blocks for intelligent task execution. Integrates into specorator v2.0 for agentic coworker capabilities. | Pre-release (name reserved), 21 open issues |
| **agentic-workflow** | Workflow Definition | Spec-driven, 11-stage development workflow template (Idea → Research → Requirements → Design → Specification → Tasks → Implementation → Testing → Review → Release → Retrospective). Powers specorator's workflow cockpit and provides methodology, templates, and quality gates. | v0.5.1, actively maintained |

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

The runtime layer is the planned bridge that will make the system fully interconnected. Until it ships, specorator consumes `agentic-workflow` methodology directly and `agentonomous` is planned for direct v2.0 integration.

---

## 5. V1 Scope (This Deliverable)

V1 is a static site. No build-time API calls, no dynamic data, no client-side JavaScript beyond what Astro inlines.

### What V1 includes

| Feature | Description |
|---|---|
| **System overview** | Single-paragraph explanation of what the ecosystem is and what this hub does |
| **Architecture diagram** | Layered visual showing the four components, their layer assignments, and connection flow |
| **Project status cards** | One card per component — name, layer, status badge, description, tech stack, last-update date, open issue count (where known), links |
| **Roadmap section** | V1–V4 milestone cards; V1 highlighted as active |
| **Navigation** | Every card links directly to its GitHub repository |
| **CI/CD** | GitHub Actions workflow deploys to GitHub Pages on push to `develop` |

### What V1 explicitly excludes

- Live data from the GitHub API (V2)
- Per-project detail pages (V2)
- Real-time observability (V3)
- Agent/workflow execution tracking (V4)
- Any marketing copy, hero images, or CTA sections

---

## 6. Roadmap

| Version | Scope | Status |
|---|---|---|
| **V1** | Static site · architecture diagram · project listing · manual data in `projects.json` · GitHub Pages CI/CD | **Active (this PR)** |
| **V2** | GitHub API at build time · live `lastUpdate` / `openIssues` · per-project detail pages | Planned |
| **V3** | Runtime observability · agent session tracking · event stream visualization | Planned |
| **V4** | Workflow execution tracking · knowledge graph · semantic cross-linking | Planned |

---

## 7. Success Criteria (V1)

- Hub is deployed and publicly accessible at `https://luis85.github.io/specorator-ecosystem`
- All four ecosystem repositories are listed with correct metadata
- Architecture diagram accurately represents component relationships and layering
- Status badges are displayed per project
- Navigation links to each repository work correctly
- `npm run build` completes without errors from a clean checkout

---

## 8. Technical Constraints

- **Static only** — output must be pure HTML/CSS, deployable to GitHub Pages with no server-side runtime
- **No external framework dependencies** — no Tailwind CDN, Bootstrap, or similar; all CSS is local
- **Astro** as the static site generator (already established in PR #1)
- **Node 20** for CI
- **Base path** `/specorator-ecosystem` (GitHub Pages project site)
- **Dark theme** — the hub aesthetic must be dark; no light theme for V1

---

## 9. Data Source

All project metadata for V1 lives in `src/data/projects.json`. This is the **single source of truth** for the hub. V2 will replace the static fields (`lastUpdate`, `openIssues`) with GitHub API responses at build time while keeping the same data shape.

Fields per project:
- `id` — stable identifier (matches repo name)
- `name` — display name
- `role` — `ui | runtime | agents | workflow` (drives color theming)
- `layer` — human-readable layer label
- `description` — 1–2 sentence description
- `status` — `planned | in-progress | done`
- `version` — current version string or null
- `techStack` — array of technology labels (for display only)
- `repo` — GitHub repository URL
- `docs` — documentation URL or null
- `prd` — PRD/spec URL or null
- `lastUpdate` — ISO 8601 date string or null (V2: from GitHub API)
- `openIssues` — integer or null (V2: from GitHub API)
