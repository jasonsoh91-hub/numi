"use client"

import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, XCircle, CheckCircle, Loader2, Sparkles } from "lucide-react"
import { StaticBookMockup } from "@/components/StaticBookMockup"
import { calculateCoreNumber } from "@/lib/calculateCoreNumber"
import { subscribeToAC } from "@/lib/subscribe"

// ============================================================================
// FLOATING PARTICS BACKGROUND COMPONENT
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
    // Generate particle configs only on client side after hydration
    const configs = PARTICLE_NUMBERS.map((num, i) => ({
      num,
      fontSize: 10 + Math.random() * 12,
      opacity: 0.06 + Math.random() * 0.06,
      top: 10 + (i * 12) % 80,
      left: 5 + (i * 13) % 90,
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 2,
      yRange: 20 + Math.random() * 20,
    }))
    setParticles(configs)
  }, [])

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />
  }

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
// SCROLL PROGRESS BAR COMPONENT
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
// VIGNETTE OVERLAY COMPONENT
// ============================================================================
function VignetteOverlay() {
  return (
    <div
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
      }}
    />
  )
}

// ============================================================================
// SECTION 1: HERO
// ============================================================================
function HeroSection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const headlineY = useTransform(scrollY, [0, 200], [0, -30])
  const bookScale = useTransform(scrollY, [0, 300], [1, 0.94])

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0A0E27", paddingTop: "80px" }}
    >
      {/* CSS Gradient Background (fallback for shader) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(216, 184, 106, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.04) 0%, transparent 60%),
            #0A0E27
          `,
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(216,184,106,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Pre-headline label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
          style={{ color: "#D8B86A" }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">A Free Guide from NUMI</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          style={{ y: headlineY }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Your Parents Gave You A Name.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-2"
            style={{
              background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Birthdate Gave You A Pattern.
          </motion.div>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-lg md:text-xl max-w-xl mx-auto text-center leading-relaxed mb-12"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Hidden inside the numbers of your birthdate is a code — a set of patterns that show up in how you make decisions, why certain relationships feel effortless and others drain you, and why you keep hitting the same walls.
          <br />
          <br />
          Most people spend years trying to fix the symptoms. NUMI helps you read the pattern underneath.
        </motion.p>

        {/* Book mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ scale: prefersReducedMotion ? 1 : bookScale }}
          className="relative mx-auto max-w-md mb-12"
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
            style={{ boxShadow: "0 0 60px rgba(216,184,106,0.15)" }}
            className="rounded-3xl"
          >
            <StaticBookMockup className="scale-75 md:scale-100" />
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          onClick={scrollToForm}
          className="px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #D8B86A, #C4A055)",
            color: "#0A0E27",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Decode My Pattern →
        </motion.button>

        {/* Micro-trust copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-4 text-xs tracking-widest text-center"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Free · Takes 30 seconds · No experience needed
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
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: "rgba(216,184,106,0.4)" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2: WHAT IS THE PATTERN CODE?
// ============================================================================
function WhatIsPatternCodeSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const paragraphs = [
    "Every birthdate contains a set of numbers. NUMI reduces those numbers down to a single Core Number — your Pattern Code.",
    "It's not a personality quiz. It's not a horoscope.",
    "It's a framework for understanding the recurring themes in your life: how you're wired to lead, love, struggle, and grow.",
    "Your Pattern Code has been there since birth. Most people just haven't learned to read it yet.",
  ]

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 px-6 text-center"
      style={{ background: "#0F0F23" }}
    >
      {/* Decorative vertical line */}
      <div className="mx-auto mb-6" style={{ width: "2px", height: "60px", background: "#D8B86A" }} />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-6 text-xs tracking-[0.3em] uppercase"
        style={{ color: "#D8B86A" }}
      >
        What Is The Pattern Code?
      </motion.p>

      {/* Body paragraphs */}
      <div className="max-w-2xl mx-auto">
        {paragraphs.map((text, i) => {
          const isBoldLine = i === 1
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={isBoldLine ? "mb-5 font-light text-xl md:text-2xl text-white" : "mb-5 text-base md:text-lg leading-relaxed"}
              style={isBoldLine ? {} : { color: "rgba(255,255,255,0.7)" }}
            >
              {text}
            </motion.p>
          )
        })}
      </div>

      {/* Decorative numbers */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-6xl font-extralight tracking-[0.5em]"
        style={{ color: "rgba(216,184,106,0.15)" }}
      >
        3 · 7 · 11
      </motion.div>
    </section>
  )
}

