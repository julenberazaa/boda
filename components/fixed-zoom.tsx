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
        
        // INVESTIGACIÓN ESPECÍFICA: buscar todos los div.p-6 problemáticos
        const p6Elements = fixedLayout.querySelectorAll('div.p-6')
        console.log('📊 ANÁLISIS DE ELEMENTOS p-6:')
        
        p6Elements.forEach((el, index) => {
          const rect = el.getBoundingClientRect()
          const parentId = el.closest('[id]')?.id || 'sin-id'
          const hasImageCarousel = el.querySelector('[class*="image-carousel"], img, iframe') ? 'SÍ' : 'NO'
          
          console.log(`  ${index + 1}. div.p-6:`, {
            'altura (height)': rect.height,
            'posición bottom': rect.bottom,
            'padre cercano con ID': parentId,
            'contiene imágenes/video': hasImageCarousel,
            'elemento': el
          })
          
          if (rect.height > 1000) {
            console.warn(`    ⚠️ ALTURA SOSPECHOSA en div.p-6 #${index + 1}:`, rect.height, 'px')
          }
        })
        
        // También verificar elementos con altura excesiva en general
        const allElements = fixedLayout.querySelectorAll('*')
        let maxBottom = 0
        let problematicElement = null
        
        allElements.forEach(el => {
          const rect = el.getBoundingClientRect()
          if (rect.height > 2000) {
            console.warn('🔴 ELEMENTO CON ALTURA EXCESIVA:', {
              elemento: el,
              altura: rect.height,
              'clase': el.className,
              'tag': el.tagName
            })
          }
          
          if (rect.bottom > maxBottom) {
            maxBottom = rect.bottom
            problematicElement = el
          }
        })
        
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
