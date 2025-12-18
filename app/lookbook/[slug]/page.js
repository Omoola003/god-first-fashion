import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { lookbookQuery } from "@/lib/queries/queries";

// CRUCIAL: Tell Next.js which pages to pre-build
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(`*[_type == "lookbook"]{ "slug": slug.current }`);
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function LookbookDetailPage({ params }) {
  const { slug } = await params;
  const lookbook = await sanityClient.fetch(lookbookQuery, { slug });

  if (!lookbook) notFound();

  return (
    <div className="min-h-screen bg-neutral-900 text-white selection:bg-white/20">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {lookbook.coverImage && (
          <Image
            src={urlFor(lookbook.coverImage).url()}
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
          <h1 className="font-serif text-6xl md:text-8xl mb-4">
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
                rooted in heritage.
              </p>
              <div className="h-px w-24 bg-white/20" />
            </div>
            <div className="relative aspect-[3/4] order-1 md:order-2">
              <Image
                src={urlFor(lookbook.images[0]).url()}
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
        <h3 className="text-center font-serif text-3xl mb-16">Visual Impressions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {lookbook.images?.map((img, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden group bg-neutral-800">
              <Image
                src={urlFor(img).url()}
                alt={`${lookbook.title} ${index}`}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}