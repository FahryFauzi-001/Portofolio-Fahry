import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getProjectSummaries } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjectSummaries().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/projects`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    ...projects,
  ];
}
