import React from "react";
import { Camera, Layers, Image, BarChart3, BookOpen, Sparkles } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function ImageDeliverables() {
  const deliverables = [
    {
      icon: <Camera size={20} />,
      title: "Main Hero Image",
      desc: "3D-rendered or studio-quality hero shot optimized for search result thumbnails. The first impression that earns the click.",
      tag: "SYS_TYPE: HERO_RENDER"
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Infographic Sequence",
      desc: "Data-driven visual slides that communicate key benefits, specs, and differentiators at a glance.",
      tag: "SYS_TYPE: INFO_VISUAL"
    },
    {
      icon: <Image size={20} />,
      title: "Lifestyle Photography",
      desc: "Contextual imagery showing the product in real-world use — building emotional connection and trust.",
      tag: "SYS_TYPE: LIFESTYLE"
    },
    {
      icon: <Layers size={20} />,
      title: "Comparison Graphics",
      desc: "Side-by-side visuals that position your product against alternatives, highlighting competitive advantages.",
      tag: "SYS_TYPE: COMPARISON"
    },
    {
      icon: <BookOpen size={20} />,
      title: "A+ Content Modules",
      desc: "Premium below-the-fold content that deepens the brand narrative and reduces return rates.",
      tag: "SYS_TYPE: A_PLUS"
    },
    {
      icon: <Sparkles size={20} />,
      title: "Brand Story Visuals",
      desc: "Cohesive visual identity assets that establish brand authority across your entire Amazon catalog.",
      tag: "SYS_TYPE: BRAND_STORY"
    }
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden text-left">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-20">
          <SectionLabel>Deliverables</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
            What you<br />
            <span className="italic font-serif lowercase tracking-normal text-zinc-300">receive.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <div key={i} className="group bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 overflow-hidden relative">
              <div
                className="absolute inset-0 rounded-[32px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                    {d.icon}
                  </div>
                  <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">{d.tag}</span>
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">{d.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
