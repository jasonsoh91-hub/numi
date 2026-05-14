export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-purple-400 text-sm tracking-widest uppercase">About NUMI</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white mt-4 mb-6">
            Ancient Insight. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Modern Experience.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            NUMI is a human intelligent pattern platform created to help people better understand themselves
            and navigate life with greater awareness, clarity, and possibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Eastern Depth",
              description: "Rooted in timeless pattern wisdom that has guided human understanding for generations.",
              icon: "☯️"
            },
            {
              title: "Western Clarity",
              description: "Presented with modern precision, structured learning, and practical application.",
              icon: "🎯"
            },
            {
              title: "Modern Experience",
              description: "Accessible through app-based technology designed for today's connected world.",
              icon: "📱"
            }
          ].map((item, i) => (
            <div key={i} className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 rounded-3xl p-8 md:p-12 border border-purple-900/30">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-light text-white mb-4">Why People Need NUMI Today</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              We are living in a time of uncertainty, information overload, emotional stress, and endless choices.
              Many people work hard, but still feel lost. Many want success, but do not understand their own
              strengths, timing, or life pattern.
            </p>
            <p className="text-slate-400 leading-relaxed">
              NUMI was created to help solve this problem. By revealing human intelligent patterns, NUMI helps
              people gain deeper self-understanding and practical insight into how they can move with greater
              clarity, confidence, and purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
