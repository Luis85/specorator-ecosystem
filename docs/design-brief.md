# Design Brief — Specorator Ecosystem Hub

**Version:** 2.0  
**Aesthetic:** User-friendly information hub — dark, clean, purposeful  
**Framework:** Astro (static), Tailwind CSS 4

---

## 1. Design Philosophy

This is a **user-friendly information hub** — the front door to the Specorator ecosystem for everyone from first-time visitors to active contributors. The design communicates:

- **Clarity** — the visitor should understand the ecosystem's value within a single scroll; structure and hierarchy guide rather than intimidate
- **Authority** — the hub knows the state of the system; its visual weight should feel trustworthy and precise
- **Density where it matters** — technical data (project status, roadmap, architecture) is legible and compact; narrative sections breathe
- **Restraint** — no gradients on text, no distracting animations, no hero imagery; the content carries the weight

The aesthetic is dark and modern — closer to a well-designed developer product page than a generic SaaS landing page. Monospace type, consistent spacing, and deliberate color use signal that this is an engineered interface. The design serves a dual audience: someone discovering the project for the first time and a contributor checking status.

---

## 2. Color System

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

## 3. Typography

### Font Stack

```css
--font-primary: system-ui, -apple-system, sans-serif; /* headings, body */
--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
```

Monospace is used for identifiers, badges, labels, metadata, section numbers, and code-like values. The primary sans-serif handles hero headlines, body copy, and descriptions — allowing the hero to breathe while the data sections stay precise.

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

## 4. Spacing System

Base unit: **8px**. All spacing values are multiples of 4px (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80px).

- Hero section: `padding-top: 80px`, `padding-bottom: 64px`
- Content sections: `padding-top/bottom: 64px`
- Container max-width: `1100px` (full-bleed sections) or `max-w-3xl` for narrative sections
- Container horizontal padding: `24px`
- Card padding: `20–32px`
- Card gap: `16px`
- Section title margin-bottom: `40px`

---

## 5. Page Structure

The hub is a single-page experience with six content sections plus a final CTA. Each section has a numbered label, a bold headline, and section-appropriate content.

| Section | Label          | Purpose                                        |
| ------- | -------------- | ---------------------------------------------- |
| Hero    | —              | Value proposition, primary CTA, eyebrow badges |
| 01      | The Problem    | Three pain-point cards                         |
| 02      | How It Works   | Three-phase ADLC walkthrough                   |
| 03      | Where to Start | Primary entry point + builder alternatives     |
| 04      | Architecture   | Layered diagram + legend                       |
| 05      | Projects       | Live project status cards                      |
| 06      | Roadmap        | Per-project roadmap fetched from GitHub        |
| Final   | CTA            | Closing conversion section                     |

---

## 6. Component Specifications

### 6.1 Header / Navigation

Single sticky row with site identity on the left and navigation links on the right.

- **Logo**: `specorator` in `--text-primary`, `://hub` suffix in `--accent` (cyan), monospace
- Background: subtle `linear-gradient(to bottom, rgba(34,211,238,0.04), transparent)`
- Bottom border: `1px solid --border`

### 6.2 Hero Section

Full-width section with max-w-3xl content column.

- **Eyebrow row**: pill badges + live pulse indicator + version badge
  - Eyebrow text: `Obsidian Plugin · Claude Code · Open Source · No Coding Required`
  - Live indicator: green pulse dot (`animate-pulse`) + text `active development`
  - Version badge: `hub vX.Y.Z` — monospace, border outline, muted text
- **Headline**: 5xl–6xl primary font, bold, `tracking-tight`, `leading-tight`
  - Format: `[Statement] —\n[Coloured resolution in --accent]`
- **Subheadline**: xl sans-serif, `--text-secondary`, `leading-relaxed`, max-w-2xl
  - Inline links use `--text-primary` underline with `hover:--accent` transition
- **CTA row**: two buttons
  - Primary: `bg-primary` filled, rounded-xl, monospace, `Get the Plugin ↗`
  - Secondary: outlined `border-border/30`, rounded-xl, monospace, `Find your entry point ↓`

