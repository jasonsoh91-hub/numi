"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

interface ShootingStar {
  id: number
  x: number
  y: number
  delay: number
}

interface NebulaLayer {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  duration: number
}

export function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const [nebulae, setNebulae] = useState<NebulaLayer[]>([])
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([])

  useEffect(() => {
    // Generate stars - SLOWER animation
    const newStars: Star[] = []
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 8 + 10, // Much slower: 10-18s instead of 2-5s
        delay: Math.random() * 8,
        opacity: Math.random() * 0.5 + 0.3 // Reduced range for subtlety
      })
    }
    setStars(newStars)

    // Generate shooting stars - LESS frequent, SLOWER
    const newShootingStars: ShootingStar[] = []
    for (let i = 0; i < 3; i++) { // Reduced from 5 to 3
      newShootingStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        delay: i * 20 + Math.random() * 10 // Much less frequent: every 20-30s
      })
    }
    setShootingStars(newShootingStars)

    // Generate nebulae - SLOWER, subtler
    const newNebulae: NebulaLayer[] = [
      { id: 1, x: 10, y: 20, size: 60, color: "rgba(139, 92, 246, 0.08)", opacity: 0.2, duration: 60 }, // Much slower
      { id: 2, x: 80, y: 70, size: 50, color: "rgba(220, 20, 60, 0.06)", opacity: 0.15, duration: 80 },
      { id: 3, x: 50, y: 50, size: 70, color: "rgba(212, 175, 55, 0.05)", opacity: 0.12, duration: 90 },
      { id: 4, x: 20, y: 80, size: 40, color: "rgba(74, 28, 107, 0.06)", opacity: 0.15, duration: 70 },
      { id: 5, x: 70, y: 15, size: 55, color: "rgba(13, 79, 79, 0.05)", opacity: 0.12, duration: 75 }
    ]
    setNebulae(newNebulae)

    // Generate floating particles - SLOWER
    const newParticles: Array<{ id: number; x: number; y: number; duration: number; delay: number }> = []
    for (let i = 0; i < 20; i++) { // Reduced from 30 to 20
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 30 + 40, // Much slower: 40-70s
        delay: Math.random() * 15
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base gradient - darker for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#030308] to-[#000005]" />

      {/* Nebulae layers - SLOWER, subtler */}
      {nebulae.map((nebula) => (
        <motion.div
          key={nebula.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}vw`,
            height: `${nebula.size}vw`,
            background: nebula.color,
          }}
          animate={{
            scale: [1, 1.15, 1], // Reduced from 1.3 to 1.15
            opacity: [nebula.opacity * 0.7, nebula.opacity, nebula.opacity * 0.7], // Less variation
          }}
          transition={{
            duration: nebula.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Stars - SLOWER twinkling */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5], // Less variation
            scale: [1, 1.1, 1], // Reduced from 1.2 to 1.1
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Larger glowing stars - SLOWER */}
      {stars.filter(s => s.size > 1.8).map((star) => (
        <motion.div
          key={`glow-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size * 4,
            height: star.size * 4,
            background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)", // Reduced opacity
          }}
          animate={{
            opacity: [0.15, 0.35, 0.15], // Reduced from 0.2-0.5 to 0.15-0.35
            scale: [1, 1.3, 1], // Reduced from 1.5 to 1.3
          }}
          transition={{
            duration: star.duration * 1.5,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating particles - SLOWER */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: "1.5px", // Slightly smaller
            height: "1.5px",
            background: "rgba(212, 175, 55, 0.4)", // Reduced opacity
          }}
          animate={{
            y: [`${particle.y}%`, `${particle.y - 15}%`, `${particle.y}%`], // Reduced movement
            opacity: [0.15, 0.4, 0.15], // Reduced variation
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Shooting stars - SLOWER, less frequent */}
      {shootingStars.map((shootingStar) => (
        <motion.div
          key={shootingStar.id}
          className="absolute"
          style={{
            left: `${shootingStar.x}%`,
            top: `${shootingStar.y}%`,
          }}
          animate={{
            x: [0, 250], // Reduced distance
            y: [0, 120], // Reduced distance
            opacity: [0, 0.8, 0], // Reduced max opacity
          }}
          transition={{
            duration: 3, // Increased from 1.5s to 3s
            repeat: Infinity,
            delay: shootingStar.delay,
            ease: "easeOut"
          }}
        >
          <div className="relative">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent" /> // Reduced opacity
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-white/80 rounded-full" /> // Reduced opacity
          </div>
        </motion.div>
      ))}

      {/* Cosmic dust layer - REDUCED opacity */}
      <div className="absolute inset-0 opacity-15"> {/* Reduced from 0.3 to 0.15 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,92,246,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(220,20,60,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]" />
      </div>
    </div>
  )
}

// Simplified version for sections behind content
export function SpaceSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Animated space background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050510] to-[#000005]" />

        {/* Animated nebula - SLOWER */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(139, 92, 246, 0.1)" }}
          animate={{
            scale: [1, 1.1, 1], // Reduced movement
            x: [0, 30, 0], // Reduced movement
            y: [0, 15, 0], // Reduced movement
          }}
          transition={{
            duration: 60, // Increased from 20s to 60s
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(220, 20, 60, 0.08)" }}
          animate={{
            scale: [1, 1.15, 1], // Reduced movement
            x: [0, -25, 0], // Reduced movement
            y: [0, -12, 0], // Reduced movement
          }}
          transition={{
            duration: 75, // Increased from 25s to 75s
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "rgba(212, 175, 55, 0.06)" }}
          animate={{
            scale: [1, 1.05, 1], // Barely any movement
            opacity: [0.2, 0.3, 0.2], // Reduced variation
          }}
          transition={{
            duration: 45, // Increased from 15s to 45s
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Stars - SLOWER */}
        {[...Array(40)].map((_, i) => ( // Reduced from 50 to 40
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3], // Reduced variation
              scale: [1, 1.2, 1], // Reduced movement
            }}
            transition={{
              duration: Math.random() * 6 + 8, // Increased: 8-14s instead of 2-5s
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating particles - SLOWER */}
        {[...Array(10)].map((_, i) => ( // Reduced from 15 to 10
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full w-1 h-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(212, 175, 55, 0.4)", // Reduced opacity
            }}
            animate={{
              y: [0, -20, 0], // Reduced movement
              x: [0, Math.random() * 10 - 5, 0], // Reduced movement
              opacity: [0.15, 0.4, 0.15], // Reduced variation
            }}
            transition={{
              duration: Math.random() * 20 + 25, // Increased: 25-45s instead of 10-20s
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
