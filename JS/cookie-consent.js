/* ── Chiavi di consenso ───────────────────────────────────────
   Prefisso 'cem-' = Centro Estetico Maristella. Tutte le scelte sono
   salvate in localStorage: questo sito non imposta alcun cookie HTTP. */
const TECH_KEY = 'cem-cookie-consent';
const MAPS_KEY = 'cem-maps-consent';

/* Cookie impostati dalle versioni precedenti del banner. Non sono più usati
   né dichiarati nell'informativa, quindi vengono fatti scadere al caricamento
   per non lasciare nel browser storage non documentato. */
const LEGACY_COOKIES = ['cookie_notice_ack', 'cookie_accepted'];

const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.764892765166!2d8.845910376187684!3d45.31317467107191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786fcc85dccd8f3%3A0x2016d17501f1b361!2sCentro%20Estetico%20Maristella!5e0!3m2!1sit!2sit!4v1697398639875!5m2!1sit!2sit';

/* Markup originale dei placeholder, conservato per poter ripristinare il
   segnaposto quando l'utente revoca il consenso: così l'iframe di Google
   viene rimosso subito, senza attendere un ricaricamento della pagina. */
const g_placeholderMarkup = new WeakMap();

/* ── Lettura e scrittura del consenso ────────────────────────
   localStorage può lanciare un'eccezione (modalità privata, storage
   disabilitato): in quel caso il consenso si considera non concesso e il
   sito resta utilizzabile senza le risorse di terze parti. */

/**
 * @param {string} key Chiave di consenso in localStorage
 * @returns {boolean} true se l'utente ha concesso il consenso
 */
const isGranted = (key) => {
  try {
    return localStorage.getItem(key) === 'accepted';
  } catch {
    return false;
  }
};

/**
 * @param {string} key Chiave di consenso in localStorage
 * @returns {void}
 */
const grant = (key) => {
  try {
    localStorage.setItem(key, 'accepted');
  } catch {}
};

/**
 * Fa scadere i cookie tecnici usati dalle versioni precedenti del banner.
 * @returns {void}
 */
const clearLegacyCookies = () => {
  LEGACY_COOKIES.forEach((name) => {
    document.cookie = name + '=; path=/; max-age=0';
  });
};

/* ── Google Maps ─────────────────────────────────────────────
   L'iframe non è mai presente nell'HTML statico: viene creato solo qui,
   dopo il consenso. Finché il consenso manca, nessuna richiesta raggiunge
   i server di Google. */

/**
 * Sostituisce il placeholder di un contenitore con l'iframe della mappa.
 * @param {HTMLElement} container Contenitore .map-container
 * @returns {void}
 */
const replaceWithIframe = (container) => {
  if (!g_placeholderMarkup.has(container)) {
    g_placeholderMarkup.set(container, container.innerHTML);
  }

  container.innerHTML = '';

  const iframe = document.createElement('iframe');
  iframe.src = MAP_SRC;
  iframe.style.cssText = 'border:0; width:100%; height:100%;';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  /* Minimizzazione: a Google viene inviata solo l'origine del sito, non
     l'URL completo della pagina da cui la mappa è stata caricata. */
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.title = 'Mappa Centro Estetico Maristella – Vigevano';
  container.appendChild(iframe);
};

/**
 * Collega il pulsante di consenso di un placeholder.
 * @param {HTMLElement} container Contenitore .map-container
 * @returns {void}
 */
const bindConsentButton = (container) => {
  const btn = container.querySelector('.map-consent-btn');
  if (btn) btn.addEventListener('click', grantMapsConsent);
};

/**
 * Carica la mappa in tutti i contenitori della pagina. Il consenso è per
 * servizio e non per singolo placeholder: accettando da un punto qualsiasi
 * (banner o placeholder) devono attivarsi tutte le istanze.
 * @returns {void}
 */
const loadAllMaps = () => {
  document.querySelectorAll('.map-container').forEach((container) => {
    if (!container.querySelector('iframe')) replaceWithIframe(container);
  });
};

/**
 * Rimuove gli iframe e ripristina i placeholder. Usata dalla revoca del
 * consenso, così la terza parte smette immediatamente di essere caricata.
 * @returns {void}
 */
const unloadAllMaps = () => {
  document.querySelectorAll('.map-container').forEach((container) => {
    const markup = g_placeholderMarkup.get(container);
    if (markup === undefined) return;

    container.innerHTML = markup;
    bindConsentButton(container);
  });
};

/**
 * Registra il consenso a Google Maps e carica subito tutte le mappe.
 * @returns {void}
 */
const grantMapsConsent = () => {
  grant(MAPS_KEY);
  loadAllMaps();
};

/**
 * Unico punto di ingresso per il caricamento della mappa: se il consenso
 * esiste già carica gli iframe, altrimenti lascia i placeholder e resta in
 * attesa del click sul pulsante di consenso.
 * @returns {void}
 */
