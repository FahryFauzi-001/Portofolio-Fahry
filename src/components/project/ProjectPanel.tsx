"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import type { Category, ProjectSummary } from "@/types";
import { CATEGORY_META } from "@/lib/constants";
import { formatIndex, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { TechChip } from "./TechChip";

interface ProjectPanelProps {
  category: Category;
  projects: ProjectSummary[];
  onClose: () => void;
  embedded?: boolean;
}

export function ProjectPanel({
  category,
  projects,
  onClose,
  embedded = false,
}: ProjectPanelProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [category]);

  const meta = CATEGORY_META[category];
  const project = projects[activeIndex] ?? projects[0];
  const hasMultiple = projects.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: embedded ? 0 : 24, scale: embedded ? 1 : 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: embedded ? 0 : 16, scale: embedded ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className={
        embedded
          ? "px-3 pb-4 pt-1"
          : "glass-panel rounded-[28px] border border-[#E5E1D8] p-5 shadow-panel sm:p-6"
      }
    >
      {/* Top Bar: Category + 01 / 02 Switcher + Close */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E3DA] pb-4">
        <div className="flex items-center gap-2.5">
          <Badge className={meta.accent}>{meta.label}</Badge>
          <span className="font-mono text-xs text-[#7A766E]">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasMultiple && (
            <div className="inline-flex items-center gap-1 rounded-full border border-[#E2DDD3] bg-[#EFECE5] p-1">
              {projects.map((p, idx) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-xs font-semibold transition-all",
                    idx === activeIndex
                      ? "bg-[#141414] text-[#F6F4EF]"
                      : "text-[#6B6861] hover:text-[#0E0E0E]"
                  )}
                >
                  {formatIndex(idx)}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project panel"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E2DDD3] bg-white text-[#6B6861] transition-colors hover:border-[#141414] hover:text-[#0E0E0E]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!project ? (
        <div className="py-12 text-center text-sm text-[#7A766E]">
          No projects added to this category yet.
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            {/* Cover preview */}
            <div className="relative overflow-hidden rounded-2xl border border-[#E5E1D8] bg-[#ECE8DF]">
              <img
                src={project.cover}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
              {hasMultiple && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (prev) => (prev - 1 + projects.length) % projects.length
                      )
                    }
                    aria-label="Previous project"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#141414] shadow transition-colors hover:bg-[#141414] hover:text-[#F6F4EF]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % projects.length)
                    }
                    aria-label="Next project"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#141414] shadow transition-colors hover:bg-[#141414] hover:text-[#F6F4EF]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Title & meta */}
            <div className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-2xl font-bold text-[#0E0E0E]">
                  {project.title}
                </h2>
                <span className="font-mono text-xs text-[#7A766E]">
                  {project.period}
                </span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-[#5E5B55]">
                {project.role}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5E5B55]">
                {project.summary}
              </p>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {project.metrics.slice(0, 3).map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-[#E5E1D8] bg-[#F6F4EF] px-3 py-2"
                  >
                    <div className="font-mono text-sm font-bold text-[#0E0E0E]">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-[#7A766E]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech chips */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <TechChip key={t} label={t} />
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#141414] px-5 text-xs font-semibold text-[#F6F4EF] transition-opacity hover:opacity-85"
              >
                <span>Read Case Study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#DDD7CB] bg-white px-4 text-xs font-medium text-[#141414] transition-colors hover:border-[#141414]"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#DDD7CB] bg-white px-4 text-xs font-medium text-[#141414] transition-colors hover:border-[#141414]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
