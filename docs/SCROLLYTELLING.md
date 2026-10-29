# Scrollytelling de /preview

Implementación y verificación local: 28 de octubre de 2026. No se publicó ningún cambio.

## Auditoría previa

- Dependencias existentes: gsap ^3.15.0 y @gsap/react ^2.1.2. ScrollTrigger forma parte de GSAP; no requiere otro paquete.
- Hero: revelación inicial por máscaras, luz, textos y acciones; parallax y atenuación asociados al scroll. Se conservó íntegramente.
- Header: fijo, 112 px en escritorio y 90 px en móvil, z-index 60; cambia su superficie con scroll y observa las anclas. No se modificó.
- Career: composición estática, sin timeline, scrub ni pin. Fondo conceptual, créditos sin fotos oficiales asociadas. Contenedor section-wrap de máximo 1240 px, ancho calc(100% - 112px); 112 px de padding vertical; columnas .8fr/1.2fr, separación 70 px. En móvil cambiaba a flex.
- Novel y Universe: texturas y composición editorial estáticas. Universe ya contenía el titular «De la escena a la página», pero no existía una transformación visual desde Career.
- Orden anterior: Hero → Novel → Story → Career → Universe. Solo en la variante cinematic de /preview se cambió a Hero → Story → CareerJourney → Novel → Universe. Se conservaron los textos y las anclas originales.
- Riesgos detectados: pin debajo del Header, contenedores con overflow, altura insuficiente en portátiles, reordenación necesaria para conectar escenas y limpieza al cruzar breakpoints. Había cambios previos del usuario en el checkout; se conservaron.

## Implementación

Archivos nuevos: src/components/cinematic/CareerJourney.tsx y journey.module.css. Integración en la rama cinematic de Landing.tsx. No se editaron Hero, Header, fotografías, CTA ni la ruta pública.

- Un único escenario fijado bajo el Header (112 px), con altura 100svh menos el Header. Recorrido adicional de 2.8 alturas de viewport. No se interceptan rueda, teclado ni eventos táctiles; no hay snap obligatorio.
- Timeline GSAP + ScrollTrigger, scrub de 0.65 segundos. Tres producciones en el orden solicitado; máscaras verticales sustituyen imágenes y rótulos; líneas, color y desplazamiento de 12 px activan los créditos.
- La composición final se convierte en una página mediante una máscara calculada a partir del encuadre real. Los bordes perforados se desplazan y giran, tres capas se abren como páginas, el titular se revela mediante recorte y el marfil conecta mediante degradado con la superficie existente de Novel.
- Recursos existentes: tira-cinematografica-foto-real.webp, retrato-en-set-conceptual.webp, estudio-conceptual-vertical.webp y de-escena-a-pagina.webp. El aviso visible identifica composiciones conceptuales: no se presentan como escenas de las producciones. No se generaron imágenes.
- gsap.matchMedia activa pin únicamente desde 1001 px de ancho y 700 px de alto. Entre 700 y 800 px se compacta la composición. Móvil, tablet y ventanas bajas mantienen flujo natural, líneas de progreso y movimiento de fondo de 40 px en total, sin pin.
- prefers-reduced-motion: reduce omite completamente las animaciones de esta secuencia. El contenido base mantiene todos los textos visibles; las máscaras del titular y la superposición de escenas solo se activan con JavaScript.
- useGSAP y matchMedia con scope; media.revert() limpia animaciones y ScrollTriggers. Se elimina data-enhanced al cambiar modo. document.fonts.ready refresca medidas una vez y tiene protección al desmontar.
- Diagnóstico de desarrollo: /preview?scrollMarkers=1. Se usaron los markers para revisar límites de la timeline y disparadores móviles. La condición NODE_ENV impide activarlos en producción incluso con el parámetro.

## Verificación realizada

- npm run typecheck: correcto. npm run build final: correcto; / y /preview prerenderizados.
- Navegador, scroll real con rueda: escritorio 1197×954 y portátil 1366×768. Se observaron primer, segundo y tercer encuadre, cambios de rótulo y cronología, apertura de capas y revelación literaria.
- Avance y retroceso verificados en desarrollo y en la compilación de producción. Al volver a la segunda producción: segunda máscara inset(0%), tercera inset(100%), página opacity 0; título «Cada minuto cuenta» sin superposición.
- Salida del pin en producción: borde inferior de escenario y comienzo de Novel ambos en 557.59375 px de viewport. Sin hueco ni solapamiento entre ambas secciones al salir.
- Móvil 390×844: 0 pin-spacers de trayectoria; data-enhanced ausente; máscara de página none. Las líneas cambian su escala con el recorrido. Desbordamiento horizontal: scrollWidth 375 ≤ viewport 390. En escritorio: 1351 ≤ 1366.
- Cambio de escritorio a móvil en la misma sesión: se limpian pin y máscaras; vuelve el flujo natural. Menú móvil y ancla Trayectoria comprobados.
- Producción con ?scrollMarkers=1: 0 elementos de markers. Consola inspeccionada sin errores ni advertencias durante la revisión.
- HTML prerenderizado inspeccionado sin ejecutar JavaScript: las tres producciones, el titular y el ancla mi-novela están presentes; no hay data-enhanced ni estilos inline que oculten texto. La ruta / conserva UnderConstruction.
- Movimiento reducido verificado por inspección de la rama de matchMedia; no se cambió la preferencia del sistema del usuario ni se hizo una prueba visual con esa preferencia activada. La comprobación sin JavaScript fue del HTML y CSS base, no una sesión con JavaScript deshabilitado.

Capturas: scrollytelling/trayectoria-desktop.png, transicion-desktop.png y movil.png. Los cambios quedan locales para revisión en /preview.
