"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Mail, Image as ImageIcon, LayoutTemplate, UploadCloud, RotateCcw, Copy, Eye, Palette, ShoppingCart, BarChart3, Sparkles, Smartphone, Monitor, Calendar, Clipboard } from "lucide-react";
import { auth } from "@/firebase/firebaseConfig";
import { sandboxId, sandboxSubject, sandboxHeadline, sandboxBody } from "./SandboxTemplate";

// ─── HTML Syntax Highlighter ──────────────────────────────────
const highlightHtml = (code) => {
  if (!code) return "";
  
  // Basic HTML escape to prevent browser interpretation of raw tags and quotes
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
  
  // Find comments &lt;!--...--&gt; and tags &lt;...&gt;
  const regex = /(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?[a-zA-Z0-9\-]+(?:[\s\S]*?)&gt;)/g;
  
  return escaped.replace(regex, (match, comment, tag) => {
    if (comment) {
      return `<span style="color: #71717a; font-style: italic;">${comment}</span>`;
    }
    if (tag) {
      let highlightedTag = tag;
      
      // 1. Attributes (e.g. style= or class=) - must do this first before introducing span tags
      highlightedTag = highlightedTag.replace(/(\s[a-zA-Z0-9\-]+=)/g, '<span style="color: #fb923c;">$1</span>');
      
      // 2. Strings in attributes (quotes and double quotes)
      // Double-quoted strings
      highlightedTag = highlightedTag.replace(/&quot;([\s\S]*?)&quot;/g, (m, content) => {
        if (content.includes(":")) {
          // Syntax highlight CSS style declarations (property: cyan, value: green)
          const declarations = content.split(";");
          const highlightedDeclarations = declarations.map(decl => {
            const colonIdx = decl.indexOf(":");
            if (colonIdx === -1) return decl;
            const prop = decl.substring(0, colonIdx);
            const val = decl.substring(colonIdx + 1);
            return `<span style="color: #38bdf8;">${prop}</span>:<span style="color: #a3e635;">${val}</span>`;
          });
          return `&quot;${highlightedDeclarations.join(";")}&quot;`;
        }
        return `<span style="color: #a3e635;">&quot;${content}&quot;</span>`;
      });
      
      // Single-quoted strings
      highlightedTag = highlightedTag.replace(/&#x27;([\s\S]*?)&#x27;/g, '<span style="color: #a3e635;">&#x27;$1&#x27;</span>');
      
      // 3. Tag names (e.g. <div or </p) - matching escaped tag name at the start
      highlightedTag = highlightedTag.replace(/^(&lt;\/?[a-zA-Z0-9\-]+)/, '<span style="color: #f43f5e; font-weight: bold;">$1</span>');
      
      // 4. Closing bracket > - matching escaped closing bracket at the end
      highlightedTag = highlightedTag.replace(/(&gt;)$/, '<span style="color: #f43f5e; font-weight: bold;">$1</span>');
      
      return highlightedTag;
    }
    return match;
  });
};

const CodeEditor = ({ value, onChange, onFocus, onBlur, placeholder, id, refTextarea, rows }) => {
  const handleScroll = (e) => {
    const backdrop = document.getElementById(`${id}-backdrop`);
    if (backdrop) {
      backdrop.scrollTop = e.target.scrollTop;
      backdrop.scrollLeft = e.target.scrollLeft;
    }
  };

  const highlighted = highlightHtml(value);

  const editorStyles = {
    fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace",
    fontSize: "12px",
    lineHeight: "1.6",
    tabSize: 2,
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    padding: "16px",
    margin: 0,
    border: "none",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: rows ? `${rows * 20}px` : "200px" }}>
      {/* Background syntax highlight layout */}
      <div 
        id={`${id}-backdrop`}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          color: "#e4e4e7",
          background: "transparent",
          ...editorStyles
        }}
        dangerouslySetInnerHTML={{ __html: highlighted + "\n\n" }}
      />

      {/* Real Textarea overlay */}
      <textarea
        id={id}
        ref={refTextarea}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onScroll={handleScroll}
        placeholder={placeholder}
        rows={rows}
        style={{
          position: "relative",
          display: "block",
          color: "transparent",
          caretColor: "#fff",
          background: "transparent",
          resize: "vertical",
          outline: "none",
          overflowY: "auto",
          ...editorStyles
        }}
      />
    </div>
  );
};

// ─── HTML Beautifier / Indenter ───────────────────────────────
const beautifyHtml = (html) => {
  if (!html) return "";
  
  let formatted = "";
  let indent = "";
  const tab = "  ";
  
  // Split by tags
  const tokens = html.split(/(<\/?[a-zA-Z0-9\-]+(?:[\s\S]*?)>)/);
  
  const isBlockTag = (tag) => {
    const match = tag.match(/^<\/?([a-zA-Z0-9\-]+)/);
    if (!match) return false;
    const tagName = match[1].toLowerCase();
    const inlineTags = ["strong", "b", "em", "i", "a", "span", "code", "u", "br", "hr", "img", "input", "sub", "sup"];
    return !inlineTags.includes(tagName);
  };

  let lastWasBlockOpen = false;
  let lastWasBlockClose = false;

  tokens.forEach((token) => {
    if (!token) return;
    
    const isTag = token.trim().startsWith("<");
    
    if (isTag) {
      const trimmed = token.trim();
      if (trimmed.startsWith("<!--")) {
        // Comment: treat as block-level separator
        formatted += "\n" + indent + trimmed;
        lastWasBlockOpen = false;
        lastWasBlockClose = true;
      } else if (trimmed.startsWith("</")) {
        // Closing tag
        if (isBlockTag(trimmed)) {
          indent = indent.substring(tab.length);
          formatted += "\n" + indent + trimmed;
          lastWasBlockOpen = false;
          lastWasBlockClose = true;
        } else {
          // Inline closing tag: just append inline
          formatted += trimmed;
          lastWasBlockOpen = false;
          lastWasBlockClose = false;
        }
      } else {
        // Opening tag
        if (isBlockTag(trimmed)) {
          formatted += "\n" + indent + trimmed;
          indent += tab;
          lastWasBlockOpen = true;
          lastWasBlockClose = false;
        } else {
          // Inline opening tag
          if (lastWasBlockOpen) {
            formatted += "\n" + indent + trimmed;
          } else {
            const startsWithSpace = token.match(/^\s/);
            formatted += (startsWithSpace ? " " : "") + trimmed;
          }
          lastWasBlockOpen = false;
          lastWasBlockClose = false;
        }
      }
    } else {
      // Plain text content
      if (lastWasBlockOpen) {
        formatted += "\n" + indent + token.trim();
      } else if (lastWasBlockClose) {
        formatted += "\n" + indent + token.trim();
      } else {
        // Maintain original inline spacing but collapse multiple tabs/newlines into single spaces
        const cleanText = token.replace(/\s+/g, " ");
        formatted += cleanText;
      }
      lastWasBlockOpen = false;
      lastWasBlockClose = false;
    }
  });
  
  return formatted.replace(/\n\s*\n/g, "\n").trim();
};

