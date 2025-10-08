# Sistema Unificado Marco-Carrusel

## 📌 Documento de Requisitos
**Fecha:** 2025-10-08
**Estado:** Preparación - Sistema actual eliminado, listo para nueva implementación

---

## 🎯 Objetivo Principal

Crear un sistema donde **marco decorativo y carrusel de imágenes sean UN SOLO ELEMENTO INSEPARABLE** con tamaños estáticos calibrados.

---

## ❌ Problema del Sistema Anterior

### Arquitectura Separada:
```tsx
<div className="carousel-container">
  {/* CropBox - imágenes */}
  <div style={{ position: 'absolute', width: '80%', height: '80%' }}>
    <img src={foto1} />
  </div>

  {/* Frame - hermano separado */}
  <img src={frame} style={{
    transform: 'scale(1.2)',
    top: '50%',
    left: '50%'
  }} />
</div>
```

### Consecuencias:
- ❌ Marco y carrusel se desincronizaban
- ❌ Lógica compleja de `scaleX`, `scaleY`, `offsetX`, `offsetY`
- ❌ Comportamiento diferente mobile/desktop
- ❌ Difícil de mantener alineación perfecta
- ❌ Configuración con porcentajes que no representaban tamaños reales

---

## ✅ Solución Nueva

### **Concepto: Tamaños Estáticos Absolutos**

Todo el sistema usa **píxeles absolutos**, no porcentajes ni scaling dinámico:

```
┌─────────────────────────┐
│ ╔═══════════════════╗   │ ← Container 384×383px (marco PNG completo)
│ ║                   ║   │   Tamaño fijo, NO responsive
│ ║  FOTOS 284×284px  ║   │
│ ║  position: abs    ║   │ ← CropBox con left:54px, top:49px
│ ║  left: 54px       ║   │   (píxeles absolutos dentro del container)
│ ║  top: 49px        ║   │
│ ╚═══════════════════╝   │
└─────────────────────────┘
  Marco PNG con transparencia central
  (superpuesto con z-index: 30)
```

### **Estructura DOM Propuesta:**

```tsx
<div
  className="marco-carrusel-unificado"
  style={{
    position: 'relative',
    width: '384px',      // Tamaño fijo del marco completo
    height: '383px',
    margin: '0 auto'     // Centrado en la página
  }}
>
  {/* CropBox - contenedor de imágenes del carrusel */}
  <div style={{
    position: 'absolute',
    left: '54px',        // Posición exacta calibrada
    top: '49px',
    width: '284px',      // Tamaño exacto calibrado
    height: '284px',
    overflow: 'hidden',
    borderRadius: '1rem'
  }}>
    {/* Imágenes del carrusel con fade entre ellas */}
    <img src={foto1} style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: isActive ? 1 : 0,
      transition: 'opacity 1s'
    }} />
  </div>

  {/* Marco PNG superpuesto */}
  <img
    src={frameSrc}
    alt=""
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '384px',      // Mismo tamaño que container
      height: '383px',
      objectFit: 'contain',
      pointerEvents: 'none',
      zIndex: 30
    }}
  />
</div>
```

---

## 🔧 Sistema de Calibración Ctrl+A

### **Estado Actual (Funcional):**
- **Ubicación:** `app/page.tsx` líneas 77-90
- **Trigger:** `Ctrl+A` activa `calibrationMode`
- **Funcionalidad:** Permite dibujar rectángulos en cada carrusel
- **Output:** CropBox en porcentajes (x, y, width, height)

### **Modificación Necesaria:**

#### **Cambio en el cálculo (líneas 269-288 de `image-carousel-unified.tsx`):**

```typescript
// ANTES (actual):
const cropBox: CropBox = {
  x: (x / rect.width) * 100,      // Porcentajes
  y: (y / rect.height) * 100,
  width: (width / rect.width) * 100,
  height: (height / rect.height) * 100
}

// DESPUÉS (nuevo):
const cropBox: CropBoxPx = {
  x: Math.round(x),               // Píxeles absolutos
  y: Math.round(y),
  width: Math.round(width),
  height: Math.round(height)
}

// Además, capturar el tamaño total del container:
const containerSize = {
  width: Math.round(rect.width),
  height: Math.round(rect.height)
}
```

### **Workflow de Calibración:**

1. Usuario presiona `Ctrl+A` → entra en modo calibración
2. Click en el carrusel que quiere calibrar → se activa para ese carrusel
3. Dibuja rectángulo sobre el área visible del marco (el hueco transparente)
4. Click "Confirmar" → guarda:
   - Tamaño del container (marco completo)
   - Posición y tamaño del cropBox en píxeles
5. Click "Export Calibration" → copia config al portapapeles

---

## 📐 Configuración Simplificada

### **Archivo: `lib/local-frame-config.ts`**

#### **Nueva estructura (SOLO 3 propiedades):**

