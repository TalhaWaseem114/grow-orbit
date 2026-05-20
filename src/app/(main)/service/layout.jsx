export const metadata = {
  title: "Our Services | Grow Orbit",
  description: "Browse the full Orbit suite of Amazon growth services. From Audit & Strategy to Full Account Management.",
  openGraph: {
    title: "Amazon Growth Services | Grow Orbit",
    description: "Scale your brand with 18+ specialized Amazon services. Audit, PPC, SEO, Design, and Management.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/service`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grow Orbit Services",
      },
    ],
  },
};

export default function ServicesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Amazon Growth Agency",
            "provider": {
              "@type": "Organization",
              "name": "Grow Orbit",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Amazon Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PPC Management" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Listing Optimization" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Design" } }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
