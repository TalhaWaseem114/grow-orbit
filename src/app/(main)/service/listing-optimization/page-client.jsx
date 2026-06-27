"use client";

import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import {
  Search, Layers, Target, TrendingUp, BarChart3, AlertTriangle,
  Zap, Eye, Shield, Cpu, Box, Link2, Image, File, Settings,
  Check, Compass, RefreshCw, Users, Award, ArrowRight, ArrowLeft
} from "lucide-react";
import HeroSection from "@/components/service/listing optimization/HeroSection";
import MetricsStrip from "@/components/service/listing optimization/MetricsStrip";
const ProblemSection = dynamic(() => import("@/components/service/listing optimization/ProblemSection"), { ssr: false });
const FrameworkSection = dynamic(() => import("@/components/service/listing optimization/FrameworkSection"), { ssr: false });
const DeliverablesSection = dynamic(() => import("@/components/service/listing optimization/DeliverablesSection"), { ssr: false });
const WhoItsFor = dynamic(() => import("@/components/service/listing optimization/WhoItsFor"), { ssr: false });
const WhyGrowOrbitSection = dynamic(() => import("@/components/service/listing optimization/WhyGrowOrbitSection"), { ssr: false });
const ProcessSection = dynamic(() => import("@/components/service/listing optimization/ProcessSection"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/service/listing optimization/FAQSection"), { ssr: false });
const CTASection = dynamic(() => import("@/components/service/listing optimization/CtaSection"), { ssr: false });
const ProofTable = dynamic(() => import("@/components/service/listing optimization/ProofTable"), { ssr: false });
import Link from "next/link";

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
export default function SeoOptimizationService() {

  return (
    <main
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <HeroSection/>
      <MetricsStrip />
      
      <LazySection height="500px">
        <ProblemSection />
      </LazySection>

      <LazySection height="500px">
        <WhyGrowOrbitSection />
      </LazySection>

      <div className="h-px w-full bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <LazySection height="600px">
        <FrameworkSection />
      </LazySection>

      <LazySection height="600px">
        <DeliverablesSection />
      </LazySection>

      <LazySection height="500px">
        <ProofTable />
      </LazySection>

      <LazySection height="500px">
        <WhoItsFor />
      </LazySection>

      <LazySection height="700px">
        <ProcessSection />
      </LazySection>

      <LazySection height="500px">
        <FAQSection />
      </LazySection>

      <LazySection height="350px">
        <CTASection />
      </LazySection>

       {/* --- NAVIGATION FOOTER --- */}
      <footer className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">

          {/* Previous Service */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
            <Link href="/service/brand-launch" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start">
                <ArrowLeft className="mr-3 group-hover:-translate-x-3 transition-transform size-6 md:size-6 md:size-8 shrink-0" />
                Brand Launch
              </h4>
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-zinc-200"></div>

          {/* Next Service */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
            <Link href="/service/ppc-efficiency" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end">
                PPC Efficiency
                <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-6 md:size-6 md:size-8 shrink-0" />
              </h4>
            </Link>
          </div>

        </div>

        {/* Back to all services */}
        <div className="mt-20 text-center">
           <Link href="/service" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
              <ArrowLeft size={16} /> Back to All Services
           </Link>
        </div>
      </footer>

    </main>
  );
}
