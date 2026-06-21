"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, AlertCircle, CheckCircle2 } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { getSavedUtmData } from "@/utils/utmTracker";

export default function DesignLeadForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    asin: "",
    revenue: "",
    pain: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const lastSubmitRef = useRef(0);
  const [utmData, setUtmData] = useState({});
  const [honeypot, setHoneypot] = useState("");

  // Capture UTM parameters on mount
  useEffect(() => {
    const data = getSavedUtmData();
    if (!data.utm_source) {
      data.utm_source = "direct";
    }
    setUtmData(data);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (submitted || loading) return;

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.asin.trim()) {
      setError("Please fill in all required fields (Name, Email, and Amazon URL/ASIN).");
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Rate limiting — 5s cooldown
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setError("Please wait a moment before resubmitting.");
      return;
    }
    lastSubmitRef.current = now;

    setError("");
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
          asinOrUrl: form.asin,
          monthlyRevenue: form.revenue || "N/A",
          requestedService: "Visual Design & Creative",
          notes: form.pain || "Requesting Free Visual Redesign Audit",
          source: "Design & Creative Landing Page",
          brandName: null,
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
          content_name: "Visual Design & Creative Audit Request",
          status: "new"
        });
      }

      // Mark as submitted to prevent double-submit
      setSubmitted(true);

      // Show success animation before redirect
      setShowSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to the internal booking page with the Firestore document ID
      const nameParam = encodeURIComponent(form.name);
      const emailParam = encodeURIComponent(form.email);
      router.push(`/get-started/book-meeting?leadId=${resData.id}&name=${nameParam}&email=${emailParam}`);
    } catch (err) {
      console.error("Lead submission error:", err);
      setError("Submission failed. Please check your connection and try again.");
      setLoading(false); // Only reset loading on error
    }
  };

  // Success transition overlay
  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 animate-design-fade-in">
        <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500">
          <CheckCircle2 size={32} className="stroke-[2]" />
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-white tracking-tight">Audit Request Received!</p>
          <p className="text-sm text-zinc-400 font-light mt-1">Taking you to schedule your strategy call...</p>
        </div>
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mt-2" />
        <style>{`
          @keyframes design-fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-design-fade-in { animation: design-fade-in 0.4s ease both; }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

      {/* Inline error message */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400">
          <AlertCircle size={14} className="shrink-0" />
          <p className="text-[12px] font-medium">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="design-lead-name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 pl-1">
          Full Name *
        </label>
        <input
          id="design-lead-name"
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-base md:text-[14px] text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:bg-zinc-900 transition-all font-light"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="design-lead-email" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 pl-1">
            Email Address *
          </label>
          <input
            id="design-lead-email"
            type="email"
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@brand.com"
            className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-base md:text-[14px] text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:bg-zinc-900 transition-all font-light"
          />
        </div>

        <div>
          <label htmlFor="design-lead-whatsapp" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 pl-1">
            WhatsApp (Optional)
          </label>
          <input
            id="design-lead-whatsapp"
            type="tel"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-base md:text-[14px] text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:bg-zinc-900 transition-all font-light"
          />
        </div>
      </div>

      <div>
        <label htmlFor="design-lead-asin" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 pl-1">
          Amazon Listing URL or ASIN *
        </label>
        <input
          id="design-lead-asin"
          type="text"
          required
          name="asin"
          value={form.asin}
          onChange={handleChange}
          placeholder="e.g., B07XXXXXXX or listing link"
          className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-850 rounded-2xl text-base md:text-[14px] text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:bg-zinc-900 transition-all font-light border-dashed border-violet-500/35"
        />
        <p className="text-[10px] text-zinc-500 font-light mt-1 pl-1">Required to perform your custom visual audit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="design-lead-revenue" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 pl-1">
            Current Monthly Revenue
          </label>
          <div className="relative">
            <select
              id="design-lead-revenue"
              name="revenue"
              value={form.revenue}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-base md:text-[14px] text-white focus:outline-none focus:border-violet-500 focus:bg-zinc-900 transition-all appearance-none cursor-pointer font-light"
            >
              <option value="" disabled>Select range...</option>
              <option value="New Seller / Under $10k">Under $10k/mo</option>
              <option value="$10k - $50k">$10k - $50k/mo</option>
              <option value="$50k - $150k">$50k - $150k/mo</option>
              <option value="Over $150k">Over $150k/mo</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs">↓</span>
          </div>
        </div>

        <div>
          <label htmlFor="design-lead-pain" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 pl-1">
            Primary Visual Focus
          </label>
          <div className="relative">
            <select
              id="design-lead-pain"
              name="pain"
              value={form.pain}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-base md:text-[14px] text-white focus:outline-none focus:border-violet-500 focus:bg-zinc-900 transition-all appearance-none cursor-pointer font-light"
            >
              <option value="" disabled>Select main bottleneck...</option>
              <option value="Need 3D modeling / renders">Photorealistic 3D Renders</option>
              <option value="Need listing infographics">Listing Image Redesign</option>
              <option value="Need A+ Content & Brand Story">A+ Content & Brand Story</option>
              <option value="Need Storefront overhaul">Amazon Storefront Design</option>
              <option value="Full Creative overhaul">Complete Creative Redesign</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs">↓</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || submitted}
        className="w-full py-4 mt-2 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_8px_30px_rgba(139,92,246,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 group"
      >
        {loading ? "Analyzing..." : (
          <>
            Request My Free Design Audit
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>

      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 mt-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-2">What you receive in 48 hours:</p>
        <ul className="space-y-1.5 pl-0">
          <li className="flex items-start gap-2.5 text-[12px] text-zinc-400 font-light">
            <CheckCircle size={14} className="text-violet-500 mt-0.5 shrink-0" />
            <span><strong>3-Point Image Analysis:</strong> Assessment of your current listing's CTR strengths and visual conversion barriers.</span>
          </li>
          <li className="flex items-start gap-2.5 text-[12px] text-zinc-400 font-light">
            <CheckCircle size={14} className="text-violet-500 mt-0.5 shrink-0" />
            <span><strong>A+ Wireframe Blueprint:</strong> A custom structural layout concept optimized for cross-selling and mobile shopping.</span>
          </li>
          <li className="flex items-start gap-2.5 text-[12px] text-zinc-400 font-light">
            <CheckCircle size={14} className="text-violet-500 mt-0.5 shrink-0" />
            <span><strong>15-Min Strategy Consult:</strong> Walkthrough of our recommendations with one of our design directors.</span>
          </li>
        </ul>
      </div>
    </form>
  );
}
