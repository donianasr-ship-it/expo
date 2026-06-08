import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// DATABASE CONFIGURATO CON I VOSTRI CODICI REALI EAN-13
const prodottiDatabase: Record<string, { 
  nome: string; 
  categoria: string;
  lotto: string; 
  certificazioni: string[]; 
  storia: string;
  prezzoMedio?: string;
  valutazione?: string;
  recensioni?: string[];
}> = {
  // --- BOTTIGLIE DI VINO ---
  "8012345678905": {
    nome: "Vino Rosso Riserva 750 ml",
    categoria: "Digital Product Passport",
    lotto: "LR26-05",
    certificazioni: ["DOCG Riserva", "Solfiti Limitati Certificati"],
    storia: "Ottenuto da uve selezionate raccolte a mano nelle storiche vigne collinari. Affinato in botti di rovere per 24 mesi per garantire una struttura complessa e un bouquet vellutato.",
    prezzoMedio: "18.50 €",
    valutazione: "4.9 / 5 ⭐",
    recensioni: ["Un rosso eccezionale, perfetto con le carni rosse.", "Corposo, persistente ed equilibrato."]
  },
  "8012345678912": {
    nome: "Vino Bianco DOC 750 ml",
    categoria: "Digital Product Passport",
    lotto: "LB26-12",
    certificazioni: ["DOC Controllata", "Biologico"],
    storia: "Prodotto con tecniche di vinificazione a temperatura controllata per preservare la freschezza e le spiccate note floreali e fruttate tipiche del vitigno originario.",
    prezzoMedio: "12.40 €",
    valutazione: "4.6 / 5 ⭐",
    recensioni: ["Ottimo come aperitivo, freschissimo.", "Leggero e profumato."]
  },
  "8012345678929": {
    nome: "Vino Rosato 750 ml",
    categoria: "Smart Label App",
    lotto: "LRO26-29",
    certificazioni: ["IGT Tipica", "Sostenibilità Ambientale"],
    storia: "Un rosato fresco dal carattere vibrante, ottenuto da una pressatura soffice delle uve rosse con un brevissimo contatto con le bucce per estrarre la tipica colorazione cerasuola.",
    prezzoMedio: "10.00 €",
    valutazione: "4.4 / 5 ⭐",
    recensioni: ["Ideale per le sere d'estate, molto beverino."]
  },
  "8012345678936": {
    nome: "Cannonau di Sardegna 750 ml",
    categoria: "Traceability App",
    lotto: "LCN26-36",
    certificazioni: ["DOC Sardegna", "Filiera Tracciata 100%"],
    storia: "Simbolo della viticoltura sarda, questo Cannonau esprime la forza del territorio. Le vigne crescono accarezzate dal vento salmastro del Mediterraneo su terreni granitici.",
    prezzoMedio: "15.90 €",
    valutazione: "4.8 / 5 ⭐",
    recensioni: ["Un Cannonau autentico e fiero, eccellente strutturato.", "Sapore intenso, si sente la Sardegna."]
  },
  "8012345678943": {
    nome: "Vermentino di Sardegna 750 ml",
    categoria: "Traceability App",
    lotto: "LVM26-43",
    certificazioni: ["DOC Vermentino", "Basso Contenuto di Solfiti"],
    storia: "Vino bianco sapido e minerale, caratterizzato da un finale piacevolmente mandorlato. Prodotto lungo le coste esposte al sole, racchiude l'essenza dell'isola.",
    prezzoMedio: "14.20 €",
    valutazione: "4.7 / 5 ⭐",
    recensioni: ["Perfetto con piatti di pesce e crostacei.", "Mineralità eccezionale."]
  },

  // --- BOTTIGLIE DI OLIO ---
  "8023456789000": {
    nome: "Olio EVO 500 ml",
    categoria: "Digital Product Passport",
    lotto: "EVO50-00",
    certificazioni: ["Estratto a Freddo", "100% Italiano"],
    storia: "Olio Extravergine di oliva di categoria superiore. Le olive vengono molite entro poche ore dalla raccolta per preservare le proprietà antiossidanti ed organolettiche.",
    prezzoMedio: "9.50 €",
    valutazione: "4.5 / 5 ⭐",
    recensioni: ["Ottimo rapporto qualità prezzo.", "Un sapore equilibrato, adatto a tutti i giorni."]
  },
  "8023456789017": {
    nome: "Olio EVO 750 ml",
    categoria: "Digital Product Passport",
    lotto: "EVO75-17",
    certificazioni: ["Estratto a Freddo", "Campagna Olearia 2026"],
    storia: "La versione da 750 ml della nostra selezione di Extravergine. Ideale per l'uso culinario domestico quotidiano sia a crudo che in cottura.",
    prezzoMedio: "13.00 €",
    valutazione: "4.6 / 5 ⭐",
    recensioni: ["Formato comodo, l'olio mantiene benissimo la sua fragranza."]
  },
  "8023456789024": {
    nome: "Olio EVO 1 L",
    categoria: "Digital Product Passport",
    lotto: "EVO1L-24",
    certificazioni: ["Qualità Superiore", "Filiera Controllata"],
    storia: "Formato scorta da un litro della nostra selezione classica. Conservato in bottiglia di vetro scuro per proteggere il prodotto dall'ossidazione della luce.",
    prezzoMedio: "16.50 €",
    valutazione: "4.5 / 5 ⭐",
    recensioni: ["Perfetto per la famiglia, sapore fruttato leggero."]
  },
  "8023456789031": {
    nome: "Olio Biologico 500 ml",
    categoria: "Smart Label App",
    lotto: "BIO50-31",
    certificazioni: ["Agricoltura Biologica Certificata", "Zero Pesticidi"],
    storia: "Prodotto esclusivamente da uliveti coltivati seguendo i rigidi standard dell'agricoltura biologica, senza l'uso di sostanze chimiche di sintesi o pesticidi.",
    prezzoMedio: "12.00 €",
    valutazione: "4.8 / 5 ⭐",
    recensioni: ["Si sente la purezza del biologico. Eccellente sul pane."]
  },
  "8023456789048": {
    nome: "Olio DOP Sardegna 750 ml",
    categoria: "Digital Product Passport",
    lotto: "DOP75-48",
    certificazioni: ["DOP Sardegna", "Presidio Slow Food"],
    storia: "Prodotto d'eccellenza con certificazione d'Origine Protetta. Caratterizzato da un sapore fruttato verde medio-intenso con sentori di carciofo e pomodoro verde.",
    prezzoMedio: "21.00 €",
    valutazione: "5.0 / 5 ⭐",
    recensioni: ["Un olio regale. Il retrogusto di carciofo è fantastico.", "Superbo a crudo."]
  }
};

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null); 
  const animValue = useRef(new Animated.Value(0)).current;

  const [scanned, setScanned] = useState(false);
  const [prodottoTrovato, setProdottoTrovato] = useState<any>(null);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animValue, {
        toValue: 1,
        duration: 9000,
        useNativeDriver: false,
      })
    ).start();
  }, [animValue]);

  const backgroundColorInterpolate = animValue.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [
      'rgb(30, 32, 38)',   
      'rgb(35, 45, 65)', 
      'rgb(32, 55, 48)', 
      'rgb(25, 48, 62)', 
      'rgb(42, 32, 55)', 
      'rgb(30, 32, 38)',   
    ],
  });

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);

    const prodotto = prodottiDatabase[data];

    if (prodotto) {
      setProdottoTrovato(prodotto);
    } else {
      setProdottoTrovato({
        nome: "Codice Sconosciuto",
        categoria: "Smart Label / Traceability App",
        lotto: "N/D",
        certificazioni: ["Nessuna Certificazione Trovata"],
        storia: `Il codice letto (${data}) non corrisponde a nessun vino o olio censito all'interno dell'elenco del progetto.`,
        prezzoMedio: "N/D",
        valutazione: "N/D",
        recensioni: []
      });
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Caricamento fotocamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Abbiamo bisogno del tuo permesso per usare la fotocamera</Text>
        <Button onPress={requestPermission} title="Concedi Permesso" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* CAMERA VIEW */}
      <CameraView 
        style={styles.camera} 
        ref={cameraRef}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "qr"],
        }}
      >
        <View style={styles.overlayContainer}>
          <View style={[styles.scannerTarget, scanned && styles.scannerTargetScanned]} />
        </View>
      </CameraView>

      {/* PANNELLO INFORMATIVO INFERIORE */}
      <Animated.View style={[styles.navContainer, { backgroundColor: backgroundColorInterpolate }]}>
        
        {!prodottoTrovato ? (
          <View style={styles.centerInstructions}>
            <Text style={styles.instructionText}>Scanner di Tracciabilità Attivo</Text>
            <Text style={styles.subInstructionText}>Inquadra un codice EAN-13 per sbloccare il Passaporto Digitale del Prodotto</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 25 }}>
            <Text style={styles.tagCategoria}>{prodottoTrovato.categoria.toUpperCase()}</Text>
            <Text style={styles.productTitle}>{prodottoTrovato.nome}</Text>
            
            {/* Dati del Prodotto */}
            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Lotto di Produzione:</Text>
              <Text style={styles.infoText}>{prodottoTrovato.lotto}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Certificazioni di Qualità:</Text>
              <View style={styles.certRow}>
                {prodottoTrovato.certificazioni.map((cert: string, index: number) => (
                  <View key={index} style={styles.certBadge}>
                    <Text style={styles.certBadgeText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Storia del Produttore:</Text>
              <Text style={styles.historyText}>{prodottoTrovato.storia}</Text>
            </View>

            {/* Box per gli Sviluppi Futuri */}
            <View style={styles.futureBlock}>
              <Text style={styles.futureTitle}>🚀 Integrazioni Future</Text>
              
              <Text style={styles.futureLabel}>Prezzo Medio Corrente:</Text>
              <Text style={styles.futureValue}>{prodottoTrovato.prezzoMedio}</Text>

              <Text style={styles.futureLabel}>Valutazione della Community:</Text>
              <Text style={styles.futureValue}>{prodottoTrovato.valutazione}</Text>

              <Text style={styles.futureLabel}>Ultime Recensioni:</Text>
              {prodottoTrovato.recensioni && prodottoTrovato.recensioni.length > 0 ? (
                prodottoTrovato.recensioni.map((rec: string, i: number) => (
                  <Text key={i} style={styles.reviewText}>• "{rec}"</Text>
                ))
              ) : (
                <Text style={styles.reviewText}>Nessuna recensione registrata per questo lotto.</Text>
              )}
            </View>

            {/* Reset Scanner */}
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={() => {
                setScanned(false);
                setProdottoTrovato(null);
              }}
            >
              <Text style={styles.resetButtonText}>SCANSIONA UN ALTRO PRODOTTO</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        <Link href="/about" style={styles.link}>
          Go to About screen
        </Link>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141619',
  },
  camera: {
    flex: 4,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerTarget: {
    width: 210,
    height: 150, // Più largo che alto, ottimizzato per catturare i codici a barre lineari (EAN)
    borderWidth: 3,
    borderColor: '#00ffcc',
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  scannerTargetScanned: {
    borderColor: '#ff3b30',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  navContainer: {
    flex: 5,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -25,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centerInstructions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subInstructionText: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 15,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  tagCategoria: {
    color: '#00ffcc',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  productTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoBlock: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionLabel: {
    color: '#8e8e93',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  certRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  certBadge: {
    backgroundColor: 'rgba(0, 255, 204, 0.15)',
    borderWidth: 1,
    borderColor: '#00ffcc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  certBadgeText: {
    color: '#00ffcc',
    fontSize: 11,
    fontWeight: '600',
  },
  historyText: {
    color: '#e5e5ea',
    fontSize: 14,
    lineHeight: 20,
  },
  futureBlock: {
    backgroundColor: 'rgba(255, 149, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 149, 0, 0.3)',
    padding: 14,
    borderRadius: 12,
    marginVertical: 15,
  },
  futureTitle: {
    color: '#ff9500',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  futureLabel: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 6,
  },
  futureValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewText: {
    color: '#ddd',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 2,
  },
  resetButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  resetButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#ffffff',
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    opacity: 0.7,
  },
});