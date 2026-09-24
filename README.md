# TecRural — landing page

Landing estática, responsive y sin dependencias de build. Está preparada para publicarse desde la raíz del repositorio con GitHub Pages o cualquier hosting estático.

## Identidad y contenido

- `assets/tecrural-logo.webp` y `assets/tecrural-icon.webp` son los archivos de marca aportados por TecRural.
- `assets/olivar-sensores.webp` es una imagen ilustrativa generada para esta página; no representa una instalación real concreta.
- `assets/manuel-carrasco-tecrural.webp` es el retrato aportado por el promotor y se utiliza en la sección de presentación.
- Tipografía: Manrope para titulares y DM Sans para texto de interfaz, ambas servidas desde Google Fonts.
- La descripción de servicios, el alcance del diagnóstico y los precios orientativos se ajustaron según la [Wiki TecRural](https://github.com/mcgnexus/WIKI_TECRURAL).
- Los planes Campo, Esencial, Monitor, Pro y Cooperativas, y sus importes, proceden del plan de empresa. Se identifican en la página como precios de planificación pendientes de validación comercial.
- La aplicación enlazada es la URL de producción documentada: <https://meteo.tecrural.es/>.

## Personalización antes de activar captación directa

- Añadir los perfiles oficiales de Instagram/Facebook y un número de WhatsApp Business si se desea ofrecer un canal directo desde esta página.
- Actualizar el contenido de servicios y precios cuando cambie la oferta aprobada. Los precios de los planes actuales son hipótesis comerciales de planificación.
- Añadir URL canónica y metadatos Open Graph cuando esté decidido el dominio.

## Desarrollo

Abrir `index.html` directamente en un navegador. No requiere instalación ni compilación.


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

Los esquemas de cada página están dibujados con HTML y CSS para mantenerse nítidos, accesibles y adaptables a móviles, sin depender de imágenes externas. Los estados separan la app meteorológica disponible de prototipos, investigación y funciones que todavía necesitan validación. No se presentan prototipos como sensores de seguridad ni los resultados de IA como diagnósticos definitivos.
