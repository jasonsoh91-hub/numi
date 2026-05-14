export function ExperienceSection() {
  const experiences = [
    {
      role: "Former Tech Executive",
      quote: "NUMI saved my career. The clarity I find here carries through every board meeting.",
      name: "Sarah M.",
      location: "Member since 2024"
    },
    {
      role: "Healthcare Executive",
      quote: "Finally, a wellness space that respects my time and my need for privacy.",
      name: "Michael R.",
      location: "Member since 2023"
    },
    {
      role: "Attorney",
      quote: "I leave at the door what I came in with. That's priceless.",
      name: "Jennifer L.",
      location: "Member since 2024"
    }
  ]

  return (
    <section id="experience" className="py-24 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm tracking-widest uppercase">Member Stories</span>
          <h2 className="text-4xl sm:text-5xl font-light mt-4 mb-6">
            The NUMI <span className="italic">Experience</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <div key={i} className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700">
              <div className="text-amber-400 text-4xl mb-6">"</div>
              <p className="text-stone-300 text-lg leading-relaxed mb-6">
                {exp.quote}
              </p>
              <div>
                <div className="font-medium text-white">{exp.name}</div>
                <div className="text-stone-400 text-sm">{exp.role}</div>
                <div className="text-stone-500 text-xs mt-1">{exp.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-stone-400 mb-4">Join our community of accomplished professionals</p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-stone-300">Membership application required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-stone-300">Limited capacity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
