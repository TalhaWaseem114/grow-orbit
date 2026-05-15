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

export default function MetricsStrip() {
  const stats = [
    { v: "150+",   l: "Audits Performed",  i: <Activity size={14} /> },
    { v: "22%",   l: "Avg Waste Found",    i: <TrendingDown size={14} /> },
    { v: "$4.2K", l: "Avg Spend Saved",    i: <DollarSign size={14} /> },
    { v: "72h",   l: "Delivery Window",    i: <Zap size={14} /> },
  ];

  return (
    <div className="bg-zinc-900 py-12 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group relative flex flex-col border-l border-zinc-800/50 pl-4 md:pl-8 transition-all duration-500 hover:border-orange-500/40">
              <div className="absolute top-0 left-[-1.5px] w-[3px] h-[3px] bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-orange-500/70 mb-3 group-hover:text-orange-400 transition-colors">{s.i}</div>
              <span className="text-4xl font-black text-white tracking-tighter">{s.v}</span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">[ {s.l} ]</span>
            </div>
          ))}
          <Link 
            href="/get-started" 
            className="group relative flex flex-col items-center text-center col-span-2 md:col-span-3 lg:col-span-1 mt-4 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:border-orange-500/20 lg:pl-8 transition-all duration-500 hover:bg-orange-500/[0.02] no-underline"
          >
            <span className="text-xl sm:text-2xl lg:text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors flex items-center gap-3">
              Get Strategy Call
              <ArrowRight size={20} className="text-orange-500 group-hover:translate-x-2 transition-transform hidden sm:block lg:hidden" />
              <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform sm:hidden lg:block" />
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] lg:text-[8px] font-mono text-zinc-600 uppercase tracking-widest">AUDIT_SLOTS_OPEN</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
