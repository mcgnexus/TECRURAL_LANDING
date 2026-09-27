# TecRural — landing page

Landing estática, responsive y sin dependencias de build. Está preparada para publicarse desde la raíz del repositorio con GitHub Pages o cualquier hosting estático.

## Identidad y contenido

- `assets/tecrural-logo.webp` y `assets/tecrural-icon.webp` son los archivos de marca aportados por TecRural.
- `assets/olivar-sensores.webp` es una imagen ilustrativa generada para esta página; no representa una instalación real concreta.
- `assets/manuel-carrasco-tecrural.webp` es el retrato aportado por el promotor y se utiliza en la sección de presentación.
- `assets/research/*.webp` contiene nueve imágenes generadas para ilustrar las líneas de investigación. Son escenas conceptuales, no evidencia de productos o instalaciones ya validados.
- Tipografía: Manrope para titulares y DM Sans para texto de interfaz, ambas servidas desde Google Fonts.
- La descripción de servicios, el alcance del diagnóstico y los precios orientativos se ajustaron según la [Wiki TecRural](https://github.com/mcgnexus/WIKI_TECRURAL).
- Los planes Campo, Esencial, Monitor, Pro y Cooperativas, y sus importes, proceden del plan de empresa. Se identifican en la página como precios de planificación pendientes de validación comercial.
- La aplicación enlazada es la URL de producción documentada: <https://meteo.tecrural.es/>.

## Personalización antes de activar captación directa

- Añadir los perfiles oficiales de Instagram/Facebook y un número de WhatsApp Business si se desea ofrecer un canal directo desde esta página.
- Actualizar el contenido de servicios y precios cuando cambie la oferta aprobada. Los precios de los planes actuales son hipótesis comerciales de planificación.
- URL canónica (`https://www.tecrural.es/`) y metadatos Open Graph ya incluidos en la portada y en cada línea de investigación. Verifica que el dominio `www.tecrural.es` redirija al sitio desplegado y que `og:image` apunte a recursos accesibles públicamente.

## Desarrollo

Abrir `index.html` directamente en un navegador. No requiere instalación ni compilación.

## SEO

- `robots.txt` y `sitemap.xml` están preparados para el dominio `https://www.tecrural.es/`. El sitemap lista la portada y las nueve líneas de investigación.
- Portada: `canonical`, Open Graph completo (locale, url, site_name, image con dimensiones y alt) y datos estructurados JSON-LD (`WebSite` + `ProfessionalService`).
- Cada línea de investigación: `canonical`, Open Graph con imagen propia y `alt`, y JSON-LD con `BreadcrumbList` y `ResearchPage`.
- Rendimiento: el hero (LCP) se precarga con `fetchpriority="high"`; las imágenes llevan `width`/`height` para evitar saltos de layout. Un solo `h1` por página.
- Antes de publicar en producción, confirma que `www.tecrural.es` redirige al deploy y que las URLs `og:image` son accesibles públicamente. Tras desplegar, envía `sitemap.xml` en Google Search Console y verifica los datos estructurados con la prueba de resultados enriquecidos.

## Despliegue en Vercel

El sitio está pensado para Vercel, que es además el único entorno donde se activa la analítica (`assets/analytics.js`).

- Importa el repositorio en Vercel. Al ser estático, no requiere *build command* ni *output directory*.
- `vercel.json` ya define:
  - `cleanUrls` y `trailingSlash: true` para servir rutas limpias como `/investigacion/<linea>/` (coincidentes con el `canonical` y el sitemap).
  - Redirección permanente `tecrural.es` → `www.tecrural.es`.
  - Caché larga e inmutable para imágenes y caché moderada para JS/CSS, más cabeceras de seguridad básicas.
- Añade `www.tecrural.es` (y `tecrural.es`) como dominio del proyecto. Mantén `meteo.tecrural.es` como proyecto o dominio aparte para no sobrescribir la app meteorológica.
- Activa **Web Analytics** en el panel del proyecto y vuelve a desplegar para empezar a contar visitas.

## Líneas de investigación

La portada presenta nueve páginas independientes para explicar la propuesta y comparar el interés por cada tema. Cada ruta `/investigacion/<linea>/` genera una página vista diferenciada en Vercel Web Analytics.

- [App web: meteorología, alarmas y cálculo de riego](./investigacion/app-agroclimatica/)
- [Minicentrales meteorológicas conectadas a red y con placas solares](./investigacion/estaciones-solares/)
- [Sensores de humedad del suelo, temperatura foliar y crecimiento](./investigacion/fitomonitorizacion/)
- [Medidas espectrales por reflexión y transmisión](./investigacion/analisis-espectral/)
- [Identificación visual de insectos, patógenos y cambios de color](./investigacion/analisis-imagenes-ia/)
- [Diagnóstico preliminar de enfermedades y carencias con IA](./investigacion/diagnostico-fotografico/)
- [Análisis de suelo y lectura de resultados para la explotación](./investigacion/analisis-suelo/)
- [Seguimiento de azúcares, grasas y otros indicadores de cosecha](./investigacion/madurez-recoleccion/)
- [CO₂, etanol, monóxido de carbono y compuestos volátiles](./investigacion/sensores-gases/)

## Medición de visitas

El archivo `assets/analytics.js` carga el script oficial de Vercel Web Analytics en dominios Vercel (`*.vercel.app`, `tecrural.es` y `www.tecrural.es`). Para activar el conteo, despliega el repositorio en Vercel y habilita **Web Analytics** en el panel del proyecto. Después de desplegar de nuevo, consulta Analytics → Pages para comparar visitas por página. En GitHub Pages y en vista local no se carga el script. Las visitas indican interés de lectura, no por sí solas una solicitud comercial.

La app enlazada recibe parámetros UTM distintos desde cada línea de investigación para facilitar el seguimiento de las entradas si esos parámetros se conservan en la analítica de la app.

## Diagramas y rigor de contenido

Cada línea de investigación usa una imagen editorial generada para explicar visualmente su posible aplicación. Las imágenes son ilustrativas: no documentan instalaciones ni productos ya validados. Los estados separan la app meteorológica disponible de prototipos, investigación y funciones que todavía necesitan validación. No se presentan prototipos como sensores de seguridad ni los resultados de IA como diagnósticos definitivos.

## Ámbito territorial

La landing contempla el Altiplano de Granada y la Costa Tropical. Los ejemplos de cultivo incluyen olivar, almendro y pistacho en el Altiplano, y mango, aguacate y chirimoya en la Costa Tropical. Son contextos objetivo para validar cada línea; no se implica que los modelos o sensores estén ya calibrados para todos esos cultivos.
