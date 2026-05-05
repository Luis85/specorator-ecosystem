import roadmapData from "../data/roadmap.json";
import type { Project } from "./fetchProjectData";

export interface RoadmapStats {
  total: number;
  done: number;
  inProgress: number;
  planned: number;
}

export interface EcosystemMilestone {
  label: string | null;
  name: string;
  description: string;
  milestoneStatus: "done" | "active" | "planned";
  stats: RoadmapStats;
  dataAvailable: boolean;
}

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

function deriveItemStatus(
  state: string,
  isPR: boolean,
): "planned" | "in-progress" | "done" {
  if (state === "closed") return "done";
  if (isPR) return "in-progress";
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

export async function fetchEcosystemRoadmap(
  projects: Project[],
): Promise<EcosystemMilestone[]> {
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers: HeadersInit = {
    "User-Agent": "specorator-hub",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

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

      const stats: RoadmapStats = {
        total: allItems.length,
        done: allItems.filter((i) => i.itemStatus === "done").length,
        inProgress: allItems.filter((i) => i.itemStatus === "in-progress")
          .length,
        planned: allItems.filter((i) => i.itemStatus === "planned").length,
      };
      const dataAvailable = failCount < projects.length;

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
