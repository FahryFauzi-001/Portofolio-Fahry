"use client";

import * as React from "react";
import {
  Award,
  ChevronDown,
  ChevronUp,
  Expand,
  ExternalLink,
  FileText,
} from "lucide-react";
import type { Certificate } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

interface CertificateGridProps {
  items: Certificate[];
  initialLimit?: number;
  compact?: boolean;
}

export function CertificateGrid({
  items,
  initialLimit = 4,
  compact = false,
}: CertificateGridProps) {
  const [showAll, setShowAll] = React.useState(false);
  const [preview, setPreview] = React.useState<Certificate | null>(null);

  const visibleItems = showAll ? items : items.slice(0, initialLimit);
  const hasMore = items.length > initialLimit;

  const isPdfUrl = (url?: string) =>
    Boolean(url && url.toLowerCase().endsWith(".pdf"));

  return (
    <div>
      <div
        className={
          compact
            ? "grid grid-cols-1 gap-3"
            : "grid grid-cols-1 gap-5 sm:grid-cols-2"
        }
      >
        {visibleItems.map((cert) => {
          const hasImage = Boolean(cert.image);
          const hasPdf = isPdfUrl(cert.credentialUrl);

          return (
            <div
              key={cert.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E5E1D8] bg-[#FAF9F5] transition-all hover:border-[#141414]/40 hover:shadow-sm"
            >
              {/* Visual preview thumbnail when image or PDF is available */}
              {!compact && (hasImage || hasPdf) && (
                <button
                  type="button"
                  onClick={() => setPreview(cert)}
                  className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#E7E3DA] bg-[#EFECE5] text-left"
                >
                  {hasImage ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#141414] px-6 text-center text-[#F6F4EF]">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <FileText className="h-6 w-6" />
                      </span>
                      <span className="mt-3 font-mono text-[11px] uppercase tracking-widest text-[#C7C3BA]">
                        Official PDF Certificate
                      </span>
                      <span className="mt-1 line-clamp-2 max-w-xs font-display text-sm font-bold text-white">
                        {cert.title}
                      </span>
                    </div>
                  )}
                  <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#141414] opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" />
                  </span>
                </button>
              )}

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFECE5] text-[#141414]">
                      <Award className="h-4 w-4" />
                    </span>
                    {cert.date && (
                      <span className="font-mono text-[11px] text-[#8C8880]">
                        {cert.date}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0E0E0E]">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B6861]">{cert.issuer}</p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#ECE8DF] pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.tags?.map((tag) => (
                      <Badge key={tag} variant="subtle" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {(hasImage || hasPdf) && (
                      <button
                        type="button"
                        onClick={() => setPreview(cert)}
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#141414] hover:opacity-65"
                      >
                        <span>Preview</span>
                        <Expand className="h-3 w-3" />
                      </button>
                    )}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#5E5B55] hover:text-[#0E0E0E]"
                      >
                        <span>{hasPdf ? "Open PDF" : "Verify"}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D8D3C9] bg-[#FAF9F5] px-5 py-2 text-xs font-semibold text-[#141414] transition-colors hover:border-[#141414]"
          >
            {showAll ? (
              <>
                <span>Show fewer certificates</span>
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span>Show all {items.length} certificates</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      )}

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview?.title}
        className="max-w-4xl bg-[#FAF9F5]"
      >
        {preview && (
          <div className="space-y-4">
            {preview.image ? (
              <img
                src={preview.image}
                alt={preview.title}
                className="w-full rounded-2xl border border-[#E5E1D8] object-contain"
              />
            ) : isPdfUrl(preview.credentialUrl) ? (
              <iframe
                src={`${preview.credentialUrl}#toolbar=1&navpanes=0`}
                title={preview.title}
                className="h-[70vh] w-full rounded-2xl border border-[#E5E1D8] bg-white"
              />
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6861]">
              <span>
                {preview.issuer}
                {preview.date ? ` · ${preview.date}` : ""}
              </span>
              {preview.credentialUrl && (
                <a
                  href={preview.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] px-4 py-1.5 font-medium text-[#F6F4EF] hover:opacity-85"
                >
                  <span>Open Original</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
