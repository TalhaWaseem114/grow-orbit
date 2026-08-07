"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight, Clock, Mail, MessageCircle,
  CheckCircle2, Search, BarChart3, Zap,
  Users, Shield, Activity, MapPin, ExternalLink
} from "lucide-react";
import { getSavedUtmData } from "@/utils/utmTracker";

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
const SL = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-6 h-[2px] bg-orange-500" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500/80">
      {children}
    </span>
  </div>
);

/* ─────────────────────────────────────────────
   PROCESS STEPS
───────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    icon: <Search size={18} />,
    title: "Free Account Audit",
    desc: "We review your listings and PPC structure before the call. You'll see your biggest opportunities before we even speak.",
    time: "Before the call",
  },
  {
    num: "02",
    icon: <BarChart3 size={18} />,
    title: "Strategic Alignment",
    desc: "A focused 15-minute session on your revenue goals and the specific bottlenecks holding them back.",
    time: "Day 1",
  },
  {
    num: "03",
    icon: <Zap size={18} />,
    title: "Execution Roadmap",
    desc: "You receive a prioritised action plan with timelines, deliverables, and a clear pricing proposal. No pressure.",
    time: "Within 48h",
  },
];

/* ─────────────────────────────────────────────
   TRUST ITEMS
───────────────────────────────────────────── */
const trust = [
  { icon: <Users size={18} />,    stat: "80+",   label: "Brands Scaled"      },
  { icon: <Activity size={18} />, stat: "+38%",  label: "Avg Revenue Lift"  },
  { icon: <Shield size={18} />,   stat: "84%",   label: "Page 1 in 60 Days" },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ContactUs() {
  const router = useRouter();
  const [form, setForm]       = useState({ name:"", email:"", whatsapp:"", service:"", message:"" });
  const [loading, setLoading] = useState(false);
  const [utmData, setUtmData] = useState({});
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    // Capture UTM parameters on mount
    const data = getSavedUtmData();
    if (!data.utm_source) {
      data.utm_source = "direct";
    }
    setUtmData(data);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref === "sourcing-pro") {
        setForm(prev => ({
          ...prev,
          service: "Product Sourcing & Setup",
          message: "Hi, I am interested in upgrading to Sourcing Pro / requesting advanced sourcing setup."
        }));
      } else if (ref === "request-access") {
        const toolName = params.get("tool") || "Upcoming Tool";
        setForm(prev => ({
          ...prev,
          message: `Hi, I would like to request early beta access or be notified when the "${toolName}" is released.`
        }));
      }
    }
  }, []);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          whatsapp: form.whatsapp || "N/A",
          requestedService: form.service || "Not specified",
          notes: form.message || "No message provided",
          source: "Contact Page Form",
          website_confirm: honeypot,
          ...utmData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      const resData = await response.json();

      // Track Meta Pixel Lead event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: form.service || "Contact Page Form",
          status: "new"
        });
      }

      // Track TikTok Pixel Lead event
      if (typeof window !== "undefined" && window.ttq) {
        window.ttq.track("SubmitForm", {
          contents: [{ content_id: form.service || "Contact Lead", content_name: "Contact Page Form" }]
        });
        window.ttq.track("CompleteRegistration");
      }

      const nameParam = encodeURIComponent(form.name);
      const emailParam = encodeURIComponent(form.email);
      router.push(`/get-started/book-meeting?leadId=${resData.id}&name=${nameParam}&email=${emailParam}`);
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/[0.05] rounded-full blur-[160px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-[70px] sm:pt-[110px] pb-20 relative z-10">

        {/* ══════════════════════════════════
            MAIN SPLIT
        ══════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT ── */}
          <div className="space-y-14 pt-2">

            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                  Accepting New Partners
                </span>
              </div>

              <h1
                className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tighter mb-6 leading-[0.95] md:leading-[0.88] text-zinc-950 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Scale Your<br />
                <span
                  className="italic font-light text-zinc-300 normal-case tracking-normal"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Amazon trajectory.
                </span>
              </h1>

              <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-md">
                We build data-backed growth systems for Amazon brands — ads, SEO, creative, and operations under one strategy. Tell us where you are and we'll map where you're going.
              </p>
            </div>

            {/* Quick contact */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-zinc-100 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Response Time</p>
                  <p className="text-sm font-light text-zinc-400 mt-0.5">Under 2 hours</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-zinc-200" />
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Email</p>
                  <a href="mailto:support@groworbitofficial.com"
                     className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                    support@groworbitofficial.com
                  </a>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-zinc-200" />
              <div className="flex items-center gap-4">
                <a href="https://wa.me/19128205916" target="_blank" rel="noreferrer"
                   onClick={() => { if (typeof window !== "undefined" && window.fbq) { window.fbq("track", "Contact", { content_name: "WhatsApp — Contact Sidebar Icon" }); } }}
                   className="w-11 h-11 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                  <MessageCircle size={16} className="text-white" />
                </a>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">WhatsApp</p>
                  <a href="https://wa.me/19128205916" target="_blank" rel="noreferrer"
                     onClick={() => { if (typeof window !== "undefined" && window.fbq) { window.fbq("track", "Contact", { content_name: "WhatsApp — Contact Sidebar" }); } }}
                     className="text-sm font-medium text-[#25D366] hover:text-[#1da851] transition-colors">
                    912-820-5916
                  </a>
                </div>
              </div>
            </div>

            {/* Onboarding process */}
            <div>
              <SL>The Onboarding Sprint</SL>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-tight text-zinc-950 mb-10"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                From first message to<br />
                <span className="italic font-light text-zinc-300 lowercase tracking-normal"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                  execution in 48 hours.
                </span>
              </h2>

              <div className="relative pl-8 pb-4 space-y-12 ml-4 mt-12">
                {/* Gradient Line */}
                <div className="absolute left-[0px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-orange-500 via-orange-200 to-transparent" />

                {steps.map((s, i) => (
                  <div key={i} className="relative group">
                    {/* Marker */}
                    <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 shadow-sm transition-all duration-500
                      ${i === steps.length - 1
                        ? "bg-zinc-950 border-zinc-950"
                        : "bg-white border-orange-500 group-hover:scale-110 group-hover:shadow-orange-500/20"
                      }`}
                    />

                     {/* Content */}
                    <div className="flex flex-col gap-1.5 translate-y-[-2px]">
                      <h4 className="font-black text-base sm:text-lg uppercase tracking-tight text-zinc-950 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <span className="flex items-center gap-2">
                          {i + 1}. {s.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-normal">
                          {s.time}
                        </span>
                      </h4>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-sm">
                        {s.desc}
                      </p>
                    </div>

                    {/* Orbit graphic for the final step */}
                    {i === steps.length - 1 && (
                      <div className="absolute -bottom-8 left-10 w-24 h-12 opacity-40 pointer-events-none">
                         <div className="absolute top-1/2 left-0 w-3 h-3 rounded-full bg-orange-500" />
                         <div className="absolute top-0 left-6 w-2 h-2 rounded-full bg-orange-400" />
                         <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border border-orange-200" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-10">
            <div className="bg-white rounded-[32px] sm:rounded-[40px] pt-16 pb-8 sm:py-11 px-6 sm:px-8 md:px-11 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] border border-zinc-100 relative overflow-hidden">
              {/* Confidential Badge */}
              <div className="absolute top-6 right-6 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Shield size={12} className="text-emerald-500" strokeWidth={3} />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Confidential</span>
              </div>

              {/* Top accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

              <h2
                className="text-2xl font-black tracking-tight mb-1 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Submit Your Brief
              </h2>
              <p className="text-sm text-zinc-400 font-light mb-8">
                We review your account before the call — so no time is wasted.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="website_confirm"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text" name="name" value={form.name}
                      onChange={handleChange} placeholder="John Doe"
                      className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-base md:text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-light focus-visible:ring-2 focus-visible:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="name@brand.com"
                      className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-base md:text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-light focus-visible:ring-2 focus-visible:ring-orange-500"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-whatsapp" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    id="contact-whatsapp"
                    type="tel" name="whatsapp" value={form.whatsapp}
                    onChange={handleChange} placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-base md:text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-light focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Service */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-service" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                    Primary Grow Need
                  </label>
                  <div className="relative">
                    <select
                      id="contact-service"
                      name="service" value={form.service} onChange={handleChange}
                      className={`w-full px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-base md:text-[14px] focus:outline-none focus:border-orange-500 focus:bg-white transition-all appearance-none cursor-pointer font-light focus-visible:ring-2 focus-visible:ring-orange-500 ${!form.service ? "text-zinc-400" : "text-zinc-900"}`}
                    >
                      <option value="">Select a service...</option>
                      <option value="Product Hunting & Research">Product Hunting & Research</option>
                      <option value="Product Sourcing & Setup">Product Sourcing & Setup</option>
                      <option value="Brand Launch (Full)">Brand Launch (Full)</option>
                      <option value="Listing Optimization">Listing Optimization & SEO</option>
                      <option value="PPC / Ads Management">PPC / Ads Management</option>
                      <option value="A+ Content & Creative">A+ Content & Creative</option>
                      <option value="Full Account Management">Full Account Management</option>
                      <option value="Trademark & Brand Registry">Trademark & Brand Registry</option>
                      <option value="Not Sure / Need Advice">Not Sure Yet — Help Me Decide</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" aria-hidden="true">↓</span>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                    Anything else?
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3} name="message" value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your product, current stage, or what you need help with..."
                    className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-base md:text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none font-light focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={loading}
                  className="group w-full py-5 rounded-2xl bg-zinc-900 hover:bg-orange-500 text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? "Sending..." : (
                    <>
                      Book Strategy Call
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/19128205916"
                  target="_blank" rel="noreferrer"
                  onClick={() => { if (typeof window !== "undefined" && window.fbq) { window.fbq("track", "Contact", { content_name: "WhatsApp — Contact Page" }); } }}
                  className="group/wa w-full py-5 rounded-2xl border border-zinc-200 hover:border-[#25D366] hover:bg-[#25D366]/5 text-zinc-900 font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)]"
                >
                  <div className="relative">
                    <MessageCircle size={15} className="text-[#25D366]" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#25D366] group-hover/wa:animate-ping" />
                  </div>
                  Chat on WhatsApp
                </a>

                {/* Micro trust */}
                <p className="text-center text-[10px] text-zinc-400 font-light pt-1">
                  No commitment. No sales pitch. NDA available on request.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            TRUST STRIP (replaces map)
        ══════════════════════════════════ */}
        <div className="mt-20 bg-zinc-950 rounded-[32px] p-8 md:p-12 relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.08),transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
               style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"22px 22px" }}/>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">

            {/* Left: headline */}
            <div>
              <SL>Why Orbit</SL>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight text-white mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Results that speak<br />
                <span className="italic font-light text-zinc-600 lowercase tracking-normal"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                  for themselves.
                </span>
              </h3>
            </div>

            {/* Right: stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 shrink-0 w-full md:w-auto">
              {trust.map((t, i) => (
                <div key={i} className="group flex flex-row md:flex-col items-center gap-4 md:gap-0 text-left md:text-center">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shrink-0 md:mx-auto md:mb-3">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-none" style={{ fontFamily:"'Montserrat',sans-serif" }}>
                      {t.stat}
                    </p>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{t.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: checklist */}
            <div className="space-y-3 shrink-0">
              {[
                "Free account audit included",
                "Dedicated strategist assigned",
                "Response within 2 hours",
                "Month-to-month, no lock-in",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-orange-500 shrink-0" strokeWidth={3} />
                  <span className="text-zinc-400 text-[13px] font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            MAP SECTION
        ══════════════════════════════════ */}
        <div className="mt-12 sm:mt-20 bg-white rounded-[32px] sm:rounded-[40px] p-5 sm:p-10 border border-zinc-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">

          {/* Left: Address Info (Slimmer) */}
          <div className="md:w-[240px] space-y-5 text-left">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center shadow-xs">
              <MapPin size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tight mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Agency HQ
              </h3>
              <p className="text-zinc-500 font-light leading-relaxed text-[13px]">
                2583 Lundigan Dr<br />
                Mississauga, ON L5J 3W2, Canada
              </p>
            </div>
          </div>

          {/* Right: Map Container (Dominant) */}
          <div className="flex-1 w-full h-[520px] md:h-[380px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-zinc-100 relative group bg-zinc-50">
            {/* Open in Maps Button */}
            <a
              href="https://maps.google.com/?q=2583+Lundigan+Dr+Mississauga+ON+L5J+3W2+Canada"
              target="_blank"
              rel="noreferrer"
              className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-md border border-zinc-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-900 shadow-xl hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 flex items-center gap-2"
            >
              Open in Maps
              <ExternalLink size={12} />
            </a>

            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.5!2d-79.6297!3d43.4668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b41!2s2583+Lundigan+Dr%2C+Mississauga%2C+ON+L5J+3W2%2C+Canada!5e0!3m2!1sen!2sca!4v1713632800000!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.1) contrast(1.05)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[32px]"
            />
          </div>
        </div>

      </div>
    </main>
  );
}