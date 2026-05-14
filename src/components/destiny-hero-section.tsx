"use client"

import { useState } from "react"
import { Sparkles, Calendar, Clock, MapPin, ArrowRight, Star } from "lucide-react"
import { motion } from "framer-motion"

interface DestinyHeroSectionProps {
  onSubmit: (data: {
    fullName: string
    dateOfBirth: string
    timeOfBirth?: string
    location: string
  }) => void
}

export function DestinyHeroSection({ onSubmit }: DestinyHeroSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    location: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid name"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const dob = new Date(formData.dateOfBirth)
      const today = new Date()
      if (dob > today) {
        newErrors.dateOfBirth = "Date cannot be in the future"
      }
      if (dob < new Date("1900-01-01")) {
        newErrors.dateOfBirth = "Please enter a valid date"
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    } else if (formData.location.trim().length < 2) {
      newErrors.location = "Please enter a valid location"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onSubmit(formData)
  }

  const textStyle = { textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)" }
  const headingStyle = { textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)" }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-sm rounded-full border border-yellow-500/50 shadow-lg">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white text-sm font-semibold" style={textStyle}>
              Over 50,000 destinies decoded in 2026
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight" style={headingStyle}>
            Unlock Your{" "}
            <span className="text-yellow-400">
              2026 Destiny Code
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto leading-relaxed font-medium" style={textStyle}>
            Discover the hidden strategy encoded in your numbers. Your birth date holds the blueprint to your wealth, relationships, and destiny.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-yellow-500/30 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                Full Name <span className="text-yellow-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-5 py-4 bg-black border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? "border-yellow-500/50 focus:ring-yellow-500/20"
                      : "border-white/20 focus:ring-yellow-500/20 focus:border-yellow-500/30"
                  }`}
                />
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-5 left-0 text-yellow-400 text-xs"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-white text-sm font-medium mb-2">
                Date of Birth <span className="text-yellow-400">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-12 pr-5 py-4 bg-black border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                    errors.dateOfBirth
                      ? "border-yellow-500/50 focus:ring-yellow-500/20"
                      : "border-white/20 focus:ring-yellow-500/20 focus:border-yellow-500/30"
                  }`}
                />
                {errors.dateOfBirth && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-5 left-0 text-yellow-400 text-xs"
                  >
                    {errors.dateOfBirth}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Time of Birth (Optional) */}
            <div>
              <label htmlFor="timeOfBirth" className="block text-white text-sm font-medium mb-2">
                Time of Birth <span className="text-white/50">(optional)</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="time"
                  id="timeOfBirth"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 bg-black border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/30 transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-white text-sm font-medium mb-2">
                Birth Location <span className="text-yellow-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className={`w-full pl-12 pr-5 py-4 bg-black border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                    errors.location
                      ? "border-yellow-500/50 focus:ring-yellow-500/20"
                      : "border-white/20 focus:ring-yellow-500/20 focus:border-yellow-500/30"
                  }`}
                />
                {errors.location && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-5 left-0 text-yellow-400 text-xs"
                  >
                    {errors.location}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold py-5 rounded-xl shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    Calculating Your Destiny...
                  </>
                ) : (
                  <>
                    Calculate My Destiny Code
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </span>
            </motion.button>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                Secure & Private
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                Instant Results
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                100% Free
              </div>
            </div>
          </form>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/40"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
