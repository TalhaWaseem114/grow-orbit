"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const decodedPath = decodeURIComponent(currentPath);
      if (decodedPath.includes(" ") || currentPath.includes("%20")) {
        const cleanedPath = decodedPath
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
        if (cleanedPath !== currentPath) {
          window.location.replace(cleanedPath + window.location.search);
        }
      }
    }
  }, []);
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-zinc-800/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-400 text-xs font-bold uppercase tracking-wider mb-8 animate-pulse">
          <HelpCircle size={13} />
          <span>404 - Page Lost in Orbit</span>
        </div>

        {/* Huge 404 Number */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent select-none mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100 mb-3">
          This Page Has Left the Orbit.
        </h2>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-sm">
          The link you followed might be broken, or the page may have been moved. Let's get you back on track to scale your Amazon business.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02]"
          >
            <MoveLeft size={16} />
            Back to Home
          </Link>
          <Link
            href="/get-started/book-meeting"
            className="flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
          >
            Book Strategy Call
          </Link>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-6 text-zinc-700 text-[10px] uppercase font-bold tracking-[0.3em]">
        Grow Orbit
      </div>
    </div>
  );
}
