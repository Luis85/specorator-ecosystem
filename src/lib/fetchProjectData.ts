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
    if (typeof topic === "string" && Object.hasOwn(STATUS_TOPIC_MAP, topic)) {
      return STATUS_TOPIC_MAP[topic];
    }
  }
  return null;
}

function normalizeUrl(raw: unknown): string | null {
  if (typeof raw !== "string" || raw.trim().length === 0) return null;
  const trimmed = raw.trim();
  const isHttps = (u: URL) => u.protocol === "https:" || u.protocol === "http:";
  try {
    const url = new URL(trimmed);
    return isHttps(url) ? url.href : null;
  } catch {
    try {
      const url = new URL(`https://${trimmed}`);
      return isHttps(url) ? url.href : null;
    } catch {
      return null;
    }
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
          status: extractStatus(repo?.topics) ?? project.status,
          lastUpdate:
            typeof repo?.pushed_at === "string"
              ? repo.pushed_at.split("T")[0]
              : project.lastUpdate,
          openIssues:
            typeof repo?.open_issues_count === "number"
              ? repo.open_issues_count
              : project.openIssues,
          version:
            typeof release?.tag_name === "string"
              ? release.tag_name
              : project.version,
          docs: normalizeUrl(repo?.homepage) ?? project.docs,
        };
      } catch {
        return { ...project };
      }
    }),
  );
}