// ─── Template Data ────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "tempEmail",
    label: "Temp Email",
    emoji: "✍️",
    color: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.15)",
    icon: LayoutTemplate,
    description: "Blank canvas with branding",
    subject: "Custom Subject 🚀",
    headerImage: "/logo.png",
    headline: "Custom Headline",
    body: `<!-- HIDE_DEFAULT_CTA -->
<!-- NEUMORPHIC_THEME -->
<p style="font-size: 14px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px;">Hi,</p>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  Start typing your custom email body content here...
</p>`,
  },
  {
    id: "allServices",
    label: "All Services",
    emoji: "🚀",
    color: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.15)",
    icon: ShoppingCart,
    description: "Amazon + Graphics combined pitch",
    subject: "Scale Your Brand with Amazon & Creative Design Services 🚀",
    headerImage: "/logo.png",
    headline: "Your All-in-One Growth Partner",
    body: `<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px;">Hi there,</p>

<!-- Premium Hook Panel -->
<div style="background-color: #fafafb; border-left: 3px solid #f97316; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);">
  <p style="font-size: 14.5px; line-height: 1.5; color: #0f172a; font-style: italic; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    "Most brands scale slower because their search marketing strategy doesn't talk to their product design. We align both under one roof to multiply your conversion rates."
  </p>
</div>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">At Grow Orbit, we simplify your scaling operations by combining data-driven marketplace management with scroll-stopping design assets.</p>

<!-- Combined Card 1: Amazon -->
<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.01);">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="text-align: left;">
    <tr>
      <td style="font-size: 16px; font-weight: 700; color: #0f172a; padding-bottom: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        🛒 Marketplace Strategy
      </td>
    </tr>
    <tr>
      <td style="font-size: 11px; font-weight: 700; color: #f97316; letter-spacing: 0.05em; text-transform: uppercase; padding-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        Growth & Performance
      </td>
    </tr>
    <tr>
      <td style="font-size: 13px; line-height: 1.6; color: #475569; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        High-efficiency Sponsored Ads (PPC), dayparting schedules, listing keyword SEO, and ongoing catalog health audits.
      </td>
    </tr>
  </table>
</div>

<!-- Combined Card 2: Design -->
<div style="background-color: #fdf8ff; border: 1px solid #f3e8ff; border-radius: 12px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.01);">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="text-align: left;">
    <tr>
      <td style="font-size: 16px; font-weight: 700; color: #0f172a; padding-bottom: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        🎨 Creative & Visuals
      </td>
    </tr>
    <tr>
      <td style="font-size: 11px; font-weight: 700; color: #a855f7; letter-spacing: 0.05em; text-transform: uppercase; padding-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        Conversion Architecture
      </td>
    </tr>
    <tr>
      <td style="font-size: 13px; line-height: 1.6; color: #6b21a8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        Scroll-stopping hero graphics, custom package renders, high-converting A+ Content structures, and storefront layouts.
      </td>
    </tr>
  </table>
</div>

<!-- Performance Metrics -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="text-align: center; margin-bottom: 28px;">
  <tr>
    <td width="33%" style="padding: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="font-size: 20px; font-weight: 800; color: #0f172a;">2-5x</div>
      <div style="font-size: 9px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">ROAS Growth</div>
    </td>
    <td width="33%" style="border-left: 1px solid #e2e8f0; padding: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="font-size: 20px; font-weight: 800; color: #0f172a;">+80%</div>
      <div style="font-size: 9px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">CVR Lift</div>
    </td>
    <td width="33%" style="border-left: 1px solid #e2e8f0; padding: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="font-size: 20px; font-weight: 800; color: #0f172a;">50+</div>
      <div style="font-size: 9px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Brands Scaled</div>
    </td>
  </tr>
</table>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 8px;">Let's discuss how we can tailor a growth plan specifically for your brand.</p>`,
  },
  {
    id: "ppc",
    label: "Amazon PPC",
    emoji: "📊",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.15)",
    icon: BarChart3,
    description: "PPC-focused Amazon services",
    subject: "Stop Wasting Ad Spend — Let's Fix Your Amazon PPC 📊",
    headerImage: "/logo.png",
    headline: "Maximize Every Dollar of Your Amazon Ad Spend",
    body: `<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px;">Hi there,</p>

<!-- Premium Hook Panel -->
<div style="background-color: #fffbeb; border-left: 3px solid #3b82f6; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);">
  <p style="font-size: 14.5px; line-height: 1.5; color: #1e293b; font-style: italic; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    "If you're paying Amazon more in advertising fees than you are taking home in net profit, your campaign structures are likely bleeding cash on cold keywords."
  </p>
</div>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">At Grow Orbit, we audit and restructure your PPC strategy from the ground up to focus ad spend purely on high-intent buyer searches.</p>

<!-- Focus points -->
<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; text-align: left; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 1.6; color: #475569; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <tr>
      <td style="padding-bottom: 10px;">
        🔍 <strong>Bid Pacing:</strong> Adjusting daily target bids to match hour-by-hour shopping peaks.
      </td>
    </tr>
    <tr>
      <td style="padding-bottom: 10px;">
        🎯 <strong>ACoS Control:</strong> Systematic negative keyword extraction to eliminate non-converting budget.
      </td>
    </tr>
    <tr>
      <td>
        📈 <strong>SEO Flywheel:</strong> Leveraging ad placements to steadily compound organic search indexing.
      </td>
    </tr>
  </table>
</div>

<!-- PPC Metrics Row -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="text-align: center; margin-bottom: 28px;">
  <tr>
    <td width="33%" style="padding: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="font-size: 20px; font-weight: 800; color: #3b82f6;">30-50%</div>
      <div style="font-size: 9px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">ACoS Reduction</div>
    </td>
    <td width="33%" style="border-left: 1px solid #e2e8f0; padding: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="font-size: 20px; font-weight: 800; color: #3b82f6;">2-3x</div>
      <div style="font-size: 9px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Organic CTR</div>
    </td>
    <td width="33%" style="border-left: 1px solid #e2e8f0; padding: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="font-size: 20px; font-weight: 800; color: #3b82f6;">90 Days</div>
      <div style="font-size: 9px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Stabilization</div>
    </td>
  </tr>
</table>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 8px;">Ready to stop guessing and start growing? Book your free PPC strategy call today.</p>`,
  },
  {
    id: "graphics",
    label: "Graphics & Design",
    emoji: "🎨",
    color: "#c084fc",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.15)",
    icon: Palette,
    description: "Visual-heavy design showcase",
    subject: "Elevate Your Brand with Stunning Design & Creatives 🎨",
    headerImage: "/logo.png",
    headline: "Design That Converts — See Our Work",
    body: `<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 24px;">Your brand deserves visuals that don't just look good — <strong>they convert</strong>. Here is a showcase of the high-performance design assets we craft at Grow Orbit:</p>

<!-- Premium Hook Panel -->
<div style="background-color: #fdf6ff; border-left: 3px solid #a855f7; padding: 16px 20px; margin-bottom: 28px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);">
  <p style="font-size: 14.5px; line-height: 1.5; color: #0f172a; font-style: italic; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    "In a marketplace where customers swipe in milliseconds, your listing images are either your greatest sales asset or your silent conversion killer."
  </p>
</div>

<!-- Project Card 1: Lumina Bites -->
<div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01); text-align: left;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
    <tr>
      <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="font-size: 14px; font-weight: 700; color: #0f172a;">Lumina Bites — Snacks Niche</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Listing Infographics & Design</div>
      </td>
      <td align="right" valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <span style="font-size: 11px; font-weight: 700; color: #16a34a; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 4px 10px; border-radius: 100px; display: inline-block;">+80% Sales Lift</span>
      </td>
    </tr>
  </table>
  
  <!-- 2x2 Image Grid -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px; border-collapse: collapse;">
    <tr>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271653/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.png" alt="Lumina Bites Packaging" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271655/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/2.png" alt="Lumina Bites Hero Display" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
    <tr>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271657/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/3.png" alt="Lumina Bites Ingredients" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271659/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/4.png" alt="Lumina Bites Texture" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
  </table>

  <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    High-conversion mobile-first listing infographics showcasing Sarah J.'s premium organic cookie recipes, emphasizing key taste textures, natural ingredients, and crunch profiles.
  </p>
</div>

<!-- Project Card 2: Nexa Pouches -->
<div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01); text-align: left;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
    <tr>
      <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="font-size: 14px; font-weight: 700; color: #0f172a;">Nexa — EDC Gear</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Premium A+ Content Modules</div>
      </td>
      <td align="right" valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <span style="font-size: 11px; font-weight: 700; color: #2563eb; background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 4px 10px; border-radius: 100px; display: inline-block;">3.2x ROAS</span>
      </td>
    </tr>
  </table>

  <!-- Vertical A+ Content Stack (One image per row) -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px; border-collapse: collapse;">
    <tr>
      <td style="padding: 4px 0; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271681/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-1.png" alt="Nexa Brand Header" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 4px 0; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271683/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-2.png" alt="Nexa Lifestyle Module" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 4px 0; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271685/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-3.png" alt="Nexa Technical Comparison" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 4px 0; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271686/grow_orbit_portfolio/assets/portfolio/nexa_pouches/aplus-4.png" alt="Nexa Precision Engineering" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
  </table>

  <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    Premium custom A+ Content modules showcasing Nexa's durability specifications, tactical EDC lifestyle layouts, pocket-sized capacity, and advanced waterproof rubber seal details.
  </p>
</div>

<!-- Project Card 3: Core Vitality supplements -->
<div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01); text-align: left;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
    <tr>
      <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="font-size: 14px; font-weight: 700; color: #0f172a;">Core Vitality — Health & Supplements</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Photorealistic 3D Pill Renders</div>
      </td>
      <td align="right" valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <span style="font-size: 11px; font-weight: 700; color: #7c3aed; background-color: #f5f3ff; border: 1px solid #ddd6fe; padding: 4px 10px; border-radius: 100px; display: inline-block;">+130% Sales Lift</span>
      </td>
    </tr>
  </table>

  <!-- 2x2 Image Grid -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px; border-collapse: collapse;">
    <tr>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271764/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/main_image.png" alt="Core Vitality Hero" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271768/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/2.png" alt="Core Vitality Presentation" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
    <tr>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271770/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/3.png" alt="Core Vitality Packaging" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271772/grow_orbit_portfolio/assets/portfolio/core_vitality_suppliments/4.png" alt="Core Vitality Bio-Availability" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
  </table>

  <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    Photorealistic 3D packaging renders and science-focused infographics explaining Dr. Elena R.'s dual-phase formula activation, bioavailability tracking, and synergistic ingredients.
  </p>
</div>

<!-- Project Card 4: Meow Master Cat Food -->
<div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 28px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01); text-align: left;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
    <tr>
      <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="font-size: 14px; font-weight: 700; color: #0f172a;">Meow-Master — Pet Nutrition</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Vibrant Listing Infographics</div>
      </td>
      <td align="right" valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <span style="font-size: 11px; font-weight: 700; color: #16a34a; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 4px 10px; border-radius: 100px; display: inline-block;">+110% CVR Lift</span>
      </td>
    </tr>
  </table>

  <!-- 2x2 Image Grid -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px; border-collapse: collapse;">
    <tr>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781528191/grow_orbit_portfolio/meow_master/main_image.png" alt="Meow-Master Hero" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781528178/grow_orbit_portfolio/meow_master/Artboard_1_6.png" alt="Meow-Master Presentation" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
    <tr>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781528189/grow_orbit_portfolio/meow_master/Artboard_7_5.png" alt="Meow-Master Ingredients" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
      <td class="grid-cell" width="50%" style="padding: 4px; vertical-align: top;">
        <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781528187/grow_orbit_portfolio/meow_master/Artboard_6_5.png" alt="Meow-Master Simple Routine" style="width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid #f1f5f9;" />
      </td>
    </tr>
  </table>

  <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    Vet-approved pet care listing infographics showcasing real salmon ingredients, veterinary endorsements, and a visual 60-day cat health transformation checklist.
  </p>
</div>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 8px;">Let's transform your brand assets. Book a free creative design consultation today.</p>`,
  },
  {
    id: "welcome",
    label: "Welcome Email",
    emoji: "👋",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.06)",
    border: "rgba(74,222,128,0.15)",
    icon: Sparkles,
    description: "New lead onboarding",
    subject: "Welcome to Grow Orbit! 🚀",
    headerImage: "/logo.png",
    headline: "Welcome Aboard! Let's Scale Your Brand",
    body: `<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px;">Hi there 👋</p>

<!-- Premium Hook Panel -->
<div style="background-color: #f0fdf4; border-left: 3px solid #10b981; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);">
  <p style="font-size: 14.5px; line-height: 1.5; color: #1e293b; font-style: italic; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    "Let's turn your listing visits into customer orders. Here is exactly what we are prepping for your brand strategy call."
  </p>
</div>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">Thank you for scheduling a strategy call! Our team of Amazon account managers is currently preparing an audit of your brand's marketplace position.</p>

<!-- Timeline Card -->
<div style="background-color: #f8fafc; border: 3px solid #ffffff; border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: left; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.015);">
  <div style="margin-bottom: 20px; text-align: left;">
    <span style="display: inline-block; background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 50px; padding: 6px 14px; font-size: 10px; font-weight: 800; color: #ea580c; letter-spacing: 0.05em; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      ⚡ Priority Gaps to Target
    </span>
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 1.6; color: #475569;">
    <tr>
      <td width="36" valign="top" style="padding-bottom: 16px;">
        <div style="width: 26px; height: 26px; border-radius: 13px; background: #ffffff; color: #ea580c; font-size: 12px; font-weight: 800; line-height: 26px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">1</div>
      </td>
      <td valign="top" style="padding-bottom: 16px; padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong style="color: #0f172a; font-size: 14px;">Keyword Discoverability:</strong> <span style="color: #475569;">Dominating high-volume search terms for ASINs B0H4NWP31Q & B0G62KPDVF to capture lost market share.</span>
      </td>
    </tr>
    <tr>
      <td width="36" valign="top" style="padding-bottom: 16px;">
        <div style="width: 26px; height: 26px; border-radius: 13px; background: #ffffff; color: #ea580c; font-size: 12px; font-weight: 800; line-height: 26px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">2</div>
      </td>
      <td valign="top" style="padding-bottom: 16px; padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong style="color: #0f172a; font-size: 14px;">A+ Brand Story:</strong> <span style="color: #475569;">Upgrading the visual narrative to lock in conversions once shoppers land on your page.</span>
      </td>
    </tr>
    <tr>
      <td width="36" valign="top">
        <div style="width: 26px; height: 26px; border-radius: 13px; background: #ffffff; color: #ea580c; font-size: 12px; font-weight: 800; line-height: 26px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">3</div>
      </td>
      <td valign="top" style="padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong style="color: #0f172a; font-size: 14px;">Persuasive Imagery:</strong> <span style="color: #475569;">Designing custom, high-converting infographics tailored for mobile shoppers across all variations.</span>
      </td>
    </tr>
  </table>
</div>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 8px;">Have immediate questions? Just hit reply to this email.</p>`,
  },
  {
    id: "getStartedMobile",
    label: "Get Started Promo",
    emoji: "🔥",
    color: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.15)",
    icon: Smartphone,
    description: "Multi-section dark theme pitch",
    subject: "Turn Amazon Into Your Growth Engine 🔥",
    headerImage: "/logo.png",
    headline: "",
    body: `<!-- DARK_THEME -->
<div style="background-color: #0A0A0B; margin: -36px -32px; padding: 36px 32px; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <!-- Section 1: Hero & Stats -->
  <div style="text-align: center; margin-bottom: 32px;">
    <!-- Eyebrow: 92 / SYSTEM - GROWTH PARTNER -->
    <div style="font-size: 9px; font-weight: bold; color: #f97316; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 12px; display: inline-flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #f97316; margin-right: 6px; vertical-align: middle;"></span>
      92 / SYSTEM - GROWTH PARTNER
    </div>

    <!-- Badge: Currently Accepting 3-5 Brands -->
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; border: 1px solid rgba(249,115,22,0.3); background-color: rgba(249,115,22,0.05); color: #f97316; border-radius: 100px; padding: 4px 14px; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        ⚡ Currently Accepting 3-5 Brands - Apply Now
      </span>
    </div>

    <!-- Big Title: TURN AMAZON INTO YOUR GROWTH ENGINE. -->
    <h1 style="font-size: 26px; font-weight: 900; line-height: 1.15; color: #ffffff; margin: 0 0 16px 0; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.03em;">
      TURN AMAZON <br>INTO YOUR <br><span style="color: #f97316;">GROWTH ENGINE.</span>
    </h1>

    <!-- Description -->
    <p style="font-size: 15px; line-height: 1.6; color: #a1a1aa; margin: 0 auto 32px auto; max-width: 480px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      We build, launch, and scale Amazon brands from $0 to <strong style="color: #ffffff;">$50K-$200K+/month</strong> with a proven, profit-first system.
    </p>

    <!-- Stats 2x2 Grid -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px; border-collapse: collapse;">
      <tr>
        <td width="48%" style="padding: 12px; background: #141416; border: 1px solid #27272a; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: left;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="26" valign="top" style="font-size: 16px; color: #f97316; padding-top: 2px;">📈</td>
              <td valign="top" style="padding-left: 6px;">
                <div style="font-size: 18px; font-weight: 900; color: #ffffff;">$12M+</div>
                <div style="font-size: 8px; color: #a1a1aa; text-transform: uppercase; font-weight: 700; margin-top: 2px; letter-spacing: 0.05em; line-height: 1.2;">Revenue Generated</div>
              </td>
            </tr>
          </table>
        </td>
        <td width="4%"></td>
        <td width="48%" style="padding: 12px; background: #141416; border: 1px solid #27272a; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: left;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="26" valign="top" style="font-size: 16px; color: #f97316; padding-top: 2px;">🚀</td>
              <td valign="top" style="padding-left: 6px;">
                <div style="font-size: 18px; font-weight: 900; color: #ffffff;">80+</div>
                <div style="font-size: 8px; color: #a1a1aa; text-transform: uppercase; font-weight: 700; margin-top: 2px; letter-spacing: 0.05em; line-height: 1.2;">Brands Launched</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr style="height: 12px;"><td colspan="3"></td></tr>
      <tr>
        <td width="48%" style="padding: 12px; background: #141416; border: 1px solid #27272a; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: left;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="26" valign="top" style="font-size: 16px; color: #f97316; padding-top: 2px;">🎯</td>
              <td valign="top" style="padding-left: 6px;">
                <div style="font-size: 18px; font-weight: 900; color: #ffffff;">8.2x</div>
                <div style="font-size: 8px; color: #a1a1aa; text-transform: uppercase; font-weight: 700; margin-top: 2px; letter-spacing: 0.05em; line-height: 1.2;">Average ROAS</div>
              </td>
            </tr>
          </table>
        </td>
        <td width="4%"></td>
        <td width="48%" style="padding: 12px; background: #141416; border: 1px solid #27272a; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: left;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="26" valign="top" style="font-size: 16px; color: #f97316; padding-top: 2px;">🛡️</td>
              <td valign="top" style="padding-left: 6px;">
                <div style="font-size: 18px; font-weight: 900; color: #ffffff;">100%</div>
                <div style="font-size: 8px; color: #a1a1aa; text-transform: uppercase; font-weight: 700; margin-top: 2px; letter-spacing: 0.05em; line-height: 1.2;">Profit-First Approach</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>

  <!-- Section 2: Real Client Dashboards -->
  <div style="text-align: center; margin-bottom: 32px; border-top: 1px solid #27272a; padding-top: 24px;">
    <div style="display: inline-block; background-color: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.2); border-radius: 100px; padding: 4px 12px; font-size: 9px; font-weight: bold; color: #f97316; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">
      Real Client Dashboards
    </div>
    <h3 style="font-size: 18px; font-weight: 900; color: #ffffff; margin: 0 0 8px 0; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.02em;">
      Numbers that <span style="font-style: italic; font-weight: 300; color: #a1a1aa; text-transform: none;">speak volumes.</span>
    </h3>
    <p style="font-size: 13px; color: #a1a1aa; margin: 0 0 20px 0; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      Live Seller Central screenshots from brands we manage — growth you can see, not just hear about.
    </p>

    <!-- Dashboards Images Layout -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
      <tr>
        <td width="30%" align="center" valign="middle">
          <img src="https://www.groworbitofficial.com/images/saler%20centeral%20screens/1.jpg" alt="Client Dashboard 1" style="width: 100%; max-width: 150px; border-radius: 8px; border: 1px solid #27272a;" />
        </td>
        <td style="width: 4%;"></td>
        <td width="32%" align="center" valign="middle">
          <img src="https://www.groworbitofficial.com/images/saler%20centeral%20screens/2.jpg" alt="Client Dashboard 2" style="width: 100%; max-width: 170px; border-radius: 8px; border: 2px solid #f97316; box-shadow: 0 4px 20px rgba(249,115,22,0.2);" />
        </td>
        <td style="width: 4%;"></td>
        <td width="30%" align="center" valign="middle">
          <img src="https://www.groworbitofficial.com/images/saler%20centeral%20screens/3.jpg" alt="Client Dashboard 3" style="width: 100%; max-width: 150px; border-radius: 8px; border: 1px solid #27272a;" />
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #141416; border-radius: 8px; border: 1px solid #27272a;">
      <tr>
        <td width="33%" style="padding: 12px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 16px; font-weight: 800; color: #ffffff;">1.15M+</div>
          <div style="font-size: 8px; color: #a1a1aa; text-transform: uppercase; font-weight: bold; margin-top: 2px; letter-spacing: 0.05em;">Units Sold</div>
        </td>
        <td style="border-left: 1px solid #27272a;"></td>
        <td width="33%" style="padding: 12px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 16px; font-weight: 800; color: #ffffff;">135%</div>
          <div style="font-size: 8px; color: #a1a1aa; text-transform: uppercase; font-weight: bold; margin-top: 2px; letter-spacing: 0.05em;">Growth YoY</div>
        </td>
        <td style="border-left: 1px solid #27272a;"></td>
        <td width="33%" style="padding: 12px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 16px; font-weight: 800; color: #ffffff;">99%</div>
          <div style="font-size: 8px; color: #a1a1aa; text-transform: uppercase; font-weight: bold; margin-top: 2px; letter-spacing: 0.05em;">Buy Box Rate</div>
        </td>
      </tr>
    </table>
  </div>

  <!-- Section 3: What We Do (Services) -->
  <div style="margin-bottom: 32px; border-top: 1px solid #27272a; padding-top: 24px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background-color: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.2); border-radius: 100px; padding: 4px 12px; font-size: 9px; font-weight: bold; color: #f97316; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">
        02 / What We Do
      </div>
      <h3 style="font-size: 18px; font-weight: 900; color: #ffffff; margin: 0 0 8px 0; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.02em;">
        Every Lever That <span style="font-style: italic; font-weight: 300; color: #a1a1aa; text-transform: none;">moves revenue.</span>
      </h3>
    </div>

    <!-- Services Grid Layout -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <!-- Row 1 -->
      <tr>
        <td width="48%" valign="top" style="background-color: #141416; border: 1px solid #27272a; border-radius: 8px; padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 10px; font-weight: bold; color: #f97316; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em;">01. Product Hunting</div>
          <div style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin-bottom: 8px;">Find high-demand, low-competition products with strong margins.</div>
          <div style="font-size: 13px; font-weight: bold; color: #ffffff;">30%+ <span style="font-size: 9px; color: #a1a1aa; font-weight: normal;">Margin Potential</span></div>
        </td>
        <td style="width: 4%;"></td>
        <td width="48%" valign="top" style="background-color: #141416; border: 1px solid #27272a; border-radius: 8px; padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 10px; font-weight: bold; color: #f97316; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em;">02. Sourcing & Setup</div>
          <div style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin-bottom: 8px;">Secure factory-direct pricing with verified suppliers globally.</div>
          <div style="font-size: 13px; font-weight: bold; color: #ffffff;">0% <span style="font-size: 9px; color: #a1a1aa; font-weight: normal;">Risk Sourcing</span></div>
        </td>
      </tr>
      <tr style="height: 12px;"><td colspan="3"></td></tr>
      <!-- Row 2 -->
      <tr>
        <td width="48%" valign="top" style="background-color: #141416; border: 1px solid #27272a; border-radius: 8px; padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 10px; font-weight: bold; color: #f97316; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em;">03. Brand Launch</div>
          <div style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin-bottom: 8px;">Launch with high-converting listings and optimized content.</div>
          <div style="font-size: 13px; font-weight: bold; color: #ffffff;">2X <span style="font-size: 9px; color: #a1a1aa; font-weight: normal;">Faster Rankings</span></div>
        </td>
        <td style="width: 4%;"></td>
        <td width="48%" valign="top" style="background-color: #141416; border: 1px solid #27272a; border-radius: 8px; padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 10px; font-weight: bold; color: #f97316; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em;">04. Creative & A+</div>
          <div style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin-bottom: 8px;">Convert shoppers with scroll-stopping product listings & visuals.</div>
          <div style="font-size: 13px; font-weight: bold; color: #ffffff;">25-40% <span style="font-size: 9px; color: #a1a1aa; font-weight: normal;">Higher CVR</span></div>
        </td>
      </tr>
      <tr style="height: 12px;"><td colspan="3"></td></tr>
      <!-- Row 3 -->
      <tr>
        <td width="48%" valign="top" style="background-color: #141416; border: 1px solid #27272a; border-radius: 8px; padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 10px; font-weight: bold; color: #f97316; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em;">05. PPC & Ranking</div>
          <div style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin-bottom: 8px;">Maximize ROI with custom campaign structures and negative keywords.</div>
          <div style="font-size: 13px; font-weight: bold; color: #ffffff;">40% <span style="font-size: 9px; color: #a1a1aa; font-weight: normal;">ACoS Reduction</span></div>
        </td>
        <td style="width: 4%;"></td>
        <td width="48%" valign="top" style="background-color: #141416; border: 1px solid #27272a; border-radius: 8px; padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-size: 10px; font-weight: bold; color: #f97316; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em;">06. Full Mgmt</div>
          <div style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin-bottom: 8px;">End-to-end operational scaling past $100K+ in monthly revenue.</div>
          <div style="font-size: 13px; font-weight: bold; color: #ffffff;">$100K+ <span style="font-size: 9px; color: #a1a1aa; font-weight: normal;">Monthly Scale</span></div>
        </td>
      </tr>
    </table>
  </div>

  <!-- Section 4: Portfolio Preview -->
  <div style="border-top: 1px solid #27272a; padding-top: 24px; text-align: center;">
    <div style="display: inline-block; background-color: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.2); border-radius: 100px; padding: 4px 12px; font-size: 9px; font-weight: bold; color: #f97316; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">
      03 / Portfolio
    </div>
    <h3 style="font-size: 18px; font-weight: 900; color: #ffffff; margin: 0 0 8px 0; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.02em;">
      Our Work in <span style="font-style: italic; font-weight: 300; color: #a1a1aa; text-transform: none;">real-time.</span>
    </h3>
    
    <!-- Lumina Bites Card -->
    <div style="background-color: #141416; border: 1px solid #27272a; border-radius: 12px; padding: 16px; margin-top: 16px; text-align: left;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
        <tr>
          <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="font-size: 13px; font-weight: bold; color: #ffffff;">Lumina Bites — Snacks Niche</div>
            <div style="font-size: 10px; color: #a1a1aa; margin-top: 2px;">Listing Infographics & Design</div>
          </td>
          <td align="right" valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <span style="font-size: 10px; font-weight: bold; color: #16a34a; background-color: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.2); padding: 4px 10px; border-radius: 100px; display: inline-block;">+80% Sales Lift</span>
          </td>
        </tr>
      </table>
      <img src="https://res.cloudinary.com/dciggvulg/image/upload/v1781271653/grow_orbit_portfolio/assets/portfolio/lumina_bites_1/main_image.png" alt="Lumina Bites" style="width: 100%; border-radius: 8px; border: 1px solid #27272a; display: block;" />
    </div>
  </div>
</div>`
  },
  {
    id: "proposal",
    label: "Custom Proposal",
    emoji: "📄",
    color: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.15)",
    icon: Mail,
    description: "Send pitch proposal to client",
    subject: "Your Custom Growth & Amazon Scale Proposal 🚀",
    headerImage: "/logo.png",
    headline: "Your Tailored Brand Growth Proposal",
    body: `<!-- HIDE_DEFAULT_CTA -->
<!-- NEUMORPHIC_THEME -->
<p style="font-size: 14px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px;">Hi,</p>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  It was great connecting on our recent call. Following our discussion where you walked us through your two products, our research team did a deep dive into <strong>Kadilo's Amazon presence</strong>, your competitors, and the market. What we uncovered was even more interesting than we expected.
</p>

<!-- Glassmorphic Metric Banner -->
<div style="background-color: #f8fafc; border: 3px solid #ffffff; border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: center; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.015);">
  <div style="font-size: 10px; font-weight: 800; color: #ef4444; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px;">Category Revenue Opportunity</div>
  <div style="font-size: 28px; font-weight: 900; color: #0f172a; letter-spacing: -0.03em;">Over $10.6M / Month</div>
  <div style="font-size: 12px; color: #64748b; margin-top: 6px; font-weight: 500;">
    $9.1M Scented Candles listings &bull; $1.5M Incense Sticks listings
  </div>
</div>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  Over <strong style="color: #f97316; font-weight: 800;">$10.6M</strong> flows through your product categories every month, yet we identified several opportunities that could help Kadilo capture a much larger share of that demand.
</p>

<!-- Gaps Section Header (Pill Badge) -->
<div style="text-align: left; margin-bottom: 22px;">
  <div style="font-size: 10px; font-weight: 800; color: #ea580c; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 14px; background-color: rgba(249, 115, 22, 0.08); border-radius: 20px; display: inline-block; border: 1px solid rgba(249, 115, 22, 0.18);">
    ⚡ Priority Gaps to Target
  </div>
</div>

<!-- List Structure -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 28px;">
  <!-- Row 1 -->
  <tr>
    <td style="padding-bottom: 18px; vertical-align: top; width: 45px;">
      <!-- Glass Bullet -->
      <div style="background-color: rgba(255, 255, 255, 0.75); border: 1px solid rgba(255, 255, 255, 0.9); width: 28px; height: 28px; border-radius: 50%; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02); text-align: center; line-height: 26px; font-weight: bold; color: #f97316; font-size: 12px;">
        1
      </div>
    </td>
    <td style="padding-bottom: 18px; padding-top: 3px; vertical-align: top;">
      <strong style="color: #1e293b;">Keyword Discoverability:</strong> Dominating high-volume search terms for ASINs B0H4NWP31Q & B0G62KPDVF to capture lost market share.
    </td>
  </tr>
  <!-- Row 2 -->
  <tr>
    <td style="padding-bottom: 18px; vertical-align: top; width: 45px;">
      <div style="background-color: rgba(255, 255, 255, 0.75); border: 1px solid rgba(255, 255, 255, 0.9); width: 28px; height: 28px; border-radius: 50%; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02); text-align: center; line-height: 26px; font-weight: bold; color: #f97316; font-size: 12px;">
        2
      </div>
    </td>
    <td style="padding-bottom: 18px; padding-top: 3px; vertical-align: top;">
      <strong style="color: #1e293b;">A+ Brand Story:</strong> Upgrading the visual narrative to lock in conversions once shoppers land on your page.
    </td>
  </tr>
  <!-- Row 3 -->
  <tr>
    <td style="vertical-align: top; width: 45px;">
      <div style="background-color: rgba(255, 255, 255, 0.75); border: 1px solid rgba(255, 255, 255, 0.9); width: 28px; height: 28px; border-radius: 50%; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02); text-align: center; line-height: 26px; font-weight: bold; color: #f97316; font-size: 12px;">
        3
      </div>
    </td>
    <td style="padding-top: 3px; vertical-align: top;">
      <strong style="color: #1e293b;">Persuasive Imagery:</strong> Designing custom, high-converting infographics tailored for mobile shoppers across all variations.
    </td>
  </tr>
</table>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  Instead of sending a generic proposal, we prepared a <strong style="color: #0f172a;">personalized Growth Blueprint</strong> outlining our findings, the gaps we identified, and the strategy we'd recommend if Kadilo were our own brand.
</p>

<!-- Glass Attachment Box -->
<div style="text-align: center; margin-bottom: 24px; margin-top: 16px;">
  <a href="https://drive.google.com/file/d/1avAPVaDAQva217UPYlCbE72dx_TD8uDA/view?usp=drive_link" target="_blank" style="display: block; background-color: #ffffff; border: 1.5px dashed #fdba74; border-radius: 16px; padding: 18px 24px; text-decoration: none; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.015);">
    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
      <tr>
        <td style="vertical-align: middle; padding-right: 12px;">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" style="display: block;">
            <path d="M12 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H18C19.1 24 20 23.1 20 22V8L12 0Z" fill="#e8e5f7"/>
            <path d="M12 0V8H20L12 0Z" fill="#d1caf0"/>
            <line x1="4" y1="13" x2="16" y2="13" stroke="#b0a4e3" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="4" y1="17" x2="16" y2="17" stroke="#b0a4e3" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="4" y1="21" x2="11" y2="21" stroke="#b0a4e3" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </td>
        <td style="vertical-align: middle; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em;">
          Open Detailed Growth Blueprint (PDF)
        </td>
      </tr>
    </table>
  </a>
</div>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  Rather than spoiling everything here, I'll let the report speak for itself.
</p>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  If it resonates with you, I'd be happy to walk you through the strategy and answer any questions on a quick call.
</p>

<!-- Orange Glass CTA Button -->
<div style="text-align: center; margin-bottom: 28px;">
  <a href="https://www.groworbitofficial.com/get-started/#lead-form" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff !important; padding: 15px 35px; border-radius: 50px; font-size: 13px; font-weight: 800; text-decoration: none; box-shadow: 0 10px 25px rgba(234, 88, 12, 0.25); border: 1px solid rgba(255, 255, 255, 0.1); text-transform: uppercase; letter-spacing: 0.06em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    🗓️ Book a Strategy Call
  </a>
</div>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  Looking forward to hearing your thoughts.
</p>

<!-- Soft Divider line -->
<div style="height: 1px; background-color: rgba(15, 23, 42, 0.06); margin: 30px 0 24px 0; border-radius: 1px;"></div>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 0;">
  Warm regards,<br />
  <strong style="color: #0f172a; font-size: 16px;">The Grow <span style="color: #f97316;">Orbit</span> Team</strong>
</p>`,
  },
  {
    id: "meetingBooking",
    label: "Meeting Booking",
    emoji: "🗓️",
    color: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.15)",
    icon: Calendar,
    description: "Confirm meeting & timezone",
    subject: "Meeting Schedule Confirmation — Grow Orbit 🗓️",
    headerImage: "/logo.png",
    headline: "Meeting Schedule Confirmation",
    body: `<!-- HIDE_DEFAULT_CTA -->
<!-- NEUMORPHIC_THEME -->
<p style="font-size: 14px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 20px;">Hi,</p>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  Thank you for your email.
</p>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  <strong>2:00 PM</strong> works well for me. Could you please let me know which time zone you're referring to? That way, I can adjust the meeting time accordingly on my end.
</p>

<!-- Interactive Calendar Ticket Card -->
<div style="background-color: #f8fafc; border: 3px solid #ffffff; border-radius: 16px; padding: 24px; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.015); border-left: 5px solid #f97316;">
  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="vertical-align: top; width: 60px; padding-right: 16px; text-align: center; border-right: 2px dashed #cbd5e1;">
        <!-- Styled Calendar Icon Badge -->
        <div style="background: rgba(249, 115, 22, 0.08); border-radius: 12px; border: 1.5px solid rgba(249, 115, 22, 0.25); padding: 8px; width: 40px; box-sizing: border-box;">
          <div style="font-size: 8px; font-weight: 800; color: #f97316; text-transform: uppercase; margin-bottom: 2px;">TOMORROW</div>
          <div style="font-size: 16px; font-weight: 900; color: #0f172a; line-height: 1;">📅</div>
        </div>
      </td>
      <td style="vertical-align: middle; padding-left: 20px; text-align: left;">
        <div style="font-size: 10px; font-weight: 800; color: #64748b; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px;">Proposed Meeting Time</div>
        <div style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">2:00 PM <span style="font-size: 12px; color: #f97316; font-weight: 700;">(Time Zone Pending)</span></div>
        <div style="font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 500;">
          Agenda: Discussing Strategy Plan & Costing
        </div>
      </td>
    </tr>
  </table>
</div>

<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px;">
  Looking forward to speaking with you tomorrow and discussing the plan and costing.
</p>

<!-- Orange Glass CTA Button -->
<div style="text-align: center; margin-bottom: 28px; margin-top: 16px;">
  <a href="https://www.groworbitofficial.com/get-started/#lead-form" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff !important; padding: 16px 60px; min-width: 260px; border-radius: 50px; font-size: 13px; font-weight: 800; text-decoration: none; box-shadow: 0 10px 25px rgba(234, 88, 12, 0.25); border: 3px solid #fdba74; text-transform: uppercase; letter-spacing: 0.06em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    🗓️ Book Meeting
  </a>
</div>`,
  }
];

