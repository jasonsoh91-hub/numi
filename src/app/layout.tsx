import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NUMI | Human Intelligent Pattern Platform",
  description: "A new generation platform combining timeless Eastern wisdom, modern presentation, and practical guidance for understanding your life patterns, relationships, wealth, and opportunities.",
  keywords: ["human intelligence", "pattern recognition", "Eastern wisdom", "self-discovery", "life patterns", "personal growth", "NUMI academy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased font-body bg-cosmic-black text-text-primary">{children}</body>
    </html>
  );
}
