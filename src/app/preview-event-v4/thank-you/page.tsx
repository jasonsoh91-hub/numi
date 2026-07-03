"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Mail,
  Calendar,
  Clock,
  AlertCircle,
  HelpCircle,
  CalendarX,
  ArrowRight,
  Flame,
  Lock,
  Eye,
  Sparkles,
  Users,
  TrendingUp,
} from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/testimonial";

const numiTestimonials = [
  {
    quote:
      "I'd just left a job I thought was the problem — turns out I'd recreated the same dynamic three times. Seeing the actual pattern in my birth date was the first time any of it made sense.",
    name: "Aisha K.",
    designation: "32, Marketing Manager",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=640&h=800&fit=crop",
  },
  {
    quote:
      "I came in skeptical — I'd done the 'find your purpose' thing before. This was different. It showed me the timing I'd been fighting, and suddenly the last five years made sense.",
    name: "Marcus T.",
    designation: "41, Business Owner",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=800&fit=crop",
  },
  {
    quote:
      "I was spiraling after a big life change and reading it as failure. The session reframed it as a phase in my cycle — a reset, not a dead end. I walked away with an actual plan.",
    name: "Priya S.",
    designation: "28, Recently laid off",
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=640&h=800&fit=crop",
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function ThankYouV4Page() {
  const [mounted, setMounted] = useState(false);
  const [registrationData, setRegistrationData] = useState<{
    firstName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("numiEventRegistration");
    if (data) {
      setRegistrationData(JSON.parse(data));
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // Event details (placeholder — wire to real schedule when finalized)
  const eventDate = "Wednesday, July 15, 2026";
  const eventTime = "8:00 PM MYT (GMT+8)";
  const eventDuration = "60 minutes";

  const calendarHref =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=NUMI+Masterclass+-+Decode+Your+Life+Pattern" +
    "&details=A+free+60-minute+live+NUMI+masterclass.+Bring+your+birth+date.+Your+host+will+be+revealed+live." +
    "&dates=20260715T120000Z/20260715T130000Z";

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Nav */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="/" className="flex items-center">
            <img
              src="/numi-logo.png"
              alt="NUMI"
              className="h-8 w-auto md:h-10"
            />
          </a>
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="mailto:hello@numi.com"
              className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 md:inline"
            >
              Support
            </a>
            <a
              href="/"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 md:px-6 md:py-2.5"
            >
              Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 pb-12 pt-28 md:px-6 md:pb-16 md:pt-32">
        <motion.div
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 inline-flex">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] md:h-20 md:w-20">
                <CheckCircle2
                  className="h-8 w-8 text-[#0A0E27] md:h-10 md:w-10"
                  strokeWidth={2.5}
                />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full bg-[#D8B86A]/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8B86A]/30 bg-[#D8B86A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0A0E27]"
          >
            <Flame className="h-3.5 w-3.5 text-[#D8B86A]" />
            <span>Seat confirmed · Live one time only</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            You&rsquo;re in
            {registrationData?.firstName ? `, ${registrationData.firstName}` : ""}.
            Half of 2026 is left —{" "}
            <span className="text-[#D8B86A]">
              this is the room where you map it.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 md:mt-6 md:text-lg"
          >
            Your join link is on its way to{" "}
            <span className="font-semibold text-gray-900">
              {registrationData?.email || "your email"}
            </span>
            . Here&rsquo;s the part most people miss:{" "}
            <span className="font-semibold text-gray-900">
              70% of people who register don&rsquo;t show up
            </span>
            . The ones who do are the ones whose next 12 months actually change.
          </motion.p>
        </motion.div>
      </section>

      {/* Email Confirmation Note */}
      <section className="px-4 pb-12 md:px-6 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D8B86A]/15">
                <Mail className="h-5 w-5 text-[#D8B86A]" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 md:text-lg">
                  Check your inbox for the confirmation
                </h3>
                <p className="mt-2 text-sm text-gray-600 md:text-base">
                  Look for the email titled{" "}
                  <span className="font-semibold text-gray-900">
                    &ldquo;You&rsquo;re confirmed for the NUMI Masterclass&rdquo;
                  </span>
                  .
                </p>
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-xs text-amber-900 md:text-sm">
                    <span className="font-semibold">Gmail users:</span> our email may
                    land in your <span className="font-semibold">Promotions</span> tab.
                    Drag it into Primary so you don&rsquo;t miss your join link.{" "}
                    <a
                      href="mailto:hello@numi.com"
                      className="font-semibold text-[#D8B86A] underline-offset-2 hover:underline"
                    >
                      Need help?
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Show Up Live */}
      <section className="px-4 pb-12 md:px-6 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
              <Flame className="h-3.5 w-3.5" />
              The replay won&rsquo;t do this for you
            </span>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
              Four reasons you need to be there{" "}
              <span className="text-[#D8B86A]">live</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
              You can read about your pattern any day. The room only opens once —
              and these things only happen inside it.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
            {[
              {
                icon: Eye,
                tag: "Live only",
                title: "Your actual birth-date pattern, read in front of you",
                body: "We don't talk about patterns in theory. We read real birth dates from the room — and one of them could be yours. This part doesn't make it into any replay.",
              },
              {
                icon: TrendingUp,
                tag: "The next 12 months",
                title: "The rest of 2026 mapped to your cycle",
                body: "Half the year is already gone. Walk out with a clear read on which months to push, which months to hold, and the exact window where the door you've been waiting for opens.",
              },
              {
                icon: Users,
                tag: "Limited Q&A",
                title: "A small live room — not a 10,000-person webinar",
                body: "Seats are kept tight on purpose so birth dates can actually get read. First hands raised get a personal pattern read. Miss it and you wait for the next cohort.",
              },
              {
                icon: Lock,
                tag: "One-time window",
                title: "The only door into deeper NUMI work this round",
                body: "After the live session closes, the next opening isn't scheduled. If you've been circling NUMI from the outside, this is the room where the next step is offered.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-[#D8B86A]/40 hover:shadow-lg md:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D8B86A]/10">
                    <item.icon className="h-5 w-5 text-[#D8B86A]" />
                  </div>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-snug text-gray-900 md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 md:text-base">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Cost-of-missing bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex items-start gap-3 rounded-2xl border border-[#D8B86A]/30 bg-[#D8B86A]/5 p-5 md:items-center md:p-6"
          >
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#D8B86A] md:mt-0" />
            <p className="text-sm text-gray-800 md:text-base">
              <span className="font-bold">The honest version:</span> if you skip
              the live session, the next six months will likely look like the last
              six. Same loops. Same ceiling. Same{" "}
              <span className="italic">&ldquo;maybe next year.&rdquo;</span> Block
              the time now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar / Booking Section */}
      <section className="px-4 pb-12 md:px-6 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-[#0A0E27] to-[#1A1F3F] text-white shadow-xl"
          >
            <div className="grid items-stretch md:grid-cols-2">
              {/* Left: Details */}
              <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D8B86A]/30 bg-[#D8B86A]/10 px-3 py-1">
                  <Calendar className="h-3.5 w-3.5 text-[#D8B86A]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D8B86A]">
                    Save your seat to the calendar
                  </span>
                </div>

                <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                  Decode Your Life Pattern — Live NUMI Masterclass
                </h2>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#D8B86A]" />
                    <span className="text-sm text-gray-200 md:text-base">
                      {eventDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#D8B86A]" />
                    <span className="text-sm text-gray-200 md:text-base">
                      {eventTime} · {eventDuration}
                    </span>
                  </div>
                </div>

                <a
                  href={calendarHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[#D8B86A] to-[#F4D47A] px-6 py-3 text-sm font-bold text-[#0A0E27] shadow-lg transition hover:brightness-110 md:text-base"
                >
                  <Calendar className="h-4 w-4" />
                  Add to Google Calendar
                  <ArrowRight className="h-4 w-4" />
                </a>

                <p className="mt-5 text-xs text-gray-400 md:text-sm">
                  Block <span className="font-semibold text-white">at least 60 minutes</span>{" "}
                  of uninterrupted time. Bring your birth date and an open mind.
                </p>

                <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#D8B86A]/20 bg-[#D8B86A]/5 px-3 py-2">
                  <Flame className="h-4 w-4 shrink-0 text-[#D8B86A]" />
                  <p className="text-xs text-gray-200 md:text-sm">
                    <span className="font-semibold text-white">Live one time only.</span>{" "}
                    Room is kept small so birth dates can actually be read. No
                    second session this cycle.
                  </p>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative hidden min-h-[320px] bg-[#0A0E27] md:block">
                <img
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=900&h=900&fit=crop"
                  alt="Planner and calendar"
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A0E27]/30 to-[#0A0E27]/80" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support / Next Steps */}
      <section className="px-4 pb-12 md:px-6 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Need a hand before the masterclass?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 md:text-base">
              We&rsquo;ve got you. Pick whichever fits — our team replies within one
              business day.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                icon: Mail,
                title: "Didn't get the email?",
                body: "Check spam, then ping us — we'll resend your confirmation and join link right away.",
                cta: "Resend my email",
                href: "mailto:hello@numi.com?subject=Resend%20my%20NUMI%20Masterclass%20confirmation",
              },
              {
                icon: CalendarX,
                title: "Need to reschedule?",
                body: "Life happens. Tell us what works and we'll swap you to the next available session.",
                cta: "Reschedule my seat",
                href: "mailto:hello@numi.com?subject=Reschedule%20my%20NUMI%20Masterclass%20seat",
              },
              {
                icon: HelpCircle,
                title: "Got a question?",
                body: "Anything about your birth date, the format, or how the live read works — just ask.",
                cta: "Talk to support",
                href: "mailto:hello@numi.com?subject=Question%20about%20the%20NUMI%20Masterclass",
              },
            ].map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#D8B86A]/40 hover:shadow-lg md:p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#D8B86A]/10">
                  <card.icon className="h-5 w-5 text-[#D8B86A]" />
                </div>
                <h3 className="text-base font-bold text-gray-900 md:text-lg">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-gray-600">{card.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D8B86A] group-hover:gap-2 transition-all">
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Connection */}
      <section className="bg-gray-50 px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              While you wait — come hang out with us
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 md:text-base">
              Daily pattern readings, real stories from inside the community, and
              quiet reminders for the cycle you&rsquo;re in.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
            {[
              {
                handle: "@numi.intl",
                tag: "Daily pattern insights",
                body: "Short, decoded readings of the year, month, and day — built for the people quietly reshaping their life.",
                href: "https://instagram.com/numi.intl",
              },
              {
                handle: "@numi.community",
                tag: "Behind the scenes",
                body: "Stories from people who decoded their pattern, plus quiet reminders for the cycle you're in right now.",
                href: "https://instagram.com/numi.intl",
              },
            ].map((card, i) => (
              <motion.a
                key={card.handle}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#D8B86A]/40 hover:shadow-lg md:p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D8B86A] to-[#F4D47A]">
                  <InstagramIcon className="h-5 w-5 text-[#0A0E27]" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900 md:text-lg">
                      {card.handle}
                    </span>
                    <span className="rounded-full bg-[#D8B86A]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D8B86A]">
                      {card.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{card.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D8B86A] group-hover:gap-2 transition-all">
                    Follow on Instagram
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center rounded-full bg-[#D8B86A]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#D8B86A]">
              Real stories from the room
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
              What past attendees walked away with
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 md:text-base">
              One read. One realization. A different next year.
            </p>
          </motion.div>

          <AnimatedTestimonials testimonials={numiTestimonials} />
        </div>
      </section>

      {/* Closing — final pre-footer beat */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0E27] to-[#1A1F3F] px-4 py-20 md:px-6 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D8B86A] blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D8B86A]/40 bg-[#D8B86A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#D8B86A]">
            <Sparkles className="h-3.5 w-3.5" />
            One last thing
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Our next pattern read could be yours,{" "}
            <span className="text-[#D8B86A]">
              {registrationData?.firstName || "friend"}
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-gray-300 md:text-lg">
            The rooms that change people aren&rsquo;t the ones they almost
            attended. Mark the calendar. Block the hour. Bring the birth date.
          </p>
          <div className="mt-8 inline-flex flex-col items-center gap-2">
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D8B86A] to-[#F4D47A] px-6 py-3 text-sm font-bold text-[#0A0E27] shadow-lg transition hover:brightness-110 md:text-base"
            >
              <Calendar className="h-4 w-4" />
              Lock in my seat on the calendar
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-gray-400 md:text-sm">
              See you live on {eventDate}.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-[980px] flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <p className="text-xs text-gray-400">
            © 2026 NUMI International (M) SDN BHD All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="mailto:hello@numi.com" className="hover:text-gray-900">
              hello@numi.com
            </a>
            <span className="text-gray-300">·</span>
            <a href="/" className="hover:text-gray-900">
              numi-intl.ai
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
