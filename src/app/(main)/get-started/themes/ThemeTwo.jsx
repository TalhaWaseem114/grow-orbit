"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

// Above-the-fold — eagerly loaded
import ServicesMarquee from "@/components/ui/ServicesMarquee";
import StickyNavbar from "../components/StickyNavbar";
import HeroSectionThemeTwo from "../components/HeroSectionThemeTwo";
import DiagnosesSection from "../components/DiagnosesSection";
import OrbitBridgeCTA from "@/components/sections/OrbitBridgeCTA";
import ServicesSectionThemeTwo from "../components/ServicesSectionThemeTwo";
import ProofNumbers from "../components/ProofNumbers";

// Below-the-fold — lazy-loaded to reduce initial bundle
const OrbitPortfolioSection = dynamic(() => import("@/components/sections/OrbitPortfolioSection"), { ssr: false });
const TrustedBrands = dynamic(() => import("../components/TrustedBrands"), { ssr: false });
const BrandStrip = dynamic(() => import("../components/BrandStrip"), { ssr: false });
const OrbitTestimonialsSection = dynamic(() => import("@/components/sections/OrbitTestimonialsSection"), { ssr: false });
const OrbitProcessSection = dynamic(() => import("@/components/sections/OrbitProcessSection"), { ssr: false });
const FAQSection = dynamic(() => import("../components/FAQSection"), { ssr: false });
const StrategyMeetingCTA = dynamic(() => import("../components/StrategyMeetingCTA"), { ssr: false });

export default function ThemeTwo({ scrolled, activeSections = {} }) {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {activeSections.Navbar !== false && <StickyNavbar scrolled={scrolled} scrollToForm={scrollToForm} />}
      {activeSections.Hero !== false && <HeroSectionThemeTwo scrollToForm={scrollToForm} formRef={formRef} />}
      {activeSections.Diagnoses !== false && <DiagnosesSection />}
      {activeSections.Marquee !== false && <ServicesMarquee />}
      {activeSections.Proof !== false && <ProofNumbers />}

      <OrbitBridgeCTA scrollToForm={scrollToForm} />

      {activeSections.Services !== false && <ServicesSectionThemeTwo />}
      {activeSections.Portfolio !== false && <OrbitPortfolioSection isGetStarted={true} />}
      {activeSections.TrustedBrands !== false && <TrustedBrands />}
      {activeSections.Brands !== false && <BrandStrip />}
      {activeSections.Testimonials !== false && <OrbitTestimonialsSection />}
      {activeSections.Process !== false && <OrbitProcessSection scrollToForm={scrollToForm} />}
      {activeSections.FAQ !== false && <FAQSection scrollToForm={scrollToForm} />}
      {activeSections.Meeting !== false && <StrategyMeetingCTA scrollToForm={scrollToForm} />}
    </>
  );
}
