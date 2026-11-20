import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service & Conditions | Grow Orbit",
  description: "Read the terms of service governing your use of the Grow Orbit website, consultations, Amazon account audits, and marketing services.",
  alternates: {
    canonical: "https://www.groworbitofficial.com/terms-of-service/",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-6">
      <div className="max-w-[880px] mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-zinc-100 shadow-sm">
        
        {/* Header */}
        <div className="border-b border-zinc-100 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
            Legal & Compliance
          </div>
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-zinc-950 tracking-tight" 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Terms of Service
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-zinc-400 text-xs font-mono">
            <span>LAST UPDATED: NOVEMBER 20, 2026</span>
            <span>&middot;</span>
            <span>EFFECTIVE DATE: JANUARY 1, 2026</span>
          </div>
        </div>

        {/* Terms Body */}
        <div className="space-y-8 text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
          
          {/* Summary Box */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 text-zinc-700 text-sm leading-relaxed">
            <p className="font-semibold text-zinc-900 mb-1">Key Summary &amp; Scope</p>
            <p>
              These Terms of Service govern your access to the Grow Orbit website, free strategy sessions, listing audits, and our professional consulting services. 
              By browsing our site, requesting an audit, or booking a call, you agree to these terms.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              1. Acceptance of Terms &amp; Eligibility
            </h2>
            <p>
              By accessing or using{" "}
              <Link href="https://www.groworbitofficial.com" className="text-orange-600 hover:underline font-medium">
                groworbitofficial.com
              </Link>{" "}
              (the &quot;Website&quot;), engaging our consulting channels, or requesting an audit, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service, our Privacy Policy, and any additional service agreements executed with us.
            </p>
            <p>
              You represent and warrant that you are at least 18 years of age and possess the legal authority to bind yourself or the commercial entity you represent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              2. Amazon Platform Non-Affiliation &amp; Trademark Notice
            </h2>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 text-amber-900 text-sm leading-relaxed">
              <p className="font-bold uppercase tracking-wider text-xs text-amber-800 mb-2">Important Platform Disclaimer</p>
              <p>
                Grow Orbit is an independent digital marketing and e-commerce growth consultancy. 
                Grow Orbit is not affiliated with, endorsed by, sponsored by, or operated in partnership with Amazon.com, Inc., Amazon Services LLC, or any of their global subsidiaries.
              </p>
              <p className="mt-2 text-xs text-amber-800/90 font-mono">
                &quot;Amazon&quot;, &quot;Amazon Advertising&quot;, &quot;Amazon Seller Central&quot;, &quot;Amazon Brand Registry&quot;, &quot;FBA&quot;, and related marks, logos, and emblems are registered trademarks of Amazon.com, Inc. or its affiliates. 
                Any reference to these trademarks on this website is strictly descriptive to indicate the platforms on which we provide marketing and consulting services.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              3. Earnings, Case Studies &amp; Performance Disclaimers
            </h2>
            <p>
              Grow Orbit showcases client case studies, growth metrics, revenue multipliers, and return on ad spend (ROAS) figures across our website and promotional materials.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Illustrative Examples:</strong> All case studies, testimonials, and growth statistics reflect specific historical outcomes achieved under unique brand, inventory, and market conditions. They are provided solely for educational and illustrative purposes.</li>
              <li><strong>No Guarantee of Revenue or Ranking:</strong> Grow Orbit makes no express or implied representation, guarantee, or projection that you or your business will achieve similar sales volumes, organic rankings, advertising ROAS, Buy Box shares, or net profits.</li>
              <li><strong>Market Factors:</strong> E-commerce success depends on numerous factors beyond our control, including consumer demand, product quality, competitive pricing, supply chain continuity, inventory availability, review sentiment, and seasonal dynamics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              4. Free Strategy Calls &amp; Growth Audits
            </h2>
            <p>
              We offer complimentary 15-minute discovery consultations, account audits, and profit calculators to qualified brand owners:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Non-Binding Preliminary Evaluation:</strong> Free consultations, audit reports, and roadmap proposals are preliminary diagnostic assessments. They do not constitute formal fiduciary, legal, financial, or ongoing agency commitments.</li>
              <li><strong>Master Services Agreement Required:</strong> A formal client relationship is created solely upon the mutual execution of a written Master Services Agreement (MSA) or Statement of Work (SOW) outlining defined scopes, deliverables, and service fees.</li>
              <li><strong>Right of Refusal:</strong> Grow Orbit reserves the right to decline consultation requests or audit reviews at its sole discretion (e.g., if a brand sells restricted products or exhibits conflicting commercial interests).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              5. Client Responsibilities &amp; Amazon Account Safe Harbors
            </h2>
            <p>
              When working with Grow Orbit under an exploratory or paid arrangement, clients agree to the following obligations:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Ownership &amp; Authorization:</strong> You maintain sole ownership and administrative control of your Amazon Seller Central or Vendor Central account. You are solely responsible for granting appropriate delegated user permissions to Grow Orbit.</li>
              <li><strong>Amazon Terms Compliance:</strong> You remain strictly responsible for ensuring your products, listings, trademarks, certifications, and business practices adhere to Amazon&apos;s Business Solutions Agreement, listing standards, and local consumer protection laws.</li>
              <li><strong>Inventory &amp; Operational Costs:</strong> You are solely responsible for maintaining inventory supply, Amazon FBA storage fees, customer fulfillment, product returns, and direct advertising spend billed by Amazon.</li>
              <li><strong>Third-Party Action Disclaimer:</strong> Grow Orbit is not liable for actions taken unilaterally by Amazon, including listing suppressions, ASIN gating, IP infringement warnings, stranded inventory, fee schedule changes, or account health enforcement.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              6. Intellectual Property Rights
            </h2>
            <p>
              The materials on this Website, including text, graphics, logos, images, UI layouts, audit algorithms, article publications, and code, are the proprietary intellectual property of Grow Orbit or its licensors and are protected by applicable copyright and trademark laws.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Limited License:</strong> You are granted a non-exclusive, non-transferable, revocable license to access the Website and download informational resources solely for your internal evaluation purposes.</li>
              <li><strong>Restrictions:</strong> You may not copy, scrape, reverse-engineer, republish, resell, or exploit any Website material or proprietary audit methodology without our prior written consent.</li>
              <li><strong>Client Content:</strong> Any trademarks, product imagery, and catalog data you share with us remain your exclusive property. You grant Grow Orbit a limited license to review and use this data solely for preparing audits and delivering agreed services.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              7. Disclaimer of Warranties
            </h2>
            <p>
              This Website and all preliminary audit materials are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance. 
              We do not warrant that our Website will operate uninterrupted, error-free, or free of security vulnerabilities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              8. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, in no event shall Grow Orbit, its directors, officers, employees, or partners be liable for any indirect, punitive, incidental, special, or consequential damages, including loss of profits, revenue, data, goodwill, or inventory downtime, arising out of or related to your use of this Website or reliance on any free audit material.
            </p>
            <p>
              Our total aggregate liability for any claims under these Terms of Service shall not exceed the amount actually paid by you to Grow Orbit in the three (3) months preceding the event giving rise to liability, or $100 CAD, whichever is greater.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              9. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Grow Orbit, its affiliates, directors, officers, employees, and contractors from and against any claims, liabilities, damages, losses, and reasonable legal expenses arising out of your violation of these Terms, your Amazon catalog content, or your infringement of any third-party intellectual property rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              10. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms of Service and any dispute arising out of or relating to them shall be governed by and construed in accordance with the laws of the <strong>Province of Ontario</strong> and the federal laws of <strong>Canada</strong> applicable therein, without regard to conflict of law principles.
            </p>
            <p>
              Any legal action or proceeding arising under these Terms shall be instituted exclusively in the competent courts located in the Regional Municipality of Peel or Toronto, Ontario, Canada, and each party irrevocably submits to the exclusive personal jurisdiction of such courts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              11. Modifications to Terms
            </h2>
            <p>
              Grow Orbit reserves the right to revise these Terms of Service at any time. When modifications occur, the updated terms will be posted with an updated &quot;Last Updated&quot; date. Continued access to the Website following any revision constitutes your acceptance of the amended terms.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              12. Contact Information
            </h2>
            <p>For questions or formal inquiries concerning these Terms of Service, please contact us at:</p>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 text-zinc-800 text-sm space-y-1">
              <p className="font-bold text-zinc-950">Grow Orbit</p>
              <p>2583 Lundigan Dr, Mississauga, ON L5J 3W2, Canada</p>
              <p>Email: <a href="mailto:support@groworbitofficial.com" className="text-orange-600 hover:underline font-medium">support@groworbitofficial.com</a></p>
              <p>Phone: <a href="tel:+19128205916" className="text-orange-600 hover:underline font-medium">+1 (912) 820-5916</a></p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
