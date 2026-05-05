# Design Brief — Specorator Ecosystem Hub

**Version:** 2.0
**Aesthetic:** Developer-native marketing page — dark, structured, monospace
**Framework:** Astro (static), Tailwind CSS 4

---

## 1. Design Philosophy

The hub is a **marketing and sales landing page** written in the visual language of a developer tool. Its job is to win new users for the Specorator plugin — first-time visitors should leave with a clear understanding of what they get and a reason to install it.

The design earns trust through clarity: concise messaging, a consistent visual system, and data that speaks for itself. The aesthetic communicates that this is a serious, engineered product — not a side project, not a one-page SaaS template.

The design serves a dual audience: someone discovering the project for the first time and a developer who wants to build on top of individual packages. Both need the same foundation: clarity on what the ecosystem is, what state it's in, and where to go next.

**What this page is:**
- A first impression that converts curiosity into a plugin install
- A routing layer for developers who want to go deeper into individual packages
- An honest status report on the ecosystem's progress

**What this page is not:**
- A developer dashboard or ops interface
- A README clone
- A feature-list dump

Design reference: Linear dark mode, Vercel product pages, well-designed CLI documentation sites. The shared quality is **confident restraint** — every element earns its place.

---

## 2. Target Audience

### Primary — The Curious Builder

Someone who ships software but doesn't want to manage a development process manually. They may be a solo founder, a product manager who writes code, a designer who can deploy, or a developer tired of reinventing their planning workflow. Not necessarily deep-technical — they can follow instructions, install an Obsidian plugin, and describe what they want in plain English.

**What they need from this page:** To understand what they get, how it works at a high level, and that it won't require learning a new technical stack. The barrier to entry must feel low.

**Primary conversion action:** Click "Get the Plugin" and install specorator.

### Secondary — The Technical Evaluator

A developer who wants to understand the architecture — either to evaluate whether to use it, contribute, or build their own tooling on top of individual packages. Comfortable with terms like CLI, TypeScript library, and API.

**What they need from this page:** A clear picture of which layer does what, which packages are standalone, and where to start for their use case.

**Primary conversion action:** Navigate to `agentic-workflow`, `agentonomous`, or `specorator-runtime` based on their building goal.

### Tertiary — The Ecosystem Follower

Someone tracking the project's progress over time. They may return periodically to check what has shipped.

**What they need from this page:** A quick status update — what is active, what is coming, where to watch.

---

## 3. Page Goals

Listed in priority order. The page succeeds or fails on goal 1.

1. **Convert visitors into plugin installers.** The plugin (specorator) is the easiest, highest-value entry point. Every section of the page should, directly or indirectly, build confidence toward clicking "Get the Plugin."

2. **Route technical builders to their starting point.** Developers who want to integrate individual packages need to find `agentic-workflow` (active) or understand that `agentonomous` and `specorator-runtime` are coming.

3. **Establish trust through honesty.** Open source, MIT licence, no sign-up, files stay local — meaningful trust signals for this audience. Acknowledge what is still planned versus what ships today.

4. **Communicate ecosystem coherence.** The four projects should read as a unified system, not four unrelated repos.

5. **Invite ecosystem followers to track progress.** The roadmap section is the passive hook for repeat visitors.

---

## 4. Communication Style

### Voice

- **Plain language first.** If a word requires domain knowledge to understand (MCP, ADLC, agent lifecycle, stage gating), replace it or define it in context.
- **Outcome-first.** Lead with what the visitor gets ("AI handles the planning and drafting"), not with how it works ("the orchestration layer dispatches agent roles sequentially").
- **Confident, not hype-driven.** State what the product does without superlatives. Claims should be earned by the section that follows, not just asserted.
- **Honest about status.** Active development indicators, "Planned" badges, and roadmap progress bars are trust signals, not weaknesses.
- **Dry precision, not warmth.** Clear, direct, no filler. The tone is close to good technical writing.

### Specific rules

| Avoid | Prefer |
| --- | --- |
| "Agentic Development Lifecycle" | "12-stage workflow" or "development workflow" |
| "MCP server / MCP exposure" | "available as a tool for AI coding sessions" (only if needed) |
| "composable building blocks" | "standalone package" |
| "orchestration layer" | "integration library" |
| "agent lifecycle" | "the full workflow" or "the full process" |
| "Claude Code agents" | "AI agents" or just "AI" |
| "stage gating" | "quality checks" or "decision points" |
| "event streaming" | "track progress" or "follow along" |
| Feature-list copy ("manage skills, commands, tools...") | Outcome copy ("AI handles the writing and planning") |

