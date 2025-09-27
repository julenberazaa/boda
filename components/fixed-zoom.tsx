'use client'

import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

export default function FixedZoom() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth
      const newScale = windowWidth / DESIGN_WIDTH
      
      // Aplicar el factor de escala al contenedor
      const fixedLayout = document.getElementById('fixed-layout')
      if (fixedLayout) {
        fixedLayout.style.transform = `scale(${newScale})`
        
        // INVESTIGACIÓN DEL PROBLEMA - Debug temporal
        const actualContentHeight = fixedLayout.scrollHeight
        const scaledHeight = actualContentHeight * newScale
        
        console.log('🔍 DEBUG FixedZoom:', {
          'scrollHeight (altura real del contenido)': actualContentHeight,
          'escala aplicada': newScale,
          'altura calculada (scaledHeight)': scaledHeight,
          'altura de ventana': window.innerHeight,
          'altura final que se va a aplicar': Math.max(window.innerHeight, scaledHeight)
        })
        
        // PROBLEMA POTENCIAL: ¿El scrollHeight está siendo excesivo?
        if (actualContentHeight > 10000) {
          console.warn('⚠️ ALTURA SOSPECHOSA:', actualContentHeight, 'px - esto podría estar causando el espacio extra')
        }
        
        // INVESTIGACIÓN ADICIONAL: verificar si hay elementos problemáticos
        const allElements = fixedLayout.querySelectorAll('*')
        let maxBottom = 0
        let problematicElement = null
        
        allElements.forEach(el => {
          const rect = el.getBoundingClientRect()
          const elementBottom = rect.bottom
          if (elementBottom > maxBottom) {
            maxBottom = elementBottom
            problematicElement = el
          }
        })
        
        if (maxBottom > window.innerHeight + 2000) {
          console.warn('🚨 ELEMENTO PROBLEMÁTICO ENCONTRADO:', {
            elemento: problematicElement,
            'posición bottom': maxBottom,
            'altura de ventana': window.innerHeight,
            'diferencia excesiva': maxBottom - window.innerHeight
          })
        }
        
        document.body.style.minHeight = `${Math.max(window.innerHeight, scaledHeight)}px`
        document.body.style.height = 'auto'
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
