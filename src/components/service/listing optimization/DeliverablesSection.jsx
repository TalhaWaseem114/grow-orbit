import React from 'react';
import {
  Search,
  Layers,
  Cpu,
  FileText,
  Link2,
  Image as ImageIcon,
  Box,
  BarChart3,
  Terminal,
  ChevronRight
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

export default function DeliverablesSection() {
  const deliverables = [
    { icon: <Search size={24} />, title: "Advanced Keyword Research", body: "Comprehensive keyword mapping with volume and competition scoring.", id: "01", span: "md:col-span-2" },
    { icon: <Layers size={24} />, title: "Listing Title Optimization", body: "Strategic title architecture balancing keywords and readability.", id: "02", span: "md:col-span-1" },
    { icon: <Cpu size={24} />, title: "Backend Search Terms", body: "Full backend field optimization and indexation error.", id: "03", span: "md:col-span-1" },
    { icon: <FileText size={24} />, title: "Bullet & Description", body: "Benefit-led copy structured around primary keywords.", id: "04", span: "md:col-span-1" },
    { icon: <Link2 size={24} />, title: "Competitor Gap Analysis", body: "Systematic review identifying keyword gaps and opportunities.", id: "05", span: "md:col-span-1" },
    { icon: <ImageIcon size={24} />, title: "Image Strategy", body: "Guidance on compliance, hierarchy, and buyer intent alignment.", id: "06", span: "md:col-span-2" },
    { icon: <Box size={24} />, title: "A+ Content Structure", body: "Module layout and keyword integration recommendations.", id: "07", span: "md:col-span-2" },
    { icon: <BarChart3 size={24} />, title: "SEO Audit Report", body: "Full diagnostic covering indexation gaps and action items.", id: "08", span: "md:col-span-2" }
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] relative overflow-hidden text-left border-t border-slate-100">

      {/* --- EXPANDED GALAXY ORBIT BACKGROUND --- */}
{/* --- SEVEN-LAYER GALAXY ORBIT BACKGROUND (HIGH SPEED) --- */}
<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

  {/* Core Glow (Sun Pulse) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] animate-pulse"></div>

  {/* 0. Hyper Inner Orbit (500px) - FASTEST (8s) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-zinc-100/50 rounded-full animate-[spin_8s_linear_infinite]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-200 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]"></div>
  </div>

  {/* 1. Inner Orbit (800px) - FAST (15s) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-zinc-100 rounded-full animate-[spin_15s_linear_infinite]">
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-zinc-100 rounded-full shadow-sm"></div>
  </div>

  {/* 2. Middle Orbit (1100px) - ACTIVE (25s) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-zinc-50 rounded-full animate-[spin_25s_linear_infinite_reverse]">
      <div className="absolute top-1/2 -right-4 -translate-y-1/2 group">
          <div className="w-8 h-8 bg-orange-50/50 rounded-full flex items-center justify-center border border-orange-100">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
          {/* Moon orbiting the planet - SPEEDED UP (3s) */}
          <div className="absolute inset-0 w-12 h-12 -m-2 border border-zinc-100 rounded-full animate-[spin_3s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-zinc-300 rounded-full"></div>
          </div>
      </div>
  </div>

  {/* 3. Deep Orbit (1500px) - STEADY (40s) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] border border-zinc-50/40 rounded-full animate-[spin_40s_linear_infinite]">
       <div className="absolute bottom-1/3 left-20 w-10 h-10 bg-zinc-50/40 border border-zinc-100/30 rounded-full backdrop-blur-[1px]"></div>
  </div>

  {/* 4. Massive Outer Orbit (2000px) - (60s) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px] border border-zinc-50/20 rounded-full animate-[spin_60s_linear_infinite_reverse]">
       <div className="absolute top-1/4 right-40 w-14 h-14 bg-zinc-50/20 border border-zinc-100/10 rounded-full backdrop-blur-[2px]"></div>
  </div>

  {/* 5. Horizon Orbit (2600px) - (90s) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2600px] h-[2600px] border border-zinc-50/10 rounded-full animate-[spin_90s_linear_infinite]">
       <div className="absolute top-1/2 left-0 w-20 h-20 bg-zinc-50/10 border border-zinc-100/5 rounded-full"></div>
  </div>

  {/* 6. Far-Field Nebula Orbit (3200px) - (150s) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3200px] h-[3200px] border border-zinc-50/5 rounded-full animate-[spin_150s_linear_infinite_reverse]">
       <div className="absolute bottom-1/2 right-1/4 w-32 h-32 bg-zinc-50/3 border border-zinc-100/2 rounded-full blur-sm"></div>
  </div>

  {/* Background Large Text */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
      <div className="text-[250px] lg:text-[400px] font-black tracking-tighter text-slate-100/30 uppercase">
        Orbit
      </div>
  </div>
</div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* HEADER SECTION - TIGHTER MARGIN */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8">
          <div className="relative">
            <LocalSectionLabel>Deliverables</LocalSectionLabel>
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter text-[#111] leading-[0.85] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              What Happens <br />
              <span className="text-zinc-400 italic font-light lowercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>when SEO is done correctly.</span>
            </h2>
          </div>
          <div className="lg:max-w-xs text-right hidden lg:block border-l border-zinc-100 pl-8">
            <div className="text-[10px] font-mono text-zinc-400 leading-relaxed uppercase tracking-widest">
              Ref: ORBIT-SEO-2026<br />
              Protocol: A10-Indexation<br />
              Status: Deployment Ready
            </div>
          </div>
        </div>

        {/* THE COMPACT BLUEPRINT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {deliverables.map((item, i) => (
            <div
              key={i}
              className={`${item.span} group relative bg-white/90 backdrop-blur-sm border border-zinc-100 rounded-[32px] p-6 lg:p-8 transition-all duration-700 hover:bg-zinc-950 overflow-hidden flex flex-col min-h-[240px]`}
            >
              {/* Internal Blueprint Grid on Hover - Subdued */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
                   style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-2xl bg-white border border-zinc-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-300 group-hover:text-orange-500/40 transition-colors uppercase tracking-[0.3em]">
                    Unit_{item.id}
                  </div>
                </div>

                <div className="mt-auto">
                  <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-zinc-900 group-hover:text-white transition-colors mb-2">
                    {item.title}
                  </h4>
                  <div className="text-[13px] text-zinc-500 group-hover:text-zinc-400 font-light leading-snug mb-4 transition-colors">
                    {item.body}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-px w-0 bg-orange-500 group-hover:w-8 transition-all duration-700 delay-100"></div>
                    <div className="text-[9px] font-mono text-zinc-400 group-hover:text-zinc-500 uppercase opacity-0 group-hover:opacity-100 transition-all">
                      Verified_Output
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-zinc-400">
                <Terminal size={14} />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">System_Validated: {deliverables.length} Units Ready</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">A10 Framework Architecture</span>
                <ChevronRight size={12} className="text-orange-500" />
            </div>
        </div>

      </div>
    </section>
  );
}
