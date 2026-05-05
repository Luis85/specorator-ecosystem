---
title: "specorator"
meta_title: "specorator — The All-in-One Plugin"
description: "The main entry point for the Specorator ecosystem. An Obsidian plugin that bundles the 12-stage workflow, Claude Code agents, and the full runtime in one ready-to-use interface — no coding required."
image: ""
draft: false
category: "UI"
icon: "/images/integrations/specorator-icon.svg"
page_header:
  badge: "UI / Visualization Layer"
  title: |
    specorator
  subtitle: "The main entry point for the ecosystem. Bundles the 12-stage workflow, Claude Code agents, and the full runtime into a single Obsidian plugin — no coding knowledge required."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/specorator"
---

## Overview

**specorator** is the primary entry point for the ecosystem — an Obsidian plugin that bundles the 12-stage workflow, Claude Code agents, and (in v2.0) the full runtime into a single, ready-to-use interface.

Most users should start and stay here. You don't need to configure agentic-workflow, agentonomous, or specorator-runtime separately — the plugin handles all of that. You define what to build; agents handle spec drafting and task generation; you review and approve at every stage. All artifacts stay in your vault as plain Markdown.

## Role in the Ecosystem

Specorator sits at the top of the architecture stack:

```
specorator          ← you are here
     ↓
specorator-runtime  (planned — will replace the current CLI bridge)
     ↓         ↓
agentonomous  agentic-workflow
```

## Status

**In Progress** — active development. Currently uses agentic-workflow methodology directly via Claude Code CLI. specorator-runtime will become the orchestration bridge in v2.0.

## Key Principles

- **Governance**: every stage transition requires an explicit user decision — agents never advance the workflow autonomously
- **Non-technical accessibility**: plain language throughout; no AI jargon or coding knowledge required
- **Vault-native**: all outputs stay as editable Markdown in your Obsidian vault

## Key Responsibilities

- **Workflow cockpit** — visual interface for the 12-stage Agentic Development Lifecycle
- **Agent coordination** — instructs Claude Code agents for each stage via structured prompts
- **Artifact management** — tracks specs, tasks, and quality gates as linked Markdown files

## Links

- **Repository**: [github.com/luis85/specorator](https://github.com/luis85/specorator)
