"use client"

import React, { useRef, useEffect, useState } from 'react'

interface SlideStageProps {
  children: React.ReactNode
  frameId?: string
  frameSrc?: string
  frameConfig?: {
    scaleX?: number
    scaleY?: number
    offsetX?: number
    offsetY?: number
    fit?: 'cover' | 'contain' | 'fill'
  }
  className?: string
}

export default function SlideStage({
  children,
  frameId,
  frameSrc,
  frameConfig = {},
  className = ''
}: SlideStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scaleFactor, setScaleFactor] = useState(1)

  // Unified behavior for all devices

  // Intersection Observer for lazy loading frames
  useEffect(() => {
    if (!stageRef.current || !frameSrc) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      {
        rootMargin: '100px',
        threshold: [0, 0.1, 0.5]
      }
    )

    observer.observe(stageRef.current)
    return () => observer.disconnect()
  }, [frameSrc, frameId])

  // Scale calculation based on container size
  useEffect(() => {
    if (!stageRef.current) return

    const updateScale = () => {
      const container = stageRef.current
      if (!container) return

      const containerWidth = container.offsetWidth
      const baseWidth = 400 // Base width for scale calculation
      const newScale = Math.min(Math.max(containerWidth / baseWidth, 0.5), 2)
      setScaleFactor(newScale)
    }

    updateScale()

    const resizeObserver = new ResizeObserver(updateScale)
    resizeObserver.observe(stageRef.current)

    // Standard update intervals for all devices
    const intervals = [100, 500, 1000]
    const timers = intervals.map(ms => setTimeout(updateScale, ms))

    return () => {
      resizeObserver.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const {
    scaleX = 1,
    scaleY = 1,
    offsetX = 0,
    offsetY = 0,
    fit = 'contain'
  } = frameConfig

  return (
    <div
      ref={stageRef}
      className={`slide-stage relative ${className}`}
      style={{
        position: 'relative',
        overflow: 'visible',
        isolation: 'isolate'
      }}
    >
      {/* Carousel content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Local frame overlay */}
      {frameSrc && isVisible && (
        <div
          className="slide-frame"
          style={{
            position: 'absolute',
            top: `${offsetY}%`,
            left: `${offsetX}%`,
            width: `${100 * scaleX * scaleFactor}%`,
            height: `${100 * scaleY * scaleFactor}%`,
            pointerEvents: 'none',
            zIndex: 2
          }}
          aria-hidden="true"
        >
          <img
            src={frameSrc}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: fit,
              borderRadius: '12px',
              display: 'block'
            }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              console.warn(`Failed to load frame image: ${frameSrc}`)
            }}
          />
        </div>
      )}

      <style jsx>{`
        .slide-stage {
          container-type: inline-size;
        }

        @container (width < 768px) {
          .slide-frame {
            --mobile-scale: 0.8;
            transform: scale(
              calc(${scaleX} * var(--scale-factor, 1) * var(--mobile-scale)),
              calc(${scaleY} * var(--scale-factor, 1) * var(--mobile-scale))
            );
          }
        }

        /* Unified styling for all devices */
      `}</style>
    </div>
  )
}