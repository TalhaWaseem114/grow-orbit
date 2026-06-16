"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  ShieldCheck,
  Clock,
  Compass,
  Zap,
  Box,
  FileImage,
  Layers,
  LayoutGrid,
  Award,
  Check,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";

import DesignLeadForm from "./components/DesignLeadForm";
import BottomLeadForm from "./components/BottomLeadForm";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import CreativePortfolio from "./components/CreativePortfolio";

export default function DesignLandingClient() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const categories = [
    { title: "Main Image Design", icon: Box },
    { title: "Infographics Images", icon: FileImage },
    { title: "Lifestyle Images", icon: ImageIcon },
    { title: "A+ Content Design", icon: Layers },
    { title: "Brand Story Design", icon: Award },
    { title: "Packaging Design", icon: Box },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Brief & Research",
      description: "We understand your product, audience & competition.",
    },
    {
      step: "02",
      title: "Strategy & Concept",
      description: "We plan the best visual approach to maximize conversions.",
    },
    {
      step: "03",
      title: "Design & Visualize",
      description: "Our designers craft stunning, conversion-focused visuals.",
    },
    {
      step: "04",
      title: "Review & Revise",
      description: "You review and refine until it's absolutely perfect.",
    },
    {
      step: "05",
      title: "Deliver & Scale",
      description: "You get listing-ready assets that drive real results.",
    },
  ];

  const benefits = [
    { title: "Amazon Experts", description: "All graphics 100% Amazon compliant." },
    { title: "Conversion-Focused", description: "Designed to attract & increase sales." },
    { title: "High-Quality Designs", description: "Pixel perfect and brand-aligned." },
    { title: "Fast Turnaround", description: "On-time delivery, every time." },
    { title: "Unlimited Revisions", description: "We work until you're 100% satisfied." },
  ];

  const pricingPlans = [
    {
      name: "STARTER",
      price: "$149",
      description: "Perfect for new sellers",
      features: [
        "5 Infographic Images",
        "1 Lifestyle Image",
        "1 Revision",
        "3 Days Delivery",
      ],
      highlight: false,
      btnText: "GET STARTED",
    },
    {
      name: "GROWTH",
      price: "$299",
      description: "Best for growing brands",
      features: [
        "7 Infographic Images",
        "2 Lifestyle Images",
        "1 A+ Content Design",
        "Unlimited Revisions",
        "4 Days Delivery",
      ],
      highlight: true,
      btnText: "GET STARTED",
    },
    {
      name: "PRO",
      price: "$499",
      description: "For established brands",
      features: [
        "10 Infographic Images",
        "3 Lifestyle Images",
        "2 A+ Content Designs",
        "Packaging Design",
        "Unlimited Revisions",
        "5 Days Delivery",
      ],
      highlight: false,
      btnText: "GET STARTED",
    },
    {
      name: "PREMIUM",
      price: "Custom",
      description: "Tailored for your brand",
      features: [
        "Custom Graphics",
        "Full Brand Visual Kit",
        "A+ Content (EBC)",
        "Packaging + More",
        "Priority Support",
      ],
      highlight: false,
      btnText: "CONTACT US",
    },
  ];

  const faqs = [
    {
      question: "Will the images be Amazon compliant?",
      answer: "Yes, 100%. We keep up to date with Amazon's latest image guidelines and terms of service. Your main images will be on pure white backgrounds, and we ensure all badges, text limits, and design specifications meet Amazon requirements perfectly.",
    },
    {
      question: "Do you offer revisions?",
      answer: "Absolutely. We offer standard revisions for the Starter package and unlimited revisions for the Growth, Pro, and Custom packages. We collaborate closely with you at each milestone to refine your storyboards and visual styles until you are fully satisfied.",
    },
    {
      question: "How long does it take to get the designs?",
      answer: "Our standard delivery ranges between 3 and 5 business days depending on the package you select. If you have a custom or bulk project, our team will define a clear timeline during our onboarding strategy call.",
    },
    {
      question: "Do you design A+ Content as well?",
      answer: "Yes! A+ Content (formerly Enhanced Brand Content) is one of our primary creative services. We design custom modules, brand story banners, comparison charts, and detailed product grids that increase cross-selling and Average Order Value.",
    },
    {
      question: "What if I need custom graphics?",
      answer: "If none of our standard packages match your needs, we offer custom tailored plans. We can provide full brand visual packages, customized storefront layouts, 3D modeling, packaging box designs, and insert card creative.",
    },
  ];

  return (
    <main
      className="min-h-screen bg-zinc-950 text-zinc-150 selection:bg-orange-500 selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Glow / Scan Animations */}
      <style>{`
        @keyframes scan-glow {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent animate-[scan-glow_12s_linear_infinite]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="design-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#design-grid)" />
        </svg>
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,transparent_60%)]" />
        <div className="absolute bottom-[35%] left-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_60%)]" />
      </div>

      {/* ── HEADER NAVIGATION ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900 py-3" : "py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group no-underline">
            <Image
              src="/logo.png"
              alt="Grow Orbit Logo"
              width={28}
              height={28}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-base font-black tracking-tight uppercase flex gap-1">
              <span className="text-white">GROW</span>
              <span className="text-orange-500">ORBIT</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white no-underline transition-colors">Home</Link>
            <Link href="/service" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white no-underline transition-colors">Services</Link>
            <Link href="/portfolio" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white no-underline transition-colors">Portfolio</Link>
            <a href="#pricing" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white no-underline transition-colors">Pricing</a>
            <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white no-underline transition-colors">About Us</Link>
          </nav>

          <button
            onClick={scrollToForm}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-md shadow-orange-500/20"
          >
            Book A Strategy Call
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <h1
                className="text-[36px] xs:text-[45px] sm:text-[55px] md:text-[62px] lg:text-[72px] font-black tracking-tighter leading-[0.95] sm:leading-[0.9] text-white uppercase mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                High-Converting<br />
                <span className="text-orange-500">Product Graphics</span><br />
                That Sell.
              </h1>

              <p className="text-zinc-400 text-[14px] sm:text-[17px] font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                We create stunning Amazon-ready visuals that attract, engage, and convert browsers into buyers.
              </p>

              {/* Horizontal features row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1.5"><Check className="text-orange-500" size={14} /> Conversion Focused</span>
                <span className="flex items-center gap-1.5"><Check className="text-orange-500" size={14} /> Amazon Compliant</span>
                <span className="flex items-center gap-1.5"><Check className="text-orange-500" size={14} /> Fast Turnaround</span>
                <span className="flex items-center gap-1.5"><Check className="text-orange-500" size={14} /> Unlimited Revisions</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <button
                  onClick={scrollToForm}
                  className="w-full sm:w-auto px-8 py-4.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black text-[12px] uppercase tracking-[0.2em] transition-all shadow-[0_8px_25px_rgba(249,115,22,0.35)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Book A Free Strategy Call
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden relative">
                      <Image
                        src={`/assets/vision globe.png`} // Fallback logo representation
                        alt="Client Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">Trusted by 80+ Brands</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              {/* Glow Accent */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18)_0%,transparent_60%)] pointer-events-none" />

              {/* Image Collage Frame */}
              <div className="relative w-full aspect-[4/3] max-w-[550px] rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-900/10 p-6 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* 3D Render Image representing the layout */}
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/portfolio_3d_render.png" // Displays dropper bottle & sleek elements
                    alt="Amazon Product Creative Render Mockup"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain animate-bounce-slow"
                    priority
                  />

                  {/* Floating Custom Amazon Mobile Screen Overlay */}
                  <div className="absolute top-4 right-4 w-40 bg-zinc-950/95 border border-zinc-850 p-3 rounded-2xl shadow-2xl flex flex-col gap-2 scale-90 sm:scale-100 backdrop-blur">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Grow Orbit Mobile</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="relative w-full h-24 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
                      <Image
                        src="/assets/portfolio_listing_infographic.png"
                        alt="Product Graphic Infographic"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-black text-white uppercase tracking-tight">Active Brand Overhaul</span>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => <Star key={i} size={7} className="fill-amber-400 text-amber-400" />)}
                        </div>
                        <span className="text-[7px] text-zinc-500 font-mono">(48 reviews)</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-orange-500 mt-1">Conversion: +43.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="relative py-20 border-t border-zinc-900 bg-zinc-950/20 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
              Graphics That Make Your Product<br />
              <span className="text-orange-500">Unstoppable</span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-3 leading-relaxed">
              From scroll-stopping main images to conversion-driven infographics, we deliver visuals that build half-billion dollar brands.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={idx}
                  className="group bg-zinc-900/30 border border-zinc-900 hover:border-orange-500/20 p-6 rounded-2xl transition-all duration-300 text-center flex flex-col items-center justify-center hover:bg-zinc-900/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-zinc-850 flex items-center justify-center mb-4 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all">
                    <CatIcon size={20} className="text-zinc-300 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider leading-snug">
                    {cat.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO SECTION ── */}
      <section className="relative py-20 border-t border-zinc-900 bg-zinc-950 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <CreativePortfolio />
        </div>
      </section>

      {/* ── CREATIVE PROCESS SECTION ── */}
      <section className="relative py-20 border-t border-zinc-900 bg-zinc-950/10 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Our Creative Process
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-1">
              Simple Process, Stunning Results.
            </p>
          </div>

          {/* Timeline Row */}
          <div className="relative">
            {/* Horizontal connection line on desktop */}
            <div className="absolute top-6 left-1/12 right-1/12 h-0.5 border-t border-dashed border-zinc-800 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {processSteps.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center px-4 group">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-800 group-hover:border-orange-500 text-zinc-400 group-hover:text-white flex items-center justify-center font-mono font-black text-sm transition-all duration-300 z-10 bg-zinc-950 relative">
                    {/* Ring highlight */}
                    <div className="absolute inset-0.5 rounded-full border border-dashed border-zinc-800 group-hover:border-orange-500/40" />
                    {item.step}
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight mt-6 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-[11px] sm:text-xs font-light leading-relaxed max-w-[200px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE GROW ORBIT ── */}
      <section className="relative py-20 border-t border-zinc-900 bg-zinc-950/30 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Why Brands Choose<br />
              <span className="text-orange-500">Grow Orbit</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl hover:border-orange-500/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500/5 border border-zinc-850 flex items-center justify-center mb-4">
                  <CheckCircle2 size={16} className="text-orange-500" />
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-[11px] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" className="relative py-20 border-t border-zinc-900 bg-zinc-950 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
              Graphics Packages<br />
              <span className="text-orange-500">For Every Brand</span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-3">
              Flexible packages to fit your needs & budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlight
                    ? "bg-orange-500 text-white shadow-[0_15px_40px_rgba(249,115,22,0.25)] border-2 border-orange-400 scale-[1.03] z-10"
                    : "bg-zinc-900/30 border border-zinc-900 text-zinc-300 hover:border-zinc-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-4 mb-6 border-white/10">
                    <div>
                      <h3 className={`text-xs font-black uppercase tracking-widest ${plan.highlight ? "text-white" : "text-zinc-500"}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-[10px] font-light mt-0.5 ${plan.highlight ? "text-orange-100" : "text-zinc-400"}`}>
                        {plan.description}
                      </p>
                    </div>
                    {plan.highlight && (
                      <span className="bg-white text-orange-500 text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight">{plan.price}</span>
                  </div>

                  <ul className="space-y-3.5 mb-8 pl-0">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs font-light">
                        <CheckCircle2 size={13} className={plan.highlight ? "text-white" : "text-orange-500"} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={scrollToForm}
                  className={`w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${
                    plan.highlight
                      ? "bg-white text-orange-500 hover:bg-orange-50 shadow-lg"
                      : plan.name === "PREMIUM"
                      ? "border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                      : "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  {plan.btnText}
                </button>
              </div>
            ))}
          </div>

          {/* Under-pricing CTA note */}
          <div className="text-center mt-10">
            <p className="text-zinc-500 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              Need a custom package? Let's build something amazing for your brand.{" "}
              <button
                onClick={scrollToForm}
                className="text-orange-500 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer outline-none"
              >
                TALK TO OUR EXPERT
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL + MID CTA BANNER ── */}
      <section className="relative py-20 bg-zinc-950 border-t border-zinc-900 z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Quote Box (Left 5 cols) */}
            <div className="lg:col-span-5 bg-zinc-900/30 border border-zinc-900 rounded-3xl p-8 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white text-sm sm:text-base font-light italic leading-relaxed">
                  "Grow Orbit completely transformed our product listings. Our sales increased by 43% in just few weeks!"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden relative">
                  <Image
                    src="/assets/vision globe.png" // Fallback logo representation
                    alt="James Carter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-0.5">James Carter</h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Brand Owner</p>
                </div>
              </div>
            </div>

            {/* CTA Overhaul Box (Right 7 cols) */}
            <div className="lg:col-span-7 bg-zinc-900/20 border border-zinc-900 rounded-3xl p-8 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(249,115,22,0.08)_0%,transparent_60%)] pointer-events-none" />

              <div className="flex-1 text-center sm:text-left relative z-10">
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
                  Ready to make your products stand out?
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                  Let's create powerful visuals that drive more clicks, higher conversions, and bigger sales.
                </p>
                <button
                  onClick={scrollToForm}
                  className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-md shadow-orange-500/20"
                >
                  BOOK A FREE STRATEGY CALL
                </button>
              </div>

              {/* Whey package mockup in mid-CTA */}
              <div className="w-36 h-36 relative shrink-0 z-10">
                <Image
                  src="/assets/portfolio_3d_render.png"
                  alt="Whey jar mockup"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="relative py-20 border-t border-zinc-900 bg-zinc-950 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/30 border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm uppercase text-white hover:text-orange-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-850 flex items-center justify-center shrink-0">
                      <ChevronDown
                        size={14}
                        className={`text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-orange-500" : ""}`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-zinc-400 text-xs sm:text-sm font-light leading-relaxed border-t border-zinc-900/60 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL FORM SECTION ── */}
      <section ref={formRef} className="relative py-20 border-t border-zinc-900 bg-zinc-900/10 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Form text column */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                LET'S CREATE<br />
                VISUALS THAT<br />
                <span className="text-orange-500">SELL.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                Book a free strategy call and let's scale your brand together!
              </p>

              {/* Bottom Form checklist */}
              <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-light pl-1">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-orange-500" />
                  </div>
                  <span>Amazon Focused: 100% Compliant</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-light pl-1">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-orange-500" />
                  </div>
                  <span>Growth-Driven: More Sales</span>
                </div>
              </div>
            </div>

            {/* Bottom Form block */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur opacity-25" />
              <div className="relative bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="mb-6">
                  <h3 className="text-lg font-black text-zinc-950 uppercase tracking-tight mb-1">
                    BOOK YOUR FREE STRATEGY CALL
                  </h3>
                  <div className="w-12 h-0.5 bg-orange-500 mt-2" />
                </div>
                <BottomLeadForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-12 border-t border-zinc-900 bg-zinc-950 z-10 text-center">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-center gap-2 group no-underline mb-6">
            <Image
              src="/logo.png"
              alt="Grow Orbit Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-sm font-black tracking-tight uppercase flex gap-1">
              <span className="text-white">GROW</span>
              <span className="text-orange-500">ORBIT</span>
            </span>
          </div>

          <div className="flex justify-center flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors no-underline">Home</Link>
            <Link href="/service" className="hover:text-white transition-colors no-underline">Services</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors no-underline">Portfolio</Link>
            <a href="#pricing" className="hover:text-white transition-colors no-underline">Pricing</a>
            <Link href="/about" className="hover:text-white transition-colors no-underline">About Us</Link>
          </div>

          <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Grow Orbit. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
