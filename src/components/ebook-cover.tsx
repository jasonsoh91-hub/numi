"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export function EbookCover({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ rotateY: -30, rotateX: 10 }}
        animate={{ rotateY: -15, rotateX: 5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
        className="relative"
        style={{ perspective: 1000 }}
      >
        {/* Book Shadow */}
        <div className="absolute inset-0 bg-black/50 blur-3xl scale-90" />

        {/* 3D Book Container */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Front Cover */}
          <div className="relative w-64 h-80 md:w-80 md:h-96 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-r-lg rounded-l-sm shadow-2xl border-2 border-amber-500/50 overflow-hidden">
            {/* Spine Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-slate-900 border-r border-amber-500/30" />

            {/* Golden Border Frame */}
            <div className="absolute inset-3 border border-amber-500/40 rounded" />
            <div className="absolute inset-4 border border-amber-500/20 rounded" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
              {/* Sparkles Icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400 blur-xl" />
                  <Sparkles className="relative w-10 h-10 text-amber-400" />
                </div>
              </motion.div>

              {/* NUMI Logo */}
              <div className="text-xl font-bold tracking-[0.3em] text-white mb-2">
                <span className="text-amber-400">NUMI</span>
              </div>

              {/* Decorative Line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />

              {/* Main Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 leading-tight tracking-wide">
                THE PATTERN
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent mb-4 leading-tight tracking-wide">
                CODE
              </h2>

              {/* Decorative Line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />

              {/* Subtitle */}
              <p className="text-white/70 text-xs uppercase tracking-widest mb-6 leading-relaxed">
                Decode the Hidden Pattern<br />of Your Life
              </p>

              {/* Geometric Pattern */}
              <svg className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-12 opacity-30" viewBox="0 0 100 40">
                {/* Connected dots pattern */}
                <circle cx="10" cy="20" r="2" fill="currentColor" className="text-amber-400" />
                <circle cx="30" cy="10" r="2" fill="currentColor" className="text-amber-400" />
                <circle cx="30" cy="30" r="2" fill="currentColor" className="text-amber-400" />
                <circle cx="50" cy="20" r="2" fill="currentColor" className="text-amber-400" />
                <circle cx="70" cy="10" r="2" fill="currentColor" className="text-amber-400" />
                <circle cx="70" cy="30" r="2" fill="currentColor" className="text-amber-400" />
                <circle cx="90" cy="20" r="2" fill="currentColor" className="text-amber-400" />
                {/* Lines */}
                <path d="M10 20 L30 10 M30 10 L30 30 M30 30 L10 20 M30 10 L50 20 M30 30 L50 20 M50 20 L70 10 M50 20 L70 30 M70 10 L90 20 M70 30 L90 20" stroke="currentColor" strokeWidth="0.5" className="text-amber-400/50" />
              </svg>

              {/* Corner Decorations */}
              <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-amber-500/40" />
              <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-amber-500/40" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-amber-500/40" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-amber-500/40" />
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Book Spine (3D effect) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-b from-slate-950 via-amber-900/20 to-slate-950 origin-left"
            style={{ transform: "rotateY(-90deg) translateZ(-4px)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Smaller version for cards
export function EbookCoverSmall({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-32 h-40 md:w-40 md:h-48 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-r-lg rounded-l-sm shadow-xl border border-amber-500/50 overflow-hidden">
        {/* Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-slate-950 to-slate-900 border-r border-amber-500/30" />

        {/* Border */}
        <div className="absolute inset-1 border border-amber-500/30 rounded" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-3 text-center">
          <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
          <div className="text-[10px] font-bold text-white tracking-widest mb-1">
            <span className="text-amber-400">NUMI</span>
          </div>
          <h2 className="text-sm font-bold text-white leading-tight">
            THE PATTERN
          </h2>
          <h3 className="text-sm font-bold text-amber-400 leading-tight">
            CODE
          </h3>
          <p className="text-[8px] text-white/50 mt-1 leading-tight">
            Decode the Hidden<br />Pattern of Your Life
          </p>
        </div>

        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      </div>
    </div>
  );
}
