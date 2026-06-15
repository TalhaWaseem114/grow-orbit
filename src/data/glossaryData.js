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
  }
};

export const getAllGlossarySlugs = () => {
  return Object.keys(GLOSSARY_TERMS);
};

export const getGlossaryTerm = (slug) => {
  return GLOSSARY_TERMS[slug] || null;
};
