module.exports = {
  layout: 'layouts/post.njk',
  mobileCtaClass: 'button-whatsapp',
  mobileCtaText: 'Escríbenos por WhatsApp ↗',
  mobileCtaExternal: true,
  eleventyComputed: {
    mobileCtaHref: data => data.site.whatsapp,
    // Los borradores no entran en listados, sitemap ni feed
    eleventyExcludeFromCollections: data => data.draft ? true : false,
    // Los borradores no se publican en builds (sí se ven en `npm run dev`)
    permalink: data => (data.draft && process.env.ELEVENTY_RUN_MODE === 'build') ? false : data.permalink
  }
};
