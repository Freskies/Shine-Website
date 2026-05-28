# Struttura e Contenuti del Sito Shine Parkour

Questo documento descrive le diverse parti che compongono il sito web di Shine Parkour.

## Pagine Principali

- **Home Page (`/`)**: La pagina principale che introduce l'associazione, i corsi e le informazioni essenziali.
- **Chi Siamo (`/about`)**: Pagina dedicata alla storia di Shine, alla storia del Parkour e alla filosofia dell'associazione.
- **Mappa (`/map`)**: Una mappa interattiva degli "spot" (luoghi di allenamento) utilizzati.
- **Team (`/team`)**: Presentazione degli istruttori e dei collaboratori.
- **Eventi / 1000 Backflip (`/event-1000`)**: Pagina dedicata a eventi speciali o sfide della community.
- **Dettaglio Corso (`/courses/[id]`)**: Pagine dinamiche che mostrano i dettagli di ogni singolo corso.

## Componenti della Home Page

1. **Hero**: La sezione di apertura con il claim "Destroy limits, BUILD STRENGTH" e un invito all'azione per esplorare i corsi.
2. **I Nostri Corsi (Courses)**: Presentazione delle diverse fasce d'età (Bambini, Ragazzi, Adulti) con link ai dettagli tecnici.
3. **Prezzi (Pricing)**: Tabella chiara dei costi mensili basata sulla frequenza delle lezioni e informazioni sulle modalità di pagamento.
4. **Prenotazione (HomeBookLesson / BookLesson)**: Guida passo-passo per prenotare una lezione di prova gratuita (tesseramento, certificato medico, contatto WhatsApp).
5. **Domande Frequenti (FAQ)**: Risposte rapide a dubbi comuni su abbigliamento, luoghi delle lezioni e pagamenti.
6. **Chi Siamo (OurStory)**: Breve introduzione alla storia dell'associazione.
7. **Contattaci (ContactUs)**: Sezione per inviare email per richieste specifiche come spettacoli o lezioni private.

## Elementi Globali

- **Header**: Barra di navigazione con link rapidi a Home, Chi Siamo, Mappa ed Eventi. Include il logo Shine.
- **Footer**: Contiene le coordinate bancarie (IBAN), i dati fiscali dell'associazione e i contatti rapidi (email).
- **Maintenance**: Pagina/componente visualizzato per sezioni ancora in fase di sviluppo.

## Contenuti Multilingua

Il sito supporta Italiano (principale) e Inglese. Tutte le descrizioni dei corsi, le FAQ e i testi delle pagine sono gestiti tramite file di internazionalizzazione (`app/i18n/`).
