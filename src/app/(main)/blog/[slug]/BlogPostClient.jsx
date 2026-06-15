"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  MessageSquare, Send, Linkedin, Twitter, Globe, Award
} from "lucide-react";
import { doc, getDoc, updateDoc, increment, collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/firebase/firebaseConfig";
import { getAuthorBySlug, getAuthorSlugByName } from "@/data/authorData";

const montserrat = { fontFamily: "'Montserrat', sans-serif" };

export default function BlogPostClient({ post }) {
  const [upvotes, setUpvotes] = useState(post?.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Admin Reply State
  const [isAdmin, setIsAdmin] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const authorSlug = getAuthorSlugByName(post.author?.name);
  const authorDetails = getAuthorBySlug(authorSlug);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role?.trim() === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (e) {
          console.error("Error checking admin status:", e);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
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
          console.warn("Could not fetch comments (database permissions restricted):", error.message);
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

  const handleAdminReply = async (commentId) => {
    if (!replyText.trim() || !post?.id) return;
    try {
      const commentRef = doc(db, "blogs", post.id, "comments", commentId);
      await updateDoc(commentRef, {
        adminReply: replyText,
        adminRepliedAt: serverTimestamp()
      });
      setComments(comments.map(c => c.id === commentId ? { ...c, adminReply: replyText } : c));
      setReplyingTo(null);
      setReplyText("");
    } catch (error) {
      console.error("Error replying:", error);
    }
  };

  if (!post) return null;

  return (
    <>
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
        <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
          <Link href={`/blog/author/${authorSlug}`} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-black shrink-0 shadow-md overflow-hidden relative block hover:scale-105 transition-transform">
            {authorDetails.avatar ? (
              <img
                src={authorDetails.avatar}
                alt={authorDetails.name}
                className="w-full h-full object-cover"
              />
            ) : (
              authorDetails.name[0]
            )}
          </Link>
          <div className="text-center sm:text-left flex-1">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-orange-500 mb-1.5 block">
              Written by
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <Link href={`/blog/author/${authorSlug}`} className="text-lg font-black text-zinc-900 no-underline hover:text-orange-500 transition-colors">
                {authorDetails.name}
              </Link>
              <div className="flex justify-center sm:justify-start gap-2.5">
                {authorDetails.socialLinks?.linkedin && (
                  <a href={authorDetails.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-500 transition-colors">
                    <Linkedin size={14} />
                  </a>
                )}
                {authorDetails.socialLinks?.twitter && (
                  <a href={authorDetails.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-500 transition-colors">
                    <Twitter size={14} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-xs font-mono uppercase text-zinc-400 mb-4">{authorDetails.role}</p>
            <p className="text-sm text-zinc-500 font-light leading-relaxed mb-6">
              {authorDetails.bio}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
              {authorDetails.credentials?.slice(0, 3).map((cred, idx) => (
                <span key={idx} className="bg-zinc-50 border border-zinc-100 text-zinc-500 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Award size={10} className="text-orange-500" />
                  {cred}
                </span>
              ))}
            </div>
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
              href="/login"
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
              <div className="flex-1">
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

                {/* Admin Reply Display */}
                {comment.adminReply && (
                  <div className="mt-4 bg-orange-50/50 rounded-2xl p-5 border border-orange-100/50 relative">
                    <div className="absolute top-0 left-6 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white flex items-center justify-center"></div>
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[9px] font-black text-white">
                         GO
                       </div>
                       <span className="text-xs font-bold text-zinc-900">Grow Orbit Team</span>
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed">{comment.adminReply}</p>
                  </div>
                )}

                {/* Admin Reply Action */}
                {isAdmin && !comment.adminReply && (
                  <div className="mt-3">
                    {replyingTo === comment.id ? (
                      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply as admin..."
                          className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 resize-none min-h-[60px] mb-3"
                        />
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setReplyingTo(null); setReplyText(""); }} className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-700 uppercase tracking-wider transition-colors">Cancel</button>
                          <button onClick={() => handleAdminReply(comment.id)} disabled={!replyText.trim()} className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-zinc-900 uppercase tracking-wider transition-colors">Post Reply</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        Reply as Admin
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
