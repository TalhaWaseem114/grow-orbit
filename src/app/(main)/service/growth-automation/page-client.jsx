"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import LazySection from "@/components/LazySection";

import AutomationHero from "@/components/service/growth automation/AutomationHero";
const AutomationLedger = dynamic(() => import("@/components/service/growth automation/AutomationLedger"), { ssr: false });
const WhoItsFor = dynamic(() => import("@/components/service/growth automation/WhoItsFor"), { ssr: false });
const TheProblem = dynamic(() => import("@/components/service/growth automation/TheProblem"), { ssr: false });
const TheFramework = dynamic(() => import("@/components/service/growth automation/TheFramework"), { ssr: false });
const SystemsCatalogue = dynamic(() => import("@/components/service/growth automation/SystemsCatalogue"), { ssr: false });
const AutomationStack = dynamic(() => import("@/components/service/growth automation/AutomationStack"), { ssr: false });
const ExpectedOutcomes = dynamic(() => import("@/components/service/growth automation/ExpectedOutcomes"), { ssr: false });
const HowWeWork = dynamic(() => import("@/components/service/growth automation/HowWeWork"), { ssr: false });
const FAQ = dynamic(() => import("@/components/service/growth automation/FAQ"), { ssr: false });
const AutomationCTA = dynamic(() => import("@/components/service/growth automation/AutomationCTA"), { ssr: false });

export default function GrowthAutomation() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <AutomationHero />
      
      <LazySection height="500px">
        <AutomationLedger />
      </LazySection>

      <LazySection height="500px">
        <TheProblem />
      </LazySection>

      <LazySection height="600px">
        <TheFramework />
      </LazySection>

      <LazySection height="600px">
        <SystemsCatalogue />
      </LazySection>

      <LazySection height="500px">
        <AutomationStack />
      </LazySection>

      <LazySection height="600px">
        <ExpectedOutcomes />
      </LazySection>

      <LazySection height="500px">
        <WhoItsFor />
      </LazySection>

      <LazySection height="600px">
        <HowWeWork />
      </LazySection>

      <LazySection height="500px">
        <FAQ />
      </LazySection>

      <LazySection height="350px">
        <AutomationCTA />
      </LazySection>

      {/* --- NAVIGATION FOOTER --- */}
      <footer className="py-16 md:py-24 bg-white border-t border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">

          {/* Previous Service */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
            <Link href="/service/ppc-efficiency" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start uppercase leading-none">
                <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
                PPC Efficiency
              </h4>
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-zinc-100" />

          {/* Next Service */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
            <Link href="/service/account-ops" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end uppercase leading-none">
                Account Operations
                <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 md:size-8 shrink-0" />
              </h4>
            </Link>
          </div>

        </div>

        {/* Back to all services */}
        <div className="mt-12 md:mt-16 text-center">
           <Link href="/service" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors no-underline">
              <ArrowRight className="rotate-180" size={16} /> Back to All Services
           </Link>
        </div>
      </footer>
    </div>
  );
}
