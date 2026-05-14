"use client"

import { useState, useRef, useEffect } from "react"
import { DestinyHeroSection } from "@/components/destiny-hero-section"
import { DestinyResultsSection } from "@/components/destiny-results-section"
import { TeaserSection } from "@/components/teaser-section"
import { AppDownloadSection } from "@/components/app-download-section"
import { SpaceBackground } from "@/components/space-background"
import { calculateNumerology, logUserDataForWebhook, UserData } from "@/lib/numerology"

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleFormSubmit = (data: {
    fullName: string
    dateOfBirth: string
    timeOfBirth?: string
    location: string
  }) => {
    // Calculate numerology
    const result = calculateNumerology(data as UserData)

    // Log data for webhook integration
    logUserDataForWebhook(result)

    // Update state
    setUserData(data as UserData)
    setLifePathNumber(result.lifePathNumber)
    setShowResults(true)

    // Smooth scroll to results after a brief delay
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 300)
  }

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      setShowResults(false)
      setUserData(null)
      setLifePathNumber(null)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  return (
    <main className="min-h-screen bg-transparent">
      {/* Animated Space Background */}
      <SpaceBackground />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Hero & Data Collection */}
      <div className="relative">
        <DestinyHeroSection onSubmit={handleFormSubmit} />
      </div>

      {/* Dynamic Results Section - Hidden until calculation */}
      {showResults && userData && lifePathNumber && (
        <div ref={resultsRef} className="relative">
          <DestinyResultsSection
            lifePathNumber={lifePathNumber}
            fullName={userData.fullName}
            dateOfBirth={userData.dateOfBirth}
            location={userData.location}
          />
        </div>
      )}

      {/* Teaser / Gap Section */}
      {showResults && <TeaserSection />}

      {/* App Download CTA */}
      <div className="relative">
        <AppDownloadSection />
      </div>

      {/* Footer */}
      <footer className="relative bg-transparent border-t border-charcoal-800/30 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-gold mb-4">
            NUMI
          </p>
          <p className="text-white/50 text-sm mb-6">
            The Science of Numbers • Unlock Your Destiny
          </p>
          <div className="flex items-center justify-center gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
          <p className="text-white/30 text-xs mt-8">
            © 2026 NUMI. All rights reserved. Numerology is for entertainment purposes.
          </p>
        </div>
      </footer>
    </main>
  )
}
