# TecRural — landing page

Web estática generada con [Eleventy](https://www.11ty.dev/) y desplegada en Vercel. La portada, las líneas de investigación y la sección de recursos se sirven desde `https://www.tecrural.es/`.

## Identidad y contenido

- `assets/tecrural-logo.webp` y `assets/tecrural-icon.webp` son los archivos de marca aportados por TecRural.
- `assets/olivar-sensores.webp` es una imagen ilustrativa generada para esta página; no representa una instalación real concreta.
- `assets/manuel-carrasco-tecrural.webp` es el retrato aportado por el promotor y se utiliza en la sección de presentación.
- `assets/research/*.webp` contiene nueve imágenes generadas para ilustrar las líneas de investigación. Son escenas conceptuales, no evidencia de productos o instalaciones ya validados.
- Tipografía: Manrope para titulares y DM Sans para texto de interfaz, ambas servidas desde Google Fonts con los pesos usados por el sitio.
- La descripción de servicios, el alcance del diagnóstico y los precios orientativos se ajustaron según la [Wiki TecRural](https://github.com/mcgnexus/WIKI_TECRURAL).
- Los planes Campo, Esencial, Monitor, Pro y Cooperativas, y sus importes, proceden del plan de empresa. Se identifican en la página como precios de planificación pendientes de validación comercial.
- La aplicación meteorológica y de alarmas enlazada es la URL de producción documentada: <https://alarmas.tecrural.es/>.
- La app operativa de diagnóstico vegetal desde el móvil es: <https://diagnostico.tecrural.es/>.

## Personalización antes de activar captación directa

- Añadir los perfiles oficiales de Instagram/Facebook y un número de WhatsApp Business si se desea ofrecer un canal directo desde esta página.
- Actualizar el contenido de servicios y precios cuando cambie la oferta aprobada. Los precios de los planes actuales son hipótesis comerciales de planificación.
- URL canónica (`https://www.tecrural.es/`) y metadatos Open Graph ya incluidos en la portada y en cada línea de investigación. Verifica que el dominio `www.tecrural.es` redirija al sitio desplegado y que `og:image` apunte a recursos accesibles públicamente.

## Desarrollo

```bash
npm install     # instala @11ty/eleventy y el plugin RSS
npm run dev     # servidor local con recarga en http://localhost:8080
npm run build   # genera el sitio en _site/
```

## Estructura

- `src/index.njk` — portada. Eleventy extrae el CSS del documento generado a `/assets/landing.css` para que Vercel lo pueda cachear.
- `src/recursos/` — guías (`guias/*.md`) y bitácora de campo (`bitacora/*.md`). Cada artículo es un `.md` con front matter (`title`, `description`, `date`, `updated`, `category`, `categoryLabel`, `zone`, `hero`, `heroAlt`, `permalink`, `tags: ["recursos"]`, `related[]`, `draft`).
- `src/recursos/recursos.11tydata.js` — layout de artículos y regla de borradores (`draft: true` no se publica en builds y no entra en listados, sitemap ni feed).
- `src/_includes/` — layouts (`base.njk`, `post.njk`) y partials (`header`, `footer`, `mobile-cta`).
- `assets/site.js` — comportamiento de navegación móvil y año del pie de página.
- `src/privacidad.njk` y `src/cookies.njk` — información de privacidad, analítica y solicitudes a servicios externos.
- `src/sitemap.njk` y `src/feed.njk` — `sitemap.xml` y `feed.xml` se generan solos al añadir artículos.
- `assets/` e `investigacion/` se copian tal cual al resultado (*passthrough*).

## Cómo publicar un artículo

No necesitas ayuda externa ni saber HTML. Tres caminos:

**Opción A — en tu ordenador (recomendada):**

```bash
npm run nuevo -- "Título del artículo" guia        # o bitacora
# edita el .md creado en src/recursos/guias/ (rellena los TODO)
npm run dev                                        # previsualiza en http://localhost:8080
# cuando esté listo: cambia draft: true por draft: false en el .md
git add -A && git commit -m "Nuevo artículo" && git push   # se publica solo
```

**Opción B — desde github.com (sin terminal):**

1. En el repositorio, botón **Add file → Create new file**, ruta:
   `src/recursos/guias/mi-articulo.md`
2. Pega la plantilla de front matter de abajo, escribe el contenido y haz *Commit*.
3. Vercel despliega automáticamente al minuto.

**Opción C — pedírmelo por el asistente**: también vale, pero no es necesario.

Plantilla de front matter (la cabecera `--- ... ---` inicial del archivo):

```yaml
---
title: "Título del artículo"
description: "Resumen de 1-2 frases: es lo que se ve en Google y al compartir."
date: 2026-09-27
category: guias            # o bitacora
categoryLabel: Guía        # Bitácora de campo
zone: "Costa Tropical"
crops: ["mango"]
hero: /assets/research/app-agroclimatica.webp
heroAlt: "Describe qué se ve en la imagen"
ogImage: /assets/og/app-agroclimatica.jpg
permalink: /recursos/guias/mi-articulo/
draft: true                # cámbialo a false para publicar
tags: ["recursos"]
related:
  - url: /investigacion/app-agroclimatica/
    title: "App web: meteorología, alarmas y cálculo de riego"
---
```

## Recursos (guías y bitácora)

Dos líneas editoriales: **guías de cultivo** orientadas a búsqueda local (mango, aguacate, chirimoya, olivo, almendro) y **bitácora de campo** con datos medidos en nuestras estaciones. Reglas:

- Orientación, nunca dictamen: sin dosis ni tratamientos; las fuentes oficiales (RAIF, SIAR, AEMET, MAPAMA) se citan y prevalecen.
- Cada artículo lleva `Article` + `BreadcrumbList` JSON-LD, imagen OG en `assets/og/` (1200×630 JPEG) y UTMs propias para atribuir leads.
- Los borradores se marcan `draft: true`; se pueden previsualizar con `npm run dev` pero no se publican.

## SEO

- `robots.txt` y `sitemap.xml` apuntan al dominio `https://www.tecrural.es/`. El sitemap se **genera con Eleventy** y lista la portada, las nueve líneas de investigación y cada artículo publicado. También hay feed RSS en `/feed.xml`.
- Portada y artículos: `canonical`, Open Graph completo (locale, url, site_name, image con dimensiones y alt) y datos estructurados JSON-LD (`WebSite` + `ProfessionalService` en portada; `Article` + `BreadcrumbList` en cada artículo).
- Cada línea de investigación: `canonical`, Open Graph con imagen propia y `alt`, y JSON-LD con `BreadcrumbList` y `ResearchPage`.
- Rendimiento: el hero (LCP) se precarga con `fetchpriority="high"`; las imágenes llevan `width`/`height` para evitar saltos de layout. Un solo `h1` por página.
- Antes de publicar en producción, confirma que `www.tecrural.es` redirige al deploy y que las URLs `og:image` son accesibles públicamente. Tras desplegar, envía `sitemap.xml` en Google Search Console y verifica los datos estructurados con la prueba de resultados enriquecidos.

## Despliegue en Vercel

El sitio está pensado para Vercel. La analítica de visitas y eventos está desactivada hasta que Web Analytics quede correctamente habilitado para el dominio de producción.

- Importa el repositorio en Vercel. Al ser estático, no requiere *build command* ni *output directory*.
- `vercel.json` ya define:
  - `cleanUrls` y `trailingSlash: true` para servir rutas limpias como `/investigacion/<linea>/` (coincidentes con el `canonical` y el sitemap).
  - Caché larga e inmutable para imágenes y caché moderada para JS/CSS, además de una CSP que restringe scripts a recursos propios y permite Google Fonts; las reglas de estilo inline se limitan a los atributos que aún se usan en el HTML.
  - HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, COOP y `Permissions-Policy`.
- Dominios: `www.tecrural.es` como dominio principal y `tecrural.es` con **redirección a nivel de dominio** (`308`) hacia `www.tecrural.es`, configurada en el panel de Vercel (Domains → Edit → Redirect). Mantén `alarmas.tecrural.es` como proyecto o dominio aparte para no sobrescribir la app meteorológica.
- DNS (gestionado en Cloudflare, proxy desactivado): `CNAME www → cname.vercel-dns.com` y `A @ → 76.76.21.21`. Tras apuntar el DNS, Vercel emite los certificados TLS automáticamente.
- No se debe solicitar manualmente `/_vercel/insights/script.js` desde el cliente mientras devuelva 404. Antes de habilitar analítica, confirma que el dominio está asociado al proyecto correcto y que Web Analytics está activo en el panel de Vercel.

## Líneas de investigación

El catálogo `/investigacion/` reúne nueve páginas independientes para explicar las líneas de trabajo de TecRural.

- [App web: meteorología, alarmas y cálculo de riego](./investigacion/app-agroclimatica/)
- [Minicentrales meteorológicas conectadas a red y con placas solares](./investigacion/estaciones-solares/)
- [Sensores de humedad del suelo, temperatura foliar y crecimiento](./investigacion/fitomonitorizacion/)
- [Medidas espectrales por reflexión y transmisión](./investigacion/analisis-espectral/)
- [Identificación visual de insectos, patógenos y cambios de color](./investigacion/analisis-imagenes-ia/)
- [Diagnóstico vegetal desde el móvil](./investigacion/diagnostico-fotografico/)
- [Análisis de suelo y lectura de resultados para la explotación](./investigacion/analisis-suelo/)
- [Seguimiento de azúcares, grasas y otros indicadores de cosecha](./investigacion/madurez-recoleccion/)
- [CO₂, etanol, monóxido de carbono y compuestos volátiles](./investigacion/sensores-gases/)

## Medición de visitas

La analítica está temporalmente desactivada: la carga manual anterior de `/_vercel/insights/script.js` devolvía 404 en `www.tecrural.es`. No se contabilizan páginas ni eventos de conversión mientras no se confirme la integración oficial de Vercel Analytics en el proyecto y dominio correctos.

La app enlazada recibe parámetros UTM distintos desde cada línea de investigación para facilitar el seguimiento de las entradas si esos parámetros se conservan en la analítica de la app.

## Diagramas y rigor de contenido

Cada línea de investigación usa una imagen editorial generada para explicar visualmente su posible aplicación. Las imágenes son ilustrativas: no documentan instalaciones ni productos ya validados. Los estados separan la app meteorológica disponible de prototipos, investigación y funciones que todavía necesitan validación. No se presentan prototipos como sensores de seguridad ni los resultados de IA como diagnósticos definitivos.

## Ámbito territorial

La landing contempla el Altiplano de Granada y la Costa Tropical. Los ejemplos de cultivo incluyen olivar, almendro y pistacho en el Altiplano, y mango, aguacate y chirimoya en la Costa Tropical. Son contextos objetivo para validar cada línea; no se implica que los modelos o sensores estén ya calibrados para todos esos cultivos.
