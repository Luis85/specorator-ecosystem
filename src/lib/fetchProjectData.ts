import projectsData from "@/data/projects.json";

export interface Project {
  id: string;
  name: string;
  role: string;
  layer: string;
  description: string;
  repo: string;
  techStack: string[];
  dependencies: string[];
  status: string | null;
  version: string | null;
  lastUpdate: string | null;
  openIssues: number | null;
  docs: string | null;
  prd: string | null;
}

const STATUS_TOPIC_MAP: Record<string, string> = {
  "status-planned": "planned",
  "status-in-progress": "in-progress",
  "status-done": "done",
};

function extractStatus(topics: unknown): string | null {
  if (!Array.isArray(topics)) return null;
  for (const topic of topics) {
    if (typeof topic === "string" && topic in STATUS_TOPIC_MAP) {
      return STATUS_TOPIC_MAP[topic];
    }
  }
  return null;
}

function normalizeUrl(raw: unknown): string | null {
  if (typeof raw !== "string" || raw.trim().length === 0) return null;
  const trimmed = raw.trim();
  try {
    const url = new URL(
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`,
    );
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export async function fetchEnrichedProjects(): Promise<Project[]> {
  const { projects } = projectsData;
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers: HeadersInit = {
    "User-Agent": "specorator-hub",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return Promise.all(
    (projects as Project[]).map(async (project) => {
      try {
        const repoPath = new URL(project.repo).pathname.slice(1);
        const [repoRes, releaseRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${repoPath}`, { headers }),
          fetch(`https://api.github.com/repos/${repoPath}/releases/latest`, {
            headers,
          }),
        ]);

        const repo = repoRes.ok
          ? ((await repoRes.json()) as Record<string, unknown>)
          : null;
        const release = releaseRes.ok
          ? ((await releaseRes.json()) as Record<string, unknown>)
          : null;

        return {
          ...project,
          status: extractStatus(repo?.topics),
          lastUpdate:
            typeof repo?.pushed_at === "string"
              ? repo.pushed_at.split("T")[0]
              : null,
          openIssues:
            typeof repo?.open_issues_count === "number"
              ? repo.open_issues_count
              : null,
          version:
            typeof release?.tag_name === "string" ? release.tag_name : null,
          docs: normalizeUrl(repo?.homepage),
        };
      } catch {
        return {
          ...project,
          status: null,
          lastUpdate: null,
          openIssues: null,
          version: null,
          docs: null,
        };
      }
    }),
  );
}
