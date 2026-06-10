# Progetto Expo - Creazione della nostra prima app

## Introduzione
Questo progetto consiste nello sviluppo di un'applicazione per smartphone realizzata tramite Expo e React Native. Il lavoro nasce come un'esercitazione pratica finalizzata all'apprendimento e alla comprensione dei passaggi fondamentali della programmazione mobile.

L'obiettivo principale è lo studio e l'applicazione di tre elementi chiave: l'organizzazione delle diverse schermate dell'applicazione, la creazione di un sistema di navigazione per passare da una pagina all'altra in modo fluido e l'integrazione del software con le funzioni hardware del telefono, in particolare la fotocamera. Tramite questo progetto, è possibile analizzare la gestione dei permessi di sicurezza necessari per attivare i sensori del dispositivo e comprendere come strutturare gli elementi grafici per offrire un'esperienza utente semplice e ordinata.

---

## installazione applicazione expo

### 1. Inizializzare una nuova applicazione Expo
Per creare il progetto, aprire il terminale del computer ed eseguire il comando seguente:

```bash
npx create-expo-app@latest StickerSmash
```
Questo comando serve a creare da zero la struttura iniziale.
Durante la pocedura guidata nel terminale, verrà richiesto di selezionare un modello di sviluppo. selezionare l'opzione **SDK 54**, in quanto il progetto è progettato per questa specifica versione

**Una volta terminata la procedura, entrare nella cartella appena creata usando il comando:**
```
cd StickerSmash
```
Per evitare conflitti nel codice e per capire meglio cosa si sta facendo è necessario ripulire l'ambiente di lavoro, tramite un comando di reset.

Eseguire il comando seguente nel terminale:
```
npm run reset-project
```
L'esecuzione del comando di reset **npm run reset-project** sposta tutti i file di prova in una cartella di backup chiamata **app-example**, lasciando la cartella principale **app** completamente vuota e pronta 
per il nuovo codice.

**Ora è possibile avviare il server di sviluppo locale per testare l'applicazione in tempo reale.**

Eseguire il comando seguente nel terminale:
```
npx expo start
```
Una volta fatto ciò nel terminale avremmo la seguente schermata:

<img width="676" height="562" alt="metro-bundler" src="https://github.com/user-attachments/assets/364260e1-298c-4834-a1aa-a2175280288b" />

Questa schermata è il pannello di controllo dell'app chimato anche **Metro Bundler**.

Andremo a usare principalmente i due comandi:
*Premi A (open Android): Avvia l'applicazione dentro uno smartphone virtuale (emulatore) sul tuo computer, simulando in tutto e per tutto un vero dispositivo Android
*Premi W (open web): Trasforma l'applicazione in un sito web e la apre automaticamente nel browser del pc, all'indirizzo http://localhost:8081.

---
## Installazione fotocamera

Per prima cosa si dovrà installare la libreria necessaria per poter far funzionare la fotocamera all'interno del progetto, eseguire il seguente comando nel terminale:
```
npx expo install expo-camera
```
Adesso serve il codice per mostrare la fotocamera del telefono dentro l'applicazione e a gestire i permessi per usarla. Il codice è il seguente:
```
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  // Stato di caricamento dei permessi
  if (!permission) {
    return <View />;
  }

  // Gestione del caso in cui i permessi non siano stati concessi
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>È necessario fornire il permesso per mostrare la fotocamera</Text>
        <Button onPress={requestPermission} title="Concedi Permesso" />
      </View>
    );
  }

  // Funzione per cambiare l'orientamento della fotocamera (fronte/retro)
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Capovolgi Fotocamera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
```
Questo codice ci permette di controllare se l'utente ha dato il permesso di usare la fotocamera e, se non l'ha fatto, mostra una schermata con un pulsante per richiederlo; poi, una volta ottenuto il permesso, attiva l'inquadratura sullo schermo tramite il comando **CameraView**; infine, crea un pulsante **Capovolgi Fotocamera** che permette all'utente di passare dalla fotocamera posteriore a quella frontale modificando lo stato 
dell'app. La parte finale serve semplicemente a decidere i colori, le dimensioni e la posizione di questi elementi sullo schermo.


---
## Struttura delle Cartelle

```text
└── app/                  # Cartella principale con il codice dell'app
    ├── (tabs)/           # Cartella per le pagine del menu in basso
    │   ├── _layout.tsx   # File che crea la barra del menu (Home / About)
    │   ├── index.tsx     # Pagina principale con la fotocamera e lo sfondo animato
    │   └── about.tsx     # Pagina con le informazioni
    └── +not-found.tsx    # Pagina che si apre se si sbaglia strada
```

## Risultato finale




    