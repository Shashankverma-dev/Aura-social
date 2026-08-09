import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Social — Premium Scroll-Driven Marketing Engine",
  description: "World-class social media marketing platform with scroll-driven storytelling inspired by Apple, Linear, and Framer.",
  keywords: ["SaaS", "Social Media Marketing", "Scroll Animation", "GSAP", "Lenis", "Next.js"],
  authors: [{ name: "Aura Team" }],
  openGraph: {
    title: "Aura Social — Premium Scroll-Driven Marketing Engine",
    description: "Experience the next evolution in social media storytelling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-white text-slate-950 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden w-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
