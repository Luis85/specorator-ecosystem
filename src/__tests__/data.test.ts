import { describe, it, expect } from "vitest";
import projectsData from "../data/projects.json";
import roadmapData from "../data/roadmap.json";

describe("projects.json", () => {
  it("has at least one project", () => {
    expect(projectsData.projects.length).toBeGreaterThan(0);
  });

  it("every project has required stable fields", () => {
    for (const p of projectsData.projects) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.role).toBeTruthy();
      expect(p.layer).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.repo).toBeTruthy();
      expect(["planned", "in-progress", "done"]).toContain(p.status);
    }
  });

  it("volatile fields are null (not manually hardcoded)", () => {
    for (const p of projectsData.projects) {
      expect(p.lastUpdate).toBeNull();
      expect(p.openIssues).toBeNull();
    }
  });
});

describe("roadmap.json", () => {
  it("has at least one milestone", () => {
    expect(roadmapData.milestones.length).toBeGreaterThan(0);
  });

  it("every milestone has required fields", () => {
    for (const m of roadmapData.milestones) {
      expect(m.name).toBeTruthy();
      expect(m.description).toBeTruthy();
      expect(["done", "active", "planned"]).toContain(m.status);
      expect(m.label === null || typeof m.label === "string").toBe(true);
    }
  });

  it("labels that are strings start with roadmap:", () => {
    for (const m of roadmapData.milestones) {
      if (m.label !== null) {
        expect(m.label.startsWith("roadmap:")).toBe(true);
      }
    }
  });
});
