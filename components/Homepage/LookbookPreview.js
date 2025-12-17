"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const highlights = [
  { id: 1, image: "/images/man_in_gold_agbada.png", title: "The Royal Senator" },
  { id: 2, image: "/images/man_in_white_agbada.png", title: "Gold Coast Essence" },
  { id: 3, image: "/images/man_in_burgundy_kaftan_suit.png", title: "Burgundy Majesty" },
];

export function LookbookPreview() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN — CONTENT */}
          <div className="flex flex-col text-white lg:order-1 order-2">

            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.3em] text-sm text-amber-500 mb-4"
            >
              The Heritage Series
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif leading-tight mb-6"
            >
              Where Tradition <br /> Meets Modernity
            </motion.h2>

            {/* Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl"
            >
              A refined exploration of contemporary African menswear — shaped by
              heritage, elevated by craftsmanship, and designed for the modern
              gentleman.
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {highlights.map(({ id, image, title }) => (
                <div
                  key={id}
                  className="relative h-40 overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-xs uppercase tracking-widest text-white text-center px-2">
                      {title}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/lookbook">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-none border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black h-14 min-w-[220px] uppercase tracking-widest text-xs"
                >
                  Discover the Series
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — HERO IMAGE */}
          <div className="relative w-full h-[520px] lg:h-[640px] lg:order-2 order-1">
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary opacity-40 z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary opacity-40 z-10" />

            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/editorial_lagos_fashion_fiesta.png"
                alt="Editorial Lookbook"
                fill
                className="object-cover scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
