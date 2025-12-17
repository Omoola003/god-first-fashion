"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center px-6">

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* TEXT */}
        <div className="space-y-8">
          <p className="uppercase tracking-[0.4em] text-xs text-neutral-400">
            Error 404
          </p>

          <h1 className="font-serif text-5xl md:text-6xl leading-tight">
            This Page<br />Does Not Exist
          </h1>

          <p className="text-neutral-400 font-light leading-relaxed max-w-md">
            Not every door is meant to open. The page you’re looking for may have
            moved, changed, or never existed within our atelier.
          </p>

          <div className="flex items-center gap-6 pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-8 bg-primary text-black uppercase tracking-widest text-xs hover:bg-white transition-colors"
            >
              Return Home
            </Link>

            <Link
              href="/contact"
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative aspect-[3/4] hidden lg:block">
          <Image
            src="/images/editorial_404.png"
            alt="GodFirst Atelier"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

      </div>
    </div>
  );
}
