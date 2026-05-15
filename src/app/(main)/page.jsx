"use client";

import { useRouter } from "next/navigation";

import AboutVision from "@/components/home/AboutVision";
import HeroSection from "@/components/home/HeroSection";
import OrbitBridgeCTA from "@/components/sections/OrbitBridgeCTA";
import "@/components/home/Home.css";
import ServicesMarquee from "@/components/ui/ServicesMarquee";
import ServiceSection from "@/components/home/ServicesSection";
import TeamSection from "@/components/home/TeamSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

// New Orbit global sections
import OrbitPortfolioSection from "@/components/sections/OrbitPortfolioSection";
import OrbitTestimonialsSection from "@/components/sections/OrbitTestimonialsSection";
import OrbitProcessSection from "@/components/sections/OrbitProcessSection";
import FAQSection from "@/components/home/FAQSection";
import WhoItsFor from "@/components/home/WhoItsFor";

export default function Home() {
  const router = useRouter();

  const scrollToForm = () => {
    // Since Home page doesn't have a lead form, we redirect to the get-started page's form
    router.push("/get-started#lead-form");
  };

  return (
    <div className="home-page bg-white">
      <HeroSection />
      <ServicesMarquee />
      <OrbitBridgeCTA scrollToForm={scrollToForm} />
      <ServiceSection />
      <OrbitPortfolioSection />
      <WhyChooseUs />
      <OrbitProcessSection scrollToForm={scrollToForm} />
      <OrbitTestimonialsSection />
      <TeamSection />
      <WhoItsFor />
      <AboutVision />
      <FAQSection scrollToForm={scrollToForm} />

    </div>
  );
}
