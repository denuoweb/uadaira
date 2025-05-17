import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from '@/localization/translations';

// Define the available languages
export type Language = 'en' | 'ja' | 'zh' | 'ko';

// Define the language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  i18n: I18n;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize i18n with translations
  const i18n = new I18n(translations);

  // Set default language and fallbacks
  const [language, setLanguage] = useState<Language>('ja');

  // Set initial language based on device locale
  useEffect(() => {
    const deviceLanguage = Localization.locale.split('-')[0];
    
    // Check if the device language is one of our supported languages
    if (['en', 'ja', 'zh', 'ko'].includes(deviceLanguage)) {
      setLanguage(deviceLanguage as Language);
    } else {
      // Default to Japanese if not supported
      setLanguage('ja');
    }
  }, []);

  // Update i18n configuration when language changes
  useEffect(() => {
    i18n.locale = language;
    i18n.enableFallback = true;
  }, [language]);

  // Define the context value
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    i18n,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};