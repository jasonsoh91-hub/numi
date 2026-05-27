"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Users, Clock, Sparkles, Calendar, Play } from "lucide-react";

export default function PreviewEventPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroRef = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef(null);
  const transformRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, amount: 0.3 });
  const learnInView = useInView(learnRef, { once: true, amount: 0.2 });
  const transformInView = useInView(transformRef, { once: true, amount: 0.2 });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      setError("Please fill in all fields");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
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
    const existing = JSON.parse(localStorage.getItem("numiEventRegistrations") || "[]");
    existing.push(eventData);
    localStorage.setItem("numiEventRegistrations", JSON.stringify(existing));

    setTimeout(() => {
      router.push("/preview-event/thank-you");
    }, 1200);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const stats = [
    { icon: Users, value: "Limited", label: "Spots Available" },
    { icon: Clock, value: "60", label: "Minutes" },
    { icon: Sparkles, value: "Free", label: "Registration" },
  ];

  const learnItems = [
    {
      num: "01",
      title: "Discover Your Core Pattern Code",
      desc: "Learn how your birthdate reveals your unique numerical signature that influences your thoughts, emotions, and decisions."
    },
    {
      num: "02",
      title: "Decode Your Emotional Cycles",
      desc: "Understand why certain feelings and situations keep repeating in your life, and how to break free from limiting patterns."
    },
    {
      num: "03",
      title: "Activate Your Hidden Strengths",
      desc: "Uncover the natural talents and abilities you may have overlooked, and learn to align your life with your authentic pattern."
    },
    {
      num: "04",
      title: "Transform Your Relationships",
      desc: "See how your pattern interacts with others—gain clarity on compatibility, communication styles, and relationship dynamics."
    },
    {
      num: "05",
      title: "Navigate Your Life Path with Confidence",
      desc: "Receive practical guidance on making aligned decisions in career, relationships, and personal growth based on your Pattern Code."
    }
  ];

  const transformations = [
    "From feeling stuck to seeing the pattern",
    "From confusion to clarity about your life path",
    "From self-doubt to self-awareness",
    "From repeating cycles to breaking through"
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
              className="absolute w-[800px] h-[800px] rounded-full opacity-20"
              style={{
                top: "-200px",
                left: "-200px",
                background: "radial-gradient(circle, rgba(216, 184, 106, 0.15) 0%, rgba(216, 184, 106, 0.05) 40%, transparent 70%)",
                filter: "blur(100px)",
                animation: "ambientDrift 30s ease-in-out infinite alternate",
              }}
            />
            {/* Purple/blue glow - bottom right */}
            <div
              className="absolute w-[900px] h-[900px] rounded-full opacity-15"
              style={{
                bottom: "-250px",
                right: "-250px",
                background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)",
                filter: "blur(120px)",
                animation: "ambientDrift 25s ease-in-out infinite alternate",
              }}
            />

            {/* Floating particles */}
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
                  transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
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
                  initial={{ left: `${pos.left}%`, top: `${pos.top}%`, opacity: 0, scale: 0.8 }}
                  animate={{
                    left: [`${pos.left}%`, `${pos.left + (Math.random() - 0.5) * 10}%`, `${pos.left}%`],
                    top: [`${pos.top}%`, `${pos.top + (Math.random() - 0.5) * 15}%`, `${pos.top}%`],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
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
          style={{ background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5, 10, 20, 0.4) 100%)" }}
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

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#0A0E27]/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.span
            className="text-2xl font-bold bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            NUMI
          </motion.span>
          <motion.button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-2 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] text-[#0A0E27] rounded-full font-medium text-sm hover:shadow-lg hover:shadow-[#D8B86A]/20 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve My Spot
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              transition={{ duration: transitionDuration, staggerChildren: 0.1 }}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#D8B86A]/10 border border-[#D8B86A]/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#D8B86A]" />
                <span className="text-[#D8B86A] text-sm font-medium">Free Live Masterclass</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Your
                <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                  Pattern Code Live
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl">
                Join us for an exclusive live session where you'll uncover the hidden numerical pattern behind how you think, feel, decide, and grow.
              </motion.p>

              <motion.p variants={fadeInUp} className="text-white/40 mb-2">
                With NUMI Pattern Intelligence
              </motion.p>
              <motion.p variants={fadeInUp} className="text-[#D8B86A] mb-8">
                Hosted by Dr. Keith Tong, PhD, DNM
              </motion.p>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="w-5 h-5 text-[#D8B86A]" />
                  <span className="text-sm">Coming Soon</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-5 h-5 text-[#D8B86A]" />
                  <span className="text-sm">60 Minutes</span>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4">
                <motion.button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="group px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] rounded-xl font-semibold transition-all flex items-center gap-2 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {mounted && !prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Claim Your FREE Spot</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-md aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/20 to-[#D8B86A]/5 rounded-3xl border border-[#D8B86A]/20" />
                <div className="absolute inset-4 bg-gradient-to-br from-[#0A0E27] to-[#0F0F23] rounded-2xl border border-white/10 flex flex-col items-center justify-center p-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center shadow-lg shadow-[#D8B86A]/30 mb-6"
                  >
                    <Sparkles className="w-14 h-14 text-[#0A0E27]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">NUMI Pattern</h3>
                  <p className="text-white/50 text-center">Decode Your Life's Hidden Blueprint</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {mounted && !prefersReducedMotion && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#D8B86A] rounded-full"
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#D8B86A]" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section ref={formRef} className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            transition={{ duration: transitionDuration, staggerChildren: 0.1 }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Claim Your FREE Spot Now
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50">
              Submit your details to secure your spot in this exclusive masterclass
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={formInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          >
            {mounted && !prefersReducedMotion && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/5 via-transparent to-transparent opacity-50" />
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                <motion.input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/50 outline-none transition-all"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/50 outline-none transition-all"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-[#0A0E27] flex items-center justify-center gap-2 transition-all relative overflow-hidden ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110"
                    : "bg-white/20 cursor-not-allowed"
                }`}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
              >
                {mounted && !prefersReducedMotion && isFormValid && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
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
                      <span>Securing your spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Reserve My Spot Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </span>
              </motion.button>

              <p className="text-xs text-white/30 text-center">
                By registering, you agree to receive event details. You can unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section ref={learnRef} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={learnInView ? "visible" : "hidden"}
            transition={{ duration: transitionDuration, staggerChildren: 0.1 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Gain from This Free Masterclass
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50">
              Even if you're completely new to numerology or pattern intelligence
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={learnInView ? "visible" : "hidden"}
            transition={{ duration: transitionDuration, staggerChildren: 0.1 }}
            className="space-y-6"
          >
            {learnItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group flex gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D8B86A]/30 hover:bg-white/[0.05] transition-all cursor-default"
              >
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D8B86A]/20 to-[#D8B86A]/5 flex items-center justify-center text-[#D8B86A] font-bold border border-[#D8B86A]/20"
                  >
                    {item.num}
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#D8B86A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Speaker Section - Dr. Keith Tong */}
      <section className="py-20 bg-gradient-to-br from-white/[0.03] to-transparent">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Your Speaker</h2>
            <p className="text-white/50">Learn from the creator of the NUMI Numerology System</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Photo */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/30 to-purple-500/20 rounded-3xl blur-2xl" />
                <img
                  src="/dr-keith.jpg"
                  alt="Dr. Keith Tong"
                  className="relative w-full max-w-md aspect-[3/4] object-cover rounded-3xl border-2 border-[#D8B86A]/30"
                />
              </motion.div>
            </div>

            {/* Bio */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Dr. Keith Tong</h3>
                <p className="text-[#D8B86A] font-medium mb-6">PhD, Doctor of Natural Medicine (DNM)</p>

                <div className="space-y-4 text-white/60">
                  <p>
                    With <span className="text-white font-medium">25+ years</span> of clinical experience in holistic health and personal development, Dr. Keith Tong has helped thousands of high achievers find clarity, purpose, and vitality.
                  </p>
                  <p>
                    He is the <span className="text-white font-medium">creator of the NUMI Numerology System</span>, a proprietary method that decodes your birth date to reveal your identity, life path, and relationship patterns with precision.
                  </p>
                  <p>
                    As the <span className="text-white font-medium">best-selling author of "Cutting Loose"</span> and a sought-after speaker at stages like Get Inspired, Dr. Keith brings a unique blend of Eastern wisdom, modern science, and practical tools to every session.
                  </p>
                </div>

                {/* Credentials */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full text-sm text-white/70">
                    ✓ PhD & Doctor of Natural Medicine
                  </div>
                  <div className="px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full text-sm text-white/70">
                    ✓ NUMI Creator
                  </div>
                  <div className="px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full text-sm text-white/70">
                    ✓ Best-Selling Author
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transformation Section */}
      <section ref={transformRef} className="py-20 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={transformInView ? "visible" : "hidden"}
            transition={{ duration: transitionDuration, staggerChildren: 0.1 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Transformation You Will Experience
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={transformInView ? "visible" : "hidden"}
            transition={{ duration: transitionDuration, staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {transformations.map((text, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#D8B86A]/10 to-[#D8B86A]/2 border border-[#D8B86A]/20"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.3 + i * 0.1, type: "spring" }}
                    className="w-8 h-8 rounded-full bg-[#D8B86A] flex items-center justify-center flex-shrink-0"
                  >
                    <Check className="w-5 h-5 text-[#0A0E27]" strokeWidth={3} />
                  </motion.div>
                  <span className="text-white/70 font-medium">{text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/20 via-[#D8B86A]/10 to-[#D8B86A]/5" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready To Get Started?
            </h2>
            <p className="text-white/70 mb-10 text-lg max-w-xl mx-auto">
              Submit your details below to secure your spot in this exclusive NUMI masterclass.
            </p>

            <motion.button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="group px-10 py-5 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] rounded-xl font-bold text-lg transition-all inline-flex items-center gap-3 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mounted && !prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>Claim Your FREE Spot</span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/30 text-xs leading-relaxed">
            NUMI is designed for self-reflection and personal growth. It does not provide medical, financial, legal, or professional advice.
          </p>
          <p className="text-white/20 text-xs mt-6">© 2026 NUMI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
