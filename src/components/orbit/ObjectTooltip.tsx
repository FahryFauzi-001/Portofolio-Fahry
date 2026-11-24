"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ObjectTooltipProps {
  visible: boolean;
  label: string;
  meta: string;
  side?: "right" | "left" | "top";
}

export function ObjectTooltip({
  visible,
  label,
  meta,
  side = "right",
}: ObjectTooltipProps) {
  const positionClass =
    side === "right"
      ? "left-full top-1/2 ml-3 -translate-y-1/2"
      : side === "left"
      ? "right-full top-1/2 mr-3 -translate-y-1/2"
      : "left-1/2 -top-11 -translate-x-1/2";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: side === "top" ? 6 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className={`pointer-events-none absolute z-50 whitespace-nowrap ${positionClass}`}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E2D9] bg-white/95 px-4 py-2 text-xs shadow-[0_10px_28px_-6px_rgba(14,14,14,0.14)] backdrop-blur-md">
            <span className="font-display font-bold text-[#0E0E0E]">
              {label}
            </span>
            <span className="text-[#A39E95]">·</span>
            <span className="font-sans font-normal text-[#66635D]">{meta}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
