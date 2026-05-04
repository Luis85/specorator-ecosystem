---
title: "specorator-runtime"
meta_title: "specorator-runtime — Execution Runtime"
description: "Core execution engine that orchestrates agents and workflows."
image: ""
draft: false
category: "Runtime"
icon: "/images/integrations/Github.svg"
page_header:
  badge: "Execution Runtime"
  title: |
    specorator-runtime
  subtitle: "The execution engine at the heart of the ecosystem. Orchestrates agents and workflows, bridging the UI with the foundation layers."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/specorator-runtime"
---

## Overview

**specorator-runtime** is the execution engine that powers the Specorator ecosystem. It receives instructions from the UI layer, dispatches tasks to agents defined in agentonomous, and runs workflows composed in agentic-workflow.

## Role in the Ecosystem

The runtime sits in the middle of the architecture stack, connecting everything:

```
specorator
     ↓
specorator-runtime  ← you are here
     ↓         ↓
agentonomous  agentic-workflow
```

## Status

**Planned** — design and architecture phase.

## Key Responsibilities

- **Orchestration** — coordinate agent execution and workflow scheduling
- **State management** — track session and task state across execution cycles
- **Bridging** — translate UI-layer commands into agent/workflow operations

## Links

- **Repository**: [github.com/luis85/specorator-runtime](https://github.com/luis85/specorator-runtime)
