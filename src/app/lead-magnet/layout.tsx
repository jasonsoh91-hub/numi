import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What Your Birthdate Has Been Trying To Tell You — NUMI",
  description: "You have been living by a pattern you were never shown how to read. The Pattern Code Report reveals your Core Number — the structural map inside your birthdate. Complimentary. Instant.",
  openGraph: {
    title: "You Have Been Living By A Pattern You Were Never Shown How To Read",
    description: "The Pattern Code Report from NUMI reveals the structural map inside your birthdate. Complimentary access. Instant delivery.",
  },
}

export default function LeadMagnetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
