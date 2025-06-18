export const colors = {
  // Główne kolory metalowe
  primary: '#FF0000',           // Czerwony metal
  secondary: '#8B0000',         // Ciemny czerwony
  accent: '#FFD700',            // Złoty akcent
  
  // Tła
  backgroundBlack: '#000000',   // Czarne tło
  backgroundDark: '#1A1A1A',    // Ciemne tło
  backgroundGray: '#2D2D2D',    // Szare tło
  
  // Teksty
  textWhite: '#FFFFFF',         // Biały tekst
  textGray: '#CCCCCC',          // Szary tekst
  textDark: '#666666',          // Ciemny tekst
  
  // Stany
  success: '#00FF00',           // Zielony sukces
  warning: '#FFA500',           // Pomarańczowe ostrzeżenie
  error: '#FF4444',             // Czerwony błąd
  
  // Metalowe akcenty
  metalSilver: '#C0C0C0',       // Srebrny
  metalGold: '#FFD700',         // Złoty
  metalCopper: '#B87333',       // Miedziany
  
  // Przezroczystości
  overlay: 'rgba(0, 0, 0, 0.7)',
  cardBackground: 'rgba(45, 45, 45, 0.9)',
} as const;

export type ColorKeys = keyof typeof colors;
