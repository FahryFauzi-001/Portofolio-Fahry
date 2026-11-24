"use client";

import * as React from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";
import type { OrbitObjectConfig } from "@/types";
import { ObjectTooltip } from "./ObjectTooltip";
import { cn } from "@/lib/utils";

interface OrbitObjectProps {
  item: OrbitObjectConfig;
  countLabel: string;
  isSelected: boolean;
  isDimmed: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onSelect: () => void;
}

export function OrbitObject({
  item,
  countLabel,
  isSelected,
  isDimmed,
  mouseX,
  mouseY,
  onSelect,
}: OrbitObjectProps) {
  const [hovered, setHovered] = React.useState(false);

  // Exact Cartesian offset on the circle from center (50%, 50%)
  const rad = (item.angleDeg * Math.PI) / 180;
  const offsetX = Math.round(Math.cos(rad) * item.radiusPx);
  const offsetY = Math.round(Math.sin(rad) * item.radiusPx);

  // Subtle 2.5D mouse parallax on an INNER motion.div so CSS centering is never overwritten!
  const parallaxX = useTransform(
    mouseX,
    [-1, 1],
    [-9 * item.depth, 9 * item.depth]
  );
  const parallaxY = useTransform(
    mouseY,
    [-1, 1],
    [-8 * item.depth, 8 * item.depth]
  );

  return (
    <div
      style={{
        left: `calc(50% + ${offsetX}px)`,
        top: `calc(50% + ${offsetY}px)`,
      }}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
        hovered || isSelected ? "z-40" : "z-20",
        isDimmed && !hovered ? "opacity-40" : "opacity-100"
      )}
    >
      <motion.div style={{ x: parallaxX, y: parallaxY }}>
        <motion.div
          animate={{
            y: [0, -item.floatAmplitude, 0],
            rotate: [item.rotate - 1.2, item.rotate + 1.2, item.rotate - 1.2],
          }}
          transition={{
            duration: item.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.floatDelay,
          }}
          className="relative"
        >
          <ObjectTooltip
            visible={hovered && !isSelected}
            label={item.label}
            meta={countLabel}
            side={item.tooltipSide}
          />

          <motion.button
            layoutId={`orbit-object-${item.id}`}
            type="button"
            onClick={onSelect}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            whileHover={{ scale: 1.11 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Open ${item.label} (${countLabel})`}
            style={{ width: item.size, height: item.size }}
            className="group relative flex items-center justify-center bg-transparent p-1 focus-visible:outline-none"
          >
            <img
              src={item.image}
              alt={item.alt}
              draggable={false}
              className={cn(
                "h-full w-full object-contain clay-object-img",
                (hovered || isSelected) && "clay-object-img-active"
              )}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
