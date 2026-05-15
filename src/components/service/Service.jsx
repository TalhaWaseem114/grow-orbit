import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Globe,
  Monitor,
  Rocket,
  Search,
  Zap,
  ClipboardCheck,
  Cpu,
  LifeBuoy,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
const renderingImg = "/assets/3d rendering.png";
const webDesignBg = "/assets/web design bg.jpg";

const ServicePage = () => {
  const montserrat = { fontFamily: "'Montserrat', sans-serif" };
  const [activeSection, setActiveSection] = useState("audit");

  const navItems = useMemo(() => [
    { name: "Audit & Strategy", id: "audit", icon: <ClipboardCheck size={16} /> },
    { name: "Brand Launch", id: "launch", icon: <Rocket size={16} /> },
    { name: "SEO & Listing", id: "seo", icon: <Search size={16} /> },
    { name: "Listing Images", id: "creative", icon: <Zap size={16} /> },
    { name: "PPC Efficiency", id: "ppc", icon: <BarChart3 size={16} /> },
    { name: "Growth Automation", id: "automation", icon: <Cpu size={16} /> },
    { name: "DTC Website", id: "web", icon: <Monitor size={16} /> },
    { name: "Account Ops", id: "management", icon: <Globe size={16} /> },
    { name: "Ongoing Support", id: "support", icon: <LifeBuoy size={16} /> },
  ], []);

  const services = [
    {
      id: "audit",
      tag: "Insight",
      title: "Audit & Strategy",
      link: "/service/audit-strategy",
      desc: "We don't guess; we audit. We perform deep-dive listing and ad account inspections to uncover hidden leaks in your spend.",
      features: ["PPC Waste Identification", "Listing Conversion Audit", "Competitor Gap Analysis", "Growth Roadmap"],
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
    },
    {
      id: "launch",
      tag: "New Brands",
      title: "Brand Launch Setup",
      link: "/service/brand-launch",
      desc: "End-to-end Amazon launch structure. We build your listing architecture and conversion-ready positioning from day one.",
      features: ["Category Analysis", "Brand Registry Support", "Initial Review Strategy", "FBA Logistics Planning"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    },
    {
      id: "seo",
      tag: "Visibility",
      title: "Listing Optimization",
      link: "/service/listing-optimization",
      desc: "The A9 algorithm demands precision. We craft keyword-rich titles and backend terms that rank you on page one.",
      features: ["Index Tracking", "SEO Copywriting", "Backend Optimization", "Competitor Keyword Gap"],
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
    },
    {
      id: "creative",
      tag: "Visuals",
      title: "Listing Images",
      link: "/portfolio",
      desc: "Our signature service. We use photorealistic 3D rendering to create listing images designed for scroll-stopping conversion.",
      features: ["CTR Main Images", "3D Product Rendering", "Premium A+ Content", "Storefront Design"],
      img: renderingImg,
      isPortfolioLink: true,
    },
    {
      id: "ppc",
      tag: "Growth",
      title: "PPC Efficiency Tuning",
      link: "/service/ppc-efficiency",
      desc: "We engineer profitability. Using advanced day-parting and keyword harvesting, we scale your ads while maintaining ROAS.",
      features: ["Keyword Harvesting", "Competitor Conquesting", "DSP Strategy", "Bidding Automation"],
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    },
    {
      id: "automation",
      tag: "Efficiency",
      title: "Growth Automation",
      link: "/service/growth-automation",
      desc: "Scale your operations without scaling your workload. We implement systems that handle repetitive tasks.",
      features: ["Automated Reviews", "Dynamic Pricing", "Inventory Triggers", "Data Dashboards"],
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    },
    {
      id: "web",
      tag: "DTC",
      title: "Brand Website Design",
      link: "/service/dtc-website",
      desc: "Don't rely solely on Amazon. We build conversion-focused brand sites for credibility and long-term remarketing funnels.",
      features: ["Shopify Development", "Funnel Optimization", "Email Setup", "Analytics Tracking"],
      img: webDesignBg,
    },
    {
      id: "management",
      tag: "Full Ops",
      title: "Account Management",
      link: "/service/account-ops",
      desc: "We become your internal Amazon department. From inventory forecasting to case management and health monitoring.",
      features: ["Daily Account Monitoring", "Inventory Planning", "Policy Compliance", "Performance Reports"],
      img: "https://images.pexels.com/photos/8297031/pexels-photo-8297031.jpeg",
    },
    {
      id: "support",
      tag: "Partnership",
      title: "Ongoing Support",
      link: "/service/ongoing-support",
      desc: "Amazon is dynamic. We provide continuous iteration and optimization cycles to ensure your brand stays ahead.",
      features: ["A/B Split Testing", "Trend Analysis", "Feature Updates", "Priority Support"],
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    },
  ];

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "-25% 0px -65% 0px", threshold: 0 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navItems]);

  const activeIndex = navItems.findIndex((i) => i.id === activeSection);
  const indicatorTop = activeIndex * 40 + 52;

  return (
    <main className="min-h-screen bg-[#F6F6F6] text-[#1D1D1F] pt-20 pb-20" style={montserrat}>
      {/* --- HERO --- */}
      <section className="pt-20 pb-32 px-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-10">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px]">Technical Infrastructure</span>
        </div>
        <h1 className="text-6xl md:text-[85px] font-semibold tracking-tighter mb-8 leading-[0.95]">
          The Full <br /> <span className="italic font-light text-gray-400" style={{ fontFamily: "serif" }}>Orbit Suite.</span>
        </h1>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-20">
        {/* --- FIXED SIDEBAR --- */}
        <aside className="lg:w-1/4 h-fit sticky top-32 hidden lg:block">
          <div className="relative pl-6 border-l border-black/10">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 pl-3">Technical Pillars</p>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-4 h-10 px-3 rounded-lg transition-all duration-300 text-[13px] font-medium ${
                  activeSection === item.id ? "text-orange-600 translate-x-1" : "text-gray-400 hover:text-black hover:translate-x-1"
                }`}
              >
                <span className={activeSection === item.id ? "opacity-100" : "opacity-50"}>{item.icon}</span>
                {item.name}
              </a>
            ))}
            <div
              className="absolute left-[-1.5px] w-[3px] bg-orange-500 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_0_12px_rgba(249,115,22,0.4)]"
              style={{ height: "24px", top: 0, transform: `translateY(${indicatorTop}px)` }}
            />
          </div>

          {/* --- RE-ADDED COUNSELLING CARD --- */}
          <div className="mt-12 p-7 bg-[#111111] rounded-[24px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-700" />
            <div className="relative z-10">
              <span className="text-orange-500 font-bold text-[9px] uppercase tracking-widest mb-3 block opacity-80">Partnership First</span>
              <h4 className="text-xl font-bold mb-2 leading-tight">Free Strategy Session</h4>
              <p className="text-gray-400 text-[13px] font-light leading-relaxed mb-6">Talk to a lead engineer about your scaling roadmap.</p>
              <Link href="/contact">
                <button className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                  Book Free Counselling <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </aside>

        {/* --- CONTENT AREA --- */}
        <div className="lg:w-3/4 space-y-32">
          {services.map((s) => (
            <section id={s.id} key={s.id} className="scroll-mt-32">
              <div className="relative group overflow-hidden rounded-[40px] shadow-sm border border-black/5 mb-10 bg-white">
                <img src={s.img} alt={s.title} className="w-full h-[520px] object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm">
                  <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em]">{s.tag}</span>
                </div>
              </div>

              <div className="max-w-2xl px-2">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-none">{s.title}</h2>
                <p className="text-gray-500 text-lg font-light leading-relaxed mb-10">{s.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 mb-12">
                  {s.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-1 border-b border-black/[0.03]">
                      <CheckCircle2 size={16} className="text-orange-500 flex-shrink-0" />
                      <span className="text-[14px] text-gray-600 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={s.link}
                  className={`flex items-center gap-3 w-fit transition-all group ${
                    s.isPortfolioLink
                    ? "bg-black text-white px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-orange-500 shadow-xl"
                    : "font-bold text-[11px] uppercase tracking-[0.2em] text-orange-500"
                  }`}
                >
                  {s.isPortfolioLink ? "Explore Visuals" : "View Methodology"}
                  {s.isPortfolioLink ? <ExternalLink size={14} /> : <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />}
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicePage;
