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

export default function DiagnosticProtocol() {
  const pillars = [
    { step: "01", icon: <SearchCode size={22} />, title: "Semantic & SEO Indexing",      desc: "We map your current keyword footprint against the top 2% of your category. We identify the 'blind spots' where your listing is not being indexed by the A9 algorithm.", metric: "A9 INDEX SYNC", hud: "SEO_STATE: ACTIVE", tag: "PROTOCOL: 01", orangeMetric: "24 Data Points" },
    { step: "02", icon: <Zap size={22} />,        title: "PPC Profitability Audit",       desc: "We categorize every dollar of spend into 'Growth,' 'Maintenance,' and 'Waste.' By eliminating waste, we typically see a 20–30% ROAS lift within 30 days.", metric: "SPEND EFFICIENCY", hud: "PPC_STATE: NOMINAL", tag: "PROTOCOL: 02", orangeMetric: "72h Delivery" },
    { step: "03", icon: <Target size={22} />,     title: "Competitor Market Share Map",   desc: "We reverse-engineer the traffic sources of your top 5 competitors. We find exactly where they're winning then build your conquesting roadmap.", metric: "MARKET CAPTURE", hud: "COMP_TRACK: ONLINE", tag: "PROTOCOL: 03", orangeMetric: "100% Coverage" },
    { step: "04", icon: <ShieldCheck size={22} />,title: "Backend Health & Ops Audit",    desc: "We audit your flat files, category nodes, and VoC data to ensure you're not at suppression risk. We find the technical errors before they happen.", metric: "RISK MITIGATION", hud: "OPS_HEALTH: SECURE", tag: "PROTOCOL: 04", orangeMetric: "Risk Neutralized" },
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-600/8 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <SectionLabel light>The Diagnostic Protocol</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.88]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Surgical account<br />
              <span className="italic font-light text-zinc-600 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                deconstruction.
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 font-light max-w-sm text-base leading-relaxed">
            A rigorous four-pillar methodology designed to uncover every growth lever and critical risk factor in your Amazon business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[40px] overflow-hidden">
          {pillars.map((w, i) => (
            <div
              key={i}
              className="group p-10 bg-zinc-900 hover:bg-orange-500 transition-all duration-700 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              ></div>

              <span className="absolute top-6 right-6 text-white/5 font-black text-5xl group-hover:text-white/15 transition-colors select-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>{w.step}</span>

              <div className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_0_1px_rgba(249,115,22,0.3)]"></div>

              <div className="relative z-10 flex flex-col h-full">
                <span className="inline-block self-start font-mono text-[8px] font-bold tracking-widest text-zinc-700 group-hover:text-white/70 border border-zinc-800 group-hover:border-white/30 px-2 py-0.5 rounded-full mb-6 transition-all duration-500">
                  {w.tag}
                </span>

                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white mb-6 transition-colors shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
                <div className="text-orange-500 group-hover:text-white transition-colors mb-6 flex items-center justify-between">
                  {w.icon}
                  <span className="text-[10px] font-black text-orange-500 group-hover:text-white bg-orange-500/10 group-hover:bg-white/20 px-2 py-1 rounded-md transition-all duration-300">
                    {w.orangeMetric}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{w.title}</h3>
                <p className="text-zinc-500 group-hover:text-white/80 text-sm font-light leading-relaxed mb-6 flex-1">{w.desc}</p>
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500 group-hover:text-white/70 transition-colors font-mono">{w.metric}</span>

                <span className="absolute bottom-4 right-5 font-mono text-[7px] text-zinc-800 group-hover:text-white/20 tracking-widest transition-colors select-none">
                  {w.hud}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
