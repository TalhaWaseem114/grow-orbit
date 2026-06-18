"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BottomLeadForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    brandName: "",
    projectDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const lastSubmitRef = useRef(0);
  const [utmData, setUtmData] = useState({});

  // Capture UTM parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtmData({
        utm_source: params.get("utm_source") || "direct",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_content: params.get("utm_content") || "",
        utm_term: params.get("utm_term") || "",
        landingUrl: window.location.href,
      });
    }
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
          whatsapp: "N/A",
          brandName: form.brandName || "N/A",
          notes: form.projectDetails || "No project details provided",
          requestedService: "Visual Design & Creative",
          source: "Design & Creative Bottom Form",
          asinOrUrl: null,
          monthlyRevenue: null,
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
          content_name: "Visual Design & Creative Bottom Form",
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
      <div className="flex flex-col items-center justify-center py-10 gap-4 animate-bottom-fade-in">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
          <CheckCircle2 size={28} className="stroke-[2]" />
        </div>
        <div className="text-center">
          <p className="text-base font-black text-zinc-900 tracking-tight">Details Received!</p>
          <p className="text-xs text-zinc-500 font-light mt-1">Taking you to schedule your call...</p>
        </div>
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mt-1" />
        <style>{`
          @keyframes bottom-fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-bottom-fade-in { animation: bottom-fade-in 0.4s ease both; }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Inline error message */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600">
          <AlertCircle size={14} className="shrink-0" />
          <p className="text-[12px] font-medium">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="bottom-lead-name" className="sr-only">Full Name</label>
        <input
          id="bottom-lead-name"
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-light"
        />
      </div>

      <div>
        <label htmlFor="bottom-lead-email" className="sr-only">Email Address</label>
        <input
          id="bottom-lead-email"
          type="email"
          required
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-light"
        />
      </div>

      <div>
        <label htmlFor="bottom-lead-brand" className="sr-only">Brand/Company Name</label>
        <input
          id="bottom-lead-brand"
          type="text"
          name="brandName"
          value={form.brandName}
          onChange={handleChange}
          placeholder="Brand/Company Name"
          className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-light"
        />
      </div>

      <div>
        <label htmlFor="bottom-lead-details" className="sr-only">Tell us about your project...</label>
        <textarea
          id="bottom-lead-details"
          rows={3}
          name="projectDetails"
          value={form.projectDetails}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none font-light"
        />
      </div>

      <button
        type="submit"
        disabled={loading || submitted}
        className="w-full py-4 mt-2 rounded-xl font-bold text-[13px] uppercase tracking-widest text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {loading ? "Submitting..." : "BOOK MY CALL"}
      </button>
      <p className="text-[10px] text-zinc-400 text-center font-light mt-2">
        No obligation, just a friendly chat about your brand.
      </p>
    </form>
  );
}
