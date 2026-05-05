---
title: "specorator"
meta_title: "specorator — Development Cockpit"
description: "Your Obsidian-based development cockpit. Guides anyone from rough idea to shipped software through a structured 12-stage lifecycle — no coding background required."
image: ""
draft: false
category: "UI"
icon: "/images/integrations/specorator-icon.svg"
page_header:
  badge: "UI / Visualization Layer"
  title: |
    specorator
  subtitle: "Your development cockpit inside Obsidian. Anyone — developer, designer, PM, or founder — can guide a project from idea to release through a structured 12-stage lifecycle."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/specorator"
---

## Overview

**specorator** is the primary user-facing layer of the ecosystem — an Obsidian plugin that makes structured, AI-assisted software development accessible to everyone, not just engineers.

You define what to build. The plugin sets up your 12-stage workflow, connects Claude Code agents for spec drafting and task generation, and keeps all artifacts in your vault as plain Markdown. You review and approve at every stage; agents handle the drafting.

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
