import React from "react"
import clsx from "clsx"

interface ProgressiveBlurProps {
  className?: string
  direction?: "left" | "right"
  blurIntensity?: number
}

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className,
  direction = "left",
  blurIntensity = 1,
}) => {
  const gradient =
    direction === "left"
      ? `linear-gradient(to right, rgba(255,255,255,${blurIntensity}), transparent)`
      : `linear-gradient(to left, rgba(255,255,255,${blurIntensity}), transparent)`

  return (
    <div
      className={clsx("h-full w-20", className)}
      style={{ backgroundImage: gradient }}
    />
  )
}
