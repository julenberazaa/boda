// ============================================================================
// SISTEMA UNIFICADO MARCO-CARRUSEL - Tamaños estáticos en píxeles
// ============================================================================

// NEW: Pixel-based cropBox - absolute pixels dentro del container
export interface CropBoxPx {
  x: number      // px desde la izquierda del container
  y: number      // px desde arriba del container
  width: number  // px de ancho del área de fotos
  height: number // px de alto del área de fotos
}

// NEW: Configuración simplificada - solo 3 propiedades esenciales
export interface LocalFrameConfig {
  frameSrc: string           // Path a la imagen PNG del marco
  containerWidth: number     // Ancho total del marco en px
  containerHeight: number    // Alto total del marco en px
  cropBox: CropBoxPx        // Área donde van las fotos (px absolutos)
}

// Configuraciones de marcos para cada experiencia
// NOTA: Estos valores son placeholders - se recalibrarán con Ctrl+A
export const LOCAL_FRAME_CONFIGS: Record<string, LocalFrameConfig> = {
  // Primeras escapadas
  '02': {
    frameSrc: '/frames/frame-02.png',
    containerWidth: 384,
    containerHeight: 383,
    cropBox: {
      x: 54,
      y: 49,
      width: 284,
      height: 284
    }
  },

  // Estudios universitarios
  'estudios': {
    frameSrc: '/frames/frame-03.png',
    containerWidth: 384,
    containerHeight: 365,
    cropBox: {
      x: 43,
      y: 46,
      width: 302,
      height: 273
    }
  },

  // Oposiciones de policía
  '03': {
    frameSrc: '/frames/udaltzaingoa_marco_real.png',
    containerWidth: 384,
    containerHeight: 314,
    cropBox: {
      x: 46,
      y: 45,
      width: 289,
      height: 193
    }
  },

  // MIR / Medicina
  'mir': {
    frameSrc: '/medicina-marco.png',
    containerWidth: 384,
    containerHeight: 346,
    cropBox: {
      x: 20,
      y: 38,
      width: 342,
      height: 277
    }
  },

  // Hobbies
  'hobbies': {
    frameSrc: '/frames/frame-05.png',
    containerWidth: 384,
    containerHeight: 369,
    cropBox: {
      x: 46,
      y: 52,
      width: 287,
      height: 264
    }
  },

  // Independizarse
  'independizarse': {
    frameSrc: '/frames/frame-04.png',
    containerWidth: 384,
    containerHeight: 361,
    cropBox: {
      x: 50,
      y: 54,
      width: 287,
      height: 254
    }
  },

  // Ilun
  'ilun': {
    frameSrc: '/frames/frame-07.png',
    containerWidth: 384,
    containerHeight: 364,
    cropBox: {
      x: 43,
      y: 45,
      width: 304,
      height: 273
    }
  },

  // Pedida de mano
  'pedida': {
    frameSrc: '/frames/ChatGPT Image 17 ago 2025, 18_48_23.webp',
    containerWidth: 384,
    containerHeight: 384,
    cropBox: {
      x: 53,
      y: 49,
      width: 287,
      height: 287
    }
  }
}

// Función helper para obtener la configuración de un marco
export function getFrameConfig(experienceId: string): LocalFrameConfig | null {
  return LOCAL_FRAME_CONFIGS[experienceId] || null
}
