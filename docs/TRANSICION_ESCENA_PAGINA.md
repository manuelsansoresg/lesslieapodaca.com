# Transición «De la escena a la página»

## Implementación vigente — 29 de octubre de 2026

Se eliminó `paperMask`, el cálculo del polígono relativo al fotograma, sus dos interpolaciones de `clip-path`, el atributo `data-paper` y los estilos `.paper`. No quedan hojas, manuscritos, pliegues ni mockups animados en este puente. Los tres fotogramas, créditos y sus animaciones se conservan.

La única timeline de escritorio sigue siendo `career-to-page`, con el mismo pin, inicio (`top 112px`), recorrido (3.8 alturas de ventana) y scrub (0.65). La nueva secuencia es:

1. Tras estabilizarse el tercer fotograma, las dos máscaras oscuras ganan opacidad durante 0.4 unidades de timeline, fundiendo la escena a oscuridad.
2. Con las máscaras opacas y cerradas, se hace visible el fondo marfil completo. Su superficie usa `position: absolute; inset: 0`, sin recortes, escalas, desplazamientos ni degradados de papel.
3. Las máscaras cubren cada una la mitad del ancho y toda la altura del escenario. Se desplazan simultáneamente con `xPercent: -100 / 100` durante 1.5 unidades. La apertura central toca siempre ambos límites verticales del escenario.
4. Al 80 % del tiempo de apertura (96.8 % de apertura espacial con `power2.inOut`), el bloque tipográfico aparece con `autoAlpha` y un desplazamiento vertical de solo 12 px.
5. Se mantienen 0.65 unidades para lectura con el título completamente visible antes de liberar el pin. Estas unidades se distribuyen sobre el recorrido de scroll; no son segundos de espera obligatoria.

Todos los estados están dentro de la misma timeline y se revierten al subir: texto oculto y desplazado, máscaras cerradas, superficie invisible y recuperación del fotograma. Las máscaras no reciben eventos ni forman parte del árbol accesible. En el estado final se encuentran completamente fuera del escenario y su contenedor recorta cualquier desbordamiento.

El escenario conserva la altura disponible bajo el encabezado: `100svh - 112px`. El marfil coincide exactamente con sus límites. Se conserva la unión de color existente hacia «Mi novela»; no se editan las otras secciones.

## Móvil y movimiento reducido

En móvil/tablet y ventanas bajas se conserva el flujo natural, el degradado breve de oscuro a marfil y el título estático. Las máscaras tienen `display: none`; no hay pin ni scrub de transición ni animación tipográfica. Los cambios discretos de los tres fotogramas conservan su comportamiento previo.

Con `prefers-reduced-motion: reduce`, la función retorna antes de crear animaciones o el pin. El título y el marfil se presentan en el flujo normal, sin estados ocultos de escritorio. Esta ruta se revisó en código; la herramienta de navegador disponible no ofrece emulación de esta preferencia y no se cambió la configuración del sistema del usuario.

## Validación ejecutada

- `npm run typecheck`: correcto.
- `npm run build`: correcto (Next.js 16.4.3, compilación y generación estática).
- Navegador local en `/preview`: escritorio 1440 × 900 y 1280 × 720; móvil 390 × 844.
- Recorrido lento mediante pasos cortos, saltos rápidos y reversa en escritorio y móvil. En reversa se verificaron las máscaras al 50 % y después la superficie y el título ocultos con las máscaras transparentes sobre el último fotograma.
- Un único `.pin-spacer` en escritorio; cero en móvil. Cambio de tamaño escritorio → móvil → escritorio sin pin residual. Sin desbordamiento horizontal en los tamaños comprobados.
- Geometría de superficie y escenario idéntica: 1425 × 788 en escritorio 1440 × 900 y 1265 × 608 en escritorio 1280 × 720 (ancho útil excluyendo la barra de scroll).
- Cinco estados capturados y examinados: sin rectángulos marfil flotantes, bordes interiores superiores/inferiores, solapamientos residuales, cortes de color en la salida ni huecos añadidos entre secciones. La apertura parcial muestra una franja marfil de altura completa, delimitada por las dos máscaras.
- Consola: sin errores ni advertencias durante el recorrido revisado.

Las dimensiones móviles son una emulación de viewport; no se verificaron dispositivos físicos, gestos táctiles reales ni Safari iOS. Las capturas corresponden al servidor de desarrollo, no a un despliegue público.

## Capturas

| Estado | Evidencia |
| --- | --- |
| Último fotograma | [01 — Fotograma](scrollytelling/mascaras-01-fotograma.jpg) |
| Inicio de apertura | [02 — Inicio](scrollytelling/mascaras-02-inicio.jpg) |
| Apertura al 50 % | [03 — Mitad](scrollytelling/mascaras-03-mitad.jpg) |
| Marfil completo y título | [04 — Título](scrollytelling/mascaras-04-titulo.jpg) |
| Entrada a Mi novela | [05 — Novela](scrollytelling/mascaras-05-novela.jpg) |
| Puente móvil estático | [Móvil](scrollytelling/mascaras-movil.jpg) |
