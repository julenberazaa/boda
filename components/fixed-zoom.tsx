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

        // Obtener altura sin escalar
        const originalTransform = fixedLayout.style.transform
        fixedLayout.style.transform = ''
        const unscaledHeight = fixedLayout.scrollHeight
        fixedLayout.style.transform = originalTransform

        // Calcular altura escalada real
        const scaledHeight = unscaledHeight * newScale
        
        // Configurar el wrapper y scroll root para el scroll correcto
        wrapper.style.height = `${window.innerHeight}px`
        scrollRoot.style.height = `${window.innerHeight}px`
        
        // El contenido escalado debe tener la altura correcta dentro del scroll container
        const contentHeight = scaledHeight
        fixedLayout.style.height = `${unscaledHeight}px` // Mantener altura original para el contenido
        
        // Configurar el scroll root para que tenga la altura correcta de scroll
        scrollRoot.style.overflowY = 'auto'
        scrollRoot.scrollTop = 0 // Reset scroll position
        
        // INVESTIGACIÓN EXHAUSTIVA: ¿Qué está inflando la altura?
        console.log('🔬 ANÁLISIS EXHAUSTIVO DE ALTURA:')
        
        // 1. Analizar secciones principales individualmente
        const mainSections = [
          { name: 'Hero Section', selector: 'section:first-of-type' },
          { name: 'Timeline Wrapper', selector: '.w-full.relative' },
          { name: 'Final Video Section', selector: '#final-video-section' }
        ]
        
        let totalAccountedHeight = 0
        
        mainSections.forEach(({ name, selector }) => {
          const element = fixedLayout.querySelector(selector)
          if (element) {
            const height = element.scrollHeight
            totalAccountedHeight += height
            console.log(`  ${name}: ${height}px`)
          }
        })
        
        // 2. Buscar elementos "flotantes" que infletan la altura
        const problematicSelectors = [
          '.absolute',
          '.fixed', 
          '[style*="position: absolute"]',
          '[style*="position: fixed"]',
          '.timeline-item',
          'iframe'
        ]
        
        problematicSelectors.forEach(selector => {
          const elements = Array.from(fixedLayout.querySelectorAll(selector))
          elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect()
            const height = el.scrollHeight || rect.height
            if (height > 500) {
              console.log(`  ${selector}[${index}]: ${height}px (${el.className.substring(0, 30)}...)`)
            }
          })
        })
        
        // 3. Identificar "altura fantasma"
        const heightDifference = unscaledHeight - totalAccountedHeight
        console.log(`  💀 ALTURA FANTASMA: ${heightDifference}px (diferencia inexplicada)`)
        
        // 4. Métricas finales
        console.log('📊 RESUMEN FINAL:', {
          'altura total': unscaledHeight,
          'altura contabilizada': totalAccountedHeight,
          'altura fantasma': heightDifference,
          'altura visual final': scaledHeight,
          'debería ser máximo': (window.innerHeight * 3) + 'px',
          'ratio actual': (scaledHeight / window.innerHeight).toFixed(1) + 'x',
          'ratio objetivo': '2-3x'
        })

        // El body ya no necesita altura específica
        document.body.style.height = '100vh'
        document.body.style.minHeight = '100vh'
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