### Section-level intent

| Section | What it communicates |
| --- | --- |
| Hero | What the product is and what you get. One-sentence mental model. |
| Problem (01) | Why this matters — the pain that makes the solution feel necessary. |
| How It Works (02) | Enough structure to feel confident, not enough detail to overwhelm. |
| Where to Start (03) | Clearest possible routing. Plugin first; builder packages second. |
| Roadmap (04) | Honesty about what exists, what is coming, that the project is alive. |
| Final CTA | Repeat key trust signals. Lower the barrier to action. |

---

## 5. Color System

All colors are defined as CSS custom properties on `:root`.

### Background

| Variable          | Value     | Use                               |
| ----------------- | --------- | --------------------------------- |
| `--bg`            | `#09090b` | Page background (near-black zinc) |
| `--bg-card`       | `#111113` | Card backgrounds                  |
| `--bg-card-hover` | `#18181b` | Card background on hover          |

### Border

| Variable          | Value     | Use                                |
| ----------------- | --------- | ---------------------------------- |
| `--border`        | `#27272a` | Standard borders, section dividers |
| `--border-subtle` | `#1c1c1f` | Subtle internal dividers           |

### Text

| Variable           | Value     | Use                               |
| ------------------ | --------- | --------------------------------- |
| `--text-primary`   | `#fafafa` | Headings, primary labels          |
| `--text-secondary` | `#a1a1aa` | Body copy, descriptions           |
| `--text-muted`     | `#52525b` | Labels, metadata, section numbers |

### Accent

| Variable   | Value     | Use                                                          |
| ---------- | --------- | ------------------------------------------------------------ |
| `--accent` | `#22d3ee` | Primary accent (cyan-400); links, logo suffix, active states |

### Layer Identity Colors

Each ecosystem component has a dedicated identity color used for card borders, architecture nodes, and legend dots.

| Variable           | Value     | Component          | Rationale                                     |
| ------------------ | --------- | ------------------ | --------------------------------------------- |
| `--layer-ui`       | `#818cf8` | specorator (UI)    | Indigo — interface/cognitive layer            |
| `--layer-runtime`  | `#22d3ee` | specorator-runtime | Cyan — same as accent; the engine is the core |
| `--layer-agents`   | `#f472b6` | agentonomous       | Pink — agents are active/energetic            |
| `--layer-workflow` | `#fb923c` | agentic-workflow   | Orange — process/sequence/flow                |

### Status Colors

| Variable               | Value     | Status              |
| ---------------------- | --------- | ------------------- |
| `--status-in-progress` | `#22c55e` | In Progress (green) |
| `--status-planned`     | `#f59e0b` | Planned (amber)     |
| `--status-done`        | `#3b82f6` | Done (blue)         |

---

## 6. Typography

### Font Stack

```css
--font-primary: system-ui, -apple-system, sans-serif; /* headings, body */
--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
```

Monospace is the primary expressive typeface — used for the logo, section numbers, identifiers, badges, labels, and metadata. Sans-serif handles hero headlines, body copy, and descriptions — allowing the hero to breathe while the data sections stay precise.

### Type Scale

| Role               | Size          | Font    | Weight | Treatment                         |
| ------------------ | ------------- | ------- | ------ | --------------------------------- |
| Hero headline      | 3rem–3.75rem  | primary | 700    | `tracking-tight`, `leading-tight` |
| Section headline   | 1.875rem      | primary | 700    | `leading-snug`                    |
| Section label      | 0.75rem       | mono    | 400    | `uppercase, tracking-widest`      |
| Section number     | 0.75rem       | mono    | 400    | `--text-muted`                    |
| Card name          | 0.875rem      | mono    | 600    | —                                 |
| Body / description | 0.875rem–1rem | primary | 400    | `line-height: 1.55–1.65`          |
| Small body         | 0.75rem       | primary | 400    | `leading-relaxed`                 |
| Badge / label      | 0.56–0.72rem  | mono    | 700    | `uppercase, tracking-wide`        |
| Metadata value     | 0.78rem       | mono    | 400    | —                                 |

---

## 7. Spacing System

Base unit: **8px**. All spacing values are multiples of 4px (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80px).

- Hero section: `padding-top: 80px`, `padding-bottom: 64px`
- Content sections: `padding-top/bottom: 64px`
- Container max-width: `1100px` (full-bleed sections) or `max-w-3xl` for narrative sections
- Container horizontal padding: `24px`
- Card padding: `20–32px`
- Card gap: `16px`
- Section heading gap from body: `40px`

