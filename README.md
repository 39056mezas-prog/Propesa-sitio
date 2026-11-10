# PROPESA · Sitio público (propesa.org)

Página de inicio de Proveedor del Pescador S.A. de C.V. HTML y CSS sin librerías ni servicios externos, publicada en Vercel.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa |
| `estilos.css` | Estilos |
| `sitio.js` | Vuelve sólida la cabecera al bajar y cierra el menú del teléfono |
| `globo.js` | El globo 3D de la portada: se gira arrastrando, con límite, rutas y luces. Lo único que se mueve encima es el avioncito de la ruta Ensenada → China continental (desde el 7/nov/2026 no hay barco, langosta, garabato ni avión grande). Los nombres están quietos desde el inicio. Si el equipo no tiene 3D o lo pierde (teléfono con poca memoria), se queda la foto fija `img/globo-inicio.jpg` con las rutas encima. Con «Reducir movimiento» no se anima y solo se dibuja cuando algo cambia Fuera de la pantalla deja de dibujar (no gasta batería mientras se lee el resto de la página). |
| `img/tierra-textura.jpg` | Imagen satelital de la Tierra para el globo (NASA Blue Marble, dominio público), 2048×1024, 284 KB. No la agrande: con 4096 px el teléfono se quedaba sin memoria y quitaba el 3D |
| `img/globo-inicio.jpg` | Foto fija del globo para equipos sin gráficos 3D |
| `img/mapa-satelital.jpg` | Foto satelital de Baja California (mitad derecha de Contacto), recortada de la misma imagen de la NASA del globo (8/nov/2026) |
| `fuentes/` | Letra Archivo (licencia OFL, incluida) |
| `img/logo-propesa*.svg` | Logo PROPESA (el mismo de la app «PROPESA — Procesos y Operaciones»), a color y en blanco |
| `img/og-image.jpg` | Vista previa al compartir el link (WhatsApp, Facebook…): 1200×630, menos de 300 KB. Si se cambia, subir `?v=` en las etiquetas `og:image`/`twitter:image` de `index.html` |
| `favicon.svg` | La langosta blanca de la app |
| `.vercelignore` | Lista de lo único que Vercel publica. README, DESIGN y PRODUCT se quedan en GitHub sin verse en la página. Si agregas un archivo o carpeta que la página usa, agrégalo ahí con «!» |
| `robots.txt`, `sitemap.xml` | Le dicen a Google que puede leer la página y dónde está |
| `favicon-48/192/512.png` | El ícono en PNG (Google lo enseña junto al nombre en los resultados; 48 px o más) |
| `vercel.json` | Encabezados de seguridad y caché |

## Al publicar un cambio

Sube el número `?v=` de `estilos.css`, `sitio.js` y `globo.js` en `index.html` (ahora `v=10`) para que los teléfonos no se queden con la versión vieja.

## Antes de publicar

1. **Fotos.** Ya están puestas: 3 fotos en `fotos/`: langosta sobre el tanque (Almacenaje), empaque (Maquila) y caja de langostas (Producto), cada una de fondo de una sección completa. Para cambiar una, reemplace el archivo con otro del mismo nombre: foto limpia, sin fondo revuelto, de al menos 1080 px de ancho, JPG de menos de 300 KB.
2. **Logo.** Es el mismo logo de la app: `img/logo-propesa-blanco.svg` (blanco, en la cabecera y el pie); `img/logo-propesa.svg` es la versión a color, por si se necesita. Si algún día llega el archivo oficial, reemplace esos dos archivos con el mismo nombre.
3. **Iniciar sesión.** El botón apunta a `https://app.propesa.org/#entrar` (el `#entrar` hace que la app abra el formulario sola, sin otro clic). Si la app queda en otra dirección, cámbiela en `index.html` (dos lugares: cabecera y pie).

## Publicar

Repositorio aparte en GitHub → Vercel → *Framework: Other*, sin comando de compilación. Cuando el sitio quede en `propesa.org`, la app («PROPESA — Procesos y Operaciones») debe pasar antes a `app.propesa.org` (tablets instaladas, `og:url`, CSP, direcciones de Supabase Auth y la tarea `/api/despierta`).

## Lo que la página no muestra (a propósito)

Domicilio, R.F.C., ciudades o aeropuertos de destino, fechas de temporada, nombres de proveedores o clientes, precios, y nada de la app interna.

## Cómo sale en Google (9/nov/2026)
- **Nombre del sitio** (la línea de arriba, junto al ícono): «PROPESA» (JSON-LD `WebSite.name` y `og:site_name`).
- **Título:** «Envíos Internacionales y Almacenamiento de Langosta Viva | Proveedor del Pescador S.A. de C.V.» (`<title>`).
- **Descripción:** empieza con «Proveedor del Pescador S.A. de C.V. (PROPESA): somos una empresa de Ensenada…» (`meta description`).
- Google decide cuándo actualizar: después de publicar, en Google Search Console usa «Inspección de URL» → «Solicitar indexación» para `https://propesa.org/`. Puede tardar días.
