"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Calendar, Clock, Users, Sparkles, Play, ChevronDown } from "lucide-react";

export default function PreviewEventPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [fieldFocused, setFieldFocused] = useState("");

  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const benefitsRef = useRef(null);
  const gainRef = useRef(null);
  const formSectionRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const gainInView = useInView(gainRef, { once: true, amount: 0.15 });
  const formInView = useInView(formSectionRef, { once: true, amount: 0.3 });

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => { setMounted(true); }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

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
    const eventData = { firstName: formData.firstName, email: formData.email, timestamp: new Date().toISOString(), source: "preview-event" };
    localStorage.setItem("numiEventRegistration", JSON.stringify(eventData));
    const existing = JSON.parse(localStorage.getItem("numiEventRegistrations") || "[]");
    existing.push(eventData);
    localStorage.setItem("numiEventRegistrations", JSON.stringify(existing));
    setTimeout(() => router.push("/preview-event/thank-you"), 1200);
  };

  const isFormValid = formData.firstName && formData.email?.includes("@");

  const fadeInUp = { hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 }, visible: { opacity: 1, y: 0 } };
  const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } } };

  const gains = [
    { title: "Decode Your Core Pattern", desc: "Learn how your birthdate reveals your unique NUMI Pattern Code" },
    { title: "Understand Emotional Cycles", desc: "Discover why certain feelings and situations keep repeating" },
    { title: "Reveal Hidden Strengths", desc: "Uncover blind spots and talents you may not have noticed" },
    { title: "Align Your Decisions", desc: "Learn how to make choices that match your natural pattern" },
  ];

  const stats = [
    { icon: Users, value: "Limited", label: "Spots Available" },
    { icon: Clock, value: "60", label: "Minutes Live" },
    { icon: Calendar, value: "Free", label: "To Attend" },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[#0A0E27]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#12182E] to-[#0A0E27]" />
        {mounted && !prefersReducedMotion && (
          <>
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 animate-ambient-drift-slow" style={{ background: "radial-gradient(circle, rgba(216, 184, 106, 0.3) 0%, transparent 70%)", filter: "blur(150px)" }} />
            <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full opacity-20 animate-ambient-drift" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)", filter: "blur(150px)" }} />
            {Array.from({ length: 20 }).map((_, i) => {
              const x = Math.random() * 100; const y = Math.random() * 100;
              return <motion.div key={i} className="absolute rounded-full bg-amber-400/20 pointer-events-none" style={{ width: `${2 + Math.random() * 2}px`, height: `${2 + Math.random() * 2}px` }} initial={{ x: `${x}%`, y: `${y}%`, opacity: 0 }} animate={{ x: `${x}%`, y: `${y}%`, opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, ease: "easeInOut" }} />;
            })}
          </>
        )}
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-6xl mx-auto text-center">
          <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger} className="space-y-8">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#D8B86A]/10 border border-[#D8B86A]/30 rounded-full">
              <Sparkles className="w-4 h-4 text-[#D8B86A]" />
              <span className="text-[#D8B86A] text-sm font-medium">Free Live Masterclass</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Discover Your
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                NUMI Pattern Code
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Join this free live session to uncover the hidden pattern behind how you think, feel, decide, and grow.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button onClick={scrollToForm} className="group px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all flex items-center gap-2">
                <span>Reserve My Free Spot</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Play className="w-4 h-4" />
                <span>60 min • Live Q&A</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-white/30 animate-bounce" />
        </motion.div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="relative py-16 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" animate={statsInView ? "visible" : "hidden"} variants={stagger} className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={scaleIn} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#D8B86A]" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU'LL GAIN */}
      <section ref={gainRef} className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" animate={gainInView ? "visible" : "hidden"} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What You&apos;ll Discover</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg">Even with zero prior knowledge of numerology or patterns</motion.p>
          </motion.div>

          <motion.div initial="hidden" animate={gainInView ? "visible" : "hidden"} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {gains.map((gain, i) => (
              <motion.div key={i} variants={fadeInUp} className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-[#D8B86A]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <motion.span initial={{ scale: 0 }} animate={gainInView ? { scale: 1 } : {}} transition={{ delay: prefersReducedMotion ? 0 : 0.2 + i * 0.1, type: "spring" }} className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D8B86A]/20 flex items-center justify-center text-[#D8B86A] font-semibold">{i + 1}</motion.span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{gain.title}</h3>
                    <p className="text-white/50 leading-relaxed">{gain.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IMMERSIVE VISUAL BREAK */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D8B86A]/10 via-transparent to-[#D8B86A]/10" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
              This isn&apos;t about predicting your future.
              <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                It&apos;s about understanding your pattern.
              </span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* REGISTRATION SECTION */}
      <section ref={formSectionRef} className="relative py-24 px-6">
        <div className="max-w-md mx-auto">
          <motion.div initial="hidden" animate={formInView ? "visible" : "hidden"} variants={stagger} ref={formRef}>
            <motion.div variants={scaleIn} className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {mounted && !prefersReducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/5 via-transparent to-transparent opacity-50" />
              )}

              <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-white mb-3 text-center relative">Reserve Your Spot</motion.h2>
              <motion.p variants={fadeInUp} className="text-white/50 text-sm text-center mb-8 relative">Free registration • Limited spots • Live Q&A included</motion.p>

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <motion.div variants={fadeInUp} className="relative">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    onFocus={() => setFieldFocused("firstName")}
                    onBlur={() => setFieldFocused("")}
                    className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all"
                  />
                  <AnimatePresence>
                    {formData.firstName && (
                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute right-4 top-[17px] text-[#D8B86A]">
                        <Check className="w-4 h-4" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFieldFocused("email")}
                    onBlur={() => setFieldFocused("")}
                    className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all"
                  />
                  <AnimatePresence>
                    {formData.email?.includes("@") && (
                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute right-4 top-[17px] text-[#D8B86A]">
                        <Check className="w-4 h-4" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  variants={fadeInUp}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="group relative w-full py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed overflow-hidden"
                >
                  {mounted && !prefersReducedMotion && (
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity }} />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-[#0A0E27] border-t-transparent rounded-full" />
                        <span>Reserving Spot...</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve My Free Spot</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>

                <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 text-white/30 text-xs pt-2">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#D8B86A]" strokeWidth={3} />
                    Free
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#D8B86A]" strokeWidth={3} />
                    No spam
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#D8B86A]" strokeWidth={3} />
                    Limited spots
                  </span>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Your pattern is waiting.
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
              Will you read it?
            </span>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-8">
            <button onClick={scrollToForm} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all">
              Reserve My Spot Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/30 text-xs leading-relaxed">NUMI is designed for self-reflection and personal growth. It does not provide medical, financial, legal, or professional advice.</p>
          <p className="text-white/20 text-xs mt-6">© 2026 NUMI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
