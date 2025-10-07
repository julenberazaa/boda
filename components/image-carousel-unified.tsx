"use client"

import { useEffect, useRef, useState } from "react"
import { emergencyLog } from './emergency-debug'
import { Edit, Check } from 'lucide-react'
import type { CropBox } from '@/lib/local-frame-config'
import { useCarouselResize } from '@/hooks/use-carousel-resize'
import { logCarouselHierarchy, getComputedStylesWithSource } from '@/lib/css-debug-utils'

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
    cropBox?: CropBox
  }
  // Calibration properties
  calibrationMode?: boolean
  isActiveCalibration?: boolean
  onStartCalibration?: () => void
  onConfirmCalibration?: (cropBox: CropBox) => void
  // Styling properties
  borderRadius?: string
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
  calibrationMode,
  isActiveCalibration,
  onStartCalibration,
  onConfirmCalibration,
  borderRadius,
  className,
  ...rest
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  // Track window width for responsive frame scaling (client-side only)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const width = window.innerWidth
    setWindowWidth(width)
    console.log(`🔧 [ImageCarousel ${experienceId}] Window width set to:`, width)

    const handleResize = () => {
      const newWidth = window.innerWidth
      setWindowWidth(newWidth)
      console.log(`🔧 [ImageCarousel ${experienceId}] Window width resized to:`, newWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [experienceId])

  // Calibration state
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null)
  const [drawCurrent, setDrawCurrent] = useState<{ x: number; y: number } | null>(null)
  const [tempCropBox, setTempCropBox] = useState<CropBox | null>(null)

  // Build media list with backward compatibility - UNIFIED
  const mediaItems: MediaItem[] = (() => {
    if (media && media.length) return media
    return (images ?? []).map((src) => ({ type: 'image' as const, src }))
  })()

  const totalItems = mediaItems.length
  const isVideoActive = totalItems > 0 && mediaItems[activeIndex]?.type === 'video'

  // Log carousel initialization for debugging
  useEffect(() => {
    const isMobile = window.innerWidth <= 767

    // DEBUG: Print HTML structure for first carousel only
    if (experienceId === '02' && carouselRef.current && activeIndex === 0) {
      const parent = carouselRef.current.parentElement?.parentElement?.parentElement
      console.log('🔍 HTML STRUCTURE:', parent?.outerHTML?.substring(0, 500))

      const cropBox = carouselRef.current.querySelector('div[style*="position: absolute"]')
      console.log('🎯 CROPBOX ELEMENT:', cropBox?.outerHTML?.substring(0, 300))

      const frame = carouselRef.current.querySelector('img[alt=""]')
      console.log('🖼️ FRAME ELEMENT:', frame?.outerHTML?.substring(0, 200))
    }

    console.log(`🎠 CAROUSEL INIT [${experienceId}] [${isMobile ? 'MOBILE' : 'DESKTOP'}]`, {
      totalItems,
      activeIndex,
      hasFrame: !!frameSrc,
      carouselRef: !!carouselRef.current,
      width: window.innerWidth,
      firstImageShouldBeVisible: activeIndex === 0
    })

    emergencyLog('info', `Unified carousel initialized`, {
      experienceId,
      totalItems,
      hasFrame: !!frameSrc,
      userAgent: navigator.userAgent.substring(0, 100)
    })
  }, [experienceId, totalItems, frameSrc, activeIndex])

  // FOCUSED MOBILE DEBUG: Check why content is invisible despite having space
  useEffect(() => {
    if (!carouselRef.current) return

    const isMobile = window.innerWidth <= 767
    if (!isMobile) return

    const carousel = carouselRef.current
    const carouselRect = carousel.getBoundingClientRect()

    // Find the cropBox div (the one with width: 80% inline)
    const cropBoxDiv = carousel.querySelector('div[style*="width"]') as HTMLElement
    const cropBoxRect = cropBoxDiv ? cropBoxDiv.getBoundingClientRect() : null

    // Find active image (should have opacity: 1)
    const activeImg = carousel.querySelector('img:not([alt=""])') as HTMLImageElement
    const activeImgStyle = activeImg ? window.getComputedStyle(activeImg) : null

    // Find frame (img with empty alt)
    const frame = carousel.querySelector('img[alt=""]') as HTMLImageElement
    const frameRect = frame ? frame.getBoundingClientRect() : null
    const frameStyle = frame ? window.getComputedStyle(frame) : null

    // Only log if there's a problem
    const hasSpace = carouselRect.height > 10
    const hasContent = cropBoxRect && cropBoxRect.width > 0 && cropBoxRect.height > 0
    const imageVisible = activeImg && activeImgStyle?.opacity === '1'

    if (hasSpace && (!hasContent || !imageVisible)) {
      emergencyLog('error', `🚨 CAROUSEL EMPTY [${experienceId}]`, {
        carouselSize: `${carouselRect.width}×${carouselRect.height}`,
        cropBox: cropBoxRect ? {
          size: `${cropBoxRect.width}×${cropBoxRect.height}`,
          inlineStyle: cropBoxDiv?.getAttribute('style')
        } : 'NOT FOUND',
        activeImage: activeImg ? {
          opacity: activeImgStyle?.opacity,
          display: activeImgStyle?.display,
          visibility: activeImgStyle?.visibility,
          src: activeImg.src.substring(0, 50)
        } : 'NOT FOUND',
        frame: frame ? {
          size: `${frameRect!.width}×${frameRect!.height}`,
          display: frameStyle?.display,
          visibility: frameStyle?.visibility,
          src: frame.src.substring(0, 50)
        } : 'NOT FOUND'
      })
    }
  }, [experienceId, activeIndex])

  // ResizeObserver fallback for real-time adjustments (universal support)
  useCarouselResize(carouselRef, (width, height) => {
    // Optional: Add custom resize logic here if needed
    // CSS handles most cases via container queries + auto heights
    emergencyLog('debug', `Carousel resized (fallback)`, {
      experienceId,
      width,
      height
    })
  })

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

  // Calibration handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActiveCalibration) return

    const rect = carouselRef.current?.getBoundingClientRect()
    if (!rect) return

    setIsDrawing(true)
    setDrawStart({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setDrawCurrent({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !drawStart) return

    const rect = carouselRef.current?.getBoundingClientRect()
    if (!rect) return

    setDrawCurrent({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !drawStart || !carouselRef.current) return

    const rect = carouselRef.current.getBoundingClientRect()
    const endX = e.clientX - rect.left
    const endY = e.clientY - rect.top

    // Calculate cropBox in percentages
    const x = Math.min(drawStart.x, endX)
    const y = Math.min(drawStart.y, endY)
    const width = Math.abs(endX - drawStart.x)
    const height = Math.abs(endY - drawStart.y)

    // Only save if rectangle has meaningful size (at least 20px in both dimensions)
    if (width < 20 || height < 20) {
      setIsDrawing(false)
      setDrawStart(null)
      setDrawCurrent(null)
      return
    }

    const cropBox: CropBox = {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      width: (width / rect.width) * 100,
      height: (height / rect.height) * 100
    }

    setTempCropBox(cropBox)
    setIsDrawing(false)
    setDrawStart(null)
    setDrawCurrent(null)
  }

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't trigger image modal if in calibration mode
    if (calibrationMode) return

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

  // Determine which cropBox to use: tempCropBox (being drawn) or saved cropBox
  // UNIVERSAL: Use cropBox calibration for all devices (percentages scale automatically)
  const activeCropBox = tempCropBox || frameConfig?.cropBox

  // Calculate drawing rectangle for visualization
  const drawRect = drawStart && drawCurrent ? {
    left: Math.min(drawStart.x, drawCurrent.x),
    top: Math.min(drawStart.y, drawCurrent.y),
    width: Math.abs(drawCurrent.x - drawStart.x),
    height: Math.abs(drawCurrent.y - drawStart.y)
  } : null

  return (
    <div
      ref={carouselRef}
      {...rest}
      className={`relative w-full h-full ${calibrationMode ? 'cursor-crosshair' : 'cursor-pointer'}${className ? ` ${className}` : ''}`}
      onClick={handleContainerClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Contenedor interno para las imágenes - usa cropBox si existe */}
      <div className="overflow-visible w-full h-full flex items-center justify-center">
        <div style={{
          width: activeCropBox ? `${activeCropBox.width}%` : '80%',
          height: activeCropBox ? `${activeCropBox.height}%` : '80%',
          position: 'absolute',
          left: activeCropBox ? `${activeCropBox.x}%` : '50%',
          top: activeCropBox ? `${activeCropBox.y}%` : '50%',
          transform: activeCropBox ? 'none' : 'translate(-50%, -50%)',
          overflow: 'hidden',
          borderRadius: borderRadius || undefined
        }}>
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
              transition: 'opacity 1s ease-in-out, transform 0.3s ease-out',
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
                  className="hover-scale-image"
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
                className="hover-scale-image"
                preload={index === activeIndex ? 'auto' : 'metadata'}
              />
            )
          })}
        </div>
      </div>

      {/* Frame overlay - escala proporcional según dispositivo */}
      {frameSrc && (() => {
        // Get calibrated scales from frameConfig (default to 1.2 if not specified)
        const scaleX = frameConfig?.scaleX ?? 1.2
        const scaleY = frameConfig?.scaleY ?? 1.2

        // SSR/initial: use desktop scale
        if (windowWidth === 0) {
          console.log(`🔧 [Frame ${experienceId}] SSR mode, using desktop scale (${scaleX}, ${scaleY})`)
          return (
            <img
              src={frameSrc}
              alt=""
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
                objectFit: 'contain',
                zIndex: 30,
                pointerEvents: 'none'
              }}
            />
          )
        }

        const isMobile = windowWidth <= 767

        if (!isMobile) {
          // Desktop: usar escalas calibradas específicas de cada frame
          console.log(`🔧 [Frame ${experienceId}] Desktop (${windowWidth}px), using calibrated scale (${scaleX}, ${scaleY})`)
          return (
            <img
              src={frameSrc}
              alt=""
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
                objectFit: 'contain',
                zIndex: 30,
                pointerEvents: 'none'
              }}
            />
          )
        }

        // Móvil: mantener scales calibrados porque el carousel ya se escaló proporcionalmente
        // El frame debe mantener la MISMA proporción relativa al carousel que en desktop
        console.log(`🔧 [Frame ${experienceId}] Mobile (${windowWidth}px), maintaining desktop calibrated scale (${scaleX}, ${scaleY})`)

        return (
          <img
            src={frameSrc}
            alt=""
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
              objectFit: 'contain',
              zIndex: 30,
              pointerEvents: 'none'
            }}
          />
        )
      })()}

      {/* Calibration drawing overlay */}
      {isActiveCalibration && drawRect && (
        <div
          style={{
            position: 'absolute',
            left: `${drawRect.left}px`,
            top: `${drawRect.top}px`,
            width: `${drawRect.width}px`,
            height: `${drawRect.height}px`,
            border: '2px solid #22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            zIndex: 40,
            pointerEvents: 'none'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '0',
            fontSize: '11px',
            color: '#22c55e',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '2px 4px',
            borderRadius: '3px',
            whiteSpace: 'nowrap'
          }}>
            {drawRect.width.toFixed(0)}px × {drawRect.height.toFixed(0)}px
          </div>
        </div>
      )}

      {/* Calibration buttons */}
      {calibrationMode && frameSrc && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 50
        }}>
          {!isActiveCalibration ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onStartCalibration?.()
              }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
              title="Calibrar marco"
            >
              <Edit size={16} color="white" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (tempCropBox) {
                  onConfirmCalibration?.(tempCropBox)
                }
              }}
              disabled={!tempCropBox}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: tempCropBox ? '#22c55e' : '#9ca3af',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: tempCropBox ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
              title="Confirmar calibración"
            >
              <Check size={16} color="white" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}