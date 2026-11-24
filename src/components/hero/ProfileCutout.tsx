"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileCutoutProps {
  src: string;
  alt: string;
  compact?: boolean;
  className?: string;
}

export function ProfileCutout({
  src,
  alt,
  compact = false,
  className,
}: ProfileCutoutProps) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={cn(
        "relative flex items-center justify-center select-none pointer-events-none",
        compact
          ? "h-[245px] w-[245px] sm:h-[280px] sm:w-[280px]"
          : "h-[300px] w-[300px] sm:h-[325px] sm:w-[325px] lg:h-[336px] lg:w-[336px]",
        className
      )}
    >
      {/* Clean circular-bottom masked studio portrait centered neatly inside the orbit */}
      <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-full">
        <img
          src={src}
          alt={alt}
          className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_14px_24px_rgba(14,14,14,0.12)]"
        />
      </div>
    </motion.div>
  );
}
