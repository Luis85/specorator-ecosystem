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
  it("defines the roadmap label prefix", () => {
    expect(roadmapData.labelPrefix).toBe("roadmap:");
  });
});
