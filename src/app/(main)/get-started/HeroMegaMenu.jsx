"use client";

import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Cpu,
  Globe,
  LifeBuoy,
  Monitor,
  Rocket,
  Search,
  Layers,
  Palette,
  Image,
  PenTool,
  Layout,
  Store,
  MousePointerClick,
  Users,
  FileText,
  Phone,
  ShieldCheck,
  Target,
  BookMarked,
  ListChecks,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── Column 1: Amazon Services ── */
const amazonServices = [
  { name: "Audit & Strategy",      href: "/service/audit-strategy",       icon: ClipboardCheck, desc: "Deep-dive listing inspections" },
  { name: "Brand Launch",          href: "/service/brand-launch",         icon: Rocket,         desc: "End-to-end Amazon launch" },
  { name: "Listing Optimization",  href: "/service/listing-optimization", icon: Search,         desc: "SEO & keyword ranking" },
  { name: "PPC Efficiency",        href: "/service/ppc-efficiency",       icon: BarChart3,      desc: "Profitable ad scaling" },
  { name: "Growth Automation",     href: "/service/growth-automation",    icon: Cpu,            desc: "Automate repetitive tasks" },
  { name: "Account Ops",           href: "/service/account-ops",          icon: Globe,          desc: "Full account management" },
  { name: "Ongoing Support",       href: "/service/ongoing-support",      icon: LifeBuoy,       desc: "Continuous optimization" },
];

/* ── Column 2: Design & Creative ── */
const designCreative = [
  { name: "Brand Guidelines",          href: "/service/design/brand-guidelines",          icon: Palette,           desc: "Visual identity systems" },
  { name: "Brand Story",               href: "/service/design/brand-story",               icon: BookMarked,        desc: "Narrative & positioning" },
  { name: "Brand Store",               href: "/service/design/brand-store",               icon: Store,             desc: "Custom Amazon storefronts" },
  { name: "Listing Images",            href: "/service/design/listing-image-systems",     icon: Image,             desc: "3D renders & photography" },
  { name: "Enhanced Brand Content A+", href: "/service/design/enhanced-brand-content",    icon: PenTool,           desc: "Premium A+ page design" },
  { name: "Main Image CTR",            href: "/service/design/main-image-ctr",            icon: MousePointerClick, desc: "Click-through optimization" },
  { name: "Full Listing Optimization", href: "/service/design/full-listing-optimization", icon: ListChecks,        desc: "Complete listing overhaul" },
];

/* ── Column 3: Full Service ── */
const fullService = [
  { name: "Full Amazon Management", href: "/service/full/amazon-management", icon: Users,    desc: "Complete hands-off management" },
  { name: "All Services",           href: "/service",                        icon: Layers,   desc: "Browse every service", highlight: true },
  { name: "SOPs",                   href: "/service/sop",                    icon: FileText, desc: "Standard operating procedures" },
  { name: "Coaching & Consultation",href: "/service/coaching-consultation", icon: Phone,    desc: "1-on-1 expert strategy session" },
];

/* ── Column 4: Other Services ── */
const otherServices = [
  { name: "DTC Website",            href: "/service/dtc-website",            icon: Monitor,     desc: "Custom e-commerce platforms" },
  { name: "Amazon DSP",             href: "/service/amazon-dsp",             icon: Target,      desc: "Demand-side platform ads" },
  { name: "Trademark Registration", href: "/service/trademark-registration", icon: ShieldCheck, desc: "Brand Registry & IP" },
];

const headingLinks = {
  "Amazon Services":   "/service/amazon-services",
  "Design & Creative": "/service/design-creative",
  "Full Service":      "/service",
  "Other Services":    "/contact",
};

/* ── Dark themed menu item ── */
function MenuItem({ item, onClose, pathname }) {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`
        flex items-center gap-3 px-2.5 py-2.5 rounded-xl no-underline
        transition-all duration-200 group/item
        ${isActive
          ? "bg-white/10 border border-white/20 shadow-lg shadow-black/50"
          : "text-zinc-400 hover:bg-white/5 hover:translate-x-1"
        }
      `}
      onClick={onClose}
    >
      <div className={`
        w-9 h-9 flex items-center justify-center rounded-lg shrink-0
        transition-all duration-250
        ${isActive
          ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
          : "bg-white/5 text-zinc-500 group-hover/item:bg-orange-500 group-hover/item:text-white group-hover/item:shadow-md group-hover/item:shadow-orange-500/30"
        }
      `}>
        <item.icon size={18} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`text-[13px] font-semibold leading-tight ${isActive ? "text-orange-500" : "text-white group-hover/item:text-white"}`}>{item.name}</span>
        <span className="text-[11px] text-zinc-500 leading-tight truncate">{item.desc}</span>
      </div>
      {(isActive || item.highlight) && (
        <ArrowRight size={14} className={`
          ml-auto shrink-0 transition-all duration-200
          ${isActive ? "text-orange-500 opacity-100 translate-x-0" : "text-orange-500 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"}
        `} />
      )}
    </Link>
  );
}

/* ── Dark themed heading ── */
function ColumnHeading({ title, onClose, className = "" }) {
  const href = headingLinks[title] || "/service";
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-2.5 py-1.5 mb-2 rounded-lg
        text-[10px] font-bold uppercase tracking-[0.15em]
        text-zinc-500 no-underline
        hover:text-orange-500 hover:bg-white/5
        transition-all duration-200 group/heading
        ${className}
      `}
      onClick={onClose}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${title === "Other Services" ? "bg-blue-500" : "bg-orange-500"}`} />
      <span>{title}</span>
      {title !== "Other Services" && (
        <ArrowRight size={14} strokeWidth={2.5} className="ml-auto text-orange-500 group-hover/heading:translate-x-1 transition-transform duration-200" />
      )}
    </Link>
  );
}

export default function HeroMegaMenu({ onClose }) {
  const pathname = usePathname();

  return (
    <div className="mega-menu-enter w-[960px] pt-3 z-100">
      <div className="relative">
        {/* Technical accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[3px] rounded-b-full bg-linear-to-r from-orange-400 to-orange-600 z-10" />

        <div className="flex bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden p-2">

          {/* Col 1 — Amazon Services */}
          <div className="flex-1 p-4">
            <ColumnHeading title="Amazon Services" onClose={onClose} />
            <div className="flex flex-col gap-0.5">
              {amazonServices.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>

            {/* CTA Moved Here to match main Navbar */}
            <div className="mt-8 px-1">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-500 text-white text-[11px] font-bold uppercase tracking-widest no-underline shadow-[0_10px_20px_rgba(249,115,22,0.2)] hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300"
                onClick={onClose}
              >
                Book Free Strategy Call
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Technical Divider */}
          <div className="w-px my-4 bg-linear-to-b from-transparent via-white/5 to-transparent" />

          {/* Col 2 — Design & Creative */}
          <div className="flex-1 p-4">
            <ColumnHeading title="Design & Creative" onClose={onClose} />
            <div className="flex flex-col gap-0.5">
              {designCreative.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>
          </div>

          {/* Technical Divider */}
          <div className="w-px my-4 bg-linear-to-b from-transparent via-white/5 to-transparent" />

          {/* Col 3 — Full Service */}
          <div className="flex-1 p-4 flex flex-col">
            <ColumnHeading title="Full Service" onClose={onClose} />
            <div className="flex flex-col gap-0.5">
              {fullService.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>

            <ColumnHeading title="Other Services" onClose={onClose} className="mt-3 pt-3 border-t border-white/5" />
            <div className="flex flex-col gap-0.5">
              {otherServices.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>

            </div>
          </div>
        </div>
      </div>
  );
}