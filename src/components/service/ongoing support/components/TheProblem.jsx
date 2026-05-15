import React from "react";
import { TrendingDown, EyeOff, ShieldAlert, Users } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function TheProblem() {
  const risks = [
    { icon: <TrendingDown size={20} />, title: "Ranking Decay",      stat: "-34%",  desc: "Average organic visibility loss within 90 days for brands that pause active optimization.", color: "text-red-500" },
    { icon: <EyeOff size={20} />,      title: "Competitor Takeover", stat: "2.4x",  desc: "Competitors bid on your branded terms the moment you stop defending them actively.", color: "text-amber-500" },
    { icon: <ShieldAlert size={20} />, title: "Listing Regression",  stat: "67%",   desc: "Of listings see conversion drops within 6 weeks without active split-testing and iteration.", color: "text-orange-500" },
    { icon: <Users size={20} />,       title: "Market Share Bleed",  stat: "5–8%",  desc: "Monthly market share erosion rate for category leaders who shift to maintenance mode.", color: "text-rose-500" },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-orange-50/60 via-orange-50/30 to-white relative text-left border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">

          {/* Left: sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The_Diagnostic</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 text-zinc-900">
              What happens<br />when you<br />
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>stop.</span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8">
              Amazon rewards velocity. The moment you pause optimization, the algorithm begins to deprioritize your brand. Here's the data.
            </p>
            <div className="inline-flex items-center gap-2.5 bg-orange-500 text-white px-5 py-2.5 rounded-full">
              <TrendingDown size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Risk Indicators Active</span>
            </div>
          </div>

          {/* Right: risk cards */}
          <div className="lg:col-span-7 space-y-4 md:space-y-5">
            {risks.map((r, i) => (
              <div key={i} className="group relative bg-white rounded-[20px] md:rounded-[32px] p-6 md:p-10 border border-zinc-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-orange-500 shrink-0 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/10 transition-all">{r.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2 md:mb-3 gap-4">
                      <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-zinc-900 group-hover:text-orange-500 transition-colors leading-tight">{r.title}</h3>
                      <span className={`text-2xl md:text-3xl font-black tracking-tighter ${r.color}`}>{r.stat}</span>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">{r.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/30 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
