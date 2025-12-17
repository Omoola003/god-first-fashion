"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">

      {/* HEADER */}
      <section className="pt-32 pb-24 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl mb-6">
          The Concierge
        </h1>
        <p className="text-neutral-400 font-light leading-relaxed">
          Every GodFirst piece begins with a conversation.  
          Whether bespoke, ceremonial, or corporate — our team is available
          to guide you with discretion and precision.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 pb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* CONTACT DETAILS */}
        <div className="space-y-14">
          <div>
            <h2 className="font-serif text-3xl mb-4">Atelier & Contact</h2>
            <p className="text-neutral-400 font-light max-w-md">
              Visits are by appointment only.  
              Kindly reach out through our concierge channels.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="p-3 border border-white/10 text-gold">
                <MapPin size={20} />
              </div>
              <div>
                <p className="uppercase tracking-widest text-xs text-neutral-400 mb-1">
                  Atelier
                </p>
                <p className="font-light">
                  Victoria Island, Lagos<br />
                  Nigeria
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-3 border border-white/10 text-gold">
                <Phone size={20} />
              </div>
              <div>
                <p className="uppercase tracking-widest text-xs text-neutral-400 mb-1">
                  Telephone
                </p>
                <p className="font-light">
                  +234 800 GOD FIRST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-3 border border-white/10 text-gold">
                <Mail size={20} />
              </div>
              <div>
                <p className="uppercase tracking-widest text-xs text-neutral-400 mb-1">
                  Email
                </p>
                <p className="font-light">
                  concierge@godfirstfashion.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="border border-white/5 p-10 lg:p-14 bg-neutral-800">
          <h3 className="font-serif text-2xl mb-8">
            Begin a Conversation
          </h3>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent border-b border-white/20 py-3 text-sm placeholder:text-neutral-500 focus:border-gold focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-b border-white/20 py-3 text-sm placeholder:text-neutral-500 focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <select
              className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-neutral-400 focus:border-gold focus:outline-none transition-colors"
            >
              <option>Private Consultation</option>
              <option>Wedding & Ceremonial</option>
              <option>Corporate Engagement</option>
              <option>General Inquiry</option>
            </select>

            <textarea
              rows={4}
              placeholder="Tell us briefly about your request"
              className="w-full bg-transparent border-b border-white/20 py-3 text-sm placeholder:text-neutral-500 focus:border-gold focus:outline-none transition-colors"
            />

            <button
              type="submit"
              className="w-full border border-gold text-gold py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-black transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
