export const GLOSSARY_TERMS = {
  "acos": {
    term: "ACOS",
    fullName: "Advertising Cost of Sales",
    definition: "A key metric used in Amazon PPC advertising to measure the performance of campaigns. It is calculated as ad spend divided by ad revenue. A lower ACOS indicates a more profitable campaign.",
    example: "If you spend $20 on ads and generate $100 in sales, your ACOS is 20%.",
    relatedTools: [
      { name: "PPC Efficiency Audit", url: "/service/ppc-efficiency" },
      { name: "Amazon Profit Calculator", url: "/amazon-tools/profit-calculator" }
    ]
  },
  "tacos": {
    term: "TACOS",
    fullName: "Total Advertising Cost of Sales",
    definition: "A holistic metric that measures ad spend relative to total revenue (both organic and paid sales). TACOS helps sellers understand the overall impact of advertising on their entire business growth.",
    example: "If your ad spend is $1,000 and your total sales (organic + paid) are $10,000, your TACOS is 10%.",
    relatedTools: [
      { name: "PPC Efficiency Audit", url: "/service/ppc-efficiency" },
      { name: "Account Operations", url: "/service/account-ops" }
    ]
  },
  "ddp-shipping": {
    term: "DDP Shipping",
    fullName: "Delivered Duty Paid",
    definition: "An incoterm where the seller assumes all responsibilities, risks, and costs associated with transporting goods until the buyer receives them at the destination port. This includes paying for shipping, duties, and customs clearance.",
    example: "Many Amazon sellers prefer DDP shipping from Chinese suppliers directly to Amazon FBA warehouses to avoid surprise customs fees.",
    relatedTools: [
      { name: "Product Sourcing & Hunting", url: "/service/product-hunting-sourcing" },
      { name: "FBA vs FBM Calculator", url: "/amazon-tools/fba-vs-fbm-vs-3pl" }
    ]
  },
  "fba": {
    term: "FBA",
    fullName: "Fulfillment by Amazon",
    definition: "A service offered by Amazon that provides storage, packaging, and shipping assistance to sellers. This allows sellers to store their products in Amazon's fulfillment centers, where Amazon handles the picking, packing, shipping, and customer service for these products.",
    example: "Using FBA makes your products eligible for Amazon Prime two-day shipping, which can drastically improve conversion rates.",
    relatedTools: [
      { name: "FBA Fee Calculator", url: "/amazon-tools/fba-fee-calculator" },
      { name: "Storage Fee Calculator", url: "/amazon-tools/storage-fee-calculator" }
    ]
  },
  "fbm": {
    term: "FBM",
    fullName: "Fulfillment by Merchant",
    definition: "A fulfillment method where Amazon sellers store their own inventory and handle the packing and shipping of orders themselves, rather than using Amazon's fulfillment network.",
    example: "FBM is often preferred for oversized or slow-moving items where FBA storage fees would erode profit margins.",
    relatedTools: [
      { name: "FBA vs FBM Calculator", url: "/amazon-tools/fba-vs-fbm-vs-3pl" },
      { name: "Account Operations", url: "/service/account-ops" }
    ]
  },
  "asin": {
    term: "ASIN",
    fullName: "Amazon Standard Identification Number",
    definition: "A unique 10-character alphanumeric identifier assigned by Amazon.com and its partners for product identification within the Amazon organization.",
    example: "Every distinct variation of a product (e.g., size, color) gets its own unique ASIN.",
    relatedTools: [
      { name: "Listing Optimization", url: "/service/listing-optimization" },
      { name: "Brand Launch", url: "/service/brand-launch" }
    ]
  },
  "bsr": {
    term: "BSR",
    fullName: "Best Sellers Rank",
    definition: "A metric used by Amazon to rank products based on their sales volume compared to other products within the same category. A lower BSR number means higher sales.",
    example: "A product with a BSR of #1 in Home & Kitchen is the best-selling product in that entire category.",
    relatedTools: [
      { name: "Audit & Strategy", url: "/service/audit-strategy" },
      { name: "Product Sourcing & Hunting", url: "/service/product-hunting-sourcing" }
    ]
  },
  "ctr": {
    term: "CTR",
    fullName: "Click-Through Rate",
    definition: "An essential Amazon advertising and organic performance metric measuring the percentage of shoppers who click on a product listing after viewing its impression in search results or browse nodes. Calculated as (Clicks ÷ Impressions) × 100.",
    example: "If your Sponsored Products ad receives 10,000 impressions and generates 50 clicks, your CTR is 0.50%. Sponsored Products Top-of-Search placements typically achieve CTRs above 1.00%.",
    relatedTools: [
      { name: "Amazon CTR Benchmarks Guide", url: "/blog/amazon-click-through-rate" },
      { name: "Main Image CTR Optimization", url: "/service/design/main-image-ctr" },
      { name: "Listing Optimization", url: "/service/listing-optimization" }
    ]
  },
  "main-image": {
    term: "MAIN Image",
    fullName: "Amazon Main Product Hero Image",
    definition: "The primary product photograph or 3D render displayed in Amazon search results and the first slot of the detail page gallery. Amazon Seller Central strictly mandates a pure white background (RGB 255, 255, 255), at least 85% frame fill, and prohibits added text, badges, borders, or non-included accessories.",
    example: "A kitchen brand optimizing their MAIN image from 85% basic fill to 92% mobile framing with ray-traced contact shadows increased mobile click share by 24% without changing PPC bids.",
    relatedTools: [
      { name: "Amazon Main Image Requirements", url: "/blog/amazon-main-image-requirements" },
      { name: "7 Costly Main Image Mistakes", url: "/blog/amazon-main-image-guidelines" },
      { name: "Listing Image Systems", url: "/service/design/listing-image-systems" }
    ]
  },
  "mye": {
    term: "MYE",
    fullName: "Manage Your Experiments",
    definition: "Amazon's official A/B testing tool in Seller Central for Brand Registered sellers. It allows brands to split-test two versions of a main image, title, bullet points, or A+ Content simultaneously across real marketplace shoppers to measure differences in sales, conversion rate, and revenue.",
    example: "A brand uses MYE to run a 6-week split test comparing an isometric 3D render against a standard front-facing photo, identifying a winning asset that generated a 12% lift in units sold.",
    relatedTools: [
      { name: "High-Converting Product Images Guide", url: "/blog/high-converting-amazon-product-images" },
      { name: "Audit & Strategy", url: "/service/audit-strategy" }
    ]
  },
  "3d-rendering": {
    term: "3D Product Rendering",
    fullName: "CGI & 3D Product Visualization",
    definition: "The computer-aided creation of photorealistic product imagery using CAD models, virtual studio lighting, and ray-traced material physics. For Amazon sellers, 3D rendering provides 100% control over lighting reflections, exact camera angles, and perfect catalog consistency across color and size variations without studio glare or lens distortion.",
    example: "Supplement brands frequently render metallic foil labels and clear bottles in 3D software (such as Blender or Cinema 4D) to ensure crisp typography and eliminate camera reflections on pure white backgrounds.",
    relatedTools: [
      { name: "High-Converting Amazon Product Images", url: "/blog/high-converting-amazon-product-images" },
      { name: "Design & Creative Hub", url: "/service/design-creative" }
    ]
  },
  "search-suppression": {
    term: "Search Suppression",
    fullName: "Amazon Listing Search Suppression",
    definition: "A status where Amazon automatically removes an ASIN from customer search results and browse categories due to policy non-compliance, most commonly caused by non-white main image backgrounds, promotional badges, low resolution below 1,000px, or missing vital product attributes.",
    example: "When an automated Seller Central image bot detects an unapproved '100% Organic' badge on a hero image, the listing status changes to 'Suppressed' until a compliant white-background image is uploaded.",
    relatedTools: [
      { name: "Amazon Main Image Requirements", url: "/blog/amazon-main-image-requirements" },
      { name: "Listing Optimization Service", url: "/service/listing-optimization" }
    ]
  },
  "ebc": {
    term: "A+ Content",
    fullName: "Enhanced Brand Content (EBC)",
    definition: "A premium visual branding feature in Amazon Seller Central that allows Brand Registered owners to replace standard plain-text descriptions with rich modular layouts, comparison matrices, high-resolution lifestyle imagery, and brand story modules.",
    example: "Adding a comparison matrix and lifestyle benefit banners via A+ Content routinely increases listing conversion rates by an average of 5% to 10% by addressing pre-purchase buyer objections.",
    relatedTools: [
      { name: "Enhanced Brand Content (A+)", url: "/service/design/enhanced-brand-content" },
      { name: "Brand Store Design", url: "/service/design/brand-store" }
    ]
  }
};

export const getAllGlossarySlugs = () => {
  return Object.keys(GLOSSARY_TERMS);
};

export const getGlossaryTerm = (slug) => {
  return GLOSSARY_TERMS[slug] || null;
};
