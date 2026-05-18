"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Clock,
  Calendar, Tag, ChevronRight, BookOpen, Heart,
  MessageSquare, Send
} from "lucide-react";
import { doc, updateDoc, increment, collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/firebase/firebaseConfig";

const montserrat = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Playfair Display', serif" };

/* ════════════════════════════════════════════
   BLOG POST DETAIL PAGE
════════════════════════════════════════════ */
export default function BlogPostClient({ post, relatedPosts }) {
  const [upvotes, setUpvotes] = useState(post?.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      if (post?.id) {
        try {
          const q = query(collection(db, "blogs", post.id, "comments"), orderBy("createdAt", "desc"));
          const snap = await getDocs(q);
          const loadedComments = [];
          snap.forEach((doc) => {
            const data = doc.data();
            loadedComments.push({
              id: doc.id,
              ...data,
              date: data.createdAt ? new Date(data.createdAt.toMillis()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Just now",
            });
          });
          setComments(loadedComments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      } else {
        setComments([]);
      }
    }
    fetchComments();
  }, [post?.id]);

  useEffect(() => {
    if (post?.slug) {
      const voted = localStorage.getItem(`upvoted_${post.slug}`);
      if (voted) {
        setHasUpvoted(true);
      }
    }
  }, [post]);

  const handleUpvote = async () => {
    if (hasUpvoted || isVoting || !post?.slug) return;
    setIsVoting(true);

    // Optimistic UI update
    setUpvotes(prev => prev + 1);
    setHasUpvoted(true);
    localStorage.setItem(`upvoted_${post.slug}`, "true");

    // Only update Firebase if it's a real database post (has an id)
    if (post.id) {
      try {
        const postRef = doc(db, "blogs", post.id);
        await updateDoc(postRef, {
          upvotes: increment(1)
        });
      } catch (error) {
        console.error("Failed to save upvote:", error);
      }
    }
    setIsVoting(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser || isSubmittingComment) return;
    setIsSubmittingComment(true);

    const commentData = {
      text: newComment,
      authorName: currentUser.displayName || currentUser.email.split("@")[0],
      authorId: currentUser.uid,
      createdAt: serverTimestamp(),
    };

    if (post?.id) {
      try {
        const docRef = await addDoc(collection(db, "blogs", post.id, "comments"), commentData);
        setComments([{
          id: docRef.id,
          ...commentData,
          date: "Just now"
        }, ...comments]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
    setIsSubmittingComment(false);
  };

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

  // Next/Prev are hidden for now since we'd need to query the full list to find neighbors,
  // but we can add them back later if needed.
  const prevPost = null;
  const nextPost = null;

  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen">
      {/* ── HERO / COVER ── */}
      <section className="relative pt-[60px] sm:pt-[70px]">
        <div className="relative w-full aspect-[21/9] sm:aspect-[21/7] max-h-[500px] overflow-hidden">
          <Image
            src={post.coverImage}
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
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 z-10">
            <div className="max-w-[900px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/60 text-[10px] font-bold">
                  <Clock size={10} /> {post.readTime}
                </span>
              </div>
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6"
                style={montserrat}
              >
                {post.title}
              </h1>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-black">
                    {post.author?.name ? post.author.name[0] : "G"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">
                      {post.author?.name || "Grow Orbit"}
                    </p>
                    <p className="text-[10px] text-white/50 mt-1">
                      {post.author?.role || "Growth Architect"}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/40 text-[10px] font-bold">
                  <Calendar size={10} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="max-w-[780px] mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-8 border-b border-zinc-200">
            <Tag size={12} className="text-zinc-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content blocks */}
          <article className="space-y-8">
            {post.content?.map((block, i) => {
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
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="relative pl-8 py-6 my-10 border-l-4 border-orange-500 bg-orange-50/50 rounded-r-2xl pr-8"
                  >
                    <p
                      className="text-lg sm:text-xl font-bold text-zinc-800 leading-relaxed italic"
                      style={serif}
                    >
                      &ldquo;{block.text}&rdquo;
                    </p>
                  </blockquote>
                );
              }
              // paragraph — support basic **bold** markdown
              return (
                <div
                  key={i}
                  className="text-[15px] sm:text-base text-zinc-600 leading-[1.9] font-light whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: block.text
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-bold text-zinc-900">$1</strong>'
                      ),
                  }}
                />
              );
            })}
          </article>

          {/* Upvote Section */}
          <div className="mt-12 flex items-center justify-center">
            <button
              onClick={handleUpvote}
              disabled={hasUpvoted || isVoting}
              className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
                hasUpvoted 
                  ? "bg-orange-50 border-orange-200 cursor-default" 
                  : "bg-white border-zinc-200 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              }`}
            >
              <div className={`p-2 rounded-full transition-colors ${hasUpvoted ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-zinc-100 text-zinc-400 group-hover:bg-orange-50 group-hover:text-orange-500"}`}>
                <Heart size={20} className={hasUpvoted ? "fill-current" : ""} />
              </div>
              <span className={`text-sm font-bold ${hasUpvoted ? "text-orange-600" : "text-zinc-600 group-hover:text-orange-600"}`}>
                {upvotes} {upvotes === 1 ? "Upvote" : "Upvotes"}
              </span>
            </button>
          </div>

          {/* Author card */}
          <div className="mt-16 pt-10 border-t border-zinc-200">
            <div className="bg-white rounded-[28px] p-8 border border-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-black shrink-0">
                {post.author?.name ? post.author.name[0] : "G"}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-1">
                  Written by
                </p>
                <p className="text-lg font-black text-zinc-900">
                  {post.author?.name || "Grow Orbit"}
                </p>
                <p className="text-sm text-zinc-500 font-light">
                  {post.author?.role || "Growth Architect"} at Grow Orbit. Helping Amazon sellers build
                  conversion-first brands that scale.
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16 pt-10 border-t border-zinc-200">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare size={18} className="text-zinc-400" />
              <h3 className="text-xl font-black text-zinc-900" style={montserrat}>
                Comments ({comments.length})
              </h3>
            </div>

            {/* Comment Input */}
            {currentUser ? (
              <form onSubmit={handleCommentSubmit} className="mb-10 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold shrink-0 shadow-sm border border-zinc-300">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email ? currentUser.email[0].toUpperCase() : "U"}
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-white border border-zinc-200 rounded-2xl p-4 pr-12 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 resize-none min-h-[80px]"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="absolute right-3 bottom-3 p-2 bg-zinc-900 text-white rounded-xl hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-zinc-900 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="mb-10 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-center">
                <p className="text-sm font-medium text-zinc-600 mb-4">
                  Join the conversation! You must be logged in to comment.
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all no-underline text-zinc-700"
                >
                  Log In to Comment
                </Link>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold shrink-0 text-sm">
                    {comment.authorName ? comment.authorName[0].toUpperCase() : "U"}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-sm font-bold text-zinc-900">
                        {comment.authorName || "User"}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {comment.date || "Just now"}
                      </p>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group bg-white rounded-2xl p-6 border border-zinc-100 hover:border-zinc-300 transition-all no-underline flex items-center gap-4"
              >
                <ArrowLeft
                  size={16}
                  className="text-zinc-400 group-hover:text-orange-500 transition-colors shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                    Previous
                  </p>
                  <p className="text-sm font-bold text-zinc-900 truncate">
                    {prevPost.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group bg-white rounded-2xl p-6 border border-zinc-100 hover:border-zinc-300 transition-all no-underline flex items-center gap-4 text-right"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                    Next
                  </p>
                  <p className="text-sm font-bold text-zinc-900 truncate">
                    {nextPost.title}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-zinc-400 group-hover:text-orange-500 transition-colors shrink-0"
                />
              </Link>
            )}
          </div>
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
                          <Clock size={9} /> {rp.readTime}
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

      {/* ── CTA ── */}
      <section className="pb-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-orange-500 font-mono text-[9px] font-bold uppercase tracking-[0.4em] mb-6">
            Want results like these?
          </p>
          <h2 className="text-[34px] sm:text-5xl font-black mb-10 tracking-tighter uppercase leading-[0.88]">
            Let&apos;s scale your{" "}
            <span className="italic font-light text-zinc-300" style={serif}>
              Amazon brand.
            </span>
          </h2>
          <Link
            href="/get-started"
            className="w-full sm:w-auto bg-zinc-900 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] hover:bg-orange-500 transition-all inline-flex items-center justify-center gap-4 shadow-2xl no-underline group"
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
