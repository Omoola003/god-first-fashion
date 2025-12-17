"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";

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

  const onSubmit = (data) => {
    console.log("Consultation Request:", data);
    // later: send to API / email / CRM
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">

      {/* HEADER */}
      <section className="pt-32 pb-24 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl mb-6">
          Private Consultation
        </h1>
        <p className="text-neutral-400 font-light leading-relaxed">
          Every GodFirst garment is born from intention, precision, and dialogue.
          Request a private consultation with our atelier to begin your bespoke journey.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 pb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* IMAGE */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src="/images/atelier_measurement.png"
            alt="Bespoke Measurement"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-10 left-10">
            <p className="uppercase tracking-widest text-xs text-neutral-300 mb-2">
              By Appointment Only
            </p>
            <h2 className="font-serif text-3xl">
              The Bespoke Experience
            </h2>
          </div>
        </div>

        {/* FORM */}
        <div className="border border-white/5 bg-neutral-800 p-10 lg:p-14">
          <h3 className="font-serif text-2xl mb-8">
            Request a Consultation
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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

              {/* Service */}
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs tracking-widest text-neutral-400 mb-3 block">
                      Service Type
                    </FormLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["Measurement", "Fitting", "Consultation"].map((type) => (
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
                className="w-full h-14 rounded-none bg-primary text-black uppercase tracking-widest text-xs hover:bg-white transition-colors"
              >
                Submit Request
              </Button>

            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}
