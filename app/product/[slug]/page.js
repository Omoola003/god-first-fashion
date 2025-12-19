import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { productBySlugQuery } from "@/lib/queries/queries";
import ProductActions from "@/components/global/ProductActions";

export async function generateStaticParams() {
  const query = `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`;
  const products = await sanityClient.fetch(query);
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await sanityClient.fetch(
    productBySlugQuery, 
    { slug },
    { next: { tags: ["product"] } }
  );

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-white/20">
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* BREADCRUMB */}
        <nav className="mb-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-neutral-600">
          <Link href="/product" className="hover:text-white transition-colors">Archive</Link>
          <span className="opacity-30">/</span>
          {product.collection ? (
            <Link href={`/collections/${product.collection.slug}`} className="hover:text-white transition-colors">
              {product.collection.name}
            </Link>
          ) : (
            <span>Bespoke Piece</span>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32 items-start">
          
          {/* IMAGE SECTION */}
          <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden shadow-2xl">
            {product.image ? (
              <Image
                src={urlFor(product.image).width(1200).quality(100).url()}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-[2000ms] hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-800 italic uppercase tracking-widest text-xs">
                Visualizing Craft...
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
          </div>

          {/* INFO SECTION */}
          <div className="flex flex-col pt-4">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mb-6 tracking-tight italic">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-8 mb-12">
              <span className="text-2xl font-light text-white tracking-widest uppercase">
                {product.price}
              </span>
              <div className="h-px w-16 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 italic">
                Handcrafted to Order
              </span>
            </div>

            <div className="space-y-10 mb-16">
              <div className="max-w-md">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-bold">The Narrative</h3>
                <p className="text-neutral-400 font-light leading-loose text-base md:text-lg italic">
                  {product.description}
                </p>
              </div>

              {/* ATELIER SPECS */}
              <div className="grid grid-cols-2 gap-12 py-10 border-y border-white/5">
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 mb-3">Material Grade</h4>
                  <p className="text-xs text-neutral-300 uppercase tracking-widest">Master Selection Fabrics</p>
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 mb-3">Construction</h4>
                  <p className="text-xs text-neutral-300 uppercase tracking-widest">Artisanal Hand-finish</p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (CLIENT COMPONENT) */}
            <ProductActions product={product} />

            <div className="mt-10 space-y-2">
              <p className="text-[9px] text-neutral-600 uppercase tracking-[0.3em] leading-relaxed">
                * As a GodFirst bespoke piece, production is limited.
              </p>
              <p className="text-[9px] text-neutral-600 uppercase tracking-[0.3em] leading-relaxed">
                * Standard atelier timeline: 14—21 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="bg-neutral-900/30 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] mb-6 block">Beyond the Garment</span>
          <h2 className="font-serif text-4xl text-white mb-8 italic">The Complete Vision</h2>
          <Link 
            href="/collections"
            className="inline-block text-[10px] uppercase tracking-[0.4em] text-white border-b border-primary pb-2 hover:text-primary transition-all"
          >
            Explore the Series Archive
          </Link>
        </div>
      </section>
    </div>
  );
}