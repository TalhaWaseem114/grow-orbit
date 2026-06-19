"use client";

import { useRef } from "react";
import ServicesMarquee from "@/components/ui/ServicesMarquee";
import StickyNavbar from "../components/StickyNavbar";
import HeroSectionThemeTwo from "../components/HeroSectionThemeTwo";
import BrandStrip from "../components/BrandStrip";
import DiagnosesSection from "../components/DiagnosesSection";
import OrbitBridgeCTA from "@/components/sections/OrbitBridgeCTA";

import ServicesSectionThemeTwo from "../components/ServicesSectionThemeTwo";
import ProofNumbers from "../components/ProofNumbers";
import OrbitPortfolioSection from "@/components/sections/OrbitPortfolioSection";
import TrustedBrands from "../components/TrustedBrands";
import OrbitTestimonialsSection from "@/components/sections/OrbitTestimonialsSection";
import OrbitProcessSection from "@/components/sections/OrbitProcessSection";
import FAQSection from "../components/FAQSection";
import StrategyMeetingCTA from "../components/StrategyMeetingCTA";
import FormSectionThemeTwo from "../components/FormSectionThemeTwo";

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
      {activeSections.Portfolio !== false && <OrbitPortfolioSection />}
      {activeSections.TrustedBrands !== false && <TrustedBrands />}
      {activeSections.Brands !== false && <BrandStrip />}
      {activeSections.Testimonials !== false && <OrbitTestimonialsSection />}
      {activeSections.Process !== false && <OrbitProcessSection scrollToForm={scrollToForm} />}
      {activeSections.FAQ !== false && <FAQSection scrollToForm={scrollToForm} />}
      {activeSections.Meeting !== false && <StrategyMeetingCTA scrollToForm={scrollToForm} />}
    </>
  );
}
