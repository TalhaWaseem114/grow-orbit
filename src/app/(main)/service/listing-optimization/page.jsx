import ClientPage from "./page-client";
import { getPageMetadata } from "@/config/seo";

export const metadata = getPageMetadata("/service/listing-optimization");

export default function Page(props) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
  {
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://groworbit.com"
  },
  {
    "@type": "ListItem",
    "position": 2,
    "name": "Service",
    "item": "https://groworbit.com/service"
  },
  {
    "@type": "ListItem",
    "position": 3,
    "name": "Listing Optimization",
    "item": "https://groworbit.com/service/listing-optimization"
  }
]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ClientPage {...props} />
    </>
  );
}
