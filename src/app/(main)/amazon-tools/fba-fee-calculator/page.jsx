import ClientPage from "./page-client";
import { getPageMetadata } from "@/config/seo";

export const metadata = getPageMetadata("/amazon-tools/fba-fee-calculator");

export default function Page(props) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
  {
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.groworbitofficial.com"
  },
  {
    "@type": "ListItem",
    "position": 2,
    "name": "Amazon Tools",
    "item": "https://www.groworbitofficial.com/amazon-tools"
  },
  {
    "@type": "ListItem",
    "position": 3,
    "name": "FBA Fee Calculator",
    "item": "https://www.groworbitofficial.com/amazon-tools/fba-fee-calculator"
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
