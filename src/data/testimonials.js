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
    status: "SCALING PHASE",
    category: "FOOD & BEVERAGE",
    rating: 5.0,
    headline: ["61K Units Sold", "112% Growth"],
    paragraph: "We revamped their listings and optimized PPC. Within 12 months, they hit 742K units sold with consistent monthly growth.",
    stats: [
      { type: "growth", val: "+112%", label: "MoM Growth" },
      { type: "units", val: "742K", label: "Yearly Units" },
      { type: "revenue", val: "$6K+/day", label: "Daily Sales" }
    ],
    name: "SARAH J.",
    role: "Founder, Lumina Bites",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    caseStudyLink: "/case-study/li-01",
    sellerCentralImage: "/images/saler centeral screens/1.jpg"
  },
  {
    status: "PREMIUM LAUNCH",
    category: "LIFESTYLE & GEAR",
    rating: 5.0,
    headline: ["1.15M Units Sold", "102% Yearly Growth"],
    paragraph: "Through technical 3D renders and premium A+ content, we completely transformed their conversion rates, leading to outstanding performance.",
    stats: [
      { type: "growth", val: "+135%", label: "MoM Growth" },
      { type: "units", val: "1.15M", label: "Yearly Units" },
      { type: "revenue", val: "$9.8K/day", label: "Daily Sales" }
    ],
    name: "MARCUS C.",
    role: "Founder, Nexa",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    caseStudyLink: "/case-study/li-02",
    sellerCentralImage: "/images/saler centeral screens/2.jpg"
  },
  {
    status: "REBRAND & SCALE",
    category: "HOME & AUTO",
    rating: 5.0,
    headline: ["812K Units Sold", "96% MoM Growth"],
    paragraph: "We rebuilt their brand, listings, and creatives. Revenue grew consistently with thriving business metrics and top seller status.",
    stats: [
      { type: "growth", val: "+96%", label: "MoM Growth" },
      { type: "units", val: "812K", label: "Yearly Units" },
      { type: "revenue", val: "$7.6K/day", label: "Daily Sales" }
    ],
    name: "DAVID R.",
    role: "Founder, Kazvo",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    caseStudyLink: "/case-study/li-03",
    sellerCentralImage: "/images/saler centeral screens/3.jpg"
  },
];
