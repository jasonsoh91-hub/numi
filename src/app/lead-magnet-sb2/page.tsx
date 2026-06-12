"use client"

import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronDown, XCircle, CheckCircle, Loader2, Download, Lock } from "lucide-react"
import { TestimonialsSection as TestimonialsSectionComponent } from "@/components/ui/testimonials-section"
const BOOK_IMAGE = "/frames/book-transparent.png"
import { calculateCoreNumber } from "@/lib/calculateCoreNumber"

// ============================================================================
// IMAGE ASSETS
// ============================================================================
const HERO_IMAGE = "/images/hero-golden-hour.png"

const PAIN_IMAGES = {
  career: "/images/career-image.png",
  relationships: "/images/relationships-image.png",
  energy: "/images/energy-image.png",
  direction: "/images/direction-image.png",
}

// ============================================================================
// FLOATING NUMBER PARTICLES
// ============================================================================
const PARTICLE_NUMBERS = ["1", "3", "5", "7", "9", "11", "22", "33"]

interface ParticleConfig {
  num: string
  fontSize: number
  opacity: number
  top: number
  left: number
  duration: number
  delay: number
  yRange: number
}

function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<ParticleConfig[]>([])

  useEffect(() => {
    setMounted(true)
    const configs = PARTICLE_NUMBERS.map((num, i) => ({
      num,
      fontSize: 12 + Math.random() * 8,
      opacity: 0.07 + Math.random() * 0.05,
      top: 10 + (i * 12) % 80,
      left: 5 + (i * 13) % 90,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 2,
      yRange: 20 + Math.random() * 20,
    }))
    setParticles(configs)
  }, [])

  if (!mounted) return <div className="fixed inset-0 z-0 pointer-events-none" />

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.num}
          className="absolute font-light pointer-events-none"
          style={{
            fontSize: `${particle.fontSize}px`,
            color: `rgba(216, 184, 106, ${particle.opacity})`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -particle.yRange, 0],
                  opacity: [particle.opacity * 0.7, particle.opacity * 1.3, particle.opacity * 0.7],
                }
          }
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
          }}
        >
          {particle.num}
        </motion.span>
      ))}
    </div>
  )
}

// ============================================================================
// SCROLL PROGRESS BAR
// ============================================================================
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
        scaleX,
      }}
    />
  )
}

// ============================================================================
// VIGNETTE OVERLAY
// ============================================================================
function VignetteOverlay() {
  return (
    <div
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  )
}

