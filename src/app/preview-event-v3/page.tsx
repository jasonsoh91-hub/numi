"use client";

import { ArrowRight, CheckCircle2, Clock, Mail, Quote, Users, Calendar, Award, Globe, Newspaper, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { subscribeToAC } from "@/lib/subscribe";
import { CountdownTimer } from "@/components/CountdownTimer";

const WEBINAR_TARGET_ISO = "2026-07-22T01:00:00Z"; // 2026-07-21 20:00 EST (UTC-5)

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

const pains = [
  {
    number: "01",
    title: "You did everything \"right\" — and you're back at square one",
    body: "New job, new relationship, fresh start. Same knot in your stomach a year later. It's not for lack of trying. You've tried harder than anyone knows.",
  },
  {
    number: "02",
    title: "The same problem keeps finding you — just wearing a different face",
    body: "The same kind of partner. The same kind of boss. The same money ceiling you can't seem to break through, no matter how the details change.",
  },
  {
    number: "03",
    title: "Everyone says \"trust the process.\" Nobody can tell you which way to go",
    body: "You're standing at a fork in the road with real decisions to make — and all the advice in the world can't tell you which path is actually yours.",
  },
];

const whatYoullLearn = [
  {
    number: "01",
    title: "The single number you were born with — and the exact loop it's been running in your life",
    body: "The reason the same situations keep circling back isn't random. You'll see the specific pattern your birth date has been quietly repeating — often the moment you see it, everything clicks.",
  },
  {
    number: "02",
    title: "Why \"trying harder\" keeps backfiring",
    body: "When you push against your own timing, effort works against you. You'll learn why willpower alone has failed you — and what actually creates change that lasts.",
  },
  {
    number: "03",
    title: "How to read the cycle you're in right now",
    body: "Every transition lands in a specific phase. Is this a year to build, or a year to release and reset? Reading it wrong is why so many people push hard at exactly the wrong moment. You'll learn to tell the difference.",
  },
  {
    number: "04",
    title: "Your next 12 months — where to push, where to wait, what to decide",
    body: "Walk away with a clear read on the year ahead: where to put your energy, which doors are worth opening now, and which decisions are better left for later.",
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    role: "35, between careers",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=640&h=800&fit=crop",
    quote:
      "I'd just left a job I thought was the problem — turns out I'd recreated the same dynamic three times. Seeing the actual pattern in my birth date was the first time any of it made sense. I stopped blaming myself and started making different choices.",
  },
  {
    name: "John D.",
    role: "44, business owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=800&fit=crop",
    quote:
      "I came in skeptical — I'd done the \"find your purpose\" thing before and rolled my eyes at it. This was different. It didn't tell me who to be. It showed me the timing I'd been fighting, and suddenly the last five years made sense.",
  },
  {
    name: "Michael K.",
    role: "38, mid-career reset",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&h=800&fit=crop",
    quote:
      "I was spiraling after a big life change and reading it as failure. The session reframed it as a phase in my cycle — a reset, not a dead end. I walked away with an actual plan for the year instead of dread.",
  },
];

// Credibility bar items
const credibility = [
  { icon: Clock, label: "20+ years decoding the link between numbers and human behavior" },
  { icon: Award, label: "20+ years of experience decoding life patterns" },
  { icon: Users, label: "Read birth-date patterns for 5,000+ people across 12 countries" },
  { icon: Newspaper, label: "Featured in national media for his work on the meaning of numbers" },
];

function RegistrationCard() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    webinarDate: "2026-07-21" | "2026-07-28";
  }>({ name: "", email: "", phone: "", webinarDate: "2026-07-21" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const parts = formData.name.trim().split(/\s+/);
      const firstName = parts.shift() ?? "";
      const lastName = parts.join(" ") || undefined;
      localStorage.setItem("numiEventRegistration", JSON.stringify({
        firstName,
        email: formData.email,
        phone: formData.phone,
        webinarDate: formData.webinarDate,
      }));

      await subscribeToAC({
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        webinarDate: formData.webinarDate,
        listType: "webinar",
        source: "preview-event-v3",
      });

      setTimeout(() => {
        window.location.href = "/preview-event-v3/thank-you";
      }, 500);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-xl">
      {/* Header Bar */}
      <div className="rounded-t-xl border-2 border-[#D8B86A] bg-gradient-to-r from-[#0A0E27] to-[#1a1f3a] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D8B86A]/20">
            <Mail className="h-4 w-4 text-[#D8B86A]" />
          </div>
          <span className="text-sm font-bold text-white md:text-base">
            Save your seat
          </span>
        </div>
        <div className="mt-2.5 border-t border-white/10 pt-2.5">
          <p className="mb-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60 md:text-[10px]">
            Masterclass begins in
          </p>
          <CountdownTimer targetIso={WEBINAR_TARGET_ISO} variant="dark" />
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-b-xl border-2 border-t-0 border-gray-200 bg-white p-4 md:p-4">
        <p className="mb-3 text-center text-xs text-gray-600 md:text-sm">
          Enter your details to lock in your spot.
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Session Date Picker */}
          <fieldset>
            <legend className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-700">
              Pick your session
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "2026-07-21" as const, label: "Tue, Jul 21", sub: "8:00 PM EST" },
                { value: "2026-07-28" as const, label: "Tue, Jul 28", sub: "8:00 PM EST" },
              ].map((opt) => {
                const active = formData.webinarDate === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`cursor-pointer rounded-lg border-2 px-2 py-2 text-center transition ${
                      active
                        ? "border-[#D8B86A] bg-[#D8B86A]/10 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="webinarDate"
                      value={opt.value}
                      checked={active}
                      onChange={() => setFormData({ ...formData, webinarDate: opt.value })}
                      className="sr-only"
                    />
                    <span className={`block text-xs font-bold ${active ? "text-[#0A0E27]" : "text-gray-800"}`}>
                      {opt.label}
                    </span>
                    <span className={`mt-0.5 block text-[10px] ${active ? "text-[#0A0E27]/70" : "text-gray-500"}`}>
                      {opt.sub}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Name Field */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition md:text-sm ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 bg-red-50/30"
                    : "border-gray-200 bg-gray-50 focus:border-[#D8B86A] focus:bg-white"
                }`}
              />
              {errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>}
            </div>

            <div>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition md:text-sm ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 bg-red-50/30"
                    : "border-gray-200 bg-gray-50 focus:border-[#D8B86A] focus:bg-white"
                }`}
              />
              {errors.email && <p className="mt-1 text-[10px] text-red-500">{errors.email}</p>}
            </div>

            <div>
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                placeholder="Phone number (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D8B86A] focus:bg-white md:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] bg-[length:200%_100%] px-4 py-2.5 text-xs font-bold text-[#0A0E27] transition-all hover:bg-right disabled:opacity-50 disabled:hover:bg-left md:py-3 md:text-sm"
          >
            {isSubmitting ? "Saving your seat..." : "Save My Seat"}
          </button>

          {/* Disclaimer */}
          <p className="text-center text-[9px] leading-relaxed text-gray-400 md:text-[10px]">
            By registering, you agree to the{' '}
            <a href="/terms" className="underline hover:text-gray-500">Terms of Use</a>
            {' '}& the{' '}
            <a href="/privacy" className="underline hover:text-gray-500">Privacy Policy</a>
            {' '}and to receive notifications about this and future events. You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}

function MediaCard() {
  return (
    <div className="relative mx-auto max-w-[520px] rounded-xl overflow-hidden">
      <img
        src="/event-banner-v2.png"
        alt="NUMI Masterclass"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}

function PainCard({ item, index }: { item: typeof pains[0]; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex w-full items-start gap-3 p-4 text-left md:p-5">
        <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-[#D8B86A]/10 text-sm font-bold text-[#D8B86A] md:h-12 md:w-12 md:text-base">
          {item.number}
        </span>
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-semibold leading-snug text-gray-900 md:text-base">
            {item.title}
          </h3>
          <p className="text-xs leading-relaxed text-gray-500 md:text-sm">{item.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PreviewEventV3Page() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Floating close button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <nav className="hidden md:flex w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-[980px] flex-row items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-2">
            <a href="https://numi-intl.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img
                src="/numi-logo.png"
                alt="NUMI"
                className="h-8 w-auto md:h-10"
              />
            </a>
          </div>

          <div className="flex items-center">
            <a
              href="#signup"
              className="rounded-lg bg-[#D8B86A] px-4 py-2 text-sm font-semibold text-[#0A0E27] transition hover:bg-[#F4D47A] md:px-6 md:py-2.5"
            >
              Save My Seat
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pb-8 pt-6 md:px-6 md:pb-12 md:pt-8 bg-white">
        <div className="mx-auto max-w-[980px]">
          {/* Mobile banner - shown first on mobile */}
          <div className="md:hidden mb-6">
            <MediaCard />
          </div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mx-auto mb-3 max-w-[720px] text-center text-2xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl"
          >
            Why Does Life Keep Putting You Back at the Same Crossroads?
            <span className="block text-[#D8B86A] mt-2">The Answer Is Hidden in Your Birth Date.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mb-5 max-w-[720px] text-center text-sm leading-relaxed text-gray-600 md:mb-6 md:text-base"
          >
            In this 60-minute live masterclass, Master RenZi (Dr Patrick Tan) shows you how the
            numbers in your own birth date map the pattern behind your repeating struggles — so instead of
            guessing your way through this transition, you walk away with a clear read on the cycle you're in
            and the decisions that will actually move you forward.
          </motion.p>

          <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[22fr_8fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-2 lg:order-1 hidden md:block lg:pt-[132px]"
            >
              <MediaCard />
              <p className="mt-4 text-center text-sm font-semibold text-gray-900 md:text-base">
                With Master RenZi (Dr Patrick Tan) · 20+ years decoding life patterns
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeRight}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-1 lg:sticky lg:top-6 lg:order-2 lg:pt-16"
            >
              <RegistrationCard />
            </motion.div>
          </div>

          {/* Micro-trust line */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="mt-6 text-center text-xs text-gray-500 md:text-sm"
          >
            Live on Tuesday, July 21 · 8:00 PM EST (New York) · Seats limited so the live Q&A stays personal
          </motion.p>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="bg-gray-50 px-4 py-8 md:px-6 md:py-10 border-t border-gray-200">
        <div className="mx-auto max-w-[720px]">
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            {credibility.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-lg bg-[#D8B86A]/10">
                  <item.icon className="h-5 w-5 text-[#D8B86A]" />
                </div>
                <p className="text-xs leading-relaxed text-gray-700 md:text-sm pt-0.5">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="bg-white px-4 py-8 md:px-6 md:py-12 border-t border-gray-200">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-6 text-center md:mb-8"
          >
            <h2 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl">
              If You're Reading This at a Crossroads, You Already Know the Feeling...
            </h2>
          </motion.div>

          <div className="space-y-4 md:space-y-5">
            {pains.map((item, index) => (
              <PainCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mt-6 rounded-lg border-2 border-dashed border-[#D8B86A]/30 bg-[#D8B86A]/5 p-4 md:mt-8 md:p-5"
          >
            <p className="text-center text-sm font-medium leading-relaxed text-gray-900 md:text-base">
              <span className="text-[#D8B86A]">Here's what almost no one tells you:</span> this isn't bad luck, and it isn't a character flaw.
              It's a pattern. A pattern that was set in motion by the numbers in your birth date —
              and a pattern you can finally learn to read.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="bg-gray-50 px-4 py-8 md:px-6 md:py-12 border-t border-gray-200">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-6 md:mb-8"
          >
            <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 md:text-2xl">
              In 60 Minutes, Using Nothing But Your Birth Date, You'll Discover:
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              No fortune-telling. No vague "find your purpose" talk. Just a clear, practical read on the
              pattern you've been living — and what to do with it.
            </p>
          </motion.div>

          <div className="space-y-5 md:space-y-6">
            {whatYoullLearn.map((item, index) => (
              <motion.div
                key={item.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex gap-4 md:gap-5"
              >
                <div className="shrink-0">
                  <span className="text-sm font-bold text-[#D8B86A] md:text-base">
                    {item.number}
                  </span>
                </div>

                <div className="pt-0.5">
                  <h3 className="mb-2 text-sm font-bold leading-snug text-gray-900 md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-600 md:text-sm">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mt-6 rounded-lg bg-gray-50 p-4 md:mt-8 md:p-5"
          >
            <p className="text-center text-xs leading-relaxed text-gray-700 md:text-sm">
              <span className="font-semibold text-gray-900">You don't need to know a thing about numbers to follow along.</span>
              You don't even need to believe it yet. Bring your birth date and an open mind —
              this isn't about becoming someone new. It's about finally understanding the pattern
              you've been living, so you can choose your next move on purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Speaker Section */}
      <section className="bg-white px-4 py-8 md:px-6 md:py-12 border-t border-gray-200">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-6 text-center md:mb-8"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
              Your Guide: Master RenZi (Dr Patrick Tan)
            </h2>
            <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
              Two decades reading the patterns in numbers — and a track record of building real businesses on them.
            </p>
          </motion.div>

          <div className="grid items-center gap-5 md:grid-cols-2 md:gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeLeft}
              transition={{ duration: 0.45 }}
              className="order-2 space-y-2.5 md:order-1 md:space-y-3"
            >
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900 md:text-lg">
                  Master RenZi (Dr Patrick Tan)
                </h3>
                <p className="text-xs font-medium text-[#D8B86A] md:text-sm">
                  Numerologist, entrepreneur & founder of NUMI
                </p>
              </div>

              <div className="space-y-1.5 text-xs leading-relaxed text-gray-600 md:space-y-2 md:text-sm">
                <p>
                  For over 20 years, Master RenZi (Dr Patrick Tan) has studied one question: how do the numbers we're born with shape the way our lives actually unfold? He's a founder and chairman of a group of companies — and built much of that success applying the very patterns he teaches.
                </p>
                <p>
                  His work has been featured in national media for his contributions to the field of numerology and personal development.
                </p>
                <p>
                  But what people remember isn't the titles. It's that he takes something that usually hides behind mysticism and jargon, and makes it plain, practical, and immediately useful — so an ordinary person can walk away knowing exactly what their numbers mean and what to do next.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeRight}
              transition={{ duration: 0.45 }}
              className="order-1 md:order-2"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm md:rounded-xl">
                <img
                  src="/speaker-profile.png"
                  alt="Master RenZi (Dr Patrick Tan)"
                  className="h-full w-full object-cover object-[75%_center]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 px-4 py-8 md:px-6 md:py-12 border-t border-gray-200">
        <div className="mx-auto max-w-[760px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-6 text-center md:mb-8"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
              People Who Were Stuck in the Loop — Until They Could See It
            </h2>
            <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
              Real words from people who finally understood the pattern they'd been living.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-5">
            {testimonials.map((story, index) => (
              <motion.figure
                key={story.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:gap-5 md:p-5"
              >
                <div className="shrink-0">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100 md:h-20 md:w-20">
                    <img src={story.image} alt={story.name} className="h-full w-full object-cover" />
                  </div>
                </div>

                <figcaption className="flex-1 text-left">
                  <Quote className="mb-2 h-5 w-5 text-[#D8B86A]/40 md:h-6 md:w-6" />
                  <blockquote className="mb-3 text-sm font-medium leading-relaxed text-gray-900 md:text-base">
                    {story.quote}
                  </blockquote>
                  <p className="text-xs font-semibold text-gray-700 md:text-sm">
                    {story.name}
                    <span className="ml-1 font-normal text-gray-500">{story.role}</span>
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="signup" className="bg-white px-4 py-8 md:px-6 md:py-12 border-t border-gray-200">
        <div className="mx-auto max-w-[980px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-5 text-center md:mb-6"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
              Bring Your Birth Date. Leave With a Map.
            </h2>
            <p className="text-xs text-gray-600 md:text-sm">
              60 minutes, live. One read on the pattern you've been living — and a clear sense of where to
              go from here. No prior knowledge needed. No jargon.
            </p>
          </motion.div>

          <div className="grid items-start gap-5 md:gap-6 lg:grid-cols-[22fr_8fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeLeft}
              transition={{ duration: 0.45 }}
              className="order-2 lg:order-1 lg:pt-[132px]"
            >
              <MediaCard />
              <p className="mt-4 text-center text-sm font-semibold text-gray-900 md:text-base">
                Master RenZi (Dr Patrick Tan)
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeRight}
              transition={{ duration: 0.45 }}
              className="order-1 lg:order-2 lg:pt-16"
            >
              <RegistrationCard />
            </motion.div>
          </div>

          {/* Urgency line */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mt-6 text-center text-xs text-gray-600 md:text-sm"
          >
            Live on Tuesday, July 21 at 8:00 PM EST (New York). We keep the room small so the live
            Q&A stays personal — once it's full, it's full.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mt-8 text-center"
          >
            <p className="mb-4 text-xs font-medium text-gray-700 md:text-sm">The moment you register:</p>
            <div className="flex flex-col gap-3 md:flex-row md:justify-center">
              <div className="flex items-center gap-2 text-xs text-gray-600 md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#D8B86A]" />
                <span>Instant confirmation + calendar invite so you don't miss it</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#D8B86A]" />
                <span>Your private join link for the live session</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#D8B86A]" />
                <span>A short \"bring your birth date\" prep note so you're ready to read your own pattern live</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-8 md:px-6 md:py-12 border-t border-gray-200">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-6 text-center md:mb-8"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
              Quick Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need to know anything about numbers or numerology?",
                a: "Nothing at all. This is built for first-timers. You bring your birth date; we explain everything in plain English as we go.",
              },
              {
                q: "Is there a cost?",
                a: "There's no charge to attend the live session. If you find it valuable and want to go deeper, Master RenZi will share how at the end — no pressure, and no obligation to take it any further.",
              },
              {
                q: "What if I can't make it live?",
                a: "Register anyway and we'll send the replay. That said — the live Q&A is where Master RenZi reads real birth dates from the room, and that's the part people say changes everything. Come live if you possibly can.",
              },
              {
                q: "Is this religious or spiritual?",
                a: "No. NUMI draws on an ancient practice, but the session itself is a practical tool for self-reflection and decision-making — not a religion, not a faith, and nothing you have to believe in to use.",
              },
              {
                q: "Is this numerology?",
                a: "At its roots, yes — it's grounded in the centuries-old study of numbers and patterns. What's different is how it's taught: stripped of mysticism and translated into something you can actually apply to the year in front of you.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-5"
              >
                <h3 className="mb-2 text-sm font-bold text-gray-900 md:text-base">{faq.q}</h3>
                <p className="text-xs leading-relaxed text-gray-600 md:text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold text-gray-900 md:text-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#D8B86A] md:h-4 md:w-4" />
            NUMI is a tool for self-reflection and personal growth.
          </div>
          <p className="mb-1.5 text-[10px] leading-relaxed text-gray-400 md:text-xs">
            NUMI is intended for self-reflection and does not provide medical, financial, legal, or psychological advice. Use it as one input for your own decisions, not a substitute for professional guidance.
          </p>
          <p className="text-[10px] text-gray-300 md:text-xs">© 2026 NUMI International (M) SDN BHD All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
