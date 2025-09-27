'use client'

import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

export default function FixedZoom() {
  const [scale, setScale] = useState(1)
  const [lastHeight, setLastHeight] = useState(0)
  const [lastScaledHeight, setLastScaledHeight] = useState(0)
  const [lastScale, setLastScale] = useState(1)
  const [isUpdating, setIsUpdating] = useState(false)
  const [recalcCount, setRecalcCount] = useState(0)

  useEffect(() => {
    let retryCount = 0
    const MAX_RETRIES = 3
    
    const updateScale = (source = 'initial') => {
      // 🔒 PREVENIR LOOPS: No ejecutar si ya estamos actualizando
      if (isUpdating && source === 'content-changed') {
        console.log(`⚠️ SKIP: updateScale [${source}] - ya actualizando`)
        return
      }

      const windowWidth = window.innerWidth
      const newScale = windowWidth / DESIGN_WIDTH
      
      // Obtener referencias a todos los elementos necesarios
      const wrapper = document.getElementById('fixed-layout-wrapper')
      const scrollRoot = document.getElementById('scroll-root')
      const scrollSpacer = document.getElementById('scroll-spacer')
      const fixedLayout = document.getElementById('fixed-layout')
      
      if (wrapper && scrollRoot && scrollSpacer && fixedLayout) {
        // Aplicar escala al contenido
        fixedLayout.style.transform = `scale(${newScale})`

        // Obtener altura DOM real (sin escalar)
        const originalTransform = fixedLayout.style.transform
        fixedLayout.style.transform = ''
        const unscaledHeight = fixedLayout.scrollHeight
        fixedLayout.style.transform = originalTransform

        // 🔍 PREVENIR LOOPS AGRESIVAMENTE: Histeresis fuerte
        const heightDiff = Math.abs(unscaledHeight - lastHeight)
        const scaledHeight = unscaledHeight * newScale
        const scaleDiff = Math.abs(newScale - lastScale)
        const scaledHeightDiff = Math.abs(scaledHeight - lastScaledHeight)
        
        // ❌ BLOQUEAR si valores son prácticamente idénticos
        if (source !== 'initial' && source !== 'resize') {
          if (heightDiff < 3 && scaleDiff < 0.001 && scaledHeightDiff < 2) {
            setRecalcCount(prev => prev + 1)
            if (recalcCount > 10) {
              console.warn(`🛑 BUCLE DETECTADO: Bloqueando recálculos (${recalcCount} intentos)`)
              return
            }
            return // Silencioso para cambios idénticos
          }
        }

        // Reset counter si hay cambio real
        if (heightDiff > 10 || scaleDiff > 0.01) {
          setRecalcCount(0)
        }

        // 🔒 MARCAR COMO ACTUALIZANDO
        setIsUpdating(true)

        // CLAVE: El scroll-spacer define el área de scroll = altura visual REDONDEADA
        const roundedScaledHeight = Math.round(scaledHeight)
        scrollSpacer.style.height = `${roundedScaledHeight}px`
        
        // Configurar contenedores
        wrapper.style.height = `${window.innerHeight}px`
        scrollRoot.style.height = `${window.innerHeight}px`
        scrollRoot.style.overflowY = 'auto'
        
        // 🚫 PREVENIR OVER-SCROLL: Limitar scroll máximo
        const maxScroll = Math.max(0, roundedScaledHeight - window.innerHeight)
        scrollRoot.addEventListener('scroll', function limitScroll() {
          if (scrollRoot.scrollTop > maxScroll) {
            scrollRoot.scrollTop = maxScroll
          }
        }, { passive: true })
        
        // Reset scroll position solo en carga inicial o resize
        if (source === 'initial' || source === 'resize') {
          scrollRoot.scrollTop = 0
          console.log(`📱 POSICIÓN INICIAL: scroll reset a 0`)
        }
        
        // Body no necesita altura específica
        document.body.style.height = '100vh'
        document.body.style.minHeight = '100vh'
        
        // 📝 LOGGING: Solo mostrar cambios importantes  
        if (source === 'initial' || source === 'resize' || heightDiff > 100) {
          console.log(`🔧 FIXEDZOOM [${source}]:`, {
            'altura DOM original': unscaledHeight + 'px',
            'altura visual escalada': Math.round(scaledHeight) + 'px', 
            'scroll area': scrollSpacer.style.height,
            'escala': newScale.toFixed(3),
            'ventana': window.innerHeight + 'px'
          })
        } else if (source !== 'retry') {
          // Log compacto para cambios menores
          console.log(`🔧 ${source}: ${heightDiff}px cambio`)
        }

        // 🔍 DEBUG ESPECIAL: Solo en carga inicial de móviles si hay problemas
        if (source === 'initial' && newScale < 0.3) {
          setTimeout(() => {
            const spacerHeight = parseInt(scrollSpacer.style.height)
            const actualScrollHeight = scrollRoot.scrollHeight
            const heightDifference = Math.abs(actualScrollHeight - spacerHeight)
            
            // Solo debuggear si hay diferencia significativa
            if (heightDifference > 3) {
              console.warn(`🔍 DIFERENCIA DETECTADA:`, {
                'spacer': spacerHeight + 'px',
                'real': actualScrollHeight + 'px', 
                'diferencia': heightDifference + 'px'
              })

              // Buscar elementos problemáticos
              const problematicElements = Array.from(fixedLayout.querySelectorAll('*')).filter(el => {
                const rect = el.getBoundingClientRect()
                return rect.bottom > spacerHeight + 50
              }).slice(0, 2)

              if (problematicElements.length > 0) {
                console.warn(`⚠️ ELEMENTOS PROBLEMÁTICOS:`, problematicElements.map(el => el.className.substring(0, 25)))
              }
            }
          }, 300)
        }

        // Actualizar valores guardados para histeresis
        setLastHeight(unscaledHeight)
        setLastScaledHeight(scaledHeight)
        setLastScale(newScale)
        
        // 🔓 LIBERAR LOCK después de un momento
        setTimeout(() => setIsUpdating(false), 200) // Más tiempo para evitar overlap

        // En móviles, reintento silencioso si es necesario
        if (source === 'initial' && newScale < 0.3 && retryCount < MAX_RETRIES && heightDiff > 10) {
          retryCount++
          // Reintento silencioso - solo log si es el último intento
          if (retryCount >= MAX_RETRIES) {
            console.log(`📱 MÓVIL: Último reintento (${retryCount}/${MAX_RETRIES})`)
          }
          setTimeout(() => updateScale('retry'), 300) // Más rápido
        }
      }
      
      setScale(newScale)
    }

    // Ejecutar al montar
    updateScale()

    // 1. Content loaded listener - para cuando imágenes estén cargadas
    const handleContentLoaded = () => {
      // Silencioso - recalcular sin log
      setTimeout(() => updateScale('content-loaded'), 100)
    }

    if (document.readyState === 'complete') {
      // Ya está cargado
      setTimeout(() => updateScale('already-loaded'), 200)
    } else {
      // Esperar a que termine de cargar
      window.addEventListener('load', handleContentLoaded)
    }

    // 2. Mutation Observer - DEBOUNCE AGRESIVO para evitar bucles
    let mutationTimeout: NodeJS.Timeout
    let lastMutationTime = 0
    let mutationCount = 0
    const observer = new MutationObserver((mutations) => {
      // 🚫 PREVENIR SPAM: Throttle súper agresivo
      const now = Date.now()
      if (now - lastMutationTime < 2000) { // 2 segundos mínimo entre cambios
        return
      }

      // 🛑 LIMITAR MUTATIONS: Máximo 5 por minuto
      mutationCount++
      if (mutationCount > 5) {
        console.warn(`🛑 MUTATION LIMIT: Demasiadas mutaciones (${mutationCount}), pausando observer`)
        setTimeout(() => { mutationCount = 0 }, 60000) // Reset en 1 minuto
        return
      }

      // 🚫 FILTRAR: Solo cambios realmente importantes
      const relevantChanges = mutations.some(mutation => {
        const target = mutation.target as Element
        // Ignorar todos los contenedores de layout
        if (target.id?.includes('scroll') || target.id?.includes('layout') || target.id?.includes('fixed')) {
          return false
        }
        // Solo interesar por adición de nuevos elementos (imágenes)
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          return Array.from(mutation.addedNodes).some(node => {
            return node.nodeName === 'IMG' || node.nodeName === 'VIDEO' || node.nodeName === 'IFRAME'
          })
        }
        return false
      })

      if (relevantChanges) {
        lastMutationTime = now
        clearTimeout(mutationTimeout)
        // Debounce MUY agresivo
        mutationTimeout = setTimeout(() => updateScale('content-changed'), 1500)
      }
    })
    
    const fixedLayout = document.getElementById('fixed-layout')
    if (fixedLayout) {
      observer.observe(fixedLayout, {
        childList: true,     // nuevos elementos (imágenes, videos)
        subtree: true,       // cambios profundos
        attributes: false    // ❌ NO observar cambios de atributos (reduce spam)
      })
    }

    // 3. Resize con throttling
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => updateScale('resize'), 16) // ~60fps
    }

    window.addEventListener('resize', handleResize)
    
    // 4. Orientation change para dispositivos móviles
    const handleOrientationChange = () => {
      setTimeout(() => updateScale('orientation'), 200) // Delay para el navegador
    }
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('load', handleContentLoaded)
      observer.disconnect()
      clearTimeout(timeoutId)
      clearTimeout(mutationTimeout)
    }
  }, [])

  // Este componente no renderiza nada visible
  return null
}
