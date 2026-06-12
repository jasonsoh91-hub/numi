"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  ChevronDown,
  Compass,
  Download,
  Heart,
  Lock,
  Play,
  Sparkles,
  Star,
  Target,
  Users,
  WandSparkles,
} from "lucide-react"

const pathways = [
  {
    icon: Brain,
    title: "Mind",
    copy: "See the mental loops behind pressure, procrastination, decision-making, and focus.",
  },
  {
    icon: Heart,
    title: "Love",
    copy: "Decode attachment patterns, conflict triggers, and the emotional needs you rarely name.",
  },
  {
    icon: Target,
    title: "Wealth",
    copy: "Map your earning style, risk rhythm, and the conditions where momentum compounds.",
  },
  {
    icon: Compass,
    title: "Purpose",
    copy: "Turn your Core Number into clearer choices for identity, work, timing, and growth.",
  },
]

const programs = [
  {
    eyebrow: "Start here",
    title: "The Pattern Code",
    text: "A guided self-discovery experience that turns your name and birth date into a practical pattern map.",
    image: "/frames/book-transparent.png",
  },
  {
    eyebrow: "Daily practice",
    title: "NUMI Compass",
    text: "Short daily reflections, prompts, and decision cues built around your current life cycle.",
    image: "/frames/frame-2.png",
  },
  {
    eyebrow: "Advanced",
    title: "Mentor Sessions",
    text: "Deeper teachings and cohort experiences for relationships, wealth, leadership, and reinvention.",
    image: "/dr-keith.jpg",
  },
]

const stories = [
  { name: "Sarah", role: "Founder", quote: "I finally saw why I kept choosing speed over alignment." },
  { name: "Marcus", role: "Operator", quote: "NUMI gave me language for patterns I thought were just stress." },
  { name: "Emma", role: "Creator", quote: "The daily prompts made big life decisions feel less chaotic." },
]

