import { Button } from "@/components/ui/button";

export function AppSection() {
  const features = [
    {
      title: "Personal Pattern Profile",
      description: "Discover your unique patterns and tendencies across life dimensions.",
      icon: "👤"
    },
    {
      title: "Guided Insights",
      description: "Receive structured interpretation tailored to your personal journey.",
      icon: "✨"
    },
    {
      title: "Pattern Insight Tools",
      description: "Practical tools for decision-making, timing, and direction.",
      icon: "🔮"
    },
    {
      title: "Learning Support",
      description: "Educational integration to deepen your understanding.",
      icon: "📚"
    },
    {
      title: "Event & Program Access",
      description: "Exclusive access to seminars and member events.",
      icon: "🎭"
    },
    {
      title: "Ongoing Updates",
      description: "Continuous evolution of insights and features.",
      icon: "🔄"
    }
  ]

  const plans = [
    {
      name: "Basic Access",
      price: "₹999",
      period: "/MONTH",
      features: ["Pattern discovery", "Member profile access", "Basic insights"],
      color: "from-slate-800 to-slate-900"
    },
    {
      name: "Premium Member",
      price: "₹2,999",
      period: "/MONTH",
      features: ["All Basic features", "Pattern insight tools", "Guided interpretation", "Educational integration"],
      color: "from-purple-900/50 to-indigo-900/50",
      recommended: true
    },
    {
      name: "VIP Member",
      price: "₹7,999",
      period: "/MONTH",
      features: ["All Premium features", "Exclusive member content", "Event & program access", "Priority support"],
      color: "from-slate-800 to-slate-900"
    }
  ]

  return (
    <section id="app" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm tracking-widest uppercase">The NUMI App</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white mt-4 mb-6">
            Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Pattern Companion</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A premium personal pattern platform for members who want deeper insight, guidance, and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, i) => (
            <div key={i} className="bg-slate-950/50 p-6 rounded-xl border border-slate-800">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-light text-white text-center mb-8">Choose Your Membership Path</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`bg-gradient-to-br ${plan.color} p-8 rounded-2xl border ${plan.recommended ? 'border-purple-500' : 'border-slate-800'} relative`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-xs text-white">
                    Popular
                  </div>
                )}
                <h4 className="text-xl font-medium text-white mb-2">{plan.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-light text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-slate-300 text-sm">
                      <span className="text-purple-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.recommended ? "default" : "outline"}
                  className={plan.recommended
                    ? "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white rounded-full"
                    : "w-full border-slate-600 text-white hover:bg-slate-800 rounded-full"}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 rounded-full px-8 py-6 border-0">
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  )
}
