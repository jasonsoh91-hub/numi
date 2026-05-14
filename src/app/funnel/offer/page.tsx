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

export default function OfferPage() {
  const router = useRouter();
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get funnel data from localStorage
    const data = localStorage.getItem("numiFunnelData");
    if (!data) {
      router.push("/funnel");
      return;
    }
    setFunnelData(JSON.parse(data));
  }, [router]);

  const handlePurchase = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      router.push("/funnel/success");
    }, 2000);
  };

  if (!funnelData) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* Header */}
      <header className="py-4 px-6 border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-wider">
            <span className="text-amber-400">NUMI</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Product Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Urgency Banner */}
              <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-600/50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Special 62% Discount Expires Soon!</p>
                  <p className="text-white text-sm">Regular price: $97 | Today only: $37</p>
                </div>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Complete Numerology Report
                </h1>
                <p className="text-white">
                  Personalized for <span className="text-amber-400 font-semibold">{funnelData.firstName}</span>
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-stone-900/70 rounded-xl p-6 border border-amber-600/40">
                <h2 className="text-xl font-bold text-white mb-4">What's Included in Your Report</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Life Path Number Deep Dive",
                      desc: "Discover your core purpose, natural talents, and the lessons you're here to learn",
                      icon: "path"
                    },
                    {
                      title: "Expression Number Analysis",
                      desc: "Understand how others perceive you and your natural abilities and potential",
                      icon: "expression"
                    },
                    {
                      title: "Soul Urge Number Reading",
                      desc: "Uncover your inner desires, what truly motivates you, and your emotional needs",
                      icon: "soul"
                    },
                    {
                      title: "Career & Wealth Forecast",
                      desc: "Your ideal career paths, money-making opportunities, and timing for success",
                      icon: "career"
                    },
                    {
                      title: "Relationship Compatibility",
                      desc: "Your best romantic matches and how to build fulfilling relationships",
                      icon: "love"
                    },
                    {
                      title: "Personal Year Forecast",
                      desc: "What to expect in the next 12 months and how to make the most of it",
                      icon: "year"
                    },
                    {
                      title: "Lucky Numbers & Days",
                      desc: "Your personal lucky numbers, colors, and days for important decisions",
                      icon: "lucky"
                    },
                    {
                      title: "Challenge & Pinnacle Numbers",
                      desc: "Understand your life's challenges and when your biggest opportunities will arrive",
                      icon: "peak"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-3 bg-stone-800/50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center">
                        {item.icon === "path" && <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
                        {item.icon === "expression" && <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                        {item.icon === "soul" && <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>}
                        {item.icon === "career" && <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        {item.icon === "love" && <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>}
                        {item.icon === "year" && <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        {item.icon === "lucky" && <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                        {item.icon === "peak" && <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-white text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus Materials */}
              <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-xl p-6 border border-amber-600/40">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-amber-400 text-stone-900 px-3 py-1 rounded-full text-sm font-bold">BONUS</span>
                  <span className="text-white font-semibold">Included FREE with your order</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Daily Numerology Guide", value: "$27" },
                    { name: "Meditation for Abundance", value: "$19" },
                    { name: "Relationship Compatibility Chart", value: "$15" },
                    { name: "2026 Forecast Calendar", value: "$12" }
                  ].map((bonus, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white">{bonus.name}</span>
                      <span className="text-stone-300 text-sm ml-auto line-through">{bonus.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-stone-900/70 rounded-xl p-6 border border-amber-600/40">
                <h2 className="text-lg font-bold text-white mb-4">What Others Are Saying</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "Amanda R.",
                      text: "This report changed my life. After years of feeling lost, I finally understand my path. The career section was incredibly accurate!",
                      rating: 5
                    },
                    {
                      name: "Michael T.",
                      text: "I was skeptical but the relationship insights helped me understand my partner better. We're stronger than ever now.",
                      rating: 5
                    }
                  ].map((review, i) => (
                    <div key={i} className="p-4 bg-stone-800/50 rounded-lg">
                      <div className="flex gap-1 mb-2">
                        {[...Array(review.rating)].map((_, j) => (
                          <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-white text-sm mb-2">"{review.text}"</p>
                      <p className="text-amber-400 font-semibold text-sm">— {review.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="lg:col-span-2">
              <div className="sticky top-4 bg-stone-900/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-600/40 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

                {/* Pricing */}
                <div className="space-y-3 mb-6 pb-6 border-b border-amber-900/30">
                  <div className="flex justify-between text-white">
                    <span>Complete Numerology Report</span>
                    <span>$97.00</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Bonus Materials</span>
                    <span className="line-through text-stone-300">$73.00</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-$60.00</span>
                  </div>
                  <div className="flex justify-between text-white text-lg font-bold pt-3 border-t border-amber-900/30">
                    <span>Total</span>
                    <span>$37.00</span>
                  </div>
                  <div className="text-center text-white text-sm">
                    One-time payment • Instant access
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={(e) => { e.preventDefault(); handlePurchase(); }} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-white text-sm mb-1 font-semibold">Email</label>
                    <input
                      type="email"
                      value={funnelData.email}
                      readOnly
                      className="w-full px-4 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white cursor-not-allowed"
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block text-white text-sm mb-1 font-semibold">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                        <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                          <rect width="32" height="20" rx="2" fill="#1A1F71"/>
                          <text x="16" y="13" fontSize="6" fill="white" textAnchor="middle">VISA</text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white text-sm mb-1 font-semibold">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-1 font-semibold">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  {/* Name on Card */}
                  <div>
                    <label className="block text-white text-sm mb-1 font-semibold">Name on Card</label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      required
                      className="w-full px-4 py-3 bg-stone-800 border border-amber-700/50 rounded-lg text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 font-bold text-lg rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Get My Full Report - $37"
                    )}
                  </button>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap justify-center gap-3 pt-4">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      SSL Secure
                    </div>
                    <div className="flex items-center gap-1 text-white text-xs">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      60-Day Guarantee
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex justify-center gap-3 opacity-50">
                    <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-bold text-blue-600">VISA</div>
                    <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-bold text-red-500">MC</div>
                    <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-bold text-blue-800">AMEX</div>
                    <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-bold text-blue-600">PP</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Guarantee Section */}
      <section className="px-4 py-12 bg-stone-900/50 border-t border-amber-900/20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">60-Day Money-Back Guarantee</h2>
          <p className="text-white">
            If you're not completely satisfied with your numerology report, simply contact us within 60 days
            for a full refund. No questions asked. Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 bg-stone-950 border-t border-stone-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 text-stone-300 text-sm">
          <p>© 2026 NUMI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400 transition text-white">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition text-white">Terms</a>
            <a href="#" className="hover:text-amber-400 transition text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
