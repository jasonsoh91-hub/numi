"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { name: "The Pattern Code", href: "#pattern-code" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pattern Types", href: "#pattern-types" },
  { name: "NUMI AI", href: "#numi-ai" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cosmic-black/80 backdrop-blur-md border-b border-gold-glow/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="font-heading text-2xl md:text-3xl font-semibold text-gold">
            NUMI
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-text-secondary hover:text-gold transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
            <Button size="sm">Get My Free Insight</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-text-primary hover:text-gold transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cosmic-black/95 backdrop-blur-xl border-t border-gold-glow/20">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-text-secondary hover:text-gold transition-colors duration-200 text-base font-medium py-2"
              >
                {link.name}
              </button>
            ))}
            <Button fullWidth>Get My Free Insight</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
