import React from "react";
import { ImageOff, Smartphone, BarChart3, FlaskConical } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function TheProblem() {
  const problems = [
    {
      num: "01",
      icon: <ImageOff size={20} />,
      title: "Generic Stock Photos",
      desc: "Cookie-cutter images that blend into the search results. Your product deserves a visual identity, not a stock template.",
      stat: "-47%",
      statLabel: "CTR vs. custom"
    },
    {
      num: "02",
      icon: <Smartphone size={20} />,
      title: "No Mobile Optimization",
      desc: "70% of Amazon shoppers browse on mobile. Images not designed for small screens lose the majority of your audience.",
      stat: "70%",
      statLabel: "Mobile shoppers"
    },
    {
      num: "03",
      icon: <BarChart3 size={20} />,
      title: "Missing Infographics",
      desc: "Your images should answer 'why should I buy this?' before the customer ever reads a bullet point.",
      stat: "3s",
      statLabel: "Attention window"
    },
    {
      num: "04",
      icon: <FlaskConical size={20} />,
      title: "Zero A/B Testing",
      desc: "Without systematic image testing, you're guessing which visuals convert. Data should drive every pixel.",
      stat: "0%",
      statLabel: "Data-driven"
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left: Sticky Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>The Visual_Deficit</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
              THE PIXEL <br />
              <span className="italic font-serif lowercase tracking-normal text-zinc-300">problem.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">
              Most brands treat images as an afterthought. In a marketplace where the first click is visual, that's a catastrophic oversight.
            </p>
          </div>

          {/* Right: Problem Cards */}
          <div className="lg:col-span-8 space-y-6">
            {problems.map((p, i) => (
              <div key={i} className="group relative bg-[#fafafa] hover:bg-white rounded-[32px] p-8 border border-zinc-100 hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 overflow-hidden">
                <div
                  className="absolute inset-0 rounded-[32px] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                  }}
                />

                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                  <div className="flex items-center gap-4 md:w-1/2">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                      {p.icon}
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mb-1">DEFECT_{p.num}</p>
                      <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 group-hover:text-orange-600 transition-colors">{p.title}</h3>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex items-center gap-8">
                    <p className="text-zinc-500 text-sm font-light leading-relaxed flex-1">{p.desc}</p>
                    <div className="text-right shrink-0">
                      <p className="text-3xl font-black text-zinc-900 tracking-tighter">{p.stat}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{p.statLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
