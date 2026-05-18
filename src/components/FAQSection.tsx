"use client";

import React from "react";
import { Section, Container } from "./ui/Section";
import { FAQAccordion } from "./ui/FAQAccordion";
import { faqs } from "@/data/faq";

export function FAQSection() {
  return (
    <Section id="faq" className="bg-cosmic-navy/30">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            {/* Eyebrow */}
            <span className="text-gold font-medium tracking-wide uppercase text-sm">
              Common questions
            </span>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold">
              Frequently Asked Questions
            </h2>
          </div>

          <FAQAccordion items={faqs} />
        </div>
      </Container>
    </Section>
  );
}
