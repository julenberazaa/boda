/**
 * CSS Debugging Utilities
 * Professional logging system to analyze which CSS rules are being applied
 */

export interface CSSRuleMatch {
  selector: string
  specificity: string
  properties: Record<string, string>
  source: string
  mediaQuery?: string
}

/**
 * Get all matching CSS rules for an element
 */
export function getMatchingCSSRules(element: Element): CSSRuleMatch[] {
  const matches: CSSRuleMatch[] = []

  if (!element) return matches

  // Iterate through all stylesheets
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      // Skip stylesheets from different origins (CORS)
      if (!sheet.cssRules) continue

      for (const rule of Array.from(sheet.cssRules)) {
        if (rule instanceof CSSStyleRule) {
          // Check if element matches this selector
          if (element.matches(rule.selectorText)) {
            const properties: Record<string, string> = {}

            // Extract all properties
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i]
              properties[prop] = rule.style.getPropertyValue(prop)
            }

            matches.push({
              selector: rule.selectorText,
              specificity: calculateSpecificity(rule.selectorText),
              properties,
              source: sheet.href || 'inline',
              mediaQuery: undefined
            })
          }
        } else if (rule instanceof CSSMediaRule) {
          // Check media query rules
          const mediaMatches = window.matchMedia(rule.media.mediaText).matches
          if (mediaMatches) {
            for (const innerRule of Array.from(rule.cssRules)) {
              if (innerRule instanceof CSSStyleRule && element.matches(innerRule.selectorText)) {
                const properties: Record<string, string> = {}

                for (let i = 0; i < innerRule.style.length; i++) {
                  const prop = innerRule.style[i]
                  properties[prop] = innerRule.style.getPropertyValue(prop)
                }

                matches.push({
                  selector: innerRule.selectorText,
                  specificity: calculateSpecificity(innerRule.selectorText),
                  properties,
                  source: sheet.href || 'inline',
                  mediaQuery: rule.media.mediaText
                })
              }
            }
          }
        }
      }
    } catch (e) {
      // Skip stylesheets that can't be accessed (CORS)
      console.debug('Could not access stylesheet:', sheet.href, e)
    }
  }

  return matches
}

/**
 * Calculate CSS specificity (simplified)
 * Returns format: "a,b,c" where a=IDs, b=classes/attributes, c=elements
 */
function calculateSpecificity(selector: string): string {
  let ids = 0
  let classes = 0
  let elements = 0

  // Count IDs
  ids = (selector.match(/#/g) || []).length

  // Count classes, attributes, pseudo-classes
  classes = (selector.match(/\./g) || []).length +
            (selector.match(/\[/g) || []).length +
            (selector.match(/:/g) || []).length

  // Count elements and pseudo-elements
  elements = (selector.match(/^[a-z]/gi) || []).length +
             (selector.match(/\s[a-z]/gi) || []).length +
             (selector.match(/::/g) || []).length

  return `${ids},${classes},${elements}`
}

/**
 * Get computed styles with source tracking
 */
export function getComputedStylesWithSource(element: Element, properties: string[]) {
  const computed = window.getComputedStyle(element)
  const matches = getMatchingCSSRules(element)

  const result: Record<string, {
    computed: string
    matchingRules: Array<{selector: string, value: string, specificity: string, mediaQuery?: string}>
  }> = {}

  for (const prop of properties) {
    const computedValue = computed.getPropertyValue(prop)
    const matchingRules = matches
      .filter(m => m.properties[prop])
      .map(m => ({
        selector: m.selector,
        value: m.properties[prop],
        specificity: m.specificity,
        mediaQuery: m.mediaQuery
      }))
      .sort((a, b) => {
        // Sort by specificity (descending)
        const [aId, aClass, aElem] = a.specificity.split(',').map(Number)
        const [bId, bClass, bElem] = b.specificity.split(',').map(Number)

        if (aId !== bId) return bId - aId
        if (aClass !== bClass) return bClass - aClass
        return bElem - aElem
      })

    result[prop] = {
      computed: computedValue,
      matchingRules
    }
  }

  return result
}

/**
 * Log carousel hierarchy with CSS rule matching
 */
export function logCarouselHierarchy(carouselElement: Element, experienceId: string) {
  const isMobile = window.innerWidth <= 767

  console.group(`🔍 CSS DEBUG: ${experienceId} [${isMobile ? 'MOBILE' : 'DESKTOP'}]`)

  // Log carousel itself
  console.group('📦 Carousel Container')
  console.log('Element:', carouselElement)
  console.log('Classes:', carouselElement.className)

  const carouselProps = ['width', 'height', 'position', 'display', 'overflow', 'max-width']
  const carouselStyles = getComputedStylesWithSource(carouselElement, carouselProps)

  for (const [prop, data] of Object.entries(carouselStyles)) {
    console.group(`${prop}: ${data.computed}`)
    if (data.matchingRules.length > 0) {
      data.matchingRules.forEach(rule => {
        console.log(
          `${rule.selector} [${rule.specificity}]${rule.mediaQuery ? ` @media ${rule.mediaQuery}` : ''}`,
          `→ ${rule.value}`
        )
      })
    } else {
      console.log('(inherited or default)')
    }
    console.groupEnd()
  }
  console.groupEnd()

  // Log parent hierarchy
  let parent = carouselElement.parentElement
  let depth = 0
  while (parent && depth < 5) {
    console.group(`📦 Parent ${depth}: ${parent.className || parent.tagName}`)

    const parentProps = ['width', 'height', 'max-width', 'padding', 'margin', 'position', 'display', 'overflow', 'transform']
    const parentStyles = getComputedStylesWithSource(parent, parentProps)

    for (const [prop, data] of Object.entries(parentStyles)) {
      if (data.matchingRules.length > 0) {
        console.group(`${prop}: ${data.computed}`)
        data.matchingRules.slice(0, 3).forEach(rule => {
          console.log(
            `${rule.selector} [${rule.specificity}]${rule.mediaQuery ? ` @media ${rule.mediaQuery}` : ''}`,
            `→ ${rule.value}`
          )
        })
        console.groupEnd()
      }
    }

    console.groupEnd()
    parent = parent.parentElement
    depth++
  }

  // Log frame if exists
  const frame = carouselElement.querySelector('img[alt=""]')
  if (frame) {
    console.group('🖼️ Frame Image')

    const frameProps = ['width', 'height', 'position', 'top', 'left', 'transform', 'max-width', 'object-fit']
    const frameStyles = getComputedStylesWithSource(frame, frameProps)

    for (const [prop, data] of Object.entries(frameStyles)) {
      console.group(`${prop}: ${data.computed}`)
      if (data.matchingRules.length > 0) {
        data.matchingRules.forEach(rule => {
          console.log(
            `${rule.selector} [${rule.specificity}]${rule.mediaQuery ? ` @media ${rule.mediaQuery}` : ''}`,
            `→ ${rule.value}`
          )
        })
      }
      console.groupEnd()
    }

    console.groupEnd()
  }

  console.groupEnd()
}
