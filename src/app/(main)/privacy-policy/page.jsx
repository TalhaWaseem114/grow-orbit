import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy & Data Protection | Grow Orbit",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information, advertising pixel data, and privacy rights at Grow Orbit.",
  alternates: {
    canonical: "https://www.groworbitofficial.com/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-zinc-400 text-xs font-mono">
            <span>LAST UPDATED: NOVEMBER 20, 2026</span>
            <span>&middot;</span>
            <span>EFFECTIVE DATE: JANUARY 1, 2026</span>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
          
          {/* Summary Box */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 text-zinc-700 text-sm leading-relaxed">
            <p className="font-semibold text-zinc-900 mb-1">Privacy Commitment Summary</p>
            <p>
              Grow Orbit (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal data and respecting your privacy. 
              We do not sell personal data to third parties. We collect only the information required to evaluate your Amazon brand, deliver our consulting services, communicate with you, and measure the effectiveness of our advertising campaigns.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              1. Introduction &amp; Legal Entity
            </h2>
            <p>
              This Privacy Policy explains how Grow Orbit collects, uses, stores, and protects personal information when you visit{" "}
              <Link href="https://www.groworbitofficial.com" className="text-orange-600 hover:underline font-medium">
                groworbitofficial.com
              </Link>{" "}
              (the &quot;Site&quot;), interact with our advertising campaigns on third-party networks (including TikTok, Meta, and Google), schedule strategy consultations, request an Amazon account audit, or engage our advertising management services.
            </p>
            <p>
              Grow Orbit operates with principal business headquarters at:
            </p>
            <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 font-mono text-xs text-zinc-800 space-y-1">
              <p className="font-bold">Grow Orbit</p>
              <p>2583 Lundigan Dr</p>
              <p>Mississauga, ON L5J 3W2</p>
              <p>Canada</p>
              <p>Contact Email: <a href="mailto:support@groworbitofficial.com" className="text-orange-600 hover:underline">support@groworbitofficial.com</a></p>
              <p>Phone: +1 (912) 820-5916</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              2. Information We Collect
            </h2>
            <p>We collect information in three ways: directly from you, automatically through your use of our Site, and from third-party advertising platforms.</p>
            
            <h3 className="text-base font-bold text-zinc-900 pt-2">A. Information You Provide Directly</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> Your full name, business email address, phone number, and WhatsApp number when you submit an inquiry form, schedule a strategy call, or message our team.</li>
              <li><strong>Business &amp; Store Details:</strong> Company name, Amazon store URL, marketplace geography (US, CA, UK, EU), product category, current monthly revenue bracket, and specific advertising challenges shared during audit requests.</li>
              <li><strong>Meeting &amp; Communication Records:</strong> Notes, recordings (with consent), and correspondence conducted during strategy calls, audit reviews, or customer support sessions.</li>
            </ul>

            <h3 className="text-base font-bold text-zinc-900 pt-2">B. Information Collected Automatically</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Device &amp; Browser Data:</strong> IP address, browser type, operating system, device model, language preferences, and screen resolution.</li>
              <li><strong>Usage &amp; Interaction Data:</strong> Pages visited, time spent per page, scroll depth, button clicks, form interactions, referring URL, and exit pages.</li>
              <li><strong>Attribution &amp; Campaign Parameters:</strong> UTM parameters, campaign identifiers, click IDs (such as ttclid for TikTok and fbclid for Meta) that indicate which ad campaign directed you to our website.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              3. Advertising Pixels, Cookies &amp; Tracking Technologies
            </h2>
            <p>
              We utilize cookies, web beacons, and third-party advertising pixels on our website to analyze traffic, assess conversion performance, and serve relevant advertisements on third-party platforms.
            </p>
            
            <div className="space-y-3">
              <div className="border border-zinc-200 rounded-xl p-4">
                <p className="font-bold text-zinc-900 text-sm">TikTok Pixel (ByteDance Ltd.)</p>
                <p className="text-sm mt-1">
                  We use the TikTok Pixel to measure ad effectiveness and track conversion actions (such as when a visitor submits an audit request or initiates a WhatsApp chat via our landing pages). 
                  TikTok collects device identifiers, hashed information, and website browsing actions to measure campaign performance and serve personalized ads on the TikTok platform. 
                  Learn more at <a href="https://www.tiktok.com/legal/page/row/privacy-policy/en" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">TikTok Privacy Policy</a>.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-4">
                <p className="font-bold text-zinc-900 text-sm">Meta Pixel (Meta Platforms, Inc.)</p>
                <p className="text-sm mt-1">
                  We deploy the Meta Pixel to track engagement across our funnel, measure return on ad spend, and create custom audiences for Facebook and Instagram advertising. 
                  Meta processes user event data under its Data Policy available at <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Meta Privacy Policy</a>.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-4">
                <p className="font-bold text-zinc-900 text-sm">Google Analytics &amp; Tag Manager (Google LLC)</p>
                <p className="text-sm mt-1">
                  We use Google Analytics 4 to collect aggregated visitor metrics and understand user behavior. Google uses cookies and IP anonymization to safeguard personal identity.
                </p>
              </div>
            </div>

            <h3 className="text-base font-bold text-zinc-900 pt-2">How to Opt Out of Tracking</h3>
            <p>You can control or disable interest-based advertising through several mechanisms:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Manage cookie preferences directly within your web browser settings.</li>
              <li>Opt out through the Digital Advertising Alliance at <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">aboutads.info</a> or Network Advertising Initiative at <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">networkadvertising.org</a>.</li>
              <li>For TikTok users: adjust personalized ad preferences within the TikTok mobile app under Settings &gt; Privacy &gt; Ads.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              4. How We Use Your Information
            </h2>
            <p>We process your personal information for specific, legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Delivering Strategy Consultations:</strong> Reviewing your Amazon listing data and preparing tailored growth recommendations for scheduled calls.</li>
              <li><strong>Direct Communication:</strong> Responding to inquiries via email, phone, or WhatsApp, confirming meeting bookings, and providing follow-up resources.</li>
              <li><strong>Campaign Optimization:</strong> Evaluating the performance of our advertising funnels and ensuring ad content reaches relevant Amazon brand founders.</li>
              <li><strong>Security &amp; Fraud Prevention:</strong> Protecting our website against automated spam, bot submissions, honeypot triggers, and unauthorized access.</li>
              <li><strong>Legal Compliance:</strong> Meeting statutory tax, accounting, and regulatory obligations in Canada and applicable international jurisdictions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              5. Third-Party Service Providers &amp; Sub-Processors
            </h2>
            <p>
              We partner with trusted service providers who assist us in operating our business. These entities have access only to the information necessary to perform their contracted duties and are legally bound to protect your data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cloud Hosting &amp; Content Delivery:</strong> Vercel Inc. (global edge infrastructure).</li>
              <li><strong>Database &amp; Application Infrastructure:</strong> Google Firebase / Google Cloud Platform (secure data storage and access controls).</li>
              <li><strong>Calendar &amp; Scheduling:</strong> Calendly LLC (appointment booking for strategy calls).</li>
              <li><strong>Transactional Email &amp; Routing:</strong> Nodemailer and enterprise SMTP delivery providers.</li>
              <li><strong>Instant Messaging:</strong> WhatsApp Business API / Meta Platforms, Inc. (direct customer support).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              6. Canadian Privacy Rights (PIPEDA &amp; CASL Compliance)
            </h2>
            <p>
              Grow Orbit complies with Canada&apos;s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and <em>Canada&apos;s Anti-Spam Legislation</em> (CASL).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Accountability:</strong> We are responsible for personal data under our control. Our designated Privacy Officer ensures compliance across all operations.</li>
              <li><strong>Consent:</strong> We obtain express or clear implied consent prior to collecting personal data for commercial communications. You may withdraw consent at any time.</li>
              <li><strong>Anti-Spam (CASL):</strong> We do not send unsolicited commercial electronic messages. Every marketing email includes a one-click unsubscribe mechanism and our physical mailing address.</li>
              <li><strong>Access &amp; Inquiries:</strong> You may request access to, or correction of, personal data held by Grow Orbit by writing to our Privacy Officer at <a href="mailto:support@groworbitofficial.com" className="text-orange-600 hover:underline">support@groworbitofficial.com</a>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              7. California &amp; US State Privacy Rights (CCPA / CPRA)
            </h2>
            <p>
              If you are a resident of California or another US state with comprehensive privacy legislation, you have specific statutory rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right to Know:</strong> You may request disclosure of the categories and specific pieces of personal information collected about you in the preceding 12 months.</li>
              <li><strong>Right to Delete:</strong> You have the right to request deletion of personal information we collected directly from you, subject to legal exceptions.</li>
              <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
              <li><strong>No Sale or Sharing for Monetary Value:</strong> Grow Orbit has not sold, rented, or released personal information to third parties for monetary consideration in the preceding 12 months.</li>
              <li><strong>Non-Discrimination:</strong> We will never discriminate against you, deny services, or charge different rates for exercising your statutory privacy rights.</li>
            </ul>
            <p className="text-sm">
              To exercise these rights, submit a verifiable consumer request to <a href="mailto:support@groworbitofficial.com" className="text-orange-600 hover:underline">support@groworbitofficial.com</a>. We respond to verified requests within 45 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              8. European &amp; UK Privacy Rights (GDPR)
            </h2>
            <p>
              For visitors located in the European Economic Area (EEA) or the United Kingdom, our legal bases for processing personal information include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contractual Necessity:</strong> Processing required to prepare proposals, audits, or perform our management service agreements.</li>
              <li><strong>Legitimate Interests:</strong> Running and improving our website, optimizing advertising performance, preventing fraud, and responding to business inquiries.</li>
              <li><strong>Consent:</strong> When you voluntarily opt in to cookie tracking or marketing newsletters.</li>
            </ul>
            <p className="text-sm">
              Under GDPR Articles 15 through 22, you hold the rights to access, rectification, erasure, restriction of processing, data portability, and objection. You also have the right to lodge a complaint with your local Data Protection Authority.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              9. Data Retention &amp; International Transfers
            </h2>
            <p>
              We retain personal information only as long as necessary to fulfill the purposes for which it was collected, resolve disputes, and comply with tax and statutory accounting regulations. 
              Lead inquiries and audit submissions that do not convert into active client engagements are securely purged within 24 months.
            </p>
            <p>
              Our website infrastructure and cloud databases are hosted in Canada and the United States. If you access our services from the European Union, United Kingdom, or other regions, your data may be transferred to and processed in jurisdictions that may have different data protection laws. We implement standard contractual safeguards to ensure adequate data protection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              10. Data Security
            </h2>
            <p>
              We implement industry-standard organizational and technical security measures to protect your personal information, including SSL/TLS encryption for all data in transit, firewalled database storage, restricted least-privilege employee access, and regular infrastructure reviews. However, no electronic transmission over the internet can be guaranteed 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              11. Children&apos;s Privacy
            </h2>
            <p>
              Our website, resources, and services are directed exclusively to business professionals and individuals aged 18 and older. We do not knowingly collect personal information from individuals under the age of 18. If you believe a minor has submitted personal information to our site, please contact us immediately for prompt deletion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              12. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our operational practices, advertising technologies, or applicable legal standards. When updates occur, we will revise the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100">
            <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              13. Contact Our Privacy Officer
            </h2>
            <p>If you have questions, feedback, or wish to exercise your data rights, please contact our designated Privacy Officer:</p>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 text-zinc-800 text-sm space-y-1">
              <p className="font-bold text-zinc-950">Grow Orbit &middot; Privacy Officer</p>
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
