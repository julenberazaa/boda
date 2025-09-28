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
                  font-size: 8px !important;
                  line-height: 9px !important;
                }

                h1, h2, h3, h4, h5, h6 {
                  font-size: 12px !important;
                  line-height: 13px !important;
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

                /* Triangle-bubble gap reduction to 4px */
                .tuenti-message-bubble::before {
                  margin-top: 4px !important;
                  margin-bottom: 4px !important;
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

                /* Static chat body size - 12px taller */
                .tc-body {
                  padding: 6px !important;
                  margin: 0 !important;
                  min-height: 132px !important;
                  height: 132px !important;
                  padding-bottom: 8px !important;
                  overflow: hidden !important;
                }

                /* Tuenti chat container - 12px taller */
                .tuenti-chat {
                  height: 172px !important;
                  min-height: 172px !important;
                  max-height: 172px !important;
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

                /* Override original triangles and create new centered ones */
                .tuenti-message.incoming .tuenti-message-bubble::before,
                .tuenti-message.outgoing .tuenti-message-bubble::after {
                  display: none !important;
                }

                /* New centered triangles with correct colors - better positioning */
                .tuenti-message.outgoing .tuenti-message-bubble::before {
                  position: absolute !important;
                  content: '' !important;
                  top: calc(50% - 2px) !important;
                  transform: translateY(-50%) !important;
                  right: -6px !important;
                  width: 0 !important;
                  height: 0 !important;
                  border-style: solid !important;
                  border-width: 5px 0 5px 8px !important;
                  border-color: transparent transparent transparent #0096D6 !important;
                }

                .tuenti-message.incoming .tuenti-message-bubble::after {
                  position: absolute !important;
                  content: '' !important;
                  top: calc(50% - 2px) !important;
                  transform: translateY(-50%) !important;
                  left: -6px !important;
                  width: 0 !important;
                  height: 0 !important;
                  border-style: solid !important;
                  border-width: 5px 8px 5px 0 !important;
                  border-color: transparent #0096D6 transparent transparent !important;
                }

                /* Ensure bubbles have relative positioning for triangles */
                .tuenti-message-bubble {
                  position: relative !important;
                }

                /* Mobile-specific triangle adjustments */
                .tuenti-message.outgoing .tuenti-message-bubble::before {
                  top: calc(50% - 1px) !important;
                  right: -5px !important;
                  border-width: 4px 0 4px 6px !important;
                }

                .tuenti-message.incoming .tuenti-message-bubble::after {
                  top: calc(50% - 1px) !important;
                  left: -5px !important;
                  border-width: 4px 6px 4px 0 !important;
                }

                /* Mobile-only Tuenti section layout override */
                #conocidos-2010 {
                  gap: 0 !important;
                }

                #conocidos-2010 > div:first-child {
                  grid-column: span 7 !important;
                  padding-right: 1rem !important;
                }

                #conocidos-2010 > div:last-child {
                  grid-column: span 5 !important;
                  padding-left: 1rem !important;
                }

                /* MOBILE-ONLY triangle positioning - VERY AGGRESSIVE UPWARD */
                .tuenti-message:nth-child(1) .tuenti-message-bubble::after {
                  top: calc(50% - 20px) !important;
                }

                .tuenti-message:nth-child(2) .tuenti-message-bubble::after {
                  top: calc(50% - 18px) !important;
                }

                .tuenti-message:nth-child(3) .tuenti-message-bubble::after {
                  top: calc(50% - 16px) !important;
                }

                .tuenti-message:nth-child(4) .tuenti-message-bubble::before {
                  top: calc(50% - 12px) !important;
                }
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