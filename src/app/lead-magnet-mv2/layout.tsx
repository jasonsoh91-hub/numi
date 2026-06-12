import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Discover The Hidden Code In Your Birthdate — Free Guide from NUMI",
  description: "Beneath your personality and habits is a structural pattern encoded in your date of birth. NUMI's free guide reveals your Core Number — and changes how you see yourself.",
  keywords: [
    "NUMI",
    "self-discovery",
    "human intelligence",
    "pattern recognition",
    "Core Number",
    "birthdate patterns",
    "personal growth",
    "AI self-discovery",
  ],
  openGraph: {
    title: "Discover The Hidden Code In Your Birthdate — Free Guide from NUMI",
    description: "Beneath your personality and habits is a structural pattern encoded in your date of birth. NUMI's free guide reveals your Core Number.",
  },
}

export default function LeadMagnetMV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
