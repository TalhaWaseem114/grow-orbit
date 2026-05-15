import React, { memo } from 'react';
import Link from 'next/link';
import PlanetIcon from '@/components/ui/PlanetIcon';

// Moved outside to prevent re-allocation on every render
const PLANET_COLORS = [
  "249,115,22",   // Orange
  "6,182,212",    // Cyan
  "168,85,247",   // Purple
  "251,191,36",   // Amber
  "236,72,153",   // Pink
  "16,185,129",   // Emerald
  "59,130,246",   // Blue
  "239,68,68",    // Red
];

const SERVICES = [
  { name: "LISTING OPTIMIZATION", href: "/service/listing-optimization" },
  { name: "AMAZON SEO", href: "/service/audit-strategy" },
  { name: "PPC MANAGEMENT", href: "/service/ppc-efficiency" },
  { name: "BRAND LAUNCH", href: "/service/brand-launch" },
  { name: "A+ CONTENT", href: "/service/design/a-plus-content" },
  { name: "BRAND STORY", href: "/service/design/brand-story" },
  { name: "STOREFRONT DESIGN", href: "/service/design/storefront-design" },
  { name: "TRADEMARK REGISTRATION", href: "/service/trademark-registration" }
];

const ServicesMarquee = () => {
  // Helper to render the list items
  const renderServiceItems = (isClone = false) => (
    <ul
      className="flex items-center"
      aria-hidden={isClone ? "true" : "false"}
    >
      {SERVICES.map((service, index) => (
        <li
          key={`${isClone ? 'clone' : 'orig'}-${service.name}-${index}`}
          className="flex items-center mx-1.5 sm:mx-3 flex-shrink-0 select-none"
        >
          <PlanetIcon
            baseColor={PLANET_COLORS[index % PLANET_COLORS.length]}
            className="mr-1.5 sm:mr-2.5"
          />
          <Link
            href={service.href}
            prefetch={false}
            className="text-gray-400 no-underline font-bold tracking-[0.2em] text-[9px] sm:text-[10px] uppercase transition-colors hover:text-orange-500 cursor-pointer"
          >
            {service.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden bg-[#0A0A0B] py-1.5 sm:py-2.5 flex border-y border-white/5 pause-marquee-on-hover cursor-pointer group">
      <div className="flex animate-marquee whitespace-nowrap w-max">
        {renderServiceItems(false)}
        {renderServiceItems(true)}
      </div>
    </div>
  );
};

// memo prevents the marquee from re-calculating if the parent component updates
export default memo(ServicesMarquee);