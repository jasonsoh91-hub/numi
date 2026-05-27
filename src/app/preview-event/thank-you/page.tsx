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
    <div className="min-h-screen text-gray-900 relative bg-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

        {mounted && !prefersReducedMotion && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D8B86A]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.span
            className="text-2xl font-bold bg-gradient-to-r from-[#D8B86A] to-[#B8943A] bg-clip-text text-transparent"
          >
            NUMI
          </motion.span>
          <motion.button
            onClick={() => router.push("/")}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-medium text-sm text-gray-700 transition-colors flex items-center gap-2"
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
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#E5C47A] flex items-center justify-center shadow-lg shadow-[#D8B86A]/30">
                  <Check className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={3} />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#D8B86A]/20"
                />
              </motion.div>
            </motion.div>

            {/* Main Message */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                {registrationData?.firstName ? `You're In, ${registrationData.firstName}!` : "You're In!"}
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 mb-4">
                Your Spot is Reserved
              </p>
              <p className="text-gray-400 max-w-xl mx-auto">
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
                  className="p-6 rounded-2xl bg-white border border-gray-100 text-left hover:border-[#D8B86A]/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-[#D8B86A]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Checklist */}
            <motion.div
              variants={fadeInUp}
              className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 text-left max-w-lg mx-auto"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">What Happens Next</h3>
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
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => router.push("/lead-magnet")}
                className="group px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#E5C47A] to-[#D8B86A] hover:shadow-lg hover:shadow-[#D8B86A]/25 text-white rounded-xl font-semibold transition-all flex items-center gap-2 relative overflow-hidden"
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
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </motion.div>

            {/* Email Note */}
            <motion.p variants={fadeInUp} className="text-gray-400 text-sm max-w-md mx-auto">
              Can't find our email? Check your spam folder or contact{' '}
              <a href="mailto:hello@numi.com" className="text-[#D8B86A] hover:underline">
                hello@numi.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 text-xs leading-relaxed">
            NUMI is designed for self-reflection and personal growth. It does not provide medical, financial, legal, or professional advice.
          </p>
          <p className="text-gray-300 text-xs mt-6">© 2026 NUMI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
