Sei un esperto di accessibilità web e conformità normativa applicata allo sviluppo web. Il tuo compito è analizzare il sito statico HTML/CSS/JS che ti fornisco e applicare tutte le modifiche necessarie per renderlo conforme alle normative elencate di seguito.

---

## NORMATIVE DI RIFERIMENTO

- **WCAG 2.1 livello AA** — Web Content Accessibility Guidelines (recepite dal D.Lgs. 82/2022 / European Accessibility Act EU 2019/882, in vigore dal 28 giugno 2025)
- **D.Lgs. 70/2003** — Informazioni obbligatorie sui siti web commerciali (attuazione Direttiva e-Commerce 2000/31/CE)
- **D.Lgs. 26/2023** — Direttiva Omnibus (prezzi di riferimento nelle promozioni)
- **D.Lgs. 206/2005** — Codice del Consumo (comunicazioni commerciali e promozioni)

---

## FASE 1 — ANALISI

Prima di apportare qualsiasi modifica, leggi **tutti** i file HTML, CSS e JS del progetto e produci un report strutturato che verifichi i punti seguenti. Per ogni problema trovato, indica criterio violato, file e numero di riga esatti, descrizione del problema e soluzione proposta.

### 1.1 WCAG 1.1.1 — Testo alternativo (Livello A)
- Ogni `<img>` ha un attributo `alt`? Se l'immagine è decorativa, `alt=""` è sufficiente.
- Gli SVG decorativi (icone, frecce) hanno `aria-hidden="true"`?
- Gli SVG informativi (loghi, icone con significato) hanno `<title>` interno o `aria-label`?
- I link icon-only (es. social icon) hanno `aria-label` sul tag `<a>`?

### 1.2 WCAG 1.2.x — Contenuti multimediali (Livello A/AA)
- I video con audio hanno sottotitoli (`<track kind="captions">`)? (Livello A)
- I video con autoplay e muted hanno almeno `aria-label` descrittivo? (best practice)
- Esiste una descrizione testuale alternativa per i contenuti video?

