import React from "react";
import {
  ClipboardCheck,
  BarChart4,
  Target,
  PieChart,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Zap,
  SearchCode,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  Activity,
  Search,
  Layers,
  Database,
  DollarSign,
  ArrowUpRight,
  Calendar,
  Layout,
  ChevronRight,
  MapIcon,
} from "lucide-react";

export default function Methology() {
  return (
    <section className="py-32 bg-white px-6 relative overflow-hidden">
      {/* Subtle Background Pattern */}

      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: The Narrative */}
          <div className="relative">
            <div className="absolute -top-16 -left-10 text-[260px] font-black text-orange-500 opacity-[0.03] select-none leading-none">
              01
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-10 bg-orange-500"></div>
                <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px]">
                  Methodology Phase
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.95] text-[#1D1D1F]">
                We don't just <span className="text-zinc-300">"Optimize."</span>{" "}
                <br />
                We{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-orange-500 italic">
                    Deconstruct.
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-orange-200 z-0"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                </span>
              </h2>

              <div className="text-orange-500 font-semibold tracking-wider uppercase text-sm mb-8 -mt-2 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-orange-500"></span>
                $4.2K avg waste found
              </div>

              <p className="text-gray-500 text-lg leading-relaxed mb-12 font-light max-w-xl">
                A standard agency audit is a superficial scan. An{" "}
                <span className="text-black font-semibold underline underline-offset-8 decoration-orange-500/20">
                  Orbit Diagnostic
                </span>{" "}
                is a 72-hour autopsy of your account's logic.
              </p>

              <div className="space-y-10">
                {[
                  {
                    icon: <Search size={20} />,
                    title: "Search Intent Mapping",
                    desc: "Isolating 'High-Intent' clusters from 'General Awareness' traffic.",
                  },
                  {
                    icon: <Layers size={20} />,
                    title: "Listing Architecture",
                    desc: "Resolving backend canonical errors and A9 indexing conflicts.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-orange-500 transition-all duration-500 shadow-xl shadow-black/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl mb-1 tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-base font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The Stats Grid (Bento Style) */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Waste Recovery",
                val: "22.4%",
                desc: "Identifying and reallocating non-performing spend from bleed-keywords.",
                subStat: "Avg. $4.2k Salvaged",
                protocol: "PPC-01",
                color: "bg-black text-white shadow-2xl shadow-black/20",
              },
              {
                label: "Organic Lift",
                val: "14 Days",
                desc: "Mean timeframe to witness structural ranking index improvements.",
                subStat: "A9 Index Reset",
                protocol: "SEO-04",
                color:
                  "bg-orange-500 text-white shadow-2xl shadow-orange-500/20",
              },
              {
                label: "Data Depth",
                val: "5k+",
                desc: "Individual metadata points scrutinized per unique diagnostic cycle.",
                subStat: "ML Pattern Scan",
                protocol: "DATA-09",
                color:
                  "bg-gray-50 text-black border border-gray-100 shadow-xl shadow-gray-200/50",
              },
              {
                label: "Net Profit",
                val: "+12.5%",
                desc: "Typical increase in contribution margin after strategy deployment.",
                subStat: "Post-Audit Yield",
                protocol: "FIN-02",
                color:
                  "bg-gray-100 text-black border border-black/5 shadow-xl shadow-gray-200/50",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-8 rounded-[40px] flex flex-col justify-between min-h-[280px] hover:-translate-y-2 transition-all duration-500 group ${stat.color} ${i === 1 ? "mt-8" : ""} ${i === 2 ? "-mt-8" : ""}`}
              >
                {/* Top Section: Protocol & Value */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[8px] font-mono tracking-[0.2em] opacity-50 px-2 py-1 border border-current rounded-md uppercase">
                      {stat.protocol}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
                      Active
                    </span>
                  </div>

                  <p className="font-bold text-5xl mb-1 tracking-tighter">
                    {stat.val}
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>
                </div>

                {/* Bottom Section: Detailed Description & Sub-Stat */}
                <div className="mt-6">
                  <p className="text-[12px] leading-relaxed opacity-70 mb-4 font-light">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
