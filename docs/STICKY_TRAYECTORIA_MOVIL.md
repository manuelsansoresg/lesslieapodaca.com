# Corrección del sticky de trayectoria en móvil

29 de octubre de 2026.

## Causa reproducida antes del cambio

La figura sticky ya tiene `z-index: 5` y fondo café opaco, mientras los créditos usan apilamiento normal. La fotografía oculta correctamente los títulos cuando pasan por debajo de su propia superficie. Sin embargo, esa superficie comienza en `top: 98px` en móvil y `120px` en tablet. El encabezado fijo tiene `z-index: 60`, fondo translúcido y termina a 91 px o 113 px, incluyendo su borde. El espacio de separación queda descubierto: el z-index de la figura no puede ocultar contenido fuera de su caja.

Se reprodujo en 390 × 844: figura en y=98, título de la primera producción en y=72.55..144.61 y letras visibles entre el encabezado y el fotograma. Se guardó la captura anterior y se comprobó la misma posición de scroll (2464) después de corregirla.

## Corrección mínima

Solo cambia `src/components/cinematic/journey.module.css`, dentro de las reglas existentes del modo `data-enhanced="natural"`:

- La variable local `--journey-sticky-top` comparte el desplazamiento entre la figura y la protección superior: 98 px en móvil, 120 px en el resto del recorrido natural.
- `figure::before` prolonga el fondo café hacia arriba una distancia igual al desplazamiento sticky. Tiene el mismo ancho que la figura y cubre todos los créditos que circulan por esa columna. No añade bordes, sombras, degradados ni contenido visible nuevo.
- El pseudoelemento es absoluto, no ocupa espacio y acompaña a la figura al entrar y salir de sus límites sticky. Su `pointer-events: none` conserva la interacción.
- La introducción de la sección usa `position: relative; z-index: 6` solo en el modo natural, para que la prolongación superior no la oculte antes de que la fotografía se fije. El encabezado conserva su capa superior global.

No se agrega overflow a los ancestros, no se cambia la geometría de la figura ni de los créditos y no se edita `CareerJourney.tsx`. La timeline de escritorio, los tres cambios de escena y los ScrollTriggers existentes quedan intactos.

Con movimiento reducido, la lógica existente no aplica `data-enhanced="natural"`; estas reglas no se activan. No hay nueva animación ni cambio en esa ruta estática.

## Validación ejecutada

- `npm run typecheck`: correcto.
- `npm run build`: correcto, incluida generación estática.
- Navegador local en `/preview`, dimensiones 390 × 844, 360 × 800, 750 × 1024 y 820 × 1180.
- Comparación antes/después en la misma posición problemática: desaparecen las letras sobre la fotografía sin mover la fotografía ni el título.
- Entrada a la sección: introducción completa, sin recorte por la protección superior.
- Fotogramas 01, 02 y 03 observados durante el recorrido de 390 × 844; títulos completos cuando se encuentran bajo la fotografía.
- Sticky activo: figura en y=98 en móvil y y=120 en tablet, por debajo del encabezado. La protección tiene exactamente la altura del desplazamiento y no genera una franja visual distinta del fondo.
- Pasos lentos, saltos rápidos y reversa en móvil; entrada y salida del contenedor sticky sin protección residual sobre el puente marfil. Reversa adicional en 360 px.
- Sin pins en el recorrido natural y sin desbordamiento horizontal en los cuatro tamaños.
- Escritorio 1440 × 900: `data-enhanced="desktop"`, un pin existente, `figure::before` con `content: none` y encabezado de la sección sin la posición adicional. La corrección no se activa.
- Consola del navegador sin errores ni advertencias.

## Límites de las pruebas

Solo estaba disponible el navegador integrado con control de viewport. No se probaron Safari en iPhone ni Chrome en Android, dispositivos físicos, gestos táctiles reales o el cambio dinámico de sus barras del navegador. Movimiento reducido se comprobó en la ruta de código, sin emulación visual. Estas verificaciones específicas de dispositivos quedan pendientes.

## Capturas

| Estado | Evidencia |
| --- | --- |
| Antes, título filtrándose en el hueco | [Antes](scrollytelling/sticky-movil-antes.jpg) |
| Después, misma posición | [Después](scrollytelling/sticky-movil-despues.jpg) |
| Introducción sin recortes | [Entrada](scrollytelling/sticky-movil-entrada.jpg) |
| Segundo fotograma y créditos completos | [Segundo](scrollytelling/sticky-movil-segundo.jpg) |
| Tercer fotograma | [Tercero](scrollytelling/sticky-movil-tercero.jpg) |
| Móvil 360 px | [360](scrollytelling/sticky-movil-360.jpg) |
| Tablet 750 px | [750](scrollytelling/sticky-tablet-750.jpg) |
| Tablet 820 px | [820](scrollytelling/sticky-tablet-820.jpg) |
