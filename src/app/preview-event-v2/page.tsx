"use client";

import { ArrowRight, CheckCircle2, Clock, Mail, Quote, Users, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { subscribeToAC } from "@/lib/subscribe";

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
    title: "Why does this keep happening to me?",
    body: "That same argument with your partner. That same pattern at work. That same financial stress hitting at the worst time.",
  },
  {
    number: "02",
    title: "Running on a treadmill, going nowhere",
    body: "You're working hard, making changes, trying to be 'better' — but somehow ending up in the same place year after year.",
  },
  {
    number: "03",
    title: "Everyone else seems to have it figured out",
    body: "Scrolling through social media, watching people thrive while you're still asking 'what am I actually meant to be doing?'",
  },
];

const whatYoullLearn = [
  {
    number: "01",
    title: "Your hidden operating system",
    body: "Discover the invisible pattern running in the background of your life — influencing who you attract, how you make decisions, and why certain years feel harder than others.",
  },
  {
    number: "02",
    title: "Why 'trying harder' doesn't work",
    body: "Learn why effort alone often fails when you're working against your natural design — and what actually creates lasting change.",
  },
  {
    number: "03",
    title: "A simple way to decode your life patterns",
    body: "We'll walk you through a framework that reveals your timing, strengths, blind spots, and the cycles you're currently in — no complex theory, just practical clarity.",
  },
  {
    number: "04",
    title: "Your next 12 months mapped out",
    body: "Walk away with a clear picture of what's coming, where to focus your energy, and which decisions to make (or avoid) in the year ahead.",
  },
];

const testimonials = [
  {
    name: "Aisha K.",
    role: "32, Marketing Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=640&h=800&fit=crop",
    quote:
      "I was skeptical at first — another 'find your purpose' thing. But this actually showed me WHY I keep dating the same type of person and making the same career mistakes. Finally, it made sense.",
  },
  {
    name: "Marcus T.",
    role: "41, Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=800&fit=crop",
    quote:
      "I've been in business 15 years and kept hitting the same income ceiling. The masterclass revealed I was expanding in the wrong years. Changed everything.",
  },
  {
    name: "Priya S.",
    role: "28, Recently laid off",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=640&h=800&fit=crop",
    quote:
      "I was spiraling after losing my job. This gave me a roadmap — showed me this transition was part of my cycle, not a failure. I'm actually excited now.",
  },
];

const stats = [
  { label: "Attendees", value: "12,000+" },
  { label: "Countries reached", value: "25+" },
  { label: "Years of experience", value: "20+" },
];

function RegistrationCard() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
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
      }));

      await subscribeToAC({
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        listType: "webinar",
        source: "preview-event-v2",
      });

      setTimeout(() => {
        window.location.href = "/preview-event-v2/thank-you";
      }, 500);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-xl">
      {/* Header Bar */}
      <div className="flex items-center gap-3 rounded-t-xl border-2 border-[#D8B86A] bg-gradient-to-r from-[#0A0E27] to-[#1a1f3a] px-6 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D8B86A]/20">
          <Mail className="h-5 w-5 text-[#D8B86A]" />
        </div>
        <span className="text-base font-bold text-white md:text-lg">
          Claim your FREE spot now
        </span>
      </div>

      {/* Form Card */}
      <div className="rounded-b-xl border-2 border-t-0 border-gray-200 bg-white p-5 md:p-6">
        <p className="mb-5 text-center text-sm text-gray-600 md:text-base">
          Submit your details to secure your spot in the free masterclass
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition md:text-base ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 bg-red-50/30"
                    : "border-gray-200 bg-gray-50 focus:border-[#D8B86A] focus:bg-white"
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition md:text-base ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 bg-red-50/30"
                    : "border-gray-200 bg-gray-50 focus:border-[#D8B86A] focus:bg-white"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                placeholder="Phone number (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D8B86A] focus:bg-white md:text-base"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] bg-[length:200%_100%] px-6 py-3.5 text-sm font-bold text-[#0A0E27] transition-all hover:bg-right disabled:opacity-50 disabled:hover:bg-left md:py-4 md:text-base"
          >
            {isSubmitting ? "Securing your spot..." : "Reserve Your Spot Now"}
          </button>

          {/* Disclaimer */}
          <p className="text-center text-[10px] leading-relaxed text-gray-400 md:text-xs">
            By registering for the above, you confirm that you agree to the{' '}
            <a href="/terms" className="underline hover:text-gray-500">Terms of Use</a>
            {' '}& the{' '}
            <a href="/privacy" className="underline hover:text-gray-500">Privacy Policy</a>
            {' '}as well as receiving notification for future events. You can withdraw your consent at any time by unsubscribing.
          </p>
        </form>
      </div>
    </div>
  );
}

