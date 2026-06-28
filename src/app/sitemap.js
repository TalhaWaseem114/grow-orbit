import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { AUTHORS } from "@/data/authorData";
import { GLOSSARY_TERMS } from "@/data/glossaryData";
import { PORTFOLIO_ITEMS } from "@/data/portfolioData";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
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
    '/service/product-hunting-sourcing',
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
    '/service/design/brand-story',
    '/service/design/main-image-ctr',
    '/service/design/listing-image-systems',
    '/service/design/full-listing-optimization',
    '/service/design/enhanced-brand-content',
    '/service/design/brand-store',
    '/service/design/brand-guidelines',
    '/amazon-tools',
    '/amazon-tools/profit-calculator',
    '/amazon-tools/profit-calculator/us',
    '/amazon-tools/profit-calculator/uk',
    '/amazon-tools/profit-calculator/de',
    '/amazon-tools/storage-fee-calculator',
    '/amazon-tools/storage-fee-calculator/us',
    '/amazon-tools/storage-fee-calculator/uk',
    '/amazon-tools/storage-fee-calculator/de',
    '/amazon-tools/quick-estimator',
    '/amazon-tools/quick-estimator/us',
    '/amazon-tools/quick-estimator/uk',
    '/amazon-tools/quick-estimator/de',
    '/amazon-tools/fba-fee-calculator',
    '/amazon-tools/fba-fee-calculator/us',
    '/amazon-tools/fba-fee-calculator/uk',
    '/amazon-tools/fba-fee-calculator/de',
    '/amazon-tools/fba-fee-calculator/electronics',
    '/amazon-tools/fba-fee-calculator/apparel',
    '/amazon-tools/fba-fee-calculator/home-goods',
    '/amazon-tools/fba-vs-fbm-vs-3pl',
    '/amazon-tools/fba-vs-fbm-vs-3pl/us',
    '/amazon-tools/fba-vs-fbm-vs-3pl/uk',
    '/amazon-tools/fba-vs-fbm-vs-3pl/de',
    '/about',
    '/portfolio',
    '/case-study',
    '/faq'
  ];

  const staticServiceUrls = serviceRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-06-15'),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const caseStudies = [
    { path: '/case-study/li-01', date: '2026-05-10' },
    { path: '/case-study/li-02', date: '2026-05-28' },
    { path: '/case-study/li-03', date: '2026-06-02' }
  ];

  const caseStudyUrls = caseStudies.map(cs => ({
    url: `${baseUrl}${cs.path}`,
    lastModified: new Date(cs.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const authorUrls = Object.keys(AUTHORS).map((slug) => ({
    url: `${baseUrl}/blog/author/${slug}`,
    lastModified: new Date('2026-06-15'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const portfolioUrls = PORTFOLIO_ITEMS.map((item) => ({
    url: `${baseUrl}/portfolio/${item.id}`,
    lastModified: new Date('2026-06-15'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const rawUrls = [
    {
      url: baseUrl,
      lastModified: new Date('2026-06-15'),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: new Date('2026-06-15'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-06-15'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...staticServiceUrls,
    ...caseStudyUrls,
    ...authorUrls,
    ...portfolioUrls,
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-06-15'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date('2026-06-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...Object.keys(GLOSSARY_TERMS).map(slug => ({
      url: `${baseUrl}/glossary/${slug}`,
      lastModified: new Date('2026-06-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    // Spread dynamic blog URLs
    ...blogUrls,
  ];

  return rawUrls.map(item => {
    let url = item.url;
    if (!url.endsWith('/')) {
      url = `${url}/`;
    }
    return {
      ...item,
      url,
    };
  });
}
