const STORAGE_KEY = 'cn_notice_ack_v2'; // aumenta la versione se cambi testi sostanzialmente

const acknowledged = () => {
  try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
};
const setAcknowledged = () => {
  try { localStorage.setItem(STORAGE_KEY, '1'); } catch { }
  // opzionale: un cookie tecnico per compatibilità lato server
  document.cookie = "cookie_notice_ack=1; path=/; max-age=" + (365 * 24 * 60 * 60);
};

const createBanner = () => {
  const wrap = document.createElement('div');
  wrap.className = 'cn-banner';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-live', 'polite');
  wrap.setAttribute('aria-label', 'Informativa cookie');

  // Contenuto
  wrap.innerHTML = `
      <div>
        <button class="cn-x" aria-label="Chiudi informativa" data-action="close" title="Chiudi">×</button>
        <h3>Solo cookie tecnici</h3>
        <p>
          Questo sito utilizza esclusivamente cookie tecnici necessari al suo funzionamento
          (nessun cookie di analisi, profilazione o marketing). Per maggiori dettagli consulta la
          <a class="cn-link" href="/privacy.html" target="_blank" rel="nofollow noopener">Privacy &amp; Cookie Policy</a>.
        </p>
      </div>
      <div class="cn-actions">
        <button class="cn-btn cn-btn-ghost" data-action="close">Chiudi</button>
        <button class="cn-btn cn-btn-primary" data-action="close">OK, ho capito</button>
      </div>
    `;

  document.body.appendChild(wrap);

  // Bump dinamico per non coprire il footer
  const setBump = () => {
    const h = wrap.getBoundingClientRect().height + 24; // respiro
    document.body.style.setProperty('--cn-bump', h + 'px');
    document.body.classList.add('cn-has-banner');
  };
  setBump();
  window.addEventListener('resize', setBump);

  const close = () => {
    window.removeEventListener('resize', setBump);
    document.body.classList.remove('cn-has-banner');
    document.body.style.removeProperty('--cn-bump');
    setAcknowledged();
    wrap.remove();
  };

  wrap.addEventListener('click', (e) => {
    const action = e.target?.getAttribute?.('data-action');
    if (action === 'close') close();
  });
};

// Avvio
if (!acknowledged()) {
  window.addEventListener('load', createBanner, { once: true });
}
