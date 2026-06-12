"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Info } from "lucide-react";
import { StaticBookMockup } from "@/components/StaticBookMockup";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

export default function LeadMagnetV2Page() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fieldFocused, setFieldFocused] = useState("");

  // Refs for scroll
  const formRef = useRef<HTMLDivElement>(null);

  // InView hooks
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const benefitsRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const optinRef = useRef(null);
  const finalRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const whatIsInView = useInView(whatIsRef, { once: true, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const beforeAfterInView = useInView(beforeAfterRef, { once: true, amount: 0.2 });
  const optinInView = useInView(optinRef, { once: true, amount: 0.3 });
  const finalInView = useInView(finalRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setMounted(true);

    // Scroll progress
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const scroll = window.scrollY;
      const progress = Math.min((scroll / docHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const leadMagnetData = {
      firstName: formData.firstName,
      email: formData.email,
      birthDate: `${formData.birthDay}/${formData.birthMonth}/${formData.birthYear}`,
      timestamp: new Date().toISOString(),
      source: "lead-magnet-v2"
    };

    localStorage.setItem("numiLeadMagnet", JSON.stringify(leadMagnetData));
    const existingLeads = JSON.parse(localStorage.getItem("numiLeads") || "[]");
    existingLeads.push(leadMagnetData);
    localStorage.setItem("numiLeads", JSON.stringify(existingLeads));

    setTimeout(() => {
      router.push("/lead-magnet-v2/success");
    }, 1200);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const benefits = [
    "Understand why certain emotional cycles keep repeating in your life",
    "See how your natural decision style shapes your relationships and career",
    "Recognize hidden strengths you've overlooked and blind spots that trip you up",
    "Learn your pattern for ambition, burnout, and how to recharge sustainably",
    "Get your first personal NUMI insight in minutes — free, no experience needed",
  ];

  const painPoints = [
    "Reading all the self-help books but still feeling stuck in the same patterns",
    "Making decisions you later regret, wondering why you didn't see it coming",
    "Relationship dynamics that repeat — same type of person, same outcome, different face",
    "Working harder than everyone else but burning out while others thrive",
    "Feeling like you're broken because what works for others doesn't work for you",
  ];

  const beforeBullets = [
    "Feeling drained but not knowing why",
    "Repeating the same relationship or work patterns",
    "Overthinking every decision",
    "Wondering why life feels \"off\"",
    "Blaming yourself for patterns you never learned to read",
  ];

  const afterBullets = [
    "More emotional clarity",
    "Better self-understanding",
    "A clearer view of your hidden patterns",
    "More aligned decisions",
    "Feeling seen instead of broken",
  ];

  // Check if form is valid
  const isFormValid = formData.firstName && formData.email?.includes("@") && formData.birthDay && formData.birthMonth && formData.birthYear;

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* === CINEMATIC BACKGROUND === */}
      <div className="fixed inset-0 bg-[#0A0E27]">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0F0F23] to-[#0a0d1a]" />

        {mounted && !prefersReducedMotion && (
          <>
            {/* Gold ambient glow - top left */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full opacity-20 animate-ambient-drift-slow"
              style={{
                top: "-200px",
                left: "-200px",
                background: "radial-gradient(circle, rgba(216, 184, 106, 0.15) 0%, rgba(216, 184, 106, 0.05) 40%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />
            {/* Deep blue glow - bottom right */}
            <div
              className="absolute w-[900px] h-[900px] rounded-full opacity-15 animate-ambient-drift"
              style={{
                bottom: "-250px",
                right: "-250px",
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%)",
                filter: "blur(120px)",
              }}
            />

            {/* === FLOATING NUMEROLOGY PARTICLES === */}
            {Array.from({ length: 30 }).map((_, i) => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const duration = 8 + Math.random() * 10;
              const delay = Math.random() * 5;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-amber-400/20 pointer-events-none"
                  style={{
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    filter: "blur(0.5px)",
                  }}
                  initial={{ x: `${x}%`, y: `${y}%`, opacity: 0 }}
                  animate={{ x: `${x}%`, y: `${y}%`, opacity: [0.2, 0.5, 0.2] }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
            {/* Floating numerology numbers */}
            {["1", "3", "5", "7", "9", "11", "22", "33"].map((num, i) => {
              const positions = [
                { left: 10, top: 15 },
                { left: 85, top: 12 },
                { left: 15, top: 70 },
                { left: 80, top: 75 },
                { left: 50, top: 25 },
                { left: 45, top: 80 },
                { left: 8, top: 45 },
                { left: 88, top: 50 },
              ];
              const pos = positions[i % positions.length];
              const duration = 15 + Math.random() * 10;
              const delay = i * 2;
              return (
                <motion.div
                  key={`num-${i}`}
                  className="absolute text-amber-400/15 font-medium text-base pointer-events-none"
                  initial={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    left: [`${pos.left}%`, `${pos.left + (Math.random() - 0.5) * 10}%`, `${pos.left}%`],
                    top: [`${pos.top}%`, `${pos.top + (Math.random() - 0.5) * 15}%`, `${pos.top}%`],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {num}
                </motion.div>
              );
            })}
          </>
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5, 10, 20, 0.4) 100%)",
          }}
        />
      </div>

      {/* === SCROLL PROGRESS BAR === */}
      {mounted && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">

        {/* === SECTION 1: HERO - PAIN FIRST === */}
        <section ref={heroRef} className="relative min-h-screen flex items-center px-6 py-24 md:py-32">
          {/* Animated Shader Background - Hero Only */}
          <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-40">
            <AnimatedShaderBackground />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E27] to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Content */}
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration }}
                className="text-center lg:text-left"
              >
                {/* Pain-First Hook */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                  You're Working On Yourself.
                  <span className="block mt-4 text-white/50">
                    But Something Still Feels... Off.
                  </span>
                </h1>

                {/* Agitate the pain */}
                <p className="text-base md:text-lg text-white/60 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  You've read the books. Tried the journaling. Maybe even therapy. But the same emotional cycles keep repeating — same relationship patterns, same work struggles, same burnout.
                </p>

                <p className="text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  <span className="text-[#D8B86A]">It's not your fault.</span> You just haven't learned to read YOUR pattern yet.
                </p>

                {/* Pleasure/Solution reveal */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-10 max-w-lg mx-auto lg:mx-0">
                  <p className="text-sm text-white/40 mb-3">Your birthdate holds a hidden pattern that reveals:</p>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D8B86A]" strokeWidth={3} />
                      <span>Why you make decisions the way you do</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D8B86A]" strokeWidth={3} />
                      <span>What triggers your emotional cycles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D8B86A]" strokeWidth={3} />
                      <span>How to work WITH your nature, not against it</span>
                    </li>
                  </ul>
                </div>

                {/* Hero CTA Button */}
                <motion.button
                  onClick={scrollToForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D8B86A]/20 mx-auto lg:mx-0 overflow-hidden"
                >
                  {mounted && !prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Calculate My Pattern Code</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 blur-xl bg-[#D8B86A]/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <p className="text-white/30 text-xs mt-4 max-w-md mx-auto lg:mx-0">
                  Free • Takes 2 minutes • Your birthdate is only used to calculate your number
                </p>
              </motion.div>

              {/* Right: Book Visual */}
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration * 1.2 }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.03, rotateY: 5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full max-w-md aspect-[4/5] cursor-pointer"
                >
                  <StaticBookMockup className="w-full h-full" />
                  <div className="absolute inset-0 rounded-3xl bg-[#D8B86A]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-3xl" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === SECTION 2: WHAT IS A PATTERN CODE? === */}
        <section ref={whatIsRef} className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              animate={whatIsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              className="bg-gradient-to-br from-[#D8B86A]/10 to-[#D8B86A]/2 border border-[#D8B86A]/20 rounded-2xl p-8 md:p-10 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#D8B86A]/10 border border-[#D8B86A]/30 flex items-center justify-center">
                  <Info className="w-6 h-6 text-[#D8B86A]" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What is a Pattern Code?
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                Your Pattern Code is your <span className="text-[#D8B86A] font-semibold">Life Path Number</span> — a single number (1-9) or master number (11, 22, 33) calculated from your birthdate in numerology.
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                It reveals your natural <span className="text-white/80">decision-making style</span>, <span className="text-white/80">emotional cycles</span>, <span className="text-white/80">relationship dynamics</span>, and <span className="text-white/80">growth patterns</span> — so you can stop working against yourself and start working WITH your nature.
              </p>
            </motion.div>
          </div>
        </section>

        {/* === SECTION 3: PAIN POINTS === */}
        <section ref={benefitsRef} className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center tracking-tight">
                Sound Familiar?
              </h2>

              <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
                These are the signs that you're operating without access to your pattern:
              </p>

              <ul className="space-y-5">
                {painPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    animate={benefitsInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.1 + i * 0.08 }}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-4 text-white/60 text-base md:text-lg leading-relaxed cursor-pointer group p-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <motion.span
                      className="text-white/30 mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      •
                    </motion.span>
                    <span className="group-hover:text-white/70 transition-colors duration-200">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* === SECTION 4: WHAT YOU'LL DISCOVER === */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 text-center tracking-tight">
                Your Pattern Reveals
              </h2>

              <ul className="space-y-5">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    animate={benefitsInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.1 + i * 0.08 }}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-4 text-white/70 text-base md:text-lg leading-relaxed cursor-pointer group p-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <motion.span
                      className="text-[#D8B86A] mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      •
                    </motion.span>
                    <span className="group-hover:text-white/80 transition-colors duration-200">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* === SECTION 5: BEFORE VS AFTER === */}
        <section ref={beforeAfterRef} className="py-16 md:py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate={beforeAfterInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                From Feeling Lost To Seeing Your Pattern
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Before */}
              <motion.div
                initial="hidden"
                animate={beforeAfterInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.15 }}
                className="bg-white/[0.02] rounded-2xl p-6 md:p-8 border border-white/5"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Before NUMI</h3>
                <ul className="space-y-4">
                  {beforeBullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/50 leading-relaxed">
                      <span className="text-white/20 mt-1">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* After */}
              <motion.div
                initial="hidden"
                animate={beforeAfterInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.25 }}
                className="relative bg-gradient-to-br from-[#D8B86A]/10 to-[#D8B86A]/2 rounded-2xl p-6 md:p-8 border border-[#D8B86A]/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#D8B86A]/5 blur-3xl" />
                <h3 className="text-xl md:text-2xl font-semibold text-[#D8B86A] mb-6 relative">After NUMI</h3>
                <ul className="space-y-4 relative">
                  {afterBullets.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={beforeAfterInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.4 + i * 0.1 }}
                      className="flex items-start gap-3 text-white/70 leading-relaxed"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={beforeAfterInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : 0.35 + i * 0.1, type: "spring" }}
                        className="text-[#D8B86A] mt-0.5"
                      >
                        <Check className="w-5 h-5" strokeWidth={3} />
                      </motion.span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === TESTIMONIALS SECTION === */}
        <TestimonialsSection />

        {/* === SECTION 6: OPT-IN === */}
        <section ref={optinRef} className="py-24 md:py-32 px-6">
          <div className="max-w-md mx-auto">
            <motion.div
              initial="hidden"
              animate={optinInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              ref={formRef}
            >
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                {mounted && !prefersReducedMotion && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/5 via-transparent to-transparent opacity-50" />
                )}

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center relative">Calculate Your Pattern Code</h2>
                <p className="text-white/50 text-sm text-center mb-8 relative">
                  Enter your details to get your free Pattern Code guide and unlock your first NUMI insight.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 relative">
                  {/* First Name */}
                  <div>
                    <motion.input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      onFocus={() => setFieldFocused("firstName")}
                      onBlur={() => setFieldFocused("")}
                      animate={{
                        borderColor: fieldFocused === "firstName" ? "rgba(216, 184, 106, 0.5)" : "rgba(255, 255, 255, 0.1)",
                        scale: fieldFocused === "firstName" ? 1.01 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200"
                    />
                    <AnimatePresence>
                      {formData.firstName && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-4 top-[17px] text-[#D8B86A]"
                        >
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <motion.input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFieldFocused("email")}
                      onBlur={() => setFieldFocused("")}
                      animate={{
                        borderColor: fieldFocused === "email" ? "rgba(216, 184, 106, 0.5)" : "rgba(255, 255, 255, 0.1)",
                        scale: fieldFocused === "email" ? 1.01 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200 pr-12"
                    />
                    <AnimatePresence>
                      {formData.email?.includes("@") && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-4 top-[17px] text-[#D8B86A]"
                        >
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Birthdate */}
                  <div>
                    <label className="block text-white/50 text-sm mb-2">Birthdate</label>
                    <div className="grid grid-cols-3 gap-2">
                      <motion.input
                        type="number"
                        placeholder="DD"
                        min="1"
                        max="31"
                        value={formData.birthDay}
                        onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                        onFocus={() => setFieldFocused("birthDay")}
                        animate={{
                          borderColor: fieldFocused === "birthDay" ? "rgba(216, 184, 106, 0.5)" : "rgba(255, 255, 255, 0.1)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="px-3 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-center placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200"
                      />
                      <motion.input
                        type="number"
                        placeholder="MM"
                        min="1"
                        max="12"
                        value={formData.birthMonth}
                        onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                        onFocus={() => setFieldFocused("birthMonth")}
                        animate={{
                          borderColor: fieldFocused === "birthMonth" ? "rgba(216, 184, 106, 0.5)" : "rgba(255, 255, 255, 0.1)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="px-3 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-center placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200"
                      />
                      <motion.input
                        type="number"
                        placeholder="YYYY"
                        min="1900"
                        max="2026"
                        value={formData.birthYear}
                        onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                        onFocus={() => setFieldFocused("birthYear")}
                        animate={{
                          borderColor: fieldFocused === "birthYear" ? "rgba(216, 184, 106, 0.5)" : "rgba(255, 255, 255, 0.1)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="px-3 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-center placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200"
                      />
                    </div>
                    <p className="text-white/30 text-xs mt-2">Used only to calculate your Life Path Number.</p>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2"
                        role="alert"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    animate={{
                      backgroundColor: isFormValid ? undefined : "rgba(216, 184, 106, 0.5)",
                    }}
                    className="group relative w-full py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed overflow-hidden"
                  >
                    {mounted && !prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-[#0A0E27] border-t-transparent rounded-full"
                          />
                          <span>Calculating Your Pattern...</span>
                        </>
                      ) : (
                        <>
                          <span>Calculate My Pattern Code</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 blur-xl bg-[#D8B86A]/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 text-white/30 text-xs pt-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={optinInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-[#D8B86A]" strokeWidth={3} />
                      Free
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={optinInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-[#D8B86A]" strokeWidth={3} />
                      No spam
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={optinInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-[#D8B86A]" strokeWidth={3} />
                      Instant access
                    </motion.span>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === FINAL CTA === */}
        <section ref={finalRef} className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate={finalInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
                You're Not Broken.
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                  You Just Haven't Learned To Read Your Pattern Yet.
                </span>
              </h2>

              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D8B86A]/20 mx-auto overflow-hidden"
              >
                {mounted && !prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>Calculate My Pattern Code</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 blur-xl bg-[#D8B86A]/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* === FOOTER === */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/30 text-xs leading-relaxed">
              NUMI is designed for self-reflection and personal growth. It does not provide medical, financial, legal, or professional advice.
            </p>
            <p className="text-white/20 text-xs mt-6">© 2026 NUMI. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
