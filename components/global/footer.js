"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import TikTokIcon from "@/public/icons/TikTokIcon";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-white pt-28 pb-12 border-t border-white/10"
    >
      <div className="container mx-auto px-4">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

          {/* BRAND */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-serif text-3xl tracking-[0.35em] block mb-6"
            >
              GODFIRST
            </Link>

            <p className="text-gray-400 font-light leading-relaxed max-w-sm mb-8">
              Defining luxury and elegance in every stitch. Timeless menswear
              crafted for the modern gentleman.
            </p>

            <p className="text-xs uppercase tracking-widest text-amber-500 mb-10">
              By Appointment Only
            </p>

            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-500 hover:text-amber-500 transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-amber-500 transition-colors">
                <TikTokIcon size={18} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-amber-500 transition-colors">
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="md:col-span-2">
            <h4 className="uppercase tracking-widest text-xs text-gray-300 mb-8">
              Explore
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/collections" className="block hover:text-amber-500 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="block hover:text-amber-500 transition-colors">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/book" className="block hover:text-amber-500 transition-colors">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/about" className="block hover:text-amber-500 transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-3">
            <h4 className="uppercase tracking-widest text-xs text-gray-300 mb-8">
              Atelier
            </h4>

            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin size={16} />
                <span>
                  26D Olowu Street<br />Lagos, Nigeria
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} />
                <span>+234 802 382 8071</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} />
                <span>concierge@godfirst.com</span>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="md:col-span-3">
            <h4 className="uppercase tracking-widest text-xs text-gray-300 mb-8">
              Private Circle
            </h4>
            <p className="text-gray-400 text-sm font-light mb-6 max-w-sm">
              Early access to collections, editorials, and bespoke offers.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-white/20 py-3 pr-20 text-sm placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-amber-500 hover:text-white transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs tracking-widest uppercase text-gray-500">
          <p>© 2025 Godfirst Fashion House</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
