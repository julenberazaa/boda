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
    containerWidth: 550,
    containerHeight: 548,
    cropBox: {
      x: 77,
      y: 70,
      width: 407,
      height: 407
    }
  },

  // Estudios universitarios
  'estudios': {
    frameSrc: '/frames/frame-03.png',
    containerWidth: 550,
    containerHeight: 523,
    cropBox: {
      x: 62,
      y: 66,
      width: 432,
      height: 391
    }
  },

  // Oposiciones de policía
  '03': {
    frameSrc: '/frames/udaltzaingoa_marco_real.png',
    containerWidth: 550,
    containerHeight: 450,
    cropBox: {
      x: 66,
      y: 64,
      width: 414,
      height: 276
    }
  },

  // MIR / Medicina
  'mir': {
    frameSrc: '/medicina-marco.png',
    containerWidth: 550,
    containerHeight: 495,
    cropBox: {
      x: 29,
      y: 54,
      width: 490,
      height: 396
    }
  },

  // Hobbies
  'hobbies': {
    frameSrc: '/frames/frame-05.png',
    containerWidth: 550,
    containerHeight: 528,
    cropBox: {
      x: 66,
      y: 74,
      width: 411,
      height: 378
    }
  },

  // Independizarse
  'independizarse': {
    frameSrc: '/frames/frame-04.png',
    containerWidth: 550,
    containerHeight: 517,
    cropBox: {
      x: 72,
      y: 77,
      width: 411,
      height: 364
    }
  },

  // Ilun
  'ilun': {
    frameSrc: '/frames/frame-07.png',
    containerWidth: 550,
    containerHeight: 521,
    cropBox: {
      x: 62,
      y: 64,
      width: 435,
      height: 391
    }
  },

  // Pedida de mano
  'pedida': {
    frameSrc: '/frames/ChatGPT Image 17 ago 2025, 18_48_23.webp',
    containerWidth: 550,
    containerHeight: 550,
    cropBox: {
      x: 76,
      y: 70,
      width: 411,
      height: 411
    }
  }
}

// Función helper para obtener la configuración de un marco
export function getFrameConfig(experienceId: string): LocalFrameConfig | null {
  return LOCAL_FRAME_CONFIGS[experienceId] || null
}
