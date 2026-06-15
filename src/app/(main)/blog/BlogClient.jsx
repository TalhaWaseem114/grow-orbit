"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Clock, Search,
  TrendingUp, Zap, BookOpen,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES } from "@/data/blogData";

const montserrat = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Playfair Display', serif" };

// Helper to dynamically calculate reading time based on content word count
function getReadTime(post) {
  if (!post) return "5 min read";
  if (post.readTime && post.readTime.trim() !== "") return post.readTime;
  if (!post.content || !Array.isArray(post.content)) return "5 min read";

  let allText = "";
  post.content.forEach((block) => {
    if (block?.text) {
      allText += " " + block.text;
    }
  });

  const wordsCount = allText.trim().split(/\s+/).filter(Boolean).length;
  if (wordsCount === 0) return "5 min read";

  const readingSpeed = 200; // average words per minute
  const minutes = Math.max(1, Math.ceil(wordsCount / readingSpeed));
  return `${minutes} min read`;
}

export default function BlogClient({ initialPosts }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;
    if (activeCategory && activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    return posts;
  }, [activeCategory, searchQuery, initialPosts]);

  const featuredPosts = initialPosts.filter((p) => p.featured).slice(0, 2);
  // If no explicitly featured posts, fallback to the latest two
  const displayFeatured = featuredPosts.length > 0 ? featuredPosts : initialPosts.slice(0, 2);

  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-[90px] sm:pt-[70px] pb-16 sm:pb-24 px-6 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(249,115,22,0.1),transparent_70%)]" />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-zinc-100 mb-12">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-[9px]">
              Orbit Intelligence
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-[104px] font-black tracking-tight leading-[1.05] sm:leading-[0.9] mb-10 uppercase text-zinc-900"
            style={montserrat}
          >
            <span className="block font-black text-zinc-400/30 text-[20px] sm:text-[32px] tracking-[0.2em] mb-4">
              The
            </span>
            Growth{" "}
            <span className="italic font-light text-orange-500" style={serif}>
              Journal
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Actionable strategies, conversion frameworks, and launch playbooks
            from the team that's built $120K+/month brands from zero.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search articles, strategies, topics…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-zinc-200 text-sm font-medium text-zinc-900 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.04)] focus:outline-none focus:border-orange-300 focus:shadow-[0_8px_30px_-5px_rgba(249,115,22,0.08)] transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED POSTS ── */}
      {!searchQuery && activeCategory === "All" && displayFeatured.length > 0 && (
        <section className="px-6 mb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Zap size={14} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                Featured
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {displayFeatured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block no-underline"
                >
                  <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06)] border border-zinc-100 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 min-h-[320px] sm:min-h-[auto] sm:aspect-[16/9] flex flex-col justify-end">
                    <Image
                      src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
                        <TrendingUp size={10} className="text-orange-500" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 p-6 sm:p-8 text-white mt-auto w-full">
                      <h2 className="text-lg sm:text-xl font-black leading-tight mb-4 tracking-tight">
                        {post.title}
                      </h2>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-white/60">
                            {post.author?.name || "Grow Orbit"}
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/60">
                            <Clock size={10} /> {getReadTime(post)}
                          </span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 transition-all border border-white/10">
                          <ArrowUpRight size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORY FILTERS ── */}
      <section className="px-6 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-3">
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border inline-block no-underline ${
                  activeCategory === cat
                    ? "bg-zinc-900 text-white border-zinc-900 shadow-lg"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-700"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POST GRID ── */}
      <section className="px-6 mb-28">
        <div className="max-w-[1400px] mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={40} className="text-zinc-300 mx-auto mb-4" />
              <p className="text-lg font-bold text-zinc-400">
                No articles found
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                Try a different category or search term
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block no-underline"
                >
                  <article className="bg-white rounded-[28px] overflow-hidden border border-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                    {/* Image */}
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

                    {/* Content */}
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="text-[15px] font-black leading-snug tracking-tight mb-3 text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[13px] text-zinc-650 font-light leading-relaxed mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-5 border-t border-zinc-100">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-[10px] font-black">
                            {post.author?.name ? post.author.name[0] : "G"}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-700 leading-none">
                              {post.author?.name || "Grow Orbit"}
                            </p>
                            <p className="text-[9px] text-zinc-600 mt-0.5" suppressHydrationWarning>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                timeZone: "UTC"
                              })}
                            </p>
                          </div>
                        </div>
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
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="mb-20 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-orange-500 font-mono text-[9px] font-bold uppercase tracking-[0.4em] mb-6">
            Want these strategies applied to your brand?
          </p>
          <h2 className="text-[34px] sm:text-5xl md:text-6xl font-black mb-10 tracking-tighter uppercase leading-[0.85] sm:leading-[0.88]">
            Let&apos;s build your{" "}
            <span className="italic font-light text-zinc-300" style={serif}>
              growth system.
            </span>
          </h2>
          <Link
            href="/get-started"
            className="w-full sm:w-auto bg-zinc-900 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] hover:bg-orange-500 transition-all inline-flex items-center justify-center gap-4 shadow-2xl no-underline group"
          >
            Book Free Strategy Call
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
