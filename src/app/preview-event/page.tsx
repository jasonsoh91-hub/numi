"use client";

import { Award, CalendarDays, CheckCircle2, Clock, Mail, Quote, Users } from "lucide-react";
import { motion } from "framer-motion";

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

const learnItems = [
  {
    title: "Why the same patterns keep showing up in your life",
    body:
      "Discover the deeper structure behind recurring relationship cycles, career blocks, emotional loops, and repeated decision patterns.",
  },
  {
    title: "What your personal Pattern Code reveals about your natural design",
    body:
      "Learn how NUMI translates number-based pattern intelligence into practical self-understanding without complicated theory.",
  },
  {
    title: "The 3 mistakes people make when trying to change their life",
    body:
      "Understand why effort alone often fails when you are working against your natural rhythm, strengths, and blind spots.",
  },
  {
    title: "Your next steps for clearer decisions, relationships, and direction",
    body:
      "Walk away with a simple framework you can immediately apply to your choices, communication style, and life direction.",
  },
];

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Attendees",
  },
  {
    icon: Clock,
    value: "60",
    label: "Min Training",
  },
  {
    icon: Award,
    value: "500+",
    label: "Success Stories",
  },
];

const stories = [
  {
    name: "Sarah M.",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=640&h=800&fit=crop",
    quote:
      "The NUMI Pattern Code helped me understand why I kept repeating the same relationship and career patterns.",
  },
  {
    name: "James L.",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=800&fit=crop",
    quote:
      "The masterclass gave me a practical way to see my strengths, timing, and decision patterns more clearly.",
  },
  {
    name: "Emily R.",
    role: "Life Coach",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=640&h=800&fit=crop",
    quote:
      "I came in curious and left with a much clearer picture of how my life patterns were shaping my choices.",
  },
];

