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
