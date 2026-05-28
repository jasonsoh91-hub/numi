"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Download, Sparkles, Lock, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { calculateCoreNumber, calculateNumerologyBreakdown, NumerologyBreakdown } from "@/lib/calculateCoreNumber";
import { getNumberContent, NumberContent } from "@/lib/numerology-content";

export default function LeadMagnetSuccessPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [coreNumber, setCoreNumber] = useState<number | null>(null);
  const [numberContent, setNumberContent] = useState<NumberContent | undefined>();
  const [birthdate, setBirthdate] = useState("");
  const [breakdown, setBreakdown] = useState<NumerologyBreakdown | null>(null);

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("numiLeadMagnet");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setEmail(parsed.email || "");
        setFirstName(parsed.firstName || "");
        setBirthdate(parsed.birthDate || "");

        console.log("Birthdate from localStorage:", parsed.birthDate);

        // Calculate Core Number and detailed breakdown
        const calculated = calculateCoreNumber(parsed.birthDate || "");
        console.log("Core Number calculated:", calculated);
        setCoreNumber(calculated);
        if (calculated) {
          const content = getNumberContent(calculated);
          setNumberContent(content);
          console.log("Number content:", content);
        }

        // Calculate detailed breakdown
        const detailed = calculateNumerologyBreakdown(parsed.birthDate || "");
        console.log("Detailed breakdown:", detailed);
        setBreakdown(detailed);
      } catch (error) {
        console.error("Error parsing lead magnet data:", error);
      }
    } else {
      console.log("No lead magnet data found, redirecting");
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
            className="text-center mb-12"
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

          {/* Personalized Pattern Preview with Detailed Breakdown */}
          {breakdown && numberContent && (
            <motion.div
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.5 }}
              className="mb-12"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#D8B86A]/10 border border-[#D8B86A]/20 text-[#D8B86A] px-4 py-2 rounded-full text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Your Personal Pattern Breakdown</span>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                {/* Life Path Number Display - Main */}
                <div className="bg-gradient-to-r from-[#D8B86A]/20 via-[#F4D47A]/10 to-[#D8B86A]/20 p-8 text-center border-b border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Your Life Path Number</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.7, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] flex items-center justify-center shadow-lg shadow-[#D8B86A]/30"
                  >
                    <span className="text-5xl font-bold text-[#0A0E27]">{breakdown.lifePathNumber}</span>
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {breakdown.lifePathNumber} — {numberContent.title}
                  </h2>
                  <p className="text-[#D8B86A] text-sm font-medium">{numberContent.subtitle}</p>
                </div>

                {/* Detailed Number Breakdown */}
                <div className="p-8">
                  <h3 className="text-white/50 text-xs uppercase tracking-wider mb-6 text-center">Your Complete Number Structure</h3>

                  {/* Birthdate Breakdown */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Day Number */}
                    <div className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <div className="text-white/40 text-xs mb-2">DAY</div>
                        <div className="text-lg text-white/60 mb-1">{breakdown.dayRaw}</div>
                        <div className="flex items-center gap-2">
                          <span className="w-10 h-10 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/20 flex items-center justify-center text-[#D8B86A] font-bold">
                            {breakdown.daySum}
                          </span>
                          <span className="text-white/30">→</span>
                          <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold">
                            {breakdown.dayNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Month Number */}
                    <div className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <div className="text-white/40 text-xs mb-2">MONTH</div>
                        <div className="text-lg text-white/60 mb-1">{String(breakdown.monthSum).padStart(2, "0")}</div>
                        <div className="flex items-center gap-2">
                          <span className="w-10 h-10 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/20 flex items-center justify-center text-[#D8B86A] font-bold">
                            {breakdown.monthSum}
                          </span>
                          {breakdown.monthSum > 9 && (
                            <>
                              <span className="text-white/30">→</span>
                              <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold">
                                {breakdown.monthNumber}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Year Number */}
                    <div className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <div className="text-white/40 text-xs mb-2">YEAR</div>
                        <div className="text-lg text-white/60 mb-1">{breakdown.yearSum}</div>
                        <div className="flex items-center gap-2">
                          <span className="w-10 h-10 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/20 flex items-center justify-center text-[#D8B86A] font-bold text-sm">
                            {breakdown.yearSum}
                          </span>
                          <span className="text-white/30">→</span>
                          <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold">
                            {breakdown.yearNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* First Layer: Day-Month-Year */}
                  <div className="bg-white/[0.02] rounded-2xl p-6 mb-6">
                    <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4 text-center">First Layer: Day — Month — Year</h4>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/30 flex items-center justify-center">
                        <span className="text-[#D8B86A] text-xl font-bold">{breakdown.dayNumber}</span>
                      </div>
                      <span className="text-white/20">—</span>
                      <div className="w-14 h-14 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/30 flex items-center justify-center">
                        <span className="text-[#D8B86A] text-xl font-bold">{breakdown.monthNumber}</span>
                      </div>
                      <span className="text-white/20">—</span>
                      <div className="w-14 h-14 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/30 flex items-center justify-center">
                        <span className="text-[#D8B86A] text-xl font-bold">{breakdown.yearNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Numbers */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/[0.02] rounded-xl p-4 text-center">
                      <div className="text-white/40 text-xs mb-2">Day + Month</div>
                      <div className="text-white/60 text-sm mb-1">{breakdown.dayNumber} + {breakdown.monthNumber} = {breakdown.dayNumber + breakdown.monthNumber}</div>
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                        <span className="text-white font-bold">{breakdown.connecting1}</span>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] rounded-xl p-4 text-center">
                      <div className="text-white/40 text-xs mb-2">Month + Year</div>
                      <div className="text-white/60 text-sm mb-1">{breakdown.monthNumber} + {breakdown.yearNumber} = {breakdown.monthNumber + breakdown.yearNumber}</div>
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                        <span className="text-white font-bold">{breakdown.connecting2}</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Result: Life Path */}
                  <div className="bg-gradient-to-r from-[#D8B86A]/10 to-[#D8B86A]/5 border border-[#D8B86A]/20 rounded-xl p-5 text-center">
                    <div className="text-[#D8B86A] text-xs font-semibold mb-2">Life Path Number</div>
                    <div className="text-white/60 text-sm mb-2">
                      {breakdown.connecting1} + {breakdown.connecting2} = {breakdown.connecting1 + breakdown.connecting2}
                      {breakdown.connecting1 + breakdown.connecting2 > 9 && (
                        <span> → {breakdown.lifePathNumber}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-white">{breakdown.lifePathNumber}</span>
                      <span className="text-white/40 text-sm">— {numberContent.title}</span>
                    </div>
                  </div>
                </div>

                {/* Pattern Description */}
                <div className="p-8 pt-0">
                  <p className="text-white/70 leading-relaxed mb-6">
                    {numberContent.coreEssence}
                  </p>

                  {/* Preview of strengths */}
                  <div className="mb-6">
                    <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Your Natural Strengths</h3>
                    <div className="flex flex-wrap gap-2">
                      {numberContent.strengths.slice(0, 3).map((strength, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-[#D8B86A]/10 border border-[#D8B86A]/20 rounded-lg text-white/80 text-sm"
                        >
                          {strength}
                        </span>
                      ))}
                      <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40 text-sm flex items-center gap-1">
                        + more in NUMI
                      </span>
                    </div>
                  </div>

                  {/* Teaser for full insights */}
                  <div className="bg-[#D8B86A]/5 border border-[#D8B86A]/10 rounded-xl p-4 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-[#D8B86A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/60 text-sm">
                        <span className="text-[#D8B86A] font-semibold">Unlock the full pattern map:</span> Your complete
                        relationship dynamics, 2026 strategic focus, career alignment, and personalized action steps are
                        waiting in NUMI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Fallback: Simple Core Number Display (when breakdown fails) */}
          {!breakdown && coreNumber && numberContent && (
            <motion.div
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: transitionDuration, delay: prefersReducedMotion ? 0 : 0.5 }}
              className="mb-12"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#D8B86A]/10 border border-[#D8B86A]/20 text-[#D8B86A] px-4 py-2 rounded-full text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Your Pattern Number</span>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#D8B86A]/20 via-[#F4D47A]/10 to-[#D8B86A]/20 p-8 text-center border-b border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Your Core Number</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.7, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] flex items-center justify-center shadow-lg shadow-[#D8B86A]/30"
                  >
                    <span className="text-5xl font-bold text-[#0A0E27]">{coreNumber}</span>
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {coreNumber} — {numberContent.title}
                  </h2>
                  <p className="text-[#D8B86A] text-sm font-medium">{numberContent.subtitle}</p>
                </div>

                <div className="p-8">
                  <p className="text-white/70 leading-relaxed mb-6">
                    {numberContent.coreEssence}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Your Natural Strengths</h3>
                    <div className="flex flex-wrap gap-2">
                      {numberContent.strengths.slice(0, 3).map((strength, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-[#D8B86A]/10 border border-[#D8B86A]/20 rounded-lg text-white/80 text-sm"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
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