export default function NewsletterTab({ isMobile }) {
  const [subject, setSubject] = useState(TEMPLATES[0].subject);
  const [headerImage, setHeaderImage] = useState(TEMPLATES[0].headerImage);
  const [headline, setHeadline] = useState(TEMPLATES[0].headline);
  const [body, setBody] = useState(TEMPLATES[0].body);
  const [copied, setCopied] = useState(false);
  const [sourceCopied, setSourceCopied] = useState(false);
  const [subjectCopied, setSubjectCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0].id);

  const loadSandboxDraft = () => {
    if (sandboxSubject) setSubject(sandboxSubject);
    if (sandboxHeadline) setHeadline(sandboxHeadline);
    
    const filteredWidgets = widgets.filter(w => w.type !== "sandboxContent");
    
    // Extract and preserve any existing HTML comment tags (flags) from the current body text
    const commentFlags = body.match(/<!--[\s\S]*?-->/g) || [];
    const flagsStr = commentFlags.join("\n");
    const prettyBody = beautifyHtml(sandboxBody || "");
    const fullBodyText = flagsStr ? `${flagsStr}\n${prettyBody}` : prettyBody;

    const newSandboxWidget = {
      id: `sandbox-${sandboxId || Date.now()}`,
      type: "sandboxContent",
      content: {
        text: fullBodyText
      }
    };
    
    setWidgets([newSandboxWidget, ...filteredWidgets]);
    setBody(fullBodyText);
    setActiveTemplate("tempEmail");
  };

  const handleBodyChange = (value) => {
    setBody(value);
    const sandboxIdx = widgets.findIndex(w => w.type === "sandboxContent");
    if (sandboxIdx !== -1) {
      const newW = [...widgets];
      newW[sandboxIdx] = {
        ...newW[sandboxIdx],
        content: {
          ...newW[sandboxIdx].content,
          text: value
        }
      };
      setWidgets(newW);
    }
  };
  const [uploadingImage, setUploadingImage] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // "desktop" | "mobile"
  const [focusedField, setFocusedField] = useState(null); // "subject" | "headerImage" | "headline" | "body"
  const [previewHtml, setPreviewHtml] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showWidgetsModal, setShowWidgetsModal] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);
  const [widgets, setWidgets] = useState([
    { id: "meeting-cta", type: "meetingButton", content: { text: "🗓️ Book Meeting", link: "https://www.groworbitofficial.com/get-started/#lead-form" } },
    { id: "signature", type: "teamSignature", content: { line1: "Warm regards,", line2: "The Grow Orbit Team" } }
  ]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const bodyTextareaRef = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newWidgets = [...widgets];
    const draggedItemContent = newWidgets.splice(dragItem.current, 1)[0];
    newWidgets.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setWidgets(newWidgets);
  };

  const moveWidget = (index, direction) => {
    const newWidgets = [...widgets];
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newWidgets.length) {
      const temp = newWidgets[index];
      newWidgets[index] = newWidgets[targetIndex];
      newWidgets[targetIndex] = temp;
      setWidgets(newWidgets);
    }
  };

  const applyFormatting = (tag, widgetId, field, color = null) => {
    const textarea = document.getElementById("widget-text-editor");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value || "";
    const selectedText = currentText.substring(start, end);
    
    let formattedText = selectedText;
    if (tag === 'b') formattedText = `<b>${selectedText || 'bold text'}</b>`;
    else if (tag === 'i') formattedText = `<i>${selectedText || 'italic text'}</i>`;
    else if (tag === 'u') formattedText = `<u>${selectedText || 'underlined text'}</u>`;
    else if (tag === 'color') formattedText = `<span style="color: ${color};">${selectedText || 'colored text'}</span>`;

    const newText = currentText.substring(0, start) + formattedText + currentText.substring(end);
    
    const index = widgets.findIndex(x => x.id === widgetId);
    if (index !== -1) {
      const newW = [...widgets];
      newW[index] = { ...newW[index], content: { ...newW[index].content, [field]: newText } };
      setWidgets(newW);
    }
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const toggleWidgetType = (type) => {
    const exists = widgets.some(w => w.type === type);
    if (exists) {
      setWidgets(widgets.filter(w => w.type !== type));
    } else {
      const id = `${type}-${Date.now()}`;
      if (type === "meetingButton") {
        setWidgets([...widgets, { id, type, content: { text: "🗓️ Book Meeting", link: "https://www.groworbitofficial.com/get-started/#lead-form" } }]);
      } else if (type === "roadmap") {
        setWidgets([...widgets, { id, type, content: { 
          title: "⚡ Priority Gaps to Target",
          step1Title: "Keyword Discoverability:",
          step1Desc: "Dominating high-volume search terms for ASINs B0H4NWP31Q & B0G62KPDVF to capture lost market share.",
          step2Title: "A+ Brand Story:",
          step2Desc: "Upgrading the visual narrative to lock in conversions once shoppers land on your page.",
          step3Title: "Persuasive Imagery:",
          step3Desc: "Designing custom, high-converting infographics tailored for mobile shoppers across all variations."
        } }]);
      } else if (type === "teamSignature") {
        setWidgets([...widgets, { id, type, content: { line1: "Warm regards,", line2: "The Grow Orbit Team" } }]);
      } else if (type === "revenueOpportunity") {
        setWidgets([...widgets, { id, type, content: { label: "Category Revenue Opportunity", amount: "Over $10.6M / Month", details: "$9.1M Scented Candles • $1.5M Incense Sticks" } }]);
      } else if (type === "proposal") {
        setWidgets([...widgets, { id, type, content: { label: "Open Detailed Growth Blueprint (PDF)", link: "https://www.groworbitofficial.com/blueprint-preview.pdf" } }]);
      } else if (type === "caseStudy") {
        setWidgets([...widgets, { id, type, content: { clientName: "Acme Corp", stat: "+150% Sales", description: "Grow Orbit revamped our SEO strategy and product detail pages, yielding massive revenue scale." } }]);
      } else if (type === "twoColumnStats") {
        setWidgets([...widgets, { id, type, content: { leftMetric: "12.4%", leftLabel: "Market Share", rightMetric: "4.8x", rightLabel: "Average RoAS" } }]);
      } else if (type === "videoPlaceholder") {
        setWidgets([...widgets, { id, type, content: { videoUrl: "https://www.loom.com/share/...", title: "Watch: Our Amazon Growth Strategy Walkthrough" } }]);
      } else {
        setWidgets([...widgets, { id, type }]);
      }
    }
  };

  const compileHtml = useCallback((subj, headerImg, headText, bodyText) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
    
    const hasSandboxWidget = widgets.some(w => w.type === "sandboxContent");
    let mergedBodyText = hasSandboxWidget 
      ? (bodyText.match(/<!--[\s\S]*?-->/g) || []).join("\n") 
      : bodyText;

    if (activeTemplate === "tempEmail") {
      widgets.forEach(w => {
        if (w.type === "revenueOpportunity") {
          const cardLabel = w.content?.label || "Category Revenue Opportunity";
          const cardAmount = w.content?.amount || "Over $10.6M / Month";
          const cardDetails = w.content?.details || "$9.1M Scented Candles &bull; $1.5M Incense Sticks";
          mergedBodyText += `
<!-- Revenue Opportunity Card -->
<div style="background-color: #f8fafc; border: 3px solid #ffffff; border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: center; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.015);">
  <div style="font-size: 10px; font-weight: 800; color: #ef4444; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px;">${cardLabel}</div>
  <div style="font-size: 28px; font-weight: 900; color: #0f172a; letter-spacing: -0.03em;">${cardAmount}</div>
  <div style="font-size: 12px; color: #64748b; margin-top: 6px; font-weight: 500;">
    ${cardDetails}
  </div>
</div>`;
        } else if (w.type === "caseStudy") {
          mergedBodyText += `
<!-- Case Study Success Card -->
<div style="background-color: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: left; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="font-size: 10px; font-weight: 800; color: #15803d; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px;">Client Success Spotlight</div>
  <div style="font-size: 24px; font-weight: 900; color: #166534; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 8px;">${w.content?.stat || '+150% Sales'}</div>
  <div style="font-weight: 700; color: #14532d; font-size: 14px; margin-bottom: 6px;">Client: ${w.content?.clientName || 'Acme Corp'}</div>
  <div style="font-size: 13px; line-height: 1.6; color: #166534; font-style: italic;">"${w.content?.description || ''}"</div>
</div>`;
        } else if (w.type === "twoColumnStats") {
          mergedBodyText += `
<!-- Two-Column Metric Highlights -->
<div style="margin-bottom: 24px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
    <tr>
      <td width="48%" align="center" valign="top" style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.015);">
        <div style="font-size: 24px; font-weight: 900; color: #f97316;">${w.content?.leftMetric || '12.4%'}</div>
        <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">${w.content?.leftLabel || 'Market Share'}</div>
      </td>
      <td width="4%">&nbsp;</td>
      <td width="48%" align="center" valign="top" style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.015);">
        <div style="font-size: 24px; font-weight: 900; color: #3b82f6;">${w.content?.rightMetric || '4.8x'}</div>
        <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">${w.content?.rightLabel || 'Average RoAS'}</div>
      </td>
    </tr>
  </table>
</div>`;
        } else if (w.type === "videoPlaceholder") {
          mergedBodyText += `
<!-- Video Walkthrough Tour -->
<div style="text-align: center; margin-bottom: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <a href="${w.content?.videoUrl || 'https://www.loom.com'}" target="_blank" style="display: block; text-decoration: none; border-radius: 16px; overflow: hidden; background-color: #0f172a; border: 4px solid #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.08); padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td align="center" valign="middle" style="background: linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.45)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80') center center / cover; padding: 75px 20px;">
          <!-- Play button -->
          <div style="width: 56px; height: 56px; border-radius: 28px; background-color: #ea580c; border: 3px solid #ffffff; display: inline-block; line-height: 56px; font-size: 20px; color: #ffffff; text-align: center; box-shadow: 0 4px 15px rgba(234,88,12,0.4); margin-bottom: 12px;">▶</div>
          <div style="color: #ffffff; font-size: 14px; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${w.content?.title || 'Watch Video Walkthrough'}</div>
        </td>
      </tr>
    </table>
  </a>
</div>`;
        } else if (w.type === "meetingButton") {
          const btnText = w.content?.text || "🗓️ Book Meeting";
          const btnLink = w.content?.link || "https://www.groworbitofficial.com/get-started/#lead-form";
          mergedBodyText += `
<!-- Book Meeting Button -->
<div style="text-align: center; margin-bottom: 28px; margin-top: 16px;">
  <a href="${btnLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff !important; padding: 16px 60px; min-width: 260px; border-radius: 50px; font-size: 13px; font-weight: 800; text-decoration: none; box-shadow: 0 10px 25px rgba(234, 88, 12, 0.25); border: 3px solid #fdba74; text-transform: uppercase; letter-spacing: 0.06em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    ${btnText}
  </a>
</div>`;
        } else if (w.type === "roadmap") {
          const roadmapTitle = w.content?.title || "⚡ Priority Gaps to Target";
          const s1Title = w.content?.step1Title || "Keyword Discoverability:";
          const s1Desc = w.content?.step1Desc || "Dominating high-volume search terms for ASINs B0H4NWP31Q & B0G62KPDVF to capture lost market share.";
          const s2Title = w.content?.step2Title || "A+ Brand Story:";
          const s2Desc = w.content?.step2Desc || "Upgrading the visual narrative to lock in conversions once shoppers land on your page.";
          const s3Title = w.content?.step3Title || "Persuasive Imagery:";
          const s3Desc = w.content?.step3Desc || "Designing custom, high-converting infographics tailored for mobile shoppers across all variations.";
          mergedBodyText += `
<!-- Onboarding Roadmap Widget -->
<div style="background-color: #f8fafc; border: 3px solid #ffffff; border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: left; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.015);">
  <div style="margin-bottom: 20px; text-align: left;">
    <span style="display: inline-block; background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 50px; padding: 6px 14px; font-size: 10px; font-weight: 800; color: #ea580c; letter-spacing: 0.05em; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      ${roadmapTitle}
    </span>
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 1.6; color: #475569;">
    <tr>
      <td width="36" valign="top" style="padding-bottom: 16px;">
        <div style="width: 26px; height: 26px; border-radius: 13px; background: #ffffff; color: #ea580c; font-size: 12px; font-weight: 800; line-height: 26px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">1</div>
      </td>
      <td valign="top" style="padding-bottom: 16px; padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong style="color: #0f172a; font-size: 14px;">${s1Title}</strong> <span style="color: #475569;">${s1Desc}</span>
      </td>
    </tr>
    <tr>
      <td width="36" valign="top" style="padding-bottom: 16px;">
        <div style="width: 26px; height: 26px; border-radius: 13px; background: #ffffff; color: #ea580c; font-size: 12px; font-weight: 800; line-height: 26px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">2</div>
      </td>
      <td valign="top" style="padding-bottom: 16px; padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong style="color: #0f172a; font-size: 14px;">${s2Title}</strong> <span style="color: #475569;">${s2Desc}</span>
      </td>
    </tr>
    <tr>
      <td width="36" valign="top">
        <div style="width: 26px; height: 26px; border-radius: 13px; background: #ffffff; color: #ea580c; font-size: 12px; font-weight: 800; line-height: 26px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">3</div>
      </td>
      <td valign="top" style="padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong style="color: #0f172a; font-size: 14px;">${s3Title}</strong> <span style="color: #475569;">${s3Desc}</span>
      </td>
    </tr>
  </table>
</div>`;
        } else if (w.type === "proposal") {
          const blueprintLabel = w.content?.label || "Open Detailed Growth Blueprint (PDF)";
          mergedBodyText += `
<!-- Proposal PDF Button Widget -->
<div style="text-align: center; margin-bottom: 24px; margin-top: 16px;">
  <a href="${w.content?.link || '#'}" target="_blank" style="display: block; background-color: #ffffff; border: 1.5px dashed #fdba74; border-radius: 16px; padding: 18px 24px; text-decoration: none; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.015);">
    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
      <tr>
        <td style="vertical-align: middle; padding-right: 12px;">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" style="display: block;">
            <path d="M12 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H18C19.1 24 20 23.1 20 22V8L12 0Z" fill="#e8e5f7"/>
            <path d="M12 0V8H20L12 0Z" fill="#d1caf0"/>
            <line x1="4" y1="13" x2="16" y2="13" stroke="#b0a4e3" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="4" y1="17" x2="16" y2="17" stroke="#b0a4e3" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="4" y1="21" x2="11" y2="21" stroke="#b0a4e3" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </td>
        <td style="vertical-align: middle; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em;">
          ${blueprintLabel}
        </td>
      </tr>
    </table>
  </a>
</div>`;
        } else if (w.type === "teamSignature") {
          const sigLine1 = w.content?.line1 || "Warm regards,";
          const sigLine2 = w.content?.line2 || "The Grow Orbit Team";
          mergedBodyText += `
<!-- Team Grow Orbit Signature -->
<div style="height: 1px; background-color: rgba(15, 23, 42, 0.06); margin: 30px 0 24px 0; border-radius: 1px;"></div>
<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 0;">
  ${sigLine1}<br />
  <strong style="color: #0f172a; font-size: 16px;">The Grow <span style="color: #f97316;">Orbit</span> Team</strong>
</p>`;
        } else if (w.type === "text") {
          const textHtml = w.content?.text ? w.content.text.replace(/\n/g, "<br />") : "";
          mergedBodyText += `
<!-- Custom Text Widget -->
<div style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  ${textHtml}
</div>`;
        } else if (w.type === "sandboxContent") {
          const sandboxHtmlText = w.content?.text || "";
          mergedBodyText += `
<!-- AI Sandbox Content Widget -->
<div style="font-size: 14px; line-height: 1.7; color: #4b5563; margin-bottom: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  ${sandboxHtmlText}
</div>`;
        }
      });
    }

    const bodyHasHtml = mergedBodyText.includes("<img") || mergedBodyText.includes("<div") || mergedBodyText.includes("<table") || mergedBodyText.includes("<p");
    const formattedBody = bodyHasHtml ? mergedBodyText : mergedBodyText.replace(/\n/g, "<br />");
    let logoUrl = "/logo.png";
    if (headerImg) {
      logoUrl = headerImg.trim();
    }
    const absoluteLogoUrl = logoUrl.startsWith("http")
      ? logoUrl
      : `${siteUrl}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;

    const containsFlag = (flag) => {
      if (bodyText.includes(flag)) return true;
      return widgets.some(w => w.content?.text?.includes(flag));
    };

    const isDark = containsFlag("<!-- DARK_THEME -->");
    const isNeumorphic = containsFlag("<!-- NEUMORPHIC_THEME -->");
    
    let containerBg = "#ffffff";
    let outerBg = "#f8fafc";
    let borderColor = "#e2e8f0";
    let h1Color = "#0F172A";
    let containerShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)";
 
    if (isDark) {
      containerBg = "#0A0A0B";
      outerBg = "#050506";
      borderColor = "#27272a";
      h1Color = "#ffffff";
    } else if (isNeumorphic) {
      containerBg = "#f0f4f8";
      outerBg = "#e2ebf5";
      borderColor = "transparent";
      h1Color = "#0f172a";
      containerShadow = "9px 9px 18px #cbd5e1, -9px -9px 18px #ffffff";
    }
 
    const hideDefaultCta = containsFlag("<!-- HIDE_DEFAULT_CTA -->");
    const hideHeader = containsFlag("<!-- HIDE_HEADER -->");

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: ${outerBg};
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: ${isDark ? "#ffffff" : "#333333"};
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        ${isNeumorphic ? "" : "border-radius: 0 !important; border: none !important;"}
      }
      .email-body {
        padding: 24px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${outerBg};">
  <div style="width: 100%; background-color: ${outerBg}; padding: 24px 20px; box-sizing: border-box; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: ${containerBg}; border-radius: 16px; overflow: hidden; box-shadow: ${isNeumorphic ? "none" : containerShadow}; border: ${isNeumorphic ? "3px solid #ffffff" : `1px solid ${borderColor}`};">
      <!-- Header -->
      ${hideHeader ? "" : `
      <div style="background: linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 50%, #050505 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #f97316; border-top-left-radius: 13px; border-top-right-radius: 13px;">
        <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td valign="middle" style="padding-right: 16px;">
              <img src="${absoluteLogoUrl}" alt="Grow Orbit" style="max-height: 52px; display: block;" />
            </td>
            <td valign="middle" style="text-align: left; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="font-size: 26px; font-weight: 900; line-height: 1; letter-spacing: 0.03em; color: #ffffff;">
                GROW <span style="color: #f97316;">ORBIT</span>
              </div>
              <div style="font-size: 8px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.16em; text-transform: uppercase; margin-top: 6px; line-height: 1.2;">
                WE RANK. YOU SELL. IT'S THAT SIMPLE.
              </div>
            </td>
          </tr>
        </table>
      </div>
      `}
      <!-- Body -->
      <div class="email-body" style="padding: 36px 32px; background-color: ${containerBg}; text-align: left;">
        ${headText ? `<h1 style="font-size: 22px; font-weight: 800; color: ${h1Color}; margin-top: 0; margin-bottom: 20px; line-height: 1.3; letter-spacing: -0.02em; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${headText}</h1>` : ""}
        <div style="font-size: 15px; color: ${isDark ? "#e4e4e7" : "#334155"}; line-height: 1.6; margin-bottom: 28px; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${formattedBody}</div>
        
        <!-- CTA -->
        ${hideDefaultCta ? "" : `
        <div style="text-align: center; margin: 32px 0 12px;">
          <a href="${siteUrl}/get-started/#lead-form" style="background-color: #f97316; color: #ffffff !important; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25); text-transform: uppercase; letter-spacing: 0.05em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;" target="_blank">Book a Strategy Call</a>
        </div>
        `}
        
        <hr style="border: 0; border-top: 1px solid ${borderColor}; margin: 36px 0 24px 0;">
        
        <!-- Footer -->
        <div style="text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <p style="font-weight: 700; color: ${isDark ? "#a1a1aa" : "#64748B"}; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0; margin-bottom: 4px;">Grow Orbit Agency</p>
          <p style="margin: 0; color: ${isDark ? "#71717a" : "#94A3B8"};">
            support@groworbitofficial.com &middot; +1 (912) 820-5916
          </p>
          <p style="margin: 4px 0 0; color: ${isDark ? "#71717a" : "#94A3B8"};">
            2583 Lundigan Dr, Mississauga, ON L5J 3W2, Canada
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Optimize Cloudinary URLs in the compiled HTML to load instantly and prevent failures on mobile devices (e.g. Gmail proxy)
    const optimizedHtml = rawHtml.replace(
      /https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(v\d+)/g,
      "https://res.cloudinary.com/$1/image/upload/f_auto,q_auto,w_600/$2"
    );

    return optimizedHtml;
  }, [activeTemplate, widgets]);

  const getCompiledHtml = useCallback(() => compileHtml(subject, headerImage, headline, body), [compileHtml, subject, headerImage, headline, body]);

  const applyTemplate = (template) => {
    setSubject(template.subject);
    setHeaderImage(template.headerImage);
    setHeadline(template.headline);
    setBody(template.body);
    setActiveTemplate(template.id);
    const isTemp = template.id === "tempEmail";
    if (isTemp) {
      setWidgets([
        { id: "meeting-cta", type: "meetingButton", content: { text: "🗓️ Book Meeting", link: "https://www.groworbitofficial.com/get-started/#lead-form" } },
        { id: "signature", type: "teamSignature", content: { line1: "Warm regards,", line2: "The Grow Orbit Team" } }
      ]);
    } else {
      setWidgets([]);
    }
    setPreviewHtml(compileHtml(template.subject, template.headerImage, template.headline, template.body));
  };

  const clearFields = () => {
    setSubject("");
    setHeaderImage("");
    setHeadline("");
    setBody("");
    setActiveTemplate("tempEmail");
    setWidgets([]);
    setPreviewHtml("");
  };

  // Debounce preview update when typing (400ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewHtml(compileHtml(subject, headerImage, headline, body));
    }, 400);
    return () => clearTimeout(timer);
  }, [subject, headerImage, headline, body, compileHtml]);

  const handlePasteBody = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        const prettyText = beautifyHtml(clipboardText);
        setBody(prettyText);
        
        const sandboxIdx = widgets.findIndex(w => w.type === "sandboxContent");
        if (sandboxIdx !== -1) {
          const newW = [...widgets];
          newW[sandboxIdx] = {
            ...newW[sandboxIdx],
            content: {
              ...newW[sandboxIdx].content,
              text: prettyText
            }
          };
          setWidgets(newW);
        }
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      alert("Please allow clipboard access to paste content.");
    }
  };



  const insertBodyTag = useCallback((before, after = "") => {
    const textarea = bodyTextareaRef.current || document.getElementById("newsletter-body-textarea");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = before + selected + after;
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setBody(newValue);
    
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }, [body]);

  const handleCopyRichEmail = async () => {
    if (!subject.trim() || !body.trim()) {
      alert("Please provide at least a subject and body to compile the template.");
      return;
    }
    try {
      const htmlContent = getCompiledHtml();
      const plainTextContent = body.replace(/<[^>]*>/g, ""); // Strip html tags for plain text fallback

      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([plainTextContent], { type: "text/plain" });
      const data = [
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText
        })
      ];
      await navigator.clipboard.write(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy HTML email to clipboard:", err);
      alert("Failed to copy rich email layout to clipboard. Please check browser compatibility.");
    }
  };

  const handleCopyHtmlSource = async () => {
    if (!subject.trim() || !body.trim()) return;
    try {
      const htmlContent = getCompiledHtml();
      await navigator.clipboard.writeText(htmlContent);
      setSourceCopied(true);
      setTimeout(() => setSourceCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy raw HTML:", err);
    }
  };

  const handleCopySubject = async () => {
    if (!subject.trim()) return;
    try {
      await navigator.clipboard.writeText(subject.trim());
      setSubjectCopied(true);
      setTimeout(() => setSubjectCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy subject:", err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = await auth.currentUser?.getIdToken();

      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setHeaderImage(data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: 28, paddingBottom: 60 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
          <Mail size={24} color="#f97316" /> Email Designer
        </h1>
        <p style={{ fontSize: 13, color: "#a3a3a3", marginTop: 8 }}>Design beautiful email templates, preview them live, and copy the HTML to send via Gmail.</p>
      </div>

      {/* Template Gallery */}
      <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "3px solid rgba(255, 255, 255, 0.08)", borderRadius: 20, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {(() => {
                const activeTpl = TEMPLATES.find(t => t.id === activeTemplate);
                const IconComponent = activeTpl?.icon || LayoutTemplate;
                return <IconComponent size={20} color="#f97316" />;
              })()}
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 800, color: "#f97316", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Active Template</p>
              <h2 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: "4px 0 0" }}>
                {TEMPLATES.find(t => t.id === activeTemplate)?.label || "Temp Email"}
              </h2>
              <p style={{ fontSize: 11, color: "#8e8e93", margin: "2px 0 0" }}>{TEMPLATES.find(t => t.id === activeTemplate)?.description}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {sandboxId && (
              <button
                onClick={loadSandboxDraft}
                type="button"
                style={{
                  background: "rgba(249, 115, 22, 0.1)",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                  borderRadius: 10,
                  padding: "10px 18px",
                  color: "#f97316",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249, 115, 22, 0.18)"; e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(249, 115, 22, 0.1)"; e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.3)"; }}
              >
                <Sparkles size={13} /> Load AI Draft
              </button>
            )}
            <button
              onClick={() => setShowTemplateModal(true)}
              type="button"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 10,
                padding: "10px 18px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              Change Template
            </button>
          </div>
        </div>

        {activeTemplate === "tempEmail" && (
          <div style={{ 
            borderTop: "2px dashed rgba(255, 255, 255, 0.1)", 
            paddingTop: 14, 
            display: "flex", 
            alignItems: "center", 
            flexWrap: "wrap", 
            gap: 12 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#f97316", letterSpacing: "0.15em", textTransform: "uppercase" }}>Email Widgets:</span>
              {widgets.length > 0 && (
                <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: "rgba(249,115,22,0.25)", padding: "2px 8px", borderRadius: 100, letterSpacing: "0.05em" }}>{widgets.length} active</span>
              )}
            </div>
            <span style={{ fontSize: 11, color: "#71717a" }}>Manage widgets below the body editor ↓</span>
          </div>
        )}
      </div>

      {/* Template Chooser Modal */}
      {showTemplateModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, width: "100%", maxWidth: "800px", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.6)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: 0 }}>Choose an Email Template</h3>
                <p style={{ fontSize: 11, color: "#8e8e93", margin: "4px 0 0" }}>Select a predesigned template or blank canvas to populate the editor.</p>
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                type="button"
                style={{ background: "rgba(255,255,255,0.04)", border: "none", color: "#8e8e93", padding: 8, borderRadius: 8, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: 24, overflowY: "auto", maxHeight: "70vh", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {TEMPLATES.map(t => {
                const isActive = activeTemplate === t.id;
                const IconComponent = t.icon || LayoutTemplate;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      applyTemplate(t);
                      setShowTemplateModal(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: 16,
                      borderRadius: 12,
                      background: isActive ? t.bg : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isActive ? t.border : "rgba(255,255,255,0.06)"}`,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = t.bg;
                        e.currentTarget.style.borderColor = t.border;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      }
                    }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: t.bg, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconComponent size={18} color={t.color} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>{t.label}</p>
                      <p style={{ fontSize: 10, color: "#8e8e93", margin: 0, marginTop: 2 }}>{t.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Widgets Chooser Modal */}
      {showWidgetsModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, width: "100%", maxWidth: "980px", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.6)", margin: "auto" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: 0 }}>Add / Manage Widgets</h3>
                <p style={{ fontSize: 11, color: "#8e8e93", margin: "4px 0 0" }}>Enable, disable, or add custom components to your Temp Email template.</p>
              </div>
              <button
                onClick={() => setShowWidgetsModal(false)}
                type="button"
                style={{ background: "rgba(255,255,255,0.04)", border: "none", color: "#8e8e93", padding: 8, borderRadius: 8, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, overflowY: "auto", maxHeight: "65vh" }}>
              
              {/* Widget: Book Meeting */}
              {(() => {
                const active = widgets.some(w => w.type === "meetingButton");
                return (
                  <div 
                    onClick={() => toggleWidgetType("meetingButton")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>🗓️</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Book Meeting Button CTA</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Direct Orange CTA button linking to groworbitofficial.com/get-started</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Widget: Onboarding Roadmap */}
              {(() => {
                const active = widgets.some(w => w.type === "roadmap");
                return (
                  <div 
                    onClick={() => toggleWidgetType("roadmap")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>⚡</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Onboarding Roadmap List</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Priority Gaps checklist layout for ASINs keyword & design optimization</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Widget: Team Grow Orbit Signature */}
              {(() => {
                const active = widgets.some(w => w.type === "teamSignature");
                return (
                  <div 
                    onClick={() => toggleWidgetType("teamSignature")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>✍️</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Team Grow Orbit Signature</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Standard closing sign-off line from the Grow Orbit Team</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Widget: Revenue Opportunity Card */}
              {(() => {
                const active = widgets.some(w => w.type === "revenueOpportunity");
                return (
                  <div 
                    onClick={() => toggleWidgetType("revenueOpportunity")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>📊</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Revenue Opportunity Card</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Visual highlight showing over $10.6M/mo category revenue targets</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Widget: Proposal PDF Button */}
              {(() => {
                const active = widgets.some(w => w.type === "proposal");
                return (
                  <div 
                    onClick={() => toggleWidgetType("proposal")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>📄</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Proposal PDF Button</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Link to a custom PDF/Blueprint on Google Drive/Dropbox</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Widget: Case Study Card */}
              {(() => {
                const active = widgets.some(w => w.type === "caseStudy");
                return (
                  <div 
                    onClick={() => toggleWidgetType("caseStudy")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>🏆</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Case Study Spotlight Card</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Showcase a key client metric, name, and their success statement</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Widget: Two-Column Stats */}
              {(() => {
                const active = widgets.some(w => w.type === "twoColumnStats");
                return (
                  <div 
                    onClick={() => toggleWidgetType("twoColumnStats")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>📊</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Two-Column Key Metrics</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Show side-by-side metric badges (e.g. RoAS, conversion rate gains)</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Widget: Video Tour Placeholder */}
              {(() => {
                const active = widgets.some(w => w.type === "videoPlaceholder");
                return (
                  <div 
                    onClick={() => toggleWidgetType("videoPlaceholder")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 18,
                      borderRadius: 12,
                      background: active ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
                      border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 10, 
                        background: active ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.03)", 
                        border: active ? "1px solid rgba(249,115,22,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: 20, 
                        flexShrink: 0 
                      }}>🎬</div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Video Walkthrough / Loom Tour</div>
                        <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Fidelity mock player card with custom play button pointing to video link</div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={active} 
                      readOnly
                      style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }}
                    />
                  </div>
                );
              })()}

              {/* Add Custom Text Widget */}
              <div 
                onClick={() => {
                  const id = `text-${Date.now()}`;
                  setWidgets([...widgets, { id, type: "text", content: { text: "Write custom HTML or paragraph copy here..." } }]);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 18,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  gridColumn: "1 / -1"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: 10, 
                    background: "rgba(255,255,255,0.03)", 
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: 20, 
                    flexShrink: 0 
                  }}>📝</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>+ Add Custom Text Widget</div>
                    <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>Insert custom HTML paragraphs, bullet points, or additional text. Supports multiple instances!</div>
                  </div>
                </div>
                <div style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>+ Add</div>
              </div>

            </div>

            <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowWidgetsModal(false)}
                type="button"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 24px",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Widget Modal */}
      {editingWidget && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, width: "100%", maxWidth: "550px", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.6)", margin: "auto" }}>
            
            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: 0 }}>
                  Configure Widget
                </h3>
                <p style={{ fontSize: 11, color: "#8e8e93", margin: "4px 0 0" }}>
                  Adjust text, links, and layout variables for this component.
                </p>
              </div>
              <button
                onClick={() => setEditingWidget(null)}
                type="button"
                style={{ background: "rgba(255,255,255,0.04)", border: "none", color: "#8e8e93", padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", maxHeight: "60vh" }}>
              {(() => {
                const index = widgets.findIndex(w => w.id === editingWidget.id);
                if (index === -1) return null;
                const w = widgets[index];

                return (
                  <>
                    {/* Title & Icon preview inside modal */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize: 20 }}>
                        {w.type === "meetingButton" && "🗓️"}
                        {w.type === "roadmap" && "⚡"}
                        {w.type === "teamSignature" && "✍️"}
                        {w.type === "revenueOpportunity" && "📊"}
                        {w.type === "proposal" && "📄"}
                        {w.type === "caseStudy" && "🏆"}
                        {w.type === "twoColumnStats" && "📊"}
                        {w.type === "videoPlaceholder" && "🎬"}
                        {w.type === "text" && "📝"}
                      </span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                          {w.type === "meetingButton" && "Book Meeting CTA"}
                          {w.type === "roadmap" && "Onboarding Roadmap"}
                          {w.type === "teamSignature" && "Team Signature"}
                          {w.type === "revenueOpportunity" && "Revenue Opportunity"}
                          {w.type === "proposal" && "Proposal PDF Button"}
                          {w.type === "caseStudy" && "Case Study Spotlight"}
                          {w.type === "twoColumnStats" && "Two-Column Metrics"}
                          {w.type === "videoPlaceholder" && "Video Walkthrough / Loom Tour"}
                          {w.type === "text" && "Custom Text Widget"}
                        </div>
                        <div style={{ fontSize: 10, color: "#71717a", marginTop: 1 }}>Position #{index + 1} in your email stack</div>
                      </div>
                    </div>

                    {/* Inputs */}
                    {w.type === "meetingButton" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Button Text:</label>
                          <input 
                            type="text" 
                            value={w.content?.text || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, text: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="🗓️ Book Meeting"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Link URL:</label>
                          <input 
                            type="text" 
                            value={w.content?.link || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, link: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="https://..."
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {w.type === "roadmap" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Roadmap Title:</label>
                          <input 
                            type="text" 
                            value={w.content?.title || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, title: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Roadmap Header Title"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        
                        {/* Step 1 */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                          <label style={{ fontSize: 11, color: "#f97316", fontWeight: 700 }}>Step 1 Configuration:</label>
                          <input 
                            type="text" 
                            value={w.content?.step1Title || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, step1Title: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Step 1 Title"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, marginBottom: 6, outline: "none" }}
                          />
                          <textarea 
                            rows={2}
                            value={w.content?.step1Desc || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, step1Desc: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Step 1 Description"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>

                        {/* Step 2 */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                          <label style={{ fontSize: 11, color: "#f97316", fontWeight: 700 }}>Step 2 Configuration:</label>
                          <input 
                            type="text" 
                            value={w.content?.step2Title || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, step2Title: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Step 2 Title"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, marginBottom: 6, outline: "none" }}
                          />
                          <textarea 
                            rows={2}
                            value={w.content?.step2Desc || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, step2Desc: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Step 2 Description"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>

                        {/* Step 3 */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                          <label style={{ fontSize: 11, color: "#f97316", fontWeight: 700 }}>Step 3 Configuration:</label>
                          <input 
                            type="text" 
                            value={w.content?.step3Title || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, step3Title: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Step 3 Title"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, marginBottom: 6, outline: "none" }}
                          />
                          <textarea 
                            rows={2}
                            value={w.content?.step3Desc || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, step3Desc: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Step 3 Description"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {w.type === "teamSignature" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Sign-off line:</label>
                          <input 
                            type="text" 
                            value={w.content?.line1 || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, line1: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Warm regards,"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Signature Name:</label>
                          <input 
                            type="text" 
                            value={w.content?.line2 || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, line2: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="The Grow Orbit Team"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {w.type === "revenueOpportunity" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Header Label:</label>
                          <input 
                            type="text" 
                            value={w.content?.label || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, label: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Category Revenue Opportunity"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Highlight Amount:</label>
                          <input 
                            type="text" 
                            value={w.content?.amount || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, amount: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Over $10.6M / Month"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Details:</label>
                          <input 
                            type="text" 
                            value={w.content?.details || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, details: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="$9.1M Scented Candles • $1.5M Incense Sticks"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {w.type === "proposal" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Button Label:</label>
                          <input 
                            type="text" 
                            value={w.content?.label || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, label: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Open Detailed Growth Blueprint (PDF)"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>PDF Document URL:</label>
                          <input 
                            type="text" 
                            value={w.content?.link || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, link: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="https://drive.google.com/..."
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {w.type === "caseStudy" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Client Name:</label>
                          <input 
                            type="text" 
                            value={w.content?.clientName || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, clientName: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Acme Corp"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Metric stat highlight:</label>
                          <input 
                            type="text" 
                            value={w.content?.stat || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, stat: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="+150% Sales"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Quote / Description:</label>
                          <textarea 
                            rows={3}
                            value={w.content?.description || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, description: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Revamped SEO and catalog metadata to scale organic search revenue..."
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, resize: "vertical", outline: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {w.type === "twoColumnStats" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Left Metric:</label>
                            <input 
                              type="text" 
                              value={w.content?.leftMetric || ""} 
                              onChange={(e) => {
                                const newW = [...widgets];
                                newW[index] = { ...newW[index], content: { ...newW[index].content, leftMetric: e.target.value } };
                                setWidgets(newW);
                              }}
                              placeholder="12.4%"
                              style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                            />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Left Label:</label>
                            <input 
                              type="text" 
                              value={w.content?.leftLabel || ""} 
                              onChange={(e) => {
                                const newW = [...widgets];
                                newW[index] = { ...newW[index], content: { ...newW[index].content, leftLabel: e.target.value } };
                                setWidgets(newW);
                              }}
                              placeholder="Market Share"
                              style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Right Metric:</label>
                            <input 
                              type="text" 
                              value={w.content?.rightMetric || ""} 
                              onChange={(e) => {
                                const newW = [...widgets];
                                newW[index] = { ...newW[index], content: { ...newW[index].content, rightMetric: e.target.value } };
                                setWidgets(newW);
                              }}
                              placeholder="4.8x"
                              style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                            />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Right Label:</label>
                            <input 
                              type="text" 
                              value={w.content?.rightLabel || ""} 
                              onChange={(e) => {
                                const newW = [...widgets];
                                newW[index] = { ...newW[index], content: { ...newW[index].content, rightLabel: e.target.value } };
                                setWidgets(newW);
                              }}
                              placeholder="Average RoAS"
                              style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {w.type === "videoPlaceholder" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Loom/Video URL:</label>
                          <input 
                            type="text" 
                            value={w.content?.videoUrl || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, videoUrl: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="https://www.loom.com/share/..."
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Player Caption Title:</label>
                          <input 
                            type="text" 
                            value={w.content?.title || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, title: e.target.value } };
                              setWidgets(newW);
                            }}
                            placeholder="Watch: Our Amazon Growth Strategy Walkthrough"
                            style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {(w.type === "text" || w.type === "sandboxContent") && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <label style={{ fontSize: 11, color: "#d4d4d4", fontWeight: 700 }}>Text / HTML Content:</label>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button type="button" onClick={() => applyFormatting('b', w.id, 'text')} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: "bold" }}>B</button>
                            <button type="button" onClick={() => applyFormatting('i', w.id, 'text')} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontStyle: "italic", fontFamily: "serif" }}>I</button>
                            <button type="button" onClick={() => applyFormatting('u', w.id, 'text')} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, textDecoration: "underline" }}>U</button>
                            <div style={{ width: 1, background: "rgba(255,255,255,0.1)", margin: "0 2px" }} />
                            <button type="button" onClick={() => applyFormatting('color', w.id, 'text', '#f97316')} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f97316", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: "bold" }}>A</button>
                            <button type="button" onClick={() => applyFormatting('color', w.id, 'text', '#38bdf8')} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#38bdf8", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: "bold" }}>A</button>
                            <button type="button" onClick={() => applyFormatting('color', w.id, 'text', '#4ade80')} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#4ade80", padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: "bold" }}>A</button>
                          </div>
                        </div>
                        <div style={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, overflow: "hidden" }}>
                          <CodeEditor 
                            id="widget-text-editor"
                            rows={6}
                            value={w.content?.text || ""} 
                            onChange={(e) => {
                              const newW = [...widgets];
                              newW[index] = { ...newW[index], content: { ...newW[index].content, text: e.target.value } };
                              setWidgets(newW);
                              if (w.type === "sandboxContent") {
                                setBody(e.target.value);
                              }
                            }}
                            placeholder="Write custom HTML or paragraph copy..."
                          />
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setEditingWidget(null)}
                type="button"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 24px",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                Done & Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Content: Builder + Preview */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.15fr", gap: 32, alignItems: "start" }}>
        
        {/* LEFT: Email Builder */}
        <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", borderRadius: 24, padding: isMobile ? 20 : 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <h2 style={{ fontSize: 11, fontWeight: 800, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
              <LayoutTemplate size={14} /> Customize
            </h2>
            <button 
              type="button"
              onClick={clearFields} 
              style={{ 
                padding: "6px 14px", borderRadius: 8, 
                background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", 
                color: "#f87171", fontSize: 10, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 5
              }} 
              onMouseEnter={e => e.currentTarget.style.background="rgba(239,68,68,0.12)"} 
              onMouseLeave={e => e.currentTarget.style.background="rgba(239,68,68,0.05)"}
            >
              <RotateCcw size={11} /> Clear Fields
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Email Subject</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={e => setSubject(e.target.value)} 
                  placeholder="e.g. Scale Your Brand with Grow Orbit"
                  style={{ 
                    flex: 1, 
                    padding: "12px 16px", 
                    borderRadius: 10, 
                    background: focusedField === "subject" ? "#0a0a0c" : "rgba(255,255,255,0.02)", 
                    border: `1px solid ${focusedField === "subject" ? "#f97316" : "rgba(255,255,255,0.08)"}`, 
                    boxShadow: focusedField === "subject" ? "0 0 0 3px rgba(249, 115, 22, 0.15)" : "none",
                    color: "#fff", 
                    fontSize: 14, 
                    outline: "none",
                    transition: "all 0.2s"
                  }}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  onClick={handleCopySubject}
                  disabled={!subject.trim()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "0 16px",
                    borderRadius: 10,
                    background: subjectCopied ? "rgba(74,222,128,0.1)" : !subject.trim() ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${subjectCopied ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`,
                    color: subjectCopied ? "#4ade80" : !subject.trim() ? "#525252" : "#d4d4d4",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: !subject.trim() ? "not-allowed" : "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <Copy size={13} />
                  {subjectCopied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <ImageIcon size={12} /> Header Logo / Image
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input 
                  type="text" 
                  value={headerImage} 
                  onChange={e => setHeaderImage(e.target.value)} 
                  placeholder="/logo.png or https://..."
                  style={{ 
                    flex: 1, 
                    padding: "12px 16px", 
                    borderRadius: 10, 
                    background: focusedField === "headerImage" ? "#0a0a0c" : "rgba(255,255,255,0.02)", 
                    border: `1px solid ${focusedField === "headerImage" ? "#f97316" : "rgba(255,255,255,0.08)"}`, 
                    boxShadow: focusedField === "headerImage" ? "0 0 0 3px rgba(249, 115, 22, 0.15)" : "none",
                    color: "#fff", 
                    fontSize: 14, 
                    outline: "none",
                    transition: "all 0.2s"
                  }}
                  onFocus={() => setFocusedField("headerImage")}
                  onBlur={() => setFocusedField(null)}
                />
                <label style={{ 
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "0 16px", 
                  borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", 
                  color: "#d4d4d4", fontSize: 12, fontWeight: 700, cursor: uploadingImage ? "not-allowed" : "pointer", transition: "all 0.2s" 
                }}>
                  <UploadCloud size={16} />
                  {uploadingImage ? "..." : "Upload"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={uploadingImage} />
                </label>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Headline Title</label>
              <input 
                type="text" 
                value={headline} 
                onChange={e => setHeadline(e.target.value)} 
                placeholder="Headline inside the email template"
                style={{ 
                  width: "100%", 
                  padding: "12px 16px", 
                  borderRadius: 10, 
                  background: focusedField === "headline" ? "#0a0a0c" : "rgba(255,255,255,0.02)", 
                  border: `1px solid ${focusedField === "headline" ? "#f97316" : "rgba(255,255,255,0.08)"}`, 
                  boxShadow: focusedField === "headline" ? "0 0 0 3px rgba(249, 115, 22, 0.15)" : "none",
                  color: "#fff", 
                  fontSize: 14, 
                  outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={() => setFocusedField("headline")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Body (HTML / Text)</label>
              
              <div style={{ 
                width: "100%",
                borderRadius: 10, 
                background: focusedField === "body" ? "#0a0a0c" : "rgba(255,255,255,0.02)", 
                border: `1px solid ${focusedField === "body" ? "#f97316" : "rgba(255,255,255,0.08)"}`, 
                boxShadow: focusedField === "body" ? "0 0 0 3px rgba(249, 115, 22, 0.15)" : "none",
                overflow: "hidden",
                transition: "all 0.2s"
              }}>
                {/* Integrated Editor Toolbar */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
                }}>
                  {/* HTML helper buttons */}
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {[
                      { label: "¶ P", action: () => insertBodyTag('<p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px;">', "</p>") },
                      { label: "B", action: () => insertBodyTag("<strong>", "</strong>"), bold: true },
                      { label: "I", action: () => insertBodyTag("<em>", "</em>"), italic: true },
                      { label: "H2", action: () => insertBodyTag('<h2 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 24px 0 12px;">', "</h2>") },
                      { label: "• List", action: () => insertBodyTag('<ul style="padding-left: 20px; margin-bottom: 20px;">\n  <li style="font-size: 14px; line-height: 1.8; color: #475569;">', "</li>\n</ul>") },
                      { label: "—", action: () => insertBodyTag('<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;">') },
                      { label: "↵", action: () => insertBodyTag("<br />") },
                      { label: "🔗", action: () => {
                        const url = prompt("Enter Link URL:", "https://");
                        if (url) insertBodyTag(`<a href="${url}" style="color: #f97316; font-weight: 700; text-decoration: underline;" target="_blank">`, "</a>");
                      }},
                      { label: "🖼️", action: () => {
                        const url = prompt("Enter Image URL:", "https://");
                        if (url) insertBodyTag(`<img src="${url}" alt="" style="width: 100%; max-width: 560px; height: auto; border-radius: 8px; display: block; margin: 16px 0;" />`);
                      }},
                    ].map((btn, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={btn.action}
                        style={{ 
                          background: "rgba(255,255,255,0.04)", 
                          border: "1px solid rgba(255,255,255,0.08)", 
                          borderRadius: 6, 
                          padding: "2px 7px", 
                          fontSize: 9, 
                          fontWeight: btn.bold ? 900 : 700, 
                          fontStyle: btn.italic ? "italic" : "normal",
                          color: "#fff", 
                          cursor: "pointer",
                          transition: "all 0.15s",
                          lineHeight: "18px",
                          minWidth: 24,
                          textAlign: "center"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.15)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Action button */}
                  {activeTemplate === "tempEmail" && (
                    <button
                      type="button"
                      onClick={handlePasteBody}
                      style={{ 
                        background: "rgba(249,115,22,0.1)", 
                        border: "1px solid rgba(249,115,22,0.3)", 
                        borderRadius: 6, 
                        padding: "3px 8px", 
                        fontSize: 9, 
                        fontWeight: 800, 
                        color: "#f97316", 
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(249,115,22,0.2)"}
                      onMouseLeave={e => e.currentTarget.style.background="rgba(249,115,22,0.1)"}
                    >
                      <Clipboard size={10} /> Paste HTML
                    </button>
                  )}
                </div>

                {/* Textarea inside the card */}
                <CodeEditor 
                  id="newsletter-body-textarea"
                  refTextarea={bodyTextareaRef}
                  value={body} 
                  onChange={e => handleBodyChange(e.target.value)} 
                  onFocus={() => setFocusedField("body")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Write body copy or HTML segments here..."
                  rows={12}
                />
              </div>
              {/* Character & Word Count */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 6 }}>
                <span style={{ fontSize: 10, color: "#525252", fontWeight: 600 }}>
                  {body.replace(/<[^>]*>/g, "").trim().length} chars
                </span>
                <span style={{ fontSize: 10, color: "#525252", fontWeight: 600 }}>
                  {body.replace(/<[^>]*>/g, "").trim() ? body.replace(/<[^>]*>/g, "").trim().split(/\s+/).length : 0} words
                </span>
              </div>
            </div>

            {/* Widget Stack — Visual sequence builder */}
            {activeTemplate === "tempEmail" && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 0, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#f97316", letterSpacing: "0.12em", textTransform: "uppercase" }}>Widget Stack</span>
                    {widgets.length > 0 && (
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: "rgba(249,115,22,0.25)", padding: "2px 8px", borderRadius: 100 }}>{widgets.length}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 9, color: "#525252" }}>Widgets render in this order ↓</span>
                </div>

                {/* Widget list */}
                {widgets.length === 0 ? (
                  <div style={{ padding: "24px 16px", textAlign: "center" }}>
                    <p style={{ fontSize: 11, color: "#71717a", fontStyle: "italic", margin: 0 }}>No widgets added yet. Click the button below to start building.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {widgets.map((w, index) => {
                      let icon = "⚙️";
                      let label = "";
                      let desc = "";
                      if (w.type === "meetingButton") { icon = "🗓️"; label = "Book Meeting CTA"; desc = "Orange CTA button → groworbitofficial.com"; }
                      else if (w.type === "roadmap") { icon = "⚡"; label = "Onboarding Roadmap"; desc = "Priority gaps checklist layout"; }
                      else if (w.type === "teamSignature") { icon = "✍️"; label = "Team Signature"; desc = "Warm regards sign-off"; }
                      else if (w.type === "revenueOpportunity") { icon = "📊"; label = "Revenue Opportunity"; desc = "$10.6M category revenue card"; }
                      else if (w.type === "proposal") { icon = "📄"; label = "Proposal PDF Button"; desc = "Dashed PDF link card"; }
                      else if (w.type === "caseStudy") { icon = "🏆"; label = "Case Study Card"; desc = "Client highlight stats & quote"; }
                      else if (w.type === "twoColumnStats") { icon = "📊"; label = "Two-Column Stats"; desc = "Side-by-side metric comparison"; }
                      else if (w.type === "videoPlaceholder") { icon = "🎬"; label = "Video Tour Placeholder"; desc = "Mock player linking to a video"; }
                      else if (w.type === "text") {
                        const textWidgets = widgets.filter(x => x.type === "text");
                        const textIdx = textWidgets.findIndex(x => x.id === w.id) + 1;
                        icon = "📝";
                        label = `Custom Text #${textIdx}`;
                        desc = "Custom HTML / paragraph";
                      }
                      else if (w.type === "sandboxContent") {
                        icon = "✨";
                        label = "AI Sandbox Draft";
                        desc = "AI-generated body content";
                      }

                      const isSandbox = w.type === "sandboxContent";

                      return (
                        <div 
                          key={w.id} 
                          draggable={true}
                          onDragStart={(e) => { 
                            dragItem.current = index; 
                            setDraggingIndex(index);
                          }}
                          onDragEnter={() => { dragOverItem.current = index; }}
                          onDragEnd={() => { handleSort(); setDraggingIndex(null); }}
                          onDragOver={(e) => e.preventDefault()}
                          style={{ 
                            borderBottom: "1px solid rgba(255,255,255,0.04)", 
                            padding: "12px 16px", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 10,
                            cursor: "grab",
                            opacity: draggingIndex === index ? 0.4 : 1,
                            background: isSandbox ? "rgba(34,197,94,0.03)" : (draggingIndex === index ? "rgba(255,255,255,0.05)" : "transparent"),
                            borderLeft: isSandbox ? "3px solid #22c55e" : "none",
                            transition: "all 0.2s ease"
                          }}
                        >
                          {/* Drag Handle Indicator */}
                          <div style={{ color: "#525252", display: "flex", flexDirection: "column", gap: 2, marginRight: 2 }}>
                            <div style={{ display: "flex", gap: 2 }}>
                              <div style={{ width: 3, height: 3, borderRadius: "50%", background: draggingIndex === index ? "#f97316" : "#525252" }} />
                              <div style={{ width: 3, height: 3, borderRadius: "50%", background: draggingIndex === index ? "#f97316" : "#525252" }} />
                            </div>
                            <div style={{ display: "flex", gap: 2 }}>
                              <div style={{ width: 3, height: 3, borderRadius: "50%", background: draggingIndex === index ? "#f97316" : "#525252" }} />
                              <div style={{ width: 3, height: 3, borderRadius: "50%", background: draggingIndex === index ? "#f97316" : "#525252" }} />
                            </div>
                            <div style={{ display: "flex", gap: 2 }}>
                              <div style={{ width: 3, height: 3, borderRadius: "50%", background: draggingIndex === index ? "#f97316" : "#525252" }} />
                              <div style={{ width: 3, height: 3, borderRadius: "50%", background: draggingIndex === index ? "#f97316" : "#525252" }} />
                            </div>
                          </div>

                          {/* Position # */}
                          <div style={{ 
                            width: 22, 
                            height: 22, 
                            borderRadius: 6, 
                            background: isSandbox ? "rgba(34,197,94,0.1)" : "rgba(249,115,22,0.1)", 
                            border: isSandbox ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(249,115,22,0.2)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            fontSize: 10, 
                            fontWeight: 800, 
                            color: isSandbox ? "#22c55e" : "#f97316", 
                            flexShrink: 0 
                          }}>{index + 1}</div>
                          
                          {/* Icon + labels */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#e5e5e5", display: "flex", alignItems: "center", gap: 6 }}>
                              <span>{icon}</span> {label}
                            </div>
                            <div style={{ fontSize: 9, color: "#71717a", marginTop: 1 }}>{desc}</div>
                          </div>

                          {/* Reorder up/down + edit + remove */}
                          <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
                            <button 
                              type="button" 
                              onClick={() => setEditingWidget(w)}
                              style={{ 
                                background: "rgba(249,115,22,0.08)", 
                                border: "1px solid rgba(249,115,22,0.25)", 
                                borderRadius: 5, 
                                padding: "4px 8px", 
                                color: "#f97316", 
                                cursor: "pointer", 
                                fontSize: 10, 
                                fontWeight: 800,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                marginRight: 4
                              }}
                            >
                              ⚙️ Edit
                            </button>
                            <button 
                              type="button" 
                              disabled={index === 0}
                              onClick={() => moveWidget(index, "left")} 
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 5, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", color: index === 0 ? "#333" : "#a3a3a3", cursor: index === 0 ? "default" : "pointer", fontSize: 10 }}
                            >▲</button>
                            <button 
                              type="button" 
                              disabled={index === widgets.length - 1}
                              onClick={() => moveWidget(index, "right")} 
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 5, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", color: index === widgets.length - 1 ? "#333" : "#a3a3a3", cursor: index === widgets.length - 1 ? "default" : "pointer", fontSize: 10 }}
                            >▼</button>
                            <button 
                              type="button" 
                              onClick={() => setWidgets(widgets.filter(x => x.id !== w.id))} 
                              style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 5, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", cursor: "pointer", fontSize: 10, marginLeft: 4 }}
                            >✕</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* + Add Widget Button */}
                <button
                  type="button"
                  onClick={() => setShowWidgetsModal(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "12px 16px",
                    background: "rgba(249,115,22,0.04)",
                    borderTop: "1px dashed rgba(249,115,22,0.2)",
                    border: "none",
                    borderTopStyle: "dashed",
                    borderTopWidth: 1,
                    borderTopColor: "rgba(249,115,22,0.2)",
                    color: "#f97316",
                    fontSize: 11,
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.04)"}
                >
                  + Add Widget
                </button>
              </div>
            )}


          </div>

          {/* Copy Buttons Row */}
          <div style={{ marginTop: 28, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12 }}>
            <button
              onClick={handleCopyRichEmail}
              type="button"
              disabled={!subject.trim() || !body.trim()}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 20px",
                borderRadius: 12,
                background: copied 
                  ? "rgba(74,222,128,0.15)" 
                  : (!subject.trim() || !body.trim()) 
                    ? "rgba(255,255,255,0.02)" 
                    : "linear-gradient(135deg, #f97316, #ea580c)",
                border: copied ? "1px solid rgba(74,222,128,0.3)" : "none",
                color: copied ? "#4ade80" : (!subject.trim() || !body.trim()) ? "#525252" : "#fff",
                fontSize: 12,
                fontWeight: 800,
                cursor: (!subject.trim() || !body.trim()) ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                boxShadow: (!subject.trim() || !body.trim()) ? "none" : "0 4px 12px rgba(249, 115, 22, 0.2)"
              }}
            >
              <Copy size={14} />
              {copied ? "Copied Rich!" : "Copy Rich (Gmail)"}
            </button>

            <button
              onClick={handleCopyHtmlSource}
              type="button"
              disabled={!subject.trim() || !body.trim()}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 20px",
                borderRadius: 12,
                background: sourceCopied 
                  ? "rgba(74,222,128,0.15)" 
                  : "transparent",
                border: sourceCopied ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                color: sourceCopied ? "#4ade80" : (!subject.trim() || !body.trim()) ? "#525252" : "#d4d4d4",
                fontSize: 12,
                fontWeight: 800,
                cursor: (!subject.trim() || !body.trim()) ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
              onMouseEnter={e => {
                if (subject.trim() && body.trim() && !sourceCopied) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.borderColor = "#f97316";
                  e.currentTarget.style.color = "#f97316";
                }
              }}
              onMouseLeave={e => {
                if (subject.trim() && body.trim() && !sourceCopied) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "#d4d4d4";
                }
              }}
            >
              <Mail size={14} />
              {sourceCopied ? "Copied Source!" : "Copy Raw HTML"}
            </button>
          </div>

          <p style={{ fontSize: 10, color: "#525252", marginTop: 14, textAlign: "center", lineHeight: 1.5 }}>
            Pasting copies fully-compiled inline CSS. To send: Open Gmail/Outlook Compose → Paste.
          </p>
        </div>

        {/* RIGHT: Live Preview */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: isMobile ? "static" : "sticky",
          top: isMobile ? "auto" : "8px",
          alignSelf: "start"
        }}>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", padding: "6px 14px", borderRadius: 100 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase" }}>Live Preview</span>
            </div>
            
            {/* Viewport Toggles */}
            <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.03)", padding: 3, borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
              <button
                onClick={() => setViewMode("desktop")}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 6,
                  background: viewMode === "desktop" ? "rgba(255,255,255,0.08)" : "transparent",
                  border: "none",
                  color: viewMode === "desktop" ? "#fff" : "#8e8e93",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <Monitor size={12} /> Desktop
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 6,
                  background: viewMode === "mobile" ? "rgba(255,255,255,0.08)" : "transparent",
                  border: "none",
                  color: viewMode === "mobile" ? "#fff" : "#8e8e93",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <Smartphone size={12} /> Mobile
              </button>
            </div>
          </div>

          {/* Email Viewport Wrapper */}
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}>
            <div style={{
              width: viewMode === "mobile" ? "375px" : "100%",
              maxWidth: "100%",
              background: "#121214",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: viewMode === "mobile" ? "16px 12px 24px" : "0",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
              position: "relative",
              boxSizing: "border-box"
            }}>
              {viewMode === "mobile" && (
                <div style={{
                  height: 4, width: 44, background: "rgba(255,255,255,0.15)", borderRadius: 100, margin: "0 auto 14px"
                }} />
              )}
              {subject.trim() || body.trim() || headline.trim() ? (
                <iframe
                  srcDoc={previewHtml}
                  style={{
                    width: "100%",
                    height: "calc(100vh - 170px)",
                    border: "none",
                    borderRadius: 14,
                    background: "#f8fafc",
                    display: "block"
                  }}
                  title="Email Live Preview"
                />
              ) : (
                <div style={{
                  height: "calc(100vh - 170px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#08080a",
                  borderRadius: 14,
                  padding: 24,
                  textAlign: "center"
                }}>
                  <Eye size={28} color="#3a3a3c" style={{ marginBottom: 12 }} />
                  <p style={{ fontSize: 12, color: "#8e8e93", maxWidth: 220, margin: 0, lineHeight: 1.5 }}>
                    Select a template above or edit fields to render a high-fidelity preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
