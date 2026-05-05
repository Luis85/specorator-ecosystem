---
title: "specorator-runtime"
meta_title: "specorator-runtime — Execution Runtime"
description: "The npm orchestration library that will replace the CLI bridge in v2.0 — connecting the specorator plugin to agentonomous agent roles and the agentic-workflow methodology engine."
image: ""
draft: false
category: "Runtime"
icon: "/images/integrations/specorator-runtime-icon.svg"
page_header:
  badge: "Execution Runtime"
  title: |
    specorator-runtime
  subtitle: "The npm orchestration library for technical builders — for developers who want to integrate the full agent lifecycle into their own application, without going through the Obsidian plugin."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/specorator-runtime"
---

## Overview

**specorator-runtime** is the planned orchestration layer of the Specorator ecosystem. Delivered as an npm library, it will replace the current Claude Code CLI bridge and enable production-grade, resumable agent sessions directly from within the specorator Obsidian plugin.

## What It Enables

Once live, specorator-runtime makes agent sessions:
- **Resumable** — sessions persist across plugin restarts and vault closures
- **Parallel** — multiple agent roles can execute concurrently within a stage
- **Observable** — real-time event streaming surfaces agent progress to the plugin UI
- **Governed** — stage-gate enforcement remains in the plugin; runtime only executes, never decides

## Role in the Ecosystem

The runtime sits in the middle of the architecture stack:

```
specorator
     ↓
specorator-runtime  ← you are here
     ↓         ↓
agentonomous  agentic-workflow
```

## Status

**Planned** — design and architecture phase. Targeted for the v2.0 milestone.

## Key Responsibilities

- **MCP server** — primary integration surface: expose workflow and session tools so any Claude Code session can drive the runtime with a single config line, independent of the Obsidian plugin
- **Orchestration** — coordinate the six agentonomous agent roles per ADLC stage
- **State management** — track session and task state across execution cycles, designed to feed both V3 observability and V4 semantic cross-linking from day one
- **Event streaming** — emit real-time progress events consumed by specorator and any other client
- **CLI bridge replacement** — npm library API usable directly from the Obsidian plugin

## Links

- **Repository**: [github.com/luis85/specorator-runtime](https://github.com/luis85/specorator-runtime)
