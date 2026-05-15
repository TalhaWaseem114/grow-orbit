import React from "react";
import { Search, Camera, Wand2, Rocket } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      icon: <Search size={20} />,
      title: "Brief & Audit",
      desc: "We study your product, competitors, and target demographic to build a visual strategy document.",
      status: "DISCOVERY"
    },
    {
      num: "02",
      icon: <Camera size={20} />,
      title: "Concept & Shoot",
      desc: "3D modeling, studio photography, or AI-assisted generation — whatever delivers the strongest result.",
      status: "PRODUCTION"
    },
    {
      num: "03",
      icon: <Wand2 size={20} />,
      title: "Post-Production",
      desc: "Color correction, infographic layering, and mobile-first optimization for every single frame.",
      status: "REFINEMENT"
    },
    {
      num: "04",
      icon: <Rocket size={20} />,
      title: "Deploy & Test",
      desc: "Live deployment with A/B testing protocols to measure and iterate on image performance metrics.",
      status: "OPTIMIZATION"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20">
          <SectionLabel>Production Pipeline</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
            How we<br />
            <span className="italic font-serif lowercase tracking-normal text-zinc-300">operate.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-zinc-200 z-0" />

          {steps.map((s, i) => (
            <div key={i} className="group relative z-10">
              <div className="bg-[#fafafa] hover:bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 h-full flex flex-col">
                {/* Step number + icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-4xl font-black text-zinc-100 group-hover:text-orange-500/20 transition-colors">{s.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">{s.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed flex-1">{s.desc}</p>

                {/* Status Footer */}
                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between group-hover:border-orange-500/10 transition-colors">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-400">{s.status}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
