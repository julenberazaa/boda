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

            /* NUCLEAR MOBILE OVERRIDES - Maximum specificity */
            @media (max-width: 767px) {
              /* HERO SECTION - Ultra specific targeting */
              section.relative.h-screen .relative.z-10.text-center svg.mobile-hero-icon,
              .mobile-hero-icon {
                width: 12px !important;
                height: 12px !important;
                min-width: 12px !important;
                min-height: 12px !important;
                max-width: 12px !important;
                max-height: 12px !important;
              }

              section.relative.h-screen .relative.z-10.text-center h1.mobile-hero-title,
              .mobile-hero-title {
                font-size: 16px !important;
                line-height: 18px !important;
                margin-bottom: 6px !important;
                font-weight: 700 !important;
              }

              section.relative.h-screen .relative.z-10.text-center p.mobile-hero-subtitle,
              .mobile-hero-subtitle {
                font-size: 10px !important;
                line-height: 12px !important;
                margin-bottom: 12px !important;
                max-width: 280px !important;
                font-weight: 300 !important;
              }

              /* TIMELINE SECTIONS - Nuclear overrides */
              .mobile-timeline-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 4px !important;
                align-items: start !important;
                width: 100% !important;
                padding: 4px !important;
                margin: 0 !important;
                box-sizing: border-box !important;
              }

              /* Mobile timeline content - All text super small */
              .mobile-timeline-content,
              .mobile-timeline-content * {
                font-size: 8px !important;
                line-height: 9px !important;
                padding: 2px !important;
                margin: 1px 0 !important;
              }

              .mobile-timeline-media {
                padding: 1px !important;
              }

              /* Age circles - Tiny */
              .mobile-age-circle,
              div.mobile-age-circle,
              .mobile-timeline-content .mobile-age-circle,
              .mobile-timeline-media .mobile-age-circle {
                width: 16px !important;
                height: 16px !important;
                min-width: 16px !important;
                min-height: 16px !important;
                max-width: 16px !important;
                max-height: 16px !important;
                font-size: 8px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }

              /* Timeline titles */
              .mobile-timeline-title,
              h2.mobile-timeline-title {
                font-size: 10px !important;
                line-height: 11px !important;
                margin-bottom: 2px !important;
                font-weight: 700 !important;
              }

              /* Year text */
              .mobile-year-text {
                font-size: 7px !important;
                line-height: 8px !important;
              }

              /* Section spacing */
              section.mobile-section {
                padding: 8px !important;
                min-height: 140px !important;
              }

              /* Images - Very small */
              .mobile-image,
              .mobile-timeline-media img {
                width: 100% !important;
                height: auto !important;
                max-height: 80px !important;
                object-fit: cover !important;
                border-radius: 4px !important;
              }

              /* Overrides for ALL mobile content */
              .block.md\\:hidden,
              .block.md\\:hidden * {
                font-size: 8px !important;
                line-height: 9px !important;
              }

              /* Specific element targeting */
              .block.md\\:hidden p {
                font-size: 8px !important;
                line-height: 9px !important;
                margin-bottom: 2px !important;
              }

              .block.md\\:hidden div {
                font-size: 8px !important;
                line-height: 9px !important;
              }

              /* AGGRESSIVE MOBILE OVERRIDE - SMALL SIZES */
              @media screen and (max-width: 768px) {
                /* FORCE ALL TEXT TO BE SMALL */
                * {
                  font-size: 10px !important;
                  line-height: 11px !important;
                }

                h1, h2, h3, h4, h5, h6 {
                  font-size: 14px !important;
                  line-height: 15px !important;
                }

                /* FORCE ALL ICONS/IMAGES TO BE SMALL */
                svg {
                  width: 12px !important;
                  height: 12px !important;
                  max-width: 12px !important;
                  max-height: 12px !important;
                }

                img {
                  max-height: 80px !important;
                }

                /* Hero specific overrides */
                .hero-mobile-container h1 {
                  font-size: 16px !important;
                  line-height: 18px !important;
                  margin-bottom: 6px !important;
                }

                .hero-mobile-container p {
                  font-size: 10px !important;
                  line-height: 12px !important;
                  margin-bottom: 8px !important;
                }

                /* Timeline specific overrides */
                .timeline-mobile-container {
                  display: grid !important;
                  grid-template-columns: 1fr 1fr !important;
                  gap: 6px !important;
                  padding: 6px !important;
                  align-items: start !important;
                }

                .timeline-mobile-container h2 {
                  font-size: 10px !important;
                  line-height: 11px !important;
                  margin-bottom: 3px !important;
                }

                .timeline-mobile-container p {
                  font-size: 8px !important;
                  line-height: 9px !important;
                  margin-bottom: 2px !important;
                }

                .timeline-mobile-container .age-circle {
                  width: 16px !important;
                  height: 16px !important;
                  font-size: 8px !important;
                }

                .timeline-mobile-container .year-text {
                  font-size: 7px !important;
                  line-height: 8px !important;
                }

                /* Section spacing tight */
                section {
                  padding: 6px 4px !important;
                  min-height: 120px !important;
                }

                /* Tuenti chat bubbles - make more horizontal/wider */
                .tuenti-message-bubble {
                  max-width: 90% !important;
                  width: auto !important;
                  padding: 4px 8px !important;
                  border-radius: 12px !important;
                  margin: 2px 0 !important;
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

                /* Tuenti chat container - 12px shorter total */
                .tuenti-chat {
                  height: 160px !important;
                  min-height: 160px !important;
                  max-height: 160px !important;
                  overflow: hidden !important;
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


                /* Mobile-only Tuenti section layout override */
                #conocidos-2010 {
                  gap: 0 !important;
                  margin-top: 24px !important;
                }

                #conocidos-2010 > div:first-child {
                  grid-column: span 7 !important;
                  padding-right: 1rem !important;
                }

                #conocidos-2010 > div:last-child {
                  grid-column: span 5 !important;
                  padding-left: 1rem !important;
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

            /* Hero section responsive height - 44px taller on mobile */
            @media (max-width: 768px) {
              section[style*="minHeight: '480px'"] {
                min-height: 524px !important;
              }

              /* HERO TEXT OVERRIDES - Must come AFTER aggressive CSS to have priority */
              section[style*="minHeight: '480px'"] .relative.z-10 .inline-block h1.text-7xl.font-bold.font-elegant {
                font-size: 16px !important;
                line-height: 18px !important;
              }

              section[style*="minHeight: '480px'"] .relative.z-10 .inline-block p.text-xl.hero-intro-text {
                font-size: 12px !important;
                line-height: 14px !important;
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