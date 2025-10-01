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
    fit: 'contain'
  },

  // Estudios universitarios
  'estudios': {
    frameSrc: '/frames/frame-03.png',
    scaleX: 1.1,
    scaleY: 1.15,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain'
  },

  // Oposiciones de policía
  '03': {
    frameSrc: '/frames/udaltzaingoa_marco_real.png',
    scaleX: 1.25,
    scaleY: 1.4,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain'
  },

  // MIR / Medicina
  'mir': {
    frameSrc: '/medicina-marco.png',
    scaleX: 1.0,
    scaleY: 1.15,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain'
  },

  // Hobbies
  'hobbies': {
    frameSrc: '/frames/frame-05.png',
    scaleX: 1.2,
    scaleY: 1.25,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain'
  },

  // Independizarse
  'independizarse': {
    frameSrc: '/frames/frame-04.png',
    scaleX: 1.2,
    scaleY: 1.3,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain'
  },

  // Ilun
  'ilun': {
    frameSrc: '/frames/frame-07.png',
    scaleX: 1.1,
    scaleY: 1.15,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain'
  },

  // Pedida de mano
  'pedida': {
    frameSrc: '/frames/ChatGPT Image 17 ago 2025, 18_48_23.webp',
    scaleX: 1.2,
    scaleY: 1.2,
    offsetX: 0,
    offsetY: 0,
    fit: 'contain'
  }
}

// Función helper para obtener la configuración de un marco
export function getFrameConfig(experienceId: string): LocalFrameConfig | null {
  return LOCAL_FRAME_CONFIGS[experienceId] || null
}