import { ArrowRight } from "lucide-react";

export default function OrbitBridgeCTA({ scrollToForm }) {
  return (
    <div className="text-center py-12 px-5 bg-white border-t border-zinc-100">
      <p className="text-zinc-600 text-base font-light mb-4 max-w-lg mx-auto">
        Sound familiar? We've helped 80+ brands solve these exact challenges.
      </p>
      <button
        onClick={scrollToForm}
        className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-110 text-white font-extrabold text-[11px] uppercase tracking-widest hover:gap-3 transition-all shadow-md shadow-orange-500/20"
      >
        Book Your Free 15-Min Meeting <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
