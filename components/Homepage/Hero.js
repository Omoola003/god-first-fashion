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
          alt="Men Native Luxury Fashion"
          fill
          priority
          className="w-full h-full object-cover object-top opacity-90"
        />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary tracking-[0.3em] uppercase italic text-sm md:text-base mb-4 animate-fade-in-up">Est. 2024</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Timeless <br /> <span className="text-primary italic">Elegance</span>
          </h1>

          <p className="text-neutral-300 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
            Experience the pinnacle of men&apos;s fashion. Native heritage meets English sophistication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/collections">
              <Button
                size="lg"
                className="rounded-none bg-primary hover:bg-white text-black min-w-[200px] h-14 uppercase tracking-widest text-xs font-bold cursor-pointer"
              >
                View Collections
              </Button>
            </Link>

            <Link href="/booking">
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
