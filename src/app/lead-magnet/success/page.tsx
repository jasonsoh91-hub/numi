"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowRight, Home } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export default function LeadMagnetSuccessPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("numiLeadMagnet");
    if (data) {
      const parsed = JSON.parse(data);
      setEmail(parsed.email || "");
      setFirstName(parsed.firstName || "");
    } else {
      router.push("/lead-magnet");
    }
  }, [router]);

  const handleDownload = () => {
    window.open("/The Pattern Code NUMI Self-Discovery Guide (Flyer (A4)) (1).pdf", "_blank");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { scale: prefersReducedMotion ? 1 : 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.5;

  const nextSteps = [
    {
      step: 1,
      title: "Read your guide",
      desc: "Take 15 minutes to understand the pattern framework and how it applies to your life",
      icon: "📖",
    },
    {
      step: 2,
      title: "Calculate your Core Number",
      desc: "Use the simple formula in the guide to find your primary pattern number",
      icon: "🔢",
    },
    {
      step: 3,
      title: "Reflect on what resonates",
      desc: "Notice which parts of the description feel familiar to your experience",
      icon: "💭",
    },
    {
      step: 4,
      title: "Consider going deeper",
      desc: "If you want more personalized insights, explore a full numerology report",
      icon: "🔍",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#0F0F23] to-[#0A0E27] text-white">
      {/* Floating subtle orbs */}
      {mounted && !prefersReducedMotion && (
        <>
          <div className="fixed top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0E27]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold tracking-wider hover:opacity-80 transition-opacity">
            <span className="text-[#D8B86A]">NUMI</span>
          </a>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={scaleIn}
            transition={{ duration: transitionDuration, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {firstName ? `You're in, ${firstName}.` : "You're in."}
            </h1>
            <p className="text-xl text-white/50">
              Your Pattern Code Guide is ready.
            </p>
          </motion.div>

          {/* Email Confirmation */}
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="bg-white/[0.03] border border-[#D8B86A]/20 rounded-2xl p-6 mb-10 text-center backdrop-blur-sm"
          >
            <p className="text-white/70 mb-2">
              We've sent a copy to:
            </p>
            <p className="text-[#D8B86A] font-semibold text-lg">
              {email || "your email"}
            </p>
            <p className="text-white/30 text-sm mt-3">
              (Check your spam folder if you don't see it within a few minutes)
            </p>
          </motion.div>

          {/* Download Button */}
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.4 }}
            className="text-center mb-16"
          >
            <button
              onClick={handleDownload}
              className="group px-10 py-5 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-xl rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#D8B86A]/20 flex items-center gap-3 mx-auto cursor-pointer"
            >
              <Download className="w-6 h-6" />
              <span>Download My Free Guide</span>
            </button>
            <p className="text-white/30 text-sm mt-4">
              PDF format • Ready to read now
            </p>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">What's Next?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {nextSteps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/20 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[#D8B86A] text-sm font-semibold mb-1">Step {item.step}</div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Offer */}
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="relative bg-gradient-to-br from-[#D8B86A]/10 to-[#D8B86A]/5 border border-[#D8B86A]/20 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D8B86A]/5 rounded-full blur-[100px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-[#D8B86A]/10 border border-[#D8B86A]/20 text-[#D8B86A] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span>Go Deeper</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want Your Complete Personalized Report?
              </h2>

              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Your free guide is a great start. A full personalized report dives deeper into your specific patterns —
                relationships, career timing, challenges, and opportunities.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/funnel"
                  className="group px-8 py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#D8B86A]/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Full Report</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href="/"
                  className="px-8 py-4 border border-white/20 text-white hover:text-[#D8B86A] hover:border-[#D8B86A]/50 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Return Home</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center text-white/30 text-sm">
          <p>© 2026 NUMI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
