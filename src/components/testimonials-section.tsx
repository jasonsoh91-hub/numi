import { Quote, Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Director",
      content: "I was absolutely shocked! My NUMI reading revealed patterns I'd been ignoring for years. It showed me exactly where I'd been putting my energy in the wrong places. Making that simple 'switch' they suggested changed everything — my relationship improved, and I finally feel aligned with my purpose.",
      rating: 5,
      highlight: "shocked!"
    },
    {
      name: "James T.",
      role: "Entrepreneur",
      content: "I'm blown away by the accuracy! The reading pointed out hidden talents I never knew I had. I've always struggled with confidence in business, but seeing my strengths laid out so clearly gave me the courage to pivot. Revenue up 40% in three months.",
      rating: 5,
      highlight: "blown away"
    },
    {
      name: "Amanda L.",
      role: "Yoga Instructor",
      content: "If you're looking for direction in life, this is one of the most helpful things you can do. I was at a crossroads, unsure whether to commit to my studio. NUMI showed me the upcoming opportunities I would have missed. I took the leap and haven't looked back.",
      rating: 5,
      highlight: "direction in life"
    },
    {
      name: "Michael R.",
      role: "Software Engineer",
      content: "Really amazing results! It was so reassuring to know I was on the right path. The reading confirmed my gut feelings about a career move I was hesitant to make. Three months later, I'm in my dream role with better pay and work-life balance.",
      rating: 5,
      highlight: "reassuring"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
            <Star className="w-4 h-4 fill-primary-600 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Real Stories, Real Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-primary-900 mb-4">
            Over <span className="text-primary-500">2,847</span> People Found Their Path
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See what happens when you finally understand the patterns guiding your life
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-primary/10 group hover:-translate-y-1"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-primary-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 leading-relaxed mb-6 font-sans">
                <span className="font-semibold text-primary-700">"{testimonial.highlight}"</span> — {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-lavender-200 flex items-center justify-center">
                  <span className="text-primary-700 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-primary-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof banner */}
        <div className="bg-gradient-to-r from-primary-500 to-lavender-500 rounded-2xl p-8 text-center text-white shadow-luxury">
          <p className="text-lg sm:text-xl font-medium mb-2">
            Join thousands who discovered their true path
          </p>
          <p className="text-primary-100 mb-6">
            Your personalized reading is waiting — completely free
          </p>
          <a
            href="/destiny"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors duration-300 shadow-lg"
          >
            Get My Free Reading
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
