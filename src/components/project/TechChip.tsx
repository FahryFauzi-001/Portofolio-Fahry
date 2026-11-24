import * as React from "react";
import { cn } from "@/lib/utils";

interface TechChipProps {
  label: string;
  className?: string;
}

export function TechChip({ label, className }: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#E2DDD3] bg-[#F6F4EF] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#3B3935]",
        className
      )}
    >
      {label}
    </span>
  );
}
