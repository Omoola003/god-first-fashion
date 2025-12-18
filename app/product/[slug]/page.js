import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { productBySlugQuery } from "@/lib/queries/queries";

// 1. GENERATE STATIC PARAMS: Required for build-time rendering of slug pages
export async function generateStaticParams() {
  const query = `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`;
  const products = await sanityClient.fetch(query);

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }) {
  // 2. Await params for Next.js 15/16
  const { slug } = await params;

  // 3. Method 2: Added tag "product" for On-Demand Revalidation
  const product = await sanityClient.fetch(
    productBySlugQuery, 
    { slug },
    { next: { tags: ["product"] } }
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-white/20">
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* BREADCRUMB */}
        <nav className="mb-12 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <Link href="/products" className="hover:text-white transition-colors">Boutique</Link>
          <span>/</span>
          {product.collection ? (
            <Link href={`/collections/${product.collection.slug}`} className="hover:text-white transition-colors">
              {product.collection.name}
            </Link>
          ) : (
            <span>New Arrival</span>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          
          {/* IMAGE GALLERY */}
          <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden group shadow-2xl">
            {product.image ? (
              <Image
                src={urlFor(product.image).width(1200).quality(90).url()}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-700 italic">
                Image coming soon
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col pt-4">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-10">
              <span className="text-2xl font-medium text-white">
                {product.price}
              </span>
              <div className="h-px w-12 bg-neutral-700" />
              <span className="text-xs uppercase tracking-widest text-neutral-500">
                In Stock
              </span>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-white mb-4">Description</h3>
                <p className="text-neutral-400 font-light leading-loose text-base md:text-lg">
                  {product.description}
                </p>
              </div>

              {/* CRAFT DETAILS */}
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Material</h4>
                  <p className="text-sm text-neutral-300">Premium Fabrics</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Tailoring</h4>
                  <p className="text-sm text-neutral-300">Hand-finished Details</p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-white text-black py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-neutral-200 transition-colors">
                Enquire via WhatsApp
              </button>
              <button className="flex-1 border border-white/20 text-white py-5 text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-colors">
                Add to Wishlist
              </button>
            </div>

            <p className="mt-8 text-[10px] text-neutral-600 uppercase tracking-widest text-center sm:text-left">
              * Each piece is handcrafted. Please allow 14 days for production.
            </p>
          </div>
        </div>
      </section>

      {/* RELATED SECTION PREVIEW */}
      <section className="bg-neutral-900/50 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">The Complete Set</h2>
          <p className="text-neutral-500 text-sm mb-12">Complete your look with curated selections from our latest series.</p>
          <Link 
            href="/collections"
            className="text-xs uppercase tracking-widest text-white border-b border-white/40 pb-2 hover:border-white transition-all"
          >
            Explore the Archive
          </Link>
        </div>
      </section>
    </div>
  );
}