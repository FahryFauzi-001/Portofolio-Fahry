import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "blue" | "outline" | "subtle";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-[#141414] text-[#F6F4EF] border-transparent",
  blue: "bg-[#EFECE5] text-[#141414] border-[#DDD7CB]",
  outline: "bg-[#FAF9F5] text-[#3F3D39] border-[#E2DDD3]",
  subtle: "bg-[#EFECE5] text-[#5E5B55] border-transparent",
};

export function Badge({
  className,
  variant = "outline",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
