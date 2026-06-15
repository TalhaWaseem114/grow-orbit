import { Suspense } from "react";
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

function BlogSkeleton() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="relative pt-[90px] sm:pt-[70px] pb-16 sm:pb-24 px-6 overflow-hidden">
         <div className="max-w-[1200px] mx-auto text-center relative z-10 animate-pulse flex flex-col items-center">
            <div className="w-32 h-8 bg-zinc-200 rounded-full mb-12"></div>
            <div className="w-3/4 h-24 bg-zinc-200 rounded-2xl mb-10"></div>
            <div className="w-1/2 h-6 bg-zinc-200 rounded-full mb-12"></div>
            <div className="w-full max-w-xl h-14 bg-zinc-200 rounded-2xl"></div>
         </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[28px] overflow-hidden border border-zinc-100 shadow-sm animate-pulse h-full flex flex-col">
              <div className="w-full aspect-[16/10] bg-zinc-100" /> 
              <div className="p-7 flex flex-col flex-1 space-y-4">
                <div className="h-6 bg-zinc-100 rounded-md w-5/6" /> 
                <div className="h-4 bg-zinc-100 rounded-md w-full" /> 
                <div className="h-4 bg-zinc-100 rounded-md w-2/3" /> 
                <div className="mt-auto pt-5 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-zinc-100 rounded-full" />
                    <div className="w-20 h-3 bg-zinc-100 rounded-sm" />
                  </div>
                  <div className="w-16 h-3 bg-zinc-100 rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Page() {
  let posts = [];
  try {
    const q = query(collection(db, "blogs"), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (data.author && data.author.name === "Talha Waseem") {
        data.author.name = "Ali";
      }
      posts.push({ id: doc.id, ...data });
    });
    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogClient initialPosts={posts} />
    </Suspense>
  );
}
