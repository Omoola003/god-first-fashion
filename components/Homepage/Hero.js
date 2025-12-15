"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-12">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/african_man_in_emerald_agbada_fashion_shot.png"
          alt="African Man in Emerald Agbada"
          fill
          priority
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block text-sm md:text-base uppercase tracking-[0.3em] mb-12 text-accent">
            Bespoke Native Wears
          </span>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Elegance <br /> Redefined
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-200 mb-10 font-light leading-relaxed">
            Crafting the finest African menswear for the modern gentleman.
            Where tradition meets contemporary luxury.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/collections">
              <Button
                size="lg"
                className="rounded-none bg-primary hover:bg-primary/90 text-white min-w-[200px] h-14 uppercase tracking-widest text-xs cursor-pointer"
              >
                View Collections
              </Button>
            </Link>

            <Link href="/book">
              <Button
                variant="outline"
                size="lg"
                className="rounded-none border-white text-white hover:bg-white hover:text-black min-w-[200px] h-14 uppercase tracking-widest text-xs backdrop-blur-sm bg-white/5 cursor-pointer"
              >
                Book Consultation
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
