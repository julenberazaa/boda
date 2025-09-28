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

            /* Mobile responsive utilities - Much smaller aggressive sizing */
            @media (max-width: 767px) {
              /* Hero - much smaller */
              .mobile-hero-icon {
                width: 20px !important;
                height: 20px !important;
              }
              .mobile-hero-title {
                font-size: 18px !important;
                line-height: 1.1;
              }
              .mobile-hero-subtitle {
                font-size: 10px !important;
                line-height: 1.2;
              }

              /* Timeline sections - compact grid */
              .mobile-timeline-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4px;
                align-items: start;
                width: 100%;
                padding: 4px;
              }

              .mobile-timeline-content {
                padding: 3px;
                font-size: 7px !important;
                line-height: 1.1;
              }

              .mobile-timeline-media {
                padding: 2px;
              }

              /* Age circle - tiny */
              .mobile-age-circle {
                width: 12px !important;
                height: 12px !important;
                font-size: 6px !important;
                min-width: 12px;
              }

              /* Timeline title - small */
              .mobile-timeline-title {
                font-size: 8px !important;
                line-height: 1.1;
                margin-bottom: 2px !important;
              }

              /* Year text - tiny */
              .mobile-year-text {
                font-size: 6px !important;
              }

              /* Section padding reduction */
              .mobile-section {
                padding: 8px 4px !important;
                min-height: auto !important;
              }

              /* Image scaling */
              .mobile-image {
                width: 100%;
                height: auto;
                max-height: 80px;
                object-fit: cover;
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