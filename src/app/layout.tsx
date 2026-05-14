import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${lora.variable} ${raleway.variable}`}>
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
