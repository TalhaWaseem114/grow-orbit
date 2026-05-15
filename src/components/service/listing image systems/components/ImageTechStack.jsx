import React from "react";
import { CheckCircle2, Palette, Box, Figma, Aperture, Sparkles, Brush } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-px bg-orange-500 self-center"></div>
    </div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function ImageTechStack() {
  const items = [
    { label: "Adobe Photoshop & Illustrator", icon: <Palette size={18} /> },
    { label: "Blender 3D / Cinema 4D", icon: <Box size={18} /> },
    { label: "Figma Design Systems", icon: <Figma size={18} /> },
    { label: "KeyShot Rendering", icon: <Aperture size={18} /> },
    { label: "Midjourney AI Concepts", icon: <Sparkles size={18} /> },
    { label: "Procreate & Affinity", icon: <Brush size={18} /> },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Left: Terminal Widget */}
          <div className="relative">
            <div className="relative z-10 rounded-[48px] overflow-hidden border border-zinc-900/10 shadow-2xl bg-zinc-950">
              {/* Window bar */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Render Pipeline · Live</span>
                </div>
              </div>

              {/* Pipeline rows */}
              <div className="p-8 space-y-3">
                {[
                  { label: "Hero — 3D product render", status: "Complete", time: "Shipped" },
                  { label: "Infographic — Benefit mapping", status: "Running", time: "Now" },
                  { label: "Lifestyle — Scene composition", status: "Complete", time: "2h ago" },
                  { label: "A+ Content — Module layout", status: "Complete", time: "Approved" },
                  { label: "Brand Story — Visual identity", status: "Queued", time: "Next" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                    <CheckCircle2 size={15} className={row.status === "Running" ? "text-orange-400" : row.status === "Queued" ? "text-zinc-600" : "text-emerald-400"} />
                    <div className="flex-1">
                      <p className="text-white/70 text-xs font-medium">{row.label}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[10px] font-bold ${row.status === "Running" ? "text-orange-400" : row.status === "Queued" ? "text-zinc-600" : "text-emerald-400"}`}>{row.status}</p>
                      <p className="text-[9px] text-white/25">{row.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-8 pb-8">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-6 py-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">Pipeline Integrity</span>
                  <span className="text-white font-black text-lg">100%</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500/15 blur-3xl rounded-full pointer-events-none"></div>
          </div>

          {/* Right: Copy + Tech Cards */}
          <div className="space-y-8">
            <SectionLabel>The Creative Stack</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] text-zinc-900">
              Built with<br />
              <span className="italic font-serif lowercase tracking-normal text-zinc-300">precision tools.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">
              We leverage industry-leading creative software and AI-assisted workflows to deliver
              studio-quality assets at production speed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((item, i) => (
                <div key={i} className="group flex items-center gap-4 bg-[#fafafa] hover:bg-white border border-zinc-100 hover:border-orange-500/20 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wide text-zinc-900">{item.label}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <CheckCircle2 size={10} className="text-emerald-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Active Deployment</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
