"use client"

import { useEffect, useRef, useState } from "react"
import { emergencyLog } from './emergency-debug'

interface MediaItem {
  type: 'image' | 'video'
  src: string
}

interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images?: string[]
  media?: MediaItem[]
  alt: string
  onImageClick: (imageSrc: string, imageArray: string[], currentIndex: number, rect: DOMRect) => void
  onVideoClick?: (videoSrc: string, rect: DOMRect) => void
  onOpenMediaCarousel?: (items: MediaItem[], startIndex: number, rect: DOMRect) => void
  experienceId?: string
  // Frame properties
  frameSrc?: string
  frameConfig?: {
    scaleX?: number
    scaleY?: number
    offsetX?: number
    offsetY?: number
    fit?: 'cover' | 'contain' | 'fill'
  }
}

export default function ImageCarousel({
  images,
  media,
  alt,
  onImageClick,
  onVideoClick,
  onOpenMediaCarousel,
  experienceId,
  frameSrc,
  frameConfig,
  className,
  ...rest
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  // Build media list with backward compatibility - UNIFIED
  const mediaItems: MediaItem[] = (() => {
    if (media && media.length) return media
    return (images ?? []).map((src) => ({ type: 'image' as const, src }))
  })()

  const totalItems = mediaItems.length
  const isVideoActive = totalItems > 0 && mediaItems[activeIndex]?.type === 'video'

  // Log carousel initialization for debugging
  useEffect(() => {
    emergencyLog('info', `Unified carousel initialized`, {
      experienceId,
      totalItems,
      hasFrame: !!frameSrc,
      userAgent: navigator.userAgent.substring(0, 100)
    })
  }, [experienceId, totalItems, frameSrc])

  // UNIFIED Auto-advance - same for all devices
  useEffect(() => {
    if (totalItems <= 1 || isVideoActive) return

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalItems)
    }, 4000) // Fixed 4s for all devices

    return () => clearInterval(interval)
  }, [totalItems, isVideoActive])

  // UNIFIED Video handling - same for all devices
  useEffect(() => {
    if (!isVideoActive) return

    const videoEl = videoRefs.current[activeIndex]
    if (!videoEl) return

    const onEnded = () => {
      setActiveIndex(prev => (prev + 1) % totalItems)
    }

    videoEl.addEventListener('ended', onEnded)

    // Simple play - same for all devices
    const playPromise = videoEl.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        console.warn('Video autoplay failed - user interaction required')
      })
    }

    return () => {
      videoEl.removeEventListener('ended', onEnded)
      try {
        videoEl.pause()
      } catch {}
    }
  }, [activeIndex, isVideoActive, totalItems])

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const current = mediaItems[activeIndex]
    const rect = e.currentTarget.getBoundingClientRect()

    emergencyLog('info', `Carousel clicked`, {
      experienceId,
      activeIndex,
      mediaType: current?.type,
      hasUnifiedCarousel: !!onOpenMediaCarousel
    })

    if (onOpenMediaCarousel) {
      onOpenMediaCarousel(mediaItems, activeIndex, rect)
      return
    }

    if (current?.type === 'video') {
      if (onVideoClick) onVideoClick(current.src, rect)
      return
    }

    if (current?.type === 'image') {
      const imageOnlyArray = mediaItems.filter((m) => m.type === 'image').map((m) => m.src)
      const imagesBeforeCurrent = mediaItems.slice(0, activeIndex).filter((m) => m.type === 'image').length
      onImageClick(current.src, imageOnlyArray, imagesBeforeCurrent, rect)
    }
  }

  if (totalItems === 0) return null

  return (
    <div
      ref={carouselRef}
      {...rest}
      className={`relative w-full h-full cursor-pointer${className ? ` ${className}` : ''}`}
      onClick={handleContainerClick}
    >
      {/* Contenedor interno para las imágenes reducidas al 80% */}
      <div className="overflow-visible w-full h-full flex items-center justify-center">
        <div style={{ width: '80%', height: '80%', position: 'relative' }}>
          {mediaItems.map((item, index) => {
            // UNIFIED styling - same for all devices
            const commonStyle: React.CSSProperties = {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out', // Simple, same for all
              zIndex: index === activeIndex ? 20 : 10,
            }

            if (item.type === 'image') {
              return (
                <img
                  key={`img-${item.src}-${index}`}
                  src={item.src}
                  alt={`${alt} - Imagen ${index + 1}`}
                  draggable={false}
                  style={commonStyle}
                  loading="lazy"
                  decoding="async"
                />
              )
            }

            return (
              <video
                key={`vid-${item.src}-${index}`}
                ref={(el) => { videoRefs.current[index] = el }}
                src={item.src}
                playsInline
                controls={false}
                muted
                style={commonStyle}
                preload={index === activeIndex ? 'auto' : 'metadata'}
              />
            )
          })}
        </div>
      </div>

      {/* Frame overlay - tamaño natural, centrado */}
      {frameSrc && (
        <img
          src={frameSrc}
          alt=""
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            maxWidth: 'none',
            maxHeight: 'none',
            width: 'auto',
            height: 'auto',
            zIndex: 30,
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  )
}