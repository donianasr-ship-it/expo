# Progetto Expo - Product Information App

Questo progetto è un'applicazione per telefono creata con Expo e React Native. Serve come esercitazione pratica per imparare a gestire le pagine, i passaggi da una schermata all'altra e l'uso di funzioni del telefono come la fotocamera.

---

## Funzionalità Principali

* **Lettura del Codice a Barre:** L'app permette di usare la fotocamera per leggere il codice a barre di una bottiglia. Una volta riconosciuto il prodotto, l'app mostra la scheda descrittiva, il lotto, le certificazioni e la storia del produttore.
* **Menu in Basso (Tab Navigation):** È presente una barra di menu in basso per passare facilmente dalla schermata principale alla pagina delle informazioni.
* **Uso della Fotocamera:** L'app si collega alla fotocamera dello smartphone per mostrare l'inquadratura in tempo reale.
* **Sfondo che Cambia Colore:** Nella parte inferiore dello schermo c'è un'animazione continua che fa sfumare lo sfondo con colori diversi.
* **Pagina di Errore (404):** Se si prova ad andare su una pagina che non esiste, l'app mostra una schermata di errore con un pulsante per tornare alla Home.

---

## Procedimento Passo dopo Passo

Il progetto è stato sviluppato seguendo tre fasi principali: la configurazione, l'avvio del software e l'aggiunta della fotocamera.

### Fase 1: Creazione del progetto
1. **Creazione dell'app:** È stato avviato il progetto utilizzando il modello base di Expo con supporto a TypeScript.
2. **Configurazione delle pagine:** È stata creata la struttura delle cartelle dentro `app/` per definire i percorsi e i passaggi tra le schermate.
3. **Menu inferiore:** È stato inserito il file `_layout.tsx` all'interno della cartella `(tabs)` per generare i pulsanti di navigazione in fondo allo schermo.
4. **Schermata Home e Info:** Sono state create le pagine `index.tsx` (Home) e `about.tsx` (Informazioni) con testi semplici e collegamenti per passare da una all'altra.
5. **Gestione degli errori:** È stato aggiunto il file `+not-found.tsx` per mostrare un messaggio di errore automatico se si prova ad aprire una pagina inesistente.

### Fase 2: Collegamento e test sul telefono
1. **Avvio del server:** Tramite il terminale del computer è stato lanciato il comando
    `npx expo start --localhost`
per attivare il server di sviluppo (Metro Bundler).

### Fase 3: Integrazione della Fotocamera
1. **Richiesta dei permessi:** È stato inserito nel codice il controllo per verificare se l'utente permette all'app di usare la fotocamera del telefono.
2. **Visualizzazione dell'inquadratura:** Nella pagina principale (`index.tsx`) è stato inserito il componente `CameraView` per mostrare quello che vede la fotocamera in tempo reale.
3. **Predisposizione per il Barcode:** Questa configurazione della fotocamera è stata realizzata per permettere, nelle fasi successive, la lettura e il riconoscimento dei codici a barre dei prodotti.

---

## Concetti Imparati Durante il Progetto

* **Collegamento tra pc e smartphone:** Si è imparato a connettere due dispositivi diversi tra loro usando tipi di connessione differenti
* **Permessi per la Fotocamera:** Capire come chiedere all'utente il permesso di usare la fotocamera e mostrare un messaggio finché il permesso non viene accettato.
* **Sfondo:** Gestire i tempi delle animazioni per cambiare il colore dello sfondo in modo fluido e continuo.

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
## Analisi del codice

### Descrizione del file `app/(tabs)/_layout.tsx`

Questo file configura la barra dei menu situata nella parte inferiore dello schermo del telefono. Attraverso il componente `Tabs` importato da `expo-router`, il sistema genera in automatico i pulsanti di navigazione. Nel codice sono definite due schermate principali: la prima punta alla pagina iniziale (`name="index"`) con il titolo "Home", mentre la seconda punta alla pagina informativa (`name="about"`) con il titolo "About". Ogni nuova pagina aggiunta dentro questa struttura diventerà un pulsante del menu.
```
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
```

### Descrizione del file `app/(tabs)/index.tsx`

Questo file definisce la schermata principale dell'applicazione (Home screen). Utilizza i componenti base di React Native: `View` per creare il contenitore principale, `Text` per mostrare la scritta sullo schermo e `StyleSheet` per impostare lo sfondo scuro e centrare gli elementi. All'interno del codice è presente il componente `Link` di `expo-router`, che crea un collegamento ipertestuale sottolineato; quando l'utente lo preme, l'applicazione cambia schermata e lo porta alla pagina delle informazioni (`/about`).

```
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      
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
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
```

### Descrizione del file `app/(tabs)/about.tsx`

Questo file definisce la schermata secondaria dell'applicazione dedicata alle informazioni (About screen). La struttura riutilizza i componenti base di React Native: `View` per creare la scatola contenitrice e `Text` per mostrare la scritta bianca al centro dello schermo. Attraverso lo `StyleSheet`, viene mantenuto lo stesso stile grafico della pagina principale, con lo sfondo scuro e il testo posizionato al centro perfetto dello schermo grazie ai comandi `justifyContent` e `alignItems`.***

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

### Descrizione del file `app/+not-found.tsx`

Questo file gestisce la schermata di errore automatica (404) che si attiva quando si tenta di accedere a una pagina che non esiste. Il codice utilizza il componente `Stack.Screen` per modificare il titolo della barra superiore in "Oops! Not Found". Al centro dello schermo, impostato con lo sfondo scuro tramite lo `StyleSheet`, viene inserito un componente `Link` configurato con il percorso `/`; questo elemento permette all'utente di ritornare in modo sicuro alla schermata iniziale dell'applicazione.

```
import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      
      <View style={styles.container}>
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
  },
});
```
## Risultato finale


L'applicazione viene avviata localmente tramite Metro Bundler, generando il codice QR per il collegamento rapido allo smartphone:

<img width="676" height="606" alt="metro-bundler" src="https://github.com/user-attachments/assets/d7264eaa-041c-446b-be83-c50ce55c4fac" />


