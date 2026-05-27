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

  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLElement>(null);
  const transformRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, amount: 0.3 });
  const learnInView = useInView(learnRef, { once: true, amount: 0.2 });
  const transformInView = useInView(transformRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0 } as const
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15
      }
    }
  };

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
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {mounted && !prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />
        </div>
      )}

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.span
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            NUMI
          </motion.span>
          <motion.button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-purple-200 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve My Spot
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-purple-700 text-sm font-medium">Free Live Masterclass</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Discover Your
                <span className="block bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent">
                  Pattern Code Live
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              >
                Join us for an exclusive live session where you'll uncover the hidden numerical pattern behind how you think, feel, decide, and grow.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-gray-500 mb-8"
              >
                With NUMI Pattern Intelligence
              </motion.p>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">Coming Soon</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">60 Minutes</span>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4">
                <motion.button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-200 transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Claim Your FREE Spot</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 p-8 relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.15), transparent, rgba(124, 58, 237, 0.1), transparent)"
                  }}
                />
                <div className="relative h-full flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-purple-200 mb-6"
                  >
                    <Sparkles className="w-16 h-16 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">NUMI Pattern</h3>
                  <p className="text-gray-600 text-center">Decode Your Life's Hidden Blueprint</p>
                </div>
              </div>
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
            <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50">
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
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section ref={formRef} className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Claim Your FREE Spot Now
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              Submit your details to secure your spot in this exclusive masterclass
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={formInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <motion.input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? "bg-gradient-to-r from-purple-600 to-violet-500 hover:shadow-xl hover:shadow-purple-200"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Securing your spot...</span>
                  </>
                ) : (
                  <>
                    <span>Reserve My Spot Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                By registering, you agree to receive event details. You can unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section ref={learnRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={learnInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Gain from This Free Masterclass
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              Even if you're completely new to numerology or pattern intelligence
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={learnInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            {learnItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group flex gap-6 p-6 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-50 transition-all cursor-default"
              >
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-50 flex items-center justify-center text-purple-600 font-bold"
                  >
                    {item.num}
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Transformation Section */}
      <section ref={transformRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={transformInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Transformation You Will Experience
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={transformInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {transformations.map((text, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.3 + i * 0.1, type: "spring" }}
                    className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0"
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </motion.div>
                  <span className="text-gray-700 font-medium">{text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready To Get Started?
            </h2>
            <p className="text-white/90 mb-10 text-lg">
              Submit your details below to secure your spot in this exclusive NUMI masterclass.
            </p>

            <motion.button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Claim Your FREE Spot</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white/60 text-sm text-center">
        <p>© 2026 NUMI. All rights reserved.</p>
        <p className="mt-2">NUMI is for self-reflection and personal growth only.</p>
      </footer>
    </div>
  );
}
