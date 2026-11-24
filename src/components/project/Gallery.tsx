"use client";

import * as React from "react";
import { Expand } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface GalleryProps {
  images?: string[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => setSelected(src)}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
          >
            <img
              src={src}
              alt={`${title} screenshot ${idx + 1}`}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-slate-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <Expand className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={`${title} · Preview`}
        className="max-w-4xl"
      >
        {selected && (
          <img
            src={selected}
            alt={title}
            className="w-full rounded-2xl border border-slate-200 object-contain"
          />
        )}
      </Modal>
    </>
  );
}
