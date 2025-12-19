"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2 } from "lucide-react";

// shadcn/ui imports
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function BookPage() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "Consultation",
      notes: "",
    },
  });

  const onSubmit = async (data) => {
    setStatus({ state: "submitting", message: "" });

    try {
      const response = await fetch("/api/atelier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: data.service, 
          // We combine contact details into the message for redundancy
          message: `Booking Request for ${data.date} at ${data.time}.\nWhatsApp/Phone: ${data.phone}\nNotes: ${data.notes}`,
          submission_source: "Private Consultation Page"
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Booking failed");

      setStatus({ state: "success", message: result.success });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* HEADER */}
      <section className="pt-32 pb-24 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl mb-6 tracking-tight">Private Consultation</h1>
        <p className="text-neutral-400 font-light leading-relaxed">
          Every GodFirst garment is born from intention, precision, and dialogue.
          Request a private consultation with our atelier to begin your bespoke journey.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 pb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* IMAGE SECTION */}
        <div className="relative aspect-[3/4] overflow-hidden group shadow-2xl border border-white/5">
          <Image
            src="/images/atelier_measurement.png"
            alt="Bespoke Measurement"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-10 left-10">
            <p className="uppercase tracking-[0.3em] text-[10px] text-neutral-300 mb-2">
              By Appointment Only
            </p>
            <h2 className="font-serif text-3xl">The Bespoke Experience</h2>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="border border-white/5 bg-neutral-800 p-8 lg:p-12 relative overflow-hidden">
          {status.state === "success" ? (
            <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="mx-auto text-primary mb-6" size={48} />
              <h3 className="font-serif text-3xl mb-4">Request Sent</h3>
              <p className="text-neutral-400 font-light max-w-xs mx-auto">{status.message}</p>
              <Button 
                variant="link" 
                onClick={() => setStatus({ state: "idle", message: "" })}
                className="mt-8 text-primary uppercase tracking-widest text-[10px]"
              >
                Book another session
              </Button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-2xl mb-8 text-neutral-100">Request a Consultation</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">First Name</FormLabel>
                          <FormControl>
                            <Input {...field} required className="rounded-none h-12 bg-neutral-900 border-neutral-700 focus-visible:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} required className="rounded-none h-12 bg-neutral-900 border-neutral-700 focus-visible:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} required className="rounded-none h-12 bg-neutral-900 border-neutral-700 focus-visible:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Phone / WhatsApp</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} required placeholder="+234..." className="rounded-none h-12 bg-neutral-900 border-neutral-700 focus-visible:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} required className="rounded-none h-12 bg-neutral-900 border-neutral-700 [color-scheme:dark]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Preferred Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none h-12 bg-neutral-900 border-neutral-700">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                              <SelectItem value="10am">10:00 AM</SelectItem>
                              <SelectItem value="12pm">12:00 PM</SelectItem>
                              <SelectItem value="2pm">02:00 PM</SelectItem>
                              <SelectItem value="4pm">04:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Service Type */}
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500 mb-3 block">Service Type</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {["Measurement", "Fitting", "Consultation"].map((type) => (
                            <label
                              key={type}
                              className={`border px-4 py-3 text-center cursor-pointer transition-all duration-300 ${
                                field.value === type
                                  ? "border-primary text-primary bg-primary/5"
                                  : "border-neutral-700 text-neutral-500 hover:border-neutral-500"
                              }`}
                            >
                              <input type="radio" value={type} checked={field.value === type} onChange={() => field.onChange(type)} className="sr-only" />
                              <span className="text-[10px] uppercase tracking-widest font-medium">{type}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Notes */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} className="rounded-none bg-neutral-900 border-neutral-700 resize-none focus-visible:ring-primary" placeholder="Details about your bespoke request..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {status.state === "error" && (
                    <p className="text-red-400 text-[10px] italic">{status.message}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status.state === "submitting"}
                    className="w-full h-14 rounded-none bg-primary text-black uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {status.state === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={14} /> Processing
                      </span>
                    ) : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}