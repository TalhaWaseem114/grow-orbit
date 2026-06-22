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
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Premium Ingredients"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872013/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.jpg",
    isDark: false,
    timeline: "14 Days",
    challenge: "Lumina Bites had delicious, high-quality cookies, but their product images didn't convey the premium taste and texture. They needed visuals that highlighted the quality and crunch.",
    solution: "We created a full suite of listing images that showcased the cookies in lifestyle settings, highlighted the premium ingredients, and used engaging typography to emphasize the texture and taste. Optimized specifically for mobile browsing.",
    serviceDetails: {
      "Listing Images": {
        description: "We created a full suite of listing images that showcased the cookies in lifestyle settings, highlighted the premium ingredients, and used engaging typography.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872013/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872004/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/2.jpg", label: "Hero Detail" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872005/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/3.jpg", label: "Ingredients" }
        ]
      },
      "Main Image CTR": {
        description: "Sleek, high-contrast cookies packaging render designed to stand out in the Amazon search grid and maximize CTR.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872013/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872013/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      }
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872004/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/2.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872005/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/3.jpg", label: "Ingredient Callout" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872007/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/4.jpg", label: "Texture Shot" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872008/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/5.jpg", label: "Taste Profile" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872009/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/6.jpg", label: "Lifestyle Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872010/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/7.jpg", label: "Social Proof" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872012/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/8.jpg", label: "Comparison" },
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
    services: ["Listing Images", "A+ Content", "Main Image CTR"],
    materials: ["Premium Alloy", "Rubber Seal"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg",
    isDark: true,
    timeline: "12 Days",
    challenge: "Nexa engineered a premium, durable storage container for everyday carry, but their original photography made it look like standard cheap plastic. Customers couldn't understand the high-end build quality, the advanced rubber seal, or the optimal capacity.",
    solution: "We designed a highly technical set of listing images using 3D renders and exploded views to showcase the high-grade materials and internal mechanisms. By highlighting features like the advanced rubber seal and pocket-sized utility, we positioned Nexa as a premium lifestyle accessory.",
    serviceDetails: {
      "Listing Images": {
        description: "We designed a highly technical set of listing images using 3D renders and exploded views to showcase the high-grade materials and internal mechanisms.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872015/grow_orbit_portfolio/assets/portfolio/nexa_pouches/2.jpg", label: "Suite Layout" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872016/grow_orbit_portfolio/assets/portfolio/nexa_pouches/3.jpg", label: "High-Grade Materials" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872017/grow_orbit_portfolio/assets/portfolio/nexa_pouches/4.jpg", label: "Built to Last" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872019/grow_orbit_portfolio/assets/portfolio/nexa_pouches/5.jpg", label: "Advanced Rubber Seal" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872020/grow_orbit_portfolio/assets/portfolio/nexa_pouches/6.jpg", label: "Optimal Capacity" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872021/grow_orbit_portfolio/assets/portfolio/nexa_pouches/7.jpg", label: "Pocket-Sized Utility" },
        ],
      },
      "A+ Content": {
        description: "Premium A+ Content modules that expand on the brand's technical superiority and lifestyle integration, using high-contrast dark themes to maximize perceived value.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872022/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.jpg", label: "Brand Header" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872027/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-4.jpg", label: "Precision Engineering" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872031/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-6.jpg", label: "Premium Aluminum" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872029/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-5.jpg", label: "Air-Tight Seal" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872032/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-7.jpg", label: "Durability Module" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872033/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-8.jpg", label: "Travel Module" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872024/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-2.jpg", label: "Lifestyle Module" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872025/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-3.jpg", label: "Technical Comparison" },
        ],
      },
      "Main Image CTR": {
        description: "Technical 3D render main image emphasizing premium alloys and capacity to maximize CTR.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "/images/before/nexa_before.png", label: "Original Photo (Before)" }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872034/grow_orbit_portfolio/assets/portfolio/nexa_pouches/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872015/grow_orbit_portfolio/assets/portfolio/nexa_pouches/2.jpg", label: "Suite Layout" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872016/grow_orbit_portfolio/assets/portfolio/nexa_pouches/3.jpg", label: "High-Grade Materials" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872017/grow_orbit_portfolio/assets/portfolio/nexa_pouches/4.jpg", label: "Built to Last" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872019/grow_orbit_portfolio/assets/portfolio/nexa_pouches/5.jpg", label: "Advanced Rubber Seal" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872020/grow_orbit_portfolio/assets/portfolio/nexa_pouches/6.jpg", label: "Optimal Capacity" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872021/grow_orbit_portfolio/assets/portfolio/nexa_pouches/7.jpg", label: "Pocket-Sized Utility" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872022/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.jpg", label: "A+ Brand Header" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872024/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-2.jpg", label: "A+ Lifestyle" },
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
    services: ["Listing Images", "A+ Content", "Main Image CTR"],
    materials: ["Performance Motors", "Permanent Filters"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg",
    isDark: false,
    timeline: "15 Days",
    challenge: "Kazvo had a powerful 22,000Pa 4-in-1 vacuum, but their original imagery failed to communicate the sheer suction power and versatility. Customers couldn't distinguish it from weaker, single-purpose alternatives.",
    solution: "We designed a high-impact, technology-focused visual suite. By visualizing the 22,000Pa suction power and highlighting the 4-in-1 versatility (vacuum, blower, inflator), we positioned Kazvo as the ultimate premium cleaning tool for home and auto.",
    serviceDetails: {
      "Listing Images": {
        description: "A dark, premium set of listing images emphasizing sheer power, pure air filtration, and multi-purpose functionality.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872036/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/2.jpg", label: "Power Overview" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872037/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/3.jpg", label: "22,000Pa Domination" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872038/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/4.jpg", label: "Accessories Suite" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872040/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/5.jpg", label: "Professional Blower" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872041/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/6.jpg", label: "Ultimate Suction" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872043/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/7.jpg", label: "4-in-1 Versatility" },
        ],
      },
      "A+ Content": {
        description: "Cinematic A+ Content modules that walk the customer through every advanced feature, from the permanent filter to the high-speed motor.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872045/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-2.jpg", label: "Kazvo Prime Swift Hero" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872050/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-6.jpg", label: "Ultimate Performance Gift" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872048/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-4.jpg", label: "4-in-1 Versatility" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872049/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-5.jpg", label: "Multi-Dynamic Performance" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872053/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-8.jpg", label: "Master-Level Car Detailing" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872047/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-3.jpg", label: "Advanced Cyclonic Filtration" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872044/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-1.jpg", label: "90,000 RPM Motor Tech" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872052/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-7.jpg", label: "Compact Storage & Bag" },
        ],
      },
      "Main Image CTR": {
        description: "Optimized high-suction action render designed to capture consumer attention and maximize CTR against competitors.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "/images/before/vacuum_before.png", label: "Original Photo (Before)" }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872054/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872036/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/2.jpg", label: "Power Overview" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872037/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/3.jpg", label: "22,000Pa Domination" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872038/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/4.jpg", label: "Accessories Suite" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872040/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/5.jpg", label: "Professional Blower" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872041/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/6.jpg", label: "Ultimate Suction" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872043/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/7.jpg", label: "4-in-1 Versatility" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872044/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-1.jpg", label: "A+ Brand Header" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872045/grow_orbit_portfolio/assets/portfolio/kazvo_vacume_cleaner/aplus-2.jpg", label: "Motor Technology" },
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
    services: ["Listing Images", "A+ Content", "Main Image CTR"],
    materials: ["Premium Aluminum", "LED Display"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg",
    isDark: true,
    timeline: "14 Days",
    challenge: "Kazvo developed a multi-functional tire inflator that also serves as a high-capacity power bank and emergency flashlight. However, the existing imagery looked generic and failed to convey the reliability, speed, and premium build quality needed for emergency automotive tools.",
    solution: "We created a sleek, high-contrast visual system that highlights the intelligent display, 4-in-1 versatility, and rapid inflation capabilities. The dark, cinematic styling reinforces trust and durability, positioning Kazvo as a premium must-have automotive accessory.",
    serviceDetails: {
      "Listing Images": {
        description: "A dark, premium set of listing images emphasizing rapid inflation, emergency readiness, and the intelligent LED display.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872056/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/2.jpg", label: "Smart Display" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872057/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/3.jpg", label: "Driving Safety" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872058/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/4.jpg", label: "Power Bank Feature" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872060/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/5.jpg", label: "Emergency Flashlight" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872061/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/6.jpg", label: "Compact Design" },
        ],
      },
      "A+ Content": {
        description: "A highly detailed, 10-module A+ layout that breaks down every use-case from bicycles to heavy-duty vehicles, alongside safety certifications.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872063/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-1.jpg", label: "Hero Banner" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872065/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-2.jpg", label: "Motorcycle Use" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872066/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-3.jpg", label: "Bicycle Use" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872068/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-4.jpg", label: "Sports Equipment" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872069/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-5.jpg", label: "Smart Chip Tech" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872070/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-6.jpg", label: "Emergency LED" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872071/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-7.jpg", label: "Power Bank" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872073/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-8.jpg", label: "Heat Dissipation" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872074/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-9.jpg", label: "Premium Build" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872064/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-10.jpg", label: "What's Included" },
        ],
      },
      "Main Image CTR": {
        description: "High-contrast render displaying multi-functional capability and smart LED settings to drive maximum CTR.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "/images/before/tire_before.png", label: "Original Photo (Before)" }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872075/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872056/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/2.jpg", label: "Smart Display" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872057/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/3.jpg", label: "Driving Safety" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872058/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/4.jpg", label: "Power Bank" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872060/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/5.jpg", label: "Flashlight" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872063/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-1.jpg", label: "A+ Hero" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872069/grow_orbit_portfolio/assets/portfolio/kazvo_tire_inflator/aplus-5.jpg", label: "A+ Smart Tech" },
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
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Precision Steel", "Aluminum Alloy"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872083/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/main_image.jpg",
    isDark: true,
    timeline: "10 Days",
    challenge: "Kazvo created a high-precision, 78-piece electric screwdriver set with dual power control and LED work lights. Their existing imagery felt cluttered and failed to emphasize the premium build quality or the sheer number of bits included.",
    solution: "We designed a sleek, technology-driven visual suite that cleanly organized all 78 pieces into an easy-to-understand infographic. By using a dark, cinematic theme with neon-blue accents, we highlighted the dual power control and LED features, giving the product a professional, high-end feel.",
    serviceDetails: {
      "Listing Images": {
        description: "A comprehensive set of listing images that organize 78 pieces into a premium layout, highlighting the motor, the bits, and the built-in LED.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872083/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872076/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/2.jpg", label: "Premium Build" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872077/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/3.jpg", label: "LED Work Light" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872079/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/4.jpg", label: "78-Piece Breakdown" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872080/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/5.jpg", label: "Dual Power Control" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872081/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/6.jpg", label: "Precision Bits" },
        ],
      },
      "Main Image CTR": {
        description: "Sleek 3D render neatly presenting all bits and tool highlights to instantly win clicks in search results.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872083/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "/images/before/screws_before.png", label: "Original Photo (Before)" }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872083/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872076/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/2.jpg", label: "Premium Build" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872077/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/3.jpg", label: "LED Work Light" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872079/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/4.jpg", label: "78-Piece Breakdown" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872080/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/5.jpg", label: "Dual Power" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872081/grow_orbit_portfolio/assets/portfolio/kazvo_screw_set_78/6.jpg", label: "Precision Bits" },
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
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Premium Formulations", "Science-Backed"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872097/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.jpg",
    isDark: false,
    timeline: "12 Days",
    challenge: "Core Vitality formulated a cutting-edge, dual-phase supplement with high bio-availability, but their product simply looked like another generic bottle of pills on Amazon. They needed to visually communicate the advanced science inside the capsule.",
    solution: "We engineered a cinematic, science-focused visual system using highly detailed 3D renders of the capsules. By visualizing the 'dual-phase activation' and 'bio-availability' with dynamic glowing effects and floating particles, we instantly elevated the brand's perceived authority and premium quality.",
    serviceDetails: {
      "Listing Images": {
        description: "A 10-image deep-dive into the science of the supplement, featuring 3D rendered capsules, ingredient breakdowns, and lifestyle integration.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872097/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872085/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/2.jpg", label: "Bottle Presentation" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872086/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/3.jpg", label: "Premium Packaging" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872088/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/4.jpg", label: "Bio-Availability" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872089/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/5.jpg", label: "Active Lifestyle" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872091/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/6.jpg", label: "Dual-Phase Activation" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872093/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/7.jpg", label: "3D Capsule Render" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872094/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/8.jpg", label: "Ingredient Synergy" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872095/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/9.jpg", label: "Scientific Authority" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872084/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/10.jpg", label: "Core Benefits" },
        ],
      },
      "Main Image CTR": {
        description: "High-end 3D pill and bottle render emphasizing the active formula and scientific efficacy to boost CTR.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872097/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "/images/before/supplements_before.png", label: "Original Photo (Before)" }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872097/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872088/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/4.jpg", label: "Bio-Availability" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872091/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/6.jpg", label: "Dual-Phase" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872093/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/7.jpg", label: "3D Render" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872084/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/10.jpg", label: "Benefits" },
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
  /* ─── LISTING IMAGES & A+ (NEOGRID HAND GRIP) ─── */
  {
    id: "li-07",
    category: "Listing Images",
    niche: "Fitness & Sports",
    brandName: "Neogrid",
    outcome: "+115% Sales",
    badge: { value: "+115%", label: "Sales Lift" },
    tags: ["Action Shots", "Technical Breakdown", "High Contrast"],
    services: ["Listing Images", "A+ Content", "Main Image CTR"],
    materials: ["Premium Metal", "Anti-Slip Coating"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872117/grow_orbit_portfolio/neogrid_hand_grip/main_image.jpg",
    isDark: true,
    timeline: "14 Days",
    challenge: "Neogrid developed a high-end, adjustable hand grip strengthener with smart tracking and premium materials. However, their existing imagery looked like generic fitness equipment, failing to convey the advanced engineering and professional quality.",
    solution: "We created a sleek, high-contrast set of listing images and A+ content that highlights the premium build, adjustable resistance, and ergonomic design. The dark, cinematic styling reinforces the product's professional-grade quality.",
    serviceDetails: {
      "Listing Images": {
        description: "A dark, premium set of listing images emphasizing the adjustable resistance, ergonomic design, and premium build quality.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872117/grow_orbit_portfolio/neogrid_hand_grip/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872098/grow_orbit_portfolio/neogrid_hand_grip/2.jpg", label: "Adjustable Resistance" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872099/grow_orbit_portfolio/neogrid_hand_grip/3.jpg", label: "Ergonomic Design" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872101/grow_orbit_portfolio/neogrid_hand_grip/4.jpg", label: "Premium Materials" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872102/grow_orbit_portfolio/neogrid_hand_grip/5.jpg", label: "Durability Test" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872103/grow_orbit_portfolio/neogrid_hand_grip/6.jpg", label: "Usage Example" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872105/grow_orbit_portfolio/neogrid_hand_grip/7.jpg", label: "Smart Features" },
        ],
      },
      "A+ Content": {
        description: "Cinematic A+ Content modules that walk the customer through every advanced feature, from the smart counter to the high-strength spring.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872106/grow_orbit_portfolio/neogrid_hand_grip/aplus-1.jpg", label: "Brand Header" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872108/grow_orbit_portfolio/neogrid_hand_grip/aplus-2.jpg", label: "Feature Deep Dive" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872109/grow_orbit_portfolio/neogrid_hand_grip/aplus-3.jpg", label: "Smart Tracking" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872110/grow_orbit_portfolio/neogrid_hand_grip/aplus-4.jpg", label: "Workout Guide" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872112/grow_orbit_portfolio/neogrid_hand_grip/aplus-5.jpg", label: "Grip Comparison" },
          { src: "https://res.cloudinary.com/grow_orbit_portfolio/neogrid_hand_grip/aplus-6.jpg", label: "Material Breakdown" },
          { src: "https://res.cloudinary.com/grow_orbit_portfolio/neogrid_hand_grip/aplus-7.jpg", label: "Action Shot" },
          { src: "https://res.cloudinary.com/grow_orbit_portfolio/neogrid_hand_grip/aplus-8.jpg", label: "Product Summary" },
        ],
      },
      "Main Image CTR": {
        description: "High-contrast product render highlighting the adjustable resistance mechanism to maximize search visibility and CTR.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872117/grow_orbit_portfolio/neogrid_hand_grip/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872117/grow_orbit_portfolio/neogrid_hand_grip/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872117/grow_orbit_portfolio/neogrid_hand_grip/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872098/grow_orbit_portfolio/neogrid_hand_grip/2.jpg", label: "Adjustable Resistance" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872099/grow_orbit_portfolio/neogrid_hand_grip/3.jpg", label: "Ergonomic Design" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872101/grow_orbit_portfolio/neogrid_hand_grip/4.jpg", label: "Premium Materials" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872102/grow_orbit_portfolio/neogrid_hand_grip/5.jpg", label: "Durability Test" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872103/grow_orbit_portfolio/neogrid_hand_grip/6.jpg", label: "Usage Example" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872105/grow_orbit_portfolio/neogrid_hand_grip/7.jpg", label: "Smart Features" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872106/grow_orbit_portfolio/neogrid_hand_grip/aplus-1.jpg", label: "A+ Brand Header" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872108/grow_orbit_portfolio/neogrid_hand_grip/aplus-2.jpg", label: "A+ Feature Dive" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+115%" },
      { label: "ROAS", value: "4.1x" },
      { label: "Add to Cart", value: "+80%" },
      { label: "Session Duration", value: "+35%" },
    ],
    testimonial: {
      quote: "The new listing images finally show off the build quality of our grip strengthener. Customers love the sleek aesthetic.",
      author: "James M.",
      role: "Co-Founder, Neogrid",
    },
  },
  /* ─── LISTING IMAGES & A+ (KAZVO NOSE TRIMMER) ─── */
  {
    id: "li-08",
    category: "Listing Images",
    niche: "Health & Personal Care",
    brandName: "Kazvo",
    outcome: "+145% Sales",
    badge: { value: "+145%", label: "Sales Lift" },
    tags: ["Premium Aesthetic", "Feature Highlights", "Lifestyle"],
    services: ["Listing Images", "A+ Content", "Main Image CTR"],
    materials: ["Precision Blades", "Waterproof Body"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg",
    isDark: false,
    timeline: "12 Days",
    challenge: "Kazvo developed a premium, ultra-quiet nose and ear hair trimmer with a 360-degree precision blade system. The existing imagery looked cheap and failed to highlight the advanced engineering, making it blend in with low-end competitors.",
    solution: "We designed a high-end, sleek visual suite that highlights the precision engineering, the waterproof design, and the ultra-quiet motor. By using clean, modern lifestyle photography and sharp infographics, we elevated the product's perceived value and built instant trust.",
    serviceDetails: {
      "Listing Images": {
        description: "A comprehensive set of listing images showcasing the 360-degree blade, the compact design, and the hassle-free maintenance.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872118/grow_orbit_portfolio/kazvo_nose_trimmer/2.jpg", label: "Precision Breakdown" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872120/grow_orbit_portfolio/kazvo_nose_trimmer/3.jpg", label: "Lifestyle Integration" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872121/grow_orbit_portfolio/kazvo_nose_trimmer/4.jpg", label: "Ultra-Quiet Motor" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872122/grow_orbit_portfolio/kazvo_nose_trimmer/5.jpg", label: "USB-C Charging" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872124/grow_orbit_portfolio/kazvo_nose_trimmer/6.jpg", label: "360 Blade System" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872125/grow_orbit_portfolio/kazvo_nose_trimmer/7.jpg", label: "Hassle-Free Maintenance" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872126/grow_orbit_portfolio/kazvo_nose_trimmer/8.jpg", label: "Accessories Suite" },
        ],
      },
      "A+ Content": {
        description: "Premium A+ Content modules that expand on the brand's sophisticated aesthetic and technical superiority.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872128/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-1.jpg", label: "Brand Header" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872129/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-2.jpg", label: "Elegance & Detail" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872130/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-3.jpg", label: "Total Hygiene" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872131/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-4.jpg", label: "High-Speed Precision" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872133/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-5.jpg", label: "Ergonomic Design" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872134/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-6.jpg", label: "Powerful Battery" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872135/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-7.jpg", label: "Ultra-Quiet Performance" },
        ],
      },
      "Main Image CTR": {
        description: "Sleek vanity render presenting the 360-degree blade and premium materials to win the search click.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872137/grow_orbit_portfolio/kazvo_nose_trimmer/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872124/grow_orbit_portfolio/kazvo_nose_trimmer/6.jpg", label: "360 Blade System" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872125/grow_orbit_portfolio/kazvo_nose_trimmer/7.jpg", label: "Hassle-Free Maintenance" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872121/grow_orbit_portfolio/kazvo_nose_trimmer/4.jpg", label: "Ultra-Quiet Motor" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872122/grow_orbit_portfolio/kazvo_nose_trimmer/5.jpg", label: "USB-C Charging" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872128/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-1.jpg", label: "A+ Brand Header" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872131/grow_orbit_portfolio/kazvo_nose_trimmer/aplus-4.jpg", label: "A+ Precision" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+145%" },
      { label: "CVR Growth", value: "+75%" },
      { label: "Perceived Value", value: "Premium" },
      { label: "Return Rate", value: "-12%" },
    ],
    testimonial: {
      quote: "The new visuals transformed our product from a basic utility item into a sophisticated grooming tool. Our sales exploded.",
      author: "David L.",
      role: "CEO, Kazvo",
    },
  },
  /* ─── LISTING IMAGES (MEOW-MASTER) ─── */
  {
    id: "li-09",
    category: "Listing Images",
    niche: "Pet Supplies",
    brandName: "Meow-Master",
    outcome: "+110% Sales",
    badge: { value: "+110%", label: "Sales Lift" },
    tags: ["Infographics", "Health Benefits", "Vet Approved"],
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Real Salmon", "No Artificial Fillers"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872148/grow_orbit_portfolio/meow_master/main_image.jpg",
    isDark: false,
    timeline: "10 Days",
    challenge: "Meow-Master formulated a premium, vet-approved cat food using real salmon and zero artificial fillers. However, their original imagery looked like generic, low-tier kibble. Customers couldn't see the nutritional value, the high-quality ingredients, or the visible health benefits.",
    solution: "We designed a bright, engaging visual suite that highlights the premium ingredients, the vet-approved formula, and the visible 60-day transformation. By using clear infographics, we communicated the exact health benefits (immune support, coat health) and elevated the perceived value of the brand.",
    serviceDetails: {
      "Listing Images": {
        description: "A bright, clean set of listing images emphasizing the premium salmon ingredients, vet approval, and a visible 60-day health transformation.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872148/grow_orbit_portfolio/meow_master/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872138/grow_orbit_portfolio/meow_master/Artboard_1_6.jpg", label: "Product Presentation" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872146/grow_orbit_portfolio/meow_master/Artboard_7_5.jpg", label: "Premium Ingredients" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872144/grow_orbit_portfolio/meow_master/Artboard_6_5.jpg", label: "Simple Routine" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872142/grow_orbit_portfolio/meow_master/Artboard_5_6.jpg", label: "Vet Approved" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872141/grow_orbit_portfolio/meow_master/Artboard_4_6.jpg", label: "Irresistible Kibble" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872140/grow_orbit_portfolio/meow_master/Artboard_3_6.jpg", label: "Visible Results" },
        ],
      },
      "Main Image CTR": {
        description: "Vibrant packaging presentation emphasizing real salmon and high nutritional value to attract pet owners.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872148/grow_orbit_portfolio/meow_master/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872148/grow_orbit_portfolio/meow_master/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872148/grow_orbit_portfolio/meow_master/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872138/grow_orbit_portfolio/meow_master/Artboard_1_6.jpg", label: "Product Presentation" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872146/grow_orbit_portfolio/meow_master/Artboard_7_5.jpg", label: "Premium Ingredients" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872144/grow_orbit_portfolio/meow_master/Artboard_6_5.jpg", label: "Simple Routine" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872142/grow_orbit_portfolio/meow_master/Artboard_5_6.jpg", label: "Vet Approved" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872141/grow_orbit_portfolio/meow_master/Artboard_4_6.jpg", label: "Irresistible Kibble" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872140/grow_orbit_portfolio/meow_master/Artboard_3_6.jpg", label: "Visible Results" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+110%" },
      { label: "CVR Growth", value: "+65%" },
      { label: "Trust Factor", value: "High" },
      { label: "CTR Increase", value: "+45%" },
    ],
    testimonial: {
      quote: "The new listing images perfectly communicate the health benefits of our Vitality Blend. Pet owners finally understand why our food is better, and the sales numbers show it.",
      author: "Sarah M.",
      role: "Founder, Meow-Master",
    },
  },
  /* ─── LISTING IMAGES (PAW-FESSIONAL SHINE) ─── */
  {
    id: "li-10",
    category: "Listing Images",
    niche: "Pet Grooming",
    brandName: "Paw-fessional Shine",
    outcome: "+135% Sales",
    badge: { value: "+135%", label: "Sales Lift" },
    tags: ["Lifestyle Focus", "Problem & Solution", "Waterless Routine"],
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Alojoba Complex", "Professional Foam"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872160/grow_orbit_portfolio/paw_fessional_shine/main_image.jpg",
    isDark: true,
    timeline: "12 Days",
    challenge: "Paw-fessional Shine created a premium, waterless dog grooming foam with high-end ingredients like Alojoba complex. However, their original imagery failed to communicate the ease of use or the stress-free experience for the pet. Customers were hesitant to switch from traditional water baths.",
    solution: "We designed a bright, engaging visual suite that highlights the 'waterless revolution.' By showcasing the simple 3-minute routine and the rinse-free comfort through clear infographics and happy pet lifestyle shots, we built instant trust and conveyed the product's premium value.",
    serviceDetails: {
      "Listing Images": {
        description: "A comprehensive listing image suite that educates the customer on the waterless routine, highlights the premium ingredients, and builds trust with a 90-day guarantee.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872160/grow_orbit_portfolio/paw_fessional_shine/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872153/grow_orbit_portfolio/paw_fessional_shine/Artboard_4_6.jpg", label: "Stress-Free Promise" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872151/grow_orbit_portfolio/paw_fessional_shine/Artboard_2_6.jpg", label: "Rinse-Free Comfort" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872157/grow_orbit_portfolio/paw_fessional_shine/Artboard_8_3.jpg", label: "3-Minute Routine" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872149/grow_orbit_portfolio/paw_fessional_shine/Artboard_1_6.jpg", label: "Premium Ingredients" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872155/grow_orbit_portfolio/paw_fessional_shine/Artboard_6_5.jpg", label: "Protective Formula" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872156/grow_orbit_portfolio/paw_fessional_shine/Artboard_7_5.jpg", label: "Trusted By Pros" },
        ],
      },
      "Main Image CTR": {
        description: "Clean, premium bottle render showcasing the waterless foam texture to capture search interest.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872160/grow_orbit_portfolio/paw_fessional_shine/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872160/grow_orbit_portfolio/paw_fessional_shine/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872160/grow_orbit_portfolio/paw_fessional_shine/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872153/grow_orbit_portfolio/paw_fessional_shine/Artboard_4_6.jpg", label: "Stress-Free Promise" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872151/grow_orbit_portfolio/paw_fessional_shine/Artboard_2_6.jpg", label: "Rinse-Free Comfort" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872157/grow_orbit_portfolio/paw_fessional_shine/Artboard_8_3.jpg", label: "3-Minute Routine" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872149/grow_orbit_portfolio/paw_fessional_shine/Artboard_1_6.jpg", label: "Premium Ingredients" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872152/grow_orbit_portfolio/paw_fessional_shine/Artboard_3_6.jpg", label: "Premium Foam" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872155/grow_orbit_portfolio/paw_fessional_shine/Artboard_6_5.jpg", label: "Protective Formula" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872156/grow_orbit_portfolio/paw_fessional_shine/Artboard_7_5.jpg", label: "Trusted By Pros" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872158/grow_orbit_portfolio/paw_fessional_shine/Artboard_9.jpg", label: "Packaging" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+135%" },
      { label: "CVR Growth", value: "+70%" },
      { label: "Add to Cart", value: "+85%" },
      { label: "Perceived Value", value: "Premium" },
    ],
    testimonial: {
      quote: "The new listing images completely transformed how customers perceive our waterless foam. The visuals make the process look so easy and stress-free, and our conversion rates have skyrocketed.",
      author: "David M.",
      role: "Founder, Paw-fessional Shine",
    },
  },
  /* ─── LISTING IMAGES (LUMINOS COFFEE MAKER) ─── */
  {
    id: "li-11",
    category: "Listing Images",
    niche: "Kitchen Appliances / Smart Home",
    brandName: "Luminos",
    outcome: "+160% Conversion",
    badge: { value: "+160%", label: "Conversion Lift" },
    tags: ["Appliance Visualization", "Lifestyle Context", "Feature Callouts"],
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Smart App Control", "Precision Temp Control", "Adjustable Brew Strength"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872170/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/main_image.jpg",
    isDark: false,
    timeline: "14 Days",
    challenge: "The smart coffee maker market is highly saturated with generic products. Buyers care about convenience, smart features, and precision, but Luminos' old listing imagery just looked like another basic coffee pot, completely hiding its advanced app control and brewing capabilities.",
    solution: "We crafted a high-converting listing suite focused on the 'Morning Ritual'. We highlighted the smart app control, precision temperature, and adjustable brew strength using a mix of lifestyle imagery (showing relaxation and convenience) and clear, sleek infographics.",
    serviceDetails: {
      "Listing Images": {
        description: "A visually striking listing image suite that highlights the smart features of the coffee maker and seamlessly integrates it into a premium lifestyle setting.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872170/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872167/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_6_5.jpg", label: "Control From Anywhere" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872168/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_7_5.jpg", label: "Morning Ritual" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872163/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_3_6.jpg", label: "Redefine Your Brew" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872166/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_5_6.jpg", label: "Smart Features" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872165/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_4_6.jpg", label: "Perfect Cup Every Time" },
        ],
      },
      "Main Image CTR": {
        description: "Elegant appliance render emphasizing smart controls and premium kitchen design to lift CTR.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872170/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872170/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872170/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872161/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_1_6.jpg", label: "Packaging" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872162/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_2_6.jpg", label: "Brand Logo" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872163/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_3_6.jpg", label: "Redefine Your Brew" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872165/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_4_6.jpg", label: "Perfect Cup Every Time" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872166/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_5_6.jpg", label: "Smart Features" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872167/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_6_5.jpg", label: "Control From Anywhere" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872168/grow_orbit_portfolio/assets/portfolio/luminos_coffee_maker/Artboard_7_5.jpg", label: "Morning Ritual" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+125%" },
      { label: "CVR Growth", value: "+160%" },
      { label: "Premium Feel", value: "High" },
      { label: "Click-Through", value: "+80%" },
    ],
    testimonial: {
      quote: "Grow Orbit finally managed to showcase our smart features properly. Customers get exactly what our coffee maker does before even reading the description, and our sales have never been better.",
      author: "Emily C.",
      role: "Marketing Director, Luminos",
    },
  },
  /* ─── LISTING IMAGES (CROWN CULINARY) ─── */
  {
    id: "li-12",
    category: "Listing Images",
    niche: "Kitchen & Dining",
    brandName: "Crown Culinary",
    outcome: "+85% Sales",
    badge: { value: "+85%", label: "Sales Lift" },
    tags: ["High-End Infographics", "Material Callouts", "Lifestyle"],
    services: ["Listing Images", "Main Image CTR"],
    materials: ["German Steel", "Walnut Wood"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872182/grow_orbit_portfolio/assets/portfolio/crown_knives/main_image.jpg",
    isDark: true,
    timeline: "14 Days",
    challenge: "Crown Culinary engineered a premium German high-carbon steel knife set with ergonomic walnut handles, but their original photography failed to communicate the build quality, material superiority, and balanced control, making it blend in with generic alternatives.",
    solution: "We designed a premium set of listing images and technical infographics highlighting the high-carbon steel, full tang construction, walnut handles, and slicing utility, establishing the brand as a luxurious culinary essential.",
    serviceDetails: {
      "Listing Images": {
        description: "A premium suite of listing images highlighting authentic craftsmanship, ergonomic design, and razor-sharp slicing precision.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872182/grow_orbit_portfolio/assets/portfolio/crown_knives/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872172/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_1.jpg", label: "Precision Engineering" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872173/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_2.jpg", label: "Material Infographics" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872175/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_3.jpg", label: "Perfect Balance" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872176/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_4_6.jpg", label: "Slicing & Dicing" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872177/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_6_5.jpg", label: "Perfection Lives Here" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872179/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_7_5.jpg", label: "Culinary Kingdom" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872180/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_8_3.jpg", label: "Superior Control" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872181/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_9.jpg", label: "Elevate Your Dishes" },
        ]
      },
      "Main Image CTR": {
        description: "Sleek render of German steel and walnut wood knives showcasing extreme sharpness and quality to drive clicks.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872182/grow_orbit_portfolio/assets/portfolio/crown_knives/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872182/grow_orbit_portfolio/assets/portfolio/crown_knives/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872182/grow_orbit_portfolio/assets/portfolio/crown_knives/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872172/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_1.jpg", label: "Precision" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872173/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_2.jpg", label: "Materials" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872175/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_3.jpg", label: "Craftsmanship" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872176/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_4_6.jpg", label: "Usage" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872180/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_8_3.jpg", label: "Control" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872181/grow_orbit_portfolio/assets/portfolio/crown_knives/artboard_9.jpg", label: "Dishes Presentation" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+85%" },
      { label: "CTR Growth", value: "+50%" },
      { label: "CVR Growth", value: "+30%" },
      { label: "Revenue", value: "$38K/mo" },
    ],
    testimonial: {
      quote: "The new listing images capture the exact build quality and design of our knives. Customers can feel the balance and craftsmanship before buying!",
      author: "William K.",
      role: "Founder, Crown Culinary",
    },
  },
  /* ─── LISTING IMAGES & A+ CONTENT (AETHERA) ─── */
  {
    id: "li-13",
    category: "Listing Images",
    niche: "Jewelry Care",
    brandName: "Aethera",
    outcome: "+120% Conversion",
    badge: { value: "+120%", label: "Conversion Lift" },
    tags: ["Tech Aesthetics", "Ultrasonic Waves", "Smart Timer"],
    services: ["Listing Images", "A+ Content", "Main Image CTR"],
    materials: ["Stainless Steel Tank", "ABS Premium Shell"],
    src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872204/grow_orbit_portfolio/assets/portfolio/aethera/main_image.jpg",
    isDark: true,
    timeline: "12 Days",
    challenge: "Aethera designed a sleek, high-frequency ultrasonic cleaner to restore the brilliance of jewelry, watches, and glasses. However, their standard white-background product shots failed to convey the premium technology, the sheer power of 45,000Hz waves, and the modern aesthetics of the device, making it look like cheap plastic medical equipment.",
    solution: "We engineered a dark, luxurious visual suite highlighting the 45,000Hz power, the spacious 750ml tank, and the intuitive smart timer. By placing the cleaner in high-end vanity and lifestyle contexts, we transformed the product into a premium tech-lifestyle accessory.",
    serviceDetails: {
      "Listing Images": {
        description: "A dark, premium set of listing images emphasizing the 45,000Hz ultrasonic wave power, 750ml spacious capacity, and smart timer functionalities.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872204/grow_orbit_portfolio/assets/portfolio/aethera/main_image.jpg", label: "Hero Image" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872193/grow_orbit_portfolio/assets/portfolio/aethera/listing_1.jpg", label: "Unmatched Versatility" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872195/grow_orbit_portfolio/assets/portfolio/aethera/listing_3.jpg", label: "Ultrasonic Waves Power" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872196/grow_orbit_portfolio/assets/portfolio/aethera/listing_4.jpg", label: "Visible Transformation" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872197/grow_orbit_portfolio/assets/portfolio/aethera/listing_5.jpg", label: "Simple Usage Steps" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872199/grow_orbit_portfolio/assets/portfolio/aethera/listing_6.jpg", label: "Intuitive Smart Timer" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872200/grow_orbit_portfolio/assets/portfolio/aethera/listing_7.jpg", label: "Spacious Tank Capacity" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872202/grow_orbit_portfolio/assets/portfolio/aethera/listing_8.jpg", label: "Luxury Lifestyle Integration" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872206/grow_orbit_portfolio/assets/portfolio/aethera/product_images.jpg", label: "Product Specification" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872192/grow_orbit_portfolio/assets/portfolio/aethera/brand_view.jpg", label: "The Aethera Promise" },
        ]
      },
      "A+ Content": {
        description: "High-contrast horizontal A+ Content modules showcasing the cleaner's utility, tech specs, and modern lifestyle integration.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872188/grow_orbit_portfolio/assets/portfolio/aethera/aplus_promise.jpg", label: "Aethera Promise" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872191/grow_orbit_portfolio/assets/portfolio/aethera/aplus_versatility.jpg", label: "Unmatched Versatility" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872186/grow_orbit_portfolio/assets/portfolio/aethera/aplus_power.jpg", label: "45,000Hz Ultrasonic Power" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872184/grow_orbit_portfolio/assets/portfolio/aethera/aplus_how_it_works.jpg", label: "How It Works" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872189/grow_orbit_portfolio/assets/portfolio/aethera/aplus_smart_timer.jpg", label: "Intuitive Smart Timer" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872190/grow_orbit_portfolio/assets/portfolio/aethera/aplus_spacious_tank.jpg", label: "Spacious 750ml Capacity" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872185/grow_orbit_portfolio/assets/portfolio/aethera/aplus_lasting_shine.jpg", label: "Invest in Lasting Shine" },
        ]
      },
      "Main Image CTR": {
        description: "Luxury vanity render highlighting the 45,000Hz ultrasonic wave capabilities to maximize CTR.",
        images: [
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872204/grow_orbit_portfolio/assets/portfolio/aethera/main_image.jpg", label: "Optimised Hero (After)" },
          { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872204/grow_orbit_portfolio/assets/portfolio/aethera/main_image.jpg", label: "Original Photo (Before)", isBeforeFilter: true }
        ]
      },
    },
    gallery: [
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872204/grow_orbit_portfolio/assets/portfolio/aethera/main_image.jpg", label: "Hero Image" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872193/grow_orbit_portfolio/assets/portfolio/aethera/listing_1.jpg", label: "Unmatched Versatility" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872195/grow_orbit_portfolio/assets/portfolio/aethera/listing_3.jpg", label: "Ultrasonic Waves" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872196/grow_orbit_portfolio/assets/portfolio/aethera/listing_4.jpg", label: "Transformation" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872199/grow_orbit_portfolio/assets/portfolio/aethera/listing_6.jpg", label: "Smart Timer" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872200/grow_orbit_portfolio/assets/portfolio/aethera/listing_7.jpg", label: "Capacity" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872188/grow_orbit_portfolio/assets/portfolio/aethera/aplus_promise.jpg", label: "Brand Vision" },
      { src: "https://res.cloudinary.com/dciggvulg/image/upload/v1781872186/grow_orbit_portfolio/assets/portfolio/aethera/aplus_power.jpg", label: "Power Detail" },
    ],
    metrics: [
      { label: "Conversion Lift", value: "+120%" },
      { label: "CTR Increase", value: "+55%" },
      { label: "Add to Cart", value: "+80%" },
      { label: "Niche Authority", value: "Premium" },
    ],
    testimonial: {
      quote: "The new listing images and A+ content completely redefined our product positioning. Customers now view our cleaner as a luxury lifestyle accessory, and our conversions have doubled.",
      author: "Elena S.",
      role: "Brand Manager, Aethera",
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
