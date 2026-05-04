---
title: "agentic-workflow"
meta_title: "agentic-workflow — Workflow Definition System"
description: "Declarative workflow definition system for composing and sequencing agent tasks."
image: ""
draft: false
category: "Workflow"
icon: "/images/integrations/JS.svg"
page_header:
  badge: "Workflow Definition System"
  title: |
    agentic-workflow
  subtitle: "The declarative workflow system. Enables composing and sequencing agent tasks into higher-level operational flows."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/agentic-workflow"
---

## Overview

**agentic-workflow** provides the workflow definition layer of the Specorator ecosystem. It gives users and developers a declarative way to compose agent tasks into structured, repeatable operational flows that the runtime can execute.

## Role in the Ecosystem

agentic-workflow is a foundation layer, consumed by the runtime:

```
specorator
     ↓
specorator-runtime
              ↓
      agentic-workflow  ← you are here
```

## Status

**Planned** — design phase.

## Key Responsibilities

- **Workflow schema** — declarative definition format for sequencing tasks
- **Composition** — combine agent calls, conditions, and branches into flows
- **Runtime interface** — standardized API for the runtime to load and execute workflows

## Links

- **Repository**: [github.com/luis85/agentic-workflow](https://github.com/luis85/agentic-workflow)
