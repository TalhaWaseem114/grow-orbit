"use client";

import { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service
    console.error("Unhandled client error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-bold uppercase tracking-wider mb-8">
          <AlertOctagon size={13} />
          <span>Application Error</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100 mb-3">
          Something went wrong.
        </h1>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-sm">
          An unexpected error occurred in our system. Let's try to reload the page or return home.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] cursor-pointer"
          >
            <RotateCcw size={16} />
            Try Again
          </button>
          <a
            href="/"
            className="flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
          >
            Back to Home
          </a>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-6 text-zinc-700 text-[10px] uppercase font-bold tracking-[0.3em]">
        Grow Orbit
      </div>
    </div>
  );
}
