"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabOption<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface TabsProps<T extends string> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId?: string;
  className?: string;
}

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  layoutId = "tabs-pill",
  className,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-full bg-[#EFECE5] p-1 border border-[#E2DDD3]",
        className
      )}
    >
      {options.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
              active ? "text-[#F6F4EF]" : "text-[#5E5B55] hover:text-[#0E0E0E]"
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-full bg-[#141414]"
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {tab.label}
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    active ? "text-[#C7C3BA]" : "text-[#8C8880]"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
