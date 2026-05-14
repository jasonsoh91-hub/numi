"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Download, Smartphone, Apple, Play, Star, Shield, Zap } from "lucide-react"

export function AppDownloadSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const textStyle = { textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)" }
  const headingStyle = { textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)" }

  const features = [
    {
      icon: Star,
      title: "4.9 Rating",
      description: "Over 50,000 five-star reviews"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data never leaves your device"
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Get your full blueprint in seconds"
    }
  ]

  return (
    <section ref={ref} id="download" className="relative py-32 bg-transparent overflow-hidden">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-gold mb-8 shadow-xl"
        >
          <Smartphone className="w-10 h-10 text-black" />
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
          style={headingStyle}
        >
          Carry Your Strategy{" "}
          <span className="text-amber-400" style={{ textShadow: "0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)" }}>in Your Pocket</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-12 font-medium"
          style={textStyle}
        >
          Download the U-Excel Numerology App to track your daily numbers, audit your business partners,
          and unlock the full Bible of Numbers blueprint — anytime, anywhere.
        </motion.p>

        {/* Download buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* App Store button */}
          <a
            href="#"
            className="group relative flex items-center gap-4 bg-black/90 hover:bg-black border border-white/20 rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto backdrop-blur-sm"
          >
            <Apple className="w-8 h-8 text-white" />
            <div className="text-left">
              <p className="text-white/50 text-xs">Download on the</p>
              <p className="text-white text-lg font-semibold">App Store</p>
            </div>
            <Download className="w-5 h-5 text-gold-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Google Play button */}
          <a
            href="#"
            className="group relative flex items-center gap-4 bg-black/90 hover:bg-black border border-white/20 rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto backdrop-blur-sm"
          >
            <Play className="w-8 h-8 text-white" />
            <div className="text-left">
              <p className="text-white/50 text-xs">Get it on</p>
              <p className="text-white text-lg font-semibold">Google Play</p>
            </div>
            <Download className="w-5 h-5 text-gold-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>

        {/* Trust features */}
        <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-3 bg-black/80 rounded-xl mb-3 border border-white/10">
                <feature.icon className="w-6 h-6 text-gold-400" />
              </div>
              <h4 className="text-white font-semibold mb-1" style={textStyle}>{feature.title}</h4>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/50 text-sm">
            Available on iOS and Android. Free to download with premium features.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
