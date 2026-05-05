import roadmapData from "../data/roadmap.json";
import type { Project } from "./fetchProjectData";

// ── Shared ───────────────────────────────────────────────────────────────────

export interface RoadmapStats {
  total: number;
  done: number;
  inProgress: number;
  planned: number;
}

// ── Ecosystem-level milestones (homepage roadmap) ────────────────────────────

export interface EcosystemMilestone {
  label: string | null;
  name: string;
  description: string;
  milestoneStatus: "done" | "active" | "planned";
  stats: RoadmapStats;
  // false when any repo fetch failed — avoids deriving status from partial data.
  dataAvailable: boolean;
}

// ── Per-project roadmap (integration detail pages) ───────────────────────────

export interface RoadmapPhase {
  label: string;
  name: string;
  description: string;
  phaseStatus: "done" | "active" | "planned";
  stats: RoadmapStats;
  // false when the items fetch failed for this phase.
  dataAvailable: boolean;
}

export interface ProjectRoadmap {
  projectId: string;
  projectName: string;
  repo: string;
  phases: RoadmapPhase[];
  // false when the label fetch failed — phases will be empty but the
  // cause is a transient API error, not an unconfigured repo.
  dataAvailable: boolean;
}

// ── Internal GitHub API types ────────────────────────────────────────────────

type GitHubLabel = {
  name: string;
  description: string | null;
};

type GitHubIssue = {
  number: number;
  title: string;
  html_url: string;
  state: string;
  pull_request?: { merged_at: string | null };
};

type MilestoneDefinition = {
  label: string | null;
  name: string;
  description: string;
  status: string;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const LABEL_PREFIX = "roadmap:";

function labelToName(label: string): string {
  return label
    .slice(LABEL_PREFIX.length)
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function deriveItemStatus(
  state: string,
  isPR: boolean,
): "planned" | "in-progress" | "done" {
  if (state === "closed") return "done";
  if (isPR) return "in-progress";
  return "planned";
}

function derivePhaseStatus(
  items: Array<{ itemStatus: string }>,
): RoadmapPhase["phaseStatus"] {
  if (items.length === 0) return "planned";
  if (items.every((i) => i.itemStatus === "done")) return "done";
  // Only open PRs count as in-progress; open issues remain planned.
  if (items.some((i) => i.itemStatus === "in-progress")) return "active";
  return "planned";
}

function deriveMilestoneStatus(
  stats: RoadmapStats,
): EcosystemMilestone["milestoneStatus"] {
  if (stats.total === 0) return "planned";
  if (stats.done === stats.total) return "done";
  if (stats.inProgress > 0) return "active";
  return "planned";
}

function makeHeaders(token?: string): HeadersInit {
  return {
    "User-Agent": "specorator-hub",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Returns null on any non-OK response or network error so callers can
// distinguish "repo has no roadmap labels" from "data unavailable".
async function fetchRoadmapLabels(
  repoPath: string,
  headers: HeadersInit,
): Promise<GitHubLabel[] | null> {
  const roadmapLabels: GitHubLabel[] = [];
  let page = 1;
  while (page <= 5) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repoPath}/labels?per_page=100&page=${page}`,
        { headers },
      );
      if (!res.ok) return null;
      const batch = (await res.json()) as GitHubLabel[];
      roadmapLabels.push(
        ...batch.filter((l) => l.name.startsWith(LABEL_PREFIX)),
      );
      if (batch.length < 100) break;
      page++;
    } catch {
      return null;
    }
  }
  return roadmapLabels;
}

// Returns null on any non-OK response or network error so callers can
// distinguish "label has no items" from "data unavailable".
async function fetchItemsForLabel(
  repoPath: string,
  label: string,
  headers: HeadersInit,
): Promise<Array<{ itemStatus: "planned" | "in-progress" | "done" }> | null> {
  const items: Array<{ itemStatus: "planned" | "in-progress" | "done" }> = [];
  let page = 1;
  while (page <= 5) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repoPath}/issues?labels=${encodeURIComponent(label)}&state=all&per_page=100&page=${page}`,
        { headers },
      );
      if (!res.ok) return null;
      const issues = (await res.json()) as GitHubIssue[];
      for (const issue of issues) {
        const isPR = "pull_request" in issue;
        const state = issue.state === "open" ? "open" : "closed";
        items.push({ itemStatus: deriveItemStatus(state, isPR) });
      }
      if (issues.length < 100) break;
      page++;
    } catch {
      return null;
    }
  }
  return items;
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function fetchProjectRoadmap(
  project: Project,
): Promise<ProjectRoadmap> {
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers = makeHeaders(token);
  const repoPath = new URL(project.repo).pathname.slice(1);
  const labels = await fetchRoadmapLabels(repoPath, headers);

  if (labels === null) {
    return {
      projectId: project.id,
      projectName: project.name,
      repo: project.repo,
      phases: [],
      dataAvailable: false,
    };
  }

  const phases = await Promise.all(
    labels.map(async (label): Promise<RoadmapPhase> => {
      const result = await fetchItemsForLabel(repoPath, label.name, headers);
      const dataAvailable = result !== null;
      const items = result ?? [];
      const stats: RoadmapStats = {
        total: items.length,
        done: items.filter((i) => i.itemStatus === "done").length,
        inProgress: items.filter((i) => i.itemStatus === "in-progress").length,
        planned: items.filter((i) => i.itemStatus === "planned").length,
      };
      return {
        label: label.name,
        name: labelToName(label.name),
        description: label.description ?? "",
        phaseStatus: dataAvailable ? derivePhaseStatus(items) : "planned",
        stats,
        dataAvailable,
      };
    }),
  );

  phases.sort((a, b) => a.label.localeCompare(b.label));

  return {
    projectId: project.id,
    projectName: project.name,
    repo: project.repo,
    phases,
    dataAvailable: true,
  };
}

export async function fetchEcosystemRoadmap(
  projects: Project[],
): Promise<EcosystemMilestone[]> {
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers = makeHeaders(token);

  const milestones = (roadmapData as { milestones: MilestoneDefinition[] })
    .milestones;

  return Promise.all(
    milestones.map(async (def): Promise<EcosystemMilestone> => {
      if (def.label === null) {
        return {
          label: null,
          name: def.name,
          description: def.description,
          milestoneStatus: def.status as EcosystemMilestone["milestoneStatus"],
          stats: { total: 0, done: 0, inProgress: 0, planned: 0 },
          dataAvailable: true,
        };
      }

      const results = await Promise.all(
        projects.map((project) => {
          const repoPath = new URL(project.repo).pathname.slice(1);
          return fetchItemsForLabel(repoPath, def.label!, headers);
        }),
      );

      const allItems: Array<{
        itemStatus: "planned" | "in-progress" | "done";
      }> = [];
      let failCount = 0;
      for (const result of results) {
        if (result === null) failCount++;
        else allItems.push(...result);
      }

      // Require all repos to respond before deriving status — partial results
      // from a subset of repos would produce misleading completion stats.
      const dataAvailable = failCount === 0;
      const stats: RoadmapStats = {
        total: allItems.length,
        done: allItems.filter((i) => i.itemStatus === "done").length,
        inProgress: allItems.filter((i) => i.itemStatus === "in-progress")
          .length,
        planned: allItems.filter((i) => i.itemStatus === "planned").length,
      };

      return {
        label: def.label,
        name: def.name,
        description: def.description,
        milestoneStatus: dataAvailable
          ? deriveMilestoneStatus(stats)
          : (def.status as EcosystemMilestone["milestoneStatus"]),
        stats,
        dataAvailable,
      };
    }),
  );
}
