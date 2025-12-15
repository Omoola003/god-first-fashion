import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 border-t border-white/10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-white mb-6 block">
              GODFIRST FASHION
            </Link>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Defining modern African luxury through bespoke tailoring and cultural heritage.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg mb-6 text-white">Explore</h4>
            <ul className="space-y-4 text-sm tracking-wide">
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-white transition-colors">Collections</Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-gray-400 hover:text-white transition-colors">Lookbook</Link>
              </li>
              <li>
                <Link href="/book" className="text-gray-400 hover:text-white transition-colors">Book Consultation</Link>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-sm tracking-wide text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>26d, Olowu Street, <br />Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span>+234 802 382 8071</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <span>concierge@godfirst.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 font-light text-sm mb-4">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-gray-600 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors"
              />
              <button className="text-left text-xs uppercase tracking-widest rounded-none text-white hover:text-white transition-colors mt-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 tracking-wider uppercase">
          <p>© 2025 GODFIRST FASHION. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
