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
  MessageCircle,
  RefreshCw,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { getSavedUtmData } from "@/utils/utmTracker";
import { normalizeE164Phone } from "@/lib/phoneFormatter";

export default function LeadForm({ theme = "white", compact = false, step: parentStep, onStepChange }) {
  const isDark = theme === "dark";
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", service: "", pain: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [internalStep, setInternalStep] = useState("form"); // "form" | "schedule" | "confirmed"
  const currentStep = parentStep || internalStep;
  const [submittedLead, setSubmittedLead] = useState(null);
  const [shouldPreloadCalendly, setShouldPreloadCalendly] = useState(false);
  const [error, setError] = useState("");
  const lastSubmitRef = useRef(0);
  const [utmData, setUtmData] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [highlightService, setHighlightService] = useState(false);

  const changeStep = (newStep) => {
    setInternalStep(newStep);
    if (onStepChange) onStepChange(newStep);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const el = document.getElementById("lead-form");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  // Passive preloading trigger on user interaction (typing in any input)
  const handleInteraction = () => {
    if (!shouldPreloadCalendly) {
      setShouldPreloadCalendly(true);
    }
  };

  // Passive idle fallback: preload Calendly only after 4.5s of page idle so it never impacts FCP/LCP
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      setShouldPreloadCalendly(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Calendly completion to update Firestore CRM automatically
  useEffect(() => {
    const handleCalendlyMessage = async (e) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data && e.data.event === "calendly.event_scheduled") {
        console.log("Calendly scheduled event detected:", e.data);
        const calendlyPayload = e.data.payload || {};
        const bookingEventId = `sub_${submittedLead?.id || Date.now()}`;

        // Fire Meta Pixel Schedule
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Schedule", { content_name: "Strategy Session Confirmation" }, { eventID: bookingEventId });
        }

        // Fire TikTok Pixel Subscribe
        if (typeof window !== "undefined" && window.ttq) {
          window.ttq.track("Subscribe", {}, { event_id: bookingEventId });
        }

        // Update Firestore CRM via /api/leads
        if (submittedLead?.id) {
          try {
            await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "booking_confirmation",
                leadId: submittedLead.id,
                email: submittedLead.email,
                meetingBooked: true,
                eventId: bookingEventId,
                calendlyEventUri: calendlyPayload.event?.uri || "",
                calendlyInviteeUri: calendlyPayload.invitee?.uri || "",
              }),
            });
            console.log("CRM updated with booking confirmation!");
          } catch (err) {
            console.error("Booking confirmation error:", err);
          }
        }

        changeStep("confirmed");
      }
    };

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [submittedLead]);

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
    if (!form.name.trim()) {
      setError("Please fill in your name.");
      document.getElementById("lead-name")?.focus();
      return;
    }
    if (!form.email.trim()) {
      setError("Please fill in your email address.");
      document.getElementById("lead-email")?.focus();
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setError("Please enter a valid email address.");
      document.getElementById("lead-email")?.focus();
      return;
    }
    if (!form.service) {
      setError("Please select the service you are interested in.");
      document.getElementById("lead-service")?.focus();
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
      const leadPayload = {
        id: resData.id,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        whatsapp: form.whatsapp?.trim() || "",
        service: form.service,
      };
      setSubmittedLead(leadPayload);
      setLoading(false);
      changeStep("schedule");
    } catch (err) {
      console.error("Lead submission error:", err);
      setError(err.message || "Submission failed. Please check your connection and try again.");
      setLoading(false);
    }
  };

  if (currentStep === "confirmed") {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
          <CheckCircle2 size={32} className="stroke-[2.5]" />
        </div>
        <div>
          <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Strategy Call Reserved!</h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xs mx-auto leading-relaxed">
            Hi <strong className="text-zinc-900">{form.name || "there"}</strong>, your 1-on-1 growth audit with Ali Haider is confirmed. A calendar invite with direct Zoom links was sent to <strong className="text-zinc-900">{form.email}</strong>.
          </p>
        </div>

        <div className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-left space-y-2.5 mt-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Call Prep Roadmap:</div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-orange-500/10 text-orange-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <p className="text-[11.5px] text-zinc-600 font-light leading-tight">Our directors will inspect your ASINs &amp; ad history before the call.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-orange-500/10 text-orange-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <p className="text-[11.5px] text-zinc-600 font-light leading-tight">We will review actionable profit levers live on the Zoom screen.</p>
          </div>
        </div>

        <a
          href={`https://wa.me/19128205916?text=${encodeURIComponent(`Hi Ali, my meeting is booked for ${form.name} (${form.service}). Looking forward to speaking!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors mt-2"
        >
          <MessageCircle size={14} /> Need to modify or message earlier? Chat on WhatsApp &rarr;
        </a>
      </div>
    );
  }

  if (currentStep === "schedule") {
    const embedDomain = typeof window !== "undefined" ? window.location.host : "groworbitofficial.com";
    const nameParam = encodeURIComponent(form.name.trim());
    const emailParam = encodeURIComponent(form.email.trim().toLowerCase());
    const phoneParam = encodeURIComponent(form.whatsapp?.trim() || "");
    const activeCalendlySrc = `https://calendly.com/groworbitofficial-support/30min?embed_domain=${embedDomain}&embed_type=Inline&name=${nameParam}&email=${emailParam}${phoneParam ? `&a1=${phoneParam}` : ""}&hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=f97316`;

    return (
      <div className="w-full flex flex-col items-center animate-fade-in">
        {/* Fast Step Badge */}
        <div className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-orange-500/5 border border-orange-500/15 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-zinc-700">Intake Saved</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
            Step 2: Choose Time
          </span>
        </div>

        {/* 1-Tap WhatsApp Fast Track Option */}
        <div className="w-full mb-3">
          <a
            href={`https://wa.me/19128205916?text=${encodeURIComponent(`Hi Ali! I just submitted my audit request on Grow Orbit (Name: ${form.name}, Service: ${form.service}). Can we lock in our 15-min call on WhatsApp?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && window.fbq) {
                window.fbq("track", "Contact", { content_name: "WhatsApp Bypass from Booking Step" });
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[11px] shadow-sm hover:shadow-md transition-all text-center no-underline active:scale-98"
          >
            <MessageCircle size={15} className="fill-white/20 shrink-0" />
            <span>Prefer WhatsApp? Tap here to confirm directly on chat &rarr;</span>
          </a>
        </div>

        {/* Active Pre-warmed Inline Calendly Embed */}
        <div className="w-full relative min-h-[640px] sm:min-h-[680px] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-50/50 shadow-inner">
          <iframe
            src={activeCalendlySrc}
            width="100%"
            height="660"
            frameBorder="0"
            className="w-full h-[640px] sm:h-[680px] bg-transparent"
            title="Schedule Strategy Session"
          />
        </div>

        <div className="mt-2.5 text-center">
          <a
            href={`https://calendly.com/groworbitofficial-support/30min?name=${nameParam}&email=${emailParam}${phoneParam ? `&a1=${phoneParam}` : ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10.5px] text-zinc-400 hover:text-orange-500 underline underline-offset-2 font-medium transition-colors"
          >
            Calendar slow on your device? Open full-screen &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-2.5 sm:space-y-3" : "space-y-3 sm:space-y-3.5"} noValidate>
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
        <div className="flex items-center gap-2 border rounded-xl px-3.5 py-2.5 bg-red-50 border-red-200 text-red-600 mb-1.5">
          <AlertCircle size={14} className="shrink-0" />
          <p className="text-[11.5px] font-semibold">{error}</p>
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
          <User size={15} className={`absolute left-3.5 pointer-events-none stroke-[2.25] ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
          <input
            id="lead-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            onFocus={handleInteraction}
            placeholder="Your name"
            className={`w-full border text-[15px] sm:text-[13px] font-medium transition-all outline-none focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 min-h-[44px] ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/20"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
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
          <Mail size={15} className={`absolute left-3.5 pointer-events-none stroke-[2.25] ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
          <input
            id="lead-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleInteraction}
            placeholder="you@brand.com"
            className={`w-full border text-[15px] sm:text-[13px] font-medium transition-all outline-none focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 min-h-[44px] ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/20"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
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
          <LayoutGrid size={15} className={`absolute left-3.5 pointer-events-none stroke-[2.25] ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
          <select
            id="lead-service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            onFocus={handleInteraction}
            className={`w-full border text-[15px] sm:text-[13px] font-medium transition-all appearance-none cursor-pointer outline-none focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-9 py-2.5 sm:py-3 min-h-[44px] ${
              highlightService ? "!ring-2 !ring-orange-500 !border-orange-500 shadow-[0_0_15px_rgba(255,122,0,0.3)] animate-pulse " : ""
            } ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white focus:bg-zinc-950 focus:ring-2 focus:ring-orange-500/20"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
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
          <ChevronDown size={14} className={`absolute right-3.5 pointer-events-none stroke-[2.25] ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
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
          <Phone size={15} className={`absolute left-3.5 pointer-events-none stroke-[2.25] ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
          <input
            id="lead-whatsapp"
            type="tel"
            name="whatsapp"
            inputMode="tel"
            autoComplete="tel"
            value={form.whatsapp}
            onChange={handleChange}
            onFocus={handleInteraction}
            placeholder="e.g. (213) 373-4253"
            className={`w-full border text-[15px] sm:text-[13px] font-medium transition-all outline-none focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 min-h-[44px] ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/20"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
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
          <MessageSquare size={15} className={`absolute left-3.5 top-3 pointer-events-none stroke-[2.25] ${isDark ? "text-zinc-400" : "text-zinc-600"}`} />
          <textarea
            id="lead-pain"
            rows={compact ? 2 : 3}
            name="pain"
            value={form.pain}
            onChange={handleChange}
            onFocus={handleInteraction}
            placeholder="Tell us about your product, current stage, or what you need help with..."
            className={`w-full border text-[15px] sm:text-[13px] font-medium transition-all resize-none outline-none focus:outline-none focus:border-orange-500 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 min-h-[56px] sm:min-h-[64px] leading-snug ${
              isDark
                ? "bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/20"
                : "bg-[#f3f4f6] hover:bg-[#eceef1] border-zinc-200/90 text-zinc-900 placeholder:text-zinc-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
            }`}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || submitted}
        className="w-full relative overflow-hidden font-black text-[12px] sm:text-[13px] uppercase tracking-wider text-white bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA726] hover:brightness-110 active:scale-[0.99] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(255,92,0,0.5),0_4px_12px_rgba(255,122,0,0.3)] py-3 sm:py-3.5 min-h-[46px] rounded-xl flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 mt-1.5 border border-orange-400/30"
      >
        {/* Subtle glossy top highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {loading ? (
          <span className="relative z-10">Securing Your Spot...</span>
        ) : (
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Calendar size={15} className="text-white shrink-0 stroke-[2.5]" />
            <span>BOOK YOUR FREE STRATEGY CALL →</span>
          </span>
        )}
      </button>

      {/* Micro Trust Indicators Strip */}
      <div
        className={`flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 gap-y-0.5 pt-2 sm:pt-2.5 text-[9.5px] sm:text-[10px] font-bold select-none tracking-tight ${
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

      {/* Invisible background prewarmer: downloads Calendly assets into memory cache while user types */}
      {shouldPreloadCalendly && currentStep === "form" && (
        <iframe
          src="https://calendly.com/groworbitofficial-support/30min?embed_domain=groworbitofficial.com&embed_type=Inline&hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=f97316"
          style={{ position: "absolute", width: "1px", height: "1px", opacity: 0, pointerEvents: "none", zIndex: -10 }}
          title="Calendly Background Prewarmer"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
    </form>
  );
}
