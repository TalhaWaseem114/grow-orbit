export const metadata = {
  title: "About Us | Grow Orbit",
  description: "Learn about the engine behind top-tier Amazon brands. Meet our collective of specialists dedicated to scaling your business.",
  openGraph: {
    title: "The Minds Behind the Orbit | About Grow Orbit",
    description: "We are a full-stack Amazon growth partner engineering the visuals and managing the daily operations of 7-figure brands.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/about`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Grow Orbit",
      },
    ],
  },
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Grow Orbit",
              "description": "Amazon Growth Agency specializing in account management, PPC efficiency, and visual engineering."
            }
          })
        }}
      />
      {children}
    </>
  );
}
