"use client";

import React from "react";
import { Brain, Heart, TrendingUp, GitBranch, Trophy, Sparkles } from "lucide-react";
import { Section, Container } from "./ui/Section";
import { Card } from "./ui/Card";
import { benefits } from "@/data/benefits";

const iconMap = {
  "Thinking Pattern": Brain,
  "Love Pattern": Heart,
  "Wealth Pattern": TrendingUp,
  "Decision Pattern": GitBranch,
  "Success Pattern": Trophy,
  "Daily AI Guidance": Sparkles,
};

export function BenefitsSection() {
  return (
    <Section>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold">
            What you unlock with your free Pattern Insight
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.title as keyof typeof iconMap] || Sparkles;

            // Make the first card span 2 columns on larger screens
            const isLarge = index === 0;

            return (
              <Card
                key={index}
                variant="glass"
                hover
                className={isLarge ? "sm:col-span-2" : ""}
              >
                <Icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
