import type { Metadata } from 'next'
import './globals.css'
// Simplified layout - no platform-specific components needed
import EmergencyDebug from '@/components/emergency-debug'

export const metadata: Metadata = {
  title: 'Boda J&M',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* UNIFIED: Standard initialization for all devices */}

        {/* Favicon links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Pinyon+Script&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap" rel="stylesheet" />

        {/* Responsive design for all devices */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              overflow-x: hidden;
              overflow-y: auto;
              margin: 0;
              padding: 0;
            }

            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
              overflow-y: auto;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            #main-content {
              position: relative;
              width: 100%;
              min-height: 100vh;
            }

            /* MOBILE OVERRIDES - DISABLED - SEE globals.css FOR CLEAN MOBILE STYLES */
            @media (max-width: -1px) {
              /* HERO SECTION - Ultra high specificity overrides */
              section.relative.h-screen div.hero-mobile-container h1.font-playfair.font-bold.mb-4,
              section.relative div.hero-mobile-container h1,
              div.hero-mobile-container h1,
              .hero-mobile-container h1 {
                font-size: 16px !important;
                line-height: 18px !important;
                margin-bottom: 6px !important;
                font-weight: 700 !important;
              }

              section.relative.h-screen div.hero-mobile-container p.font-light.mb-8,
              section.relative div.hero-mobile-container p,
              div.hero-mobile-container p,
              .hero-mobile-container p {
                font-size: 12px !important;
                line-height: 14px !important;
                margin-bottom: 8px !important;
                font-weight: 300 !important;
              }

              /* HERO ICONS */
              .hero-mobile-container svg {
                width: 12px !important;
                height: 12px !important;
                min-width: 12px !important;
                min-height: 12px !important;
                max-width: 12px !important;
                max-height: 12px !important;
              }

              /* FALLBACK OVERRIDES - Direct targeting without class dependency */
              section.relative.h-screen div.relative.z-10 h1,
              section.relative.h-screen .relative.z-10 h1 {
                font-size: 16px !important;
                line-height: 18px !important;
                margin-bottom: 6px !important;
                font-weight: 700 !important;
              }

              section.relative.h-screen div.relative.z-10 p,
              section.relative.h-screen .relative.z-10 p {
                font-size: 12px !important;
                line-height: 14px !important;
                margin-bottom: 8px !important;
                font-weight: 300 !important;
              }

              /* FIX HERO CONTAINER LAYOUT CONFLICTS */
              /* Target the inline-block container that wraps the h1 */
              .inline-block.mx-auto.px-6.py-2 {
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin: 0 !important;
              }

              /* HERO HEART ICON - 44px size for mobile */
              .w-16.h-16.mx-auto.mb-0.animate-pulse {
                width: 44px !important;
                height: 44px !important;
                min-width: 44px !important;
                min-height: 44px !important;
                max-width: 44px !important;
                max-height: 44px !important;
              }

              /* HERO HEART CONTAINER - Reduce margin-bottom by 12px */
              .mb-8:has(.w-16.h-16.mx-auto.mb-0.animate-pulse) {
                margin-bottom: 20px !important; /* 32px - 12px = 20px */
              }

              /* TARGET THE MAIN PAGE H1 - This is what's showing in DevTools */
              h1.text-7xl.font-bold.mb-4.font-elegant,
              .inline-block h1.text-7xl,
              h1.font-elegant {
                font-size: 44px !important;
                line-height: 46px !important;
                margin: 0 !important;
                padding: 0 !important;
                font-weight: 700 !important;
                white-space: nowrap !important;
                overflow: visible !important;
                width: auto !important;
                text-align: center !important;
                display: block !important;
                flex-shrink: 0 !important;
              }

              /* HERO SECTION TEXT - Target the paragraph */
              p.text-xl.max-w-3xl.mx-auto.font-manuscript.hero-intro-text,
              .inline-block p.text-xl,
              p.hero-intro-text {
                font-size: 18px !important;
                line-height: 20px !important;
                margin-bottom: 8px !important;
              }

              /* TIMELINE SECTIONS - Target real classes */
              .timeline-mobile-container {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 6px !important;
                align-items: start !important;
                width: 100% !important;
                padding: 6px !important;
                margin: 0 !important;
                box-sizing: border-box !important;
              }

              /* Timeline age circles - Target real age-circle class */
              .timeline-mobile-container .age-circle,
              .timeline-mobile-container div.age-circle {
                width: 18px !important;
                height: 18px !important;
                min-width: 18px !important;
                min-height: 18px !important;
                max-width: 18px !important;
                max-height: 18px !important;
                font-size: 10px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }

              /* Timeline year text - Target real year-text class */
              .timeline-mobile-container .year-text,
              .timeline-mobile-container div.year-text {
                font-size: 9px !important;
                line-height: 10px !important;
              }

              /* Timeline titles - Target real h2 */
              .timeline-mobile-container h2.font-playfair.font-bold,
              .timeline-mobile-container h2 {
                font-size: 14px !important;
                line-height: 15px !important;
                margin-bottom: 3px !important;
                font-weight: 700 !important;
              }

              /* Timeline content paragraphs */
              .timeline-mobile-container p,
              .timeline-mobile-container div p {
                font-size: 10px !important;
                line-height: 11px !important;
                margin-bottom: 2px !important;
              }

              /* TIMELINE HISTORIA SECTIONS - Target real elements */
              /* Timeline titles: h3.text-5xl.font-script */
              h3.text-5xl.font-script,
              .timeline-item h3.text-5xl,
              h3.font-script {
                font-size: 14px !important;
                line-height: 15px !important;
                margin-bottom: 4px !important;
                font-weight: 700 !important;
              }

              /* Timeline text paragraphs: p.text-xl.font-semibold */
              p.text-xl.font-semibold.leading-relaxed.text-midnight\\/80.text-justify.font-manuscript,
              .timeline-item p.text-xl.font-semibold,
              .timeline-item p.font-manuscript {
                font-size: 10px !important;
                line-height: 11px !important;
                margin-bottom: 4px !important;
              }

              /* TIMELINE FLEXBOX SOLUTION - Mathematically correct approach */
              /* Convert grid to flexbox for precise control */
              section.timeline-item.mb-16.grid.grid-cols-12,
              section.timeline-item.grid.grid-cols-12,
              #conocidos-2010 {
                display: flex !important;
                gap: 8px !important; /* Exactly 8px as requested */
                width: calc(100vw - 12px) !important; /* Full viewport minus total container padding */
                margin: 0 auto !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                box-sizing: border-box !important;
                align-items: flex-start !important;
                overflow-x: hidden !important;
              }

              /* TIMELINE CONTAINER CENTERING - Perfect centering */
              .max-w-7xl.mx-auto,
              div.w-full.relative[style*="background"] .max-w-7xl,
              div.max-w-7xl.mx-auto.px-4.py-12 {
                margin-left: auto !important;
                margin-right: auto !important;
                max-width: 100vw !important;
                width: 100vw !important;
                padding-left: 6px !important; /* Container padding for safe margins */
                padding-right: 6px !important;
                box-sizing: border-box !important;
              }

              /* TIMELINE SECTION CENTERING - Prevent right displacement */
              section.timeline-item {
                margin-left: 0 !important;
                margin-right: 0 !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                width: 100% !important;
                max-width: 100vw !important;
                overflow-x: hidden !important;
              }

              /* ELIMINATE ALL LATERAL PADDING - Clean slate approach */
              section.timeline-item div.col-span-6.pr-8,
              section.timeline-item div.col-span-6.pr-12,
              section.timeline-item div.col-span-6.pl-8,
              section.timeline-item div.col-span-6.pl-12,
              #conocidos-2010 > div:first-child,
              #conocidos-2010 > div:last-child {
                padding-right: 0 !important;
                padding-left: 0 !important;
              }

              /* CONTENT-LEVEL PADDING - Now handled by column padding */
              section.timeline-item div.col-span-6 > .flex.items-center,
              section.timeline-item div.col-span-6 > h3,
              section.timeline-item div.col-span-6 > p,
              section.timeline-item div.col-span-6 > .p-6 {
                padding-left: 0 !important; /* Padding now handled at column level */
                padding-right: 0 !important;
                box-sizing: border-box !important;
              }

              /* FLEXBOX COLUMN SIZING - Mathematically correct */
              section.timeline-item div.col-span-6 {
                flex: 1 1 calc(50% - 4px) !important; /* Equal flex with gap consideration */
                max-width: calc(50% - 4px) !important; /* 50% minus half the 8px gap */
                width: calc(50% - 4px) !important;
                padding: 0 4px !important; /* Internal content padding */
                box-sizing: border-box !important;
                overflow-wrap: break-word !important;
                word-break: break-word !important;
                overflow: visible !important;
              }

              /* TEXT ALIGNMENT FIXES - Prevent text from pushing too far right or overflowing */
              /* Left column text alignment */
              section.timeline-item div.col-span-6:first-child .flex.items-center,
              section.timeline-item div.col-span-6:first-child h3,
              section.timeline-item div.col-span-6:first-child p {
                text-align: left !important;
                margin-left: 0 !important;
                max-width: 100% !important;
                overflow-wrap: break-word !important;
                word-break: break-word !important;
              }

              /* Right column text alignment and overflow prevention */
              section.timeline-item div.col-span-6:last-child .flex.items-center,
              section.timeline-item div.col-span-6:last-child h3,
              section.timeline-item div.col-span-6:last-child p {
                text-align: left !important;
                margin-right: 0 !important;
                max-width: 100% !important;
                overflow-wrap: break-word !important;
                word-break: break-word !important;
              }

              /* ADDITIONAL SAFETY - Prevent any content overflow */
              /* EXCEPCIÓN: No aplicar a .p-6 que tiene su propio width controlado */
              section.timeline-item div.col-span-6 *:not(.p-6):not(.p-6 *) {
                max-width: 100% !important;
                overflow-wrap: break-word !important;
                box-sizing: border-box !important;
              }

              /* RIGHT COLUMN SPECIFIC - Extra safety measures */
              section.timeline-item div.col-span-6:last-child {
                margin-right: 0 !important;
                padding-right: 4px !important; /* Ensure content doesn't touch edge */
              }

              /* CRITICAL FIX - Prevent content from being clipped or hidden */
              /* EXCEPCIÓN: No aplicar max-width a .p-6 que tiene width controlado */
              section.timeline-item div.col-span-6 *:not(.p-6):not(.p-6 *) {
                max-width: 100% !important;
                overflow: visible !important;
                white-space: normal !important;
                text-overflow: clip !important;
              }

              /* FORCE VISIBILITY - Ensure nothing gets clipped */
              section.timeline-item div.col-span-6:last-child {
                position: relative !important;
                z-index: 1 !important;
                overflow: visible !important;
              }

              /* IMAGE CONTAINERS - MODIFIED: Allow hidden for carousels */
              section.timeline-item div.col-span-6 div.p-6:not(:has(.relative)),
              section.timeline-item div.col-span-6 .p-6:not(:has(.relative)) {
                overflow: visible !important;
                position: relative !important;
              }

              /* OVERRIDE PROBLEMATIC INLINE STYLES - MODIFIED: Not for carousels */
              section.timeline-item div[style*="overflow: hidden"]:not(.p-6):not(.p-6 *) {
                overflow: visible !important;
              }

              /* CAROUSEL CONTAINERS - Ensure no clipping */
              section.timeline-item div[style*="height: calc(384px"] {
                overflow: visible !important;
              }

              /* TIMELINE INTERNAL SPACING - Minimize without accumulation */
              /* Section spacing between timeline items */
              section.timeline-item.mb-16 {
                margin-bottom: 6px !important; /* De 64px (mb-16) → 6px */
              }

              /* Header elements spacing */
              .timeline-item div.flex.items-center.mb-6,
              .timeline-item .flex.items-center.mb-6 {
                margin-bottom: 3px !important; /* De 24px (mb-6) → 3px */
              }

              /* Icon circle margin */
              .timeline-item .timeline-icon-circle.mr-4,
              .timeline-item div.timeline-icon-circle.mr-4 {
                margin-right: 2px !important; /* De 16px (mr-4) → 2px */
              }

              /* Content container padding */
              .timeline-item div.p-6,
              .timeline-item .p-6 {
                padding: 2px !important; /* De 24px (p-6) → 2px */
              }

              /* CAROUSEL SPACING CONSISTENCY - Single unified approach */
              /* All image/media containers get consistent structure */
              .timeline-item div[class*="col-span"] div.p-6 {
                padding: 1px !important;
                display: block !important;
                justify-content: unset !important;
              }

              /* IMAGE CONTAINER OPTIMIZATION - Full width utilization */
              .timeline-item div.p-6 div.relative[style*="width: 96%"] {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              /* Remove height container extra spacing */
              .timeline-item div.p-6 div[style*="height: calc(384px"] {
                margin: 0 !important;
                padding: 0 !important;
              }

              /* ENSURE IMAGES USE FULL AVAILABLE SPACE */
              section.timeline-item img {
                max-width: 100% !important;
                width: 100% !important;
                height: auto !important;
                object-fit: cover !important;
              }

              /* IMAGE CAROUSEL CONTAINERS - No overflow */
              section.timeline-item div.col-span-6 div.p-6 {
                overflow: hidden !important;
                box-sizing: border-box !important;
              }

              /* Timeline images */
              .timeline-mobile-container img {
                width: 100% !important;
                height: auto !important;
                max-height: 100px !important;
                object-fit: cover !important;
                border-radius: 4px !important;
              }

              /* Section spacing for mobile timeline */
              section .timeline-mobile-container {
                padding: 8px !important;
                min-height: 140px !important;
              }

              /* General mobile content - Fallback sizes */
              .block.md\\:hidden,
              .block.md\\:hidden * {
                font-size: 10px !important;
                line-height: 11px !important;
              }

              .block.md\\:hidden p {
                font-size: 10px !important;
                line-height: 11px !important;
                margin-bottom: 2px !important;
              }

              /* ADDITIONAL MOBILE OVERRIDES - SAME BREAKPOINT */
              @media screen and (max-width: 767px) {
                /* Ensure hero overrides have maximum priority */
                section.relative.h-screen .hero-mobile-container h1 {
                  font-size: 16px !important;
                  line-height: 18px !important;
                  margin-bottom: 6px !important;
                }

                section.relative.h-screen .hero-mobile-container p {
                  font-size: 12px !important;
                  line-height: 14px !important;
                  margin-bottom: 8px !important;
                }

                /* General icons */
                svg:not(.hero-mobile-container svg) {
                  width: 14px !important;
                  height: 14px !important;
                  max-width: 14px !important;
                  max-height: 14px !important;
                }

                /* Tuenti chat bubbles - make more horizontal/wider */
                .tuenti-message-bubble {
                  max-width: 90% !important;
                  width: auto !important;
                  padding: 4px 8px !important;
                  border-radius: 12px !important;
                  margin: 2px 0 !important;
                  font-size: 10px !important;
                  line-height: 11px !important;
                }

                /* Tuenti message text content - updated size */
                .tuenti-message-bubble span,
                .tuenti-sender-name {
                  font-size: 10px !important;
                  line-height: 11px !important;
                }

                .tuenti-message {
                  margin: 3px 0 !important;
                }

                .tuenti-message.outgoing .tuenti-message-bubble {
                  margin-left: 10% !important;
                  margin-right: 5% !important;
                }

                .tuenti-message.incoming .tuenti-message-bubble {
                  margin-left: 5% !important;
                  margin-right: 10% !important;
                }


                /* Compact header area (blue background) */
                .tc-header {
                  padding: 4px 8px !important;
                  margin: 0 !important;
                  min-height: auto !important;
                  height: auto !important;
                }

                .tc-title {
                  font-size: 10px !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  line-height: 1.2 !important;
                }

                .tc-window-controls {
                  padding: 0 !important;
                  margin: 0 !important;
                }

                .tc-btn {
                  padding: 2px 4px !important;
                  margin: 0 1px !important;
                  font-size: 8px !important;
                  line-height: 1 !important;
                }

                .tc-status {
                  margin: 0 !important;
                  width: 6px !important;
                  height: 6px !important;
                }

                /* Static chat body size - 12px shorter total */
                .tc-body {
                  padding: 6px !important;
                  margin: 0 !important;
                  min-height: 120px !important;
                  height: 120px !important;
                  padding-bottom: 2px !important;
                  overflow: hidden !important;
                }

                /* Tuenti chat container - Fixed width + height */
                .tuenti-chat {
                  width: 100% !important;
                  max-width: 100% !important;
                  min-width: 100% !important;
                  height: 192px !important;
                  min-height: 192px !important;
                  max-height: 192px !important;
                  overflow: hidden !important;
                  box-sizing: border-box !important;
                }

                /* SOLUTION: Force maximum width for Tuenti container from start */
                /* This prevents dynamic expansion during message animation */
                #conocidos-2010 > div:first-child {
                  width: 178px !important;  /* Reduced by 12px as requested */
                  min-width: 178px !important;
                  max-width: 178px !important;
                  overflow-x: hidden !important;  /* Prevent horizontal overflow */
                  flex-shrink: 0 !important;  /* Don't shrink in flex containers */
                }

                /* Header element positioning - circle → name → buttons */
                .tc-header {
                  display: flex !important;
                  align-items: center !important;
                  position: relative !important;
                  gap: 6px !important;
                }

                .tc-status {
                  order: 1 !important;
                  margin: 0 !important;
                  margin-left: 4px !important;
                  width: 6px !important;
                  height: 6px !important;
                  flex-shrink: 0 !important;
                }

                .tc-title {
                  order: 2 !important;
                  font-size: 10px !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  line-height: 1.2 !important;
                  margin-left: 8px !important;
                  flex-grow: 1 !important;
                  text-align: left !important;
                }

                .tc-window-controls {
                  order: 3 !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  margin-right: 4px !important;
                  flex-shrink: 0 !important;
                }

                /* Smaller button hover size */
                .tc-btn {
                  padding: 2px 4px !important;
                  margin: 0 1px !important;
                  font-size: 8px !important;
                  line-height: 1 !important;
                  width: 14px !important;
                  height: 14px !important;
                  display: inline-flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                }

                .tc-btn:hover {
                  transform: scale(0.9) !important;
                  padding: 1px 3px !important;
                }


                /* Ensure bubbles have relative positioning for triangles */
                .tuenti-message-bubble {
                  position: relative !important;
                }

                /* Remove shadow from Tuenti chat on mobile only */
                .tuenti-chat.custom-shadow-right-bottom {
                  box-shadow: none !important;
                }

                .tuenti-chat.custom-shadow-right-bottom:hover {
                  box-shadow: none !important;
                }


                /* Mobile-only Tuenti section layout override */
                #conocidos-2010 {
                  gap: 12px !important;  /* Consistent with global timeline spacing */
                  margin-top: 24px !important;
                }

                /* EQUAL MOBILE LAYOUT - 50/50 distribution */
                /* Perfectly equal columns: 50% media, 50% text */
                .timeline-item > div:first-child {
                  grid-column: span 6 !important;  /* 6/12 = 50% */
                  padding-right: 6px !important;
                  margin: 0 auto !important;
                }

                /* Tuenti container - fixed width, not percentage-based */
                #conocidos-2010 > div:first-child {
                  grid-column: span 6 !important;  /* Keep grid position */
                  padding-right: 6px !important;   /* Keep spacing */
                  margin: 0 auto !important;       /* Keep centering */
                  /* Width is controlled by the earlier rule at line 409 */
                }

                .timeline-item > div:last-child,
                #conocidos-2010 > div:last-child {
                  grid-column: span 6 !important;  /* 6/12 = 50% igual */
                  padding-left: 6px !important;
                  margin: 0 auto !important;
                }

                /* Apply same equal distribution to all timeline sections */
                section.timeline-item > div.col-span-6:first-child {
                  grid-column: span 6 !important;
                  padding-right: 6px !important;
                  margin: 0 auto !important;
                }

                section.timeline-item > div.col-span-6:last-child {
                  grid-column: span 6 !important;
                  padding-left: 6px !important;
                  margin: 0 auto !important;
                }

                /* Center the entire grid container */
                section.timeline-item.mb-16.grid.grid-cols-12,
                #conocidos-2010 {
                  max-width: calc(100vw - 16px) !important;
                  margin: 0 auto !important;
                  justify-items: center !important;
                }

                /* Plantas decorativas - mucho más pequeñas y en las esquinas para móviles */
                .absolute.inset-0.pointer-events-none.z-10 img {
                  width: 48px !important;
                  height: 48px !important;
                }

                .absolute.inset-0.pointer-events-none.z-10 img:nth-child(1) {
                  top: 4px !important;
                  left: 4px !important;
                }

                .absolute.inset-0.pointer-events-none.z-10 img:nth-child(2) {
                  top: 4px !important;
                  right: 4px !important;
                }

                .absolute.inset-0.pointer-events-none.z-10 img:nth-child(3) {
                  bottom: 4px !important;
                  left: 4px !important;
                }

                .absolute.inset-0.pointer-events-none.z-10 img:nth-child(4) {
                  bottom: 4px !important;
                  right: 4px !important;
                }

                /* CAROUSEL MOBILE FIX - Target carousel containers with auto heights */
                .timeline-item div[style*="height: calc(384px"],
                .timeline-item div[style*="height:calc(384px"] {
                  height: auto !important;
                  max-height: none !important;
                  min-height: 0 !important;
                  overflow: hidden !important;
                  display: block !important;
                }

                /* Ensure carousel wrapper visibility and proper sizing */
                .timeline-item div.p-6 div.relative[style*="width"],
                .timeline-item div.p-6 > div.relative {
                  width: 100% !important;
                  height: auto !important;
                  display: block !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }

                /* Force carousel content visibility and proper dimensions */
                .timeline-item div[style*="position: relative"] > div,
                .timeline-item div[style*="overflow: hidden"] > * {
                  display: block !important;
                  width: 100% !important;
                  height: 100% !important;
                  position: relative !important;
                }

                /* Ensure ImageCarousel component itself is visible */
                .timeline-item div[style*="height: calc(384px"] .relative.w-full.h-full,
                .timeline-item div[style*="overflow: hidden"] .relative {
                  width: 100% !important;
                  height: 100% !important;
                  display: block !important;
                }


                /* MOBILE CAROUSEL FIX - Centered with auto height */
                div[style*="calc(384px"] {
                  height: auto !important;
                  min-height: 0 !important;
                  max-height: none !important;
                  width: 100% !important;
                  min-width: 0 !important;
                  max-width: 100% !important;
                  display: block !important;
                  overflow: hidden !important;
                  position: relative !important;
                  margin: 0 auto !important; /* Center in column */
                }

                /* Ensure ImageCarousel component fills container */
                div[style*="calc(384px"] > * {
                  display: block !important;
                  width: 100% !important;
                  height: 100% !important;
                }

                /* Ensure carousel images display properly */
                div[style*="calc(384px"] img {
                  display: block !important;
                  width: 100% !important;
                  height: 100% !important;
                  object-fit: cover !important;
                }

                /* Ensure parent containers don't restrict width */
                .timeline-item .col-span-6 {
                  min-width: 200px !important;
                }

                /* ELIMINADO: min-width que bloqueaba el width: 64% de los carruseles */
                /* .timeline-item .col-span-6 div[class*="p-6"] { min-width: 180px !important; } */
                /* .timeline-item .col-span-6 div.relative[style*="width"] { min-width: 160px !important; } */


                /* TRIANGULOS MÓVILES - FINALES */
                .tuenti-message-bubble {
                  position: relative !important;
                }

                /* Primer mensaje - triángulo pequeño, más cerca, 4px más abajo */
                .tuenti-message:nth-child(1).tuenti-message.incoming .tuenti-message-bubble::before {
                  content: '' !important;
                  position: absolute !important;
                  left: -3px !important;
                  bottom: 2px !important;
                  width: 0 !important;
                  height: 0 !important;
                  border: 3px solid transparent !important;
                  border-right-color: #0096D6 !important;
                  border-left: 0 !important;
                  z-index: 1000 !important;
                  display: block !important;
                }

                /* Segundo mensaje - triángulo pequeño, más cerca, 4px más abajo */
                .tuenti-message:nth-child(2).tuenti-message.incoming .tuenti-message-bubble::before {
                  content: '' !important;
                  position: absolute !important;
                  left: -3px !important;
                  bottom: 2px !important;
                  width: 0 !important;
                  height: 0 !important;
                  border: 3px solid transparent !important;
                  border-right-color: #0096D6 !important;
                  border-left: 0 !important;
                  z-index: 1000 !important;
                  display: block !important;
                }

                /* Tercer mensaje - triángulo pequeño, más cerca, posición normal */
                .tuenti-message:nth-child(3).tuenti-message.incoming .tuenti-message-bubble::before {
                  content: '' !important;
                  position: absolute !important;
                  left: -3px !important;
                  bottom: 6px !important;
                  width: 0 !important;
                  height: 0 !important;
                  border: 3px solid transparent !important;
                  border-right-color: #0096D6 !important;
                  border-left: 0 !important;
                  z-index: 1000 !important;
                  display: block !important;
                }

                /* Cuarto mensaje (outgoing) - triángulo pequeño, más cerca */
                .tuenti-message:nth-child(4).tuenti-message.outgoing .tuenti-message-bubble::after {
                  content: '' !important;
                  position: absolute !important;
                  right: -3px !important;
                  bottom: 6px !important;
                  width: 0 !important;
                  height: 0 !important;
                  border: 3px solid transparent !important;
                  border-left-color: #0096D6 !important;
                  border-right: 0 !important;
                  z-index: 1000 !important;
                  display: block !important;
                }

              }
            }

            /* TRIANGULOS DESKTOP (DOBLE DE GRANDES) */
            .tuenti-message-bubble {
              position: relative !important;
            }

            .tuenti-message.incoming .tuenti-message-bubble::before {
              content: '' !important;
              position: absolute !important;
              left: -4px !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              width: 0 !important;
              height: 0 !important;
              border: 16px solid transparent !important;
              border-right-color: #0096D6 !important;
              border-left: 0 !important;
              z-index: 1000 !important;
              display: block !important;
            }

            .tuenti-message.outgoing .tuenti-message-bubble::after {
              content: '' !important;
              position: absolute !important;
              right: -4px !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              width: 0 !important;
              height: 0 !important;
              border: 16px solid transparent !important;
              border-left-color: #0096D6 !important;
              border-right: 0 !important;
              z-index: 1000 !important;
              display: block !important;
            }

            /* TRIANGULOS MÓVILES (30% MÁS PEQUEÑOS) */
            @media (max-width: 768px) {
              .tuenti-message.incoming .tuenti-message-bubble::before {
                border: 7px solid transparent !important;
                border-right-color: #0096D6 !important;
                border-left: 0 !important;
                left: -2px !important;
              }

              .tuenti-message.outgoing .tuenti-message-bubble::after {
                border: 7px solid transparent !important;
                border-left-color: #0096D6 !important;
                border-right: 0 !important;
                right: -2px !important;
              }

              /* GLOBOS MÓVILES - 2px menos radio de borde */
              .tuenti-message-bubble {
                border-radius: 13px !important;
              }

              .tuenti-message.incoming .tuenti-message-bubble {
                border-bottom-left-radius: 3px !important;
              }

              .tuenti-message.outgoing .tuenti-message-bubble {
                border-bottom-right-radius: 3px !important;
              }
            }

              /* Hero section responsive height - Better mobile experience */
              @media (max-width: 767px) {
                section[style*="minHeight: '480px'"] {
                  min-height: 524px !important;
                }

                /* HERO TEXT OVERRIDES - Ultimate specificity */
                section.relative.h-screen .hero-mobile-container h1.font-playfair,
                section[style*="minHeight: '480px'"] .hero-mobile-container h1,
                .hero-mobile-container h1 {
                  font-size: 16px !important;
                  line-height: 18px !important;
                  margin-bottom: 6px !important;
                }

                section.relative.h-screen .hero-mobile-container p.font-light,
                section[style*="minHeight: '480px'"] .hero-mobile-container p,
                .hero-mobile-container p {
                  font-size: 12px !important;
                  line-height: 14px !important;
                  margin-bottom: 8px !important;
                }

                /* ULTRA-AGGRESSIVE TIMELINE FIX - MAXIMUM SPECIFICITY */
                /* Force exact 50% width with 8px gap - Nuclear option */
                html body div div div section.timeline-item.mb-16.grid.grid-cols-12.gap-8,
                html body div div div section.timeline-item.grid.grid-cols-12.gap-8,
                html body div div div #conocidos-2010 {
                  display: flex !important;
                  width: calc(100vw - 8px) !important;
                  margin: 0 auto !important;
                  gap: 8px !important; /* EXACTAMENTE 8px entre columnas */
                  padding: 0 4px !important;
                  box-sizing: border-box !important;
                  align-items: center !important; /* CENTRADO VERTICAL: carrusel + texto */
                  margin-bottom: 24px !important; /* Restaurar espaciado vertical entre secciones */
                }

                /* COLUMN SIZING - NUCLEAR OPTION */
                html body div div div section.timeline-item div.col-span-6,
                html body div div div #conocidos-2010 > div {
                  flex: 0 0 calc(50% - 4px) !important;
                  width: calc(50% - 4px) !important;
                  max-width: calc(50% - 4px) !important;
                  min-width: calc(50% - 4px) !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  box-sizing: border-box !important;
                  overflow: visible !important; /* Default para textos */
                }

                /* COLUMN OVERFLOW - Hidden solo para columnas con carruseles */
                html body div div div section.timeline-item div.col-span-6:has(.p-6),
                html body div div div #conocidos-2010 > div:has(.p-6) {
                  overflow: hidden !important; /* Contiene carruseles dentro de límites */
                }

                /* ELIMINATE ALL TAILWIND PADDING */
                html body div div div section.timeline-item div.col-span-6.pr-8,
                html body div div div section.timeline-item div.col-span-6.pr-12,
                html body div div div section.timeline-item div.col-span-6.pl-8,
                html body div div div section.timeline-item div.col-span-6.pl-12 {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }

                /* ELIMINATE ALL PADDING - Complete nuclear option */
                /* EXCEPCIÓN: No aplicar a elementos de Tuenti para mantener su lógica separada */
                html body div div div section.timeline-item div.col-span-6,
                html body div div div section.timeline-item div.col-span-6 *:not(.tuenti-chat):not(.tuenti-chat *),
                html body div div div #conocidos-2010 > div:not(.tuenti-chat),
                html body div div div #conocidos-2010 > div *:not(.tuenti-chat):not(.tuenti-chat *) {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }

                /* HEADER SPACING RESTORATION */
                html body div div div section.timeline-item .flex.items-center.mb-6 {
                  margin-bottom: 12px !important;
                }

                /* ICON CIRCLE SPACING */
                html body div div div section.timeline-item .timeline-icon-circle.mr-4 {
                  margin-right: 8px !important;
                }

                /* INTERNAL CONTENT MARGIN - Use margin instead of padding for breathing room */
                html body div div div section.timeline-item div.col-span-6 > div:not(.p-6),
                html body div div div section.timeline-item div.col-span-6 > h3,
                html body div div div section.timeline-item div.col-span-6 > p {
                  margin-left: 2px !important;
                  margin-right: 2px !important;
                }

                /* CAROUSEL CONTAINER FIX - Eliminate padding from .p-6 containers */
                html body div div div section.timeline-item div.p-6,
                html body div div div section.timeline-item .p-6,
                html body div div div #conocidos-2010 div.p-6 {
                  padding: 0 !important;
                  width: 100% !important;
                  box-sizing: border-box !important;
                }

                /* CAROUSEL WIDTH FIX - Force 100% width instead of 96% */
                html body div div div section.timeline-item .p-6 div.relative,
                html body div div div section.timeline-item div.p-6 > div,
                html body div div div section.timeline-item div[style*="width: 96%"] {
                  width: 100% !important;
                  max-width: 100% !important;
                  margin: 0 !important;
                }

                /* CAROUSEL IMAGES - Respect column boundaries */
                html body div div div section.timeline-item div.col-span-6 img,
                html body div div div section.timeline-item .p-6 img,
                html body div div div #conocidos-2010 img {
                  max-width: 100% !important;
                  width: 100% !important;
                  height: auto !important;
                  object-fit: cover !important;
                }

                /* CAROUSEL OVERFLOW CONTROL */
                html body div div div section.timeline-item div[style*="overflow"],
                html body div div div section.timeline-item .p-6 > div {
                  overflow: visible !important;
                  max-width: 100% !important;
                }

                /* CAROUSEL ASPECT RATIO FIX - 3:4 (horizontal:vertical) - NUCLEAR OVERRIDE */
                /* MÁXIMA ESPECIFICIDAD para sobrescribir reglas anteriores */

                /* Contenedor p-6 - Width responsive con límites, sin aspect-ratio forzado */
                html body div div div section.timeline-item.mb-16 div.col-span-6 > div.p-6,
                html body div div div section.timeline-item.grid div.col-span-6 > div.p-6,
                html body div div div section.timeline-item div.col-span-6 > div.p-6,
                html body div div div section.timeline-item div.col-span-6 div.p-6,
                html body div div div #conocidos-2010 div.col-span-6 > div.p-6 {
                  width: clamp(280px, 70vw, 480px) !important;
                  height: auto !important;
                  display: block !important;
                  padding: 0 !important;
                  margin: 0 auto !important; /* Centrado horizontal */
                  box-sizing: border-box !important;
                  position: relative !important;
                  overflow: visible !important; /* CRÍTICO: visible para mostrar frames */
                  min-height: 0 !important;
                  max-height: none !important;
                }

                /* div.relative dentro de p-6 - Sin aspect ratio forzado */
                html body div div div section.timeline-item.mb-16 div.p-6 > div.relative,
                html body div div div section.timeline-item.grid div.p-6 > div.relative,
                html body div div div section.timeline-item div.p-6 > div.relative,
                html body div div div section.timeline-item div.p-6 div.relative {
                  width: 100% !important;
                  height: auto !important;
                  position: relative !important;
                  overflow: visible !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  box-sizing: border-box !important;
                  min-height: 0 !important;
                  max-height: none !important;
                }

                /* div con style inline height: calc - Override height pero sin aspect-ratio forzado */
                html body div div div section.timeline-item.mb-16 div[style*="height: calc"],
                html body div div div section.timeline-item.grid div[style*="height: calc"],
                html body div div div section.timeline-item div[style*="height: calc"],
                html body div div div section.timeline-item div[style*="height:"],
                html body div div div section.timeline-item div.p-6 div[style*="height"] {
                  height: auto !important;
                  width: 100% !important;
                  min-height: 0 !important;
                  max-height: none !important;
                  overflow: visible !important;
                  position: relative !important;
                }

                /* Asegurar que imágenes/videos dentro del carrusel se ajusten al alto sin recortar */
                html body div div div section.timeline-item .p-6 img,
                html body div div div section.timeline-item .p-6 video,
                html body div div div section.timeline-item div.relative img,
                html body div div div section.timeline-item div.relative video {
                  position: absolute !important;
                  top: 0 !important;
                  left: 0 !important;
                  width: 100% !important;
                  height: 100% !important;
                  object-fit: contain !important; /* Cambiado de cover a contain para no recortar */
                }

                /* Frame overlay mantiene posición sobre el carrusel */
                html body div div div section.timeline-item .p-6 img[alt=""],
                html body div div div section.timeline-item div.relative img[alt=""] {
                  pointer-events: none !important;
                  z-index: 30 !important;
                  position: absolute !important;
                }

                /* ===== CAROUSEL CENTERING FIX - CRITICAL ===== */

                /* STEP 1: Remove desktop scale from transform container */
                html body div div div section.timeline-item div.p-6 > div.relative > div[style*="transform: scale"],
                html body div div div section.timeline-item div.p-6 > div.relative > div[style*="transform:scale"] {
                  transform: scale(1) !important;
                  max-width: 100% !important;
                  overflow: visible !important;
                }

                /* STEP 2: Force cropBox to center (override inline left/top from calibration) */
                html body div div div section.timeline-item div.p-6 div.relative.w-full.h-full > div > div[style*="position: absolute"],
                html body div div div section.timeline-item div.p-6 div[style*="overflow"] > div[style*="position: absolute"] {
                  width: 80% !important;
                  height: 80% !important;
                  left: 50% !important;
                  top: 50% !important;
                  transform: translate(-50%, -50%) !important;
                }

                /* STEP 3: Remove frame scale (causes misalignment) */
                html body div div div section.timeline-item div.p-6 img[alt=""],
                html body div div div section.timeline-item div.relative img[alt=""] {
                  transform: translate(-50%, -50%) scale(1) !important;
                }

                /* STEP 4: Center the .p-6 container itself */
                html body div div div section.timeline-item div.p-6 {
                  display: flex !important;
                  justify-content: center !important;
                  align-items: center !important;
                  margin: 0 auto !important;
                }
            }
          `
        }} />

      </head>
      <body>
        <div id="main-content">
          {children}
        </div>
        <EmergencyDebug />
      </body>
    </html>
  )
}