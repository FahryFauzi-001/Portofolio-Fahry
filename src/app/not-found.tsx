import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <span className="rounded-full border border-[#DFD9CC] bg-[#FAF9F5] px-3.5 py-1 font-mono text-xs font-semibold text-[#5E5B55]">
        404 · Out of Orbit
      </span>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#0E0E0E]">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-[#5E5B55]">
        The route you&apos;re looking for drifted out of orbit. Head back to the
        main stage or explore the project archive.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[#141414] px-5 text-xs font-semibold text-[#F6F4EF] transition-opacity hover:opacity-85"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex h-10 items-center rounded-full border border-[#D8D3C9] bg-[#FAF9F5] px-5 text-xs font-semibold text-[#141414] hover:border-[#141414]"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
}