function MediaCard() {
  return (
    <div className="relative rounded-xl overflow-hidden">
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

export default function PreviewEventV2Page() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Floating close button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <nav className="hidden md:flex fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[980px] flex-row items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center">
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
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pb-8 pt-6 md:px-6 md:pb-12 md:pt-28 bg-white">
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
            Decode Your Life Pattern and Finally Break Free From the Cycles That Keep Holding You Back
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mb-5 max-w-[720px] text-center text-sm leading-relaxed text-gray-600 md:mb-6 md:text-base"
          >
            Join this free masterclass to discover your personal Pattern Code — a simple framework
            that reveals why you keep experiencing the same challenges and how to navigate life with
            clarity and purpose — even if you're completely new to this.
          </motion.p>

          <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[16fr_9fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-2 lg:order-1 hidden md:block"
            >
              <MediaCard />
              <p className="mt-4 text-center text-sm font-semibold text-gray-900 md:text-base">
                Master RenZi (Dr Patrick Tan)
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeRight}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-1 lg:sticky lg:top-24 lg:order-2"
            >
              <RegistrationCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 px-4 py-8 md:px-6 md:py-10 border-t border-gray-200">
        <div className="mx-auto max-w-[720px]">

          <div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-8">
            {stats.map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="mb-1 text-2xl font-bold text-[#D8B86A] md:text-3xl">{item.value}</div>
                <div className="text-[10px] uppercase tracking-wide text-gray-600 md:text-xs">
                  {item.label}
                </div>
              </div>
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
              If Any Of This Sounds Familiar...
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
              <span className="text-[#D8B86A]">Here's the thing:</span> These aren't random coincidences.
              They're patterns. And patterns have codes. Codes that can be decoded.
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
              In 60 Minutes, You'll Walk Away With:
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              No fluff. No complex theory. Just practical clarity you can use immediately.
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
              <span className="font-semibold text-gray-900">Even if you're completely new to this.</span>
              Even if you're skeptical. Even if you've tried everything else and nothing stuck.
              This works because it's not about changing who you are — it's about understanding how
              you're designed.
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
              20+ years decoding patterns. 0% jargon.
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
                  Pattern Code specialist & educator
                </p>
              </div>

              <div className="space-y-1.5 text-xs leading-relaxed text-gray-600 md:space-y-2 md:text-sm">
                <p>
                  He's spent 20+ years studying how numbers, personal patterns, and life timing actually
                  work together — and translating it into plain English.
                </p>
                <p>
                  No spiritual gatekeeping. No confusing jargon. Just a practical framework that helps
                  regular people understand why their lives look the way they do — and how to navigate
                  what's coming next.
                </p>
                <p>
                  His goal? Make pattern intelligence so simple and useful that anyone can use it to make
                  better decisions.
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
              Real People. Real Clarity.
            </h2>
            <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
              These aren't scripted testimonials. Just people who finally understood their patterns.
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
              Ready To Decode Your Pattern?
            </h2>
            <p className="text-xs text-gray-600 md:text-sm">
              60 minutes. No cost. Zero jargon. Just clarity about why your life looks the way it does.
            </p>
          </motion.div>

          <div className="grid items-start gap-5 md:gap-6 lg:grid-cols-[16fr_9fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeLeft}
              transition={{ duration: 0.45 }}
              className="order-2 lg:order-1"
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
              className="order-1 lg:order-2"
            >
              <RegistrationCard />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mt-8 text-center"
          >
            <p className="mb-4 text-xs font-medium text-gray-700 md:text-sm">What happens next:</p>
            <div className="flex flex-col gap-3 md:flex-row md:justify-center">
              <div className="flex items-center gap-2 text-xs text-gray-600 md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#D8B86A]" />
                <span>Instant confirmation email</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#D8B86A]" />
                <span>Masterclass access details</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#D8B86A]" />
                <span>Free Pattern Code preview</span>
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
                q: "Do I need to know anything about patterns?",
                a: "Not at all. This masterclass is designed for complete beginners. We explain everything in plain English — no prior knowledge needed.",
              },
              {
                q: "Is this actually free?",
                a: "Yes. The masterclass is completely free, with no hidden costs or obligations. Our goal is to give you clarity about your patterns, not sell you something.",
              },
              {
                q: "What if I can't attend live?",
                a: "We'll send you the recording after the session. But we highly recommend joining live — there's a Q&A where Master RenZi (Dr Patrick Tan) answers questions.",
              },
              {
                q: "Is this religious or spiritual?",
                a: "NUMI is a self-reflection tool, not a religion or spiritual practice. It's about understanding your personal patterns and making better decisions.",
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
            NUMI is designed for self-reflection and personal growth.
          </div>
          <p className="mb-1.5 text-[10px] leading-relaxed text-gray-400 md:text-xs">
            NUMI does not provide medical, financial, legal, psychological, or professional advice.
          </p>
          <p className="text-[10px] text-gray-300 md:text-xs">© 2026 NUMI International (M) SDN BHD All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
