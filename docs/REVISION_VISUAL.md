# Revisión de imágenes de /preview

## Alcance

Revisados los componentes conectados a Landing, incluidos Hero, navegación, Mi novela, Mi historia, Trayectoria, Universo, Galería, Prensa, Compra y Footer, además de EditorialImage, datos y estilos. Se conservan los cambios que ya existían en el checkout.

No se modificaron Hero, navegación, animaciones, retrato oficial, portada, textos aprobados ni CTAs. No se incorporaron imágenes externas ni se publicaron cambios.

## Imágenes utilizadas

- `autora/retrato-oficial-iluminacion-pro.webp`: retrato oficial de Mi historia, conservado.
- `novela/portada-extraida-fotografia.webp`: portada conservada en Mi novela y Compra. Es un recurso editorial reutilizado para la compra, no una fotografía repetida de galería.
- `galeria/01-lesslie-libro-real.webp`: fotografía documental única de la galería, con ampliación. La versión en blanco y negro y las variantes de autora son la misma toma, por lo que no se repiten.
- `fondos/atmósfera-cine-cafe.webp`: fondo abstracto de Trayectoria. La referencia en código conserva la normalización Unicode del archivo original. Se identifica como conceptual y no se asigna a ninguna producción.
- `fondos/textura-editorial-marfil.webp`: profundidad en Mi novela, respetando la base marfil.
- `fondos/textura-literaria-bugambilia.webp`: profundidad en el universo literario, conservando su base bugambilia.

El Hero continúa utilizando `autora/retrato-estudio-conceptual.png`, tal como estaba aprobado. Los logos tampoco se modificaron.

## Material excluido

Los archivos de retratos y sets conceptuales no son fotografías documentales de producciones. No se asocian a títulos reales. La tira cinematográfica y el hero alternativo de foto real recomponen la misma fotografía del libro y no aportan tomas nuevas.

Los pequeños recursos de utilería y manuscrito presentan baja resolución y algunos incluyen fragmentos/bordes de otras composiciones. No se amplían como fotografías principales. El inventario completo, con dimensiones y clasificación visual, está en MAPA_IMAGENES.json. La clasificación no acredita licencias ni la procedencia técnica de retoques previos.

## Material pendiente de la cliente

- Fotografías oficiales/autorizadas de Como agua para chocolate, Cada minuto cuenta y Chespirito: Sin querer queriendo. Los campos `productions[].image` están preparados; al incorporar material oficial se muestra junto al crédito correspondiente, sin cajas vacías mientras tanto.
- Fotografías distintas de eventos, presentaciones, retratos o trabajo escénico para ampliar la galería. Por ahora existe una sola toma real adicional al retrato oficial.
- Enlaces y datos verificables de prensa/entrevistas. Se conserva la introducción editorial, sin tarjetas ni medios ficticios.
- Una portada digital de mayor resolución sería útil: la disponible mide 258 × 386 px. Se conserva la aprobada.

## Validación

- TypeScript y build de producción completados correctamente.
- Revisión en navegador de escritorio (1440 px) y móvil (390 y 360 px).
- Todas las imágenes de /preview cargaron con dimensiones naturales mayores que cero tras recorrer las secciones; sin desbordamiento horizontal en los tamaños revisados.
- Se comprobó la ampliación de la fotografía real y el cierre del visualizador.
- Sin bloques de relleno de galería; prensa no muestra bloques vacíos.
