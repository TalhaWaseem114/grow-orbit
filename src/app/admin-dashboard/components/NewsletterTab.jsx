"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Mail, Image as ImageIcon, LayoutTemplate, UploadCloud, RotateCcw, Copy, Eye, Palette, ShoppingCart, BarChart3, Sparkles, Smartphone, Monitor } from "lucide-react";

// ─── Template Data ────────────────────────────────────────────
const TEMPLATES = [
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
<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: left; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);">
  <div style="font-size: 11px; font-weight: 700; color: #10b981; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">🚀 Onboarding Roadmap</div>
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 1.6; color: #475569;">
    <tr>
      <td width="28" valign="top" style="padding-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="width: 20px; height: 20px; border-radius: 10px; background: #d1fae5; color: #065f46; font-size: 11px; font-weight: 700; line-height: 20px; text-align: center;">1</div>
      </td>
      <td valign="top" style="padding-bottom: 12px; padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong>Market Audit:</strong> We analyze competitor pricing, conversion gaps, and keyword opportunities.
      </td>
    </tr>
    <tr>
      <td width="28" valign="top" style="padding-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="width: 20px; height: 20px; border-radius: 10px; background: #d1fae5; color: #065f46; font-size: 11px; font-weight: 700; line-height: 20px; text-align: center;">2</div>
      </td>
      <td valign="top" style="padding-bottom: 12px; padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong>Strategy Call:</strong> We meet to discuss findings and outline a target growth roadmap.
      </td>
    </tr>
    <tr>
      <td width="28" valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="width: 20px; height: 20px; border-radius: 10px; background: #d1fae5; color: #065f46; font-size: 11px; font-weight: 700; line-height: 20px; text-align: center;">3</div>
      </td>
      <td valign="top" style="padding-left: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong>Execution Plan:</strong> Our team deploys listing optimization, new graphics, and PPC campaigns.
      </td>
    </tr>
  </table>
</div>

<p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 8px;">Have immediate questions? Just hit reply to this email.</p>`,
  }
];

