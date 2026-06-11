import {
  LayoutGrid, Camera, Layers, BookOpen,
  Store, Search, Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   PORTFOLIO DATA — shared across listing + detail
   ═══════════════════════════════════════════════ */

export const PORTFOLIO_ITEMS = [
  /* ─── LISTING IMAGES ─── */
  {
    id: "li-01",
    category: "Listing Images",
    niche: "Snacks",
    brandName: "Lumina Bites",
    outcome: "+80% Sales",
    badge: { value: "+80%", label: "Sales Lift" },
    tags: ["7 Secondary Images", "Infographics", "Lifestyle"],
    services: ["Listing Images"],
    materials: ["Premium Ingredients"],
    src: "/assets/portfolio/lumina bites 1/main image.png",
    isDark: false,
    timeline: "14 Days",
    challenge: "Lumina Bites had delicious, high-quality cookies, but their product images didn't convey the premium taste and texture. They needed visuals that highlighted the quality and crunch.",
    solution: "We created a full suite of listing images that showcased the cookies in lifestyle settings, highlighted the premium ingredients, and used engaging typography to emphasize the texture and taste. Optimized specifically for mobile browsing.",
    gallery: [
      { src: "/assets/portfolio/lumina bites 1/2.png", label: "Hero Image" },
      { src: "/assets/portfolio/lumina bites 1/3.png", label: "Ingredient Callout" },
      { src: "/assets/portfolio/lumina bites 1/4.png", label: "Texture Shot" },
      { src: "/assets/portfolio/lumina bites 1/5.png", label: "Taste Profile" },
      { src: "/assets/portfolio/lumina bites 1/6.png", label: "Lifestyle Image" },
      { src: "/assets/portfolio/lumina bites 1/7.png", label: "Social Proof" },
      { src: "/assets/portfolio/lumina bites 1/8.png", label: "Comparison" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+80%" },
      { label: "CTR Increase", value: "+45%" },
      { label: "CVR Growth", value: "+28%" },
      { label: "Revenue", value: "$45K/mo" },
    ],
    testimonial: {
      quote: "The new listing images capture the exact crunch and flavor of our cookies. Customers are buying with much higher confidence!",
      author: "Sarah J.",
      role: "Founder, Lumina Bites",
    },
  },
  /* ─── LISTING IMAGES (NEXA) ─── */
  {
    id: "li-02",
    category: "Listing Images",
    niche: "EDC Gear",
    brandName: "Nexa",
    outcome: "3.2x ROAS",
    badge: { value: "3.2x", label: "ROAS Lift" },
    tags: ["3D Exploded Views", "Technical Callouts", "Lifestyle"],
    services: ["Listing Images", "A+ Content"],
    materials: ["Premium Alloy", "Rubber Seal"],
    src: "/assets/portfolio/nexa pouches/main image.png",
    isDark: true,
    timeline: "12 Days",
    challenge: "Nexa engineered a premium, durable storage container for everyday carry, but their original photography made it look like standard cheap plastic. Customers couldn't understand the high-end build quality, the advanced rubber seal, or the optimal capacity.",
    solution: "We designed a highly technical set of listing images using 3D renders and exploded views to showcase the high-grade materials and internal mechanisms. By highlighting features like the advanced rubber seal and pocket-sized utility, we positioned Nexa as a premium lifestyle accessory.",
    serviceDetails: {
      "Listing Images": {
        description: "We designed a highly technical set of listing images using 3D renders and exploded views to showcase the high-grade materials and internal mechanisms.",
        images: [
          { src: "/assets/portfolio/nexa pouches/main image.png", label: "Hero Image" },
          { src: "/assets/portfolio/nexa pouches/2.png", label: "Suite Layout" },
          { src: "/assets/portfolio/nexa pouches/3.png", label: "High-Grade Materials" },
          { src: "/assets/portfolio/nexa pouches/4.png", label: "Built to Last" },
          { src: "/assets/portfolio/nexa pouches/5.png", label: "Advanced Rubber Seal" },
          { src: "/assets/portfolio/nexa pouches/6.png", label: "Optimal Capacity" },
          { src: "/assets/portfolio/nexa pouches/7.png", label: "Pocket-Sized Utility" },
        ],
      },
      "A+ Content": {
        description: "Premium A+ Content modules that expand on the brand's technical superiority and lifestyle integration, using high-contrast dark themes to maximize perceived value.",
        images: [
          { src: "/assets/portfolio/nexa pouches/aplus-1.png", label: "Brand Header" },
          { src: "/assets/portfolio/nexa pouches/aplus-2.png", label: "Lifestyle Module" },
          { src: "/assets/portfolio/nexa pouches/aplus-3.png", label: "Technical Comparison" },
          { src: "/assets/portfolio/nexa pouches/aplus-4.png", label: "Precision Engineering" },
          { src: "/assets/portfolio/nexa pouches/aplus-5.png", label: "Air-Tight Seal" },
          { src: "/assets/portfolio/nexa pouches/aplus-6.png", label: "Premium Aluminum" },
          { src: "/assets/portfolio/nexa pouches/aplus-7.png", label: "Durability Module" },
          { src: "/assets/portfolio/nexa pouches/aplus-8.png", label: "Travel Module" },
        ],
      },
    },
    gallery: [
      { src: "/assets/portfolio/nexa pouches/main image.png", label: "Hero Image" },
      { src: "/assets/portfolio/nexa pouches/2.png", label: "Suite Layout" },
      { src: "/assets/portfolio/nexa pouches/3.png", label: "High-Grade Materials" },
      { src: "/assets/portfolio/nexa pouches/4.png", label: "Built to Last" },
      { src: "/assets/portfolio/nexa pouches/5.png", label: "Advanced Rubber Seal" },
      { src: "/assets/portfolio/nexa pouches/6.png", label: "Optimal Capacity" },
      { src: "/assets/portfolio/nexa pouches/7.png", label: "Pocket-Sized Utility" },
      { src: "/assets/portfolio/nexa pouches/aplus-1.png", label: "A+ Brand Header" },
      { src: "/assets/portfolio/nexa pouches/aplus-2.png", label: "A+ Lifestyle" },
    ],
    metrics: [
      { label: "CVR Lift", value: "+65%" },
      { label: "ROAS", value: "3.2x" },
      { label: "Perceived Value", value: "Premium" },
      { label: "Sales Growth", value: "+110%" },
    ],
    testimonial: {
      quote: "The exploded 3D renders completely changed how customers perceive our product. We are finally able to justify our premium price point and conversion rates have skyrocketed.",
      author: "Marcus C.",
      role: "Founder, Nexa",
    },
  },
  /* ─── LISTING IMAGES & A+ (KAZVO) ─── */
  {
    id: "li-03",
    category: "Listing Images",
    niche: "Home & Auto",
    brandName: "Kazvo",
    outcome: "+90% Sales",
    badge: { value: "+90%", label: "Sales Lift" },
    tags: ["High-Tech Infographics", "Feature Callouts", "Action Shots"],
    services: ["Listing Images", "A+ Content"],
    materials: ["Performance Motors", "Permanent Filters"],
    src: "/assets/portfolio/kazvo vacume cleaner/main image.png",
    isDark: false,
    timeline: "15 Days",
    challenge: "Kazvo had a powerful 22,000Pa 4-in-1 vacuum, but their original imagery failed to communicate the sheer suction power and versatility. Customers couldn't distinguish it from weaker, single-purpose alternatives.",
    solution: "We designed a high-impact, technology-focused visual suite. By visualizing the 22,000Pa suction power and highlighting the 4-in-1 versatility (vacuum, blower, inflator), we positioned Kazvo as the ultimate premium cleaning tool for home and auto.",
    serviceDetails: {
      "Listing Images": {
        description: "A dark, premium set of listing images emphasizing sheer power, pure air filtration, and multi-purpose functionality.",
        images: [
          { src: "/assets/portfolio/kazvo vacume cleaner/main image.png", label: "Hero Image" },
          { src: "/assets/portfolio/kazvo vacume cleaner/2.png", label: "Power Overview" },
          { src: "/assets/portfolio/kazvo vacume cleaner/3.png", label: "22,000Pa Domination" },
          { src: "/assets/portfolio/kazvo vacume cleaner/4.png", label: "Accessories Suite" },
          { src: "/assets/portfolio/kazvo vacume cleaner/5.png", label: "Professional Blower" },
          { src: "/assets/portfolio/kazvo vacume cleaner/6.png", label: "Ultimate Suction" },
          { src: "/assets/portfolio/kazvo vacume cleaner/7.png", label: "4-in-1 Versatility" },
        ],
      },
      "A+ Content": {
        description: "Cinematic A+ Content modules that walk the customer through every advanced feature, from the permanent filter to the high-speed motor.",
        images: [
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-1.png", label: "Brand Header" },
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-2.png", label: "Motor Technology" },
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-3.png", label: "Filtration System" },
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-4.png", label: "Multi-Surface" },
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-5.png", label: "Attachment Guide" },
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-6.png", label: "Auto Detailing" },
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-7.png", label: "Compact Storage" },
          { src: "/assets/portfolio/kazvo vacume cleaner/aplus-8.png", label: "Comparison Matrix" },
        ],
      },
    },
    gallery: [
      { src: "/assets/portfolio/kazvo vacume cleaner/main image.png", label: "Hero Image" },
      { src: "/assets/portfolio/kazvo vacume cleaner/2.png", label: "Power Overview" },
      { src: "/assets/portfolio/kazvo vacume cleaner/3.png", label: "22,000Pa Domination" },
      { src: "/assets/portfolio/kazvo vacume cleaner/4.png", label: "Accessories Suite" },
      { src: "/assets/portfolio/kazvo vacume cleaner/5.png", label: "Professional Blower" },
      { src: "/assets/portfolio/kazvo vacume cleaner/6.png", label: "Ultimate Suction" },
      { src: "/assets/portfolio/kazvo vacume cleaner/7.png", label: "4-in-1 Versatility" },
      { src: "/assets/portfolio/kazvo vacume cleaner/aplus-1.png", label: "A+ Brand Header" },
      { src: "/assets/portfolio/kazvo vacume cleaner/aplus-2.png", label: "Motor Technology" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+90%" },
      { label: "ROAS", value: "4.5x" },
      { label: "BSR Growth", value: "+120%" },
      { label: "Return Rate", value: "-15%" },
    ],
    testimonial: {
      quote: "The imagery perfectly captured the power of our vacuum. Buyers now instantly understand they are getting a premium 4-in-1 device.",
      author: "David L.",
      role: "CEO, Kazvo",
    },
  },
  /* ─── LISTING IMAGES & A+ (KAZVO TIRE INFLATOR) ─── */
  {
    id: "li-04",
    category: "Listing Images",
    niche: "Automotive",
    brandName: "Kazvo",
    outcome: "+105% Sales",
    badge: { value: "+105%", label: "Sales Lift" },
    tags: ["Cinematic Dark", "Feature Callouts", "Multi-Use Display"],
    services: ["Listing Images", "A+ Content"],
    materials: ["Premium Aluminum", "LED Display"],
    src: "/assets/portfolio/kazvo tire inflator/main image.png",
    isDark: true,
    timeline: "14 Days",
    challenge: "Kazvo developed a multi-functional tire inflator that also serves as a high-capacity power bank and emergency flashlight. However, the existing imagery looked generic and failed to convey the reliability, speed, and premium build quality needed for emergency automotive tools.",
    solution: "We created a sleek, high-contrast visual system that highlights the intelligent display, 4-in-1 versatility, and rapid inflation capabilities. The dark, cinematic styling reinforces trust and durability, positioning Kazvo as a premium must-have automotive accessory.",
    serviceDetails: {
      "Listing Images": {
        description: "A dark, premium set of listing images emphasizing rapid inflation, emergency readiness, and the intelligent LED display.",
        images: [
          { src: "/assets/portfolio/kazvo tire inflator/main image.png", label: "Hero Image" },
          { src: "/assets/portfolio/kazvo tire inflator/2.png", label: "Smart Display" },
          { src: "/assets/portfolio/kazvo tire inflator/3.png", label: "Driving Safety" },
          { src: "/assets/portfolio/kazvo tire inflator/4.png", label: "Power Bank Feature" },
          { src: "/assets/portfolio/kazvo tire inflator/5.png", label: "Emergency Flashlight" },
          { src: "/assets/portfolio/kazvo tire inflator/6.png", label: "Compact Design" },
        ],
      },
      "A+ Content": {
        description: "A highly detailed, 10-module A+ layout that breaks down every use-case from bicycles to heavy-duty vehicles, alongside safety certifications.",
        images: [
          { src: "/assets/portfolio/kazvo tire inflator/aplus-1.png", label: "Hero Banner" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-2.png", label: "Motorcycle Use" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-3.png", label: "Bicycle Use" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-4.png", label: "Sports Equipment" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-5.png", label: "Smart Chip Tech" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-6.png", label: "Emergency LED" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-7.png", label: "Power Bank" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-8.png", label: "Heat Dissipation" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-9.png", label: "Premium Build" },
          { src: "/assets/portfolio/kazvo tire inflator/aplus-10.png", label: "What's Included" },
        ],
      },
    },
    gallery: [
      { src: "/assets/portfolio/kazvo tire inflator/main image.png", label: "Hero Image" },
      { src: "/assets/portfolio/kazvo tire inflator/2.png", label: "Smart Display" },
      { src: "/assets/portfolio/kazvo tire inflator/3.png", label: "Driving Safety" },
      { src: "/assets/portfolio/kazvo tire inflator/4.png", label: "Power Bank" },
      { src: "/assets/portfolio/kazvo tire inflator/5.png", label: "Flashlight" },
      { src: "/assets/portfolio/kazvo tire inflator/aplus-1.png", label: "A+ Hero" },
      { src: "/assets/portfolio/kazvo tire inflator/aplus-5.png", label: "A+ Smart Tech" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+105%" },
      { label: "ROAS", value: "3.8x" },
      { label: "CVR Lift", value: "+55%" },
      { label: "Add to Cart", value: "+80%" },
    ],
    testimonial: {
      quote: "The dark, cinematic look gave our product the premium, trustworthy feel it needed. Sales instantly shot up and we are dominating our niche.",
      author: "Michael T.",
      role: "Product Manager, Kazvo",
    },
  },
  /* ─── LISTING IMAGES (KAZVO SCREW SET 78) ─── */
  {
    id: "li-05",
    category: "Listing Images",
    niche: "DIY & Tools",
    brandName: "Kazvo",
    outcome: "+75% Sales",
    badge: { value: "+75%", label: "Sales Lift" },
    tags: ["Technical Breakdowns", "Feature Highlights", "Dark Theme"],
    services: ["Listing Images"],
    materials: ["Precision Steel", "Aluminum Alloy"],
    src: "/assets/portfolio/kazvo screw set 78/main image.png",
    isDark: false,
    timeline: "10 Days",
    challenge: "Kazvo created a high-precision, 78-piece electric screwdriver set with dual power control and LED work lights. Their existing imagery felt cluttered and failed to emphasize the premium build quality or the sheer number of bits included.",
    solution: "We designed a sleek, technology-driven visual suite that cleanly organized all 78 pieces into an easy-to-understand infographic. By using a dark, cinematic theme with neon-blue accents, we highlighted the dual power control and LED features, giving the product a professional, high-end feel.",
    serviceDetails: {
      "Listing Images": {
        description: "A comprehensive set of listing images that organize 78 pieces into a premium layout, highlighting the motor, the bits, and the built-in LED.",
        images: [
          { src: "/assets/portfolio/kazvo screw set 78/main image.png", label: "Hero Image" },
          { src: "/assets/portfolio/kazvo screw set 78/2.png", label: "Premium Build" },
          { src: "/assets/portfolio/kazvo screw set 78/3.png", label: "LED Work Light" },
          { src: "/assets/portfolio/kazvo screw set 78/4.png", label: "78-Piece Breakdown" },
          { src: "/assets/portfolio/kazvo screw set 78/5.png", label: "Dual Power Control" },
          { src: "/assets/portfolio/kazvo screw set 78/6.png", label: "Precision Bits" },
        ],
      },
    },
    gallery: [
      { src: "/assets/portfolio/kazvo screw set 78/main image.png", label: "Hero Image" },
      { src: "/assets/portfolio/kazvo screw set 78/2.png", label: "Premium Build" },
      { src: "/assets/portfolio/kazvo screw set 78/3.png", label: "LED Work Light" },
      { src: "/assets/portfolio/kazvo screw set 78/4.png", label: "78-Piece Breakdown" },
      { src: "/assets/portfolio/kazvo screw set 78/5.png", label: "Dual Power" },
      { src: "/assets/portfolio/kazvo screw set 78/6.png", label: "Precision Bits" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+75%" },
      { label: "CTR Growth", value: "+40%" },
      { label: "Perceived Value", value: "Premium" },
      { label: "Add to Cart", value: "+50%" },
    ],
    testimonial: {
      quote: "Organizing 78 bits into a single image was a nightmare for us, but the new listing images make everything look incredibly sleek and easy to understand.",
      author: "David L.",
      role: "CEO, Kazvo",
    },
  },
  /* ─── LISTING IMAGES (CORE VITALITY) ─── */
  {
    id: "li-06",
    category: "Listing Images",
    niche: "Health & Supplements",
    brandName: "Core Vitality",
    outcome: "+130% Sales",
    badge: { value: "+130%", label: "Sales Lift" },
    tags: ["3D Pill Renders", "Bio-Availability", "Scientific Breakdown"],
    services: ["Listing Images"],
    materials: ["Premium Formulations", "Science-Backed"],
    src: "/assets/portfolio/core vitality suppliments/main image.png",
    isDark: true,
    timeline: "12 Days",
    challenge: "Core Vitality formulated a cutting-edge, dual-phase supplement with high bio-availability, but their product simply looked like another generic bottle of pills on Amazon. They needed to visually communicate the advanced science inside the capsule.",
    solution: "We engineered a cinematic, science-focused visual system using highly detailed 3D renders of the capsules. By visualizing the 'dual-phase activation' and 'bio-availability' with dynamic glowing effects and floating particles, we instantly elevated the brand's perceived authority and premium quality.",
    serviceDetails: {
      "Listing Images": {
        description: "A 10-image deep-dive into the science of the supplement, featuring 3D rendered capsules, ingredient breakdowns, and lifestyle integration.",
        images: [
          { src: "/assets/portfolio/core vitality suppliments/main image.png", label: "Hero Image" },
          { src: "/assets/portfolio/core vitality suppliments/2.png", label: "Bottle Presentation" },
          { src: "/assets/portfolio/core vitality suppliments/3.png", label: "Premium Packaging" },
          { src: "/assets/portfolio/core vitality suppliments/4.png", label: "Bio-Availability" },
          { src: "/assets/portfolio/core vitality suppliments/5.png", label: "Active Lifestyle" },
          { src: "/assets/portfolio/core vitality suppliments/6.png", label: "Dual-Phase Activation" },
          { src: "/assets/portfolio/core vitality suppliments/7.png", label: "3D Capsule Render" },
          { src: "/assets/portfolio/core vitality suppliments/8.png", label: "Ingredient Synergy" },
          { src: "/assets/portfolio/core vitality suppliments/9.png", label: "Scientific Authority" },
          { src: "/assets/portfolio/core vitality suppliments/10.png", label: "Core Benefits" },
        ],
      },
    },
    gallery: [
      { src: "/assets/portfolio/core vitality suppliments/main image.png", label: "Hero Image" },
      { src: "/assets/portfolio/core vitality suppliments/4.png", label: "Bio-Availability" },
      { src: "/assets/portfolio/core vitality suppliments/6.png", label: "Dual-Phase" },
      { src: "/assets/portfolio/core vitality suppliments/7.png", label: "3D Render" },
      { src: "/assets/portfolio/core vitality suppliments/10.png", label: "Benefits" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+130%" },
      { label: "CVR Growth", value: "+85%" },
      { label: "Trust Factor", value: "High" },
      { label: "Add to Cart", value: "+110%" },
    ],
    testimonial: {
      quote: "The 3D capsule renders completely changed the game for us. Customers can literally 'see' the science now, and our conversion rates have more than doubled.",
      author: "Dr. Elena R.",
      role: "Formulator, Core Vitality",
    },
  },
];

/* ═══════════════════════════════════════════════
   FILTER CONFIG
   ═══════════════════════════════════════════════ */
export const FILTERS = [
  { key: "all",                label: "All Work",           icon: "LayoutGrid",  color: "bg-zinc-900 text-white"   },
  { key: "Listing Images",     label: "Listing Images",     icon: "Camera",      color: "bg-orange-500 text-white" },
  { key: "A+ Content",         label: "A+ Content",         icon: "Layers",      color: "bg-orange-500 text-white" },
  { key: "Main Image CTR",     label: "Main Image CTR",     icon: "Search",      color: "bg-orange-500 text-white" },
  // { key: "Brand Story",        label: "Brand Story",        icon: "BookOpen",    color: "bg-orange-500 text-white" },
  // { key: "Brand Store",        label: "Brand Store",        icon: "Store",       color: "bg-orange-500 text-white" },
  { key: "Full Brand Package", label: "Full Brand Package", icon: "Sparkles",    color: "bg-zinc-900 text-white"   },
];

/* ─── Stats per category ─── */
export const FILTER_STATS = {
  all:                  { count: 4, metric: "20+ brands transformed", sub: "across all creative services" },
  "Listing Images":     { count: 1,  metric: "+85% avg BSR growth",    sub: "across listing image projects" },
  "A+ Content":         { count: 1,  metric: "+50% avg CVR lift",      sub: "from premium A+ content"       },
  "Main Image CTR":     { count: 1,  metric: "+40% avg click rate",    sub: "from main image optimisation"  },
  "Brand Story":        { count: 0,  metric: "+32% avg dwell time",    sub: "on brand story implementations" },
  "Brand Store":        { count: 0,  metric: "+45% avg storefront CTR",sub: "on brand store builds"          },
  "Full Brand Package": { count: 1,  metric: "+660% peak revenue lift",sub: "on complete brand builds"       },
};

/* ═══════════════════════════════════════════════
   MATERIAL FILTER
   ═══════════════════════════════════════════════ */
export const MATERIALS = ["All Materials", "Plastic", "Steel", "Glass", "Wood", "Cardboard"];

/* ═══════════════════════════════════════════════
   SERVICE DESCRIPTIONS — for detail page
   ═══════════════════════════════════════════════ */
export const SERVICE_INFO = {
  "Listing Images": {
    description: "High-converting secondary images optimized for mobile scroll behavior. Includes infographics, lifestyle shots, size charts, and comparison visuals.",
    color: "#f97316",
  },
  "A+ Content": {
    description: "Premium A+ Content modules designed to increase scroll depth, communicate value, and lift conversion rates through visual storytelling.",
    color: "#f97316",
  },
  "Brand Story": {
    description: "Compelling brand narratives that build trust, increase dwell time, and create emotional connections with potential customers.",
    color: "#f97316",
  },
  "Brand Store": {
    description: "Multi-page Amazon Brand Stores with category navigation, video headers, and curated collections that drive cross-selling.",
    color: "#f97316",
  },
  "Main Image CTR": {
    description: "Systematic main image testing and optimization to maximize click-through rate from search results.",
    color: "#f97316",
  },
};

/* Helper: get icon component by name */
export function getFilterIcon(iconName, size = 13) {
  const icons = { LayoutGrid, Camera, Layers, BookOpen, Store, Search, Sparkles };
  const Icon = icons[iconName];
  return Icon ? Icon : LayoutGrid;
}
