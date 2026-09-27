const { rssPlugin } = require('@11ty/eleventy-plugin-rss');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

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

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
