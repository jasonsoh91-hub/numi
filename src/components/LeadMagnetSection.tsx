"use client";

import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Section, Container } from "./ui/Section";
import { Button } from "./ui/button";

export function LeadMagnetSection() {
  const scrollToForm = () => {
    const element = document.querySelector("#email-capture");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="pattern-code">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: PDF mockup */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="relative w-72 h-96 sm:w-80 sm:h-[440px]">
              {/* Book spine effect */}
              <div className="absolute left-2 top-0 bottom-0 w-3 bg-gradient-to-r from-gold/80 to-gold/40 rounded-l-lg" />

              {/* Front cover */}
              <div className="absolute inset-0 pl-6 bg-gradient-to-br from-cosmic-blue via-cosmic-navy to-cosmic-black border border-gold-glow rounded-r-3xl rounded-l-sm shadow-gold-glow-lg overflow-hidden">
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-numi rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow">
                    <BookOpen className="w-8 h-8 text-cosmic-black" />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-bold text-gold">The Pattern Code</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Why You Think, Love, Earn & Decide the Way You Do
                    </p>
                  </div>

                  {/* Free badge */}
                  <div className="px-4 py-1 rounded-full bg-gold/20 border border-gold/40">
                    <span className="text-gold text-sm font-semibold">FREE GUIDE</span>
                  </div>

                  {/* Divider */}
                  <div className="w-16 h-0.5 bg-gradient-gold" />

                  {/* Subtitle */}
                  <p className="text-text-muted text-xs">
                    Calculate your Core Number. Unlock your first Pattern Insight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Eyebrow */}
            <span className="text-gold font-medium tracking-wide uppercase text-sm">
              Start with your Core Number.
            </span>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              The Pattern Code gives you your first mirror.
            </h2>

            {/* Body */}
            <div className="space-y-4 text-text-secondary text-lg">
              <p>
                The Pattern Code is a free self-discovery guide that helps you calculate your Core Number and understand one layer of your inner pattern.
              </p>
              <p>
                Your number may reveal how you think, love, earn, decide, lead, react, and repeat certain cycles.
              </p>
            </div>

            {/* CTA */}
            <Button size="lg" onClick={scrollToForm}>
              Get My Free Pattern Insight
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
