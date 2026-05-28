"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Calendar, Clock, Users, Sparkles, Play, Mail } from "lucide-react";

export default function PreviewEventPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const gainRef = useRef(null);
  const speakerRef = useRef(null);
  const finalCtaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const gainInView = useInView(gainRef, { once: true, amount: 0.2 });
  const speakerInView = useInView(speakerRef, { once: true, amount: 0.2 });
  const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.3 });

  useEffect(() => { setMounted(true); }, []);

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

  const fadeInUp = { hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 }, visible: { opacity: 1, y: 0 } };
  const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  const gains = [
    { title: "How your birthdate reveals your Core Pattern", desc: "Learn the NUMI system that decodes your unique blueprint from your date of birth" },
    { title: "Why emotional cycles keep repeating", desc: "Understand the hidden patterns behind why you feel stuck in certain areas of life" },
    { title: "Your natural decision-making style", desc: "Discover how to make choices that align with your authentic self rather than against it" },
    { title: "Hidden strengths you may not have noticed", desc: "Uncover talents and abilities that have been dormant, waiting to be activated" },
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[#0A0E27]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0F0F23] to-[#0A0E27]" />
        {mounted && !prefersReducedMotion && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(216, 184, 106, 0.25) 0%, transparent 70%)", filter: "blur(150px)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)", filter: "blur(150px)" }} />
          </>
        )}
      </div>

      {/* HERO - Mindvalley Format */}
      <section ref={heroRef} className="relative min-h-screen flex items-center px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} className="space-y-6 md:space-y-8">
              {/* Badge - Mindvalley style */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#D8B86A]/10 border border-[#D8B86A]/30 rounded-full">
                <Sparkles className="w-4 h-4 text-[#D8B86A]" />
                <span className="text-[#D8B86A] text-sm font-medium">A NUMI Masterclass for Those Ready to Discover Their True Self</span>
              </motion.div>

              {/* Headline - Mindvalley style */}
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Your
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                  NUMI Pattern Code
                </span>
                <span className="block mt-2 text-white">— Starting with Your Own</span>
              </motion.h1>

              {/* Subtitle - Mindvalley style */}
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 max-w-xl">
                Join this free masterclass to uncover the hidden pattern behind how you think, feel, decide, and grow — even if you&apos;re starting from scratch.
              </motion.p>

              {/* Trainer Info - Mindvalley style */}
              <motion.div variants={fadeInUp} className="flex items-center gap-3 pt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D8B86A]/30">
                  <img
                    src="https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/6901829d-ad38-4844-af22-8f52bfb9c78f/1.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1779944663&Signature=cgl0g7lbWmx3MgQIjagLPLKcVJg="
                    alt="Dr. Keith Tong"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white/40 text-sm">With</p>
                  <p className="text-white font-semibold">Dr. Keith Tong</p>
                </div>
              </motion.div>

              {/* Stats Bar - Mindvalley style */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 md:gap-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#D8B86A]" />
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">Limited</div>
                    <div className="text-white/50 text-sm">Spots Available</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#D8B86A]" />
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">60</div>
                    <div className="text-white/50 text-sm">Min Training</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Play className="w-6 h-6 text-[#D8B86A]" />
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">Free</div>
                    <div className="text-white/50 text-sm">To Attend</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Registration Form - Mindvalley style */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="lg:pl-8">
              <div className="bg-white/[0.08] border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/5 via-transparent to-transparent opacity-50" />

                {/* Form Icon - Mindvalley style */}
                <motion.div variants={scaleIn} className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center border border-[#D8B86A]/20">
                    <Mail className="w-8 h-8 text-[#D8B86A]" />
                  </div>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 relative">Claim Your FREE Spot Now</h2>
                <p className="text-white/50 text-sm mb-6 relative">Submit your details to secure your spot in the free masterclass</p>

                <form onSubmit={handleSubmit} className="space-y-4 relative">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Name *</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all"
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-[#0A0E27] border-t-transparent rounded-full" />
                        <span>Reserving Spot...</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve Your Spot Now</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-white/30 text-xs text-center">
                    By registering for the above, you confirm that you agree to receive notifications about this event. You can withdraw your consent at any time.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL GAIN - Mindvalley Format */}
      <section ref={gainRef} className="relative py-16 md:py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">What You&apos;ll Gain From This Free Masterclass — Even If You&apos;re Starting from Scratch</h2>
          </motion.div>

          <div className="space-y-10 md:space-y-12">
            {gains.map((gain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.1 + i * 0.1 }}
                className="flex gap-6 md:gap-8"
              >
                <div className="flex-shrink-0">
                  <span className="text-6xl md:text-7xl font-bold text-[#D8B86A]/20">{i + 1}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{gain.title}</h3>
                  <p className="text-white/50 leading-relaxed">{gain.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
          >
            <p className="text-white/70 leading-relaxed text-center">
              Wherever you&apos;re at now, and whatever challenges or doubts you&apos;ve had in the past: you&apos;ll emerge from this Masterclass with an actionable understanding of your Pattern Code and how to use it in your daily life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SPEAKER SECTION - Mindvalley Format */}
      <section ref={speakerRef} className="relative py-16 md:py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Meet Your Trainer: Dr. Keith Tong</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img
                  src="https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/6901829d-ad38-4844-af22-8f52bfb9c78f/1.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1779944663&Signature=cgl0g7lbWmx3MgQIjagLPLKcVJg="
                  alt="Dr. Keith Tong"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Dr. Keith Tong</h3>
              <p className="text-[#D8B86A] font-medium mb-6">PhD, Doctor of Natural Medicine (DNM)</p>

              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  <span className="text-white font-semibold">Dr. Keith Tong</span> is the creator of the NUMI Numerology System and best-selling author of &quot;Cutting Loose.&quot;
                </p>
                <p>
                  With 25+ years in holistic health and personal development, he has helped thousands of people discover their authentic selves through the power of pattern awareness.
                </p>
                <p>
                  His unique approach combines ancient numerology wisdom with modern psychology, making complex pattern insights accessible and practical for everyday life.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION SECTION - Mindvalley Format */}
      <section className="relative py-16 md:py-24 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#D8B86A]/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Transformation You Will Experience Through the NUMI Pattern Code</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Discover how understanding your unique pattern can unlock clarity in decision-making, harmony in relationships, and confidence in your life path.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA - Mindvalley Format */}
      <section ref={finalCtaRef} className="relative py-16 md:py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready To Get Started?</h2>
            <p className="text-white/60 text-lg">Submit your details below to secure your spot in this NUMI Masterclass.</p>
          </motion.div>

          {/* Large Banner Image - Mindvalley style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden mb-12 border-2 border-white/10"
          >
            <img
              src="https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/6901829d-ad38-4844-af22-8f52bfb9c78f/1.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1779944663&Signature=cgl0g7lbWmx3MgQIjagLPLKcVJg="
              alt="Discover Your NUMI Pattern Code"
              className="w-full h-48 md:h-64 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent" />
          </motion.div>

          {/* Registration Form - Mindvalley style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white/[0.08] border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D8B86A]/5 via-transparent to-transparent opacity-50" />

              <motion.div variants={scaleIn} className="relative mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center border border-[#D8B86A]/20">
                  <Mail className="w-8 h-8 text-[#D8B86A]" />
                </div>
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center relative">Claim Your FREE Spot Now</h2>
              <p className="text-white/50 text-sm text-center mb-6 relative">Submit your details to secure your spot in the free masterclass</p>

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 transition-all"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-[#0A0E27] border-t-transparent rounded-full" />
                      <span>Reserving Spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Reserve Your Spot Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-white/30 text-xs text-center">
                  By registering for the above, you confirm that you agree to receive notifications about this event. You can withdraw your consent at any time.
                </p>
              </form>
            </div>
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
