import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { allLookbooksQuery } from "@/lib/queries/queries";

export default async function LookbookArchivePage() {
  // Method 2: Added tag "lookbook" for on-demand revalidation
  const lookbooks = await sanityClient.fetch(
    allLookbooksQuery,
    {},
    { next: { tags: ["lookbook"] } }
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white selection:bg-white/20">
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="uppercase tracking-[0.5em] text-xs text-neutral-500 block mb-4">
            Archive
          </span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight">Editorial Series</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 xl:gap-24">
          {lookbooks.map((lb) => (
            <Link href={`/lookbook/${lb.slug}`} key={lb.slug} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800 mb-8 shadow-2xl">
                {lb.coverImage && (
                  <Image
                    src={urlFor(lb.coverImage).width(1200).quality(85).url()}
                    alt={lb.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                )}
                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl group-hover:text-neutral-300 transition-colors">
                  {lb.title}
                </h2>
                <p className="text-neutral-400 font-light line-clamp-2 max-w-md leading-relaxed">
                  {lb.description}
                </p>
                <div className="inline-flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-white transition-all duration-500">
                    View Editorial
                  </span>
                  <svg 
                    className="w-4 h-4 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}