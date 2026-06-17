 # <mark>Progetto Expo - Creazione della nostra prima app</mark>

## Introduzione
Questo progetto consiste nello sviluppo di un'applicazione per smartphone realizzata tramite Expo e React Native. Il lavoro nasce come un'esercitazione pratica finalizzata all'apprendimento e alla comprensione dei passaggi fondamentali della programmazione mobile.

L'obiettivo principale è lo studio e l'applicazione di tre elementi chiave: l'organizzazione delle diverse schermate dell'applicazione, la creazione di un sistema di navigazione per passare da una pagina all'altra in modo fluido e l'integrazione del software con le funzioni hardware del telefono, in particolare la fotocamera. Tramite questo progetto, è possibile analizzare la gestione dei permessi di sicurezza necessari per attivare i sensori del dispositivo e comprendere come strutturare gli elementi grafici per offrire un'esperienza utente semplice e ordinata.


---



## Avvio del programma 

Per prima cosa bisognerà inserire questo comando serve a muoversi all'interno del terminale per entrare nella cartella specifica del progetto.

```
cd C:\Users\Stage\Desktop\scanner-generatore-qr-vini-oli
```

Per poter fare in modo che che l'applicazione possa funzionare la prima cosa da fare è utilittazre questo comando, serve scaricare e installare automaticamente sul tuo computer tutte le librerie e i moduli esterni necessari per far funzionare un progetto Node.js.

```
npm install
```

Uno volta fatto i passaggi precedenti possiamo passare all'avvio attraverso questo comando:

```
npx expo start
```

Se si riscontrano problemi di connessione di rete tra pc e telefono , si può forzare l'avvio locale con:

```
npx expo start --localhost
```

---

Una volta arrivati a questo punto nel terminale apparirà un QR CODE che serve per aprire l'applicazione sul telefono.

<img width="777" height="599" alt="Immagine 2026-06-15 172825" src="https://github.com/user-attachments/assets/462f586b-f115-404c-a9dd-8fe962f17d70" />

In basso trovi una lista di tasti rapidi per testare l'app, tra cui:

- Tasto a (open Android): serve ad aprire e avviare l'applicazione direttamente su un emulatore Android sul tuo computer o su un telefono Android collegato via USB.

- Tasto w (open web): serve ad aprire l'applicazione direttamente nel browser del tuo computer (come Chrome o Firefox) per vederla come se fosse un sito web.

---

## Struttura delle Cartelle

```text
SCANNER-GENERATORE-QR-VINI-OLI
├── .gitignore                      # File per escludere file/cartelle locali da Git
├── AGENTS.md                       # Documentazione del progetto
├── CATALOGO.pdf                    # Documentazione/Catalogo allegato
├── README.md                       # Documentazione principale del repository
├── app.json                        # Configurazione globale dell'app Expo
├── eslint.config.js                # Configurazione di ESLint per il codice
├── expo-env.d.ts                   # Definizioni dei tipi TypeScript per Expo
├── index.js                        # Entry point dell'applicazione
├── metro.config.js                 # Configurazione del bundler Metro (rinominato da -metro.config.js)
├── package-lock.json               # Lockfile delle dipendenze di Node
├── package.json                    # Dipendenze e script del progetto
├── start-android.bat               # Script batch per avviare l'emulatore Android
├── tsconfig.json                   # Configurazione di TypeScript
│
├── android/                        # Cartella nativa per la build Android
│
├── app/                            # CARTELLA PRINCIPALE DEL CODICE (Expo Router)
│   ├── (tabs)/                     # Navigazione principale a schede (Tab Bar)
│   │   ├── _layout.tsx             # Struttura e icone delle schede della Tab Bar
│   │   ├── about.tsx               # Schermata "About / Chi Siamo" (Rimasta Attiva)
│   │   ├── generator.tsx           # Schermata di generazione del QR Code
│   │   └── index.tsx               # Schermata principale (Home dell'app)
│   │
│   ├── components/                 # Componenti riutilizzabili locali alla cartella app
│   │   └── BarcodeGenerator.tsx    # Componente per la generazione dei codici a barre
│   │
│   ├── _layout.tsx                 # Root layout dell'intera applicazione
│   ├── +not-found.tsx              # Schermata di fallback in caso di percorso non trovato
│   ├── database_ean13.json         # Mock database / Dati statici per EAN13
│   └── database_qrcode.json        # Mock database / Dati statici per QR Code
│
└── assets/                         # Risorse statiche (Immagini, Font, Icone dell'app)

```


## Esecuzione dell'applicazione





https://github.com/user-attachments/assets/e8114f56-76b7-4e08-b3bf-90f3650cb87d










