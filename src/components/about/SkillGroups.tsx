import * as React from "react";
import type { SkillGroup } from "@/types";
import { TechChip } from "@/components/project/TechChip";

interface SkillGroupsProps {
  groups: SkillGroup[];
  compact?: boolean;
}

export function SkillGroups({ groups, compact = false }: SkillGroupsProps) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
          : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {groups.map((group) => (
        <div
          key={group.name}
          className="rounded-2xl border border-[#E5E1D8] bg-[#FAF9F5] p-4"
        >
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#7A766E]">
            {group.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {group.items.map((skill) => (
              <TechChip key={skill} label={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
