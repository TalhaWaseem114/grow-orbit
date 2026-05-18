/**
 * Blog Dummy Data — Grow Orbit
 * Replace with Firestore/CMS integration later.
 */

export const BLOG_CATEGORIES = [
  "All",
  "Amazon Strategy",
  "PPC & Advertising",
  "Brand Building",
  "Listing Optimization",
  "Case Insights",
  "E-Commerce Trends",
];

export const BLOG_POSTS = [
  {
    slug: "main-image-ctr-amazon-2025",
    title: "The Main Image Is Your Ad. Here's How to Engineer a 168% CTR Lift.",
    excerpt:
      "Every competitor uses a white background. That's exactly why it doesn't work. We break down the visual psychology behind click-through rate engineering — and the one formatting decision that changed everything for a $28K/month launch.",
    category: "Listing Optimization",
    author: {
      name: "Talha Waseem",
      role: "Founder & Growth Architect",
      avatar: null,
    },
    date: "2025-05-12",
    readTime: "8 min read",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tags: ["CTR", "Main Image", "Visual Strategy", "Amazon"],
    content: [
      {
        type: "paragraph",
        text: "In a search results page of eight near-identical product thumbnails, a buyer's eye makes a decision in 0.3 seconds. Not three seconds. Not one. A third of a second. That window is the entire battlefield — and most sellers don't even know they're losing it.",
      },
      {
        type: "heading",
        text: "The White Background Trap",
      },
      {
        type: "paragraph",
        text: "Amazon requires a pure white background for main images. Most sellers stop there — they shoot a clean product photo on white, upload it, and move on. The result? A search row where every single thumbnail looks the same. When everything looks identical, nothing gets clicked. The buyer defaults to price, reviews, or Prime badges — never the image itself.",
      },
      {
        type: "heading",
        text: "Why Color Psychology Wins",
      },
      {
        type: "paragraph",
        text: "We tested a radical hypothesis: what if the product itself became the color? For an alcohol marker brand launching with zero reviews, we designed a color-fan arrangement on a warm orange gradient that technically complied with Amazon's white background policy (the background was white — the product styling created the color). The result was a +168% CTR lift on day one.",
      },
      {
        type: "quote",
        text: "A main image isn't a photograph. It's a click-generating machine. Every pixel needs to earn its place.",
      },
      {
        type: "heading",
        text: "The Framework: 4 Principles of CTR Engineering",
      },
      {
        type: "paragraph",
        text: "1. **Contrast Dominance** — Your image must break the visual pattern of the search row. If competitors use flat lays, you use lifestyle. If they go minimal, you go maximal.\n\n2. **Information Density** — Pack as much product truth into the thumbnail as possible. Size comparisons, color variants, key specs — all readable at 200x200px.\n\n3. **Emotional Trigger** — The image should make the buyer feel something before they think anything. Warmth, aspiration, curiosity.\n\n4. **Technical Compliance** — All of the above must work within Amazon's image guidelines. We never break rules — we exploit the space between them.",
      },
      {
        type: "heading",
        text: "What This Means for Your Launch",
      },
      {
        type: "paragraph",
        text: "If you're spending money on PPC but haven't touched your main image in six months, you're paying for impressions that don't convert. The highest-ROI change you can make today isn't a bid adjustment or a keyword add — it's re-engineering the first thing a buyer sees.",
      },
    ],
  },
  {
    slug: "acos-reduction-framework-ppc",
    title: "We Cut ACoS from 52% to 18% in 12 Weeks. Here's the Exact Framework.",
    excerpt:
      "Most sellers think high ACoS means bad keywords. It doesn't. It means bad structure. We reveal the campaign architecture that turned a bleeding ad account into a profitable growth engine — without cutting a single keyword.",
    category: "PPC & Advertising",
    author: {
      name: "Talha Waseem",
      role: "Founder & Growth Architect",
      avatar: null,
    },
    date: "2025-04-28",
    readTime: "12 min read",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tags: ["PPC", "ACoS", "Campaign Structure", "Amazon Ads"],
    content: [
      {
        type: "paragraph",
        text: "A 52% ACoS doesn't mean your product is wrong. It means your campaign structure is leaking money in places you can't see. When we took over the Kazvoo nose trimmer account, the first thing we did wasn't pause campaigns — it was map every dollar to a decision.",
      },
      {
        type: "heading",
        text: "The Leaky Bucket Problem",
      },
      {
        type: "paragraph",
        text: "Most Amazon ad accounts have one fundamental flaw: they treat all keywords the same. A branded search term, a competitor conquest term, and a broad discovery term all sit in the same campaign with the same daily budget and the same bid strategy. That's not advertising — that's hoping.",
      },
      {
        type: "heading",
        text: "The 3-Tier Architecture",
      },
      {
        type: "paragraph",
        text: "We restructured the entire account into three tiers:\n\n**Tier 1: Harvest Campaigns** — Exact match on proven converters. These get 60% of the budget. Aggressive bids, tight ACoS targets.\n\n**Tier 2: Conquest Campaigns** — Competitor targeting with custom creatives. 25% of budget. The goal isn't immediate ROAS — it's market share.\n\n**Tier 3: Discovery Campaigns** — Broad/auto campaigns with strict negative keyword harvesting. 15% of budget. These feed Tier 1.",
      },
      {
        type: "quote",
        text: "You don't optimize a bad structure. You rebuild the structure and let the optimization happen.",
      },
      {
        type: "paragraph",
        text: "Within 12 weeks, ACoS dropped from 52% to 18%. Revenue didn't just hold — it increased by 340%. The lesson? Cutting spend is never the answer. Redistributing spend always is.",
      },
    ],
  },
  {
    slug: "amazon-brand-launch-zero-reviews",
    title: "Launching on Amazon with Zero Reviews: The Playbook Nobody Talks About.",
    excerpt:
      "Everyone says you need reviews to sell on Amazon. We say you need a listing so good that reviews become irrelevant for the first 90 days. Here's how we've launched 3 brands to $25K+ months without a single review.",
    category: "Amazon Strategy",
    author: {
      name: "Talha Waseem",
      role: "Founder & Growth Architect",
      avatar: null,
    },
    date: "2025-04-15",
    readTime: "10 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Brand Launch", "Zero Reviews", "Strategy", "New Sellers"],
    content: [
      {
        type: "paragraph",
        text: "The biggest myth in Amazon selling is that you can't compete without reviews. It's not true — but it requires a fundamentally different launch strategy than what most agencies teach.",
      },
      {
        type: "heading",
        text: "Why Reviews Don't Matter (Yet)",
      },
      {
        type: "paragraph",
        text: "A buyer looking at a search results page doesn't see review counts first. They see images, titles, and prices. If your main image stops the scroll, your title answers the right question, and your price sits in the competitive sweet spot — you've earned the click. Reviews only matter after the click, on the product detail page.",
      },
      {
        type: "heading",
        text: "The Pre-Review Conversion Stack",
      },
      {
        type: "paragraph",
        text: "Our zero-review launch framework focuses on three conversion layers:\n\n1. **Visual Authority** — A+ Content that's so thorough, so detailed, and so professional that the absence of reviews feels irrelevant. Think: spec comparison tables, cross-section diagrams, lifestyle context.\n\n2. **Keyword Precision** — We don't go broad on launch. We identify 15–20 hyper-specific long-tail keywords where competition is weak and buyer intent is high.\n\n3. **Price Psychology** — Launch 10–15% below the category average. Not discounting — positioning. You're not cheap. You're the smart new option.",
      },
      {
        type: "quote",
        text: "A listing with zero reviews and perfect A+ Content converts better than a listing with 50 reviews and stock photos.",
      },
      {
        type: "paragraph",
        text: "Every brand we've launched using this framework has hit $25K+ in monthly revenue within 60–90 days. Reviews catch up naturally once velocity is established.",
      },
    ],
  },
  {
    slug: "a-plus-content-conversion-rate",
    title: "A+ Content That Actually Converts: The 7-Module Blueprint.",
    excerpt:
      "Most A+ Content is a branding exercise. Ours is a conversion weapon. We break down the exact 7-module structure that tripled CVR from 3.4% to 10.2% for a weighted blanket launch — in 11 days.",
    category: "Listing Optimization",
    author: {
      name: "Talha Waseem",
      role: "Founder & Growth Architect",
      avatar: null,
    },
    date: "2025-03-30",
    readTime: "9 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    tags: ["A+ Content", "CVR", "Conversion Rate", "Amazon"],
    content: [
      {
        type: "paragraph",
        text: "A+ Content isn't optional. It's the difference between a 3% conversion rate and a 10% conversion rate. But most sellers treat it as a branding afterthought — pretty images with vague copy that say nothing specific about the product.",
      },
      {
        type: "heading",
        text: "The 7-Module Conversion Architecture",
      },
      {
        type: "paragraph",
        text: "Module 1: **Brand Story Banner** — Full-width lifestyle image that creates emotional context.\n\nModule 2: **The Problem** — Name the exact pain point the buyer is experiencing. Be specific.\n\nModule 3: **The Solution** — How your product solves it. One feature, one benefit, one proof point.\n\nModule 4: **Spec Comparison** — Side-by-side table vs. competitors. Make your advantage obvious.\n\nModule 5: **Social Proof Visual** — Quote, star rating, or UGC-style image.\n\nModule 6: **FAQ Objection Handler** — Answer the 3 most common reasons people don't buy.\n\nModule 7: **Cross-Sell CTA** — Link to your other products. Capture the buyer in your ecosystem.",
      },
      {
        type: "quote",
        text: "Every module must answer one question: 'Why should I buy this instead of the other one?'",
      },
      {
        type: "paragraph",
        text: "When we applied this framework to the Dunova weighted blanket launch, CVR went from 3.4% to 10.2% in 11 days. That's not optimization — that's architecture.",
      },
    ],
  },
  {
    slug: "brand-store-amazon-traffic-funnel",
    title: "Your Amazon Brand Store Is a Dead End. Here's How to Make It a Funnel.",
    excerpt:
      "98% of Amazon Brand Stores are digital brochures. No strategy, no flow, no conversion intent. We show you how to turn your Store into a traffic-qualifying funnel that increases average order value by 35%.",
    category: "Brand Building",
    author: {
      name: "Talha Waseem",
      role: "Founder & Growth Architect",
      avatar: null,
    },
    date: "2025-03-18",
    readTime: "7 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    tags: ["Brand Store", "Traffic Funnel", "AOV", "Amazon"],
    content: [
      {
        type: "paragraph",
        text: "Amazon gives you a free multi-page website inside their marketplace. Most brands waste it. They upload a logo, a few product tiles, and a generic 'About Us' paragraph. Then they wonder why their Store conversion rate is 2%.",
      },
      {
        type: "heading",
        text: "The Funnel Mindset",
      },
      {
        type: "paragraph",
        text: "Stop thinking of your Brand Store as a storefront. Think of it as a landing page with multiple conversion paths. Every page should have one job: move the buyer closer to a purchase decision.",
      },
      {
        type: "heading",
        text: "The 4-Page Structure",
      },
      {
        type: "paragraph",
        text: "**Page 1: The Hook** — Hero image + value proposition + best-seller highlight. This is your homepage — it should look like a premium DTC site.\n\n**Page 2: Collection Pages** — Organized by use case, not SKU. 'For Sleep', 'For Travel', 'For Gifting' — not 'Product A', 'Product B'.\n\n**Page 3: The Proof Page** — Testimonials, press mentions, comparison tables. Pure social proof.\n\n**Page 4: Bundle/Deal Page** — Cross-sell bundles with a clear savings message. This is where AOV jumps 35%.",
      },
      {
        type: "quote",
        text: "A great Brand Store doesn't showcase products. It guides decisions.",
      },
      {
        type: "paragraph",
        text: "We've built Brand Stores that convert at 8–12% — four to six times the platform average. The difference isn't design quality. It's strategic intent behind every pixel.",
      },
    ],
  },
  {
    slug: "amazon-trends-2025-seller-strategy",
    title: "5 Amazon Trends That Will Define 2025 — And How Smart Sellers Are Preparing.",
    excerpt:
      "AI-generated listings, Rufus product search, rising CPCs, and the death of generic branding. We break down the 5 biggest shifts happening on Amazon right now and what your strategy should look like.",
    category: "E-Commerce Trends",
    author: {
      name: "Talha Waseem",
      role: "Founder & Growth Architect",
      avatar: null,
    },
    date: "2025-03-05",
    readTime: "11 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Trends", "2025", "AI", "Rufus", "Strategy"],
    content: [
      {
        type: "paragraph",
        text: "Amazon in 2025 is not the Amazon of 2023. The platform is evolving faster than most sellers can keep up — and the ones who don't adapt are going to feel it in their revenue within 6 months.",
      },
      {
        type: "heading",
        text: "1. AI-Powered Listing Generation",
      },
      {
        type: "paragraph",
        text: "Amazon is rolling out AI tools that auto-generate titles, bullet points, and descriptions. Most sellers will use them because they're fast. Smart sellers will use them as a starting point and then inject human conversion psychology that AI can't replicate.",
      },
      {
        type: "heading",
        text: "2. Rufus Is Changing Search Behavior",
      },
      {
        type: "paragraph",
        text: "Amazon's AI shopping assistant, Rufus, is fundamentally changing how buyers discover products. Instead of keyword searches, buyers are asking questions: 'What's the best marker for adult coloring?' Your listing content needs to answer conversational queries, not just match keywords.",
      },
      {
        type: "heading",
        text: "3. CPCs Will Keep Rising",
      },
      {
        type: "paragraph",
        text: "Average cost-per-click on Amazon has increased 30% year-over-year. The sellers who survive aren't the ones with the biggest budgets — they're the ones with the highest conversion rates. CVR optimization is now the single highest-leverage PPC strategy.",
      },
      {
        type: "heading",
        text: "4. Brand > Product",
      },
      {
        type: "paragraph",
        text: "Generic private label is dying. Buyers increasingly choose brands they recognize, even at higher price points. Brand Registry, A+ Premium, Brand Story — these aren't nice-to-haves anymore. They're survival tools.",
      },
      {
        type: "heading",
        text: "5. Video Is Non-Negotiable",
      },
      {
        type: "paragraph",
        text: "Product video on the main listing increases conversion by 9–15%. Sponsored Brand Video ads have 3x the engagement of static ads. If you're not producing video content, you're leaving conversion and ad performance on the table.",
      },
      {
        type: "quote",
        text: "2025 isn't about selling products on Amazon. It's about building brands that happen to sell on Amazon.",
      },
    ],
  },
];
