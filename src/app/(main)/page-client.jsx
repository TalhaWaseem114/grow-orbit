"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";

// Above-the-fold — eagerly loaded
import HeroSection from "@/components/home/HeroSection";
import OrbitBridgeCTA from "@/components/sections/OrbitBridgeCTA";
import "@/components/home/Home.css";
import ServicesMarquee from "@/components/ui/ServicesMarquee";
import ServiceSection from "@/components/home/ServicesSection";

// Below-the-fold components
import WhyChooseUs from "@/components/home/WhyChooseUs";
import OrbitPortfolioSection from "@/components/sections/OrbitPortfolioSection";
import OrbitTestimonialsSection from "@/components/sections/OrbitTestimonialsSection";
import OrbitProcessSection from "@/components/sections/OrbitProcessSection";
import ClientLogosMarquee from "@/components/ui/ClientLogosMarquee";
import CeoMessageTeamSection from "@/components/home/CeoMessageTeamSection";
import WhoItsFor from "@/components/home/WhoItsFor";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  const router = useRouter();

  const scrollToForm = () => {
    // Since Home page doesn't have a lead form, we redirect to the get-started page's form
    router.push("/get-started#lead-form");
  };

  return (
    <main className="home-page bg-white">
      <HeroSection />
      <ServicesMarquee />
      <OrbitBridgeCTA scrollToForm={scrollToForm} />
      
      <LazySection height="600px">
        <CeoMessageTeamSection />
      </LazySection>

      <ServiceSection />
      
      <LazySection height="600px">
        <OrbitPortfolioSection />
      </LazySection>

      <LazySection height="500px">
        <WhyChooseUs />
      </LazySection>

      <LazySection height="700px">
        <OrbitProcessSection scrollToForm={scrollToForm} />
      </LazySection>

      <LazySection height="500px">
        <OrbitTestimonialsSection />
      </LazySection>

      <LazySection height="120px">
        <ClientLogosMarquee isDark={false} bgClass="bg-white" borderClass="border-y border-zinc-100" />
      </LazySection>



      <LazySection height="500px">
        <WhoItsFor />
      </LazySection>

      <LazySection height="500px">
        <FAQSection scrollToForm={scrollToForm} />
      </LazySection>
    </main>
  );
}
