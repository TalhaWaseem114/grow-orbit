import React from "react";
import { Maximize2, Smartphone, Zap, MousePointer2 } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function ImageFramework() {
  const pillars = [
    {
      icon: <Maximize2 size={24} />,
      title: "Hero Render",
      desc: "3D precision visuals that emphasize product texture and build quality. The image that earns the click.",
      tag: "// RENDER_3D"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile First",
      desc: "Optimized for the small screen where 70% of Amazon buyers shop. Every pixel counts on 6 inches.",
      tag: "// VIEWPORT_SM"
    },
    {
      icon: <Zap size={24} />,
      title: "Direct Benefit",
      desc: "Infographics that translate features into immediate emotional benefits. Benefits sell; features don't.",
      tag: "// IMPACT_MAP"
    },
    {
      icon: <MousePointer2 size={24} />,
      title: "Psych Logic",
      desc: "Color theory and composition used to guide the eye toward the CTA. Conversion, engineered visually.",
      tag: "// GAZE_PATH"
    }
  ];

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden text-left">
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-20">
          <SectionLabel>The Visual_Algorithm</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-white">
            Converting at the<br />
            <span className="italic font-serif lowercase tracking-normal text-zinc-600">speed of sight.</span>
          </h2>
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            The first 3 seconds are critical. Our visual systems ensure that your brand conveys trust and authority immediately, reducing bounce rates and increasing add-to-cart velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[40px] overflow-hidden border border-white/5">
          {pillars.map((p, i) => (
            <div key={i} className="group bg-zinc-950 hover:bg-zinc-900 p-10 transition-all duration-500 flex flex-col justify-between min-h-[340px]">
              <div>
                <p className="font-mono text-[9px] text-zinc-700 mb-6 tracking-widest">{p.tag}</p>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-orange-500 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all mb-8">
                  {p.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-orange-500 transition-colors">{p.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{p.desc}</p>
              </div>
              <div className="mt-8 h-px w-8 bg-zinc-800 group-hover:w-full group-hover:bg-orange-500 transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
