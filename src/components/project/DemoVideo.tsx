"use client";

import * as React from "react";
import { Play } from "lucide-react";

interface DemoVideoProps {
  src?: string;
  poster?: string;
  title: string;
}

export function DemoVideo({ src, poster, title }: DemoVideoProps) {
  const [loaded, setLoaded] = React.useState(false);

  if (!src) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
      {!loaded ? (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-slate-900"
        >
          {poster && (
            <img
              src={poster}
              alt={`${title} video preview`}
              className="h-full w-full object-cover opacity-75 transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition-transform duration-200 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-slate-950/75 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
            Play Demo Video
          </span>
        </button>
      ) : (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          muted
          playsInline
          className="aspect-video w-full bg-black object-contain"
        />
      )}
    </div>
  );
}
