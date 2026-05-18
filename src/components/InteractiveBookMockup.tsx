"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface InteractiveBookMockupProps {
  className?: string;
}

export function InteractiveBookMockup({ className = "" }: InteractiveBookMockupProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();

  // Frame sequence: 1 → 2 → 3 → 4 → 5 → 4 → 3 → 2 → 1 (10 steps total)
  const frameSequence = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const totalFrames = frameSequence.length;

  const getFrameFromPosition = useCallback((x: number, width: number) => {
    const percentage = Math.max(0, Math.min(1, x / width));
    const frameIndex = Math.floor(percentage * (totalFrames - 1));
    return frameSequence[frameIndex];
  }, [totalFrames]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const frame = getFrameFromPosition(x, rect.width);
    setCurrentFrame(frame);
    setIsHovering(true);
  }, [getFrameFromPosition, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const frame = getFrameFromPosition(x, rect.width);
    setCurrentFrame(frame);
    setIsHovering(true);
  }, [getFrameFromPosition, prefersReducedMotion]);

  // Auto-animate when hovering (optional subtle movement)
  useEffect(() => {
    if (prefersReducedMotion || !isHovering) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let startTime: number | null = null;
    let direction = 1;
    let currentIndex = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Move to next frame every 800ms
      if (elapsed > 800) {
        currentIndex = (currentIndex + direction) % (totalFrames - 1);

        // Reverse direction at ends
        if (currentIndex === 0) direction = 1;
        if (currentIndex === totalFrames - 2) direction = -1;

        setCurrentFrame(frameSequence[currentIndex]);
        startTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering, prefersReducedMotion, totalFrames]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative interactive-book-mockup ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsHovering(false)}
      style={{ cursor: prefersReducedMotion ? 'default' : 'ew-resize' }}
    >
      {/* Cosmic ambient glow that matches frame backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/15 to-transparent blur-[100px] rounded-full" />
      <div className="absolute inset-0 bg-[#D8B86A]/10 blur-[80px] rounded-full animate-pulse-slow" />
      <div className="absolute inset-0 from-amber-500/5 to-purple-500/5 bg-gradient-to-tr blur-[120px] rounded-full" />

      {/* Frame images - let them blend naturally */}
      <div className="relative w-full h-full">
        {frameSequence.map((frameNum, index) => (
          <div
            key={`frame-${index}`}
            className={`absolute inset-0 transition-all duration-400 ${
              currentFrame === frameNum ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Main image - no blend mode, just brightness boost */}
            <img
              src={`/frames/frame-${frameNum}.png`}
              alt={`The Pattern Code book - frame ${frameNum}`}
              className="w-full h-full object-contain"
              style={{
                filter: 'brightness(1.08) contrast(1.05) saturate(1.1)',
              }}
            />
            {/* Edge vignette to soften boundaries */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 50%, rgba(10, 14, 39, 0.3) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Cursor indicator (shown on hover) */}
      {isHovering && !prefersReducedMotion && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white/60 text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>Move cursor</span>
        </div>
      )}

      {/* Touch indicator for mobile */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white/60 text-xs">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span>Swipe to explore</span>
      </div>

      {/* Progress dots */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              currentFrame === num
                ? 'bg-[#D8B86A] w-4'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Smaller version for cards
export function InteractiveBookMockupSmall({ className = "" }: InteractiveBookMockupProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const frameSequence = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const totalFrames = frameSequence.length;

  const handleInteraction = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const frameIndex = Math.floor(percentage * (totalFrames - 1));
    setCurrentFrame(frameSequence[frameIndex]);
  }, [totalFrames]);

  return (
    <div
      ref={containerRef}
      className={`relative w-40 h-48 interactive-book-mockup-small ${className}`}
      onMouseMove={(e) => handleInteraction(e.clientX)}
      onTouchMove={(e) => handleInteraction(e.touches[0].clientX)}
    >
      {frameSequence.map((frameNum, index) => (
        <img
          key={`frame-small-${index}`}
          src={`/frames/frame-${frameNum}.png`}
          alt={`The Pattern Code - frame ${frameNum}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${
            currentFrame === frameNum ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
