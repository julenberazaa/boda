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
      className={isMobile ? `flex items-center mobile-section ${background}` : `min-h-screen md:min-h-screen flex items-center mobile-section md:py-20 px-2 md:px-4 ${background}`}
      style={isMobile ? {
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

        {/* Mobile layout: Grid order Título → Texto → Media */}
        <div className={`${isMobile ? 'timeline-mobile-container' : 'hidden'}`}>
          {/* Título (grid-area: title) */}
          <div style={{ gridArea: 'title' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="age-circle bg-sage rounded-full flex items-center justify-center text-midnight font-bold">
                {age}
              </div>
              <div>
                <div className="year-text text-terracotta font-medium">{year}</div>
                <div className="w-3 h-px bg-terracotta mt-1" />
              </div>
            </div>
            <h2 className="font-playfair font-bold text-midnight mb-2">
              {title}
            </h2>
          </div>

          {/* Texto (grid-area: text) */}
          <div style={{ gridArea: 'text' }} className="text-content">
            <div className="text-midnight/80 leading-relaxed text-justify">
              {content.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-1 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Media (grid-area: media) */}
          <div style={{ gridArea: 'media' }} className="media-container">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`${title} - ${year}`}
                width={600}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
            {icon && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta rounded-full flex items-center justify-center text-ivory text-xs">
                {icon}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
