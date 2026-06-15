import { getAuthorBySlug, AUTHORS } from "@/data/authorData";
import { BLOG_POSTS } from "@/data/blogData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Award, Linkedin, Twitter, Globe, BookOpen } from "lucide-react";

export const revalidate = 60; // ISR revalidation every 60 seconds

export async function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const author = getAuthorBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com";

  return {
    title: `${author.name} | E-Commerce Expert & Author | Grow Orbit`,
    description: author.bio.substring(0, 160) + "...",
    alternates: {
      canonical: `${siteUrl}/blog/author/${slug}`,
    },
    openGraph: {
      title: `${author.name} | E-Commerce Expert | Grow Orbit`,
      description: author.bio.substring(0, 160) + "...",
      url: `${siteUrl}/blog/author/${slug}`,
      images: [
        {
          url: author.avatar || "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          width: 800,
          height: 800,
          alt: author.name
        }
      ],
      type: "profile"
    }
  };
}

export default async function AuthorPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const author = getAuthorBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://groworbit.com";

  // Fetch blogs written by this author
  let authorPosts = [];
  try {
    // 1. Fetch from Firestore
    const q = query(
      collection(db, "blogs"),
      where("status", "==", "published")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (data.author && data.author.name === "Talha Waseem") {
        data.author.name = "Ali";
      }
      if (data.author?.name === author.name) {
        authorPosts.push({ id: doc.id, ...data });
      }
    });
  } catch (error) {
    console.warn("Firestore search failed, falling back to local posts:", error);
  }

  // 2. Fetch from static dummy data as fallback/addition
  const localPosts = BLOG_POSTS.filter(
    (p) => p.author?.name?.toLowerCase() === author.name.toLowerCase()
  );
  
  // Merge lists by slug to prevent duplicates
  const postMap = new Map();
  authorPosts.forEach(p => postMap.set(p.slug || p.id, p));
  localPosts.forEach(p => {
    if (!postMap.has(p.slug)) {
      postMap.set(p.slug, p);
    }
  });

  const mergedPosts = Array.from(postMap.values());
  // Sort posts by date descending
  mergedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Dynamic reading time helper
  const getReadTime = (post) => {
    if (!post) return "5 min read";
    if (post.readTime && post.readTime.trim() !== "") return post.readTime;
    if (!post.content || !Array.isArray(post.content)) return "5 min read";
    let textStr = "";
    post.content.forEach((b) => {
      if (b?.text) textStr += " " + b.text;
    });
    const words = textStr.trim().split(/\s+/).filter(Boolean).length;
    if (words === 0) return "5 min read";
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  // Structured Person schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.role,
    "worksFor": {
      "@type": "Organization",
      "name": "Grow Orbit",
      "url": siteUrl
    },
    "url": `${siteUrl}/blog/author/${author.slug}`,
    "image": author.avatar,
    "description": author.bio,
    "sameAs": Object.values(author.socialLinks).filter(Boolean)
  };

  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen pt-[120px] pb-24">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-orange-500 text-[10px] font-bold uppercase tracking-widest no-underline transition-colors mb-8"
        >
          <ArrowLeft size={12} /> BACK TO GROWTH JOURNAL
        </Link>

        {/* --- AUTHOR BIO PANEL --- */}
        <section className="bg-zinc-900 text-white rounded-[40px] p-8 sm:p-12 md:p-16 relative overflow-hidden border border-zinc-800 shadow-2xl mb-20">
          {/* Subtle gradient highlights */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10">
            {/* Avatar */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-black shrink-0 shadow-lg border-2 border-zinc-700/50 overflow-hidden relative">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 144px, 144px"
                />
              ) : (
                author.name[0]
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <span className="bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[9px] font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full inline-block mb-4">
                Verified E-Commerce Specialist
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 font-montserrat">
                {author.name}
              </h1>
              <p className="text-zinc-400 font-mono text-[11px] sm:text-xs uppercase tracking-wider mb-6">
                {author.role} · GROW ORBIT
              </p>
              
              <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed mb-8 max-w-3xl">
                {author.bio}
              </p>

              {/* Verified Credentials */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
                  Verified Expertise & Credentials
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                  {author.credentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-800/80 border border-zinc-700/40 text-zinc-200 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-2"
                    >
                      <Award size={12} className="text-orange-500" />
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="flex justify-center md:justify-start items-center gap-4 pt-4 border-t border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Connect:
                </span>
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center text-white transition-all hover:scale-105"
                  >
                    <Linkedin size={14} />
                  </a>
                )}
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center text-white transition-all hover:scale-105"
                  >
                    <Twitter size={14} />
                  </a>
                )}
                {author.socialLinks.website && (
                  <a
                    href={author.socialLinks.website}
                    className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center text-white transition-all hover:scale-105"
                  >
                    <Globe size={14} />
                  </a>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* --- ARTICLES SECTION --- */}
        <section>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-zinc-250">
            <BookOpen size={18} className="text-orange-500" />
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-montserrat">
              Insights & Articles By {author.name} ({mergedPosts.length})
            </h2>
          </div>

          {mergedPosts.length === 0 ? (
            <div className="bg-white border border-zinc-100 rounded-[28px] p-12 text-center shadow-sm">
              <p className="text-zinc-500 font-light">
                No articles published by this author yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mergedPosts.map((post) => (
                <Link
                  key={post.slug || post.id}
                  href={`/blog/${post.slug || post.id}`}
                  className="group block no-underline"
                >
                  <article className="bg-white rounded-[28px] overflow-hidden border border-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                      {post.coverImage && (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-zinc-700 border border-zinc-100">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="text-[15px] font-black leading-snug tracking-tight mb-3 text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[13px] text-zinc-650 font-light leading-relaxed mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-5 border-t border-zinc-100">
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            timeZone: "UTC"
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-bold text-zinc-600">
                          <Clock size={10} /> {getReadTime(post)}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
