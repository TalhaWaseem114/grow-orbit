"use client";

import React, { useState } from "react";
import { Plus, Minus, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What does 'Account Operations' actually mean in practice?",
      a: "It's the complete operational defense of your brand on Amazon. Instead of you worrying about suppressed listings, ASIN hijackers, stranded inventory, or sudden account suspensions, we manage everything behind the scenes so your team can focus on marketing and growth."
    },
    {
      q: "How fast do you respond to policy violations or account issues?",
      a: "Our monitoring systems are live 24/7. When a threat is detected (like an unauthorized seller or a sudden policy flag), our system triggers an immediate protocol. Minor issues are resolved automatically, and our specialist team handles complex mediations within hours, not days."
    },
    {
      q: "Can you guarantee we won't get suspended?",
      a: "Nobody can guarantee absolute immunity from Amazon's automated bots. However, we can guarantee that our infrastructure drastically reduces the likelihood of suspension. If a suspension does occur, we have the direct contacts and exact protocols to get you reinstated quickly."
    },
    {
      q: "Is account health monitoring done by bots or real people?",
      a: "Both. We use sophisticated software to monitor changes in your account health and metrics in real-time. When an anomaly is flagged, our experienced specialists investigate and execute the resolution strategy."
    },
    {
      q: "Do you handle hijackers on our ASINs?",
      a: "Yes. Hijacker neutralization and map violation enforcement are core pillars of our operations framework. We aggressively protect your buy-box share and margins."
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative text-left border-t border-zinc-100">

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT: HEADER AREA */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-6 md:mb-10 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Common <br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Questions.</span>
            </h2>
            <div className="text-sm sm:text-base md:text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-12">
              Get clarity on the operational requirements and expectations of the defense architecture.
            </div>

            {/* Support Status Box */}
            <div className="p-8 bg-white rounded-3xl border border-zinc-100 hidden lg:block">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Support Logic Active</span>
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-orange-500/20 pl-6">
                    "System integrity is the foundation of account operations. If your operations question isn't answered here, our diagnostic team is ready to map out your specific edge cases."
                </div>
            </div>
          </div>

          {/* RIGHT: ACCORDION AREA */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`group border transition-all duration-500 rounded-[20px] md:rounded-[24px] overflow-hidden ${
                  openFaq === i
                  ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                  : "bg-white border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-6 md:px-8 md:py-7 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <span className={`text-[10px] font-mono transition-colors ${openFaq === i ? "text-orange-500" : "text-zinc-300"}`}>
                        0{i + 1}
                    </span>
                    <span className="text-[13px] md:text-[15px] font-bold text-zinc-900 tracking-tight pr-4">{q}</span>
                  </div>

                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openFaq === i ? "bg-orange-500 text-white rotate-180" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: openFaq === i ? "500px" : "0",
                    opacity: openFaq === i ? 1 : 0,
                    overflow: "hidden"
                  }}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 ml-4 md:ml-10">
                    <div className="text-[12px] md:text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/10 pl-6">
                      {a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA BOTTOM TAG */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-6 md:px-8 md:py-6 bg-zinc-900 rounded-[20px] md:rounded-[24px] text-white text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <Terminal size={16} className="text-orange-500" />
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">Query_Resolution_Complete</span>
                </div>
                <Link href="/contact" className="flex items-center justify-center sm:justify-start gap-2 group cursor-pointer no-underline w-full sm:w-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Speak to an Expert</span>
                  <ChevronRight size={14} className="text-orange-500" />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
