"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, Mail, Calendar, ArrowRight, Home } from "lucide-react";

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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* === CINEMATIC BACKGROUND === */}
      <div className="fixed inset-0 bg-[#0A0E27]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0F0F23] to-[#0a0d1a]" />

        {mounted && !prefersReducedMotion && (
          <>
            {/* Gold ambient glow - top */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full opacity-20 animate-ambient-drift-slow"
              style={{
                top: "-200px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(circle, rgba(216, 184, 106, 0.15) 0%, rgba(216, 184, 106, 0.05) 40%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />
            {/* Deep blue glow - bottom */}
            <div
              className="absolute w-[900px] h-[900px] rounded-full opacity-15 animate-ambient-drift"
              style={{
                bottom: "-250px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%)",
                filter: "blur(120px)",
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
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Success Icon */}
            <motion.div
              variants={fadeInUp}
              className="relative inline-flex"
            >
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
                  className="absolute inset-0 rounded-full bg-[#D8B86A]/30"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Main Message */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                You&apos;re In!
                <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A]">
                  {registrationData?.firstName || "Spot"} Reserved
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
                Thank you for registering for the NUMI Live Preview event. You&apos;re one step closer to discovering your Pattern Code.
              </p>
            </motion.div>

            {/* Event Cards */}
            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-4 md:gap-6 mt-12"
            >
              {/* Email Confirmation */}
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:border-[#D8B86A]/20 transition-colors duration-200">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#D8B86A]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Check Your Email</h3>
                <p className="text-white/50 text-sm">
                  We&apos;ll send event details and the access link to your email soon.
                </p>
              </div>

              {/* Calendar Info */}
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:border-[#D8B86A]/20 transition-colors duration-200">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#D8B86A]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Save the Date</h3>
                <p className="text-white/50 text-sm">
                  We&apos;ll announce the exact date soon. Stay tuned for updates.
                </p>
              </div>
            </motion.div>

            {/* What's Next */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 mt-8 text-left"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">What&apos;s Next?</h3>
              <ul className="space-y-4 max-w-md mx-auto">
                {[
                  "Check your email for a confirmation message",
                  "Look out for event details and access link",
                  "Join us live for your NUMI Pattern reveal",
                  "Bring your questions for the live Q&A",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.8 + i * 0.1 }}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <Check className="w-5 h-5 text-[#D8B86A] mt-0.5 flex-shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.button
                onClick={() => router.push("/lead-magnet")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-6 py-3 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D8B86A]/20 overflow-hidden"
              >
                <span>Get Your Free Pattern Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>

              <motion.button
                onClick={() => router.push("/")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </motion.button>
            </motion.div>

            {/* Footer Note */}
            <motion.p
              variants={fadeInUp}
              className="text-white/30 text-sm max-w-md mx-auto"
            >
              Can&apos;t find our email? Check your spam folder or contact us at{' '}
              <a href="mailto:hello@numi.com" className="text-[#D8B86A] hover:underline">
                hello@numi.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/20 text-xs">© 2026 NUMI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
