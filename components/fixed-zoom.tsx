'use client'

import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

export default function FixedZoom() {
  const [scale, setScale] = useState(1)
  const [lastHeight, setLastHeight] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

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

        // 🔍 PREVENIR LOOPS: Tolerancia para cambios de pocos píxeles 
        const heightDiff = Math.abs(unscaledHeight - lastHeight)
        if (source === 'content-changed' && heightDiff < 5) {
          // Silencioso - no log para cambios menores de 5px
          return
        }

        // 🔒 MARCAR COMO ACTUALIZANDO
        setIsUpdating(true)

        // Calcular altura visual (escalada)
        const scaledHeight = unscaledHeight * newScale
        
        // CLAVE: El scroll-spacer define el área de scroll = altura visual REDONDEADA
        const roundedScaledHeight = Math.round(scaledHeight)
        scrollSpacer.style.height = `${roundedScaledHeight}px`
        
        // Configurar contenedores
        wrapper.style.height = `${window.innerHeight}px`
        scrollRoot.style.height = `${window.innerHeight}px`
        scrollRoot.style.overflowY = 'auto'
        
        // Reset scroll position solo en carga inicial
        if (source === 'initial' || source === 'resize') {
          scrollRoot.scrollTop = 0
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

        // Actualizar altura guardada
        setLastHeight(unscaledHeight)
        
        // 🔓 LIBERAR LOCK después de un momento
        setTimeout(() => setIsUpdating(false), 100)

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

    // 2. Mutation Observer - detectar cambios dinámicos EN CONTENIDO (no en contenedores)
    let mutationTimeout: NodeJS.Timeout
    let lastMutationTime = 0
    const observer = new MutationObserver((mutations) => {
      // 🚫 PREVENIR SPAM: Throttle agresivo
      const now = Date.now()
      if (now - lastMutationTime < 1000) { // 1 segundo mínimo entre cambios
        return
      }

      // 🚫 FILTRAR: Ignorar cambios en elementos que FixedZoom controla
      const relevantChanges = mutations.some(mutation => {
        const target = mutation.target as Element
        // Ignorar cambios en scroll-spacer, scroll-root, wrapper
        if (target.id?.includes('scroll') || target.id?.includes('layout-wrapper')) {
          return false
        }
        // Ignorar cambios de transform (que hace FixedZoom)
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const element = target as HTMLElement
          if (element.style.transform?.includes('scale')) {
            return false
          }
        }
        return true
      })

      if (relevantChanges) {
        // Silencioso - solo recalcular sin spam de logs
        lastMutationTime = now
        clearTimeout(mutationTimeout)
        mutationTimeout = setTimeout(() => updateScale('content-changed'), 800)
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
