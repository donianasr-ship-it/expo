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


## Creazione del database

---

Per fare in modo che la nostra applicazione mostri i dettagli dei prodotti (vini e oli) quando scansioniamo un codice QR, abbiamo bisogno di un archivio dati. Utilizzeremo quindi un file **JSON**, che **simulerà in locale il comportamento di un database remoto.**

---

**Elenco produttori:**

**Elenco di tutte e 10 le aziende** che custodisce tutte le informazioni scritte (nomi, regioni, filosofie, email):

```
{
    "QR_PROD_001": {
        "produttore": "Società Agricola Tenuta Realis S.r.l.",
        "regione": "Toscana (Siena)",
        "fondazione": "1948",
        "sitoWeb": "https://www.tenutarealis-mockup.it",
        "coordinateGps": "43.4632, 11.2841",
        "filosofia": "Coltiviamo rispettando la biodiversità del suolo, unendo le storiche tradizioni toscane con moderni impianti di vinificazione a basso impatto ambientale.",
        "contatti": {
            "email": "info@tenutarealis.it",
            "telefono": "+39 0577 123456"
        }
    },
    "QR_PROD_002": {
        "produttore": "Cantine Il Filare di Langa",
        "regione": "Piemonte (Cuneo)",
        "fondazione": "1923",
        "sitoWeb": "https://www.ilfilarelanghe-mockup.it",
        "coordinateGps": "44.6112, 7.9945",
        "filosofia": "Tre generazioni di viticoltori dediti alla valorizzazione del Nebbiolo. Ogni bottiglia racchiude l'anima profonda delle nostre colline patrimonio UNESCO.",
        "contatti": {
            "email": "cantina@ilfilarelanghe.it",
            "telefono": "+39 0173 987654"
        }
    },
    "QR_PROD_003": {
        "produttore": "Vigneti Feudo d'Oro",
        "regione": "Sicilia (Agrigento)",
        "fondazione": "1995",
        "sitoWeb": "https://www.feudodoro-mockup.it",
        "coordinateGps": "37.3111, 13.5764",
        "filosofia": "Viticoltura eroica sotto il sole della Sicilia. Produciamo vini solari, salini e fortemente territoriali, certificati biologici e vegani.",
        "contatti": {
            "email": "commerciale@feudodoro.it",
            "telefono": "+39 0922 456123"
        }
    },
    "QR_PROD_004": {
        "produttore": "Azienda Agricola Poggio dei Ciliegi",
        "regione": "Veneto (Verona)",
        "fondazione": "1960",
        "sitoWeb": "https://www.poggiodeiciliegi-mockup.it",
        "coordinateGps": "45.5439, 10.9922",
        "filosofia": "L'eccellenza della Valpolicella. La nostra dedizione all'appassimento tradizionale garantisce vini complessi e indimenticabili.",
        "contatti": {
            "email": "hello@poggiodeiciliegi.it",
            "telefono": "+39 045 789123"
        }
    },
    "QR_PROD_005": {
        "produttore": "Tenuta Perla di Langa",
        "regione": "Piemonte (Asti)",
        "fondazione": "1988",
        "sitoWeb": "https://www.perladilanga-mockup.it",
        "coordinateGps": "44.6983, 8.2251",
        "filosofia": "Specialisti del Metodo Classico. Cerchiamo la massima precisione espressiva, freschezza e verticalità in ogni spumante.",
        "contatti": {
            "email": "bollicine@perladilanga.it",
            "telefono": "+39 0141 334455"
        }
    },
    "QR_PROD_006": {
        "produttore": "Frantoio Oleario Olis Regalis",
        "regione": "Puglia (Bari)",
        "fondazione": "1972",
        "sitoWeb": "https://www.olisregalis-mockup.it",
        "coordinateGps": "41.1115, 16.6922",
        "filosofia": "Custodi degli ulivi secolari di Coratina. Molitura immediata a freddo per preservare i preziosi antiossidanti dell'oro verde di Puglia.",
        "contatti": {
            "email": "frantoio@olisregalis.it",
            "telefono": "+39 080 555666"
        }
    },
    "QR_PROD_007": {
        "produttore": "Frantoio Valle degli Ulivi",
        "regione": "Toscana (Firenze)",
        "fondazione": "1955",
        "sitoWeb": "https://www.valledegliulivi-mockup.it",
        "coordinateGps": "43.7228, 11.2911",
        "filosofia": "Passione e innovazione tecnologica nel rispetto del disciplinare IGP Toscano. Un olio profumato, specchio fedele delle nostre colline.",
        "contatti": {
            "email": "info@valledegliulivi.it",
            "telefono": "+39 055 888999"
        }
    },
    "QR_PROD_008": {
        "produttore": "Oleificio Sapore del Sud",
        "regione": "Sicilia (Trapani)",
        "fondazione": "1982",
        "sitoWeb": "https://www.saporedelsud-mockup.it",
        "coordinateGps": "37.5844, 12.8312",
        "filosofia": "Produzione artigianale da oliveti nella Valle del Belice. Catturiamo tutta l'intensità e i profumi della macchia mediterranea.",
        "contatti": {
            "email": "ordini@saporedelsud.it",
            "telefono": "+39 0924 777888"
        }
    },
    "QR_PROD_009": {
        "produttore": "Antichi Frantoi Liguri",
        "regione": "Liguria (Imperia)",
        "fondazione": "1910",
        "sitoWeb": "https://www.antichifrantoiliguri-mockup.it",
        "coordinateGps": "43.8861, 8.0264",
        "filosofia": "La traditione dell'oliva Taggiasca coltivata sui tipici muretti a secco liguri. Un olio leggero ed elegante, frutto di una terra eroica.",
        "contatti": {
            "email": "muretti@antichifrantoi.it",
            "telefono": "+39 0183 112233"
        }
    },
    "QR_PROD_010": {
        "produttore": "Azienda Agricola Colle Umbro",
        "regione": "Umbria (Perugia)",
        "fondazione": "2001",
        "sitoWeb": "https://www.colleumbro-mockup.it",
        "coordinateGps": "42.9815, 12.4144",
        "filosofia": "Sostenibilità energetica e filiera cortissima. Le nostre olive vengono frante a km zero per garantire un... prodotto freschissimo e genuino.",
        "contatti": {
            "email": "frantoio@colleumbro.it",
            "telefono": "+39 075 443322"
        }
    }
}
```
---

