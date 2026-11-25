"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, FileText, X } from "lucide-react";
import type { Certificate, Experience, Profile } from "@/types";
import { Tabs, type TabOption } from "@/components/ui/Tabs";
import { SkillGroups } from "./SkillGroups";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { CertificateGrid } from "./CertificateGrid";

type AboutTab = "about" | "experience" | "certificates" | "cv";

interface AboutPanelProps {
  profile: Profile;
  experiences: Experience[];
  certificates: Certificate[];
  onClose: () => void;
}

export function AboutPanel({
  profile,
  experiences,
  certificates,
  onClose,
}: AboutPanelProps) {
  const [tab, setTab] = React.useState<AboutTab>("about");

  const options: TabOption<AboutTab>[] = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience", count: experiences.length },
    { id: "certificates", label: "Certificates", count: certificates.length },
    { id: "cv", label: "CV" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 16, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="glass-panel rounded-[28px] border border-[#E5E1D8] p-5 shadow-panel sm:p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E3DA] pb-4">
        <Tabs
          options={options}
          value={tab}
          onChange={setTab}
          layoutId="mug-about-tabs"
        />

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className="inline-flex items-center gap-1 rounded-full border border-[#DFD9CC] bg-white px-3.5 py-1.5 text-xs font-medium text-[#141414] transition-colors hover:border-[#141414]"
          >
            <span>Full Page</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close about panel"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DFD9CC] bg-white text-[#6B6861] hover:border-[#141414] hover:text-[#0E0E0E]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tab Body */}
      <div className="mt-5 max-h-[460px] overflow-y-auto pr-1">
        {tab === "about" && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-[#0E0E0E]">
                {profile.name}
              </h2>
              <p className="mt-0.5 font-mono text-xs text-[#7A766E]">
                {profile.university} · {profile.location}
              </p>
              <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#5E5B55]">
                {profile.longBio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <SkillGroups groups={profile.skills} compact />
          </div>
        )}

        {tab === "experience" && (
          <ExperienceTimeline items={experiences} compact />
        )}

        {tab === "certificates" && (
          <CertificateGrid items={certificates} initialLimit={4} compact />
        )}

        {tab === "cv" && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8D3C9] bg-[#F6F4EF] p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#141414] text-[#F6F4EF]">
              <FileText className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-[#0E0E0E]">
              Curriculum Vitae (PDF)
            </h3>
            <p className="mt-1.5 max-w-sm text-sm text-[#5E5B55]">
              Download or view the latest resume covering technical projects,
              campus experience, and technical skills.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href={profile.cvPath}
                download="Muhammad-Fahry-Fauzi-CV.pdf"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#141414] px-5 text-xs font-semibold text-[#F6F4EF] transition-opacity hover:opacity-85"
              >
                <Download className="h-4 w-4" />
                <span>Download CV PDF</span>
              </a>
              <a
                href={profile.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#D4CEC2] bg-white px-4 text-xs font-medium text-[#141414] hover:border-[#141414]"
              >
                <span>Open PDF</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
