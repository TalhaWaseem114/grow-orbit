/**
 * Authors Directory - E-E-A-T Credentials and Profiles
 */
export const AUTHORS = {
  "ali": {
    slug: "ali",
    name: "Ali",
    role: "Founder & Growth Architect",
    avatar: "https://res.cloudinary.com/dciggvulg/image/upload/v1781271782/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/9.png", // Using portfolio image placeholder
    bio: "Ali is the Founder and Growth Architect at Grow Orbit. With over 8 years of hands-on experience building and scaling 7-figure and 8-figure Amazon brands, Ali specializes in click-through rate (CTR) engineering, PPC efficiency architecture, and conversion-first listing systems. He has helped scale dozens of international brands to top-of-search dominance.",
    credentials: [
      "8+ Years Amazon PPC Architecture",
      "Managed $12M+ Amazon Ad Spend",
      "Scaled 40+ International Brands",
      "Founder of 2 7-Figure Brands"
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ali",
      twitter: "https://twitter.com/ali",
      website: "https://groworbit.com"
    }
  }
};

/**
 * Returns author details by slug, with fallback to Ali
 */
export function getAuthorBySlug(slug) {
  if (!slug) return AUTHORS["ali"];
  const cleanSlug = slug.toLowerCase().trim();
  // Map talha or others to ali as requested
  if (cleanSlug === "talha-waseem" || cleanSlug === "talha") {
    return AUTHORS["ali"];
  }
  return AUTHORS[cleanSlug] || AUTHORS["ali"];
}

/**
 * Helper to slugify an author name
 */
export function getAuthorSlugByName(name) {
  if (!name) return "ali";
  const cleanName = name.toLowerCase().trim();
  if (cleanName.includes("talha") || cleanName.includes("waseem")) {
    return "ali";
  }
  return cleanName
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
