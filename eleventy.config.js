const { rssPlugin } = require('@11ty/eleventy-plugin-rss');
const fs = require('node:fs');
const path = require('node:path');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  // Serve the homepage styles as a cacheable asset instead of repeating them in HTML.
  eleventyConfig.addTransform('externalize-homepage-styles', function (content) {
    const inputPath = (this.page?.inputPath || '').replace(/\\/g, '/');
    if (!inputPath.endsWith('/src/index.njk') && inputPath !== 'src/index.njk') return content;

    const style = content.match(/<style>([\s\S]*?)<\/style>/i);
    if (!style) return content;

    const outputDir = path.dirname(this.page.outputPath);
    const cssPath = path.join(outputDir, 'assets', 'landing.css');
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, style[1], 'utf8');

    return content.replace(style[0], '<link rel="stylesheet" href="/assets/landing.css">');
  });

  // Recursos existentes que se sirven tal cual (proyecto raíz -> salida)
  eleventyConfig.addPassthroughCopy({
    './assets': './assets',
    './investigacion': './investigacion',
    './robots.txt': './robots.txt'
  });

  eleventyConfig.addGlobalData('buildDate', () => new Date().toISOString().slice(0, 10));

  eleventyConfig.addFilter('fmtDate', value => {
    const d = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  });

  eleventyConfig.addFilter('fmtDateShort', value => {
    const d = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
  });

  eleventyConfig.addFilter('isoDate', value => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString();
  });

  // Primeros n elementos de una colección (el `slice` de Nunjucks trocea en grupos)
  eleventyConfig.addFilter('take', (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : []));

  eleventyConfig.addFilter('getNewestUpdatedCollectionItemDate', items => {
    if (!Array.isArray(items) || items.length === 0) return null;
    const timestamps = items
      .map(item => new Date(item.data.updated || item.data.date).getTime())
      .filter(Number.isFinite);
    return timestamps.length ? new Date(Math.max(...timestamps)) : null;
  });

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
