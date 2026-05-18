"use client";

import React from "react";
import { Section, Container } from "./ui/Section";
import { Card } from "./ui/Card";

const painPoints = [
  {
    title: "Overthinking decisions",
    description: "You replay scenarios in your head, second-guessing choices that should feel simple.",
  },
  {
    title: "Repeating relationship dynamics",
    description: "Different partners, same patterns. You wonder why history keeps repeating itself.",
  },
  {
    title: "Feeling stuck between ambition and alignment",
    description: "You achieve outward success but sense a deeper disconnect from your true path.",
  },
  {
    title: "Wanting clarity but getting generic advice",
    description: "One-size-fits-all wisdom doesn't fit when your inner world feels unique and complex.",
  },
  {
    title: "Using multiple tools that feel disconnected",
    description: "Astrology here, Human Design there, but nothing connects it into one clear picture.",
  },
];

export function ProblemSection() {
  return (
    <Section className="bg-cosmic-navy/30">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            {/* Eyebrow */}
            <span className="text-gold font-medium tracking-wide uppercase text-sm">
              Your patterns are not random.
            </span>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              You keep repeating certain patterns — but no one taught you how to read them.
            </h2>

            {/* Body */}
            <div className="space-y-4 text-text-secondary text-lg">
              <p>
                The way you make decisions, choose relationships, handle money, lead others, react under pressure, and search for meaning may not be random.
              </p>
              <p>
                Most self-discovery tools give you labels. NUMI helps you understand the pattern underneath them.
              </p>
            </div>
          </div>

          {/* Right: Pain point cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {painPoints.map((point, index) => (
              <Card key={index} variant="glass" hover className="group">
                <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-gold transition-colors duration-200">
                  {point.title}
                </h3>
                <p className="text-text-secondary text-sm mt-2">
                  {point.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