// ============================================================================
// SECTION 3: BENEFITS
// ============================================================================
function BenefitsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const benefits = [
    {
      title: "Why you keep repeating the same patterns",
      body: "in work, relationships, and decisions — and what your Core Number reveals about the root cause",
    },
    {
      title: "The hidden tension in your wiring",
      body: "why some of your greatest strengths create your biggest frustrations",
    },
    {
      title: "How your Core Number shapes your energy",
      body: "why certain environments and people light you up, and others quietly deplete you",
    },
    {
      title: "The number breakdown behind your birthdate",
      body: "a clear, step-by-step read of what each digit contributes to your pattern",
    },
    {
      title: "What NUMI sees in your numbers",
      body: "a preview of the deeper insights waiting in your full reading",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 md:py-32 px-6"
      style={{ background: "#0A0E27" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#D8B86A" }}
        >
          What You'll Discover Inside
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-light text-white text-center max-w-2xl mx-auto mb-16"
        >
          In 10 minutes, you'll understand things about yourself that took years to notice.
        </motion.h2>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6 md:p-8 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(216,184,106,0.12)",
              }}
              whileHover={{
                border: "1px solid rgba(216,184,106,0.3)",
                background: "rgba(216,184,106,0.04)",
              }}
            >
              <span className="text-xl" style={{ color: "#D8B86A" }}>
                ✦
              </span>
              <h3 className="text-white font-medium text-base md:text-lg mt-3 mb-2">
                {benefit.title}
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                — {benefit.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 4: BEFORE / AFTER
// ============================================================================
function BeforeAfterSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const beforeItems = [
    "Feeling like you're working hard but running in circles",
    "Taking on roles and relationships that don't quite fit — but not knowing why",
    "Mistaking your patterns for personality flaws",
    "Trying to fix the surface without seeing the structure beneath",
    "Wondering why certain things always seem harder for you than for others",
  ]

  const afterItems = [
    "Seeing your recurring themes for what they actually are — information, not failure",
    "Understanding why you're wired the way you are — without judgment",
    "Recognising which environments and relationships align with your pattern",
    "Knowing where your energy naturally flows — and where it's being leaked",
    "A language for yourself that finally makes sense",
  ]

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 md:py-32 px-6"
      style={{ background: "#0F0F23" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs tracking-[0.3em] uppercase mb-12"
          style={{ color: "#D8B86A" }}
        >
          Two Ways To Move Through Life
        </motion.p>

        {/* Two columns */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Before column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-light mb-6 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              <XCircle size={16} style={{ color: "rgba(255,100,100,0.5)" }} />
              Without Your Pattern Code
            </h3>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
                  className="text-sm md:text-base leading-relaxed pl-3"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  – {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Vertical divider on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* After column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-light mb-6 flex items-center gap-2 text-white">
              <CheckCircle size={16} style={{ color: "#D8B86A" }} />
              With Your Pattern Code
            </h3>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
                  className="text-sm md:text-base leading-relaxed pl-3 flex items-start gap-2"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <span style={{ color: "#D8B86A" }}>✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 5: TESTIMONIALS
// ============================================================================
function TestimonialsSectionCustom() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const testimonials = [
    {
      quote: "I was sceptical. I'm not really into this kind of thing. But the breakdown of my Core Number described something I've never been able to put into words about myself. It was uncomfortable in the best way.",
      attribution: "Sarah K. · Core Number 7",
    },
    {
      quote: "I kept wondering why I'd lose momentum right when things were going well. Seeing it laid out as a pattern — not a flaw — genuinely changed how I approached my work.",
      attribution: "Marcus T. · Core Number 4",
    },
    {
      quote: "It's not magic. It's more like a mirror. I use my Pattern Code the same way I'd use a Myers-Briggs result — except this one actually stuck.",
      attribution: "Priya M. · Core Number 3",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 md:py-32 px-6"
      style={{ background: "#0A0E27" }}
    >
      {/* Header */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center text-xs tracking-[0.3em] uppercase mb-4"
        style={{ color: "#D8B86A" }}
      >
        What People Are Saying
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl font-light text-white text-center mb-16"
      >
        Real people. Real patterns. Real shifts.
      </motion.h2>

      {/* Testimonial cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-5xl font-light mb-4" style={{ color: "rgba(216,184,106,0.3)" }}>
              "
            </div>
            <p className="text-sm md:text-base leading-relaxed italic mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
              {testimonial.quote}
            </p>
            <p className="text-xs tracking-wide mt-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              {testimonial.attribution}
            </p>
            <div className="mt-4 text-xs" style={{ color: "#D8B86A", opacity: 0.6 }}>
              ★★★★★
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 6: OPT-IN FORM
// ============================================================================
function OptInFormSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLDivElement | null> }) {
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
      // Validate date format DD/MM/YYYY
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

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Save to localStorage
    const lead = {
      name: formData.firstName,
      email: formData.email,
      birthdate: formData.birthdate,
      timestamp: Date.now(),
    }

    localStorage.setItem("numiLeadMagnet", JSON.stringify(lead))

    const leads = JSON.parse(localStorage.getItem("numiLeads") || "[]")
    leads.push(lead)
    localStorage.setItem("numiLeads", JSON.stringify(leads))

    await subscribeToAC({
      firstName: formData.firstName,
      email: formData.email,
      birthDate: formData.birthdate,
      listType: "pattern-code",
      source: "lead-magnet-v3",
    })

    // Redirect to success page
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
        // Handle both refs
        if (el) {
          // @ts-ignore
          ref.current = el
          // @ts-ignore
          forwardedRef.current = el
        }
      }}
      className="relative z-10 py-24 md:py-32 px-6"
      style={{ background: "#0F0F23" }}
    >
      <div className="max-w-lg mx-auto">
        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 md:p-12"
          style={{
            border: "1px solid rgba(216,184,106,0.2)",
            background: "rgba(216,184,106,0.03)",
            boxShadow: "0 0 80px rgba(216,184,106,0.08)",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D8B86A" }}>
              Get Your Free Pattern Code Guide
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white">
              Enter your birthdate. We'll show you the pattern.
            </h2>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Your Core Number is calculated directly from the numbers in your birthdate — no birth time, no location needed. Just the date.
            </p>
          </motion.div>

          {/* Form fields */}
          <div className="space-y-5">
            {/* First Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18 }}
            >
              <label className="block text-xs tracking-wide uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="What should we call you?"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.firstName ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(216,184,106,0.5)"
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
              transition={{ delay: 0.26 }}
            >
              <label className="block text-xs tracking-wide uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Where should we send it?"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.email ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(216,184,106,0.5)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(216,184,106,0.08)"
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)"
                  e.target.style.boxShadow = "none"
                }}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </motion.div>

            {/* Birthdate */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.34 }}
            >
              <label className="block text-xs tracking-wide uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                Date of Birth
              </label>
              <input
                type="text"
                value={formData.birthdate}
                onChange={(e) => {
                  // Auto-format as DD/MM/YYYY
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
                  e.target.style.border = "1px solid rgba(216,184,106,0.5)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(216,184,106,0.08)"
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)"
                  e.target.style.boxShadow = "none"
                }}
              />
              {errors.birthdate && <p className="text-xs text-red-400 mt-1">{errors.birthdate}</p>}
              <p className="text-xs text-center mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                Your birthdate is used only to calculate your Core Number. We don't store or share it.
              </p>
            </motion.div>

            {/* Submit button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-sm tracking-widest uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #D8B86A, #C4A055)",
                color: "#0A0E27",
                opacity: isSubmitting ? 0.7 : 1,
              }}
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Calculating your pattern...
                </>
              ) : (
                "Reveal My Pattern Code →"
              )}
            </motion.button>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 mt-6 text-xs tracking-wide"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <span>🔒 Free</span>
              <span>·</span>
              <span>No spam</span>
              <span>·</span>
              <span>Instant access</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 7: FINAL CTA
// ============================================================================
function FinalCTASection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 md:py-32 px-6 text-center"
      style={{ background: "#0A0E27" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(216,184,106,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: "80px" } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 h-px"
          style={{ background: "rgba(216,184,106,0.3)" }}
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-white text-center leading-[1.2]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            Maybe you're not lost.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-2"
            style={{
              background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Maybe you just haven't learned to read the pattern yet.
          </motion.div>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-base md:text-lg mt-6 mb-10"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          The guide is free. The insight is yours to keep.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={scrollToForm}
          className="px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #D8B86A, #C4A055)",
            color: "#0A0E27",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Get My Pattern Code — It's Free →
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
    <footer className="relative z-10 py-10 px-6 flex flex-col items-center gap-4" style={{ background: "#0a0d1a" }}>
      {/* NUMI wordmark */}
      <p className="text-xl tracking-[0.4em] uppercase font-extralight text-white" style={{ opacity: 0.5 }}>
        NUMI
      </p>

      {/* Disclaimer */}
      <p className="text-xs text-center max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
        NUMI is a self-reflection tool designed to support personal awareness and growth. It does not provide medical, psychological, financial, or professional advice. Pattern Code results are intended for introspective use only.
      </p>

      {/* Copyright */}
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
        © 2026 NUMI International (M) SDN BHD All Rights Reserved.
      </p>
    </footer>
  )
}

// ============================================================================
// GOLD HORIZONTAL RULE DIVIDER
// ============================================================================
function GoldDivider() {
  return (
    <div className="flex justify-center my-12">
      <div className="h-px" style={{ width: "120px", background: "rgba(216,184,106,0.2)" }} />
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function LeadMagnetV3Page() {
  const formRef = useRef<HTMLDivElement>(null)

  return (
    <main className="min-h-screen" style={{ background: "#0A0E27", color: "#fff" }}>
      {/* Global elements */}
      <ScrollProgressBar />
      <FloatingParticles />
      <VignetteOverlay />

      {/* Sections */}
      <HeroSection formRef={formRef} />

      <GoldDivider />

      <WhatIsPatternCodeSection />

      <BenefitsSection />

      <BeforeAfterSection />

      <TestimonialsSectionCustom />

      <OptInFormSection forwardedRef={formRef} />

      <FinalCTASection formRef={formRef} />

      <Footer />
    </main>
  )
}
