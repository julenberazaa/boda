'use client'

import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

export default function FixedZoom() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    let retryCount = 0
    const MAX_RETRIES = 3
    
    const updateScale = (source = 'initial') => {
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
          'retry': retryCount
        })

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

    // 2. Mutation Observer - detectar cambios dinámicos en contenido
    let mutationTimeout: NodeJS.Timeout
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimeout)
      mutationTimeout = setTimeout(() => updateScale('content-changed'), 200)
    })
    
    const fixedLayout = document.getElementById('fixed-layout')
    if (fixedLayout) {
      observer.observe(fixedLayout, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
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
