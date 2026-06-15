import ClientPage from "../page-client";

export async function generateStaticParams() {
  return [
    { market: "us" },
    { market: "uk" }
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const market = resolvedParams.market || "us";
  const marketUpper = market.toUpperCase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com";
  
  return {
    title: `Amazon Profit & ROI Calculator (${marketUpper} Marketplace) | Grow Orbit`,
    description: `Calculate FBA unit economics, margins, ROI, and break-even ad spends with forward and reverse calculations for the ${marketUpper} marketplace.`,
    alternates: {
      canonical: `${siteUrl}/amazon-tools/profit-calculator/${market.toLowerCase()}`,
    },
    openGraph: {
      title: `Amazon Profit & ROI Calculator (${marketUpper} Marketplace) | Grow Orbit`,
      description: `Calculate FBA unit economics, margins, ROI, and break-even ad spends with forward and reverse calculations for the ${marketUpper} marketplace.`,
      url: `${siteUrl}/amazon-tools/profit-calculator/${market.toLowerCase()}`,
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
        "name": "Profit Calculator",
        "item": `${siteUrl}/amazon-tools/profit-calculator`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${marketUpper} Marketplace`,
        "item": `${siteUrl}/amazon-tools/profit-calculator/${market.toLowerCase()}`
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
