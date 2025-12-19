"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "submitting", message: "" });

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      // Pointing to the unified API we built previously
      const response = await fetch("/api/atelier", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          // Ensuring 'type' exists triggers the "INBOX" branch in our API
          submission_source: "Contact Page" 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setStatus({ state: "success", message: result.success });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* HEADER */}
      <section className="pt-32 pb-24 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl mb-6 text-white tracking-tight">
          The Concierge
        </h1>
        <p className="text-neutral-400 font-light leading-relaxed">
          Every GodFirst piece begins with a conversation. 
          Whether bespoke, ceremonial, or corporate — our team is available 
          to guide you with discretion.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 pb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* CONTACT DETAILS */}
        <div className="space-y-14">
          <div>
            <h2 className="font-serif text-3xl mb-4">Atelier & Contact</h2>
            <p className="text-neutral-400 font-light max-w-md">
              Visits are by appointment only. Kindly reach out through our concierge channels.
            </p>
          </div>
          <div className="space-y-8">
            <ContactMethod icon={<MapPin size={20} />} label="Atelier" detail="26d, Olowu Street, Ikeja, Lagos" />
            <ContactMethod icon={<Phone size={20} />} label="Telephone" detail="+234 802 382 8071" />
            <ContactMethod icon={<Mail size={20} />} label="Email" detail="concierge@godfirstfashion.com.ng" />
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="border border-white/5 p-10 lg:p-14 bg-neutral-800 shadow-2xl relative overflow-hidden">
          {status.state === "success" ? (
            <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="mx-auto text-primary mb-6" size={48} />
              <h3 className="font-serif text-3xl mb-4">Inquiry Received</h3>
              <p className="text-neutral-400 font-light">{status.message}</p>
              <button 
                onClick={() => setStatus({ state: "idle", message: "" })}
                className="mt-8 text-xs uppercase tracking-widest text-primary underline underline-offset-8 transition-opacity hover:opacity-70"
              >
                Send another request
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-2xl mb-8">Begin a Conversation</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput name="name" type="text" placeholder="Full Name" required />
                  <FormInput name="email" type="email" placeholder="Email Address" required />
                </div>

                <div className="relative border-b border-white/20">
                  <select
                    name="type"
                    required
                    defaultValue="" // Set the initial value here
                    className="w-full bg-transparent py-3 text-sm text-neutral-400 focus:text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {/* Removed 'selected' attribute from the option below */}
                    <option value="" disabled className="bg-neutral-800">Select Inquiry Type</option>
                    <option value="Private Consultation" className="bg-neutral-800">Private Consultation</option>
                    <option value="Wedding & Ceremonial" className="bg-neutral-800">Wedding & Ceremonial</option>
                    <option value="Corporate Engagement" className="bg-neutral-800">Corporate Engagement</option>
                    <option value="General Inquiry" className="bg-neutral-800">General Inquiry</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us briefly about your request"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm placeholder:text-neutral-500 focus:border-primary focus:outline-none transition-colors resize-none"
                  required
                />

                {status.state === "error" && (
                  <p className="text-red-400 text-xs italic animate-pulse">{status.message}</p>
                )}

                <button
                  type="submit"
                  disabled={status.state === "submitting"}
                  className="w-full border border-primary text-primary py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status.state === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

/** * UI HELPER COMPONENTS
 */
function ContactMethod({ icon, label, detail }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="p-3 border border-white/10 text-primary group-hover:border-primary/50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="uppercase tracking-[0.2em] text-[10px] text-neutral-500 mb-1">{label}</p>
        <p className="font-light text-neutral-200">{detail}</p>
      </div>
    </div>
  );
}

function FormInput({ ...props }) {
  return (
    <input
      {...props}
      className="w-full bg-transparent border-b border-white/20 py-3 text-sm placeholder:text-neutral-500 focus:border-primary focus:outline-none transition-colors"
    />
  );
}