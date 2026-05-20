import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let blogUrls = [];

  try {
    const q = query(collection(db, "blogs"), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);

    blogUrls = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Determine lastModified from date field (fallback to current date if missing/invalid)
      let lastModified = new Date();
      if (data.date) {
        try {
          // If it's a Firestore Timestamp, it will have toDate()
          if (typeof data.date.toDate === 'function') {
            lastModified = data.date.toDate();
          } else {
            lastModified = new Date(data.date);
          }
        } catch (e) {
          console.warn("Invalid date format in blog post:", data.slug);
        }
      }

      return {
        url: `${baseUrl}/blog/${data.slug || doc.id}`,
        lastModified: lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  const serviceRoutes = [
    '/service',
    '/service/audit-strategy',
    '/service/amazon-services',
    '/service/brand-launch',
    '/service/ppc-efficiency',
    '/service/listing-optimization',
    '/service/design-creative',
    '/service/account-ops',
    '/service/amazon-dsp',
    '/service/growth-automation',
    '/service/trademark-registration',
    '/service/dtc-website',
    '/service/ongoing-support',
    '/service/coaching-consultation',
    '/service/sop',
    '/service/full',
    '/service/design',
    '/about',
    '/portfolio',
    '/case-study',
    '/faq'
  ];

  const staticServiceUrls = serviceRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...staticServiceUrls,
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // Spread dynamic blog URLs
    ...blogUrls,
  ];
}
