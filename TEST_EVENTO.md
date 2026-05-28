# Guida al Test dell'Evento 1000 Backflip

Questa guida spiega come testare l'evento utilizzando i tuoi dispositivi (PC, smartphone, tablet) e come resettare tutto al termine del test.

## 1. Preparazione dei Dispositivi

L'evento è pensato per essere multi-dispositivo e in tempo reale. Per un test completo, ti consiglio di usare:
- **PC (Dashboard principale)**: Per visualizzare il progresso collettivo e la classifica.
- **Smartphone/Tablet (Partecipante)**: Per simulare l'inserimento dei backflip.

## 2. Accesso alle Pagine

Apri i seguenti link sui tuoi dispositivi (assicurati di essere nell'ambiente di test o di produzione corretto):

- **Dashboard (PC)**: `/event`
- **Interfaccia Partecipante (Smartphone)**: `/event/participant`
- **Pannello Admin (PC)**: `/event/admin`

---

## 3. Procedura di Test Passo-Passo

### Fase A: Configurazione (Pannello Admin)
1. Vai su `/event/admin`.
2. Se non ci sono partecipanti, aggiungine uno o più (es. "Test 1", "Test 2") usando il form "Aggiungi Partecipante".
3. Verifica che lo stato sia "NON ATTIVO".
4. Clicca su **START EVENT**. Questo farà partire il cronometro globale.

### Fase B: Test in Tempo Reale (Partecipante + Dashboard)
1. Sullo smartphone, vai su `/event/participant`.
2. Seleziona uno dei nomi creati precedentemente.
3. Inizia a cliccare sui pulsanti **+1**, **+5** o **+10**.
4. **Osserva la Dashboard** sul PC (`/event`): dovresti vedere i numeri aggiornarsi istantaneamente, la barra di progresso avanzare e il BPM (Backflips Per Minute) ricalcolarsi.
5. Prova a selezionare un altro nome su un altro dispositivo (o un'altra scheda) e aggiungi backflip per vedere come cambia la classifica in tempo reale.

### Fase C: Verifica Correzioni
1. Sull'interfaccia partecipante, usa il tasto **"Oops, togli -1"** per verificare che sia possibile correggere eventuali errori di inserimento.

---

## 4. Reset Finale

Una volta terminato il test, è fondamentale pulire i dati per l'evento reale:

1. Torna nel **Pannello Admin** (`/event/admin`).
2. Clicca sul pulsante rosso **RESET EVERYTHING**.
   - Questo fermerà il cronometro.
   - Porterà a 0 i backflip di **tutti** i partecipanti.
   - Renderà l'evento "NON ATTIVO".

> **Nota:** Il tasto Reset non cancella i nomi dei partecipanti dal database, ma azzera solo i loro punteggi. Se desideri rimuovere i partecipanti definitivamente, è necessario farlo tramite l'interfaccia di Supabase o una query manuale (non previsto attualmente dal pannello admin).

---

## Risoluzione Problemi
- **I dati non si aggiornano?** Controlla la connessione internet e assicurati che le variabili d'ambiente di Supabase siano caricate correttamente.
- **Il cronometro non parte?** Assicurati di aver cliccato "START EVENT" nell'Admin.
