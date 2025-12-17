"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

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

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      date: "",
      time: "",
      service: "",
      notes: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      toast({
        title: "Appointment Requested",
        description:
          "Our team will contact you shortly to confirm your booking.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="py-24 bg-neutral-950">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
           <div className="relative w-full h-[520px] lg:h-[640px]">
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary opacity-40 z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary opacity-40 z-10" />

            <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/images/man_in_burgundy_kaftan_suit.png"
              alt="Bespoke Consultation"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="font-serif text-3xl leading-tight">
                Bespoke <br /> Experience
              </h3>
            </div>
          </div>
        </div>

          {/* Form Column */}
          <div className="max-w-xl w-full mx-auto">
            <span className="text-primary text-sm uppercase tracking-[0.3em] mb-3 block">
              Private Appointment
            </span>

            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Book a Consultation
            </h2>

            <p className="text-neutral-400 font-light mb-10">
              Schedule a private session with our master tailors for
              measurements, fittings, and personalized styling.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs tracking-widest text-neutral-400">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            className="rounded-none h-12 bg-neutral-900 border-neutral-700 text-white"
                          />
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
                        <FormLabel className="uppercase text-xs tracking-widest text-neutral-400">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            className="rounded-none h-12 bg-neutral-900 border-neutral-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs tracking-widest text-neutral-400">
                          Preferred Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            required
                            className="rounded-none h-12 bg-neutral-900 border-neutral-700 text-white [color-scheme:dark]"
                          />
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
                        <FormLabel className="uppercase text-xs tracking-widest text-neutral-400">
                          Preferred Time
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="rounded-none h-12 bg-neutral-900 border-neutral-700 text-white">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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
                      <FormLabel className="uppercase text-xs tracking-widest text-neutral-400 mb-3 block">
                        Service Type
                      </FormLabel>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {["Measurement", "Fitting", "Consultation"].map(
                          (type) => (
                            <label
                              key={type}
                              className={`border px-4 py-3 text-center cursor-pointer transition-all ${
                                field.value === type
                                  ? "border-primary text-primary font-semibold"
                                  : "border-neutral-700 text-neutral-400 hover:border-primary"
                              }`}
                            >
                              <input
                                type="radio"
                                value={type}
                                checked={field.value === type}
                                onChange={field.onChange}
                                className="sr-only"
                              />
                              <span className="text-xs uppercase tracking-widest">
                                {type}
                              </span>
                            </label>
                          )
                        )}
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
                      <FormLabel className="uppercase text-xs tracking-widest text-neutral-400">
                        Additional Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          className="rounded-none bg-neutral-900 border-neutral-700 text-white resize-none"
                          placeholder="Tell us anything we should know ahead of time..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 rounded-none bg-primary text-black uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                  Confirm Appointment
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
