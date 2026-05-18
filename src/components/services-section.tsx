import { Button } from "@/components/ui/Button"

export function ServicesSection() {
  const services = [
    {
      title: "Signature Massage",
      duration: "60-90 min",
      description: "Our proprietary technique combining Swedish, deep tissue, and aromatherapy.",
      price: "From $180"
    },
    {
      title: "Mindfulness Session",
      duration: "45 min",
      description: "Guided meditation and breathwork designed for stressed professionals.",
      price: "From $120"
    },
    {
      title: "Hydrotherapy Ritual",
      duration: "75 min",
      description: "Thermal pools, contrast therapy, and essential oil infusions.",
      price: "From $220"
    },
    {
      title: "Wellness Consultation",
      duration: "60 min",
      description: "Personalized wellness roadmap with our holistic health experts.",
      price: "From $150"
    }
  ]

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-stone-100 to-amber-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-amber-600 text-sm tracking-widest uppercase">Services</span>
          <h2 className="text-4xl sm:text-5xl font-light text-stone-900 mt-4 mb-6">
            Curated for Your <span className="italic">Restoration</span>
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Each service is designed to guide you from stress to serenity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-stone-200 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-medium text-stone-900">{service.title}</h3>
                <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">{service.duration}</span>
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-stone-900 font-medium">{service.price}</span>
                <Button variant="ghost" className="text-stone-600 hover:text-stone-900">
                  Learn more →
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-stone-900 text-white hover:bg-stone-800 rounded-full px-8 py-6">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}
