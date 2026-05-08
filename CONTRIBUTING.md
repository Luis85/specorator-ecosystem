# Contributing

## Prerequisites

- Node 22 (`nvm use` if you have nvm)
- `npm ci` to install dependencies

## Local development

```bash
npm run dev        # start dev server at http://localhost:4321
npm run verify     # full quality gate (check → lint → format → test → build)
npm run format:fix # auto-fix formatting
```

## Branching

| Branch    | Purpose                                        |
| --------- | ---------------------------------------------- |
| `develop` | Integration branch — open PRs here             |
| `main`    | Publishing branch — deploys to GitHub Pages    |

All work goes through a PR to `develop`. Direct pushes to `develop` and `main` are blocked.

## Quality gate

CI runs `npm run verify` on every PR. All steps must pass before merging:

| Step     | Tool          |
| -------- | ------------- |
| `check`  | `astro check` |
| `lint`   | ESLint        |
| `format` | Prettier      |
| `test`   | Vitest        |
| `build`  | Astro         |

## Data files

- **`src/data/projects.json`** — stable project metadata (manually editable)
- **`src/data/roadmap.json`** — roadmap milestone definitions (manually editable)

Volatile fields (`status`, `version`, `lastUpdate`, `openIssues`, `docs`) are populated from the GitHub API at build time — do not edit them manually.

## Roadmap labels

To surface an issue on the hub roadmap, apply `roadmap:v3` or `roadmap:v4` to it in the relevant ecosystem repo. No other configuration needed — the hub picks it up at next build. See `CLAUDE.md` for the full label standard.
