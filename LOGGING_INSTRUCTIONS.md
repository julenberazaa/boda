# 📊 Instrucciones para Recopilar Logs de Diagnóstico

## Sistema de Logging Profesional Implementado

He creado un sistema completo de logging que captura:
- ✅ Dimensiones y posiciones de todos los contenedores
- ✅ Estilos computados (lo que realmente se aplica)
- ✅ Reglas CSS que hacen match (con especificidad y media queries)
- ✅ Jerarquía de parents (hasta 5 niveles)
- ✅ Datos del frame (posición, transform, dimensiones)
- ✅ Datos del contentBox (el div interno con cropBox)

---

## 📱 Cómo Recopilar Logs en MÓVIL

### Paso 1: Abrir DevTools en Móvil

**Opción A - Chrome/Edge en Android:**
1. Conecta tu móvil Android al ordenador con cable USB
2. Activa "Depuración USB" en Ajustes > Opciones de desarrollador
3. En el ordenador, abre Chrome y ve a `chrome://inspect`
4. Selecciona tu dispositivo y abre la página
5. Aparecerá DevTools conectado a tu móvil

**Opción B - Safari en iPhone/iPad:**
1. En iPhone: Ajustes > Safari > Avanzado > Activar "Inspector Web"
2. Conecta el iPhone al Mac con cable
3. En Mac, abre Safari > Preferencias > Avanzado > Activar "Mostrar menú Desarrollar"
4. Safari > Desarrollar > [Tu iPhone] > Selecciona la página
5. Aparecerá Web Inspector

**Opción C - Chrome DevTools Device Mode (simulación):**
1. En Chrome desktop, abre DevTools (F12)
2. Click en el icono de móvil 📱 (Toggle device toolbar)
3. Selecciona un dispositivo móvil (ej: iPhone 12 Pro)
4. **IMPORTANTE**: Refresca la página (F5) para que detecte el width móvil

### Paso 2: Acceder a la Consola
1. En DevTools, ve a la pestaña **Console**
2. Refresca la página (F5 o Cmd+R)

### Paso 3: Capturar los Logs

Los logs aparecerán automáticamente al cargar la página. Busca estos tipos:

#### A) Logs Principales (Console)
```
📊 CAROUSEL DIMENSIONS LOG [MOBILE]
🎨 CSS SOURCES [MOBILE]
🔍 CSS DEBUG: [experienceId] [MOBILE]
```

#### B) Expandir Grupos en Console
- Los logs con 🔍 aparecen como grupos colapsados
- Click en cada grupo para expandir
- Verás la jerarquía completa de CSS rules

### Paso 4: Exportar los Logs

**Método 1 - Copy from Console:**
1. Click derecho en la consola
2. "Save as..." o "Copy all messages"
3. Guarda en un archivo .txt

**Método 2 - Screenshot:**
1. Expande cada grupo de logs
2. Toma screenshots de:
   - 📊 CAROUSEL DIMENSIONS LOG
   - 🎨 CSS SOURCES
   - 🔍 CSS DEBUG (con todos los subgrupos expandidos)

**Método 3 - Usar el helper script:**
Copia y pega esto en la consola:
```javascript
// Recopilar todos los logs del emergency logger
const logs = []
const originalLog = console.log
const originalWarn = console.warn

console.log = function(...args) {
  if (args[0] && (args[0].includes('CAROUSEL') || args[0].includes('CSS'))) {
    logs.push({type: 'log', args: args})
  }
  originalLog.apply(console, args)
}

console.warn = function(...args) {
  if (args[0] && (args[0].includes('CAROUSEL') || args[0].includes('CSS'))) {
    logs.push({type: 'warn', args: args})
  }
  originalWarn.apply(console, args)
}

// Después de cargar la página, ejecuta:
console.log('COLLECTED LOGS:', JSON.stringify(logs, null, 2))
// Copia el resultado
```

---

## 🖥️ Cómo Recopilar Logs en DESKTOP

### Paso 1: Abrir DevTools
1. Abre Chrome/Firefox/Edge
2. Presiona **F12** o **Ctrl+Shift+I** (Cmd+Option+I en Mac)
3. Ve a la pestaña **Console**

### Paso 2: Asegurar Width Desktop
1. Asegúrate de que el navegador esté en **modo desktop** (NO device mode)
2. Width debe ser > 768px (verifica con `window.innerWidth` en console)
3. Refresca la página (F5)

### Paso 3: Capturar los Logs
Los logs aparecerán con el tag **[DESKTOP]**:
```
📊 CAROUSEL DIMENSIONS LOG [DESKTOP]
🎨 CSS SOURCES [DESKTOP]
🔍 CSS DEBUG: [experienceId] [DESKTOP]
```

