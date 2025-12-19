"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react"; // Added icons

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function ConsultationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New Success State

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

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/atelier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          type: values.service, 
          message: `BOOKING REQUEST:\nRequested Date: ${values.date}\nRequested Time: ${values.time}\nWhatsApp/Phone: ${values.phone}\nNotes: ${values.notes}`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Submission failed");

      // Trigger Success State
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Request Received",
        description: "Your consultation slot has been reserved.",
      });

    } catch (error) {
      toast({
        title: "Submission Error",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-24 bg-neutral-950">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <div className="relative w-full h-[520px] lg:h-[640px]">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary opacity-40 z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary opacity-40 z-10" />
            <div className="relative w-full h-full overflow-hidden shadow-2xl">
              <Image
                src="/images/man_in_burgundy_kaftan_suit.png"
                alt="Bespoke Consultation"
                fill
                priority
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="font-serif text-3xl leading-tight tracking-wide">
                  Bespoke <br /> Experience
                </h3>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="max-w-xl w-full mx-auto min-h-[500px] flex flex-col justify-center">
            {isSuccess ? (
              /* SUCCESS MESSAGE VIEW */
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mb-8">
                  <CheckCircle2 className="text-primary w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  Request Received
                </h2>
                <p className="text-neutral-400 font-light mb-8 leading-relaxed text-lg">
                  Thank you for reaching out. Your request for a <span className="text-white font-medium">{form.getValues("service")}</span> has been logged. 
                  Our concierge will contact you shortly via WhatsApp or Email to confirm your preferred slot.
                </p>
                <div className="space-y-4">
                    <Button 
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="rounded-none border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 px-8"
                    >
                        Book another appointment
                    </Button>
                </div>
              </div>
            ) : (
              /* FORM VIEW */
              <>
                <span className="text-primary text-sm uppercase tracking-[0.3em] mb-3 block">
                  Private Appointment
                </span>

                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  Book a Consultation
                </h2>

                <p className="text-neutral-400 font-light mb-10 leading-relaxed">
                  Schedule a private session with our master tailors for
                  measurements, fittings, and personalized styling.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* ... (Your existing form fields: Name Row, Contact Row, etc) ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">First Name</FormLabel>
                            <FormControl>
                              <Input {...field} required className="rounded-none h-12 bg-neutral-900 border-neutral-800 text-white focus:border-primary transition-colors" />
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
                              <Input {...field} required className="rounded-none h-12 bg-neutral-900 border-neutral-800 text-white focus:border-primary transition-colors" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} required placeholder="client@example.com" className="rounded-none h-12 bg-neutral-900 border-neutral-800 text-white focus:border-primary transition-colors" />
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
                              <Input type="tel" {...field} required placeholder="+234..." className="rounded-none h-12 bg-neutral-900 border-neutral-800 text-white focus:border-primary transition-colors" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Preferred Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} required className="rounded-none h-12 bg-neutral-900 border-neutral-800 text-white [color-scheme:dark]" />
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
                                <SelectTrigger className="rounded-none h-12 bg-neutral-900 border-neutral-800 text-white">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
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
                                    : "border-neutral-800 text-neutral-500 hover:border-neutral-600"
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

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-widest text-neutral-500">Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} className="rounded-none bg-neutral-900 border-neutral-800 text-white resize-none focus:border-primary" placeholder="Specific requirements or preferences..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-none bg-primary text-black uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white hover:text-black transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={14} /> Processing
                        </span>
                      ) : "Confirm Appointment"}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}