import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FooterNav() {
  return (
    <footer className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Previous Service</p>
          <Link href="/service/account-ops" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-start">
              <ArrowRight className="mr-3 group-hover:-translate-x-3 transition-transform rotate-180 size-8 shrink-0" />
              Account Ops
            </h4>
          </Link>
        </div>
        <div className="hidden md:block w-px h-16 bg-zinc-200" />
        <div className="text-center md:text-right w-full md:w-1/3">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4">Next Service</p>
          <Link href="/service/design/brand-guidelines" className="group inline-block no-underline text-zinc-900">
            <h4 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-orange-500 transition-colors flex items-center justify-center md:justify-end">
              Brand Guidelines
              <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform size-8 shrink-0" />
            </h4>
          </Link>
        </div>
      </div>
      <div className="mt-20 text-center">
        <Link href="/service" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors">
          <ArrowRight className="rotate-180" size={16} /> Back to All Services
        </Link>
      </div>
    </footer>
  );
}
