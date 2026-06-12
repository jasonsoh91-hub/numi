"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Calendar, Clock, Users, Play, Mail, Film, Award, X, ChevronDown, Sparkles } from "lucide-react";
import { TestimonialSection } from "@/components/ui/testimonials";

export default function PreviewEventPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ firstName: "", email: "", date: "", time: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const heroRef = useRef(null);
  const gainRef = useRef(null);
  const speakerRef = useRef(null);
  const finalCtaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const gainInView = useInView(gainRef, { once: true, amount: 0.2 });
  const speakerInView = useInView(speakerRef, { once: true, amount: 0.2 });
  const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.3 });

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    if (!formData.firstName?.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email?.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }
    // Date and time are optional per Mindvalley's pattern

    setIsSubmitting(true);
    setError("");

    const eventData = {
      firstName: formData.firstName,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      timestamp: new Date().toISOString(),
      source: "preview-event"
    };

    localStorage.setItem("numiEventRegistration", JSON.stringify(eventData));
    const existing = JSON.parse(localStorage.getItem("numiEventRegistrations") || "[]");
    existing.push(eventData);
    localStorage.setItem("numiEventRegistrations", JSON.stringify(existing));

    setTimeout(() => router.push("/preview-event/thank-you"), 1200);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const gains = [
    {
      title: "Why the same patterns keep showing up in your life — and what your birthdate reveals about it",
      desc: "Finally understand the hidden code behind your recurring relationship, career, and emotional cycles"
    },
    {
      title: "The 3 mistakes most people make when trying to change their life — and how to avoid them",
      desc: "Stop working against your natural pattern and learn to flow with your authentic design"
    },
    {
      title: "How to read your Pattern Code in under 60 minutes — even if you're a complete beginner",
      desc: "Master RenZi's proven framework that has helped 5,000+ people unlock clarity about their life path"
    },
    {
      title: "Your personalized next steps — based on YOUR unique number",
      desc: "Walk away with actionable insights you can apply immediately to your relationships, career, and decisions"
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The NUMI Pattern Code completely changed how I understand myself. I finally know why I kept repeating the same patterns in my relationships and career.",
      name: "Sarah M.",
      role: "Marketing Director",
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    },
    {
      id: 2,
      quote: "Master RenZi's masterclass opened my eyes to a whole new way of seeing my life path. The insights were practical and immediately applicable.",
      name: "James L.",
      role: "Entrepreneur",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    },
    {
      id: 3,
      quote: "I was skeptical at first, but the NUMI system revealed patterns I'd never noticed before. It's like having a roadmap for your life.",
      name: "Emily R.",
      role: "Life Coach",
      imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    },
    {
      id: 4,
      quote: "After years of searching for answers, the NUMI masterclass gave me clarity I never thought possible. My life purpose finally makes sense.",
      name: "Michelle K.",
      role: "HR Director",
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    },
    {
      id: 5,
      quote: "The pattern awareness I gained from Master RenZi transformed my relationships. I understand others in a completely new way now.",
      name: "David C.",
      role: "Software Engineer",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    },
    {
      id: 6,
      quote: "I've tried many self-discovery tools, but NUMI is different. It's precise, practical, and genuinely life-changing.",
      name: "Amanda W.",
      role: "Business Consultant",
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    },
    {
      id: 7,
      quote: "The masterclass helped me understand my career patterns and why I felt stuck. Now I'm making decisions with confidence.",
      name: "Robert H.",
      role: "Financial Analyst",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    },
    {
      id: 8,
      quote: "Master RenZi's teaching style is incredible. Complex concepts became so clear. I use NUMI insights every single day.",
      name: "Jennifer L.",
      role: "Yoga Instructor",
      imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    },
    {
      id: 9,
      quote: "Understanding my NUMI pattern helped me embrace my strengths. I'm finally living authentically and purposefully.",
      name: "Thomas M.",
      role: "Creative Director",
      imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    },
  ];

  // Speaker image
  const trainerImage = "/speaker-profile.png";
  const teachingImage = "https://datopatricktan.com/wp-content/uploads/2019/02/header01-1.jpg";

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR - Mindvalley style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#D8B86A] to-[#F4D47A] flex items-center justify-center">
              <span className="text-[#0A0E27] font-bold text-lg md:text-xl">N</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-900">NUMI</span>
          </a>
          <button className="px-4 py-2 md:px-6 md:py-2.5 bg-[#D8B86A] hover:bg-[#F4D47A] text-[#0A0E27] text-sm font-semibold rounded-lg transition-colors">
            Support
          </button>
        </div>
      </nav>

      {/* HERO - Mindvalley Format */}
      <section ref={heroRef} className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Badge - Mindvalley style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-6 md:mb-8"
          >
            <h3 className="text-gray-900 text-sm md:text-base font-medium">Free Live Masterclass • No Experience Required</h3>
          </motion.div>

          {/* Headline - Pain First */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4 md:mb-6 text-center"
          >
            You Keep Repeating The Same Patterns.
            <span className="block mt-2 md:mt-3 text-gray-500">
              Here&apos;s Why — And How To Break Free.
            </span>
          </motion.h1>

          {/* Subtitle - StoryBrand style */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            If you feel stuck in recurring relationship cycles, career patterns, or emotional loops — <span className="font-semibold text-gray-900">your birthdate holds the hidden code</span> that explains why. Join this free masterclass to discover your Pattern Code and finally understand yourself.
          </motion.h2>

          {/* Trainer Info - Mindvalley style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8 md:mb-12"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#D8B86A]/30 bg-gray-200">
              <img
                src={trainerImage}
                alt="Master RenZi (Dato' Sri Dr. Patrick Tan)"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm">With</p>
              <p className="text-gray-900 font-semibold text-sm md:text-base">Master RenZi</p>
            </div>
          </motion.div>

          {/* Two Column Layout - Banner + Form */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left - Banner Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src="/masterclass-banner.png"
                  alt="NUMI Masterclass - Discover Your Pattern Code"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Stats Bar - Mindvalley style below image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200"
              >
                <div className="text-center">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#D8B86A] mx-auto mb-1.5 md:mb-2" />
                  <div className="text-xl md:text-2xl font-bold text-gray-900">5,000+</div>
                  <div className="text-gray-500 text-xs md:text-sm">Attendees</div>
                </div>
                <div className="text-center">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#D8B86A] mx-auto mb-1.5 md:mb-2" />
                  <div className="text-xl md:text-2xl font-bold text-gray-900">60</div>
                  <div className="text-gray-500 text-xs md:text-sm">Min Training</div>
                </div>
                <div className="text-center">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-[#D8B86A] mx-auto mb-1.5 md:mb-2" />
                  <div className="text-xl md:text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-500 text-xs md:text-sm">Success Stories</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Registration Form - Mindvalley style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="order-1 lg:order-2 lg:sticky lg:top-24"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-lg">
                {/* Form Icon - Mindvalley style */}
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/20 mb-4 md:mb-6">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-[#D8B86A]" />
                </div>

                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2 text-center">
                  Join The Free Live Masterclass
                </h2>
                <p className="text-gray-500 text-xs md:text-sm text-center mb-4 md:mb-6">
                  Choose your preferred date and time. Spots are limited.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5 md:space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                      Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all text-sm md:text-base"
                    />
                  </div>

                  {/* Date Selector - Mindvalley style */}
                  <div>
                    <label htmlFor="date" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                      Select date
                    </label>
                    <div className="relative">
                      <select
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all appearance-none cursor-pointer text-sm md:text-base"
                      >
                        <option value="">Choose a date</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="this-week">This Week</option>
                      </select>
                      <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Time Selector - Mindvalley style */}
                  <div>
                    <label htmlFor="time" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                      Select time
                    </label>
                    <div className="relative">
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all appearance-none cursor-pointer text-sm md:text-base"
                      >
                        <option value="">Choose a time</option>
                        <option value="morning">Morning (10:00 AM)</option>
                        <option value="afternoon">Afternoon (2:00 PM)</option>
                        <option value="evening">Evening (7:00 PM)</option>
                      </select>
                      <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-600 text-xs md:text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-sm md:text-lg rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-4 h-4 border-2 border-[#0A0E27] border-t-transparent rounded-full"
                        />
                        <span>Securing Your Spot...</span>
                      </>
                    ) : (
                      <>
                        <span>Join The Free Masterclass</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-gray-400 text-[10px] md:text-xs text-center leading-relaxed">
                    By registering for the above, you confirm that you agree to the Terms of Use &amp; the Privacy Policy as well as receiving notification for future events. You can withdraw your consent at any time by unsubscribing.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL GAIN - Mindvalley Format */}
      <section ref={gainRef} className="relative py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              In This Free Live Masterclass, You&apos;ll Discover:
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              A clear, step-by-step plan to understand your patterns and start living in alignment with who you truly are.
            </p>
          </motion.div>

          <div className="space-y-10 md:space-y-14">
            {gains.map((gain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.1 + i * 0.1 }}
                className="flex gap-4 md:gap-8"
              >
                <div className="flex-shrink-0">
                  <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#D8B86A]/20">{i + 1}</span>
                </div>
                <div className="pt-1 md:pt-2">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">{gain.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{gain.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 p-6 md:p-8 rounded-xl border border-gray-200 bg-white"
          >
            <p className="text-gray-700 leading-relaxed text-center text-sm md:text-base">
              <span className="font-semibold text-gray-900">By the end of this masterclass,</span> you&apos;ll have a complete understanding of your Pattern Code — and you&apos;ll know exactly how to apply it to your relationships, career, and life decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SPEAKER SECTION - Mindvalley Format */}
      <section ref={speakerRef} className="relative py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Your Guide: Master RenZi (Dato' Sri Dr. Patrick Tan)
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              With 20+ years mastering numerology, Vedic astrology, and cognitive science, Master RenZi has helped thousands break free from recurring patterns and live with clarity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-gray-200 w-4/5 mx-auto">
                <img
                  src={trainerImage}
                  alt="Master RenZi (Dato' Sri Dr. Patrick Tan) - NUMI Founder"
                  className="w-full h-full object-cover object-[75%_center]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Master RenZi (Dato' Sri Dr. Patrick Tan)</h3>
                <p className="text-[#D8B86A] font-medium text-sm md:text-base">Dato' Sri, PhD, Entrepreneur & Master Numerologist</p>
              </div>

              <div className="space-y-3 md:space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  <span className="text-gray-900 font-semibold">Master RenZi</span> is the founder and chairman of Admall Group of Companies and an expert in Vedic astrology, numerology, and tantric rituals for over 20 years.
                </p>
                <p>
                  As the founder of Visiber Sdn Bhd (2007-2013), he pioneered the relationship between numbers and human potential, receiving the Asia Pacific Entrepreneurship Award, The Taurus Award, and MRCA-8TV Outstanding Entrepreneur Award.
                </p>
                <p>
                  His research spans cognitive science, human brain studies, and the relationship between numbers, environment, and the universe — making ancient wisdom practical for modern life transformation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                <div className="flex items-center gap-2 text-[#D8B86A]">
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">20+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-[#D8B86A]">
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">Multiple Awards</span>
                </div>
                <div className="flex items-center gap-2 text-[#D8B86A]">
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">Dato' Sri</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION SECTION - Mindvalley Format */}
      <section className="relative py-12 md:py-16 pb-6 md:pb-8 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              This Is What Happens When You Finally Understand Your Pattern
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-12">
              Clarity replaces confusion. Decisions become aligned. Relationships finally make sense. See what&apos;s possible when you stop working against yourself.
            </p>
          </motion.div>

          {/* Teaching Workshop Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 max-w-3xl mx-auto"
          >
            <img
              src={teachingImage}
              alt="Master RenZi teaching a live NUMI workshop"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <TestimonialSection
        title=""
        subtitle=""
        testimonials={testimonials}
      />

      {/* FINAL CTA - Mindvalley Format */}
      <section ref={finalCtaRef} className="relative py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Your Pattern Code Is Waiting To Be Discovered
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Join thousands who&apos;ve already transformed their lives. Claim your free spot in the next live masterclass.
            </p>
          </motion.div>

          {/* Banner Image - Mindvalley style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden mb-8 md:mb-12 border border-gray-200"
          >
            <img
              src="/masterclass-banner.png"
              alt="NUMI Masterclass - Discover Your Pattern Code"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>

          {/* Registration Form - Mindvalley style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-[#D8B86A]/10 border border-[#D8B86A]/20 mb-4 md:mb-6">
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-[#D8B86A]" />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2 text-center">
                Join The Free Live Masterclass
              </h2>
              <p className="text-gray-500 text-xs md:text-sm text-center mb-4 md:mb-6">
                Choose your preferred date and time. Spots are limited.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5 md:space-y-4">
                <div>
                  <label htmlFor="finalFirstName" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                    Name *
                  </label>
                  <input
                    id="finalFirstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all text-sm md:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="finalEmail" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                    Email *
                  </label>
                  <input
                    id="finalEmail"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all text-sm md:text-base"
                  />
                </div>

                {/* Date Selector - Mindvalley style */}
                <div>
                  <label htmlFor="finalDate" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                    Select date
                  </label>
                  <div className="relative">
                    <select
                      id="finalDate"
                      name="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all appearance-none cursor-pointer text-sm md:text-base"
                    >
                      <option value="">Choose a date</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="this-week">This Week</option>
                    </select>
                    <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Time Selector - Mindvalley style */}
                <div>
                  <label htmlFor="finalTime" className="block text-gray-700 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                    Select time
                  </label>
                  <div className="relative">
                    <select
                      id="finalTime"
                      name="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D8B86A]/50 focus:border-[#D8B86A] transition-all appearance-none cursor-pointer text-sm md:text-base"
                    >
                      <option value="">Choose a time</option>
                      <option value="morning">Morning (10:00 AM)</option>
                      <option value="afternoon">Afternoon (2:00 PM)</option>
                      <option value="evening">Evening (7:00 PM)</option>
                    </select>
                    <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-600 text-xs md:text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-[#D8B86A] via-[#F4D47A] to-[#D8B86A] hover:brightness-110 text-[#0A0E27] font-bold text-sm md:text-lg rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-4 h-4 border-2 border-[#0A0E27] border-t-transparent rounded-full"
                      />
                      <span>Securing Your Spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Join The Free Masterclass</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-gray-400 text-[10px] md:text-xs text-center leading-relaxed">
                  By registering for the above, you confirm that you agree to the Terms of Use &amp; the Privacy Policy as well as receiving notification for future events. You can withdraw your consent at any time by unsubscribing.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-10 md:py-12 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed mb-3 md:mb-4">
            NUMI is designed for self-reflection and personal growth. It does not provide medical, financial, legal, or professional advice.
          </p>
          <p className="text-gray-300 text-[10px] md:text-xs">© 2026 NUMI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
