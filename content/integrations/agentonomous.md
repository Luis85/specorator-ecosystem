---
title: "agentonomous"
meta_title: "agentonomous — Agent Library"
description: "Library of autonomous agent definitions and behaviors."
image: ""
draft: false
category: "Agents"
icon: "/images/integrations/Python.svg"
page_header:
  badge: "Agent Library"
  title: |
    agentonomous
  subtitle: "The agent library that provides the building blocks for intelligent task execution within the Specorator runtime."
  button_primary:
    enable: true
    label: "View Repository"
    link: "https://github.com/luis85/agentonomous"
---

## Overview

**agentonomous** is the agent library for the Specorator ecosystem. It defines the autonomous agent types, their behaviors, and the interfaces through which the runtime dispatches and receives work from them.

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

**Planned** — design phase.

## Key Responsibilities

- **Agent definitions** — typed, reusable agent blueprints
- **Behavior library** — composable behaviors agents can exhibit
- **Runtime interface** — standardized API for the runtime to dispatch and poll agents

## Links

- **Repository**: [github.com/luis85/agentonomous](https://github.com/luis85/agentonomous)
