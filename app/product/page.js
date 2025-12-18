import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { allProductsQuery } from "@/lib/queries/queries";

export default async function ProductsPage({ searchParams }) {
  // Await searchParams for Next.js 15/16 compatibility
  const params = await searchParams;
  const collectionSlug = params.collection;

  // Method 2: Added tag "product" to the fetch configuration
  const products = await sanityClient.fetch(
    allProductsQuery, 
    { collectionSlug: collectionSlug || null },
    { next: { tags: ["product"] } } 
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">
      {/* HEADER */}
      <header className="pt-32 pb-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <span className="block text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
            {collectionSlug ? `Collection: ${collectionSlug.replace(/-/g, ' ')}` : "The Full Catalog"}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">
            {collectionSlug ? "Selected Pieces" : "The Boutique"}
          </h1>
          
          {collectionSlug && (
            <Link href="/collections" className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
              <span className="text-lg">←</span> View All Collections
            </Link>
          )}
        </div>
      </header>

      {/* PRODUCT GRID */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {products.map((product) => (
                <Link 
                  href={`/product/${product.slug}`} // Standardized to /product/[slug]
                  key={product.slug} 
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-6 shadow-2xl">
                    <Image
                      src={urlFor(product.image).width(800).quality(85).url()}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-serif text-2xl tracking-tight group-hover:text-neutral-300 transition-colors">
                      {product.name}
                    </h2>
                    <span className="text-lg font-light text-neutral-300">{product.price}</span>
                  </div>
                  
                  <p className="text-neutral-500 text-sm font-light line-clamp-1 uppercase tracking-widest mb-4">
                    {product.collection?.name || "Ready to Wear"}
                  </p>
                  
                  <div className="h-px w-0 group-hover:w-full bg-white/20 transition-all duration-700" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
              <p className="text-neutral-500 font-serif text-2xl">No pieces found in this selection.</p>
              <Link href="/collections" className="text-xs uppercase tracking-widest mt-6 inline-block underline underline-offset-8">
                Back to All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}