"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import gsap from "gsap";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";
import { db } from "../../firebase/firebaseConfig.js";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  /* ── Form state ── */
  const [form, setForm]       = useState({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.service) {
      alert("Please fill in your Name, Email, and select a Service.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        fullName: form.name,
        email: form.email,
        whatsapp: "N/A", // Footer form doesn't ask for WhatsApp
        requestedService: form.service,
        notes: form.message || "No message provided",
        source: "Footer Form",
        status: "new",
        createdAt: serverTimestamp(),
      });
      router.push("/thank-you");
    } catch (err) {
      console.error("Firebase Error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── GSAP input focus ── */
  const handleFocus = (e) =>
    gsap.to(e.target, { paddingLeft: "24px", borderColor: "#F97316", duration: 0.3, ease: "power2.out" });

  const handleBlur = (e) =>
    gsap.to(e.target, { paddingLeft: "20px", borderColor: "#E5E7EB", duration: 0.3, ease: "power2.in" });

  /* ── Nav data ── */
  const navLinks = [
    { name: "Home",       url: "/"          },
    { name: "Services",   url: "/service"   },
    { name: "Portfolio",  url: "/portfolio" },
    { name: "Case Studies", url: "/case-study"},
    { name: "About",      url: "/about"     },
    { name: "FAQ",        url: "/faq"       },
    { name: "Contact",    url: "/contact"   },
  ];

  const serviceLinks = [
    { name: "Audit & Strategy",      url: "/service/audit-strategy"      },
    { name: "Brand Launch Setup",    url: "/service/brand-launch"         },
    { name: "PPC Efficiency",        url: "/service/ppc-efficiency"       },
    { name: "Listing Optimization",  url: "/service/listing-optimization" },
    { name: "Listing Images",        url: "/service/design/listing-image-systems"},
    { name: "A+ Content",            url: "/service/design/enhanced-brand-content"},
    { name: "Brand Store",           url: "/service/design/brand-store"          },
    { name: "Main Image CTR",        url: "/service/design/main-image-ctr"       },
    { name: "Amazon DSP",            url: "/service/amazon-dsp"                  },
    { name: "Trademark Registration",url: "/service/trademark-registration"       },
    { name: "Full Management",       url: "/service/full/amazon-management"      },
  ];

  const socialLinks = [
    { name: "LinkedIn",  url: "https://www.linkedin.com/company/groworbit" },
    { name: "TikTok",    url: "https://www.tiktok.com/@groworbit" },
    { name: "Instagram", url: "https://www.instagram.com/groworbit" },
  ];

  if (pathname === "/thank-you") return null;

  return (
    <footer
      className="bg-[#0A0A0B] text-white pt-24 pb-12 px-6 md:px-12 rounded-t-[60px] relative overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ── Orbit ring bg decoration ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <svg
          className="absolute -bottom-[15%] -right-[8%]"
          style={{ width: "700px", height: "700px" }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.08"
            strokeDasharray="1 4"
            style={{ transformOrigin: "50px 50px", animation: "spin 40s linear infinite" }}
          />
          <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(249,115,22,0.2)" strokeWidth="0.08"
            strokeDasharray="2 6"
            style={{ transformOrigin: "50px 50px", animation: "spin 25s linear infinite reverse" }}
          />
          <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.08"
            style={{ transformOrigin: "50px 50px", animation: "spin 15s linear infinite" }}
          />
        </svg>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Ambient glows ── */}
      <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-indigo-500/4 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ══════════════════════════════════════
            TOP SECTION: Headline + Form
        ══════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20 pb-20 border-b border-white/8">

          {/* Left — headline + info */}
          <div className="lg:w-1/2 pt-6">

            {/* Main headline */}
            <h2
              className="font-black leading-[0.88] tracking-tighter mb-8 uppercase"
              style={{
                fontSize: "clamp(3.2rem, 8.5vw, 6.8rem)",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Let's start<br />
              <span
                className="italic font-light normal-case tracking-normal"
                style={{ color: "#52525b", fontFamily: "'Playfair Display', serif" }}
              >
                the orbit.
              </span>
            </h2>

            <p className="text-zinc-400 text-xl font-light max-w-lg leading-relaxed mb-16">
              Ready to stop guessing and start growing? Tell us what you're working on —{" "}
              <span className="text-white font-medium">
                we'll map the right path in a free 15-minute call.
              </span>
            </p>

            {/* Promise cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
              {[
                {
                  icon: <Zap size={18} />,
                  title: "Quick response.",
                  desc: "We'll reach out within 24 hours to discuss your goals.",
                },
                {
                  icon: <TrendingUp size={18} />,
                  title: "Clear next steps.",
                  desc: "After the consultation, we'll provide a detailed roadmap.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white/[0.04] border border-white/8 rounded-2xl p-5 hover:border-orange-500/30 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-white text-[13px] uppercase tracking-tight mb-1">{item.title}</h3>
                    <p className="text-zinc-500 text-[12px] font-light leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social + tagline row */}
            <div className="flex items-start justify-between border-t border-white/8 pt-10">
              <div>
                <p className="text-zinc-600 uppercase tracking-[0.3em] text-[9px] font-black font-mono mb-4">Follow Us</p>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((s) => (
                    <Link
                      key={s.name}
                      href={s.url}
                      aria-label={`Follow us on ${s.name}`}
                      className="text-zinc-400 text-sm font-medium hover:text-orange-500 transition-colors no-underline focus-visible:text-orange-500 outline-none"
                    >
                      {s.name} ↗
                    </Link>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <p className="text-zinc-600 uppercase tracking-[0.3em] text-[9px] font-black font-mono mb-4">Response Time</p>
                <p className="text-zinc-300 text-sm font-light leading-relaxed">
                  Within 24 hours<br />
                  <span className="text-zinc-500 text-xs">Mon–Sat · No automated replies</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right — white form card */}
          <div className="lg:w-[460px] w-full shrink-0">
            <div className="bg-white text-zinc-900 p-9 md:p-11 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] lg:sticky lg:top-10">
              <h3
                className="text-2xl font-black tracking-tight mb-1 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Have a project{" "}
                <span
                  className="normal-case italic font-light text-zinc-400 tracking-normal"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  in mind?
                </span>
              </h3>
              <p className="text-zinc-400 text-[12px] font-light mb-8">
                Fill in the form and we'll be in touch within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="footer-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                    Your Name *
                  </label>
                  <input
                    id="footer-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. John Smith"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-[14px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="footer-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                    Email *
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@brand.com"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-[14px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Service */}
                <div className="space-y-1.5">
                  <label htmlFor="footer-service" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                    Service Required *
                  </label>
                  <div className="relative">
                    <select
                      id="footer-service"
                      name="service"
                      aria-label="Service Required"
                      value={form.service}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-[14px] outline-none transition-all cursor-pointer appearance-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                        !form.service ? "text-zinc-400" : "text-zinc-900"
                      }`}
                    >
                      <option value="" disabled>Choose a service...</option>
                      <option value="Amazon Launch">Amazon Launch</option>
                      <option value="Listing Optimization">Listing Optimization</option>
                      <option value="PPC Scaling">PPC Scaling</option>
                      <option value="Brand Design & Creative">Brand Design & Creative</option>
                      <option value="Full Account Management">Full Account Management</option>
                      <option value="Trademark Registration">Trademark Registration</option>
                      <option value="Website / Funnel">Website / Funnel</option>
                      <option value="Other / Not Sure">Other / Not Sure</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-sm" aria-hidden="true">↓</span>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="footer-message" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 pl-1">
                    Message
                  </label>
                  <textarea
                    id="footer-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand and biggest challenge..."
                    rows={3}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-[14px] text-zinc-900 placeholder-zinc-400 outline-none transition-all resize-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full mt-2 bg-zinc-900 hover:bg-orange-500 text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? "Sending..." : (
                    <>
                      Send Message
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            MIDDLE: Services quick-links
        ══════════════════════════════════════ */}
        <div className="py-14 border-b border-white/8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Label */}
            <div className="md:w-48 shrink-0">
              <p className="text-zinc-600 uppercase tracking-[0.3em] text-[9px] font-black font-mono mb-2">All Services</p>
              <Link
                href="/service"
                className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline"
              >
                Browse All <ArrowRight size={11} />
              </Link>
            </div>

            {/* Links grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
              {serviceLinks.map((s, i) => (
                <Link
                  key={i}
                  href={s.url}
                  className="text-zinc-500 text-[12px] font-medium hover:text-white transition-colors no-underline leading-snug"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════ */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo */}
          <Link href="/" aria-label="Grow Orbit Home" className="flex items-center gap-3 group no-underline shrink-0 focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl">
            <div className="relative flex items-center justify-center w-10 h-10">
              <Image
                src="/logo.png"
                alt="Grow Orbit Logo"
                width={40}
                height={40}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight uppercase flex gap-1.5 transition-colors leading-none">
                <span className="text-white">GROW</span>
                <span className="text-orange-400">ORBIT</span>
              </span>
              <span className="text-[9px] font-bold text-zinc-600 tracking-wider mt-0.5 uppercase font-mono">
                We Rank. You Sell. It's That Simple.
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors no-underline"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-zinc-700 text-[10px] uppercase tracking-widest font-black font-mono shrink-0">
            © 2010–2026 Grow Orbit.
          </div>
        </div>

      </div>
    </footer>
  );
}