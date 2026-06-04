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
  },
});