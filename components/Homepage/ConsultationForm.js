"use client";

import React from "react";
import { useForm } from "react-hook-form";
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
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to submit consultation");

      toast({
        title: "Request Sent",
        description: "We will contact you shortly to confirm your consultation.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[800px] overflow-hidden hidden lg:block">
            <img
              src="/images/man_in_burgundy_kaftan_suit.png"
              alt="Consultation"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-lg mx-auto w-full">
            <span className="text-primary text-sm uppercase tracking-widest font-medium mb-2 block">
              Bespoke Service
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Book a Consultation
            </h2>
            <p className="text-muted-foreground mb-10 font-light">
              Experience the luxury of custom tailoring. Schedule an appointment 
              with our master tailors for measurements and fabric selection.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-wider">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          className="rounded-none h-12 bg-background border-border"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs tracking-wider">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email"
                            type="email"
                            className="rounded-none h-12 bg-background border-border"
                            {...field}
                            required
                          />
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
                        <FormLabel className="uppercase text-xs tracking-wider">Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+234..."
                            className="rounded-none h-12 bg-background border-border"
                            {...field}
                            required
                          />
                        </FormControl>
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
                      <FormLabel className="uppercase text-xs tracking-wider">Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} required>
                        <FormControl>
                          <SelectTrigger className="rounded-none h-12 bg-background border-border">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding Consultation</SelectItem>
                          <SelectItem value="bespoke">Bespoke Suit/Native</SelectItem>
                          <SelectItem value="bulk">Group/Groomsmen</SelectItem>
                          <SelectItem value="wardrobe">Wardrobe Refresh</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-wider">Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your requirements..."
                          className="rounded-none min-h-[120px] bg-background border-border resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-none bg-primary text-white h-14 uppercase tracking-widest text-xs"
                >
                  Request Appointment
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
