"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../src/firebase/firebaseConfig.js";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function LeadForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", service: "", pain: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        fullName: form.name,
        email: form.email,
        whatsapp: form.whatsapp || "N/A",
        requestedService: form.service,
        notes: form.pain || "No message provided",
        source: "Landing Page Form",
        status: "new",
        createdAt: serverTimestamp(),
      });
      // Redirect immediately to the high-conversion thank you page
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: "Full Name *",       name: "name",     type: "text",  placeholder: "Your name"         },
        { label: "Email Address *",   name: "email",    type: "email", placeholder: "you@brand.com"     },
        { label: "WhatsApp (Optional - For Quick Response)", name: "whatsapp", type: "tel",   placeholder: "+1 (555) 000-0000" },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={`lead-${f.name}`} className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5 pl-1">{f.label}</label>
          <input
            id={`lead-${f.name}`}
            type={f.type}
            name={f.name}
            value={form[f.name]}
            onChange={handleChange}
            placeholder={f.placeholder}
            className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-light"
          />
        </div>
      ))}

      <div>
        <label htmlFor="lead-service" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5 pl-1">Service You're Interested In</label>
        <div className="relative">
          <select
            id="lead-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-[14px] text-zinc-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all appearance-none cursor-pointer font-light"
          >
            <option value="" disabled>Select a service...</option>
            <option value="Product Hunting & Research">Product Hunting & Research</option>
            <option value="Product Sourcing & Setup">Product Sourcing & Setup</option>
            <option value="Brand Launch (Full)">Brand Launch (Full)</option>
            <option value="Listing Optimization">Listing Optimization</option>
            <option value="PPC / Ads Management">PPC / Ads Management</option>
            <option value="A+ Content & Creative">A+ Content & Creative</option>
            <option value="Full Account Management">Full Account Management</option>
            <option value="I'm Not Sure Yet">I'm Not Sure Yet — Help Me Decide</option>
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-sm">↓</span>
        </div>
      </div>

      <div>
        <label htmlFor="lead-pain" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5 pl-1">Anything else? (optional)</label>
        <textarea
          id="lead-pain"
          rows={3}
          name="pain"
          value={form.pain}
          onChange={handleChange}
          placeholder="Tell us about your product, current stage, or what you need help with..."
          className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none font-light"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] text-white bg-orange-500 hover:bg-zinc-900 transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 group"
      >
        {loading ? "Sending..." : (
          <>
            Book My Free Meeting
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 mt-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 mb-2">What happens next:</p>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2 text-[12px] text-zinc-500 font-light"><span className="w-4 h-4 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-[9px]">1</span> We understand your goals & stage</li>
          <li className="flex items-center gap-2 text-[12px] text-zinc-500 font-light"><span className="w-4 h-4 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-[9px]">2</span> You get a free 15-min strategy call</li>
          <li className="flex items-center gap-2 text-[12px] text-zinc-500 font-light"><span className="w-4 h-4 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-[9px]">3</span> We map out a custom growth roadmap</li>
        </ul>
      </div>
    </form>
  );
}
