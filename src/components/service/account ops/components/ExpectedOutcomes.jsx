import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ShieldCheck, Bell, Lock, ShieldAlert, AlertCircle,
  TrendingDown, EyeOff, Activity, Zap, CheckCircle2,
  Package, Globe, Search, Gavel, HeartPulse, BarChart3,
  ShieldHalf, Radar, Scale, ChevronRight, Terminal,
  Plus, Minus, TrendingUp, Star
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroButton from "@/components/ui/HeroButton";

import SectionLabel from "./SectionLabel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);


/* ═══════════════════════════════════════════════
   07 — EXPECTED OUTCOMES
   FIX: dot pattern #4f46e5 (indigo) → #f97316 (orange)
   FIX: bg-linear-to-r → bg-gradient-to-r
   ═══════════════════════════════════════════════ */
const Sparkline = () => (
  <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="inline-block ml-3 align-middle mt-1">
    <path d="M2 20 Q 12 20, 16 14 T 30 14 T 40 8 T 54 2" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="54" cy="2" r="3" fill="#f97316" />
  </svg>
);

export default function ExpectedOutcomes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = sectionRef.current.querySelectorAll(".metric-counter");
      counters.forEach((el) => {
        const target = el.getAttribute("data-target");
        const isPercent = target.includes("%");
        const isX = target.includes("x");
        const isSlash = target.includes("/");
        const prefix = target.startsWith("+") ? "+" : "";
        const suffix = isPercent ? "%" : isX ? "x" : "";
        let numStr = target.replace(/[+%x<>s]/g, "").replace("/7", "");
        const numVal = parseFloat(numStr);
        if (isNaN(numVal) || isSlash || numVal === 0) {
          gsap.from(el, { opacity: 0, y: 10, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numVal, duration: 2, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            const isInt = Number.isInteger(numVal);
            el.textContent = prefix + (isInt ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          },
        });
      });
      gsap.fromTo(".ops-outcome-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".ops-outcome-card", start: "top 90%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const outcomes = [
    { icon: <TrendingDown size={16} />, metric: "+28%",  label: "Recaptured momentum", title: "Category Recovery",      desc: "Eliminating suppressions and out-of-stock events restores the listing health required for dominant organic ranking.", sparkline: true },
    { icon: <ShieldCheck size={16} />,  metric: "100%",  label: "Buy-box ownership",   title: "Hijacker Neutralization", desc: "Proactive removal of unauthorized sellers restores buy-box control, protecting both margin and MAP." },
    { icon: <HeartPulse size={16} />,   metric: "Elite", label: "Account health",       title: "Risk Neutralization",    desc: "Continuous monitoring and proactive mediation keep account health in the 'Elite' category, preventing catastrophic suspensions." },
    { icon: <Zap size={16} />,          metric: "Shield",label: "Security Index",       title: "Asset Protection",       desc: "Deep brand registry implementation and redundancy create a defensive moat around every SKU.", wide: true },
    { icon: <BarChart3 size={16} />,    metric: "0%",    label: "Inventory gaps",       title: "Operational Flow",       desc: "Sophisticated forecasting and logistical oversight ensure stock levels remain optimal without over-ordering.", wide: true },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[#fafafa] relative overflow-hidden text-left">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-24">
          <SectionLabel>Expected Outcomes</SectionLabel>
          <h2
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.88] mb-6 md:mb-8 text-zinc-900"
          >
            What Security<br />
            <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>provides.</span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Operations is the invisible foundation of scale. When your infrastructure is secure, your team can focus on growth instead of crisis management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className={`ops-outcome-card group relative bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 border ${o.wide ? 'border-orange-500/20 shadow-xl shadow-zinc-200/50' : 'border-zinc-100'} hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 overflow-hidden flex flex-col ${o.wide ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <div
                className={`absolute inset-0 rounded-[28px] md:rounded-[32px] ${o.wide ? 'opacity-[0.06]' : 'opacity-[0.03]'} group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`}
                style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "8px 8px" }}
              />
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="text-orange-500">{o.icon}</div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <p className="metric-counter text-2xl sm:text-3xl font-black text-zinc-900 tracking-tighter leading-none" data-target={o.metric}>{o.metric}</p>
                    {o.sparkline && <Sparkline />}
                  </div>
                  <p className="font-mono text-[8px] font-bold tracking-[0.2em] text-zinc-400 uppercase mt-2">{o.label}</p>
                </div>
              </div>
              <div className={`relative z-10 mt-auto pt-6 md:pt-8 border-t ${o.wide ? 'border-orange-500/10' : 'border-zinc-100'} group-hover:border-orange-500/10 transition-colors`}>
                <h3 className={`font-black text-base md:text-lg tracking-tight uppercase ${o.wide ? 'text-orange-500' : 'text-zinc-900'} group-hover:text-orange-500 transition-colors mb-2 text-left`}>{o.title}</h3>
                <p className="text-zinc-500 text-[11px] sm:text-xs md:text-sm font-light leading-relaxed text-left">{o.desc}</p>
              </div>
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500/0 ${o.wide ? 'via-orange-500/20' : 'via-orange-500/0'} to-orange-500/0 group-hover:via-orange-500/20 transition-all duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
