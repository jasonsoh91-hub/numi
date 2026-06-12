import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download The Pattern Code Report — Yours to Keep from NUMI",
  description: "You have been living by a pattern you were never shown how to read. Your birthdate encodes a structural pattern — a Core Number — that shapes your decisions, relationships, and recurring struggles. Get the map underneath.",
  keywords: [
    "NUMI",
    "Pattern Code",
    "Core Number",
    "self-discovery",
    "birthdate patterns",
    "personal growth",
    "life patterns",
    "pattern recognition",
  ],
  openGraph: {
    title: "Download The Pattern Code Report — Yours to Keep from NUMI",
    description: "You have been living by a pattern you were never shown how to read. Get the map underneath.",
  },
}

export default function LeadMagnetSBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
