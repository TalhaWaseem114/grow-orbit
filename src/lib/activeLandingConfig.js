import { THEMES } from "./experimentConfig";

/**
 * LOCAL CONFIGURATION FOR LANDING PAGE (/get-started)
 * 
 * Edit this file to quickly switch the theme and sections of the landing page.
 * Since Firebase fetching is disabled for maximum speed, this file acts as the source of truth.
 * 
 * Available Themes: "theme-1" (Classic), "theme-2" (Video), "theme-3" (Minimal)
 */

export const ACTIVE_THEME = "theme-2";

// By default, this uses the default sections for the selected theme.
// If you want to manually toggle a section on/off, change the value to true/false below.
export const ACTIVE_SECTIONS = {
  ...THEMES[ACTIVE_THEME].defaultSections,
  
  // -- OVERRIDES --
  // Uncomment and change any of these to manually override the theme's default:
  // Navbar: true,
  // Hero: true,
  // Diagnoses: true,
  // Marquee: true,
  // Proof: true,
  // Bridge: true,
  // Services: true,
  // Portfolio: true,
  // TrustedBrands: true,
  // Brands: true,
  // Testimonials: true,
  // Process: true,
  // Form: false,
  // FAQ: true,
  // Meeting: false,
};
