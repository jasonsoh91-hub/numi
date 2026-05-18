"use client";

import React from "react";
import { Calendar, Calculator, Sparkles } from "lucide-react";
import { Section, Container } from "./ui/Section";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const steps = [
  {
    icon: Calendar,
    number: "01",
    title: "Enter Your Birthdate",
    description: "Use your birthdate to calculate your Core Number.",
  },
  {
    icon: Calculator,
    number: "02",
    title: "Calculate Your Core Number",
    description: "Add the digits until you reach a number from 1 to 9. Each number connects to a different Pattern Code.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Go Deeper with NUMI",
    description: "The free guide reveals one layer. NUMI helps you unlock deeper thinking, love, wealth, decision, and success patterns with AI-powered guidance.",
  },
];

export function HowItWorksSection() {
  const scrollToForm = () => {
    const element = document.querySelector("#email-capture");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="how-it-works" className="bg-cosmic-navy/30">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          {/* Eyebrow */}
          <span className="text-gold font-medium tracking-wide uppercase text-sm">
            Simple. Personal. Immediate.
          </span>

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Find your Pattern Code in three steps.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} variant="elevated" className="relative group">
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow">
                  <span className="font-heading text-lg font-bold text-cosmic-black">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold/60 transition-colors duration-200">
                  <Icon className="w-7 h-7 text-gold" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-3 group-hover:text-gold transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" onClick={scrollToForm}>
            Find My Core Number
          </Button>
        </div>
      </Container>
    </Section>
  );
}
