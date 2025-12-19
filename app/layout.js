import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/global/header";
import Footer from "@/components/global/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// ENTERPRISE METADATA CONFIG
export const metadata = {
  metadataBase: new URL('https://god-first-fashion.vercel.app/'),
  title: {
    default: "GodFirst | Bespoke Native Wears & Luxury Menswear",
    template: "%s | GodFirst Fashion"
  },
  description: "Luxury African menswear where tradition meets modern elegance. Custom bespoke tailoring, native wears, and private consultations in Lagos.",
  keywords: ["Bespoke Tailoring Lagos", "African Menswear", "Luxury Native Wears", "Nigerian Fashion Brand"],
  verification: {
    google: "Si_aw9OMTjzbg8OvZad_EYKVrafrEdCEAdQgHGwKGfc",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GodFirst | Bespoke Native Wears",
    description: "Traditional African elegance redefined for the modern man.",
    url: 'https://god-first-fashion.vercel.app/',
    siteName: 'GodFirst Fashion',
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630 }],
    locale: 'en_NG',
    type: 'website',
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

// ENTERPRISE AEO SCHEMA (JSON-LD)
const enterpriseSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ClothingStore",
      "@id": "https://god-first-fashion.vercel.app/#organization",
      "name": "GodFirst Fashion",
      "url": "https://god-first-fashion.vercel.app/",
      "logo": "https://god-first-fashion.vercel.app/logo.png",
      "image": "https://god-first-fashion.vercel.app/images/og-main.jpg",
      "sameAs": [
        "https://instagram.com/godfirstfashion",
        "https://facebook.com/godfirstfashion"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "26D Olowu Street",
        "addressLocality": "Ikeja",
        "addressRegion": "Lagos",
        "addressCountry": "NG"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://god-first-fashion.vercel.app/#website",
      "url": "https://god-first-fashion.vercel.app/",
      "name": "GodFirst Fashion",
      "publisher": { "@id": "https://god-first-fashion.vercel.app/#organization" }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* MANUAL GTM SCRIPT FOR GSC BOT RECOGNITION */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N9ZFMR45');`,
          }}
        />
        {/* MANUAL GA4 SCRIPT FOR GA METHOD VERIFICATION */}
        <Script
          id="ga4-script"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-SY0JBTG97Y"
        />
        <Script
          id="ga4-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date()); gtag('config', 'G-SY0JBTG97Y');`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {/* NOSCRIPT AT TOP OF BODY FOR GTM BOT VERIFICATION */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9ZFMR45"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Script
          id="enterprise-aeo-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(enterpriseSchema) }}
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