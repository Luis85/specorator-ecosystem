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
        };
      } catch {
        return {
          ...project,
          lastUpdate: null,
          openIssues: null,
          version: null,
        };
      }
    }),
  );
}
