"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AmazonLandingClient() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6 selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-md">
        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-4">
          Amazon Operations &amp; PPC Landing Page
        </h1>
        <p className="text-zinc-500 text-xs font-light mb-8">
          This specialized landing page is currently under construction.
        </p>
        <Link href="/get-started" className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest hover:text-white transition-colors no-underline">
          <ArrowLeft size={14} /> Back to Get Started
        </Link>
      </div>
    </main>
  );
}
