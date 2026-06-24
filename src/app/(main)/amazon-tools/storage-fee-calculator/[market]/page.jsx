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
    title: `Amazon Storage Fee Forecast Calculator (${marketUpper} Marketplace) | Grow Orbit`,
    description: `Forecast monthly, seasonal (including Q4 peak), and 365-day aged long-term storage fees for your inventory in the ${marketUpper} marketplace.`,
    alternates: {
      canonical: `${siteUrl}/amazon-tools/storage-fee-calculator/${market.toLowerCase()}`,
    },
    openGraph: {
      title: `Amazon Storage Fee Forecast Calculator (${marketUpper} Marketplace) | Grow Orbit`,
      description: `Forecast monthly, seasonal (including Q4 peak), and 365-day aged long-term storage fees for your inventory in the ${marketUpper} marketplace.`,
      url: `${siteUrl}/amazon-tools/storage-fee-calculator/${market.toLowerCase()}`,
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
        "name": "Storage Fee Calculator",
        "item": `${siteUrl}/amazon-tools/storage-fee-calculator`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${marketUpper} Marketplace`,
        "item": `${siteUrl}/amazon-tools/storage-fee-calculator/${market.toLowerCase()}`
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
