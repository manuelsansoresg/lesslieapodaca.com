# Revisión de scrollytelling

## Implementación

- Story: una timeline reversible ligada al desplazamiento; retrato oficial con clip-path, título con desplazamiento de 18 px, párrafos de 8 px y opacidad inicial de 0.92 para preservar la lectura. CTA excluido. En móvil el retrato se revela más tarde dentro de la misma secuencia porque aparece debajo del texto. Sin pin.
- Novel: portada con recorrido vertical de +22 a −18 px en escritorio (+10 a −10 en móvil); profundidad de hasta 2 grados en el eje X, sin escala ni cambio de proporción, conservando la rotación editorial existente. Título con revelado breve al entrar. CTA sin animación de entrada.
- Universe: título «Entre estas páginas.» y fragmento protagonista; eliminado el párrafo que repetía la transición actriz/escritora. Revelado de 0.8 s del fragmento; sin segunda escena, sin pin, CTA independiente. Cita y atribución sin cambios.
- Purchase: portada con recorrido vertical de +18 a −12 px (+10 a −8 en móvil), texto comercial con entrada de 0.5 s y escalonamiento de 0.05 s. Sin animación del CTA ni cambios de textos/precios.
- CareerJourney natural: los créditos 2 y 3 revelan sus respectivos fotogramas con clip-path reversible entre el 64 % y 56 % del viewport. Ventana visual sticky local, dentro de la composición, sin pin de ScrollTrigger, espaciadores ni control táctil. Tablet y ventanas bajas usan también el recorrido vertical natural; la altura de la ventana se limita según el viewport. Mantiene títulos, personaje y aviso de composiciones conceptuales.
- CareerJourney escritorio: bloque de timeline idéntico al de HEAD. Se añade una medición tras cambiar de breakpoint para quitar correctamente las medidas del pin al volver al flujo natural. El frame pendiente se cancela al limpiar.
- Publicación: `app/page.tsx` usa `<Landing cinematic />` al recibir SITE_LIVE=true. No se cambió ni activó SITE_LIVE.

## Ciclo de vida y accesibilidad

Se reutilizan gsap, ScrollTrigger y useGSAP instalados. Cada sección limita selectores a su ref y revierte su matchMedia al desmontarse. Las animaciones nuevas solo se crean con prefers-reduced-motion: no-preference; al cambiar esa preferencia, el contexto revierte los estilos. El contenido no se oculta por CSS ni en el HTML inicial. El primer fotograma y todos los créditos permanecen en el flujo estático sin mejora animada. No se añaden dependencias, listeners táctiles, scroll artificial ni pines nuevos.

## Comprobaciones realizadas

- TypeScript y build de producción: correctos. Tras el último ajuste de opacidad de párrafos se volvió a ejecutar TypeScript correctamente.
- Navegador: escritorio 1440 × 1000, tablet 820 × 1180, móvil 390 × 844.
- Móvil: máscaras observadas en estados 1 → 2 → 3 → 2; el segundo fotograma llega a inset(0%) mientras el tercero sigue en inset(100% 0% 0%).
- Escritorio: avance a fotogramas 2 y 3 y retroceso a 2. Un solo .pin-spacer. En móvil y tablet, cero .pin-spacer, también después de cambiar de tamaño varias veces.
- Sin desbordamiento horizontal en las dimensiones revisadas.
- Portada con object-fit: contain; CTAs de novela y compra con opacidad 1, sin transformaciones de revelado. CTA de novela lleva a #compra. Navegación a secciones revisada con links reales del menú/header.
- HTML prerenderizado revisado: biografía, novela, trayectoria y compra presentes sin estilos iniciales de ocultamiento en section/h2/blockquote. No se ejecutó un navegador con JavaScript desactivado.
- Prefers-reduced-motion revisado en el código y sus rutas de limpieza; no se emuló la preferencia del sistema en el navegador disponible.
- Verificación automática contra HEAD: Hero, useHeroMotion, header, CSS del Hero, assets/datos de contenido, Landing, dependencias y bloque desktop de CareerJourney sin cambios.

## Pendiente comercial existente

Comprar mi libro continúa desactivado: purchaseUrl no tiene destino y todavía falta el número de WhatsApp indicado por el usuario. No se inventó un número ni se cambió su comportamiento durante esta revisión.


## Ajustes de transición literaria y scroll táctil (29 de octubre de 2026)

- La escena «De la escena a la página» incorpora el mockup ya existente `/images/lesslie/novela/libro-mockup-marfil.webp` a la derecha en escritorio. La misma timeline de CareerJourney controla su aparición, posición y rotación; no se añade otro pin ni un segundo ScrollTrigger.
- En tablet y móvil el libro se coloca debajo del texto, dentro del flujo natural. Su revelado independiente ocurre una sola vez y no sigue cada píxel del scroll.
- Los fotogramas de trayectoria en el modo natural cambian mediante ScrollTrigger callbacks discretos y tweens de 0.5 segundos, con cancelación de tweens anteriores. Las líneas de progreso dejan de emplear `scrub` en móvil; los títulos y créditos permanecen estáticos.
- Los tres fotogramas originales y el aviso de imágenes conceptuales se conservan. El modo de movimiento reducido sigue evitando estas animaciones.
- No se cambiaron los ajustes de pin ni la cronología de las producciones en escritorio.

