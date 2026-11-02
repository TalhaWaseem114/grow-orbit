"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  LayoutGrid,
  ChevronDown,
  Phone,
  MessageSquare,
  Calendar,
  Zap,
  ShieldCheck,
  Lock,
} from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { getSavedUtmData } from "@/utils/utmTracker";
import { normalizeE164Phone } from "@/lib/phoneFormatter";

export default function LeadForm({ theme = "white", compact = false }) {
  const isDark = theme === "dark";
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", service: "", pain: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const lastSubmitRef = useRef(0);
  const [utmData, setUtmData] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [highlightService, setHighlightService] = useState(false);

  // Listen for service selection from external section cards (100% aligned with all services)
  useEffect(() => {
    const handleSelectService = (e) => {
      const selectedService = e.detail?.service;
      if (!selectedService) return;

      const serviceMap = {
        "Product Hunting": "Product Hunting & Research",
        "Product Hunting & Research": "Product Hunting & Research",
        "Sourcing & Setup": "Product Sourcing & Setup",
        "Product Sourcing & Setup": "Product Sourcing & Setup",
        "Brand Launch": "Brand Launch (Full)",
        "Brand Launch (Full)": "Brand Launch (Full)",
        "Creative & A+": "A+ Content & Creative",
        "A+ Content & Creative": "A+ Content & Creative",
        "PPC & Ranking": "PPC / Ads Management",
        "PPC / Ads Management": "PPC / Ads Management",
        "Full Account Mgmt": "Full Account Management",
        "Full Account Management": "Full Account Management",
        "Listing Optimization": "Listing Optimization",
      };

      const finalValue = serviceMap[selectedService] || selectedService;
      setForm((prev) => ({ ...prev, service: finalValue }));
      setHighlightService(true);
      setTimeout(() => setHighlightService(false), 2500);
    };

    window.addEventListener("groworbit:select-service", handleSelectService);
    return () => window.removeEventListener("groworbit:select-service", handleSelectService);
  }, []);

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
    if (name === "whatsapp") {
      // Only allow digits, spaces, and standard phone symbols +, -, (, )
      const cleaned = value.replace(/[^0-9+\s()-]/g, "");
      setForm((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
    if (!form.service) {
      setError("Please select the service you are interested in.");
      return;
    }

    setError("");
    setLoading(true);

    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    let ttpCookie = "";
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|;\s*)_ttp=([^;]+)/);
      if (match) ttpCookie = decodeURIComponent(match[1]);
    }

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
          brandName: null,
          website_confirm: honeypot,
          eventId,
          ttp: ttpCookie || undefined,
          ...utmData,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit lead details");
      }

      // Track Meta Pixel Lead event with deduplication eventID
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: form.service || "General Grow Orbit Form",
          status: "new"
        }, {
          eventID: eventId
        });
      }

      // Track TikTok Pixel Lead event with deduplication event_id and Advanced Matching
      if (typeof window !== "undefined" && window.ttq) {
        if (typeof window.ttq.identify === "function") {
          const validPhone = normalizeE164Phone(form.whatsapp);
          const identifyPayload = {
            email: form.email.trim().toLowerCase(),
          };
          if (validPhone) {
            identifyPayload.phone_number = validPhone;
          }
          window.ttq.identify(identifyPayload);
        }
        window.ttq.track("SubmitForm", {
          contents: [{ content_id: form.service || "General Lead", content_name: form.service || "Lead Form" }]
        }, {
          event_id: eventId
        });
      }

      setSubmitted(true);
      setShowSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const nameParam = encodeURIComponent(form.name);
      const emailParam = encodeURIComponent(form.email);
      router.push(`/get-started/book-meeting?leadId=${resData.id}&name=${nameParam}&email=${emailParam}`);
    } catch (err) {
      console.error("Lead submission error:", err);
      setError(err.message || "Submission failed. Please check your connection and try again.");
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 animate-fade-in text-center">
        <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
          isDark
            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
            : "bg-emerald-50 border-emerald-200 text-emerald-600"
        }`}>
          <CheckCircle2 size={32} className="stroke-[2]" />
        </div>
        <div>
          <p className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-zinc-950"}`}>Details Received!</p>
          <p className={`text-xs sm:text-sm font-semibold mt-1.5 max-w-xs mx-auto leading-relaxed ${isDark ? "text-orange-400" : "text-[#ea580c]"}`}>
            Hold tight &mdash; loading available time slots with Ali Haider...
          </p>
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
    <form onSubmit={handleSubmit} className={compact ? "space-y-2.5 sm:space-y-3" : "space-y-3.5"} noValidate>
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
        <div className="flex items-center gap-2 border rounded-xl px-4 py-2.5 bg-red-50 border-red-200 text-red-600">
          <AlertCircle size={14} className="shrink-0" />
          <p className="text-[12px] font-semibold">{error}</p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="lead-name" className={`block text-[9.5px] font-black uppercase tracking-[0.15em] mb-1 pl-0.5 ${
          isDark ? "text-zinc-300" : "text-zinc-900"
        }`}>
          FULL NAME *
        </label>
        <div className="relative flex items-center">
          <User size={16} className={`absolute left-3.5 pointer-events-none stroke-[2] ${isDark ? "text-zinc-500" : "text-zinc-400"}`} />
          <input
            id="lead-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`w-full border text-[13px] font-medium transition-all focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08]"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-orange-500/10"
            }`}
          />
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="lead-email" className={`block text-[9.5px] font-black uppercase tracking-[0.15em] mb-1 pl-0.5 ${
          isDark ? "text-zinc-300" : "text-zinc-900"
        }`}>
          EMAIL ADDRESS *
        </label>
        <div className="relative flex items-center">
          <Mail size={16} className={`absolute left-3.5 pointer-events-none stroke-[2] ${isDark ? "text-zinc-500" : "text-zinc-400"}`} />
          <input
            id="lead-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@brand.com"
            className={`w-full border text-[13px] font-medium transition-all focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08]"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-orange-500/10"
            }`}
          />
        </div>
      </div>

      {/* Service Dropdown */}
      <div>
        <label htmlFor="lead-service" className={`block text-[9.5px] font-black uppercase tracking-[0.15em] mb-1 pl-0.5 ${
          isDark ? "text-zinc-300" : "text-zinc-900"
        }`}>
          SERVICE YOU'RE INTERESTED IN *
        </label>
        <div className="relative flex items-center">
          <LayoutGrid size={16} className={`absolute left-3.5 pointer-events-none stroke-[2] ${isDark ? "text-zinc-500" : "text-zinc-400"}`} />
          <select
            id="lead-service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className={`w-full border text-[13px] font-medium transition-all appearance-none cursor-pointer focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-10 py-2 sm:py-2.5 ${
              highlightService ? "!ring-2 !ring-orange-500 !border-orange-500 shadow-[0_0_15px_rgba(255,122,0,0.3)] animate-pulse " : ""
            } ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white focus:bg-zinc-950"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 focus:bg-white focus:ring-2 focus:ring-orange-500/10"
            }`}
          >
            <option value="" disabled className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-500"}>Select a service...</option>
            <option value="Product Hunting & Research" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>Product Hunting & Research</option>
            <option value="Product Sourcing & Setup" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>Product Sourcing & Setup</option>
            <option value="Brand Launch (Full)" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>Brand Launch (Full A-Z)</option>
            <option value="Listing Optimization" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>Listing Optimization & SEO</option>
            <option value="PPC / Ads Management" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>PPC & Ranking Management</option>
            <option value="A+ Content & Creative" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>Creative & A+ Content</option>
            <option value="Full Account Management" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>Full Account Management</option>
            <option value="I'm Not Sure Yet" className={isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}>I'm Not Sure Yet (Help Me Decide)</option>
          </select>
          <ChevronDown size={15} className={`absolute right-3.5 pointer-events-none stroke-[2] ${isDark ? "text-zinc-500" : "text-zinc-400"}`} />
        </div>
      </div>

      {/* Mobile Number */}
      <div>
        <label htmlFor="lead-whatsapp" className={`block text-[9.5px] font-black uppercase tracking-[0.15em] mb-1 pl-0.5 ${
          isDark ? "text-zinc-300" : "text-zinc-900"
        }`}>
          MOBILE NUMBER (OPTIONAL)
        </label>
        <div className="relative flex items-center">
          <Phone size={16} className={`absolute left-3.5 pointer-events-none stroke-[2] ${isDark ? "text-zinc-500" : "text-zinc-400"}`} />
          <input
            id="lead-whatsapp"
            type="tel"
            name="whatsapp"
            inputMode="tel"
            autoComplete="tel"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="e.g. (213) 373-4253"
            className={`w-full border text-[13px] font-medium transition-all focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08]"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-orange-500/10"
            }`}
          />
        </div>
      </div>

      {/* Anything else? */}
      <div>
        <label htmlFor="lead-pain" className={`block text-[9.5px] font-black uppercase tracking-[0.15em] mb-1 pl-0.5 ${
          isDark ? "text-zinc-300" : "text-zinc-900"
        }`}>
          ANYTHING ELSE? (OPTIONAL)
        </label>
        <div className="relative flex items-start">
          <MessageSquare size={16} className={`absolute left-3.5 top-3 pointer-events-none stroke-[2] ${isDark ? "text-zinc-500" : "text-zinc-400"}`} />
          <textarea
            id="lead-pain"
            rows={compact ? 2 : 3}
            name="pain"
            value={form.pain}
            onChange={handleChange}
            placeholder="Tell us about your product, current stage, or what you need help with..."
            className={`w-full border text-[13px] font-medium transition-all resize-none focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 leading-snug ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08]"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-orange-500/10"
            }`}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || submitted}
        className="w-full relative overflow-hidden font-black text-[12px] sm:text-[13px] uppercase tracking-wider text-white bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA726] hover:brightness-110 active:scale-[0.99] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(255,92,0,0.5),0_4px_12px_rgba(255,122,0,0.3)] py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 mt-1 border border-orange-400/30"
      >
        {/* Subtle glossy top highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {loading ? (
          <span className="relative z-10">Sending...</span>
        ) : (
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Calendar size={16} className="text-white shrink-0" />
            <span>BOOK MY FREE MEETING →</span>
          </span>
        )}
      </button>

      {/* Micro Trust Indicators Strip */}
      <div
        className={`flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 gap-y-1 pt-2.5 text-[9.5px] sm:text-[10px] font-bold select-none tracking-tight ${
          isDark ? "text-zinc-400" : "text-zinc-600"
        }`}
      >
        <span className="flex items-center gap-1 shrink-0">
          <Zap size={11} className="text-orange-500 fill-orange-500 shrink-0" />
          <span>Fast 15-Min Call</span>
        </span>
        <span className={isDark ? "text-zinc-700" : "text-zinc-300"}>&middot;</span>
        <span className="flex items-center gap-1 shrink-0">
          <ShieldCheck size={11} className="text-orange-500 shrink-0" />
          <span>100% Free Audit</span>
        </span>
        <span className={isDark ? "text-zinc-700" : "text-zinc-300"}>&middot;</span>
        <span className="flex items-center gap-1 shrink-0">
          <Lock size={11} className="text-orange-500 shrink-0" />
          <span>Zero Pitch Pressure</span>
        </span>
      </div>
    </form>
  );
}
