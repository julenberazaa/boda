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

              /* MOBILE LAYOUT - Readable sizes */
              @media screen and (max-width: 768px) {
                /* Hero section */
                .hero-mobile-container h1 {
                  font-size: 20px !important;
                  line-height: 22px !important;
                  margin-bottom: 8px !important;
                }

                .hero-mobile-container p {
                  font-size: 12px !important;
                  line-height: 14px !important;
                  margin-bottom: 12px !important;
                }

                .hero-mobile-container svg {
                  width: 16px !important;
                  height: 16px !important;
                }

                /* Timeline grid layout */
                .timeline-mobile-container {
                  display: grid !important;
                  grid-template-columns: 1fr 1fr !important;
                  gap: 8px !important;
                  padding: 8px !important;
                  align-items: start !important;
                }

                /* Timeline text sizes */
                .timeline-mobile-container h2 {
                  font-size: 14px !important;
                  line-height: 16px !important;
                  margin-bottom: 4px !important;
                }

                .timeline-mobile-container p {
                  font-size: 10px !important;
                  line-height: 12px !important;
                  margin-bottom: 2px !important;
                }

                /* Age circles */
                .timeline-mobile-container .age-circle {
                  width: 20px !important;
                  height: 20px !important;
                  font-size: 10px !important;
                }

                /* Year text */
                .timeline-mobile-container .year-text {
                  font-size: 9px !important;
                  line-height: 10px !important;
                }

                /* Images in timeline */
                .timeline-mobile-container img {
                  width: 100% !important;
                  height: auto !important;
                  max-height: 100px !important;
                  object-fit: cover !important;
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