### 6.3 Section Labels

```
[section-num]  [LABEL TEXT]
```

- Section number: 0.75rem mono `--text-muted` (e.g., `01`, `02`)
- Label: 0.75rem mono `--text-secondary` uppercase `tracking-widest`
- Followed by a bold section headline (1.875rem primary font)

### 6.4 Problem Cards (Section 01)

Three cards in a responsive `md:grid-cols-3` grid.

**Card anatomy:**

- Background: `bg-card/50`, border `border-border/6`, `rounded-2xl`, padding `20px`
- Emoji icon (2xl) — no alt text needed, decorative
- Heading: mono semibold sm `--text-primary`
- Body: xs sans `--text-secondary` `leading-relaxed`

### 6.5 How It Works (Section 02)

Three-step vertical list with connector lines.

**Step anatomy:**

- Step number column: mono bold 2xl in `--accent`; vertical connector line `bg-border/20` between steps
- Content column: step title (xl primary bold) + description (sm sans `--text-secondary`) + detail badge (10px mono `--text-muted` uppercase)
- Steps separated by `border-b border-border/10`

### 6.6 Entry-Point Routing (Section 03)

Two-tier layout: one primary card + three secondary cards.

**Primary card (specorator plugin):**

- Large rounded card (`rounded-3xl`) with layer-colored border + glow (`box-shadow`)
- Background: `color-mix(in srgb, var(--layer-ui) 6%, --bg-card)`
- Project name in layer color + `Recommended starting point` badge in green
- Description (sm sans), primary CTA button, collapsible `Includes` detail box

**Builder alternative cards:**

- Builder divider with heading `Or build your own tools on top of the components`
- Three cards in `md:grid-cols-3` with layer-colored left border accent
- Each shows: project name, badge (status), description, CTA link (disabled if not yet available)

### 6.7 Architecture Diagram (Section 04)

Vertical stack with three rows and connector lines.

```
[                  specorator                  ]   ← full width, --layer-ui
              ↓ spec methodology ↑
[              specorator-runtime              ]   ← full width, --layer-runtime (dashed border = planned)
            ↙                  ↘
[  agentonomous  ]   [  agentic-workflow  ]         ← half-width each
```

**Node anatomy:**

- Border: `1px solid var(--c)` (layer color); planned nodes use `border-dashed`
- Background: `color-mix(in srgb, var(--c) 6%, var(--bg-card))`
- Box shadow: `0 0 24px -10px var(--c)` — subtle glow
- Hover: `box-shadow: 0 0 36px -6px var(--c)` — intensifies glow
- Name: mono 0.88rem 600 in layer color
- Sub-label: 0.72rem `--text-secondary`
- Status badge: color-coded pill (green = in-progress, amber = planned)

**Connectors:**

- `1px solid --border` lines; dashed for planned connections
- Labels in `--text-muted` monospace (e.g., `spec methodology`)

**Legend:**

- Row of `[dot] [role-name]` items: 8px circle in layer color + 0.72rem mono label
- Status legend row: dots for in-progress, planned, done
- Annotation: single line of 0.78rem `--text-muted` describing key relationships

### 6.8 Project Cards (Section 05)

Four cards in a responsive `md:grid-cols-2` grid.

**Card anatomy (top to bottom):**

1. **Top accent border** — `2px solid var(--ca)` where `--ca` is the layer color
2. **Card header:**
   - Row: `[card-name]` (mono 0.875rem 600) + `[status-badge]` (right-aligned, color-coded)
   - Sub-row: `[layer-label]` (0.72rem `--text-muted`)
3. **Description** — 0.82rem sans `--text-secondary`, flex-1
4. **Tech stack tags** — small pill badges, `--bg` background, `--border` outline, 0.62rem mono `--text-muted`
5. **Metadata row** (conditional — only if data exists) — `Updated [date]` + `Issues [count]` in mono
6. **Links row** — `Repo ↗` `Docs ↗` `PRD ↗` links, 0.72rem mono cyan, `opacity: 0.75 → 1` on hover

**Card states:**

- Default: `--bg-card` background, `--border` border
- Hover: `--bg-card-hover` background, `var(--ca)` all borders

