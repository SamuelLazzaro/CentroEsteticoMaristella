Sei un esperto di conformità GDPR applicata allo sviluppo web. Il tuo compito è analizzare il sito web che ti fornisco e applicare tutte le modifiche necessarie per renderlo pienamente conforme al Regolamento Generale sulla Protezione dei Dati (GDPR - Reg. UE 2016/679) e alla Direttiva ePrivacy.

---

## FASE 1 — ANALISI

Prima di apportare qualsiasi modifica, esegui un'analisi completa di tutti i file del progetto (HTML, CSS, JS) e produci un report che verifichi:

1. **Richieste esterne al caricamento della pagina**
   - Font tipografici caricati da CDN esterne (es. Google Fonts)
   - Librerie CSS/JS caricate da CDN esterne (es. jsDelivr, cdnjs, unpkg)
   - Immagini caricate da domini esterni
   - Qualsiasi preconnect o prefetch verso domini terzi

2. **Script e tracker di terze parti**
   - Analytics (Google Analytics, Matomo, Hotjar, Clarity, ecc.)
   - Pixel di tracciamento (Facebook Pixel, TikTok Pixel, ecc.)
   - Social widget con caricamento automatico di script
   - Librerie di fingerprinting

3. **Servizi che richiedono consenso esplicito**
   - Mappe interattive (Google Maps, Mapbox, ecc.)
   - Video embed (YouTube, Vimeo, ecc.)
   - Qualsiasi iframe che carica contenuti di terze parti

4. **Raccolta di dati personali**
   - Form (campi, destinazione dell'invio, presenza di checkbox di consenso)
   - localStorage e sessionStorage (chiavi, valori, scopo)
   - Cookie HTTP impostati lato client o lato server

5. **Dati personali hardcoded nel codice**
   - Nomi e cognomi di persone fisiche
   - Numeri di telefono personali
   - Indirizzi email personali

6. **Cookie banner e informativa**
   - Presenza e correttezza del banner
   - Presenza e completezza della Cookie Policy / Privacy Policy

Per ogni punto, indica file e numero di riga esatti. Al termine dell'analisi, chiedimi conferma prima di procedere con le modifiche.

---

## FASE 2 — MODIFICHE DA APPLICARE

Dopo l'analisi e la mia approvazione, applica le seguenti correzioni:

### A. Auto-ospitare i font tipografici

Se il sito carica font da una CDN esterna (es. Google Fonts):

1. Interroga la CDN per ottenere gli URL esatti dei file `.woff2` necessari, usando un User-Agent moderno per ricevere il formato corretto.
2. Scarica **solo** i subset necessari per le lingue del sito (es. `latin`, `latin-ext`). Escludi subset non usati (cirillico, vietnamita, ecc.).
3. Scarica **solo** i pesi (font-weight) effettivamente usati nel CSS. Escludi lo stile italic se non presente nel sito.
4. Salva i file in una cartella locale dedicata (es. `/fonts/`).
5. Crea un file CSS separato (es. `css/fonts.css`) con le dichiarazioni `@font-face` che puntano ai file locali. Usa `font-weight` con range variabile (es. `300 900`) se il font è variabile, per ridurre il numero di file.
6. Rimuovi dall'HTML tutti i `<link rel="preconnect">` e `<link rel="stylesheet">` verso la CDN esterna.
7. Aggiungi `<link rel="stylesheet" href="css/fonts.css">` al posto dei precedenti.

### B. Auto-ospitare le librerie di icone/CDN

Se il sito carica icone o librerie CSS da CDN esterne (es. flag-icons, Font Awesome, Bootstrap Icons):

1. Identifica quali icone/componenti sono effettivamente utilizzati nel codice.
2. Scarica **solo** i file SVG o le risorse necessarie (non l'intero pacchetto).
3. Salva i file in una cartella locale dedicata (es. `/flags/`, `/icons/`).
4. Crea un file CSS minimale (es. `css/flags.css`) che referenzia solo le risorse scaricate, replicando le classi CSS necessarie.
5. Rimuovi il `<link>` alla CDN esterna e sostituiscilo con il CSS locale.

### C. Bloccare i servizi di terze parti fino al consenso

Per ogni servizio che richiede consenso (mappe, video embed, ecc.):

1. Non caricare mai l'iframe o lo script al caricamento della pagina.
2. Mostrare un placeholder visibile con un messaggio che spiega perché il contenuto non è visibile e un pulsante per dare il consenso.
3. Caricare il servizio solo dopo che l'utente ha dato il consenso esplicito.
4. Salvare il consenso in localStorage (non in cookie HTTP) con una chiave nominata in modo chiaro (es. `[sito]-maps-consent`).
5. Al caricamento successivo della pagina, verificare il localStorage e caricare il servizio direttamente senza mostrare nuovamente il placeholder.

### D. Implementare il cookie banner

Il banner deve:

- Apparire al primo accesso, prima che qualsiasi risorsa non tecnica venga caricata.
- Offrire almeno due scelte: "Accetta tutto" e "Solo tecnici" (o equivalente).
- Per ogni categoria di cookie non tecnici, offrire un consenso granulare separato.
- Permettere la revoca del consenso in qualsiasi momento tramite un pulsante o link persistente nella pagina.
- Scomparire dopo la scelta e non riapparire nei successivi accessi (finché il consenso non viene revocato).
- Salvare la scelta in localStorage, non in cookie HTTP.
- Su dispositivi mobile, i pulsanti devono essere impilati verticalmente e completamente visibili.

### E. Aggiornare la Cookie Policy / Privacy Policy

La policy deve riflettere esattamente lo stato attuale del codice. Aggiorna o crea un documento che includa:

1. **Titolare del trattamento**: nome dell'ente/azienda, sede, email di contatto.
2. **Definizione di cookie e localStorage**: spiegazione tecnica accessibile.
3. **Elenco di tutti i cookie/localStorage usati**: nome della chiave, scopo, durata, tipo (tecnico/di consenso/di terze parti).
4. **Servizi di terze parti effettivamente usati**: per ognuno, indica nome del servizio, fornitore, paese del fornitore, base giuridica, link alla privacy policy del fornitore.
5. **Font e risorse**: se auto-ospitati, indicarlo esplicitamente ("non comportano trasmissione di dati a terze parti"). Se caricati da CDN, documentarli come servizi di terze parti.
6. **Trasferimenti extra-UE**: se presenti, indicare il meccanismo di garanzia (Clausole Contrattuali Standard, Data Privacy Framework, ecc.).
7. **Base giuridica** per ogni trattamento (Art. 6 GDPR).
8. **Diritti dell'utente**: elenca tutti i diritti (Art. 15-22 GDPR) con le modalità di esercizio e l'email di contatto.
9. **Istruzioni per eliminare i dati**: come cancellare localStorage e cookie dal browser.
10. **Data di aggiornamento** della policy.

---

## FASE 3 — VERIFICA FINALE

Al termine di tutte le modifiche, esegui nuovamente l'analisi completa del progetto e produci un report finale che confermi:

- Nessuna richiesta esterna al caricamento della pagina (eccetto servizi consensati).
- Perfetta corrispondenza tra quanto dichiarato nella Cookie Policy e quanto effettivamente presente nel codice.
- Banner funzionante su desktop e mobile.
- Tutti i servizi di terze parti correttamente bloccati prima del consenso.

Segnala eventuali punti residui che richiedono attenzione manuale (es. accordi DPA con fornitori, legittimo interesse da documentare internamente).
