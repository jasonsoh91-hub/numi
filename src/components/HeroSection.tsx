"use client";

import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "./ui/Button";
import { Container } from "./ui/Section";

export function HeroSection() {
  const scrollToForm = () => {
    const element = document.querySelector("#email-capture");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.querySelector("#how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-cosmic" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-glow/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-gold-glow/10 via-transparent to-transparent" />

      {/* Content */}
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
              <BookOpen className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">Free Self-Discovery Guide</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Discover the Pattern Behind How You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-bright">
                Think, Love, Earn & Decide
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Your Core Number can act like a mirror for the patterns you repeat — how you think, love, earn, decide, lead, react, and grow. Get your free Pattern Code and unlock your first NUMI Pattern Insight.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={scrollToForm}>
                Get My Free Pattern Insight
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="secondary" onClick={scrollToHowItWorks}>
                See How It Works
              </Button>
            </div>

            {/* Microcopy */}
            <p className="text-sm text-text-muted">
              Free guide. Simple calculation. No prediction — just self-understanding.
            </p>
          </div>

          {/* Right: Visual */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Floating cards */}
            <div className="relative w-80 h-96 sm:w-96 sm:h-[480px]">
              {/* Main card - PDF mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-blue to-cosmic-navy backdrop-blur-xl border border-gold-glow rounded-3xl shadow-gold-glow p-8 animate-float-slow">
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  {/* Number badge */}
                  <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow">
                    <span className="font-heading text-4xl font-bold text-cosmic-black">?</span>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-semibold text-gold">The Pattern Code</h3>
                    <p className="text-text-secondary text-sm">
                      Why You Think, Love, Earn & Decide the Way You Do
                    </p>
                  </div>

                  {/* Pattern hints */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["Thinking", "Love", "Earning", "Decisions", "Success"].map((label) => (
                      <span
                        key={label}
                        className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-medium"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* CTA hint */}
                  <div className="pt-4 border-t border-gold-glow/30">
                    <p className="text-text-muted text-sm">
                      Find your Core Number in under 60 seconds
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-radial from-gold-glow/30 to-transparent blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
