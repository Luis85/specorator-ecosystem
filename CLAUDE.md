# Specorator Ecosystem Hub — CLAUDE.md

## What this project is

Static site (Astro + GitHub Pages) that serves as the main entry point into the Specorator ecosystem. It is the first touchpoint for new visitors — introducing the product, routing users to their entry point, and showing the ecosystem roadmap.

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

Ecosystem roadmap milestone definitions. Each entry has:

| Field         | Type             | Description                                                                                                   |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `label`       | `string \| null` | `null` for completed phases (no GitHub tracking needed), or a `"roadmap:vN"` label for active/planned phases. |
| `name`        | `string`         | Display name for the milestone.                                                                               |
| `description` | `string`         | Brief description of what this phase delivers for the ecosystem.                                              |
| `status`      | `string`         | Static fallback status (`"done"`, `"active"`, `"planned"`). Used when GitHub data is unavailable.             |

For active/planned milestones, the hub fetches all issues and PRs carrying that label from across **all four ecosystem repos** at build time via `src/lib/fetchRoadmapData.ts`, and derives the milestone status from the aggregated results. The `milestoneStatus` falls back to the static `status` field if GitHub data is unavailable. Do not adjust `status` manually to reflect progress — apply GitHub labels to issues/PRs instead.

## Cross-ecosystem roadmap label standard

For an issue or PR to appear on the hub roadmap, the **ecosystem project repo** (specorator, specorator-runtime, agentonomous, agentic-workflow) must have the label applied to it.

### Required label for roadmap inclusion

| Label        | Maps to milestone  |
| ------------ | ------------------ |
| `roadmap:v3` | Composable Runtime |
| `roadmap:v4` | Intelligence Layer |

### Item status derivation (automatic — no extra label needed)

| GitHub state | Is PR? | Hub status    |
| ------------ | ------ | ------------- |
| `open`       | no     | `planned`     |
| `open`       | yes    | `in-progress` |
| `closed`     | —      | `done`        |

### Recommended type labels (optional but consistent)

These are not required for roadmap inclusion but keep issue lists readable across repos:

| Label         | Meaning                       |
| ------------- | ----------------------------- |
| `enhancement` | New capability or improvement |
| `bug`         | Defect fix                    |
| `research`    | Investigation or design work  |

### What each ecosystem project must do

1. Create the `roadmap:v3` and/or `roadmap:v4` labels in their GitHub repo.
2. Apply the label to any issue or PR that belongs to that milestone.
3. No other configuration is required — the hub picks them up at next build.

## Environment variables

| Variable       | Required                   | Purpose                                                                                                                                                                                    |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GITHUB_TOKEN` | Optional (but recommended) | Authenticates GitHub API calls during `astro build`. Without it, unauthenticated calls are used (60 req/hour limit). Both CI workflows pass this automatically via `secrets.GITHUB_TOKEN`. |

## CI workflows

- `.github/workflows/verify.yml` — runs on push to `develop` and PRs to `main`. Runs `npm run verify`, no deployment.
- `.github/workflows/deploy.yml` — runs on push to `main`. Runs `npm run verify`, then deploys to GitHub Pages on success.
