"use client"

import { useEffect, useState } from 'react'
import { OVERLAY_FRAMES } from '@/lib/frame-config'

export default function FixedZoom() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // COMPLETE DISABLE: FixedZoom completely disabled for iOS to prevent conflicts
    const isIOSSafari = () => {
      const userAgent = navigator.userAgent
      return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
    }

    if (isIOSSafari()) {
      console.log('FixedZoom: Completely disabled for iOS Safari - no logic executed')
      // Dispatch ready event immediately for iOS
      ;(window as any).__fixedZoomReady = true
      window.dispatchEvent(new CustomEvent('fixed-zoom-ready'))
      return // EXIT COMPLETELY - no further logic for iOS
    }

    // DESKTOP/ANDROID ONLY - iOS exits above
    const BASE_WIDTH = 1920
    const DESIGN_MAGNIFY = 1.21 // ~21% total más grande
    const EFFECTIVE_BASE_WIDTH = BASE_WIDTH / DESIGN_MAGNIFY // ~1587.6px
    let resizeTimeout: NodeJS.Timeout
    let observerTimeout: NodeJS.Timeout | null = null
    let resizeObserver: ResizeObserver | null = null
    let fixedZoomReadyDispatched = false

    function dispatchFixedZoomReadyOnce() {
      if (fixedZoomReadyDispatched) return
      fixedZoomReadyDispatched = true
      try {
        ;(window as any).__fixedZoomReady = true
        window.dispatchEvent(new CustomEvent('fixed-zoom-ready'))
      } catch {}
    }

    function applyZoom() {
      try {
        const documentWidth = document.documentElement.clientWidth
        const innerWidth = window.innerWidth
        const viewport = documentWidth || innerWidth
        const scale = viewport / EFFECTIVE_BASE_WIDTH
        const fixedLayout = document.getElementById('fixed-layout') as HTMLElement | null
        const wrapper = document.getElementById('fixed-layout-wrapper') as HTMLElement | null
        const scroller = document.getElementById('scroll-root') as HTMLElement | null

        if (fixedLayout && wrapper) {
          // Desktop/Android: Standard optimizations
          fixedLayout.style.willChange = 'transform'
          wrapper.style.willChange = 'height'

          // Fijar ancho base del lienzo
          fixedLayout.style.width = `${EFFECTIVE_BASE_WIDTH}px`

          // Aplicar escala
          fixedLayout.style.transform = `scale(${scale})`
          fixedLayout.style.transformOrigin = 'top left'

          // Asegurar ancho sin forzar políticas de scroll
          document.documentElement.style.width = '100vw'
          document.body.style.width = '100vw'

          // HARD CUT: Medir altura exacta hasta el final COMPLETO de la sección del video
          const finalSection = document.getElementById('final-video-section')
          if (finalSection) {
            let videoBottomAbsolute: number
            if (scroller) {
              const bottomUnscaled = finalSection.offsetTop + finalSection.offsetHeight
              videoBottomAbsolute = Math.max(0, Math.ceil(bottomUnscaled * scale))
            } else {
              const videoRect = finalSection.getBoundingClientRect()
              const currentScrollY = window.scrollY
              videoBottomAbsolute = currentScrollY + videoRect.bottom
            }

            // Calcular el fondo absoluto requerido por los marcos (overlay)
            const isMobileViewport = (window.innerWidth || 0) <= 768
            let overlayBottomCSS = 0

            try {
              for (const frame of OVERLAY_FRAMES) {
                if (frame.visible === false) continue
                const yBase = (frame.y ?? 0) + (isMobileViewport ? (frame.mobileOffsetY ?? 0) : 0)
                const heightBase = (frame.height ?? 400) * (frame.scaleY ?? 1)
                const bottomBase = yBase + (heightBase / 2)
                const bottomCSS = bottomBase * scale // convertir a coordenadas CSS
                if (bottomCSS > overlayBottomCSS) overlayBottomCSS = bottomCSS
              }
            } catch {}

            const framesBottomAbsolute = Math.max(0, Math.ceil(overlayBottomCSS))
            const mobileBuffer = scroller ? 20 : 0
            const totalDocumentHeight = Math.max(0, Math.ceil(Math.max(videoBottomAbsolute, framesBottomAbsolute) + mobileBuffer))

            // FORZAR altura absoluta - HARD CUT sin excepciones
            wrapper.style.height = `${totalDocumentHeight}px`
            wrapper.style.maxHeight = `${totalDocumentHeight}px`
            wrapper.style.minHeight = `${totalDocumentHeight}px`
            wrapper.style.overflow = 'hidden'
            wrapper.style.overflowY = 'hidden'

            // No forzar alturas/overflow en html; el wrapper marca el alto
            document.documentElement.style.height = ''
            document.documentElement.style.maxHeight = ''
            document.body.style.height = ''
            document.body.style.maxHeight = ''
            document.body.style.overflow = ''
            document.body.style.overflowY = ''

            // Desktop/Android: Standard cleanup
            setTimeout(() => {
              fixedLayout.style.willChange = ''
              wrapper.style.willChange = ''
            }, 100)

            dispatchFixedZoomReadyOnce()
          } else {
            // Fallback si no encuentra la sección del video
            const visualHeight = Math.max(0, Math.ceil(fixedLayout.getBoundingClientRect().height))
            const isMobileViewport = (window.innerWidth || 0) <= 768
            let overlayBottomCSS = 0

            try {
              for (const frame of OVERLAY_FRAMES) {
                if (frame.visible === false) continue
                const yBase = (frame.y ?? 0) + (isMobileViewport ? (frame.mobileOffsetY ?? 0) : 0)
                const heightBase = (frame.height ?? 400) * (frame.scaleY ?? 1)
                const bottomBase = yBase + (heightBase / 2)
                const bottomCSS = bottomBase * scale
                if (bottomCSS > overlayBottomCSS) overlayBottomCSS = bottomCSS
              }
            } catch {}

            const needed = Math.max(visualHeight, Math.ceil(overlayBottomCSS))
            const mobileBuffer = scroller ? 200 : 0
            wrapper.style.height = `${needed + mobileBuffer}px`
            wrapper.style.minHeight = `${needed}px`

            // Desktop/Android: Standard cleanup
            setTimeout(() => {
              fixedLayout.style.willChange = ''
              wrapper.style.willChange = ''
            }, 100)

            dispatchFixedZoomReadyOnce()
          }
        }
      } catch (error) {
        console.error('❌ FixedZoom - Error:', error)
      }
    }

    function handleResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        applyZoom()
      }, 150)
    }

    // Desktop/Android: ResizeObserver habilitado
    const fixedLayoutEl = document.getElementById('fixed-layout')
    if (fixedLayoutEl && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        if (observerTimeout) clearTimeout(observerTimeout)
        observerTimeout = setTimeout(() => {
          applyZoom()
        }, 150)
      })
      resizeObserver.observe(fixedLayoutEl)
    }

    // Desktop/Android: Standard execution strategy
    applyZoom()

    const timeouts = [
      setTimeout(applyZoom, 0),
      setTimeout(applyZoom, 1),
      setTimeout(applyZoom, 16),
      setTimeout(applyZoom, 50),
      setTimeout(applyZoom, 100),
      setTimeout(applyZoom, 200),
      setTimeout(applyZoom, 400),
      setTimeout(applyZoom, 600),
      setTimeout(applyZoom, 1000),
      setTimeout(applyZoom, 1200),
      setTimeout(applyZoom, 2000)
    ]

    // Desktop/Android: Animation frames
    let rafCount = 0
    const hardCutRaf = () => {
      applyZoom()
      if (rafCount++ < 10) {
        requestAnimationFrame(hardCutRaf)
      }
    }
    requestAnimationFrame(hardCutRaf)

    // Recalcular cuando todo cargue
    window.addEventListener('load', applyZoom)
    // @ts-ignore FontFaceSet
    if (document.fonts && document.fonts.ready) {
      // @ts-ignore
      document.fonts.ready.then(() => applyZoom()).catch(() => {})
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', () => {
      setTimeout(applyZoom, 200)
    })

    return () => {
      timeouts.forEach(clearTimeout)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (observerTimeout) clearTimeout(observerTimeout)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.removeEventListener('load', applyZoom)
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [])

  return null
}