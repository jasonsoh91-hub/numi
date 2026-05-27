"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Mail, Calendar, ArrowRight, Home, Sparkles } from "lucide-react";

export default function ThankYouPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [registrationData, setRegistrationData] = useState<{ firstName: string; email: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("numiEventRegistration");
    if (data) {
      setRegistrationData(JSON.parse(data));
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12
      }
    }
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const nextSteps = [
    { icon: Mail, title: "Check Your Email", desc: "We'll send event details and access link soon" },
    { icon: Calendar, title: "Save the Date", desc: "We'll announce the exact date via email" },
    { icon: Sparkles, title: "Prepare for Discovery", desc: "Get ready to uncover your Pattern Code" },
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* === CINEMATIC BACKGROUND === */}
      <div className="fixed inset-0 bg-[#0A0E27] overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0F0F23] to-[#0a0d1a]" />

        {mounted && !prefersReducedMotion && (
          <>
            {/* Gold ambient glow */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full opacity-20"
              style={{
                top: "-200px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(circle, rgba(216, 184, 106, 0.15) 0%, rgba(216, 184, 106, 0.05) 40%, transparent 70%)",
                filter: "blur(100px)",
                animation: "ambientDrift 30s ease-in-out infinite alternate",
              }}
            />
            {/* Purple/blue glow */}
            <div
              className="absolute w-[900px] h-[900px] rounded-full opacity-15"
              style={{
                bottom: "-250px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)",
                filter: "blur(120px)",
                animation: "ambientDrift 25s ease-in-out infinite alternate",
              }}
            />

            {/* Floating particles */}
            {Array.from({ length: 25 }).map((_, i) => {
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
          </>
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5, 10, 20, 0.4) 100%)" }}
        />
      </div>

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
          >
            NUMI
          </motion.span>
          <motion.button
            onClick={() => router.push("/")}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full font-medium text-sm transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            {/* Success Icon */}
            <motion.div variants={fadeInUp} className="relative inline-block">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                className="relative"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center">
                  <Check className="w-12 h-12 md:w-16 md:h-16 text-[#0A0E27]" strokeWidth={3} />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#D8B86A]/30"
                />
              </motion.div>
            </motion.div>

            {/* Main Message */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {registrationData?.firstName ? `You're In, ${registrationData.firstName}!` : "You're In!"}
              </h1>
              <p className="text-xl md:text-2xl text-white/50 mb-4">
                Your Spot is Reserved
              </p>
              <p className="text-white/40 max-w-xl mx-auto">
                Thank you for registering for the NUMI Pattern Code masterclass. Get ready to discover the hidden patterns shaping your life.
              </p>
            </motion.div>

            {/* Next Steps */}
            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mt-12">
              {nextSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.4 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.05] border border-white/10 text-left hover:border-[#D8B86A]/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-[#D8B86A]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Checklist */}
            <motion.div
              variants={fadeInUp}
              className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 text-left max-w-lg mx-auto"
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center">What Happens Next</h3>
              <ul className="space-y-4">
                {[
                  "Check your email for confirmation",
                  "Add the event to your calendar",
                  "Receive the access link before the event",
                  "Join us live for your Pattern reveal",
                  "Participate in live Q&A"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.6 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-[#D8B86A] mt-0.5 flex-shrink-0" strokeWidth={3} />
                    <span className="text-white/60">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => router.push("/lead-magnet")}
                className="group px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] rounded-xl font-semibold transition-all flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {mounted && !prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get Your Free Pattern Guide</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                onClick={() => router.push("/")}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </motion.div>

            {/* Email Note */}
            <motion.p variants={fadeInUp} className="text-white/30 text-sm max-w-md mx-auto">
              Can't find our email? Check your spam folder or contact{' '}
              <a href="mailto:hello@numi.com" className="text-[#D8B86A] hover:underline">
                hello@numi.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5">
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
