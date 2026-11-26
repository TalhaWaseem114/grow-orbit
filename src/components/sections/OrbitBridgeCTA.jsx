import { ArrowRight } from "lucide-react";

export default function OrbitBridgeCTA({ scrollToForm }) {
  return (
    <div className="text-center py-10 px-5 bg-white border-t border-zinc-100">
      <p className="text-zinc-600 text-sm sm:text-base font-light mb-4 max-w-xl mx-auto">
        Ready to scale without operational friction? Over <strong className="text-zinc-950 font-semibold">140+ brands</strong> rely on our end-to-end Amazon growth engine.
      </p>
      <button
        onClick={scrollToForm}
        className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-[11px] uppercase tracking-widest hover:gap-3 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        Book Your Free 15-Min Meeting <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
