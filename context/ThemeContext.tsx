import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme types
type ThemeColors = {
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  cardSecondary: string;
  text: string;
  textSecondary: string;
  invertedText: string;
  border: string;
  error: string;
  success: string;
  warning: string;
};

type ThemeSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

type ThemeType = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  isDark: boolean;
  toggleTheme: () => void;
};

// Define light and dark theme colors
const lightColors: ThemeColors = {
  primary: '#664647',       // Traditional Kyoto brown
  primaryLight: '#998788',  // Lighter version of primary
  secondary: '#A18E65',     // Sandy beige (tatami color)
  accent: '#B94A3E',        // Vermillion (traditional Japanese red)
  background: '#FFFAF5',    // Off-white (washi paper)
  card: '#FFF8EF',          // Slightly warmer card background
  cardSecondary: '#F1EBE4',  // Cream color (lighter tatami)
  text: '#333333',          // Almost black
  textSecondary: '#666666', // Dark gray
  invertedText: '#FFFFFF',  // White
  border: '#E5DFD9',        // Light beige border
  error: '#B94A3E',         // Same as accent
  success: '#687052',       // Matcha green
  warning: '#C17B38',       // Amber
};

const darkColors: ThemeColors = {
  primary: '#8D6B6C',       // Lighter Kyoto brown for dark theme
  primaryLight: '#A98C8D',  // Even lighter primary
  secondary: '#A18E65',     // Sandy beige
  accent: '#D46D63',        // Brighter vermillion for dark mode
  background: '#1A1515',    // Very dark brown
  card: '#282323',          // Dark card background
  cardSecondary: '#332E2E', // Slightly lighter card
  text: '#F2ECE4',          // Off-white text
  textSecondary: '#B6ACA3', // Light gray
  invertedText: '#FFFFFF',  // White
  border: '#413A3A',        // Dark border
  error: '#D46D63',         // Same as accent
  success: '#8C997A',       // Lighter matcha green
  warning: '#D39762',       // Lighter amber
};

// Define spacing
const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Create context
const ThemeContext = createContext<ThemeType | undefined>(undefined);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceColorScheme === 'dark');
  
  // Update theme when device color scheme changes
  useEffect(() => {
    setIsDark(deviceColorScheme === 'dark');
  }, [deviceColorScheme]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Get the current theme colors
  const colors = isDark ? darkColors : lightColors;

  // Theme context value
  const theme: ThemeType = {
    colors,
    spacing,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = (): ThemeType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};