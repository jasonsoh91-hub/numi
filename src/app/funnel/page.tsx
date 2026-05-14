"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FunnelLandingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Store form data for next pages
    localStorage.setItem("numiFunnelData", JSON.stringify(formData));

    // Simulate API call then redirect
    setTimeout(() => {
      router.push("/funnel/video");
    }, 500);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Header */}
        <header className="relative z-10 py-6 px-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-white tracking-wider">
              <span className="text-amber-400">NUMI</span>
            </div>
            <div className="text-white text-sm">
              Over <span className="text-amber-400 font-semibold">2,385,368</span> people trust NUMI
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Are <span className="text-amber-400">Repeating Numbers</span> Hidden Messages Being Sent From Your{" "}
              <span className="text-amber-400">Angels</span>?
            </h1>

            <p className="text-xl md:text-2xl text-white mb-4 max-w-3xl mx-auto">
              Your Name and Birthday Reveal a Shocking Truth About Your Future
            </p>

            <p className="text-lg text-stone-200 mb-12">
              Your free personalized video reading is waiting — just enter your details below
            </p>

            {/* Lead Capture Form */}
            <div className="max-w-md mx-auto bg-stone-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-amber-900/50">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-white text-sm mb-2 text-left font-semibold">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      required
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                      className="px-3 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    >
                      <option value="" className="text-stone-500">Month</option>
                      {months.map((month, i) => (
                        <option key={month} value={String(i + 1).padStart(2, "0")} className="text-black">{month}</option>
                      ))}
                    </select>

                    <select
                      required
                      value={formData.day}
                      onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                      className="px-3 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    >
                      <option value="" className="text-stone-500">Day</option>
                      {days.map((day) => (
                        <option key={day} value={String(day).padStart(2, "0")} className="text-black">{day}</option>
                      ))}
                    </select>

                    <select
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="px-3 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    >
                      <option value="" className="text-stone-500">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year} className="text-black">{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-white text-sm mb-2 text-left font-semibold">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "male" })}
                      className={`py-3 rounded-lg border transition font-semibold ${
                        formData.gender === "male"
                          ? "bg-amber-400 border-amber-400 text-stone-900"
                          : "bg-stone-800 border-amber-700/50 text-white hover:border-amber-500"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "female" })}
                      className={`py-3 rounded-lg border transition font-semibold ${
                        formData.gender === "female"
                          ? "bg-amber-400 border-amber-400 text-stone-900"
                          : "bg-stone-800 border-amber-700/50 text-white hover:border-amber-500"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                  <input type="hidden" required value={formData.gender} />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 font-bold text-lg rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25"
                >
                  {isSubmitting ? "Preparing Your Reading..." : "Reveal My Free Personalized Reading"}
                </button>

                {/* Privacy Notice */}
                <p className="text-xs text-stone-300 text-center">
                  Your information is secure and will never be shared.{" "}
                  <a href="#" className="text-amber-400 hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </main>

        {/* Preview Section - What They'll Get */}
        <section className="relative z-10 px-4 py-16 bg-stone-900/70">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              In this <span className="text-amber-400">personalized video report</span>, we'll explore your Life Path, Expression, and Soul Urge Numbers
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Deep desires you may be ignoring and what you can do to finally attain them",
                "Where you've been incorrectly putting your energy and how to make an effortless \"switch\"",
                "What makes you tick, your attitude towards work, and your perfect environment",
                "Secret talents and hidden strengths (and how to use them!)",
                "Powerful insight into your character and unique personality traits",
                "Upcoming challenges and lessons you're meant to learn in this life",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative z-10 px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Over <span className="text-amber-400">2,385,368</span> People Trust NUMI
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Sarah M.",
                  text: "I was just shocked! Every single thing that I read in my report was so true. It gave me important things to remember about the next 2 years."
                },
                {
                  name: "Jennifer K.",
                  text: "I'm really amazed at the results! It was really reassuring to know I was on the right path. It pointed out how to work to my strengths."
                },
                {
                  name: "Michael R.",
                  text: "I'm blown away! It actually showed me things about myself that I hadn't had confidence in before. It also helped me in my relationship."
                },
                {
                  name: "Amanda L.",
                  text: "If you're looking for direction in life, NUMI would be one of the most helpful things in doing so. Highly recommend!"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-stone-900/90 backdrop-blur-sm rounded-xl p-6 border border-amber-600/40">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white text-sm mb-4">"{testimonial.text}"</p>
                  <p className="text-amber-400 font-semibold">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-8 bg-stone-950 border-t border-stone-800">
        <div className="max-w-6xl mx-auto text-center text-stone-300 text-sm">
          <p>© 2026 NUMI. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-amber-400 transition text-white">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition text-white">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
