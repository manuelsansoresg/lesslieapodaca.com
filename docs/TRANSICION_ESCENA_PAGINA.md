# Transición «De la escena a la página»

## Implementación vigente: fundido cinematográfico — 29 de octubre de 2026

Esta versión sustituye por completo las cortinas oscuras del intento anterior. Se eliminaron los dos nodos `data-curtain`, sus estilos y sus animaciones de opacidad/desplazamiento. No se añaden libros, hojas, manuscritos, tarjetas, iconos ni otros elementos decorativos. Los tres fotogramas, créditos y tipografía mantienen su contenido y diseño.

### Fondo y continuidad

El propio `[data-stage]` interpola `backgroundColor` de `--color-brown` a `--color-ivory`, mientras `[data-film-body]` baja su `autoAlpha` de 1 a 0 con el mismo inicio, duración y curva (`power1.inOut`). El último fotograma permanece completamente visible hasta el inicio del fundido. No hay una fase de cierre a oscuridad ni una espera café entre escenas.

En escritorio, `.bridgeSurface` ocupa el escenario mediante `position: absolute; inset: 0` y su fondo es transparente. Sirve para colocar el texto, sin cubrir la trayectoria con un plano marfil. No usa recortes, escalas ni apertura espacial. El marfil final lo pinta el escenario completo, con altura disponible `100svh - 112px` bajo el encabezado.

### Ritmo y reversibilidad

Se conserva la única timeline `career-to-page`, el único pin, `start: top 112px`, `scrub: 0.65` y `invalidateOnRefresh`. El recorrido se reduce de 3.8 a 2.8 alturas de ventana (aproximadamente 26 % menos desplazamiento).

- Secuencia de los tres fotogramas: mismos tiempos y animaciones previos.
- `page`, en 2.45: empieza el fundido de escenario y trayectoria, durante 1 unidad de timeline. La última línea termina de animarse en 2.35; el último fotograma no desaparece antes del fundido.
- `page + 0.82`: entra el título con opacidad y 8 px de desplazamiento vertical, durante 0.45 unidades. En ese punto el fondo ha recorrido aproximadamente 93.5 % del cambio de color.
- `reading`: 0.35 unidades con el título estable antes de liberar el pin. Duración total: 4.07 unidades.

Las unidades anteriores se distribuyen sobre el recorrido de scroll; no son pausas obligatorias en segundos. En reversa, el título se oculta y vuelve a su desplazamiento inicial, la trayectoria recupera su opacidad/visibilidad y el fondo vuelve al café. No hay callbacks de salida que impongan estados irreversibles. Al terminar, el fondo es `rgb(248, 243, 233)`, la trayectoria tiene opacidad 0/visibilidad oculta y el título opacidad 1/transformación neutra.

El espacio negativo derecho, la tipografía, los colores y la unión cromática existente con «Mi novela» se conservan. No se editaron otras secciones ni se añadieron dependencias.

### Móvil, tablet y movimiento reducido

Se conserva el flujo natural sin pin ni scrub del puente: degradado estático corto de café a marfil y texto sin transformaciones ni animaciones. Los cambios discretos existentes de fotogramas no se modifican. Al cambiar desde escritorio, `matchMedia` revierte el color de escenario y las opacidades antes de aplicar el modo natural.

`prefers-reduced-motion: reduce` retorna antes de crear la timeline, el pin o los cambios de fotograma. El título y el marfil se muestran estáticos mediante los estilos base. Esta ruta se revisó en código; el navegador disponible no ofrece emulación de esa preferencia y no se cambió la configuración del sistema.

## Validación ejecutada

- `npm run typecheck`: correcto.
- `npm run build`: correcto, incluida compilación, TypeScript y generación estática.
- Navegador local en `/preview`, escritorio 1440 × 900 y 1280 × 720; móviles 390 × 844 y 360 × 800; tablet 820 × 1180.
- Cinco estados examinados y capturados: último fotograma, inicio de fundido, mitad, título final y entrada a «Mi novela». Sin franja vertical, rectángulo superpuesto, pantalla café vacía intermedia ni huecos añadidos entre secciones.
- En 1440 × 900, último fotograma en scroll 3121: opacidad 1 y fondo `rgb(52, 33, 3)`. Inicio en 3261: opacidad 0.9779. Mitad en 3505: opacidad 0.5017 y fondo uniforme `rgb(150, 138, 118)`. Título estable en 4000: fondo marfil final y transformación neutra.
- Reversa rápida desde «Mi novela» hasta mitad del fundido: se recuperan los mismos valores de opacidad y color; después, trayectoria con opacidad 1 y fondo café. Recorrido lento en siete pasos cortos, salto rápido en escritorio compacto y scroll lento/rápido/reversa en móvil; recorrido y reversa en tablet.
- Un `.pin-spacer` en escritorio y cero en móvil/tablet. Redimensionado escritorio → móvil → tablet → escritorio sin estados ocultos ni pins residuales.
- Escenario y superficie con límites idénticos: 1425 × 788 y 1265 × 608 en los dos escritorios (ancho útil sin barra de scroll).
- La entrada de «Mi novela» coincide con el borde inferior del escenario (505.17 px en la captura), sin separación artificial.
- Sin desbordamiento horizontal en los cinco tamaños; título completo bajo el encabezado en los estados de lectura revisados. Consola sin errores ni advertencias.

Los tamaños móviles/tablet simulan viewports, no dispositivos físicos: no se probaron motores Safari iOS/Chrome Android ni gestos táctiles reales. Las capturas provienen del servidor local de desarrollo. La emulación visual de movimiento reducido queda sin ejecutar; se comprobó su ruta estática en código.

## Evidencias actuales

| Estado | Captura |
| --- | --- |
| Último fotograma | [01 — Fotograma](scrollytelling/fundido-01-fotograma.jpg) |
| Inicio del fundido | [02 — Inicio](scrollytelling/fundido-02-inicio.jpg) |
| Fundido al 50 % | [03 — Mitad](scrollytelling/fundido-03-mitad.jpg) |
| Marfil completo y título | [04 — Título](scrollytelling/fundido-04-titulo.jpg) |
| Entrada a Mi novela | [05 — Novela](scrollytelling/fundido-05-novela.jpg) |
| Móvil 390 × 844 | [Móvil 390](scrollytelling/fundido-movil-390.jpg) |
| Móvil 360 × 800 | [Móvil 360](scrollytelling/fundido-movil-360.jpg) |
| Tablet 820 × 1180 | [Tablet](scrollytelling/fundido-tablet.jpg) |

Las capturas `mascaras-*` corresponden al intento anterior y se conservan únicamente como registro histórico.