Dopo aver visto il catalogo delle aziende si andrà a creare un secondo archivio per i singoli articoli

---

**Questa parte di codice procede a fare questo:**

1. La fotocamera inquadra la bottiglia e legge il numero (es. 4101234567898).
2. L'applicazione cerca questo numero dentro il file.
3. L'applicazione pesca tutti i dati di quella bottiglia:
    * Il nome preciso (es. Tenuta Realis - Chianti Classico).
    * Il prezzo medio (es. 18.5 euro).
    * Il numero di lotto per la sicurezza alimentare.
    * La storia del vino (es. affinamento di 12 mesi in botti di rovere).
    * Le recensioni e i commenti lasciati dagli altri utenti (es. cosa ne pensa Marco Rossi).

```
{
    "4101234567898": {
        "nome": "Tenuta Realis - Chianti Classico DOCG 2021",
        "categoria": "Vino Rosso",
        "lotto": "L.CH21/04",
        "certificazioni": [
            "DOCG",
            "Biologico"
        ],
        "storia": "Prodotto nel cuore della Toscana da vitigni Sangiovese coltivati a 350m di altitudine, con affinamento di 12 mesi in botti di rovere francese.",
        "prezzoMedio": 18.5,
        "valutazione": 4.7,
        "recensioni": [
            {
                "utente": "Marco Rossi",
                "stelle": 5,
                "commento": "Un Chianti eccellente, corpo strutturato e note di frutti rosso mature."
            },
            {
                "utente": "Elena B.",
                "stelle": 4,
                "commento": "Molto buono, perfetto con la carne rossa. Tannini equilibrati."
            }
        ]
    },
    "8005551112228": {
        "nome": "Il Filare - Barolo DOCG 2019",
        "categoria": "Vino Rosso",
        "lotto": "L.BR19/12",
        "certificazioni": [
            "DOCG"
        ],
        "storia": "Ottenuto da uve Nebbiolo in purezza nelle colline delle Langhe. Affinato per 36 mesi, di cui 18 in legno, per una complessità inconfondibile.",
        "prezzoMedio": 42.0,
        "valutazione": 4.9,
        "recensioni": [
            {
                "utente": "Giovanni T.",
                "stelle": 5,
                "commento": "Un capolavoro. Note di tabacco e spezie. Longevità eccezionale."
            },
            {
                "utente": "Sofia Vigneti",
                "stelle": 5,
                "commento": "Barolo maestoso, elegante e persistente."
            }
        ]
    },
    "8412345678905": {
        "nome": "Feudo d'Oro - Grillo Sicilia DOC 2023",
        "categoria": "Vino Bianco",
        "lotto": "L.GR23/01",
        "certificazioni": [
            "DOC",
            "Vegan Certified"
        ],
        "storia": "Un bianco fresco e sapido nato dai venti caldi della costa siciliana. Note intense di agrumi e zagara bianca.",
        "prezzoMedio": 9.8,
        "valutazione": 4.2,
        "recensioni": [
            {
                "utente": "Luca M.",
                "stelle": 4,
                "commento": "Fresco e profumato, ideale per aperitivi a base di pesce."
            },
            {
                "utente": "Anna De Luca",
                "stelle": 4,
                "commento": "Buon rapporto qualità prezzo. Molto minerale."
            }
        ]
    },
    "8009998887770": {
        "nome": "Poggio dei Ciliegi - Amarone della Valpolicella 2018",
        "categoria": "Vino Rosso",
        "lotto": "L.AM18/09",
        "certificazioni": [
            "DOCG"
        ],
        "storia": "Ottenuto con la tradizionale tecnica dell'appassimento delle uve sui graticci per oltre 100 giorni. Struttura imponente e morbidezza.",
        "prezzoMedio": 55.0,
        "valutazione": 4.8,
        "recensioni": [
            {
                "utente": "Roberto F.",
                "stelle": 5,
                "commento": "Caldo, avvolgente, sentori di amarena sotto spirito e cioccolato."
            },
            {
                "utente": "Clara B.",
                "stelle": 4,
                "commento": "Un vino da meditazione strepitoso, molto alcolico ma bilanciato."
            }
        ]
    },
    "4901234567894": {
        "nome": "Perla di Langa - Alta Langa DOCG Pas Dosé 2020",
        "categoria": "Spumante",
        "lotto": "L.AL20/FE",
        "certificazioni": [
            "DOCG"
        ],
        "storia": "Metodo Classico piemontese da uve Pinot Nero e Chardonnay. Affinamento sui lieviti per 36 mesi per un perlage finissimo.",
        "prezzoMedio": 29.0,
        "valutazione": 4.6,
        "recensioni": [
            {
                "utente": "Matteo S.",
                "stelle": 5,
                "commento": "Perlage finissimo e persistente. Crosta di pane e mela verde."
            },
            {
                "utente": "Lucia Castelli",
                "stelle": 4,
                "commento": "Secco, dritto, acidità perfetta. Ottimo brindisi."
            }
        ]
    },
    "8410567890129": {
        "nome": "Olis Regalis - Olio Extra Vergine di Oliva monocultivar Coratina",
        "categoria": "Olio EVO",
        "lotto": "L.OL24/C01",
        "certificazioni": [
            "DOP Terra di Bari",
            "Biologico"
        ],
        "storia": "Estratto a freddo esclusivamente da olive Coratina coltivate a Bitonto. Caratterizzato da un fruttato intenso con decise note di piccante e amaro.",
        "prezzoMedio": 16.5,
        "valutazione": 4.8,
        "recensioni": [
            {
                "utente": "Antonio P.",
                "stelle": 5,
                "commento": "La vera Coratina! Pizzica meravigliosamente in gola. Perfetto a crudo."
            },
            {
                "utente": "Maria G.",
                "stelle": 4,
                "commento": "Profumo di erba tagliata fantastico, ottimo sulle zuppe di legumi."
            }
        ]
    },
    "4006381333931": {
        "nome": "Valle degli Ulivi - Olio EVO Biologico Toscano IGP",
        "categoria": "Olio EVO",
        "lotto": "L.OL24/T05",
        "certificazioni": [
            "IGP Toscano",
            "Biologico"
        ],
        "storia": "Frutto delle storiche varietà Frantoio, Leccino e Moraiolo. Raccolta precoce e frangitura entro 6 ore per preservare i polifenoli.",
        "prezzoMedio": 19.0,
        "valutazione": 4.7,
        "recensioni": [
            {
                "utente": "Filippo L.",
                "stelle": 5,
                "commento": "Equilibrato, note di carciofo e mandorla verde. Un classico intramontabile."
            },
            {
                "utente": "Simona R.",
                "stelle": 4,
                "commento": "Eccellente sulla bruschetta e sulle verdure grigliate."
            }
        ]
    },
    "8008889991114": {
        "nome": "Sapore del Sud - Olio EVO Nocellara del Belice",
        "categoria": "Olio EVO",
        "lotto": "L.OL24/N02",
        "certificazioni": [
            "DOP Val di Mazara"
        ],
        "storia": "Olio monovarietale da olive Nocellara del Belice. Sentori di pomodoro verde, foglia di pomodoro ed erbe aromatiche.",
        "prezzoMedio": 15.0,
        "valutazione": 4.5,
        "recensioni": [
            {
                "utente": "Giuseppe M.",
                "stelle": 4,
                "commento": "Gusto rotondo e quel tipico sentore di pomodoro che adoro sul pesce."
            },
            {
                "utente": "Valeria N.",
                "stelle": 5,
                "commento": "Morbido ma saporito, acidità quasi impercettibile."
            }
        ]
    },
    "3012345678902": {
        "nome": "Antichi Frantoi - Olio EVO Ligure DOP Riviera Ligure",
        "categoria": "Olio EVO",
        "lotto": "L.OL24/R11",
        "certificazioni": [
            "DOP Riviera Ligure"
        ],
        "storia": "Prodotto prevalentemente da olive di varietà Taggiasca. Un olio delicato, dolce, con leggere note di mandorla, perfetto per non coprire i piatti.",
        "prezzoMedio": 22.0,
        "valutazione": 4.6,
        "recensioni": [
            {
                "utente": "Fabio C.",
                "stelle": 5,
                "commento": "Delicatissimo, perfetto per il pesto alla genovese o per il pesce al vapore."
            },
            {
                "utente": "Sara W.",
                "stelle": 4,
                "commento": "Olio dorato e leggero, ideale per chi non ama i sapori troppo forti."
            }
        ]
    },
    "8002223334445": {
        "nome": "Colle Umbro - Olio EVO Estratto a Freddo",
        "categoria": "Olio EVO",
        "lotto": "L.OL24/U08",
        "certificazioni": [
            "100% Italiano"
        ],
        "storia": "Selezione accurata delle migliori olive dell'Umbria. Lavorazione meccanica a freddo continuo per garantire stabilità e purezza.",
        "prezzoMedio": 13.5,
        "valutazione": 4.4,
        "recensioni": [
            {
                "utente": "Daniele S.",
                "stelle": 4,
                "commento": "Ottimo olio quotidiano, saporito e genuino."
            },
            {
                "utente": "Cinzia P.",
                "stelle": 5,
                "commento": "Ottimo rapporto qualità prezzo per un prodotto 100% italiano."
            }
        ]
    }
}
```




    
