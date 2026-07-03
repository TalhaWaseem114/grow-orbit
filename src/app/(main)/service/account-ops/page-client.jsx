"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import LazySection from "@/components/LazySection";
import ServicePricing from "@/components/sections/ServicePricing";

import OpsHero from "@/components/service/account ops/components/OpsHero";
import MetricsStrip from "@/components/service/account ops/components/MetricsStrip";
import TheProblem from "@/components/service/account ops/components/TheProblem";
import WhoItsFor from "@/components/service/account ops/components/WhoItsFor";
import OpsDefenseStack from "@/components/service/account ops/components/OpsDefenseStack";
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

      <LazySection height="600px">
        <OpsDefenseStack />
      </LazySection>

      <LazySection height="600px">
        <HowWeWork />
      </LazySection>

      <LazySection height="700px">
        <ServicePricing
          serviceName="Account Operations"
          serviceSlug="account-ops"
          serviceSubtitle="Full account management"
          serviceDescription="Day-to-day Amazon account management — listing health, suppression recovery, case management, and proactive account defense."
          serviceDeliverables={[
            "Listing health & suppression checks",
            "Case log & support management",
            "Suppression recovery execution",
            "Proactive listing hijacker defense",
            "Account health dashboard checks"
          ]}
          serviceTimeline="Ongoing"
          serviceCtaLabel="Start Operations"
        />
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
