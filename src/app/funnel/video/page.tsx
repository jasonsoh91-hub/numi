"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FunnelData {
  firstName: string;
  email: string;
  day: string;
  month: string;
  year: string;
  gender: string;
}

export default function VideoPage() {
  const router = useRouter();
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    // Get funnel data from localStorage
    const data = localStorage.getItem("numiFunnelData");
    if (!data) {
      router.push("/funnel");
      return;
    }
    setFunnelData(JSON.parse(data));

    // Show offer after video "ends" (simulated with timer)
    const timer = setTimeout(() => {
      setVideoEnded(true);
      setTimeout(() => setShowOffer(true), 1000);
    }, 8000); // 8 seconds to simulate video

    return () => clearTimeout(timer);
  }, [router]);

  const handleGetFullReport = () => {
    router.push("/funnel/offer");
  };

  if (!funnelData) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading your personalized reading...</div>
      </div>
    );
  }

  // Calculate numerology numbers for display
  const lifePathNumber = (() => {
    const { day, month, year } = funnelData;
    const sum = parseInt(day) + parseInt(month) + parseInt(year);
    const reduced = String(sum).split("").reduce((a, b) => a + parseInt(b), 0);
    return reduced > 9 ? String(reduced).split("").reduce((a, b) => a + parseInt(b), 0) : reduced;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* Header */}
      <header className="py-4 px-6 border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-wider">
            <span className="text-amber-400">NUMI</span>
          </div>
          <div className="text-white text-sm">
            Welcome, <span className="text-amber-400 font-semibold">{funnelData.firstName}</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Your Personalized Video Reading
            </h1>
            <p className="text-white">
              Based on your birth date: {funnelData.month}/{funnelData.day}/{funnelData.year}
            </p>
          </div>

          {/* Video Player Container */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video mb-8">
            {!videoEnded ? (
              <>
                {/* Simulated Video Player */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-stone-900 to-stone-950 flex items-center justify-center">
                  <div className="text-center p-8">
                    {/* Animated Numbers */}
                    <div className="mb-8 flex justify-center gap-4">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="w-16 h-20 bg-stone-700/90 rounded-lg flex items-center justify-center text-3xl font-bold text-amber-400 animate-pulse border border-amber-500/30"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          {Math.floor(Math.random() * 9) + 1}
                        </div>
                      ))}
                    </div>

                    {/* Playing Animation */}
                    <div className="flex items-center justify-center gap-2 text-white">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                      <span className="text-sm">Your personalized reading is playing...</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 w-full max-w-md mx-auto">
                      <div className="h-2 bg-stone-600 rounded-full overflow-hidden border border-amber-700/30">
                        <div
                          className="h-full bg-amber-400 transition-all duration-100"
                          style={{ width: "40%" }}
                        />
                      </div>
                    </div>

                    {/* Personal Message */}
                    <div className="mt-8 text-white text-lg">
                      <p className="mb-2">Hello <span className="text-amber-400 font-semibold">{funnelData.firstName}</span>...</p>
                      <p>Your Life Path Number is <span className="text-amber-400 font-bold">{lifePathNumber}</span></p>
                      <p className="text-sm text-white mt-2">Your complete reading reveals your destiny...</p>
                    </div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:text-amber-400 transition">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="flex-1 h-1 bg-stone-500 rounded-full overflow-hidden border border-amber-700/30">
                      <div className="h-full bg-amber-400 w-2/5" />
                    </div>
                    <span className="text-white text-sm">8:24 / 20:15</span>
                  </div>
                </div>
              </>
            ) : (
              /* Video Ended Screen */
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-950 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-400/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Your Free Reading is Complete</h3>
                  <p className="text-white">But this is just the beginning of your journey...</p>
                </div>
              </div>
            )}
          </div>

          {/* What You Learned Section */}
          <div className="bg-stone-900/70 rounded-xl p-6 mb-8 border border-amber-600/40">
            <h2 className="text-xl font-bold text-white mb-4">In your free reading, you discovered:</h2>
            <ul className="space-y-3">
              {[
                `Your Life Path Number: ${lifePathNumber}`,
                "A glimpse into your true personality",
                "Brief insight into your life's purpose",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Offer CTA - Appears after video */}
          {showOffer && (
            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/30 rounded-2xl p-8 border border-amber-600/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-amber-400 text-stone-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Limited Time Offer
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Get Your Complete Numerology Report
                </h2>

                <p className="text-white mb-6 max-w-xl mx-auto">
                  Unlock your full 100+ page personalized report with detailed insights about your career,
                  relationships, wealth, and destiny. This is the most comprehensive numerology reading available.
                </p>

                {/* What's Included */}
                <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
                  {[
                    { title: "Life Path Analysis", desc: "Your core purpose and destiny" },
                    { title: "Expression Number", desc: "Your natural talents and abilities" },
                    { title: "Soul Urge Number", desc: "Your inner desires and motivations" },
                    { title: "Career Forecast", desc: "Your ideal career paths and timing" },
                    { title: "Love Compatibility", desc: "Your best romantic matches" },
                    { title: "Wealth Patterns", desc: "Your money-making potential" },
                  ].map((item, i) => (
                    <div key={i} className="bg-stone-900/50 rounded-lg p-4 border border-amber-700/30">
                      <h3 className="text-amber-400 font-semibold mb-1">{item.title}</h3>
                      <p className="text-white text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-stone-300 line-through text-xl">$97</span>
                    <span className="text-4xl font-bold text-white">$37</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">62% OFF</span>
                  </div>
                  <p className="text-white text-sm mb-6">One-time payment • Instant access • 100% satisfaction guarantee</p>

                  <button
                    onClick={handleGetFullReport}
                    className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 font-bold text-lg rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/25"
                  >
                    Get My Full Report Now →
                  </button>
                </div>

                {/* Trust Elements */}
                <div className="flex flex-wrap justify-center gap-6 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>60-Day Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Below Video */}
          {!showOffer && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rachel T.",
                  text: "After watching my free reading, I knew I needed the full report. It changed everything!",
                  rating: 5
                },
                {
                  name: "David M.",
                  text: "The video was just the tip of the iceberg. My full report is incredibly accurate.",
                  rating: 5
                },
                {
                  name: "Lisa K.",
                  text: "I was skeptical at first, but the insights were spot-on. Got the full report immediately.",
                  rating: 5
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-stone-900/70 rounded-xl p-6 border border-amber-600/40">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white text-sm mb-3">"{testimonial.text}"</p>
                  <p className="text-amber-400 font-semibold text-sm">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
