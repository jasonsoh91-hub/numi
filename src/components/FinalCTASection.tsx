"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "./ui/Section";
import { Button } from "./ui/Button";

export function FinalCTASection() {
  const scrollToForm = () => {
    const element = document.querySelector("#email-capture");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-glow/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-gold-glow/10 via-transparent to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <span className="text-gold font-medium tracking-wide uppercase text-sm">
            Ready to see your first pattern?
          </span>

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Find your Core Number and unlock your free Pattern Insight.
          </h2>

          {/* Subtext */}
          <p className="text-text-secondary text-xl">
            The guide reveals one layer. NUMI reveals the full map.
          </p>

          {/* CTA */}
          <Button size="lg" onClick={scrollToForm}>
            Get My Free Pattern Insight
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Microcopy */}
          <p className="text-text-muted text-sm">
            Free guide. Instant self-discovery. Go deeper with NUMI.
          </p>
        </div>
      </Container>
    </Section>
  );
}
