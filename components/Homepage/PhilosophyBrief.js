"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PhilosophyBrief() {
  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Image */}
        <div className="relative w-full h-[500px] md:h-[600px]">
          {/* Decorative corners */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary opacity-50 z-10"></div>

          <Image
            src="/images/main_in_agbada.png"
            alt="Bespoke Consultation"
            fill
            style={{ objectFit: "cover" }}
            className="grayscale-0 hover:grayscale transition-all duration-700"
            priority
          />

          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary opacity-50 z-10"></div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-primary text-sm tracking-widest uppercase mb-2">
            The Philosophy
          </h2>
          <h3 className="font-serif text-4xl text-white mb-6">GodFirst Fashion</h3>
          <p className="text-neutral-400 leading-relaxed mb-6 font-light">
            We believe fashion is more than just clothing; it is a statement of character. Our brand stands on the pillars of luxury, elegance, and timelessness. Whether it is the sharp lines of an English suit or the regal flow of Native attire, we ensure you stand out.
          </p>

          {/* Link Button */}
          <Link
            href="/about"
            className="group flex items-center text-white text-sm uppercase tracking-widest hover:text-primary transition-colors"
          >
            Read Our Story{" "}
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
