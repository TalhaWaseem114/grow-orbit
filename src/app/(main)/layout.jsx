import ChatBot from "../../components/chatBot/ChatBot";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import OrbitMobileStickyCTA from "../../components/sections/OrbitMobileStickyCTA";

export default function MainLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Grow Orbit",
            "url": "https://groworbit.com",
            "logo": "https://groworbit.com/logo.png",
            "description": "Amazon Growth Agency specializing in account management, PPC efficiency, and visual engineering.",
            "sameAs": [
              "https://www.linkedin.com/company/groworbit"
            ]
          })
        }}
      />
      <Navbar />
      {children}
      <Footer />
      <ChatBot />
      <OrbitMobileStickyCTA />
    </>
  );
}
