import ClientPage from "./page-client";
import { getPageMetadata } from "@/config/seo";

export const metadata = getPageMetadata("/amazon-tools/storage-fee-calculator");

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
    "name": "Amazon Tools",
    "item": "https://groworbit.com/amazon-tools"
  },
  {
    "@type": "ListItem",
    "position": 3,
    "name": "Storage Fee Calculator",
    "item": "https://groworbit.com/amazon-tools/storage-fee-calculator"
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
