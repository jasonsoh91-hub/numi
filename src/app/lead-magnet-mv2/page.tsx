"use client"

import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, XCircle, CheckCircle, Loader2, Sparkles } from "lucide-react"
import { StaticBookMockup } from "@/components/StaticBookMockup"

// ============================================================================
// IMAGES FROM Z.AI - All 8 images generated
// ============================================================================
const IMAGES = {
  hero: "https://mfile.z.ai/1781255856162-edc4670c30ff44ec9010a3cf73f27974.png",
  pattern: "https://mfile.z.ai/1781255858685-edd9fed6af88417fa453a32c21124559.png",
  coreNumber: "https://mfile.z.ai/1781255856448-f2e914513f034f56b01a5d9e5b52b5fe.png",
  benefits: "https://mfile.z.ai/1781255990566-19e04b7476ec48568dba808400fb545c.png",
  defaultVsDesign: "https://mfile.z.ai/1781255989501-ac56ec3852fe4b52bad199704f0ed8da.png",
  testimonials: "https://mfile.z.ai/1781255990767-14e592a2ab604fb999aa0ba57086ded4.png",
  form: "https://mfile.z.ai/1781255990312-801d7fbd5b664b1482b47473a850b117.png",
  closing: "https://mfile.z.ai/1781255990159-578334ed9a0143a7946274b70de17597.png",
}

