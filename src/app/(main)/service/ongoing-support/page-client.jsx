"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import SupportHero from "@/components/service/ongoing support/components/SupportHero";
import MetricsStrip from "@/components/service/ongoing support/components/MetricsStrip";
const TheProblem = dynamic(() => import("@/components/service/ongoing support/components/TheProblem"), { ssr: false });
const WhoItsFor = dynamic(() => import("@/components/service/ongoing support/components/WhoItsFor"), { ssr: false });
const SupportFramework = dynamic(() => import("@/components/service/ongoing support/components/SupportFramework"), { ssr: false });
const SupportCycles = dynamic(() => import("@/components/service/ongoing support/components/SupportCycles"), { ssr: false });
const MonthlyDeliverables = dynamic(() => import("@/components/service/ongoing support/components/MonthlyDeliverables"), { ssr: false });
const SupportTechStack = dynamic(() => import("@/components/service/ongoing support/components/SupportTechStack"), { ssr: false });
const ExpectedOutcomes = dynamic(() => import("@/components/service/ongoing support/components/ExpectedOutcomes"), { ssr: false });
const HowWeWork = dynamic(() => import("@/components/service/ongoing support/components/HowWeWork"), { ssr: false });
const PriceMatrix = dynamic(() => import("@/components/service/ongoing support/components/PriceMatrix"), { ssr: false });
const SupportFAQ = dynamic(() => import("@/components/service/ongoing support/components/SupportFAQ"), { ssr: false });
const SupportCTA = dynamic(() => import("@/components/service/ongoing support/components/SupportCTA"), { ssr: false });
const FooterNav = dynamic(() => import("@/components/service/ongoing support/components/FooterNav"), { ssr: false });

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
      <MonthlyDeliverables />
      <TheProblem />
      <PriceMatrix />
      <SupportFramework />
      <SupportCycles />
      <SupportTechStack />
      <ExpectedOutcomes />
      <HowWeWork />
      <SupportFAQ />
      <SupportCTA />
      <FooterNav />
    </div>
  );
}
