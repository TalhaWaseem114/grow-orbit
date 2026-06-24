import React from 'react';
import Link from 'next/link';
import { GLOSSARY_TERMS, getAllGlossarySlugs } from '@/data/glossaryData';
import { ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllGlossarySlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const termData = GLOSSARY_TERMS[slug];
  
  if (!termData) return {};
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";
  
  return {
    title: `What is ${termData.term} (${termData.fullName})? | Grow Orbit Glossary`,
    description: termData.definition,
    alternates: {
      canonical: `${siteUrl}/glossary/${slug}`,
    },
    openGraph: {
      title: `What is ${termData.term}? Amazon FBA Glossary`,
      description: termData.definition,
      url: `${siteUrl}/glossary/${slug}`,
      type: "article"
    }
  };
}

export default async function GlossaryTermPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const termData = GLOSSARY_TERMS[slug];
  
  if (!termData) {
    notFound();
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Glossary",
        "item": `${siteUrl}/glossary`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": termData.term,
        "item": `${siteUrl}/glossary/${slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": `What does ${termData.term} stand for?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${termData.term} stands for ${termData.fullName}. ${termData.definition}`
      }
    }]
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/glossary" 
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ArrowLeft size={12} /> BACK TO GLOSSARY
        </Link>
        
        <div className="bg-white border border-zinc-200/60 rounded-[24px] p-8 md:p-10 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)] mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-orange-500" size={32} />
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900">
              {termData.term}
            </h1>
          </div>
          
          <h2 className="text-xl font-bold text-zinc-500 mb-8 pb-6 border-b border-zinc-100">
            {termData.fullName}
          </h2>
          
          <div className="prose prose-zinc max-w-none prose-p:text-lg prose-p:leading-relaxed prose-p:text-zinc-700">
            <p className="font-medium text-zinc-900">{termData.definition}</p>
            
            {termData.example && (
              <div className="mt-8 bg-[#F6F6F6] p-6 rounded-xl border border-zinc-200">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-2">Example</h3>
                <p className="text-zinc-600 m-0">{termData.example}</p>
              </div>
            )}
          </div>
        </div>
        
        {termData.relatedTools && termData.relatedTools.length > 0 && (
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-4">Related Tools & Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {termData.relatedTools.map((tool, idx) => (
                <Link 
                  key={idx} 
                  href={tool.url}
                  className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-orange-500 transition-all flex items-center justify-between"
                >
                  <span className="font-bold text-zinc-900 group-hover:text-orange-500 transition-colors">
                    {tool.name}
                  </span>
                  <ArrowRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
