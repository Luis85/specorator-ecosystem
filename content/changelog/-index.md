---
title: "Roadmap"
meta_title: "Roadmap — Specorator Ecosystem Hub"
description: "Delivery milestones for the Specorator Ecosystem Hub and the projects within it."
image: ""
draft: false
page_header:
  badge: "Roadmap"
  title: |
    Ecosystem Progress
    <br/>
    <mark>Milestone by Milestone</mark>
  subtitle: "Track what has shipped, what is in progress, and what is coming next across the Specorator ecosystem."

changelog_list:
  - version: "V1"
    date: "May 2025"
    title: "Ecosystem Hub — V1 Launch"
    description: "The first public release of the Specorator Hub. A static, GitHub Pages–based entry point that consolidates all ecosystem projects in one place."
    author: "luis85"
    time: ""
    categories:
      - name: "SHIPPED"
        items:
          - icon: "check"
            text: "Specorator Hub live on GitHub Pages (Astro + PowerAI theme)"
          - icon: "check"
            text: "Architecture diagram showing all four ecosystem layers"
          - icon: "check"
            text: "Project cards with status, description, and repo links for all four projects"
          - icon: "check"
            text: "Roadmap page (this page) tracking milestones"
          - icon: "check"
            text: "GitHub Actions CI/CD pipeline — auto-deploys on push to develop"
          - icon: "check"
            text: "PRD published as GitHub Issue #2"
      - name: "IN PROGRESS"
        items:
          - icon: "check"
            text: "specorator — UI / Visualization layer (active development)"

  - version: "V2"
    date: "TBD"
    title: "GitHub API Integration + Live Status"
    description: "Replace static project data with live data fetched from the GitHub API at build time. No manual status updates required."
    author: "luis85"
    time: ""
    categories:
      - name: "PLANNED"
        items:
          - icon: "check"
            text: "GitHub API integration — pull last commit date, open issue count per repo"
          - icon: "check"
            text: "Automated status inference from CI and branch activity"
          - icon: "check"
            text: "JSON schema validation for project data"

  - version: "V3"
    date: "TBD"
    title: "Runtime Observability"
    description: "Connect the hub to the specorator-runtime to display live session data, task queues, and agent activity."
    author: "luis85"
    time: ""
    categories:
      - name: "PLANNED"
        items:
          - icon: "check"
            text: "Live session list from specorator-runtime"
          - icon: "check"
            text: "Task queue visualization"
          - icon: "check"
            text: "Agent activity feed"
          - icon: "check"
            text: "Event stream visualization"

  - version: "V4"
    date: "TBD"
    title: "Workflow Execution Tracking + Knowledge Graph"
    description: "Full observability into workflow execution and a browsable knowledge graph of the ecosystem components and their relationships."
    author: "luis85"
    time: ""
    categories:
      - name: "PLANNED"
        items:
          - icon: "check"
            text: "Workflow execution tracking and history"
          - icon: "check"
            text: "Interactive knowledge graph of components and dependencies"
          - icon: "check"
            text: "Debugging interface for end-users"
---
