'use client'

import { useEffect } from 'react'

export default function DimensionLogger() {
  useEffect(() => {
    // Solo ejecutar en desktop para obtener medidas de referencia
    if (window.innerWidth < 768) return

    const logDimensions = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      console.log('🖥️ DESKTOP REFERENCE DIMENSIONS:')
      console.log(`Screen: ${screenWidth}x${screenHeight}px`)

      // Hero section
      const hero = document.querySelector('section') // Primera section (Hero)
      if (hero) {
        const heroRect = hero.getBoundingClientRect()
        const heroIcon = hero.querySelector('.w-16') // Heart icon
        const heroTitle = hero.querySelector('h1')
        const heroSubtitle = hero.querySelector('p')

        console.log('\n❤️ HERO SECTION:')
        console.log(`Hero container: ${heroRect.width}x${heroRect.height}px`)

        if (heroIcon) {
          const iconRect = heroIcon.getBoundingClientRect()
          console.log(`Icon size: ${iconRect.width}x${iconRect.height}px`)
        }

        if (heroTitle) {
          const titleRect = heroTitle.getBoundingClientRect()
          const titleStyle = window.getComputedStyle(heroTitle)
          console.log(`Title: ${titleRect.width}x${titleRect.height}px, fontSize: ${titleStyle.fontSize}`)
        }

        if (heroSubtitle) {
          const subtitleRect = heroSubtitle.getBoundingClientRect()
          const subtitleStyle = window.getComputedStyle(heroSubtitle)
          console.log(`Subtitle: ${subtitleRect.width}x${subtitleRect.height}px, fontSize: ${subtitleStyle.fontSize}`)
        }
      }

      // Timeline sections
      const timelineSections = document.querySelectorAll('section:not(:first-child)')
      timelineSections.forEach((section, index) => {
        if (index > 2) return // Solo los primeros 3 para no saturar

        const sectionRect = section.getBoundingClientRect()
        const imageContainer = section.querySelector('.relative.overflow-hidden')
        const contentContainer = section.querySelector('.space-y-6')
        const ageCircle = section.querySelector('.bg-sage')
        const titleElement = section.querySelector('h2')

        console.log(`\n📅 TIMELINE SECTION ${index + 1}:`)
        console.log(`Section: ${sectionRect.width}x${sectionRect.height}px`)

        if (imageContainer) {
          const imgRect = imageContainer.getBoundingClientRect()
          console.log(`Image container: ${imgRect.width}x${imgRect.height}px`)
        }

        if (contentContainer) {
          const contentRect = contentContainer.getBoundingClientRect()
          console.log(`Content container: ${contentRect.width}x${contentRect.height}px`)
        }

        if (ageCircle) {
          const circleRect = ageCircle.getBoundingClientRect()
          console.log(`Age circle: ${circleRect.width}x${circleRect.height}px`)
        }

        if (titleElement) {
          const titleRect = titleElement.getBoundingClientRect()
          const titleStyle = window.getComputedStyle(titleElement)
          console.log(`Title: ${titleRect.width}x${titleRect.height}px, fontSize: ${titleStyle.fontSize}`)
        }
      })

      // Spacing measurements
      console.log('\n📏 SPACING MEASUREMENTS:')
      const maxWidth = document.querySelector('.max-w-7xl')
      if (maxWidth) {
        const maxWidthRect = maxWidth.getBoundingClientRect()
        const paddingLeft = (screenWidth - maxWidthRect.width) / 2
        console.log(`Container max-width: ${maxWidthRect.width}px`)
        console.log(`Side padding: ${paddingLeft}px each side`)
        console.log(`Content width ratio: ${(maxWidthRect.width / screenWidth * 100).toFixed(1)}%`)
      }
    }

    // Delay para asegurar que todo está renderizado
    const timer = setTimeout(logDimensions, 1000)
    return () => clearTimeout(timer)
  }, [])

  return null
}