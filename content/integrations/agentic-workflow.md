---
title: "agentic-workflow"
meta_title: "agentic-workflow — 12-Stage Methodology"
description: "The 12-stage Agentic Development Lifecycle (ADLC) — from Idea to Retrospective — with templates, quality gates, and Claude Code agents. Use it standalone or as the engine powering specorator."
image: ""
draft: false
category: "Workflow"
icon: "/images/integrations/agentic-workflow-icon.svg"
page_header:
  badge: "Workflow Definition System"
  title: |
    agentic-workflow
  subtitle: "The 12-stage ADLC as a standalone CLI tool — for developers who want the methodology without the Obsidian plugin. Also the workflow engine that specorator bundles under the hood."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/agentic-workflow"
---

## Overview

**agentic-workflow** is the methodology engine of the Specorator ecosystem. It defines the complete Agentic Development Lifecycle (ADLC) — a 12-stage process that keeps every project decision explicit and every artifact traceable.

**Most users don't need to touch this directly.** The specorator plugin bundles it and sets everything up automatically. This project is for developers who want the raw methodology via CLI and Markdown — no Obsidian, no GUI — or who want to integrate the ADLC process into their own tooling.

## The 12 Stages

Three phases, twelve stages, one consistent process:

**Thinking & Planning (stages 1–6)** — user-led, agent-assisted:
`Idea → Research → Requirements → Design → Specification → Tasks`

**Building & Verifying (stages 7–9)** — agent-executed, user-reviewed:
`Implementation → Test Planning → Testing`

**Closing (stages 10–12)** — user-governed, agent-drafted:
`Review → Release → Retrospective`

At every stage transition, the user makes an explicit decision. Agents never advance the workflow autonomously.

## Role in the Ecosystem

agentic-workflow is a foundation layer:

```
specorator
     ↓  (currently reads methodology directly)
agentic-workflow    ← you are here

specorator-runtime  (planned — will orchestrate workflow execution)
              ↓
      agentic-workflow
```

## Status

**In Progress** — active development. Currently consumed directly by specorator via Claude Code. Will be orchestrated by specorator-runtime in v2.0.

## Key Responsibilities

- **Stage templates** — Markdown templates for each of the 12 ADLC stages
- **Quality gates** — explicit criteria that must be met before a stage can advance
- **Claude Code agents** — structured prompts for each stage's agent responsibilities
- **CLI-native** — works entirely from the command line with plain Markdown, no GUI required
- **MCP server** *(planned)* — expose the full workflow engine as MCP tools so any Claude Code session can drive it with a single config line, with no local installation beyond the MCP entry point

## Links

- **Repository**: [github.com/luis85/agentic-workflow](https://github.com/luis85/agentic-workflow)
