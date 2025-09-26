// Script temporal para reemplazar SlideStage con ImageCarousel directo
const fs = require('fs');

const filePath = 'C:\\Users\\Julen Beraza\\Desktop\\boda\\app\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Patrón para encontrar y reemplazar SlideStage wrappers
const slideStagePattern = /<SlideStage\s+frameId="([^"]+)"\s+frameSrc=\{getFrameConfig\("([^"]+)"\)\?\.frameSrc\}\s+frameConfig=\{getFrameConfig\("([^"]+)"\) \|\| undefined\}\s*>\s*(<div[^>]*>)\s*(<ImageCarousel[\s\S]*?)(\s*\/>\s*|\s*>\s*<\/ImageCarousel>\s*)\s*(<\/div>)\s*<\/SlideStage>/g;

content = content.replace(slideStagePattern, (match, frameId, frameSrc, frameConfig, divOpen, imageCarousel, carouselEnd, divClose) => {
  // Extraer props del ImageCarousel y añadir frame props
  const frameSrcProp = `frameSrc={getFrameConfig("${frameId}")?.frameSrc}`;
  const frameConfigProp = `frameConfig={getFrameConfig("${frameId}") || undefined}`;

  // Insertar las props antes del cierre del ImageCarousel
  let updatedCarousel = imageCarousel;
  if (carouselEnd.includes('/>')) {
    // Self-closing tag
    updatedCarousel = updatedCarousel.replace(/\s*$/, `\n                    ${frameSrcProp}\n                    ${frameConfigProp}`);
  } else {
    // Regular tag
    updatedCarousel = updatedCarousel.replace(/\s*$/, `\n                    ${frameSrcProp}\n                    ${frameConfigProp}`);
  }

  return `${divOpen}\n                  ${updatedCarousel}${carouselEnd}\n                ${divClose}`;
});

fs.writeFileSync(filePath, content);
console.log('SlideStage wrappers reemplazados exitosamente');