### Validación pendiente

Los cambios quedaron subidos a `main`. No se pudo descargar el repositorio desde el entorno de ejecución (DNS de github.com no disponible), así que **no se han ejecutado nuevamente** `npm run typecheck`, `npm run build` ni pruebas de navegador sobre este commit. Verificar con una compilación local y Safari iPhone/Chrome Android: scroll lento, rápido, reversa, cambios de orientación y `prefers-reduced-motion`.


## Ajustes de transición literaria y scroll móvil (29 de octubre de 2026)

- Se incorpora el mockup existente `public/images/lesslie/novela/libro-mockup-marfil.webp` al puente «De la escena a la página»; la animación del libro está dentro de la timeline principal de escritorio, sin otro pin. Diseño de dos columnas en desktop y texto sobre libro en móvil.
- En flujo natural móvil/tablet, los tres fotogramas cambian por umbrales de ScrollTrigger con transiciones discretas de 0.5 s, sin scrub ligado a cada píxel del gesto; las líneas de progreso permanecen estables. El contenido literario utiliza una entrada breve sin pin.
- Se conserva `prefers-reduced-motion` y el comportamiento desktop. Los recursos son locales y no se añaden paquetes.
- Validación pendiente: el entorno de esta edición no tuvo acceso a clonar el repositorio para ejecutar `npm run typecheck` ni `npm run build`; tampoco se pudo comprobar físicamente Safari iPhone/Android ni el desplazamiento rápido/reverso. Es necesario ejecutar estas comprobaciones antes de aprobar la publicación.

## Ajuste por revisión visual del recorrido

- Se retira el mockup adicional del libro de la transición «De la escena a la página»: la portada ya tiene su presentación principal en «Mi novela» y vuelve a aparecer durante la compra, por lo que otra repetición debilitaba la narrativa visual.
- El puente vuelve a utilizar exclusivamente máscaras, pliegues marfil y tipografía como transición editorial; se conserva el efecto GSAP de las hojas y el título.
- Se conservan las transiciones discretas entre fotogramas en móvil y las mejoras de estabilidad táctil.
- Las observaciones anteriores sobre el mockup se mantienen como historial, no como descripción del estado actual.


## Composición de manuscritos en la transición (29 de octubre de 2026)

- Sustituye el vacío derecho por tres hojas HTML/CSS sin imágenes de portada ni citas atribuidas a la novela. Bordes ligeramente irregulares, textura de fibras, folios, líneas tipográficas y sombras discretas; los textos son rótulos editoriales genéricos.
- El título permanece intacto a la izquierda. Desktop: los papeles entran escalonados y se abren ligeramente al final dentro de la **misma** timeline GSAP `career-to-page`, reversible al regresar; sin otro pin.
- Tablet/móvil: las hojas se presentan en flujo natural debajo del título, con transformaciones CSS estáticas y sin scrub ni nuevos ScrollTriggers; se conserva el comportamiento de fotogramas discretos existente.
- Se respeta `prefers-reduced-motion`: no se crea la animación de GSAP y la composición permanece visible en estado estático.
- **Validación pendiente:** se intentó `git clone` para ejecutar `npm ci`, `npm run typecheck` y `npm run build`, pero el entorno falló con `Could not resolve host: github.com`. No hubo ejecución de build ni pruebas de Safari iPhone, Chrome Android o scroll reversible en navegador real en esta sesión. Comprobar en local antes de publicar.


## Ajuste fino: apertura de fotograma a manuscrito (29 de octubre de 2026)

- **Causa del rectángulo:** `[data-paper]` pasaba a opacidad 1 en 0.22 unidades de timeline mientras `clip-path` seguía abriéndose; la superficie marfil podía destacar como bloque que se superponía al fotograma. Ahora la opacidad y la expansión comparten un solo tween reversible de 1.35 unidades.
- **Máscara:** se calcula un polígono con los límites reales de `[data-window]` respecto a `[data-stage]`, ajustados a 0–100 %. Esto permite que la transición nazca en el encuadre y se expanda hacia el viewport sin una máscara rectangular arbitraria. Conserva el pin existente y no añade otro.
- **Papel:** tres hojas con orígenes de giro independientes, movimientos asimétricos `rotationX`/`rotationY`, sombras sutilmente variables y apertura escalonada dentro de `career-to-page`. Se retiró el `clip-path` individual de hojas porque recortaba las sombras proyectadas; los bordes siguen suavemente irregulares mediante `border-radius`.
- **Texto y móvil:** el texto se revela después de iniciar la transformación. En el flujo natural de tablet/móvil solo hay una entrada breve `once: true` del conjunto sin 3D ni scrub; las líneas y créditos conservan su lógica estable anterior. `prefers-reduced-motion` conserva la composición estática.
- **Validación no realizada:** GitHub fue accesible a través del conector para editar archivos, pero `git ls-remote` desde el contenedor falló por DNS (`Could not resolve host: github.com`). No se ejecutaron `npm run typecheck`, `npm run build` ni pruebas visuales en navegadores reales en esta revisión. Requiere verificaciones de trayectoria → apertura → hojas → novela, avance/reversa y cambios de tamaño antes de producción.