### 1.3 WCAG 1.3.1 — Struttura semantica (Livello A)
- I tag semantici HTML5 sono usati correttamente: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`?
- La gerarchia degli heading è corretta e non presenta salti (es. da `<h1>` direttamente a `<h3>`)?
- Le liste usano `<ul>/<ol>/<li>` — mai `<a><li>` senza `<li><a>` come contenitore?
- Le tabelle dati hanno `<th>` con `scope` e `<caption>`?

### 1.4 WCAG 1.4.1 — Uso del colore (Livello A)
- Le informazioni vengono trasmesse tramite colore come **unico** mezzo visivo (senza testo o icona aggiuntiva)?

### 1.5 WCAG 1.4.3 — Contrasto colori (Livello AA)
- Calcola il rapporto di contrasto tra colore del testo e colore di sfondo per ogni combinazione presente nel sito.
- Soglie minime: testo normale ≥ 4.5:1 / testo grande (≥18pt o ≥14pt bold) ≥ 3:1 / componenti UI e grafica ≥ 3:1.
- Verifica in particolare: testo su sfondi colorati, link nel corpo del testo, pulsanti, placeholder di input, testo nella navbar, testo nel footer.

### 1.6 WCAG 2.1.1 — Accessibilità da tastiera (Livello A)
- Tutti gli elementi interattivi (link, pulsanti, input, select) sono raggiungibili e utilizzabili via tastiera?
- Verifica in CSS che non esista `outline: none` o `outline: 0` su elementi che ricevono focus senza un focus indicator alternativo.
- Eventuali componenti custom (menu, modal, carousel) gestiscono correttamente Tab, Shift+Tab, Enter, Esc?

### 1.7 WCAG 2.4.2 — Titolo della pagina (Livello A)
- Ogni pagina HTML ha un `<title>` descrittivo, univoco e che identifichi sia la pagina specifica sia il sito (formato consigliato: `Pagina – Nome Sito`)?

### 1.8 WCAG 2.4.4 — Scopo del link (Livello A)
- Il testo di ogni link è autoesplicativo anche fuori contesto? (evitare "clicca qui", "leggi di più" senza testo aggiuntivo)
- I link che aprono in nuova finestra lo segnalano visivamente o tramite `aria-label`?

### 1.9 WCAG 3.1.1 — Lingua della pagina (Livello A)
- Ogni HTML ha l'attributo `lang` corretto (es. `lang="it"`) sul tag `<html>`?

### 1.10 WCAG 4.1.2 — Nome, ruolo, valore (Livello A)
- Tutti i pulsanti hanno testo leggibile o `aria-label`?
- Gli elementi interattivi custom hanno `role` corretto?
- I menu mobili hanno `aria-expanded` aggiornato via JS quando si aprono/chiudono?
- I dialog/modal hanno `role="dialog"` e `aria-label` o `aria-labelledby`?

### 1.11 D.Lgs. 70/2003 — Informazioni obbligatorie
Verifica che il sito esponga chiaramente (di solito nel footer o in una pagina "Chi siamo"):
- Nome o denominazione del titolare / azienda
- Indirizzo geografico completo (sede operativa o legale)
- Partita IVA o codice fiscale
- **Indirizzo email di contatto** (obbligatorio per legge — non solo telefono)
- Eventuale numero REA o iscrizione CCIAA (se applicabile)

### 1.12 D.Lgs. 26/2023 — Direttiva Omnibus (se presente pagina promozioni/offerte)
- I prezzi scontati riportano il **prezzo più basso praticato negli ultimi 30 giorni** come riferimento?
- Il prezzo di confronto NON è il prezzo di listino originale, ma il prezzo minimo degli ultimi 30 giorni?
- La durata della promozione è indicata chiaramente?

### 1.13 D.Lgs. 206/2005 — Codice del Consumo (comunicazioni commerciali)
- Le promozioni indicano chiaramente condizioni e limitazioni?
- Non ci sono affermazioni ingannevoli o omissioni rilevanti nelle descrizioni dei servizi/prodotti?

Al termine dell'analisi, presenta il report completo e **chiedimi conferma** prima di procedere con le modifiche.

---

## FASE 2 — MODIFICHE DA APPLICARE

Dopo la mia approvazione, applica le correzioni seguenti nell'ordine indicato.

### A. Testo alternativo e SVG (WCAG 1.1.1)

1. Aggiungi `alt` descrittivo a ogni `<img>` che manca. Se l'immagine è decorativa usa `alt=""`.
2. Aggiungi `aria-hidden="true"` a ogni SVG decorativo (frecce, icone decorative, separatori grafici).
3. Aggiungi `aria-label` descrittivo sui link icon-only (es. link a profili social con solo icona).
4. Aggiungi `aria-label` descrittivo sui pulsanti icon-only (es. pulsanti con solo icona senza testo visibile).

### B. Contenuti multimediali (WCAG 1.2.x)

1. Aggiungi `aria-label` descrittivo a ogni elemento `<video>` che ne è privo.
2. Se un video ha audio significativo, aggiungi `<track kind="captions" src="..." srclang="it" label="Italiano" default>`. Se il file di sottotitoli non esiste, segnalalo come azione manuale richiesta.

### C. Struttura semantica (WCAG 1.3.1)

1. Sostituisci `<div class="navbar">` o simili con `<nav aria-label="Navigazione principale">`.
2. Correggi la struttura `<a><li>` in `<li><a>` dove presente.
3. Assicurati che ogni pagina abbia un solo `<h1>`, seguito da `<h2>`, `<h3>` in ordine gerarchico senza salti.
4. Avvolgi il contenuto principale in `<main>` se non presente.

### D. Contrasto colori (WCAG 1.4.3)

1. Per ogni coppia testo/sfondo che non raggiunge il rapporto minimo, scurisce il colore del testo (non chiarire lo sfondo, per mantenere la palette visiva).
2. Preferisci una versione più scura dello stesso tonalità, non un colore completamente diverso.
3. Verifica che hover e focus states abbiano anch'essi contrasto sufficiente.

### E. Accessibilità da tastiera (WCAG 2.1.1)

1. Rimuovi `outline: none` o `outline: 0` senza un focus indicator alternativo. Sostituisci con uno stile di focus visibile coerente con la palette del sito (es. `outline: 2px solid #8238c2; outline-offset: 2px`).
2. Se i menu mobili non gestiscono `aria-expanded`, aggiorna il JS per impostare `aria-expanded="true"` all'apertura e `aria-expanded="false"` alla chiusura.

