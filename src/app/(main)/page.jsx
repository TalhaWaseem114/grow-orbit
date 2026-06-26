import ClientPage from "./page-client";
import { getPageMetadata } from "@/config/seo";

export const metadata = getPageMetadata("/");

export default function Page() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grow Orbit",
    "url": "https://www.groworbitofficial.com",
    "logo": "https://www.groworbitofficial.com/logo.png",
    "sameAs": [
      "https://twitter.com/groworbit",
      "https://www.linkedin.com/company/groworbit"
    ],
    "description": "We run the systems that scale Amazon brands. Expert PPC advertising, listing optimization, product sourcing, and A+ creative design.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "48",
      "reviewCount": "48"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ClientPage />
    </>
  );
}
