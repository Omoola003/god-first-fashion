"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "The African Native Elegance",
    image: "/images/man_in_gold_agbada.png",
    description: "African Traditional elegance embodied with modern class and sophistication.",
    href: "/collections",
  },
  {
    id: 2,
    title: "Bespoke Suits & Foreign Heritage",
    image: "/images/man_in_white_agbada.png",
    description: "Tailored English suits fused with rich Native aesthetics for the discerning gentleman.",
    href: "/collections",
  },
  {
    id: 3,
    title: "The Corporate Maestro",
    image: "/images/man_in_burgundy_kaftan_suit.png",
    description: "Sharp, bespoke tailoring for corporate mastery.",
    href: "/collections",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-lg">
            <span className="text-primary text-sm uppercase tracking-widest font-medium mb-2 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Latest Collections
            </h2>
          </div>
          <Link href="/collections">
            <Button
              variant="link"
              className="text-foreground hover:text-primary group mt-4 md:mt-0 p-0 flex items-center cursor-pointer"
            >
              View All Works
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map(({ id, title, image, description, href }) => (
            <Link key={id} href={href} className="group relative cursor-pointer overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src={image}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100">
                  <h3 className="font-serif text-2xl text-primary mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {title}
                  </h3>
                  <p className="text-white text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {description}
                  </p>
                </div>
                {/* Gradient Title Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 group-hover:opacity-0 transition-opacity">
                  <h3 className="font-serif text-xl text-white">{title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
