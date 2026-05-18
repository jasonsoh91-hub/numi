"use client";

import React from "react";

const footerLinks = {
  product: [
    { name: "The Pattern Code", href: "#pattern-code" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pattern Types", href: "#pattern-types" },
    { name: "NUMI AI", href: "#numi-ai" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gold-glow/20 bg-cosmic-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & tagline */}
          <div className="sm:col-span-2">
            <h3 className="font-heading text-2xl font-semibold text-gold mb-2">NUMI</h3>
            <p className="text-text-secondary">
              Understand your patterns. Align your next move.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-text-primary mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-text-primary mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gold-glow/10">
          <p className="text-text-muted text-sm text-center">
            NUMI is designed for self-reflection and personal growth. It does not provide medical, financial, or professional advice.
          </p>
          <p className="text-text-muted text-xs text-center mt-4">
            © {new Date().getFullYear()} NUMI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
