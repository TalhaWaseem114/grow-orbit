import ClientPage from "./page-client";
import { getPageMetadata } from "@/config/seo";

export const metadata = getPageMetadata("/get-started");

export default function Page() {
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
    "name": "Get Started",
    "item": "https://www.groworbitofficial.com/get-started"
  }
]
  };

  return (
    <>
      <link rel="preconnect" href="https://calendly.com" />
      <link rel="preconnect" href="https://assets.calendly.com" />
      <link rel="dns-prefetch" href="https://calendly.com" />
      <link rel="dns-prefetch" href="https://assets.calendly.com" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ClientPage />
    </>
  );
}
