import {
  Check,
  ArrowRight,
  ArrowLeft,
  Search,
  Layers,
  Zap,
  ShieldCheck,
  Globe,
  Compass,
  BarChart3,
  Layout,
  Package,
  Activity,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import BrandLaunchHero from "./BrandLaunchHero";
import MarketFriction from "./MarketFriction";
import LaunchTimeline from "./LaunchTimeline";
import Deliverables from "./Deliverables";
import Deliverables1 from "./Deliverables1";
import StrategyCard from "./StrategyCard";
import ProcessSection from "./ProcessSection";
import PriceMatrix from "./PriceMatrix";
import FAQSection from "./FAQSection";

const BrandLaunchService = () => {

  return (
    <div className="bg-white text-[#1d1d1f] font-sans antialiased selection:bg-orange-100">
      {/* ------------------hero -section ---------------------- */}
      <BrandLaunchHero />

      {/* 2. THE PROBLEM: MARKET FRICTION */}
      <MarketFriction />

      {/* 3. METHODOLOGY: THE LAUNCH TIMELINE */}
      <LaunchTimeline />

      {/* 4. GRID: DELIVERABLES — BLUEPRINT EDITION */}
      <Deliverables />
      {/* 4. GRID: DELIVERABLES ----option*/}
      {/* <Deliverables1/> */}

      {/* 5. STRATEGY CARD SECTION */}
      <StrategyCard />

      {/* 6. PROCESS: HOW WE LAUNCH */}
      <ProcessSection />

      {/* 7. PRICE MATRIX */}
      <PriceMatrix />

      {/* 8. FAQ SECTION */}
      <FAQSection />

      {/* --- NAVIGATION FOOTER --- */}
      <footer className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">

          {/* Previous Service */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
            <Link href="/service/audit-strategy" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start">
                <ArrowLeft className="mr-3 group-hover:-translate-x-3 transition-transform size-8 shrink-0" />
                Audit Strategy
              </h4>
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-zinc-200"></div>

          {/* Next Service */}
          <div className="text-center md:text-right w-full md:w-1/3">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
            <Link href="/service/listing-optimization" className="group inline-block no-underline text-zinc-900">
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end">
                Listing Optimization
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

export default BrandLaunchService;
