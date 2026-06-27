"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";

import AuditHero from "./components/AuditHero";
import MetricsStrip from "./components/MetricsStrip";
import Methodology from "./components/Methodology";
import Pricing from "./components/Pricing";
import OrbitWay from "./components/OrbitWay";
import DiagnosticProtocol from "./components/DiagnosticProtocol";
import Deliverables from "./components/Deliverables";
import WhoItsFor from "./components/WhoItsFor";
import ProcessSection from "../../../../components/service/audit strategy/ProcessSection";
import FAQ from "./components/FAQ";
import AuditCTA from "./components/AuditCTA";
import FooterNav from "./components/FooterNav";

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
      
      <LazySection height="500px">
        <Methodology />
      </LazySection>

      <LazySection height="400px">
        <Pricing />
      </LazySection>

      <LazySection height="500px">
        <OrbitWay />
      </LazySection>

      <LazySection height="600px">
        <DiagnosticProtocol />
      </LazySection>

      <LazySection height="600px">
        <Deliverables />
      </LazySection>

      <LazySection height="500px">
        <WhoItsFor />
      </LazySection>

      <LazySection height="700px">
        <ProcessSection />
      </LazySection>

      <LazySection height="500px">
        <FAQ />
      </LazySection>

      <LazySection height="350px">
        <AuditCTA />
      </LazySection>

      <LazySection height="150px">
        <FooterNav />
      </LazySection>
    </div>
  );
}