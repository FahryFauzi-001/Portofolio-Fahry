"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { Category, ProjectSummary } from "@/types";
import { ALL_CATEGORIES, CATEGORY_META } from "@/lib/constants";
import { Tabs, type TabOption } from "@/components/ui/Tabs";
import { ProjectCard } from "./ProjectCard";

type FilterKey = "all" | Category;

interface ProjectsBrowserProps {
  projects: ProjectSummary[];
}

export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [query, setQuery] = React.useState("");

  const tabOptions: TabOption<FilterKey>[] = React.useMemo(
    () => [
      { id: "all", label: "All", count: projects.length },
      ...ALL_CATEGORIES.map((cat) => ({
        id: cat,
        label: CATEGORY_META[cat].shortLabel,
        count: projects.filter((p) => p.category === cat).length,
      })),
    ],
    [projects]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (filter !== "all" && project.category !== filter) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, filter, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          options={tabOptions}
          value={filter}
          onChange={setFilter}
          layoutId="projects-filter-tabs"
        />

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8880]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="h-10 w-full rounded-full border border-[#DFD9CC] bg-[#FAF9F5] pl-10 pr-4 text-sm text-[#0E0E0E] placeholder:text-[#8C8880] focus:border-[#141414] focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-[#D8D3C9] bg-[#FAF9F5] p-12 text-center">
          <p className="font-display text-base font-semibold text-[#0E0E0E]">
            No matching projects found
          </p>
          <p className="mt-1 text-sm text-[#6B6861]">
            Try switching category tabs or clearing your search term.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