---

## 8. Page Structure

The homepage is a single-page experience with five numbered content sections plus a final CTA. Each section has a numbered label, a bold headline, and section-appropriate content.

| Section | Label          | Purpose                                           |
| ------- | -------------- | ------------------------------------------------- |
| Hero    | —              | Value proposition, primary CTA, eyebrow badges    |
| 01      | The Problem    | Three pain-point cards                            |
| 02      | How It Works   | Three-phase workflow walkthrough                  |
| 03      | Where to Start | Primary plugin entry point + builder alternatives |
| 04      | Roadmap        | Ecosystem milestone timeline with live GitHub data |
| Final   | CTA            | Closing conversion section with trust signals     |

Additional pages in the hub:
- `/integrations` — project listing with live status cards and architecture diagram
- `/integrations/[slug]` — per-project detail pages
- `/changelog` — full roadmap and milestone history

---

## 9. Component Specifications

### 9.1 Header / Navigation

Single sticky row with site identity on the left and navigation links on the right.

- **Logo text**: `specorator://hub` — `specorator://` in `--text-primary`, `hub` in `--accent`, monospace
- Background: subtle `linear-gradient(to bottom, rgba(34,211,238,0.04), transparent)`
- Bottom border: `1px solid --border`

### 9.2 Hero Section

Full-width section with `max-w-3xl` content column.

**Eyebrow row:**
- Taxonomy text: `Obsidian Plugin · AI-Powered · Open Source · No Coding Required` — mono xs, `--text-muted`, uppercase
- Live indicator: green pulse dot (`animate-pulse`) + `active development` text
- Version badge: `hub vX.Y.Z` — mono, border outline, muted

**Headline:**
- Two lines. Primary statement in `--text-primary`, resolution phrase in `--accent`
- Size: `text-5xl md:text-6xl`, bold, `tracking-tight`, `leading-tight`

**Subheadline:**
- One paragraph, `text-xl`, `--text-secondary`, `leading-relaxed`, `max-w-2xl`
- Establishes the mental model: what it is, what you get, key differentiators (plain files, no coding)
- Inline link to Obsidian — underlined, hover to accent

**CTA buttons:**
- Primary: `bg-primary` filled, rounded-xl, mono, `Get the Plugin ↗` — links to specorator docs/repo
- Secondary: outlined `border-border/30`, rounded-xl, mono, `Find your entry point ↓` — anchors to `#use-cases`

### 9.3 Section Labels

```
[section-num]  [LABEL TEXT]
```

- Section number: 0.75rem mono `--text-muted` (`01`, `02`, etc.)
- Label: 0.75rem mono uppercase `tracking-widest`
- Followed by a bold section headline in primary font

### 9.4 Problem Cards (Section 01)

Three equal cards in a responsive `md:grid-cols-3` grid.

**Card anatomy:**
- Background: `bg-card/50`, border `border-border/6`, `rounded-2xl`, padding `20px`
- Emoji icon (2xl, decorative)
- Heading: mono semibold sm `--text-primary`
- Body: xs sans `--text-secondary` `leading-relaxed`

Cards describe the pain, not the solution — they prime the "How It Works" section.

### 9.5 How It Works (Section 02)

Three-step vertical timeline with connector lines. `max-w-3xl`.

**Step anatomy:**
- Step number column: mono bold 2xl in `--accent`; vertical connector line `bg-border/20` between steps
- Content column: step title (xl primary bold) + description (sm sans `--text-secondary`) + stage detail (10px mono `--text-muted` uppercase)
- Steps separated by `border-b border-border/10`; last step has no connector

### 9.6 Where to Start (Section 03) — Primary Conversion Zone

Two sub-zones. The plugin card is the hero of this section.

**Primary card (specorator plugin):**
- Prominent, glow-bordered card using `--layer-ui` (indigo)
- `color-mix` background tint + `box-shadow` ambient glow
- Project name in layer color + `Recommended starting point` badge in green
- Description (sm sans) + primary CTA button (`Get the Plugin ↗`)
- Side panel: `Includes` list of bundled components with layer-colored dots + `Planned` additions
- This is the primary conversion surface — it must be unmissable

**Divider:**
- Full-width centered: `For builders — want to go deeper?`
- Flanked by `border/10` horizontal rules

**Builder cards (three):**
- `md:grid-cols-3` grid
- Each card: top accent border in layer color, name, status badge, description, CTA link
- Planned components: CTA link at `opacity-40 cursor-not-allowed` with `aria-disabled`
- Descriptions lead with value ("the workflow engine that powers specorator, available standalone"), not implementation

