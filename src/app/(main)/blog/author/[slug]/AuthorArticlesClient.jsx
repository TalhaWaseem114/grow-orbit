"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 6 articles per page provides optimal visual balance (2 complete rows of 3 on desktop)
const POSTS_PER_PAGE = 6;

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

export default function AuthorArticlesClient({ posts = [], authorName = "Author", authorSlug = "talha-waseem" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam || 1);
  const gridRef = useRef(null);

  // Sync state with URL if query params change
  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
  }, [searchParams]);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, posts.length);

  const paginatedPosts = useMemo(() => {
    return posts.slice(startIndex, endIndex);
  }, [posts, startIndex, endIndex]);

  const getPageUrl = (targetPage) => {
    if (targetPage <= 1) {
      return `/blog/author/${authorSlug}/`;
    }
    return `/blog/author/${authorSlug}/?page=${targetPage}`;
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
    <section ref={gridRef} className="scroll-mt-28">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <BookOpen size={20} className="text-orange-500 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-montserrat text-zinc-900">
            Insights & Articles By {authorName} ({posts.length})
          </h2>
        </div>

        {posts.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-500">
                {totalPages === 1
                  ? `Showing all ${posts.length} article${posts.length === 1 ? "" : "s"}`
                  : startIndex + 1 === endIndex
                  ? `Showing article ${endIndex} of ${posts.length}`
                  : `Showing ${startIndex + 1}–${endIndex} of ${posts.length} articles`}
              </p>
            </div>
            {totalPages > 1 && (
              <div className="text-[10px] sm:text-[11px] font-bold text-zinc-700 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200/60">
                Page {safeCurrentPage} of {totalPages}
              </div>
            )}
          </div>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-zinc-100 rounded-[28px] p-12 text-center shadow-sm">
          <p className="text-zinc-500 font-light">
            No articles published by this author yet. Check back soon.
          </p>
        </div>
      ) : (
        <>
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
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
                          timeZone: "UTC",
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav
              aria-label="Author articles pagination"
              className="mt-16 flex flex-wrap items-center justify-center gap-3 pt-8 border-t border-zinc-200"
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

              {/* Numbered Page Buttons with Ellipsis */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {getPageNumbers(safeCurrentPage, totalPages).map((p, idx) => {
                  if (p === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-8 text-center text-xs text-zinc-400 select-none font-black"
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
    </section>
  );
}
