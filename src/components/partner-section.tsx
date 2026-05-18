import { Button } from "@/components/ui/Button"

export function PartnerSection() {
  const partnerLevels = [
    {
      level: "Member",
      description: "Begin your NUMI journey as a user and learner.",
      benefits: ["Pattern discovery", "Member profile access"]
    },
    {
      level: "Promoter",
      description: "Share the preview and invite others into the ecosystem.",
      benefits: ["App membership", "Preview seminars"]
    },
    {
      level: "Certified Partner",
      description: "Introduce NUMI in a more structured and professional capacity.",
      benefits: ["Educational programs", "Selected products", "Partner community"]
    },
    {
      level: "Senior Leader",
      description: "Support wider expansion, training, and team development.",
      benefits: ["All Partner benefits", "Future expansion opportunities"]
    }
  ]

  const whatYouCanShare = [
    { title: "The NUMI App", icon: "📱" },
    { title: "Educational Seminars", icon: "🎓" },
    { title: "NUMI Academy Programs", icon: "📚" },
    { title: "Selected Products", icon: "✨" }
  ]

  return (
    <section id="partner" className="py-24 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm tracking-widest uppercase">Partner With Us</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white mt-4 mb-6">
            Become Part Of The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">NUMI Expansion</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join a growing network of members who are helping introduce the NUMI vision, ecosystem,
            and opportunities to a wider global audience with purpose and professionalism.
          </p>
        </div>

        {/* Partner Journey */}
        <div className="mb-16">
          <h3 className="text-2xl font-light text-white text-center mb-8">Your Partner Journey</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {partnerLevels.map((level, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-800 h-full">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-900/50 rounded-full text-white font-medium mb-4">
                    {i + 1}
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">{level.level}</h4>
                  <p className="text-slate-400 text-sm mb-4">{level.description}</p>
                  <ul className="space-y-1">
                    {level.benefits.map((benefit, j) => (
                      <li key={j} className="text-slate-500 text-xs flex items-center">
                        <span className="text-purple-400 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < partnerLevels.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-purple-600">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What You Can Share */}
        <div className="mb-12">
          <h3 className="text-2xl font-light text-white text-center mb-8">What You Can Introduce</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {whatYouCanShare.map((item, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-white font-medium">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Ideal For */}
        <div className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 rounded-2xl p-8 border border-purple-900/30">
          <h3 className="text-xl font-light text-white text-center mb-6">The NUMI Partner Pathway Is Ideal For</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {["Educators", "Speakers", "Community Leaders", "Wellness Advocates", "Business Coaches"].map((role, i) => (
              <div key={i} className="text-slate-300 text-sm">{role}</div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 rounded-full px-8 py-6 border-0">
            Apply to Become a Partner
          </Button>
        </div>
      </div>
    </section>
  )
}
