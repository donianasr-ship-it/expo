import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      {/* 1. Questo cambia il titolo della barra in alto SOLO per questa schermata di errore */}
      <Stack.Screen options={{ title: 'Oops! Non trovato' }} />
      
      <View style={styles.container}>
        {/* 2. Questo link sicuro riporta l'utente alla Home scacciando il pericolo */}
        <Link href="/" style={styles.button}>
          Torna alla pagina iniziale!
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