"use client"

import { motion } from "framer-motion"

interface ReportMockupProps {
  className?: string
}

export function ReportMockup({ className = "" }: ReportMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className={`relative ${className}`}
      style={{
        width: "240px",
        height: "320px",
        transform: "perspective(800px) rotateY(-6deg) rotateX(2deg)",
      }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
      >
        {/* Main document */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #0F0F23, #1a1a35)",
            border: "1px solid rgba(216, 184, 106, 0.4)",
            boxShadow: "0 40px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Gold page edge effect (simulates gilded pages) */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[3px]"
            style={{ background: "rgba(216, 184, 106, 0.6)" }}
          />

          {/* NUMI wordmark at top */}
          <div className="absolute top-6 left-0 right-0 text-center">
            <span
              className="text-[10px] tracking-widest uppercase font-extralight"
              style={{ color: "#D8B86A" }}
            >
              NUMI
            </span>
          </div>

          {/* Geometric circle ornament */}
          <svg
            className="absolute top-16 left-1/2 -translate-x-1/2"
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            {/* Outer circle */}
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="rgba(216, 184, 106, 0.3)"
              strokeWidth="0.5"
            />
            {/* Middle circle */}
            <circle
              cx="40"
              cy="40"
              r="28"
              fill="none"
              stroke="rgba(216, 184, 106, 0.4)"
              strokeWidth="0.5"
            />
            {/* Inner circle */}
            <circle
              cx="40"
              cy="40"
              r="18"
              fill="none"
              stroke="rgba(216, 184, 106, 0.5)"
              strokeWidth="0.5"
            />
            {/* Center dot */}
            <circle
              cx="40"
              cy="40"
              r="2"
              fill="rgba(216, 184, 106, 0.6)"
            />
            {/* Decorative arcs */}
            <path
              d="M 40 2 A 38 38 0 0 1 78 40"
              fill="none"
              stroke="rgba(216, 184, 106, 0.2)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <path
              d="M 78 40 A 38 38 0 0 1 40 78"
              fill="none"
              stroke="rgba(216, 184, 106, 0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path
              d="M 40 78 A 38 38 0 0 1 2 40"
              fill="none"
              stroke="rgba(216, 184, 106, 0.2)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <path
              d="M 2 40 A 38 38 0 0 1 40 2"
              fill="none"
              stroke="rgba(216, 184, 106, 0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>

          {/* Title */}
          <div className="absolute top-40 left-0 right-0 text-center px-4">
            <h3
              className="text-xl md:text-2xl font-light leading-tight"
              style={{ color: "#FFFFFF", fontFamily: "serif" }}
            >
              The Pattern Code
            </h3>
          </div>

          {/* Subtitle */}
          <div className="absolute top-56 left-0 right-0 text-center px-4">
            <p
              className="text-[8px] tracking-widest uppercase"
              style={{ color: "#D8B86A" }}
            >
              A Structural Report by NUMI
            </p>
          </div>

          {/* Bottom separator */}
          <div
            className="absolute bottom-10 left-6 right-6 h-px"
            style={{ background: "rgba(216, 184, 106, 0.3)" }}
          />

          {/* Footer text */}
          <div className="absolute bottom-6 left-0 right-0 text-center px-4">
            <p
              className="text-[7px] tracking-wider"
              style={{ color: "rgba(255, 255, 255, 0.3)" }}
            >
              NUMI International · 2025
            </p>
          </div>
        </div>

        {/* Gold glow behind */}
        <div
          className="absolute inset-0 -z-10 rounded-lg blur-2xl"
          style={{
            background: "radial-gradient(ellipse at center, rgba(216, 184, 106, 0.15) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
