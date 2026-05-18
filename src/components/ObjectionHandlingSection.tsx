"use client";

import React from "react";
import { Section, Container } from "./ui/Section";

export function ObjectionHandlingSection() {
  return (
    <Section className="bg-cosmic-navy/30">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto">
            <span className="text-3xl">🔮</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold">
            This is not about predicting your life. It is about understanding your pattern.
          </h2>

          {/* Body */}
          <p className="text-text-secondary text-lg leading-relaxed">
            NUMI does not position your number as a fixed destiny. Your Pattern Code is a mirror — a way to reflect on how you think, love, earn, decide, lead, react, and grow.
          </p>

          <p className="text-text-secondary text-lg leading-relaxed">
            You are not locked into a number. You are learning how to read yourself more clearly.
          </p>
        </div>
      </Container>
    </Section>
  );
}
