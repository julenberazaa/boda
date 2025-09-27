'use client'

import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

export default function FixedZoom() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
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
        
        // Reset scroll position
        scrollRoot.scrollTop = 0
        
        // Body no necesita altura específica
        document.body.style.height = '100vh'
        document.body.style.minHeight = '100vh'
        
        console.log('🔧 FIXEDZOOM CORREGIDO:', {
          'altura DOM original': unscaledHeight + 'px',
          'altura visual escalada': scaledHeight + 'px', 
          'scroll area': scrollSpacer.style.height,
          'escala': newScale,
          'ventana': window.innerHeight + 'px'
        })
      }
      
      setScale(newScale)
    }

    // Ejecutar al montar
    updateScale()

    // Escuchar cambios de tamaño con throttling
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateScale, 16) // ~60fps
    }

    window.addEventListener('resize', handleResize)
    
    // Escuchar orientationchange para dispositivos móviles
    window.addEventListener('orientationchange', () => {
      setTimeout(updateScale, 100) // Delay para que el navegador termine la rotación
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', updateScale)
      clearTimeout(timeoutId)
    }
  }, [])

  // Este componente no renderiza nada visible
  return null
}
