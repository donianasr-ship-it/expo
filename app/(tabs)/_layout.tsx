import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      {/* Definisce la prima scheda in basso che punta al file index.tsx (Home) */}
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      {/* Definisce la seconda scheda in basso che punta al file about.tsx (About) */}
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}