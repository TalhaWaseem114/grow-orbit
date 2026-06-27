"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";

import AuditHero from "./components/AuditHero";
import MetricsStrip from "./components/MetricsStrip";

const Methodology = dynamic(() => import("./components/Methodology"), { ssr: false });
const Pricing = dynamic(() => import("./components/Pricing"), { ssr: false });
const OrbitWay = dynamic(() => import("./components/OrbitWay"), { ssr: false });
const DiagnosticProtocol = dynamic(() => import("./components/DiagnosticProtocol"), { ssr: false });
const Deliverables = dynamic(() => import("./components/Deliverables"), { ssr: false });
const WhoItsFor = dynamic(() => import("./components/WhoItsFor"), { ssr: false });
const ProcessSection = dynamic(() => import("../../../../components/service/audit strategy/ProcessSection"), { ssr: false });
const FAQ = dynamic(() => import("./components/FAQ"), { ssr: false });
const AuditCTA = dynamic(() => import("./components/AuditCTA"), { ssr: false });
const FooterNav = dynamic(() => import("./components/FooterNav"), { ssr: false });

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