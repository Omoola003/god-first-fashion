"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="pt-20 bg-neutral-900 min-h-screen">

      {/* Header */}
      <header className="py-20 bg-neutral-800 text-center px-4">
        <h1 className="font-serif text-5xl text-white mb-4">
          Our Heritage
        </h1>
        <p className="text-primary uppercase tracking-widest text-sm">
          Luxury • Elegance • Timeless
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 space-y-24">

        {/* Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="font-serif text-3xl text-white mb-6">
              The GodFirst Legacy
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Founded on the principles of integrity and excellence, GodFirst Fashion
              was born from a desire to merge the regal traditions of African aesthetics
              with the sharp, disciplined tailoring of English sartorial art.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              We believe that clothing is a language. It speaks before you do.
              Our mission is to ensure that every man who wears our brand speaks
              with authority, class, and understated elegance.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[520px] group">
            {/* Decorative frame */}
            <div className="absolute top-4 left-4 w-full h-full border border-primary z-0" />

            <Image
              src="/images/founder_portrait.png"
              alt="Founder Portrait"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        </section>

        {/* Corporate Services */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image — LEFT */}
          <div className="relative h-[420px] group">
            <Image
              src="/images/god_first_showroom.png"
              alt="Corporate Services"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>

          {/* Text — RIGHT */}
          <div>
            <h2 className="font-serif text-3xl text-white mb-6">
              Corporate Excellence
            </h2>

            <p className="text-neutral-400 leading-relaxed mb-6">
              Beyond individual luxury, we extend our craftsmanship to the corporate world.
              We design and produce premium uniforms for high-end restaurants,
              five-star hotels, and multinational companies.
            </p>

            <ul className="space-y-3 text-neutral-300">
              {[
                "Custom Brand Identity Integration",
                "Durable, High-Quality Fabrics",
                "Scalable Production for Large Teams",
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

      </main>
    </div>
  );
}