```typescript
export interface CropBoxPx {
  x: number      // px desde la izquierda del container
  y: number      // px desde arriba del container
  width: number  // px de ancho del área de fotos
  height: number // px de alto del área de fotos
}

export interface LocalFrameConfig {
  frameSrc: string        // Path a la imagen PNG del marco
  containerWidth: number  // Ancho total del marco en px
  containerHeight: number // Alto total del marco en px
  cropBox: CropBoxPx     // Área donde van las fotos (px absolutos)
}

export const LOCAL_FRAME_CONFIGS: Record<string, LocalFrameConfig> = {
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

  // ... resto de experiencias (8 en total)
}
```

#### **Propiedades ELIMINADAS (ya no necesarias):**
```typescript
// ❌ scaleX, scaleY - No más scaling
// ❌ offsetX, offsetY - Posición absoluta en cropBox
// ❌ fit - Siempre será 'contain' para el marco
// ❌ Porcentajes - Todo en píxeles
```

---

## 🗂️ Cambios por Archivo

### **1. `components/image-carousel-unified.tsx`**

#### **Props a ELIMINAR:**
```typescript
// ❌ Borrar estas props:
frameSrc?: string
frameConfig?: {
  scaleX?: number
  scaleY?: number
  offsetX?: number
  offsetY?: number
  fit?: 'cover' | 'contain' | 'fill'
  cropBox?: CropBox  // (versión vieja en porcentajes)
}
```

#### **Props NUEVAS:**
```typescript
// ✅ Añadir estas props:
containerWidth: number   // Del frameConfig
containerHeight: number
cropBoxPx: CropBoxPx    // Versión nueva en píxeles
frameSrc: string
```

#### **Lógica a BORRAR:**
- Líneas 64-89: Tracking de `windowWidth` y `containerHeight`
- Líneas 407-487: Todo el bloque de renderizado del frame con scaling complejo
- Líneas 456-469: Cálculo de `topPosition` y `verticalOffset` para mobile

#### **Lógica a AÑADIR:**
```tsx
// Container principal con tamaño fijo
<div
  ref={carouselRef}
  style={{
    position: 'relative',
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    cursor: calibrationMode ? 'crosshair' : 'pointer'
  }}
>
  {/* CropBox con tamaño exacto */}
  <div style={{
    position: 'absolute',
    left: `${cropBoxPx.x}px`,
    top: `${cropBoxPx.y}px`,
    width: `${cropBoxPx.width}px`,
    height: `${cropBoxPx.height}px`,
    overflow: 'hidden',
    borderRadius: borderRadius || undefined
  }}>
    {/* Imágenes del carrusel */}
  </div>

  {/* Marco PNG simple */}
  {frameSrc && (
    <img
      src={frameSrc}
      alt=""
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        pointerEvents: 'none',
        zIndex: 30
      }}
    />
  )}
</div>
```

---

### **2. `app/page.tsx`**

#### **Cambios en las llamadas a `<ImageCarousel>`:**

```tsx
// ANTES:
<ImageCarousel
  images={[...]}
  experienceId="02"
  frameSrc={getFrameConfig("02")?.frameSrc}
  frameConfig={getFrameConfig("02") || undefined}  // ❌
  style={{ width: '384px', height: '383.65px' }}   // ❌
  // ...
/>

// DESPUÉS:
<ImageCarousel
  images={[...]}
  experienceId="02"
  frameSrc={getFrameConfig("02")?.frameSrc}
  containerWidth={getFrameConfig("02")?.containerWidth}
  containerHeight={getFrameConfig("02")?.containerHeight}
  cropBoxPx={getFrameConfig("02")?.cropBox}
  // Sin prop style - el tamaño viene del config
  // ...
/>
```

#### **Modificar calibración (líneas 460-468):**
```typescript
// Cambiar la función para usar píxeles:
const handleConfirmCalibration = (experienceId: string, cropBox: CropBoxPx, containerSize: { width: number, height: number }) => {
  setCalibrationData(prev => ({
    ...prev,
    [experienceId]: {
      cropBox,
      containerWidth: containerSize.width,
      containerHeight: containerSize.height
    }
  }))
  setActiveCalibration(null)
  console.log(`Calibración guardada para ${experienceId}:`, cropBox, containerSize)
}
```

---

### **3. `lib/local-frame-config.ts`**

**Reemplazar completamente** con la nueva estructura mostrada arriba.

---

### **4. `lib/frame-config.ts`**

**ELIMINAR ARCHIVO COMPLETO** - Ya no se usa.

---

### **5. `app/globals.css`**

#### **CSS a ELIMINAR:**

```css
/* ❌ Líneas 34-50: Variables de carousel-scale */
--carousel-scale-default: 1.2;
--carousel-scale-policia: 1.254;
/* ... etc */

/* ❌ Líneas 284-290: Frame shadows */
.frame-shadow { ... }
.frame-shadow-hover { ... }

/* ❌ Líneas 668-700: Lógica de mobile carousel scaling */
/* JavaScript handles responsive scaling... */
```

#### **CSS a MANTENER:**
```css
/* ✅ Mantener estas clases útiles */
.custom-shadow-right-bottom { ... }
.hover-scale-image:hover { ... }
.timeline-item { ... }
```

---

## 📊 Datos Disponibles

### **Experiencias Configuradas (8 total):**

