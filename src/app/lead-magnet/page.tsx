"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

  // Refs for scroll
  const formRef = useRef<HTMLDivElement>(null);

  // InView hooks
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const trustRef = useRef(null);
  const optinRef = useRef(null);
  const finalRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const beforeAfterInView = useInView(beforeAfterRef, { once: true, amount: 0.2 });
  const trustInView = useInView(trustRef, { once: true, amount: 0.2 });
  const optinInView = useInView(optinRef, { once: true, amount: 0.3 });
  const finalInView = useInView(finalRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setMounted(true);
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
      source: "lead-magnet"
    };

    localStorage.setItem("numiLeadMagnet", JSON.stringify(leadMagnetData));
    const existingLeads = JSON.parse(localStorage.getItem("numiLeads") || "[]");
    existingLeads.push(leadMagnetData);
    localStorage.setItem("numiLeads", JSON.stringify(existingLeads));

    setTimeout(() => {
      router.push("/lead-magnet/success");
    }, 800);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const benefits = [
    "Understand why certain emotional cycles keep repeating",
    "See how your natural decision style may be shaping your life",
    "Recognise hidden strengths and blind spots you may not have noticed",
    "Explore how your pattern may influence relationships, work, ambition, and burnout",
    "Get your first personal NUMI insight in minutes",
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
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                  Your Parents Gave You A Name.
                  <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                    Life Gave You A Pattern.
                  </span>
                </h1>

                <p className="text-base md:text-lg text-white/60 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  If you've been feeling burned out, emotionally stuck, or wondering why the same problems keep showing up, your Pattern Code may reveal what's underneath.
                </p>

                <p className="text-sm md:text-base text-white/40 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Get the free NUMI guide and discover the hidden pattern behind how you think, feel, decide, relate, and grow.
                </p>

                {/* Hero CTA Button */}
                <button
                  onClick={scrollToForm}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D8B86A]/20 mx-auto lg:mx-0"
                >
                  <span>Reveal My Pattern Code</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <p className="text-white/30 text-xs mt-4 max-w-md mx-auto lg:mx-0">
                  Free instant access • No experience needed • Birthdate used only to calculate your Core Number
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
                <div className="relative w-full max-w-md aspect-[4/5]">
                  <StaticBookMockup className="w-full h-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === SECTION 2: BENEFIT BULLETS === */}
        <section ref={benefitsRef} className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 text-center tracking-tight">
                Your Pattern May Explain More Than You Think
              </h2>

              <ul className="space-y-6">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    animate={benefitsInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.1 + i * 0.08 }}
                    className="flex items-start gap-4 text-white/70 text-base md:text-lg leading-relaxed"
                  >
                    <span className="text-[#D8B86A] mt-1 flex-shrink-0">•</span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* === SECTION 3: BEFORE VS AFTER === */}
        <section ref={beforeAfterRef} className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate={beforeAfterInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                From Feeling Stuck To Seeing The Pattern
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Before */}
              <motion.div
                initial="hidden"
                animate={beforeAfterInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.15 }}
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
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#D8B86A] mb-6">After NUMI</h3>
                <ul className="space-y-4">
                  {afterBullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 leading-relaxed">
                      <span className="text-[#D8B86A] mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === SECTION 4: TRUST SIGNAL === */}
        <section ref={trustRef} className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate={trustInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
                This Is Not About Predicting Your Future.
              </h2>

              <p className="text-white/60 text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                NUMI is designed for self-reflection and personal growth. Your Pattern Code is not a fixed destiny. It is a mirror to help you understand how you think, feel, decide, react, and grow.
              </p>

              {/* Testimonial */}
              <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="absolute top-6 left-6 text-[#D8B86A]/20 font-serif text-5xl leading-none select-none">"</div>

                <blockquote className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 font-light relative">
                  <p>"I thought I was just burned out. NUMI helped me see the pattern behind why I kept feeling stuck."</p>
                </blockquote>

                <p className="text-white/40 text-sm tracking-wide">— Early NUMI User</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === SECTION 5: OPT-IN === */}
        <section ref={optinRef} className="py-24 md:py-32 px-6">
          <div className="max-w-md mx-auto">
            <motion.div
              initial="hidden"
              animate={optinInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
              ref={formRef}
            >
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">Reveal Your Pattern Code</h2>
                <p className="text-white/50 text-sm text-center mb-8">
                  Enter your details to receive the free Pattern Code guide and unlock your first NUMI insight.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A]/30 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A]/30 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-sm mb-2">Birthdate</label>
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
                    <p className="text-white/30 text-xs mt-2">Used only to calculate your Core Number.</p>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm" role="alert">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
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
                  </button>

                  <p className="text-white/30 text-xs text-center">
                    No spam. Just your free guide and NUMI updates.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === FINAL CTA / FOOTER LINE === */}
        <section ref={finalRef} className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate={finalInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
                Maybe You're Not Lost.
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                  Maybe You're Learning To Read The Pattern.
                </span>
              </h2>

              <button
                onClick={scrollToForm}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D8B86A]/20 mx-auto"
              >
                <span>Reveal My Pattern Code</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
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
