"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Above-the-fold — eagerly loaded
import ServicesMarquee from "@/components/ui/ServicesMarquee";
import StickyNavbar from "../components/StickyNavbar";
import HeroSectionThemeTwo from "../components/HeroSectionThemeTwo";
import CeoSourcingSection from "../components/CeoSourcingSection";
import SellerCentralShowcase from "../components/SellerCentralShowcase";
import OrbitBridgeCTA from "@/components/sections/OrbitBridgeCTA";

// Below-the-fold — lazy-loaded to reduce initial bundle
const ServicesSectionThemeTwo = dynamic(() => import("../components/ServicesSectionThemeTwo"), { ssr: false });
const OrbitPortfolioSection = dynamic(() => import("@/components/sections/OrbitPortfolioSection"), { ssr: false });
const TrustedBrands = dynamic(() => import("../components/TrustedBrands"), { ssr: false });
const BrandStrip = dynamic(() => import("../components/BrandStrip"), { ssr: false });
const OrbitTestimonialsSection = dynamic(() => import("@/components/sections/OrbitTestimonialsSection"), { ssr: false });
const OrbitProcessSection = dynamic(() => import("@/components/sections/OrbitProcessSection"), { ssr: false });
const FAQSection = dynamic(() => import("../components/FAQSection"), { ssr: false });
const StrategyMeetingCTA = dynamic(() => import("../components/StrategyMeetingCTA"), { ssr: false });

export default function ThemeTwo({ scrolled, activeSections = {} }) {
  const formRef = useRef(null);
  const [loadBelowFold, setLoadBelowFold] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (loadBelowFold) return;

    let idleId;
    let timeoutId;
    const load = () => {
      setLoadBelowFold(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", load);
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    window.addEventListener("scroll", load, { passive: true, once: true });
    window.addEventListener("pointerdown", load, { passive: true, once: true });
    window.addEventListener("keydown", load, { once: true });

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 3000 });
    } else {
      timeoutId = window.setTimeout(load, 2500);
    }

    return cleanup;
  }, [loadBelowFold]);

  return (
    <>
      {activeSections.Navbar !== false && <StickyNavbar scrolled={scrolled} scrollToForm={scrollToForm} />}
      {activeSections.Hero !== false && <HeroSectionThemeTwo scrollToForm={scrollToForm} formRef={formRef} />}
      {activeSections.Diagnoses !== false && <CeoSourcingSection />}
      <SellerCentralShowcase />
      {activeSections.Marquee !== false && <ServicesMarquee />}

      <OrbitBridgeCTA scrollToForm={scrollToForm} />

      {loadBelowFold && (
        <>
          {activeSections.Services !== false && <ServicesSectionThemeTwo />}
          {activeSections.Portfolio !== false && <OrbitPortfolioSection isGetStarted={true} />}
          {activeSections.TrustedBrands !== false && <TrustedBrands />}
          {activeSections.Brands !== false && <BrandStrip />}
          {activeSections.Testimonials !== false && <OrbitTestimonialsSection />}
          {activeSections.Process !== false && <OrbitProcessSection scrollToForm={scrollToForm} />}
          {activeSections.FAQ !== false && <FAQSection scrollToForm={scrollToForm} />}
          {activeSections.Meeting !== false && <StrategyMeetingCTA scrollToForm={scrollToForm} />}
        </>
      )}
    </>
  );
}