const initMapContainers = () => {
  const containers = document.querySelectorAll('.map-container');
  if (containers.length === 0) return;

  if (isGranted(MAPS_KEY)) {
    loadAllMaps();
    return;
  }

  containers.forEach(bindConsentButton);
};

/* ── Floating button preferenze ─────────────────────────────
   Creato una sola volta al caricamento della pagina, su ogni pagina del
   sito: è il punto di revoca sempre disponibile richiesto dal GDPR.
   Viene nascosto automaticamente quando il banner è visibile. */
const createPreferencesButton = () => {
  if (document.getElementById('cn-pref-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'cn-pref-btn';
  btn.className = 'cn-pref-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Gestisci preferenze cookie');
  btn.setAttribute('title', 'Gestisci preferenze cookie');
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         width="22" height="22" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
      <path d="M8.5 8.5v.01" stroke-width="3"/>
      <path d="M16 15.5v.01" stroke-width="3"/>
      <path d="M12 12v.01" stroke-width="3"/>
      <path d="M11 17v.01" stroke-width="3"/>
      <path d="M7 14v.01" stroke-width="3"/>
    </svg>
  `;
  btn.addEventListener('click', window.cemShowPreferences);
  document.body.appendChild(btn);
};

/* ── Banner ──────────────────────────────────────────────── */
const createBanner = () => {
  // Evita banner duplicati
  if (document.querySelector('.cn-banner')) return;

  // Nasconde il floating button mentre il banner è visibile
  const prefBtn = document.getElementById('cn-pref-btn');
  if (prefBtn) prefBtn.classList.add('cn-pref-btn--hidden');

  const wrap = document.createElement('div');
  wrap.className = 'cn-banner';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-labelledby', 'cn-title');
  wrap.setAttribute('aria-describedby', 'cn-desc');
  // Rende il banner focalizzabile via script: spostando il focus qui, gli
  // screen reader annunciano il dialogo e la navigazione da tastiera
  // raggiunge subito i due pulsanti di scelta.
  wrap.tabIndex = -1;

  wrap.innerHTML = `
    <div>
      <button class="cn-x" type="button" aria-label="Chiudi accettando solo i cookie tecnici" data-action="tech" title="Solo tecnici">×</button>
      <h3 id="cn-title">Privacy &amp; Cookie</h3>
      <p id="cn-desc">
        Questo sito usa cookie tecnici necessari e, solo previo consenso,
        <strong>Google Maps</strong> (terza parte). Per maggiori dettagli consulta la
        <a class="cn-link" href="./cookie-privacy-policy.html">Privacy &amp; Cookie Policy</a>.
      </p>
    </div>
    <div class="cn-actions">
      <button class="cn-btn cn-btn-reject" type="button" data-action="tech">Solo tecnici</button>
      <button class="cn-btn cn-btn-accept" type="button" data-action="all">Accetta tutti</button>
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

  /* Esc equivale al rifiuto: chiude il banner registrando solo i cookie
     tecnici, mai un consenso implicito alle terze parti. */
  const onKeyDown = (e) => {
    if (e.key === 'Escape') closeBanner(false);
  };

  const closeBanner = (acceptMaps) => {
    window.removeEventListener('resize', setBump);
    document.removeEventListener('keydown', onKeyDown);
    document.body.classList.remove('cn-has-banner');
    document.body.style.removeProperty('--cn-bump');

    grant(TECH_KEY);
    if (acceptMaps) grantMapsConsent();

    wrap.remove();

    // Rimostra il floating button dopo la chiusura del banner e vi riporta
    // il focus, che altrimenti resterebbe su un elemento rimosso dal DOM
    const pb = document.getElementById('cn-pref-btn');
    if (pb) {
      pb.classList.remove('cn-pref-btn--hidden');
      pb.focus({ preventScroll: true });
    }
  };

  document.addEventListener('keydown', onKeyDown);

  wrap.addEventListener('click', (e) => {
    const action = e.target?.closest?.('[data-action]')?.getAttribute('data-action');
    if (action === 'all')  closeBanner(true);
    if (action === 'tech') closeBanner(false);
  });

  wrap.focus({ preventScroll: true });
};

/* ── API pubblica per la revoca del consenso ─────────────────
   Chiamata dal floating button presente su ogni pagina. Azzera le scelte
   salvate, scarica le terze parti già caricate e riapre il banner. */
window.cemShowPreferences = () => {
  try {
    localStorage.removeItem(TECH_KEY);
    localStorage.removeItem(MAPS_KEY);
  } catch {}

  clearLegacyCookies();
  unloadAllMaps();
  createBanner();
};

/* ── Avvio ───────────────────────────────────────────────── */
window.addEventListener('load', () => {
  clearLegacyCookies();
  createPreferencesButton();
  initMapContainers();
  if (!isGranted(TECH_KEY)) createBanner();
}, { once: true });
