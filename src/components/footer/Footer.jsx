"use client";


import gsap from "gsap";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getSavedUtmData } from "@/utils/utmTracker";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";


export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  /* ── Form state ── */
  const [form, setForm]       = useState({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [utmData, setUtmData] = useState({});
  const [honeypot, setHoneypot] = useState("");

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.service) {
      alert("Please fill in your Name, Email, and select a Service.");
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
          whatsapp: "N/A",
          requestedService: form.service,
          notes: form.message || "No message provided",
          source: "Footer Form",
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
          content_name: form.service || "Footer Form",
          status: "new"
        });
      }

      const nameParam = encodeURIComponent(form.name);
      const emailParam = encodeURIComponent(form.email);
      router.push(`/get-started/book-meeting?leadId=${resData.id}&name=${nameParam}&email=${emailParam}`);
    } catch (err) {
      console.error("Submission Error:", err);
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
    { name: "Product Hunting & Sourcing", url: "/service/product-hunting-sourcing" },
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

  if (pathname === "/thank-you" || pathname.includes("/book-meeting")) return null;

  return (
    <div className="px-3 pb-3 md:px-6 md:pb-6 mt-10 md:mt-20">
      <footer
        role="contentinfo"
        className="bg-[#0A0A0B] text-white pt-24 pb-12 px-6 md:px-12 rounded-[40px] md:rounded-[60px] relative overflow-hidden shadow-[0_40px_100px_-10px_rgba(0,0,0,0.5)]"
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

      {/* ── Gradient Collision Cuts (Bottom Center Bloom) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        {/* Top Left Quadrant */}
        <div className="absolute top-0 left-0 w-[55%] bg-[#0A0A0B] bg-gradient-to-br from-white/[0.05] to-transparent" style={{ bottom: '700px' }} />
        
        {/* Top Right Quadrant */}
        <div className="absolute top-0 right-0 w-[45%] bg-[#040404] bg-gradient-to-bl from-white/[0.02] to-transparent" style={{ bottom: '700px' }} />
        
        {/* Bottom Left Quadrant (Gradient from bottom-right towards top-left) */}
        <div className="absolute bottom-0 left-0 w-[55%] h-[700px] bg-[#050505] bg-gradient-to-tl from-white/[0.04] to-transparent" />
        
        {/* Bottom Right Quadrant (Gradient from bottom-left towards top-right) */}
        <div className="absolute bottom-0 right-0 w-[45%] h-[700px] bg-[#000000] bg-gradient-to-tr from-white/[0.02] to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ══════════════════════════════════════
            TOP SECTION: Headline + Form
        ══════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20 pb-20">

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
                className="italic font-light normal-case tracking-normal text-zinc-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
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
                    <p className="text-zinc-400 text-[12px] font-light leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social + tagline row */}
            <div className="flex items-start justify-between border-t border-white/8 pt-10">
              <div>
                <p className="text-zinc-400 uppercase tracking-[0.3em] text-[9px] font-black font-mono mb-4">Follow Us</p>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((s) => (
                    <Link
                      key={s.name}
                      href={s.url}
                      aria-label={`Follow us on ${s.name}`}
                      className="text-zinc-400 text-sm font-medium hover:text-orange-500 transition-colors no-underline focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm"
                    >
                      {s.name} ↗
                    </Link>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <p className="text-zinc-400 uppercase tracking-[0.3em] text-[9px] font-black font-mono mb-4">Response Time</p>
                <p className="text-zinc-300 text-sm font-light leading-relaxed">
                  Within 24 hours<br />
                  <span className="text-zinc-400 text-xs">Mon–Sat · No automated replies</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right — white form card */}
          <div className="lg:w-[460px] w-full shrink-0">
            <div className="bg-white text-zinc-900 p-5 sm:p-7 md:p-11 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] lg:sticky lg:top-10">
              <h3
                className="text-2xl font-black tracking-tight mb-1 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Have a project{" "}
                <span
                  className="normal-case italic font-light text-zinc-600 tracking-normal"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  in mind?
                </span>
              </h3>
              <p className="text-zinc-600 text-[12px] font-light mb-8">
                Fill in the form and we'll be in touch within 24 hours.
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
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="footer-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 pl-1">
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
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-base md:text-[14px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="footer-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 pl-1">
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
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-base md:text-[14px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Service */}
                <div className="space-y-1.5">
                  <label htmlFor="footer-service" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 pl-1">
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
                      className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-base md:text-[14px] outline-none transition-all cursor-pointer appearance-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                        !form.service ? "text-zinc-600" : "text-zinc-900"
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
                  <label htmlFor="footer-message" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 pl-1">
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
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-base md:text-[14px] text-zinc-900 placeholder-zinc-400 outline-none transition-all resize-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full mt-2 bg-zinc-900 hover:bg-orange-500 text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
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
        <div className="py-14">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Label */}
            <div className="md:w-48 shrink-0">
              <p className="text-zinc-400 uppercase tracking-[0.3em] text-[9px] font-black font-mono mb-2">All Services</p>
              <Link
                href="/service"
                className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all no-underline"
              >
                Browse All <ArrowRight size={11} />
              </Link>
            </div>

            {/* Links grid */}
            <nav className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3" aria-label="Services Quick Links">
              {serviceLinks.map((s, i) => (
                <Link
                  key={i}
                  href={s.url}
                  className="text-zinc-400 text-[12px] font-medium hover:text-white transition-colors no-underline leading-snug focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm"
                >
                  {s.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ══════════════════════════════════════
            GIANT WATERMARK TEXT
        ══════════════════════════════════════ */}
        <div className="w-full flex justify-center items-center py-12 md:py-16 border-t border-b border-white/5 my-8 select-none overflow-hidden relative z-10">
          <h2 
            className="font-black uppercase text-white/[0.08] leading-none whitespace-nowrap tracking-tighter" 
            style={{ fontSize: "clamp(2rem, 11vw, 15rem)", fontFamily: "'Montserrat', sans-serif" }}
          >
            GROW ORBIT
          </h2>
        </div>

        {/* ══════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════ */}
        <div className="relative z-10 pt-4 flex flex-col md:flex-row justify-between items-center gap-8">

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
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors no-underline focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-zinc-500 text-[10px] uppercase tracking-widest font-black font-mono shrink-0">
            <span>© 2010–2026 Grow Orbit.</span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors no-underline">Privacy Policy</Link>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <Link href="/terms-of-service" className="hover:text-orange-500 transition-colors no-underline">Terms of Service</Link>
          </div>
        </div>

      </div>
      </footer>
    </div>
  );
}