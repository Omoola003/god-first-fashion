"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="pt-20 bg-neutral-900 min-h-screen">

      {/* Header */}
      <div className="py-20 bg-neutral-800 text-center px-4">
        <h1 className="font-serif text-5xl text-white mb-4">Our Heritage</h1>
        <p className="text-gold uppercase tracking-widest text-sm">
          Luxury • Elegance • Timeless
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-24">

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl text-white mb-6">The GodFirst Legacy</h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Founded on the principles of integrity and excellence, GodFirst Fashion was born from a desire to merge the regal traditions of African aesthetics with the sharp, disciplined tailoring of English sartorial art.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              We believe that clothing is a language. It speaks before you do. Our mission is to ensure that every man who wears our brand speaks with authority, class, and understated elegance.
            </p>
          </div>
          <div className="relative">
            <div className="absolute top-4 left-4 w-full h-full border border-gold rounded-sm z-0"></div>
                <Image
                  src="/images/founder_portrait.png"
                  alt="Founder Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
          </div>
        </div>

        {/* Corporate Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1 relative">
                <Image
                  src="/images/corporate_uniforms.png"
                  alt="Corporate Services"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl text-white mb-6">Corporate Excellence</h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Beyond individual luxury, we extend our craftsmanship to the corporate world. We design and produce premium uniforms for high-end restaurants, 5-star hotels, and multinational companies.
            </p>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3"></span>
                Custom Brand Identity Integration
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3"></span>
                Durable, High-Quality Fabrics
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3"></span>
                Scalable Production for Large Teams
              </li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="text-center py-12 border-y border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="font-serif text-xl text-gold mb-3">Evergreen</h3>
              <p className="text-neutral-500 text-sm">Styles that transcend seasons and trends.</p>
            </div>
            <div className="p-6 border-l-0 md:border-l border-r-0 md:border-r border-white/5">
              <h3 className="font-serif text-xl text-gold mb-3">Precision</h3>
              <p className="text-neutral-500 text-sm">Every stitch is calculated for the perfect fit.</p>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl text-gold mb-3">Distinction</h3>
              <p className="text-neutral-500 text-sm">Stand out with a unique blend of cultures.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
