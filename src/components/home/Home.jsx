"use client";

import AboutVision from './AboutVision';
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import "./Home.css";
import ProcessSection from "./ProcessSection";
import ProjectShowcase from "./ProjectShowcase";
import ServiceSection from "./ServicesSection";
import StatsSection from "./StatsSection";
import TeamSection from "./TeamSection";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

export default function Home() {
  return (
    <div className="home-page bg-white">
      <HeroSection />

      {/* LAYOUT 1 - Kept intact as requested */}
      {/* <Services /> */}
      {/* <PortfolioPreview/> */}
      {/* <ProcessSection /> */}
      {/* <Results /> */}

      <ServiceSection />
      {/* LAYOUT 2 - The Nixtio Inspired High-End Layout */}

      {/* 1. Services Section (Bento Grid) */}
      {/* <BentoServices /> */}

      {/* 2. Why Choose Us (Editorial Layout) */}
      <WhyChooseUs />

      {/* 4. Featured Projects / Showcase */}
      <ProjectShowcase />

      {/* 3. About Us & Your Vision (High Contrast Split) */}
      <AboutVision />

      {/* 5. Experiences / Bold Stats */}
      <StatsSection />

      {/* 7. Our Team (The Collective) */}
      <TeamSection />

      {/* 6. Testimonials (Clean Cards) */}
      <Testimonials />

      {/* 8. Process (Horizontal Flow) */}
      {/* <HorizontalProcess /> */}
      <ProcessSection />

      {/* 9. FAQ (Editorial Style) */}
      <FAQSection />
    </div>
  );
}
