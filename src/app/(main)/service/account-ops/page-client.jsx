"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import OpsHero from "@/components/service/account ops/components/OpsHero";
import MetricsStrip from "@/components/service/account ops/components/MetricsStrip";
const TheProblem = dynamic(() => import("@/components/service/account ops/components/TheProblem"), { ssr: false });
const WhoItsFor = dynamic(() => import("@/components/service/account ops/components/WhoItsFor"), { ssr: false });
const OpsDefenseStack = dynamic(() => import("@/components/service/account ops/components/OpsDefenseStack"), { ssr: false });
const PriceMatrix = dynamic(() => import("@/components/service/account ops/components/PriceMatrix"), { ssr: false });
const HowWeWork = dynamic(() => import("@/components/service/account ops/components/HowWeWork"), { ssr: false });
const FAQ = dynamic(() => import("@/components/service/account ops/components/FAQ"), { ssr: false });
const OpsCTA = dynamic(() => import("@/components/service/account ops/components/OpsCTA"), { ssr: false });
const FooterNav = dynamic(() => import("@/components/service/account ops/components/FooterNav"), { ssr: false });

export default function AccountOps() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F6] selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <OpsHero />
      <MetricsStrip />
      <TheProblem />
      <PriceMatrix />
      <OpsDefenseStack />
      <HowWeWork />
      <FAQ />
      <OpsCTA />
      <FooterNav />
    </div>
  );
}
