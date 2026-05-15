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
   FOOTER NAV
   FIX: max-w-7xl → max-w-[1400px], border-zinc-200 → border-zinc-100
   ═══════════════════════════════════════════════ */
export default function FooterNav() {
  return (
    <footer className="py-16 md:py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/growth-automation" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase leading-none">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Growth Automation
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-100" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/ongoing-support" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase leading-none">
              Ongoing Support
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 md:size-8 shrink-0" />
            </h4>
          </Link>
        </div>
      </div>
      <div className="mt-20 text-center">
        <Link href="/service" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
          <ArrowRight className="rotate-180" size={16} /> Back to All Services
        </Link>
      </div>
    </footer>
  );
}