function RegistrationCard({ idPrefix = "top" }: { idPrefix?: string }) {
  return (
    <div className="shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
      <div className="flex items-center gap-3 rounded-t-xl border-2 border-[#D8B86A] bg-[#D8B86A] px-6 py-4">
        <Mail className="h-5 w-5 text-white md:h-6 md:w-6" />
        <span className="text-base font-bold text-white md:text-lg">Claim your FREE spot now</span>
      </div>

      <div className="rounded-b-xl border-2 border-t-0 border-gray-200 bg-white p-4 md:p-5">
        <p className="mb-4 mt-2 text-center text-xs leading-relaxed text-gray-600 md:text-sm">
          Submit your details to secure your spot in the free masterclass
        </p>

        <form className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              id={`${idPrefix}-name`}
              name="name"
              type="text"
              placeholder="Name *"
              className="w-full rounded border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/40 md:px-4"
            />
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              placeholder="Email *"
              className="w-full rounded border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/40 md:px-4"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              id={`${idPrefix}-date`}
              name="date"
              defaultValue=""
              className="w-full cursor-pointer appearance-none rounded border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/40 md:px-4"
            >
              <option value="" disabled>
                Select date
              </option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
            </select>

            <select
              id={`${idPrefix}-time`}
              name="time"
              defaultValue=""
              className="w-full cursor-pointer appearance-none rounded border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#D8B86A] focus:ring-2 focus:ring-[#D8B86A]/40 md:px-4"
            >
              <option value="" disabled>
                Select time
              </option>
              <option value="morning">Morning (10:00 AM)</option>
              <option value="afternoon">Afternoon (2:00 PM)</option>
              <option value="evening">Evening (7:00 PM)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-[#D8B86A] py-3 text-sm font-bold text-[#0A0E27] transition hover:bg-[#F4D47A] md:text-base"
          >
            Reserve Your Spot Now
          </button>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-gray-400">
            By registering for the above, you confirm that you agree to the Terms of Use and the
            Privacy Policy as well as receiving notification for future events. You can withdraw your
            consent at any time by unsubscribing.
          </p>
        </form>
      </div>
    </div>
  );
}

function MediaCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-lg">
      <div className="aspect-video">
        <img src="/event-banner.png" alt="NUMI Masterclass" className="h-full w-full object-cover" />
      </div>

      <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-[#D8B86A]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Free Masterclass
            </p>
            <p className="text-sm font-semibold text-gray-900">Discover Your Pattern Code</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewEventPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] md:h-10 md:w-10">
              <span className="text-lg font-bold text-[#0A0E27] md:text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">Numi®</span>
          </a>

          <a
            href="#signup"
            className="rounded-lg bg-[#D8B86A] px-4 py-2 text-sm font-semibold text-[#0A0E27] transition hover:bg-[#F4D47A] md:px-6 md:py-2.5"
          >
            Support
          </a>
        </div>
      </nav>

      <section className="relative px-4 pb-6 pt-24 md:px-6 md:pb-10 md:pt-28">
        <div className="mx-auto max-w-[980px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-5 text-center md:mb-6"
          >
            <span className="inline-flex rounded-full border border-[#D8B86A]/25 bg-[#D8B86A]/10 px-3 py-1.5 text-xs font-semibold text-gray-900 md:px-4 md:py-2 md:text-sm">
              Free Live Masterclass • No Experience Required
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mx-auto mb-3 max-w-[720px] text-center text-2xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl"
          >
            You Keep Repeating The Same Patterns.
            <span className="mt-1 block text-gray-500 md:mt-2">Here’s Why — And How To Break Free.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mb-5 max-w-[720px] text-center text-sm leading-relaxed text-gray-700 md:mb-6 md:text-base"
          >
            Join this free masterclass to discover how your personal Pattern Code can help you
            understand your relationships, career direction, emotional cycles, and recurring life
            decisions.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mb-6 flex items-center justify-center gap-2.5 md:mb-8"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#D8B86A]/30 bg-gray-200 md:h-10 md:w-10">
              <img src="/speaker-profile.png" alt="Master RenZi" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 md:text-xs">With</p>
              <p className="text-sm font-semibold text-gray-900">Master RenZi</p>
            </div>
          </motion.div>

          <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[1.75fr_0.75fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="order-2 lg:order-1"
            >
              <MediaCard />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeRight}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="order-1 lg:sticky lg:top-24 lg:order-2"
            >
              <RegistrationCard idPrefix="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto max-w-[720px]">
          <div className="flex items-stretch divide-x divide-gray-300 rounded-lg border border-gray-200 bg-white shadow-sm">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex-1 px-3 py-3 text-center md:px-5 md:py-4">
                  <Icon className="mx-auto mb-1 h-4 w-4 text-[#D8B86A] md:h-5 md:w-5" />
                  <div className="mb-0.5 text-lg font-bold text-gray-900 md:text-xl">{item.value}</div>
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 md:text-xs">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-6 md:mb-8"
          >
            <h2 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl">
              What You’ll Gain from This Free Masterclass — Even If You’re Starting from Scratch
            </h2>
          </motion.div>

          <div className="space-y-5 md:space-y-6">
            {learnItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="flex gap-3 md:gap-4"
              >
                <div className="shrink-0">
                  <span className="text-base font-semibold text-gray-900 md:text-lg">
                    {index + 1}.
                  </span>
                </div>

                <div className="pt-0.5">
                  <h3 className="mb-1 text-sm font-semibold leading-snug text-gray-900 md:text-base">
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
            className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 md:mt-8 md:p-5"
          >
            <p className="text-center text-xs leading-relaxed text-gray-700 md:text-sm">
              Wherever you&apos;re at now, and whatever doubts you&apos;ve had in the past, you&apos;ll leave this
              masterclass with a practical starting point for understanding your personal patterns
              with more clarity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-8 md:px-6 md:py-12">
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
              Meet your trainer: Master RenZi
            </h2>
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
                  Master RenZi <span className="font-medium text-gray-500">(Dato&apos; Sri Dr. Patrick Tan)</span>
                </h3>
                <p className="text-xs font-medium text-[#D8B86A] md:text-sm">
                  Entrepreneur, educator, and number-based human pattern specialist
                </p>
              </div>

              <div className="space-y-1.5 text-xs leading-relaxed text-gray-600 md:space-y-2 md:text-sm">
                <p>
                  <span className="font-semibold text-gray-900">Master RenZi</span> has spent more
                  than two decades studying the relationship between numbers, human potential,
                  behaviour patterns, and personal decision-making.
                </p>
                <p>
                  Through NUMI, his work is presented in a modern, accessible format for people who
                  want clearer self-understanding without feeling overwhelmed by theory.
                </p>
                <p>
                  In this masterclass, he introduces the Pattern Code framework and shows how it can
                  be used as a practical reflection tool for relationships, career direction, and
                  life choices.
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
                  alt="Master RenZi"
                  className="h-full w-full object-cover object-[75%_center]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
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
              The kind of clarity people experience through NUMI
            </h2>
            <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
              Real transformation starts when repeated patterns stop feeling random and begin to make sense.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-5">
            {stories.map((story, index) => (
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
                    <span className="ml-1 font-normal text-gray-500">• {story.role}</span>
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-5 text-center md:mb-6"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
              Ready To Get Started?
            </h2>
            <p className="text-xs text-gray-600 md:text-sm">
              Submit your details below to secure your spot in this NUMI Masterclass.
            </p>
          </motion.div>

          <div className="grid items-start gap-5 md:gap-6 lg:grid-cols-[1.75fr_0.75fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeLeft}
              transition={{ duration: 0.45 }}
              className="order-2 lg:order-1"
            >
              <MediaCard />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeRight}
              transition={{ duration: 0.45 }}
              className="order-1 lg:order-2"
            >
              <RegistrationCard idPrefix="final" />
            </motion.div>
          </div>
        </div>
      </section>

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
