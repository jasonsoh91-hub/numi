"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FunnelData {
  firstName: string;
  email: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Get funnel data from localStorage
    const data = localStorage.getItem("numiFunnelData");
    if (data) {
      setFunnelData(JSON.parse(data));
    }

    // Countdown to redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadReport = () => {
    // In a real app, this would trigger the actual download
    alert("Your report would be downloaded here!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* Header */}
      <header className="py-4 px-6 border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-white tracking-wider">
            <span className="text-amber-400">NUMI</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center animate-bounce">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Congratulations, {funnelData?.firstName || ""}!
          </h1>
          <p className="text-xl text-white mb-8">
            Your payment was successful and your report is ready
          </p>

          {/* Order Details */}
          <div className="bg-stone-900/70 rounded-xl p-6 mb-8 border border-amber-900/30">
            <h2 className="text-lg font-bold text-white mb-4">Your Order</h2>
            <div className="text-left space-y-2">
              <div className="flex justify-between text-white">
                <span>Complete Numerology Report</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Bonus Materials</span>
                <span className="text-green-400">✓ Included</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Email delivery</span>
                <span>{funnelData?.email || ""}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleDownloadReport}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 font-bold text-lg rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/25"
            >
              Download My Report Now
            </button>

            <div className="text-white text-sm">
              A copy has also been sent to your email
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full md:w-auto px-8 py-3 border border-amber-700/50 text-white hover:text-amber-400 hover:border-amber-500 rounded-lg transition"
            >
              Return to Homepage
            </button>
          </div>

          {/* What's Next */}
          <div className="mt-12 p-6 bg-stone-900/50 rounded-xl border border-amber-900/30 text-left">
            <h3 className="text-lg font-bold text-white mb-4">What's Next?</h3>
            <ol className="space-y-3 text-white">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-sm">1</span>
                <span>Check your email for your report download link and access details</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-sm">2</span>
                <span>Read through your complete report and take notes on key insights</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-sm">3</span>
                <span>Explore your bonus materials including daily numerology guide</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-sm">4</span>
                <span>Join our community for ongoing support and insights</span>
              </li>
            </ol>
          </div>

          {/* Support Section */}
          <div className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700/30">
            <p className="text-white">
              Need help? Contact our support team at{" "}
              <a href="mailto:support@numi.com" className="text-amber-400 hover:underline">
                support@numi.com
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 bg-stone-950 border-t border-stone-800">
        <div className="max-w-6xl mx-auto text-center text-stone-300 text-sm">
          <p>© 2026 NUMI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
