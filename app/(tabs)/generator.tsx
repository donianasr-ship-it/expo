import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BarcodeGenerator from '../components/BarcodeGenerator';
 
// ─── EAN-13 check digit calculator ─────────────────────────────────────────
// Se l'utente inserisce 12 cifre, calcoliamo automaticamente il 13° digit.
function calcCheckDigit(digits12: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = parseInt(digits12[i], 10);
    sum += i % 2 === 0 ? d : d * 3;
  }
  const remainder = sum % 10;
  return remainder === 0 ? '0' : String(10 - remainder);
}
 
export default function Generator() {
  const [inputText, setInputText] = useState('');
  const [barcodeValue, setBarcodeValue] = useState<string | null>(null);
  const [hint, setHint] = useState<string>('');
 
  function handleChange(text: string) {
    // Accetta solo cifre, max 13
    const digits = text.replace(/\D/g, '').slice(0, 13);
    setInputText(digits);
    setBarcodeValue(null);
 
    if (digits.length === 12) {
      const check = calcCheckDigit(digits);
      setHint(`Cifra di controllo: ${check} → completo: ${digits}${check}`);
    } else if (digits.length === 13) {
      setHint('');
    } else {
      setHint(`${13 - digits.length} cifre rimanenti`);
    }
  }
 
  function handleGenerate() {
    let code = inputText;
 
    // Auto-completa se sono 12 cifre
    if (code.length === 12) {
      code = code + calcCheckDigit(code);
      setInputText(code);
    }
 
    if (code.length === 13) {
      setBarcodeValue(code);
      setHint('');
    }
  }
 
  function handleClear() {
    setInputText('');
    setBarcodeValue(null);
    setHint('');
  }
 
  const canGenerate = inputText.length === 12 || inputText.length === 13;
 
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Generatore EAN-13</Text>
          <Text style={styles.subtitle}>Inserisci 12 o 13 cifre</Text>
        </View>
 
        {/* Input card */}
        <View style={styles.card}>
          <Text style={styles.label}>Codice prodotto</Text>
 
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={handleChange}
              placeholder="es. 4001238767898"
              placeholderTextColor="#555"
              keyboardType="numeric"
              maxLength={13}
              returnKeyType="done"
              onSubmitEditing={handleGenerate}
              autoFocus
            />
            {inputText.length > 0 && (
              <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
 
          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(inputText.length / 13) * 100}%`,
                  backgroundColor:
                    inputText.length === 13 ? '#00e096' : '#4f8cff',
                },
              ]}
            />
          </View>
 
          {hint ? <Text style={styles.hint}>{hint}</Text> : null}
 
          <TouchableOpacity
            style={[styles.generateBtn, !canGenerate && styles.generateBtnDisabled]}
            onPress={handleGenerate}
            disabled={!canGenerate}
            activeOpacity={0.8}
          >
            <Text style={styles.generateBtnText}>
              {inputText.length === 12 ? 'Calcola e genera →' : 'Genera barcode →'}
            </Text>
          </TouchableOpacity>
        </View>
 
        {/* Barcode output */}
        {barcodeValue && (
          <View style={styles.outputCard}>
            <Text style={styles.outputLabel}>Barcode generato</Text>
            <BarcodeGenerator value={barcodeValue} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
// ─── Styles ──────────────────────────────────────────────────────────────────
 
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#141619',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
 
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#888',
    letterSpacing: 0.3,
  },
 
  // Input card
  card: {
    width: '100%',
    backgroundColor: '#1e2124',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4f8cff',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2d32',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  clearBtn: {
    marginLeft: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2a2d32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '700',
  },
 
  // Progress bar
  progressTrack: {
    marginTop: 10,
    height: 3,
    backgroundColor: '#2a2d32',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
 
  // Hint text
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: '#aaa',
    letterSpacing: 0.3,
  },
 
  // Generate button
  generateBtn: {
    marginTop: 18,
    backgroundColor: '#4f8cff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  generateBtnDisabled: {
    backgroundColor: '#2a2d32',
  },
  generateBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
 
  // Output card
  outputCard: {
    marginTop: 28,
    width: '100%',
    backgroundColor: '#1e2124',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  outputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00e096',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
});