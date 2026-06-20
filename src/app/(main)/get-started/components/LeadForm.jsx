"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { getSavedUtmData } from "@/utils/utmTracker";

export default function LeadForm({ theme = "light", compact = false }) {
  const isDark = theme === "dark";
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", service: "", pain: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const lastSubmitRef = useRef(0);
  const [utmData, setUtmData] = useState({});
  const [honeypot, setHoneypot] = useState(""); // Honeypot state

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
    if (error) setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (submitted || loading) return;

    // Rate limiting — 5s cooldown
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setError("Please wait a moment before resubmitting.");
      return;
    }
    lastSubmitRef.current = now;

    // Validation
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in your name and email address.");
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

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
          requestedService: form.service || "Not specified",
          notes: form.pain || "No message provided",
          source: "Landing Page Form",
          asinOrUrl: null,
          monthlyRevenue: null,
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
          content_name: form.service || "General Grow Orbit Form",
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
      <div className="flex flex-col items-center justify-center py-12 gap-4 animate-fade-in">
        <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
          isDark
            ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
            : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
        }`}>
          <CheckCircle2 size={32} className="stroke-[2]" />
        </div>
        <div className="text-center">
          <p className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>Details Received!</p>
          <p className={`text-sm font-light mt-1 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Taking you to schedule your meeting...</p>
        </div>
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mt-2" />
        <style>{`
          @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-fade-in { animation: fade-in 0.4s ease both; }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-2.5" : "space-y-4"} noValidate>
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
        <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 ${
          isDark
            ? "bg-red-500/10 border-red-500/20 text-red-400"
            : "bg-red-50 border-red-200 text-red-600"
        }`}>
          <AlertCircle size={14} className="shrink-0" />
          <p className="text-[12px] font-medium">{error}</p>
        </div>
      )}

      {[
        { label: "Full Name *",       name: "name",     type: "text",  placeholder: "Your name",         required: true },
        { label: "Email Address *",   name: "email",    type: "email", placeholder: "you@brand.com",     required: true },
        { label: "WhatsApp (Optional)", name: "whatsapp", type: "tel",   placeholder: "+1 (555) 000-0000", required: false },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={`lead-${f.name}`} className={`block text-[9px] font-bold uppercase tracking-[0.2em] mb-1 pl-1 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}>{f.label}</label>
          <input
            id={`lead-${f.name}`}
            type={f.type}
            name={f.name}
            required={f.required}
            value={form[f.name]}
            onChange={handleChange}
            placeholder={f.placeholder}
            className={`w-full border text-base md:text-[13px] transition-all font-light focus:outline-none focus:border-orange-500 ${
              compact ? "px-4 py-2.5 rounded-xl" : "px-5 py-3.5 rounded-2xl"
            } ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08]"
                : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:bg-white"
            }`}
          />
        </div>
      ))}

      <div>
        <label htmlFor="lead-service" className={`block text-[9px] font-bold uppercase tracking-[0.2em] mb-1 pl-1 ${
          isDark ? "text-zinc-400" : "text-zinc-500"
        }`}>Service You're Interested In</label>
        <div className="relative">
          <select
            id="lead-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`w-full border text-base md:text-[13px] transition-all appearance-none cursor-pointer font-light focus:outline-none focus:border-orange-500 ${
              compact ? "px-4 py-2.5 rounded-xl" : "px-5 py-3.5 rounded-2xl"
            } ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white focus:bg-zinc-950"
                : "bg-zinc-50 border-zinc-200 text-zinc-900 focus:bg-white"
            }`}
          >
            <option value="" disabled className={isDark ? "bg-zinc-950 text-white" : ""}>Select a service...</option>
            <option value="Product Hunting & Research" className={isDark ? "bg-zinc-950 text-white" : ""}>Product Hunting & Research</option>
            <option value="Product Sourcing & Setup" className={isDark ? "bg-zinc-950 text-white" : ""}>Product Sourcing & Setup</option>
            <option value="Brand Launch (Full)" className={isDark ? "bg-zinc-950 text-white" : ""}>Brand Launch (Full)</option>
            <option value="Listing Optimization" className={isDark ? "bg-zinc-950 text-white" : ""}>Listing Optimization</option>
            <option value="PPC / Ads Management" className={isDark ? "bg-zinc-950 text-white" : ""}>PPC / Ads Management</option>
            <option value="A+ Content & Creative" className={isDark ? "bg-zinc-950 text-white" : ""}>A+ Content & Creative</option>
            <option value="Full Account Management" className={isDark ? "bg-zinc-950 text-white" : ""}>Full Account Management</option>
            <option value="I'm Not Sure Yet" className={isDark ? "bg-zinc-950 text-white" : ""}>I'm Not Sure Yet — Help Me Decide</option>
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-sm">↓</span>
        </div>
      </div>

      <div>
        <label htmlFor="lead-pain" className={`block text-[9px] font-bold uppercase tracking-[0.2em] mb-1 pl-1 ${
          isDark ? "text-zinc-400" : "text-zinc-500"
        }`}>Anything else? (optional)</label>
        <textarea
          id="lead-pain"
          rows={compact ? 3 : 4}
          name="pain"
          value={form.pain}
          onChange={handleChange}
          placeholder="Tell us about your product, current stage, or what you need help with..."
          className={`w-full border text-base md:text-[13px] transition-all resize-none font-light focus:outline-none focus:border-orange-500 ${
            compact ? "px-4 py-2.5 rounded-xl" : "px-5 py-3.5 rounded-2xl"
          } ${
            isDark
              ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08]"
              : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:bg-white"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={loading || submitted}
        className={`w-full font-black text-[11px] uppercase tracking-[0.2em] text-white bg-orange-500 transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 group ${
          compact ? "py-3 rounded-xl" : "py-4 rounded-2xl"
        } ${
          isDark ? "hover:bg-white hover:text-black" : "hover:bg-zinc-900"
        }`}
      >
        {loading ? "Sending..." : (
          <>
            Book My Free Meeting
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {!compact && (
        <div className={`border rounded-2xl p-4 mt-4 ${
          isDark ? "bg-white/[0.02] border-white/[0.05]" : "bg-zinc-50 border-zinc-100"
        }`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>What happens next:</p>
          <ul className="space-y-1.5">
            <li className={`flex items-center gap-2 text-[12px] font-light ${isDark ? "text-zinc-400" : "text-zinc-500"}`}><span className="w-4 h-4 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-[9px]">1</span> We understand your goals & stage</li>
            <li className={`flex items-center gap-2 text-[12px] font-light ${isDark ? "text-zinc-400" : "text-zinc-500"}`}><span className="w-4 h-4 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-[9px]">2</span> You get a free 15-min strategy call</li>
            <li className={`flex items-center gap-2 text-[12px] font-light ${isDark ? "text-zinc-400" : "text-zinc-500"}`}><span className="w-4 h-4 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-[9px]">3</span> We map out a custom growth roadmap</li>
          </ul>
        </div>
      )}
    </form>
  );
}
