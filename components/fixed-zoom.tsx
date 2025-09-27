'use client'

import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

export default function FixedZoom() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth

      // Solo aplicar fixed-zoom en desktop (≥768px)
      if (windowWidth < 768) {
        // En móvil, resetear cualquier transform
        const fixedLayout = document.getElementById('fixed-layout')
        if (fixedLayout) {
          fixedLayout.style.transform = 'none'
          fixedLayout.style.transformOrigin = 'unset'
        }
        setScale(1)
        return
      }

      const newScale = windowWidth / DESIGN_WIDTH
      const fixedLayout = document.getElementById('fixed-layout')

      if (fixedLayout) {
        // Aplicar escala solo en desktop
        fixedLayout.style.transform = `scale(${newScale})`
        fixedLayout.style.transformOrigin = 'top left'

        // Calcular altura escalada para el body
        const unscaledHeight = fixedLayout.scrollHeight
        const scaledHeight = unscaledHeight * newScale

        // Ajustar altura del body para permitir scroll correcto
        document.body.style.height = `${scaledHeight}px`
        document.body.style.minHeight = `${scaledHeight}px`
      }

      setScale(newScale)
    }

    // Ejecutar al montar
    updateScale()

    // Listener para resize
    const handleResize = () => {
      requestAnimationFrame(updateScale)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', () => {
      setTimeout(updateScale, 100)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', updateScale)
    }
  }, [])

  return null
}
