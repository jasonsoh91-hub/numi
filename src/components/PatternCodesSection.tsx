"use client";

import React from "react";
import { Section, Container } from "./ui/Section";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { patternCodes } from "@/data/patternCodes";

export function PatternCodesSection() {
  const scrollToForm = () => {
    const element = document.querySelector("#email-capture");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="pattern-types">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          {/* Eyebrow */}
          <span className="text-gold font-medium tracking-wide uppercase text-sm">
            Which one are you?
          </span>

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Meet the 9 Pattern Codes.
          </h2>

          {/* Body */}
          <p className="text-text-secondary text-lg">
            Each Core Number reflects a different way of moving through life. Your type is not a box. It is a starting point for understanding how your patterns show up.
          </p>
        </div>

        {/* Pattern cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {patternCodes.map((pattern) => (
            <Card key={pattern.number} variant="pattern" hover>
              {/* Number */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow">
                  <span className="font-heading text-xl font-bold text-cosmic-black">
                    {pattern.number}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h3 className="font-heading text-xl font-semibold text-gold mb-3">
                {pattern.name}
              </h3>

              {/* One-liner */}
              <p className="text-text-primary font-medium mb-3">
                {pattern.line}
              </p>

              {/* Traits */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {pattern.traits}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" onClick={scrollToForm}>
            Unlock My Pattern Code
          </Button>
        </div>
      </Container>
    </Section>
  );
}
