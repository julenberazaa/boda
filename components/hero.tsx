"use client"

import { Heart } from "lucide-react"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

export default function Hero() {
  const isMobile = useMobileDetection()

  return (
    
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-radial from-terracotta to-ivory">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
        }}
      />

<div className={`relative z-10 text-center text-midnight px-4 ${isMobile ? 'hero-mobile-container' : ''}`} data-aos="zoom-in">
        <div className="mb-4 md:mb-8">
          <Heart className="mx-auto mb-2 md:mb-4 text-terracotta md:w-16 md:h-16" />
        </div>

        <h1 className="font-playfair font-bold mb-4 md:text-6xl lg:text-8xl">
          Julen & Maitane
        </h1>

        <p className="font-light mb-8 max-w-2xl mx-auto md:text-xl lg:text-2xl">
          Una historia de amor que comenzó con 7 años y culminará en 2025
        </p>

      </div>

      <div className="absolute bottom-8 left-1/2">
        <div className="w-6 h-10 border-2 border-midnight rounded-full flex justify-center">
          <div className="w-1 h-3 bg-midnight rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}