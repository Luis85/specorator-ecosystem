# Specorator Ecosystem Hub — CLAUDE.md

## What this project is

Static site (Astro + GitHub Pages) that serves as the central control plane for the Specorator ecosystem. It lists all four ecosystem projects, shows the architecture, and tracks the roadmap.

## Branching model

| Branch    | Purpose                                                                  |
| --------- | ------------------------------------------------------------------------ |
| `develop` | Active integration branch. CI runs `npm run verify` but does NOT deploy. |
| `main`    | Publishing branch. CI runs `npm run verify` AND deploys to GitHub Pages. |

- Feature work → `develop` → PR to `main`
- Direct commits to `main` should be avoided
- `main` always represents the published state

## Quality gate

```
npm run verify
```

This runs in sequence: `check → lint → format → test → build`. All steps must pass before merging to `main`.

| Script               | Tool          | What it does                         |
| -------------------- | ------------- | ------------------------------------ |
| `npm run check`      | `astro check` | TypeScript and Astro type validation |
| `npm run lint`       | ESLint        | Lint Astro and TypeScript files      |
| `npm run format`     | Prettier      | Check formatting (no writes)         |
| `npm run format:fix` | Prettier      | Auto-fix formatting                  |
| `npm run test`       | Vitest        | Run unit tests                       |
| `npm run build`      | Astro         | Produce `./dist`                     |

## Data files

### `src/data/projects.json`

Registry of ecosystem projects. The schema is documented in `src/data/projects.schema.json`.

**Stable fields — manually editable:**
`id`, `name`, `role`, `layer`, `description`, `repo`, `techStack`, `dependencies`

**Volatile fields — do NOT manually edit (set to `null` and let automation populate):**

| Field        | Automated by                   | Issue |
| ------------ | ------------------------------ | ----- |
| `status`     | GitHub Topics strategy         | #7    |
| `lastUpdate` | GitHub API `pushed_at`         | #3    |
| `openIssues` | GitHub API `open_issues_count` | #3    |
| `version`    | GitHub Releases API `tag_name` | #3    |
| `docs`       | GitHub API `repo.homepage`     | #8    |
| `prd`        | TBD                            | #8    |

Volatile fields are fetched at build time by `src/lib/fetchProjectData.ts`. If the GitHub API is unavailable they fall back to `null`; the build always succeeds.

### `src/data/roadmap.json`

Roadmap phase definitions. The `active: true` entry drives the "Active Milestone" stat in the hero and the highlighted roadmap card. Only one entry should have `active: true` at a time.

## Environment variables

| Variable       | Required                   | Purpose                                                                                                                                                                                    |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GITHUB_TOKEN` | Optional (but recommended) | Authenticates GitHub API calls during `astro build`. Without it, unauthenticated calls are used (60 req/hour limit). Both CI workflows pass this automatically via `secrets.GITHUB_TOKEN`. |

## CI workflows

- `.github/workflows/verify.yml` — runs on push to `develop` and PRs to `main`. Runs `npm run verify`, no deployment.
- `.github/workflows/deploy.yml` — runs on push to `main`. Runs `npm run verify`, then deploys to GitHub Pages on success.
