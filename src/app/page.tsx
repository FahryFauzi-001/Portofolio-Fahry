import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { experiences } from "@/content/experience";
import { certificates } from "@/content/certificates";
import { getFeaturedProjects, getProjectSummaries } from "@/lib/projects";
import { OrbitStage } from "@/components/orbit/OrbitStage";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { CertificateGrid } from "@/components/about/CertificateGrid";

export default function HomePage() {
  const allProjects = getProjectSummaries();
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* Concept D: Floating Orbit Hero */}
      <OrbitStage
        profile={profile}
        projects={allProjects}
        experiences={experiences}
        certificates={certificates}
      />

      {/* Scrollable Recruiter Sections below the hero */}
      <div className="mx-auto max-w-7xl space-y-24 px-6 py-24 sm:px-10">
        {/* Featured Projects */}
        <section id="featured-projects">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
                Selected Work
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0E0E0E]">
                Featured Projects
              </h2>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D8D3C9] bg-[#FAF9F5] px-4 py-2 text-xs font-semibold text-[#141414] transition-colors hover:border-[#141414] hover:bg-[#141414] hover:text-[#F6F4EF]"
            >
              <span>All {allProjects.length} Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Campus & Community Experience */}
        <section id="experience">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
                Activities &amp; Impact
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0E0E0E]">
                Campus &amp; Community Experience
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141414] transition-opacity hover:opacity-65"
            >
              <span>More about me</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 max-w-4xl">
            <ExperienceTimeline items={experiences} />
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
              Verified Learning
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0E0E0E]">
              Certificates
            </h2>
          </div>

          <div className="mt-8">
            <CertificateGrid items={certificates} initialLimit={4} />
          </div>
        </section>
      </div>
    </>
  );
}
