import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  PlayCircle,
  Smartphone,
} from "lucide-react";
import { CATEGORY_META } from "@/lib/constants";
import { getProjectBySlug, getProjectSummaries } from "@/lib/projects";
import { Badge } from "@/components/ui/Badge";
import { TechChip } from "@/components/project/TechChip";
import { DemoVideo } from "@/components/project/DemoVideo";
import { Gallery } from "@/components/project/Gallery";
import { ArchitectureDiagram } from "@/components/project/ArchitectureDiagram";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSummaries().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getProjectSummaries();
  const currentIdx = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    allProjects.length > 1
      ? allProjects[(currentIdx + 1) % allProjects.length]
      : null;

  const cat = CATEGORY_META[project.category];

  return (
    <article className="mx-auto max-w-4xl px-6 pt-28 pb-24 sm:px-10">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 rounded-full border border-[#DFD9CC] bg-[#FAF9F5] px-4 py-2 text-xs font-medium text-[#141414] transition-colors hover:border-[#141414]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Projects</span>
      </Link>

      {/* Header */}
      <header className="mt-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge className={cat.accent}>{cat.label}</Badge>
          <span className="font-mono text-xs text-[#7A766E]">
            {project.period}
          </span>
        </div>

        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0E0E0E] sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-3 text-base leading-relaxed text-[#5E5B55] sm:text-lg">
          {project.summary}
        </p>

        {/* Action links */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#141414] px-5 text-xs font-semibold text-[#F6F4EF] transition-opacity hover:opacity-85"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D8D3C9] bg-[#FAF9F5] px-5 text-xs font-semibold text-[#141414] transition-colors hover:border-[#141414]"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
          {project.links.playstore && (
            <a
              href={project.links.playstore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D8D3C9] bg-[#FAF9F5] px-5 text-xs font-semibold text-[#141414] hover:border-[#141414]"
            >
              <Smartphone className="h-4 w-4" />
              <span>Play Store</span>
            </a>
          )}
          {project.links.apk && (
            <a
              href={project.links.apk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D8D3C9] bg-[#FAF9F5] px-5 text-xs font-semibold text-[#141414] hover:border-[#141414]"
            >
              <Smartphone className="h-4 w-4" />
              <span>Download APK</span>
            </a>
          )}
          {project.links.video && (
            <a
              href={project.links.video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D8D3C9] bg-[#FAF9F5] px-5 text-xs font-semibold text-[#141414] hover:border-[#141414]"
            >
              <PlayCircle className="h-4 w-4" />
              <span>Watch Demo</span>
            </a>
          )}
        </div>
      </header>

      {/* Cover Image */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5E1D8] bg-[#FAF9F5]">
        <img
          src={project.cover}
          alt={project.title}
          className="aspect-video w-full object-cover"
        />
      </div>

      {/* Metadata Strip */}
      <section className="mt-6 grid grid-cols-1 gap-4 rounded-3xl border border-[#E5E1D8] bg-[#FAF9F5] p-5 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8C8880]">
            Role
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0E0E0E]">
            {project.role}
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8C8880]">
            Timeline
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0E0E0E]">
            {project.period}
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8C8880]">
            Tech Stack
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechChip key={t} label={t} />
            ))}
          </div>
        </div>
      </section>

      {project.metrics && project.metrics.length > 0 && (
        <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-[#E5E1D8] bg-[#EFECE5]/65 p-4"
            >
              <div className="font-mono text-2xl font-bold text-[#0E0E0E]">
                {metric.value}
              </div>
              <div className="mt-0.5 text-xs font-medium text-[#6B6861]">
                {metric.label}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Optional Demo Video */}
      {project.video && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-lg font-bold text-[#0E0E0E]">
            Demo Video
          </h2>
          <DemoVideo
            src={project.video}
            poster={project.cover}
            title={project.title}
          />
        </section>
      )}

      {/* MDX Case Study Body */}
      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#0E0E0E] prose-h2:mt-10 prose-h2:text-2xl prose-p:text-[#4A4843] prose-li:text-[#4A4843] prose-a:text-[#0E0E0E] prose-strong:text-[#0E0E0E]">
        <MDXRemote
          source={project.content}
          components={{ ArchitectureDiagram }}
        />
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold text-[#0E0E0E]">
            Screenshots &amp; Visuals
          </h2>
          <Gallery images={project.gallery} title={project.title} />
        </section>
      )}

      {/* Next Project Navigation */}
      {nextProject && (
        <div className="mt-16 border-t border-[#E5E1D8] pt-8">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between rounded-3xl border border-[#E5E1D8] bg-[#FAF9F5] p-5 transition-all hover:border-[#141414]"
          >
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8C8880]">
                Next Project
              </p>
              <p className="mt-1 font-display text-lg font-bold text-[#0E0E0E]">
                {nextProject.title}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFD9CC] bg-white text-[#141414] transition-colors group-hover:border-[#141414] group-hover:bg-[#141414] group-hover:text-[#F6F4EF]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}
