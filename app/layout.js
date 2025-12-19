import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/global/header";
import Footer from "@/components/global/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://god-first-fashion.vercel.app/'),
  title: {
    default: "GodFirst | Bespoke Native Wears & Luxury Menswear",
    template: "%s | GodFirst Fashion"
  },
  description: "Luxury African menswear where tradition meets modern elegance. Bespoke native wears, ceremonial attire, and private consultations in Lagos.",
  keywords: ["Bespoke Tailoring Lagos", "African Menswear", "Luxury Native Wears", "GodFirst Fashion", "Nigerian Tailor"],
  authors: [{ name: "GodFirst Fashion House" }],
  creator: "GodFirst Fashion",
  publisher: "GodFirst Fashion",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "Si_aw9OMTjzbg8OvZad_EYKVrafrEdCEAdQgHGwKGfc",
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "GodFirst | Bespoke Native Wears",
    description: "Luxury African menswear where tradition meets modern elegance",
    url: 'https://god-first-fashion.vercel.app/',
    siteName: 'GodFirst Fashion',
    images: [
      {
        url: '/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'GodFirst Luxury Atelier',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    site: "@godfirstfashion",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const atelierSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ClothingStore",
      "@id": "https://god-first-fashion.vercel.app/#organization",
      "name": "GodFirst Fashion",
      "url": "https://god-first-fashion.vercel.app/",
      "logo": "https://god-first-fashion.vercel.app/logo.png",
      "image": "https://god-first-fashion.vercel.app/images/og-main.jpg",
      "telephone": "+2348023828071",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "26D Olowu Street",
        "addressLocality": "Ikeja",
        "addressRegion": "Lagos",
        "addressCountry": "NG"
      }
    },
    {
      "@type": "Service",
      "name": "Bespoke Native Tailoring",
      "provider": { "@id": "https://god-first-fashion.vercel.app/#organization" },
      "description": "Custom-made traditional African attire including Agbada, Kaftans, and Senator sets."
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 1. Google Tag Manager (Container) */}
      <GoogleTagManager gtmId="GTM-N9ZFMR45" /> 

      {/* 2. Google Analytics (gtag.js) */}
      <GoogleAnalytics gaId="G-SY0JBTG97Y" />

      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          font-sans
          bg-background
          text-foreground
        `}
      >
        <Script
          id="atelier-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(atelierSchema) }}
        />

        <Navbar />
        <main>{children}</main>
        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}