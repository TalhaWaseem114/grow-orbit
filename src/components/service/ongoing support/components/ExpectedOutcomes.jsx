import React, { useEffect, useRef } from "react";
import { TrendingUp, ShieldCheck, Fingerprint } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function ExpectedOutcomes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".outcome-hero-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: ".outcome-hero-card", start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "+18%", sub: "CVR",   label: "Conversion Rate Uplift",  desc: "Persistent optimization of listing creative, copy, and pricing drives measurable conversion gains within the first 60 days.",     icon: <TrendingUp size={20} /> },
    { value: "100%", sub: "SHIELD",label: "Brand Protection Score",  desc: "Continuous monitoring against hijackers, unauthorized sellers, and counterfeit activity — zero tolerance for brand erosion.",       icon: <ShieldCheck size={20} /> },
    { value: "24/7", sub: "INTEL", label: "Market Surveillance",     desc: "Our systems track competitor pricing, BSR shifts, review velocity, and ad patterns in real-time — perpetual intelligence advantage.", icon: <Fingerprint size={20} /> },
  ];

  const secondRow = [
    { value: "Weekly", sub: "SPRINT", label: "Optimization Cadence",   desc: "Every 7 days, your dedicated team executes a full audit-execute-test-sync cycle, ensuring your listings are continuously refined." },
    { value: "99.9%",  sub: "UPTIME", label: "Operational Continuity", desc: "Near-perfect operational uptime. Your brand's growth engine never sleeps, never pauses, never leaves gaps for competitors to exploit." },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20 text-left">
          <div className="max-w-2xl">
            <SectionLabel>Expected Outcomes</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] text-zinc-900">
              Measurable<br />
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>dominance.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-sm pb-2">
            Our support model doesn't promise vague improvements. Every metric is trackable, every outcome is quantified, every result is yours to audit.
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {stats.map((s, i) => (
            <div key={i} className="outcome-hero-card group relative bg-zinc-950 rounded-[28px] md:rounded-[40px] p-8 md:p-10 overflow-hidden text-white transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-orange-500/5 blur-[80px] group-hover:bg-orange-500/15 transition-all duration-700 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500">
                    {s.icon}
                  </div>
                  <span className="text-[8px] font-mono font-black tracking-[0.3em] text-zinc-700 uppercase">{s.sub}</span>
                </div>
                <div className="mb-4 md:mb-6">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-none">{s.value}</span>
                </div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-orange-400 mb-3">{s.label}</h3>
                <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {secondRow.map((s, i) => (
            <div key={i} className="outcome-hero-card group relative bg-[#fafafa] rounded-[28px] md:rounded-[40px] p-8 md:p-10 overflow-hidden border border-zinc-100 shadow-[0_10px_20px_rgba(0,0,0,0.06)] hover:border-orange-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/5">
              <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="shrink-0">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-zinc-900 leading-none group-hover:text-orange-500 transition-colors">{s.value}</span>
                  <p className="text-[8px] font-mono font-black tracking-[0.3em] text-orange-500 uppercase mt-2">{s.sub}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">{s.label}</h3>
                  <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Managed vs Unmanaged Comparison */}
        <div className="mt-20 md:mt-32">
           <div className="text-center mb-12">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">The Impact of Inertia</span>
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
                After 8 Months <br className="sm:hidden" /> Without Management
              </h3>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200 rounded-[32px] md:rounded-[40px] overflow-hidden border border-zinc-200 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)]">
              {/* Unmanaged */}
              <div className="bg-white p-8 md:p-14">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Unmanaged Account</span>
                 </div>
                 <div className="space-y-8">
                    {[
                      { l: "Organic Ranking", v: "-42%", d: "Slow erosion as competitors iterate faster." },
                      { l: "Listing Health",  v: "Risky", d: "Suppressions and warnings go unnoticed." },
                      { l: "Market Share",   v: "Down",  d: "Ad efficiency drops; TACoS increases." }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-zinc-100 pb-6 last:border-0 last:pb-0">
                         <div>
                            <p className="text-xs font-black uppercase tracking-tight text-zinc-900 mb-1">{row.l}</p>
                            <p className="text-[11px] text-zinc-500 font-light max-w-[200px]">{row.d}</p>
                         </div>
                         <span className="text-2xl font-black text-red-500 tracking-tighter">{row.v}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Managed by Grow Orbit */}
              <div className="bg-zinc-950 p-8 md:p-14 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
                 <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Orbit Managed</span>
                 </div>
                 <div className="space-y-8 relative z-10">
                    {[
                      { l: "Organic Ranking", v: "+68%", d: "Consistent top-3 placement for core terms." },
                      { l: "Listing Health",  v: "Elite", d: "Zero suppressions; proactive ToS compliance." },
                      { l: "Market Share",   v: "Up",    d: "Dominance through iterative bid logic." }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
                         <div>
                            <p className="text-xs font-black uppercase tracking-tight text-white mb-1">{row.l}</p>
                            <p className="text-[11px] text-zinc-500 font-light max-w-[200px]">{row.d}</p>
                         </div>
                         <span className="text-2xl font-black text-emerald-500 tracking-tighter">{row.v}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
