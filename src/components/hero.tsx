import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gem, Heart, Sparkles, TrendingUp, ChevronRight, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-soft overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.08),transparent_50%)]"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-lavender-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-24 pb-12">
        {/* Trust badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-soft">
          <div className="flex -space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-lavender-500 border-2 border-white"></div>
            ))}
          </div>
          <span className="text-sm font-medium text-primary-900">
            Join <span className="font-bold">2,847+</span> seekers on their destiny path
          </span>
        </div>

        {/* Main headline - curiosity-driven */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold text-primary-900 mb-6 leading-tight tracking-tight">
          Your Birth Numbers Reveal a{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-primary-500 to-lavender-500 text-transparent bg-clip-text">
              Hidden Truth
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
              <path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          About Your Future
        </h1>

        {/* Subheadline - benefit-rich */}
        <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed font-sans">
          Your <strong>free personalized Destiny reading</strong> reveals your Life Path, hidden talents, and the{" "}
          <span className="text-primary-600 font-medium">exact timing</span> of your upcoming opportunities — just enter your details below.
        </p>

        {/* Benefit bullets */}
        <div className="mb-10 max-w-2xl mx-auto text-left bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-primary/10">
          <p className="text-sm font-semibold text-primary-700 mb-3">In your FREE reading, discover:</p>
          <ul className="space-y-2 text-slate-700">
            {[
              { text: "Deep desires you've been ignoring and how to finally attain them", highlight: "NEVER" },
              { text: "Where you've been incorrectly putting your energy", highlight: "easy switch" },
              { text: "Secret talents and hidden strengths you didn't know you had", highlight: "talents" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>
                  Ways you've <strong className="text-primary-700">{item.highlight}</strong> seen before to reveal {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA - Low friction, FREE */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/destiny">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-500 to-lavender-500 text-white hover:from-primary-600 hover:to-lavender-600 rounded-full px-10 py-6 text-base font-semibold shadow-luxury shadow-primary-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get My FREE Reading
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-300 text-primary-700 hover:bg-primary-50 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:border-primary-400"
            >
              Learn How It Works
            </Button>
          </Link>
        </div>

        {/* Life area cards - SVG icons instead of emojis */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Wealth & Abundance", icon: Gem, color: "text-amber-500" },
            { label: "Relationships", icon: Heart, color: "text-rose-500" },
            { label: "Health & Energy", icon: Sparkles, color: "text-emerald-500" },
            { label: "Career & Growth", icon: TrendingUp, color: "text-lavender-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="group text-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm hover:shadow-soft transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-full bg-${item.color.split('-')[1]}-50 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-slate-700 text-sm font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.9/5 from 2,847+ reviews</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
          <span>✓ 100% Free Reading</span>
          <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
          <span>✓ Instant Results</span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
