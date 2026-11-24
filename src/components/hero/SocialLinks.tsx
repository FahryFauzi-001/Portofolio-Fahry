import * as React from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

interface SocialLinksProps {
  socials: SocialLink[];
  variant?: "minimal" | "pill";
  includeEmail?: boolean;
  className?: string;
}

export function SocialLinks({
  socials,
  variant = "minimal",
  includeEmail = true,
  className,
}: SocialLinksProps) {
  const list = includeEmail
    ? socials
    : socials.filter((item) => item.icon !== "mail");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center",
        variant === "minimal" ? "gap-5" : "gap-2.5",
        className
      )}
    >
      {list.map((item) => {
        const Icon = iconMap[item.icon];
        const isMail = item.href.startsWith("mailto:");
        return (
          <a
            key={item.label}
            href={item.href}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            aria-label={item.label}
            title={`${item.label} (${item.handle})`}
            className={cn(
              "group inline-flex items-center justify-center transition-all duration-200",
              variant === "minimal"
                ? "text-[#141414] hover:-translate-y-0.5 hover:opacity-65"
                : "h-10 w-10 rounded-full border border-[#DFD9CC] bg-[#FAF9F5] text-[#141414] hover:-translate-y-0.5 hover:border-[#141414] hover:bg-[#141414] hover:text-[#F6F4EF]"
            )}
          >
            <Icon
              strokeWidth={1.75}
              className={cn(
                "transition-transform duration-200 group-hover:scale-105",
                variant === "minimal" ? "h-6 w-6" : "h-4 w-4"
              )}
            />
          </a>
        );
      })}
    </div>
  );
}
