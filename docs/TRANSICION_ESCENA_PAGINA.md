# Transición «De la escena a la página»

## Cambio

La capa marfil anterior ganaba opacidad al empezar la transición, mientras su máscara ya tenía el tamaño del fotograma. Eso producía un bloque claro repentino. Ahora un único plano opaco comienza con ancho cero en el borde derecho del último fotograma, se abre dentro de él y luego crece hasta cubrir la escena. La máscara poligonal tiene una ligera inclinación de papel durante la apertura. El título aparece cuando el plano ya ocupa casi todo el escenario. Todo se controla en la timeline y el pin existentes de `CareerJourney.tsx`, por lo que retrocede con el scroll.

Se retiraron las tres hojas flotantes, su animación, la textura oscura y el mockup superpuesto del puente. Las fotografías, créditos y secuencia de trayectoria permanecen. En tablet y móvil, la superficie marfil y el título siguen el desplazamiento natural, con un degradado breve entre ambas escenas y sin pin. `prefers-reduced-motion` conserva la presentación estática.

## Verificación del 29 de octubre de 2026

- `npm run typecheck`: correcto.
- `npm run build`: correcto.
- Vista real en navegador local: escritorio 1440 × 900, tablet 820 × 1180, tamaños móviles 390 × 844 y 360 × 800. Se recorrió la transición lentamente, con saltos de scroll y en reversa. El plano se abre desde el fotograma, el título aparece sobre el fondo, y la unión con «Mi novela» permanece continua.
- Se comprobó un solo pin en escritorio, ninguno en tablet o móvil, y ausencia de desbordamiento horizontal en los tamaños revisados. La consola del navegador no mostró errores ni advertencias.

Los tamaños de iPhone y Android se comprobaron mediante dimensiones de viewport en el navegador local; no se dispuso de dispositivos físicos ni de Safari iOS o Chrome Android para validar su motor y sus gestos táctiles reales. La preferencia de movimiento reducido se verificó en la ruta de código, no con emulación del sistema.
