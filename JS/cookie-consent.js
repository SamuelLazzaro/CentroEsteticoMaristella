(function () {
  const TECH_KEY = 'cem-cookie-consent';
  const MAPS_KEY = 'cem-maps-consent';

  const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.764892765166!2d8.845910376187684!3d45.31317467107191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786fcc85dccd8f3%3A0x2016d17501f1b361!2sCentro%20Estetico%20Maristella!5e0!3m2!1sit!2sit!4v1697398639875!5m2!1sit!2sit';

  /* ── API pubblica per la mappa ────────────────────────────────
     Chiamata da contatti.html dopo il caricamento della pagina.
     Se il consenso è già stato dato, carica subito l'iframe;
     altrimenti attacca il listener al pulsante placeholder. */
  window.cemInitMap = function (container) {
    if (localStorage.getItem(MAPS_KEY) === 'accepted') {
      replaceWithIframe(container);
    } else {
      const btn = container.querySelector('.map-consent-btn');
      if (btn) {
        btn.addEventListener('click', function () {
          try { localStorage.setItem(MAPS_KEY, 'accepted'); } catch {}
          replaceWithIframe(container);
        });
      }
    }
  };

  function replaceWithIframe(container) {
    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = MAP_SRC;
    iframe.style.cssText = 'border:0; width:100%; height:100%;';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = 'Mappa Centro Estetico Maristella – Vigevano';
    container.appendChild(iframe);
  }

  /* ── Banner ──────────────────────────────────────────────── */
  function createBanner() {
    // Evita banner duplicati
    if (document.querySelector('.cn-banner')) return;

    const wrap = document.createElement('div');
    wrap.className = 'cn-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Informativa cookie');

    wrap.innerHTML = `
      <div>
        <button class="cn-x" aria-label="Chiudi, solo cookie tecnici" data-action="tech" title="Solo tecnici">×</button>
        <h3>Cookie &amp; Privacy</h3>
        <p>
          Questo sito usa cookie tecnici necessari e, solo previo consenso,
          <strong>Google Maps</strong> (terza parte). Per maggiori dettagli consulta la
          <a class="cn-link" href="./cookie-privacy-policy.html" target="_blank" rel="noopener">Cookie &amp; Privacy Policy</a>.
        </p>
      </div>
      <div class="cn-actions">
        <button class="cn-btn cn-btn-ghost" data-action="tech">Solo tecnici</button>
        <button class="cn-btn cn-btn-primary" data-action="all">Accetta tutti</button>
      </div>
    `;

    document.body.appendChild(wrap);

    // Bump dinamico per non coprire il footer
    const setBump = () => {
      const h = wrap.getBoundingClientRect().height + 24;
      document.body.style.setProperty('--cn-bump', h + 'px');
      document.body.classList.add('cn-has-banner');
    };
    setBump();
    window.addEventListener('resize', setBump);

    const closeBanner = (acceptMaps) => {
      window.removeEventListener('resize', setBump);
      document.body.classList.remove('cn-has-banner');
      document.body.style.removeProperty('--cn-bump');
      try { localStorage.setItem(TECH_KEY, 'accepted'); } catch {}
      document.cookie = 'cookie_notice_ack=1; path=/; max-age=' + (365 * 24 * 60 * 60);
      if (acceptMaps) {
        try { localStorage.setItem(MAPS_KEY, 'accepted'); } catch {}
        // Se l'utente è già sulla pagina contatti, carica la mappa subito
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer && !mapContainer.querySelector('iframe')) {
          replaceWithIframe(mapContainer);
        }
      }
      wrap.remove();
    };

    wrap.addEventListener('click', (e) => {
      const action = e.target?.getAttribute?.('data-action');
      if (action === 'all')  closeBanner(true);
      if (action === 'tech') closeBanner(false);
    });
  }

  /* ── API pubblica per la revoca del consenso ─────────────────
     Chiamata dal link "Gestisci preferenze cookie" nel footer.
     Azzera le scelte salvate e riapre il banner. */
  window.cemShowPreferences = function () {
    try {
      localStorage.removeItem(TECH_KEY);
      localStorage.removeItem(MAPS_KEY);
    } catch {}
    document.cookie = 'cookie_notice_ack=; path=/; max-age=0';
    createBanner();
  };

  /* ── Avvio ───────────────────────────────────────────────── */
  const alreadyAccepted = () => {
    try { return localStorage.getItem(TECH_KEY) === 'accepted'; } catch { return false; }
  };

  if (!alreadyAccepted()) {
    window.addEventListener('load', createBanner, { once: true });
  }
})();
