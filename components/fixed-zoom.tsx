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
      const wrapper = document.getElementById('fixed-layout-wrapper')
      const fixedLayout = document.getElementById('fixed-layout')
      const scrollRoot = document.getElementById('scroll-root')
      if (wrapper && fixedLayout && scrollRoot) {
        fixedLayout.style.transform = `scale(${newScale})`

        const scaledHeight = fixedLayout.getBoundingClientRect().height
        const elements = Array.from(scrollRoot.querySelectorAll('*')) as HTMLElement[]
        const nonAbsoluteBottom = elements.reduce((max, el) => {
          const style = window.getComputedStyle(el)
          if (style.position === 'absolute' || style.position === 'fixed') return max
          const rect = el.getBoundingClientRect()
          return Math.max(max, rect.bottom)
        }, 0)

        const measuredHeight = Math.max(nonAbsoluteBottom, scaledHeight)

        wrapper.style.height = `${scaledHeight}px`
        scrollRoot.style.minHeight = `${measuredHeight}px`
        scrollRoot.style.height = `${measuredHeight}px`

        console.log('📏 Heights:', { scaledHeight, nonAbsoluteBottom, measuredHeight })
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
