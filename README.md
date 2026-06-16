 # <mark>Progetto Expo - Creazione della nostra prima app</mark>

## Introduzione
Questo progetto consiste nello sviluppo di un'applicazione per smartphone realizzata tramite Expo e React Native. Il lavoro nasce come un'esercitazione pratica finalizzata all'apprendimento e alla comprensione dei passaggi fondamentali della programmazione mobile.

L'obiettivo principale è lo studio e l'applicazione di tre elementi chiave: l'organizzazione delle diverse schermate dell'applicazione, la creazione di un sistema di navigazione per passare da una pagina all'altra in modo fluido e l'integrazione del software con le funzioni hardware del telefono, in particolare la fotocamera. Tramite questo progetto, è possibile analizzare la gestione dei permessi di sicurezza necessari per attivare i sensori del dispositivo e comprendere come strutturare gli elementi grafici per offrire un'esperienza utente semplice e ordinata.


---
## Installazione

Per poter fare in modo che che l'applicazione possa funzionare la prima cosa da fare è utilittazre questo comando, serve scaricare e installare automaticamente sul tuo computer tutte le librerie e i moduli esterni necessari per far funzionare un progetto Node.js.

```
npm install
```

Come seconda cosa, bisognerà inserire questo comando serve a muoversi all'interno del terminale per entrare nella cartella specifica del progetto.

```
cd https://github.com/donianasr-ship-it/scanner-generatore-qr-vini-oli.git
```

---

## Avvio del programma 

Uno volta fatto i npassaggi precedenti possiamo passare all'avvio attraverso questo comando:

```
npx expo start
```

**Per poter collegare il telefono al pc si userà il seguente comando**

```
npx expo start --localhost
```

Una volta arrivati a questo punto nel terminale ci uscirà un QRCODE che serve per aprire l'applicazione sul telefono.

<img width="777" height="599" alt="Immagine 2026-06-15 172825" src="https://github.com/user-attachments/assets/462f586b-f115-404c-a9dd-8fe962f17d70" />

In basso trovi una lista di tasti rapidi per testare l'app, tra cui:

- Tasto a (open Android): serve ad aprire e avviare l'applicazione direttamente su un emulatore Android sul tuo computer o su un telefono Android collegato via USB.

- Tasto w (open web): serve ad aprire l'applicazione direttamente nel browser del tuo computer (come Chrome o Firefox) per vederla come se fosse un sito web.

---

## Struttura delle Cartelle

```text
├── app/                      # CARTELLA PRINCIPALE (Contiene il codice dell'app)
│   ├── (tabs)/               # Gestisce il menu di navigazione in basso dello schermo
│   │   ├── _layout.tsx       # Crea la barra del menu grafico (es. i pulsanti Home / About)
│   │   ├── index.tsx         # La pagina principale dell'app dove si attiva la FOTOCAMERA
│   │   └── about.tsx         # Pagina secondaria con le informazioni di aiuto dell'app
│   └── +not-found.tsx        # Schermata di errore automatica se l'app "sbaglia strada"
│
└── assets/                   # CARTELLA DELLE RISORSE (Immagini, Font e Dati)
    └── data/                 # Sotto-cartella creata da noi per i nostri archivi di testo
        ├── produttori.json   # FILE 1: Il database con i dettagli delle aziende agricole
        └── prodotti.json     # FILE 2: Il catalogo con i prezzi e i lotti delle singole bottiglie
```


## Dimostrazione esecuzione del Generatore



https://github.com/user-attachments/assets/e900c815-793f-4a12-b239-70f73040b123






