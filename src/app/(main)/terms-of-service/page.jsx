import React from "react";

export const metadata = {
  title: "Terms of Service & User Conditions | Grow Orbit",
  description: "Read our terms of service and conditions governing your use of the Grow Orbit website and FBA marketing services.",
  alternates: {
    canonical: "https://www.groworbitofficial.com/terms-of-service/",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen pt-36 pb-24 px-6">
      <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-zinc-100 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-black mb-8 uppercase text-zinc-950" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Terms of Service
        </h1>
        <p className="text-zinc-400 text-xs font-mono mb-8">LAST UPDATED: JUNE 24, 2026</p>
        
        <div className="space-y-6 text-zinc-600 text-sm leading-relaxed font-light">
          <p>
            Welcome to <strong>Grow Orbit</strong>. These Terms of Service outline the rules and regulations for the use of Grow Orbit's Website, located at <a href="https://www.groworbitofficial.com" className="text-orange-500 hover:underline">https://www.groworbitofficial.com</a>.
          </p>
          <p>
            By accessing this website, we assume you accept these terms of service in full. Do not continue to use Grow Orbit's website if you do not agree to accept all of the terms of service stated on this page.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">1. Terminology</h2>
          <p>
            The following terminology applies to these Terms of Service, Privacy Statement and Disclaimer Notice, and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms of service. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">2. License & Intellectual Property</h2>
          <p>
            Unless otherwise stated, Grow Orbit and/or its licensors own the intellectual property rights for all material on Grow Orbit. All intellectual property rights are reserved. You may access this from Grow Orbit for your own personal use subjected to restrictions set in these terms of service.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Republish material from Grow Orbit</li>
            <li>Sell, rent or sub-license material from Grow Orbit</li>
            <li>Reproduce, duplicate or copy material from Grow Orbit</li>
            <li>Redistribute content from Grow Orbit</li>
          </ul>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">3. Hyperlinking to our Content</h2>
          <p>
            The following organizations may link to our Website without prior written approval: Government agencies, search engines, news organizations, online directory distributors when they list us in the directory, and systemwide accredited businesses.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">4. Reservation of Rights</h2>
          <p>
            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms of service and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms of service.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">5. Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Limit or exclude our or your liability for death or personal injury;</li>
            <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
