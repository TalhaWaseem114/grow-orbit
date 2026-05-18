import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import BlogClient from "./BlogClient";

export const revalidate = 60; // ISR revalidation every 60 seconds

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
