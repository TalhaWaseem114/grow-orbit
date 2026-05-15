import React, { useEffect } from "react";
import {
  ClipboardCheck,
  BarChart4,
  Target,
  PieChart,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Zap,
  SearchCode,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  Activity,
  Search,
  Layers,
  Database,
  DollarSign,
  ArrowUpRight,
  Calendar,
  Layout,
  ChevronRight,
  MapIcon,
} from "lucide-react";
import Link from "next/link";
import AuditStrategyHero from "./AuditStrategyHero";
import Methology from "./Methology";
import OrbitWay from "./OrbitWay";
import DiagnosticProtocol from "./DiagnosticProtocol";
import Outcome from "./Outcome";
import ProcessSection from "./ProcessSection";
import PriceMatrix from "./PriceMatrix";
import FAQSection from "./FAQSection";
import Conversions from "./Conversions";

const AuditStrategy = () => {
  const montserrat = { fontFamily: "'Montserrat', sans-serif" };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#F6F6F6] text-[#1D1D1F] selection:bg-orange-500 selection:text-white pb-0"
      style={montserrat}
    >
      {/* --- HERO SECTION: The Hook --- */}
      <AuditStrategyHero />

      {/* --- OPTION 1: THE HIGH-END BENTO --- */}
      <Methology />

      {/* --- COMPARISON: The "Orbit Way" --- */}
      <OrbitWay />

      {/* --- SECTION 02: THE 4 LAYERS OF SCRUTINY --- */}
      <DiagnosticProtocol />

      {/* --- FINAL CONVERSION --- */}
      <Outcome />

      {/* --- PROCESS: HOW WE WORK --- */}
      <ProcessSection />

      {/* --- PRICE MATRIX --- */}
      <PriceMatrix />

      {/* --- FAQ SECTION --- */}
      <FAQSection />

      {/* --- FINAL CONVERSION --- */}
      <Conversions />

      {/* --- NAVIGATION FOOTER --- */}
      <footer className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">

          {/* Previous Service */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
            <Link href="/service/ongoing-support" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start">
                <ArrowLeft className="mr-3 group-hover:-translate-x-3 transition-transform size-8 shrink-0" />
                Ongoing Support
              </h4>
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-zinc-200"></div>

          {/* Next Service */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
            <Link href="/service/brand-launch" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end">
                Brand Launch
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
};

export default AuditStrategy;
