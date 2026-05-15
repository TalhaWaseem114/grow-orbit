"use client";

// Results.jsx
import React from "react";

const metrics = [
  { label: "Listings Optimized", value: "1,200+" },
  { label: "Brands Scaled", value: "80+" },
  { label: "Monthly Ad Spend", value: "$500K+" },
  { label: "Revenue Managed", value: "$12M+" },
];

export default function Results() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
            Proven Results for Brands Like Yours
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We help brands launch, optimize, and grow on Amazon with measurable outcomes.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          {metrics.map((metric, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{metric.value}</div>
              <div className="text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
