import type { Metadata } from "next";
import { getProjectSummaries } from "@/lib/projects";
import { ProjectsBrowser } from "@/components/project/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects across Mobile, Computer Vision, Web, IoT, and Machine Learning.",
};

export default function ProjectsPage() {
  const projects = getProjectSummaries();

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:px-10">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
          Project Archive
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#0E0E0E] sm:text-5xl">
          All Projects
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#5E5B55]">
          Filter across Android mobile apps, computer vision, full-stack web,
          Arduino IoT builds, and machine learning systems.
        </p>
      </div>

      <div className="mt-10">
        <ProjectsBrowser projects={projects} />
      </div>
    </div>
  );
}