### Paso 4: Exportar
Mismo proceso que en móvil (Método 1, 2 o 3)

---

## 🎯 Qué Datos Necesito Específicamente

### Para CADA carousel (mínimo 2-3 ejemplos):

#### 1. Dimensiones (del log 📊):
- `viewport.width` y `viewport.height`
- `carousel.rect.width` y `carousel.rect.height`
- `parents[0].rect.width` y `parents[0].rect.height` (el div.p-6)
- `parents[1].rect.width` (el div.relative con width: 96%)
- `parents[2].rect.width` (el div con height: calc)

#### 2. Estilos Computados:
- `carousel.computedStyles.width`
- `carousel.computedStyles.height`
- `carousel.computedStyles.position`

#### 3. Frame Data (si existe):
- `frame.rect.width` y `frame.rect.height`
- `frame.styles.transform`
- `frame.styles.position`

#### 4. ContentBox Data:
- `contentBox.inlineStyles` (los estilos inline del HTML)
- `contentBox.computedStyles.width`
- `contentBox.computedStyles.height`

#### 5. CSS Sources (del log 🎨):
Para cada propiedad crítica, necesito ver:
- `property` (width, height, max-width, etc.)
- `computed` (el valor final aplicado)
- `matchingRules[0]` (la regla CSS con mayor especificidad):
  - `selector`
  - `value`
  - `specificity`
  - `mediaQuery` (si aplica)

---

## 📋 Formato Ideal de Entrega

### Opción 1: Archivo JSON completo
Copia TODO el output de la consola en un archivo `.json` o `.txt`

### Opción 2: Screenshots organizados
```
/logs
  /mobile
    - carousel-02-dimensions.png
    - carousel-02-css-sources.png
    - carousel-02-css-debug.png
    - carousel-estudios-dimensions.png
    - carousel-estudios-css-sources.png
    - carousel-estudios-css-debug.png
  /desktop
    - carousel-02-dimensions.png
    - carousel-02-css-sources.png
    - carousel-02-css-debug.png
    - carousel-estudios-dimensions.png
    - carousel-estudios-css-sources.png
    - carousel-estudios-css-debug.png
```

### Opción 3: Texto plano organizado
Copia y pega en un documento los logs en este formato:

```
========================================
MOBILE - Carousel "02" (Primeras escapadas)
========================================

[Pega aquí el log completo de 📊 CAROUSEL DIMENSIONS LOG]

[Pega aquí el log completo de 🎨 CSS SOURCES]

[Pega aquí el output expandido de 🔍 CSS DEBUG]

========================================
DESKTOP - Carousel "02" (Primeras escapadas)
========================================

[Mismos logs pero versión desktop]
```

---

## 🔧 Troubleshooting

### "No veo ningún log"
- ✅ Verifica que estás en la pestaña **Console** de DevTools
- ✅ Refresca la página (F5)
- ✅ Asegúrate de que no haya filtros activos en la consola
- ✅ Busca por texto: "CAROUSEL" o "CSS"

### "Los logs aparecen muy rápido y desaparecen"
- ✅ En Console settings (⚙️), activa "Preserve log"
- ✅ Los logs no deberían desaparecer, quedan registrados

### "¿Cuántos carouseles debo logear?"
- ✅ Mínimo 2-3 carouseles diferentes
- ✅ Especialmente aquellos que tienen problemas visibles
- ✅ Tanto en MOBILE como en DESKTOP para cada uno

### "El log es muy largo"
- ✅ Está bien, necesito todos los datos
- ✅ Si es posible, usa el método del helper script para JSON completo
- ✅ Si no, screenshots están bien (pero asegúrate de expandir TODOS los grupos)

---

## 📤 Envío

Una vez tengas los logs:
1. Comprímelos en un .zip si son muchos archivos
2. Súbelos a un servicio (Google Drive, Dropbox, etc.)
3. Comparte el link en el próximo mensaje

O simplemente pega los logs directamente en el chat si prefieres.

---

## 🎯 Objetivo

Con estos logs podré:
1. Ver **exactamente** qué CSS se está aplicando (y cuál está ganando por especificidad)
2. Comparar dimensiones entre MOBILE y DESKTOP
3. Identificar por qué los carouseles son invisibles
4. Encontrar por qué los frames están cortados
5. Detectar conflictos de CSS entre reglas
6. Ver si hay algún contenedor con width/height incorrecto

Este es un análisis profesional exhaustivo que me permitirá encontrar el error de raíz.
