"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessSection from "../../../../components/service/audit strategy/ProcessSection";

import AuditHero from "./components/AuditHero";
import MetricsStrip from "./components/MetricsStrip";
import Methodology from "./components/Methodology";
import OrbitWay from "./components/OrbitWay";
import DiagnosticProtocol from "./components/DiagnosticProtocol";
import Deliverables from "./components/Deliverables";
import WhoItsFor from "./components/WhoItsFor";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import AuditCTA from "./components/AuditCTA";
import FooterNav from "./components/FooterNav";

gsap.registerPlugin(ScrollTrigger);

export default function OrbitDiagnosticPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <AuditHero />
      <MetricsStrip />
      <Methodology />
      <Pricing />
      <OrbitWay />
      <DiagnosticProtocol />
      <Deliverables />
      <WhoItsFor />
      <ProcessSection />
      <FAQ />
      <AuditCTA />
      <FooterNav />
    </div>
  );
}