import React from 'react';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import GlossaryClient from './GlossaryClient';

export const metadata = {
  title: "Amazon FBA Glossary & Terminology | Grow Orbit",
  description: "Master Amazon FBA acronyms and terminology. From CTR, ACOS, and BSR to Main Image guidelines and 3D rendering, explore our comprehensive glossary of ecommerce terms.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.groworbitofficial.com"}/glossary`,
  }
};

export default function GlossaryIndexPage() {
  return <GlossaryClient glossaryTerms={GLOSSARY_TERMS} />;
}
