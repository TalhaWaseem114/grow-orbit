import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 60; // ISR revalidation every 60 seconds

export async function generateStaticParams() {
  let params = [];
  try {
    const q = query(collection(db, "blogs"), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      params.push({ slug: doc.data().slug || doc.id });
    });
  } catch (error) {
    console.error("Error generating static params:", error);
  }

  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const q = query(collection(db, "blogs"), where("slug", "==", slug), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const post = doc.data();
      
      return {
        title: `${post.title} | Grow Orbit`,
        description: post.excerpt || `Read ${post.title} on Grow Orbit.`,
        openGraph: {
          title: post.title,
          description: post.excerpt,
          url: `https://groworbit.co/blog/${slug}`,
          type: "article",
          publishedTime: post.date,
          authors: [post.author?.name || "Grow Orbit"],
          images: [
            {
              url: post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.excerpt,
          images: [post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Blog Post Not Found | Grow Orbit",
    description: "The requested blog post could not be found.",
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  let post = null;
  let relatedPosts = [];

  try {
    // 1. Fetch the specific post
    const q = query(collection(db, "blogs"), where("slug", "==", slug), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      post = { id: doc.id, ...doc.data() };
      
      // 2. Fetch related posts in the same category
      if (post.category) {
        const relatedQ = query(
          collection(db, "blogs"), 
          where("category", "==", post.category),
          where("status", "==", "published")
        );
        const relatedSnap = await getDocs(relatedQ);
        relatedSnap.forEach((relatedDoc) => {
          if (relatedDoc.id !== post.id) {
            relatedPosts.push({ id: relatedDoc.id, ...relatedDoc.data() });
          }
        });
      }
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts.slice(0, 2)} />;
}
