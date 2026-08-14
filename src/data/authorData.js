/**
 * Authors Directory - E-E-A-T Credentials and Profiles
 */
export const AUTHORS = {
  "talha-waseem": {
    slug: "talha-waseem",
    name: "Talha Waseem",
    role: "Technical Strategist",
    avatar: "https://res.cloudinary.com/dciggvulg/image/upload/v1786712729/groworbit/authors/talha-waseem-avatar.jpg", 
    bio: "Talha Waseem is a Technical Strategist at Grow Orbit specializing in click-through rate (CTR) engineering, Amazon PPC architecture, and conversion-first listing systems. He works directly with brand owners to optimize visual assets, eliminate ad waste, and scale top-of-search dominance.",
    credentials: [
      "Amazon Technical Strategist",
      "CTR & Listing Optimization Specialist",
      "Data-Driven PPC Architecture",
      "Conversion & Funnel Engineering"
    ]
  }
};

/**
 * Returns author details by slug, with fallback to Talha Waseem
 */
export function getAuthorBySlug(slug) {
  return AUTHORS["talha-waseem"];
}

/**
 * Helper to slugify an author name
 */
export function getAuthorSlugByName(name) {
  return "talha-waseem";
}
