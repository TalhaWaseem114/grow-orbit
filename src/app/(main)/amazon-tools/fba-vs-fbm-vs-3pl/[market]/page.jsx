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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com";
  
  return {
    title: `FBA vs FBM vs 3PL Logistics Calculator (${marketUpper} Marketplace) | Grow Orbit`,
    description: `Compare net profits, margins, and capital ROIs across Amazon FBA, FBM, and third-party logistics (3PL) side-by-side for the ${marketUpper} marketplace.`,
    alternates: {
      canonical: `${siteUrl}/amazon-tools/fba-vs-fbm-vs-3pl/${market.toLowerCase()}`,
    },
    openGraph: {
      title: `FBA vs FBM vs 3PL Logistics Calculator (${marketUpper} Marketplace) | Grow Orbit`,
      description: `Compare net profits, margins, and capital ROIs across Amazon FBA, FBM, and third-party logistics (3PL) side-by-side for the ${marketUpper} marketplace.`,
      url: `${siteUrl}/amazon-tools/fba-vs-fbm-vs-3pl/${market.toLowerCase()}`,
      type: "website"
    }
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const market = resolvedParams.market || "us";
  const marketUpper = market.toUpperCase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com";

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
        "name": "FBA vs FBM vs 3PL",
        "item": `${siteUrl}/amazon-tools/fba-vs-fbm-vs-3pl`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${marketUpper} Marketplace`,
        "item": `${siteUrl}/amazon-tools/fba-vs-fbm-vs-3pl/${market.toLowerCase()}`
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
