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

            /* Mobile responsive utilities */
            @media (max-width: 767px) {

              /* Compact text for mobile */
              .mobile-text-xs { font-size: 0.625rem; line-height: 0.75rem; }
              .mobile-text-sm { font-size: 0.75rem; line-height: 1rem; }
              .mobile-text-base { font-size: 0.8125rem; line-height: 1.125rem; }
              .mobile-text-lg { font-size: 0.9375rem; line-height: 1.25rem; }
              .mobile-text-xl { font-size: 1.0625rem; line-height: 1.375rem; }
              .mobile-text-2xl { font-size: 1.25rem; line-height: 1.5rem; }
              .mobile-text-3xl { font-size: 1.5rem; line-height: 1.75rem; }
              .mobile-text-4xl { font-size: 1.75rem; line-height: 2rem; }

              /* Mobile two-column layout for timeline */
              .mobile-timeline-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.75rem;
                align-items: start;
              }

              .mobile-timeline-content {
                padding: 0.5rem;
                font-size: 0.75rem;
                line-height: 1rem;
              }

              .mobile-timeline-media {
                padding: 0.25rem;
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