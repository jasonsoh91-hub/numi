"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Section, Container } from "./ui/Section";
import { Card } from "./ui/Card";
import { Button } from "./ui/button";
import { calculateCoreNumber, isValidBirthdate } from "@/lib/calculateCoreNumber";
import { patternCodes } from "@/data/patternCodes";

interface FormData {
  firstName: string;
  email: string;
  birthdate: string;
}

export function EmailCaptureSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coreNumber, setCoreNumber] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Calculate Core Number when birthdate changes
    if (name === "birthdate" && value) {
      const calculated = calculateCoreNumber(value);
      setCoreNumber(calculated);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.birthdate) {
      newErrors.birthdate = "Date of birth is required";
    } else if (!isValidBirthdate(formData.birthdate)) {
      newErrors.birthdate = "Please enter a valid birthdate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    const pattern = coreNumber ? patternCodes.find((p) => p.number === coreNumber) : null;

    return (
      <Section id="email-capture">
        <Container>
          <Card variant="elevated" className="max-w-2xl mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>

            <h2 className="font-heading text-3xl font-semibold text-text-primary mb-4">
              Your Pattern Insight is ready.
            </h2>

            {pattern && (
              <div className="mb-8 p-6 bg-cosmic-black/60 rounded-2xl border border-gold-glow">
                <p className="text-text-secondary text-sm mb-2">Your Core Number is</p>
                <p className="font-heading text-5xl font-bold text-gold mb-3">{pattern.number}</p>
                <p className="font-heading text-xl font-semibold text-gold mb-2">{pattern.name}</p>
                <p className="text-text-secondary italic">"{pattern.line}"</p>
              </div>
            )}

            <p className="text-text-secondary text-lg mb-8">
              Check your inbox for The Pattern Code and go deeper with NUMI.
            </p>

            <Button size="lg">Go Deeper with NUMI</Button>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="email-capture" className="bg-cosmic-navy/30">
      <Container>
        <Card variant="elevated" className="max-w-xl mx-auto">
          <div className="text-center mb-8 space-y-4">
            {/* Eyebrow */}
            <span className="text-gold font-medium tracking-wide uppercase text-sm">
              Free guide
            </span>

            {/* Headline */}
            <h2 className="font-heading text-3xl font-semibold">
              Get your free Pattern Code.
            </h2>

            {/* Body */}
            <p className="text-text-secondary">
              Enter your details and receive your free self-discovery guide to calculate your Core Number and unlock your first Pattern Insight.
            </p>
          </div>

          {/* Live Core Number preview */}
          {coreNumber && !errors.birthdate && (
            <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <span className="font-heading text-xl font-bold text-cosmic-black">
                  {coreNumber}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-text-primary font-medium">Your Core Number: {coreNumber}</p>
                <p className="text-text-muted text-sm">
                  {patternCodes.find((p) => p.number === coreNumber)?.name}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium text-text-secondary">
                First name <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full bg-cosmic-black/80 border border-gold-glow rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold-glow transition-all duration-200"
              />
              {errors.firstName && <p className="text-sm text-red-400">{errors.firstName}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-text-secondary">
                Email address <span className="text-gold">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full bg-cosmic-black/80 border border-gold-glow rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold-glow transition-all duration-200"
              />
              {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Birthdate */}
            <div className="flex flex-col gap-2">
              <label htmlFor="birthdate" className="text-sm font-medium text-text-secondary">
                Date of birth <span className="text-gold">*</span>
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-cosmic-black/80 border border-gold-glow rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold-glow transition-all duration-200"
              />
              {errors.birthdate && <p className="text-sm text-red-400">{errors.birthdate}</p>}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Calculating..." : "Get My Free Pattern Insight"}
            </Button>

            {/* Privacy microcopy */}
            <p className="text-center text-text-muted text-sm">
              We will only use your details to deliver your Pattern Insight and NUMI updates. No spam.
            </p>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
