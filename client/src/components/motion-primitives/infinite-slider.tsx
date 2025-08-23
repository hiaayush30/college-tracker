"use client"

import { motion, useAnimation } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

interface InfiniteSliderProps {
  children: React.ReactNode
  speed?: number          // duration of one full scroll
  speedOnHover?: number   // duration when hovered
  gap?: number            // px gap between items
}

export const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 32,
}) => {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Restart animation whenever speed changes
  useEffect(() => {
    const runAnimation = async () => {
      await controls.start({
        x: ["0%", "-50%"], // scroll half (since we duplicate children)
        transition: {
          ease: "linear",
          duration: isHovered ? speedOnHover : speed,
          repeat: Infinity,
        },
      })
    }
    runAnimation()
  }, [isHovered, speed, speedOnHover, controls])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={controls} className="flex shrink-0">
        <div
          className="flex shrink-0"
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
        <div
          className="flex shrink-0"
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
