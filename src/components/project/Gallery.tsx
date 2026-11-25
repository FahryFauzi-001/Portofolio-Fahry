"use client";

import * as React from "react";
import { Expand } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images?: string[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const gridClass =
    images.length === 1
      ? "grid-cols-1"
      : images.length >= 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <>
      <div className={cn("grid gap-4", gridClass)}>
        {images.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => setSelected(src)}
            className="group relative flex items-center justify-center overflow-hidden rounded-3xl border border-[#E5E1D8] bg-[#FAF9F5] p-3 text-left transition-all hover:border-[#141414]/40 hover:shadow-md"
          >
            <img
              src={src}
              alt={`${title} screenshot ${idx + 1}`}
              loading="lazy"
              className={cn(
                "w-full rounded-2xl object-contain transition-transform duration-300 group-hover:scale-[1.015]",
                images.length === 1 ? "max-h-[520px]" : "max-h-[440px]"
              )}
            />
            <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#141414] opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <Expand className="h-3.5 w-3.5" />
            </span>
          </button>
        ))}
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={`${title} · Preview`}
        className="max-w-4xl bg-[#FAF9F5]"
      >
        {selected && (
          <img
            src={selected}
            alt={title}
            className="mx-auto max-h-[75vh] w-auto rounded-2xl border border-[#E5E1D8] object-contain"
          />
        )}
      </Modal>
    </>
  );
}
