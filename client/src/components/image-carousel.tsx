"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const landingPageImages = [
  { name: "landing-light-1", href: "/landing-light-1.png" },
  { name: "landing-light-2", href: "/landing-light-2.png" },
  { name: "landing-light-3", href: "/landing-light-3.png" },
  { name: "landing-light-4", href: "/landing-light-4.png" },
  { name: "landing-light-5", href: "/landing-light-5.png" },
  { name: "landing-light-6", href: "/landing-light-6.png" }
]

const landingPageImagesDark = [
  { name: "landing-dark-1", href: "/landing-dark-1.png" },
  { name: "landing-dark-2", href: "/landing-dark-2.png" },
  { name: "landing-dark-3", href: "/landing-dark-3.png" },
  { name: "landing-dark-4", href: "/landing-dark-4.png" },
  { name: "landing-dark-5", href: "/landing-dark-5.png" }
]

export function ImageCarousel() {
  const { theme } = useTheme()

  // pick images based on theme
  const imagesToShow = theme === "dark" ? landingPageImagesDark : landingPageImages

  return (
    <Carousel className="w-full mx-auto">
      <CarouselContent>
        {imagesToShow.map((img, index) => (
          <CarouselItem key={index} className="basis-3/4">
            <div className="p-2">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-2">
                  <Image
                    src={img.href}
                    alt={img.name}
                    width={800}
                    height={450}
                    className="object-contain rounded-lg w-full h-auto"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
