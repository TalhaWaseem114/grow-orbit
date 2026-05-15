import React, { useEffect, useRef } from "react";
import { TrendingUp, ShieldCheck, Eye, Timer, BarChart3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-600"></div>
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-600/80">
      {children}
    </span>
  </div>
);

export default function ExpectedOutcomes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".outcome-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".outcome-card", start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const outcomes = [
    {
      icon: <TrendingUp size={16} />,
      metric: "+28%",
      label: "CTR Enhancement",
      title: "Click Magnetism",
      desc: "Search result thumbnails engineered for maximum visual differentiation in a sea of competitors."
    },
    {
      icon: <Eye size={16} />,
      metric: "+32%",
      label: "CVR Lift",
      title: "Conversion Architecture",
      desc: "Image sequences strategically ordered to build trust, demonstrate value, and trigger the purchase."
    },
    {
      icon: <ShieldCheck size={16} />,
      metric: "-40%",
      label: "Bounce reduction",
      title: "Retention Engineering",
      desc: "Visuals that hold attention past the 3-second threshold, keeping shoppers engaged through the gallery."
    },
    {
      icon: <Timer size={16} />,
      metric: "+45s",
      label: "Session duration",
      title: "Dwell Time Boost",
      desc: "Rich imagery that makes shoppers spend more time exploring your product details and features.",
      wide: true
    },
    {
      icon: <BarChart3 size={16} />,
      metric: "Premium",
      label: "Market position",
      title: "Price Authority",
      desc: "Studio-quality visuals that justify premium pricing and position your product as the category leader.",
      wide: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-[#fafafa] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-24">
          <SectionLabel>Expected Outcomes</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.88] mb-8 text-zinc-900">
            What visuals<br />
            <span className="italic font-serif lowercase tracking-normal text-zinc-300">deliver.</span>
          </h2>
          <p className="text-zinc-500 text-lg font-light leading-relaxed">
            Professional imagery isn't an expense — it's a revenue multiplier. Every pixel we engineer is designed to compound your conversion rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className={`outcome-card group relative bg-white rounded-[32px] p-8 border ${o.wide ? 'border-orange-500/20 shadow-xl shadow-zinc-200/50' : 'border-zinc-100'} hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 overflow-hidden flex flex-col ${o.wide ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <div
                className={`absolute inset-0 rounded-[32px] ${o.wide ? 'opacity-[0.06]' : 'opacity-[0.03]'} group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`}
                style={{
                  backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="text-orange-600">{o.icon}</div>
                <div className="text-right">
                  <p className="text-3xl font-black text-zinc-900 tracking-tighter leading-none">{o.metric}</p>
                  <p className="font-mono text-[8px] font-bold tracking-[0.2em] text-zinc-400 uppercase mt-2">{o.label}</p>
                </div>
              </div>

              <div className={`relative z-10 mt-auto pt-8 border-t ${o.wide ? 'border-orange-500/10' : 'border-zinc-100'} group-hover:border-orange-500/10 transition-colors`}>
                <h3 className={`font-black text-lg tracking-tight uppercase ${o.wide ? 'text-orange-600' : 'text-zinc-900'} group-hover:text-orange-600 transition-colors mb-2 text-left`}>{o.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed text-left">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
