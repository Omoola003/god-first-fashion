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
  // ✅ 1st Line of Defense: Meta Tag Verification (Highly Recommended)
  verification: {
    google: "Si_aw9OMTjzbg8OvZad_EYKVrafrEdCEAdQgHGwKGfc",
  },
  openGraph: {
    title: "GodFirst | Bespoke Native Wears",
    description: "Luxury African menswear where tradition meets modern elegance",
    url: 'https://god-first-fashion.vercel.app/',
    siteName: 'GodFirst Fashion',
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'GodFirst Luxury Atelier' }],
    locale: 'en_NG',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const atelierSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ClothingStore",
      "@id": "https://god-first-fashion.vercel.app/#organization",
      "name": "GodFirst Fashion",
      "url": "https://god-first-fashion.vercel.app/",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "26D Olowu Street",
        "addressLocality": "Ikeja",
        "addressRegion": "Lagos",
        "addressCountry": "NG"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ 2nd Line of Defense: Manual GTM/GA Script with 'beforeInteractive'.
          This ensures the verification bot sees the ID in the raw HTML.
        */}
        <Script
          id="gtm-verification"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N9ZFMR45');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        {/* ✅ GTM Noscript - Critical for GTM Method verification */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9ZFMR45"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* ✅ Standard GA4 Loading for actual data tracking */}
        <GoogleAnalytics gaId="G-SY0JBTG97Y" />

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