import ClientPage from "./page-client";
import { getPageMetadata } from "@/config/seo";

export const metadata = getPageMetadata("/service/design/brand-store");

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
    "name": "Service",
    "item": "https://www.groworbitofficial.com/service"
  },
  {
    "@type": "ListItem",
    "position": 3,
    "name": "Design",
    "item": "https://www.groworbitofficial.com/service/design"
  },
  {
    "@type": "ListItem",
    "position": 4,
    "name": "Brand Store",
    "item": "https://www.groworbitofficial.com/service/design/brand-store"
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
