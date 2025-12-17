"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    slug: "the-sovereign-line",
    name: "The Sovereign Line",
    category: "Native",
    priceRange: "₦120,000 – ₦350,000",
    image: "/images/collection_sovereign.png",
  },
  {
    slug: "crown-and-creed",
    name: "Crown & Creed",
    category: "Native",
    priceRange: "₦95,000 – ₦220,000",
    image: "/images/collection_creed.png",
  },
  {
    slug: "the-regent-series",
    name: "The Regent Series",
    category: "English",
    priceRange: "₦180,000 – ₦450,000",
    image: "/images/collection_regent.png",
  },
  {
    slug: "the-modern-gentleman",
    name: "The Modern Gentleman",
    category: "English",
    priceRange: "₦150,000 – ₦300,000",
    image: "/images/collection_gentleman.png",
  },
  {
    slug: "the-executive-order",
    name: "The Executive Order",
    category: "Corporate",
    priceRange: "Contract Based",
    image: "/images/collection_executive.png",
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* HERO */}
      <section className="pt-32 pb-24 text-center px-4">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">
          Our Collections
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          Each collection is a disciplined exploration of form, culture,
          and character — expressed through carefully curated designs.
        </p>
      </section>

      {/* COLLECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800 mb-6">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-3xl group-hover:text-gold transition-colors">
                  {collection.name}
                </h3>

                <div className="flex justify-between items-center text-sm uppercase tracking-widest text-neutral-400">
                  <span>{collection.category}</span>
                  <span>{collection.priceRange}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
