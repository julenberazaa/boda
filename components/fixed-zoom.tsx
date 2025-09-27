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
        
        // INVESTIGACIÓN ESPECÍFICA DEL TIMELINE PROBLEMÁTICO
        console.log('🔬 ANÁLISIS DETALLADO DEL TIMELINE:')

        const timelineContainer = fixedLayout.querySelector('.w-full.relative')
        if (timelineContainer) {
          // Analizar elementos internos del timeline
          const timelineChildren = Array.from(timelineContainer.children)
          let totalChildHeight = 0

          console.log('  Elementos internos del timeline:')
          timelineChildren.forEach((child, index) => {
            const height = child.scrollHeight || child.getBoundingClientRect().height
            const tag = child.tagName
            const className = child.className.substring(0, 50)

            console.log(`    ${index + 1}. ${tag}: ${height}px (${className}...)`)

            if (height > 1000) {
              console.warn(`      ⚠️ Elemento grande: ${tag} con ${height}px`)
            }

            totalChildHeight += height
          })

          console.log(`  Suma de alturas internas: ${totalChildHeight}px`)
          console.log(`  Altura del contenedor timeline: ${timelineContainer.scrollHeight}px`)
          console.log(`  Diferencia: ${timelineContainer.scrollHeight - totalChildHeight}px`)
        }

        // INVESTIGACIÓN PROFUNDA: ¿Qué otros elementos inflan la altura total?
        console.log('🔬 INVESTIGACIÓN DE ALTURA REMANENTE:')

        // Analizar todas las secciones principales
        const sections = [
          { name: 'Hero Section', element: fixedLayout.querySelector('section:first-of-type') },
          { name: 'Timeline Container', element: timelineContainer },
          { name: 'Final Video Section', element: fixedLayout.querySelector('#final-video-section') },
          { name: 'Whole Content', element: fixedLayout }
        ]

        sections.forEach(({ name, element }) => {
          if (element) {
            const height = element.scrollHeight
            console.log(`  ${name}: ${height}px`)
          }
        })

        // Buscar elementos específicos que inflan el timeline
        const timelineElements = Array.from(timelineContainer?.querySelectorAll('*') || []).filter(el => {
          const height = el.scrollHeight || el.getBoundingClientRect().height
          return height > 2000
        }).map(el => ({
          tagName: el.tagName,
          className: el.className.substring(0, 40),
          height: el.scrollHeight || el.getBoundingClientRect().height,
          id: el.id
        }))

        if (timelineElements.length > 0) {
          console.warn('🔴 ELEMENTOS PROBLEMÁTICOS DENTRO DEL TIMELINE:', timelineElements)
        }

        // Calcular métricas finales
        const accountedHeight = sections.reduce((total, { element }) => total + (element ? element.scrollHeight : 0), 0)

        console.log('📊 MÉTRICAS FINALES:', {
          'Altura total': unscaledHeight + 'px',
          'Altura contabilizada': accountedHeight + 'px',
          'Altura visual': scaledHeight + 'px',
          'Ratio actual': (scaledHeight / window.innerHeight).toFixed(1) + 'x',
          'Objetivo': '2-3x'
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
