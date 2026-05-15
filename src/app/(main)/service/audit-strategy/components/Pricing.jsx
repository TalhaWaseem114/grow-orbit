"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, TrendingUp,
  Zap, Star, ChevronRight, Plus, Minus, Terminal, Activity,
  Search, Layers, Target, AlertCircle, Calendar, BarChart3,
  Layout, TrendingDown, DollarSign, Shield, SearchCode,
  MapPin, FileText, Users, Package, Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import CheckItem from "./CheckItem";
import HeroButton from "@/components/ui/HeroButton";

// Specialized squared-rounded button for price cards as requested
const PricingButton = ({ href = "/contact", children, popular = false }) => (
  <Link
    href={href}
    className={`group relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.25em] transition-all active:scale-95 no-underline shadow-none ${
      popular 
        ? "bg-orange-600 hover:bg-orange-500 text-white" 
        : "bg-zinc-950 hover:bg-zinc-800 text-white"
    } w-full`}

  >
    <span className="flex items-center gap-3">
      {children}
      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-all duration-300" />
    </span>
  </Link>
);



export default function Pricing() {
  const tiers = [
    {
      name: "Diagnostic",
      tag: "Starter Audit",
      desc: "A focused account health check for brands wanting a fast read on where their spend is leaking.",
      features: [
        "PPC profitability snapshot",
        "Top 20 keyword waste analysis",
        "Organic vs paid attribution overview",
        "Basic competitor comparison (3 rivals)",
        "Priority action list (top 5 issues)",
      ],
      delivery: "48 Hours",
      action: "Book Rapid Audit",
    },

    {
      name: "Orbit",
      tag: "Full Diagnostic",
      desc: "The complete 72-hour account autopsy — our signature service that delivers a full execution blueprint.",
      features: [
        "Everything in Diagnostic",
        "Full semantic keyword mapping (5,000+)",
        "Complete PPC waste audit (all campaigns)",
        "Deep competitor reverse-engineering (5 rivals)",
        "24-month execution roadmap",
        "Profit/loss financial forecast model",
        "Creative wireframes for listings & A+",
        "Priority implementation call",
      ],
      delivery: "72 Hours",
      action: "Book Full Diagnostic",
      popular: true,
    },

    {
      name: "Strategic",
      tag: "Audit + Implementation",
      desc: "The full Orbit Diagnostic plus hands-on 90-day implementation support from our strategy team.",
      features: [
        "Everything in Orbit Diagnostic",
        "90-day implementation support",
        "Dedicated strategist assigned",
        "Weekly optimization reviews",
        "Monthly contribution margin reports",
        "Direct Slack channel access",
      ],
      delivery: "Ongoing",
      action: "Start Strategy Session",
    },

  ];

  return (
    <section id="packages" className="pt-32 bg-[#fafafa] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* REFACTORED HEADER: Downscaled sizes */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel>Packages</SectionLabel>
            <h2
              className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Choose your<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                audit package.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-base font-light leading-relaxed max-w-sm">
            From a rapid account health snapshot to a full 72-hour deconstruction with implementation support — every level delivers actionable intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={i} className="relative rounded-[40px] overflow-hidden flex flex-col">
              {tier.popular && <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400 shrink-0" />}
              <div className={`flex-1 border p-6 sm:p-8 lg:p-10 flex flex-col transition-all duration-500 ${
                tier.popular
                  ? "bg-zinc-950 border-t-0 border-zinc-800 rounded-b-[40px] hover:border-orange-500/30 shadow-none"
                  : "bg-white border-zinc-100 rounded-[40px] hover:border-orange-500/20 shadow-none"
              }`}>
                {tier.popular && (
                  <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full mb-6 self-start">
                    <Star size={9} className="text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Most Popular</span>
                  </div>
                )}

                <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-2 block ${tier.popular ? "text-orange-400" : "text-orange-500"}`}>{tier.tag}</span>
                <h3 className={`text-3xl font-black tracking-tighter mb-3 ${tier.popular ? "text-white" : "text-zinc-900"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>{tier.name}</h3>
                <p className={`text-sm font-light leading-relaxed mb-8 ${tier.popular ? "text-white" : "text-zinc-500"}`}>{tier.desc}</p>


                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="text-orange-500 shrink-0 mt-0.5" />
                      <span className={`text-[13px] font-light ${tier.popular ? "text-white/90" : "text-zinc-600"}`}>{f}</span>

                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <div className={`flex items-center justify-between py-3 border-t ${tier.popular ? "border-white/5" : "border-zinc-100"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-400" : "text-zinc-400"}`}>Delivery</span>

                    <span className={`text-[11px] font-bold ${tier.popular ? "text-zinc-300" : "text-zinc-700"}`}>{tier.delivery}</span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-t rounded-xl px-3 -mx-3 ${tier.popular ? "border-white/5 bg-orange-500/5" : "border-zinc-50 bg-zinc-50/50"}`}>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${tier.popular ? "text-zinc-400" : "text-zinc-400"}`}>Pricing</span>

                    <span className="text-[11px] font-bold text-orange-500">Contact for Quote</span>
                  </div>
                  <PricingButton href="/contact" popular={tier.popular}>
                    {tier.action}
                  </PricingButton>


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
