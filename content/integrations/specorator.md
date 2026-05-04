---
title: "specorator"
meta_title: "specorator — UI / Visualization Layer"
description: "Frontend interface and visualization layer for the Specorator ecosystem."
image: ""
draft: false
category: "UI"
icon: "/images/integrations/Vscode.svg"
page_header:
  badge: "UI / Visualization Layer"
  title: |
    specorator
  subtitle: "The primary user-facing interface. Everything in the ecosystem is surfaced and interacted with through this layer."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/specorator"
---

## Overview

**specorator** is the UI and visualization layer of the ecosystem. It serves as the primary entry point for users — displaying system state, enabling interaction with agents and workflows, and surfacing observability data from the runtime.

## Role in the Ecosystem

Specorator sits at the top of the architecture stack:

```
specorator          ← you are here
     ↓
specorator-runtime
     ↓         ↓
agentonomous  agentic-workflow
```

## Status

**In Progress** — active development.

## Key Responsibilities

- **Visualization** — render system state, agent activity, and workflow progress
- **Navigation** — provide user access to all ecosystem functionality
- **Observability** — surface runtime data in a human-readable form

## Links

- **Repository**: [github.com/luis85/specorator](https://github.com/luis85/specorator)
