"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle, X, ChevronDown } from "lucide-react";
import { StaticBookMockup } from "@/components/StaticBookMockup";

export default function LeadMagnetPage() {
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

  // Refs for scroll-triggered animations
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const benefitsRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const socialProofRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const beforeAfterInView = useInView(beforeAfterRef, { once: true, amount: 0.2 });
  const socialProofInView = useInView(socialProofRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setMounted(true);
  }, []);

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
      source: "emotional-clarity-lead-magnet"
    };

    localStorage.setItem("numiLeadMagnet", JSON.stringify(leadMagnetData));
    const existingLeads = JSON.parse(localStorage.getItem("numiLeads") || "[]");
    existingLeads.push(leadMagnetData);
    localStorage.setItem("numiLeads", JSON.stringify(existingLeads));

    setTimeout(() => {
      router.push("/lead-magnet/success");
    }, 800);
  };

  // Animation variants (respects reduced motion preference)
  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -30 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, x: 0 }
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const emotionalQuestions = [
    "Why do I feel so drained all the time?",
    "Why does life feel harder for me?",
    "Why do I keep ending up in the same situation?",
    "Why do I feel lost even when things look okay?",
    "Why do I keep sabotaging myself?",
    "Why do I feel disconnected from my life?",
  ];

  const benefits = [
    {
      icon: "🔄",
      title: "Understand Emotional Cycles",
      desc: "Recognise why certain feelings keep resurfacing and what they might be trying to show you",
    },
    {
      icon: "💭",
      title: "See Your Thinking Patterns",
      desc: "Discover how your natural decision-making style may be affecting your growth and choices",
    },
    {
      icon: "✨",
      title: "Find Hidden Strengths",
      desc: "Identify natural abilities you may have overlooked or undervalued in yourself",
    },
    {
      icon: "🤝",
      title: "Understand Relationship Dynamics",
      desc: "Explore how your pattern may influence compatibility, communication, and emotional needs",
    },
    {
      icon: "🎯",
      title: "Navigate Work & Ambition",
      desc: "See how your natural energy aligns with different career paths and work environments",
    },
    {
      icon: "💚",
      title: "Stop Self-Blame",
      desc: "Realise that some patterns you've judged yourself for may simply be part of how you're wired",
    },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* === CINEMATIC BACKGROUND LAYER === */}
      <div className="fixed inset-0 bg-[#0A0E27]">
        {/* Deep space base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0F0F23] to-[#0a0d1a]" />

        {/* === SUBTLE ANIMATED LIGHT MOVEMENT === */}
        {mounted && !prefersReducedMotion && (
          <>
            {/* Very slow gold ambient glow - top left */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full opacity-20 animate-ambient-drift-slow"
              style={{
                top: "-200px",
                left: "-200px",
                background: "radial-gradient(circle, rgba(216, 184, 106, 0.15) 0%, rgba(216, 184, 106, 0.05) 40%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />
            {/* Deep blue ambient glow - bottom right */}
            <div
              className="absolute w-[900px] h-[900px] rounded-full opacity-15 animate-ambient-drift"
              style={{
                bottom: "-250px",
                right: "-250px",
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%)",
                filter: "blur(120px)",
              }}
            />
            {/* Subtle purple center glow */}
            <div
              className="absolute rounded-full opacity-10 animate-pulse-slow"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
                filter: "blur(150px)",
              }}
            />
          </>
        )}

        {/* === DEPTH LAYERS - PARALLAX EFFECT === */}
        {mounted && !prefersReducedMotion && (
          <>
            {/* Background layer - slowest movement, lowest opacity */}
            {[...Array(12)].map((_, i) => {
              const size = Math.random() * 2 + 1;
              const duration = 25 + Math.random() * 15;
              const delay = Math.random() * 10;
              return (
                <div
                  key={`bg-star-${i}`}
                  className="absolute rounded-full bg-white/8"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationName: 'parallaxSlower',
                    animationDuration: `${duration}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
            {/* Mid-ground layer - medium speed, medium opacity */}
            {[...Array(8)].map((_, i) => {
              const size = Math.random() * 1.5 + 1;
              const duration = 18 + Math.random() * 10;
              const delay = Math.random() * 8;
              return (
                <div
                  key={`mid-star-${i}`}
                  className="absolute rounded-full bg-amber-400/12"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationName: 'parallaxSlow',
                    animationDuration: `${duration}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </>
        )}

        {/* === FLOATING NUMEROLOGY PARTICLES === */}
        {mounted && !prefersReducedMotion && (
          <>
            {/* Layer 1 - Small blurry numbers, very subtle */}
            {[...Array(6)].map((_, i) => {
              const duration = 15 + Math.random() * 10;
              const delay = Math.random() * 5;
              const blur = 2 + Math.random() * 3;
              return (
                <div
                  key={`num-blur-${i}`}
                  className="absolute text-amber-400/5 font-light text-xs"
                  style={{
                    left: `${5 + Math.random() * 90}%`,
                    top: `${5 + Math.random() * 90}%`,
                    filter: `blur(${blur}px)`,
                    animationName: 'float',
                    animationDuration: `${duration}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${delay}s`,
                  }}
                >
                  {['1', '3', '5', '7', '9', '11'][i % 6]}
                </div>
              );
            })}
            {/* Layer 2 - Medium numbers, some blur */}
            {[...Array(5)].map((_, i) => {
              const duration = 12 + Math.random() * 8;
              const delay = Math.random() * 4;
              return (
                <div
                  key={`num-mid-${i}`}
                  className="absolute text-amber-400/8 font-normal text-sm"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    filter: 'blur(1px)',
                    animationName: 'float-slow',
                    animationDuration: `${duration}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${delay}s`,
                  }}
                >
                  {['2', '4', '6', '8', '22'][i % 5]}
                </div>
              );
            })}
          </>
        )}

        {/* === STATIC AMBIENT GLOWS === */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-[250px]" />

        {/* === VIGNETTE EFFECT === */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5, 10, 20, 0.4) 100%)",
          }}
        />

        {/* === CINEMATIC GRAIN TEXTURE === */}
        {mounted && !prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0E27]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold tracking-wider hover:opacity-80 transition-opacity">
              <span className="text-[#D8B86A]">NUMI</span>
            </a>
            <div className="hidden sm:flex items-center gap-2 text-sm text-white/60">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Designed for emotional clarity</span>
            </div>
          </div>
        </header>

        {/* Hero Section - DOMINANT EMOTIONAL HOOK */}
        <section ref={heroRef} className="min-h-screen flex items-center pt-28 pb-24 px-6 relative">
          {/* === GOLD LIGHT TRAILS - Connecting headline to book === */}
          {mounted && !prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden lg:block">
              {/* Main curved light trail from headline area to book */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.6 }}
                viewBox="0 0 1400 800"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  {/* Gradient for light trail */}
                  <linearGradient id="goldTrail" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="rgba(216, 184, 106, 0)" />
                    <stop offset="20%" stopColor="rgba(216, 184, 106, 0.15)" />
                    <stop offset="50%" stopColor="rgba(216, 184, 106, 0.08)" />
                    <stop offset="80%" stopColor="rgba(216, 184, 106, 0.12)" />
                    <stop offset="100%" stopColor="rgba(216, 184, 106, 0)" />
                  </linearGradient>
                  {/* Glow filter */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Main arc path */}
                <motion.path
                  d="M 350 280 Q 550 200, 700 250 T 1050 350"
                  stroke="url(#goldTrail)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                {/* Secondary thinner arc */}
                <motion.path
                  d="M 380 320 Q 580 260, 720 300 T 1020 400"
                  stroke="rgba(216, 184, 106, 0.05)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Floating dots along the trail */}
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={`dot-${i}`}
                    r="2"
                    fill="rgba(216, 184, 106, 0.4)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path="M 350 280 Q 550 200, 700 250 T 1050 350"
                      begin={`${i * 1.5}s`}
                    />
                  </motion.circle>
                ))}
              </svg>

              {/* Subtle ambient particles between headline and book */}
              {[...Array(8)].map((_, i) => {
                const startX = 30 + Math.random() * 20;
                const endX = 65 + Math.random() * 15;
                const startY = 25 + Math.random() * 20;
                const duration = 15 + Math.random() * 10;
                const delay = Math.random() * 5;
                return (
                  <motion.div
                    key={`trail-particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: `${1 + Math.random() * 2}px`,
                      height: `${1 + Math.random() * 2}px`,
                      background: "rgba(216, 184, 106, 0.2)",
                      filter: "blur(0.5px)",
                    }}
                    initial={{ left: `${startX}%`, top: `${startY}%`, opacity: 0 }}
                    animate={{
                      left: [`${startX}%`, `${endX}%`],
                      top: [`${startY}%`, `${startY + (Math.random() - 0.5) * 20}%`],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}

              {/* Numerology symbols along the connection path */}
              {['1', '3', '5', '7'].map((num, i) => (
                <motion.div
                  key={`trail-num-${i}`}
                  className="absolute text-xs font-light"
                  style={{
                    color: "rgba(216, 184, 106, 0.15)",
                    filter: "blur(0.5px)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "easeInOut",
                  }}
                >
                  {/* Position roughly along the arc path */}
                  <span style={{ position: 'absolute', left: `${40 + i * 8}%`, top: `${28 + (i % 2) * 8}%` }}>
                    {num}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          <div className="max-w-7xl mx-auto w-full relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left">
                {/* Pre-headline */}
                <motion.div
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: transitionDuration }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 border border-[#D8B86A]/30 px-4 py-2 rounded-full mb-8 shadow-lg shadow-[#D8B86A]/10"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D8B86A] animate-pulse" />
                  <span className="text-sm text-white/80">Emotional clarity through pattern awareness</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.1 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-7 leading-[1.05] tracking-tight"
                >
                  Maybe You're Not Lost.
                  <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                    Maybe You're Repeating A Pattern.
                  </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.2 }}
                  className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  If you've been feeling burned out, emotionally stuck, or wondering why the same problems keep showing up — your pattern may reveal what's underneath.
                </motion.p>

                {/* Mobile Book Preview */}
                <motion.div
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.25 }}
                  className="lg:hidden mb-10"
                >
                  <div className="relative w-full max-w-sm mx-auto aspect-[4/5]">
                    <StaticBookMockup className="w-full h-full" />
                  </div>
                </motion.div>

                {/* Floating Questions */}
                <motion.div
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.3 }}
                  className="hidden lg:block mb-10 space-y-3"
                >
                  {emotionalQuestions.slice(0, 3).map((question, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/60 text-base">
                      <span className="text-[#D8B86A]/60">—</span>
                      <span>{question}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Form Card - Enhanced */}
                <motion.div
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.4 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-7 max-w-md mx-auto lg:mx-0 backdrop-blur-xl shadow-2xl"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">Reveal Your Pattern Code</h3>
                  <p className="text-white/50 text-sm mb-5">Free instant access • No experience needed</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A]/30 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A]/30 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-white/50 text-sm mb-2">Birth date</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          placeholder="DD"
                          min="1"
                          max="31"
                          value={formData.birthDay}
                          onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                          className="px-3 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-center placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200"
                        />
                        <input
                          type="number"
                          placeholder="MM"
                          min="1"
                          max="12"
                          value={formData.birthMonth}
                          onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                          className="px-3 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-center placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200"
                        />
                        <input
                          type="number"
                          placeholder="YYYY"
                          min="1900"
                          max="2026"
                          value={formData.birthYear}
                          onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                          className="px-3 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-center placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all duration-200"
                        />
                      </div>
                      <p className="text-white/30 text-xs mt-2">Used only to calculate your Core Number</p>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm" role="alert">{error}</p>
                    )}

                    {/* CTA Button - Enhanced Glow */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer overflow-hidden"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          "Revealing Your Pattern..."
                        ) : (
                          <>
                            <span>Reveal My Pattern Code</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                          </>
                        )}
                      </span>
                      {/* Enhanced shadow */}
                      <div className="absolute inset-0 blur-xl bg-[#D8B86A]/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </form>
                </motion.div>
              </div>

              {/* Right: Book Visual - Desktop only */}
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInRight}
                transition={{ duration: transitionDuration * 1.2 }}
                className="hidden lg:flex justify-center items-center lg:-mt-8"
              >
                <div className="relative w-full max-w-md aspect-[4/5]">
                  <StaticBookMockup className="w-full h-full" />
                </div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            {mounted && !prefersReducedMotion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex justify-center mt-12"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white/40"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* === HOW IT WORKS SECTION - CLARITY (Compact, functional) === */}
        <section ref={howItWorksRef} className="py-16 md:py-20 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate={howItWorksInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              className="text-center mb-10 md:mb-14"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Discover Your Pattern In 3 Simple Steps
              </h2>
              <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
                NUMI gives you a simple starting point to understand the patterns behind how you think, feel, decide, and grow.
              </p>
            </motion.div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
              {/* Connecting line - desktop only */}
              <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#D8B86A]/25 to-transparent pointer-events-none" />

              {/* Step 1 */}
              <motion.div
                initial="hidden"
                animate={howItWorksInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/8 rounded-2xl p-5 md:p-6 relative overflow-hidden group hover:border-[#D8B86A]/25 transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center shadow-md shadow-[#D8B86A]/15">
                    <span className="text-[#0A0E27] font-bold">1</span>
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Enter your birth details
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      Use your birthdate to calculate your Core Number.
                    </p>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-[#D8B86A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial="hidden"
                animate={howItWorksInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/8 rounded-2xl p-5 md:p-6 relative overflow-hidden group hover:border-[#D8B86A]/25 transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center shadow-md shadow-[#D8B86A]/15">
                    <span className="text-[#0A0E27] font-bold">2</span>
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Reveal your Pattern Code
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      Discover which pattern may be shaping your emotions, decisions, relationships, and growth.
                    </p>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-[#D8B86A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial="hidden"
                animate={howItWorksInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.3 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/8 rounded-2xl p-5 md:p-6 relative overflow-hidden group hover:border-[#D8B86A]/25 transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center shadow-md shadow-[#D8B86A]/15">
                    <span className="text-[#0A0E27] font-bold">3</span>
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Understand what keeps repeating
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      Receive your first insight into the patterns that may explain why life has felt stuck, heavy, or misaligned.
                    </p>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-[#D8B86A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section - RELEVANCE (Substantial, breathing room) */}
        <div className="relative">
          {/* Negative space transition - no heavy gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none h-32" />

          <section ref={benefitsRef} className="py-28 md:py-40 px-6 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                animate={benefitsInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration }}
                className="text-center mb-16 md:mb-24"
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                  Your Pattern May Explain More Than You Think
                </h2>
                <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
                  Understanding your hidden patterns can bring clarity to areas of your life that have felt confusing or painful
                </p>
              </motion.div>

              {/* === EDITORIAL ASYMMETRIC LAYOUT === */}
              <div className="space-y-7 md:space-y-9">

                {/* === HERO FEATURED CARD - "Stop Self-Blame" === */}
                <motion.div
                  initial="hidden"
                  animate={benefitsInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.4 } }}
                  className="group relative overflow-hidden rounded-3xl p-8 md:p-14 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, rgba(216, 184, 106, 0.06) 0%, rgba(216, 184, 106, 0.01) 60%, rgba(139, 92, 246, 0.02) 100%)",
                    border: "1px solid rgba(216, 184, 106, 0.12)",
                  }}
                >
                  {/* Ambient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D8B86A]/8 via-transparent to-[#D8B86A]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-6 bg-[#D8B86A]/10 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D8B86A]/15 to-[#D8B86A]/5 border border-[#D8B86A]/20 flex items-center justify-center text-4xl md:text-5xl group-hover:scale-105 transition-transform duration-500">
                        {benefits[5].icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-xs font-medium tracking-[0.2em] text-[#D8B86A]/60 uppercase mb-3">The Insight That Changes Everything</span>
                      <h3 className="text-xl md:text-3xl font-semibold text-white mb-3 group-hover:text-[#D8B86A] transition-colors duration-300">
                        {benefits[5].title}
                      </h3>
                      <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                        {benefits[5].desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* === SECONDARY SECTION - Asymmetric 2:3 layout === */}
                <div className="grid md:grid-cols-5 gap-5 md:gap-6">

                  {/* Left - "Emotional Cycles" (spans 2, featured) */}
                  <motion.div
                    initial="hidden"
                    animate={benefitsInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.2 }}
                    whileHover={{ y: -5, transition: { duration: 0.4 } }}
                    className="md:col-span-2 group relative overflow-hidden rounded-3xl p-6 md:p-8 cursor-pointer"
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {/* Subtle gold left accent */}
                    <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D8B86A]/30 to-transparent" />
                    <div className="absolute inset-0 bg-[#D8B86A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 border border-[#D8B86A]/0 group-hover:border-[#D8B86A]/20 rounded-3xl transition-all duration-500" />

                    <div className="relative">
                      <div className="text-3xl md:text-4xl mb-4 group-hover:scale-105 transition-transform duration-400">{benefits[0].icon}</div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-[#D8B86A]/90 transition-colors duration-300">
                        {benefits[0].title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{benefits[0].desc}</p>
                    </div>
                  </motion.div>

                  {/* Right - 2 stacked cards (spans 3) */}
                  <div className="md:col-span-3 grid grid-cols-1 gap-4">
                    {benefits.slice(1, 3).map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial="hidden"
                        animate={benefitsInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                        transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.25 + idx * 0.08 }}
                        whileHover={{ y: -4, transition: { duration: 0.3 } }}
                        className="group relative overflow-hidden rounded-2xl p-5 md:p-6 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <div className="absolute inset-0 border border-white/0 group-hover:border-[#D8B86A]/15 rounded-2xl transition-all duration-300" />
                        <div className="text-2xl md:text-3xl mb-3 group-hover:scale-105 transition-transform duration-400">{benefit.icon}</div>
                        <h3 className="text-base md:text-lg font-semibold text-white mb-2 group-hover:text-[#D8B86A]/80 transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-white/30 text-sm leading-relaxed font-light">{benefit.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* === BOTTOM ROW - 3 cards in varied spacing === */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-5">
                  {benefits.slice(3, 6).map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      animate={benefitsInView ? "visible" : "hidden"}
                      variants={fadeInUp}
                      transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.35 + idx * 0.06 }}
                      whileHover={{ y: -4, transition: { duration: 0.3 } }}
                      className="group relative overflow-hidden rounded-2xl p-5 md:p-6 cursor-pointer"
                      style={{
                        background: idx === 0
                          ? "linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(139, 92, 246, 0.01) 100%)"
                          : "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                        border: idx === 0 ? "1px solid rgba(139, 92, 246, 0.12)" : "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {/* Gold border glow on hover */}
                      <div className="absolute inset-0 rounded-2xl border border-[#D8B86A]/0 group-hover:border-[#D8B86A]/20 transition-all duration-300" />

                      <div className="relative">
                        <div className="text-xl md:text-2xl mb-3 group-hover:scale-105 transition-transform duration-400">{benefit.icon}</div>
                        <h3 className="text-sm md:text-base font-semibold text-white mb-2 group-hover:text-[#D8B86A]/80 transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-white/30 text-sm leading-relaxed font-light">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        </div>

        {/* Before vs After Section - TRANSFORMATION (Dark dramatic shift) */}
        <div className="relative">
          {/* Dark transition - creating a turning point moment */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/30 pointer-events-none h-40" />

          <section ref={beforeAfterRef} className="py-28 md:py-36 px-6 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                animate={beforeAfterInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration }}
                className="text-center mb-14 md:mb-20"
              >
                <div className="inline-flex items-center gap-2 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full mb-6">
                  <span className="text-xs text-white/40 tracking-widest">THE TRANSFORMATION</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                  The Shift People Experience
                </h2>
                <p className="text-lg md:text-xl text-white/35 font-light max-w-2xl mx-auto">
                  From confusion and self-doubt to clarity and self-understanding
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative">
                {/* === CENTER TRANSFORMATION ARROW (Desktop) === */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#0A0E27] border border-[#D8B86A]/30 flex items-center justify-center shadow-lg shadow-[#D8B86A]/10">
                    <ArrowRight className="w-5 h-5 text-[#D8B86A]" />
                  </div>
                </div>

                {/* === BEFORE CARD === */}
                <motion.div
                  initial="hidden"
                  animate={beforeAfterInView ? "visible" : "hidden"}
                  variants={fadeInLeft}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.2 }}
                  className="relative rounded-3xl p-6 md:p-8 overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(30, 30, 35, 0.6) 0%, rgba(20, 20, 25, 0.4) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px)',
                    }} />
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-white/40">—</span>
                      </div>
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Previously</p>
                        <h3 className="text-lg md:text-xl font-semibold text-white">Before NUMI</h3>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Feeling emotionally drained without understanding why",
                        "Repeating the same relationship or work patterns",
                        "Feeling disconnected from yourself",
                        "Constant overthinking and self-doubt",
                        "Wondering why life feels 'off'",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/50 leading-relaxed">
                          <span className="text-white/20 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* === AFTER CARD (Warmer, Hopeful) === */}
                <motion.div
                  initial="hidden"
                  animate={beforeAfterInView ? "visible" : "hidden"}
                  variants={fadeInRight}
                  transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.3 }}
                  className="relative rounded-3xl p-6 md:p-8 overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, rgba(216, 184, 106, 0.08) 0%, rgba(216, 184, 106, 0.02) 50%, rgba(139, 92, 246, 0.04) 100%)",
                    border: "1px solid rgba(216, 184, 106, 0.15)",
                  }}
                >
                  {/* Warm glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -inset-4 bg-[#D8B86A]/10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center shadow-lg shadow-[#D8B86A]/20">
                        <CheckCircle className="w-4 h-4 text-[#0A0E27]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#D8B86A]/60 uppercase tracking-widest mb-1">The Shift</p>
                        <h3 className="text-lg md:text-xl font-semibold text-white">After NUMI</h3>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Greater emotional clarity about why you feel the way you do",
                        "Better self-understanding without judgment",
                        "More awareness of patterns that were previously invisible",
                        "A clearer sense of direction and alignment",
                        "Feeling seen instead of broken",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 leading-relaxed font-light">
                          <CheckCircle className="w-5 h-5 text-[#D8B86A] mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* Social Proof Section - TRUST (Contained, warm, credible) */}
        <div className="relative">
          {/* Warm transition - inviting and human */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D8B86A]/6 to-transparent pointer-events-none h-36" />

          <section ref={socialProofRef} className="py-24 md:py-32 px-6 relative">
            <div className="max-w-3xl mx-auto">
              {/* Trust Label */}
              <motion.div
                initial="hidden"
                animate={socialProofInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration }}
                className="flex justify-center mb-8"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#D8B86A]/10 to-[#D8B86A]/5 border border-[#D8B86A]/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8B86A] animate-pulse" />
                  <span className="text-xs text-[#D8B86A]/90 tracking-wide font-medium">Early Pattern Insight</span>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={socialProofInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.15 }}
                className="relative"
              >
                {/* Premium testimonial card with enhanced visual weight */}
                <div className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] border border-white/12 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden">
                  {/* Warm ambient glow */}
                  <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-[#D8B86A]/10 to-transparent rounded-full blur-[70px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#8B5CF6]/8 to-transparent rounded-full blur-[50px] pointer-events-none" />

                  {/* Opening quote mark - decorative */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 text-[#D8B86A]/20 font-serif text-5xl md:text-7xl leading-none select-none">
                    "
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-6 relative">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[#D8B86A]" fill="currentColor" viewBox="0 0 20 20" aria-label="5 star rating">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl lg:text-2xl text-white text-center leading-relaxed mb-8 font-light relative">
                    <p>"I thought I was just burned out. NUMI helped me realise I was repeating patterns I never understood before. Finally, things make sense."</p>
                  </blockquote>

                  {/* Closing quote mark */}
                  <div className="text-center mb-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#D8B86A]/15 to-[#D8B86A]/5 border border-[#D8B86A]/20">
                      <span className="text-[#D8B86A]/60 text-xl font-serif leading-none">"</span>
                    </div>
                  </div>

                  {/* Attribution */}
                  <div className="text-center">
                    <p className="text-white/40 text-xs tracking-wide">— Early NUMI User</p>
                  </div>
                </div>
              </motion.div>

              {/* Premium audience tags */}
              <motion.div
                initial="hidden"
                animate={socialProofInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.25 }}
                className="mt-12 flex flex-wrap justify-center gap-3"
              >
                {[
                  "Burnout",
                  "Life transitions",
                  "Emotional overwhelm",
                  "Self-discovery",
                  "Career confusion",
                  "Relationship patterns",
                  "Personal growth",
                ].map((badge, i) => (
                  <span
                    key={i}
                    className="group relative px-4 py-2 bg-white/[0.03] border border-white/8 rounded-full text-xs text-white/40 hover:text-white/60 hover:bg-white/[0.05] hover:border-[#D8B86A]/15 transition-all duration-300 cursor-default"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            </div>
          </section>
        </div>

        {/* Final CTA Section - CONVERSION CRESCENDO (Most substantial) */}
        <div className="relative">
          {/* Building anticipation - golden moment */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D8B86A]/10 via-[#D8B86A]/6 to-transparent pointer-events-none h-72" />

          <section ref={ctaRef} className="py-36 md:py-48 px-6 relative">
            <div className="max-w-4xl mx-auto relative">

              {/* === CINEMATIC GOLD GLOW LAYERS BEHIND CTA === */}
              {mounted && !prefersReducedMotion && (
                <>
                  {/* Outermost ambient glow */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(216, 184, 106, 0.12) 0%, rgba(216, 184, 106, 0.04) 40%, transparent 70%)",
                      filter: "blur(100px)",
                      animationName: "pulse-slow",
                      animationDuration: "4s",
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                    }}
                  />
                  {/* Mid glow - warmer */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(244, 212, 122, 0.15) 0%, rgba(216, 184, 106, 0.06) 50%, transparent 70%)",
                      filter: "blur(80px)",
                      animationName: "pulse-slow",
                      animationDuration: "3s",
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                      animationDelay: "1s",
                    }}
                  />
                  {/* Inner core glow - brightest */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(216, 184, 106, 0.18) 0%, rgba(216, 184, 106, 0.08) 40%, transparent 70%)",
                      filter: "blur(60px)",
                    }}
                  />
                </>
              )}

              {/* === SOFT PATTERN PARTICLES AROUND CTA === */}
              {mounted && !prefersReducedMotion && (
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                  {/* Floating numerology symbols */}
                  {['1', '3', '5', '7', '9', '11'].map((num, i) => {
                    const duration = 8 + Math.random() * 6;
                    const delay = i * 1.5;
                    return (
                      <div
                        key={`cta-num-${i}`}
                        className="absolute text-amber-400/8 font-light text-sm"
                        style={{
                          left: `${10 + i * 15}%`,
                          top: `${10 + (i % 3) * 30}%`,
                          filter: "blur(1px)",
                          animationName: "float-slow",
                          animationDuration: `${duration}s`,
                          animationTimingFunction: "ease-in-out",
                          animationIterationCount: "infinite",
                          animationDelay: `${delay}s`,
                        }}
                      >
                        {num}
                      </div>
                    );
                  })}
                  {/* Soft floating particles */}
                  {[...Array(12)].map((_, i) => {
                    const duration = 10 + Math.random() * 8;
                    const delay = Math.random() * 4;
                    return (
                      <div
                        key={`cta-particle-${i}`}
                        className="absolute rounded-full bg-[#D8B86A]/10"
                        style={{
                          left: `${5 + Math.random() * 90}%`,
                          top: `${5 + Math.random() * 90}%`,
                          width: `${2 + Math.random() * 3}px`,
                          height: `${2 + Math.random() * 3}px`,
                          filter: "blur(0.5px)",
                          animationName: "float-slower",
                          animationDuration: `${duration}s`,
                          animationTimingFunction: "ease-in-out",
                          animationIterationCount: "infinite",
                          animationDelay: `${delay}s`,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* === PREMIUM CTA CARD === */}
              <motion.div
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration }}
                className="relative"
              >
                {/* Outer decorative border ring */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#D8B86A]/20 via-[#D8B86A]/10 to-[#D8B86A]/5 blur-sm"></div>

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-[#D8B86A]/12 via-[#D8B86A]/6 to-[#D8B86A]/3 border border-[#D8B86A]/25 rounded-[2.5rem] p-10 md:p-16 text-center overflow-hidden backdrop-blur-xl shadow-2xl">

                  {/* Inner glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/5 via-transparent to-[#8B5CF6]/5 pointer-events-none" />

                  {/* Subtle shimmer animation on card */}
                  {mounted && !prefersReducedMotion && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
                        backgroundSize: "200% 100%",
                        animationName: "shimmer",
                        animationDuration: "8s",
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                      }}
                    />
                  )}

                  <div className="relative">
                    {/* Decorative element */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D8B86A]/50 to-transparent" />
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      Your Life Patterns Are Trying To Tell You Something.
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                      Maybe it's time to finally understand them.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 bg-white/[0.08] border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/60 focus:border-[#D8B86A]/40 transition-all duration-200 text-center"
                      />

                      {/* Enhanced CTA button with continuous shimmer */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full py-5 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer overflow-hidden shadow-lg shadow-[#D8B86A]/20"
                      >
                        {/* Continuous shimmer effect */}
                        {mounted && !prefersReducedMotion && (
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            style={{
                              transform: "translateX(-100%)",
                              animationName: "buttonShimmer",
                              animationDuration: "3s",
                              animationTimingFunction: "ease-in-out",
                              animationIterationCount: "infinite",
                            }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? (
                            "Unlocking Your Pattern..."
                          ) : (
                            <>
                              <span>Unlock My Free Pattern Code</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </>
                          )}
                        </span>
                        {/* Glow on hover */}
                        <div className="absolute inset-0 blur-xl bg-[#D8B86A]/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </form>

                    <p className="text-white/40 text-sm mt-6 tracking-wide">
                      Free instant access • No experience needed • Deeply personal
                    </p>

                    {/* Bottom decorative element */}
                    <div className="flex justify-center mt-8">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D8B86A]/50 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center text-white/30 text-sm">
            <p>© 2026 NUMI. All rights reserved.</p>
          </div>
        </footer>
      </div>
      {/* End Content Layer */}

      {/* Custom keyframes for CTA animations */}
      <style jsx>{`
        @keyframes buttonShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
