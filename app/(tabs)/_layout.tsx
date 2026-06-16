import { Tabs } from 'expo-router';
// 1. Importa la libreria delle icone
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    // Ho aggiunto 'tabBarActiveTintColor' per far colorare l'icona quando ci clicchi sopra
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      
      {/* Definisce la prima scheda in basso che punta al file index.tsx (Home) */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Scanner',
          // Icona del mirino/fotocamera per lo scanner
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="camera" color={color} />,
        }} 
      />

      {/* Generatore di barcode */}
      <Tabs.Screen 
        name="generator" 
        options={{ 
          title: 'Generatore',
          // Icona del codice a barre
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="barcode" color={color} />,
        }} 
      />  

      {/* Definisce la seconda scheda in basso che punta al file about.tsx (About) */}      
      <Tabs.Screen 
        name="about" 
        options={{ 
          title: 'Informazioni',
          // Icona del cerchio con la "i" di informazioni
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="info-circle" color={color} />,
        }} 
      />
      
    </Tabs>
  );
}