### 6.9 Roadmap (Section 06)

Per-project roadmap sections — one collapsible block per project.

**Phase card anatomy:**

- Phase label (`roadmap:v3`, `roadmap:v4`) + status badge
- Progress bar: filled proportion based on done/total items
- Item list: each item shows status icon (done/active/planned) + title + description

**Status derivation (automatic — no extra label needed):**

| GitHub state | Is PR? | Display status |
| ------------ | ------ | -------------- |
| `open`       | no     | `planned`      |
| `open`       | yes    | `in-progress`  |
| `closed`     | —      | `done`         |

**Phase color coding by project role:**

- `ui` → indigo (`#818cf8`)
- `runtime` → cyan (`#22d3ee`)
- `agents` → pink (`#f472b6`)
- `workflow` → orange (`#fb923c`)

### 6.10 Footer

Single row.

- `specorator-ecosystem · github.com/luis85/specorator-ecosystem`
- 0.72rem monospace `--text-muted`
- Top border: `1px solid --border`

---

## 7. Border Radius

| Variable      | Value  | Use                              |
| ------------- | ------ | -------------------------------- |
| `--radius`    | `8px`  | Cards, architecture nodes        |
| `--radius-sm` | `4px`  | Badges, tags, pills              |
| `--radius-lg` | `12px` | CTA buttons                      |
| `--radius-xl` | `16px` | Entry-point cards (primary card) |

---

## 8. Responsive Behavior

Primary breakpoint at `768px` (`md:`), secondary at `640px` (`sm:`):

- **Hero**: headline scales from 3rem → 3.75rem; CTA buttons stack on narrow viewports
- **Problem cards**: `grid-cols-1` → `grid-cols-3`
- **Entry-point builder cards**: `grid-cols-1` → `grid-cols-3`
- **Architecture Row 3**: collapses to single column below `md:`
- **Project cards**: `grid-cols-1` → `grid-cols-2`
- All grids use `gap-4` and naturally reflow

No JavaScript required for responsiveness — pure CSS via Tailwind utilities.

---

## 9. Motion

Minimal. Two animation classes:

```css
animate-pulse   /* green live indicator in hero eyebrow — opacity pulse, 2s infinite */
transition-colors duration-150   /* button and link hover state changes */
```

Card hover uses CSS transitions on `background-color`, `border-color`, `box-shadow` (`0.15s`). No entrance animations, scroll effects, or loading states.

---

## 10. Accessibility

- All section headings use proper `h1`/`h2`/`h3` hierarchy
- External links include `target="_blank" rel="noopener"` and the `↗` suffix visually signals new-tab behavior
- Color is never the **sole** indicator of status — status badges carry both color and text label
- Layer identity uses both color and text label (never color alone)
- Contrast ratios: `--text-primary` (#fafafa) on `--bg` (#09090b) > 18:1; `--text-secondary` (#a1a1aa) on `--bg-card` (#111113) > 5.5:1
- Disabled entry-point links use `pointer-events-none` and reduced opacity — no interactive deception

---

## 11. File Structure

```
src/
  layouts/
    Base.astro           ← global styles, CSS variables, meta
    Layout.astro         ← template layout with header/footer
  pages/
    index.astro          ← hub page (all sections)
    changelog.astro      ← roadmap page
    integrations/
      index.astro        ← projects listing page
      [single].astro     ← per-project detail page
  data/
    projects.json        ← stable project metadata
    roadmap.json         ← roadmap label configuration
  lib/
    fetchProjectData.ts  ← GitHub API enrichment at build time
    fetchRoadmapData.ts  ← GitHub label-based roadmap fetch
  config/
    config.json          ← site title, base path, logo
    theme.json           ← design tokens
    menu.json            ← navigation links
content/
  homepage/-index.md     ← hero banner content
  integrations/          ← per-project detail content (Markdown)
  changelog/-index.md    ← V1–V4 roadmap milestones
  sections/
    faq.md               ← ecosystem FAQ
    call-to-action.md    ← CTA content
public/
  favicon.svg            ← cyan-on-black mark
```
