"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import LazySection from "@/components/LazySection";

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
      
      <LazySection height="500px">
        <TheProblem />
      </LazySection>

      <LazySection height="400px">
        <PriceMatrix />
      </LazySection>

      <LazySection height="600px">
        <OpsDefenseStack />
      </LazySection>

      <LazySection height="600px">
        <HowWeWork />
      </LazySection>

      <LazySection height="500px">
        <FAQ />
      </LazySection>

      <LazySection height="350px">
        <OpsCTA />
      </LazySection>

      <LazySection height="150px">
        <FooterNav />
      </LazySection>
    </div>
  );
}
