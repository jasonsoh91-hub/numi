"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Mail, Calendar, ArrowRight, Home, Gift, Clock } from "lucide-react";

export default function ThankYouV3Page() {
  const router = useRouter();
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="https://numi-intl.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <img
              src="/numi-logo.png"
              alt="NUMI"
              className="h-8 w-auto md:h-10"
            />
          </a>

          <a
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 md:px-6 md:py-2.5"
          >
            Back to Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24 md:px-6">
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
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center">
                  <Check className="w-10 h-10 md:w-12 md:h-12 text-[#0A0E27]" strokeWidth={3} />
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                You're In, {registrationData?.firstName || "Friend"}!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                Your seat is saved. Check your email — we just sent your calendar invite and a quick prep note so you're ready for the live session.
              </p>
            </motion.div>

            {/* Event Cards */}
            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-4 md:gap-6 mt-8"
            >
              {/* Email Confirmation */}
              <div className="bg-gray-50 rounded-2xl p-6 text-left">
                <div className="w-12 h-12 mb-4 rounded-xl bg-[#D8B86A]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#D8B86A]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Check Your Inbox</h3>
                <p className="text-sm text-gray-600">
                  We sent your confirmation and calendar invite to <span className="font-medium text-gray-900">{registrationData?.email || "your email"}</span>
                </p>
              </div>

              {/* Prep Note */}
              <div className="bg-[#D8B86A]/10 border border-[#D8B86A]/20 rounded-2xl p-6 text-left">
                <div className="w-12 h-12 mb-4 rounded-xl bg-[#D8B86A]/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#D8B86A]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Bring Your Birth Date</h3>
                <p className="text-sm text-gray-600">
                  You'll receive a short prep note so you know your birth date numbers and can follow along live.
                </p>
              </div>
            </motion.div>

            {/* What's Next */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 mt-6 text-left"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">The moment you register:</h3>
              <ul className="space-y-4">
                {[
                  "Instant confirmation + calendar invite so you don't miss it",
                  "Your private join link for the live session",
                  "A short \"bring your birth date\" prep note so you're ready to read your own pattern live",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-gray-700"
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
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <motion.button
                onClick={() => router.push("/lead-magnet")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Get Your Full Pattern Code</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>

            {/* Footer Note */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 text-sm max-w-md mx-auto"
            >
              Questions? Email us at{' '}
              <a href="mailto:hello@numi.com" className="text-[#D8B86A] hover:underline font-medium">
                hello@numi.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 text-xs">© 2026 NUMI International (M) SDN BHD All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
