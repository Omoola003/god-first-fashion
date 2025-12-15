"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "The Royal Senator",
    image: "/images/man_in_gold_agbada.png",
    description: "Impeccably tailored navy ensembles for the boardroom and beyond.",
  },
  {
    id: 2,
    title: "Gold Coast Essence",
    image: "/images/man_in_white_agbada.png",
    description: "Crisp white and gold hues reflecting pure opulence and grace.",
  },
  {
    id: 3,
    title: "Burgundy Majesty",
    image: "/images/man_in_burgundy_kaftan_suit.png",
    description: "Deep, rich tones for evening galas and special occasions.",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-background">
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
              className="text-foreground hover:text-primary group mt-4 md:mt-0 p-0 flex items-center"
            >
              View All Works
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map(({ id, title, image, description }) => (
            <div key={id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-6">
                <Image
                  src={image}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
