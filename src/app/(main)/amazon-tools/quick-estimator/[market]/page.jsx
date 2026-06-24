import ClientPage from "../page-client";

export async function generateStaticParams() {
  return [
    { market: "us" },
    { market: "uk" },
    { market: "de" }
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const market = resolvedParams.market || "us";
  const marketUpper = market.toUpperCase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
  
  return {
    title: `Quick Amazon Estimator (${marketUpper} Marketplace) | Grow Orbit`,
    description: `Calculate estimated margins, FBA size tiers, and ROI in 15 seconds for the ${marketUpper} marketplace.`,
    alternates: {
      canonical: `${siteUrl}/amazon-tools/quick-estimator/${market.toLowerCase()}`,
    },
    openGraph: {
      title: `Quick Amazon Estimator (${marketUpper} Marketplace) | Grow Orbit`,
      description: `Calculate estimated margins, FBA size tiers, and ROI in 15 seconds for the ${marketUpper} marketplace.`,
      url: `${siteUrl}/amazon-tools/quick-estimator/${market.toLowerCase()}`,
      type: "website"
    }
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const market = resolvedParams.market || "us";
  const marketUpper = market.toUpperCase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Amazon Tools",
        "item": `${siteUrl}/amazon-tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Quick Estimator",
        "item": `${siteUrl}/amazon-tools/quick-estimator`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${marketUpper} Marketplace`,
        "item": `${siteUrl}/amazon-tools/quick-estimator/${market.toLowerCase()}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ClientPage market={marketUpper} />
    </>
  );
}
