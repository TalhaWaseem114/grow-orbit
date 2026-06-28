export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin-dashboard", "/login", "/register", "/api", "/*?"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
