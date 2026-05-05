import type { Project } from "./fetchProjectData";
import roadmapData from "@/data/roadmap.json";

export interface RoadmapItem {
  number: number;
  title: string;
  url: string;
  state: "open" | "closed";
  isPR: boolean;
  isMerged: boolean;
  projectId: string;
  projectName: string;
  itemStatus: "planned" | "in-progress" | "done";
}

export interface RoadmapStats {
  total: number;
  done: number;
  inProgress: number;
  planned: number;
}

export interface EnrichedMilestone {
  phase: string;
  title: string;
  description: string;
  label: string | null;
  milestoneStatus: "done" | "active" | "planned";
  items: RoadmapItem[];
  stats: RoadmapStats;
}

type RawMilestone = {
  phase: string;
  label: string | null;
  title: string;
  description: string;
  status: string;
};

type GitHubIssue = {
  number: number;
  title: string;
  html_url: string;
  state: string;
  pull_request?: { merged_at: string | null };
};

function deriveItemStatus(
  state: string,
  isPR: boolean,
): RoadmapItem["itemStatus"] {
  if (state === "closed") return "done";
  if (isPR) return "in-progress";
  return "planned";
}

function deriveMilestoneStatus(
  items: RoadmapItem[],
  fallback: string,
): EnrichedMilestone["milestoneStatus"] {
  if (items.length === 0) {
    if (fallback === "done") return "done";
    if (fallback === "active") return "active";
    return "planned";
  }
  const allDone = items.every((i) => i.itemStatus === "done");
  if (allDone) return "done";
  const hasOpen = items.some((i) => i.state === "open");
  if (hasOpen) return "active";
  return "planned";
}

async function fetchItemsForLabel(
  repoPath: string,
  project: Project,
  label: string,
  headers: HeadersInit,
): Promise<RoadmapItem[]> {
  try {
    const url = `https://api.github.com/repos/${repoPath}/issues?labels=${encodeURIComponent(label)}&state=all&per_page=100`;
    const res = await fetch(url, { headers });
    if (!res.ok) return [];

    const issues = (await res.json()) as GitHubIssue[];
    return issues.map((issue) => {
      const isPR = "pull_request" in issue;
      const isMerged =
        isPR && typeof issue.pull_request?.merged_at === "string";
      const state = issue.state === "open" ? "open" : "closed";
      return {
        number: issue.number,
        title: issue.title,
        url: issue.html_url,
        state,
        isPR,
        isMerged,
        projectId: project.id,
        projectName: project.name,
        itemStatus: deriveItemStatus(state, isPR),
      };
    });
  } catch {
    return [];
  }
}

export async function fetchEnrichedRoadmap(
  projects: Project[],
): Promise<EnrichedMilestone[]> {
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers: HeadersInit = {
    "User-Agent": "specorator-hub",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const milestones = roadmapData.milestones as RawMilestone[];

  return Promise.all(
    milestones.map(async (milestone) => {
      if (!milestone.label) {
        return {
          phase: milestone.phase,
          title: milestone.title,
          description: milestone.description,
          label: null,
          milestoneStatus:
            milestone.status as EnrichedMilestone["milestoneStatus"],
          items: [],
          stats: { total: 0, done: 0, inProgress: 0, planned: 0 },
        };
      }

      const allItems = (
        await Promise.all(
          projects.map((project) => {
            const repoPath = new URL(project.repo).pathname.slice(1);
            return fetchItemsForLabel(
              repoPath,
              project,
              milestone.label!,
              headers,
            );
          }),
        )
      ).flat();

      const stats: RoadmapStats = {
        total: allItems.length,
        done: allItems.filter((i) => i.itemStatus === "done").length,
        inProgress: allItems.filter((i) => i.itemStatus === "in-progress")
          .length,
        planned: allItems.filter((i) => i.itemStatus === "planned").length,
      };

      return {
        phase: milestone.phase,
        title: milestone.title,
        description: milestone.description,
        label: milestone.label,
        milestoneStatus: deriveMilestoneStatus(allItems, milestone.status),
        items: allItems,
        stats,
      };
    }),
  );
}
