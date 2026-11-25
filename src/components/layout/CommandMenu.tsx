"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FolderKanban,
  Home,
  Search,
  User,
  X,
} from "lucide-react";
import type { ProjectSummary } from "@/types";
import { profile } from "@/content/profile";
import { CATEGORY_META } from "@/lib/constants";

interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  projects: ProjectSummary[];
}

export function CommandMenu({ open, onClose, projects }: CommandMenuProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const navigate = (href: string) => {
    onClose();
    router.push(href);
  };

  const q = query.trim().toLowerCase();
  const matchedProjects = projects.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q))
  );

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[#E5E1D8] bg-[#FAF9F5] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[#E7E3DA] px-4 py-3.5">
              <Search className="h-4 w-4 text-[#8C8880]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to projects, pages, or CV..."
                className="w-full bg-transparent text-sm text-[#0E0E0E] placeholder:text-[#8C8880] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-[#7A766E] hover:bg-[#EFECE5] hover:text-[#0E0E0E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              <div className="px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8C8880]">
                Pages
              </div>
              {[
                { label: "Home · Floating Orbit", href: "/", icon: Home },
                { label: "All Projects", href: "/projects", icon: FolderKanban },
                { label: "About, Experience & Certs", href: "/about", icon: User },
              ].map((nav) => {
                const Icon = nav.icon;
                return (
                  <button
                    key={nav.href}
                    type="button"
                    onClick={() => navigate(nav.href)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[#3B3935] hover:bg-[#EFECE5] hover:text-[#0E0E0E]"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      {nav.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                  </button>
                );
              })}

              <a
                href={profile.cvPath}
                download="Muhammad-Fahry-Fauzi-CV.pdf"
                onClick={onClose}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[#3B3935] hover:bg-[#EFECE5] hover:text-[#0E0E0E]"
              >
                <span className="flex items-center gap-2.5">
                  <Download className="h-4 w-4" />
                  Download CV (PDF)
                </span>
                <span className="font-mono text-[10px] text-[#8C8880]">PDF</span>
              </a>

              <div className="mt-2 px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8C8880]">
                Projects ({matchedProjects.length})
              </div>

              {matchedProjects.length === 0 ? (
                <p className="px-3 py-4 text-center text-xs text-[#8C8880]">
                  No projects match &ldquo;{query}&rdquo;.
                </p>
              ) : (
                matchedProjects.map((project) => (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-[#EFECE5]"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#0E0E0E]">
                        {project.title}
                      </div>
                      <div className="font-mono text-[11px] text-[#7A766E]">
                        {CATEGORY_META[project.category].label}
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-[#8C8880]" />
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
