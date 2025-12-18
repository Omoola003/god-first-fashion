import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { allLookbooksQuery } from "@/lib/queries/queries";

export default async function LookbookArchivePage() {
  const lookbooks = await sanityClient.fetch(allLookbooksQuery);

  return (
    <div className="min-h-screen bg-neutral-900 text-white selection:bg-white/20">
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="uppercase tracking-[0.5em] text-xs text-neutral-500 block mb-4">
            Archive
          </span>
          <h1 className="font-serif text-5xl md:text-7xl">Editorial Series</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {lookbooks.map((lb) => (
            <Link href={`/lookbook/${lb.slug}`} key={lb.slug} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800 mb-8">
                {lb.coverImage && (
                  <Image
                    src={urlFor(lb.coverImage).width(1200).url()}
                    alt={lb.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h2 className="font-serif text-3xl mb-2">{lb.title}</h2>
              <p className="text-neutral-400 font-light line-clamp-2 max-w-md">
                {lb.description}
              </p>
              <span className="inline-block mt-4 text-xs uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-white transition-colors">
                View Editorial
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}