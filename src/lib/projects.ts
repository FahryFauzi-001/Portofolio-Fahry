import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Category, Project, ProjectSummary } from "@/types";

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

function parseProjectFile(filename: string): Project {
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(PROJECTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    category: (data.category as Category) ?? "web",
    summary: String(data.summary ?? ""),
    role: String(data.role ?? "Solo Developer"),
    period: String(data.period ?? ""),
    tech: Array.isArray(data.tech) ? data.tech.map(String) : [],
    cover: String(data.cover ?? "/images/projects/placeholder-cover.svg"),
    gallery: Array.isArray(data.gallery) ? data.gallery.map(String) : [],
    video: data.video ? String(data.video) : undefined,
    metrics: Array.isArray(data.metrics) ? data.metrics : [],
    links: (data.links as Project["links"]) ?? {},
    featured: Boolean(data.featured),
    content: content.trim(),
  };
}

export function getProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map(parseProjectFile)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export function getProjectSummaries(): ProjectSummary[] {
  return getProjects().map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    summary: project.summary,
    role: project.role,
    period: project.period,
    tech: project.tech,
    cover: project.cover,
    gallery: project.gallery,
    video: project.video,
    metrics: project.metrics,
    links: project.links,
    featured: project.featured,
  }));
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseProjectFile(`${slug}.mdx`);
}

export function getProjectsByCategory(category: Category): ProjectSummary[] {
  return getProjectSummaries().filter((p) => p.category === category);
}

export function getFeaturedProjects(): ProjectSummary[] {
  const all = getProjectSummaries();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 6);
}

export function getProjectCountsByCategory(): Record<Category, number> {
  const counts: Record<Category, number> = {
    mobile: 0,
    "computer-vision": 0,
    web: 0,
    iot: 0,
    ml: 0,
  };
  for (const project of getProjectSummaries()) {
    counts[project.category] = (counts[project.category] ?? 0) + 1;
  }
  return counts;
}
