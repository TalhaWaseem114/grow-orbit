"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import LazySection from "@/components/LazySection";

import OpsHero from "@/components/service/account ops/components/OpsHero";
import MetricsStrip from "@/components/service/account ops/components/MetricsStrip";
import TheProblem from "@/components/service/account ops/components/TheProblem";
import WhoItsFor from "@/components/service/account ops/components/WhoItsFor";
import OpsDefenseStack from "@/components/service/account ops/components/OpsDefenseStack";
import PriceMatrix from "@/components/service/account ops/components/PriceMatrix";
import HowWeWork from "@/components/service/account ops/components/HowWeWork";
import FAQ from "@/components/service/account ops/components/FAQ";
import OpsCTA from "@/components/service/account ops/components/OpsCTA";
import FooterNav from "@/components/service/account ops/components/FooterNav";

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
