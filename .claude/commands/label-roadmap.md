# label-roadmap

Audit one or all specorator ecosystem project repositories, define roadmap phases as `roadmap:*` GitHub labels, and apply those labels to the correct issues and PRs.

Optional argument: a single repo name to process only that project (e.g. `/label-roadmap agentic-workflow`). When omitted, all four repos are processed.

**Target repos (process all unless $ARGUMENTS specifies one):**
- Luis85/specorator
- Luis85/specorator-runtime
- Luis85/agentonomous
- Luis85/agentic-workflow

---

## Context — how the hub consumes this data

The specorator-ecosystem hub (luis85/specorator-ecosystem) builds its roadmap section at deploy time by:

1. Fetching all labels from each project repo that start with `roadmap:`
2. For each such label, fetching all issues and PRs that carry it (`state=all`)
3. Deriving status automatically — no extra labels needed:

| GitHub state | Is it a PR? | Hub displays as |
|---|---|---|
| open | no | Planned |
| open | yes | In Progress |
| closed | — | Done |

The label's **description field** becomes the phase subtitle shown on the hub. A well-written description ("Expose the workflow engine as an MCP server") is more useful than a terse one ("MCP").

---

## Your task

### Step 0 — Choose your tools

Use whatever GitHub access is available in this session. In order of preference:

1. **GitHub MCP tools** (`mcp__github__*`) — use if available; they are already authenticated
2. **`gh` CLI** — use if MCP tools are unavailable; run `gh auth status` first to confirm authentication
3. **GitHub REST API via `curl` or `fetch`** — fall back to this if neither above is available; use the `GITHUB_TOKEN` env var for auth

Do not mix approaches unnecessarily. Pick the best available tool and use it consistently.

### Step 1 — Read each repo

For each target repo, collect:

- All **open issues** with their titles, bodies, and existing labels
- All **open PRs** with their titles, bodies, and existing labels
- All **closed issues** from the past 90 days (to identify shipped work worth marking Done)
- All **existing labels** (to avoid creating duplicates)

Read enough of the issue/PR body to understand what the work actually is. Skim the title first; read the body if the title is ambiguous.

### Step 2 — Identify roadmap phases for that repo

Group the issues and PRs into coherent delivery phases. A good phase is:

- Scoped to a shippable increment — not a single task, not a vague epic
- Named after what the user or developer gets when it ships
- Sized at roughly 2–10 issues (smaller = faster feedback loop)

**Naming rules:**
- Label name format: `roadmap:<slug>` where slug is lowercase kebab-case
- Examples: `roadmap:v3`, `roadmap:mcp-server`, `roadmap:agent-roles`, `roadmap:cli-init`
- Keep slugs short (≤ 20 chars), descriptive, and stable — they appear in URLs and data files

**Known context per repo (use as guidance, not gospel):**

*specorator* — Obsidian plugin, UI/visualization layer  
Likely phases: `roadmap:v3` (runtime observability UI inside Obsidian), `roadmap:v4` (knowledge graph browser)

*specorator-runtime* — npm orchestration library + MCP server  
Likely phases: `roadmap:mcp-contract` (MCP server interface definition), `roadmap:session-schema` (V3+V4 event data model), `roadmap:async-workers` (background worker event bus)

*agentonomous* — TypeScript agent library  
Likely phases: `roadmap:agent-roles` (six role contracts), `roadmap:memory-interface` (AgentMemory + semantic search), `roadmap:provider-abstraction` (LLMProvider interface)

*agentic-workflow* — 12-stage methodology + CLI  
Likely phases: `roadmap:mcp-server` (MCP tool exposure), `roadmap:cli-init` (workflow init command), `roadmap:quality-gate-hooks` (onStageTransition event system)

Rename, merge, or split these suggestions freely based on what the actual issues say. Do not invent phases that have no issues to back them.

### Step 3 — Create labels

For each phase you identified, create the label if it does not already exist:

- Name: `roadmap:<slug>`
- Description: one sentence describing what ships in this phase (max ~70 chars)
- Color: `#22d3ee` (cyan — consistent across all ecosystem repos)

If the label already exists but has an empty or poor description, update the description.

### Step 4 — Apply labels to issues and PRs

For each issue or PR that belongs to a phase, add the `roadmap:<slug>` label.

Guidelines:
- An issue/PR may carry multiple `roadmap:*` labels only if it genuinely spans phases (rare; prefer splitting the issue instead)
- Skip pure housekeeping items (typo fixes, dependency bumps, CI config tweaks) unless they are phase-blocking
- Label closed issues and merged PRs that represent shipped phase work — this gives the hub accurate Done counts
- Do NOT create, close, reopen, or edit the body/title of any issue or PR

### Step 5 — Verify

After processing each repo, confirm:

- At least one `roadmap:*` label exists
- Every created label has a non-empty description
- Every label has at least one issue or PR assigned to it
- No orphan issues exist that clearly belong to a phase but were missed

### Step 6 — Report

Print a summary for each repo processed:

```
Luis85/<REPO>
  Labels: roadmap:mcp-server · roadmap:cli-init · roadmap:quality-gate-hooks
  Issues labelled:
    roadmap:mcp-server   → #12 Expose workflow as MCP server [open]
                         → #18 MCP tool: workflow.init [open]
    roadmap:cli-init     → #9  Add `workflow init` CLI command [open]
    ...
```

If a repo has no issues at all, note that and skip label creation.

---

## Hard constraints

- **Read-only on issue content** — do not edit titles, bodies, assignees, or milestones
- **No new issues** — label existing issues only
- **No code changes** — this task is entirely GitHub metadata (labels) work
- **Idempotent** — running this command twice must produce the same result; check before creating
