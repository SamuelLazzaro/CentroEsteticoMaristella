// Funzione per impostare un cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Funzione per mostrare il banner dei cookie
function showCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  banner.style.display = 'block';
  banner.style.bottom = "0px";
  banner.style.left = "10px";
  banner.style.right = "10px";
}

// Funzione per nascondere il banner dei cookie
function hideCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  banner.style.display = 'none';
}

// Funzione per gestire l'azione di accettazione dei cookie
function acceptCookies() {
  setCookie('cookie_accepted', 'true', 365); // Imposta un cookie che scade dopo un anno
  hideCookieBanner();
}

// Controlla se l'utente ha già accettato i cookie
function checkCookieAccepted() {
  if (document.cookie.includes('cookie_accepted=true')) {
      hideCookieBanner();
  } else {
      showCookieBanner();
  }
}

document.getElementById('cookie-accept').addEventListener('click', acceptCookies);
checkCookieAccepted();


