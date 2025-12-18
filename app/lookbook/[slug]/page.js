import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { lookbookQuery } from "@/lib/queries/queries";

// 1. Build-time path generation for Next.js 16
export async function generateStaticParams() {
  const query = `*[_type == "lookbook" && defined(slug.current)]{ "slug": slug.current }`;
  const lookbooks = await sanityClient.fetch(query);

  return lookbooks.map((s) => ({
    slug: s.slug,
  }));
}

export default async function LookbookDetailPage({ params }) {
  // 2. Await params for Next.js 15/16
  const { slug } = await params;

  // 3. Method 2: Added tag "lookbook" for On-Demand Revalidation
  const lookbook = await sanityClient.fetch(
    lookbookQuery, 
    { slug },
    { next: { tags: ["lookbook"] } }
  );

  if (!lookbook) notFound();

  return (
    <div className="min-h-screen bg-neutral-900 text-white selection:bg-white/20">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {lookbook.coverImage && (
          <Image
            src={urlFor(lookbook.coverImage).width(1600).quality(90).url()}
            alt={lookbook.title || "Lookbook Cover"}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <span className="uppercase tracking-[0.4em] text-sm text-neutral-300 block mb-6">
            Editorial Series
          </span>
          <h1 className="font-serif text-6xl md:text-8xl mb-4 tracking-tight">
            {lookbook.title}
          </h1>
          <p className="text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            {lookbook.description}
          </p>
        </div>
      </section>

      {/* EDITORIAL STORY SECTIONS */}
      {lookbook.images && lookbook.images.length >= 2 && (
        <>
          <section className="max-w-6xl mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-4xl mb-6">The Modern Sovereign</h2>
              <p className="text-neutral-400 font-light leading-relaxed text-lg mb-8">
                Authority is no longer loud. It is composed, deliberate, and deeply
                rooted in heritage. Sharp silhouettes define this chapter.
              </p>
              <div className="h-px w-24 bg-white/20" />
            </div>
            <div className="relative aspect-[3/4] order-1 md:order-2 shadow-2xl">
              <Image
                src={urlFor(lookbook.images[0]).width(1000).url()}
                alt="Editorial Shot 1"
                fill
                className="object-cover"
              />
            </div>
          </section>
        </>
      )}

      {/* VISUAL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 pb-40">
        <h3 className="text-center font-serif text-3xl mb-16 uppercase tracking-widest">
          Visual Impressions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {lookbook.images?.map((img, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden group bg-neutral-800 shadow-lg">
              <Image
                src={urlFor(img).width(800).quality(80).url()}
                alt={`${lookbook.title} ${index}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}