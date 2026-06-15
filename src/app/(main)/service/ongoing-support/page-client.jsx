"use client";

import React, { useEffect } from "react";
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
