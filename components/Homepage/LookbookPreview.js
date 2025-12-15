"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LookbookPreview() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/editorial_lagos_fashion_fiesta.png"
          alt="Editorial Lookbook"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto flex flex-col items-center justify-center text-center text-white">
        <span className="uppercase tracking-[0.3em] text-sm mb-4 text-accent">
          Editorial
        </span>
        <h2 className="text-5xl md:text-7xl font-serif mb-8 max-w-4xl mx-auto leading-tight">
          The Lagos Fashion Series <br /> 2025
        </h2>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-200 mb-10 font-light">
          Inspired by the raw beauty of the African landscape. 
          Textures, tones, and silhouettes that tell a story of heritage.
        </p>
        <Link href="/lookbook">
          <Button 
            variant="outline"
            size="lg"
            className="rounded-none border-black text-amber-500 hover:bg-black hover:text-white hover:border-amber-500 h-14 min-w-[200px] uppercase tracking-widest text-xs"
          >
            Explore Lookbook
          </Button>
        </Link>
      </div>
    </section>
  );
}
