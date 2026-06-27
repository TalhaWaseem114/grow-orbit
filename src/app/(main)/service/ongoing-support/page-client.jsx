"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import LazySection from "@/components/LazySection";

import SupportHero from "@/components/service/ongoing support/components/SupportHero";
import MetricsStrip from "@/components/service/ongoing support/components/MetricsStrip";
import TheProblem from "@/components/service/ongoing support/components/TheProblem";
import WhoItsFor from "@/components/service/ongoing support/components/WhoItsFor";
import SupportFramework from "@/components/service/ongoing support/components/SupportFramework";
import SupportCycles from "@/components/service/ongoing support/components/SupportCycles";
import MonthlyDeliverables from "@/components/service/ongoing support/components/MonthlyDeliverables";
import SupportTechStack from "@/components/service/ongoing support/components/SupportTechStack";
import ExpectedOutcomes from "@/components/service/ongoing support/components/ExpectedOutcomes";
import HowWeWork from "@/components/service/ongoing support/components/HowWeWork";
import PriceMatrix from "@/components/service/ongoing support/components/PriceMatrix";
import SupportFAQ from "@/components/service/ongoing support/components/SupportFAQ";
import SupportCTA from "@/components/service/ongoing support/components/SupportCTA";
import FooterNav from "@/components/service/ongoing support/components/FooterNav";

export default function OngoingSupport() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#F6F6F6] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <SupportHero />
      <MetricsStrip />
      
      <LazySection height="500px">
        <MonthlyDeliverables />
      </LazySection>

      <LazySection height="500px">
        <TheProblem />
      </LazySection>

      <LazySection height="400px">
        <PriceMatrix />
      </LazySection>

      <LazySection height="600px">
        <SupportFramework />
      </LazySection>

      <LazySection height="600px">
        <SupportCycles />
      </LazySection>

      <LazySection height="500px">
        <SupportTechStack />
      </LazySection>

      <LazySection height="600px">
        <ExpectedOutcomes />
      </LazySection>

      <LazySection height="600px">
        <HowWeWork />
      </LazySection>

      <LazySection height="500px">
        <SupportFAQ />
      </LazySection>

      <LazySection height="350px">
        <SupportCTA />
      </LazySection>

      <LazySection height="150px">
        <FooterNav />
      </LazySection>
    </div>
  );
}
