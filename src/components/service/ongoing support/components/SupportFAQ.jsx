import React, { useState } from "react";
import Link from "next/link";
import { Terminal, ChevronRight, Plus, Minus } from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

export default function SupportFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "How often do you perform account audits?",          a: "We conduct deep-dive audits every 7 days. These aren't automated reports — our strategists manually review your KPIs, competitor moves, and algorithm signals to identify micro-opportunities for growth." },
    { q: "What kind of access do we have to your team?",      a: "Every brand under our support model gets a dedicated Slack channel with direct access to our lead strategists. We believe in high-bandwidth communication to ensure perfect vision alignment." },
    { q: "How fast can you implement listing optimizations?", a: "Small optimizations (copy, bidding, price) are typically executed within 24 hours of approval. Larger creative sprints are scheduled into our weekly optimization cycles for rapid deployment." },
    { q: "Do you handle A/B testing of images and copy?",     a: "Yes. Continuous split testing is a core pillar of our support model. We use data to validate every creative and structural change we make to your listings before full deployment." },
    { q: "What metrics do you track and report on?",          a: "We track everything — organic rank, BSR, conversion rate, sessions, PPC ACoS/TACoS, review velocity, share of voice, and custom KPIs specific to your brand goals. Reports are delivered weekly." },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] text-left border-t border-zinc-100">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-10 text-zinc-900">
              Common<br />
              <span className="text-zinc-300 italic font-serif lowercase tracking-normal">questions.</span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8 md:mb-12">
              Iterative growth is a marathon, not a sprint. Here are the most frequent questions we receive about our support model.
            </p>
            <div className="p-6 bg-white rounded-3xl border border-zinc-100 hidden lg:block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Growth Loop Active</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed italic">
                "Continuous optimization is the only strategy that compounds. If your question isn't answered here, our growth team is ready to talk."
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`border transition-all duration-500 rounded-[20px] md:rounded-[24px] overflow-hidden ${
                  openIndex === i
                    ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white/50 border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button className="w-full flex items-center justify-between px-6 md:px-8 py-5 md:py-7 text-left" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <div className="flex items-center gap-4 md:gap-5">
                    <span className={`text-[10px] font-mono transition-colors ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>0{i + 1}</span>
                    <span className="text-[13px] md:text-[15px] font-bold text-zinc-900 tracking-tight pr-4">{q}</span>
                  </div>
                  <div className={`shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: openIndex === i ? "400px" : "0px", opacity: openIndex === i ? 1 : 0 }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 sm:ml-10">
                    <div className="text-[12px] md:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/20 pl-5 md:pl-6">{a}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 md:px-8 py-6 bg-zinc-900 rounded-[20px] md:rounded-[24px] text-white text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">Query_Resolution_Complete</span>
              </div>
              <Link href="/contact" className="flex items-center justify-center sm:justify-start gap-2 group cursor-pointer no-underline w-full sm:w-auto">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Speak to a Strategist</span>
                <ChevronRight size={14} className="text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
