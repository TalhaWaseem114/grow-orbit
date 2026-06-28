import { ArrowRight } from "lucide-react";

export default function OrbitBridgeCTA({ scrollToForm }) {
  return (
    <div className="text-center py-12 px-5 bg-white border-t border-zinc-100">
      <p className="text-zinc-600 text-base font-light mb-4 max-w-lg mx-auto">
        Sound familiar? We've helped 80+ brands solve these exact challenges.
      </p>
      <button
        onClick={scrollToForm}
        className="inline-flex items-center gap-2 text-orange-700 font-black text-[11px] uppercase tracking-widest hover:gap-4 transition-all"
      >
        Book Your Free 15-Min Meeting <ArrowRight size={13} />
      </button>
    </div>
  );
}
