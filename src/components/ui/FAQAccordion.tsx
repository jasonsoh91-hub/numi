"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-cosmic-blue/60 backdrop-blur-md border border-gold-glow rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cosmic-navy/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
            aria-expanded={openIndex === index}
          >
            <span className="font-heading text-lg font-medium text-text-primary pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`flex-shrink-0 w-5 h-5 text-gold transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-5 text-text-secondary leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
