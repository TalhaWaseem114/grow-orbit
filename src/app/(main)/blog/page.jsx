import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import BlogClient from "./BlogClient";

export const revalidate = 60; // ISR revalidation every 60 seconds

export const metadata = {
  title: "E-Commerce & Amazon Growth Insights | Grow Orbit Blog",
  description: "Scale your e-commerce brand to 7+ figures. Expert strategies on Amazon listing optimization, PPC automation, brand storytelling, and operation scaling from Grow Orbit.",
  openGraph: {
    title: "E-Commerce & Amazon Growth Insights | Grow Orbit Blog",
    description: "Scale your e-commerce brand to 7+ figures. Expert insights on Amazon listing optimization, PPC, and operation scaling from Grow Orbit.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog`,
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Grow Orbit Blog Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce & Amazon Growth Insights | Grow Orbit Blog",
    description: "Scale your e-commerce brand to 7+ figures with expert strategies from Grow Orbit.",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default async function Page() {
  let posts = [];
  try {
    const q = query(collection(db, "blogs"), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  return <BlogClient initialPosts={posts} />;
}
