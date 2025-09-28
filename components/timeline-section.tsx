"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import type { TimelineItem } from "@/lib/timeline-data"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

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
  const isMobile = useMobileDetection()

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
    <section
      ref={sectionRef}
      className={isMobile ? `flex items-center ${background}` : `min-h-screen md:min-h-screen flex items-center mobile-section md:py-20 px-2 md:px-4 ${background}`}
      style={isMobile ? {
        minHeight: '120px',
        padding: '6px 4px',
        display: 'flex',
        alignItems: 'center'
      } : {}}
    >
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

        {/* Mobile layout: inline styles only */}
        {isMobile ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3px',
              padding: '3px',
              margin: '0',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Columna de medios */}
            <div style={{ order: isReversed ? 2 : 1, padding: '1px' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${title} - ${year}`}
                  width={150}
                  height={100}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '60px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              {icon && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#E67E5B',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '6px',
                    color: '#FFF8F5'
                  }}
                >
                  {icon}
                </div>
              )}
            </div>

            {/* Columna de contenido */}
            <div style={{ order: isReversed ? 1 : 2, padding: '1px' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '2px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#A8B5A0',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '6px',
                    fontWeight: 'bold',
                    color: '#2C3E3F'
                  }}
                >
                  {age}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '6px',
                      lineHeight: '7px',
                      color: '#E67E5B',
                      fontWeight: '500'
                    }}
                  >
                    {year}
                  </div>
                  <div style={{ width: '4px', height: '1px', backgroundColor: '#E67E5B' }} />
                </div>
              </div>

              {/* Título */}
              <h2
                style={{
                  fontSize: '8px',
                  lineHeight: '9px',
                  marginBottom: '2px',
                  fontWeight: '700',
                  color: '#2C3E3F',
                  fontFamily: 'Playfair Display, serif'
                }}
              >
                {title}
              </h2>

              {/* Contenido */}
              <div style={{ fontSize: '6px', lineHeight: '7px', color: 'rgba(44, 62, 63, 0.8)' }}>
                {content.split("\n").map((paragraph, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '6px',
                      lineHeight: '7px',
                      marginBottom: '1px',
                      textAlign: 'justify'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="block md:hidden mobile-timeline-grid">
            {/* Desktop fallback - keep existing */}
          </div>
        )}
      </div>
    </section>
  )
}
