"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Above-the-fold — eagerly loaded
import HeroSection from "@/components/home/HeroSection";
import OrbitBridgeCTA from "@/components/sections/OrbitBridgeCTA";
import "@/components/home/Home.css";
import ServicesMarquee from "@/components/ui/ServicesMarquee";
import ServiceSection from "@/components/home/ServicesSection";

// Below-the-fold — lazy-loaded to reduce initial bundle (GSAP/ScrollTrigger deferred)
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), { ssr: false });
const OrbitPortfolioSection = dynamic(() => import("@/components/sections/OrbitPortfolioSection"), { ssr: false });
const OrbitTestimonialsSection = dynamic(() => import("@/components/sections/OrbitTestimonialsSection"), { ssr: false });
const OrbitProcessSection = dynamic(() => import("@/components/sections/OrbitProcessSection"), { ssr: false });
const ClientLogosMarquee = dynamic(() => import("@/components/ui/ClientLogosMarquee"), { ssr: false });
const TeamSection = dynamic(() => import("@/components/home/TeamSection"), { ssr: false });
const WhoItsFor = dynamic(() => import("@/components/home/WhoItsFor"), { ssr: false });
const AboutVision = dynamic(() => import("@/components/home/AboutVision"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/home/FAQSection"), { ssr: false });

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
      <ClientLogosMarquee isDark={false} bgClass="bg-white" borderClass="border-y border-zinc-100" />
      <TeamSection />
      <WhoItsFor />
      <AboutVision />
      <FAQSection scrollToForm={scrollToForm} />

    </div>
  );
}
