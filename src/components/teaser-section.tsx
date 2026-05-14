"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lock, ArrowRight, Triangle, Users, TrendingUp, Calendar } from "lucide-react"

export function TeaserSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const textStyle = { textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)" }
  const headingStyle = { textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)" }

  const features = [
    {
      icon: Triangle,
      title: "Inverted Triangle Matrix",
      description: "Map your complete numerological blueprint across life dimensions",
      color: "text-gold-400",
      bgColor: "bg-gold-500/20"
    },
    {
      icon: Users,
      title: "Career Compatibility Audit",
      description: "Know exactly who to partner with and who to avoid in business",
      color: "text-lavender-400",
      bgColor: "bg-lavender-500/20"
    },
    {
      icon: Calendar,
      title: "Daily Winning Periods",
      description: "Know your power days, vulnerable periods, and optimal timing",
      color: "text-crimson-400",
      bgColor: "bg-crimson-500/20"
    },
    {
      icon: TrendingUp,
      title: "Wealth Velocity Calculator",
      description: "Predict your financial cycles and accelerate your wealth-building",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20"
    }
  ]

  return (
    <section ref={ref} className="relative py-32 bg-transparent overflow-hidden">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          {/* Lock icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/90 border-2 border-white/20 mb-8 backdrop-blur-sm shadow-xl"
          >
            <Lock className="w-8 h-8 text-white/70" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
            style={headingStyle}
          >
            Your Life Path Number is Just{" "}
            <span className="text-transparent bg-clip-text bg-gradient-crimson">10%</span>{" "}
            of Your Blueprint
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-12 font-medium"
            style={textStyle}
          >
            The Life Path reveals your core essence, but true mastery requires the complete matrix.
            To unlock your inverted triangle, career compatibility profiles, and daily winning periods,
            you need the full Bible of Numbers blueprint.
          </motion.p>

          {/* Percentage bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="h-3 bg-black/80 rounded-full overflow-hidden border border-white/20 shadow-lg">
              <div className="h-full flex">
                <div className="w-[10%] bg-gradient-gold" />
                <div className="flex-1 bg-gray-900" />
              </div>
            </div>
            <div className="flex justify-between mt-3 text-sm font-semibold">
              <span className="text-gold-300" style={textStyle}>10% Unlocked</span>
              <span className="text-white/50">90% Hidden</span>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="group relative bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all shadow-xl"
            >
              {/* Locked overlay */}
              <div className="absolute inset-0 bg-black/95 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-white/50 mx-auto mb-2" />
                  <span className="text-white/70 text-sm font-medium">Unlock in App</span>
                </div>
              </div>

              <div className={`inline-flex p-3 ${feature.bgColor} rounded-xl mb-4 border border-white/10`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2" style={textStyle}>
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <a
            href="#download"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold px-10 py-5 rounded-xl shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          >
            Unlock Your Complete Blueprint
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-white/50 text-sm mt-4">
            Available exclusively in the U-Excel Numerology App
          </p>
        </motion.div>
      </div>
    </section>
  )
}
