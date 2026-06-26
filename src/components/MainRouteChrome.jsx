"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("@/components/chatBot/ChatBot"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), { ssr: false });
const OrbitMobileStickyCTA = dynamic(() => import("@/components/sections/OrbitMobileStickyCTA"), { ssr: false });

export default function MainRouteChrome() {
  const pathname = usePathname();
  const isGetStarted = pathname === "/get-started" || pathname === "/get-started/";

  if (isGetStarted) return null;

  return (
    <>
      <Navbar />
      <ChatBot />
      <OrbitMobileStickyCTA />
    </>
  );
}
