/* Landing-page year label and mobile navigation behavior. */
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.mobile-menu').forEach(function (menu) {
    var summary = menu.querySelector('summary');
    var nav = menu.querySelector('nav');
    var menuLinks = Array.prototype.slice.call(nav.querySelectorAll('a'));
    var focusableItems = [summary].concat(menuLinks);
    var backgroundItems = Array.prototype.slice.call(document.querySelectorAll('main, footer, .mobile-cta, .topbar > .brand, .topbar > .nav'));

    function syncMenuState(returnFocus) {
      summary.setAttribute('aria-expanded', menu.open ? 'true' : 'false');
      backgroundItems.forEach(function (item) { item.inert = menu.open; });
      document.body.classList.toggle('mobile-menu-open', menu.open);
      document.documentElement.classList.toggle('mobile-menu-open', menu.open);
      if (menu.open) {
        if (menuLinks[0]) menuLinks[0].focus();
      } else if (returnFocus) {
        summary.focus();
      }
    }

    menu.addEventListener('toggle', function () {
      syncMenuState(!menu.open && menu.contains(document.activeElement));
    });

    menu.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.open) {
        event.preventDefault();
        menu.open = false;
        syncMenuState(true);
        return;
      }

      if (event.key === 'Tab' && menu.open) {
        var firstItem = focusableItems[0];
        var lastItem = focusableItems[focusableItems.length - 1];
        if (event.shiftKey && document.activeElement === summary) {
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          summary.focus();
        }
      }
    });

    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.open = false;
        syncMenuState(true);
      });
    });
  });

  var stickyCta = document.querySelector('.mobile-cta');
  var hero = document.querySelector('.hero');
  var contactSection = document.querySelector('#contacto');
  var footer = document.querySelector('footer');
  if (stickyCta && hero && 'IntersectionObserver' in window) {
    var heroIsVisible = true;
    var contactIsVisible = false;
    var footerIsVisible = false;
    var updateStickyCta = function () {
      var hidden = heroIsVisible || contactIsVisible || footerIsVisible;
      stickyCta.classList.toggle('is-hidden', hidden);
      stickyCta.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    };
    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) heroIsVisible = entry.isIntersecting;
        if (entry.target === contactSection) contactIsVisible = entry.isIntersecting;
        if (entry.target === footer) footerIsVisible = entry.isIntersecting;
      });
      updateStickyCta();
    }, { threshold: 0 });
    ctaObserver.observe(hero);
    if (contactSection) ctaObserver.observe(contactSection);
    if (footer) ctaObserver.observe(footer);
  }

  function track(name) {
    if (typeof window.va === 'function') {
      window.va('event', { name: name });
    }
  }

  document.addEventListener('click', function (event) {
    var tracked = event.target.closest('[data-analytics-event]');
    if (tracked && tracked.getAttribute('data-analytics-event') !== 'whatsapp_click') {
      track(tracked.getAttribute('data-analytics-event'));
    }

    var whatsapp = event.target.closest('a[href*="wa.me/"]');
    if (whatsapp) track('whatsapp_click');

    var diagnosis = event.target.closest('a[href*="tecrural-diagnostico"]');
    if (diagnosis && (!tracked || tracked.getAttribute('data-analytics-event') !== 'diagnostico_click')) {
      track('diagnostico_click');
    }
  });

  var leadForm = document.getElementById('lead-form');
  if (leadForm) {
    var formStarted = false;
    var submitButton = leadForm.querySelector('[type="submit"]');
    var status = document.getElementById('form-status');

    leadForm.addEventListener('focusin', function () {
      if (!formStarted) {
        formStarted = true;
        track('lead_form_start');
      }
    });

    leadForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!leadForm.reportValidity()) return;

      submitButton.disabled = true;
      status.textContent = 'Enviando tu consulta…';
      fetch(leadForm.action, {
        method: 'POST',
        body: new FormData(leadForm),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error('No se pudo enviar el formulario');
        return response.json();
      }).then(function (result) {
        if (result.success === 'false' || result.success === false) throw new Error('No se pudo enviar el formulario');
        track('lead_form_submit');
        status.textContent = '¡Gracias! Hemos recibido tu consulta y nos pondremos en contacto contigo.';
        leadForm.reset();
      }).catch(function () {
        status.textContent = 'No se ha podido enviar ahora. Escríbenos a mcgtecrural@gmail.com o por WhatsApp.';
      }).finally(function () {
        submitButton.disabled = false;
      });
    });
  }
})();
