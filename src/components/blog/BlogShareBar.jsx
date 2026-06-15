"use client";

import { useState, useEffect } from "react";
import { Linkedin, Twitter, Facebook, Link, Check } from "lucide-react";

export default function BlogShareBar({ title, slug }) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/blog/${slug}`);
    }
  }, [slug]);

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title || "")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <>
      {/* ── DESKTOP STICKY SIDEBAR (xl and up) ── */}
      <div className="hidden xl:block absolute -left-20 2xl:-left-28 top-0 bottom-[300px] w-10 select-none">
        <div className="sticky top-[180px] flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-zinc-600 [writing-mode:vertical-lr] rotate-180 mb-2">
            Share
          </span>

          {/* Facebook */}
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 hover:shadow-[0_8px_20px_rgba(249,115,22,0.15)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Facebook size={16} />
          </a>

          {/* Twitter / X */}
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on X"
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 hover:shadow-[0_8px_20px_rgba(249,115,22,0.15)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Twitter size={16} />
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 hover:shadow-[0_8px_20px_rgba(249,115,22,0.15)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Linkedin size={16} />
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            title="Copy Link"
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 hover:shadow-[0_8px_20px_rgba(249,115,22,0.15)] hover:-translate-y-0.5 transition-all duration-300 relative cursor-pointer"
          >
            {copied ? (
              <Check size={16} className="text-emerald-500" />
            ) : (
              <Link size={16} />
            )}

            {/* Copy Tooltip */}
            <span
              className={`absolute left-12 px-2.5 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md transition-all duration-300 pointer-events-none whitespace-nowrap ${
                copied ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}
            >
              Copied!
            </span>
          </button>
        </div>
      </div>

      {/* ── MOBILE INLINE SHARE ROW (under cover image/meta) ── */}
      <div className="flex xl:hidden items-center justify-center gap-3 py-4 my-8 border-y border-zinc-200/60 w-full select-none">
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-zinc-600 mr-2">
          Share
        </span>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Facebook"
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 transition-colors"
        >
          <Facebook size={14} />
        </a>

        {/* Twitter / X */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X"
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 transition-colors"
        >
          <Twitter size={14} />
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 transition-colors"
        >
          <Linkedin size={14} />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          title="Copy Link"
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500 transition-colors relative cursor-pointer"
        >
          {copied ? (
            <Check size={14} className="text-emerald-500" />
          ) : (
            <Link size={14} />
          )}

          {/* Copy Tooltip */}
          <span
            className={`absolute bottom-11 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md transition-all duration-300 pointer-events-none whitespace-nowrap ${
              copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Copied!
          </span>
        </button>
      </div>
    </>
  );
}
