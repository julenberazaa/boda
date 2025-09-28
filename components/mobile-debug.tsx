"use client"

import { useState, useEffect } from 'react'

export default function MobileDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      isTouchDevice: 'ontouchstart' in window,
      orientation: window.screen?.orientation?.type || 'unknown',
      timestamp: new Date().toISOString()
    }
    setDebugInfo(info)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        fontSize: '8px',
        lineHeight: '10px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}
    >
      <div>DEBUG MOBILE:</div>
      <div>Width: {debugInfo.innerWidth}px</div>
      <div>Height: {debugInfo.innerHeight}px</div>
      <div>Touch: {debugInfo.isTouchDevice ? 'YES' : 'NO'}</div>
      <div>DPR: {debugInfo.devicePixelRatio}</div>
      <div>UA: {debugInfo.userAgent?.substring(0, 50)}...</div>
      <div>Time: {debugInfo.timestamp}</div>
    </div>
  )
}