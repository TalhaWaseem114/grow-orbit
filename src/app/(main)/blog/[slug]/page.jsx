import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import BlogPostClient from "./BlogPostClient";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, BookOpen } from "lucide-react";
import { getReadTime, parseMarkdownText } from "@/lib/blogUtils";
import { getAuthorBySlug, getAuthorSlugByName } from "@/data/authorData";
import BlogShareBar from "@/components/blog/BlogShareBar";

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
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${slug}`,
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
    const q = query(collection(db, "blogs"), where("slug", "==", slug), where("status", "==", "published"));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      post = { id: doc.id, ...doc.data() };

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
        relatedPosts = relatedPosts.slice(0, 2);
      }
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }

  if (!post) {
    return (
      <main className="bg-[#fafafa] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <BookOpen size={48} className="text-zinc-300 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-zinc-900 mb-2">
            Article Not Found
          </h1>
          <p className="text-zinc-500 mb-8">
            This article doesn't exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest no-underline hover:bg-orange-500 transition-all"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const montserrat = { fontFamily: "'Montserrat', sans-serif" };
  const serif = { fontFamily: "'Playfair Display', serif" };

  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen">
      {/* Server-Side JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com"}/blog/${post.slug || post.id}`
            },
            "headline": post.title,
            "image": [post.coverImage],
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": getAuthorBySlug(getAuthorSlugByName(post.author?.name)).name,
              "jobTitle": getAuthorBySlug(getAuthorSlugByName(post.author?.name)).role,
              "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com"}/blog/author/${getAuthorSlugByName(post.author?.name)}`,
              "sameAs": Object.values(getAuthorBySlug(getAuthorSlugByName(post.author?.name)).socialLinks).filter(Boolean)
            },
            "publisher": {
              "@type": "Organization",
              "name": "Grow Orbit",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com"}/logo.png`
              }
            },
            "description": post.excerpt
          })
        }}
      />

      {/* ── HERO / COVER ── */}
      <section className="relative pt-[60px] sm:pt-[70px]">
        <div className="relative w-full min-h-[420px] sm:min-h-[480px] md:aspect-[21/8] overflow-hidden bg-zinc-900">
          <Image
            src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Back to blog */}
          <div className="absolute top-6 left-6 z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 text-white/90 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest no-underline hover:bg-black/50 transition-all"
            >
              <ArrowLeft size={12} /> Back to Blog
            </Link>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:p-16 z-10">
            <div className="max-w-[900px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/60 text-[10px] font-bold">
                  <Clock size={10} /> {getReadTime(post)}
                </span>
              </div>
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6"
                style={montserrat}
              >
                {post.title}
              </h1>
              <div className="flex items-center gap-5">
                <Link href={`/blog/author/${getAuthorSlugByName(post.author?.name)}`} className="flex items-center gap-3 no-underline group/auth">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-black overflow-hidden relative shrink-0 group-hover/auth:scale-105 transition-all">
                    {getAuthorBySlug(getAuthorSlugByName(post.author?.name)).avatar ? (
                      <img
                        src={getAuthorBySlug(getAuthorSlugByName(post.author?.name)).avatar}
                        alt={post.author?.name || "Grow Orbit"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      post.author?.name ? post.author.name[0] : "G"
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none group-hover/auth:text-orange-500 transition-colors">
                      {post.author?.name || "Grow Orbit"}
                    </p>
                    <p className="text-[10px] text-white/50 mt-1">
                      {post.author?.role || "Growth Architect"}
                    </p>
                  </div>
                </Link>
                <div className="hidden sm:flex items-center gap-2 text-white/40 text-[10px] font-bold">
                  <Calendar size={10} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY (SERVER RENDERED) ── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="max-w-[780px] mx-auto relative">
          {/* Social Share Bar */}
          <BlogShareBar title={post.title} slug={post.slug || post.id} />

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-8 border-b border-zinc-200">
            <Tag size={12} className="text-zinc-400" />
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content blocks parsed on the Server */}
          <article className="space-y-8">
            {post.content?.map((block, i) => {
              if (block.type === "divider") {
                return <hr key={i} className="border-t border-zinc-200 my-16" />;
              }
              if (block.type === "highlight") {
                return (
                  <div key={i} className="flex gap-4 items-start bg-orange-50/50 border-l-4 border-orange-500 py-6 px-6 sm:px-8 rounded-r-2xl my-10">
                    <span className="text-2xl mt-1 leading-none">💡</span>
                    <div 
                      className="text-zinc-800 font-medium leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: parseMarkdownText(block.text) }}
                    />
                  </div>
                );
              }
              if (block.type === "youtube") {
                const parts = block.text.split("|");
                const videoUrl = parts[0];
                const videoTitle = parts[1] || "YouTube Video";
                const videoId = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
                if (!videoId) return null;
                return (
                  <div key={i} className="relative w-full overflow-hidden rounded-2xl bg-zinc-900 my-10 shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full border-0" 
                      src={`https://www.youtube.com/embed/${videoId}`} 
                      title={videoTitle}
                      allowFullScreen 
                    />
                  </div>
                );
              }
              if (block.type === "cta") {
                const parts = block.text.split("|");
                if (parts.length < 2) return null;
                const url = parts[0];
                const btnText = parts[1];
                const hookText = parts[2] || "";
                
                const isInternal = url.startsWith("/");
                const btnClass = "inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-black text-sm sm:text-base uppercase tracking-widest px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl shadow-orange-500/20 hover:scale-105 hover:shadow-orange-500/40 transition-all duration-300";

                return (
                  <div key={i} className="flex flex-col items-center justify-center my-16 text-center">
                    {hookText && (
                      <p className="text-2xl sm:text-3xl font-medium text-zinc-800 mb-8 max-w-2xl leading-relaxed italic" style={serif}>
                        {hookText}
                      </p>
                    )}
                    {isInternal ? (
                      <Link href={url} className={btnClass}>
                        {btnText}
                      </Link>
                    ) : (
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={btnClass}
                      >
                        {btnText}
                      </a>
                    )}
                  </div>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="text-2xl sm:text-3xl font-black tracking-tight mt-12 mb-4 text-zinc-900"
                    style={montserrat}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "heading-h3") {
                return (
                  <h3
                    key={i}
                    className="text-xl sm:text-2xl font-black tracking-tight mt-10 mb-3 text-zinc-900"
                    style={montserrat}
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "heading-h4") {
                return (
                  <h4
                    key={i}
                    className="text-lg sm:text-xl font-bold tracking-tight mt-8 mb-2 text-zinc-900"
                    style={montserrat}
                  >
                    {block.text}
                  </h4>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="relative pl-8 py-6 my-10 border-l-4 border-orange-500 bg-orange-50/50 rounded-r-2xl pr-8"
                  >
                    <p
                      className="text-lg sm:text-xl font-bold text-zinc-800 leading-relaxed italic"
                      style={serif}
                      dangerouslySetInnerHTML={{ __html: parseMarkdownText(block.text) }}
                    />
                  </blockquote>
                );
              }
              if (block.type === "image") {
                const parts = block.text.split("|");
                return (
                  <div key={i} className="my-10 relative rounded-3xl overflow-hidden shadow-xl border border-zinc-100 bg-zinc-50 flex justify-center">
                    <Image
                      src={parts[0]}
                      alt={parts[1] || "Article Illustration"}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover max-h-[500px]"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                );
              }
              if (block.type === "list") {
                const items = block.text.split("\n").map(item => item.replace(/^[-*]\s*/, ""));
                return (
                  <ul key={i} className="space-y-3 my-6 pl-4 list-none">
                    {items.map((item, idx) => (
                      <li key={idx} className="relative text-[15px] sm:text-base text-zinc-600 leading-relaxed pl-6">
                        <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-orange-500"></span>
                        <span dangerouslySetInnerHTML={{ __html: parseMarkdownText(item) }} />
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "table") {
                const lines = block.text.split("\n").filter(line => line.trim().startsWith("|"));
                if (lines.length < 2) return null;

                const headers = lines[0].split("|").map(h => h.trim()).filter(Boolean);
                const rows = lines.slice(2).map(line => line.split("|").map(c => c.trim()).filter(Boolean));

                return (
                  <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-zinc-200">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200">
                          {headers.map((h, idx) => (
                            <th key={idx} className="p-4 font-bold text-zinc-950 uppercase tracking-wider text-[10px]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-50/50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-4 text-zinc-600" dangerouslySetInnerHTML={{ __html: parseMarkdownText(cell) }} />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              // paragraph — support basic **bold** and [link](url) markdown
              return (
                <p
                  key={i}
                  className="text-[15px] sm:text-base text-zinc-600 leading-[1.9] font-light whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdownText(block.text),
                  }}
                />
              );
            })}
          </article>

          {/* Client-Side Interactive Components (Upvotes, Comments) */}
          <BlogPostClient post={{ id: post.id, slug: post.slug, upvotes: post.upvotes, author: post.author }} />
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <BookOpen size={14} className="text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  Related Articles
                </span>
              </div>
              <Link
                href="/blog"
                className="text-[10px] font-black uppercase tracking-widest text-orange-500 no-underline flex items-center gap-2 hover:gap-3 transition-all"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block no-underline"
                >
                  <div className="bg-white rounded-[24px] overflow-hidden border border-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col sm:flex-row">
                    <div className="relative sm:w-[200px] aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden">
                      <Image
                        src={rp.coverImage}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="200px"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-orange-500">
                        {rp.category}
                      </span>
                      <h3 className="text-sm font-black text-zinc-900 mt-2 mb-2 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 flex items-center gap-3">
                        <span>{rp.author?.name || "Grow Orbit"}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={9} /> {getReadTime(rp)}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


    </main>
  );
}
