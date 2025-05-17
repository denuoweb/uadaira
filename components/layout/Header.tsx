import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu, Bell } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTranslation } from '@/hooks/useTranslation';

type HeaderProps = {
  title?: string;
  showNotification?: boolean;
};

export default function Header({ title, showNotification = true }: HeaderProps) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  
  const opacity = useSharedValue(0);
  
  // Animate header background when scrolling
  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'web' ? spacing.md : insets.top,
      position: 'relative',
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
      paddingHorizontal: spacing.lg,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontFamily: 'NotoSerifJP-Medium',
      fontSize: 18,
      color: colors.text,
    },
    logoText: {
      fontFamily: 'NotoSerifJP-Bold',
      fontSize: 20,
      color: colors.text,
    },
    icon: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationDot: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.error,
    },
  });

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 10) {
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, headerStyle]} />
      <View style={styles.content}>
        <TouchableOpacity style={styles.icon}>
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          {title ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            <Text style={styles.logoText}>うえだいらハウス</Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.icon}>
          <Bell size={24} color={colors.text} />
          {showNotification && <View style={styles.notificationDot} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}