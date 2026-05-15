export default function BrandStrip() {
  return (
    <section className="bg-gradient-to-r from-orange-600 to-orange-400 py-10 sm:py-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8 px-6 lg:px-12">
          <div className="w-8 h-px bg-white/20 hidden sm:block" />
          <p className="text-center text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white">
            Trusted Across 7 Core Categories
          </p>
          <div className="w-8 h-px bg-white/20 hidden sm:block" />
        </div>

        {/* Horizontal scroll on all devices */}
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar pb-2 sm:pb-0 px-6 lg:px-12 snap-x snap-mandatory">
          <div className="flex items-center gap-3 sm:gap-6 mx-auto">
          {[
            "Supplements & Health",
            "Home & Kitchen",
            "Pet Supplies",
            "Beauty & Skincare",
            "Consumer Tech",
            "Sports & Outdoors",
            "Apparel & Fashion"
          ].map((cat, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-full border border-white/30 bg-white/10 hover:bg-white hover:border-white transition-all duration-500 cursor-default overflow-hidden shrink-0 snap-center sm:snap-align-none"
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              <span className="relative z-10 text-[9px] sm:text-[11px] font-bold leading-none uppercase tracking-[0.2em] whitespace-nowrap text-white group-hover:text-orange-500 transition-colors">
                {cat}
              </span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
