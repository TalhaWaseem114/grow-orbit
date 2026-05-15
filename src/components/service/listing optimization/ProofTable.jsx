import React from 'react';
import { TrendingUp, ArrowUpRight, ShieldCheck, Terminal } from 'lucide-react';

const SectionLabel = ({ children }) => (
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

export default function ProofTable() {
  const data = [
    { keyword: "Organic Coffee Pods", before: "#68", after: "#4", days: "14 Days", lift: "+94%" },
    { keyword: "Ergonomic Desk Chair", before: "#112", after: "#9", days: "22 Days", lift: "+92%" },
    { keyword: "Vegan Protein Powder", before: "#45", after: "#2", days: "11 Days", lift: "+95%" },
    { keyword: "Wireless Sleep Headphones", before: "#89", after: "#7", days: "18 Days", lift: "+92%" },
    { keyword: "Bamboo Kitchen Set", before: "#56", after: "#3", days: "9 Days", lift: "+94%" },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel>Empirical Proof</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Keyword <br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Position Delta.</span>
            </h2>
          </div>
          <p className="text-zinc-500 font-light text-lg max-w-sm leading-relaxed pb-2">
            Real-world performance data from recent optimization sprints. We don't just target volume—we target dominance.
          </p>
        </div>

        <div className="bg-[#fafafa] rounded-[40px] border border-zinc-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="px-8 py-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Keyword Targeted</th>
                  <th className="px-8 py-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Initial Rank</th>
                  <th className="px-8 py-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-orange-500">Optimized Rank</th>
                  <th className="px-8 py-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Time Taken</th>
                  <th className="px-8 py-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-right">Visibility Lift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.map((row, i) => (
                  <tr key={i} className="group hover:bg-white transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm font-bold text-zinc-900 uppercase tracking-tight">{row.keyword}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-light text-zinc-400">{row.before}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-orange-500 tracking-tighter">{row.after}</span>
                        <ArrowUpRight size={14} className="text-orange-500" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Terminal size={12} className="text-zinc-300" />
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">{row.days}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="inline-flex items-center gap-2 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                        <TrendingUp size={12} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-600">{row.lift}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 bg-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-orange-500" size={20} />
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Protocol: verified_rank_velocity_v3.2</p>
            </div>
            <div className="h-px flex-1 bg-zinc-800 hidden sm:block mx-8" />
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest italic">A10 Algorithm Compliant Results</p>
          </div>
        </div>

      </div>
    </section>
  );
}
