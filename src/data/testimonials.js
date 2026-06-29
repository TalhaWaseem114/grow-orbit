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
    category: "ART SUPPLIES",
    rating: 5.0,
    headline: ["61.18K Units Sold", "112% Growth"],
    paragraph: "We revamped their listings and optimized PPC. Within 12 months, they hit 742.9K units sold with consistent monthly growth.",
    stats: [
      { type: "growth", val: "+112%", label: "MoM Growth" },
      { type: "units", val: "742.9K", label: "Yearly Units" },
      { type: "revenue", val: "$6.7K/day", label: "Daily Sales" }
    ],
    name: "Marcus Thorne",
    role: "Founder, Graffixx",
    image: "/assets/marcus-vance.avif",
    caseStudyLink: "/case-study/li-01",
    sellerCentralImage: "/images/saler centeral screens/1.jpg"
  },
  {
    status: "PREMIUM LAUNCH",
    category: "CONSUMER ELECTRONICS",
    rating: 5.0,
    headline: ["1.15M Units Sold", "102% Yearly Growth"],
    paragraph: "Through technical 3D renders and premium A+ content, we completely transformed their conversion rates, leading to outstanding performance.",
    stats: [
      { type: "growth", val: "+135%", label: "MoM Growth" },
      { type: "units", val: "1.15M", label: "Yearly Units" },
      { type: "revenue", val: "$9.8K/day", label: "Daily Sales" }
    ],
    name: "Julian Vane",
    role: "Founder, Kazvoo",
    image: "/assets/david-rutherford.avif",
    caseStudyLink: "/case-study/li-02",
    sellerCentralImage: "/images/saler centeral screens/2.jpg"
  },
  {
    status: "REBRAND & SCALE",
    category: "HOME & SLEEP",
    rating: 5.0,
    headline: ["812.7K Units Sold", "96% MoM Growth"],
    paragraph: "We rebuilt their brand, listings, and creatives. Revenue grew consistently with thriving business metrics and top seller status.",
    stats: [
      { type: "growth", val: "+96%", label: "MoM Growth" },
      { type: "units", val: "812.7K", label: "Yearly Units" },
      { type: "revenue", val: "$7.6K/day", label: "Daily Sales" }
    ],
    name: "Sarah Jenkins",
    role: "Founder, Dunova",
    image: "/assets/sarah-jenkins.avif",
    caseStudyLink: "/case-study/li-03",
    sellerCentralImage: "/images/saler centeral screens/3.jpg"
  },
];
