---
title: "Nodo solar ESP32: cómo diseñamos un sensor de campo que aguanta la temporada"
description: "Las decisiones de diseño de nuestros nodos de campo (ESP32-C3, alimentación solar, deep sleep y cajas IP) y por qué priorizamos lecturas fiables antes que precisión no calibrada."
date: 2026-10-20
updated: 2026-10-20
category: bitacora
categoryLabel: Bitácora de campo
zone: Altiplano de Granada
crops: ["olivar", "almendro"]
hero: /assets/research/estaciones-solares.webp
ogImage: /assets/og/nodo-solar-esp32-consumo.jpg
ogImageAlt: "Estación meteorológica alimentada por panel solar en una finca del Altiplano"
heroAlt: "Estación meteorológica alimentada por panel solar en una finca del Altiplano"
heroCaption: "Escena ilustrativa: nodo de campo alimentado por panel solar."
permalink: /recursos/bitacora/nodo-solar-esp32-consumo/
draft: true
tags: ["recursos"]
related:
  - url: /investigacion/estaciones-solares/
    title: Minicentrales meteorológicas solares
  - url: /investigacion/fitomonitorizacion/
    title: Fitomonitorización
---

> **BORRADOR — pendiente de mediciones reales.** Los valores marcados con *TODO* se completarán con las mediciones de las unidades instaladas. No publicamos estimaciones como si fueran datos.

Instalar electrónica en medio de un olivar cambia las prioridades de diseño. En una mesa, cualquier placa funciona; en campo, lo que decide si el nodo sigue vivo en marzo no es la precisión del sensor sino el consumo, la caja y la simplicidad del mantenimiento.

## Las decisiones de diseño

- **ESP32-C3 para los nodos de bajo consumo**, reservando el ESP32-S3 para las unidades con cámara o IA ligera. Menos potencia de la necesaria es dinero y mantenimiento perdido.
- **Alimentación con batería 18650 y TP4056**, con panel solar pequeño y regulador DC-DC. Sin soldaduras frágiles ni conectores sin proteger: la caja IP y los conectores adecuados valen más que cualquier optimización fina.
- **Deep sleep entre lecturas.** El nodo despierta, mide, envía y vuelve a dormir. La vida útil depende casi por completo de este ciclo.
- **Lecturas fiables antes que precisión no calibrada.** Un sensor de humedad capacitivo bien instalado y con una curva coherente vale más que un instrumento preciso cuya calibración nadie verifica en campo.

## Consumo medido

**TODO (Manuel): insertar las mediciones reales — corriente en activo y en deep sleep, duración del ciclo de lectura, capacidad de la batería, aportación del panel y autonomía observada en las unidades instaladas.**

<!-- TODO (Manuel): tabla con los valores medidos y, si hay, foto real del nodo instalado en finca. -->

## Qué aprendimos

**TODO (Manuel): resumir aquí los problemas reales encontrados en las primeras instalaciones (condensación en la caja, alcance Wi-Fi/LoRa, animales, orientación del panel).**

## Siguiente paso

Con el consumo cerrado, el siguiente hito es validar la transmisión de los datos a la plataforma y los avisos asociados, de modo que el nodo no solo mida: avise.
