import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/header";
import Footer from "@/components/global/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Full SEO / AEO Metadata Configuration
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Google Tag Manager (GTM) - Replace with your actual ID */}
      <GoogleTagManager gtmId="GTM-XXXXXXX" /> 
      
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
        {/* Vercel Speed & Analytics Tracking */}
        <Analytics />
        <SpeedInsights />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}