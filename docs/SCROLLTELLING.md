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
