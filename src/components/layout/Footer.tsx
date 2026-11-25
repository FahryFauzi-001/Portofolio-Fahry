import * as React from "react";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { SocialLinks } from "@/components/hero/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E1D8] bg-[#F1EEE7]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
              Contact
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0E0E0E] sm:text-3xl">
              Have a project, internship, or collaboration in mind?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-[#5E5B55]">
              Reach out via email or social links—or download my latest CV
              directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#141414] px-6 text-sm font-medium text-[#F6F4EF] transition-opacity hover:opacity-85"
            >
              <Mail className="h-4 w-4" />
              <span>Email Me</span>
            </a>
            <a
              href={profile.cvPath}
              download="Muhammad-Fahry-Fauzi-CV.pdf"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#D4CEC2] bg-[#FAF9F5] px-6 text-sm font-medium text-[#141414] transition-colors hover:border-[#141414]"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#E2DDD3] pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#6B6861]">
            <span className="font-display font-bold text-[#0E0E0E]">MFF.</span>
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <Link href="/projects" className="hover:text-[#0E0E0E]">
              Projects
            </Link>
            <Link href="/about" className="hover:text-[#0E0E0E]">
              About
            </Link>
          </div>

          <SocialLinks socials={profile.socials} variant="minimal" />
        </div>
      </div>
    </footer>
  );
}
