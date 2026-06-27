import { Inter, Montserrat, Zen_Dots, Playfair_Display } from "next/font/google";
import ClientSideFeatures from "@/components/ClientSideFeatures";
import DeferredTracking from "@/components/DeferredTracking";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const zenDots = Zen_Dots({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zen-dots",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Grow Orbit",
  description: "Brand Launch. Listing Optimization. Rebrands.",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

import PWARegister from "@/components/PWARegister";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${zenDots.variable} ${playfair.variable}`}>
      <head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1743928903460669&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <PWARegister />
        {children}
        <Analytics />
        <SpeedInsights />
        <ClientSideFeatures />
        <DeferredTracking
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
          gaId={process.env.NEXT_PUBLIC_GA_ID}
        />
      </body>
    </html>
  );
}
