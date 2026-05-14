"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles, Target, TrendingUp, Heart, Briefcase, Users, Star, Zap } from "lucide-react"
import { getNumberContent } from "@/lib/numerology-content"
import { formatDateForDisplay, getZodiacSign } from "@/lib/numerology"

interface DestinyResultsSectionProps {
  lifePathNumber: number
  fullName: string
  dateOfBirth: string
  location: string
}

export function DestinyResultsSection({
  lifePathNumber,
  fullName,
  dateOfBirth,
  location
}: DestinyResultsSectionProps) {
  const content = getNumberContent(lifePathNumber)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.3 })

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    )
  }

  if (!content) return null

  const textStyle = { textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)" }
  const headingStyle = { textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)" }

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-transparent py-20 overflow-hidden">
      {/* Dark backdrop for this section */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header with user info */}
        <ScrollReveal delay={0}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-black/80 border border-gold-500/50 rounded-full mb-6 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-white text-sm font-semibold" style={textStyle}>Your Destiny Revealed</span>
            </motion.div>
            <p className="text-white text-lg mb-2 font-medium" style={textStyle}>
              For <span className="text-gold-300 font-bold">{fullName}</span>
            </p>
            <p className="text-white/60 text-sm">
              Born {formatDateForDisplay(dateOfBirth)} in {location} • {getZodiacSign(dateOfBirth)}
            </p>
          </div>
        </ScrollReveal>

        {/* Main Number Display */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-gold rounded-full blur-3xl opacity-40 animate-pulse-slow" />
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-black via-gray-900 to-black border-2 border-gold-500/60 flex items-center justify-center shadow-gold-glow">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-center"
                >
                  <span className="block text-7xl sm:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-gold" style={headingStyle}>
                    {lifePathNumber}
                  </span>
                </motion.div>
              </div>
              {/* Orbiting elements - SLOWER */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * -10
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-2 h-2 bg-gold-400 rounded-full shadow-lg shadow-gold-400/50"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Title and Subtitle */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4"
              style={headingStyle}
            >
              {content.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl text-gold-300 font-semibold"
              style={textStyle}
            >
              {content.subtitle}
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Core Description */}
        <ScrollReveal delay={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-black/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
              <p className="text-lg text-white leading-relaxed text-center font-medium" style={textStyle}>
                {content.description}
              </p>
              <p className="text-white/70 mt-6 text-center italic">
                "{content.coreEssence}"
              </p>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Strengths Grid */}
        <ScrollReveal delay={0.8}>
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/40">
                <Star className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white" style={headingStyle}>
                Your Superpowers
              </h3>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4 p-5 bg-black/85 backdrop-blur-sm rounded-xl border border-white/10 hover:border-emerald-500/40 transition-colors shadow-lg"
                >
                  <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-white font-medium" style={textStyle}>{strength}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 2026 Strategic Focus */}
        <ScrollReveal delay={1}>
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-3 bg-gold-500/20 rounded-xl border border-gold-500/40">
                <Target className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white" style={headingStyle}>
                Your 2026 Strategic Focus
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-gradient-to-br from-gold-500/15 to-transparent rounded-2xl p-8 border border-gold-500/30 backdrop-blur-md shadow-xl"
            >
              <h4 className="text-xl font-semibold text-gold-200 mb-3" style={textStyle}>
                {content.strategicFocus2026.title}
              </h4>
              <p className="text-white mb-6 font-medium" style={textStyle}>
                {content.strategicFocus2026.description}
              </p>
              <div className="space-y-3">
                {content.strategicFocus2026.actionItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0 shadow-lg shadow-gold-400/50" />
                    <span className="text-white font-medium" style={textStyle}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Additional Insights Grid */}
        <ScrollReveal delay={1.5}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Career Alignment */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-lavender-500/40 transition-all shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-lavender-400" />
                <h4 className="text-lg font-semibold text-white" style={textStyle}>Career Alignment</h4>
              </div>
              <ul className="space-y-2">
                {content.careerAlignment.slice(0, 4).map((career, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-lavender-400" />
                    {career}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Relationship Dynamics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-crimson-500/40 transition-all shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-crimson-400" />
                <h4 className="text-lg font-semibold text-white" style={textStyle}>Relationship Dynamics</h4>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {content.relationshipDynamics}
              </p>
            </motion.div>

            {/* Power Details */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold-500/40 transition-all shadow-xl sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-gold-400" />
                <h4 className="text-lg font-semibold text-white" style={textStyle}>Your Power Elements</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Power Colors</p>
                  <div className="flex gap-2">
                    {content.powerColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white/30 shadow-lg"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Lucky Numbers</p>
                  <div className="flex gap-2 flex-wrap">
                    {content.luckyNumbers.map((num, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gold-500/20 text-gold-200 rounded-lg text-sm font-semibold border border-gold-500/30"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
