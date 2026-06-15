import React from 'react';
import { ShieldCheck, CalendarCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function EditorialGuidelines({ updatedDate, authorName }) {
  // Format the date
  let formattedDate = "";
  if (updatedDate) {
    try {
      // Handle firestore timestamp or string
      const dateObj = typeof updatedDate.toDate === 'function' ? updatedDate.toDate() : new Date(updatedDate);
      formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    } catch (e) {
      formattedDate = "Recently updated";
    }
  }

  return (
    <div className="mt-12 mb-8 bg-[#F6F6F6] rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm">
      <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-6 flex items-center gap-2">
        <ShieldCheck className="text-orange-500" size={18} />
        Editorial Transparency
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-3">
          <CalendarCheck className="text-zinc-400 shrink-0 mt-1" size={16} />
          <div>
            <p className="text-xs font-bold text-zinc-900 mb-1">Last Updated</p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              This article was last reviewed and updated on <span className="font-semibold text-zinc-800">{formattedDate || "Recently updated"}</span> to ensure accuracy and relevance with current Amazon A10 algorithm changes.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <CheckCircle2 className="text-zinc-400 shrink-0 mt-1" size={16} />
          <div>
            <p className="text-xs font-bold text-zinc-900 mb-1">Fact-Checked & Reviewed</p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              All strategies and data points are fact-checked by our senior Amazon strategy team. Authored by <span className="font-semibold text-zinc-800">{authorName || "Grow Orbit Experts"}</span>.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-5 border-t border-zinc-200/60">
        <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">
          Our Commitment: <span className="font-medium normal-case tracking-normal text-zinc-800 ml-1">We do not accept compensation for favorable reviews. All opinions are our own based on managing 8-figure Amazon accounts.</span>
        </p>
      </div>
    </div>
  );
}
