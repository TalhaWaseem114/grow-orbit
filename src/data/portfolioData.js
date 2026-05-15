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
    niche: "Supplements",
    brandName: "VitaCore Nutrition",
    outcome: "$12K → $105K/mo",
    badge: { value: "+110%", label: "Sales Lift" },
    tags: ["6 Secondary Images", "Infographic", "Lifestyle"],
    services: ["Listing Images", "A+ Content"],
    materials: ["Recyclable Plastic"],
    src: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "21 Days",
    challenge: "VitaCore's supplement listings used generic stock photography that blended into a sea of competitors. Their CTR was below category average and conversion sat at 6.2% despite strong reviews.",
    solution: "We designed 6 purpose-built secondary images including ingredient callout infographics, lifestyle usage shots, and a comparison chart. Each image was optimized for mobile-first 4:5 scroll behavior.",
    serviceDetails: {
      "Listing Images": {
        description: "6 secondary images per ASIN including ingredient callouts, dosage guides, and clinical-result infographics. Each image optimized for mobile scroll.",
        images: [
          { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop", label: "Ingredient Callout" },
          { src: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=800&auto=format&fit=crop", label: "Dosage Guide" },
        ],
      },
      "A+ Content": {
        description: "Premium A+ modules with comparison charts, clinical data visualizations, and doctor endorsement sections.",
        images: [
          { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop", label: "Clinical Module" },
          { src: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop", label: "Comparison Chart" },
        ],
      },
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop", label: "Main Image" },
      { src: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=800&auto=format&fit=crop", label: "Infographic" },
      { src: "https://images.unsplash.com/photo-1505576399279-0d00fcbd7f5c?q=80&w=800&auto=format&fit=crop", label: "Lifestyle Shot" },
      { src: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=800&auto=format&fit=crop", label: "Ingredient Callout" },
      { src: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop", label: "Size Comparison" },
    ],
    metrics: [
      { label: "Sales Lift", value: "+110%" },
      { label: "CTR Increase", value: "+34%" },
      { label: "CVR Growth", value: "+22%" },
      { label: "Revenue", value: "$105K/mo" },
    ],
    testimonial: {
      quote: "The images completely transformed how customers perceive our brand. We went from page 3 to a consistent Best Seller badge within 30 days.",
      author: "James R.",
      role: "Founder, VitaCore Nutrition",
    },
  },
  {
    id: "li-02",
    category: "Listing Images",
    niche: "Home & Kitchen",
    brandName: "Hearth & Oak",
    outcome: "#1 Best Seller",
    badge: { value: "+85%", label: "BSR Growth" },
    tags: ["7 Images", "3D Render", "Size Chart"],
    services: ["Listing Images"],
    materials: ["Acacia Wood", "Brushed Steel"],
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "18 Days",
    challenge: "Hearth & Oak's cutting boards looked identical to every other listing. Despite premium acacia wood construction, their images failed to communicate the quality and craftsmanship that justified a higher price point.",
    solution: "We created 7 images including 3D-rendered dimension charts, overhead lifestyle compositions, and macro texture shots that showcased the grain pattern. Every image was tested against 3 variants before launch.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop", label: "Hero Image" },
      { src: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop", label: "3D Render" },
      { src: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop", label: "Lifestyle" },
      { src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=800&auto=format&fit=crop", label: "Size Chart" },
      { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop", label: "Detail Macro" },
    ],
    metrics: [
      { label: "BSR Growth", value: "+85%" },
      { label: "Sessions", value: "+52%" },
      { label: "Unit Sales", value: "3.2x" },
      { label: "Rank", value: "#1 BSR" },
    ],
    testimonial: {
      quote: "We hit #1 Best Seller within three weeks of the new images going live. The 3D size chart alone reduced our return rate by 15%.",
      author: "Monica L.",
      role: "Operations Manager, Hearth & Oak",
    },
  },
  {
    id: "li-03",
    category: "Listing Images",
    niche: "Apparel",
    brandName: "UrbanThread Co.",
    outcome: "+45% Profit",
    badge: { value: "+18%", label: "Lower ACoS" },
    tags: ["Lifestyle Shots", "Infographic", "Ghost Mannequin"],
    services: ["Listing Images"],
    materials: ["Organic Cotton"],
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "14 Days",
    challenge: "UrbanThread's t-shirts were shot flat on white backgrounds, making them look cheap and generic. High ACoS was eating into margins because low CTR required aggressive bidding.",
    solution: "Ghost mannequin photography showed garment fit and structure. We added lifestyle shots with models in urban settings and infographic overlays highlighting organic cotton certifications and sizing.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", label: "Ghost Mannequin" },
      { src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop", label: "Lifestyle Urban" },
      { src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop", label: "Fabric Detail" },
      { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop", label: "Infographic" },
    ],
    metrics: [
      { label: "Profit Lift", value: "+45%" },
      { label: "ACoS Drop", value: "-18%" },
      { label: "CTR Boost", value: "+27%" },
      { label: "Returns", value: "-12%" },
    ],
    testimonial: {
      quote: "Our ACoS dropped from 38% to 20% after the image overhaul. The ghost mannequin shots finally showed customers what the fit actually looks like.",
      author: "Ravi P.",
      role: "Co-Founder, UrbanThread Co.",
    },
  },
  {
    id: "li-04",
    category: "Listing Images",
    niche: "Pet Products",
    brandName: "PawPure",
    outcome: "3.8x ROAS",
    badge: { value: "-40%", label: "ACoS Drop" },
    tags: ["6 Images", "Lifestyle", "Before/After"],
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Borosilicate Glass", "Organic Wood"],
    src: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "25 Days",
    challenge: "PawPure's premium water fountain had beautiful engineering but the listing images showed none of it. Competitor products with worse reviews were winning the click because their photos were more compelling.",
    solution: "We shot 6 new images including pet lifestyle photography, a before/after cleaning comparison, and a technical cutaway showing the filtration system. We also redesigned the main image for CTR testing.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop", label: "Hero Lifestyle" },
      { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop", label: "Pet in Action" },
      { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop", label: "Before/After" },
      { src: "https://images.unsplash.com/photo-1583337130417-13104dec14a5?q=80&w=800&auto=format&fit=crop", label: "Technical Cutaway" },
      { src: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=800&auto=format&fit=crop", label: "Main Image Test" },
    ],
    metrics: [
      { label: "ROAS", value: "3.8x" },
      { label: "ACoS Drop", value: "-40%" },
      { label: "CTR Lift", value: "+31%" },
      { label: "CVR", value: "+19%" },
    ],
    testimonial: {
      quote: "The before/after comparison image alone doubled our add-to-cart rate. Customers finally understood why our fountain costs more.",
      author: "Emily C.",
      role: "Brand Manager, PawPure",
    },
  },

  /* ─── A+ CONTENT ─── */
  {
    id: "ap-01",
    category: "A+ Content",
    niche: "Outdoor Gear",
    brandName: "TrailForge",
    outcome: "$0 → $72K/mo",
    badge: { value: "30 Days", label: "Timeframe" },
    tags: ["7 Modules", "Premium A+", "Brand Headers"],
    services: ["Listing Images", "A+ Content"],
    materials: ["Stainless Steel", "Nylon Fiber"],
    src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "30 Days",
    challenge: "TrailForge was launching their first Amazon product — a tactical hiking pack — with zero brand presence, no reviews, and no organic ranking. The listing needed to convert cold traffic from day one.",
    solution: "We built 7 Premium A+ modules including immersive brand headers, feature grids with icon callouts, and lifestyle comparison charts. Every module was designed to reduce scroll abandonment.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop", label: "Brand Header" },
      { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop", label: "Feature Grid" },
      { src: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=800&auto=format&fit=crop", label: "Lifestyle Module" },
      { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop", label: "Comparison Chart" },
      { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", label: "Hero Banner" },
    ],
    metrics: [
      { label: "Revenue", value: "$72K/mo" },
      { label: "Time to Revenue", value: "30 Days" },
      { label: "CVR", value: "18.5%" },
      { label: "Scroll Depth", value: "+62%" },
    ],
    testimonial: {
      quote: "We went from zero to $72K monthly revenue in 30 days. The A+ Content gave us the credibility we needed to convert cold PPC traffic.",
      author: "Derek M.",
      role: "Founder, TrailForge",
    },
  },
  {
    id: "ap-02",
    category: "A+ Content",
    niche: "Beauty & Skin",
    brandName: "GlowVeil",
    outcome: "4.2x ROAS",
    badge: { value: "+61%", label: "Profit Lift" },
    tags: ["5 Modules", "Comparison Chart", "Lifestyle"],
    services: ["A+ Content", "Listing Images"],
    materials: ["Frosted Glass", "PP Plastic"],
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "28 Days",
    challenge: "GlowVeil's serums were getting clicks but not converting. Their A+ Content was a wall of text with small product shots. Competitors with inferior formulas were outselling them 3:1.",
    solution: "We designed 5 A+ modules with ingredient comparison charts, clinical-result callouts, and aspirational lifestyle imagery. New listing images reinforced the premium frosted-glass packaging.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop", label: "Hero Module" },
      { src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop", label: "Comparison Chart" },
      { src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop", label: "Usage Lifestyle" },
      { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop", label: "Ingredient Detail" },
      { src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop", label: "Listing Image" },
    ],
    metrics: [
      { label: "ROAS", value: "4.2x" },
      { label: "Profit Lift", value: "+61%" },
      { label: "CVR Lift", value: "+38%" },
      { label: "ACoS", value: "14%" },
    ],
    testimonial: {
      quote: "The comparison chart module alone increased our conversion rate by 22%. Customers could finally see why our formula was worth paying more for.",
      author: "Sarah K.",
      role: "CEO, GlowVeil",
    },
  },
  {
    id: "ap-03",
    category: "A+ Content",
    niche: "Audio & Tech",
    brandName: "SonicEdge",
    outcome: "$25K → $160K/mo",
    badge: { value: "+50%", label: "CVR Lift" },
    tags: ["7 Modules", "3D Render", "Feature Grid"],
    services: ["Listing Images", "A+ Content"],
    materials: ["Matte Plastic", "Silicone"],
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "35 Days",
    challenge: "SonicEdge's wireless headphones were losing to established brands despite superior specs. Their listing had no A+ Content and relied entirely on bullet points to communicate technical advantages.",
    solution: "We built 7 Premium A+ modules with 3D-rendered exploded views, frequency response charts, and side-by-side competitor comparisons. Feature grids with icons made specs scannable in seconds.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", label: "3D Render Hero" },
      { src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop", label: "Exploded View" },
      { src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop", label: "Feature Grid" },
      { src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop", label: "Lifestyle" },
      { src: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=800&auto=format&fit=crop", label: "Spec Comparison" },
    ],
    metrics: [
      { label: "Revenue", value: "$160K/mo" },
      { label: "CVR Lift", value: "+50%" },
      { label: "Sessions", value: "+35%" },
      { label: "Growth", value: "6.4x" },
    ],
    testimonial: {
      quote: "The 3D exploded view was a game-changer. Customers understood exactly what they were getting. Our conversion rate jumped from 8% to 12% overnight.",
      author: "Alex T.",
      role: "Product Lead, SonicEdge",
    },
  },
  {
    id: "ap-04",
    category: "A+ Content",
    niche: "Food & Beverage",
    brandName: "Harvest & Bloom",
    outcome: "+38% CVR",
    badge: { value: "Page 1", label: "Organic Rank" },
    tags: ["5 Modules", "Ingredient Callouts", "Lifestyle"],
    services: ["A+ Content", "Listing Images"],
    materials: ["Amber Glass", "Eco Cardboard"],
    src: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "22 Days",
    challenge: "Harvest & Bloom's organic honey was stuck on page 3 with a 4.1% conversion rate. The listing had no A+ Content and the images didn't communicate the single-origin sourcing story.",
    solution: "We built 5 A+ modules with ingredient sourcing maps, beekeeper lifestyle photography, and taste-profile infographics. New listing images highlighted the amber glass packaging and eco-friendly boxes.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=800&auto=format&fit=crop", label: "Product Hero" },
      { src: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=800&auto=format&fit=crop", label: "Sourcing Story" },
      { src: "https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=800&auto=format&fit=crop", label: "Ingredient Map" },
      { src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop", label: "Lifestyle" },
    ],
    metrics: [
      { label: "CVR Lift", value: "+38%" },
      { label: "Organic Rank", value: "Page 1" },
      { label: "Sessions", value: "+44%" },
      { label: "Reviews", value: "+120/mo" },
    ],
    testimonial: {
      quote: "We finally broke onto page 1 for 'organic raw honey'. The sourcing story module made customers feel connected to our brand before they even scrolled to the price.",
      author: "Maria G.",
      role: "Owner, Harvest & Bloom",
    },
  },

  /* ─── BRAND STORY ─── */
  {
    id: "bs-01",
    category: "Brand Story",
    niche: "Fitness & Gym",
    brandName: "IronPath Athletics",
    outcome: "Amazon's Choice",
    badge: { value: "Day 14", label: "New Release" },
    tags: ["Brand Narrative", "Founder Story", "Product Journey"],
    services: ["Listing Images", "Brand Story"],
    materials: ["Steel", "Rubber"],
    src: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "14 Days",
    challenge: "IronPath was a new fitness brand with zero brand recognition. Their dumbbells had great reviews during beta testing but no story to differentiate them from mass-produced alternatives.",
    solution: "We crafted a founder-driven Brand Story highlighting the engineering background of the team, the product design journey, and the quality-testing process that sets IronPath apart.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop", label: "Brand Hero" },
      { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", label: "Founder Story" },
      { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop", label: "Product Journey" },
      { src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop", label: "Quality Testing" },
    ],
    metrics: [
      { label: "Badge", value: "Amazon's Choice" },
      { label: "Time", value: "14 Days" },
      { label: "Dwell Time", value: "+45%" },
      { label: "Add to Cart", value: "+28%" },
    ],
    testimonial: {
      quote: "The Brand Story gave us instant credibility. Customers started mentioning 'the engineering story' in their reviews. That's when we knew it was working.",
      author: "Tom H.",
      role: "Founder, IronPath Athletics",
    },
  },
  {
    id: "bs-02",
    category: "Brand Story",
    niche: "Home Office",
    brandName: "DeskCraft Studio",
    outcome: "+44% Q1 Rev",
    badge: { value: "+32%", label: "Dwell Time" },
    tags: ["Origin Story", "Team Photos", "Mission Statement"],
    services: ["Listing Images", "Brand Story", "A+ Content"],
    materials: ["Wood", "Aluminium"],
    src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "30 Days",
    challenge: "DeskCraft's standing desks were premium-priced but their listing looked like every other standing desk on Amazon. No brand narrative, no emotional connection — just specs and a price.",
    solution: "We created a multi-chapter Brand Story covering the founder's journey from chronic back pain to designing the ultimate desk. Combined with Premium A+ Content modules showing the wood-and-aluminium craftsmanship.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=800&auto=format&fit=crop", label: "Origin Story" },
      { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", label: "Team Photo" },
      { src: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=800&auto=format&fit=crop", label: "Workshop" },
      { src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop", label: "A+ Module" },
    ],
    metrics: [
      { label: "Q1 Revenue", value: "+44%" },
      { label: "Dwell Time", value: "+32%" },
      { label: "CVR Lift", value: "+18%" },
      { label: "Return Rate", value: "-8%" },
    ],
    testimonial: {
      quote: "The origin story resonated deeply. Customers tell us they chose our desk because they connected with our mission. That's the power of a great Brand Story.",
      author: "Lisa W.",
      role: "Co-Founder, DeskCraft Studio",
    },
  },
  {
    id: "bs-03",
    category: "Brand Story",
    niche: "Skincare",
    brandName: "Bare Botanics",
    outcome: "3x Revenue",
    badge: { value: "+28%", label: "Return Rate ↓" },
    tags: ["Ingredient Story", "Founder Voice", "Sustainability"],
    services: ["Listing Images", "Brand Story"],
    materials: ["Glass", "Recyclable Plastic"],
    src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "18 Days",
    challenge: "Bare Botanics had a loyal DTC following but their Amazon listing had no brand personality. Returns were high because customers didn't understand the natural ingredients and expected instant results.",
    solution: "We built a sustainability-focused Brand Story covering ingredient sourcing, the founder's dermatology background, and realistic usage timelines. This set proper expectations and slashed returns.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop", label: "Brand Hero" },
      { src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop", label: "Ingredient Story" },
      { src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop", label: "Founder Voice" },
      { src: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop", label: "Sustainability" },
    ],
    metrics: [
      { label: "Revenue", value: "3x" },
      { label: "Return Drop", value: "-28%" },
      { label: "Repeat Buys", value: "+35%" },
      { label: "Brand Search", value: "+60%" },
    ],
    testimonial: {
      quote: "Returns dropped dramatically once customers understood the natural process. The Brand Story educated them before purchase — exactly what we needed.",
      author: "Dr. Nina S.",
      role: "Founder, Bare Botanics",
    },
  },

  /* ─── BRAND STORE ─── */
  {
    id: "st-01",
    category: "Brand Store",
    niche: "Sports & Outdoors",
    brandName: "Summit Gear Co.",
    outcome: "+65% Catalog CTR",
    badge: { value: "+22%", label: "Cross-sell" },
    tags: ["4 Store Pages", "Category Nav", "Video Header"],
    services: ["Listing Images", "Brand Store"],
    materials: ["Nylon", "Carbon Fiber"],
    src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "21 Days",
    challenge: "Summit Gear had 12 products across 3 categories but no Brand Store. Customers landing on one product had no way to discover the rest of the lineup, killing cross-sell opportunities.",
    solution: "We built a 4-page Brand Store with video headers, category navigation tiles, and curated collection pages. Each page was designed to guide traffic from hero products to complementary items.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", label: "Store Homepage" },
      { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop", label: "Category Page" },
      { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop", label: "Collection View" },
      { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", label: "Video Header" },
    ],
    metrics: [
      { label: "Catalog CTR", value: "+65%" },
      { label: "Cross-sell", value: "+22%" },
      { label: "Store Visits", value: "8.4K/mo" },
      { label: "AOV", value: "+18%" },
    ],
    testimonial: {
      quote: "Our Brand Store became our best salesperson. Customers now browse our entire catalog instead of bouncing after one product.",
      author: "Chris B.",
      role: "Director, Summit Gear Co.",
    },
  },
  {
    id: "st-02",
    category: "Brand Store",
    niche: "Baby & Kids",
    brandName: "Little Orbit",
    outcome: "3.1x ROAS",
    badge: { value: "+40%", label: "Store Visits" },
    tags: ["3 Pages", "Product Collections", "Lifestyle Header"],
    services: ["Listing Images", "Brand Store", "Brand Story"],
    materials: ["Organic Cotton"],
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "24 Days",
    challenge: "Little Orbit's baby products had strong reviews but their brand presence was fragmented. DSP campaigns were driving traffic to individual listings with no way to capture the full brand experience.",
    solution: "We designed a 3-page Brand Store with a lifestyle hero header and curated collections. We also built a Brand Story to anchor the store's emotional narrative around safe, organic materials.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop", label: "Store Hero" },
      { src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop", label: "Collection Page" },
      { src: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=800&auto=format&fit=crop", label: "Brand Story" },
      { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop", label: "Lifestyle Header" },
    ],
    metrics: [
      { label: "ROAS", value: "3.1x" },
      { label: "Store Visits", value: "+40%" },
      { label: "Cross-sell", value: "+15%" },
      { label: "DSP CPC", value: "-22%" },
    ],
    testimonial: {
      quote: "The Brand Store gave our DSP campaigns a proper landing page. ROAS jumped from 1.8x to 3.1x within the first month.",
      author: "Jessica T.",
      role: "Marketing Lead, Little Orbit",
    },
  },
  {
    id: "st-03",
    category: "Brand Store",
    niche: "Coffee & Tea",
    brandName: "Roast Republic",
    outcome: "#2 → #1 BSR",
    badge: { value: "+55%", label: "Storefront CTR" },
    tags: ["5 Pages", "Bundle Section", "Seasonal Banners"],
    services: ["Listing Images", "Brand Store", "A+ Content"],
    materials: ["Ceramic", "Glass"],
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "28 Days",
    challenge: "Roast Republic was stuck at #2 BSR behind a larger competitor. They had 18 SKUs but no organized store presence. Their A+ Content was outdated and didn't match the brand refresh they'd done on their DTC site.",
    solution: "We built a 5-page Brand Store with seasonal banner templates, a bundle discovery section, and refreshed A+ Content across their top 5 ASINs to match the new brand identity.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop", label: "Store Home" },
      { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop", label: "Bundle Page" },
      { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop", label: "Seasonal Banner" },
      { src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop", label: "A+ Refresh" },
      { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop", label: "Collection Grid" },
    ],
    metrics: [
      { label: "BSR", value: "#1" },
      { label: "Storefront CTR", value: "+55%" },
      { label: "Bundle Sales", value: "+38%" },
      { label: "Repeat Rate", value: "+25%" },
    ],
    testimonial: {
      quote: "We finally took #1 BSR after the store launch. The bundle section alone drove 38% more multi-pack sales.",
      author: "David L.",
      role: "CEO, Roast Republic",
    },
  },

  /* ─── MAIN IMAGE CTR ─── */
  {
    id: "mc-01",
    category: "Main Image CTR",
    niche: "Electronics",
    brandName: "LuxTech",
    outcome: "+42% CTR",
    badge: { value: "+42%", label: "Click Rate" },
    tags: ["Thumbnail Testing", "White BG Optimised", "Angle Testing"],
    services: ["Listing Images", "Main Image CTR"],
    materials: ["Matte Plastic", "Aluminium"],
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "10 Days",
    challenge: "LuxTech's smartwatch was getting impressions but not clicks. The main image was a straight-on product shot that looked identical to 15 other watches in search results.",
    solution: "We ran a systematic angle-testing program with 8 variants on white background. The winning image used a 35° tilt with screen-on display and subtle shadow, increasing CTR by 42%.",
    serviceDetails: {
      "Main Image CTR": {
        description: "Tested 8 variants on white background. The winning image used a 35° tilt with screen-on display and subtle shadow, increasing CTR by 42%.",
        images: [
          { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", label: "Winning Variant" },
          { src: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=800&auto=format&fit=crop", label: "Variant A" },
          { src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop", label: "Variant B" },
          { src: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop", label: "Original" },
        ],
      },
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", label: "Winning Variant" },
      { src: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=800&auto=format&fit=crop", label: "Variant A" },
      { src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop", label: "Variant B" },
      { src: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop", label: "Original" },
    ],
    metrics: [
      { label: "CTR Lift", value: "+42%" },
      { label: "Impressions", value: "Same" },
      { label: "Clicks", value: "+42%" },
      { label: "Sales", value: "+28%" },
    ],
    testimonial: {
      quote: "Same impressions, 42% more clicks. The angle change was so simple but we never would have found it without systematic testing.",
      author: "Kevin Z.",
      role: "Growth Lead, LuxTech",
    },
  },
  {
    id: "mc-02",
    category: "Main Image CTR",
    niche: "Kitchen Gadgets",
    brandName: "ChefSync",
    outcome: "2.3x More Clicks",
    badge: { value: "+38%", label: "Search CTR" },
    tags: ["Before/After Test", "Prop Styling", "Colour Blocking"],
    services: ["Main Image CTR", "Listing Images"],
    materials: ["Stainless Steel", "Silicone"],
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "15 Days",
    challenge: "ChefSync's kitchen tools were invisible in search results. The main images were dull, poorly lit, and the products blended into the white background.",
    solution: "We introduced prop styling with complementary food elements and subtle colour blocking. Combined with new listing images that showed the tools in action, creating a cohesive visual story.",
    serviceDetails: {
      "Main Image CTR": {
        description: "Tested prop-styling and colour-blocking versus standard white background. The styled hero image boosted search clicks by 2.3x.",
        images: [
          { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop", label: "Winning Main" },
          { src: "https://images.unsplash.com/photo-1556909172-89cf0b8ffbcc?q=80&w=800&auto=format&fit=crop", label: "Prop Styled" },
          { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop", label: "Colour Block" },
          { src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=800&auto=format&fit=crop", label: "Original" },
        ],
      },
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop", label: "Winning Main" },
      { src: "https://images.unsplash.com/photo-1556909172-89cf0b8ffbcc?q=80&w=800&auto=format&fit=crop", label: "Prop Styled" },
      { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop", label: "In-Use Shot" },
      { src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=800&auto=format&fit=crop", label: "Colour Block" },
    ],
    metrics: [
      { label: "Search CTR", value: "+38%" },
      { label: "Clicks", value: "2.3x" },
      { label: "CVR", value: "+15%" },
      { label: "Revenue", value: "+68%" },
    ],
    testimonial: {
      quote: "The before/after was night and day. Our products finally pop in search results. Combined with the new listing images, our entire catalog is performing better.",
      author: "Anna P.",
      role: "Brand Director, ChefSync",
    },
  },

  /* ─── FULL BRAND PACKAGE ─── */
  {
    id: "fb-01",
    category: "Full Brand Package",
    niche: "Health Supplements",
    brandName: "NovaBiotics",
    outcome: "$8K → $140K/mo",
    badge: { value: "Full Build", label: "All Systems" },
    tags: ["Listing Images", "A+ Content", "Brand Story", "Brand Store", "Main Image CTR"],
    services: ["Listing Images", "A+ Content", "Brand Story", "Brand Store", "Main Image CTR"],
    materials: ["Recyclable Plastic"],
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "45 Days",
    challenge: "NovaBiotics was doing $8K/mo with a single probiotic product and no brand infrastructure on Amazon. Generic images, no A+ Content, no Brand Store, and a main image with below-average CTR.",
    solution: "We executed a complete brand overhaul: 7 new listing images per ASIN, Premium A+ Content with clinical-result modules, a science-driven Brand Story, a 4-page Brand Store, and CTR-optimized main images.",
    serviceDetails: {
      "Listing Images": {
        description: "7 secondary images per ASIN including ingredient callouts, dosage guides, and clinical-result infographics. Each image optimized for mobile scroll.",
        images: [
          { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop", label: "Ingredient Callout" },
          { src: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=800&auto=format&fit=crop", label: "Dosage Guide" },
        ],
      },
      "A+ Content": {
        description: "7 Premium A+ modules with comparison charts, clinical data visualizations, and doctor endorsement sections.",
        images: [
          { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop", label: "Clinical Module" },
          { src: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop", label: "Comparison Chart" },
        ],
      },
      "Brand Story": {
        description: "Science-driven narrative covering the microbiome research behind the formula, founder's pharmaceutical background, and clinical testing process.",
        images: [
          { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop", label: "Founder Story" },
        ],
      },
      "Brand Store": {
        description: "4-page store with supplement finder quiz, bundle deals, and educational content hub driving repeat purchases.",
        images: [
          { src: "https://images.unsplash.com/photo-1563986768609-322da13575f2?q=80&w=800&auto=format&fit=crop", label: "Store Home" },
        ],
      },
      "Main Image CTR": {
        description: "Tested 6 main image variants. Winner featured capsule pour-shot with green accent lighting, lifting CTR by 35%.",
        images: [
          { src: "https://images.unsplash.com/photo-1505576399279-0d00fcbd7f5c?q=80&w=800&auto=format&fit=crop", label: "Winning Main" },
        ],
      },
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop", label: "Brand Package Hero" },
      { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop", label: "Listing Images" },
      { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop", label: "A+ Content" },
      { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop", label: "Brand Story" },
      { src: "https://images.unsplash.com/photo-1563986768609-322da13575f2?q=80&w=800&auto=format&fit=crop", label: "Brand Store" },
      { src: "https://images.unsplash.com/photo-1505576399279-0d00fcbd7f5c?q=80&w=800&auto=format&fit=crop", label: "Main Image" },
    ],
    metrics: [
      { label: "Revenue", value: "$140K/mo" },
      { label: "Growth", value: "17.5x" },
      { label: "CVR", value: "22%" },
      { label: "CTR Lift", value: "+35%" },
    ],
    testimonial: {
      quote: "Grow Orbit didn't just fix our listing — they built our entire brand presence from scratch. Going from $8K to $140K in 45 days was beyond what we thought was possible.",
      author: "Dr. Ryan K.",
      role: "Founder, NovaBiotics",
    },
  },
  {
    id: "fb-02",
    category: "Full Brand Package",
    niche: "Outdoor Furniture",
    brandName: "TerraCraft",
    outcome: "Page 4 → Page 1",
    badge: { value: "23 Days", label: "To Page 1" },
    tags: ["7 Images", "Premium A+", "Brand Store", "3D Render", "Brand Story"],
    services: ["Listing Images", "A+ Content", "Brand Story", "Brand Store"],
    materials: ["Teak Wood", "Steel"],
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    isDark: false,
    timeline: "23 Days",
    challenge: "TerraCraft's teak patio set was buried on page 4. The listing had 3 amateur photos, no A+ Content, and no brand infrastructure. Despite a superior product, they were invisible.",
    solution: "Complete brand build: 7 listing images with 3D-rendered assembly views, Premium A+ with material comparison charts, a craftsmanship-focused Brand Story, and a 3-page Brand Store with seasonal collections.",
    serviceDetails: {
      "Listing Images": {
        description: "7 images including 3D assembly views, outdoor lifestyle scenes, and material close-ups showing teak grain and steel joinery.",
        images: [
          { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop", label: "Lifestyle" },
          { src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800&auto=format&fit=crop", label: "3D Assembly" },
        ],
      },
      "A+ Content": {
        description: "Premium A+ modules with wood-type comparison charts, weather-resistance data, and care-guide infographics.",
        images: [
          { src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", label: "Material Chart" },
        ],
      },
      "Brand Story": {
        description: "Craftsmanship narrative covering 3-generation woodworking heritage and sustainable teak sourcing from certified plantations.",
        images: [
          { src: "https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?q=80&w=800&auto=format&fit=crop", label: "Heritage" },
        ],
      },
      "Brand Store": {
        description: "3-page store with seasonal collection banners, patio inspiration gallery, and care-accessories cross-sell section.",
        images: [
          { src: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=800&auto=format&fit=crop", label: "Store Home" },
        ],
      },
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop", label: "Package Hero" },
      { src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800&auto=format&fit=crop", label: "3D Render" },
      { src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", label: "A+ Module" },
      { src: "https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?q=80&w=800&auto=format&fit=crop", label: "Brand Story" },
      { src: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=800&auto=format&fit=crop", label: "Store" },
    ],
    metrics: [
      { label: "Rank", value: "Page 1" },
      { label: "Time", value: "23 Days" },
      { label: "CVR", value: "+55%" },
      { label: "Sessions", value: "+180%" },
    ],
    testimonial: {
      quote: "From page 4 to page 1 in 23 days. The 3D assembly view reduced our customer questions by 60%. The Brand Store now drives 30% of our total sales.",
      author: "Marco F.",
      role: "Owner, TerraCraft",
    },
  },
  {
    id: "fb-03",
    category: "Full Brand Package",
    niche: "Consumer Electronics",
    brandName: "VoltEdge",
    outcome: "$25K → $190K/mo",
    badge: { value: "+660%", label: "Revenue Lift" },
    tags: ["Full Creative Suite", "A+ Premium", "Store Build", "Listing Images", "Brand Story"],
    services: ["Listing Images", "A+ Content", "Brand Story", "Brand Store", "Main Image CTR"],
    materials: ["Glass", "Aluminium"],
    src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
    isDark: true,
    timeline: "40 Days",
    challenge: "VoltEdge's portable charger lineup was doing $25K/mo across 5 ASINs. Poor visuals, no brand cohesion, and inconsistent A+ Content were suppressing growth despite strong product-market fit.",
    solution: "Full creative suite overhaul across all 5 ASINs: consistent listing imagery with 3D renders, Premium A+ with tech-spec visualizations, a founder-engineer Brand Story, 5-page Brand Store, and CTR-optimized main images.",
    serviceDetails: {
      "Listing Images": {
        description: "Consistent visual language across 5 ASINs with 3D rendered capacity comparisons, device compatibility charts, and minimalist lifestyle shots.",
        images: [
          { src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop", label: "Product Hero" },
          { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=800&auto=format&fit=crop", label: "Compatibility" },
        ],
      },
      "A+ Content": {
        description: "Premium A+ with animated-style spec visualizations, charging speed graphs, and safety certification highlights.",
        images: [
          { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop", label: "Tech Specs" },
        ],
      },
      "Brand Story": {
        description: "Engineer-founder narrative covering battery technology innovation, safety testing in-house lab, and environmental charging impact calculator.",
        images: [
          { src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop", label: "Lab Story" },
        ],
      },
      "Brand Store": {
        description: "5-page store with product finder by device, bundle builder, and tech blog section driving organic discovery.",
        images: [
          { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop", label: "Store Home" },
        ],
      },
      "Main Image CTR": {
        description: "Tested 10 main image variants across 5 ASINs. Average CTR improvement of 32% using consistent angle + gradient shadow treatment.",
        images: [
          { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=800&auto=format&fit=crop", label: "CTR Winner" },
        ],
      },
    },
    gallery: [
      { src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop", label: "Package Hero" },
      { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=800&auto=format&fit=crop", label: "Listing Images" },
      { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop", label: "A+ Content" },
      { src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop", label: "Brand Story" },
      { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop", label: "Brand Store" },
      { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=800&auto=format&fit=crop", label: "CTR Testing" },
    ],
    metrics: [
      { label: "Revenue", value: "$190K/mo" },
      { label: "Growth", value: "+660%" },
      { label: "Avg CTR", value: "+32%" },
      { label: "CVR", value: "+48%" },
    ],
    testimonial: {
      quote: "660% revenue growth in 40 days. Grow Orbit treated our brand like it was their own. The consistency across all 5 ASINs created a brand presence that customers trust.",
      author: "Jordan M.",
      role: "CTO, VoltEdge",
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
  { key: "Brand Story",        label: "Brand Story",        icon: "BookOpen",    color: "bg-orange-500 text-white" },
  { key: "Brand Store",        label: "Brand Store",        icon: "Store",       color: "bg-orange-500 text-white" },
  { key: "Full Brand Package", label: "Full Brand Package", icon: "Sparkles",    color: "bg-zinc-900 text-white"   },
];

/* ─── Stats per category ─── */
export const FILTER_STATS = {
  all:                  { count: 18, metric: "20+ brands transformed", sub: "across all creative services" },
  "Listing Images":     { count: 4,  metric: "+85% avg BSR growth",    sub: "across listing image projects" },
  "A+ Content":         { count: 4,  metric: "+50% avg CVR lift",      sub: "from premium A+ content"       },
  "Main Image CTR":     { count: 2,  metric: "+40% avg click rate",    sub: "from main image optimisation"  },
  "Brand Story":        { count: 3,  metric: "+32% avg dwell time",    sub: "on brand story implementations" },
  "Brand Store":        { count: 3,  metric: "+45% avg storefront CTR",sub: "on brand store builds"          },
  "Full Brand Package": { count: 3,  metric: "+660% peak revenue lift",sub: "on complete brand builds"       },
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
