"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";

interface ArchitectureDiagramProps {
  src: string;
  alt?: string;
  eyebrow?: string;
  title?: string;
  caption?: string;
}

export function ArchitectureDiagram({
  src,
  alt = "System architecture diagram",
  eyebrow = "Architecture",
  title = "System Architecture",
  caption,
}: ArchitectureDiagramProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <section className="not-prose my-10">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[#7A766E]">
          {eyebrow}
        </p>
        <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#0E0E0E]">
          {title}
        </h2>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Zoom ${title} diagram`}
          className="group relative mt-4 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[#E5E1D8] bg-white p-3 text-left transition-all hover:border-[#141414]/40 hover:shadow-md sm:p-5"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="block h-auto w-full rounded-lg"
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#E5E1D8] bg-white/95 px-2.5 py-1 font-mono text-[10px] font-medium text-[#141414] shadow-sm transition-opacity sm:right-4 sm:top-4 sm:opacity-0 sm:group-hover:opacity-100">
            <Expand className="h-3 w-3" />
            <span>Zoom</span>
          </span>
        </button>

        {caption && (
          <p className="mt-3 text-xs leading-relaxed text-[#6B6861]">
            {caption}
          </p>
        )}
      </section>

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#141414] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                    {eyebrow}
                  </span>
                  <span className="text-white/25">·</span>
                  <h3 className="font-display text-sm font-semibold text-white">
                    {title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close diagram lightbox"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-auto p-3 sm:p-5">
                <div className="mx-auto w-full min-w-[640px] rounded-xl bg-white p-2 sm:min-w-0 sm:p-4">
                  <img
                    src={src}
                    alt={alt}
                    className="block h-auto w-full"
                  />
                </div>
                {caption && (
                  <p className="mt-3 text-center text-xs leading-relaxed text-white/70">
                    {caption}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
