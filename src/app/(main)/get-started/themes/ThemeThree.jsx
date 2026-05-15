"use client";

import React, { useRef } from "react";
import StickyNavbar from "../components/StickyNavbar";
import ThemeThreeNavbar from "./theme-three/ThemeThreeNavbar";
import HeroThree from "./theme-three/HeroThree";
import TrustedBrandsThree from "./theme-three/TrustedBrandsThree";
import ServicesThree from "./theme-three/ServicesThree";
import DifferentiationThree from "./theme-three/DifferentiationThree";
import ProcessThree from "./theme-three/ProcessThree";
import ResultsSectionThree from "./theme-three/ResultsSectionThree";
import TestimonialsThree from "./theme-three/TestimonialsThree";
import TeamThree from "./theme-three/TeamThree";
import FitSectionThree from "./theme-three/FitSectionThree";
import FAQThree from "./theme-three/FAQThree";
import FooterCTAThree from "./theme-three/FooterCTAThree";

/**
 * ThemeThree — High-conversion dark landing page
 * Based on the Grow Orbit "Orbit Protocol" design system.
 */
export default function ThemeThree({ scrolled, activeSections = {} }) {
  const scrollToForm = () => {
    const target = document.getElementById("final-cta");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-white relative" style={{ background: "#050505" }}>
      {/* Top-level navbar (static on page) */}
      <ThemeThreeNavbar scrollToForm={scrollToForm} />

      {/* Sticky navbar on scroll */}
      {activeSections.Navbar !== false && (
        <StickyNavbar scrolled={scrolled} scrollToForm={scrollToForm} />
      )}

      {/* ── Page Sections ── */}
      <HeroThree scrollToForm={scrollToForm} />
      <TrustedBrandsThree />
      <ServicesThree />
      <DifferentiationThree />
      <ProcessThree />
      <ResultsSectionThree />
      <TestimonialsThree />
      <TeamThree />
      <FitSectionThree scrollToForm={scrollToForm} />
      <FAQThree scrollToForm={scrollToForm} />

      <div id="final-cta">
        <FooterCTAThree scrollToForm={scrollToForm} />
      </div>

      {/* Global overrides for this theme */}
      <style jsx global>{`
        body { background-color: #050505; }
        ::selection { background-color: #f97316; color: white; }
      `}</style>
    </div>
  );
}
