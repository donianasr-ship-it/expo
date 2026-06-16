import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ℹ️ Info Applicazione</Text>
        
        <Text style={styles.description}>
          Questa applicazione è uno strumento completo progettato per la gestione e l'identificazione rapida dei prodotti agroalimentari, con un focus specifico sul settore vinicolo e olivicolo.
        </Text>

        <View style={styles.featuresContainer}>
          <Text style={styles.featureItem}>
            🔍 <Text style={styles.boldText}>Scannerizza Prodotti:</Text> Inquadra il codice a barre per ricevere istantaneamente informazioni dettagliate su vini ed oli.
          </Text>
          
          <Text style={styles.featureItem}>
            ➕ <Text style={styles.boldText}>Generatore EAN-13:</Text> Crea da zero codici a barre standard EAN-13 per i tuoi prodotti in pochi secondi.
          </Text>
        </View>

        <Text style={styles.footer}>Versione 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#343a40',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    color: '#cccccc',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresContainer: {
    borderTopWidth: 1,
    borderTopColor: '#495057',
    paddingTop: 15,
    marginBottom: 15,
  },
  featureItem: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#007AFF', // Colore azzurro per evidenziare le funzioni
  },
  footer: {
    color: '#6c757d',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});