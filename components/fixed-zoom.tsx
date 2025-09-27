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
        
        // INVESTIGACIÓN ESPECÍFICA DEL TIMELINE
        const timelineContainer = fixedLayout.querySelector('.w-full.relative')
        if (timelineContainer) {
          console.log('🕵️ INVESTIGACIÓN DETALLADA DEL TIMELINE:')
          
          // Analizar todas las secciones del timeline
          const timelineSections = timelineContainer.querySelectorAll('section')
          console.log(`  Total secciones encontradas: ${timelineSections.length}`)
          
          timelineSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect()
            const height = section.scrollHeight || rect.height
            const id = section.id || `section-${index}`
            console.log(`    Sección ${index + 1} (${id}):`, {
              'altura': height,
              'top': rect.top,
              'bottom': rect.bottom,
              'clase': section.className.substring(0, 50) + '...'
            })
            
            if (height > 1000) {
              console.warn(`      ⚠️ Sección excesiva: ${id} con ${height}px`)
            }
          })
          
          // Buscar elementos específicos problemáticos dentro del timeline
          const problematicElements = Array.from(timelineContainer.querySelectorAll('*')).filter(el => {
            const height = el.scrollHeight || el.getBoundingClientRect().height
            return height > 2000
          })
          
          if (problematicElements.length > 0) {
            console.warn('🔴 ELEMENTOS PROBLEMÁTICOS EN TIMELINE:', 
              problematicElements.map(el => ({
                tagName: el.tagName,
                className: el.className.substring(0, 30),
                height: el.scrollHeight || el.getBoundingClientRect().height,
                id: el.id
              }))
            )
          }
        }

        // Buscar elementos con altura anormalmente alta
        const allElements = Array.from(fixedLayout.querySelectorAll('*'))
        const suspiciousElements = allElements.filter(el => {
          const height = el.scrollHeight || el.getBoundingClientRect().height
          return height > 3000 // Elementos con más de 3000px
        }).map(el => ({
          element: el,
          height: el.scrollHeight || el.getBoundingClientRect().height,
          className: el.className,
          tagName: el.tagName
        }))

        if (suspiciousElements.length > 0) {
          console.warn('⚠️ ELEMENTOS CON ALTURA EXCESIVA DETECTADOS:', suspiciousElements)
        }

        console.log('📏 RESUMEN SCROLL:', {
          'altura original total': unscaledHeight,
          'altura escalada': scaledHeight,
          'altura ventana': window.innerHeight,
          'escala': newScale,
          'ratio altura/ventana': (scaledHeight / window.innerHeight).toFixed(2) + 'x'
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
