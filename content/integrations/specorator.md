---
title: "specorator"
meta_title: "specorator — The All-in-One Plugin"
description: "The main entry point for the Specorator ecosystem. An Obsidian plugin that bundles the 12-stage workflow, Claude Code agents, and the full runtime in one ready-to-use interface. Agents work natively inside the vault — reading Canvas, writing Bases properties, enriching Frontmatter."
image: ""
draft: false
category: "UI"
icon: "/images/integrations/specorator-icon.svg"
health: "Active development with weekly iteration"
progress: "v1 live, v2 runtime integration underway"
problemSolved: "Turns messy ideas into structured execution without requiring technical expertise"
page_header:
  badge: "UI / Visualization Layer"
  title: |
    specorator
  subtitle: "The main entry point for the ecosystem. Bundles the 12-stage workflow, Claude Code agents, and the full runtime into a single Obsidian plugin — with agents that work natively inside your vault."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/specorator"
---

## Overview

**specorator** is the primary entry point for the ecosystem — an Obsidian plugin that bundles the 12-stage workflow, Claude Code agents, and (in v2.0) the full runtime into a single, ready-to-use interface.

Most users should start and stay here. You don't need to configure agentic-workflow, agentonomous, or specorator-runtime separately — the plugin handles all of that. You define what to build; agents handle spec drafting and task generation; you review and approve at every stage.

## Vault-Native Architecture

[Obsidian](https://obsidian.md) is a free, local-first note-taking app that stores everything as plain Markdown files on your computer. It has no proprietary cloud, no lock-in, and a powerful feature set — including visual boards (Canvas), structured data tables (Bases), and a linked knowledge graph.

A core architectural requirement for specorator is that agents must work natively *inside* Obsidian — not just display output in a sidebar panel. They read your notes, update your boards, and write results back into the same files you already work in, so the whole project lifecycle is captured in one place:

| Obsidian feature | How specorator uses it |
|---|---|
| **Markdown** | All stage outputs (specs, tasks, retrospectives) are plain Markdown notes — editable, portable, yours |
| **Frontmatter** | Stage status, metadata, and agent outputs are written as structured properties so Bases and queries can surface them |
| **Bases** | Project and task tables are Bases views over Frontmatter properties — live, filterable, no manual updates |
| **Canvas** | Architecture diagrams, workflow boards, and stage maps are written back to Canvas by agents as the project progresses |
| **Knowledge graph** | Notes link to each other (idea → spec → task → result) so the full lifecycle is traversable from the graph view |

The vault ends up richer than when you started. Every project leaves behind a structured, interlinked record.

## Extensible Platform

The 12-stage workflow is specorator's built-in capability — but the plugin is designed to grow far beyond it. The same interface that manages your ADLC projects also gives you a single place to manage everything that extends the platform:

| Capability | What it means |
|---|---|
| **Skills** | Reusable agent capabilities that can be attached to any stage or project |
| **Commands** | Custom actions that agents can execute within the workflow |
| **Assets** | Shared templates, prompts, and resources available across projects |
| **Agents** | Manage and configure the AI roles (PM, Architect, Engineering, QA, Review, Writer) used in your projects |
| **Tools** | External tool integrations that agents can call during execution |
| **MCP servers** | Connect any MCP-compatible server to extend what agents can do *(planned)* |
| **Marketplace** | Browse and install community-built extensions, skills, and agent packs *(planned)* |
| **Plugins** | Extend the platform itself with your own additions *(planned)* |

The goal: one interface to govern everything — from the workflow stages you care about to the AI capabilities that power them.

## Role in the Ecosystem

Specorator sits at the top of the architecture stack and bundles the layers below:

```
specorator          ← you are here (all-in-one entry point)
     ↓
specorator-runtime  (planned — will replace the current CLI bridge)
     ↓         ↓
agentonomous  agentic-workflow
```

## Status

**In Progress** — active development. Currently uses agentic-workflow methodology directly via Claude Code CLI. specorator-runtime will become the orchestration bridge in v2.0, enabling agents to work with deeper Obsidian integration via established plugin ports.

## Key Principles

- **Vault-native**: agents read Canvas, write Bases properties, enrich Frontmatter — the vault grows smarter with every project
- **Governance**: every stage transition requires an explicit user decision — agents never advance the workflow autonomously
- **Non-technical accessibility**: plain language throughout; no AI jargon or coding knowledge required
- **Obsidian philosophy**: outputs are plain Markdown, independent of the plugin — your data is never locked in

## Key Responsibilities

- **Workflow cockpit** — visual interface for the 12-stage Agentic Development Lifecycle
- **Agent coordination** — instructs Claude Code agents for each stage via structured prompts
- **Vault integration** — reads and writes Canvas, Bases, Frontmatter, and linked Markdown notes
- **Artifact management** — tracks specs, tasks, and quality gates as linked vault notes
- **MCP server** *(planned)* — expose plugin functionality as MCP tools so external Claude Code sessions and automations can interact with the specorator workflow without opening Obsidian

## Links

- **Repository**: [github.com/luis85/specorator](https://github.com/luis85/specorator)
