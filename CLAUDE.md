# Specorator Ecosystem Hub — CLAUDE.md

This is the codebase for the **Specorator Ecosystem Hub** — a static website hosted on GitHub Pages that serves as the entry point for the Specorator ecosystem.

---

## What this repo is

The hub is the front door to the ecosystem. It aggregates, organises, and links to all four ecosystem components. It is not a marketing page and not a control plane — it is a developer-facing navigation and discovery site.

**Live URL:** https://luis85.github.io/specorator-ecosystem

---

## Stack

- **Astro 6** — static site generator
- **Tailwind CSS 4** — utility-first styling
- **TypeScript** — strict mode
- **GitHub Actions** — CI/CD (verify on PR, deploy on merge to `main`)
- **GitHub Pages** — hosting

---

## Branching model

| Branch | Purpose |
|---|---|
| `main` | Published state — always matches what is live on GitHub Pages |
| `develop` | Active integration branch — CI verifies but does NOT deploy |
| `feature/*` | Short-lived feature branches, merged to `develop` via PR |

**Rules:**
- Direct commits to `main` should be avoided
- Merges to `main` must go through a PR with passing CI (`verify` job)
- Deployment to GitHub Pages happens only when a commit lands on `main`

---

## Commands

```bash
npm run dev          # Start dev server (localhost:4321)
npm run build        # Full production build → ./dist
npm run preview      # Preview the dist output locally

npm run check        # Astro type + content check
npm run lint         # ESLint (our code only — layouts/ and lib/ are excluded)
npm run format       # Prettier check (CI mode — fails if files need formatting)
npm run format:fix   # Prettier write (local dev — reformats files in place)
npm run test         # Vitest unit tests

npm run verify       # Full quality gate: check + lint + format + test + build
```

`npm run verify` is the canonical gate used by both CI workflows. It must pass before any merge to `main`.

---

## Data files

### `src/data/projects.json` — Project registry

The single source of truth for all ecosystem project metadata.

#### Stable fields (manually editable)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable identifier, matches the repo name |
| `name` | `string` | Display name |
| `role` | `"ui" \| "runtime" \| "agents" \| "workflow"` | Drives layer color theming |
| `layer` | `string` | Human-readable layer label |
| `description` | `string` | 1–2 sentence description |
| `status` | `"planned" \| "in-progress" \| "done"` | **Manual until issue #7 is resolved** |
| `version` | `string \| null` | Current version string |
| `techStack` | `string[]` | Technology tags (display only) |
| `repo` | `string` | GitHub repository URL |
| `docs` | `string \| null` | Documentation URL (**do not manually set — see issue #8**) |
| `prd` | `string \| null` | PRD/spec URL (**do not manually set — see issue #8**) |

#### Volatile fields (NOT manually editable — must come from automation)

> These fields must always be `null` in the source file. They will be populated automatically by the GitHub API at build time once issue #3 is resolved. **Never hardcode values here — stale integers are more dangerous than null.**

| Field | Type | Source (once automated) |
|---|---|---|
| `lastUpdate` | `string \| null` | `repo.pushed_at` from GitHub API |
| `openIssues` | `number \| null` | `repo.open_issues_count` from GitHub API |

### `src/data/roadmap.json` — Roadmap milestones

Controls the roadmap section on the homepage. Fields:

| Field | Type | Notes |
|---|---|---|
| `phase` | `string` | Version label (e.g. `"V1"`) |
| `title` | `string` | Milestone name |
| `description` | `string` | HTML allowed — rendered with `set:html` |
| `status` | `"active" \| "planned" \| "done"` | Exactly one milestone should be `"active"` |

The active milestone phase is also shown in the hero stats row. Change `status` here to update both the roadmap card highlight and the stats badge.

---

## Tests

Tests live in `src/__tests__/`. Run with `npm run test`.

Key invariant enforced by tests: all volatile fields (`lastUpdate`, `openIssues`) must be `null` in `projects.json`. This prevents stale hardcoded values from slipping in.

---

## What NOT to do

- Do not manually set `lastUpdate` or `openIssues` in `projects.json` — these will be automated (issue #3)
- Do not manually set `docs` or `prd` links — strategy TBD (issue #8)
- Do not push directly to `main`
- Do not edit files in `src/layouts/` or `src/lib/` — these are the PowerAI theme's internals and are excluded from linting and formatting
