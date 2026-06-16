import ClientPage from "./page-client";
import { getPageMetadata } from "@/config/seo";

export const metadata = getPageMetadata("/get-started/amazon-services-landing");

export default function Page(props) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grow Orbit",
    "url": "https://groworbit.com",
    "logo": "https://groworbit.com/logo.png",
    "sameAs": [
      "https://twitter.com/groworbit",
      "https://www.linkedin.com/company/groworbit"
    ],
    "description": "Amazon growth services landing page. PPC efficiency, organic rank optimization, and full Amazon store management.",
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
      <ClientPage {...props} />
    </>
  );
}
