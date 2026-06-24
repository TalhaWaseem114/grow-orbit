import ClientPage from "../page-client";

export async function generateStaticParams() {
  return [
    { slug: "us" },
    { slug: "uk" },
    { slug: "de" },
    { slug: "apparel" },
    { slug: "electronics" },
    { slug: "home-goods" }
  ];
}

const isMarket = (slug) => ["us", "uk", "de"].includes(slug?.toLowerCase());

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "us";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
  
  if (isMarket(slug)) {
    const marketUpper = slug.toUpperCase();
    return {
      title: `Amazon FBA Fee Calculator (${marketUpper} Marketplace) | Grow Orbit`,
      description: `Calculate your Amazon FBA size tier, fulfillment costs, storage fees, and referral commission fees for the ${marketUpper} marketplace.`,
      alternates: {
        canonical: `${siteUrl}/amazon-tools/fba-fee-calculator/${slug.toLowerCase()}`,
      },
      openGraph: {
        title: `Amazon FBA Fee Calculator (${marketUpper} Marketplace) | Grow Orbit`,
        description: `Calculate your Amazon FBA size tier, fulfillment costs, storage fees, and referral commission fees for the ${marketUpper} marketplace.`,
        url: `${siteUrl}/amazon-tools/fba-fee-calculator/${slug.toLowerCase()}`,
        type: "website"
      }
    };
  } else {
    // It's a category
    const categoryName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      title: `Amazon FBA Fee Calculator for ${categoryName} | Grow Orbit`,
      description: `Accurately calculate Amazon FBA fulfillment costs, referral fees, and size tiers specifically for ${categoryName} products.`,
      alternates: {
        canonical: `${siteUrl}/amazon-tools/fba-fee-calculator/${slug.toLowerCase()}`,
      },
      openGraph: {
        title: `Amazon FBA Fee Calculator for ${categoryName} | Grow Orbit`,
        description: `Accurately calculate Amazon FBA fulfillment costs, referral fees, and size tiers specifically for ${categoryName} products.`,
        url: `${siteUrl}/amazon-tools/fba-fee-calculator/${slug.toLowerCase()}`,
        type: "website"
      }
    };
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "us";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";

  let market = "US";
  let category = "";
  let nameObj = "";
  
  if (isMarket(slug)) {
    market = slug.toUpperCase();
    nameObj = `${market} Marketplace`;
  } else {
    market = "US"; // default to US
    category = slug;
    nameObj = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

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
        "name": "FBA Fee Calculator",
        "item": `${siteUrl}/amazon-tools/fba-fee-calculator`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": nameObj,
        "item": `${siteUrl}/amazon-tools/fba-fee-calculator/${slug.toLowerCase()}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ClientPage market={market} initialCategory={category} />
    </>
  );
}
