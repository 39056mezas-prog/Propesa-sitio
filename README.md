# PROPESA · Sitio público (propesa.org)

Página de inicio de Proveedor del Pescador S.A. de C.V. HTML y CSS sin librerías ni servicios externos, publicada en Vercel.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa |
| `estilos.css` | Estilos |
| `sitio.js` | Vuelve sólida la cabecera al bajar y cierra el menú del teléfono |
| `globo.js` | El globo 3D de la portada: se gira arrastrando, con límite, rutas y luces. Si el equipo no tiene 3D o lo pierde (teléfono con poca memoria), se queda la foto fija `img/globo-inicio.jpg` con las rutas encima. Con «Reducir movimiento» no se anima y solo se dibuja cuando algo cambia |
| `img/tierra-textura.jpg` | Imagen satelital de la Tierra para el globo (NASA Blue Marble, dominio público), 2048×1024, 284 KB. No la agrande: con 4096 px el teléfono se quedaba sin memoria y quitaba el 3D |
| `img/globo-inicio.jpg` | Foto fija del globo para equipos sin gráficos 3D |
| `img/carta-contacto.svg` | Mapa de Ensenada y el norte de Baja California (mitad derecha de Contacto) |
| `fuentes/` | Letra Archivo (licencia OFL, incluida) |
| `img/logo-propesa*.svg` | Logo PROPESA (el mismo de la plataforma), a color y en blanco |
| `img/og-image.jpg` | Vista previa al compartir el link (WhatsApp, Facebook…): 1200×630, menos de 300 KB. Si se cambia, subir `?v=` en las etiquetas `og:image`/`twitter:image` de `index.html` |
| `favicon.svg` | La langosta blanca de la plataforma |
| `vercel.json` | Encabezados de seguridad y caché |

## Antes de publicar

1. **Fotos.** Ya están puestas: 3 fotos en `fotos/`: langosta sobre el tanque (Almacenaje), empaque (Maquila) y caja de langostas (Producto), cada una de fondo de una sección completa. Para cambiar una, reemplace el archivo con otro del mismo nombre: foto limpia, sin fondo revuelto, de al menos 1080 px de ancho, JPG de menos de 300 KB.
2. **Logo.** Es el mismo logo de la plataforma: `img/logo-propesa-blanco.svg` (blanco, en la cabecera y el pie); `img/logo-propesa.svg` es la versión a color, por si se necesita. Si algún día llega el archivo oficial, reemplace esos dos archivos con el mismo nombre.
3. **Iniciar sesión.** El botón apunta a `https://app.propesa.org/#entrar` (el `#entrar` hace que la plataforma abra el formulario sola, sin otro clic). Si la plataforma queda en otra dirección, cámbiela en `index.html` (dos lugares: cabecera y pie).

## Publicar

Repositorio aparte en GitHub → Vercel → *Framework: Other*, sin comando de compilación. Cuando el sitio quede en `propesa.org`, la plataforma debe pasar antes a `app.propesa.org` (tablets instaladas, `og:url`, CSP, direcciones de Supabase Auth y la tarea `/api/despierta`).

## Lo que la página no muestra (a propósito)

Domicilio, R.F.C., ciudades o aeropuertos de destino, fechas de temporada, nombres de proveedores o clientes, precios, y nada de la plataforma interna.
