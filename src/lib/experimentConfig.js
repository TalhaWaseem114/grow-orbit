/**
 * Theme Definitions for the Get-Started Landing Page
 */

export const ALL_SECTIONS = [
  { id: "Navbar", label: "Floating Navigation Bar" },
  { id: "Hero", label: "Hero Section (Form/Video)" },
  { id: "Diagnoses", label: "Interactive Diagnoses Grid" },
  { id: "Marquee", label: "Services Marquee Strip" },
  { id: "Proof", label: "Revenue & Growth Proof Metrics" },
  { id: "Bridge", label: "Orbit Bridge (Small CTA)" },
  { id: "Services", label: "Services Grid" },
  { id: "Portfolio", label: "Portfolio Showcase" },
  { id: "TrustedBrands", label: "Trusted Partner Logos" },
  { id: "Brands", label: "Partner Brand Strip" },
  { id: "Testimonials", label: "Client Testimonials" },
  { id: "Process", label: "The Orbit Process" },
  { id: "Form", label: "Lead Capture Form Section" },
  { id: "FAQ", label: "Common Questions (FAQ)" },
  { id: "Meeting", label: "Bottom Strategy Meeting CTA" }
];

export const THEMES = {
  "theme-1": {
    name: "Classic High-Conversion",
    description: "Our standard full-page layout featuring the lead capture form directly in the Hero section.",
    file: "ThemeOne.jsx",
    heroType: "form",
    defaultSections: {
      Navbar: true, Hero: true, Diagnoses: true, Marquee: true, Proof: true,
      Bridge: true, Services: true, Portfolio: true, TrustedBrands: true, Brands: true,
      Testimonials: true, Process: true, Form: false, FAQ: true, Meeting: false
    }
  },
  "theme-2": {
    name: "Visual Brand Storyteller",
    description: "A premium layout replacing the Hero form with an immersive brand video.",
    file: "ThemeTwo.jsx",
    heroType: "video",
    defaultSections: {
      Navbar: true, Hero: true, Diagnoses: true, Marquee: true, Proof: true,
      Bridge: true, Services: true, Portfolio: true, TrustedBrands: true, Brands: true,
      Testimonials: true, Process: true, Form: true, FAQ: true, Meeting: false
    }
  },
  "theme-3": {
    name: "Minimalist Performance",
    description: "A clean, experimental layout focused on bold typography and minimalist navigation.",
    file: "ThemeThree.jsx",
    heroType: "minimal",
    defaultSections: {
      Navbar: true, Hero: true, Diagnoses: false, Marquee: false, Proof: false,
      Bridge: false, Services: false, Portfolio: false, TrustedBrands: true, Brands: false,
      Testimonials: true, Process: false, Form: true, FAQ: true, Meeting: true
    }
  },
};

export const DEFAULT_THEME = "theme-1";
