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

export default function Deliverables() {
  const docs = [
    { id: "DOC-24M",  icon: <Calendar size={22} />,  title: "24-Month Roadmap",        desc: "A month-by-month execution plan detailing spend logic, product launches, and ranking targets — ready to deploy on Day 1." },
    { id: "KWM-5K",   icon: <MapPin size={22} />,    title: "Keyword Master-Map",       desc: "A 5,000+ keyword database categorized by purchase intent, competition level, and organic vs paid opportunity." },
    { id: "P&L-FOR",  icon: <TrendingUp size={22} />,title: "Profit / Loss Forecast",   desc: "A technical financial model projecting contribution margins as we surgically scale your ROAS quarter by quarter." },
    { id: "CRV-WF",   icon: <Layout size={22} />,    title: "Creative Wireframes",      desc: "Structural blueprints for your A+ Content and Listing Images based on conversion data and eye-tracking insights." },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "linear-gradient(to right, black, transparent)" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>Deliverables</SectionLabel>
            <h2
              className="text-5xl font-black tracking-tighter uppercase leading-[0.88] mb-6 text-zinc-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The<br />
              <span className="italic font-light text-zinc-300 lowercase tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                outcome.
              </span>
            </h2>
            <p className="text-zinc-500 font-light leading-relaxed mb-10 text-lg">
              You don't just get a meeting. You receive a <span className="text-zinc-900 font-semibold">Technical Blueprint</span> — a high-fidelity execution roadmap for immediate deployment.
            </p>

            {/* Guarantee card */}
            <div className="relative group p-8 bg-orange-500 rounded-[36px] text-white shadow-2xl shadow-orange-500/20 overflow-hidden hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <h4 className="font-black text-lg uppercase tracking-tight">Guaranteed Insight</h4>
                </div>
                <p className="text-sm opacity-90 leading-relaxed mb-6 font-light">
                  If our diagnostic fails to identify at least <span className="font-bold text-white">$10,000</span> in wasted spend or untapped growth, the entire audit is on us.
                </p>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-zinc-950 hover:text-white transition-all no-underline"
                >
                  Secure My Priority Spot <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: deliverable cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {docs.map((d, i) => (
              <div key={i} className="group relative bg-white rounded-[32px] border border-zinc-100 p-8 hover:border-orange-500/20 hover:shadow-xl hover:shadow-zinc-200/60 transition-all duration-500">
                <div className="absolute top-6 right-6">
                  <span className="text-[9px] font-mono text-zinc-300 font-bold group-hover:text-orange-500 transition-colors">{d.id}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#fafafa] flex items-center justify-center text-zinc-400 group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-all duration-500 mb-6">
                  {d.icon}
                </div>
                <h4 className="font-black text-[15px] uppercase tracking-tight text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">{d.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light group-hover:text-zinc-600 transition-colors">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
