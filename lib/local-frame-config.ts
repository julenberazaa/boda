export interface CropBox {
  x: number      // % desde la izquierda del contenedor
  y: number      // % desde arriba del contenedor
  width: number  // % del ancho del contenedor
  height: number // % del alto del contenedor
}

export interface LocalFrameConfig {
  frameSrc: string
  scaleX?: number
  scaleY?: number
  offsetX?: number
  offsetY?: number
  fit?: 'cover' | 'contain' | 'fill'
  cropBox?: CropBox
}

// Mapeo de experience IDs a configuraciones de marcos locales
// Cada carrusel tendrá su marco como hermano inmediato
export const LOCAL_FRAME_CONFIGS: Record<string, LocalFrameConfig> = {
  // Primeras escapadas
  '02': {
    frameSrc: '/frames/frame-02.png',
    scaleX: 1.2,
    scaleY: 1.2,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 14.025289851691165,
      y: 12.864581743876139,
      width: 74.03273305215838,
      height: 73.95833333333334
    }
  },

  // Estudios universitarios
  'estudios': {
    frameSrc: '/frames/frame-03.png',
    scaleX: 1.1,
    scaleY: 1.15,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 11.235117146960862,
      y: 12.604165077209473,
      width: 78.68303035442963,
      height: 74.73958333333334
    }
  },

  // Oposiciones de policía
  '03': {
    frameSrc: '/frames/udaltzaingoa_marco_real.png',
    scaleX: 1.25,
    scaleY: 1.4,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 11.979159038691813,
      y: 14.427081743876139,
      width: 75.14880440470347,
      height: 61.458333333333336
    }
  },

  // MIR / Medicina
  'mir': {
    frameSrc: '/medicina-marco.png',
    scaleX: 1.0,
    scaleY: 1.15,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 5.096724707962806,
      y: 10.989583532015484,
      width: 89.09969631151723,
      height: 80.20833333333334
    }
  },

  // Hobbies
  'hobbies': {
    frameSrc: '/frames/frame-05.png',
    scaleX: 1.2,
    scaleY: 1.25,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 11.979159038691813,
      y: 14.114582538604736,
      width: 74.59076872843092,
      height: 71.61458333333334
    }
  },

  // Independizarse
  'independizarse': {
    frameSrc: '/frames/frame-04.png',
    scaleX: 1.2,
    scaleY: 1.3,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 12.909224175778514,
      y: 15.052082141240438,
      width: 74.77678062052178,
      height: 70.3125
    }
  },

  // Ilun
  'ilun': {
    frameSrc: '/frames/frame-07.png',
    scaleX: 1.1,
    scaleY: 1.15,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 11.235111470328413,
      y: 12.447915474573772,
      width: 79.05505413861133,
      height: 75
    }
  },

  // Pedida de mano
  'pedida': {
    frameSrc: '/frames/ChatGPT Image 17 ago 2025, 18_48_23.webp',
    scaleX: 1.2,
    scaleY: 1.2,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain',
    cropBox: {
      x: 13.839283636232762,
      y: 12.864583730697632,
      width: 74.77678062052178,
      height: 74.73958333333334
    }
  }
}

// Función helper para obtener la configuración de un marco
export function getFrameConfig(experienceId: string): LocalFrameConfig | null {
  return LOCAL_FRAME_CONFIGS[experienceId] || null
}