import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { 
  NotoSansJP_400Regular, 
  NotoSansJP_500Medium, 
  NotoSansJP_700Bold 
} from '@expo-google-fonts/noto-sans-jp';
import { 
  NotoSerifJP_400Regular, 
  NotoSerifJP_500Medium, 
  NotoSerifJP_700Bold 
} from '@expo-google-fonts/noto-serif-jp';
import { SplashScreen } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'NotoSansJP-Regular': NotoSansJP_400Regular,
    'NotoSansJP-Medium': NotoSansJP_500Medium,
    'NotoSansJP-Bold': NotoSansJP_700Bold,
    'NotoSerifJP-Regular': NotoSerifJP_400Regular,
    'NotoSerifJP-Medium': NotoSerifJP_500Medium,
    'NotoSerifJP-Bold': NotoSerifJP_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after fonts have loaded (or if there was an error)
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </LanguageProvider>
  );
}