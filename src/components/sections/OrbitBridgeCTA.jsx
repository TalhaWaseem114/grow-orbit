import { ArrowRight } from "lucide-react";

export default function OrbitBridgeCTA({ scrollToForm }) {
  return (
    <div className="text-center py-12 px-5 bg-white border-t border-zinc-100">
      <p className="text-zinc-600 text-base font-light mb-4 max-w-lg mx-auto">
        Sound familiar? We've helped 80+ brands solve these exact challenges.
      </p>
      <button
        onClick={scrollToForm}
        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-orange-400 hover:text-white font-extrabold text-[11px] uppercase tracking-widest hover:gap-3 transition-all shadow-sm border border-zinc-800"
      >
        Book Your Free 15-Min Meeting <ArrowRight size={13} className="text-orange-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
