"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Plus, Edit3, Trash2, Eye, Clock, Search, FileText, Save, Image, ArrowUpRight, ExternalLink, Tag, CheckCircle, Circle, Calendar, MoreHorizontal, MessageSquare, Send, CornerDownRight, X, ShieldAlert, Maximize2, Minimize2 } from "lucide-react";
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

const formatDisplayDate = (d, includeYear = true) => {
  if (!d) return "—";
  let dateObj;
  if (d.toDate && typeof d.toDate === "function") {
    dateObj = d.toDate();
  } else if (typeof d === "object" && typeof d.seconds === "number") {
    dateObj = new Date(d.seconds * 1000);
  } else {
    dateObj = new Date(d);
  }
  
  if (isNaN(dateObj.getTime())) {
    return "—";
  }
  
  return dateObj.toLocaleDateString("en-US", includeYear ? { month: "short", day: "numeric", year: "numeric" } : { month: "short", day: "numeric" });
};

export default function BlogManagerTab({ isMobile, triggerConfirm, logActivity }) {
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
  const [isExpanded, setIsExpanded] = useState(false); // Focus Mode toggle
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false); // Preview fullscreen toggle
  const [showSeoModal, setShowSeoModal] = useState(false); // SEO Analytics modal toggle
  const editorTextareaRef = useRef(null);

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

  const insertHelperText = useCallback((before, after = "") => {
    const textarea = editorTextareaRef.current || document.getElementById("blog-editor-textarea");
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = before + selected + after;
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    
    setEditorBody(newValue);
    
    // Restore cursor position precisely after React re-render
    const newStartOffset = start + before.length;
    const newEndOffset = newStartOffset + selected.length;
    
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newStartOffset, newEndOffset);
    });
  }, []);

  // Keyboard shortcut handler for markdown transformations
  const handleEditorKeyDown = useCallback((e) => {
    const textarea = e.target;
    const { selectionStart, value } = textarea;
    
    // Ctrl/Cmd+B = Bold
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      insertHelperText("**", "**");
      return;
    }
    
    // Ctrl/Cmd+K = Link
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      const url = prompt("Enter link URL:");
      if (url !== null) {
        insertHelperText("[", `](${url || "https://"})`);
      }
      return;
    }

    // Tab key = insert 2 spaces instead of losing focus
    if (e.key === "Tab") {
      e.preventDefault();
      insertHelperText("  ");
      return;
    }

    // Escape key = exit Focus Mode or Preview Fullscreen
    if (e.key === "Escape") {
      if (isPreviewFullscreen) {
        e.preventDefault();
        setIsPreviewFullscreen(false);
        return;
      }
      if (isExpanded) {
        e.preventDefault();
        setIsExpanded(false);
        return;
      }
    }
  }, [insertHelperText, isExpanded, isPreviewFullscreen]);

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
      fetchedPosts.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        const validA = isNaN(dateA) ? 0 : dateA;
        const validB = isNaN(dateB) ? 0 : dateB;
        return validB - validA;
      });
      setPosts(fetchedPosts);

      // Fetch unreplied comment counts for notification badges (only for published posts)
      const counts = {};
      await Promise.all(
        fetchedPosts.map(async (post) => {
          if (post.status !== "published") return;
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
  const [editorAuthorName, setEditorAuthorName] = useState("Ali");
  const [editorAuthorRole, setEditorAuthorRole] = useState("Founder & Growth Architect");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filteredPosts = posts.filter((p) => {
    // 1. Status Filter
    if (blogFilter !== "all" && p.status !== blogFilter) return false;
    
    // 2. Category Filter
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;

    // 3. Date Filter
    if (dateFilter !== "all") {
      const postDate = p.date ? new Date(p.date) : null;
      if (!postDate || isNaN(postDate.getTime())) return false;
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
    if (sortBy === "date_desc" || sortBy === "date_asc") {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      const validA = isNaN(dateA) ? 0 : dateA;
      const validB = isNaN(dateB) ? 0 : dateB;
      return sortBy === "date_desc" ? validB - validA : validA - validB;
    }
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
    setEditorAuthorName("Ali");
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
    setEditorBody(post.content?.map((b) => {
      if (b.type === "image") {
        const parts = b.text.split("|");
        return `![${parts[1] || ""}](${parts[0]})`;
      }
      if (b.type === "youtube") {
        const parts = b.text.split("|");
        return `@[youtube|${parts[1] || ""}](${parts[0]})`;
      }
      if (b.type === "cta") {
        return `%%CTA|${b.text}%%`;
      }
      if (b.type === "highlight") {
        return `💡 ${b.text}`;
      }
      if (b.type === "heading") {
        return `## ${b.text}`;
      }
      if (b.type === "heading-h3") {
        return `### ${b.text}`;
      }
      if (b.type === "heading-h4") {
        return `#### ${b.text}`;
      }
      if (b.type === "quote") {
        return `> ${b.text}`;
      }
      if (b.type === "divider") {
        return `---`;
      }
      return b.text;
    }).join("\n\n") || "");
    setEditorCover(post.coverImage || "");
    setEditorAuthorName(post.author?.name || "Ali");
    setEditorAuthorRole(post.author?.role || "Founder & Growth Architect");
    setShowEditor(true);
  };

  const handleSavePost = async (status) => {
    setIsSaving(true);
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
        name: editorAuthorName || "Ali", 
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
        } else if (text.startsWith("#### ")) {
          type = "heading-h4";
          cleanedText = text.replace(/^####\s*/, "");
        } else if (text.startsWith("### ")) {
          type = "heading-h3";
          cleanedText = text.replace(/^###\s*/, "");
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
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (id) => {
    const targetPost = posts.find(p => p.id === id);
    const title = targetPost ? targetPost.title : id;
    triggerConfirm(
      "Delete Post",
      `Are you sure you want to permanently delete post "${title}"? This action cannot be undone.`,
      async () => {
        try {
          await deleteDoc(doc(db, "blogs", id));
          setPosts(prev => prev.filter((p) => p.id !== id));
          logActivity("DELETE_POST", `Deleted blog post: "${title}" (${id})`);
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Failed to delete post.");
        }
      },
      true
    );
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
    const targetComment = postComments.find(c => c.id === commentId);
    const author = targetComment ? (targetComment.authorName || targetComment.authorEmail) : commentId;
    triggerConfirm(
      "Delete Comment",
      `Are you sure you want to permanently delete the comment from "${author}"?`,
      async () => {
        try {
          await deleteDoc(doc(db, "blogs", viewingCommentsForPost.id, "comments", commentId));
          setPostComments(prev => prev.filter(c => c.id !== commentId));
          logActivity("DELETE_COMMENT", `Deleted comment by "${author}" on post: "${viewingCommentsForPost.title}"`);
        } catch (error) {
          console.error("Error deleting comment:", error);
          alert("Failed to delete comment.");
        }
      },
      true
    );
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

  const seoInsights = useMemo(() => {
    const stopWords = new Set(['the', 'a', 'and', 'of', 'to', 'in', 'is', 'for', 'on', 'with', 'that', 'this', 'an', 'your', 'i', 'you', 'it', 'as', 'at', 'be', 'are', 'by', 'or', 'from', 'we', 'our', 'what', 'how', 'why', 'can', 'not', 'but', 'all', 'will', 'just', 'more', 'also', 'than', 'its', 'has', 'had', 'been', 'have', 'was', 'were', 'they', 'their', 'them', 'which', 'when', 'would', 'there', 'about', 'each', 'make', 'like', 'into', 'could', 'other', 'some', 'these', 'then', 'any', 'only', 'very', 'such', 'should', 'get', 'use', 'most', 'does', 'did', 'may', 'way', 'amazon', 'grow', 'orbit', 'post', 'blog', 'article', 'read', 'see', 'click', 'page', 'time', 'one', 'two', 'new']);
    
    const cleanMarkdown = (text) => text.replace(/[#*`\[\]()!]/g, ' ').replace(/\n/g, ' ').toLowerCase();
    
    const rawTitle = editorTitle || '';
    const rawExcerpt = editorExcerpt || '';
    const rawBody = editorBody || '';
    
    const cleanTitle = cleanMarkdown(rawTitle);
    const cleanExcerpt = cleanMarkdown(rawExcerpt);
    const cleanBody = cleanMarkdown(rawBody);
    
    const fullText = `${cleanTitle} ${cleanExcerpt} ${cleanBody}`;
    
    const words = fullText.match(/\b[a-z]{3,}\b/g) || [];
    const wordCounts = {};
    let totalWords = 0;
    
    for (const word of words) {
      if (!stopWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
        totalWords++;
      }
    }
    
    const sortedKeywords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word, count]) => {
        const density = totalWords > 0 ? ((count / totalWords) * 100) : 0;
        return { word, count, density: density.toFixed(1), isStuffed: density > 3.5 };
      });

    const primaryKeyword = sortedKeywords[0]?.word || '';
    
    const titleLen = rawTitle.length;
    const excerptLen = rawExcerpt.length;
    const h2Matches = rawBody.match(/(^|\n)##\s+/g);
    const h2Count = h2Matches ? h2Matches.length : 0;
    const h3Matches = rawBody.match(/(^|\n)###\s+/g);
    const h3Count = h3Matches ? h3Matches.length : 0;
    const h4Matches = rawBody.match(/(^|\n)####\s+/g);
    const h4Count = h4Matches ? h4Matches.length : 0;
    const linkMatches = rawBody.match(/\[.*?\]\(https?:\/\/.*?\)/g);
    const linkCount = linkMatches ? linkMatches.length : 0;
    
    const titleCheck = titleLen >= 50 && titleLen <= 60;
    const excerptCheck = excerptLen >= 120 && excerptLen <= 160;
    const h2Check = h2Count > 0;
    const linkCheck = linkCount > 0;
    
    const hasImages = /!\[.*?\]\(.*?\)/.test(rawBody);
    const hasPlaceholderAlt = rawBody.includes("Enter Your Primary SEO Keyword Here for Alt Text");
    const hasEmptyAlt = /!\[\s*\]\(.*?\)/.test(rawBody) || hasPlaceholderAlt;
    const altTextCheck = hasImages ? !hasEmptyAlt : true;
    
    const keywordCheck = primaryKeyword ? (
      cleanTitle.includes(primaryKeyword) && 
      cleanExcerpt.includes(primaryKeyword) && 
      cleanBody.slice(0, 300).includes(primaryKeyword)
    ) : false;
    
    const paragraphs = rawBody.split(/\n{1,2}/).filter(p => p.trim().length > 0);
    const longParagraphs = paragraphs.filter(p => p.split(/\s+/).filter(Boolean).length > 120);
    const readabilityCheck = longParagraphs.length === 0;
    
    // Advanced CTA conversion element tracker (new standalone widget syntax)
    const ctaMatches = rawBody.match(/%%CTA\|(.*?)\|(.*?)\|(.*?)%%/s);
    const hasCtaButton = /%%CTA\|/s.test(rawBody);
    let hasPunchyHook = false;
    
    if (ctaMatches) {
      const hookText = ctaMatches[3] ? ctaMatches[3].trim() : "";
      if (hookText.length >= 40) {
        hasPunchyHook = true;
      }
    }
    
    const ctaCheck = hasCtaButton && hasPunchyHook;
    
    let ctaHelper = '';
    if (!hasCtaButton && !hasPunchyHook) {
      ctaHelper = '⚠️ Missing CTA Button & Copy';
    } else if (hasCtaButton && !hasPunchyHook) {
      ctaHelper = '⚠️ Missing Pitch Line (Add a punchy hook before your button)';
    } else {
      ctaHelper = '✅ Conversion Block Active (Optimized for Leads)';
    }
    
    let titleHelper = '';
    if (titleLen === 0) titleHelper = 'Empty';
    else if (titleLen < 50) titleHelper = 'Too Short';
    else if (titleLen > 60) titleHelper = 'Too Long';
    else titleHelper = 'Perfect';
    
    let excerptHelper = '';
    if (excerptLen === 0) excerptHelper = 'Empty';
    else if (excerptLen < 120) excerptHelper = 'Too Short';
    else if (excerptLen > 160) excerptHelper = 'Too Long';
    else excerptHelper = 'Perfect';
    
    let score = 0;
    if (titleCheck) score += 15;
    if (excerptCheck) score += 15;
    if (keywordCheck) score += 20;
    if (h2Check) score += 15;
    if (linkCheck) score += 15;
    if (altTextCheck) score += 10;
    if (readabilityCheck) score += 5;
    if (ctaCheck) score += 5;
    
    return {
      keywords: sortedKeywords,
      titleCheck, excerptCheck, h2Check, linkCheck, altTextCheck, keywordCheck, readabilityCheck, ctaCheck,
      titleLen, excerptLen, h2Count, h3Count, h4Count, linkCount, hasImages,
      titleHelper, excerptHelper, ctaHelper,
      longParagraphCount: longParagraphs.length,
      score,
    };
  }, [editorTitle, editorExcerpt, editorBody]);

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
      <div style={{
        ...(isExpanded && !isMobile ? {
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "#060606",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        } : {}),
        transition: "all 300ms ease-in-out",
      }}>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", maxWidth: isExpanded ? "100%" : 1600, margin: "0 auto", padding: isExpanded ? "0" : "10px 0", alignItems: "start", gap: isMobile ? 30 : 0, height: isExpanded && !isMobile ? "100vh" : "auto", overflow: isExpanded ? "hidden" : "visible" }}>
        
        {/* LEFT COLUMN: THE WRITER EDITOR */}
        <div style={{ display: "flex", flexDirection: "column", gap: isExpanded ? 12 : 20, background: "#060606", border: isExpanded ? "none" : "1px solid rgba(255,255,255,0.04)", padding: isExpanded ? "16px 24px" : 24, borderRadius: isExpanded ? 0 : 20, width: isMobile ? "100%" : `${leftWidth}%`, flexShrink: 0, height: isExpanded && !isMobile ? "100vh" : "auto", overflow: isExpanded ? "hidden" : "visible", transition: "all 300ms ease-in-out" }}>
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
                  setEditorAuthorName("Ali");
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
                disabled={isSaving}
                style={{ flex: isMobile ? "1 1 calc(50% - 4px)" : "none", justifyContent: "center", padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.1)", color: "#f97316", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, opacity: isSaving ? 0.7 : 1 }}
              >
                <Save size={12} /> Save Draft
              </button>
              <button
                onClick={() => handleSavePost("published")}
                disabled={isSaving}
                style={{ flex: isMobile ? "1 1 100%" : "none", justifyContent: "center", padding: "8px 16px", borderRadius: 10, border: "none", background: saveSuccess ? "#10b981" : "#f97316", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.3s" }}
              >
                <CheckCircle size={12} /> 
                {saveSuccess ? "Successfully Updated!" : (isSaving ? "Updating..." : (editingPost ? "Update Post" : "Publish"))}
              </button>
              {/* Focus Mode Toggle */}
              {!isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Exit Focus Mode" : "Enter Focus Mode"}
                  style={{
                    padding: "8px 12px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                    background: isExpanded ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)",
                    border: isExpanded ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    color: isExpanded ? "#f97316" : "#a3a3a3",
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                    transition: "all 200ms ease",
                  }}
                >
                  {isExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                  {isExpanded ? "Exit Focus" : "Focus"}
                </button>
              )}
            </div>
          </div>

          {/* ── COLLAPSIBLE METADATA PANEL ── */}
          <div style={{
            overflow: "hidden",
            maxHeight: isExpanded ? 0 : 1000,
            opacity: isExpanded ? 0 : 1,
            transition: "max-height 300ms ease-in-out, opacity 200ms ease-in-out",
            display: "flex", flexDirection: "column", gap: isExpanded ? 0 : 16,
          }}>
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
          </div>{/* End collapsible metadata */}

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", flex: isExpanded ? 1 : "none", minHeight: 0, overflow: isExpanded ? "hidden" : "visible" }}>
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
                onClick={() => insertHelperText("\n\n## Your H2 Subheading Here\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                H2 Heading
              </button>
              <button
                onClick={() => insertHelperText("\n\n### Your H3 Minor Heading Here\n\n")}
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
                Bold Text <span style={{ fontSize: 8, opacity: 0.5, marginLeft: 2 }}>⌘B</span>
              </button>
              <button
                onClick={() => insertHelperText("[Enter Link Text Here](https://groworbit.co)")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Add Link <span style={{ fontSize: 8, opacity: 0.5, marginLeft: 2 }}>⌘K</span>
              </button>
              <button
                onClick={() => insertHelperText("\n\n> \"Enter a powerful quote or customer testimonial here to build authority and break up the text.\"\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Quote Block
              </button>
              <button
                onClick={() => insertHelperText("\n- First list item here\n- Second list item here\n- Third list item here\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Bullet List
              </button>
              <button
                onClick={() => {
                  const altText = prompt("Enter descriptive SEO Alt Text for this image (highly recommended for Googlebot):");
                  if (altText === null) return; // User cancelled
                  const imageUrl = prompt("Enter image URL:", "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=1200&auto=format&fit=crop");
                  if (imageUrl) {
                    insertHelperText(`\n\n![${altText}](${imageUrl})\n\n`);
                  }
                }}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Image Block
              </button>
              <button
                onClick={() => insertHelperText("\n\n| Metric | Industry Average | Orbit Standard |\n|---|---|---|\n| Conversion Rate | 9.5% | **22.4%** |\n| ACoS | 35% | **18%** |\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Table Block
              </button>
              <button
                onClick={() => insertHelperText("\n\n---\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Divider
              </button>
              <button
                onClick={() => insertHelperText("\n\n💡 **Pro Tip:** Use this highlight box to call out key takeaways that answer user intent directly. This helps capture Google Featured Snippets!\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                Highlight Box
              </button>
              <button
                onClick={() => insertHelperText("\n\n@[youtube|Enter Video SEO Title Here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                YouTube Video
              </button>
              <button
                onClick={() => insertHelperText("\n\n%%CTA|https://groworbit.co|Book a Free Amazon Audit|This is a high-converting pitch line that must be at least 40 characters long to pass the advanced conversion module validation and persuade the reader.%%\n\n")}
                type="button"
                style={{ flexShrink: 0, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316", padding: "6px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                CTA Button
              </button>
            </div>

            <textarea
              id="blog-editor-textarea"
              ref={editorTextareaRef}
              value={editorBody}
              onChange={(e) => setEditorBody(e.target.value)}
              onKeyDown={handleEditorKeyDown}
              placeholder={"# Your First Heading\n\nYour paragraph text here…\n\n💡 This is a key takeaway highlight!\n\n---\n\n> A powerful quote goes here.\n\n![SEO Alt Keyword Text](https://images.unsplash.com/photo-...)\n\n@[youtube|SEO Video Title](https://www.youtube.com/watch?v=...)\n\n%%CTA|https://groworbit.co|Your CTA Button%%"}
              rows={isExpanded ? undefined : 16}
              style={{ width: "100%", padding: "18px", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", color: "#d4d4d4", fontSize: 13, fontWeight: 400, outline: "none", resize: isExpanded ? "none" : "vertical", lineHeight: 1.8, fontFamily: "monospace", ...(isExpanded ? { flex: 1, minHeight: 0 } : {}) }}
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
        <div style={{
          ...(isPreviewFullscreen ? {
            position: "fixed", inset: 0, zIndex: 200, width: "100vw", height: "100vh",
            maxHeight: "100vh", borderRadius: 0, border: "none",
          } : {
            width: isMobile ? "100%" : `calc(${100 - leftWidth}% - 32px)`,
            borderRadius: isExpanded ? 0 : 20,
            border: isExpanded ? "none" : "1px solid rgba(0,0,0,0.08)",
            position: isMobile ? "relative" : (isExpanded ? "relative" : "sticky"),
            top: isExpanded ? 0 : 20,
            height: isExpanded && !isMobile ? "100vh" : "auto",
            maxHeight: isMobile ? "auto" : (isExpanded ? "100vh" : "calc(100vh - 40px)"),
          }),
          display: "flex", flexDirection: "column", background: "#fafafa",
          overflow: "hidden", color: "#18181b", alignSelf: "start",
          overflowY: "auto", flexShrink: 0, transition: "all 300ms ease-in-out",
        }}>
          <div style={{ padding: "12px 20px", background: "#f4f4f5", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "#71717a", display: isMobile ? "none" : "inline" }}>✨ Real-time Website Preview</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", flex: isMobile ? 1 : "none", justifyContent: isMobile ? "flex-end" : "flex-start" }}>
              <button
                onClick={() => setShowSeoModal(true)}
                title="SEO Analysis Engine"
                style={{
                  padding: "4px 8px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                  background: "rgba(22,163,74,0.1)",
                  border: "1px solid rgba(22,163,74,0.3)",
                  color: "#16a34a",
                  fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
                  transition: "all 200ms ease",
                }}
              >
                <Search size={10} /> Analyze SEO
              </button>
              {editingPost && editingPost.status === "published" ? (
                <a href={`/blog/${editingPost.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, background: "#f97316", color: "#fff", padding: "3px 8px", borderRadius: 6, fontWeight: 800, textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  Visit Live <ExternalLink size={10} />
                </a>
              ) : (
                <span style={{ fontSize: 9, background: "#f97316", color: "#fff", padding: "3px 8px", borderRadius: 6, fontWeight: 800, textTransform: "uppercase" }}>Orbit Protocol</span>
              )}
              {!isMobile && (
                <button
                  onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                  title={isPreviewFullscreen ? "Exit Fullscreen Preview" : "Fullscreen Preview"}
                  style={{
                    padding: "4px 8px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                    background: isPreviewFullscreen ? "rgba(249,115,22,0.15)" : "rgba(0,0,0,0.05)",
                    border: isPreviewFullscreen ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(0,0,0,0.08)",
                    color: isPreviewFullscreen ? "#f97316" : "#71717a",
                    fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
                    transition: "all 200ms ease",
                  }}
                >
                  {isPreviewFullscreen ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
                  {isPreviewFullscreen ? "Exit" : "Full"}
                </button>
              )}
            </div>
          </div>

          {/* ── HERO / COVER ── */}
          <section className="relative w-full bg-white border-b border-zinc-200">
            <div className={`relative w-full overflow-hidden bg-zinc-900 ${isPreviewFullscreen ? "min-h-[480px] md:aspect-[21/8]" : "min-h-[300px]"}`}>
              <img
                src={editorCover || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"}
                alt={editorTitle || "Cover"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Title overlay */}
              <div className={`absolute bottom-0 left-0 right-0 z-10 ${isPreviewFullscreen ? "p-6 sm:p-12 md:p-16" : "p-6 sm:p-8"}`}>
                <div className="max-w-[900px]">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {finalCategory || "Amazon Strategy"}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/60 text-[10px] font-bold">
                      <Clock size={10} /> {Math.max(1, Math.ceil(editorBody.split(" ").filter(Boolean).length / 200))} min read
                    </span>
                  </div>
                  <h1
                    className={`font-black text-white leading-[1.1] tracking-tight mb-6 ${isPreviewFullscreen ? "text-2xl sm:text-4xl md:text-5xl" : "text-2xl sm:text-3xl"}`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {editorTitle || "Untitled Article"}
                  </h1>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-black">
                        {editorAuthorName ? editorAuthorName[0] : "A"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none">
                          {editorAuthorName || "Ali"}
                        </p>
                        <p className="text-[10px] text-white/50 mt-1">
                          {editorAuthorRole || "Founder & Growth Architect"}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-white/40 text-[10px] font-bold">
                      <Calendar size={10} />
                      {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── ARTICLE BODY ── */}
          <section className="px-6 py-16 sm:py-20 bg-white min-h-screen">
            <div className="max-w-[780px] mx-auto">
              {/* Tags */}
              {editorTags && (
                <div className="flex flex-wrap items-center gap-2 mb-12 pb-8 border-b border-zinc-200">
                  <Tag size={12} className="text-zinc-400" />
                  {editorTags.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {editorExcerpt && (
                <p className={`font-medium text-zinc-600 leading-relaxed italic mb-12 border-l-4 border-zinc-200 pl-6 ${isPreviewFullscreen ? "text-lg sm:text-xl" : "text-base"}`}>
                  {editorExcerpt}
                </p>
              )}

              {/* Content blocks */}
              <article className="space-y-8">
                {previewContent.map((block, idx) => {
                  if (block.type === "divider") {
                    return <hr key={idx} className="border-t border-zinc-200 my-16" />;
                  }
                  if (block.type === "highlight") {
                    return (
                      <div key={idx} className="flex gap-4 items-start bg-orange-50/50 border-l-4 border-orange-500 py-6 px-6 sm:px-8 rounded-r-2xl my-10">
                        <span className="text-2xl mt-1 leading-none">💡</span>
                        <div dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} className="text-zinc-800 font-medium leading-relaxed" />
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
                      <div key={idx} className="relative w-full overflow-hidden rounded-2xl bg-zinc-900 my-10 shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                        <iframe className="absolute top-0 left-0 w-full h-full border-0" src={`https://www.youtube.com/embed/${videoId}`} title={videoTitle} allowFullScreen />
                      </div>
                    );
                  }
                  if (block.type === "cta") {
                    const parts = block.text.split("|");
                    if (parts.length < 2) return null;
                    const url = parts[0];
                    const btnText = parts[1];
                    const hookText = parts[2] || "";
                    return (
                      <div key={idx} className="flex flex-col items-center justify-center my-16 text-center">
                        {hookText && (
                          <p className={`font-medium text-zinc-800 mb-8 max-w-2xl leading-relaxed italic ${isPreviewFullscreen ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                            {hookText}
                          </p>
                        )}
                        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-black text-sm sm:text-base uppercase tracking-widest px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl shadow-orange-500/20 hover:scale-105 hover:shadow-orange-500/40 transition-all duration-300">
                          {btnText}
                        </a>
                      </div>
                    );
                  }
                  if (block.type === "heading") {
                    return (
                      <h2 key={idx} className={`font-black tracking-tight mt-12 mb-4 text-zinc-900 ${isPreviewFullscreen ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`} style={{ fontFamily: "'Montserrat', sans-serif" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                    );
                  }
                  if (block.type === "heading-h3") {
                    return (
                      <h3 key={idx} className={`font-black tracking-tight mt-10 mb-3 text-zinc-900 ${isPreviewFullscreen ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`} style={{ fontFamily: "'Montserrat', sans-serif" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                    );
                  }
                  if (block.type === "heading-h4") {
                    return (
                      <h4 key={idx} className={`font-bold tracking-tight mt-8 mb-2 text-zinc-900 ${isPreviewFullscreen ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`} style={{ fontFamily: "'Montserrat', sans-serif" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <blockquote key={idx} className="relative pl-8 py-6 my-10 border-l-4 border-orange-500 bg-orange-50/50 rounded-r-2xl pr-8">
                        <p className={`font-bold text-zinc-800 leading-relaxed italic ${isPreviewFullscreen ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`} style={{ fontFamily: "'Playfair Display', serif" }} dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                      </blockquote>
                    );
                  }
                  if (block.type === "image") {
                    const parts = block.text.split("|");
                    return (
                      <div key={idx} className="my-10 relative rounded-3xl overflow-hidden shadow-xl border border-zinc-100 bg-zinc-50 flex justify-center">
                        <img src={parts[0] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"} alt={parts[1] || "Blog Image"} className="w-full h-auto object-cover max-h-[500px]" loading="lazy" />
                      </div>
                    );
                  }
                  if (block.type === "list") {
                    const items = block.text.split("\n").map(item => item.replace(/^[-*]\s*/, ""));
                    return (
                      <ul key={idx} className="space-y-3 my-6 pl-4 list-none">
                        {items.map((item, idx2) => (
                          <li key={idx2} className="relative text-[15px] sm:text-base text-zinc-600 leading-relaxed pl-6">
                            <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-orange-500"></span>
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
                      <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-zinc-200">
                        <table className="w-full text-left border-collapse text-sm">
                          <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-200">
                              {headers.map((h, i2) => (
                                <th key={i2} className="p-4 font-bold text-zinc-950 uppercase tracking-wider text-[10px]">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100">
                            {rows.map((row, i3) => (
                              <tr key={i3} className="hover:bg-zinc-50/50 transition-colors">
                                {row.map((cell, i4) => (
                                  <td key={i4} className="p-4 text-zinc-600" dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(cell) }} />
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-[15px] sm:text-base text-zinc-600 leading-[1.9] font-light whitespace-pre-line" dangerouslySetInnerHTML={{ __html: parsePreviewMarkdown(block.text) }} />
                  );
                })}
              </article>
            </div>
          </section>
        </div>

        {/* ── SEO MODAL (GAMIFIED DASHBOARD) ── */}
        {showSeoModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", padding: 20 }}>
            <div style={{ background: "#09090b", width: "100%", maxWidth: 640, maxHeight: "85vh", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column" }}>
              
              {/* Header + Score (pinned) */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
                    <Search size={18} color="#f97316" /> Advanced SEO Analytics
                  </h3>
                  <button onClick={() => setShowSeoModal(false)} style={{ background: "transparent", border: "none", color: "#71717a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <X size={20} />
                  </button>
                </div>
                
                {/* Score Gauge */}
                <div style={{ padding: "20px 24px 16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em" }}>Master Optimization Score</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: seoInsights.score >= 85 ? "#22c55e" : seoInsights.score >= 50 ? "#eab308" : "#ef4444", lineHeight: 1 }}>
                      {seoInsights.score} <span style={{ fontSize: 14, color: "#525252" }}>/ 100</span>
                    </div>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ 
                      height: "100%", 
                      width: `${seoInsights.score}%`, 
                      background: seoInsights.score >= 85 ? "#22c55e" : seoInsights.score >= 50 ? "#eab308" : "#ef4444",
                      boxShadow: `0 0 10px ${seoInsights.score >= 85 ? "rgba(34,197,94,0.5)" : seoInsights.score >= 50 ? "rgba(234,179,8,0.5)" : "rgba(239,68,68,0.5)"}`,
                      transition: "width 500ms ease, background 500ms ease"
                    }} />
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
                {/* Keywords Matrix */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Keyword Density Matrix</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {seoInsights.keywords.length > 0 ? seoInsights.keywords.map((kw, i) => (
                      <div key={i} style={{ 
                        display: "flex", alignItems: "center", gap: 6,
                        background: kw.isStuffed ? "rgba(239,68,68,0.15)" : "rgba(249,115,22,0.15)", 
                        border: `1px solid ${kw.isStuffed ? "rgba(239,68,68,0.4)" : "rgba(249,115,22,0.3)"}`, 
                        padding: "6px 12px", borderRadius: 8 
                      }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>{kw.word}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: kw.isStuffed ? "#ef4444" : "#f97316" }}>{kw.density}%</span>
                        {kw.isStuffed && <span style={{ fontSize: 9, fontWeight: 800, background: "#ef4444", color: "#fff", padding: "2px 4px", borderRadius: 4, marginLeft: 4, textTransform: "uppercase" }}>Stuffing Risk</span>}
                      </div>
                    )) : (
                      <span style={{ fontSize: 12, color: "#71717a" }}>Not enough data. Write more content.</span>
                    )}
                  </div>
                </div>
                
                {/* Checklist / Dynamic Metrics */}
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Live Diagnostics</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 24, rowGap: 16 }}>
                    {[
                      { label: `Title Length: ${seoInsights.titleLen} / 60 chars`, detail: seoInsights.titleHelper, pass: seoInsights.titleCheck },
                      { label: `Excerpt Length: ${seoInsights.excerptLen} / 160 chars`, detail: seoInsights.excerptHelper, pass: seoInsights.excerptCheck },
                      { label: `Primary Keyword Cross-Map`, detail: seoInsights.keywordCheck ? "Mapped" : "Missing from zones", pass: seoInsights.keywordCheck },
                      { label: `Heading Hierarchy (H2/H3/H4)`, detail: `H2: ${seoInsights.h2Count} | H3: ${seoInsights.h3Count} | H4: ${seoInsights.h4Count}`, pass: seoInsights.h2Check },
                      { label: `Content Hyperlinks`, detail: `${seoInsights.linkCount} Links`, pass: seoInsights.linkCheck },
                      { label: `Image Alt Text Verification`, detail: seoInsights.altTextCheck ? "Valid" : "Empty Alt Found", pass: seoInsights.altTextCheck },
                      { label: `Readability Guardrail`, detail: seoInsights.readabilityCheck ? "Passed" : `${seoInsights.longParagraphCount} long blocks`, pass: seoInsights.readabilityCheck },
                      { label: `Conversion Module (CTA)`, detail: seoInsights.ctaHelper, pass: seoInsights.ctaCheck },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: item.pass ? "rgba(34,197,94,0.2)" : "rgba(234,179,8,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.pass ? "#22c55e" : "#eab308", boxShadow: item.pass ? "0 0 10px rgba(34,197,94,0.6)" : "0 0 10px rgba(234,179,8,0.6)" }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: item.pass ? "#fff" : "#d4d4d8", lineHeight: 1.2 }}>{item.label}</div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: item.pass ? "#22c55e" : "#eab308", marginTop: 4 }}>{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── ACTION ITEMS (sorted by severity) ── */}
                {(() => {
                  const actions = [];
                  
                  // SEVERITY 1: High Impact (20pts & 15pts)
                  if (!seoInsights.keywordCheck) {
                    actions.push({
                      severity: "High",
                      label: "Add Primary Keyword Cross-Mapping",
                      tip: "Your top keyword is missing from the Title, Excerpt, or first paragraph. Place it naturally in all three zones so Google understands your topic authority.",
                    });
                  }
                  if (!seoInsights.titleCheck) {
                    actions.push({
                      severity: "High",
                      label: "Fix Title Length",
                      tip: seoInsights.titleLen < 50
                        ? `Your title is ${seoInsights.titleLen} chars — too short. Aim for 50–60 characters. Add descriptive keywords to improve CTR in search results.`
                        : `Your title is ${seoInsights.titleLen} chars — too long. Google truncates titles over 60 chars. Trim filler words to keep the most important keywords visible.`,
                    });
                  }
                  if (!seoInsights.excerptCheck) {
                    actions.push({
                      severity: "High",
                      label: "Fix Excerpt / Meta Description",
                      tip: seoInsights.excerptLen < 120
                        ? `Your excerpt is ${seoInsights.excerptLen} chars — too short. Write 120–160 characters that summarize the article's value proposition and include a primary keyword.`
                        : `Your excerpt is ${seoInsights.excerptLen} chars — too long. Keep it under 160 characters so Google doesn't cut it off in search results.`,
                    });
                  }
                  if (!seoInsights.h2Check) {
                    actions.push({
                      severity: "Medium",
                      label: "Add H2 Subheadings",
                      tip: "No H2 headings detected. Add at least 2 subheadings (## Your Heading) to break up content into scannable sections — this improves readability and SEO structure.",
                    });
                  }
                  if (!seoInsights.linkCheck) {
                    actions.push({
                      severity: "Medium",
                      label: "Add Internal / External Links",
                      tip: "No hyperlinks found. Add at least 1 internal link to another blog post or service page, and 1 external authority link to build topical trust signals.",
                    });
                  }
                  if (!seoInsights.altTextCheck) {
                    actions.push({
                      severity: "Medium",
                      label: "Fix Image Alt Text",
                      tip: "One or more images have empty alt text. Add keyword-rich, descriptive alt text to every image — this helps Google Image Search and accessibility.",
                    });
                  }
                  if (!seoInsights.readabilityCheck) {
                    actions.push({
                      severity: "Low",
                      label: "Break Up Long Paragraphs",
                      tip: `${seoInsights.longParagraphCount} paragraph(s) exceed 120 words. Split them into shorter blocks (3–5 sentences each) for better mobile readability and user engagement.`,
                    });
                  }
                  if (!seoInsights.ctaCheck) {
                    actions.push({
                      severity: "Low",
                      label: "Add a Conversion Module (CTA)",
                      tip: "No valid CTA widget found. Use the CTA Button tool in the toolbar to insert a conversion block with a punchy hook line (40+ characters) and a button linking to your service page.",
                    });
                  }

                  // Non-punitive recommendations
                  if (!seoInsights.hasImages) {
                    actions.push({
                      severity: "Info",
                      label: "Recommendation: Add Visuals",
                      tip: "Articles with visual assets perform better in search. Consider adding an image to lower bounce rates.",
                    });
                  }

                  if (actions.length === 0) return null;

                  return (
                    <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                        🔧 Action Items — {actions.length} Fix{actions.length > 1 ? "es" : ""} Needed
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {actions.map((a, i) => (
                          <div key={i} style={{ 
                            background: a.severity === "Info" ? "rgba(59,130,246,0.05)" : "rgba(239,68,68,0.05)", 
                            border: `1px solid ${a.severity === "Info" ? "rgba(59,130,246,0.15)" : "rgba(239,68,68,0.15)"}`, 
                            borderRadius: 12, padding: "12px 16px" 
                          }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: a.severity === "Info" ? "#60a5fa" : "#fbbf24", marginBottom: 4, display: "flex", gap: 6, alignItems: "center" }}>
                              {a.severity === "Info" ? "ℹ️" : a.severity === "High" ? "🚨" : a.severity === "Medium" ? "⚠️" : "📌"} {a.label}
                            </div>
                            <div style={{ fontSize: 11, fontWeight: 500, color: "#a1a1aa", lineHeight: 1.5 }}>{a.tip}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
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
                        <span>{formatDisplayDate(comment.createdAt)}</span>
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
                    <img src={post.coverImage} alt="Blog Post Cover Image Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                    {!isMobile && <span style={{ fontSize: 10, color: "#333", fontFamily: "monospace" }}>{formatDisplayDate(post.date, false)}</span>}
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
                  {post.status === "published" && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Live Article"
                      style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#f97316", transition: "all 0.2s", textDecoration: "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(249,115,22,0.15)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(249,115,22,0.08)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)"; }}
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
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
