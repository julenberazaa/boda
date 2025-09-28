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

            /* Mobile responsive utilities - Proportionally scaled to match desktop visual appearance */
            @media (max-width: 767px) {
              /* Proportional scaling factor: mobile_width / desktop_width = 375/1536 = 0.244 */

              /* Content container scaled to maintain 83.3% width ratio */
              .mobile-container {
                width: 83.3vw;
                margin: 0 auto;
                padding: 0 8.4vw; /* Equivalent to desktop 128px padding scaled */
              }

              /* Hero proportionally scaled fonts */
              .mobile-hero-icon {
                width: 4.15vw; /* 64px * 0.244 = 15.6px ≈ 4.15vw at 375px */
                height: 4.15vw;
              }
              .mobile-hero-title {
                font-size: 7.5vw; /* 115.2px * 0.244 = 28.1px ≈ 7.5vw at 375px */
                line-height: 1.2;
              }
              .mobile-hero-subtitle {
                font-size: 1.87vw; /* 28.8px * 0.244 = 7px ≈ 1.87vw at 375px */
                line-height: 1.4;
              }

              /* Timeline sections scaled */
              .mobile-timeline-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2vw; /* Proportionally scaled gap */
                align-items: start;
                width: 100%;
                max-width: 83.3vw;
                margin: 0 auto;
              }

              .mobile-timeline-content {
                padding: 1.2vw;
                font-size: 2.4vw; /* Scaled text size */
                line-height: 1.3;
              }

              .mobile-timeline-media {
                padding: 0.6vw;
              }

              /* Age circle scaled */
              .mobile-age-circle {
                width: 3.2vw;
                height: 3.2vw;
                font-size: 1.6vw;
              }

              /* Timeline title scaled */
              .mobile-timeline-title {
                font-size: 3.2vw;
                line-height: 1.2;
              }

              /* Year text scaled */
              .mobile-year-text {
                font-size: 1.8vw;
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