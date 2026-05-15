import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

import AutomationHero    from "./AutomationHero";
import AutomationLedger  from "./AutomationLedger";
import TheProblem        from "./TheProblem";
import TheFramework      from "./TheFramework";
import SystemsCatalogue  from "./SystemsCatalogue";
import AutomationStack   from "./AutomationStack";
import ExpectedOutcomes  from "./ExpectedOutcomes";
import HowWeWork         from "./HowWeWork";
import PriceMatrix       from "./PriceMatrix";
import FAQ               from "./FAQ";
import AutomationCTA     from "./AutomationCTA";

export default function GrowthAutomation() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-500 selection:text-white font-sans">
      <AutomationHero />
      <AutomationLedger />
      <TheProblem />
      <TheFramework />
      <SystemsCatalogue />
      <AutomationStack />
      <ExpectedOutcomes />
      <HowWeWork />
      <PriceMatrix />
      <FAQ />
      <AutomationCTA />

      <footer className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">

          {/* Previous Service */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
            <Link href="/service/ppc-efficiency" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start">
                <ArrowLeft className="mr-3 group-hover:-translate-x-3 transition-transform size-8 shrink-0" />
                PPC Efficiency
              </h4>
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-zinc-200"></div>

          {/* Next Service */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
            <Link href="/service/dtc-website" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end">
                DTC Website
                <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-8 shrink-0" />
              </h4>
            </Link>
          </div>

        </div>

        {/* Back to all services */}
        <div className="mt-20 text-center">
           <Link href="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
              <ArrowLeft size={16} /> Back to All Services
           </Link>
        </div>
      </footer>
    </div>
  );
}











