import React from "react";

export const metadata = {
  title: "Privacy Policy | Grow Orbit",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information at Grow Orbit.",
  alternates: {
    canonical: "https://www.groworbitofficial.com/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#fafafa] text-zinc-900 min-h-screen pt-36 pb-24 px-6">
      <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-zinc-100 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-black mb-8 uppercase text-zinc-950" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Privacy Policy
        </h1>
        <p className="text-zinc-400 text-xs font-mono mb-8">LAST UPDATED: JUNE 24, 2026</p>
        
        <div className="space-y-6 text-zinc-600 text-sm leading-relaxed font-light">
          <p>
            At <strong>Grow Orbit</strong>, accessible from <a href="https://www.groworbitofficial.com" className="text-orange-500 hover:underline">https://www.groworbitofficial.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Grow Orbit and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">1. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <p>
            When you register for an Account or fill out our contact and strategy booking forms, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Improve, personalize, and expand our website and services</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails or SMS messages regarding updates and newsletters (if subscribed)</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">3. Cookies and Web Beacons</h2>
          <p>
            Like any other website, Grow Orbit uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">4. Third-Party Privacy Policies</h2>
          <p>
            Grow Orbit's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 pt-4 uppercase">5. GDPR & CCPA Data Protection Rights</h2>
          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
