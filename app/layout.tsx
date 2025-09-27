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
            /* SISTEMA DE ZOOM FIJO CORREGIDO */
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
            
            #fixed-layout-wrapper {
              overflow: hidden;
              position: relative;
            }
            
            #scroll-root {
              overflow: auto;
              height: 100vh;
            }
            
            #scroll-spacer {
              position: relative;
              width: 100%;
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
        <div id="fixed-layout-wrapper">
          <div id="scroll-root">
            <div id="scroll-spacer">
              <div id="fixed-layout">
                {children}
              </div>
            </div>
          </div>
        </div>
        <FixedZoom />
        <EmergencyDebug />
      </body>
    </html>
  )
}