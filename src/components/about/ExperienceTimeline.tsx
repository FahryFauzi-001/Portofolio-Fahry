"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  HeartHandshake,
  MapPin,
  Users,
} from "lucide-react";
import type { Experience } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const typeConfig: Record<
  Experience["type"],
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  volunteer: { label: "Community", icon: HeartHandshake },
  organization: { label: "Organization", icon: Users },
  work: { label: "Work", icon: Briefcase },
};

interface ExperienceTimelineProps {
  items: Experience[];
  compact?: boolean;
}

export function ExperienceTimeline({
  items,
  compact = false,
}: ExperienceTimelineProps) {
  const [openIds, setOpenIds] = React.useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative space-y-4 pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[#DDD7CB]">
      {items.map((exp) => {
        const meta = typeConfig[exp.type];
        const Icon = meta.icon;
        const hasHighlights = Boolean(exp.highlights && exp.highlights.length > 0);
        const isOpen = Boolean(openIds[exp.id]);

        return (
          <div
            key={exp.id}
            className="relative rounded-2xl border border-[#E5E1D8] bg-[#FAF9F5] transition-colors hover:border-[#141414]/40"
          >
            {/* Timeline dot */}
            <span className="absolute -left-[22px] top-6 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#141414] bg-[#F6F4EF]" />

            <button
              type="button"
              onClick={() => hasHighlights && toggleItem(exp.id)}
              aria-expanded={hasHighlights ? isOpen : undefined}
              className={cn(
                "flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5",
                hasHighlights ? "cursor-pointer" : "cursor-default"
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold text-[#0E0E0E]">
                    {exp.role}
                  </h3>
                  <Badge variant="outline" className="text-[11px]">
                    <Icon className="h-3 w-3" />
                    {meta.label}
                  </Badge>
                </div>

                <p className="mt-1 text-sm font-medium text-[#5E5B55]">
                  {exp.org}
                </p>

                {(exp.period || exp.location) && (
                  <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#7A766E]">
                    {exp.period && <span>{exp.period}</span>}
                    {exp.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {hasHighlights && (
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFD9CC] bg-[#F6F4EF] text-[#141414] transition-all duration-200",
                    isOpen && "border-[#141414] bg-[#141414] text-[#F6F4EF]"
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </span>
              )}
            </button>

            <AnimatePresence initial={false}>
              {hasHighlights && isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul
                    className={cn(
                      "space-y-2 border-t border-[#ECE8DF] px-4 pt-3.5 pb-4 text-[#5E5B55] sm:px-5 sm:pb-5",
                      compact ? "text-xs" : "text-sm"
                    )}
                  >
                    {exp.highlights?.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#141414]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
