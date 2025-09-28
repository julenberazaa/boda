"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import type { TimelineItem } from "@/lib/timeline-data"

interface TimelineSectionProps extends TimelineItem {
  index: number
  isReversed: boolean
}

export default function TimelineSection({
  year,
  age,
  title,
  content,
  imageSide,
  imageUrl,
  animation,
  background,
  icon,
  index,
  isReversed,
}: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * -0.15

      const image = section.querySelector(".parallax-image") as HTMLElement
      if (image) {
        image.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={`min-h-screen md:min-h-screen flex items-center mobile-section md:py-20 px-2 md:px-4 ${background}`}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Desktop layout: mantiene el diseño original */}
        <div className="hidden md:block">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              isReversed ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Image Side */}
            <div className={`relative ${isReversed ? "lg:col-start-2" : ""}`} data-aos={animation}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${title} - ${year}`}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover parallax-image transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {icon && (
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-terracotta rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {icon}
                </div>
              )}
            </div>

            {/* Content Side */}
            <div
              className={`space-y-6 ${isReversed ? "lg:col-start-1" : ""}`}
              data-aos={`fade-${isReversed ? "right" : "left"}`}
              data-aos-delay="100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center">
                  <span className="text-midnight font-bold text-lg">{age}</span>
                </div>
                <div>
                  <div className="text-terracotta font-medium text-lg">{year}</div>
                  <div className="w-12 h-0.5 bg-terracotta mt-1" />
                </div>
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight mb-6">{title}</h2>

              <div className="prose prose-lg text-midnight/80 leading-relaxed text-justify">
                {content.split("\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout: dos columnas, alternando posición - Proporcionalmente escalado */}
        <div className="block md:hidden mobile-timeline-grid">
          {/* Columna de medios (carruseles/marcos) - posición alterna */}
          <div className={`mobile-timeline-media ${isReversed ? 'order-2' : 'order-1'}`}>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`${title} - ${year}`}
                width={300}
                height={200}
                className="mobile-image md:w-full md:h-auto md:object-cover md:aspect-[3/2]"
              />
            </div>
            {icon && (
              <div className="absolute -top-1 -right-1 mobile-age-circle bg-terracotta rounded-full flex items-center justify-center">
                <div className="flex items-center justify-center text-ivory">
                  {icon}
                </div>
              </div>
            )}
          </div>

          {/* Columna de contenido - posición alterna */}
          <div className={`mobile-timeline-content ${isReversed ? 'order-1' : 'order-2'}`}>
            {/* Header compacto proporcionalmente escalado */}
            <div className="flex items-center gap-1 mb-1">
              <div className="mobile-age-circle bg-sage rounded-full flex items-center justify-center">
                <span className="text-midnight font-bold" style={{fontSize: '6px'}}>{age}</span>
              </div>
              <div>
                <div className="text-terracotta font-medium mobile-year-text">{year}</div>
                <div className="w-2 h-px bg-terracotta mt-px" />
              </div>
            </div>

            {/* Título compacto proporcionalmente escalado */}
            <h2 className="font-playfair mobile-timeline-title font-bold text-midnight mb-1">{title}</h2>

            {/* Contenido compacto proporcionalmente escalado */}
            <div className="text-midnight/80 mobile-timeline-content leading-tight text-justify">
              {content.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-px last:mb-0" style={{fontSize: '7px', lineHeight: '8px'}}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
