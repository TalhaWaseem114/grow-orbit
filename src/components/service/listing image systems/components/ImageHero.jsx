import React from "react";
import { Camera, Layers, Paintbrush, ArrowRight, Box } from "lucide-react";

export default function ImageHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#fafafa] text-black border-b border-black/5">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/5 backdrop-blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-orange-500"></div>
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-orange-600/80">
                  Visual Engineering
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.82] mb-10 text-zinc-900 uppercase">
                Listing Image <br />
                <span className="italic font-serif lowercase tracking-normal text-zinc-300">systems.</span>
              </h1>

              <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-xl">
                Pixels that persuade. We engineer visual sales sequences that answer customer objections before they even read your bullet points.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-white rounded-full border border-zinc-100 shadow-sm font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 hover:border-orange-500/20 transition-colors">
                <Camera size={16} className="text-orange-500" />
                Hero Renders
              </div>
              <div className="px-6 py-3 bg-white rounded-full border border-zinc-100 shadow-sm font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 hover:border-orange-500/20 transition-colors">
                <Layers size={16} className="text-indigo-500" />
                Infographics
              </div>
              <div className="px-6 py-3 bg-white rounded-full border border-zinc-100 shadow-sm font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 hover:border-orange-500/20 transition-colors">
                <Paintbrush size={16} className="text-emerald-500" />
                Lifestyle
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <button className="group relative bg-zinc-900 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:pr-14 hover:bg-orange-600 active:scale-95 w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  Start Your Visual Audit
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-100" />
                  ))}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span className="text-zinc-900">7-Image</span> Sequences
                </div>
              </div>
            </div>
          </div>

          {/* Right: Gallery Widget */}
          <div className="lg:col-span-5 w-full relative">
            <div className="bg-white rounded-[60px] border border-zinc-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)] p-10 flex flex-col gap-6 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Gallery Grid Preview */}
              <div className="grid grid-cols-3 gap-3 relative z-10">
                {["Hero", "Info", "Life", "Scale", "Detail", "A+"].map((label, i) => (
                  <div key={i} className={`aspect-square rounded-2xl border border-zinc-100 flex items-center justify-center transition-all duration-500 ${i === 0 ? 'bg-orange-50 border-orange-100' : 'bg-zinc-50 hover:bg-orange-50 hover:border-orange-100'}`}>
                    <div className="text-center">
                      <Box size={20} className={`mx-auto mb-1 ${i === 0 ? 'text-orange-500' : 'text-zinc-300'}`} />
                      <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 relative z-10">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">CVR Impact</p>
                  <p className="text-4xl font-black text-zinc-900 tracking-tighter leading-none mt-1">+32%</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Sequence</p>
                  <p className="text-4xl font-black text-orange-600 tracking-tighter leading-none mt-1">7</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white px-6 py-3 rounded-tr-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl z-20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Render Pipeline: Active
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
