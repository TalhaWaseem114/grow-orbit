import React, { useEffect } from "react";
import SupportHero from "./components/SupportHero";
import MetricsStrip from "./components/MetricsStrip";
import TheProblem from "./components/TheProblem";
import WhoItsFor from "./components/WhoItsFor";
import SupportFramework from "./components/SupportFramework";
import SupportCycles from "./components/SupportCycles";
import MonthlyDeliverables from "./components/MonthlyDeliverables";
import SupportTechStack from "./components/SupportTechStack";
import ExpectedOutcomes from "./components/ExpectedOutcomes";
import HowWeWork from "./components/HowWeWork";
import PriceMatrix from "./components/PriceMatrix";
import SupportFAQ from "./components/SupportFAQ";
import SupportCTA from "./components/SupportCTA";
import FooterNav from "./components/FooterNav";

export default function OngoingSupport() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F6] selection:bg-orange-500 selection:text-white">

      <SupportHero />
      <MetricsStrip />
      <MonthlyDeliverables />
      <TheProblem />
      <WhoItsFor />
      <SupportFramework />
      <SupportCycles />
      <SupportTechStack />
      <ExpectedOutcomes />
      <HowWeWork />
      <PriceMatrix />
      <SupportFAQ />
      <SupportCTA />
      <FooterNav />
    </div>
  );
}
