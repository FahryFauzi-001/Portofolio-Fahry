import type { Metadata } from "next";
import { Download, MapPin, GraduationCap } from "lucide-react";
import { profile } from "@/content/profile";
import { experiences } from "@/content/experience";
import { certificates } from "@/content/certificates";
import { SocialLinks } from "@/components/hero/SocialLinks";
import { SkillGroups } from "@/components/about/SkillGroups";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { CertificateGrid } from "@/components/about/CertificateGrid";

export const metadata: Metadata = {
  title: "About",
  description: `Bio, skills, volunteer experience, certificates, and CV of ${profile.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-6 pt-28 pb-24 sm:px-10">
      {/* Bio Hero */}
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
            About Me
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#0E0E0E] sm:text-5xl">
            {profile.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-[#6B6861]">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-[#0E0E0E]" />
              {profile.university}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#0E0E0E]" />
              {profile.location}
            </span>
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#5E5B55]">
            {profile.longBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a
              href={profile.cvPath}
              download="Muhammad-Fahry-Fauzi-CV.pdf"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#141414] px-6 text-sm font-semibold text-[#F6F4EF] transition-opacity hover:opacity-85"
            >
              <Download className="h-4 w-4" />
              <span>Download CV (PDF)</span>
            </a>
            <SocialLinks socials={profile.socials} variant="minimal" />
          </div>
        </div>

        <div className="flex justify-center md:col-span-4">
          <div className="relative flex h-72 w-60 items-end justify-center overflow-hidden rounded-[32px] border border-[#E5E1D8] bg-[#EFECE5] p-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
          Toolbox
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0E0E0E] sm:text-3xl">
          Skills &amp; Technologies
        </h2>
        <div className="mt-6">
          <SkillGroups groups={profile.skills} />
        </div>
      </section>

      {/* Experience */}
      <section>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
          Activities &amp; Impact
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0E0E0E] sm:text-3xl">
          Campus &amp; Community Experience
        </h2>
        <div className="mt-6">
          <ExperienceTimeline items={experiences} />
        </div>
      </section>

      {/* Certificates */}
      <section>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
          Credentials
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0E0E0E] sm:text-3xl">
          Certificates
        </h2>
        <div className="mt-6">
          <CertificateGrid items={certificates} initialLimit={6} />
        </div>
      </section>
    </div>
  );
}
