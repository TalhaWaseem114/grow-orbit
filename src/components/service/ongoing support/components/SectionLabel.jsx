import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-[2px] bg-orange-500" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
        {children}
      </span>
    </div>
  );
}
