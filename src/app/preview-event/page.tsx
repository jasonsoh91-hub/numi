"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Calendar, Clock, Users, Sparkles } from "lucide-react";

export default function PreviewEventPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
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
  const eventDetailsRef = useRef(null);
  const benefitsRef = useRef(null);
  const trustRef = useRef(null);
  const optinRef = useRef(null);
  const finalRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const eventDetailsInView = useInView(eventDetailsRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const trustInView = useInView(trustRef, { once: true, amount: 0.2 });
  const optinInView = useInView(optinRef, { once: true, amount: 0.3 });
  const finalInView = useInView(finalRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setMounted(true);

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

    if (!formData.firstName || !formData.email) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const eventData = {
      firstName: formData.firstName,
      email: formData.email,
      timestamp: new Date().toISOString(),
      source: "preview-event"
    };

    localStorage.setItem("numiEventRegistration", JSON.stringify(eventData));
    const existingRegistrations = JSON.parse(localStorage.getItem("numiEventRegistrations") || "[]");
    existingRegistrations.push(eventData);
    localStorage.setItem("numiEventRegistrations", JSON.stringify(existingRegistrations));

    setTimeout(() => {
      router.push("/preview-event/thank-you");
    }, 1200);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const benefits = [
    "Discover your personal NUMI Pattern Code live",
    "Learn how to read the hidden patterns in your life",
    "Experience a guided self-discovery session",
    "Get your questions answered in real-time",
    "Connect with like-minded seekers",
  ];

  const whatYoullLearn = [
    "How your birthdate reveals your Core Pattern",
    "Why you keep repeating certain emotional cycles",
    "Your natural decision-making style",
    "Hidden strengths you may not have noticed",
    "How to align your life with your Pattern Code",
  ];

  const isFormValid = formData.firstName && formData.email?.includes("@");

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* === CINEMATIC BACKGROUND === */}
      <div className="fixed inset-0 bg-[#0A0E27]">
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

        {/* === SECTION 1: HERO === */}
        <section ref={heroRef} className="min-h-screen flex items-center px-6 py-24 md:py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Content */}
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#D8B86A]/10 border border-[#D8B86A]/30 rounded-full mb-8"
                >
                  <Sparkles className="w-4 h-4 text-[#D8B86A]" />
                  <span className="text-[#D8B86A] text-sm font-medium">Live Preview Event</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                  Discover Your
                  <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                    Pattern Code Live
                  </span>
                </h1>

                <p className="text-base md:text-lg text-white/60 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join us for an exclusive live session where you&apos;ll uncover the hidden pattern behind how you think, feel, decide, and grow.
                </p>

                <p className="text-sm md:text-base text-white/40 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Experience NUMI&apos;s pattern intelligence in real-time and get your first personal insight during the session.
                </p>

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
                    <span>Reserve My Spot</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 blur-xl bg-[#D8B86A]/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <p className="text-white/30 text-xs mt-4 max-w-md mx-auto lg:mx-0">
                  Free registration • Limited spots • Live Q&A included
                </p>
              </motion.div>

              {/* Right: Event Visual */}
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration * 1.2 }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full max-w-md aspect-square"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/20 to-[#D8B86A]/5 rounded-3xl border border-[#D8B86A]/20" />
                  <div className="absolute inset-4 bg-gradient-to-br from-[#0A0E27] to-[#0F0F23] rounded-2xl border border-white/10 flex flex-col items-center justify-center p-8">
                    <motion.div
                      animate={heroInView ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center mb-6 shadow-lg shadow-[#D8B86A]/30"
                    >
                      <Sparkles className="w-12 h-12 text-[#0A0E27]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">NUMI Live Preview</h3>
                    <p className="text-white/50 text-center">Your Pattern Revealed</p>
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-[#D8B86A]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-3xl" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === SECTION 2: EVENT DETAILS === */}
        <section ref={eventDetailsRef} className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={eventDetailsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight">
                Event Details
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Date */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={eventDetailsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D8B86A]/10 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-[#D8B86A]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Date</h3>
                  <p className="text-white/60">Coming Soon</p>
                  <p className="text-white/40 text-sm mt-1">Exact date TBD</p>
                </motion.div>

                {/* Time */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={eventDetailsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D8B86A]/10 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-[#D8B86A]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Time</h3>
                  <p className="text-white/60">60 Minutes</p>
                  <p className="text-white/40 text-sm mt-1">Live Session</p>
                </motion.div>

                {/* Format */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={eventDetailsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D8B86A]/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-[#D8B86A]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Format</h3>
                  <p className="text-white/60">Online Live</p>
                  <p className="text-white/40 text-sm mt-1">Limited Spots</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === SECTION 3: BENEFITS === */}
        <section ref={benefitsRef} className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 text-center tracking-tight">
                What You&apos;ll Experience
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

        {/* === SECTION 4: WHAT YOU'LL LEARN === */}
        <section ref={trustRef} className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate={trustInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                What You&apos;ll Learn
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {whatYoullLearn.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={trustInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.1 + i * 0.08 }}
                  className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-[#D8B86A]/20 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={trustInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : 0.2 + i * 0.08, type: "spring" }}
                      className="text-[#D8B86A] mt-0.5 flex-shrink-0"
                    >
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </motion.span>
                    <span className="text-white/70 leading-relaxed">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === SECTION 5: REGISTRATION FORM === */}
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
                {/* Subtle glow effect */}
                {mounted && !prefersReducedMotion && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/5 via-transparent to-transparent opacity-50" />
                )}

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center relative">Reserve Your Spot</h2>
                <p className="text-white/50 text-sm text-center mb-8 relative">
                  Enter your details to register for the exclusive NUMI Live Preview event.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 relative">
                  {/* First Name */}
                  <div className="relative">
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
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200 pr-12"
                    />
                    <AnimatePresence>
                      {formData.firstName && (
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
                          <span>Registering...</span>
                        </>
                      ) : (
                        <>
                          <span>Reserve My Spot</span>
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
                      Limited spots
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
                Your Pattern Is Waiting.
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                  Reserve Your Spot Today.
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
                  <span>Reserve My Spot</span>
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