### 9.7 Roadmap (Section 04)

Vertical timeline. `max-w-3xl`.

**Section header:**
- Numbered label + concise heading + one sub-sentence in plain language (not internal mechanism detail)

**Timeline items:**
- Status dot: filled `--primary` (done), green `animate-pulse` (active), hollow border (planned)
- Connector line between items
- Name + status badge (`Complete` / `Active` / `Planned`)
- Description: what this phase delivers, outcome-focused
- Progress bar (milestones with GitHub data): thin `h-1` bar, done/total ratio + counter label
- Fallback states: "GitHub data unavailable" or "No issues tracked yet" in muted mono

### 9.8 Final CTA Section

Rounded card with ambient glow (`color-mix` cyan tint, `--primary/20` border).

- Eyebrow: `Ready to start?` in accent
- Heading: two-line statement reinforcing core value proposition
- Body: one paragraph restating three key trust signals (no coding, open source, no lock-in)
- Two CTAs: primary (get specorator) + secondary (browse the workflow)
- Footer line: licence note + active milestone name if available from GitHub

### 9.9 Footer

Single row.

- Copyright and ecosystem credit in monospace, `--text-muted`
- Navigation links: `Home`, `Projects`, `Roadmap`, GitHub repos
- Top border: `1px solid --border`

---

## 10. Border Radius

| Variable       | Value  | Use                                    |
| -------------- | ------ | -------------------------------------- |
| `--radius`     | `8px`  | Cards, architecture nodes              |
| `--radius-sm`  | `4px`  | Badges, tags, pills                    |
| `--radius-lg`  | `12px` | CTA buttons (rounded-xl)               |
| `--radius-xl`  | `16px` | Problem cards (rounded-2xl)            |
| `--radius-2xl` | `24px` | Primary card, builder cards, final CTA |

---

## 11. Responsive Behavior

Primary breakpoint at `768px` (`md:`), secondary at `640px` (`sm:`):

- **Hero**: headline scales `text-5xl` → `text-6xl`; CTA row wraps on narrow viewports
- **Problem cards**: `grid-cols-1` → `grid-cols-3`
- **Builder cards**: `grid-cols-1` → `grid-cols-3`
- **Primary card side panel**: stacks vertically → `sm:flex-row`
- All other layouts reflow naturally via Tailwind's `flex-wrap` and `gap`

No JavaScript required for responsiveness — pure CSS via Tailwind utilities.

---

## 12. Motion

Minimal. Two animation types:

```css
animate-pulse            /* green live indicator (hero eyebrow) and active roadmap dot */
transition-colors duration-150   /* button and link hover state changes */
```

Card hover uses `0.15s` CSS transitions on `background-color`, `border-color`, `opacity`. No entrance animations, scroll effects, or loading states.

---

## 13. Accessibility

- All section headings use proper `h1`/`h2` hierarchy
- External links include `target="_blank" rel="noopener"` and the `↗` suffix signals new-tab behavior
- Color is never the **sole** status indicator — badges carry both color and text label
- Layer identity uses both color and text label (never color alone)
- Disabled builder links use `aria-disabled="true"` and `cursor-not-allowed` — not interactive when not actionable
- Contrast ratios: `--text-primary` (#fafafa) on `--bg` (#09090b) > 18:1; `--text-secondary` (#a1a1aa) on `--bg-card` (#111113) > 5.5:1

---

## 14. File Structure

```
src/
  layouts/
    Base.astro           ← global styles, CSS variables, meta
    Layout.astro         ← template layout with header/footer
  pages/
    index.astro          ← marketing landing page (all sections)
    changelog.astro      ← roadmap page
    integrations/
      index.astro        ← projects listing page
      [single].astro     ← per-project detail page
  data/
    projects.json        ← stable project metadata
    projects.schema.json ← JSON schema for validation
    roadmap.json         ← milestone definitions
  lib/
    fetchProjectData.ts  ← GitHub API enrichment at build time
    fetchRoadmapData.ts  ← GitHub label-based roadmap aggregation
  config/
    config.json          ← site metadata, navigation button, footer
    menu.json            ← nav and footer link sets
    theme.json           ← design tokens
content/
  homepage/-index.md     ← hero banner content
  integrations/          ← per-project detail content (Markdown)
  changelog/-index.md    ← roadmap milestone history
  sections/
    faq.md               ← ecosystem FAQ
    call-to-action.md    ← CTA content
public/
  favicon.svg            ← cyan-on-black mark
```
