"use client";

import { Search, Layout, Activity } from "lucide-react";

export default function DiagnosesSection() {
  return (
    <section className="py-20 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Large Background Watermark */}
          <div
            className="absolute
              top-[30px] right-0 rotate-90 origin-center translate-x-[40%]
              sm:top-[20px] sm:left-0 sm:right-auto sm:rotate-0 sm:origin-center sm:-translate-y-[70%] sm:translate-x-0
              font-black text-[45px] sm:text-[80px] md:text-[140px] uppercase tracking-tighter opacity-[0.09] pointer-events-none select-none whitespace-nowrap"
            style={{
              fontFamily: "Arial, sans-serif",
              WebkitTextStroke: "1.5px #fff",
              color: "transparent"
            }}
          >
            DIAGNOSES
          </div>

          <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600 mb-12">
            Where most Amazon sellers get stuck — and how we solve it
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-[40px] overflow-hidden">
          {[
            {
              num: "01",
              tag: "PRODUCT_FIT",
              icon: <Search size={22} />,
              title: "You risk launching the wrong product — and burning months of budget.",
              body: "Most sellers skip validation and launch blind. We use real demand data, competitor gaps, and margin analysis to find products that are built to win — before you spend a dollar on inventory.",
              metric: "VALIDATION: REQUIRED"
            },
            {
              num: "02",
              tag: "LAUNCH_GAP",
              icon: <Layout size={22} />,
              title: "A weak launch means your product dies on page 5 — permanently.",
              body: "Images, A+ content, keyword strategy, and brand store need to work together from day one. Miss this, and Amazon's algorithm buries your listing before it ever gets a chance.",
              metric: "LAUNCH_READY: FALSE"
            },
            {
              num: "03",
              tag: "SCALE_BLOCK",
              icon: <Activity size={22} />,
              title: "You're stuck at the same revenue — watching competitors scale past you.",
              body: "Without a unified system connecting PPC, creative, inventory, and organic ranking, growth flatlines. Every month you wait is revenue left on the table for someone else.",
              metric: "GROWTH_CAP: DETECTED"
            },
          ].map((d, i) => (
            <div
              key={i}
              className="group relative p-6 sm:p-10 bg-[#111114] transition-all duration-700 hover:bg-orange-500 overflow-hidden"
            >
              {/* Hover Shimmer/Dots */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              ></div>

              {/* Inner Border Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"></div>

              {/* Background Digit */}
              <span className="absolute top-6 right-8 text-white/5 font-black text-6xl group-hover:text-white/10 transition-colors select-none z-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {d.num}
              </span>

              {/* Card Content */}
              <div className="relative z-20 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                  <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-zinc-500 group-hover:text-white/70 border border-zinc-800 group-hover:border-white/30 px-2.5 py-1 rounded-full bg-zinc-950/30 group-hover:bg-transparent transition-all duration-500">
                    {d.tag}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-orange-500 group-hover:bg-white animate-pulse" />
                </div>

                <div className="text-orange-500 group-hover:text-white transition-colors mb-6 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:drop-shadow-none">
                  {d.icon}
                </div>

                <h3 className="font-black text-xl uppercase tracking-tighter text-white mb-4 leading-tight group-hover:text-white transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {d.title}
                </h3>

                <p className="text-zinc-500 group-hover:text-white/80 text-sm font-light leading-relaxed mb-10 flex-1 transition-colors">
                  {d.body}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-6 group-hover:border-white/20">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500 group-hover:text-white font-mono transition-colors">
                    {d.metric}
                  </span>
                  <span className="font-mono text-[7px] text-zinc-800 group-hover:text-white/40 tracking-[0.3em] uppercase transition-colors">
                    System_Analyzed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
