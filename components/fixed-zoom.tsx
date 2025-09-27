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

        // 🔍 PREVENIR LOOPS: Solo actualizar si hay cambio significativo 
        const heightDiff = Math.abs(unscaledHeight - lastHeight)
        if (source === 'content-changed' && heightDiff < 50) {
          console.log(`⚠️ SKIP: cambio menor (${heightDiff}px) - no recalcular`)
          return
        }

        // 🔒 MARCAR COMO ACTUALIZANDO
        setIsUpdating(true)

        // Calcular altura visual (escalada)
        const scaledHeight = unscaledHeight * newScale
        
        // CLAVE: El scroll-spacer define el área de scroll = altura visual
        scrollSpacer.style.height = `${scaledHeight}px`
        
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
        
        console.log(`🔧 FIXEDZOOM [${source}]:`, {
          'altura DOM original': unscaledHeight + 'px',
          'altura visual escalada': scaledHeight + 'px', 
          'scroll area': scrollSpacer.style.height,
          'escala': newScale,
          'ventana': window.innerHeight + 'px',
          'retry': retryCount,
          'cambio altura': heightDiff + 'px'
        })

        // 🔍 DEBUG ESPECIAL: Investigar "cosa blanca" al final
        if (newScale < 0.3) { // Solo en móviles
          setTimeout(() => {
            const spacerHeight = parseInt(scrollSpacer.style.height)
            const actualScrollHeight = scrollRoot.scrollHeight
            const maxScrollTop = scrollRoot.scrollHeight - scrollRoot.clientHeight
            
            console.log(`🔍 DEBUG MÓVIL - "cosa blanca":`, {
              'scroll-spacer height': spacerHeight + 'px',
              'scroll-root scrollHeight': actualScrollHeight + 'px',
              'scroll-root clientHeight': scrollRoot.clientHeight + 'px',
              'max scroll possible': maxScrollTop + 'px',
              'diferencia spacer vs real': (actualScrollHeight - spacerHeight) + 'px'
            })

            // Buscar elementos que sobresalen
            const overflowElements = Array.from(fixedLayout.querySelectorAll('*')).filter(el => {
              const rect = el.getBoundingClientRect()
              return rect.bottom > (spacerHeight + 100) // 100px margen
            }).slice(0, 3) // Solo top 3

            if (overflowElements.length > 0) {
              console.warn(`⚠️ ELEMENTOS QUE SOBRESALEN:`, overflowElements.map(el => ({
                tag: el.tagName,
                class: el.className.substring(0, 30),
                bottom: el.getBoundingClientRect().bottom + 'px'
              })))
            }
          }, 200)
        }

        // Actualizar altura guardada
        setLastHeight(unscaledHeight)
        
        // 🔓 LIBERAR LOCK después de un momento
        setTimeout(() => setIsUpdating(false), 100)

        // En móviles, verificar si necesitamos recalcular
        if (source === 'initial' && newScale < 0.3 && retryCount < MAX_RETRIES) {
          retryCount++
          console.log(`📱 MÓVIL: Reintentando cálculo en 500ms (intento ${retryCount})`)
          setTimeout(() => updateScale('retry'), 500)
        }
      }
      
      setScale(newScale)
    }

    // Ejecutar al montar
    updateScale()

    // 1. Content loaded listener - para cuando imágenes estén cargadas
    const handleContentLoaded = () => {
      console.log('📸 CONTENT LOADED: Recalculando altura después de cargar imágenes')
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
        console.log(`📝 MUTATION: Cambio relevante detectado, recalculando en 800ms`)
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
