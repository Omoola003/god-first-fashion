import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { allProductsQuery } from "@/lib/queries/queries";

export default async function ProductsPage({ searchParams }) {
  // In Next.js 15+, searchParams is a promise
  const { collection: collectionSlug } = await searchParams;

  // Fetch products (filtered if collectionSlug exists, otherwise all)
  const products = await sanityClient.fetch(allProductsQuery, { 
    collectionSlug: collectionSlug || null 
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">
      {/* HEADER */}
      <header className="pt-32 pb-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <span className="block text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
            {collectionSlug ? `Collection: ${collectionSlug.replace('-', ' ')}` : "The Full Catalog"}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">
            {collectionSlug ? "Selected Pieces" : "The Boutique"}
          </h1>
          
          {/* Breadcrumb / Back link if filtered */}
          {collectionSlug && (
            <Link href="/collections" className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              ← View All Collections
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
                  href={`/products/${product.slug}`} 
                  key={product.slug} 
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-6">
                    <Image
                      src={urlFor(product.image).width(800).url()}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-serif text-2xl tracking-tight group-hover:text-neutral-300 transition-colors">
                      {product.name}
                    </h2>
                    <span className="text-lg font-light">{product.price}</span>
                  </div>
                  
                  <p className="text-neutral-500 text-sm font-light line-clamp-1 uppercase tracking-widest mb-4">
                    {product.collection?.name || "Ready to Wear"}
                  </p>
                  
                  <div className="h-px w-0 group-hover:w-full bg-white/30 transition-all duration-700" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
              <p className="text-neutral-500 font-serif text-2xl">No pieces found in this selection.</p>
              <Link href="/products" className="text-xs uppercase tracking-widest mt-6 inline-block underline">
                Back to All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}