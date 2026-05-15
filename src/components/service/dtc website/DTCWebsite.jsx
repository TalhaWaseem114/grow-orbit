import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Section Imports
import DTCHero from "./components/DTCHero";
import MetricsStrip from "./components/MetricsStrip";
import TheProblem from "./components/TheProblem";
import DTCFramework from "./components/DTCFramework";
import Deliverables from "./components/Deliverables";
import DTCTechStack from "./components/DTCTechStack";
import ExpectedOutcomes from "./components/ExpectedOutcomes";
import HowWeWork from "./components/HowWeWork";
import FAQ from "./components/FAQ";
import PriceMatrix from "./components/PriceMatrix";
import DTCCTA from "./components/DTCCTA";

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
          <Link href="/service/growth-automation" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-8 shrink-0" />
              Growth Automation
            </h4>
          </Link>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-zinc-200"></div>

        {/* Next Service */}
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/account-ops" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end">
              Account Operations
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-8 shrink-0" />
            </h4>
          </Link>
        </div>

      </div>

      {/* Back to all services */}
      <div className="mt-20 text-center">
         <Link href="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
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
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,300;1,400;1,800&display=swap');

        /* Perspective class for 3D hero card */
        .perspective-1000 {
           perspective: 1000px;
        }
      `}</style>

      {/* Narrative Order */}
      <DTCHero />
      <MetricsStrip />
      <TheProblem />
      <DTCFramework />
      <Deliverables />
      <DTCTechStack />
      <ExpectedOutcomes />
      <HowWeWork />
      <FAQ />
      <PriceMatrix />
      <DTCCTA />

      <FooterNav />
    </div>
  );
}
