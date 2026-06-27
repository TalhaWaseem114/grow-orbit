import PortfolioClient from "./PortfolioClient";
import { PORTFOLIO_ITEMS } from "@/data/portfolioData";

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const item = PORTFOLIO_ITEMS.find((p) => p.id === id);

  if (!item) {
    return {
      title: "Project Not Found | Grow Orbit",
      description: "The requested portfolio case study could not be found.",
    };
  }

  const title = `${item.brandName} (${item.niche}) Case Study | Grow Orbit`;
  const description = `See how we drove ${item.outcome} for ${item.brandName} (${item.niche}) with tailored ${item.category}. Read the full case study.`;
  const canonical = `https://www.groworbitofficial.com/portfolio/${id}/`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: item.src || "https://www.groworbitofficial.com/logo.png",
          width: 1200,
          height: 630,
          alt: `${item.brandName} Case Study Cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [item.src || "https://www.groworbitofficial.com/logo.png"],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const item = PORTFOLIO_ITEMS.find((p) => p.id === id);

  if (!item) {
    return <PortfolioClient />;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.groworbitofficial.com/portfolio/${id}/`
    },
    "headline": `${item.brandName} - ${item.category} Case Study`,
    "description": item.challenge,
    "image": item.src,
    "author": {
      "@type": "Organization",
      "name": "Grow Orbit",
      "url": "https://www.groworbitofficial.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Grow Orbit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.groworbitofficial.com/logo.png"
      }
    },
    "about": {
      "@type": "Thing",
      "name": item.category
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PortfolioClient />
    </>
  );
}

