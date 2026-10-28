# Lesslie Apodaca

Web editorial con Next.js App Router, TypeScript y Tailwind CSS. El proyecto se encuentra en `/Users/manuel/Documents/proyectos/web/lesslieapodaca.com`.

## Ejecutar

Requiere Node.js 20.9 o superior y npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Abre http://localhost:3000 para la página en construcción y http://localhost:3000/preview para la landing completa. `/preview` es una vista pública de desarrollo, sin autenticación, marcada `noindex, nofollow`. No se enlaza desde la portada pública. No guardes material confidencial en ella. El archivo robots permite su rastreo para que los buscadores puedan leer `noindex`.

## Activar el sitio completo

Cambia `SITE_LIVE=false` por `SITE_LIVE=true` en `.env.local` (o en las variables del proveedor de hosting). Reinicia el servidor de desarrollo. En producción vuelve a compilar y desplegar; el valor se aplica al compilar. La misma landing se reutiliza en `/` y `/preview`.

```sh
npm run typecheck
npm run build
npm start
```

`SITE_URL` define el origen para metadata. Establece el dominio definitivo antes de compilar. La imagen Open Graph se genera en `src/app/opengraph-image.tsx` sin fotografías ficticias. No se ha publicado el proyecto en un servicio de hosting.

## Contenido y assets

El contenido pendiente y los enlaces están en `src/lib/content.ts`; los textos editoriales base están en `src/lib/copy.ts`. Los campos sin confirmar usan `null` o listas vacías; los textos visibles indican lo pendiente. No se han creado una biografía, sinopsis, precio, reseñas, premios o publicaciones ficticias. La participación de Fina en _Como agua para chocolate_ (2024) y las temáticas provienen del encargo.

- Logo original: `public/images/logo.png`. Se detecta al compilar/iniciar, preservando proporciones y colores. Mientras no exista se muestra el nombre en texto.
- Fotografías: coloca los archivos en `public/images/` y completa `assets.portrait`, `assets.biography`, `productions[].image` y `gallery`.
- Libro: completa `book.title`, `synopsis`, `description`, `shortSynopsis`, `cover`, `price`, `format` y `purchaseUrl` solo con información confirmada.
- Citas autorizadas: `book.excerpts`, con `text` y `attribution`.
- Prensa verificada: `press`, con `title`, `outlet`, `url` y opcionalmente `date`.
- Contacto: completa `contactEmail` y añade únicamente redes confirmadas.

`purchaseUrl` acepta una URL externa completa (`https://…`). Sin ella, los CTAs de interés llegan a `#compra`; el cierre explica que falta confirmar el enlace y ofrece Facebook. Con ella se activan la compra externa y el CTA móvil. No hay formularios ni botones que simulen ventas.

La galería activa el visualizador al incorporar fotos reales. Incluye cierre con Escape, navegación con flechas y botones, foco contenido en un diálogo nativo y devolución del foco al cerrar.

Los colores y la tipografía se centralizan en `src/app/globals.css`. Cormorant Garamond y DM Sans se cargan desde Google Fonts con `display=swap` y tipografías de respaldo. Para hosting sin acceso a Google, pueden alojarse localmente respetando sus licencias.

## Estructura

- `src/app`: rutas, estilos globales, metadata y Open Graph.
- `src/components/sections`: secciones editoriales independientes.
- `src/components/Landing.tsx`: composición compartida.
- `src/components/UnderConstruction.tsx`: portada inicial.
- `src/lib/content.ts`: información editable y enlaces.

Antes de publicar el sitio definitivo, incorpora materiales autorizados y revisa los datos pendientes. Las áreas gráficas actuales son espacios tipográficos de composición, no fotografías ni portadas definitivas.
