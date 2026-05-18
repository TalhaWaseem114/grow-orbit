"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Eye, Clock, Search, FileText, Save, Image, ArrowUpRight, ExternalLink, Tag, CheckCircle, Circle, Calendar, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
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
  const [blogSearch, setBlogSearch] = useState("");
  const [blogFilter, setBlogFilter] = useState("all");
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      // Sort by date descending
      fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
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
  const [editorTags, setEditorTags] = useState("");
  const [editorBody, setEditorBody] = useState("");
  const [editorCover, setEditorCover] = useState("");

  const filteredPosts = posts.filter((p) => {
    if (blogFilter !== "all" && p.status !== blogFilter) return false;
    if (blogSearch) {
      const q = blogSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  const openNewPost = () => {
    setEditingPost(null);
    setEditorTitle("");
    setEditorExcerpt("");
    setEditorCategory("Amazon Strategy");
    setEditorTags("");
    setEditorBody("");
    setEditorCover("");
    setShowEditor(true);
  };

  const openEditPost = (post) => {
    setEditingPost(post);
    setEditorTitle(post.title);
    setEditorExcerpt(post.excerpt);
    setEditorCategory(post.category);
    setEditorTags(post.tags?.join(", ") || "");
    setEditorBody(post.content?.map((b) => b.text).join("\n\n") || "");
    setEditorCover(post.coverImage || "");
    setShowEditor(true);
  };

  const handleSavePost = async (status) => {
    const slug = editorTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPost = {
      slug: editingPost?.slug || slug,
      title: editorTitle,
      excerpt: editorExcerpt,
      category: editorCategory,
      tags: editorTags.split(",").map((t) => t.trim()).filter(Boolean),
      coverImage: editorCover || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      date: editingPost?.date || new Date().toISOString().split("T")[0],
      readTime: `${Math.max(3, Math.ceil(editorBody.split(" ").length / 200))} min read`,
      author: { name: "Talha Waseem", role: "Founder & Growth Architect", avatar: null },
      status,
      views: editingPost?.views || 0,
      content: editorBody.split("\n\n").filter(Boolean).map((text) => ({
        type: text.startsWith("# ") ? "heading" : text.startsWith("> ") ? "quote" : "paragraph",
        text: text.replace(/^[#>]\s*/, ""),
      })),
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

  /* ── EDITOR VIEW ── */
  if (showEditor) {
    return (
      <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
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
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowEditor(false)}
              style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              onClick={() => handleSavePost("draft")}
              style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.1)", color: "#f97316", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            >
              <Save size={12} /> Save Draft
            </button>
            <button
              onClick={() => handleSavePost("published")}
              style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "#f97316", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
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
              {["Amazon Strategy", "PPC & Advertising", "Brand Building", "Listing Optimization", "Case Insights", "E-Commerce Trends"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
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
        <div>
          <label style={{ fontSize: 9, fontWeight: 800, color: "#525252", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Content (use # for headings, &gt; for quotes, separate paragraphs with blank lines)</label>
          <textarea
            value={editorBody}
            onChange={(e) => setEditorBody(e.target.value)}
            placeholder={"# Your First Heading\n\nYour paragraph text here…\n\n> A powerful quote goes here.\n\n# Second Heading\n\nMore content…"}
            rows={16}
            style={{ width: "100%", padding: "18px", borderRadius: 16, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#d4d4d4", fontSize: 13, fontWeight: 400, outline: "none", resize: "vertical", lineHeight: 1.8, fontFamily: "monospace" }}
          />
        </div>
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
          <Link href="/blog" target="_blank" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#a3a3a3", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", cursor: "pointer" }}>
            <Eye size={12} /> View Blog <ExternalLink size={10} />
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
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 10, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 16px" }}>
          <Search size={14} color="#525252" />
          <input
            type="text"
            placeholder="Search posts…"
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 500, outline: "none" }}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "published", "draft"].map((f) => (
            <button
              key={f}
              onClick={() => setBlogFilter(f)}
              style={{
                padding: "8px 14px", borderRadius: 10, cursor: "pointer",
                fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.15s",
                background: blogFilter === f ? (f === "published" ? STATUS_STYLES.published.bg : f === "draft" ? STATUS_STYLES.draft.bg : "rgba(255,255,255,0.08)") : "transparent",
                color: blogFilter === f ? (f === "published" ? STATUS_STYLES.published.color : f === "draft" ? STATUS_STYLES.draft.color : "#fff") : "#525252",
                border: `1px solid ${blogFilter === f ? (f === "published" ? STATUS_STYLES.published.border : f === "draft" ? STATUS_STYLES.draft.border : "rgba(255,255,255,0.15)") : "rgba(255,255,255,0.04)"}`,
              }}
            >
              {f === "all" ? `All (${posts.length})` : f}
            </button>
          ))}
        </div>
      </div>

      {/* Post list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em" }}>Loading Posts…</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
            <FileText size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
            <p style={{ fontSize: 12, fontWeight: 600 }}>No posts found.</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
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
                    {!isMobile && <span style={{ fontSize: 10, color: "#333" }}>{post.views} views</span>}
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
