"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { iOSDebugLog } from './ios-debug-logger'

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
  // Frame properties - añadimos el marco directamente al carrusel
  frameSrc?: string
  frameConfig?: {
    scaleX?: number
    scaleY?: number
    offsetX?: number
    offsetY?: number
    fit?: 'cover' | 'contain' | 'fill'
  }
}

export default function ImageCarousel({ images, media, alt, onImageClick, onVideoClick, onOpenMediaCarousel, experienceId, frameSrc, frameConfig, className, ...rest }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Detección específica de iPhone
  const isIPhone = useMemo(() => {
    if (typeof window === 'undefined') return false
    const userAgent = navigator.userAgent
    return /iPhone/.test(userAgent) && !(window as any).MSStream
  }, [])

  // iPhone: Limitar carouseles activos para prevenir GPU overload
  const [isCarouselActive, setIsCarouselActive] = useState(!isIPhone)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Build media list with backward compatibility
  const mediaItems: MediaItem[] = useMemo(() => {
    if (media && media.length) return media
    const imageItems = (images ?? []).map((src) => ({ type: 'image' as const, src }))
    return imageItems
  }, [images, media])

  const totalItems = mediaItems.length
  const isVideoActive = totalItems > 0 && mediaItems[activeIndex]?.type === 'video'

  // Keep refs for possible multiple videos
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  // iPhone: Intersection Observer para activar carousel solo cuando es visible
  useEffect(() => {
    if (!isIPhone || !carouselRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setIsCarouselActive(true)
            iOSDebugLog('info', `iPhone: Carousel activated for ${experienceId}`, 'ImageCarousel')
          } else {
            setIsCarouselActive(false)
            iOSDebugLog('info', `iPhone: Carousel deactivated for ${experienceId}`, 'ImageCarousel')
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: [0, 0.1, 0.5]
      }
    )

    observer.observe(carouselRef.current)
    return () => observer.disconnect()
  }, [isIPhone, experienceId])

  // Auto-advance for images only; for video wait until it finishes
  useEffect(() => {
    if (totalItems <= 1) return
    if (isVideoActive) return // do not auto-advance while video is active
    
    // iPhone: Solo auto-advance si el carousel está activo y visible
    if (isIPhone && !isCarouselActive) return

    // iPhone: Intervalo más lento para reducir GPU pressure
    const intervalDuration = isIPhone ? 6000 : 4000
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1))
    }, intervalDuration)
    return () => clearInterval(interval)
  }, [totalItems, isVideoActive, isIPhone, isCarouselActive])

  // Handle video playback when its slide becomes active
  useEffect(() => {
    if (!isVideoActive) return
    const videoEl = videoRefs.current[activeIndex]
    if (!videoEl) return

    // iPhone: Solo reproducir video si el carousel está activo
    if (isIPhone && !isCarouselActive) {
      iOSDebugLog('info', 'iPhone: Skipping video playback - carousel not active', 'ImageCarousel')
      return
    }

    // Ensure start from beginning
    try {
      videoEl.currentTime = 0
    } catch {}
    // Autoplay policies require muted
    videoEl.muted = true
    const onEnded = () => {
      setActiveIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1))
    }
    videoEl.addEventListener('ended', onEnded)
    
    // iPhone: Manejo más conservador de video playback
    if (isIPhone) {
      setTimeout(() => {
        const playPromise = videoEl.play()
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            iOSDebugLog('warning', 'iPhone: Video autoplay failed', 'ImageCarousel')
          })
        }
      }, 200) // Delay para iPhone
    } else {
      // Desktop/Android: Reproducción inmediata
      const playPromise = videoEl.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }
    
    return () => {
      videoEl.removeEventListener('ended', onEnded)
      try {
        videoEl.pause()
      } catch {}
    }
  }, [activeIndex, isVideoActive, totalItems, isIPhone, isCarouselActive])

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const current = mediaItems[activeIndex]
    const rect = e.currentTarget.getBoundingClientRect()
    // Prefer unified media carousel if provided
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
      // Map activeIndex to the corresponding index among images only
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
      <div className="overflow-hidden w-full h-full">
        {mediaItems.map((item, index) => {
          const commonStyle: React.CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: index === activeIndex ? 1 : 0,
            // iPhone: Transiciones simplificadas para reducir GPU load
            transition: isIPhone 
              ? 'opacity 1s ease-in-out' 
              : 'opacity 1.5s ease-in-out, transform 0.5s ease-in-out',
            zIndex: index === activeIndex ? 20 : 10,
          }
          if (item.type === 'image') {
            return (
              <img
                key={`img-${item.src}-${index}`}
                src={item.src}
                alt={`${alt} - Imagen ${index + 1}`}
                draggable={false}
                className={isIPhone 
                  ? `transition-opacity duration-1000 ease-in-out ${index === activeIndex ? '' : ''}` // iPhone: Solo opacity, sin GPU transforms
                  : `transition-transform duration-500 ease-in-out transform-gpu will-change-transform ${index === activeIndex ? 'hover:scale-105' : ''}`
                }
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
              className={isIPhone 
                ? `transition-opacity duration-1000 ease-in-out ${index === activeIndex ? '' : ''}` // iPhone: Solo opacity, sin GPU transforms  
                : `transition-transform duration-500 ease-in-out transform-gpu will-change-transform ${index === activeIndex ? 'hover:scale-105' : ''}`
              }
              style={commonStyle}
              preload={isIPhone 
                ? (index === activeIndex && isCarouselActive ? 'auto' : 'none') // iPhone: Preload más conservador
                : (index === activeIndex ? 'auto' : 'metadata')
              }
            />
          )
        })}
      </div>

      {/* Frame overlay - renderizado DENTRO del carrusel */}
      {frameSrc && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 30, // Por encima de las imágenes (z-index 20)
            width: `${100 * (frameConfig?.scaleX || 1)}%`,
            height: `${100 * (frameConfig?.scaleY || 1)}%`,
            top: `${frameConfig?.offsetY || 0}%`,
            left: `${frameConfig?.offsetX || 0}%`,
          }}
        >
          <img
            src={frameSrc}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: frameConfig?.fit || 'contain',
              borderRadius: '12px'
            }}
            className="block"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </div>
  )
}