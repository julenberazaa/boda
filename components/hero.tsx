"use client"

import { Heart } from "lucide-react"

export default function Hero() {
  return (
    
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-radial from-terracotta to-ivory">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
        }}
      />

      <div className="relative z-10 text-center text-midnight px-4" data-aos="zoom-in">
        <div className="mb-4 md:mb-8">
          <Heart
            className="mobile-hero-icon md:w-16 md:h-16 mx-auto mb-2 md:mb-4 text-terracotta"
            style={{
              width: '12px',
              height: '12px',
              minWidth: '12px',
              minHeight: '12px'
            }}
          />
        </div>

        <h1
          className="font-playfair mobile-hero-title md:text-6xl lg:text-8xl font-bold mb-4"
          style={{
            fontSize: '16px',
            lineHeight: '18px',
            marginBottom: '6px',
            fontWeight: '700'
          }}
        >
          Julen & Maitane
        </h1>

        <p
          className="mobile-hero-subtitle md:text-xl lg:text-2xl font-light mb-8 max-w-2xl mx-auto"
          style={{
            fontSize: '10px',
            lineHeight: '12px',
            marginBottom: '12px',
            maxWidth: '280px',
            fontWeight: '300'
          }}
        >
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