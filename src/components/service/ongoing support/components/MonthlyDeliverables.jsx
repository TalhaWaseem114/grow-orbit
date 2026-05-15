import React from "react";
import { Search, Zap, Fingerprint, MessageSquare, BarChart3, Repeat, TrendingUp, Activity, ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function MonthlyDeliverables() {
  const weekly = [
    { icon: <Search size={16} />,        item: "Full KPI performance audit across all ASINs" },
    { icon: <Zap size={16} />,           item: "Listing copy and keyword optimization updates" },
    { icon: <Fingerprint size={16} />,   item: "Competitor pricing and BSR movement analysis" },
    { icon: <MessageSquare size={16} />, item: "Strategy sync via dedicated Slack channel" },
  ];

  const monthly = [
    { icon: <BarChart3 size={16} />,   item: "Executive performance report with trajectory analysis" },
    { icon: <Repeat size={16} />,      item: "Creative iteration — new image or copy A/B test" },
    { icon: <TrendingUp size={16} />,  item: "Keyword expansion and search term refinement" },
    { icon: <Activity size={16} />,    item: "Catalog health review across all live listings" },
    { icon: <ShieldCheck size={16} />, item: "Brand protection sweep — hijackers, unauthorized sellers" },
    { icon: <RefreshCw size={16} />,   item: "PPC bid strategy review and TACoS optimization" },
  ];

  return (
    <section className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Expansive Section Corner Glows: Subtly Reduced */}
      <div className="absolute -bottom-64 -left-64 w-[800px] h-[800px] bg-orange-500/4 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute -top-64 -right-64 w-[600px] h-[600px] bg-orange-500/2 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20">
          <div>
            <SectionLabel>Deliverables_Manifest</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              What your team<br />
              <span className="italic font-light lowercase tracking-normal text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>actually does.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-sm text-sm sm:text-base leading-relaxed pb-2">
            No vague "ongoing management." Here is the exact work executed every week and every month, by your dedicated team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Weekly */}
          <div className="bg-white/3 border border-white/6 rounded-[28px] md:rounded-[40px] p-6 md:p-10 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/8 blur-[100px] rounded-full pointer-events-none group-hover:bg-orange-500/12 transition-colors duration-700" />
            <div className="sm:absolute top-6 right-6 inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full z-10 mb-6 sm:mb-0">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Every Week</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white relative z-10">Weekly Execution</h3>
            <p className="text-zinc-500 text-sm font-light mb-8 relative z-10">Executed every 7 days without exception.</p>
            <div className="space-y-3 relative z-10">
              {weekly.map((w, i) => (
                <div key={i} className="group flex items-center gap-4 bg-white/3 hover:bg-white/6 border border-white/4 hover:border-orange-500/20 rounded-2xl px-4 py-3 md:px-5 md:py-4 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                    {w.icon}
                  </div>
                  <span className="text-sm font-light text-zinc-300 group-hover:text-white transition-colors">{w.item}</span>
                  <CheckCircle2 size={14} className="text-zinc-700 group-hover:text-emerald-400 transition-colors ml-auto shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Monthly */}
          <div className="bg-white/3 border border-white/6 rounded-[28px] md:rounded-[40px] p-6 md:p-10 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/8 transition-colors duration-700" />
            <div className="sm:absolute top-6 right-6 inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full z-10 mb-6 sm:mb-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">Every Month</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white relative z-10">Monthly Deliverables</h3>
            <p className="text-zinc-500 text-sm font-light mb-8 relative z-10">Delivered on a fixed monthly cycle.</p>
            <div className="space-y-3 relative z-10">
              {monthly.map((m, i) => (
                <div key={i} className="group flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-orange-500/20 rounded-2xl px-4 py-3 md:px-5 md:py-4 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                    {m.icon}
                  </div>
                  <span className="text-sm font-light text-zinc-300 group-hover:text-white transition-colors">{m.item}</span>
                  <CheckCircle2 size={14} className="text-zinc-700 group-hover:text-emerald-400 transition-colors ml-auto shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom total */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { v: "4+",   l: "Actions per week" },
            { v: "6+",   l: "Deliverables per month" },
            { v: "100%", l: "Dedicated to your brand" },
          ].map((s, i) => (
            <div key={i} className={`bg-white/[0.03] border border-white/[0.06] rounded-[20px] md:rounded-[24px] p-4 sm:p-6 text-center ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-orange-500 tracking-tighter mb-1 leading-none">{s.v}</p>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
