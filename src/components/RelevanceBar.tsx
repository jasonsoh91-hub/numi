"use client";

import React from "react";
import { Container } from "./ui/Section";

const features = [
  "Core Number Insight",
  "9 Pattern Codes",
  "AI-Powered Interpretation",
  "Thinking, Love, Wealth & Success Patterns",
  "Daily Guidance with NUMI",
];

export function RelevanceBar() {
  return (
    <div className="border-y border-gold-glow/20 bg-cosmic-navy/40 backdrop-blur-sm">
      <Container>
        <div className="py-6">
          <p className="text-center text-text-secondary text-sm mb-4">
            Built for seekers, self-discovery lovers, and anyone who feels there is more beneath the surface.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center px-4 py-2 rounded-full bg-cosmic-blue/60 border border-gold-glow/30 text-text-secondary text-sm font-medium hover:border-gold/60 hover:text-gold transition-all duration-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
