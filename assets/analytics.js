/*
 * Vercel Web Analytics page views.
 * After enabling Web Analytics for the Vercel project, each route is counted separately.
 * No tracking script is loaded on local previews or GitHub Pages.
 */
(function () {
  var host = window.location.hostname;
  var onVercel = host.endsWith('.vercel.app') || host === 'tecrural.es' || host === 'www.tecrural.es';
  if (!onVercel) return;
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
