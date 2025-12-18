import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { collectionBySlugQuery } from "@/lib/queries/queries";

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;

  // Fetch data
  const collection = await sanityClient.fetch(collectionBySlugQuery, { slug });

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-white/20 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        {collection.heroImage && (
          <Image
            // FIX: Added width and quality to prevent TimeoutError
            src={urlFor(collection.heroImage).width(1600).quality(85).url()}
            alt={collection.name}
            fill
            priority
            className="object-cover object-top scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 md:p-12 z-10">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl md:text-8xl text-white tracking-tight leading-tight mb-4">
              {collection.name}
            </h1>
            <span className="block text-sm md:text-base uppercase tracking-[0.2em] text-neutral-400 border-l border-white/20 pl-4">
              A Chapter in {collection.category} Heritage
            </span>
          </div>
        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="relative z-10 py-24 md:py-32 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          <div className="md:col-span-1">
            <h2 className="font-serif text-3xl text-white mb-6">The Essence</h2>
            <div className="h-px w-16 bg-neutral-600 mb-8" />
            <div className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
              Category: <span className="text-white">{collection.category}</span>
            </div>
            <div className="text-sm uppercase tracking-widest text-neutral-500 mb-8">
              Price Range: <span className="text-white">{collection.priceRange}</span>
            </div>
            <Link
              href={`/products?collection=${slug}`}
              className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="md:col-span-2">
            <p className="text-neutral-400 font-light leading-loose text-base md:text-lg">
              {collection.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      {collection.galleryImages && collection.galleryImages.length > 0 && (
        <section className="relative z-10 py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto mb-16">
            <h2 className="font-serif text-4xl text-white mb-4">In Detail</h2>
            <p className="text-neutral-500 max-w-xl">
              A closer look at the craftsmanship defining {collection.name}.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {collection.galleryImages.map((item, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden bg-neutral-900 group">
                <Image
                  // FIX: Using smaller widths for gallery thumbnails
                  src={urlFor(item.image).width(800).quality(80).url()}
                  alt={`${collection.name} detail ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PRODUCT SECTION */}
      {collection.featuredProduct && (
        <section className="relative z-10 py-24 md:py-32 px-6 border-t border-white/5 bg-neutral-950">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 shadow-xl">
                <Image
                  src={urlFor(collection.featuredProduct.image).width(1000).url()}
                  alt={collection.featuredProduct.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-4">Highlight Piece</span>
              <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">
                {collection.featuredProduct.name}
              </h3>
              <p className="text-neutral-400 font-light leading-loose mb-8">
                {collection.featuredProduct.description}
              </p>
              <div className="flex items-center gap-6">
                <span className="text-white text-2xl font-medium">{collection.featuredProduct.price}</span>
                <Link href={`/product/${collection.featuredProduct.slug}`} className="px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-widest hover:bg-white/10">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER NAVIGATION */}
      <footer className="relative z-10 py-16 text-center border-t border-white/5">
        <Link href="/collections" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-all group">
          <svg className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to The Archive
        </Link>
      </footer>
    </div>
  );
}