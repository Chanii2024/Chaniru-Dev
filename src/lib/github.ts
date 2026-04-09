import { Project } from "./projects";

const GITHUB_USERNAME = "Chanii2024";

export async function fetchGitHubProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch GitHub repos");
      return [];
    }

    const repos = await response.json();

    return repos
      .filter((repo: any) => !repo.fork) // Only show original work
      .map((repo: any): Project => ({
        id: repo.id.toString(),
        type: repo.homepage ? "hosted" : "local",
        isPrivate: false,
        stars: repo.stargazers_count,
        title: formatRepoName(repo.name),
        description: repo.description || "Experimental project and technical exploration.",
        techStack: generateTechStack(repo),
        repoUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        image: `/projects/repo-${repo.name.toLowerCase()}.jpg`, // Point to local naming convention
        icon: getIconByLanguage(repo.language),
      }));
  } catch (error) {
    console.error("GitHub fetch error:", error);
    return [];
  }
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getIconByLanguage(lang: string): string {
  const mapping: Record<string, string> = {
    JavaScript: "Code2",
    TypeScript: "Code",
    Java: "Coffee",
    Python: "Terminal",
    HTML: "Layout",
    CSS: "Palette",
    PHP: "Server",
    "C#": "Cpu",
  };
  return mapping[lang] || "Box";
}

function generateTechStack(repo: any): string[] {
  const stack = [];
  if (repo.language) stack.push(repo.language);
  if (repo.topics && repo.topics.length > 0) {
    stack.push(...repo.topics.slice(0, 3));
  }
  return stack.length > 0 ? Array.from(new Set(stack)) : ["Source Code"];
}
