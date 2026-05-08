---
title: "agentonomous"
meta_title: "agentonomous — Agent Library"
description: "TypeScript library of six specialized agent roles — PM, Architect, Engineering, QA, Review, and Writer — that power the Specorator ecosystem's AI coworker features."
image: ""
draft: false
category: "Agents"
icon: "/images/integrations/agentonomous-icon.svg"
health: "Design validated, package scaffolding pending"
progress: "Planned as part of intelligence layer rollout"
problemSolved: "Provides specialized AI roles so teams get the right AI support at each stage"
page_header:
  badge: "Agent Library"
  title: |
    agentonomous
  subtitle: "Six specialized agent roles as composable TypeScript building blocks — for developers who want to wire up the same agent intelligence that powers specorator into their own tooling."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/agentonomous"
---

## Overview

**agentonomous** is the TypeScript agent library for the Specorator ecosystem — and a standalone building block for developers who want to compose the same AI intelligence in their own tools.

**Most users don't need this directly.** The specorator plugin surfaces these agent roles automatically at the appropriate stages. This library is for developers who want to use the six specialized roles independently, outside the plugin, as composable building blocks in their own applications.

It defines six specialized agent roles, each with distinct responsibilities across the 12-stage Agentic Development Lifecycle (ADLC).

## The Six Agent Roles

| Role | Responsibility |
|---|---|
| **PM Agent** | Idea articulation, research synthesis, requirements definition |
| **Architect Agent** | Architecture documentation, technical design decisions |
| **Engineering Agent** | Code generation, implementation task execution |
| **QA Agent** | Test planning and test execution |
| **Review Agent** | Code review, quality gate enforcement |
| **Writer Agent** | Release notes, retrospective summaries, communication drafts |

## Role in the Ecosystem

agentonomous is a foundation layer, consumed by the runtime:

```
specorator
     ↓
specorator-runtime
     ↓
agentonomous        ← you are here
```

## Status

**Planned** — design phase. Will be implemented as part of the v2.0 milestone, powering specorator's AI coworker features.

## Key Responsibilities

- **Typed agent roles** — six specialized agent definitions with distinct scopes and interfaces
- **Composable behaviors** — reusable behavior primitives that agents combine per stage
- **Runtime interface** — standardized API for the runtime to dispatch and receive work from each role

## Links

- **Repository**: [github.com/luis85/agentonomous](https://github.com/luis85/agentonomous)