const faqs = [
  {
    q: "Is NUMI fortune telling?",
    a: "No. This prototype frames numerology as a reflective pattern language, not prediction. The product experience focuses on awareness, decisions, habits, and guided self-inquiry.",
  },
  {
    q: "What makes the Mindvalley-style structure useful here?",
    a: "The structure creates momentum: hero promise, credibility, product world, clear pathways, social proof, deeper offers, and repeated calls to action. It lets users feel the brand before they buy.",
  },
  {
    q: "Can this become the actual NUMI website?",
    a: "Yes. The current page is a high-fidelity prototype. The next step would be replacing placeholder proof points with real traction, testimonials, product screenshots, and conversion tracking.",
  },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function Home() {
  const [selectedPath, setSelectedPath] = useState(pathways[0])
  const [openFaq, setOpenFaq] = useState(0)

  const activeNumber = useMemo(() => {
    const index = pathways.findIndex((path) => path.title === selectedPath.title)
    return [3, 6, 8, 9][index] ?? 3
  }, [selectedPath])

  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <button onClick={() => scrollToId("hero")} className="font-serif text-2xl font-bold tracking-wide text-gold">
            NUMI
          </button>
          <div className="hidden items-center gap-7 text-sm text-white/70 md:flex">
            <button onClick={() => scrollToId("journey")} className="transition hover:text-white">Journey</button>
            <button onClick={() => scrollToId("pathways")} className="transition hover:text-white">Pathways</button>
            <button onClick={() => scrollToId("programs")} className="transition hover:text-white">Programs</button>
            <button onClick={() => scrollToId("faq")} className="transition hover:text-white">FAQ</button>
          </div>
          <button
            onClick={() => scrollToId("quiz")}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-black transition hover:bg-gold-bright"
          >
            Begin <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      </header>

      <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="/frames/frame-1.png"
            alt="NUMI Pattern Code book in a cinematic numerology scene"
            fill
            priority
            className="object-cover object-center opacity-65"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(216,184,106,0.18),transparent_28%),linear-gradient(90deg,#050507_0%,rgba(5,5,7,0.72)_42%,rgba(5,5,7,0.2)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050507] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-black/45 px-4 py-2 text-sm text-gold shadow-gold-glow">
              <Sparkles className="h-4 w-4" />
              Pattern intelligence for modern self-discovery
            </div>
            <h1 className="font-serif text-5xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Your life has a code.
              <span className="block text-gold">Learn how to read it.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              NUMI turns your name, birth date, and lived patterns into a guided map for clearer decisions,
              relationships, wealth habits, and purpose.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollToId("quiz")}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-black transition hover:bg-gold"
              >
                Get my Pattern Code <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollToId("journey")}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:border-gold/60 hover:text-gold"
              >
                <Play className="h-5 w-5" /> Explore the experience
              </button>
            </div>
          </div>

          <div id="quiz" className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="absolute -inset-5 rounded-[2rem] bg-gold/15 blur-3xl" />
            <div className="relative rounded-[1.75rem] border border-white/12 bg-black/68 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gold">Live demo</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold">Mini Pattern Scan</h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-2xl font-black text-black">
                  {activeNumber}
                </div>
              </div>
              <div className="space-y-4">
                <input className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-gold/70" placeholder="Full name" />
                <input type="date" className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-white outline-none transition focus:border-gold/70" />
                <div className="grid grid-cols-2 gap-3">
                  {pathways.map((path) => (
                    <button
                      key={path.title}
                      onClick={() => setSelectedPath(path)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        selectedPath.title === path.title
                          ? "border-gold bg-gold/15 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                      }`}
                    >
                      <path.icon className="mb-3 h-5 w-5 text-gold" />
                      <span className="text-sm font-bold">{path.title}</span>
                    </button>
                  ))}
                </div>
                <button className="w-full rounded-2xl bg-gold px-5 py-4 font-black text-black transition hover:bg-gold-bright">
                  Reveal my first insight
                </button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/45">
                <Lock className="h-4 w-4" /> Prototype only. No data is submitted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white/42">
          <span>Self-awareness</span>
          <span>Decision clarity</span>
          <span>Relationship insight</span>
          <span>Wealth rhythm</span>
          <span>Daily practice</span>
        </div>
      </section>

      <section id="journey" className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">Begin your journey</p>
            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">
              A transformation platform built around pattern recognition.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              Inspired by modern learning platforms, NUMI can feel like a living ecosystem: short insights,
              immersive teachings, mobile rituals, guided sessions, and deeper programs.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              ["01", "Discover", "Enter simple personal data and receive your first Core Number reflection."],
              ["02", "Decode", "Translate numbers into language for behavior, emotion, money, and timing."],
              ["03", "Integrate", "Use daily prompts and deeper tracks to make the insight practical."],
            ].map(([num, title, text]) => (
              <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
                <span className="text-sm font-black text-gold">{num}</span>
                <h3 className="mt-8 font-serif text-3xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pathways" className="bg-[#090D1A] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">Choose your path</p>
            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">Tell NUMI where you want clarity.</h2>
            <p className="mt-6 text-lg leading-8 text-white/62">{selectedPath.copy}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              {pathways.map((path) => (
                <button
                  key={path.title}
                  onClick={() => setSelectedPath(path)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 font-bold transition ${
                    selectedPath.title === path.title
                      ? "border-gold bg-gold text-black"
                      : "border-white/12 bg-white/5 text-white/70 hover:border-gold/50"
                  }`}
                >
                  <path.icon className="h-4 w-4" /> {path.title}
                </button>
              ))}
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
            <Image
              src="/persona/sarah%20chen.png"
              alt="NUMI learner reflecting in a warm cafe workspace"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
              <div className="mb-5 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-black">
                Pattern {activeNumber}
              </div>
              <h3 className="font-serif text-4xl font-bold">{selectedPath.title} clarity track</h3>
              <p className="mt-3 max-w-xl leading-7 text-white/72">
                A focused sequence of reflections, lessons, and practical prompts tailored to the area you selected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">The NUMI ecosystem</p>
              <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">One brand, multiple depths of transformation.</h2>
            </div>
            <button className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-6 py-3 font-bold text-white/78 transition hover:border-gold hover:text-gold">
              Browse programs <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {programs.map((program) => (
              <article key={program.title} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04]">
                <div className="relative h-72 overflow-hidden bg-black">
                  <Image src={program.image} alt="" fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">{program.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-3xl font-bold">{program.title}</h3>
                  <p className="mt-4 leading-7 text-white/58">{program.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-32">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-gold-700">Social proof</p>
            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">Stories that make the system feel real.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {stories.map((story) => (
              <figure key={story.name} className="rounded-[1.25rem] border border-black/10 bg-stone-50 p-6">
                <div className="mb-7 flex gap-1 text-gold-700">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="leading-7 text-black/72">&quot;{story.quote}&quot;</blockquote>
                <figcaption className="mt-6 font-bold">
                  {story.name}
                  <span className="block text-sm font-medium text-black/45">{story.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto w-full max-w-lg">
            <Image src="/frames/frame-3.png" alt="NUMI mobile and product visual" width={1402} height={1122} className="rounded-[2rem] border border-white/10 shadow-2xl" />
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">Available everywhere</p>
            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">A daily companion, not a one-time reading.</h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              The best version of NUMI should feel portable: a daily check-in, a learning library, a relationship mirror,
              and a personal strategy dashboard in one calm interface.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                [CalendarDays, "Daily cues"],
                [BookOpen, "Deep guides"],
                [Users, "Community"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <Icon className="h-6 w-6 text-gold" />
                  <p className="mt-4 font-bold">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#090D1A] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">FAQ</p>
            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">Questions before the next iteration.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <button
                key={faq.q}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 text-left"
              >
                <span className="flex items-center justify-between gap-5 font-bold">
                  {faq.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition ${openFaq === index ? "rotate-180" : ""}`} />
                </span>
                {openFaq === index && <p className="mt-4 leading-7 text-white/62">{faq.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-gold/25 bg-[radial-gradient(circle_at_50%_0%,rgba(216,184,106,0.22),transparent_35%),rgba(255,255,255,0.045)] p-8 text-center sm:p-14">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-black">
            <WandSparkles className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">Become 1% clearer every day.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
            Use this prototype to feel the direction: premium, immersive, emotional, and product-led.
            The next pass can connect the real calculator, lead capture, analytics, and app waitlist.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button onClick={() => scrollToId("quiz")} className="inline-flex items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 font-black text-black transition hover:bg-gold-bright">
              Try the prototype <ArrowRight className="h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-7 py-4 font-bold text-white/75 transition hover:border-white/35 hover:text-white">
              <Download className="h-5 w-5" /> Download guide
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-white/42 sm:flex-row sm:items-center">
          <p className="font-serif text-2xl font-bold text-gold">NUMI</p>
          <p>Prototype inspired by premium transformation-platform patterns. Built for learning and testing.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
