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
├── .claude/
│   └── settings.json
├── .expo/
├── .vscode/
├── android/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── about.tsx
│   │   ├── generator.tsx
│   │   └── index.tsx
│   ├── components/
│   │   └── BarcodeGenerator.tsx
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   ├── about.tsx
│   ├── database_ean13.json
│   ├── database_qrcode.json
│   └── index.tsx
├── app-example/
├── assets/
├── node_modules/
├── -metro.config.js
├── .gitignore
├── AGENTS.md
├── app.json
├── CATALOGO.pdf
├── eslint.config.js
├── expo-env.d.ts
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── start-android.bat
└── tsconfig.json
```


## Esecuzione dell'applicazione





https://github.com/user-attachments/assets/e8114f56-76b7-4e08-b3bf-90f3650cb87d










