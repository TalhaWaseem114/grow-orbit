import React from 'react';
import Link from 'next/link';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Amazon FBA Glossary & Terminology | Grow Orbit",
  description: "Master Amazon FBA acronyms and terminology. From ACOS to BSR, explore our comprehensive glossary of ecommerce terms.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com"}/glossary`,
  }
};

export default function GlossaryIndexPage() {
  const terms = Object.values(GLOSSARY_TERMS).sort((a, b) => a.term.localeCompare(b.term));

  // Group by starting letter
  const groupedTerms = terms.reduce((acc, term) => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 mb-4 flex items-center gap-3">
            <BookOpen className="text-orange-500" size={40} />
            AMAZON <span className="text-orange-500">GLOSSARY</span>
          </h1>
          <p className="text-zinc-600 text-lg">
            Navigate the complex world of Amazon FBA with our comprehensive dictionary of acronyms, metrics, and ecommerce terminology.
          </p>
        </div>

        <div className="space-y-12">
          {Object.keys(groupedTerms).sort().map(letter => (
            <div key={letter} className="relative">
              <div className="sticky top-20 bg-[#fafafa]/90 backdrop-blur-sm py-4 z-10 border-b border-zinc-200 mb-6">
                <h2 className="text-3xl font-black text-orange-500">{letter}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedTerms[letter].map(item => (
                  <Link 
                    key={item.term} 
                    href={`/glossary/${Object.keys(GLOSSARY_TERMS).find(k => GLOSSARY_TERMS[k].term === item.term)}`}
                    className="group bg-white p-6 rounded-2xl border border-zinc-200 hover:border-orange-500 transition-all hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-1 group-hover:text-orange-500 transition-colors">
                        {item.term}
                      </h3>
                      <p className="text-sm text-zinc-500 font-medium mb-3">{item.fullName}</p>
                      <p className="text-zinc-600 text-sm line-clamp-2">
                        {item.definition}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-orange-500 text-sm font-bold uppercase tracking-widest gap-1">
                      Read Definition <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
