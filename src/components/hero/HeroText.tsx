"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Profile } from "@/types";
import { SocialLinks } from "./SocialLinks";

interface HeroTextProps {
  profile: Profile;
}

export function HeroText({ profile }: HeroTextProps) {
  const nameParts = profile.name.trim().split(/\s+/);
  const firstLine = nameParts[0] ?? profile.name;
  const secondLine = nameParts.slice(1).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start text-left"
    >
      {/* Crisp Editorial 2-Line Name */}
      <h1 className="font-display text-5xl font-extrabold tracking-[-0.035em] text-[#0E0E0E] sm:text-6xl lg:text-[4.35rem] lg:leading-[1.03]">
        <span className="block">{firstLine}</span>
        {secondLine && <span className="block">{secondLine}</span>}
      </h1>

      {/* Clean University & Major Hierarchy */}
      <div className="mt-4 space-y-0.5">
        <p className="text-lg font-medium tracking-tight text-[#2B2A27] sm:text-[1.22rem]">
          {profile.university}
        </p>
        <p className="text-base font-normal tracking-tight text-[#78746C] sm:text-[1.05rem]">
          Computer Science
        </p>
      </div>

      {/* Clean Monochrome Social Icons */}
      <div className="mt-7">
        <SocialLinks
          socials={profile.socials}
          variant="minimal"
          includeEmail={false}
        />
      </div>
    </motion.div>
  );
}
