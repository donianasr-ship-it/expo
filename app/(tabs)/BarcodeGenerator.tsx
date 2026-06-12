import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
 
// ─── EAN-13 encoding tables ────────────────────────────────────────────────
// Each digit is encoded as 7 modules (bits).
// L-code (odd parity), G-code (even parity), R-code (right side)
const L_CODE: Record<string, string> = {
  '0': '0001101', '1': '0011001', '2': '0010011', '3': '0111101',
  '4': '0100011', '5': '0110001', '6': '0101111', '7': '0111011',
  '8': '0110111', '9': '0001011',
};
const G_CODE: Record<string, string> = {
  '0': '0100111', '1': '0110011', '2': '0011011', '3': '0100001',
  '4': '0011101', '5': '0111001', '6': '0000101', '7': '0010001',
  '8': '0001001', '9': '0010111',
};
const R_CODE: Record<string, string> = {
  '0': '1110010', '1': '1100110', '2': '1101100', '3': '1000010',
  '4': '1011100', '5': '1001110', '6': '1010000', '7': '1000100',
  '8': '1001000', '9': '1110100',
};
 
// First digit determines L/G pattern for digits 2-7
const FIRST_DIGIT_PATTERN: Record<string, string> = {
  '0': 'LLLLLL', '1': 'LLGLGG', '2': 'LLGGLG', '3': 'LLGGGL',
  '4': 'LGLLGG', '5': 'LGGLLG', '6': 'LGGGLL', '7': 'LGLGLG',
  '8': 'LGLGGL', '9': 'LGGLGL',
};
 
// Guard bars
const GUARD_NORMAL = '101';       // Start / End guard
const GUARD_CENTER = '01010';     // Center guard
 
/**
 * Encodes a 13-digit EAN-13 string into a binary string of modules.
 * Returns null if the value is invalid.
 */
function encodeEAN13(value: string): string | null {
  if (!/^\d{13}$/.test(value)) return null;
 
  const firstDigit = value[0];
  const leftDigits = value.slice(1, 7);   // digits 2-7
  const rightDigits = value.slice(7, 13); // digits 8-13
  const pattern = FIRST_DIGIT_PATTERN[firstDigit];
 
  let bits = GUARD_NORMAL;
 
  // Left side: 6 digits, encoded with L or G depending on first-digit pattern
  for (let i = 0; i < 6; i++) {
    const d = leftDigits[i];
    bits += pattern[i] === 'L' ? L_CODE[d] : G_CODE[d];
  }
 
  bits += GUARD_CENTER;
 
  // Right side: 6 digits, always R-code
  for (const d of rightDigits) {
    bits += R_CODE[d];
  }
 
  bits += GUARD_NORMAL;
 
  // Total should be 95 modules
  return bits;
}
 
// ─── Component ─────────────────────────────────────────────────────────────
 
interface BarcodeGeneratorProps {
  value: string;
}
 
export default function BarcodeGenerator({ value }: BarcodeGeneratorProps) {
  const bits = useMemo(() => encodeEAN13(value), [value]);
 
  if (!bits) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          ❌ Il codice deve essere di 13 cifre numeriche. Ricevuto: "{value}"
        </Text>
      </View>
    );
  }
 
  // ── Layout constants ──────────────────────────────────────────────────────
  const MODULE_WIDTH = 2.5;       // px per module
  const BAR_HEIGHT = 70;          // height of normal bars
  const GUARD_EXTRA = 5;          // guard bars extend below normal bars
  const QUIET_ZONE = 10;          // quiet zone on each side (min 9 modules = ~11x)
  const TEXT_HEIGHT = 12;         // space reserved for digits below bars
  const TOP_MARGIN = 4;
 
  const svgWidth = QUIET_ZONE * 2 + 95 * MODULE_WIDTH;
  const svgHeight = TOP_MARGIN + BAR_HEIGHT + GUARD_EXTRA + TEXT_HEIGHT + 4;
 
  // Guard bar positions (indices into the 95-module string):
  // Start guard:  0-2   (modules 0,1,2)
  // Center guard: 45-49 (modules 45,46,47,48,49)
  // End guard:    92-94 (modules 92,93,94)
  const isGuardPosition = (i: number) =>
    (i >= 0 && i <= 2) ||
    (i >= 45 && i <= 49) ||
    (i >= 92 && i <= 94);
 
  // Render bars as <Rect> elements
  const bars: React.ReactElement[] = [];
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === '1') {
      const isGuard = isGuardPosition(i);
      const x = QUIET_ZONE + i * MODULE_WIDTH;
      const height = isGuard ? BAR_HEIGHT + GUARD_EXTRA : BAR_HEIGHT;
      bars.push(
        <Rect
          key={i}
          x={x}
          y={TOP_MARGIN}
          width={MODULE_WIDTH}
          height={height}
          fill="#000000"
        />
      );
    }
  }
 
  // ── Human-readable text ───────────────────────────────────────────────────
  // EAN-13 standard: first digit left of barcode, then two groups of 6
  // Text sits inside the quiet zone / below guard bars
  const textY = TOP_MARGIN + BAR_HEIGHT + GUARD_EXTRA + TEXT_HEIGHT - 1;
 
  // Formatted string: "8 001234 567894"
  const humanText = `${value[0]} ${value.substring(1, 7)} ${value.substring(7)}`;
 
  return (
    <View style={styles.container}>
      <Svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        {/* White background so the barcode is always readable */}
        <Rect x={0} y={0} width={svgWidth} height={svgHeight} fill="#ffffff" />
 
        {/* Bars */}
        {bars}
      </Svg>
 
      {/* Human-readable digits below the SVG */}
      <Text style={styles.barcodeText}>{humanText}</Text>
    </View>
  );
}
 
// ─── Styles ─────────────────────────────────────────────────────────────────
 
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  barcodeText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2.5,
    fontFamily: 'monospace',
  },
  errorContainer: {
    padding: 15,
    backgroundColor: '#ffdbdd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff3b30',
    marginVertical: 10,
  },
  errorText: {
    color: '#ff3b30',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
});