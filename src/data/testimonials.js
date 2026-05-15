/**
 * Shared testimonials data — sourced from case study pages.
 * Used by: OrbitTestimonialsSection, Testimonials (home), and any
 * future page that needs client proof.
 *
 * To add a new testimonial, append to the array below.
 * Every entry MUST have: quote, name, role, badge, image.
 * Optional: caseStudyLink (links to the full case study page).
 */

export const caseStudyTestimonials = [
  {
    status: "NEW LAUNCH",
    category: "HOME & KITCHEN",
    rating: 5.0,
    headline: ["$0 → $52K/mo", "in 90 Days"],
    paragraph: "Launched from scratch with zero reviews. Hit page 1 in 58 days and scaled to $52K/mo with 8.2x ROAS.",
    stats: [
      { type: "roas", val: "8.2x", label: "ROAS" },
      { type: "days", val: "58 Days", label: "to Page 1" },
      { type: "revenue", val: "$52K/mo", label: "Revenue" }
    ],
    name: "GRAFFIXX BRAND",
    role: "Founder, Art Supplies",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    caseStudyLink: "/case-study/li-01",
  },
  {
    status: "EXISTING BRAND",
    category: "ELECTRONICS",
    rating: 4.9,
    headline: ["ACoS 52% → 18%", "in 60 Days"],
    paragraph: "We restructured their PPC and listings to reduce ACoS by 34% while increasing overall profit by 2.7x.",
    stats: [
      { type: "acos", val: "52% → 18%", label: "ACoS" },
      { type: "profit", val: "2.7x", label: "Profit Increase" },
      { type: "growth", val: "+312%", label: "Sales Growth" }
    ],
    name: "KAZVOO ELECTRONICS",
    role: "Founder, Consumer Electronics",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    caseStudyLink: "/case-study/li-02",
  },
  {
    status: "REBRAND",
    category: "HEALTH & WELLNESS",
    rating: 5.0,
    headline: ["Revenue +340%", "After Rebrand"],
    paragraph: "We rebuilt their brand, listings, and creatives. Revenue grew 3.4x in 75 days with improved organic ranking and lower ad spend.",
    stats: [
      { type: "revenue", val: "+340%", label: "Revenue" },
      { type: "rank", val: "Top 3", label: "Organic Rank" },
      { type: "spend", val: "-28%", label: "Ad Spend" }
    ],
    name: "DUNOVA SLEEP CO.",
    role: "Founder, Home & Sleep",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    caseStudyLink: "/case-study/li-03",
  },
];
