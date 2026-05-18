"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface StaticBookMockupProps {
  className?: string;
}

export function StaticBookMockup({ className = "" }: StaticBookMockupProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't animate if prefers reduced motion
  const shouldAnimate = mounted && !prefersReducedMotion;

  return (
    <div className={`relative w-full max-w-3xl aspect-[4/5] flex items-center justify-center ${className}`}>

      {/* === ENERGY RINGS UNDER BOOK === */}
      <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 pointer-events-none">
        {/* Outer ring - largest, most subtle */}
        {shouldAnimate && (
          <div
            className="absolute rounded-full border border-[#D8B86A]/20"
            style={{
              width: "140%",
              height: "35%",
              left: "-20%",
              filter: "blur(1px)",
              animationName: "ringPulse",
              animationDuration: "6s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        )}
        {/* Middle ring */}
        {shouldAnimate && (
          <div
            className="absolute rounded-full border border-[#D8B86A]/30"
            style={{
              width: "110%",
              height: "28%",
              left: "-5%",
              filter: "blur(0.5px)",
              animationName: "ringPulse",
              animationDuration: "5s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: "1s",
            }}
          />
        )}
        {/* Inner ring - brightest */}
        {shouldAnimate && (
          <div
            className="absolute rounded-full border border-[#D8B86A]/40"
            style={{
              width: "85%",
              height: "22%",
              filter: "blur(0px)",
              animationName: "ringPulse",
              animationDuration: "4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: "0.5s",
            }}
          />
        )}
      </div>

      {/* === THIN CIRCULAR ENERGY RINGS UNDER BOOK === */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 pointer-events-none">
        {/* Outer ring - most subtle */}
        {shouldAnimate && (
          <div
            className="absolute rounded-full border border-[#D8B86A]/15"
            style={{
              width: "140%",
              height: "30%",
              left: "-20%",
              filter: "blur(0.5px)",
              animationName: "ringPulse",
              animationDuration: "6s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        )}
        {/* Middle ring */}
        {shouldAnimate && (
          <div
            className="absolute rounded-full border border-[#D8B86A]/25"
            style={{
              width: "110%",
              height: "24%",
              left: "-5%",
              animationName: "ringPulse",
              animationDuration: "5s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: "1s",
            }}
          />
        )}
        {/* Inner ring - brightest */}
        {shouldAnimate && (
          <div
            className="absolute rounded-full border border-[#D8B86A]/35"
            style={{
              width: "80%",
              height: "18%",
              left: "10%",
              animationName: "ringPulse",
              animationDuration: "4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: "0.5s",
            }}
          />
        )}
      </div>

      {/* === CINEMATIC GLOW BEHIND BOOK === */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Gold radial glow - reduced intensity */}
        <div
          className={`absolute rounded-full ${shouldAnimate ? "animate-pulse-slow" : ""}`}
          style={{
            width: "80%",
            height: "80%",
            background: "radial-gradient(circle, rgba(216, 184, 106, 0.12) 0%, rgba(216, 184, 106, 0.04) 50%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />
        {/* Blue/purple glow - reduced intensity */}
        <div
          className={`absolute rounded-full ${shouldAnimate ? "animate-pulse-slow" : ""}`}
          style={{
            width: "90%",
            height: "90%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 60%, transparent 80%)",
            filter: "blur(100px)",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* === PARTICLES AROUND BOOK (concentrated near center) === */}
      {shouldAnimate && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Golden particles - concentrated around book center */}
          {Array.from({ length: 20 }).map((_, i) => {
            const duration = 4 + Math.random() * 5;
            const delay = Math.random() * 3;
            // Concentrate particles in center 60% of the container
            const offsetX = 20 + Math.random() * 60;
            const offsetY = 20 + Math.random() * 60;
            return (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full bg-amber-400/15"
                style={{
                  left: `${offsetX}%`,
                  top: `${offsetY}%`,
                  width: `${1.5 + Math.random() * 2.5}px`,
                  height: `${1.5 + Math.random() * 2.5}px`,
                  filter: "blur(0.5px)",
                  animationName: "bookParticleFloat",
                  animationDuration: `${duration}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
          {/* Floating numerology particles around book */}
          {["1", "3", "5", "7", "9", "11", "22"].map((num, i) => {
            const duration = 10 + Math.random() * 6;
            const delay = i * 1.8;
            const blur = Math.random() > 0.5 ? "1.5px" : "0.5px";
            // Position numbers around the book center area
            const positions = [
              { left: 25, top: 20 },
              { left: 55, top: 18 },
              { left: 75, top: 25 },
              { left: 30, top: 55 },
              { left: 60, top: 60 },
              { left: 70, top: 45 },
              { left: 45, top: 35 },
            ];
            const pos = positions[i % positions.length];
            return (
              <div
                key={`num-${i}`}
                className="absolute text-amber-400/10 font-medium text-sm"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  filter: blur,
                  animationName: "numDrift",
                  animationDuration: `${duration}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${delay}s`,
                }}
              >
                {num}
              </div>
            );
          })}
        </div>
      )}

      {/* === BOOK CONTAINER WITH ANIMATIONS === */}
      <div
        className="relative z-10 w-full h-auto"
        style={
          shouldAnimate
            ? {
                animationName: "gentleRotate, breathing",
                animationDuration: "16s, 8s",
                animationTimingFunction: "ease-in-out, ease-in-out",
                animationIterationCount: "infinite, infinite",
                animationDirection: "alternate, alternate",
              }
            : undefined
        }
      >
        <img
          src="/frames/book-transparent.png"
          alt="The Pattern Code book"
          className="w-full h-full object-contain"
          style={{
            filter: "brightness(1.05) contrast(1.05) saturate(1.08) drop-shadow(0 40px 80px rgba(216,184,106,0.25))",
          }}
        />
      </div>

      {/* === CUSTOM KEYFRAMES === */}
      <style jsx>{`
        @keyframes bookParticleFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-8px, -15px) scale(0.9);
            opacity: 0.6;
          }
        }
        @keyframes numDrift {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          33% {
            transform: translate(10px, -18px);
            opacity: 0.7;
          }
          66% {
            transform: translate(-6px, -10px);
            opacity: 0.5;
          }
        }
        @keyframes ringPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

// Smaller version for cards
export function StaticBookMockupSmall({ className = "" }: StaticBookMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        src="/frames/book-transparent.png"
        alt="The Pattern Code book"
        className="w-full h-auto object-contain"
        style={{
          filter: "brightness(1.03) saturate(1.08)",
        }}
      />
    </div>
  );
}