// ============================================================================
// SECTION 1: HERO - V2 (Stronger relatable pain hook)
// ============================================================================
function HeroSection({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const headlineY = useTransform(scrollY, [0, 200], [0, -30])
  const reportScale = useTransform(scrollY, [0, 300], [1, 0.93])

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0A0E27", paddingTop: "80px" }}
    >
      {/* CSS Gradient background fallback */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, rgba(216,184,106,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Hero background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Person looking outward at golden hour light"
          fill
          priority
          quality={90}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.2,
          }}
        />
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(to bottom, rgba(10,14,39,0.3) 0%, rgba(10,14,39,0.95) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
          style={{ color: "#D8B86A" }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">Your operating system, revealed — in minutes</span>
        </motion.div>

        {/* Gold rule accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="h-px mx-auto mb-10"
          style={{ width: "100px", background: "rgba(216,184,106,0.4)" }}
        />

        {/* Pain Hook - More direct and relatable */}
        <div className="space-y-3 mb-12">
          {[
            "You know the feeling.",
            "You're doing everything right.",
            "But somehow, you end up in the same place.",
            [
              <span key="1" style={{ color: "rgba(255,255,255,0.6)" }}>The question isn't </span>,
              <span key="2" style={{ color: "#D8B86A" }}>what's wrong with you.</span>
            ],
            [
              <span key="1" style={{ color: "rgba(255,255,255,0.6)" }}>The question is, </span>,
              <span key="2" style={{ color: "#D8B86A" }}>what are you working with?</span>
            ],
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="text-xl md:text-2xl font-light text-white text-center"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Main headline */}
        <motion.h1
          style={{ y: headlineY }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white mb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Your Birthdate Holds
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-2"
            style={{
              background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Blueprint You've Been Missing.
          </motion.div>
        </motion.h1>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="max-w-xl mx-auto text-center mb-12"
        >
          <p className="text-lg md:text-xl leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
            Hidden in the numbers of your birthdate is a map — your <span style={{ color: "#D8B86A" }}>Core Number</span> — that explains why you keep hitting the same walls, why certain things drain you, and where your natural energy actually wants to go.
          </p>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Not a personality test. Not astrology. Just your personal operating system, finally revealed.
          </p>
        </motion.div>

        {/* Report Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ scale: prefersReducedMotion ? 1 : reportScale }}
          className="relative mx-auto max-w-[900px] mb-12"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -8, 0],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full"
            style={{ height: "400px" }}
          >
            <Image
              src={BOOK_IMAGE}
              alt="The Pattern Code Report - NUMI"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        </motion.div>

        {/* CTA Button with shimmer */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.3 }}
          onClick={scrollToForm}
          className="relative px-8 py-4 rounded-full text-sm tracking-widest uppercase font-semibold overflow-hidden cursor-pointer group"
          style={{
            background: "linear-gradient(135deg, #D8B86A, #C4A055)",
            color: "#0A0E27",
          }}
          whileHover={{ scale: 1.03, brightness: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Download size={18} />
            Get My Core Number Report  →
          </span>
          <motion.span
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              transform: "skewX(-20deg)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.button>

        {/* Micro-trust copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="text-xs tracking-widest text-center mt-3"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Free • Takes 60 seconds • No email spam
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: "rgba(216,184,106,0.35)" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2: THE PROBLEM - V2 (More relatable framing)
// ============================================================================
function ProblemSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const painPoints = [
    {
      title: "Career",
      image: PAIN_IMAGES.career,
      description: "You work hard. You deliver. But the promotions, the recognition, the momentum—it never quite arrives. Meanwhile, peers who seem to do less keep moving ahead.",
    },
    {
      title: "Relationships",
      image: PAIN_IMAGES.relationships,
      description: "You find yourself in the same dynamic with different people. You're trying, you're self-aware, but somehow the same conflicts keep finding you.",
    },
    {
      title: "Energy",
      image: PAIN_IMAGES.energy,
      description: "Some days you're drained before noon. You've tried the routines, the sleep tips, the productivity hacks—but something underneath keeps quietly burning through your battery.",
    },
    {
      title: "Direction",
      image: PAIN_IMAGES.direction,
      description: "You're successful on paper. You hit the goals. But privately, you wonder if these are even your goals, or just what you thought you were supposed to want.",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative z-20 py-24 md:py-32"
      style={{ background: "#0F0F23" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs tracking-[0.3em] uppercase mb-8"
          style={{ color: "#D8B86A" }}
        >
          THE REAL PROBLEM ISN'T EFFORT
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <p className="text-2xl md:text-3xl font-light text-white mb-4">
            You're not failing because you're not trying.
          </p>
          <p
            className="text-2xl md:text-3xl font-light"
            style={{
              background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            You're trying without the manual.
          </p>
        </motion.div>

        {/* Opening body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.62)" }}>
            Imagine buying a complex device and trying to use it without knowing what it actually does. That's how most of us live our lives—working with our equipment, but never having seen the spec sheet.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.62)" }}>
            Your Core Number is that spec sheet. It doesn't predict your future. It explains your wiring. It shows you where you naturally gain momentum and where you're swimming upstream against your own current.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
            The difference isn't working harder. It's working with your design instead of guessing at it.
          </p>
        </motion.div>

        {/* Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              whileHover={{
                borderColor: "rgba(216,184,106,0.25)",
                background: "rgba(216,184,106,0.03)",
              }}
            >
              <div
                className="h-44 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${point.image})`, filter: "saturate(0.7)" }}
              />
              <div className="p-6">
                <h3 className="text-base font-medium text-white mb-2">{point.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl italic text-center mt-12 max-w-xl mx-auto"
          style={{ color: "#D8B86A" }}
        >
          Stop blaming the effort. Start understanding the machine.
        </motion.p>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 3: THE SOLUTION - V2 (More practical framing)
// ============================================================================
function SolutionSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [calcStep, setCalcStep] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCalcStep((prev) => (prev + 1) % 4)
      }, 1400)
      return () => clearInterval(timer)
    }
  }, [isInView])

  return (
    <section
      ref={ref}
      className="relative z-20 py-24 md:py-32"
      style={{ background: "#0A0E27" }}
    >
      <div className="px-6 md:px-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs tracking-[0.3em] uppercase mb-8"
          style={{ color: "#D8B86A" }}
        >
          YOUR CORE NUMBER IN 60 SECONDS
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-2xl md:text-3xl font-light text-white mb-4">
            No personality quiz. No belief system.
          </p>
          <p className="text-2xl md:text-3xl font-light" style={{ color: "#D8B86A" }}>
            Just the math that was already there.
          </p>
        </motion.div>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.62)" }}>
            Your Core Number comes from your birthdate. The day, month, and year add up and reduce down to a single digit (or master number). That number corresponds to a specific pattern—a way of processing decisions, handling energy, navigating relationships, and approaching work.
          </p>
          <p className="text-xl md:text-2xl text-white font-light mb-8">
            Think of it as your出厂设置. Factory settings, finally explained.
          </p>
          <p className="text-lg italic" style={{ color: "rgba(255,255,255,0.55)" }}>
            Not who you should be. Who you already are.
          </p>
        </motion.div>

        {/* Calculation Visualiser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto my-20 rounded-3xl p-10 md:p-16 relative"
          style={{
            border: "1px solid rgba(216,184,106,0.15)",
            background: "rgba(216,184,106,0.02)",
          }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-8 text-center" style={{ color: "rgba(216,184,106,0.6)" }}>
            SEE HOW IT WORKS
          </p>

          {/* Sample birthdate */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 md:gap-3 mb-12"
          >
            {["1", "3", "·", "0", "9", "·", "1", "9", "7", "6"].map((char, i) => (
              <span
                key={i}
                className="text-5xl md:text-6xl font-extralight"
                style={{ color: char === "·" ? "rgba(216,184,106,0.3)" : "#D8B86A" }}
              >
                {char}
              </span>
            ))}
          </motion.div>

          {/* Calculation steps */}
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={calcStep >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl font-light tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              1 + 3 + 0 + 9 + 1 + 9 + 7 + 6 = <span style={{ color: "#D8B86A" }}>36</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={calcStep >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl font-light tracking-widest"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              3 + 6 = <span style={{ color: "#D8B86A" }}>9</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={calcStep >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="pt-8 border-t mx-auto w-fit px-8"
              style={{ borderColor: "rgba(216,184,106,0.15)" }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "rgba(216,184,106,0.6)" }}>
                CORE NUMBER
              </p>
              <div className="relative inline-block">
                <div
                  className="text-[100px] md:text-[120px] font-extralight leading-none"
                  style={{
                    color: "#D8B86A",
                    textShadow: "0 0 40px rgba(216,184,106,0.3)",
                  }}
                >
                  9
                </div>
                {/* Radial glow */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                  style={{
                    width: "200px",
                    height: "200px",
                    background: "radial-gradient(circle, rgba(216,184,106,0.15) 0%, transparent 60%)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Three Pillars - Revised */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
          {[
            { title: "Your decision pattern", sub: "How you naturally choose and why" },
            { title: "Your energy flow", sub: "Where you gain momentum and lose it" },
            { title: "Your blind spots", sub: "What trips you up and why it keeps happening" },
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="rounded-2xl p-6 text-center"
              style={{
                border: "1px solid rgba(216,184,106,0.12)",
                background: "rgba(216,184,106,0.02)",
              }}
            >
              <h3 className="text-white font-medium mb-2">{pillar.title}</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{pillar.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Three Clarifiers - Revised */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          {[
            "Not a horoscope — this reveals your pattern, not your future",
            "Not a personality test — no 80 questions, just your birthdate",
            "Not a sales funnel — you get real insight, free, in under a minute",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-shrink-0 mt-0.5">
                <XCircle size={16} style={{ color: "rgba(255,100,100,0.5)" }} />
              </div>
              <p className="text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#D8B86A" }}>Not</span> {item.substring(3)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 4: BEFORE / AFTER - V2
// ============================================================================
function BeforeAfterSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const beforeItems = [
    "Reacting to the same situations in the same ways",
    "Wondering why you can't seem to break through",
    "Watching others advance while you stay stuck",
    "Exhausted by patterns you can see but can't stop",
    "Making decisions that feel right in the moment but lead nowhere",
  ]

  const afterItems = [
    "Seeing your patterns before they run you",
    "Understanding why certain situations drain or trigger you",
    "Making decisions that work with your wiring instead of against it",
    "Knowing your blind spots so they stop blindsiding you",
    "Finally having language for what you've always felt but couldn't explain",
  ]

  return (
    <section
      ref={ref}
      className="relative z-20 py-24 md:py-32"
      style={{ background: "#0F0F23" }}
    >
      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs tracking-[0.3em] uppercase mb-12"
          style={{ color: "#D8B86A" }}
        >
          THE DIFFERENCE KNOWING YOUR PATTERN MAKES
        </motion.p>

        {/* Two columns */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 relative">
          {/* Without column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-10 relative"
            style={{ background: "rgba(100, 120, 200, 0.04)" }}
          >
            {/* Watermark ✗ */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[180px] font-extralight" style={{ color: "rgba(255,255,255,0.025)" }}>
                ✗
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-light mb-6 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                <XCircle size={16} style={{ color: "rgba(255,100,100,0.45)" }} />
                Without Your Core Number
              </h3>
              <ul className="space-y-4">
                {beforeItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
                    className="text-sm md:text-base leading-relaxed pl-3"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                  >
                    – {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* With column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: "rgba(216, 184, 106, 0.04)" }}
          >
            {/* Radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(216,184,106,0.06) 0%, transparent 70%)" }}
            />

            <div className="relative z-10">
              <h3 className="text-lg font-light mb-6 flex items-center gap-2 text-white">
                <CheckCircle size={16} style={{ color: "#D8B86A" }} />
                With Your Core Number
              </h3>
              <ul className="space-y-4">
                {afterItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
                    className="text-sm md:text-base leading-relaxed pl-3 flex items-start gap-2"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    <span style={{ color: "#D8B86A", fontWeight: "bold" }}>✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Divider pill (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
            <div
              className="px-3 py-1 rounded-full text-xs flex items-center justify-center"
              style={{ background: "#0F0F23", border: "1px solid rgba(216,184,106,0.3)", color: "#D8B86A" }}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 5: BENEFITS - V2 (More outcome-focused)
// ============================================================================
function BenefitsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const benefits = [
    {
      title: "Your decision pattern, explained",
      body: "Why you hesitate in certain situations and charge ahead in others. Why some choices feel natural while others feel like pushing against a current.",
    },
    {
      title: "Your energy blueprint",
      body: "Which activities give you more energy than they take, and which ones drain you regardless of how much rest you get.",
    },
    {
      title: "Your relationship dynamics",
      body: "Why certain types of people consistently trigger you, why you attract specific patterns, and how to navigate both with awareness instead of reaction.",
    },
    {
      title: "Your growth path",
      body: "Where you're naturally strong, where you overcompensate, and what happens when you stop working against your own wiring.",
    },
    {
      title: "Your life's recurring theme",
      body: "The through-line that connects your career, relationships, and internal struggles—one pattern that shows up everywhere once you know how to spot it.",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative z-20 py-24 md:py-32 overflow-hidden"
      style={{ background: "#0A0E27" }}
    >
      {/* Number arc decoration */}
      <svg className="absolute right-0 top-0 bottom-0 w-1/2 h-full pointer-events-none opacity-5" viewBox="0 0 200 400">
        <path
          d="M 100 350 A 150 150 0 0 0 100 50"
          fill="none"
          stroke="rgba(216,184,106,0.05)"
          strokeWidth="1"
        />
        <text
          x="100"
          y="200"
          textAnchor="middle"
          fontSize="40"
          fill="rgba(216,184,106,0.05)"
          style={{ fontFamily: "serif" }}
        >
          1 2 3 4 5 6 7 8 9
        </text>
      </svg>

      <div className="px-6 md:px-10 relative z-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#D8B86A" }}
        >
          WHAT YOU'LL LEARN IN 60 SECONDS
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-light text-white text-center max-w-2xl mx-auto mb-16"
        >
          One number. Five areas of your life it explains.
        </motion.h2>

        {/* Benefits list with vertical timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: "rgba(216,184,106,0.15)" }}
          />

          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 pb-8 relative"
              style={{ borderBottom: i < benefits.length - 1 ? "1px solid rgba(216,184,106,0.1)" : "none" }}
            >
              {/* Timeline icon */}
              <motion.div
                whileHover={{ scale: 1.35 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                style={{ background: "#0A0E27" }}
              >
                <span className="text-xl" style={{ color: "#D8B86A" }}>✦</span>
              </motion.div>
              <div className="flex-1 pt-1">
                <h3 className="text-white font-medium text-base md:text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {benefit.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 6: TESTIMONIALS
// ============================================================================
function TestimonialsSection() {
  return <TestimonialsSectionComponent />
}

// ============================================================================
// SECTION 7: FORM - V2
// ============================================================================
function FormSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLDivElement> }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    birthdate: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coreNumberPreview, setCoreNumberPreview] = useState<number | null>(null)

  // Calculate core number preview on valid date input
  useEffect(() => {
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = formData.birthdate.match(datePattern)
    if (match) {
      const [, day, month, year] = match
      const dateStr = `${year}-${month}-${day}`
      const coreNum = calculateCoreNumber(dateStr)
      if (coreNum) {
        setCoreNumberPreview(coreNum)
      } else {
        setCoreNumberPreview(null)
      }
    } else {
      setCoreNumberPreview(null)
    }
  }, [formData.birthdate])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter your first name"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email"
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.birthdate.trim()) {
      newErrors.birthdate = "Please enter your birthdate"
    } else {
      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/
      const match = formData.birthdate.match(datePattern)
      if (!match) {
        newErrors.birthdate = "Please use DD/MM/YYYY format"
      } else {
        const [, day, month, year] = match
        const date = new Date(`${year}-${month}-${day}`)
        if (isNaN(date.getTime())) {
          newErrors.birthdate = "Please enter a valid date"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Calculate core number
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = formData.birthdate.match(datePattern)
    let coreNumber: number | null = null
    if (match) {
      const [, day, month, year] = match
      coreNumber = calculateCoreNumber(`${year}-${month}-${day}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 1400))

    const lead = {
      name: formData.firstName,
      email: formData.email,
      birthdate: formData.birthdate,
      coreNumber,
      timestamp: Date.now(),
    }

    localStorage.setItem("numiLeadMagnet", JSON.stringify(lead))

    const existing = JSON.parse(localStorage.getItem("numiLeads") || "[]")
    existing.push(lead)
    localStorage.setItem("numiLeads", JSON.stringify(existing))

    router.push("/lead-magnet/success")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <section
      ref={(el) => {
        if (el) {
          // @ts-ignore
          ref.current = el
          // @ts-ignore
          forwardedRef.current = el
        }
      }}
      className="relative z-20 py-24 md:py-32"
      style={{ background: "#0A0E27" }}
    >
      <div className="px-6 md:px-10">
        {/* Report mockup above form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-12"
          style={{ transform: "scale(1)" }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
            style={{ width: "900px", height: "400px" }}
          >
            <Image
              src={BOOK_IMAGE}
              alt="The Pattern Code Report - NUMI"
              fill
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-lg mx-auto rounded-3xl p-8 md:p-12 relative"
          style={{
            border: "1px solid rgba(216,184,106,0.22)",
            background: "rgba(216,184,106,0.025)",
            boxShadow: "0 0 100px rgba(216,184,106,0.07)",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mb-10"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D8B86A" }}>
              GET YOUR CORE NUMBER REPORT
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
              See your pattern.
              <br />
              <span style={{ color: "#D8B86A" }}>Understand your life.</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Enter your birthdate. Your Core Number is calculated instantly. No quiz, no signup walls, no nonsense. Your personalized report arrives in under 60 seconds.
            </p>
          </motion.div>

          {/* Form fields */}
          <div className="space-y-5">
            {/* First Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-xs tracking-wide uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Your first name"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.firstName ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(216,184,106,0.55)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(216,184,106,0.08)"
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)"
                  e.target.style.boxShadow = "none"
                }}
              />
              {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
            >
              <label className="block text-xs tracking-wide uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Where should we send your report?"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.email ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(216,184,106,0.55)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(216,184,106,0.08)"
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)"
                  e.target.style.boxShadow = "none"
                }}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </motion.div>

            {/* Date of Birth */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-xs tracking-wide uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                Birthdate
              </label>
              <input
                type="text"
                value={formData.birthdate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "")
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2)
                  }
                  if (value.length >= 5) {
                    value = value.slice(0, 5) + "/" + value.slice(5, 9)
                  }
                  handleInputChange("birthdate", value)
                }}
                placeholder="DD / MM / YYYY"
                maxLength={10}
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.birthdate ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(216,184,106,0.55)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(216,184,106,0.08)"
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)"
                  e.target.style.boxShadow = "none"
                }}
              />
              {errors.birthdate && <p className="text-xs text-red-400 mt-1">{errors.birthdate}</p>}

              {/* Core Number Preview (blurred) */}
              {coreNumberPreview && !isSubmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-4"
                >
                  <div
                    className="text-8xl font-extralight"
                    style={{
                      color: "#D8B86A",
                      filter: "blur(10px)",
                    }}
                  >
                    {coreNumberPreview}
                  </div>
                  <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Submit to reveal your full breakdown
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-center mt-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                Your birthdate is used only to calculate your Core Number. It is never stored or shared.
              </p>
            </motion.div>

            {/* Submit button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-sm tracking-widest uppercase font-semibold flex items-center justify-center gap-2 relative overflow-hidden cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #D8B86A, #C4A055)",
                color: "#0A0E27",
                opacity: isSubmitting ? 0.7 : 1,
              }}
              whileHover={isSubmitting ? {} : { scale: 1.02, brightness: 1.08 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Calculating your pattern...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Get My Core Number Report  →
                </>
              )}
              {/* Shimmer effect */}
              <motion.span
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                  transform: "skewX(-20deg)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.button>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <Lock size={14} style={{ color: "#D8B86A" }} />
              <span className="text-xs tracking-wide" style={{ color: "rgba(255,255,255,0.3)" }}>
                Free • No spam • Instant access
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 8: FINAL CTA - V2
// ============================================================================
function FinalCTASection({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={ref}
      className="relative z-20 py-24 md:py-32 text-center overflow-hidden"
      style={{ background: "#0F0F23" }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "450px",
          background: "radial-gradient(ellipse, rgba(216,184,106,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 px-6 md:px-10 max-w-2xl mx-auto">
        {/* Gold rule */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: "60px" } : {}}
          transition={{ duration: 0.6 }}
          className="h-px mx-auto mb-16"
          style={{ background: "rgba(216,184,106,0.2)" }}
        />

        {/* Repeating number strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.08 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[11px] tracking-[0.5em] mb-12 overflow-hidden"
          style={{ color: "rgba(216,184,106,0.08)" }}
        >
          1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 11 · 22 · 33
        </motion.div>

        {/* Pain callback - stakes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left"
        >
          <div className="rounded-xl p-6" style={{ background: "rgba(255,100,100,0.05)", border: "1px solid rgba(255,100,100,0.1)" }}>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "rgba(255,100,100,0.6)" }}>
              Keep guessing:
            </p>
            <p className="text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Another year of working hard against your own wiring, wondering why the same things keep happening.
            </p>
          </div>
          <div className="rounded-xl p-6" style={{ background: "rgba(216,184,106,0.05)", border: "1px solid rgba(216,184,106,0.2)" }}>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#D8B86A" }}>
              See the pattern:
            </p>
            <p className="text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Finally understand the machine you're working with. Every decision becomes clearer.
            </p>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl md:text-5xl font-light leading-[1.2] mb-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Your blueprint has been there since birth.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-2"
            style={{
              background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Today you finally get to see it.
          </motion.div>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-base md:text-lg mb-10"
          style={{ color: "rgba(255,255,255,0.48)" }}
        >
          Free. Takes 60 seconds. No email spam. Just your Core Number, explained clearly, for the first time.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={scrollToForm}
          className="relative px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium overflow-hidden cursor-pointer inline-flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #D8B86A, #C4A055)",
            color: "#0A0E27",
          }}
          whileHover={{ scale: 1.03, brightness: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          <Download size={18} />
          Get My Core Number Report — Free  →
          {/* Shimmer effect */}
          <motion.span
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              transform: "skewX(-20deg)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.button>
      </div>
    </section>
  )
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="relative z-20 py-10 px-6 flex flex-col items-center gap-4" style={{ background: "#0a0d1a" }}>
      {/* NUMI wordmark */}
      <p className="text-xl tracking-[0.4em] uppercase font-extralight text-white" style={{ opacity: 0.4 }}>
        NUMI
      </p>

      {/* Disclaimer */}
      <p className="text-xs text-center max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
        NUMI is a self-reflection tool for personal awareness. It does not provide medical, psychological, financial, or professional advice. Your Core Number is for introspective use only.
      </p>

      {/* Copyright */}
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
        © 2025 NUMI International. All rights reserved.
      </p>
    </footer>
  )
}

// ============================================================================
// GOLD DIVIDER
// ============================================================================
function GoldDivider() {
  return (
    <div className="flex justify-center">
      <div className="h-px" style={{ width: "120px", background: "rgba(216,184,106,0.2)" }} />
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function LeadMagnetPage() {
  const formRef = useRef<HTMLDivElement>(null)

  return (
    <main className="min-h-screen" style={{ background: "#0A0E27", color: "#fff" }}>
      {/* Global elements */}
      <ScrollProgressBar />
      <FloatingParticles />
      <VignetteOverlay />

      {/* Section 1: Hero (Attention) */}
      <HeroSection formRef={formRef} />

      <GoldDivider />

      {/* Section 2: Problem (Need) */}
      <ProblemSection />

      {/* Section 3: Solution (Satisfaction) */}
      <SolutionSection />

      {/* Section 4: Before/After (Visualisation - Part 1) */}
      <BeforeAfterSection />

      {/* Section 5: Benefits (Visualisation - Part 2) */}
      <BenefitsSection />

      {/* Section 6: Testimonials (Visualisation - Part 3) */}
      <TestimonialsSection />

      {/* Section 7: Form (Action) */}
      <FormSection forwardedRef={formRef} />

      {/* Section 8: Final CTA (Action - reinforcement) */}
      <FinalCTASection formRef={formRef} />

      <Footer />
    </main>
  )
}
