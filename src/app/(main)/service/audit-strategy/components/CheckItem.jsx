import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function CheckItem({ children, light = false }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 size={15} className="text-orange-500 shrink-0 mt-0.5" />
      <span className={`text-[14px] font-light leading-snug ${light ? "text-zinc-300" : "text-zinc-600"}`}>
        {children}
      </span>
    </div>
  );
}
