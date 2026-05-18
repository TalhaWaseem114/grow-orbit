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
