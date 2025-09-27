import type { Metadata } from 'next'
import './globals.css'
// Simplified layout - no platform-specific components needed
import EmergencyDebug from '@/components/emergency-debug'
import FixedZoom from '@/components/fixed-zoom'

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

        {/* Sistema de zoom fijo - CSS base */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Sistema de zoom fijo - CSS base */
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
              width: 100vw;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            #fixed-layout {
              width: 1920px;
              transform-origin: top left;
              position: relative;
            }
          `
        }} />
      </head>
      <body>
        <div id="fixed-layout-wrapper" style={{ overflow: 'hidden', position: 'relative' }}>
          <div id="scroll-root" style={{ overflow: 'auto', height: '100vh' }}>
            <div id="fixed-layout">
              {children}
            </div>
          </div>
        </div>
        <FixedZoom />
        <EmergencyDebug />
      </body>
    </html>
  )
}