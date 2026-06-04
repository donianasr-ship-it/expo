import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Dice allo Stack principale di caricare il gruppo delle schede e nascondere la barra superiore vecchia */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}