| ID | Nombre | Frame Actual | CropBox Actual (%) |
|----|--------|--------------|-------------------|
| `02` | Primeras escapadas | frame-02.png | x:14, y:12, w:74, h:74 |
| `estudios` | Estudios universitarios | frame-03.png | x:11, y:12, w:78, h:74 |
| `03` | Oposiciones policía | udaltzaingoa_marco_real.png | x:11, y:14, w:75, h:61 |
| `mir` | MIR | medicina-marco.png | x:5, y:10, w:89, h:80 |
| `hobbies` | Hobbies | frame-05.png | x:11, y:14, w:74, h:71 |
| `independizarse` | Independizarse | frame-04.png | x:12, y:15, w:74, h:70 |
| `ilun` | Ilun | frame-07.png | x:11, y:12, w:79, h:75 |
| `pedida` | Pedida de mano | ChatGPT Image...webp | x:13, y:12, w:74, h:74 |

**Nota:** Estos porcentajes se convertirán a píxeles en la recalibración.

---

## 🚀 Plan de Implementación

### **Fase 1: Limpieza (Actual)**
- [x] Crear documento de requisitos
- [ ] Commit de seguridad
- [ ] Borrar lógica de frames en `image-carousel-unified.tsx`
- [ ] Borrar props deprecated
- [ ] Eliminar `frame-config.ts`
- [ ] Limpiar CSS relacionado
- [ ] Crear placeholders visibles

### **Fase 2: Modificar Calibración**
- [ ] Cambiar cálculo de porcentajes → píxeles
- [ ] Capturar `containerWidth` y `containerHeight`
- [ ] Actualizar tipo `CropBox` → `CropBoxPx`
- [ ] Modificar `handleConfirmCalibration`

### **Fase 3: Nueva Implementación (Próximo Chat)**
- [ ] Crear nuevo `ImageCarousel` con arquitectura unificada
- [ ] Implementar renderizado simple (container + cropBox + frame)
- [ ] Recalibrar todas las experiencias con Ctrl+A
- [ ] Actualizar `local-frame-config.ts` con datos en píxeles
- [ ] Probar responsive (debe mantener tamaño fijo)
- [ ] Verificar mobile (scroll si es necesario)

### **Fase 4: Testing**
- [ ] Verificar alineación perfecta en las 8 experiencias
- [ ] Probar rotación de imágenes
- [ ] Verificar modo calibración
- [ ] Test en diferentes navegadores
- [ ] Test mobile

---

## 🎨 Beneficios del Nuevo Sistema

### **Simplicidad:**
- ✅ 3 propiedades vs 7+ del sistema anterior
- ✅ Píxeles absolutos vs porcentajes + scaling
- ✅ Sin lógica mobile/desktop separada
- ✅ Configuración legible y mantenible

### **Mantenibilidad:**
- ✅ Un solo punto de verdad (local-frame-config.ts)
- ✅ Calibración visual con Ctrl+A
- ✅ Valores explícitos, no calculados

### **Performance:**
- ✅ Sin cálculos complejos en runtime
- ✅ Sin ResizeObserver innecesario
- ✅ Rendering predecible

### **Fiabilidad:**
- ✅ Imposible que marco y cropBox se desincronicen
- ✅ Comportamiento consistente en todos los dispositivos
- ✅ Fácil de debuggear

---

## ⚠️ Consideraciones

### **Mobile:**
- Los carruseles mantendrán su tamaño fijo (ej: 384px)
- Si son muy grandes para la pantalla, habrá scroll horizontal
- **Alternativa futura:** Añadir un wrapper con `transform: scale(0.8)` para mobile si es necesario

### **Calibración:**
- Requiere recalibrar todas las experiencias después de implementar
- Ctrl+A debe ejecutarse en escritorio con resolución ~1536px
- Los valores calibrados serán definitivos

### **Assets:**
- Los PNG de marcos deben tener el tamaño correcto
- La transparencia central debe estar bien cortada
- No se modifican los archivos de `/public/frames/`

---

## 📞 Próximos Pasos

1. **Revisar este documento** - Confirmar que todo está correcto
2. **Ejecutar Fase 1** - Limpieza del código actual
3. **Probar calibración modificada** - Verificar que captura píxeles
4. **Iniciar nuevo chat** con este documento como referencia
5. **Implementar sistema nuevo** siguiendo la arquitectura propuesta

---

## 📎 Referencias Técnicas

### **Archivos Clave:**
- `app/page.tsx` - Renderizado principal y calibración
- `components/image-carousel-unified.tsx` - Componente del carrusel
- `lib/local-frame-config.ts` - Configuración de marcos
- `app/globals.css` - Estilos globales

### **Conceptos Importantes:**
- **CropBox:** Área rectangular donde se muestran las fotos (px absolutos)
- **Container:** Div que contiene tanto cropBox como marco (tamaño = tamaño del marco PNG)
- **Frame:** Imagen PNG con transparencia central que se superpone al cropBox
- **Calibración Ctrl+A:** Proceso visual para definir tamaños y posiciones exactas

---

**Documento creado:** 2025-10-08
**Autor:** Sistema de análisis técnico
**Estado:** ✅ Listo para implementación
