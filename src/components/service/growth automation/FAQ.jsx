"use client";

import React, { useState } from "react";
import { Plus, Minus, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Do I need technical knowledge to use your automation systems?",
      a: "No. We build, deploy, and maintain everything. You receive clean dashboards and reports. The only thing you need to do is make business decisions — we handle the operational engine."
    },
    {
      q: "How long does it take to fully automate my account?",
      a: "Initial deployment takes 2–3 weeks depending on catalogue size and integrations required. Full automation coverage — including edge cases and custom workflows — is typically complete within 45 days."
    },
    {
      q: "What platforms and tools do you integrate with?",
      a: "We work with Seller Central, Vendor Central, Shopify, and most leading SaaS tools including Inventory Planner, Helium 10, DataDive, and proprietary internal systems."
    },
    {
      q: "Will automation work for my brand size?",
      a: "We work with brands from $30K/month to $500K+/month. The architecture scales with you — systems built at $50K/month are the same ones running at $300K/month."
    },
    {
      q: "What makes Grow Orbit different from a standard automation tool?",
      a: "Tools are generic. We build brand-specific systems that account for your catalogue, seasonality, supplier lead times, and growth targets. There is no off-the-shelf solution for a 7-figure brand's operational complexity."
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] relative text-left border-t border-zinc-100">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>FAQ_Protocol</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Common <br />
              <span className="text-zinc-300 italic font-light lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Questions.</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-8 md:mb-12">
              Get clarity on the technical requirements and expectations of the automation framework.
            </p>

            <div className="p-8 bg-white rounded-[32px] border border-zinc-100 hidden lg:block">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Support Logic Active</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed italic">
                  "System integrity is the foundation of growth automation. If your operational question isn't answered here, our diagnostic team is ready to map out your specific edge cases."
                </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3 mt-8 lg:mt-0">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`group border transition-all duration-500 rounded-[24px] md:rounded-[28px] overflow-hidden ${
                  openIndex === i
                    ? "bg-white border-orange-500/30 shadow-xl shadow-orange-500/5"
                    : "bg-white border-zinc-100 hover:border-zinc-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 md:px-8 py-6 md:py-7 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono transition-colors shrink-0 ${openIndex === i ? "text-orange-500" : "text-zinc-300"}`}>
                      0{i + 1}
                    </span>
                    <span className="text-[14px] md:text-[15px] font-bold text-zinc-900 tracking-tight pr-4 leading-tight">{faq.q}</span>
                  </div>

                  <div className={`shrink-0 w-8 h-8 ml-2 md:ml-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? "bg-orange-500 text-white rotate-180 shadow-lg shadow-orange-500/20" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: openIndex === i ? "400px" : "0", opacity: openIndex === i ? 1 : 0 }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 ml-0 md:ml-10">
                    <div className="text-[14px] text-zinc-500 leading-relaxed font-light border-l-2 border-orange-500/10 pl-6">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 bg-zinc-950 rounded-[24px] text-white">
                <div className="flex items-center gap-4">
                    <Terminal size={16} className="text-orange-500" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">Query_Resolution_Complete</span>
                </div>
                <Link href="/contact" className="flex items-center gap-3 group no-underline">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Speak to an Expert</span>
                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
