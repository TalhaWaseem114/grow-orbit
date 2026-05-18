"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Eye, Clock, Search, FileText, Save, Image, ArrowUpRight, ExternalLink, Tag, CheckCircle, Circle, Calendar, MoreHorizontal, MessageSquare, Send, CornerDownRight, X, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

/* ─────────────────────────────────────────
   BLOG MANAGER — Admin Dashboard Tab
   Frontend-only for now. Backend integration later.
───────────────────────────────────────── */

const STATUS_STYLES = {
  published: { label: "Published", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)" },
  draft:     { label: "Draft",     color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)" },
};

export default function BlogManagerTab({ isMobile }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(null);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogFilter, setBlogFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [leftWidth, setLeftWidth] = useState(55); // percentage width for the left editor column
  const [isDragging, setIsDragging] = useState(false);

  // Comments Management State
  const [viewingCommentsForPost, setViewingCommentsForPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [unrepliedCounts, setUnrepliedCounts] = useState({});

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none";
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const insertHelperText = (before, after = "") => {
    const textarea = document.getElementById("blog-editor-textarea");
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = before + selected + after;
    
    setEditorBody(text.substring(0, start) + replacement + text.substring(end));
    
    // Maintain cursor focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      setPermissionError(null);
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      // Sort by date descending
      fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(fetchedPosts);

      // Fetch unreplied comment counts for notification badges
      const counts = {};
      await Promise.all(
        fetchedPosts.map(async (post) => {
          try {
            const commentsSnap = await getDocs(collection(db, "blogs", post.id, "comments"));
            let count = 0;
            commentsSnap.forEach((c) => {
              if (!c.data().adminReply) count++;
            });
            counts[post.id] = count;
          } catch (e) {}
        })
      );
      setUnrepliedCounts(counts);

    } catch (error) {
      console.warn("Could not fetch blog posts (database permissions restricted):", error.message);
      if (error.code === "permission-denied" || error.message?.includes("permission")) {
        setPermissionError("permission-denied");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Editor state
  const [editorTitle, setEditorTitle] = useState("");
  const [editorExcerpt, setEditorExcerpt] = useState("");
  const [editorCategory, setEditorCategory] = useState("Amazon Strategy");
  const [editorCustomCategory, setEditorCustomCategory] = useState("");
  const [editorTags, setEditorTags] = useState("");
  const [editorBody, setEditorBody] = useState("");
  const [editorCover, setEditorCover] = useState("");
  const [editorAuthorName, setEditorAuthorName] = useState("Talha Waseem");
  const [editorAuthorRole, setEditorAuthorRole] = useState("Founder & Growth Architect");

  const filteredPosts = posts.filter((p) => {
    // 1. Status Filter
    if (blogFilter !== "all" && p.status !== blogFilter) return false;
    
    // 2. Category Filter
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;

    // 3. Date Filter
    if (dateFilter !== "all") {
      const postDate = new Date(p.date);
      const now = new Date();
      if (dateFilter === "last_30_days") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        if (postDate < thirtyDaysAgo) return false;
      } else if (dateFilter === "this_year") {
        if (postDate.getFullYear() !== now.getFullYear()) return false;
      } else if (dateFilter === "last_6_months") {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        if (postDate < sixMonthsAgo) return false;
      }
    }

    // 4. Search Filter
    if (blogSearch) {
      const q = blogSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    
    return true;
  });

  // Apply Sorting
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "date_desc") return new Date(b.date) - new Date(a.date);
    if (sortBy === "date_asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "comments_desc") {
      const countA = unrepliedCounts[a.id] || 0;
      const countB = unrepliedCounts[b.id] || 0;
      return countB - countA;
    }
    return 0;
  });

  // Extract unique categories for dropdown
  const uniqueCategories = Array.from(new Set(posts.map(p => p.category))).filter(Boolean);

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  const openNewPost = () => {
    setEditingPost(null);
    setEditorTitle("");
    setEditorExcerpt("");
    setEditorCategory("Amazon Strategy");
    setEditorCustomCategory("");
    setEditorTags("");
    setEditorBody("");
    setEditorCover("");
    setEditorAuthorName("Talha Waseem");
    setEditorAuthorRole("Founder & Growth Architect");
    setShowEditor(true);
  };

  const openEditPost = (post) => {
    setEditingPost(post);
    setEditorTitle(post.title);
    setEditorExcerpt(post.excerpt);
    
    const defaults = ["Amazon Strategy", "PPC & Advertising", "Brand Building", "Listing Optimization", "Case Insights", "E-Commerce Trends"];
    if (defaults.includes(post.category)) {
      setEditorCategory(post.category);
      setEditorCustomCategory("");
    } else {
      setEditorCategory("Other");
      setEditorCustomCategory(post.category);
    }
    
    setEditorTags(post.tags?.join(", ") || "");
    setEditorBody(post.content?.map((b) => b.text).join("\n\n") || "");
    setEditorCover(post.coverImage || "");
    setEditorAuthorName(post.author?.name || "Talha Waseem");
    setEditorAuthorRole(post.author?.role || "Founder & Growth Architect");
    setShowEditor(true);
  };

  const handleSavePost = async (status) => {
    const slug = editorTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const finalCategory = editorCategory === "Other" ? editorCustomCategory : editorCategory;

    const newPost = {
      slug: editingPost?.slug || slug,
      title: editorTitle,
      excerpt: editorExcerpt,
      category: finalCategory || "Uncategorized",
      tags: editorTags.split(",").map((t) => t.trim()).filter(Boolean),
      coverImage: editorCover || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      date: editingPost?.date || new Date().toISOString().split("T")[0],
      readTime: `${Math.max(3, Math.ceil(editorBody.split(" ").length / 200))} min read`,
      author: { 
        name: editorAuthorName || "Talha Waseem", 
        role: editorAuthorRole || "Founder & Growth Architect", 
        avatar: null 
      },
      status,
      views: editingPost?.views || 0,
      content: editorBody.split("\n\n").filter(Boolean).map((text) => {
        let type = "paragraph";
        let cleanedText = text;

        if (text.trim() === "---") {
          type = "divider";
          cleanedText = "";
        } else if (text.startsWith("💡 ")) {
          type = "highlight";
          cleanedText = text.replace(/^💡\s*/, "");
        } else if (text.startsWith("@[youtube")) {
          type = "youtube";
          const match = text.match(/@\[youtube(?:\|(.*?))?\]\((.*?)\)/);
          cleanedText = match ? `${match[2]}|${match[1] || "Embedded Video"}` : "";
        } else if (text.startsWith("%%CTA|")) {
          type = "cta";
          cleanedText = text.replace(/^%%CTA\|/, "").replace(/%%$/, "");
        } else if (text.startsWith("# ") || text.startsWith("## ")) {
          type = "heading";
          cleanedText = text.replace(/^#{1,2}\s*/, "");
        } else if (text.startsWith("> ")) {
          type = "quote";
          cleanedText = text.replace(/^>\s*/, "");
        } else if (text.startsWith("![")) {
          type = "image";
          const match = text.match(/!\[(.*?)\]\((.*?)\)/);
          cleanedText = match ? `${match[2]}|${match[1] || "Blog Image"}` : "";
        } else if (text.startsWith("- ") || text.startsWith("* ")) {
          type = "list";
        } else if (text.startsWith("|")) {
          type = "table";
        }

        return { type, text: cleanedText };
      }),
    };

    try {
      const postId = editingPost?.id || slug;
      await setDoc(doc(db, "blogs", postId), newPost);
      
      const fullPost = { id: postId, ...newPost };
      if (editingPost) {
        setPosts(posts.map((p) => (p.id === postId ? fullPost : p)));
      } else {
        setPosts([fullPost, ...posts]);
      }
      setShowEditor(false);
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  const toggleStatus = async (post) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      await setDoc(doc(db, "blogs", post.id), { ...post, status: newStatus });
      setPosts(
        posts.map((p) =>
          p.id === post.id ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  /* ── COMMENTS MANAGEMENT ── */
  const openComments = async (post) => {
    setViewingCommentsForPost(post);
    setLoadingComments(true);
    try {
      const q = query(collection(db, "blogs", post.id, "comments"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const commentsData = [];
      snapshot.forEach(doc => commentsData.push({ id: doc.id, ...doc.data() }));
      setPostComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Failed to load comments.");
    } finally {
      setLoadingComments(false);
    }
  };

  const closeComments = () => {
    setViewingCommentsForPost(null);
    setPostComments([]);
    setReplyingToCommentId(null);
    setAdminReplyText("");
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment permanently?")) return;
    try {
      await deleteDoc(doc(db, "blogs", viewingCommentsForPost.id, "comments", commentId));
      setPostComments(postComments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment.");
    }
  };

  const handleSubmitReply = async (commentId) => {
    if (!adminReplyText.trim()) return;
    try {
      const commentRef = doc(db, "blogs", viewingCommentsForPost.id, "comments", commentId);
      await updateDoc(commentRef, { adminReply: adminReplyText });
      setPostComments(postComments.map(c => c.id === commentId ? { ...c, adminReply: adminReplyText } : c));
      setReplyingToCommentId(null);
      setAdminReplyText("");
      setUnrepliedCounts(prev => ({ ...prev, [viewingCommentsForPost.id]: Math.max(0, (prev[viewingCommentsForPost.id] || 0) - 1) }));
    } catch (error) {
      console.error("Error saving reply:", error);
      alert("Failed to save reply.");
    }
  };

  /* ── EDITOR VIEW ── */
  if (showEditor) {
    const finalCategory = editorCategory === "Other" ? editorCustomCategory : editorCategory;

    // Live parsing content blocks for live website preview
    const previewContent = editorBody.split("\n\n").filter(Boolean).map((text) => {
      let type = "paragraph";
      let cleanedText = text;

      if (text.trim() === "---") {
        type = "divider";
        cleanedText = "";
      } else if (text.startsWith("💡 ")) {
        type = "highlight";
        cleanedText = text.replace(/^💡\s*/, "");
      } else if (text.startsWith("@[youtube")) {
        type = "youtube";
        const match = text.match(/@\[youtube(?:\|(.*?))?\]\((.*?)\)/);
        cleanedText = match ? `${match[2]}|${match[1] || "Embedded Video"}` : "";
      } else if (text.startsWith("%%CTA|")) {
        type = "cta";
        cleanedText = text.replace(/^%%CTA\|/, "").replace(/%%$/, "");
      } else if (text.startsWith("# ") || text.startsWith("## ")) {
        type = "heading";
        cleanedText = text.replace(/^#{1,2}\s*/, "");
      } else if (text.startsWith("> ")) {
        type = "quote";
        cleanedText = text.replace(/^>\s*/, "");
      } else if (text.startsWith("![")) {
        type = "image";
        const match = text.match(/!\[(.*?)\]\((.*?)\)/);
        cleanedText = match ? `${match[2]}|${match[1] || "Blog Image"}` : "";
      } else if (text.startsWith("- ") || text.startsWith("* ")) {
        type = "list";
      } else if (text.startsWith("|")) {
        type = "table";
      }

      return { type, text: cleanedText };
    });

    const parsePreviewMarkdown = (text) => {
      if (!text) return "";
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 800; color: #18181b;">$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline; font-weight: 600;">$1</a>');
    };

    return (
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", maxWidth: 1600, margin: "0 auto", padding: "10px 0", alignItems: "start", gap: isMobile ? 30 : 0 }}>
        
        {/* LEFT COLUMN: THE WRITER EDITOR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, background: "#060606", border: "1px solid rgba(255,255,255,0.04)", padding: 24, borderRadius: 20, width: isMobile ? "100%" : `${leftWidth}%`, flexShrink: 0 }}>
          {/* Editor Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>
                Blog · {editingPost ? "Edit Post" : "New Post"}
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {editingPost ? "Edit Article" : "Write New Article"}
              </h1>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", width: isMobile ? "100%" : "auto", marginTop: isMobile ? 12 : 0 }}>
              <button
                onClick={() => {
                  setEditorTitle("The Complete Blueprint to Scaling a 7-Figure Brand");
                  setEditorExcerpt("A comprehensive step-by-step guide on structuring your brand operations, optimizing listings for conversion, and scaling beyond 7 figures.");
                  setEditorCategory("Amazon Strategy");
                  setEditorCover("https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=1200&auto=format&fit=crop");
                  setEditorAuthorName("Talha Waseem");
                  setEditorAuthorRole("Founder & Growth Architect");
                  setEditorTags("Brand Building, Scaling, Conversion");
                  setEditorBody(`# How to Dominate the Amazon Search Engine\n\nWelcome to the Orbit Protocol Editor. You can write your standard paragraph text right here. Select any text and click **Bold Text** to highlight key points, or insert a [link to your website](https://groworbit.co) seamlessly!\n\n---\n\n## Adding Impactful Quotes & Highlights\n\nSometimes you need to emphasize a powerful insight or a customer review. That's where Quote blocks and SEO Highlights come in:\n\n> "Success on Amazon isn't just about launching products; it's about launching data-driven brands that cannot be ignored."\n\n💡 **Pro Tip:** Google loves structured highlights! Use the Highlight Box to call out key takeaways that answer user intent directly. This significantly increases your chances of capturing Featured Snippets.\n\n## Structuring Data with Lists & Tables\n\nYou can break down complex strategies into easy-to-read lists:\n\n- Strategy 1: Optimize your main image for CTR.\n- Strategy 2: Implement A+ Premium Content.\n- Strategy 3: Scale your PPC with Exact Match dominance.\n\nIf you have metrics or comparison data, use a Table block:\n\n| Metric | Industry Average | Orbit Standard |\n|---|---|---|\n| Conversion Rate | 9.5% | **22.4%** |\n| ACoS | 35% | **18%** |\n| Organic Ranking | Page 2 | **Top 3** |\n\n## Visual Storytelling & Video\n\nDon't forget to break up your text with high-quality imagery or embed a relevant YouTube video!\n\n![SEO Alt Text Example For Keywords](https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=1200&auto=format&fit=crop)\n\n@[youtube|Amazon Brand Scaling Video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\n---\n\n## Ready to scale your brand?\n\nAdd a Call-To-Action (CTA) Button at the end of your articles to convert readers into leads!\n\n%%CTA|https://groworbit.co|Book a Free Amazon Audit%%\n\nThis is everything you need to build stunning articles. Now, delete this template and start writing your masterpiece!`);
                }}
                style={{ flex: isMobile ? "1 1 100%" : "none", justifyContent: "center", padding: "8px 16px", borderRadius: 10, border: "1px dashed rgba(255,255,255,0.2)", background: "transparent", color: "#d4d4d4", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              >
                💡 Load Template
              </button>
              <button
                onClick={() => setShowEditor(false)}
                style={{ flex: isMobile ? "1 1 calc(50% - 4px)" : "none", textAlign: "center", justifyContent: "center", padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePost("draft")}
                style={{ flex: isMobile ? "1 1 calc(50% - 4px)" : "none", justifyContent: "center", padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.1)", color: "#f97316", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              >
                <Save size={12} /> Save Draft
              </button>
              <button
                onClick={() => handleSavePost("published")}
                style={{ flex: isMobile ? "1 1 100%" : "none", justifyContent: "center", padding: "8px 16px", borderRadius: 10, border: "none", background: "#f97316", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              >
                <CheckCircle size={12} /> Publish
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Title</label>
            <input
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
              placeholder="Your article title…"
              style={{ width: "100%", padding: "14px 18px", borderRadius: 14, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 16, fontWeight: 700, outline: "none" }}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Excerpt / Summary</label>
            <textarea
              value={editorExcerpt}
              onChange={(e) => setEditorExcerpt(e.target.value)}
              placeholder="A brief summary for the blog listing page…"
              rows={3}
              style={{ width: "100%", padding: "14px 18px", borderRadius: 14, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 13, fontWeight: 500, outline: "none", resize: "vertical" }}
            />
          </div>

          {/* Category + Cover Image */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Category</label>
              <select
                value={editorCategory}
                onChange={(e) => setEditorCategory(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 12, fontWeight: 600, outline: "none" }}
              >
                {["Amazon Strategy", "PPC & Advertising", "Brand Building", "Listing Optimization", "Case Insights", "E-Commerce Trends", "Other"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {editorCategory === "Other" && (
                <input
                  value={editorCustomCategory}
                  onChange={(e) => setEditorCustomCategory(e.target.value)}
                  placeholder="Type your custom category…"
                  style={{ width: "100%", marginTop: 8, padding: "12px 16px", borderRadius: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
                />
              )}
            </div>
            <div>
              <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Cover Image URL</label>
              <input
                value={editorCover}
                onChange={(e) => setEditorCover(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
              />
            </div>
          </div>

          {/* Writer Info */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Writer Name</label>
              <input
                value={editorAuthorName}
                onChange={(e) => setEditorAuthorName(e.target.value)}
                placeholder="Writer's display name…"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Writer Role</label>
              <input
                value={editorAuthorRole}
                onChange={(e) => setEditorAuthorRole(e.target.value)}
                placeholder="e.g. Design Specialist or Amazon Guy…"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Tags (comma separated)</label>
            <input
              value={editorTags}
              onChange={(e) => setEditorTags(e.target.value)}
              placeholder="PPC, Amazon, Strategy…"
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
            />
          </div>

          {/* Body */}
          {/* Body */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block" }}>Article Content</label>
              <span style={{ fontSize: 10, color: "#a3a3a3", display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={10} /> Dynamic Read Time: {Math.max(1, Math.ceil(editorBody.split(" ").filter(Boolean).length / 200))} min read
              </span>
            </div>

            {/* Editor Helper Toolbar */}
            <div className="editor-toolbar" style={{ 
              display: "flex", 
              gap: 6, 
              flexWrap: isMobile ? "nowrap" : "wrap", 
              overflowX: isMobile ? "auto" : "visible", 
              whiteSpace: "nowrap",
              WebkitOverflowScrolling: "touch",
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.06)", 
              borderBottom: "none", 
              borderTopLeftRadius: 16, 
              borderTopRightRadius: 16, 
              padding: isMobile ? "12px 14px" : "10px 14px", 
              alignItems: "center",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}>
              {/* Inline CSS to hide scrollbar */}
              <style dangerouslySetInnerHTML={{__html: `
                .editor-toolbar::-webkit-scrollbar {
                  display: none !important;
                }
              `}} />
              <span style={{ fontSize: 9, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginRight: 8, flexShrink: 0 }}>Insert:</span>
              
              <button
                onClick={() => insertHelperText("# ")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                H2 Heading
              </button>
              <button
                onClick={() => insertHelperText("## ")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                H3 Heading
              </button>
              <button
                onClick={() => insertHelperText("**", "**")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Bold Text
              </button>
              <button
                onClick={() => {
                  const url = prompt("Enter link URL:");
                  if (url !== null) {
                    insertHelperText("[", `](${url || "https://"})`);
                  }
                }}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Add Link
              </button>
              <button
                onClick={() => insertHelperText("> ")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Quote Block
              </button>
              <button
                onClick={() => insertHelperText("- ")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Bullet List
              </button>
              <button
                onClick={() => {
                  const url = prompt("Enter Image URL:");
                  const alt = prompt("Enter SEO Keywords (Alt Text):");
                  if (url !== null) {
                    insertHelperText(`![${alt || ""}](${url})`);
                  }
                }}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Image Block
              </button>
              <button
                onClick={() => insertHelperText("| Header 1 | Header 2 |\n|---|---|\n| Cell 1 | Cell 2 |")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Table Block
              </button>
              <button
                onClick={() => insertHelperText("---")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Divider
              </button>
              <button
                onClick={() => insertHelperText("💡 ")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Highlight Box
              </button>
              <button
                onClick={() => {
                  const url = prompt("Enter YouTube URL:");
                  const title = prompt("Enter Video SEO Title:");
                  if (url !== null) {
                    insertHelperText(`@[youtube|${title || ""}](${url})`);
                  }
                }}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                YouTube Video
              </button>
              <button
                onClick={() => {
                  const url = prompt("Enter link for CTA button:");
                  const btnText = prompt("Enter CTA Button text:");
                  if (url !== null && btnText !== null) {
                    insertHelperText(`%%CTA|${url}|${btnText}%%`);
                  }
                }}
                type="button"
                style={{ flexShrink: 0, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                CTA Button
              </button>
            </div>

            <textarea
              id="blog-editor-textarea"
              value={editorBody}
              onChange={(e) => setEditorBody(e.target.value)}
              placeholder={"# Your First Heading\n\nYour paragraph text here…\n\n💡 This is a key takeaway highlight!\n\n---\n\n> A powerful quote goes here.\n\n![SEO Alt Keyword Text](https://images.unsplash.com/photo-...)\n\n@[youtube|SEO Video Title](https://www.youtube.com/watch?v=...)\n\n%%CTA|https://groworbit.co|Your CTA Button%%"}
              rows={16}
              style={{ width: "100%", padding: "18px", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#d4d4d4", fontSize: 13, fontWeight: 400, outline: "none", resize: "vertical", lineHeight: 1.8, fontFamily: "monospace" }}
            />
          </div>
        </div>

        {/* DIVIDER */}
        {!isMobile && (
          <div 
            onMouseDown={() => setIsDragging(true)}
            style={{ 
              width: 24, 
              cursor: "col-resize", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              alignSelf: "stretch",
              background: isDragging ? "rgba(249,115,22,0.1)" : "transparent",
              transition: "background 0.2s",
              margin: "0 4px",
              borderRadius: 12
            }}
          >
            <div style={{ width: 4, height: 40, background: isDragging ? "#f97316" : "rgba(255,255,255,0.1)", borderRadius: 4, transition: "background 0.2s" }} />
          </div>
        )}

        {/* RIGHT COLUMN: THE LIVE WEBSITE PREVIEW */}
        <div style={{ display: "flex", flexDirection: "column", background: "#fafafa", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", color: "#18181b", position: isMobile ? "relative" : "sticky", top: 20, alignSelf: "start", maxHeight: isMobile ? "auto" : "calc(100vh - 40px)", overflowY: "auto", width: isMobile ? "100%" : `calc(${100 - leftWidth}% - 32px)`, flexShrink: 0 }}>
          <div style={{ padding: "12px 20px", background: "#f4f4f5", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "#71717a" }}>✨ Real-time Website Preview</span>
            <span style={{ fontSize: 9, background: "#f97316", color: "#fff", padding: "3px 8px", borderRadius: 6, fontWeight: 800, textTransform: "uppercase" }}>Orbit Protocol</span>
          </div>

          {/* ── HERO / COVER ── */}
          <div style={{ position: "relative", minHeight: 220, backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.45)), url(${editorCover || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ background: "#f97316", color: "#fff", fontSize: 8, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", padding: "4px 8px", borderRadius: 100 }}>
                  {finalCategory || "Amazon Strategy"}
                </span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                  <Clock size={8} /> {Math.max(1, Math.ceil(editorBody.split(" ").filter(Boolean).length / 200))} min read
                </span>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 12, fontFamily: "'Montserrat', sans-serif" }}>
                {editorTitle || "Untitled Article"}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(to bottom right, #f97316, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9, fontWeight: 900 }}>
                  {editorAuthorName ? editorAuthorName[0] : "T"}
                </div>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 800, color: "#fff", margin: 0 }}>
                    {editorAuthorName || "Talha Waseem"}
                  </p>
                  <p style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    {editorAuthorRole || "Founder & Growth Architect"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── ARTICLE BODY ── */}
          <div style={{ padding: 24 }}>
            {/* Tags */}
            {editorTags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {editorTags.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                  <span key={tag} style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#71717a", background: "#f4f4f5", padding: "4px 8px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.05)" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Excerpt */}
            {editorExcerpt && (
              <p style={{ fontSize: 13, fontStyle: "italic", fontWeight: 500, color: "#52525b", lineHeight: 1.6, marginBottom: 18, borderLeft: "2px solid #e4e4e7", paddingLeft: 10 }}>
                {editorExcerpt}
              </p>
            )}

            {/* Content blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {previewContent.map((block, idx) => {
                if (block.type === "divider") {
                  return <hr key={idx} style={{ border: "none", borderTop: "1px solid #e4e4e7", margin: "24px 0" }} />;
                }
                if (block.type === "highlight") {
                  return (
                    <div key={idx} style={{ background: "linear-gradient(to right, rgba(249,115,22,0.08), rgba(249,115,22,0.01))", borderLeft: "4px solid #f97316", padding: "16px 20px", borderRadius: "0 12px 12px 0", margin: "16px 0", fontSize: 14, fontWeight: 600, color: "#18181b", display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, lineHeight: 1.2 }}>💡</span>
                      <div dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} style={{ lineHeight: 1.6 }} />
                    </div>
                  );
                }
                if (block.type === "youtube") {
                  const parts = block.text.split("|");
                  const videoUrl = parts[0];
                  const videoTitle = parts[1] || "YouTube Video Embed";
                  const videoId = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
                  if (!videoId) return null;
                  return (
                    <div key={idx} style={{ margin: "16px 0", position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12, background: "#000", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}>
                      <iframe src={`https://www.youtube.com/embed/${videoId}`} title={videoTitle} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} allowFullScreen />
                    </div>
                  );
                }
                if (block.type === "cta") {
                  const parts = block.text.split("|");
                  if (parts.length < 2) return null;
                  return (
                    <div key={idx} style={{ margin: "24px 0", textAlign: "center" }}>
                      <a href={parts[0]} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "linear-gradient(to bottom right, #f97316, #ea580c)", color: "#fff", padding: "14px 28px", borderRadius: 100, fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", boxShadow: "0 8px 20px -6px rgba(249,115,22,0.5)", transition: "transform 0.2s" }}>
                        {parts[1]}
                      </a>
                    </div>
                  );
                }
                if (block.type === "heading") {
                  return (
                    <h2 key={idx} style={{ fontSize: 15, fontWeight: 900, color: "#09090b", marginTop: 8, marginBottom: 4, letterSpacing: "-0.01em", fontFamily: "'Montserrat', sans-serif" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote key={idx} style={{ borderLeft: "3px solid #f97316", background: "rgba(249,115,22,0.03)", padding: "10px 14px", margin: "8px 0", borderRadius: "0 10px 10px 0", fontStyle: "italic", fontSize: 13, fontWeight: 600, color: "#18181b" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                  );
                }
                if (block.type === "image") {
                  const parts = block.text.split("|");
                  return (
                    <div key={idx} style={{ margin: "10px 0", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
                      <img src={parts[0] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"} alt={parts[1] || "Blog Image"} title={parts[1] || "Blog Image"} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" />
                    </div>
                  );
                }
                if (block.type === "list") {
                  const items = block.text.split("\n").map(item => item.replace(/^[-*]\s*/, ""));
                  return (
                    <ul key={idx} style={{ display: "flex", flexDirection: "column", gap: 6, margin: "6px 0", paddingLeft: 6, listStyle: "none" }}>
                      {items.map((item, idx2) => (
                        <li key={idx2} style={{ position: "relative", fontSize: 13, color: "#3f3f46", paddingLeft: 14 }}>
                          <span style={{ absolute: "absolute", left: 0, top: 7, width: 4, height: 4, borderRadius: "50%", background: "#f97316", display: "inline-block", marginRight: 8 }} />
                          <span dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(item) }} />
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
                    <div key={idx} style={{ margin: "10px 0", overflowX: "auto", borderRadius: 10, border: "1px solid #e4e4e7" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, textAlign: "left" }}>
                        <thead>
                          <tr style={{ background: "#f4f4f5", borderBottom: "1px solid #e4e4e7" }}>
                            {headers.map((h, i2) => (
                              <th key={i2} style={{ padding: 8, fontWeight: 700, color: "#18181b" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i3) => (
                            <tr key={i3} style={{ borderBottom: i3 < rows.length - 1 ? "1px solid #f4f4f5" : "none" }}>
                              {row.map((cell, i4) => (
                                <td key={i4} style={{ padding: 8, color: "#3f3f46" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(cell) }} />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return (
                  <p key={idx} style={{ fontSize: 13, lineHeight: 1.7, color: "#3f3f46", margin: 0, whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── COMMENTS VIEW ── */
  if (viewingCommentsForPost) {
    return (
      <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>Comments Manager</div>
            <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{viewingCommentsForPost.title}</h1>
          </div>
          <button
            onClick={closeComments}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}
          >
            <X size={14} /> Close
          </button>
        </div>

        {loadingComments ? (
          <div style={{ padding: 40, textAlign: "center", color: "#a3a3a3", fontSize: 14 }}>Loading comments...</div>
        ) : postComments.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", background: "#0d0d0d", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 16 }}>
            <MessageSquare size={32} style={{ margin: "0 auto 16px", color: "#525252" }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>No Comments Yet</h3>
            <p style={{ fontSize: 13, color: "#a3a3a3" }}>This article doesn't have any comments.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {postComments.map((comment) => (
              <div key={comment.id} style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>
                      {comment.authorName ? comment.authorName[0].toUpperCase() : "U"}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{comment.authorName || "User"}</div>
                      <div style={{ fontSize: 11, color: "#a3a3a3", display: "flex", gap: isMobile ? 4 : 8, flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center" }}>
                        <span>{comment.authorEmail || "No Email"}</span>
                        {!isMobile && <span>•</span>}
                        <span>{comment.date || "Just now"}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    title="Delete Comment"
                    style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: 8, borderRadius: 8 }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <p style={{ fontSize: 14, color: "#d4d4d4", lineHeight: 1.6, margin: "0 0 16px 0", paddingLeft: isMobile ? 0 : 52 }}>
                  {comment.text}
                </p>

                {/* Admin Reply Section */}
                <div style={{ paddingLeft: isMobile ? 0 : 52 }}>
                  {comment.adminReply ? (
                    <div style={{ background: "rgba(249,115,22,0.05)", borderLeft: "2px solid #f97316", padding: "12px 16px", borderRadius: "0 12px 12px 0" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Your Reply</div>
                      <p style={{ fontSize: 13, color: "#d4d4d4", lineHeight: 1.5, margin: 0 }}>{comment.adminReply}</p>
                      
                      {replyingToCommentId !== comment.id && (
                        <button onClick={() => { setReplyingToCommentId(comment.id); setAdminReplyText(comment.adminReply); }} style={{ background: "none", border: "none", color: "#a3a3a3", fontSize: 11, fontWeight: 600, cursor: "pointer", marginTop: 8, padding: 0 }}>Edit Reply</button>
                      )}
                    </div>
                  ) : (
                    replyingToCommentId !== comment.id && (
                      <button onClick={() => { setReplyingToCommentId(comment.id); setAdminReplyText(""); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#f97316", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}>
                        <CornerDownRight size={14} /> Reply to Comment
                      </button>
                    )
                  )}

                  {/* Reply Input Box */}
                  {replyingToCommentId === comment.id && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, alignItems: isMobile ? "stretch" : "flex-start" }}>
                      <textarea
                        autoFocus
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        placeholder="Write your official response..."
                        rows={2}
                        style={{ flex: 1, background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 13, outline: "none", resize: "vertical" }}
                      />
                      <div style={{ display: "flex", flexDirection: isMobile ? "row-reverse" : "column", justifyContent: isMobile ? "space-between" : "flex-start", gap: 8, alignItems: "center" }}>
                        <button onClick={() => handleSubmitReply(comment.id)} style={{ flex: isMobile ? 1 : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#f97316", border: "none", color: "#fff", padding: "10px 16px", borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
                          <Send size={14} /> Send
                        </button>
                        <button onClick={() => setReplyingToCommentId(null)} style={{ flex: isMobile ? 1 : "none", background: isMobile ? "rgba(255,255,255,0.05)" : "transparent", border: isMobile ? "1px solid rgba(255,255,255,0.08)" : "none", color: "#a3a3a3", padding: isMobile ? "10px 16px" : 0, borderRadius: isMobile ? 10 : 0, fontSize: 11, fontWeight: 600, cursor: "pointer", width: isMobile ? "100%" : "auto", textAlign: "center" }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── LIST VIEW ── */
  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>Content · Blog</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>Blog Manager</h1>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/blog" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", cursor: "pointer" }}>
            <Eye size={12} /> View Blog
          </Link>
          <button
            onClick={openNewPost}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "#f97316", border: "none", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}
          >
            <Plus size={14} /> New Post
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Total Posts</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{posts.length}</div>
        </div>
        <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Published</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{publishedCount}</div>
        </div>
        <div style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Drafts</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{draftCount}</div>
        </div>
      </div>

      {/* Search + Filters */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Row 1: Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 16px" }}>
          <Search size={16} color="#525252" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 13, fontWeight: 500, outline: "none" }}
          />
        </div>

        {/* Row 2: Advanced Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          {/* Status Buttons */}
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.02)", padding: 4, borderRadius: 12, width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "space-between" : "flex-start" }}>
            {["all", "published", "draft"].map((f) => (
              <button
                key={f}
                onClick={() => setBlogFilter(f)}
                style={{
                  flex: isMobile ? 1 : "none",
                  textAlign: "center",
                  padding: "8px 16px", borderRadius: 8, cursor: "pointer",
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.15s",
                  background: blogFilter === f ? (f === "published" ? STATUS_STYLES.published.bg : f === "draft" ? STATUS_STYLES.draft.bg : "rgba(255,255,255,0.1)") : "transparent",
                  color: blogFilter === f ? (f === "published" ? STATUS_STYLES.published.color : f === "draft" ? STATUS_STYLES.draft.color : "#fff") : "#525252",
                  border: "none"
                }}
              >
                {f === "all" ? `All (${posts.length})` : f}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select 
            value={categoryFilter} 
            onChange={e => setCategoryFilter(e.target.value)}
            style={{ flex: isMobile ? "1 1 calc(50% - 5px)" : "none", padding: "10px 16px", borderRadius: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: categoryFilter === "all" ? "#a3a3a3" : "#f97316", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", appearance: "none" }}
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          {/* Date Range Dropdown */}
          <select 
            value={dateFilter} 
            onChange={e => setDateFilter(e.target.value)}
            style={{ flex: isMobile ? "1 1 calc(50% - 5px)" : "none", padding: "10px 16px", borderRadius: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: dateFilter === "all" ? "#a3a3a3" : "#f97316", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", appearance: "none" }}
          >
            <option value="all">All Time</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_6_months">Last 6 Months</option>
            <option value="this_year">This Year</option>
          </select>

          {/* Sort By Dropdown */}
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            style={{ flex: isMobile ? "1 1 100%" : "none", padding: "10px 16px", borderRadius: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 11, fontWeight: 700, outline: "none", cursor: "pointer", appearance: "none", marginLeft: isMobile ? 0 : "auto" }}
          >
            <option value="date_desc">Sort: Newest First</option>
            <option value="date_asc">Sort: Oldest First</option>
            <option value="comments_desc">Sort: Unreplied Comments</option>
          </select>
        </div>
      </div>

      {/* Post list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {permissionError ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 24px", 
            background: "rgba(239,68,68,0.03)", 
            border: "1px dashed rgba(239,68,68,0.2)", 
            borderRadius: 16, 
            color: "#f87171" 
          }}>
            <ShieldAlert size={36} style={{ margin: "0 auto 12px", color: "#ef4444" }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Firebase Permission Denied</h3>
            <p style={{ fontSize: 13, color: "#a3a3a3", lineHeight: 1.5, maxWidth: 500, margin: "0 auto 12px" }}>
              Firestore blocked the query. Please ensure your Firebase Firestore Security Rules allow read access to the <code>blogs</code> and <code>comments</code> collections.
            </p>
            <button 
              onClick={fetchPosts} 
              style={{ 
                background: "rgba(255,255,255,0.06)", 
                border: "1px solid rgba(255,255,255,0.1)", 
                color: "#fff", 
                padding: "8px 16px", 
                borderRadius: 10, 
                fontSize: 11, 
                fontWeight: 700, 
                cursor: "pointer" 
              }}
            >
              Retry Connection
            </button>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em" }}>Loading Posts…</p>
          </div>
        ) : sortedPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
            <FileText size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
            <p style={{ fontSize: 12, fontWeight: 600 }}>No posts found.</p>
          </div>
        ) : (
          sortedPosts.map((post) => {
            const st = STATUS_STYLES[post.status] || STATUS_STYLES.draft;
            return (
              <div
                key={post.id}
                style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 16, padding: isMobile ? "14px" : "16px 20px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
              >
                {/* Cover thumbnail */}
                {!isMobile && (
                  <div style={{ width: 72, height: 48, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.04)" }}>
                    <img src={post.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: isMobile ? 200 : 400 }}>{post.title}</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: st.color, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{st.label}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "#525252" }}>{post.category}</span>
                    {!isMobile && <span style={{ fontSize: 10, color: "#333", fontFamily: "monospace" }}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => openEditPost(post)}
                    title="Edit"
                    style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#a3a3a3", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f97316"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#a3a3a3"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => toggleStatus(post)}
                    title={post.status === "published" ? "Unpublish" : "Publish"}
                    style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: post.status === "published" ? "#4ade80" : "#a3a3a3", transition: "all 0.2s" }}
                  >
                    {post.status === "published" ? <Eye size={13} /> : <Circle size={13} />}
                  </button>
                  <button
                    onClick={() => openComments(post)}
                    title="Manage Comments"
                    style={{ position: "relative", width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#a3a3a3", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#3b82f6"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#a3a3a3"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <MessageSquare size={13} />
                    {unrepliedCounts[post.id] > 0 && (
                      <span style={{ position: "absolute", top: -4, right: -4, background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 900, width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #0d0d0d" }}>
                        {unrepliedCounts[post.id]}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    title="Delete"
                    style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#525252", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#525252"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
