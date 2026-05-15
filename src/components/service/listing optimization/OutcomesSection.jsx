import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  MousePointerClick,
  MinusCircle,
  Binary,
  UserCheck,
  Activity,
  ArrowUpRight
} from 'lucide-react';

const LocalSectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6 font-mono">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.4em] block">
      {children}
    </span>
  </div>
);

export default function OutcomesSection() {
  const outcomes = [
    { metric: "Organic Rank", icon: <TrendingUp size={16} />, desc: "Movement into page-1 keyword positions.", status: "+84%" },
    { metric: "Conversion Rate", icon: <MousePointerClick size={16} />, desc: "Higher listing conversion from aligned copy.", status: "Optimized" },
    { metric: "Ad Dependency", icon: <MinusCircle size={16} />, desc: "Reduced reliance on paid spend.", status: "-22%" },
    { metric: "Keyword Coverage", icon: <Binary size={16} />, desc: "Broader indexation across head and long-tail terms.", status: "Expanded" },
    { metric: "Traffic Quality", icon: <UserCheck size={16} />, desc: "More qualified impressions from matched intent.", status: "High" },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden text-left border-t border-slate-100">



{/* ------------------background grid  */}
<div className="absolute inset-0 z-0 pointer-events-none">
  {/* The Grid Layer */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `radial-gradient(#cbd5e1 1.5px, transparent 1.5px)`,
      backgroundSize: '32px 32px',
      /* This mask makes the dots 100% visible in the center
         and fades them out to 0% at the edges.
      */
      maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
    }}
  ></div>

  {/* The Contrast Softener (Gradient Overlay) */}
  <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white opacity-100"></div>
</div>






      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* HEADER SECTION */}
        <div className="max-w-3xl mb-16">
          <LocalSectionLabel>Outcomes</LocalSectionLabel>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter text-[#111] leading-tight">
            What well-executed <br />
            <span className="text-zinc-400 italic font-serif">SEO changes.</span>
          </h2>
        </div>

        {/* OUTCOMES STRIP - 5 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {outcomes.map((item, i) => (
            <div
              key={i}
              className="group p-8 border border-zinc-200 rounded-[32px] bg-white/80 backdrop-blur-sm hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
            >
              {/* Card Internal Accents */}
              <div className="flex justify-between items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 transition-colors duration-500">
                  {item.icon}
                </div>
                <div className="text-[10px] font-mono text-orange-500 font-bold tracking-tighter uppercase transition-colors">
                    {item.status}
                </div>
              </div>

              <div className="grow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                  <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">{item.metric}</h3>
                </div>

                <div className="text-[13px] text-zinc-500 leading-relaxed font-light">
                  {item.desc}
                </div>
              </div>

              {/* Hover Graphic */}
              <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={80} strokeWidth={1} />
              </div>
            </div>
          ))}
        </div>

        {/* SECTION FOOTER */}
        <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6 relative">
            <div className="text-[9px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] md:tracking-[0.5em] text-center md:text-left">
                Metric_Standardization_Complete
            </div>
            <Link href="/contact" className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors group no-underline">
                <span className="text-[11px] font-black uppercase tracking-widest text-center">Protocol Success</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
        </div>

      </div>
    </section>
  );
}
