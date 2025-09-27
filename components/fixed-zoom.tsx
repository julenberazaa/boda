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
        
        // Ajustar altura del body utilizando la altura real renderizada
        const renderedHeight = fixedLayout.getBoundingClientRect().height
        const finalVideoSection = document.getElementById('final-video-section')
        const finalVideoBottom = finalVideoSection ? finalVideoSection.getBoundingClientRect().bottom : renderedHeight

        console.log('📐 FixedZoom metrics:', {
          renderedHeight,
          finalVideoBottom,
          windowHeight: window.innerHeight
        })

        const finalHeight = Math.max(window.innerHeight, Math.max(renderedHeight, finalVideoBottom))

        document.body.style.minHeight = `${finalHeight}px`
        document.body.style.height = `${finalHeight}px`
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
