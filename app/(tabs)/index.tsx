import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importiamo i due file JSON presenti nella stessa cartella app
import databaseEan13 from '../database_ean13.json';
import databaseQrcode from '../database_qrcode.json';

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

// Gestione dell'evento di scansione del sensore fotografico potenziata
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (!data) return;
    
    // Blocca letture multiple consecutive
    setScanned(true);

    // Puliamo il testo scansionato da eventuali spazi bianchi o invii invisibili
    const cleanedData = data.trim();
    console.log("Codice scansionato pulito:", cleanedData);

    // 1. Cerca nel database EAN-13 (Ricerca flessibile per chiave o valore)
    let prodotto = databaseEan13[cleanedData as keyof typeof databaseEan13];
    if (!prodotto) {
      // Se non lo trova come chiave diretta, cerca se il codice è dentro l'oggetto
      prodotto = Object.values(databaseEan13).find((p: any) => p.codice === cleanedData || p.ean === cleanedData);
    }

    // 2. Cerca nel database QR Code (Produttori)
    let produttore = databaseQrcode[cleanedData as keyof typeof databaseQrcode];
    if (!produttore) {
      // Cerca se il testo corrisponde al nome del produttore o all'id interno
      produttore = Object.values(databaseQrcode).find((p: any) => 
        p.id === cleanedData || 
        p.produttore?.toLowerCase() === cleanedData.toLowerCase()
      );
    }

    if (prodotto) {
      console.log("Trovato Prodotto:", prodotto.nome);
      setProdottoTrovato(prodotto);
    } else if (produttore) {
      console.log("Trovato Produttore:", produttore.produttore);
      setProdottoTrovato({
        nome: produttore.produttore,
        categoria: "Profilo Azienda / Produttore",
        lotto: "Anno Fondazione: " + produttore.fondazione,
        certificazioni: [produttore.regione, "Sito Web"],
        storia: produttore.filosofia,
        prezzoMedio: produttore.sitoWeb,
        valutazione: "GPS: " + produttore.coordinateGps,
        recensioni: [
          { utente: "Email", commento: produttore.contatti.email, stelle: 5 },
          { utente: "Telefono", commento: produttore.contatti.telefono, stelle: 5 }
        ]
      });
    } else {
      console.log("Codice non presente a database.");
      // Mostra comunque il codice letto così capiamo cosa ha visto la fotocamera
      setProdottoTrovato({
        nome: "Codice Sconosciuto",
        categoria: "Smart Label / Traceability App",
        lotto: `Letto: "${cleanedData}"`,
        certificazioni: ["Nessun record trovato"],
        storia: `Il codice letto dalla fotocamera (${cleanedData}) non corrisponde a nessuna chiave presente nel tuo file JSON.`,
        prezzoMedio: 0,
        valutazione: 0,
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
      
      {/* SEZIONE FOTOCAMERA: Struttura standard Expo per evitare conflitti di layout */}
      <View style={styles.cameraContainer}>
        <CameraView 
          style={styles.cameraLayout}
          ref={cameraRef}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "qr", "ean8"],
          }}
        />
        
        {/* Il mirino grafico è dentro il contenitore ma non interferisce con il sensore */}
        <View style={styles.overlayContainer} pointerEvents="none">
          <View style={[styles.scannerTarget, scanned && styles.scannerTargetScanned]} />
        </View>
      </View>

      {/* PANNELLO INFORMATIVO INFERIORE */}
      <Animated.View style={[styles.navContainer, { backgroundColor: backgroundColorInterpolate }]}>
        
        {!prodottoTrovato ? (
          <View style={styles.centerInstructions}>
            <Text style={styles.instructionText}>Scanner di Tracciabilità Attivo</Text>
            <Text style={styles.subInstructionText}>Inquadra un codice EAN-13 o un QR Code aziendale per sbloccare le informazioni</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 25 }}>
            <Text style={styles.tagCategoria}>{prodottoTrovato.categoria.toUpperCase()}</Text>
            <Text style={styles.productTitle}>{prodottoTrovato.nome}</Text>
            
            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Identificativo / Riferimento:</Text>
              <Text style={styles.infoText}>{prodottoTrovato.lotto}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Certificazioni e Informazioni:</Text>
              <View style={styles.certRow}>
                {prodottoTrovato.certificazioni.map((cert: string, index: number) => (
                  <View key={index} style={styles.certBadge}>
                    <Text style={styles.certBadgeText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Dettagli e Storia:</Text>
              <Text style={styles.historyText}>{prodottoTrovato.storia}</Text>
            </View>

            <View style={styles.futureBlock}>
              <Text style={styles.futureTitle}>🚀 Integrazioni e Indicatori</Text>
              
              <Text style={styles.futureLabel}>Riferimento Commerciale / Prezzo:</Text>
              <Text style={styles.futureValue}>{prodottoTrovato.prezzoMedio}</Text>

              <Text style={styles.futureLabel}>Affidabilità / Valutazione:</Text>
              <Text style={styles.futureValue}>{prodottoTrovato.valutazione}</Text>

              <Text style={styles.futureLabel}>Note Aggiuntive / Recensioni:</Text>
              {prodottoTrovato.recensioni && prodottoTrovato.recensioni.length > 0 ? (
                prodottoTrovato.recensioni.map((rec: string, i: number) => (
                  <Text key={i} style={styles.reviewText}>• {typeof rec === 'object' ? JSON.stringify(rec) : rec}</Text>
                ))
              ) : (
                <Text style={styles.reviewText}>Nessuna nota extra registrata.</Text>
              )}
            </View>

            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={() => {
                setScanned(false);
                setProdottoTrovato(null);
              }}
            >
              <Text style={styles.resetButtonText}>EFFETTUA UNA NUOVA SCANSIONE</Text>
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
  cameraContainer: {
    flex: 4, 
    position: 'relative',
  },
  cameraLayout: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  scannerTarget: {
    width: 240,
    height: 160, 
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