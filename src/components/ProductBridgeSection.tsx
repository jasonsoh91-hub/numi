"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section, Container } from "./ui/Section";
import { Button } from "./ui/Button";
import { productBridgeFeatures } from "@/data/benefits";

export function ProductBridgeSection() {
  return (
    <Section id="numi-ai" className="bg-cosmic-navy/30">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            {/* Eyebrow */}
            <span className="text-gold font-medium tracking-wide uppercase text-sm">
              The guide reveals one layer.
            </span>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              NUMI reveals the full map.
            </h2>

            {/* Body */}
            <div className="space-y-4 text-text-secondary text-lg">
              <p>
                Your Core Number is the beginning. NUMI helps you go deeper into your personal patterns — how you think, love, earn, decide, succeed, and grow.
              </p>
              <p>
                With AI-powered interpretation, NUMI turns self-discovery into daily guidance you can actually use.
              </p>
            </div>

            {/* Feature bullets */}
            <ul className="space-y-3">
              {productBridgeFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-text-secondary">{feature.title}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button size="lg">
              Go Deeper with NUMI
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right: NUMI app mockup */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-gradient-to-br from-cosmic-blue via-cosmic-navy to-cosmic-black border border-gold-glow rounded-3xl shadow-gold-glow-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gold-glow/20">
                <h3 className="font-heading text-xl font-semibold text-gold">Your NUMI Dashboard</h3>
                <p className="text-text-muted text-sm">Welcome back</p>
              </div>

              {/* Cards */}
              <div className="p-6 space-y-4">
                {[
                  { label: "Thinking Pattern", value: "Strategic Analyst" },
                  { label: "Love Pattern", value: "Deep Connector" },
                  { label: "Today's Guidance", value: "Trust your intuition" },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="p-4 bg-cosmic-black/60 border border-gold-glow/20 rounded-xl hover:border-gold/40 transition-colors duration-200"
                  >
                    <p className="text-text-muted text-xs uppercase tracking-wide mb-1">
                      {card.label}
                    </p>
                    <p className="text-text-primary font-medium">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* AI indicator */}
              <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-purple-gold flex items-center justify-center shadow-gold-glow animate-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
