import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { ProjectSummary } from "@/types";
import { CATEGORY_META } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { TechChip } from "./TechChip";

interface ProjectCardProps {
  project: ProjectSummary;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cat = CATEGORY_META[project.category];

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-[#E5E1D8] bg-[#FAF9F5] transition-all duration-300 hover:-translate-y-1 hover:border-[#141414]/40 hover:shadow-clay">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-video overflow-hidden bg-[#ECE8DF]"
      >
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3.5 top-3.5">
          <Badge className="bg-[#FAF9F5]/95 text-[#141414] border-[#E2DDD3] backdrop-blur-sm">
            {cat.label}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/projects/${project.slug}`}
              className="font-display text-lg font-bold text-[#0E0E0E] transition-opacity group-hover:opacity-75"
            >
              {project.title}
            </Link>
            <p className="mt-0.5 font-mono text-[11px] text-[#7A766E]">
              {project.role} · {project.period}
            </p>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`Read ${project.title} case study`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DFD9CC] bg-white text-[#141414] transition-all group-hover:border-[#141414] group-hover:bg-[#141414] group-hover:text-[#F6F4EF]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#5E5B55]">
          {project.summary}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.metrics.slice(0, 3).map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-[#E5E1D8] bg-[#F6F4EF] px-2.5 py-1"
              >
                <span className="font-mono text-xs font-bold text-[#0E0E0E]">
                  {m.value}
                </span>
                <span className="ml-1.5 text-[11px] text-[#7A766E]">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <TechChip key={t} label={t} />
            ))}
            {project.tech.length > 3 && (
              <TechChip label={`+${project.tech.length - 3}`} />
            )}
          </div>

          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6861] hover:text-[#0E0E0E]"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
