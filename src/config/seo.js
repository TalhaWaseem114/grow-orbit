const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com";

export const DEFAULT_SEO = {
  title: "Grow Orbit | Amazon Seller Growth & Full-Service FBA Management Agency",
  description: "We run the systems that scale Amazon brands. Expert PPC advertising, listing optimization, product sourcing, and A+ creative design.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Grow Orbit",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Grow Orbit - Amazon Brand Accelerator",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@groworbit",
    creator: "@groworbit",
    images: [`${SITE_URL}/logo.png`],
  }
};

export const METADATA_MAP = {
  '/': {
    title: 'Amazon Seller Growth & Full-Service FBA Management Agency | Grow Orbit',
    description: 'We run the systems that scale Amazon brands. Expert PPC advertising, listing optimization, product sourcing, and A+ creative design. Book your free audit.'
  },
  '/faq': {
    title: 'Frequently Asked Questions | Grow Orbit',
    description: 'Everything you need to know about our FBA management, PPC optimization, supplier sourcing, IP protection, and onboarding processes.'
  },
  '/about': {
    title: 'About Us & The Operations Command Centre | Grow Orbit',
    description: 'Learn about Grow Orbit, the systems-first Amazon growth partner managing over $12M+ in annual revenue with month-to-month contracts.'
  },
  '/contact': {
    title: 'Contact Us & Book Your Free Strategy Call | Grow Orbit',
    description: 'Get in touch with our team for a free 15-minute Amazon seller audit. We\'ll identify your single biggest growth bottleneck and map a strategy.'
  },
  '/portfolio': {
    title: 'Our Portfolio of Scaled Amazon Brands | Grow Orbit',
    description: 'See the visual engineering and listing systems we\'ve built for high-growth Amazon sellers across multiple categories.'
  },
  '/get-started': {
    title: 'Get Started With Grow Orbit | Grow Orbit',
    description: 'Take the first step toward scaling your Amazon seller account. Choose a theme and launch your growth strategy.'
  },
  '/case-study': {
    title: 'Amazon Seller Success Stories & Case Studies | Grow Orbit',
    description: 'Real growth data, actual ACoS reductions, and page 1 organic rankings achieved for real Amazon brands under our management.'
  },
  '/case-study/li-01': {
    title: 'Case Study: 38% Revenue Lift & PPC Optimization | Grow Orbit',
    description: 'Deep dive into how we restructured ad architecture and listings to scale brand revenue and drop ACoS by 42%.'
  },
  '/case-study/li-02': {
    title: 'Case Study: Organic Rank Dominance in 60 Days | Grow Orbit',
    description: 'How we optimized Amazon listings for conversion and A9 relevance to hit page 1 for high-volume keywords.'
  },
  '/case-study/li-03': {
    title: 'Case Study: 8.2x ROAS Product Launch Strategy | Grow Orbit',
    description: 'Inside the launch protocol we used to secure page 1 positions and high margins for a new product line.'
  },
  '/service': {
    title: 'Amazon Agency Services & Growth Solutions | Grow Orbit',
    description: 'Explore our full suite of Amazon agency services. We optimize PPC efficiency, design listing creative, manage logistics, and protect your brand.'
  },
  '/service/product-hunting-sourcing': {
    title: 'Amazon Product Hunting & Direct Factory Sourcing | Grow Orbit',
    description: 'Data-first product research and direct ex-factory sourcing. We identify high-margin keyword gaps and vet global factories to protect your ROI.'
  },
  '/service/trademark-registration': {
    title: 'Amazon Trademark Registration & Brand Protection | Grow Orbit',
    description: 'Secure your brand registry. Fast USPTO/UKIPO/EUIPO trademark filing, listing protection, hijacker removal, and IP enforcement.'
  },
  '/service/sop': {
    title: 'Standard Operating Procedures (SOPs) for Amazon | Grow Orbit',
    description: 'Operational blueprints and SOPs to run customer support, catalog management, and daily seller account health checks.'
  },
  '/service/ppc-efficiency': {
    title: 'Amazon PPC Management & Advertising Efficiency | Grow Orbit',
    description: 'Cut ad waste. 4-tier campaign structures and bid optimization designed to lower ACoS, maximize ROAS, and build organic rankings.'
  },
  '/service/ongoing-support': {
    title: 'Ongoing Amazon Operational Support & Account Management | Grow Orbit',
    description: 'Full-time operations support, case resolution, catalog auditing, and safety monitoring to keep your account safe and active.'
  },
  '/service/listing-optimization': {
    title: 'Amazon Listing Optimization & SEO Copywriting | Grow Orbit',
    description: 'A9-optimized listings designed for conversion. Keyword indexing, listing audits, high-intent copy, and premium storefront design.'
  },
  '/service/growth-automation': {
    title: 'Amazon Growth Automation & Seller Systems | Grow Orbit',
    description: 'Automate repetitive tasks, inventory alerts, and PPC bidding with proprietary software integrations to streamline operations.'
  },
  '/service/dtc-website': {
    title: 'DTC Website Design & Shopify Development | Grow Orbit',
    description: 'Expand off Amazon. Custom Shopify stores, landing pages, and funnel architecture built to convert cold traffic and build brand equity.'
  },
  '/service/coaching-consultation': {
    title: 'Amazon Seller Coaching & Growth Consultation | Grow Orbit',
    description: 'One-on-one consulting and strategic roadmaps for 6 and 7-figure sellers looking to solve catalog bottlenecks.'
  },
  '/service/design-creative': {
    title: 'Amazon Creative Design & Visual Engineering | Grow Orbit',
    description: 'CTR-tested main images, brand guidelines, premium A+ content layout, and storefronts that convey authority and drive sales.'
  },
  '/service/brand-launch': {
    title: 'Amazon Brand Launch & Honeymoon Period Strategy | Grow Orbit',
    description: 'Harness Amazon\'s Honeymoon visibility window. Complete launch coordination, early PPC, and ranking systems to hit Page 1.'
  },
  '/service/audit-strategy': {
    title: 'Free Amazon Account Audit & Growth Strategy | Grow Orbit',
    description: 'Request a comprehensive audit of your PPC, SEO, catalog health, and design. Get actionable recommendations to scale.'
  },
  '/service/amazon-services': {
    title: 'Amazon Seller Services & Growth Command Center | Grow Orbit',
    description: 'Explore our full suite of Amazon agency services. Standard operations, visual creative, and advertising run under one strategy.'
  },
  '/service/amazon-dsp': {
    title: 'Amazon DSP Advertising & Retargeting Agency | Grow Orbit',
    description: 'Programmatic advertising across Amazon properties. Target high-intent in-market audiences and run retargeting to capture lost sales.'
  },
  '/service/account-ops': {
    title: 'Amazon Seller Account Operations & Management | Grow Orbit',
    description: 'Operational backend management. FBA logistics, catalog suppressions, daily monitoring, and performance health.'
  },
  '/service/full/amazon-management': {
    title: 'Full-Service Amazon Account Management Agency | Grow Orbit',
    description: 'Completely delegate your Amazon business. We handle PPC, SEO, daily operations, design, and logistics for a percentage of growth.'
  },
  '/service/design/brand-story': {
    title: 'Amazon Brand Story Design & Implementation | Grow Orbit',
    description: 'Connect with your customers. Custom Amazon Brand Story layouts that build trust, cross-sell products, and boost brand identity.'
  },
  '/service/design/main-image-ctr': {
    title: 'Amazon Main Image CTR Optimization & Design | Grow Orbit',
    description: 'Increase click-through rate. Vetted, main image rendering and CTR-testing to stand out in search results and drive traffic.'
  },
  '/service/design/listing-image-systems': {
    title: 'Amazon Listing Image Design & Graphic Systems | Grow Orbit',
    description: 'Convert visitors. Graphic layout systems for listing images showing main features, dimensions, benefits, and social proof.'
  },
  '/service/design/full-listing-optimization': {
    title: 'Full Amazon Listing Creative Optimization | Grow Orbit',
    description: 'Complete visual and text optimization of your Amazon listings. Main images, A+ layout, copywriting, and search term indexing.'
  },
  '/service/design/enhanced-brand-content': {
    title: 'Amazon Premium A+ Content & EBC Design | Grow Orbit',
    description: 'Increase conversion rates by 5%+. Custom-designed A+ content modules, banners, comparison charts, and brand stories.'
  },
  '/service/design/brand-store': {
    title: 'Amazon Brand Storefront Design & Architecture | Grow Orbit',
    description: 'A premium virtual store for your brand. Custom storefront navigation, category layout, and video blocks to increase basket size.'
  },
  '/service/design/brand-guidelines': {
    title: 'Amazon Brand Guidelines & Identity Systems | Grow Orbit',
    description: 'Define your voice, typography, color palettes, and graphic style to ensure consistent brand representation across all listings.'
  },
  '/amazon-tools': {
    title: 'Free Amazon Seller Tools & Calculators | Grow Orbit',
    description: 'Calculate your true margins. Premium calculators for FBA/FBM fee estimates, storage costs, and quick margin estimations.'
  },
  '/amazon-tools/profit-calculator': {
    title: 'Amazon Profit Calculator - Net Margin Estimator | Grow Orbit',
    description: 'Calculate net profit margins, ROI, and true cost of goods sold after FBA fees, storage costs, and referral percentages.'
  },
  '/amazon-tools/storage-fee-calculator': {
    title: 'Amazon Storage Fee Calculator | Grow Orbit',
    description: 'Determine exact Amazon FBA monthly storage fees based on package dimensions, weight, and seasonal peak rates.'
  },
  '/amazon-tools/quick-estimator': {
    title: 'Amazon FBA Margin & Fee Quick Estimator | Grow Orbit',
    description: 'Get an instant estimation of FBA referral and fulfillment fees based on product category and selling price.'
  },
  '/amazon-tools/fba-fee-calculator': {
    title: 'Amazon FBA Fee Calculator | Grow Orbit',
    description: 'Compare FBA vs FBM costs. Detailed calculator for referral fees, fulfillment rates, and outbound shipping fees.'
  },
  '/amazon-tools/fba-vs-fbm-vs-3pl': {
    title: 'FBA vs FBM vs 3PL Calculator & Comparison | Grow Orbit',
    description: 'Determine whether to fulfill via Amazon (FBA), in-house (FBM), or using a third-party logistics provider (3PL).'
  },
  '/amazon-services-landing': {
    title: 'Scale Amazon Operations & PPC | Grow Orbit',
    description: 'We run your Amazon PPC advertising, organic ranking SEO, and product sourcing operations so you can focus on scale instead of management. Book a strategy call.'
  },
  '/design-creative-landing': {
    title: 'Amazon Design & Visual Engineering | Grow Orbit',
    description: 'We design scroll-stopping listing images, premium A+ Content modules, and custom storefronts built specifically to increase your conversion rate.'
  },
  '/thank-you': {
    title: 'Thank You for Reaching Out | Grow Orbit',
    description: 'Thank you for booking your strategy audit. We\'ve received your details and will be in touch shortly.'
  }
};

function capitalize(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function getPageMetadata(routePath) {
  const normalizedPath = routePath === '' || routePath === '/' ? '/' : routePath.replace(/\/$/, '');
  const config = METADATA_MAP[normalizedPath];

  let title = DEFAULT_SEO.title;
  let description = DEFAULT_SEO.description;

  if (config) {
    title = config.title;
    description = config.description;
  } else {
    // Generative fallback
    const parts = normalizedPath.split('/').filter(Boolean);
    if (parts.length > 0) {
      const cleanName = capitalize(parts[parts.length - 1]);
      title = `${cleanName} | Grow Orbit`;
      description = `Learn about ${cleanName} services at Grow Orbit. We help Amazon sellers scale and optimize operations.`;
    }
  }

  const pageUrl = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      ...DEFAULT_SEO.openGraph,
      title,
      description,
      url: pageUrl,
    },
    twitter: {
      ...DEFAULT_SEO.twitter,
      title,
      description,
    }
  };
}
