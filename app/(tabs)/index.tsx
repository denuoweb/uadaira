import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import FeaturedEvent from '@/components/home/FeaturedEvent';
import QuickActions from '@/components/home/QuickActions';
import CommunityUpdates from '@/components/home/CommunityUpdates';
import SeasonalDecoration from '@/components/common/SeasonalDecoration';
import { useTranslation } from '@/hooks/useTranslation';

export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    welcomeContainer: {
      padding: spacing.lg,
      backgroundColor: colors.background,
      position: 'relative',
    },
    welcomeHeading: {
      fontFamily: 'NotoSerifJP-Bold',
      fontSize: 28,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    welcomeSubtitle: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: spacing.md,
      lineHeight: 24,
    },
    sectionTitle: {
      fontFamily: 'NotoSerifJP-Medium',
      fontSize: 20,
      color: colors.text,
      marginBottom: spacing.md,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
    },
    footerText: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginVertical: spacing.xl,
    },
  });

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <SeasonalDecoration />
          <Text style={styles.welcomeHeading}>{t('home.welcome')}</Text>
          <Text style={styles.welcomeSubtitle}>
            {t('home.subtitle')}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>{t('home.featuredEvent')}</Text>
        <FeaturedEvent />

        <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
        <QuickActions />

        <Text style={styles.sectionTitle}>{t('home.communityUpdates')}</Text>
        <CommunityUpdates />

        <Text style={styles.footerText}>
          © 2025 Uedaira House - {t('home.footerTagline')}
        </Text>
      </ScrollView>
    </View>
  );
}