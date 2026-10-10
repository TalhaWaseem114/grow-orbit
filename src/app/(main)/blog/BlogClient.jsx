"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Clock, Search,
  TrendingUp, Zap, BookOpen, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES } from "@/data/blogData";
import { getAuthorBySlug, getAuthorSlugByName } from "@/data/authorData";

const montserrat = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Playfair Display', serif" };

// 6 articles per page provides optimal visual balance (2 complete rows of 3 on desktop)
const POSTS_PER_PAGE = 6;

function getAuthorAvatar(post) {
  if (post?.author?.avatar) return post.author.avatar;
  const authorData = getAuthorBySlug(getAuthorSlugByName(post?.author?.name));
  return authorData?.avatar || "https://res.cloudinary.com/dciggvulg/image/upload/v1786712729/groworbit/authors/talha-waseem-avatar.jpg";
}

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

// Smart helper to generate pagination button array with ellipsis
function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function BlogClient({ initialPosts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam || 1);
  const [searchQuery, setSearchQuery] = useState("");
  const gridRef = useRef(null);

  // Sync state with URL if query params change
  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
  }, [searchParams]);

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

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length);

  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, startIndex, endIndex]);

  const displayFeatured = useMemo(() => {
    return initialPosts.filter((p) => p.featured === true).slice(0, 2);
  }, [initialPosts]);

  const getPageUrl = (targetPage) => {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "All") {
      params.set("category", activeCategory);
    }
    if (targetPage > 1) {
      params.set("page", targetPage.toString());
    }
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const handlePageChange = (targetPage) => {
    if (targetPage < 1 || targetPage > totalPages || targetPage === safeCurrentPage) return;
    setCurrentPage(targetPage);
    router.push(getPageUrl(targetPage), { scroll: false });
    if (gridRef.current) {
      const yOffset = -90;
      const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-zinc-200 text-sm font-medium text-zinc-900 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.04)] focus:outline-none focus:border-orange-300 focus:shadow-[0_8px_30px_-5px_rgba(249,115,22,0.08)] transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED POSTS (Shown on Page 1 when not filtering) ── */}
      {!searchQuery && activeCategory === "All" && safeCurrentPage === 1 && displayFeatured.length > 0 && (
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
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0 border border-white/20">
                            <Image
                              src={getAuthorAvatar(post)}
                              alt={post.author?.name || "Talha Waseem"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-white/90">
                            {post.author?.name || "Talha Waseem"}
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

      {/* ── POST GRID WITH PAGINATION ── */}
      <section ref={gridRef} id="articles-grid" className="px-6 mb-28 scroll-mt-24">
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
            <>
              {/* Results Count & Current Page Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-zinc-200/70">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-500">
                    {totalPages === 1
                      ? `Showing all ${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"}`
                      : startIndex + 1 === endIndex
                      ? `Showing article ${endIndex} of ${filteredPosts.length}`
                      : `Showing ${startIndex + 1}–${endIndex} of ${filteredPosts.length} articles`}
                  </p>
                </div>
                {totalPages > 1 && (
                  <div className="text-[10px] sm:text-[11px] font-bold text-zinc-650 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200/60 self-start sm:self-auto">
                    Page {safeCurrentPage} of {totalPages}
                  </div>
                )}
              </div>

              {/* Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
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
                            <div className="w-7 h-7 rounded-full overflow-hidden relative shrink-0 border border-zinc-100 shadow-sm">
                              <Image
                                src={getAuthorAvatar(post)}
                                alt={post.author?.name || "Talha Waseem"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-zinc-700 leading-none">
                                {post.author?.name || "Talha Waseem"}
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

              {/* ── PAGINATION CONTROLS ── */}
              {totalPages > 1 && (
                <nav
                  aria-label="Blog pagination"
                  className="mt-16 pt-8 border-t border-zinc-200/70 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                  {/* Previous Page Button */}
                  <Link
                    href={getPageUrl(safeCurrentPage - 1)}
                    onClick={(e) => {
                      if (safeCurrentPage <= 1) {
                        e.preventDefault();
                      } else {
                        e.preventDefault();
                        handlePageChange(safeCurrentPage - 1);
                      }
                    }}
                    aria-disabled={safeCurrentPage <= 1}
                    tabIndex={safeCurrentPage <= 1 ? -1 : 0}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 border no-underline ${
                      safeCurrentPage <= 1
                        ? "opacity-35 cursor-not-allowed bg-zinc-50 text-zinc-400 border-zinc-200 select-none"
                        : "bg-white text-zinc-800 border-zinc-200 shadow-xs hover:border-orange-500 hover:text-orange-600 hover:shadow-md active:scale-95"
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </Link>

                  {/* Numeric Page Pills */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                    {getPageNumbers(safeCurrentPage, totalPages).map((p, idx) => {
                      if (p === "...") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-2 py-2 text-zinc-400 font-black text-xs select-none"
                          >
                            …
                          </span>
                        );
                      }

                      const isCurrent = p === safeCurrentPage;
                      return (
                        <Link
                          key={`page-${p}`}
                          href={getPageUrl(p)}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(p);
                          }}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`min-w-[42px] h-[42px] px-3.5 rounded-2xl text-xs font-black transition-all duration-200 flex items-center justify-center border no-underline ${
                            isCurrent
                              ? "bg-zinc-900 text-white border-zinc-900 shadow-md scale-105"
                              : "bg-white text-zinc-700 border-zinc-200 shadow-2xs hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50/30 active:scale-95"
                          }`}
                        >
                          {p}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <Link
                    href={getPageUrl(safeCurrentPage + 1)}
                    onClick={(e) => {
                      if (safeCurrentPage >= totalPages) {
                        e.preventDefault();
                      } else {
                        e.preventDefault();
                        handlePageChange(safeCurrentPage + 1);
                      }
                    }}
                    aria-disabled={safeCurrentPage >= totalPages}
                    tabIndex={safeCurrentPage >= totalPages ? -1 : 0}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 border no-underline ${
                      safeCurrentPage >= totalPages
                        ? "opacity-35 cursor-not-allowed bg-zinc-50 text-zinc-400 border-zinc-200 select-none"
                        : "bg-white text-zinc-800 border-zinc-200 shadow-xs hover:border-orange-500 hover:text-orange-600 hover:shadow-md active:scale-95"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </Link>
                </nav>
              )}
            </>
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
