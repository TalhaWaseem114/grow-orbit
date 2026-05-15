import React from "react";

export default function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-[2px] bg-orange-500" />
      <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.4em] ${
        light ? "text-orange-400" : "text-orange-500/80"
      }`}>
        {children}
      </span>
    </div>
  );
}
