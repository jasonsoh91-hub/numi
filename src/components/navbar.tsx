"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
      isScrolled
        ? "bg-white/90 backdrop-blur-md shadow-soft-lg border border-primary/10"
        : "bg-white/70 backdrop-blur-sm border border-primary/10"
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-serif font-semibold text-primary-700 hover:text-primary-600 transition-colors">
              NUMI
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium cursor-pointer">
              About
            </a>
            <a href="#app" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium cursor-pointer">
              App
            </a>
            <a href="#explore" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium cursor-pointer">
              Explore
            </a>
            <a href="#partner" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium cursor-pointer">
              Partners
            </a>
            <a href="#contact" className="text-slate-600 hover:text-primary-600 transition-colors text-sm font-medium cursor-pointer">
              Contact
            </a>
            <Button className="bg-gradient-to-r from-primary-500 to-lavender-500 text-white hover:from-primary-600 hover:to-lavender-600 rounded-full px-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-105">
              Get Free Reading
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-primary-600 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10">
            <div className="flex flex-col space-y-4">
              <a
                href="#about"
                className="text-slate-600 hover:text-primary-600 transition-colors font-medium cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#app"
                className="text-slate-600 hover:text-primary-600 transition-colors font-medium cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                App
              </a>
              <a
                href="#explore"
                className="text-slate-600 hover:text-primary-600 transition-colors font-medium cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </a>
              <a
                href="#partner"
                className="text-slate-600 hover:text-primary-600 transition-colors font-medium cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Partners
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-primary-600 transition-colors font-medium cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button className="bg-gradient-to-r from-primary-500 to-lavender-500 text-white rounded-full w-full shadow-soft">
                Get Free Reading
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
