# Design Brief — Specorator Ecosystem Hub

**Version:** 1.0  
**Aesthetic:** System control plane — dark, dense, monospace  
**Framework:** Astro (static), zero external CSS frameworks

---

## 1. Design Philosophy

This is a **developer tool**, not a product landing page. The design language should communicate:

- **Authority** — the hub knows the state of the system; its visual weight should feel trustworthy
- **Density** — information should be legible and compact, not padded out
- **Precision** — monospace type, grid alignment, and consistent spacing signal that this is an engineered interface
- **Restraint** — no gradients, no hero images, no animations beyond a subtle status pulse; nothing that distracts from the data

The reference aesthetic is a terminal + a well-designed ops dashboard: `htop`, Grafana dark mode, Linear dark mode. Not a SaaS marketing page.

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

Each ecosystem component has a dedicated identity color used for card top-borders, architecture nodes, and legend dots.

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
--font-sans: system-ui, -apple-system, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
```

Monospace is the primary expressive type face — used for the logo, section numbers, identifiers, badges, labels, metadata, and code-like values. Sans-serif is used for body copy (descriptions, paragraphs).

### Type Scale

| Role               | Size         | Font | Weight | Treatment                               |
| ------------------ | ------------ | ---- | ------ | --------------------------------------- |
| Logo               | 1.5rem       | mono | 700    | `letter-spacing: -0.02em`               |
| Section title      | 0.78rem      | sans | 600    | `uppercase, letter-spacing: 0.12em`     |
| Card name          | 0.875rem     | mono | 600    | —                                       |
| Body / description | 0.82rem      | sans | 400    | `line-height: 1.55`                     |
| Badge / label      | 0.62–0.72rem | mono | 700    | `uppercase, letter-spacing: 0.05–0.1em` |
| Metadata value     | 0.78rem      | mono | 400    | —                                       |
| Footer             | 0.72rem      | mono | 400    | —                                       |

---

## 4. Spacing System

Base unit: **8px**. All spacing values are multiples of 4px (4, 8, 12, 16, 20, 24, 32, 36, 48, 56px).

- Section padding: `56px 0` top/bottom
- Container max-width: `1100px`, horizontal padding `24px`
- Card padding: `20px`
- Card gap: `16px`
- Section title margin-bottom: `36px`

---

## 5. Component Specifications

### 5.1 Header

Single row: logo on the left, status indicators on the right.

- **Logo**: `specorator` in `--text-primary`, `://hub` in `--accent` (cyan)
- **Tagline**: `Ecosystem Control Plane · V1` in `--text-muted`, monospace, 0.75rem, `letter-spacing: 0.06em`
- **Version badge**: `v0.1.0` — pill shape, `--border` outline, `--text-muted` text, 0.72rem mono
- **Live indicator**: green pulse dot + `live` label in `--status-in-progress`
  - Pulse animation: `opacity 1 → 0.25 → 1` at 2s ease-in-out infinite
- Background: `linear-gradient(to bottom, rgba(34,211,238,0.04), transparent)` — extremely subtle cyan glow at top
- Bottom border: `1px solid --border`

### 5.2 Section Title

```
[section-num]  [TITLE TEXT]
```

- Section number in `--text-muted` monospace 0.65rem (e.g., `01`, `02`, `03`, `04`)
- Title in `--text-secondary` sans 0.78rem 600 uppercase 0.12em tracking
- Separator: `1px solid --border-subtle` below each section (except last)

### 5.3 Overview Stats

Three stat blocks in a row:

```
[value]        [value]        [value]
[label]        [label]        [label]
```

- Value: 1.75rem monospace 700 `--text-primary`
- Label: 0.65rem sans uppercase `--text-muted` letter-spacing 0.08em
- Each stat block: `min-width: 80px`, centered text

### 5.4 Architecture Diagram

Vertical stack with three rows:

```
[                  specorator                  ]   ← Row 1, full width, --layer-ui
              ↓ spec methodology ↑
[              specorator-runtime              ]   ← Row 2, full width, --layer-runtime
            ↙                  ↘
[  agentonomous  ]   [  agentic-workflow  ]         ← Row 3, half-width each, --layer-agents / --layer-workflow
```

**Node anatomy:**

