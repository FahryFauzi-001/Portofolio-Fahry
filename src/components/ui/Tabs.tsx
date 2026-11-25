"use client";

import * as React from "react";
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
  className,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "no-scrollbar inline-flex max-w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-full border border-[#E2DDD3] bg-[#EFECE5] p-1",
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
              "relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-3.5",
              active
                ? "bg-[#141414] text-[#F6F4EF] shadow-sm"
                : "text-[#5E5B55] hover:text-[#0E0E0E]"
            )}
          >
            <span className="inline-flex items-center gap-1.5">
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
