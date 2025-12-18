import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { collectionsQuery } from "@/lib/queries/queries";

export default async function CollectionsPage() {
  // Fetch the list of all collections from Sanity
  const collections = await sanityClient.fetch(collectionsQuery);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-white/20 selection:text-white">
      {/* BACKGROUND NOISE TEXTURE */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* HEADER */}
      <section className="relative z-10 pt-40 pb-20 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="block text-xs font-sans tracking-[0.2em] text-neutral-500 mb-4 uppercase">
              Est. MMXXIV
            </span>
            <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tight leading-[0.9]">
              The <br /> Archive
            </h1>
          </div>
          <p className="max-w-sm text-neutral-400 font-light leading-relaxed text-sm md:text-base border-l border-white/10 pl-6">
            An anthology of form, culture, and character. Explore the timeless narratives woven into every seam.
          </p>
        </div>
      </section>

      {/* COLLECTIONS LIST */}
      <section className="relative z-10 max-w-7xl mx-auto px-6">
        {collections?.map((collection, index) => (
          <Link
            key={collection._id || collection.slug}
            href={`/collections/${collection.slug}`}
            className="group relative block py-24 md:py-32 border-b border-white/5 last:border-0"
          >
            <div
              className={`flex flex-col gap-12 items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* IMAGE SECTION */}
              <div className="w-full md:w-1/2 relative">
                <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-neutral-900 w-full md:w-[90%] mx-auto shadow-2xl">
                  {/* Overlay for depth */}
                  <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-700 group-hover:opacity-0" />

                  {collection.heroImage ? (
                    <Image
                      src={urlFor(collection.heroImage).url()}
                      alt={collection.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800" />
                  )}

                  {/* Floating Tag */}
                  <div className="absolute top-6 left-6 z-20 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-white">
                      {collection.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* TEXT SECTION */}
              <div className="w-full md:w-1/2 flex flex-col justify-center relative px-4 md:px-12">
                {/* Large Background Number Watermark */}
                <span className="absolute -top-20 md:-top-16 left-0 md:-left-4 text-[12rem] font-serif text-white/[0.02] select-none pointer-events-none leading-none z-0">
                  0{index + 1}
                </span>

                <div className="relative z-10">
                  <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {collection.name}
                  </h2>

                  <div className="h-px w-12 bg-neutral-600 mb-8 group-hover:w-24 group-hover:bg-white transition-all duration-700" />

                  <p className="text-neutral-400 font-light leading-loose mb-8 max-w-md text-sm md:text-base">
                    {collection.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <span className="text-white text-lg font-medium">
                      {collection.priceRange}
                    </span>

                    {/* Animated Button UI */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors duration-300">
                      <span>Explore Collection</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                          strokeWidth="1"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="py-24 text-center border-t border-white/10">
        <p className="font-serif italic text-neutral-500 text-2xl">
          "Elegance is not standing out, but being remembered."
        </p>
      </section>
    </div>
  );
}