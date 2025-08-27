"use client"
import { motion, useMotionValue, useTransform } from "framer-motion"
import React from "react"

export function TiltImage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // map cursor offsets → rotation
  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    x.set(offsetX)
    y.set(offsetY)
  }

  const handleMouseLeave = () => {
    // reset smoothly
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{
        type: "spring",
        stiffness: 80, // lower = more bouncy
        damping: 15,   // higher = less oscillation
        mass: 0.8,
      }}
      className="relative mx-auto mt-32 max-w-2xl cursor-pointer"
    >
      <motion.img
        src="/landing.png"
        alt="Background"
        className="rounded-2xl border border-border/50 shadow-2xl object-cover 
          brightness-90 contrast-110 saturate-120 
          [mask-image:linear-gradient(to_bottom,#000_80%,transparent_100%)]"
        transition={{ duration: 0.6, ease: "easeOut" }} // slow fade-in on movement
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-black/20 to-transparent mix-blend-multiply" />
      {/* Grid overlay */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] 
        [background-size:16px_16px] opacity-10 mix-blend-overlay" />
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_0_80px_-20px_rgba(59,130,246,0.6)]" />
    </motion.div>
  )
}
