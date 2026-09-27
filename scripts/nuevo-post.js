#!/usr/bin/env node
// Crea el esqueleto de un artículo nuevo.
// Uso: npm run nuevo -- "Título del artículo" [guia|bitacora] [slug]

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const title = (args[0] || '').trim();
const cat = args[1] === 'bitacora' ? 'bitacora' : 'guias';
const slug = (args[2] || title)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

if (!title || !slug) {
  console.log('Uso: npm run nuevo -- "Título del artículo" [guia|bitacora] [slug-opcional]');
  console.log('Ejemplo: npm run nuevo -- "Riego de la chirimoya en verano" guia');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const file = path.join('src', 'recursos', cat, slug + '.md');

if (fs.existsSync(file)) {
  console.error('Ya existe: ' + file);
  process.exit(1);
}

const content = `---
title: "${title}"
description: "TODO: resumen de 1-2 frases. Es lo que se ve en Google y al compartir el enlace."
date: ${today}
category: ${cat}
categoryLabel: ${cat === 'bitacora' ? 'Bitácora de campo' : 'Guía'}
zone: "TODO: Altiplano de Granada / Costa Tropical"
crops: []
hero: ${cat === 'bitacora' ? '/assets/research/estaciones-solares.webp' : '/assets/research/app-agroclimatica.webp'}
heroAlt: "TODO: describe qué se ve en la imagen"
ogImage: /assets/og/${cat === 'bitacora' ? 'nodo-solar-esp32-consumo' : 'app-agroclimatica'}.jpg
permalink: /recursos/${cat}/${slug}/
draft: true
tags: ["recursos"]
related: []
---

> **BORRADOR**: cuando el contenido esté completo, cambia \`draft: true\` por \`draft: false\`,
> guarda y haz \`git push\`. El artículo se publicará solo.

Escribe aquí el artículo. Con \`## \` creas las secciones, con \`**negrita**\` resaltas
lo importante y las listas se hacen con guiones. Recuerda:

- Orientación, nunca dictamen: cita las fuentes oficiales (RAIF, SIAR, AEMET, MAPAMA).
- Si hay datos de sensores o mediciones, indica fecha y lugar.
- En \`related\` (arriba) puedes enlazar líneas de investigación, por ejemplo:
  \`related: [{ url: "/investigacion/fitomonitorizacion/", title: "Fitomonitorización" }]\`
`;

fs.writeFileSync(file, content);
console.log('✔ Creado: ' + file);
console.log('  1. Edítalo (rellena los TODO).');
console.log('  2. Previsualiza en local:  npm run dev   → http://localhost:8080' + '/recursos/' + cat + '/' + slug + '/');
console.log('  3. Cambia  draft: true  por  draft: false');
console.log('  4. git add -A && git commit -m "Nuevo artículo: ' + title + '" && git push');
