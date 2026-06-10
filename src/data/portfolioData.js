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
