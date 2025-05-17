import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

export default function SeasonalDecoration() {
  const { colors } = useTheme();
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  const translateY1 = useSharedValue(0);
  const translateY2 = useSharedValue(0);
  const translateY3 = useSharedValue(0);

  useEffect(() => {
    // Start animations with different delays
    opacity1.value = withDelay(
      100, 
      withRepeat(
        withTiming(0.8, { duration: 5000, easing: Easing.sin }), 
        -1, 
        true
      )
    );
    opacity2.value = withDelay(
      300, 
      withRepeat(
        withTiming(0.6, { duration: 4000, easing: Easing.sin }), 
        -1, 
        true
      )
    );
    opacity3.value = withDelay(
      500, 
      withRepeat(
        withTiming(0.7, { duration: 6000, easing: Easing.sin }), 
        -1, 
        true
      )
    );

    translateY1.value = withDelay(
      100, 
      withRepeat(
        withTiming(-5, { duration: 5000, easing: Easing.sin }), 
        -1, 
        true
      )
    );
    translateY2.value = withDelay(
      300, 
      withRepeat(
        withTiming(-8, { duration: 4000, easing: Easing.sin }), 
        -1, 
        true
      )
    );
    translateY3.value = withDelay(
      500, 
      withRepeat(
        withTiming(-6, { duration: 6000, easing: Easing.sin }), 
        -1, 
        true
      )
    );
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      opacity: opacity1.value,
      transform: [{ translateY: translateY1.value }],
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: opacity2.value,
      transform: [{ translateY: translateY2.value }],
    };
  });

  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      opacity: opacity3.value,
      transform: [{ translateY: translateY3.value }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 80,
      height: 120,
      overflow: 'hidden',
    },
    decoration1: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.accent,
      opacity: 0.2,
    },
    decoration2: {
      position: 'absolute',
      top: 40,
      right: 40,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.primary,
      opacity: 0.15,
    },
    decoration3: {
      position: 'absolute',
      top: 15,
      right: 50,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.secondary,
      opacity: 0.15,
    },
  });
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.decoration1, animatedStyle1]} />
      <Animated.View style={[styles.decoration2, animatedStyle2]} />
      <Animated.View style={[styles.decoration3, animatedStyle3]} />
    </View>
  );
}