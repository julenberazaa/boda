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
// VALORES CALIBRADOS - Capturados con Ctrl+A el 2025-10-08
export const LOCAL_FRAME_CONFIGS: Record<string, LocalFrameConfig> = {
  // Primeras escapadas
  '02': {
    frameSrc: '/frames/frame-02.png',
    containerWidth: 550,
    containerHeight: 548,
    cropBox: {
      x: 110,
      y: 151,
      width: 341,
      height: 243
    }
  },

  // Estudios universitarios
  'estudios': {
    frameSrc: '/frames/frame-03.png',
    containerWidth: 550,
    containerHeight: 523,
    cropBox: {
      x: 95,
      y: 139,
      width: 364,
      height: 245
    }
  },

  // Oposiciones de policía
  '03': {
    frameSrc: '/frames/udaltzaingoa_marco_real.png',
    containerWidth: 550,
    containerHeight: 450,
    cropBox: {
      x: 71,
      y: 91,
      width: 404,
      height: 239
    }
  },

  // MIR / Medicina
  'mir': {
    frameSrc: '/medicina-marco.png',
    containerWidth: 550,
    containerHeight: 495,
    cropBox: {
      x: 68,
      y: 124,
      width: 412,
      height: 253
    }
  },

  // Hobbies
  'hobbies': {
    frameSrc: '/frames/frame-05.png',
    containerWidth: 550,
    containerHeight: 528,
    cropBox: {
      x: 101,
      y: 145,
      width: 342,
      height: 236
    }
  },

  // Independizarse
  'independizarse': {
    frameSrc: '/frames/frame-04.png',
    containerWidth: 550,
    containerHeight: 517,
    cropBox: {
      x: 103,
      y: 145,
      width: 344,
      height: 230
    }
  },

  // Ilun
  'ilun': {
    frameSrc: '/frames/frame-07.png',
    containerWidth: 550,
    containerHeight: 521,
    cropBox: {
      x: 96,
      y: 138,
      width: 363,
      height: 244
    }
  },

  // Pedida de mano
  'pedida': {
    frameSrc: '/frames/ChatGPT Image 17 ago 2025, 18_48_23.webp',
    containerWidth: 550,
    containerHeight: 550,
    cropBox: {
      x: 111,
      y: 153,
      width: 340,
      height: 245
    }
  }
}

// Función helper para obtener la configuración de un marco
export function getFrameConfig(experienceId: string): LocalFrameConfig | null {
  return LOCAL_FRAME_CONFIGS[experienceId] || null
}