- Border: `1px solid var(--c)` where `--c` is the layer color
- Background: `color-mix(in srgb, var(--c) 6%, var(--bg-card))`
- Box shadow: `0 0 24px -10px var(--c)` — subtle glow
- On hover: `box-shadow: 0 0 36px -6px var(--c)` — intensifies glow
- Name: monospace 0.88rem 600 in layer color
- Sub-label: 0.72rem `--text-secondary`
- Planned nodes: `opacity: 0.7` + `(planned)` label

**Connectors:**

- `1px solid --border` vertical lines
- `▼` arrowhead in `--text-muted`

**Legend:**

- Inline row of `[dot] [role-name]` items below the diagram
- Dot: 8px circle in layer color
- Label: 0.72rem monospace `--text-secondary`

**Annotation:**

- Single line of 0.78rem `--text-muted` text below legend explaining the key connections in plain language

### 5.5 Project Cards

Four cards in a responsive CSS grid (`repeat(auto-fill, minmax(260px, 1fr))`).

**Card anatomy (top to bottom):**

1. **Top accent border** — `2px solid var(--ca)` where `--ca` is the layer color
2. **Card header:**
   - Row: `[card-name]` (mono 0.875rem 600) + `[status-badge]` (right-aligned)
   - Sub-row: `[layer-label]` (0.72rem `--text-muted`)
3. **Description** — 0.82rem sans `--text-secondary`, flex: 1 (fills available height)
4. **Tech stack tags** — small pill badges, `--bg` background, `--border` outline, 0.62rem mono `--text-muted`
5. **Metadata row** (conditional — only if data exists) — `Updated [date]` + `Issues [count]` in mono
6. **Links row** — `Repo ↗` `Docs ↗` `PRD ↗` links, 0.72rem mono cyan, opacity 0.75 → 1 on hover

**Card states:**

- Default: `--bg-card` background, `--border` border
- Hover: `--bg-card-hover` background, `var(--ca)` all borders

**Planned projects:** No dimming — show clearly but badge says `Planned` in amber.

### 5.6 Roadmap Cards

Four cards: `repeat(auto-fill, minmax(200px, 1fr))`.

- **Inactive:** `opacity: 0.45`, standard border
- **Active (V1):** `opacity: 1`, `--accent` border, subtle cyan background tint
- Content: `[Vn]` phase label (mono 0.72rem 700 cyan uppercase) + description (0.78rem sans `--text-secondary`)

### 5.7 Footer

Single row, centered-left.

- `specorator-ecosystem · github.com/luis85/specorator-ecosystem`
- 0.72rem monospace `--text-muted`
- Top border: `1px solid --border`

---

## 6. Border Radius

| Variable      | Value | Use                       |
| ------------- | ----- | ------------------------- |
| `--radius`    | `8px` | Cards, architecture nodes |
| `--radius-sm` | `4px` | Badges, tags, pills       |

---

## 7. Responsive Behavior

Single breakpoint at `600px`:

- **Header**: stacks vertically (brand above status)
- **Architecture Row 3**: collapses to single column (agentonomous above agentic-workflow)
- **Split connectors**: adjust padding
- All grids (`projects-grid`, `roadmap-grid`): naturally reflow via `auto-fill minmax`

No JavaScript required for responsiveness — pure CSS.

---

## 8. Motion

Minimal. One animation defined:

```css
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
```

Used only on the live status indicator pulse dot. Duration: 2s, timing: ease-in-out, iteration: infinite.

All other transitions are `0.15–0.2s` CSS transitions on hover state changes (background, border-color, box-shadow). No entrance animations, scroll effects, or loading states.

---

## 9. Accessibility

- All section headings use proper `h1`/`h2`/`h3` hierarchy
- External links include `target="_blank" rel="noopener"` and the `↗` suffix visually signals new-tab behavior
- Color is never the **sole** indicator of status — status badges carry both color and text label
- Layer identity uses both color and text label (never color alone)
- Contrast ratios: `--text-primary` (#fafafa) on `--bg` (#09090b) > 18:1; `--text-secondary` (#a1a1aa) on `--bg-card` (#111113) > 5.5:1

---

## 10. File Structure

```
src/
  layouts/
    Layout.astro       ← global styles, CSS variables, meta
  pages/
    index.astro        ← hub page (all sections)
  data/
    projects.json      ← single source of truth for project metadata
public/
  favicon.svg          ← cyan-on-black circle/crosshair mark
```
