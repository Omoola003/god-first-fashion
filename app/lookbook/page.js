"use client";

import Image from "next/image";

const galleryImages = [
  "/images/lookbook_01.png",
  "/images/lookbook_02.png",
  "/images/lookbook_03.png",
  "/images/lookbook_04.png",
  "/images/lookbook_05.png",
  "/images/lookbook_06.png",
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">

      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lookbook_hero.png"
          alt="Lookbook Editorial Cover"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4">
          <span className="uppercase tracking-[0.4em] text-sm text-neutral-300 block mb-6">
            Fall / Winter 2025
          </span>
          <h1 className="font-serif text-6xl md:text-8xl mb-4">
            Heritage in Motion
          </h1>
          <p className="text-neutral-300 max-w-xl mx-auto font-light">
            An exploration of power, culture, and modern African elegance.
          </p>
        </div>
      </section>

      {/* EDITORIAL STORY 01 */}
      <section className="max-w-6xl mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-serif text-4xl mb-6">
            The Modern Sovereign
          </h2>
          <p className="text-neutral-400 font-light leading-relaxed text-lg mb-8">
            Authority is no longer loud. It is composed, deliberate, and deeply
            rooted in heritage. This chapter redefines traditional regalia for
            the modern leader — sharp silhouettes, restrained ornamentation,
            timeless presence.
          </p>
          <div className="h-px w-24 bg-gold" />
        </div>

        <div className="relative aspect-[3/4]">
          <Image
            src="/images/lookbook_story_01.png"
            alt="The Modern Sovereign"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* EDITORIAL STORY 02 */}
      <section className="max-w-6xl mx-auto px-4 pb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] order-1 md:order-none">
          <Image
            src="/images/lookbook_story_02.png"
            alt="Ceremonial White"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-serif text-4xl mb-6">
            Ceremonial Restraint
          </h2>
          <p className="text-neutral-400 font-light leading-relaxed text-lg mb-8">
            White remains the ultimate symbol of purity and celebration.
            Elevated with disciplined tailoring and subtle detailing, these
            pieces speak softly — yet command attention.
          </p>
          <div className="h-px w-24 bg-gold" />
        </div>
      </section>

      {/* VISUAL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 pb-40">
        <h3 className="text-center font-serif text-3xl mb-16">
          Visual Impressions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] overflow-hidden group bg-neutral-800"
            >
              <Image
                src={src}
                alt={`Lookbook Visual ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
