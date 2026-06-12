"use client";

import React, { useEffect } from "react";

export default function ProductHuntingPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white pt-32 pb-24"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <h1 className="text-4xl font-black uppercase text-zinc-900 mb-4">Product Hunting & Sourcing</h1>
        <p className="text-zinc-500 text-lg">This section is currently under development. Research in progress.</p>
      </div>
    </div>
  );
}
