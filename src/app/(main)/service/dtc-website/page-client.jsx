"use client";

import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LazySection from "@/components/LazySection";

// Section Imports
import DTCHero from "@/components/service/dtc website/components/DTCHero";
import MetricsStrip from "@/components/service/dtc website/components/MetricsStrip";
const TheProblem = dynamic(() => import("@/components/service/dtc website/components/TheProblem"), { ssr: false });
const DTCFramework = dynamic(() => import("@/components/service/dtc website/components/DTCFramework"), { ssr: false });
const Deliverables = dynamic(() => import("@/components/service/dtc website/components/Deliverables"), { ssr: false });
const DTCTechStack = dynamic(() => import("@/components/service/dtc website/components/DTCTechStack"), { ssr: false });
const ExpectedOutcomes = dynamic(() => import("@/components/service/dtc website/components/ExpectedOutcomes"), { ssr: false });
const HowWeWork = dynamic(() => import("@/components/service/dtc website/components/HowWeWork"), { ssr: false });
const FAQ = dynamic(() => import("@/components/service/dtc website/components/FAQ"), { ssr: false });
const DtcWebsiteCTA = dynamic(() => import("@/components/service/dtc website/components/DtcWebsiteCTA"), { ssr: false });

// ─────────────────────────────────────────────
// FOOTER NAV
// ─────────────────────────────────────────────
function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">

        {/* Previous Service */}
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/coaching-consultation" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-6 md:size-8 shrink-0" />
              Coaching & Consultation
            </h4>
          </Link>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-zinc-200"></div>

        {/* Next Service */}
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/amazon-dsp" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end">
              Amazon DSP
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 md:size-8 shrink-0" />
            </h4>
          </Link>
        </div>

      </div>

      {/* Back to all services */}
      <div className="mt-20 text-center">
         <Link href="/service" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
            <ArrowRight className="rotate-180" size={16} /> Back to All Services
         </Link>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────
export default function DtcWebsiteService() {
  return (
    <div
      className="min-h-screen bg-[#F6F6F6] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        /* Perspective class for 3D hero card */
        .perspective-1000 {
           perspective: 1000px;
        }
      `}</style>

      {/* Narrative Order */}
      <DTCHero />
      <MetricsStrip />
      
      <LazySection height="500px">
        <TheProblem />
      </LazySection>

      <LazySection height="600px">
        <DTCFramework />
      </LazySection>

      <LazySection height="600px">
        <Deliverables />
      </LazySection>

      <LazySection height="500px">
        <DTCTechStack />
      </LazySection>

      <LazySection height="600px">
        <ExpectedOutcomes />
      </LazySection>

      <LazySection height="600px">
        <HowWeWork />
      </LazySection>

      <LazySection height="500px">
        <FAQ />
      </LazySection>

      <LazySection height="350px">
        <DtcWebsiteCTA />
      </LazySection>

      <LazySection height="150px">
        <FooterNav />
      </LazySection>
    </div>
  );
}
