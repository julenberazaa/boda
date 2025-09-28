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

      <div className="relative z-10 text-center text-midnight px-4" data-aos="zoom-in">
        <div
          className={isMobile ? "" : "mb-4 md:mb-8"}
          style={isMobile ? { marginBottom: '4px' } : {}}
        >
          <Heart
            className={isMobile ? "mx-auto text-terracotta" : "md:w-16 md:h-16 mx-auto mb-2 md:mb-4 text-terracotta"}
            style={isMobile ? {
              width: '8px',
              height: '8px',
              marginBottom: '2px',
              display: 'block',
              margin: '0 auto 2px auto'
            } : {}}
          />
        </div>

        <h1
          className={isMobile ? "font-playfair font-bold text-center" : "font-playfair md:text-6xl lg:text-8xl font-bold mb-4"}
          style={isMobile ? {
            fontSize: '12px',
            lineHeight: '14px',
            marginBottom: '4px',
            fontWeight: '700',
            textAlign: 'center'
          } : {}}
        >
          Julen & Maitane
        </h1>

        <p
          className={isMobile ? "font-light text-center" : "md:text-xl lg:text-2xl font-light mb-8 max-w-2xl mx-auto"}
          style={isMobile ? {
            fontSize: '8px',
            lineHeight: '10px',
            marginBottom: '8px',
            maxWidth: '200px',
            fontWeight: '300',
            textAlign: 'center',
            margin: '0 auto 8px auto'
          } : {}}
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