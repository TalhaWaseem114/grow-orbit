import { Inter, Montserrat, Zen_Dots, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MouseTrailer from "@/utils/MouseTrailer";
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
  metadataBase: new URL("https://groworbit.com"),
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${zenDots.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <PWARegister />
        {children}
        <MouseTrailer />
        <SpeedInsights />
      </body>
    </html>
  );
}
