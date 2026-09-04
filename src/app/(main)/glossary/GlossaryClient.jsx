"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Search, X } from "lucide-react";

export default function GlossaryClient({ glossaryTerms }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("ALL");

  const termsList = useMemo(() => {
    return Object.entries(glossaryTerms).map(([slug, data]) => ({
      slug,
      ...data,
    }));
  }, [glossaryTerms]);

  // Available starting letters
  const availableLetters = useMemo(() => {
    const letters = new Set();
    termsList.forEach((t) => {
      letters.add(t.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, [termsList]);

  // Filtered terms based on search & selected letter
  const filteredTerms = useMemo(() => {
    return termsList
      .filter((item) => {
        const matchesSearch =
          searchQuery.trim() === "" ||
          item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.definition.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLetter =
          selectedLetter === "ALL" ||
          item.term.charAt(0).toUpperCase() === selectedLetter;

        return matchesSearch && matchesLetter;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [termsList, searchQuery, selectedLetter]);

  // Group filtered terms by letter
  const groupedTerms = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      const letter = term.term.charAt(0).toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(term);
      return acc;
    }, {});
  }, [filteredTerms]);

  return (
    <div
      className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/60 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen size={14} /> Official Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 mb-4">
            AMAZON FBA <span className="text-orange-500">GLOSSARY</span>
          </h1>
          <p className="text-zinc-600 text-lg leading-relaxed max-w-2xl">
            Master the core acronyms, visual standards, and growth metrics that
            drive 7- and 8-figure Amazon brand operations.
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon terms (e.g. CTR, ACOS, Main Image, 3D)..."
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Letter Jump Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 mb-10 pb-4 border-b border-zinc-200/80">
          <button
            onClick={() => setSelectedLetter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
              selectedLetter === "ALL"
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-orange-400"
            }`}
          >
            ALL ({termsList.length})
          </button>
          {availableLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-8 h-8 rounded-lg text-xs font-bold tracking-wide transition-all ${
                selectedLetter === letter
                  ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-orange-400"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Terms Grid */}
        {filteredTerms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center my-8">
            <BookOpen size={36} className="mx-auto text-zinc-300 mb-3" />
            <h3 className="text-lg font-bold text-zinc-800 mb-1">
              No matching terms found
            </h3>
            <p className="text-zinc-500 text-sm mb-4">
              We couldn't find anything matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLetter("ALL");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.keys(groupedTerms)
              .sort()
              .map((letter) => (
                <div key={letter} className="relative">
                  <div className="sticky top-20 bg-[#fafafa]/95 backdrop-blur-sm py-3 z-10 border-b border-zinc-200 mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-orange-500">
                      {letter}
                    </h2>
                    <span className="text-xs font-bold text-zinc-400">
                      {groupedTerms[letter].length} {groupedTerms[letter].length === 1 ? "term" : "terms"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedTerms[letter].map((item) => (
                      <Link
                        key={item.slug}
                        href={`/glossary/${item.slug}`}
                        className="group bg-white p-6 rounded-2xl border border-zinc-200/90 hover:border-orange-500 transition-all hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.15)] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-xl font-bold text-zinc-900 group-hover:text-orange-500 transition-colors">
                              {item.term}
                            </h3>
                          </div>
                          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-3">
                            {item.fullName}
                          </p>
                          <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                            {item.definition}
                          </p>
                        </div>
                        <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center text-orange-500 text-xs font-bold uppercase tracking-widest gap-1">
                          Explore Term{" "}
                          <ArrowRight
                            size={13}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
