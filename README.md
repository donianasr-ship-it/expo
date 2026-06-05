# Tutorial Expo

Questo repository contiene la mia prima applicazione sviluppata con **Expo Framework** e **React Native**. Il progetto nasce come esercitazione pratica per comprendere come funziona la gestione delle pagine, la navigazione all'interno di un'app per smartphone e l'integrazione di componenti hardware nativi.

---

## Funzionalità Implementate

- [x] **Ambiente Expo:** Configurazione dell'ambiente di sviluppo locale nativo ed esecuzione dell'app tramite connessione locale (cavo USB/IP locale) o Tunnel per l'ispezione sul dispositivo.
- [x] **Navigazione a Schede (Tab Navigation):** Creazione di una barra di menu inferiore (`(tabs)`) che permette di spostarsi fluidamente entre la schermata **Home** e la schermata **About (Informazioni)**.
- [x] **Integrazione Fotocamera Nativa:** Utilizzo del modulo hardware tramite la libreria ufficiale di Expo per mostrare l'inquadratura in tempo reale e scattare fotografie direttamente dall'applicazione.
- [x] **Sfondo Animato Dinamico (RGB Fade):** Implementazione di un'animazione ciclica fluida (in loop infinito) che cambia continuamente il colore di sfondo della sezione inferiore dello schermo tramite la libreria nativa `Animated`.
- [x] **Gestione dei Percorsi Errati (404 Fallback):** Creazione della schermata speciale `+not-found.tsx`. Se si inserisce un indirizzo sbagliato o inesistente, l'app mostra una schermata di errore personalizzata ("Oops! Not Found") con un link sicuro per ritornare alla Home.

---

## Concetti Chiave Appresi

* **File-based Routing con Gruppi:** Con Expo Router, l'organizzazione dei file determina i percorsi. L'uso delle cartelle tra parentesi come `(tabs)` permette di raggruppare le schermate sotto lo stesso layout senza influenzare l'URL o il percorso logico.
* **Gestione dei Permessi Hardware:** Gestione del ciclo di vita dei permessi di Android e iOS tramite hook dedicati (`useCameraPermissions`), bloccando l'interfaccia o mostrando messaggi di richiesta dinamici fino al consenso dell'utente.
* **Riferimenti ai Componenti Nativi (Refs):** Utilizzo dell'hook `useRef` per agganciarsi direttamente all'istanza hardware di un componente (come `CameraView`) per poterne invocare i metodi asincroni nativi (es. `takePictureAsync`).
* **Interpolazione delle Animazioni:** Uso di `Animated.Value` e della funzione `.interpolate()` per mappare una timeline numerica continua su una serie definita di stringhe di colore RGB, creando transizioni cromatiche fluide.

---

## 📂 Struttura Attuale del Progetto

```text
└── app/                  # Cartella principale della nostra applicazione
    ├── (tabs)/           # Gruppo della navigazione a schede in basso (Comanda i percorsi)
    │   ├── _layout.tsx   # Gestore della barra dei menu (Home / About)
    │   ├── index.tsx     # Schermata principale aggiornata (Fotocamera + Sfondo Animato)
    │   └── about.tsx     # Schermata delle informazioni (About screen)
    └── +not-found.tsx    # La pagina di salvataggio se l'indirizzo è sbagliato
---

## 📂 Struttura Attuale del Progetto

```text
└── app/                  # Cartella principale della nostra applicazione
    ├── (tabs)/           # Gruppo della navigazione a schede in basso
    │   ├── _layout.tsx   # Gestore della barra dei menu (Home / About)
    │   ├── index.tsx     # Schermata principale (Home screen)
    │   └── about.tsx     # Schermata delle informazioni (About screen)
    └── +not-found.tsx    # La pagina di salvataggio se l'indirizzo è sbagliato
```

---

***PAGINA PRINCIPALE***

<img width="1526" height="990" alt="Immagine 2026-05-29 131818" src="https://github.com/user-attachments/assets/d4a9bfac-8814-480d-9ed0-a1a57aa20e5e" />

---

**SCREEN LAYOUT**

Questo codice serve a creare la barra dei menu in basso sul telefono per passare da una pagina all'altra dell'applicazione (in questo caso, tra la pagina "Home" e la pagina "About").

```
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      {/* Definisce la prima scheda in basso che punta al file index.tsx (Home) */}
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      {/* Definisce la seconda scheda in basso che punta al file about.tsx (About) */}
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
```

**SCREEN INDEX**

Il codice della parte index serve a mostrare la schermata iniziale ("Home screen") dell'app con una scritta bianca su sfondo scuro e un bottone cliccabile che, se premuto, ti porta direttamente alla pagina "About".

```
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // <-- Questo serve per creare il collegamento ipersensibile

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      
      {/* Questo è il link che punta a /about */}
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline', // Sottolinea il testo come un vero link web
    color: '#fff',
  },
});
```

**SCREEN ABOUT**

Serve a mostrare la schermata informativa ("About screen") dell'app. È una pagina molto semplice che mostra solo un testo bianco al centro di uno sfondo scuro, ed è la schermata in cui arrivi quando clicchi sul link o sul bottone delle pagine precedenti.

```
import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

**SCREEN ERROR-404!**

Infine questo codice serve a mostrare la schermata di errore 404, cioè la pagina che appare automaticamente quando l'utente prova ad andare in una sezione dell'applicazione che non esiste o che è stata cancellata. Cambia il titolo in alto in "Oops! Not Found" e mostra un link per tornare al sicuro nella schermata iniziale (Home).

```
import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      {/* 1. Questo cambia il titolo della barra in alto SOLO per questa schermata di errore */}
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      
      <View style={styles.container}>
        {/* 2. Questo link sicuro riporta l'utente alla Home scacciando il pericolo */}
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
