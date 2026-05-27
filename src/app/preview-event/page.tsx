"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Users, Clock, Sparkles, Calendar, Play, X, Video } from "lucide-react";

export default function PreviewEventPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyForm, setShowStickyForm] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const learnRef = useRef<HTMLElement>(null);
  const speakerRef = useRef<HTMLElement>(null);
  const transformRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const learnInView = useInView(learnRef, { once: true, amount: 0.2 });
  const speakerInView = useInView(speakerRef, { once: true, amount: 0.2 });
  const transformInView = useInView(transformRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const mountedFrame = window.requestAnimationFrame(() => setMounted(true));
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollY / docHeight) * 100, 100);
      setScrollProgress(progress);
      setShowStickyForm(scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(mountedFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) {
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
      firstName: formData.firstName.trim(),
      email: formData.email.trim(),
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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5 } }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const learnItems = [
    {
      num: "01",
      title: "Discover Your Core Pattern Code",
      desc: "Learn how your birthdate reveals your unique numerical signature that influences your thoughts, emotions, and decisions.",
      icon: Sparkles
    },
    {
      num: "02",
      title: "Decode Your Emotional Cycles",
      desc: "Understand why certain feelings and situations keep repeating in your life, and how to break free from limiting patterns.",
      icon: Clock
    },
    {
      num: "03",
      title: "Activate Your Hidden Strengths",
      desc: "Uncover the natural talents and abilities you may have overlooked, and learn to align your life with your authentic pattern.",
      icon: Users
    },
    {
      num: "04",
      title: "Transform Your Relationships",
      desc: "See how your pattern interacts with others—gain clarity on compatibility, communication styles, and relationship dynamics.",
      icon: Check
    }
  ];

  const transformations = [
    "From feeling stuck to seeing the pattern",
    "From confusion to clarity about your life path",
    "From self-doubt to self-awareness",
    "From repeating cycles to breaking through"
  ];

  const isFormValid = formData.firstName.trim() && formData.email?.includes("@");

  const RegistrationForm = ({ className = "", compact = false }: { className?: string; compact?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}
    >
      <h3 className={`font-bold text-white mb-1 ${compact ? "text-lg" : "text-xl"}`}>
        {compact ? "Reserve Your Spot" : "Register Now — It's Free"}
      </h3>
      {!compact && <p className="text-white/50 text-sm mb-4">Limited spots available for this exclusive session</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/50 outline-none transition-all"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/50 outline-none transition-all"
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-xl font-semibold text-[#0A0E27] flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? "bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110"
              : "bg-white/20 cursor-not-allowed"
          }`}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-[#0A0E27] border-t-transparent rounded-full"
              />
              <span>Securing...</span>
            </>
          ) : (
            <>
              <span>{compact ? "Reserve Spot" : "Reserve My Free Spot"}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>

      {!compact && (
        <p className="text-xs text-white/30 text-center mt-3">
          🔒 Your information is secure. No spam, ever.
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen text-white relative bg-[#0A0E27]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0F0F23] to-[#0a0d1a]" />

        {mounted && !prefersReducedMotion && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D8B86A]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      {/* Scroll Progress Bar */}
      {mounted && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[100]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E27]/80 backdrop-blur-lg border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-[#D8B86A] to-[#F4D47A] bg-clip-text text-transparent">
            NUMI
          </span>
          <motion.button
            onClick={() => router.push("/")}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.nav>

      {/* Sticky Form */}
      <AnimatePresence>
        {showStickyForm && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed bottom-6 right-6 z-40 w-80"
          >
            <RegistrationForm compact />
            <motion.button
              onClick={() => setShowStickyForm(false)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D8B86A]/10 border border-[#D8B86A]/30 rounded-full mb-6">
                <Video className="w-3.5 h-3.5 text-[#D8B86A]" />
                <span className="text-[#D8B86A] text-sm font-medium">Free Live Masterclass</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Your
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                  Pattern Code Live
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-white/60 mb-6 max-w-xl">
                Join Dr. Keith Tong for an exclusive live session where you'll uncover the hidden numerical pattern behind how you think, feel, decide, and grow.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 text-white/50 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D8B86A]" />
                  <span>Coming Soon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D8B86A]" />
                  <span>60 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D8B86A]" />
                  <span>Limited Spots</span>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-3">
                <img src="/dr-keith.jpg" alt="Dr. Keith Tong" className="w-12 h-12 rounded-full object-cover border-2 border-[#D8B86A]/30" />
                <div>
                  <p className="text-white font-medium">Dr. Keith Tong</p>
                  <p className="text-white/50 text-sm">PhD, Doctor of Natural Medicine</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <div className="lg:pl-8">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-3 gap-8 text-center"
          >
            {[
              { value: "25+", label: "Years Experience" },
              { value: "1000+", label: "Lives Transformed" },
              { value: "Free", label: "Live Session" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="space-y-1"
              >
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] to-[#F4D47A]">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section ref={learnRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={learnInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Discover
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 max-w-2xl mx-auto">
              Even if you're completely new to numerology or pattern intelligence
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={learnInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {learnItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D8B86A]/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center text-[#D8B86A] font-bold">
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-[#D8B86A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Speaker Section */}
      <section ref={speakerRef} className="py-24 px-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate={speakerInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Photo */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/30 to-purple-500/20 rounded-3xl blur-2xl" />
                <img
                  src="/dr-keith.jpg"
                  alt="Dr. Keith Tong"
                  className="relative w-full max-w-sm aspect-[3/4] object-cover rounded-3xl border border-[#D8B86A]/30"
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Dr. Keith Tong</h3>
                <p className="text-[#D8B86A]">PhD, Doctor of Natural Medicine (DNM)</p>
              </div>

              <p className="text-white/60 leading-relaxed">
                With <span className="text-white font-medium">25+ years</span> of clinical experience in holistic health and personal development, Dr. Keith Tong has helped thousands of high achievers find clarity, purpose, and vitality.
              </p>

              <p className="text-white/60 leading-relaxed">
                He is the <span className="text-white font-medium">creator of the NUMI Numerology System</span>, a proprietary method that decodes your birth date to reveal your identity, life path, and relationship patterns with precision.
              </p>

              <p className="text-white/60 leading-relaxed">
                As a <span className="text-white font-medium">best-selling author</span> and sought-after speaker, Dr. Keith brings a unique blend of Eastern wisdom, modern science, and practical tools to every session.
              </p>

              <div className="flex flex-wrap gap-2">
                {["✓ PhD & DNM", "✓ NUMI Creator", "✓ Best-Selling Author"].map((cred, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-full text-sm text-white/70">
                    {cred}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Transformation Section */}
      <section ref={transformRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate={transformInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Your Transformation Starts Here
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={transformInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-4"
          >
            {transformations.map((text, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-[#D8B86A]/10 to-[#D8B86A]/5 border border-[#D8B86A]/20"
              >
                <div className="w-8 h-8 rounded-full bg-[#D8B86A] flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#0A0E27]" strokeWidth={3} />
                </div>
                <span className="text-white/80">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/10 via-[#D8B86A]/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Pattern?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 mb-10 text-lg">
              Join us for this free live masterclass and take the first step toward understanding the hidden patterns shaping your life.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center">
              <RegistrationForm />
            </motion.div>

            {!showStickyForm && (
              <motion.p variants={fadeInUp} className="text-white/40 text-sm mt-6">
                Can't see the form? <button onClick={() => setShowStickyForm(true)} className="text-[#D8B86A] hover:underline">Open floating form</button>
              </motion.p>
            )}
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