### F. Titoli pagina (WCAG 2.4.2)

1. Aggiorna il `<title>` di ogni pagina usando il formato: `[Nome pagina] – [Nome sito]`.
2. La homepage può usare: `[Nome sito] – [Breve descrizione/slogan]`.

### G. Scopo del link (WCAG 2.4.4)

1. Sostituisci testi link generici ("clicca qui", "scopri di più") con testi descrittivi oppure aggiungi `aria-label` al tag `<a>`.
2. Per i link che aprono in nuova finestra (`target="_blank"`), aggiungi `rel="noopener noreferrer"` e considera di aggiungere un'indicazione visiva o testuale (es. icona con `aria-hidden="true"` + testo nascosto con classe screen-reader-only).

### H. Informazioni obbligatorie footer (D.Lgs. 70/2003)

1. Verifica che nome/ragione sociale, indirizzo, P.IVA e **email di contatto** siano presenti nel footer o in una pagina dedicata.
2. Se manca l'email, aggiungila nel footer come link `<a href="mailto:...">`.

### I. Pagina promozioni (D.Lgs. 26/2023 — solo se presente)

1. Se sono presenti prezzi barrati o sconti, aggiungi sotto ogni prezzo una nota nel formato: `Prezzo più basso negli ultimi 30 giorni: €XX,XX`.
2. Se la promozione ha una scadenza, indicala esplicitamente.

---

## FASE 3 — VERIFICA FINALE

Al termine di tutte le modifiche, rileggi tutti i file modificati e produci un report finale che confermi per ogni criterio:

| Criterio | Livello | Stato | Note |
|----------|---------|-------|------|
| WCAG 1.1.1 Testo alternativo | A | ✅ / ⚠️ / ❌ | … |
| WCAG 1.2.2 Sottotitoli video | A | ✅ / ⚠️ / ❌ | … |
| WCAG 1.3.1 Struttura semantica | A | ✅ / ⚠️ / ❌ | … |
| WCAG 1.4.1 Uso del colore | A | ✅ / ⚠️ / ❌ | … |
| WCAG 1.4.3 Contrasto colori | AA | ✅ / ⚠️ / ❌ | … |
| WCAG 2.1.1 Tastiera | A | ✅ / ⚠️ / ❌ | … |
| WCAG 2.4.2 Titolo pagina | A | ✅ / ⚠️ / ❌ | … |
| WCAG 2.4.4 Scopo del link | A | ✅ / ⚠️ / ❌ | … |
| WCAG 3.1.1 Lingua pagina | A | ✅ / ⚠️ / ❌ | … |
| WCAG 4.1.2 Nome ruolo valore | A | ✅ / ⚠️ / ❌ | … |
| D.Lgs. 70/2003 Informazioni obbligatorie | — | ✅ / ⚠️ / ❌ | … |
| D.Lgs. 26/2023 Prezzi promozioni | — | ✅ / ⚠️ / ❌ | N/A se non ci sono promozioni |
| D.Lgs. 206/2005 Codice del Consumo | — | ✅ / ⚠️ / ❌ | … |

Segnala separatamente gli eventuali punti che richiedono **intervento manuale** non automatizzabile via codice (es. creazione file sottotitoli `.vtt`, verifica legale dei testi promozionali, aggiornamento periodico del prezzo di riferimento Omnibus).