// ============================================================================
// FLOATING PARTICLES BACKGROUND COMPONENT
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
function HeroSection({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) {
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
      {/* Generated hero image as background */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(216, 184, 106, 0.12) 0%, transparent 50%),
            #0A0E27
          `,
        }}
      />

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
          <span className="text-xs tracking-[0.3em] uppercase">Discover the hidden code of your birthdate — free</span>
        </motion.div>

        {/* Opening Pain Hook */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 max-w-3xl mx-auto"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          What if the reason you feel stuck isn't lack of effort —
          <br />
          <span className="italic">it's that no one ever showed you the map?</span>
        </motion.p>

        {/* Main headline */}
        <motion.h1
          style={{ y: headlineY }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            The Most Revealing Thing About You
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-2"
          >
            Isn't Your Personality.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-2"
            style={{
              background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            It's Your Pattern.
          </motion.div>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-center leading-relaxed mb-12"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          You've grown. You've worked on yourself. You've read the books, done the journaling, maybe even the therapy.
          <br />
          <br />
          And still — certain patterns persist. The same relationship dynamics. The same career ceiling. The same inner conflict you can't quite resolve.
          <br />
          <br />
          <span style={{ color: "rgba(216,184,106,0.9)" }}>
            Here's what most self-development tools miss: beneath your personality, beneath your habits, beneath your mindset — there's a <em>structural pattern</em> encoded in something as simple as your date of birth.
          </span>
          <br />
          <br />
          NUMI calls it your Core Number. And once you see it, you can't unsee it.
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
          Unlock My Core Number — It's Free →
        </motion.button>

        {/* Micro-trust copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-4 text-xs tracking-widest text-center"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Free · Instant access · Thousands of people have already discovered theirs
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
// SECTION 2: THE REVELATION (Mindvalley-inspired)
// ============================================================================
function RevelationSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const paragraphs = [
    { text: "Most people spend their entire lives trying to change who they are.", highlight: false },
    { text: "NUMI is built on a different premise: you don't need to change who you are. You need to understand how you're designed.", highlight: true },
    { text: "Every date of birth contains a sequence of numbers. Those numbers reduce to a single value — your Core Number. It's not a personality label. It's not a spiritual belief system. It's a structural map of how you process decisions, how you relate to others, and why certain patterns in your life repeat regardless of how much inner work you do.", highlight: false },
    { text: "This isn't a new idea. Ancient civilisations across multiple continents independently discovered that the numbers present at a person's birth carry meaning. What NUMI has done is build a modern, precise framework for reading that meaning — and put it in your hands for free.", highlight: false },
    { text: "Your Core Number has been operating in your life since the day you were born. Today, you get to read it.", highlight: true, italic: true },
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
        THE DISCOVERY THAT CHANGES EVERYTHING
      </motion.p>

      {/* Body paragraphs */}
      <div className="max-w-3xl mx-auto">
        {paragraphs.map((item, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`mb-6 text-base md:text-lg leading-relaxed ${item.italic ? "italic" : ""}`}
            style={item.highlight ? { color: "#D8B86A", fontSize: "1.15rem", fontWeight: 500 } : { color: "rgba(255,255,255,0.75)" }}
          >
            {item.text}
          </motion.p>
        ))}
      </div>

      {/* Pattern reflection image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-12 mb-8 max-w-3xl mx-auto"
      >
        <img
          src={IMAGES.pattern}
          alt="Woman reflecting on life patterns"
          className="w-full h-auto rounded-2xl"
          style={{ boxShadow: "0 0 60px rgba(216,184,106,0.1)" }}
        />
      </motion.div>

      {/* Core Number UI image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="mt-12 mb-8 max-w-2xl mx-auto"
      >
        <img
          src={IMAGES.coreNumber}
          alt="NUMI Core Number calculation interface"
          className="w-full h-auto rounded-2xl"
          style={{ boxShadow: "0 0 50px rgba(216,184,106,0.08)" }}
        />
        <p className="text-xs text-center mt-3 italic" style={{ color: "rgba(255,255,255,0.3)" }}>
          Your birthdate numbers reduce to a single Core Number
        </p>
      </motion.div>

      {/* Decorative numbers */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-5xl font-extralight tracking-[0.5em]"
        style={{ color: "rgba(216,184,106,0.25)" }}
      >
        3 · 7 · 11 · 22
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
          WHAT AWAITS YOU INSIDE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-light text-white text-center max-w-2xl mx-auto mb-16"
        >
          In the next 10 minutes, you'll see yourself more clearly than you have in years.
        </motion.h2>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer"
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

        {/* Benefits illustration image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <img
            src={IMAGES.benefits}
            alt="Five insight cards showing self-discovery themes"
            className="w-full h-auto rounded-2xl"
            style={{ boxShadow: "0 0 60px rgba(216,184,106,0.12)" }}
          />
        </motion.div>
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
    "Working hard — but on the wrong things, for your particular wiring",
    "Growing — but in directions that don't align with your Core Number's natural momentum",
    "Attracting the same dynamics into your relationships without understanding why",
    "Treating your deepest recurring struggles as personal failures",
    "Doing everything right on the surface — and still feeling like something essential is missing",
  ]

  const afterItems = [
    "Understanding the structural code that has always been running beneath your choices",
    "Channelling your energy into directions that align with how you're actually designed",
    "Recognising the pattern in your relationships — and choosing more consciously within it",
    "Turning your Core Number's natural tension into your greatest source of growth",
    "Building a life that fits you — not a generic template for human flourishing",
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
          TWO WAYS TO MOVE THROUGH LIFE
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
              Living by default
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
              Living by design
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

        {/* Before/After comparison image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <img
            src={IMAGES.defaultVsDesign}
            alt="Living by default vs living by design comparison"
            className="w-full h-auto rounded-2xl"
            style={{ boxShadow: "0 0 60px rgba(216,184,106,0.12)" }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 5: TESTIMONIALS (Mindvalley-inspired)
// ============================================================================
function TestimonialsSectionCustom() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const testimonials = [
    {
      quote: "I've invested significantly in my personal growth — courses, coaching, retreats. My Core Number gave me something I'd never had before: a single organising principle that made everything else click. I wish I'd had this ten years ago.",
      attribution: "Lena F. · Core Number 11",
    },
    {
      quote: "I kept wondering why, despite all the growth work I'd done, a specific pattern in my career kept recurring. My Core Number described that pattern exactly — and gave me a framework for understanding it instead of fighting it. That shift alone was worth everything.",
      attribution: "Marcus J. · Core Number 4",
    },
    {
      quote: "NUMI doesn't replace any of the other tools I use. It sits underneath them. It's the foundation I didn't know I was missing.",
      attribution: "Priya A. · Core Number 7",
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
        WHAT PEOPLE ARE EXPERIENCING
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl font-light text-white text-center mb-16"
      >
        From people who were already doing the work — and found the missing piece.
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

      {/* Testimonials illustration image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-16 max-w-4xl mx-auto"
      >
        <img
          src={IMAGES.testimonials}
          alt="Premium testimonial cards with reviews"
          className="w-full h-auto rounded-2xl"
          style={{ boxShadow: "0 0 60px rgba(216,184,106,0.12)" }}
        />
      </motion.div>
    </section>
  )
}

// ============================================================================
// SECTION 6: OPT-IN FORM
// ============================================================================
function OptInFormSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLDivElement> }) {
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

    await new Promise((resolve) => setTimeout(resolve, 1200))

    const lead = {
      name: formData.firstName,
      email: formData.email,
      birthdate: formData.birthdate,
      timestamp: Date.now(),
      version: "mindvalley-inspired-v2",
    }

    localStorage.setItem("numiLeadMagnetMV2", JSON.stringify(lead))

    const leads = JSON.parse(localStorage.getItem("numiLeadsMV2") || "[]")
    leads.push(lead)
    localStorage.setItem("numiLeadsMV2", JSON.stringify(leads))

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
              YOUR FREE PATTERN CODE GUIDE IS WAITING
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white">
              You've done the work. Now read the map.
            </h2>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Enter your birthdate and we'll calculate your Core Number — the single most revealing thing your date of birth contains. The full breakdown is waiting for you on the other side.
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
              <label
                htmlFor="firstName"
                className="block text-xs tracking-wide uppercase mb-2"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                First Name
              </label>
              <input
                id="firstName"
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
              <label
                htmlFor="email"
                className="block text-xs tracking-wide uppercase mb-2"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Your best email address"
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
              <label
                htmlFor="birthdate"
                className="block text-xs tracking-wide uppercase mb-2"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Birthdate
              </label>
              <input
                id="birthdate"
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
                  Calculating your Core Number...
                </>
              ) : (
                "Calculate My Core Number — Free →"
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

        {/* Form illustration image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 max-w-lg mx-auto"
        >
          <img
            src={IMAGES.form}
            alt="NUMI app showing Core Number calculation"
            className="w-full h-auto rounded-2xl"
            style={{ boxShadow: "0 0 60px rgba(216,184,106,0.12)" }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 7: FINAL CTA
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
        {/* Opening pain callback */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl font-light leading-relaxed mb-10"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          The pattern has always been there.
          <br />
          The only thing missing was someone to show you how to read it.
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl md:text-5xl font-light text-white text-center leading-[1.2]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            This is the guide you didn't know you needed.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-2"
            style={{
              background: "linear-gradient(90deg, #D8B86A, #F4D47A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            And it costs you nothing to find out.
          </motion.div>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-base md:text-lg mt-6 mb-10"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Thousands of people have already discovered their Core Number. Some called it the missing piece. Some said it explained the decade they couldn't. Some just said: <em>finally.</em>
          <br />
          <br />
          <span style={{ color: "#D8B86A" }}>Your turn takes 30 seconds.</span>
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
          Unlock My Core Number — It's Free →
        </motion.button>

        {/* Closing image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <img
            src={IMAGES.closing}
            alt="Woman at sunrise with clarity and possibility"
            className="w-full h-auto rounded-2xl"
            style={{ boxShadow: "0 0 60px rgba(216,184,106,0.15)" }}
          />
        </motion.div>
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
        © 2025 NUMI. All rights reserved.
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
export default function LeadMagnetMV2Page() {
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

      <RevelationSection />

      <BenefitsSection />

      <BeforeAfterSection />

      <TestimonialsSectionCustom />

      <OptInFormSection forwardedRef={formRef} />

      <FinalCTASection formRef={formRef} />

      <Footer />
    </main>
  )
}
