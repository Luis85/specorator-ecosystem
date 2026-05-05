import type { Project } from "./fetchProjectData";

const LABEL_PREFIX = "roadmap:";

export interface RoadmapItem {
  number: number;
  title: string;
  url: string;
  state: "open" | "closed";
  isPR: boolean;
  isMerged: boolean;
  itemStatus: "planned" | "in-progress" | "done";
}

export interface RoadmapStats {
  total: number;
  done: number;
  inProgress: number;
  planned: number;
}

export interface RoadmapPhase {
  label: string;
  name: string;
  description: string;
  phaseStatus: "done" | "active" | "planned";
  items: RoadmapItem[];
  stats: RoadmapStats;
  // false when the GitHub items fetch failed; items will be empty but the
  // cause is a transient API error, not a phase with no tracked work.
  dataAvailable: boolean;
}

export interface ProjectRoadmap {
  projectId: string;
  projectName: string;
  repo: string;
  phases: RoadmapPhase[];
  // false when the GitHub label fetch failed; phases will be empty but the
  // cause is a transient API error, not an unconfigured repo.
  dataAvailable: boolean;
}

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
): RoadmapItem["itemStatus"] {
  if (state === "closed") return "done";
  if (isPR) return "in-progress";
  return "planned";
}

function derivePhaseStatus(items: RoadmapItem[]): RoadmapPhase["phaseStatus"] {
  if (items.length === 0) return "planned";
  if (items.every((i) => i.itemStatus === "done")) return "done";
  // Only open PRs are "in-progress"; open issues are "planned". A phase is
  // active only when at least one item is actively being worked (i.e. has an
  // open PR), keeping phase status consistent with item-level classification.
  if (items.some((i) => i.itemStatus === "in-progress")) return "active";
  return "planned";
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

// Returns null when the fetch fails so callers can distinguish "no items"
// from "data unavailable" and avoid deriving phase status from partial data.
async function fetchItemsForLabel(
  repoPath: string,
  label: string,
  headers: HeadersInit,
): Promise<RoadmapItem[] | null> {
  const items: RoadmapItem[] = [];
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
        const isMerged =
          isPR && typeof issue.pull_request?.merged_at === "string";
        const state = issue.state === "open" ? "open" : "closed";
        items.push({
          number: issue.number,
          title: issue.title,
          url: issue.html_url,
          state,
          isPR,
          isMerged,
          itemStatus: deriveItemStatus(state, isPR),
        });
      }
      if (issues.length < 100) break;
      page++;
    } catch {
      return null;
    }
  }
  return items;
}

async function fetchProjectRoadmap(
  project: Project,
  headers: HeadersInit,
): Promise<ProjectRoadmap> {
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
        items,
        stats,
        dataAvailable,
      };
    }),
  );

  // Sort phases alphabetically by label so ordering is deterministic.
  phases.sort((a, b) => a.label.localeCompare(b.label));

  return {
    projectId: project.id,
    projectName: project.name,
    repo: project.repo,
    phases,
    dataAvailable: true,
  };
}

export async function fetchAllProjectRoadmaps(
  projects: Project[],
): Promise<ProjectRoadmap[]> {
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers: HeadersInit = {
    "User-Agent": "specorator-hub",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return Promise.all(projects.map((p) => fetchProjectRoadmap(p, headers)));
}
