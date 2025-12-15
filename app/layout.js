import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/header";
import { Footer } from "@/components/global/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GodFirst | Bespoke Native Wears",
  description: "Luxury African menswear where tradition meets modern elegance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        {/* Fixed navbar overlays content */}
        <Navbar />

        {/* No padding-top here */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
