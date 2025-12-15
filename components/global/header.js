"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Collections", href: "/collections" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled && !isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-md py-4 shadow-sm border-b border-border/40"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-widest text-amber-500 z-50"
        >
          GODFIRST
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors",
                pathname === link.href
                  ? "text-amber-500 font-medium"
                  : "text-white hover:text-amber-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link href="/book">
            <Button
              variant="outline"
              className="rounded-3xl border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider text-xs px-6"
            >
              Book Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle menu"
          className={cn(
            "md:hidden z-50 transition-colors duration-300",
            isScrolled && !isMobileMenuOpen ? "text-black" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Drawer */}
        <div
          className={cn(
            "fixed top-0 left-0 h-full w-64 bg-background shadow-lg z-40 transform transition-transform duration-300",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col justify-between h-full p-6">
            {/* Close Button */}
            <button
              className="self-end text-gray-900 mb-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Navigation Links with staggered fade-in */}
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg uppercase font-medium text-gray-900 hover:text-amber-500 flex items-center gap-2 transform transition duration-500 ease-out opacity-0 translate-x-[-20px]"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen
                      ? "translateX(0)"
                      : "translateX(-20px)",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ChevronRight size={16} className="text-amber-500" />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <Link href="/book">
                <Button
                  className="w-full rounded-3xl uppercase tracking-wider text-xs bg-amber-500 text-white hover:bg-amber-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
