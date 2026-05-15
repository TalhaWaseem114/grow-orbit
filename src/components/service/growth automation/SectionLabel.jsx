"use client";

import React from "react";

const SectionLabel = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-6 font-mono">
    <div className={`w-8 h-px ${light ? "bg-orange-500/50" : "bg-orange-500"}`} />
    <span className={`font-bold text-[10px] uppercase tracking-[0.4em] block ${light ? "text-orange-400" : "text-orange-500"}`}>
      {children}
    </span>
  </div>
);

export default SectionLabel;
