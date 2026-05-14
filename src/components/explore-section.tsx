import { Button } from "@/components/ui/button"

export function ExploreSection() {
  const programs = [
    {
      title: "Foundation Program",
      level: "Beginner",
      description: "For beginners who want to understand the basic framework and language of NUMI.",
      category: "Category 1"
    },
    {
      title: "Advanced Application Program",
      level: "Intermediate",
      description: "For business, leadership, relationship, and life strategy application.",
      category: "Category 2"
    },
    {
      title: "Practitioner Program",
      level: "Advanced",
      description: "For those who want to interpret patterns with greater depth and confidence.",
      category: "Category 3"
    }
  ]

  const products = [
    {
      title: "NUMI Energy Objects",
      description: "Designed to enhance your environment and personal space, supporting balance, focus, and energetic alignment.",
      icon: "🔮"
    },
    {
      title: "NUMI Insight Tools",
      description: "Practical tools that help you apply pattern awareness in real situations — from decision-making to personal clarity.",
      icon: "🧭"
    },
    {
      title: "NUMI Lifestyle Collection",
      description: "A curated range of products that integrate NUMI principles into your everyday lifestyle.",
      icon: "✨"
    },
    {
      title: "NUMI Advanced Systems",
      description: "Specialized products for deeper users, designed to expand understanding and elevate personal development.",
      icon: "⚡"
    }
  ]

  return (
    <section id="explore" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Academy Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-purple-400 text-sm tracking-widest uppercase">NUMI Academy</span>
            <h2 className="text-4xl sm:text-5xl font-light text-white mt-4 mb-6">
              Learn, Apply, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Expand</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              NUMI is not only something to use. It is also something to understand. Through the NUMI Academy,
              members can go deeper into the meaning, interpretation, and practical use of the system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-800">
                <div className="inline-block px-3 py-1 bg-purple-900/50 rounded-full text-purple-300 text-xs mb-4">
                  {program.level}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{program.title}</h3>
                <p className="text-slate-400 mb-4">{program.description}</p>
                <span className="text-slate-500 text-sm">{program.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <span className="text-purple-400 text-sm tracking-widest uppercase">NUMI Products</span>
            <h2 className="text-4xl sm:text-5xl font-light text-white mt-4 mb-6">
              Supporting Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Environment</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Selected products designed to enhance the quality, atmosphere, and energetic experience of your space.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 text-center hover:border-purple-900/50 transition-colors">
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-lg font-medium text-white mb-2">{product.title}</h3>
                <p className="text-slate-400 text-sm">{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 rounded-full px-8 py-6 border-0">
            Explore All Programs
          </Button>
        </div>
      </div>
    </section>
  )
}
