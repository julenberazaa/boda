"use client"

import { useEffect, RefObject } from 'react'

/**
 * Hook for carousel resize handling with universal browser support
 *
 * Strategy:
 * 1. Prefer CSS container queries (modern browsers)
 * 2. Fallback to ResizeObserver with debounce for older browsers
 *
 * @param containerRef - Ref to carousel container element
 * @param onResize - Callback when resize occurs (optional, for custom logic)
 * @param enabled - Enable/disable observer (default: true)
 */
export function useCarouselResize(
  containerRef: RefObject<HTMLElement | null>,
  onResize?: (width: number, height: number) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    // Check if container queries are supported
    const supportsContainerQueries =
      'container' in document.documentElement.style ||
      'containerType' in document.documentElement.style

    // If container queries supported, CSS handles everything
    if (supportsContainerQueries) {
      return
    }

    // Fallback: ResizeObserver with debounce for older browsers
    let timeoutId: NodeJS.Timeout | undefined

    const observer = new ResizeObserver(entries => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        const entry = entries[0]
        if (entry && onResize) {
          const { width, height } = entry.contentRect
          onResize(width, height)
        }
      }, 150) // 150ms debounce - balance between responsiveness and performance
    })

    observer.observe(containerRef.current)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      observer.disconnect()
    }
  }, [containerRef, onResize, enabled])
}