export default function NewsletterTab({ isMobile }) {
  const [subject, setSubject] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);
  const [sourceCopied, setSourceCopied] = useState(false);
  const [subjectCopied, setSubjectCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // "desktop" | "mobile"
  const [focusedField, setFocusedField] = useState(null); // "subject" | "headerImage" | "headline" | "body"
  const [previewHtml, setPreviewHtml] = useState("");
  const bodyTextareaRef = useRef(null);

  const compileHtml = useCallback((subj, headerImg, headText, bodyText) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
    const bodyHasHtml = bodyText.includes("<img") || bodyText.includes("<div") || bodyText.includes("<table") || bodyText.includes("<p");
    const formattedBody = bodyHasHtml ? bodyText : bodyText.replace(/\n/g, "<br />");
    let logoUrl = "/logo.png";
    if (headerImg) {
      logoUrl = headerImg.trim();
    }
    const absoluteLogoUrl = logoUrl.startsWith("http")
      ? logoUrl
      : `${siteUrl}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;

    const rawHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #333333;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .email-body {
        padding: 24px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc;">
  <div style="width: 100%; background-color: #f8fafc; padding: 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
      <!-- Header -->
      <div style="background-color: #0A0A0B; padding: 24px 20px; text-align: center; border-bottom: 2px solid #f97316;">
        ${absoluteLogoUrl ? `<img src="${absoluteLogoUrl}" alt="Grow Orbit" style="max-height: 40px; max-width: 80%; object-fit: contain; display: inline-block;">` : `<h2 style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em; text-transform: uppercase; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">GROW <span style="color:#f97316">ORBIT</span></h2>`}
      </div>
      <!-- Body -->
      <div class="email-body" style="padding: 36px 32px; background-color: #ffffff; text-align: left;">
        ${headText ? `<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin-top: 0; margin-bottom: 20px; line-height: 1.3; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${headText}</h1>` : ""}
        <div style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${formattedBody}</div>
        
        <!-- CTA -->
        <div style="text-align: center; margin: 32px 0 12px;">
          <a href="${siteUrl}/get-started/book-meeting" style="background-color: #f97316; color: #ffffff !important; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25); text-transform: uppercase; letter-spacing: 0.05em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;" target="_blank">Book a Strategy Call</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 36px 0 24px 0;">
        
        <!-- Footer -->
        <div style="text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <p style="font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0; margin-bottom: 4px;">Grow Orbit Agency</p>
          <p style="margin: 0; color: #94A3B8;">Premium growth strategies, graphic designs, and PPC consulting.</p>
          <p style="margin: 4px 0 0; color: #94A3B8;">123 Commerce St, Suite 100, New York, NY</p>
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
  }, []);

  const getCompiledHtml = useCallback(() => compileHtml(subject, headerImage, headline, body), [compileHtml, subject, headerImage, headline, body]);

  const applyTemplate = (template) => {
    setSubject(template.subject);
    setHeaderImage(template.headerImage);
    setHeadline(template.headline);
    setBody(template.body);
    setActiveTemplate(template.id);
    setPreviewHtml(compileHtml(template.subject, template.headerImage, template.headline, template.body));
  };

  const clearFields = () => {
    setSubject("");
    setHeaderImage("");
    setHeadline("");
    setBody("");
    setActiveTemplate(null);
    setPreviewHtml("");
  };

  // Debounce preview update when typing (400ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewHtml(compileHtml(subject, headerImage, headline, body));
    }, 400);
    return () => clearTimeout(timer);
  }, [subject, headerImage, headline, body, compileHtml]);

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

      const res = await fetch("/api/upload-image", {
        method: "POST",
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
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Choose a Template</p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 16 }}>
          {TEMPLATES.map(t => {
            const isActive = activeTemplate === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => applyTemplate(t)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "20px",
                  borderRadius: 16,
                  background: isActive ? t.bg : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? t.border : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 8px 30px -5px ${t.color}25` : "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textAlign: "left",
                  transform: isActive ? "translateY(-2px)" : "none"
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = t.bg;
                    e.currentTarget.style.borderColor = t.border;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "none";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: t.bg, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={t.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 800, color: isActive ? "#fff" : "#e5e5e5", margin: 0 }}>{t.label}</p>
                    <p style={{ fontSize: 10, color: "#8e8e93", margin: 0, marginTop: 2 }}>{t.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Builder + Preview */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr", gap: 32, alignItems: "start" }}>
        
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Body (HTML / Text)</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => insertBodyTag("<p>", "</p>")}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#fff", cursor: "pointer" }}
                  >
                    Paragraph
                  </button>
                  <button
                    type="button"
                    onClick={() => insertBodyTag("<strong>", "</strong>")}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#fff", cursor: "pointer" }}
                  >
                    Bold
                  </button>
                  <button
                    type="button"
                    onClick={() => insertBodyTag("<br />")}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#fff", cursor: "pointer" }}
                  >
                    Break
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Enter Link URL:", "https://");
                      if (url) {
                        insertBodyTag(`<a href="${url}" style="color: #f97316; font-weight: 700; text-decoration: underline;" target="_blank">`, "</a>");
                      }
                    }}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#fff", cursor: "pointer" }}
                  >
                    Link
                  </button>
                </div>
              </div>
              <textarea 
                id="newsletter-body-textarea"
                ref={bodyTextareaRef}
                value={body} 
                onChange={e => setBody(e.target.value)} 
                placeholder="Write body copy or HTML segments here..." 
                rows={12}
                style={{ 
                  width: "100%", 
                  padding: "16px", 
                  borderRadius: 10, 
                  background: focusedField === "body" ? "#0a0a0c" : "rgba(255,255,255,0.02)", 
                  border: `1px solid ${focusedField === "body" ? "#f97316" : "rgba(255,255,255,0.08)"}`, 
                  boxShadow: focusedField === "body" ? "0 0 0 3px rgba(249, 115, 22, 0.15)" : "none",
                  color: "#fff", 
                  fontSize: 13, 
                  outline: "none", 
                  resize: "vertical", 
                  fontFamily: "inherit", 
                  lineHeight: 1.6,
                  transition: "all 0.2s"
                }}
                onFocus={() => setFocusedField("body")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
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
                    height: "550px",
                    border: "none",
                    borderRadius: 14,
                    background: "#f8fafc",
                    display: "block"
                  }}
                  title="Email Live Preview"
                />
              ) : (
                <div style={{
                  height: "350px",
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
