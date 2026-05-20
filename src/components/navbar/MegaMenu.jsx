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
  BookOpen,
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
  { name: "EBC A+ Design", href: "/service/design/enhanced-brand-content",     icon: PenTool,           desc: "Premium A+ page design" },
  { name: "Main Image CTR",            href: "/service/design/main-image-ctr",             icon: MousePointerClick, desc: "Click-through optimization" },
  { name: "Full Listing Optimization", href: "/service/design/full-listing-optimization",  icon: ListChecks,        desc: "Complete listing overhaul" },
];

/* ── Column 3: Full Service ── */
const fullService = [
  { name: "Full Amazon Management", href: "/service/full/amazon-management", icon: Users,    desc: "Complete hands-off management" },
  { name: "All Services",           href: "/service",             icon: Layers,   desc: "Browse every service", highlight: true },
  { name: "SOPs",                   href: "/service/sop",          icon: FileText, desc: "Standard operating procedures" },
  { name: "Coaching & Consultation",href: "/service/coaching-consultation", icon: Phone, desc: "1-on-1 expert strategy session" },
];

/* ── Column 4: Other Services ── */
const otherServices = [
  { name: "DTC Website",            href: "/service/dtc-website", icon: Monitor,     desc: "Custom e-commerce platforms" },
  { name: "Amazon DSP",             href: "/service/amazon-dsp",  icon: Target,      desc: "Demand-side platform ads" },
  { name: "Trademark Registration", href: "/service/trademark-registration", icon: ShieldCheck, desc: "Brand Registry & IP" },
];

/* ── Column heading links ── */
const headingLinks = {
  "Amazon Services":   "/service/amazon-services",
  "Design & Creative": "/service/design-creative",
  "Full Service":      "/service",
  "Other Services":    "/contact",
};

/* ── Reusable menu item ── */
function MenuItem({ item, onClose, pathname }) {
  // Normalize paths by removing trailing slashes to fix active state matching
  const isActive = pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "");

  return (
    <Link
      href={item.href}
      prefetch={false}
      className={`
        flex items-center gap-3 px-2.5 py-2.5 rounded-xl no-underline
        transition-all duration-200 group/item
        ${isActive
          ? "bg-linear-to-r from-orange-50 to-amber-50 border border-orange-500/30 shadow-sm"
          : "text-gray-700 hover:bg-orange-50 hover:translate-x-1"
        }
      `}
      onClick={onClose}
    >
      <div className={`
        w-9 h-9 flex items-center justify-center rounded-lg shrink-0
        transition-all duration-250
        ${isActive
          ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
          : "bg-gray-100 text-gray-500 group-hover/item:bg-orange-500 group-hover/item:text-white group-hover/item:shadow-md group-hover/item:shadow-orange-500/30"
        }
      `}>
        <item.icon size={18} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`text-[13px] font-semibold leading-tight ${isActive ? "text-orange-600" : "text-gray-800"}`}>{item.name}</span>
        <span className="text-[11px] text-gray-400 leading-tight truncate">{item.desc}</span>
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

/* ── Column heading ── */
function ColumnHeading({ title, onClose, className = "" }) {
  const href = headingLinks[title] || "/service";
  return (
    <Link
      href={href}
      prefetch={false}
      className={`
        flex items-center gap-2 px-2.5 py-1.5 mb-2 rounded-lg
        text-[10px] font-bold uppercase tracking-[0.15em]
        text-gray-400 no-underline
        hover:text-orange-500 hover:bg-orange-500/5
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

/* ── Mobile: Collapsible service list ── */
function MobileMenu({ onClose, pathname }) {
  return (
    <div className="flex flex-col gap-6 px-1 py-2 max-h-[70vh] overflow-y-auto">
      {/* Amazon Services */}
      <div>
        <ColumnHeading title="Amazon Services" onClose={onClose} />
        <div className="flex flex-col gap-1">
          {amazonServices.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
        </div>
      </div>

      {/* Design & Creative */}
      <div>
        <ColumnHeading title="Design & Creative" onClose={onClose} />
        <div className="flex flex-col gap-1">
          {designCreative.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
        </div>
      </div>

      {/* Full Service */}
      <div>
        <ColumnHeading title="Full Service" onClose={onClose} />
        <div className="flex flex-col gap-1">
          {fullService.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
        </div>
      </div>

      {/* Other Services */}
      <div>
        <ColumnHeading title="Other Services" onClose={onClose} className="mt-2 pt-3 border-t border-gray-100" />
        <div className="flex flex-col gap-1">
          {otherServices.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        prefetch={false}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-gray-900 to-gray-800 text-white text-[11px] font-bold uppercase tracking-widest no-underline shadow-lg hover:from-orange-500 hover:to-orange-600 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300"
        onClick={onClose}
      >
        Book Free Strategy Call
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

/* ── Desktop Mega Menu Dropdown ── */
export default function MegaMenu({ onClose, isMobile = false }) {
  const pathname = usePathname();

  if (isMobile) return <MobileMenu onClose={onClose} pathname={pathname} />;

  return (
    <div className="mega-menu-enter w-[960px] pt-3 z-100">
      {/* Orange top border accent */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[3px] rounded-b-full bg-linear-to-r from-orange-400 to-orange-600 z-10" />

        <div className="flex bg-white border border-black/6 rounded-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden p-2">

          {/* Col 1 — Amazon Services */}
          <div className="flex-1 p-4">
            <ColumnHeading title="Amazon Services" onClose={onClose} />
            <div className="flex flex-col gap-0.5">
              {amazonServices.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>

            {/* CTA Moved Here */}
            <div className="mt-8 px-1">
              <Link
                href="/contact"
                prefetch={false}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-gray-900 to-gray-800 text-white text-[11px] font-bold uppercase tracking-widest no-underline shadow-lg hover:from-orange-500 hover:to-orange-600 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300"
                onClick={onClose}
              >
                Book Free Strategy Call
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px my-4 bg-linear-to-b from-transparent via-black/[0.07] to-transparent" />

          {/* Col 2 — Design & Creative */}
          <div className="flex-1 p-4">
            <ColumnHeading title="Design & Creative" onClose={onClose} />
            <div className="flex flex-col gap-0.5">
              {designCreative.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px my-4 bg-linear-to-b from-transparent via-black/[0.07] to-transparent" />

          {/* Col 3 — Full Service + Other Services stacked */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Full Service */}
            <ColumnHeading title="Full Service" onClose={onClose} />
            <div className="flex flex-col gap-0.5">
              {fullService.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>

            {/* Other Services */}
            <ColumnHeading title="Other Services" onClose={onClose} className="mt-3 pt-3 border-t border-black/6" />
            <div className="flex flex-col gap-0.5">
              {otherServices.map((item) => <MenuItem key={item.name} item={item} onClose={onClose} pathname={pathname} />)}
            </div>

            </div>
          </div>
        </div>
      </div>
  );
}

