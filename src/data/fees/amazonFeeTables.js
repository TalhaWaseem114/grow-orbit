import { us2026 } from './us-2026';
import { uk2026 } from './uk-2026';

// Global Referral fee percentages by category
export const REFERRAL_CATEGORIES = [
  { slug: "home-kitchen", name: "Home & Kitchen", percentage: 15 },
  { slug: "electronics", name: "Consumer Electronics", percentage: 8 },
  { slug: "apparel", name: "Apparel & Accessories", percentage: 17 },
  { slug: "toys-games", name: "Toys & Games", percentage: 15 },
  { slug: "beauty-personal-care", name: "Beauty & Personal Care", percentage: 15 },
  { slug: "books", name: "Books & Media", percentage: 15 },
  { slug: "sports-outdoors", name: "Sports & Outdoors", percentage: 15 },
  { slug: "office-products", name: "Office Products", percentage: 15 },
  { slug: "grocery-gourmet", name: "Grocery & Gourmet Food", percentage: 15 }, // under $15 is 8% in reality, but 15% flat for standard calculation
  { slug: "health-household", name: "Health & Household", percentage: 15 },
  { slug: "automotive", name: "Automotive", percentage: 12 },
  { slug: "tools-home-improvement", name: "Tools & Home Improvement", percentage: 15 }
];

export function getFeeTable({ marketplace, year }) {
  const mkt = (marketplace || "US").toUpperCase();
  const yr = parseInt(year) || 2026;

  if (mkt === "US" && yr === 2026) {
    return us2026;
  }
  if (mkt === "UK" && yr === 2026) {
    return uk2026;
  }
  
  // Default fallback to US 2026 to ensure no crashes
  console.warn(`Fee table for ${mkt} ${yr} not found. Falling back to US 2026.`);
  return us2026;
}
