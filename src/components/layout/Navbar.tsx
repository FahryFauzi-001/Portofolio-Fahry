"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import type { ProjectSummary } from "@/types";
import { cn } from "@/lib/utils";
import { CommandMenu } from "./CommandMenu";

interface NavbarProps {
  projects: ProjectSummary[];
}

const navItems = [
  { label: "Orbit", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Navbar({ projects }: NavbarProps) {
  const pathname = usePathname();
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-200",
          scrolled
            ? "border-b border-[#E7E3DA] bg-[#F6F4EF]/90 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
          {/* Minimalist MFF. wordmark matching reference */}
          <Link
            href="/"
            className="font-display text-lg font-black tracking-tight text-[#0E0E0E] transition-opacity hover:opacity-70"
          >
            MFF.
          </Link>

          {/* Subtle minimalist nav links on the right */}
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm transition-colors",
                      active
                        ? "font-semibold text-[#0E0E0E]"
                        : "font-normal text-[#6B6861] hover:text-[#0E0E0E]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              aria-label="Open quick jump menu"
              className="inline-flex h-8 items-center gap-2 rounded-full border border-[#DFD9CC] bg-[#FAF9F5]/80 px-3 text-xs font-medium text-[#5E5B55] transition-colors hover:border-[#141414] hover:text-[#0E0E0E]"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="font-mono text-[10px]">⌘K</kbd>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#DFD9CC] bg-[#FAF9F5] text-[#0E0E0E] md:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="mx-6 mb-4 rounded-2xl border border-[#E5E1D8] bg-[#FAF9F5] p-2 shadow-lg md:hidden">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-2.5 text-sm font-medium",
                    active
                      ? "bg-[#141414] text-[#F6F4EF]"
                      : "text-[#5E5B55] hover:bg-[#EFECE5] hover:text-[#0E0E0E]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <CommandMenu
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        projects={projects}
      />
    </>
  );
}
